
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import AuthLayout from "@/components/AuthLayout";
import { ArrowLeft, KeyRound, RefreshCw } from "lucide-react";

const ValidateEmail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      // Redirect back to forgot password if no email is stored
      toast({
        title: "Invalid request",
        description: "Please start the password reset process again.",
        variant: "destructive",
      });
      navigate("/forgot-password");
      return;
    }
    setEmail(storedEmail);

    // Set up countdown for resend button
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [navigate, toast]);

  const handleResendCode = async () => {
    setIsResending(true);
    
    try {
      // In a real application, this would connect to Supabase
      console.log("Resending verification code to:", email);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Verification code resent",
        description: "Please check your email for a new code.",
      });
      
      // Reset countdown
      setCountdown(60);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "We couldn't resend the verification code. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real application, this would connect to Supabase
      console.log("Verifying code:", verificationCode, "for email:", email);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any 6-digit code
      if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
        throw new Error("Invalid verification code");
      }
      
      toast({
        title: "Verification successful",
        description: "You can now reset your password.",
      });
      
      // Navigate to reset password page
      navigate("/reset-password");
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "The code you entered is invalid. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Verify your identity" 
      subtitle={`Enter the verification code sent to ${email || "your email"}`}
    >
      <Card className="p-6 shadow-sm border animate-fade-up backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verificationCode">Verification Code</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <KeyRound size={18} />
              </div>
              <Input
                id="verificationCode"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.slice(0, 6))}
                className="pl-10"
                pattern="[0-9]{6}"
                inputMode="numeric"
                maxLength={6}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter the 6-digit verification code that was sent to your email address.
            </p>
          </div>
          
          <Button type="submit" className="w-full animate-hover-rise" disabled={loading}>
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
          
          <div className="text-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs"
              disabled={countdown > 0 || isResending}
              onClick={handleResendCode}
            >
              {isResending ? (
                <>
                  <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                  Resending...
                </>
              ) : countdown > 0 ? (
                `Resend code in ${countdown}s`
              ) : (
                "Resend code"
              )}
            </Button>
          </div>
        </form>
      </Card>

      <div className="mt-4 text-center text-sm animate-fade-up">
        <Link 
          to="/forgot-password" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to reset request
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ValidateEmail;
