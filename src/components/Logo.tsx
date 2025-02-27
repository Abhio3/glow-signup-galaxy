
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-primary">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 rounded-sm bg-primary-foreground animate-spin-slow"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-primary-foreground"></div>
        </div>
      </div>
      <span className="text-xl font-semibold">Acme Inc</span>
    </div>
  );
};

export default Logo;
