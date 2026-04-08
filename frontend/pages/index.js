import { useEffect, useState } from "react"
import axios from "axios"
import SearchBar from "../components/SearchBar"

export default function Home() {
  const [whales, setWhales] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/whales")
      .then(res => setWhales(res.data))
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>🧠 Blockface Dashboard</h1>

      <SearchBar />

      <h2>🐋 Whale Transactions</h2>
      {whales.map((w, i) => (
        <div key={i}>
          {w.from} → {w.to} | {w.amount}
        </div>
      ))}
    </div>
  )
}