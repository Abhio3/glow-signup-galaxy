
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background animate-fade-in">
      <Logo className="mb-8" />
      
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        
        <div className="flex justify-center">
          <Button asChild variant="default" className="animate-hover-rise">
            <Link to="/signin">Return to Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
