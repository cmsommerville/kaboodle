# Getting Started

Clone the repo.

Create virtual environment.

```
python -m venv venv
source venv/bin/activate
```

Install dependencies.

```
pip install -r requirements.txt
```

Create _.env_ file from _.env.template_. Configure the environment variables.

```
cp .env.template .env
```

Run the Flask development server.

```
python run.py
```

Verify that the app is running successfully by navigating to:

```
http://127.0.0.1:5000/api/admin/health
```
