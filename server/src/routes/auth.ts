import { z } from "zod";
import express from "express";
import bcrypt from "bcryptjs";
import { OTP, User } from "../store/db";
import { sendEmail } from "../utils/email";
import { sendSuccess, sendError, sendValidationError } from "../utils/response";
import { formatZodErrors } from "../utils/validation";
import {
  generateOtpCode,
  getOtpExpirationDate,
  generateTemporaryPassword,
  generateToken,
  formatUserResponse,
} from "../utils/authHelpers";
import {
  buildOtpEmailHtml,
  buildTemporaryPasswordEmailHtml,
} from "../utils/emailTemplates";

const router = express.Router();

const signupSchema = z
  .object({
    name: z.string().min(1),
    email: z.email().transform((val) => val.toLowerCase()),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

router.post("/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return sendValidationError(res, formatZodErrors(result.error));
  }

  const { name, email, password } = result.data;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return sendError(res, "Email already exists", 400, {
      errors: { email: ["Email already exists"] },
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    passwordHash,
    role: "member",
  });

  const token = generateToken(newUser.id);

  sendSuccess(res, "Signup successful", {
    token,
    user: formatUserResponse(newUser),
  }, 201);
});

const loginSchema = z.object({
  email: z.email().transform((val) => val.toLowerCase()),
  password: z.string().min(1),
});

router.post("/login", async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return sendValidationError(res, formatZodErrors(result.error));
  }

  const { email, password } = result.data;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return sendError(res, "Invalid email or password", 401, {
      errors: { email: ["Invalid email or password"] },
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return sendError(res, "Invalid email or password", 401, {
      errors: { password: ["Invalid email or password"] },
    });
  }

  const token = generateToken(user.id);

  sendSuccess(res, "Login successful", {
    token,
    user: formatUserResponse(user),
  });
});

const forgotPasswordSchema = z.object({
  email: z.email().transform((val) => val.toLowerCase()),
});

router.post("/forgot", async (req, res) => {
  const result = forgotPasswordSchema.safeParse(req.body);

  if (!result.success) {
    return sendValidationError(res, formatZodErrors(result.error));
  }

  const { email } = result.data;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return sendError(res, "Email not found", 400, {
      errors: { email: ["Email not found"] },
    });
  }

  const code = generateOtpCode();

  await OTP.upsert({
    email,
    code,
    expiresAt: getOtpExpirationDate(),
    tempUser: null,
  });

  try {
    await sendEmail(email, "Your password reset code", buildOtpEmailHtml(code));
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    return sendError(res, "Failed to send reset code email. Please try again.", 500);
  }

  sendSuccess(res, "Reset code sent to your email");
});

const verifyOtpSchema = z.object({
  email: z.email().transform((val) => val.toLowerCase()),
  code: z.string().regex(/^\d{6}$/, "OTP code must be 6 digits"),
});

router.post("/verify-otp", async (req, res) => {
  const result = verifyOtpSchema.safeParse(req.body);

  if (!result.success) {
    return sendValidationError(res, formatZodErrors(result.error));
  }

  const { email, code } = result.data;
  const user = await User.findOne({ where: { email } });
  const otp = await OTP.findOne({ where: { email } });

  if (!user || !otp || otp.code !== code) {
    return sendError(res, "Invalid OTP code", 400, {
      errors: { code: ["Invalid OTP code"] },
    });
  }

  if (otp.expiresAt.getTime() <= Date.now()) {
    await otp.destroy();

    return sendError(res, "OTP code has expired", 400, {
      errors: { code: ["OTP code has expired"] },
    });
  }

  const temporaryPassword = generateTemporaryPassword();
  const passwordHash = await bcrypt.hash(temporaryPassword, 10);

  try {
    await sendEmail(
      email,
      "Your temporary password",
      buildTemporaryPasswordEmailHtml(temporaryPassword),
    );
  } catch (error) {
    console.error("Failed to send temporary password email:", error);
    return sendError(res, "Failed to send temporary password email. Please try again.", 500);
  }

  await user.update({ passwordHash });
  await otp.destroy();

  sendSuccess(res, "Password reset successful");
});

export default router;
