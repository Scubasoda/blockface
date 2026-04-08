from fastapi import FastAPI
from sqlalchemy.orm import Session
from models import Base, engine, SessionLocal, Transaction
from typing import List
import time

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)


# -------------------------
# DB Dependency
# -------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------
# BASIC ROUTES
# -------------------------
@app.get("/")
def root():
    return {"status": "running"}


@app.get("/transactions")
def get_transactions():
    db = SessionLocal()
    txs = db.query(Transaction).limit(100).all()
    return txs


# -------------------------
# GRAPH ENDPOINT
# -------------------------
@app.get("/graph/{address}")
def graph(address: str):
    db = SessionLocal()

    txs = db.query(Transaction).filter(
        (Transaction.from_address == address) |
        (Transaction.to_address == address)
    ).limit(200).all()

    edges = []
    for t in txs:
        edges.append({
            "from_address": t.from_address,
            "to_address": t.to_address,
            "amount": t.amount
        })

    return edges


# -------------------------
# WALLET DETECTION
# -------------------------
@app.get("/detect/{address}")
def detect(address: str):
    db = SessionLocal()

    incoming = db.query(Transaction).filter(
        Transaction.to_address == address
    ).all()

    outgoing = db.query(Transaction).filter(
        Transaction.from_address == address
    ).all()

    return {
        "deposit": len(incoming) > 50,
        "withdrawal": len(outgoing) > 50,
        "fingerprint": {
            "tx_count": len(incoming) + len(outgoing)
        }
    }


# -------------------------
# WHALES
# -------------------------
@app.get("/whales")
def whales():
    db = SessionLocal()

    txs = db.query(Transaction).filter(
        Transaction.amount > 1_000_000 * 1_000_000
    ).limit(50).all()

    return [{
        "from": t.from_address,
        "to": t.to_address,
        "amount": t.amount
    } for t in txs]