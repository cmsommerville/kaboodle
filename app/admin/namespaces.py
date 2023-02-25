from flask_restx import Namespace

from .resources import *

ns_admin = Namespace('admin', description='Reference data REST API')

ns_admin.add_resource(Resource_AdminCreateTables, *['/tables/_create'])
ns_admin.add_resource(Resource_AdminDeleteTables, *['/tables/_delete'])
ns_admin.add_resource(Resource_AdminDropTables, *['/tables/_drop'])
ns_admin.add_resource(Resource_AdminHealthCheck, *['/health'])