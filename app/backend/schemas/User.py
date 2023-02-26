from app.extensions import ma
from app.shared import BaseSchema

from ..models import Model_User

class Schema_User(BaseSchema):
    class Meta:
        model = Model_User
        load_instance = True
        include_relationships=True
        include_fk=True