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
    
    
