from app.shared import BaseCRUDResource, BaseCRUDResourceList

from ..models import Model_User
from ..schemas import Schema_User

class CRUD_User(BaseCRUDResource): 
    model=Model_User
    schema=Schema_User()


class CRUD_User_List(BaseCRUDResourceList): 
    model=Model_User
    schema=Schema_User(many=True)