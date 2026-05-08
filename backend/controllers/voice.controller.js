import dotenv from "dotenv";
dotenv.config();

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Message required hai",
      });
    }

    // 🔥 GEMINI API CALL (LATEST STYLE)
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.voice_key,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Tum ek helpful Hindi voice assistant ho. Short aur natural reply do.\nUser: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // 🔥 DEBUG (IMPORTANT)
    console.log("🔥 GEMINI RAW RESPONSE:");
    console.log(JSON.stringify(data, null, 2));

    // ❌ HANDLE API ERROR
    if (data?.error) {
      return res.status(500).json({
        reply: `Gemini Error: ${data.error.message}`,
      });
    }

    // ❌ HANDLE EMPTY RESPONSE
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(500).json({
        reply: "AI response missing (candidates empty)",
      });
    }

    // ✅ SUCCESS
    res.json({
      reply,
    });

  } catch (error) {
    console.log("❌ SERVER ERROR:", error);

    res.status(500).json({
      reply: "Server error aaya hai",
    });
  }
};