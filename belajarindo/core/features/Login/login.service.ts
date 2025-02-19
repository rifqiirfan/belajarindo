"use server"

import { ActionResponse, GetResponse } from "@/core/types/response"
import { storeToken } from "@/core/utilities/authUtils"
import { BASE_URL } from "@/core/utilities/envUtils";
import { extractPayload, processResponse, validateResponse } from "@/core/utilities/fetchUtils"
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

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

  const res: any = await fetch('https://oauth2.googleapis.com/token', {
    method: "POST",
    body: JSON.stringify({
      code: code,
      // client_id: '881409856333-dgqitg8l73prmagbbjuqh36agu1drk1d.apps.googleusercontent.com',
      // client_secret: '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',
      redirect_uri: 'postmessage',
      grant_type: 'authorization_code',
    })
  }
  ).then(r => r.json())

  const accessToken = res?.access_token;
  const userInfo: any = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    }
  }
  ).then(r => r.json())

  /**
   * result was 
   * userInfo = .name, .email,
   */


  // hit the data given to backend, make sure if the backend has email, then apply bearer in here
  // if the data is not exist in back-end, then regist and accept the bearer
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