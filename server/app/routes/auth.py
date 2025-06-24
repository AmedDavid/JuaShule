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

@bp.route('/students', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    school = data.get('school')
    if not all([username, email, password, school]):
        return jsonify({'error': 'All fields are required'}), 400
    if Student.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400
    student = Student(username=username, email=email, school=school)
    student.set_password(password)
    db.session.add(student)
    try:
        db.session.commit()
        return jsonify({'message': 'Student created'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500

@bp.route('/students/me', methods=['GET'])
@jwt_required()
def get_me():
    student_id = get_jwt_identity()
    student = Student.query.get_or_404(student_id)
    return jsonify({
        'id': student.id,
        'username': student.username,
        'email': student.email,
        'school': student.school
    })

