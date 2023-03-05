from app.extensions import ma
from app.shared import BaseSchema

from ..models import Model_FeedbackRecipient

class Schema_FeedbackRecipient(BaseSchema):
    class Meta:
        model = Model_FeedbackRecipient
        load_instance = True
        include_relationships=True
        include_fk=True