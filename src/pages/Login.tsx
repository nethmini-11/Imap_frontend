import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  ArrowRight,
  Bell,
  Mail,
  Shield,
  Zap,
  Sparkles,
  Cloud,
  Lock,
  Search,
  Brain,
} from "lucide-react";
import { Button } from "../components/ui/Button";

export const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/*  Background with Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${
                4 + Math.random() * 3
              }s infinite ease-in-out ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/*  Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] mb-8 relative shadow-2xl shadow-cyan-500/20">
              <Mail className="w-10 h-10 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-6xl font-black text-white mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              MailView
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Redefining email experience with AI-powered intelligence.
              <span className="text-cyan-300 font-medium">
                {" "}
                Smarter, faster, and beautifully designed.
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Card */}
            <div className="relative order-2 lg:order-1">
              <div className="relative">
                {/*  Card */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-12 border border-white/10 shadow-2xl shadow-black/30">
                  <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
                      <Cloud className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-3">
                      Welcome Back
                    </h2>
                    <p className="text-slate-400 text-lg">
                      Sign in to continue your journey
                    </p>
                  </div>

                  <Button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl border-0 flex items-center justify-center gap-3 group text-lg h-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                      className="w-6 h-6"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248.1 504 110.8 504 0 393.2 0 256S110.8 8 248.1 8c66.5 0 122.4 24.4 165.2 64.6l-67 64.5C309.8 108.7 281.9 96 248.1 96c-84.1 0-152.4 68.3-152.4 160s68.3 160 152.4 160c97.6 0 134.2-70 139.8-106H248.1v-85.3h239.9c2.3 12.6 3.8 25.2 3.8 40.1z"
                      />
                    </svg>
                    Continue with Google
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {/* Stats */}
                  <div className="mt-12 grid grid-cols-3 gap-6 text-center">
                    <div className="text-slate-300">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
                        <Shield className="w-6 h-6 text-emerald-400" />
                      </div>
                      <span className="text-sm font-semibold">Secure</span>
                    </div>
                    <div className="text-slate-300">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
                        <Zap className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className="text-sm font-semibold">Fast</span>
                    </div>
                    <div className="text-slate-300">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
                        <Brain className="w-6 h-6 text-purple-400" />
                      </div>
                      <span className="text-sm font-semibold">AI Powered</span>
                    </div>
                  </div>

                  <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-xs text-slate-400 text-center leading-relaxed">
                      Join 50,000+ professionals who trust MailView with their
                      communication. Enterprise-grade security with
                      zero-compromise on performance.
                    </p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Right Column -  Feature Cards */}
            <div className="space-y-8 order-1 lg:order-2">
              {/* Card 1 -  Effect */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Quantum Encryption
                      </h3>
                      <p className="text-cyan-200 text-sm">
                        Military-grade security
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    End-to-end quantum-resistant encryption ensures your
                    communications remain private, even against future threats.
                  </p>
                </div>
              </div>

              {/* Card 2  */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Neural Processing
                      </h3>
                      <p className="text-purple-200 text-sm">
                        AI-powered efficiency
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    Our neural networks learn your communication patterns to
                    prioritize what matters most, saving you hours every week.
                  </p>
                </div>
              </div>

              {/* Card 3  */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Cognitive Search
                      </h3>
                      <p className="text-emerald-200 text-sm">
                        Understands context
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    Find anything with natural language queries. Our AI
                    understands context, sentiment, and meaning, not just
                    keywords.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*  Footer */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center space-x-8 text-slate-400 text-sm">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>99.99% Uptime</span>
              </span>
              <span>•</span>
              <span>GDPR & SOC2 Compliant</span>
              <span>•</span>
              <span>50K+ Active Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
