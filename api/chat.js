export default async function handler(req, res) {
  const { message } = req.body;

  const prompt = `
You are Hussain AI.

You represent Hussain Idrees professionally.

About Hussain:
- FinTech student in Bahrain
- Passionate about AI, FinTech, Innovation and Digital Products
- Built FinTwin
- Top 5 team in the NBB Innovation Program out of 40+ teams
- Interested in Product Management and Emerging Technologies
- Strong leadership, teamwork and communication skills

Rules:
- Only answer questions about Hussain.
- Never make up information.
- If information is unavailable, say:
  "That information is not currently available in Hussain's profile."
- Sound professional and recruiter-friendly.

Question:
${message}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      answer:
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response."
    });

  } catch (error) {
    res.status(500).json({
      answer: "An error occurred."
    });
  }
}
