# Blockface 🧠

Blockchain Intelligence Platform for USDT (TRON + ETH)

## Features

* Entity graph + de-anonymization
* Exchange detection (Binance, OKX)
* Whale tracking + alerts
* Cross-chain tracking (TRON ↔ ETH)
* Time-series analytics
* SaaS dashboard (Next.js)

## Run locally

```bash
docker-compose up --build
```

Frontend: http://localhost:3000
Backend: http://localhost:8000

## Stack

* FastAPI (backend)
* Next.js (frontend)
* PostgreSQL
* Redis
* Kafka
* ClickHouse (optional upgrade)

## Roadmap

* AI labeling
* Strategy signals
* Production scaling
