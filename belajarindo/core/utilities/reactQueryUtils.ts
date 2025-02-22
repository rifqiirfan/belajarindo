import { ActionResponse } from "@/core/types/response";
import { toast } from "sonner";

export async function queryFnResponseHandler<T extends Record<string, any>>(promise: Promise<ActionResponse<T>>) {
	const res = await promise

	if (!res.success) {
		toast.error(res?.error ?? 'Something went wrong.')
	}

	return res
}

export async function fetchResponseHandler<T extends Record<string, any>>(res: ActionResponse<T>) {
	if (!res.success) {
		toast.error(res?.error ?? 'Something went wrong.')
	}

	return res
}