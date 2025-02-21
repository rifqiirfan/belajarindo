import { Metadata } from "next";
import FormProfile from "./_components/form";
import {getUserById} from "@/core/services/user.service";
import {getToken, validateToken} from "@/core/utilities/authUtils";

export const metadata: Metadata = {
  title: "Update Profile",
  description: "Update Profile",
};

export default async function Page() {
  const payload = await validateToken(await getToken())

  const res = await getUserById({id: payload.userId})

  return (
    <>
      <h4 className="text-lg font-semibold">Update Profile</h4>
      <FormProfile data={res.data} />
    </>
  )
}