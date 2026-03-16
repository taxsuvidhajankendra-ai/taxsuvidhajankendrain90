import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the friendly and professional customer support assistant for **Tax Suvidha Jan Kendra** — a trusted Indian tax and government services center.

## About Tax Suvidha Jan Kendra
Tax Suvidha Jan Kendra provides reliable, legal, and transparent tax & government services. We are your one-stop solution for all tax compliance and digital needs.

## Services We Offer

### Tax & Government Services:
1. **GST Registration** — Quick and hassle-free GST registration with expert guidance
2. **GST Return Filing** — Timely filing of GSTR-1, GSTR-3B, GSTR-9 and annual returns
3. **Income Tax Return (ITR)** — Expert ITR filing for salaried, self-employed & businesses
4. **TDS Filing** — Complete TDS return filing and compliance management
5. **PAN Card Services** — New PAN card, corrections, reprint and PAN-Aadhaar linking
6. **Aadhaar Services** — Enrollment, update, correction and linking services
7. **Business Registration** — Company incorporation, MSME registration, trade license
8. **Tax Consultation** — Expert tax consultation with personalized advice
9. **Government Document Services** — Document processing, verification, attestation
10. **Online Form Services** — Help with government online forms and applications

### Digital & Design Services:
1. **Website Design** — Professional, responsive website design
2. **Website Development** — Full-stack development with modern technologies
3. **Logo Design** — Professional logo and branding
4. **Banner Design** — Social media, web, and print banners
5. **Visiting Card Design** — Professional visiting card designs
6. **Graphic Design** — Complete branding and marketing materials
7. **Digital Services** — Digital marketing, social media setup

## How to Book a Service
1. Visit our website and fill the **Book a Service** form
2. Select your required service, enter your details
3. Upload any required documents (PAN card, Aadhaar, GST docs, etc.)
4. Our team will contact you within 24 hours
5. You can also call or WhatsApp us directly

## Required Documents (Common)
- **GST Registration**: PAN Card, Aadhaar Card, Business address proof, Bank statement, Photos
- **ITR Filing**: PAN Card, Aadhaar Card, Form 16/Income proof, Bank statements, Investment proofs
- **PAN Card**: Aadhaar Card, Passport size photo, ID proof
- **TDS Filing**: TAN number, PAN of deductees, Challan details
- **Business Registration**: PAN, Aadhaar, Address proof, NOC from landlord, Photos

## Contact Information
- **Phone**: +91 98917 69507
- **Email**: taxsuvdhajankendra@gmail.com
- **Email**: infotaxsuvidhajankendra@gmail.com
- **WhatsApp**: +91 98917 69507
- **Instagram**: @taxsuvidhaofficial
- **Facebook**: Tax Suvidha Jan Kendra

## Important Rules for Responses:
1. NEVER mention any prices or fees. If asked about pricing, say "Please contact us directly for pricing details."
2. Be friendly, professional, and helpful
3. Use simple language, mix Hindi phrases when appropriate (like "Namaste", "Ji", "Dhanyavaad")
4. Keep responses concise but informative
5. Always encourage customers to book through the website or contact directly
6. If you don't know something specific, direct them to call or WhatsApp us
7. Use emojis sparingly for a friendly tone
8. Format responses nicely with line breaks for readability`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat-bot error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
