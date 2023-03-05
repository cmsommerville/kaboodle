from app.extensions import db
from app.shared import BaseModel
from ..tables import TBL_NAMES

USER = TBL_NAMES['USER']

class Model_User(BaseModel): 
    __tablename__ = USER

    user_id = db.Column(db.Integer, primary_key=True)
    user_code = db.Column(db.String(255), nullable=False)
    email_address = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    avatar = db.Column(db.String(255), nullable=True)