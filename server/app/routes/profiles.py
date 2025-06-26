from flask import Blueprint, request, jsonify
from .. import db, mail
from ..models.student import Student
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Message
import logging
import uuid

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

@bp.route('/password', methods=['PATCH'])
@jwt_required()
def update_password():
    try:
        current_user_id = int(get_jwt_identity())
        logging.info(f"Password update attempt for user: {current_user_id}")
        student = Student.query.get_or_404(current_user_id)
        data = request.get_json()
        if not data or 'current_password' not in data or 'new_password' not in data:
            return jsonify({'error': 'Current password and new password are required'}), 400
        if not student.check_password(data['current_password']):
            return jsonify({'error': 'Current password is incorrect'}), 400
        if len(data['new_password']) < 6:
            return jsonify({'error': 'New password must be at least 6 characters'}), 400
        student.set_password(data['new_password'])
        db.session.commit()
        logging.info(f"Password updated for user {current_user_id}")
        return jsonify({'message': 'Password updated'}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Failed to update password for user {current_user_id}: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to update password: {str(e)}'}), 500


@bp.route('/reset-password', methods=['POST'])
def reset_password_request():
    try:
        data = request.get_json()
        if not data or 'email' not in data:
            return jsonify({'error': 'Email is required'}), 400
        email = data['email']
        student = Student.query.filter_by(email=email).first()
        if not student:
            return jsonify({'error': 'No account found with that email'}), 404
        # Generate a reset token (using UUID for simplicity; in production, use JWT with expiration)
        reset_token = str(uuid.uuid4())
        logging.info(f"Generated reset token {reset_token} for user {student.id}")
        # Send reset email
        msg = Message('Password Reset Request', sender='davidwize189@gmail.com', recipients=[email])
        msg.body = f"""Dear {student.username},

You requested a password reset. Please click the link below to reset your password:
https://jua-shule.vercel.app/reset-password?token={reset_token}

If you did not request this, please ignore this email.

Best,
JuaShule Team
"""
        mail.send(msg)
        logging.info(f"Reset email sent to {email} for user {student.id}")
        return jsonify({'message': 'Password reset email sent'}), 200
    except Exception as e:
        logging.error(f"Failed to process password reset for email {data.get('email')}: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to process password reset: {str(e)}'}), 500
    