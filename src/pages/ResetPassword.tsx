
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import AuthLayout from "@/components/AuthLayout";
import { Eye, EyeOff, Lock, Check, X } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const [validationChecks, setValidationChecks] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
    passwordsMatch: false
  });

  // Check if user came from the validation flow
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      // Redirect back if no email is stored (user didn't go through the flow)
      toast({
        title: "Invalid request",
        description: "Please start the password reset process from the beginning.",
        variant: "destructive",
      });
      navigate("/forgot-password");
    }
  }, [navigate, toast]);

  // Validate password as user types
  useEffect(() => {
    const { password, confirmPassword } = formData;
    
    setValidationChecks({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
      passwordsMatch: password === confirmPassword && password !== ""
    });
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isPasswordStrong = () => {
    // Require at least 4 of the 5 validation checks to pass
    const { minLength, hasUppercase, hasLowercase, hasNumber, hasSpecial } = validationChecks;
    const passedChecks = [minLength, hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;
    return passedChecks >= 4;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validationChecks.passwordsMatch) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isPasswordStrong()) {
      toast({
        title: "Password too weak",
        description: "Please create a stronger password that meets the requirements.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real application, this would connect to Supabase
      console.log("Reset password:", formData.password);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Password reset successful",
        description: "Your password has been reset. You can now sign in with your new password.",
      });
      
      // Clear session storage
      sessionStorage.removeItem("resetEmail");
      
      // Navigate to sign in page
      setTimeout(() => navigate("/signin"), 1000);
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: "We couldn't reset your password. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Set new password" 
      subtitle="Create a new secure password for your account"
    >
      <Card className="p-6 shadow-sm border animate-fade-up backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock size={18} />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Password strength indicators */}
            <div className="grid grid-cols-2 gap-2 text-xs mt-2">
              <div className={`flex items-center ${validationChecks.minLength ? 'text-green-600' : 'text-muted-foreground'}`}>
                {validationChecks.minLength ? <Check size={12} className="mr-1" /> : <X size={12} className="mr-1" />}
                At least 8 characters
              </div>
              <div className={`flex items-center ${validationChecks.hasUppercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                {validationChecks.hasUppercase ? <Check size={12} className="mr-1" /> : <X size={12} className="mr-1" />}
                Uppercase letter
              </div>
              <div className={`flex items-center ${validationChecks.hasLowercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                {validationChecks.hasLowercase ? <Check size={12} className="mr-1" /> : <X size={12} className="mr-1" />}
                Lowercase letter
              </div>
              <div className={`flex items-center ${validationChecks.hasNumber ? 'text-green-600' : 'text-muted-foreground'}`}>
                {validationChecks.hasNumber ? <Check size={12} className="mr-1" /> : <X size={12} className="mr-1" />}
                Number
              </div>
              <div className={`flex items-center ${validationChecks.hasSpecial ? 'text-green-600' : 'text-muted-foreground'}`}>
                {validationChecks.hasSpecial ? <Check size={12} className="mr-1" /> : <X size={12} className="mr-1" />}
                Special character
              </div>
            </div>
            
            {/* Password strength bar */}
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  formData.password === "" ? "w-0" :
                  isPasswordStrong() ? "w-full bg-green-500" :
                  validationChecks.minLength && (validationChecks.hasUppercase || validationChecks.hasLowercase) ? "w-1/2 bg-yellow-500" :
                  "w-1/4 bg-red-500"
                }`}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock size={18} />
              </div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`pl-10 pr-10 ${
                  formData.confirmPassword && !validationChecks.passwordsMatch 
                    ? "border-red-500 focus-visible:ring-red-500" 
                    : ""
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formData.confirmPassword && !validationChecks.passwordsMatch && (
              <p className="text-xs text-red-500 mt-1">
                Passwords don't match
              </p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full animate-hover-rise" 
            disabled={loading || !isPasswordStrong() || !validationChecks.passwordsMatch}
          >
            {loading ? "Resetting password..." : "Reset password"}
          </Button>
        </form>
      </Card>

      <div className="mt-4 text-center text-sm text-muted-foreground animate-fade-up">
        Remember your password?{" "}
        <Link to="/signin" className="text-primary underline hover:text-primary/80 transition-colors">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
