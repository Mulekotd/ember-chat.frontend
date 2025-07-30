import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const loaderVariants = cva("inline-block animate-spin", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-12 h-12",
    },
    variant: {
      circular: "",
      dots: "",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "circular",
  },
});

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {
  /**
   * The type of loader to display
   */
  variant?: "circular" | "dots";
  /**
   * The size of the loader
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Custom color for the loader
   */
  color?: string;
  /**
   * Show text alongside the loader
   */
  text?: string;
  /**
   * Position of text relative to loader
   */
  textPosition?: "right" | "bottom";
}

const CircularLoader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ size, color, className, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-4 h-4 border-2",
      md: "w-6 h-6 border-2",
      lg: "w-8 h-8 border-[3px]",
      xl: "w-12 h-12 border-4",
    };

    const currentSize = size || "md";
    const borderColor = color || "border-primary";

    return (
      <div
        ref={ref}
        className={cn(
          "animate-spin rounded-full border-solid border-t-transparent",
          sizeClasses[currentSize],
          `${borderColor} border-t-transparent`,
          className
        )}
        {...props}
      />
    );
  }
);
CircularLoader.displayName = "CircularLoader";

const DotsLoader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ size, color, className, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-1 h-1",
      md: "w-2 h-2",
      lg: "w-3 h-3",
      xl: "w-4 h-4",
    };

    const gapClasses = {
      sm: "gap-1",
      md: "gap-1.5",
      lg: "gap-2",
      xl: "gap-3",
    };

    const currentSize = size || "md";
    const dotColor = color || "bg-primary";

    return (
      <div
        ref={ref}
        className={cn("flex items-center", gapClasses[currentSize], className)}
        {...props}
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              "rounded-full animate-pulse",
              sizeClasses[currentSize],
              dotColor
            )}
            style={{
              animationDelay: `${index * 0.15}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    );
  }
);
DotsLoader.displayName = "DotsLoader";

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  (
    {
      className,
      variant = "circular",
      size = "md",
      color,
      text,
      textPosition = "right",
      ...props
    },
    ref
  ) => {
    const LoaderComponent =
      variant === "circular" ? CircularLoader : DotsLoader;

    const loaderElement = (
      <LoaderComponent
        ref={ref}
        size={size}
        color={color}
        className={className}
        {...props}
      />
    );

    if (!text) {
      return loaderElement;
    }

    const textClasses = cn(
      "text-sm text-muted-foreground",
      {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      }[size]
    );

    if (textPosition === "bottom") {
      return (
        <div className="flex flex-col items-center gap-2">
          {loaderElement}
          <span className={textClasses}>{text}</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        {loaderElement}
        <span className={textClasses}>{text}</span>
      </div>
    );
  }
);
Loader.displayName = "Loader";

export { Loader, loaderVariants };
