from typing import List
from collections.abc import Callable
from flask import request as flask_request


class BaseObserver:
    """
    Create an observer instance from this class. 

    Override the get/post/patch/put/delete methods with custom logic.
    """
    
    def __repr__(self, *args, **kwargs):
        return self.__class__.__name__

    def get(self, *args, **kwargs):
        pass

    def post(self, *args, **kwargs):
        pass

    def patch(self, *args, **kwargs):
        pass

    def put(self, *args, **kwargs):
        pass

    def delete(self, *args, **kwargs):
        pass

class BaseObservable:
    """
    Create an observable instance from this class. 

    Attach this object to the `BaseResource` that should be observed. 
    """

    def __init__(self): 
        self.observers = set()

    def notify(self, method: str, payload: any, request: flask_request, *args, **kwargs): 
        for obs in self.observers:
            callback = getattr(obs, method)
            if callback: 
                callback(payload, request)

    def subscribe(self, observer: BaseObserver):
        self.observers.add(observer)

    def unsubscribe(self, observer: BaseObserver):
        self.observers.discard(observer)