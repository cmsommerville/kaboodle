from flask_restx import Namespace
from ..resources import *

ns_app = Namespace('ns_app')
ns_crud = Namespace('ns_crud')

ns_app.add_resource(Resource_Feedback, '/feedback')

ns_crud.add_resource(CRUD_Feedback, '/feedback', '/feedback/<int:id>')
ns_crud.add_resource(CRUD_User, '/user/<int:id>', '/user')