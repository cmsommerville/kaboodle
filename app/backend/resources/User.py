from app.shared import BaseCRUDResource

from ..models import Model_User
from ..schemas import Schema_User

class CRUD_User(BaseCRUDResource): 
    model=Model_User
    schema=Schema_User