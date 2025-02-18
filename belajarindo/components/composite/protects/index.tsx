import { Button } from "@/components/ui/button";
import { getRoles } from "@/core/utilities/authUtils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export async function Protect({ role, fallback, children }: { role: string, fallback: React.ReactNode, children: React.ReactNode }) {
  const USER_ROLE = await getRoles();
  const requiredRoles = role.split(',').map(r => r.trim());

  /* Only consider roles with "org:" prefix as required. */
  const hasRequiredRole = requiredRoles.some(requiredRole => {
    if (!requiredRole.startsWith("org:")) {
      return false;
    }

    return ("org:" + USER_ROLE) === requiredRole;
  });

  if (hasRequiredRole) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

export function ProtectWithBack({ role, children }: { role: string, children: React.ReactNode }) {
  return (
    <Protect role={role}
      fallback={
        <div className="flex items-center justify-center h-1/2">
          <div className="text-center p-6 shadow border border-gray-500 rounded-lg">
            <h1 className="text-xl font-semibold text-red-500 flex gap-2 items-center justify-center"><span>Access Denied</span></h1>
            <p className="text-gray-600 my-6">You do not have the permissions to access this page.</p>
            <Link href="/">
              <Button variant={"outline"} className={"self-start pl-2"}>
                <ChevronLeft />Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      }>
      {children}
    </Protect>
  )
}

export function ProtectDefault({ role, children }: { role: string, children: React.ReactNode }) {
  return <Protect role={role} fallback={<p>You do not have the permissions to access this page.</p>}>{children}</Protect>
}