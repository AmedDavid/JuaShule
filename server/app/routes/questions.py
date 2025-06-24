from flask import Blueprint, request, jsonify
from .. import db
from ..models.question import Question
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
import logging

bp = Blueprint('questions', __name__, url_prefix='/api')

@bp.route('/questions', methods=['GET'])
@jwt_required()
def get_questions():
    try:
        current_user = get_jwt_identity()
        logging.info(f"Fetching questions for user: {current_user}")
        questions = Question.query.all()
        return jsonify([{'id': q.id, 'subject': q.subject, 'content': q.content, 'student_id': q.student_id} for q in questions]), 200
    except Exception as e:
        logging.error(f"Failed to fetch questions: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to fetch questions: {str(e)}'}), 500