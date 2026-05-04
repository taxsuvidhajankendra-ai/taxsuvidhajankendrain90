import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string };

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "नमस्ते 🙏 मैं Tax Suvidha Jan Kendra का Smart Assistant हूँ। आप GST, ITR, PAN, Aadhaar, Website Design — कोई भी सवाल पूछ सकते हैं।" },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...msgs, { role: "user" as const, content: text }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("chat-bot", { body: { messages: next } });
      if (error) throw error;
      setMsgs([...next, { role: "assistant", content: data?.reply || "क्षमा करें, फिर से प्रयास करें।" }]);
    } catch (e: any) {
      setMsgs([...next, { role: "assistant", content: "आप हमें WhatsApp +91 98917 69507 पर भी संपर्क कर सकते हैं।" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-44 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lg hover:scale-105 transition"
        aria-label="Chat"
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[92vw] sm:w-96 h-[28rem] bg-card border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-primary text-primary-foreground p-3">
            <div className="font-semibold">Smart Assistant</div>
            <div className="text-xs opacity-80">Tax Suvidha Jan Kendra</div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-secondary/30">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start"><div className="bg-card border px-3 py-2 rounded-lg"><Loader2 className="h-4 w-4 animate-spin" /></div></div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="अपना सवाल लिखें..."
              className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" disabled={loading} className="bg-primary text-primary-foreground px-3 rounded-md disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
