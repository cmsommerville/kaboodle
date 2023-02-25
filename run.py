import os
from app import create_app
from config import CONFIG


if __name__ == "__main__":
    ENV = os.getenv("ENV")
    HOSTNAME = os.getenv('HOSTNAME', '127.0.0.1')
    PORT = os.getenv('PORT', 5000)
    config = CONFIG.get(ENV)
    app = create_app(config)
    app.run(host=HOSTNAME, port=PORT, debug=True)
