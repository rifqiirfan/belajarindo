"use server"

import { ActionResponse, GetResponse } from "@/core/types/response"
import { storeToken } from "@/core/utilities/authUtils"
import { BASE_URL } from "@/core/utilities/envUtils";
import { extractPayload, nextRequestChain, processResponse, validateResponse } from "@/core/utilities/fetchUtils"
import { redirect } from "next/navigation";

const LOGIN_URL = `${BASE_URL()}/login`

type ResponseAuth = GetResponse<never> & {
  token: string
}

export const login = async (formData: { username: string, password: string }): Promise<ActionResponse<{}>> => {
  const r = nextRequestChain(LOGIN_URL, {
    method: "POST",
    body: JSON.stringify(formData),
  }).custom()

  const processed = await processResponse(r.getWithFetch(), {})
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