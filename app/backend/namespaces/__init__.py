from .main import ns_app, ns_crud

NAMESPACES = [
    {'namespace': ns_app, 'path': '/'}, 
    {'namespace': ns_crud, 'path': '/crud/'}, 
]