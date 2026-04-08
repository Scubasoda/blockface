from sqlalchemy import create_engine, Column, String, Integer, BigInteger
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "postgresql://user:password@db:5432/usdt"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()


class Transaction(Base):
    __tablename__ = "transactions"

    tx_hash = Column(String, primary_key=True)
    chain = Column(String)
    from_address = Column(String)
    to_address = Column(String)
    amount = Column(BigInteger)
    timestamp = Column(BigInteger)