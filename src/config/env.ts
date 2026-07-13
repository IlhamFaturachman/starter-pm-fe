const importMeta = import.meta as unknown as {
  env: {
    VITE_API_URL?: string;
    VITE_SOCKET_URL?: string;
    MODE: string;
    DEV: boolean;
    PROD: boolean;
  };
};

export const config = {
  apiUrl: importMeta.env.VITE_API_URL ?? 'http://localhost:3000/api',
  socketUrl: importMeta.env.VITE_SOCKET_URL ?? 'http://localhost:3000',
  mode: importMeta.env.MODE,
  isDev: importMeta.env.DEV,
  isProd: importMeta.env.PROD,
} as const;
