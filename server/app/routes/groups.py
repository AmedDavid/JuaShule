from flask import Blueprint, request, jsonify
from .. import db
from ..models.group import Group, GroupMembership
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging

bp = Blueprint('groups', __name__, url_prefix='/api')

@bp.route('/groups', methods=['GET'])
@jwt_required()
def get_groups():
    try:
        current_user = get_jwt_identity()
        logging.info(f"Fetching groups for user: {current_user}")
        groups = Group.query.all()
        return jsonify([{'id': g.id, 'name': g.name, 'description': g.description, 'creator_id': g.creator_id} for g in groups]), 200
    except Exception as e:
        logging.error(f"Failed to fetch groups: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to fetch groups: {str(e)}'}), 500