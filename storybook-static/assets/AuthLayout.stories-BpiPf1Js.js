import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{T as h}from"./ThemeToggle-Dp8iU4qd.js";import{A as x}from"./AuthCard-H059nGtF.js";import{A as g}from"./AuthIllustration-BfRstsWk.js";import{c as f}from"./cn-DOIGBiOF.js";import"./react-IGx8eIPn.js";import"./index-Y0gaZlcC.js";function m({title:u,subtitle:s,children:p,withIllustration:i}){return t.jsxs("div",{className:"relative flex min-h-screen items-center justify-center bg-app-bg-light p-4 transition-colors duration-300 dark:bg-app-bg-dark lg:p-8",children:[t.jsx("div",{className:"fixed right-6 top-6 z-50",children:t.jsx(h,{})}),t.jsx("div",{className:f("w-full transition-all duration-500 ease-in-out",i?"max-w-4xl":"max-w-lg"),children:t.jsxs(x,{illustration:i?t.jsx(g,{}):void 0,children:[t.jsxs("div",{className:"mb-8",children:[t.jsx("h1",{className:"text-3xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark md:text-4xl",children:u}),s&&t.jsx("p",{className:"mt-2 text-sm text-text-muted-light dark:text-text-muted-dark md:text-base",children:s})]}),p]})})]})}m.__docgenInfo={description:"",methods:[],displayName:"AuthLayout",props:{title:{required:!0,tsType:{name:"string"},description:""},subtitle:{required:!1,tsType:{name:"ReactNode"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},withIllustration:{required:!1,tsType:{name:"boolean"},description:""}}};const N={title:"Templates/AuthLayout",component:m,tags:["autodocs"]},e={args:{title:"Welcome Back",subtitle:"Please enter your details to sign in.",withIllustration:!0,children:t.jsx("div",{children:"Auth form"})}},r={args:{title:"Verify",withIllustration:!1,children:t.jsx("div",{children:"OTP form"})}};var a,n,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    title: 'Welcome Back',
    subtitle: 'Please enter your details to sign in.',
    withIllustration: true,
    children: <div>Auth form</div>
  }
}`,...(o=(n=e.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};var l,d,c;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    title: 'Verify',
    withIllustration: false,
    children: <div>OTP form</div>
  }
}`,...(c=(d=r.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const I=["WithIllustration","Centered"];export{r as Centered,e as WithIllustration,I as __namedExportsOrder,N as default};
