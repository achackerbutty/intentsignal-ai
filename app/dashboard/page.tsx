import { prisma } from "@/lib/prisma"

export default async function Dashboard() {
  const leads = await prisma.lead.findMany()

  const hot = leads.filter(l => l.intentScore > 80)
  const warm = leads.filter(l => l.intentScore > 50 && l.intentScore <= 80)
  const cold = leads.filter(l => l.intentScore <= 50)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">IntentSignal Dashboard</h1>

      <div className="mt-6">
        <h2>🔥 Hot Leads</h2>
        {hot.map(l => <p key={l.id}>{l.name}</p>)}
      </div>

      <div className="mt-6">
        <h2>🌤 Warm Leads</h2>
        {warm.map(l => <p key={l.id}>{l.name}</p>)}
      </div>

      <div className="mt-6">
        <h2>❄️ Cold Leads</h2>
        {cold.map(l => <p key={l.id}>{l.name}</p>)}
      </div>
    </div>
  )
}
