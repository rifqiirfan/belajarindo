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
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData({ password: e.target.value })}
          required
        />
      </div>
    </div>
  )
}