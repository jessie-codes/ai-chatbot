import { useEffect, useState } from "react"
import { fetchHealth, type HealthResponse } from "../api"

function HealthCheck() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHealth()
      .then((data) => {
        setHealth(data)
        setError(null)
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Failed to fetch health status"
        setError(message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Checking backend health...</p>
  }

  if (error) {
    return (
      <div style={{ color: "red" }}>
        <p>❌ Backend unreachable</p>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div style={{ color: "green" }}>
      <p>✅ Backend status: {health?.status}</p>
    </div>
  )
}

export default HealthCheck
