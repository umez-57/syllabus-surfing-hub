import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full neo-border monster-white text-monster-black font-mono font-bold px-4 py-3 ring-offset-background placeholder:text-monster-gray focus-visible:outline-none focus-visible:translate-x-[-2px] focus-visible:translate-y-[-2px] focus-visible:shadow-[6px_6px_0px_#000] disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-150",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }