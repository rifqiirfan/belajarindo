import { Button } from "@/components/ui/button";
import { getRoles } from "@/core/utilities/authUtils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export async function Protect({ role, fallback, children }: { role: string, fallback: React.ReactNode, children: React.ReactNode }) {
  // const USER_ROLE = await getRoles();
  const requiredRoles = role.split(',').map(r => r.trim());

  /* Only consider roles with "org:" prefix as required. */
  const hasRequiredRole = requiredRoles.some(requiredRole => {
    if (!requiredRole.startsWith("org:")) {
      return false;
    }

    return true;
    // return ("org:" + USER_ROLE) === requiredRole;
  });

  if (hasRequiredRole) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

export function ProtectDefault({ role, children }: { role: string, children: React.ReactNode }) {
  return <Protect role={role} fallback={<p>You do not have the permissions to access this page.</p>}>{children}</Protect>
}