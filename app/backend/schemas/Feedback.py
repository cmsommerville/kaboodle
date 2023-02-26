from app.extensions import ma
from app.shared import BaseSchema

from ..models import Model_Feedback

class Schema_Feedback(BaseSchema):
    class Meta:
        model = Model_Feedback
        load_instance = True
        include_relationships=True
        include_fk=True