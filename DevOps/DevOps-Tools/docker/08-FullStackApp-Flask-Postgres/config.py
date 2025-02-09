import os
import secrets

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@db/$POSTGRES_DB'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = secrets.token_hex(16)  # Generate a new secret key each time the app runs


