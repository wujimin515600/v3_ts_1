/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    [key: string]: string;
  }
   
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }