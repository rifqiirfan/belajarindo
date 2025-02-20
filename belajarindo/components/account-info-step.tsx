import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AccountInfoProps = {
  formData: {
    username: string
    password: string
  }
  updateFormData: (data: Partial<AccountInfoProps["formData"]>) => void
}

export default function AccountInfoStep({ formData, updateFormData }: AccountInfoProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={formData.username}
          onChange={(e) => updateFormData({ username: e.target.value })}
          placeholder="Enter username (min. 5 characters)"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => updateFormData({ password: e.target.value })}
          placeholder="Enter password"
        />
        <div className="text-sm text-muted-foreground">
          Password must contain:
          <ul className="list-disc list-inside">
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character (recommended)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}