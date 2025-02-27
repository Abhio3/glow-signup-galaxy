
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import AuthLayout from "@/components/AuthLayout";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real application, this would connect to Supabase
      console.log("Password reset request for:", email);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailSent(true);
      
      toast({
        title: "Check your email",
        description: "We've sent you a password reset link.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "We couldn't send a reset link. Please try again.",
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
      subtitle={emailSent 
        ? "Check your email for a reset link" 
        : "Enter your email and we'll send a reset link"
      }
    >
      <Card className="p-6 shadow-sm border animate-fade-up backdrop-blur-sm">
        {!emailSent ? (
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
                We'll send you a link to reset your password. If you don't see it, check your spam folder.
              </p>
            </div>
            
            <Button type="submit" className="w-full animate-hover-rise" disabled={loading}>
              {loading ? "Sending link..." : "Send reset link"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4 py-2">
            <div className="text-center space-y-2">
              <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Check your email</h3>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset link to <span className="font-medium">{email}</span>
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full animate-hover-rise"
              onClick={() => setEmailSent(false)}
            >
              Didn't receive the email? Try again
            </Button>
          </div>
        )}
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
