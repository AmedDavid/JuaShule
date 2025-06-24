from flask import Blueprint, request, jsonify
from .. import db
from ..models.resource import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging



bp = Blueprint('resources', __name__, url_prefix='/api')

@bp.route('/resources', methods=['GET'])
@jwt_required()
def get_resources():
    try:
        current_user = get_jwt_identity()
        logging.info(f"Fetching resources for user: {current_user}")
        resources = Resource.query.all()
        return jsonify([{'id': r.id, 'title': r.title, 'file_url': r.file_url, 'student_id': r.student_id} for r in resources]), 200
    except Exception as e:
        logging.error(f"Failed to fetch resources: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to fetch resources: {str(e)}'}), 500
    
    

@bp.route('/resources', methods=['POST'])
@jwt_required()
def create_resource():
    try:
        data = request.get_json()
        if not data or not data.get('title') or not data.get('file_url'):
            return jsonify({'error': 'Title and file_url are required'}), 400
        resource = Resource(student_id=get_jwt_identity(), title=data['title'], file_url=data['file_url'])
        db.session.add(resource)
        db.session.commit()
        logging.info(f"Resource created by user {get_jwt_identity()}: {data}")
        return jsonify({'message': 'Resource created', 'resource': {'id': resource.id, 'title': resource.title, 'file_url': resource.file_url}}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Failed to create resource: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to create resource: {str(e)}'}), 500