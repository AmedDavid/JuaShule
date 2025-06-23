# import db
from .. import db
from werkzeug.security import generate_password_hash, check_password_hash

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    school = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    
# relationships

    questions = db.relationship('Question', backref='student', lazy=True)
    resources = db.relationship('Resource', backref='student', lazy=True)
    groups = db.relationship('Group', backref='creator', lazy=True)
    memberships = db.relationship('GroupMembership', backref='student', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

