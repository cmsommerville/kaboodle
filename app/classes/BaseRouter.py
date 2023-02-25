from flask_restx import Api, Namespace
from typing import List

class BaseRouter: 
    """
    Add as an extension with no arguments. 

    Call `init_app` and pass the `api` instance as the argument. 
    
    Call `bind_namespaces` to bind the namespaces to the API
    """

    def __init__(self, *args, **kwargs):
        if isinstance(kwargs.get('api'), Api): 
            self.api = kwargs.get('api')
        elif not args: 
            pass 
        elif isinstance(args[0], Api): 
            self.api = args[0]

    def init_app(self, api, *args, **kwargs): 
        self.api = api 

    def bind_namespaces(self, namespaces: List[Namespace], prefix: str = None, *args, **kwargs): 
        """
        Binds a list of API routes to the API object
        """
        for ns in namespaces: 
            namespace = ns['namespace']
            ns_path = ns.get('path')
            if ns_path.startswith("/"):
                ns_path = ns_path[1:]
            
            if ns_path.endswith("/"): 
                ns_path = ns_path[:-1]
            self.api.add_namespace(namespace, path=f"{prefix}/{ns_path}")
