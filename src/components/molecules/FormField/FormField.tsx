"use client";

import * as React from "react";
import { Label } from "@/components/atoms/Label";
import { Input, type InputProps } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface FormFieldProps extends InputProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      className,
      label,
      description,
      error,
      required,
      optional,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const fieldId = id || generatedId;
    const descriptionId = `${fieldId}-description`;
    const errorId = `${fieldId}-error`;

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label
            htmlFor={fieldId}
            required={required}
            optional={optional}
            variant={error ? "error" : "default"}
          >
            {label}
          </Label>
        )}
        {description && (
          <Text
            variant="small"
            color="muted"
            id={descriptionId}
            className="mt-1"
          >
            {description}
          </Text>
        )}
        <Input
          ref={ref}
          id={fieldId}
          error={error}
          aria-describedby={
            error ? errorId : description ? descriptionId : undefined
          }
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <Text variant="small" color="error" id={errorId} className="mt-1">
            {error}
          </Text>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };
