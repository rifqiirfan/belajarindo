export interface GetResponse<T> {
  message: string
  success: boolean
  errors?: Record<string, string[]>
  data: T
  time_taken_ms: number
}

export type GetData<T> = {
  rows: T[]
  count: number
  current: number
  total_page: number
}

export interface ActionGetListData<T> {
  data: T[]
  rowCount: number
}

export interface ActionGetData<T = {}> {
  data: T
}

export type ResponseSuccess = {
  success: true,
  message: string
}

export type ResponseFail = {
  success: false,
  error: string
}

export type ActionResponse<T extends Record<string, any> = {}, F extends Record<string, any> = T> =
  | (ResponseSuccess & T)
  | (ResponseFail & F);