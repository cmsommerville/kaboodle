from flask import current_app
from flask_restx import Resource
from app.extensions import db
from app.shared import BaseTemporalTable


class Resource_AdminDropTables(Resource):

    @classmethod
    def post(cls):
        try:
            _handled_tables = []
            model_classes = [x.class_ for x in db.Model.registry.mappers]
            for model in model_classes:
                table_name = model.__tablename__

                if table_name in _handled_tables:
                    continue
                
                # drop system versioning if supported
                if current_app.config.get("SUPPORT_TEMPORAL_TABLES", False):
                    tbl = BaseTemporalTable(model.__table__)
                    tbl.drop_system_versioning(db)

        except Exception as e:
            return {"status": "error", "msg": str(e)}, 400

        try: 
            db.drop_all()
        except Exception as e:
            return {"status": "error", "msg": str(e)}, 400
        else:
            return {"msg": "Success"}, 200

