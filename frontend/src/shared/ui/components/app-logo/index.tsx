interface AppLogoProps {
  compact?: boolean;
}

export function AppLogo({ compact = false }: AppLogoProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
          ☁
        </div>

        <span className="font-bold tracking-tight">
          JC
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
        ☁
      </div>

      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight">
          JAY CLOUD
        </span>

        <span className="text-xs text-muted-foreground">
          Self Hosted Platform
        </span>
      </div>
    </div>
  );
}