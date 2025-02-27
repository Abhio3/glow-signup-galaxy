
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/AuthLayout";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const SignUp = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Please agree to terms",
        description: "You must agree to the terms and conditions to create an account.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real application, this would connect to Supabase
      console.log("Sign up with:", formData);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Account created!",
        description: "We've created your account for you.",
      });
      
      // In a real application, we would navigate to the dashboard or verify email page
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your sign up request failed. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Enter your information to get started"
    >
      <Card className="p-6 shadow-sm border animate-fade-up backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User size={18} />
              </div>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Mail size={18} />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
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
                minLength={8}
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
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="agreeToTerms" 
              checked={formData.agreeToTerms}
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor="agreeToTerms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link to="/terms" className="text-primary underline hover:text-primary/80 transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary underline hover:text-primary/80 transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <Button type="submit" className="w-full animate-hover-rise" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Card>

      <div className="mt-4 text-center text-sm text-muted-foreground animate-fade-up">
        Already have an account?{" "}
        <Link to="/signin" className="text-primary underline hover:text-primary/80 transition-colors">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
