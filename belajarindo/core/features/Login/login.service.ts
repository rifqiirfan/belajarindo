"use server"

import { ActionResponse, GetResponse } from "@/core/types/response"
import { storeToken } from "@/core/utilities/authUtils"
import { BASE_URL } from "@/core/utilities/envUtils";
import { extractPayload, processResponse, validateResponse } from "@/core/utilities/fetchUtils"
import { redirect } from "next/navigation";
import {NextRequest} from "next/server";

const LOGIN_URL = `${BASE_URL()}/login`

type ResponseAuth = GetResponse<never> & {
  token: string
}

// export const login = async (formData: { username: string, password: string }): Promise<ActionResponse<{}>> => {
//   const r = nextRequestChain(LOGIN_URL, {
//     method: "POST",
//     body: JSON.stringify(formData),
//   }).custom()
//
//   const processed = await processResponse(r.getWithFetch(), {})
//   if (!processed.success) {
//     return processed
//   }
//
//   const { response } = processed
//
//   const validated = await validateResponse(response, {})
//   if (!validated.success) {
//     return validated
//   }
//
//   const extracted = await extractPayload<ResponseAuth>(response, {})
//   if (!extracted.success) {
//     return extracted
//   }
//
//   const { payload } = extracted
//
//   if (!payload.success && payload.errors) {
//     return {
//       success: false,
//       error: Object.values(payload.errors).flat().join(", ")
//     }
//   }
//
//   await storeToken(payload.token ?? "");
//   redirect("/")
// }

export const loginGoogle = async (code: string) => {
  // const r = nextRequestChain(`${BASE_URL()}/exchange-code`, {
  //   method: "POST",
  //   body: JSON.stringify({ code: code }),
  // }).custom()
  console.log(code)
  const r = new NextRequest(`${BASE_URL()}/exchange-code`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": '*',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: code }),
  })

  const processed = await processResponse(fetch(r), {})
  console.log(processed)
  if (!processed.success) {
    return processed
  }

  const { response } = processed

  const validated = await validateResponse(response, {})
  if (!validated.success) {
    return validated
  }

  const extracted = await extractPayload<ResponseAuth>(response, {})
  if (!extracted.success) {
    return extracted
  }

  const { payload } = extracted

  if (!payload.success && payload.errors) {
    return {
      success: false,
      error: Object.values(payload.errors).flat().join(", ")
    }
  }

  await storeToken(payload.token ?? "");
  redirect("/")
}