"use server"

import { BASE_URL } from "@/core/utilities/envUtils";
import {nextRequestChain, transformResponse} from "@/core/utilities/fetchUtils";
import {ActionGetData, ActionGetListData, ActionResponse, GetData} from "@/core/types/response";
import {revalidateTag} from "next/cache";
import { getOnErrorDataResponse, getOnErrorDatatableResponse, getOnSuccessDataResponse, getOnSuccessDatatableResponse } from "@/lib/handling";

const urls = `${BASE_URL()}`;
const TAGS = 'dashboard';

export async function getStatisticDashboard({ query }: { query?: URLSearchParams | string }): Promise<any> {
  const r = nextRequestChain(`${urls}/v1/statistic-dashboard?${query?.toString()}`, {
    next: {
      tags: [TAGS, 'statistic'],
    }
  }).withAuth({ cache: false })

  const payload = await transformResponse<GetData<any>>(r.getWithFetch(), r.getRequestAndData())

  if (!payload.success) {
    return getOnErrorDatatableResponse({error: payload.error})
  }

  return {message: payload.message, data: payload}
}

export async function getMyProgress({ query }: { query?: URLSearchParams | string }): Promise<any> {
  const r = nextRequestChain(`${urls}/v1/my-progress?${query?.toString()}`, {
    next: {
      tags: [TAGS, 'progress'],
    }
  }).withAuth({ cache: false })

  const payload = await transformResponse<GetData<any>>(r.getWithFetch(), r.getRequestAndData())
  if (!payload.success) {
    return getOnErrorDatatableResponse({error: payload.error})
  }

  return {success: true, message: payload.message, data: payload?.data}
}