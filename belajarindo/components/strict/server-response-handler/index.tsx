"use client"

import {toast} from "sonner";
import {useEffect} from "react";

export default function ServerResponseHandler({ success, error }: {success: boolean, message?: string, error?: string}) {
    useEffect(() => {
        if (!success) {
            toast.error(`Something went wrong. ${error}`)
        }
    }, [success, error])

    return null
}