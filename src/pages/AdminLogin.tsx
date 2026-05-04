import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASSWORD = "krishna777";

export default function AdminLogin() {
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (pwd === ADMIN_PASSWORD) {
        sessionStorage.setItem("admin_ok", "1");
        toast.success("Welcome, Owner 🙏");
        nav("/admin/dashboard");
      } else {
        toast.error("गलत पासवर्ड");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black grid place-items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,#FF9933_0%,transparent_60%)]" />
      <div className="tricolor-bar h-1.5 absolute top-0 inset-x-0" />

      <form onSubmit={submit} className="relative w-full max-w-md bg-zinc-950/80 backdrop-blur border border-amber-500/30 rounded-2xl p-8 shadow-[0_0_60px_rgba(255,153,51,0.15)]">
        <div className="text-center mb-6">
          <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-orange-600 grid place-items-center shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div className="mt-3 inline-block bg-amber-500/15 text-amber-400 text-xs px-3 py-1 rounded-full border border-amber-500/30">OWNER PANEL</div>
          <h1 className="mt-3 text-2xl font-bold text-white">Tax Suvidha Jan Kendra</h1>
          <p className="text-sm text-zinc-400 mt-1">केवल मालिक के लिए • Admin Access</p>
        </div>

        <div>
          <label className="block text-sm text-zinc-300 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-3 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button disabled={loading} className="mt-6 w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg disabled:opacity-50 inline-flex items-center justify-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Enter Owner Panel
        </button>

        <p className="mt-6 text-xs text-zinc-500 text-center">🛡️ Authorized Access Only • Tax Suvidha Jan Kendra © 2026</p>
      </form>
    </div>
  );
}
