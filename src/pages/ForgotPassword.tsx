
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import AuthLayout from "@/components/AuthLayout";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real application, this would connect to Supabase
      console.log("Password reset request for:", email);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Email validated",
        description: "Please proceed to verify your identity.",
      });
      
      // Store email in sessionStorage to use in the next page
      sessionStorage.setItem("resetEmail", email);
      
      // Navigate to validate email page
      navigate("/validate-email");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "We couldn't validate your email. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Reset your password" 
      subtitle="Enter your email to begin the password reset process"
    >
      <Card className="p-6 shadow-sm border animate-fade-up backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Mail size={18} />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              We'll verify your email and then send a verification code to it.
            </p>
          </div>
          
          <Button type="submit" className="w-full animate-hover-rise" disabled={loading}>
            {loading ? "Validating..." : "Continue"}
          </Button>
        </form>
      </Card>

      <div className="mt-4 text-center text-sm animate-fade-up">
        <Link 
          to="/signin" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
