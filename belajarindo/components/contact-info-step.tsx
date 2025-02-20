import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ContactInfoProps = {
  formData: {
    email: string
    phone: string
    address: string
  }
  updateFormData: (data: Partial<ContactInfoProps["formData"]>) => void
}

export default function ContactInfoStep({ formData, updateFormData }: ContactInfoProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="Enter your email address"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          placeholder="Enter your phone number (ex. +628112233445)"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => updateFormData({ address: e.target.value })}
          placeholder="Enter your address"
          required
        />
      </div>
    </div>
  )
}

