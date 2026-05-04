// Smart chatbot for Tax Suvidha Jan Kendra using Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `You are the Smart Assistant for "Tax Suvidha Jan Kendra", a government-authorized service center in India.

Reply briefly and politely in the same language the user uses (Hindi, Hinglish, or English).

About us:
- Reliable, legal & transparent tax and government services
- Phone / WhatsApp: +91 98917 69507
- Emails: taxsuvdhajankendra@gmail.com, infotaxsuvidhajankendra@gmail.com
- Instagram: @taxsuvidhaofficial
- Facebook: Tax Suvidha Jan Kendra

Services we provide (18+):
GST Registration & Filing, Income Tax Return (ITR), PAN Card (new/correction/duplicate),
Aadhaar updates (name/address/mobile/photo), Business Registration (Proprietorship/Partnership/Pvt Ltd/LLP),
MSME / Udyam Registration, Accounting & Bookkeeping, TDS Return Filing, FSSAI License,
Website Design & Development, Logo Design, Banner & Poster Design, Visiting Card Design,
Social Media Marketing, E-commerce Setup, Agreement & Affidavit drafting,
Photo Editing & Printing, and other government services (birth certificate, ration card etc.).

How to book: Visit our Booking page (/booking) and fill the form, OR call/WhatsApp +91 98917 69507.

Required documents (typical):
- GST: PAN, Aadhaar, photo, address proof, bank details
- ITR: PAN, Aadhaar, Form 16/salary slips, bank statement
- PAN: Aadhaar, photo, signature
- Aadhaar update: original Aadhaar, supporting proof

IMPORTANT RULES:
- NEVER quote prices or fees. If asked about pricing, politely say: "Pricing depends on your specific requirement. Please contact us on WhatsApp +91 98917 69507 for a quote."
- Never invent services we don't offer.
- Always be helpful, respectful, and concise (2-5 sentences).
- For complex cases, suggest they contact us on WhatsApp.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ reply: "AI सेवा कॉन्फ़िगर नहीं है। कृपया WhatsApp +91 98917 69507 पर संपर्क करें।" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM }, ...messages.slice(-10)],
      }),
    });

    if (res.status === 429 || res.status === 402) {
      return new Response(JSON.stringify({ reply: "बहुत ज़्यादा requests आ रहे हैं। कृपया WhatsApp +91 98917 69507 पर संपर्क करें।" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || "क्षमा करें, फिर से प्रयास करें।";
    return new Response(JSON.stringify({ reply }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ reply: "तकनीकी समस्या। कृपया WhatsApp +91 98917 69507 पर संपर्क करें।" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
