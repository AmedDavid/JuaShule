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

