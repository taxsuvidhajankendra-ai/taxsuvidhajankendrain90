import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Download, RefreshCw, FileText, Users, LayoutDashboard, MessageCircle, Eye } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import logo from "@/assets/logo.jpg";

type Submission = Tables<"submissions">;

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  const checkAdminAndLoad = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin"); return; }

    const { data: roleData } = await supabase
      .from("user_roles").select("role").eq("user_id", user.id);

    const roles = (roleData || []).map((r) => r.role);
    const hasAccess = roles.some((r) => ["admin", "owner", "worker"].includes(r));

    if (!hasAccess) {
      await supabase.auth.signOut();
      toast.error("Access denied.");
      navigate("/admin");
      return;
    }
    loadSubmissions();
  };

  const loadSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("submissions").select("*").order("created_at", { ascending: false });
    if (error) { toast.error("Failed to load submissions"); console.error(error); }
    else setSubmissions(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const exportCSV = () => {
    if (!submissions.length) return;
    const headers = ["Date", "Full Name", "Mobile", "Email", "City", "Service", "Status", "Description", "Documents"];
    const rows = submissions.map(s => [
      new Date(s.created_at).toLocaleString(),
      s.full_name, s.mobile_number, s.email, s.city, s.service, s.status,
      s.description || "", (s.document_paths || []).join("; "),
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const viewDocument = async (path: string) => {
    const { data, error } = await supabase.storage.from("documents").createSignedUrl(path, 3600);
    if (error || !data?.signedUrl) { toast.error("Could not access document"); return; }
    window.open(data.signedUrl, "_blank");
  };

  const downloadDocument = async (path: string) => {
    const { data, error } = await supabase.storage.from("documents").createSignedUrl(path, 3600);
    if (error || !data?.signedUrl) { toast.error("Could not download document"); return; }
    const a = document.createElement("a");
    a.href = data.signedUrl;
    a.download = path.split("/").pop() || "document";
    a.click();
  };

  const totalDocs = submissions.reduce((acc, s) => acc + (s.document_paths?.length || 0), 0);
  const counts = {
    total: submissions.length,
    new: submissions.filter(s => s.status === "New").length,
    inProgress: submissions.filter(s => s.status === "In Progress").length,
    completed: submissions.filter(s => s.status === "Completed").length,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header with Logo */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="h-1 bg-tricolor-bar w-full" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Tax Suvidha Jan Kendra" className="h-10 w-10 rounded-lg object-contain" />
              <div>
                <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4 text-secondary" />
                  Admin Dashboard
                </h1>
                <p className="text-xs text-muted-foreground">Tax Suvidha Jan Kendra</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={loadSubmissions} className="p-2 rounded-xl border border-input hover:bg-muted transition-colors" title="Refresh">
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </button>
              <Link to="/admin/talk-with-customer" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                <MessageCircle className="h-4 w-4" /> CRM
              </Link>
              <button onClick={exportCSV} className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-input text-sm font-medium hover:bg-muted transition-colors">
                <Download className="h-4 w-4" /> Export
              </button>
              <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-destructive/10 text-destructive font-medium text-sm hover:bg-destructive/20 transition-colors">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-primary/10"><Users className="h-4 w-4 text-primary" /></div>
              <span className="text-xs font-medium text-muted-foreground">Total</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{counts.total}</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-blue-50"><FileText className="h-4 w-4 text-blue-600" /></div>
              <span className="text-xs font-medium text-muted-foreground">New</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{counts.new}</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-50"><RefreshCw className="h-4 w-4 text-amber-600" /></div>
              <span className="text-xs font-medium text-muted-foreground">In Progress</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{counts.inProgress}</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-emerald-50"><Users className="h-4 w-4 text-emerald-600" /></div>
              <span className="text-xs font-medium text-muted-foreground">Completed</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{counts.completed}</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-purple-50"><FileText className="h-4 w-4 text-purple-600" /></div>
              <span className="text-xs font-medium text-muted-foreground">Documents</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalDocs}</p>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="flex sm:hidden gap-2">
          <Link to="/admin/talk-with-customer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent text-accent-foreground font-medium text-sm">
            <MessageCircle className="h-4 w-4" /> CRM
          </Link>
          <button onClick={exportCSV} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-input text-sm font-medium">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No submissions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-card rounded-2xl border border-border shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Mobile</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">City</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Service</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Docs</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{new Date(s.created_at).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{s.full_name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.mobile_number}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.city}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium">{s.service}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        s.status === "New" ? "bg-blue-50 text-blue-700" :
                        s.status === "In Progress" ? "bg-amber-50 text-amber-700" :
                        "bg-emerald-50 text-emerald-700"
                      }`}>{s.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      {(s.document_paths || []).length > 0 ? (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground text-xs">{s.document_paths!.length} file(s)</span>
                          <button onClick={() => viewDocument(s.document_paths![0])} className="p-1 rounded hover:bg-muted" title="View">
                            <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                          <button onClick={() => downloadDocument(s.document_paths![0])} className="p-1 rounded hover:bg-muted" title="Download">
                            <Download className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
