import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Shield, LogOut, Users, Clock, CheckCircle2, FileText, Calendar, Download, MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SERVICES } from "@/data/services";

type Submission = {
  id: string;
  full_name: string;
  mobile_number: string;
  email: string | null;
  city: string | null;
  service: string;
  description: string | null;
  status: string | null;
  created_at: string;
  document_paths: string[] | null;
};

const STATUSES = ["new", "in_progress", "completed"];

export default function AdminDashboard() {
  const nav = useNavigate();
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (sessionStorage.getItem("admin_ok") !== "1") {
      nav("/admin");
      return;
    }
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("submissions" as any).select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as any) || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("submissions" as any).update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Status updated");
    setRows(rows.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const logout = () => { sessionStorage.removeItem("admin_ok"); nav("/admin"); };

  const filtered = filter === "all" ? rows : rows.filter((r) => (r.status || "new") === filter);
  const today = new Date().toDateString();
  const stats = {
    total: rows.length,
    new: rows.filter((r) => (r.status || "new") === "new").length,
    progress: rows.filter((r) => r.status === "in_progress").length,
    done: rows.filter((r) => r.status === "completed").length,
    today: rows.filter((r) => new Date(r.created_at).toDateString() === today).length,
    docs: rows.reduce((a, r) => a + (r.document_paths?.length || 0), 0),
  };

  const exportCSV = () => {
    const head = ["Date", "Name", "Mobile", "Email", "City", "Service", "Status", "Description"];
    const lines = [head.join(",")].concat(
      rows.map((r) => [
        new Date(r.created_at).toLocaleString(),
        r.full_name, r.mobile_number, r.email || "", r.city || "",
        serviceTitle(r.service), r.status || "new",
        (r.description || "").replace(/[",\n]/g, " "),
      ].map((v) => `"${v}"`).join(","))
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `bookings-${Date.now()}.csv`; a.click();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="tricolor-bar h-1.5" />
      <header className="border-b border-zinc-800 bg-zinc-900/60 backdrop-blur sticky top-0 z-30">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 grid place-items-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold">Owner Panel</div>
              <div className="text-xs text-zinc-400">Tax Suvidha Jan Kendra</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportCSV} className="hidden sm:inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-md text-sm">
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button onClick={load} className="bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-md text-sm">Refresh</button>
            <button onClick={logout} className="inline-flex items-center gap-1 bg-red-600/80 hover:bg-red-600 px-3 py-2 rounded-md text-sm">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Stat icon={Users} label="Total" value={stats.total} color="text-blue-400" />
          <Stat icon={FileText} label="New" value={stats.new} color="text-amber-400" />
          <Stat icon={Clock} label="In Progress" value={stats.progress} color="text-purple-400" />
          <Stat icon={CheckCircle2} label="Completed" value={stats.done} color="text-green-400" />
          <Stat icon={Calendar} label="Today" value={stats.today} color="text-pink-400" />
          <Stat icon={FileText} label="Documents" value={stats.docs} color="text-cyan-400" />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {["all", ...STATUSES].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-md text-sm capitalize ${filter === s ? "bg-amber-500 text-black font-semibold" : "bg-zinc-800 hover:bg-zinc-700"}`}>
              {s.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-zinc-400"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-zinc-400">कोई booking नहीं मिली।</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-800/60 text-zinc-300">
                  <tr>
                    {["Date", "Customer", "Service", "Status", "Action"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-t border-zinc-800 hover:bg-zinc-800/40">
                      <td className="px-4 py-3 whitespace-nowrap text-zinc-400">{new Date(r.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold">{r.full_name}</div>
                        <div className="text-xs text-zinc-400">{r.mobile_number}{r.city ? ` · ${r.city}` : ""}</div>
                        {r.email && <div className="text-xs text-zinc-500">{r.email}</div>}
                      </td>
                      <td className="px-4 py-3">{serviceTitle(r.service)}</td>
                      <td className="px-4 py-3">
                        <select
                          value={r.status || "new"}
                          onChange={(e) => updateStatus(r.id, e.target.value)}
                          className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs"
                        >
                          {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`https://wa.me/91${r.mobile_number.replace(/\D/g, "").slice(-10)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 bg-green-600/80 hover:bg-green-600 px-2 py-1 rounded text-xs">
                          <MessageCircle className="h-3 w-3" /> WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function serviceTitle(id: string) {
  return SERVICES.find((s) => s.id === id)?.title || id;
}

function Stat({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="text-xs text-zinc-400">{label}</div>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
