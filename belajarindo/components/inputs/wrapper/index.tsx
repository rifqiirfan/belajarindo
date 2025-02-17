import React from "react";
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {cn} from "@/lib/utils";

type InputWrapperProps = {
    label: React.ReactNode
    description?: string
    required?: boolean
}

const InputWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & InputWrapperProps>(
    ({children, label, description, required, ...props}, ref) => {
        return (
            <FormItem ref={ref} {...props}>
                <FormLabel className={cn(required && "required")}>{label}</FormLabel>
                <FormControl>
                    {children}
                </FormControl>
                <FormDescription>{description}</FormDescription>
                <FormMessage/>
            </FormItem>
        )
    }
)
InputWrapper.displayName = "InputWrapper"

export default InputWrapper
