from app.extensions import db
from app.shared import BaseModel
from ..tables import TBL_NAMES

FEEDBACK = TBL_NAMES['FEEDBACK']
FEEDBACK_RECIPIENT = TBL_NAMES['FEEDBACK_RECIPIENT']
USER = TBL_NAMES['USER']

class Model_FeedbackRecipient(BaseModel): 
    __tablename__ = FEEDBACK_RECIPIENT

    feedback_recipient_id = db.Column(db.Integer, primary_key=True)
    feedback_id = db.Column(db.ForeignKey(F"{FEEDBACK}.feedback_id"))
    recipient_id = db.Column(db.ForeignKey(F"{USER}.user_id"), nullable=False)

    recipient = db.relationship("Model_User", 
        primaryjoin="Model_FeedbackRecipient.recipient_id == Model_User.user_id")