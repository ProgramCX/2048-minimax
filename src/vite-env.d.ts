/// <reference types="vite/client" />

// 声明Vue模块
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Vue Router类型声明
declare module 'vue-router' {
  import type { RouteRecordRaw } from 'vue-router';
  
  export interface RouteMeta {
    title?: string;
    description?: string;
    requiresAuth?: boolean;
  }
}

// Pinia类型声明
declare module 'pinia' {
  import type { DefineStore } from 'pinia';
  
  export function defineStore<
    S extends Record<string, any>,
    G extends Record<string, (...args: any[]) => any>,
    A extends Record<string, (...args: any[]) => any>
  >(
    id: string,
    state: () => S,
    getters?: G,
    actions?: A
  ): DefineStore<string, S, G, A>;
}

// 声明环境变量类型
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 全局类型声明
declare global {
  interface Window {
    localStorage: Storage;
    sessionStorage: Storage;
  }
  
  interface Storage {
    setItem(key: string, value: string): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    clear(): void;
  }
}

export {};