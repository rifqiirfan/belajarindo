"use server"

import {ActionResponse, GetResponse} from "@/core/types/response"
import {storeToken} from "@/core/utilities/authUtils"
import {BASE_URL} from "@/core/utilities/envUtils";
import {processResponse} from "@/core/utilities/fetchUtils"
import {redirect} from "next/navigation";
import {NextRequest} from "next/server";

const LOGIN_URL = `${BASE_URL()}/login`

type ResponseAuth = GetResponse<never> & {
  token: string
}

export const login = async (formData: { username: string, password: string }): Promise<ActionResponse<{}>> => {
  const r = new NextRequest(`${BASE_URL()}/login`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": '*',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  const processed = await processResponse(fetch(r), {})
  if (!processed.success) {
    return processed
  }

  const {response} = processed

  const payload = await response.json()
  if (!payload.success) {
    return {
      success: false,
      error: payload.message
    }
  }

  if (response.status >= 400) {
    return {
      success: false,
      error: payload.message
    }
  }

  if (!payload.success && payload.errors) {
    return {
      success: false,
      error: Object.values(payload.errors).flat().join(", ")
    }
  }

  await storeToken(payload.token ?? "");

  /* Redirect after login */
  redirect("/dashboard/achievement")
}

export const loginGoogle = async (code: string) => {
  const r = new NextRequest(`${BASE_URL()}/exchange-code`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": '*',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({code: code}),
  })

  const processed = await processResponse(fetch(r), {})

  if (!processed.success) {
    return processed
  }

  const {response} = processed

  const payload = await response.json()

  if (!payload.success) {
    return {
      success: false,
      error: payload.message
    }
  }

  if (response.status >= 400) {
    return {
      success: false,
      error: payload.message
    }
  }

  await storeToken(payload.token ?? "");
  redirect("/dashboard/achievement")
}