import { cookies } from "next/headers";
import { ActionResponse, GetResponse } from "@/core/types/response";
import { NextRequest } from "next/server";
import { validateToken } from "@/core/utilities/authUtils";

const cookieStore = await cookies();

export const nextRequestChain = (...args: ConstructorParameters<typeof NextRequest>) => {
  const [input, init = {}] = args

  let initRequest: any = {
    ...init,
    headers: {
      "Access-Control-Allow-Origin": '*',
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookieStore.get("session")?.value}`,
      ...(init.headers || {}),
    },
  }

  const bundle = {
    get: function () {
      return new NextRequest(input, { ...initRequest })
    },
    getRequestAndData: function () {
      return { request: this.get(), body: String(init?.body || '') };
    },
    getWithFetch: function () {
      return fetch(input, { ...initRequest })
    },
  }

  const actions = {
    custom: function () {
      return bundle;
    },
    withAuth: function (options?: { cache: boolean }) {
      if (!options?.cache) initRequest = { ...initRequest, cache: "no-store" }
      // const newHeaders = { ...initRequest.headers, "Authorization": `Bearer ${cookieStore.get("session")?.value}` };
      // initRequest = { ...initRequest, headers: newHeaders };
      return bundle;
    },
  };

  return actions;
};

// async function getJwt() {
//   const jwt: { username?: string, roles?: string } = await validateToken(cookieStore.get("session")?.value || "").catch(() => ({}))
//   return jwt
// }

// export async function generateLogMetadata({ request, body }: { request: NextRequest, body?: string }): Promise<LogMetadata> {
//   const jwt = await getJwt()

//   return {
//     method: request.method,
//     url: request.url,
//     query: request.nextUrl.searchParams.toString(),
//     body,
//     username: jwt?.username,
//     roles: jwt?.roles
//   }
// }

export async function processResponse(promise: Promise<Response>, options: {}): Promise<ActionResponse<{ response: Response }, {}>> {
  try {
    const response = await promise
    return {
      success: true,
      message: "Fetch Success",
      response
    }
  } catch (e: any) {
    return {
      success: false,
      error: e.message
    }
  }
}

export async function validateResponse(response: Response, options: { extend?: (response: Response,) => ActionResponse<{}> }): Promise<ActionResponse<{}>> {
  if (response.status === 401) {
    return {
      success: false,
      error: "Unauthorized",
    }
  }

  if (response.status === 502) {
    return {
      success: false,
      error: "Bad Gateway",
    }
  }

  const extend = options.extend?.(response)
  if (extend) return extend

  return {
    success: true,
    message: "Validate response success"
  }
}

export async function extractPayload<T>(response: Response, options: {}): Promise<ActionResponse<{ payload: T }, {}>> {
  try {
    const payload: T = await response.json()
    return {
      success: true,
      message: "Extract payload success",
      payload
    }
  } catch (e: any) {
    console.info(e)
    return {
      success: false,
      error: "Internal Server Error"
    }
  }
}

export async function transformResponse<T>(promise: Promise<Response>, options?: { request: NextRequest, body?: string }): Promise<ActionResponse<{ data: T }, {}>> {
  const processed = await processResponse(promise, {})
  if (!processed.success) {
    return processed
  }

  const { response } = processed

  const validated = await validateResponse(response, {})
  if (!validated.success) {
    return validated
  }

  const extracted = await extractPayload<GetResponse<T>>(response, {})
  if (!extracted.success) {
    return extracted
  }

  const { payload } = extracted

  if (!payload.success && payload.errors) {
    const errorMessage = Object.values(payload.errors).flat().join(", ")
    return {
      success: false,
      error: Object.values(payload.errors).flat().join(", ")
    }
  }

  if (!payload.success) {
    return {
      success: false,
      error: payload.message
    }
  }

  return {
    success: true,
    message: payload.message,
    data: payload.data
  }
}
