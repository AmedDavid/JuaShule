import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://juashule_db_user:Fjis1XgLjN3vrx68CBDRSQXDJmxrmJgb@dpg-d1dvlnjipnbc73dounrg-a/juashule_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = '5070a9eef46c97215a8c141e064b35128ded257eca6b12c16955967059a68e8a'
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'davidwize189@gmail.com'
    MAIL_PASSWORD = 'gqsl abpc fzrz gvke'
    MAIL_DEFAULT_SENDER = 'davidwize189@gmail.com'
    MAIL_DEBUG = True
    MAIL_SUPPRESS_SEND = False