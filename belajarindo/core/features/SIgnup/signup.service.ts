"use server"

import {NextRequest} from "next/server";
import {BASE_URL} from "@/core/utilities/envUtils";
import {extractPayload, processResponse, validateResponse} from "@/core/utilities/fetchUtils";
import {storeToken} from "@/core/utilities/authUtils";
import {redirect} from "next/navigation";
import {GetResponse} from "@/core/types/response";

type ResponseAuth = GetResponse<never> & {
  token: string
}

export const signup = async ({data}: {data: Record<string, any>}) => {
  const r = new NextRequest(`${BASE_URL()}/signup`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": '*',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const processed = await processResponse(fetch(r), {})
  if (!processed.success) {
    return processed
  }

  const { response } = processed

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
  redirect("/")
}