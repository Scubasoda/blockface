import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Wallet() {
  const router = useRouter()
  const { address } = router.query

  const [data, setData] = useState(null)

  useEffect(() => {
    if (!address) return

    axios.get(`http://localhost:8000/detect/${address}`)
      .then(res => setData(res.data))
  }, [address])

  if (!data) return <div>Loading...</div>

  return (
    <div style={{ padding: 20 }}>
      <h1>Wallet: {address}</h1>

      <p>Deposit Wallet: {data.deposit.toString()}</p>
      <p>Withdrawal Wallet: {data.withdrawal.toString()}</p>
      <p>Tx Count: {data.fingerprint.tx_count}</p>
    </div>
  )
}