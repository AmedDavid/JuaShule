from flask import Blueprint, request, jsonify
from .. import db
from ..models.student import Student
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import logging

bp = Blueprint('profiles', __name__, url_prefix='/api/profile')

@bp.route('', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user_id = int(get_jwt_identity())
        logging.info(f"Fetching profile for user: {current_user_id}")
        student = Student.query.get_or_404(current_user_id)
        return jsonify({
            'id': student.id,
            'username': student.username,
            'email': student.email,
            'school': student.school,
            'created_at': student.created_at.isoformat()
        }), 200
    except Exception as e:
        logging.error(f"Failed to fetch profile: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to fetch profile: {str(e)}'}), 500


@bp.route('', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user_id = int(get_jwt_identity())
        logging.info(f"Update attempt for profile {current_user_id}")
        student = Student.query.get_or_404(current_user_id)
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        # Validate and update fields
        if 'username' in data and (not data['username'] or len(data['username']) > 50):
            return jsonify({'error': 'Username is required and must be 50 characters or less'}), 400
        if 'email' in data and (not data['email'] or len(data['email']) > 100 or '@' not in data['email']):
            return jsonify({'error': 'Valid email is required and must be 100 characters or less'}), 400
        if 'school' in data and (not data['school'] or len(data['school']) > 100):
            return jsonify({'error': 'School is required and must be 100 characters or less'}), 400
        # Check for uniqueness
        if 'username' in data and data['username'] != student.username:
            if Student.query.filter_by(username=data['username']).first():
                return jsonify({'error': 'Username already taken'}), 400
        if 'email' in data and data['email'] != student.email:
            if Student.query.filter_by(email=data['email']).first():
                return jsonify({'error': 'Email already taken'}), 400
        student.username = data.get('username', student.username)
        student.email = data.get('email', student.email)
        student.school = data.get('school', student.school)
        db.session.commit()
        logging.info(f"Profile {current_user_id} updated: {data}")
        return jsonify({
            'message': 'Profile updated',
            'profile': {
                'id': student.id,
                'username': student.username,
                'email': student.email,
                'school': student.school,
                'created_at': student.created_at.isoformat()
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Failed to update profile {current_user_id}: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to update profile: {str(e)}'}), 500

