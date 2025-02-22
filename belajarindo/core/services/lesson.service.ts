"use server"

import { BASE_URL } from "@/core/utilities/envUtils";
import {nextRequestChain, transformResponse} from "@/core/utilities/fetchUtils";
import {ActionGetData, ActionGetListData, ActionResponse, GetData} from "@/core/types/response";
import {revalidateTag} from "next/cache";
import { getOnErrorDataResponse, getOnErrorDatatableResponse, getOnSuccessDataResponse, getOnSuccessDatatableResponse } from "@/lib/handling";
import { LessonsDataTypes, LessonsRelationDataTypes } from "../models/lesson.model";

const urls = `${BASE_URL()}/v1/lessons`;
const TAGS = 'lessons';

export async function getLessons({ query }: { query?: URLSearchParams | string }): Promise<ActionResponse<ActionGetListData<LessonsDataTypes>>> {
  const r = nextRequestChain(`${urls}?${query?.toString()}`, {
    next: {
      tags: [TAGS],
    }
  }).withAuth({ cache: false })

  const payload = await transformResponse<GetData<LessonsDataTypes>>(r.getWithFetch(), r.getRequestAndData())

  if (!payload.success) {
    return getOnErrorDatatableResponse({error: payload.error})
  }

  return getOnSuccessDatatableResponse({message: payload.message, data: payload.data?.rows, rowCount: payload.data?.count})
}

export async function getLessonsRelation({ query }: { query?: URLSearchParams | string }): Promise<ActionResponse<ActionGetListData<LessonsRelationDataTypes>>> {
  const r = nextRequestChain(`${urls}-relation?${query?.toString()}`, {
    next: {
      tags: [TAGS],
    }
  }).withAuth({ cache: false })

  const payload = await transformResponse<GetData<LessonsRelationDataTypes>>(r.getWithFetch(), r.getRequestAndData())

  if (!payload.success) {
    return getOnErrorDatatableResponse({ error: payload.error })
  }

  return getOnSuccessDatatableResponse({ message: payload.message, data: payload.data?.rows, rowCount: payload.data?.count })
}

export async function getLessonsByCourse({ course_id, query }: { course_id: string, query?: URLSearchParams | string }): Promise<ActionResponse<ActionGetListData<LessonsRelationDataTypes>>> {
  const r = nextRequestChain(`${urls}-courses/${course_id}?${query?.toString()}`, {
    next: {
      tags: [TAGS],
    }
  }).withAuth({ cache: false })

  const payload = await transformResponse<GetData<LessonsRelationDataTypes>>(r.getWithFetch(), r.getRequestAndData())

  if (!payload.success) {
    return getOnErrorDatatableResponse({ error: payload.error })
  }

  return getOnSuccessDatatableResponse({ message: payload.message, data: payload.data?.rows, rowCount: payload.data?.count })
}

export async function getLessonsDashboard({ query }: { query?: URLSearchParams | string }): Promise<ActionResponse<ActionResponse<any>>> {
  const r = nextRequestChain(`${urls}-dashboard?${query?.toString()}`, {
    next: {
      tags: [TAGS],
    }
  }).withAuth({ cache: false })

  const payload = await transformResponse<GetData<LessonsRelationDataTypes>>(r.getWithFetch(), r.getRequestAndData())

  if (!payload.success) {
    return getOnErrorDatatableResponse({ error: payload.error })
  }

  return getOnSuccessDatatableResponse({ message: payload.message, data: payload.data?.rows, rowCount: payload.data?.count })
}

export async function getLessonById({ id, query }: { id: string, query?: URLSearchParams }): Promise<ActionResponse<ActionGetData<LessonsDataTypes>, ActionGetData<{}>>> {
  const r = nextRequestChain(`${urls}/${id}?${query?.toString()}`, {
    next: {
      tags: [TAGS],
    }
  }).withAuth({ cache: false })

  const payload = await transformResponse<GetData<LessonsDataTypes>>(r.getWithFetch(), r.getRequestAndData())

  if (!payload.success) {
    return getOnErrorDataResponse({error: payload.error})
  }

  return getOnSuccessDataResponse({message: payload.message, data: payload.data?.rows[0]})
}

export async function createLesson<T>({ data }: { data: T }): Promise<ActionResponse> {
  const r = nextRequestChain(`${urls}`, {
    method: "POST",
    body: JSON.stringify(data)
  }).withAuth()

  const payload = await transformResponse(r.getWithFetch(), r.getRequestAndData())
  revalidateTag(TAGS);

  return payload;
}

export async function updateLesson<T>({ data }: { data: T }): Promise<ActionResponse> {
  const r = nextRequestChain(`${urls}`, {
    method: "PUT",
    body: JSON.stringify(data)
  }).withAuth()

  const payload = await transformResponse(r.getWithFetch(), r.getRequestAndData())
  revalidateTag(TAGS);

  return payload;
}

export async function deleteLesson({ id }: { id: string }): Promise<ActionResponse> {
  const r = nextRequestChain(`${urls}`, {
    method: "DELETE",
    body: JSON.stringify({ id })
  }).withAuth()

  const payload = await transformResponse(r.getWithFetch(), r.getRequestAndData());
  revalidateTag(TAGS);

  return payload
}