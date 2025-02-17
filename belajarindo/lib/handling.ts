import { ActionGetData, ActionGetListData, ResponseFail, ResponseSuccess } from "@/core/types/response";

export function getOnErrorDatatableResponse(options?: { error: string }): ResponseFail & ActionGetListData<never> {
  return {
    success: false,
    error: options?.error || 'Something went wrong.',
    data: [],
    rowCount: 0
  }
}

export function getOnSuccessDatatableResponse<T>(options?: { message: string } & ActionGetListData<T>): ResponseSuccess & ActionGetListData<T> {
  return {
    success: true,
    message: options?.message || "Success",
    data: options?.data ?? [],
    rowCount: options?.rowCount ?? 0
  }
}

export function getOnErrorDataResponse(options?: { error: string }): ResponseFail & ActionGetData {
  return {
    success: false,
    error: options?.error || 'Something went wrong.',
    data: {}
  }
}

export function getOnSuccessDataResponse<T>(options?: { message: string } & ActionGetData<T>): ResponseSuccess & ActionGetData<T> {
  return {
    success: true,
    message: options?.message || "Success",
    data: options!.data
  }
}