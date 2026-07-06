import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

type AppButtonProps = ComponentProps<typeof Button>;

export function AppButton({
  children,
  ...props
}: AppButtonProps) {
  return (
    <Button
      className="rounded-xl font-medium transition-all duration-300"
      {...props}
    >
      {children}
    </Button>
  );
}