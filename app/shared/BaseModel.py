from __future__ import annotations
import pandas as pd
from flask import current_app
from typing import List
from sqlalchemy import text
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.inspection import inspect
from app.extensions import db


class BaseModel(db.Model):
    __abstract__ = True

    @declared_attr
    def created_dts(cls):
        return db.Column(db.DateTime, server_default=text('CURRENT_TIMESTAMP'))

    @declared_attr
    def updated_dts(cls):
        return db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    @declared_attr
    def updated_by(cls):
        return db.Column(db.String(50))

    def __repr__(self): 
        """
        Print instance as <[Model Name]: [Row SK]>
        """
        return f'<{self.__class__.__name__}: {getattr(self, inspect(self.__class__).primary_key[0].name)}>'


    @classmethod
    def find_one(cls, id, as_of_ts=None, *args, **kwargs) -> BaseModel:
        SUPPORT_TEMPORAL_TABLES = current_app.config.get("SUPPORT_TEMPORAL_TABLES", False)
        qry = cls.query
        if as_of_ts and SUPPORT_TEMPORAL_TABLES: 
            qry = qry.with_hint(cls, f"FOR SYSTEM_TIME AS OF '{as_of_ts}'")
        return qry.get(id)

    @classmethod
    def find_one_by_attr(cls, attrs: dict, as_of_ts=None, as_pandas=False, *args, **kwargs) -> List[BaseModel]:
        SUPPORT_TEMPORAL_TABLES = current_app.config.get("SUPPORT_TEMPORAL_TABLES", False)
        qry = cls.query.filter(*[getattr(cls, k) == v for k, v in attrs.items()])
        if as_of_ts and SUPPORT_TEMPORAL_TABLES: 
            qry = qry.with_hint(cls, f"FOR SYSTEM_TIME AS OF '{as_of_ts}'")

        if kwargs.get('last'): 
            qry = qry.order_by(cls.created_dts.desc())
        
        if as_pandas:
            return pd.read_sql(qry.statement, qry.session.bind, coerce_float=False).iloc[0]
        return qry.first()

    @classmethod
    def find_all_by_attr(cls, attrs: dict, as_of_ts=None, as_pandas=False, *args, **kwargs) -> List[BaseModel]:
        SUPPORT_TEMPORAL_TABLES = current_app.config.get("SUPPORT_TEMPORAL_TABLES", False)
        qry = cls.query.filter(*[getattr(cls, k).in_(v) if type(v) == list else getattr(cls, k) == v for k, v in attrs.items()])
        if as_of_ts and SUPPORT_TEMPORAL_TABLES: 
            qry = qry.with_hint(cls, f"FOR SYSTEM_TIME AS OF '{as_of_ts}'")
        
        if as_pandas: 
            return pd.read_sql(qry.statement, qry.session.bind, coerce_float=False)
        return qry.all()

    @classmethod
    def find_all(cls, limit=1000, offset=0, as_of_ts=None, as_pandas=False, *args, **kwargs) -> List[BaseModel]:
        SUPPORT_TEMPORAL_TABLES = current_app.config.get("SUPPORT_TEMPORAL_TABLES", False)
        qry = cls.query
        if as_of_ts and SUPPORT_TEMPORAL_TABLES: 
            qry = qry.with_hint(cls, f"FOR SYSTEM_TIME AS OF '{as_of_ts}'")
        if as_pandas: 
            return pd.read_sql(qry.statement, qry.session.bind, coerce_float=False).iloc[offset:(offset + limit)]
        return qry.slice(offset, offset+limit).all()

    @classmethod
    def save_all_to_db(cls, data) -> None:
        try:
            db.session.add_all(data)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise

    @classmethod
    def bulk_save_all_to_db(cls, data) -> None:
        try: 
            db.session.bulk_save_objects(data)
            db.session.commit()
        except: 
            db.session.rollback()
            raise

    def save_to_db(self) -> None:
        try:
            db.session.add(self)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise

    def delete(self) -> None:
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise
