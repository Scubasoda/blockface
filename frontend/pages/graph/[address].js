import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"
import ForceGraph2D from "react-force-graph"

export default function GraphPage() {
  const router = useRouter()
  const { address } = router.query

  const [graph, setGraph] = useState({ nodes: [], links: [] })

  useEffect(() => {
    if (!address) return

    axios.get(`http://localhost:8000/graph/${address}`)
      .then(res => {
        const links = res.data.map(t => ({
          source: t.from_address,
          target: t.to_address
        }))

        const nodes = [...new Set(
          links.flatMap(l => [l.source, l.target])
        )].map(id => ({ id }))

        setGraph({ nodes, links })
      })
  }, [address])

  return (
    <div style={{ height: "100vh" }}>
      <ForceGraph2D graphData={graph} />
    </div>
  )
}