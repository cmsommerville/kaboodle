from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from app.extensions import db, ma, api, router

load_dotenv()        

def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    CORS(app, supports_credentials=True)

    db.init_app(app)
    ma.init_app(app)
    app.config["SESSION_SQLALCHEMY"] = db

    api.init_app(app)
    router.init_app(api)
    
    # bind routes
    from .route_registration import NAMESPACES
    router.bind_namespaces(NAMESPACES, '/api')

    # bind subscribers
    from .subscription_registration import SUBSCRIPTIONS
    for subscription in SUBSCRIPTIONS:
        subscription.subscribe()

    return app
