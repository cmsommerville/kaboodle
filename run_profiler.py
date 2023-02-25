import os
from app import create_app
from config import CONFIG

from werkzeug.middleware.profiler import ProfilerMiddleware


if __name__ == "__main__":
    ENV = os.getenv("ENV")
    config = CONFIG.get(ENV)
    HOSTNAME = os.getenv('HOSTNAME', '127.0.0.1')
    PORT = os.getenv('PORT', 5000)
    app = create_app(config)
    app.config['PROFILE'] = True
    app.wsgi_app = ProfilerMiddleware(app.wsgi_app, restrictions=[8])
    app.run(host=HOSTNAME, port=PORT, debug=True)
