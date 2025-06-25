from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import logging
from .config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['JWT_CSRF_CHECK_FORM'] = False
    app.config['JWT_CSRF_IN_COOKIES'] = False
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    logging.basicConfig(level=logging.DEBUG)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        logging.error(f"Invalid token error: {str(error)}", exc_info=True)
        return {"error": f"Invalid token: {str(error)}"}, 422

    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        logging.error(f"Unauthorized error: {str(error)}", exc_info=True)
        return {"error": f"Unauthorized: {str(error)}"}, 401

    from .routes import auth, questions, resources, groups, profiles
    app.register_blueprint(auth.bp)
    app.register_blueprint(questions.bp)
    app.register_blueprint(resources.bp)
    app.register_blueprint(groups.bp)
    app.register_blueprint(profiles.bp)

    return app
