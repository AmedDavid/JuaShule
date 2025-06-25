from flask import Blueprint, request, jsonify
from .. import db
from ..models.question import Question
from flask_jwt_extended import jwt_required, get_jwt_identity
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

@bp.route('/questions', methods=['POST'])
@jwt_required()
def create_question():
    try:
        data = request.get_json()
        if not data or not data.get('subject') or not data.get('content'):
            return jsonify({'error': 'Subject and content are required'}), 400
        question = Question(student_id=get_jwt_identity(), subject=data['subject'], content=data['content'])
        db.session.add(question)
        db.session.commit()
        logging.info(f"Question created by user {get_jwt_identity()}: {data}")
        return jsonify({'message': 'Question created', 'question': {'id': question.id, 'subject': question.subject, 'content': question.content}}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Failed to create question: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to create question: {str(e)}'}), 500
    

@bp.route('/questions/<int:id>', methods=['PUT'])
@jwt_required()
def update_question(id):
    try:
        current_user = int(get_jwt_identity())
        logging.info(f"Update attempt for question {id} by user {current_user}")
        question = Question.query.get_or_404(id)
        logging.info(f"Question found: id={question.id}, student_id={question.student_id}, subject={question.subject}")
        if question.student_id != current_user:
            logging.warning(f"Unauthorized: Question {id} student_id {question.student_id} != current_user {current_user}")
            return jsonify({'error': 'Unauthorized: You can only update your own questions'}), 403
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        if 'subject' in data and not data['subject']:
            return jsonify({'error': 'Subject is required'}), 400
        if 'content' in data and not data['content']:
            return jsonify({'error': 'Content is required'}), 400
        question.subject = data.get('subject', question.subject)
        question.content = data.get('content', question.content)
        db.session.commit()
        logging.info(f"Question {id} updated by user {current_user}")
        return jsonify({'message': 'Question updated', 'question': {'id': question.id, 'subject': question.subject, 'content': question.content}}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Failed to update question {id}: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to update question: {str(e)}'}), 500
    
    

@bp.route('/questions/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_question(id):
    try:
        current_user = int(get_jwt_identity())
        logging.info(f"Delete attempt for question {id} by user {current_user}")
        question = Question.query.get_or_404(id)
        logging.info(f"Question found: id={question.id}, student_id={question.student_id}, subject={question.subject}")
        if question.student_id != current_user:
            logging.warning(f"Unauthorized: Question {id} student_id {question.student_id} != current_user {current_user}")
            return jsonify({'error': 'Unauthorized: You can only delete your own questions'}), 403
        db.session.delete(question)
        db.session.commit()
        logging.info(f"Question {id} deleted by user {current_user}")
        return jsonify({'message': 'Question deleted'}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Failed to delete question {id}: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to delete question: {str(e)}'}), 500
    
    