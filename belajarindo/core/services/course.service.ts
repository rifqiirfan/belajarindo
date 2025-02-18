"use server"

import { BASE_URL } from "@/core/utilities/envUtils";
import { nextRequestChain, transformResponse } from "@/core/utilities/fetchUtils";
import { ActionGetData, ActionGetListData, ActionResponse, GetData } from "@/core/types/response";
import { revalidateTag } from "next/cache";
import { getOnErrorDataResponse, getOnErrorDatatableResponse, getOnSuccessDataResponse, getOnSuccessDatatableResponse } from "@/lib/handling";
import { CoursesDataTypes } from "../models/course.model";

const urls = `${BASE_URL()}/v1/courses`;
const TAGS = 'courses';

export async function getCourses({ query }: { query?: URLSearchParams | string }): Promise<ActionResponse<ActionGetListData<CoursesDataTypes>>> {
	const r = nextRequestChain(`${urls}?${query?.toString()}`, {
		next: {
			tags: [TAGS],
		}
	}).withAuth({ cache: false })

	const payload = await transformResponse<GetData<CoursesDataTypes>>(r.getWithFetch(), r.getRequestAndData())

	if (!payload.success) {
		return getOnErrorDatatableResponse({ error: payload.error })
	}

	return getOnSuccessDatatableResponse({ message: payload.message, data: payload.data?.rows, rowCount: payload.data?.count })
}

export async function getCourseById({ id, query }: { id: string, query?: URLSearchParams }): Promise<ActionResponse<ActionGetData<CoursesDataTypes>, ActionGetData<{}>>> {
	const r = nextRequestChain(`${urls}/${id}?${query?.toString()}`, {
		next: {
			tags: [TAGS],
		}
	}).withAuth({ cache: false })

	const payload = await transformResponse<GetData<CoursesDataTypes>>(r.getWithFetch(), r.getRequestAndData())

	if (!payload.success) {
		return getOnErrorDataResponse({ error: payload.error })
	}

	return getOnSuccessDataResponse({ message: payload.message, data: payload.data?.rows[0] })
}

export async function createCourse<T>({ data }: { data: T }): Promise<ActionResponse> {
	const r = nextRequestChain(`${urls}`, {
		method: "POST",
		body: JSON.stringify(data)
	}).withAuth()


	const payload = await transformResponse(r.getWithFetch(), r.getRequestAndData())
	revalidateTag("v1/asset/customers")

	return payload
}

export async function updateCourse<T>({ data }: { data: T }): Promise<ActionResponse> {
	const r = nextRequestChain(`${urls}`, {
		method: "PUT",
		body: JSON.stringify(data)
	}).withAuth()


	const payload = await transformResponse(r.getWithFetch(), r.getRequestAndData())
	revalidateTag("v1/asset/customers")

	return payload
}

export async function deleteCourse({ id }: { id: string }): Promise<ActionResponse> {
	const r = nextRequestChain(`${urls}`, {
		method: "DELETE",
		body: JSON.stringify({ id })
	}).withAuth()


	const payload = await transformResponse(r.getWithFetch(), r.getRequestAndData());

	revalidateTag("v1/asset/customers");
	return payload
}