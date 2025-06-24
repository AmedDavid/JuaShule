from flask import Blueprint, request, jsonify
from .. import db, jwt
from ..models.student import Student
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

bp = Blueprint('auth', __name__, url_prefix='/api')

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    student = Student.query.filter_by(email=email).first()
    if student and student.check_password(password):
        token = create_access_token(identity=str(student.id))
        return jsonify({
            'token': token,
            'user': {
                'id': student.id,
                'username': student.username,
                'email': student.email,
                'school': student.school
            }
        })
    return jsonify({'error': 'Invalid credentials'}), 401