export const BASE_URL = () => {
  return process.env.BACKEND_URL ?? 'https://no-be-url-env.co.id'
}

export const FE_URL = () => {
  return process.env.FRONTEND_URL ?? 'https://no-fe-url-env.co.id'
}

export const SECRET_BE = () => {
  return process.env.SECRET_BE ?? 'no-secret-be-token'
}

export const APP_VERSION = () => {
  return process.env.VERSION ?? "Undefined";
}

export const LAST_BUILD = () => {
  return process.env.LASTBUILDDATETIME ?? "Undefined";
}

export const BACKEND_BEARER = () => {
  return process.env.BACKEND_BEARER ?? 'no-backend-bearer'
}

export const NODE_ENV = () => {
  return process.env.NODE_ENV
}