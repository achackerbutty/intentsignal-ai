import { openai } from "@/lib/openai"

export async function scoreLead(lead: any) {
  let score = 0

  if (lead.activityScore > 3) score += 10
  if (lead.budget) score += 15
  if (lead.createdAt) score += 20

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "user",
          content: `Score this lead from 0-100:\n${JSON.stringify(lead)}`
        }
      ]
    })

    const aiScore = parseInt(res.choices[0].message.content || "50")

    return aiScore + score
  } catch {
    return score
  }
}
