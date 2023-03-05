from app.shared import BaseCRUDResourceList

from ..models import Model_FeedbackRecipient
from ..schemas import Schema_FeedbackRecipient

class CRUD_FeedbackRecipient_List(BaseCRUDResourceList): 
    model=Model_FeedbackRecipient
    schema=Schema_FeedbackRecipient(many=True)