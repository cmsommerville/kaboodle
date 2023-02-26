from app.extensions import db
from app.shared import BaseModel
from ..tables import TBL_NAMES

FEEDBACK = TBL_NAMES['FEEDBACK']
USER = TBL_NAMES['USER']

class Model_Feedback(BaseModel): 
    __tablename__ = FEEDBACK

    feedback_id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.ForeignKey(F"{USER}.user_id"), nullable=False)
    recipient_id = db.Column(db.ForeignKey(F"{USER}.user_id"), nullable=False)
    model_code = db.Column(db.String(100))
    orig_prompt_text = db.Column(db.String(2000))
    feedback_text = db.Column(db.String(2000))

    author = db.relationship("Model_User", 
        primaryjoin="Model_Feedback.author_id == Model_User.user_id")
    recipient = db.relationship("Model_User", 
        primaryjoin="Model_Feedback.recipient_id == Model_User.user_id")