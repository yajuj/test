/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_EMAIL: string;
    REACT_APP_PASSWORD: string;
    REACT_APP_APP_ID: string;
  }
}
