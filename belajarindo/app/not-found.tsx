import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function notFound() {
    return(
        <div>
            <h2>Page Not Found</h2>
            <Button variant="outline" size="lg">
              <Link href="/" legacyBehavior passHref>Back to home</Link>
            </Button>
        </div>
    )
}