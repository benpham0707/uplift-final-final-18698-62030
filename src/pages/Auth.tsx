import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, ArrowLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [ageBracket, setAgeBracket] = useState<'13-17' | '18+' | ''>('');
  const [activeTab, setActiveTab] = useState('signin');
  
  const { user, signUp, signIn, signInWithGoogle, sendMagicLink, requestPasswordReset } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/portfolio-scanner');
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!ageBracket) {
      setError('Please select your age.');
      setLoading(false);
      return;
    }

    if (ageBracket !== '18+') {
      setMessage('Account will require guardian consent before accessing portfolio.');
    }

    const { error } = await signUp(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      setMessage('We sent a verification link. It expires in 15 minutes.');
    }
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      navigate('/portfolio-scanner');
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleMagicLink = async () => {
    if (!email) {
      setMessage('Enter your email and then request a magic link.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    const { error } = await sendMagicLink(email);
    if (error) {
      setMessage('If this email exists, we sent a link. It expires in 15 minutes.');
    } else {
      setMessage('If this email exists, we sent a link. It expires in 15 minutes.');
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage('Enter your email and then request a reset link.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    const { error } = await requestPasswordReset(email);
    if (error) {
      setMessage('If this email exists, we sent a reset link. It expires in 15 minutes.');
    } else {
      setMessage('If this email exists, we sent a reset link. It expires in 15 minutes.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative">
        
        {/* Back Button */}
        <div className="absolute top-8 left-8 z-20">
          <Link to="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-start">
          
          {/* Left Column - Auth Form */}
          <motion.div 
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto w-full self-center"
          >
            <div className="mb-8">
               <img src="/uplift_logo_lr.png" alt="Uplift Logo" className="h-8 mb-6" />
              <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">
                Welcome back
              </h1>
              <p className="text-muted-foreground">
                Enter your details to access your personalized roadmap.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                {activeTab === 'signin' ? (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TabsContent value="signin" className="mt-0" forceMount>
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signin-email">Email</Label>
                          <Input 
                            id="signin-email" 
                            type="email" 
                            placeholder="name@example.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            disabled={loading} 
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="signin-password">Password</Label>
                            <button 
                              type="button" 
                              onClick={handleForgotPassword} 
                              className="text-sm text-primary font-medium hover:underline"
                            >
                              Forgot password?
                            </button>
                          </div>
                          <Input 
                            id="signin-password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            disabled={loading}
                            className="h-11"
                          />
                        </div>
                        <Button type="submit" className="w-full h-11 text-base bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
                          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Log in"}
                        </Button>
                        
                        <div className="relative my-6">
                          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          <Button type="button" variant="outline" onClick={handleGoogle} disabled={loading} className="h-11">
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            Google
                          </Button>
                          <Button type="button" variant="outline" onClick={handleMagicLink} disabled={loading} className="h-11">
                            Email magic link
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TabsContent value="signup" className="mt-0" forceMount>
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <Input 
                            id="signup-email" 
                            type="email" 
                            placeholder="name@example.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            disabled={loading} 
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <Input 
                            id="signup-password" 
                            type="password" 
                            placeholder="Create a password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            disabled={loading}
                            className="h-11" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-age">Age Group</Label>
                          <select 
                            id="signup-age" 
                            className="w-full border rounded-md h-11 px-3 bg-background text-sm" 
                            value={ageBracket} 
                            onChange={(e) => setAgeBracket(e.target.value as any)} 
                            disabled={loading} 
                            required
                          >
                            <option value="">Select your age group</option>
                            <option value="13-17">Student (13–17)</option>
                            <option value="18+">Student (18+) or Parent</option>
                          </select>
                        </div>
                        <Button type="submit" className="w-full h-11 text-base bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
                          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create account"}
                        </Button>
                        
                        <div className="relative my-6">
                          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          <Button type="button" variant="outline" onClick={handleGoogle} disabled={loading} className="h-11">
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            Google
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs>

            {error && (
              <Alert className="mt-6 border-destructive bg-destructive/5">
                <AlertDescription className="text-destructive font-medium">{error}</AlertDescription>
              </Alert>
            )}
            {message && (
              <Alert className="mt-6 border-primary bg-primary/5">
                <AlertDescription className="text-primary font-medium">{message}</AlertDescription>
              </Alert>
            )}
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block relative h-[650px] w-full bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl sticky top-12"
          >
             {/* Background Gradient & Shapes */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-sky-50 to-white dark:from-indigo-950/30 dark:via-sky-950/30 dark:to-slate-950 z-0" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 h-full flex flex-col justify-center px-12 py-12">
              <div className="mb-8">
                <div className="inline-flex items-center rounded-full border bg-white/50 backdrop-blur px-3 py-1 text-xs font-medium text-indigo-600 mb-6 shadow-sm">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Start your journey
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-balance">
                  Join 50,000+ students turning their stories into success.
                </h2>
                <p className="text-muted-foreground text-lg">
                  Get personalized guidance, uncover hidden strengths, and build a portfolio that stands out.
                </p>
              </div>

              {/* Mini Testimonial Card */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 max-w-sm mt-auto">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500" />
                  <div>
                    <p className="font-semibold text-sm">Sarah K.</p>
                    <p className="text-xs text-muted-foreground">Class of 2024</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Uplift helped me realize my summer job was actually a huge leadership asset for my application."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
