import { useState } from "react"
import { useRouter } from "next/router"

export default function SearchBar() {
  const [input, setInput] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (!input) return

    router.push(`/wallet/${input}`)
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter wallet address"
        style={{ padding: 8, width: 300 }}
      />
      <button onClick={handleSearch} style={{ marginLeft: 10 }}>
        Search
      </button>
    </div>
  )
}