export const BASE_URL = () => {
  return process.env.BACKEND_URL ?? 'https://no-be-url-env.co.id'
}

export const FE_URL = () => {
  return process.env.FRONTEND_URL ?? 'https://no-fe-url-env.co.id'
}

export const HARMONY_URL = () => {
  return process.env.HARMONY_URL ?? 'https://no-harmony-url-env.co.id'
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

export const HARMONY_BEARER = () => {
  return process.env.HARMONY_BEARER ?? 'no-harmony-bearer'
}

export const NODE_ENV = () => {
  return process.env.NODE_ENV  //== 'production'
  // return process.env.NEXT_ENV  //== 'production'

}