"use server"

import { createJWT, validateJWT } from "oslo/jwt";
import { TimeSpan } from "oslo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secret = new TextEncoder().encode(process.env.SECRET_BE)

enum Roles {
  admin = "admin",
  user = "user",
}

type Payload = {
  id: string
  username: string
  roles: string
  full_name: string
  iat: number
  exp: number
  iss: string
  sub: string
}

const storeToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // One Day
    path: '/',
  })
}

const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value ?? ""
}

const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session")
}

const validateToken = async (token: string) => {
  const jwt = await validateJWT("HS256", secret, token)
  return jwt.payload as Payload
}

const getRoles = async () => {
  try {
    const payload = await validateToken(await getToken())
    return payload.roles
  } catch (e: any) {
    console.info(e)
    await removeToken()
    redirect("/auth/login")
  }
}

const hasRole = async (userRoles: Roles[], requiredRole: Roles): Promise<boolean> => {
  return userRoles.includes(requiredRole);
};

const hasAnyRole = async (userRoles: Roles[], requiredRoles: Roles[]): Promise<boolean> => {
  return requiredRoles.some(role => userRoles.includes(role));
};

const isAuthorized = async (roles: string[]) => {
  // const jwtRoles = await getRoles()
  // return roles.some((role) => jwtRoles.includes(role))
  if (roles) {
    return true;
  }

  return true;
}

const logout = async () => {
  await removeToken()
  redirect("/login")
}

export {
  storeToken,
  getToken,
  removeToken,
  validateToken,
  getRoles,
  hasRole,
  hasAnyRole,
  isAuthorized,
  // login,
  logout,
  // getSecretToken
}