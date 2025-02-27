
import { cn } from "@/lib/utils";
import Logo from "./Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

const AuthLayout = ({ children, title, subtitle, className }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Image/Brand section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <Logo className="text-primary-foreground" />
          <div className="max-w-md animate-fade-up">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">Transform the way you work with our platform</h2>
            <p className="text-primary-foreground/80">
              Join thousands of professionals who have already upgraded their workflow.
            </p>
          </div>
          <div className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Acme Inc. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right side - Form section */}
      <div className={cn(
        "w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12", 
        className
      )}>
        <div className="w-full max-w-md space-y-8 relative form-shine">
          {/* Mobile logo */}
          <div className="flex lg:hidden mb-8 justify-center">
            <Logo />
          </div>
          
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
