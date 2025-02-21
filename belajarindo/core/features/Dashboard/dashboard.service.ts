"use server"

import { BASE_URL } from "@/core/utilities/envUtils";
import {nextRequestChain, transformResponse} from "@/core/utilities/fetchUtils";
import {ActionGetData, ActionGetListData, ActionResponse, GetData} from "@/core/types/response";
import {revalidateTag} from "next/cache";
import { getOnErrorDataResponse, getOnErrorDatatableResponse, getOnSuccessDataResponse, getOnSuccessDatatableResponse } from "@/lib/handling";

const urls = `${BASE_URL()}`;
const TAGS = 'dashboard';

export async function getStatisticDashboard({ query }: { query?: URLSearchParams | string }): Promise<ActionResponse<ActionGetListData<any>>> {
  const r = nextRequestChain(`${urls}/v1/statistic-dashboard?${query?.toString()}`, {
    next: {
      tags: [TAGS, 'statistic'],
    }
  }).withAuth({ cache: false })

  const payload = await transformResponse<GetData<any>>(r.getWithFetch(), r.getRequestAndData())

  console.log({payload})

  if (!payload.success) {
    return getOnErrorDatatableResponse({error: payload.error})
  }

  return getOnSuccessDatatableResponse({message: payload.message, data: payload.data?.rows, rowCount: payload.data?.count})
}