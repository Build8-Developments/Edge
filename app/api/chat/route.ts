import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Edge Garments' friendly and professional AI assistant. You help customers learn about our garment manufacturing services with enthusiasm and expertise.

🏭 **About Edge Garments:**
Edge Garments is a leading premium garment manufacturing company based in Egypt, serving fashion brands and retailers worldwide since our establishment. We combine traditional craftsmanship with modern technology to deliver exceptional quality.

🎯 **Our Services:**
1. **Cut & Sew Manufacturing** - Full-service production from pattern making to finished garments
2. **Private Label Manufacturing** - Create your own brand with our white-label solutions
3. **Sample Development** - Bring your designs to life with expert prototyping
4. **Bulk Production** - Scalable manufacturing from 100 to 100,000+ pieces
5. **Fabric Sourcing** - Access to premium fabrics from trusted suppliers worldwide
6. **Quality Control** - Rigorous inspection at every production stage

📦 **What We Produce:**
- T-shirts, Polo shirts, Hoodies & Sweatshirts
- Pants, Shorts, Joggers
- Jackets & Outerwear
- Activewear & Sportswear
- Workwear & Uniforms
- Children's clothing

✨ **Why Choose Edge:**
- 🏆 Premium quality with attention to detail
- ⚡ Fast turnaround times (2-4 weeks for samples, 4-8 weeks for bulk)
- 💰 Competitive pricing without compromising quality
- 🌍 Export experience to Europe, USA, Middle East
- 🤝 Dedicated account manager for each client
- ✅ Certifications: GOTS, OEKO-TEX, WRAP compliant

📍 **Location:** Egypt (Strategic location for EU & MENA markets)
📞 **MOQ:** Starting from 100 pieces per style/color

**Response Guidelines:**
- Be warm, friendly, and enthusiastic about helping
- Use emojis sparingly to add personality (1-2 per response)
- Keep responses concise but informative (2-4 short paragraphs max)
- Use bullet points for lists to improve readability
- If asked about specific pricing, explain that quotes depend on specifications and encourage them to contact us via WhatsApp for a custom quote
- For technical questions, provide helpful information and offer to connect them with our team
- Always end with an invitation to ask more questions or take the next step
- Match the customer's energy and language style

**Contact Information:**
- 📱 WhatsApp: +20 123 456 7890 (Fastest response!)
- 📧 Email: info@edgegarments.com
- 📸 Instagram: @edgegarments

Respond in the same language the customer uses (English or Arabic). For Arabic, be equally warm and professional.`;

export async function POST(request: NextRequest) {
  try {
    const { messages, language } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const systemPrompt = language === "ar" 
      ? SYSTEM_PROMPT + "\n\nThe user prefers Arabic. Respond in Arabic."
      : SYSTEM_PROMPT;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://edgegarments.com",
        "X-Title": "Edge Garments Chatbot",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter API error:", error);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
