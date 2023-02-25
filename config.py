import os
import urllib
from dotenv import load_dotenv

load_dotenv()

SQL_SERVER_CONNECTION_STRING = "Server={SERVER};Database={DB};UID={UID};PWD={PWD};"
SQL_SERVER_CONNECTION_STRING = "Driver={ODBC Driver 17 for SQL Server};" + SQL_SERVER_CONNECTION_STRING.format(**{
    "SERVER": os.getenv('DEV_DATABASE_SERVER'), 
    "DB": os.getenv('DEV_DATABASE_DB'), 
    "UID": os.getenv('DEV_DATABASE_UID'),
    "PWD": os.getenv('DEV_DATABASE_PWD')
})
params = urllib.parse.quote_plus(SQL_SERVER_CONNECTION_STRING)

class BaseConfig():
    PROPAGATE_EXCEPTIONS = True
    PERMANENT_SESSION_LIFETIME = 3600
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SUPPORT_TEMPORAL_TABLES = (os.getenv('SUPPORT_TEMPORAL_TABLES', 'false').lower() == 'true')

class DevConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = "mssql+pyodbc:///?odbc_connect=%s" % params
    DB_USER_NAME = os.getenv('DEV_DATABASE_UID')

class TestConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv("TEST_SQLALCHEMY_DATABASE_URI")
    DB_USER_NAME = os.getenv('DEV_DATABASE_UID')

CONFIG = {
    "DEV": DevConfig(),
    "TEST": TestConfig()
}
