from flask_restx import Namespace
from ..resources import *

ns_main = Namespace('ns_main')

ns_main.add_resource(TestResource, '/test')