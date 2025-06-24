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

@bp.route('/groups', methods=['POST'])
@jwt_required()
def create_group():
    try:
        data = request.get_json()
        if not data or not data.get('name'):
            return jsonify({'error': 'Name is required'}), 400
        group = Group(name=data['name'], description=data.get('description'), creator_id=get_jwt_identity())
        db.session.add(group)
        db.session.commit()
        membership = GroupMembership(student_id=get_jwt_identity(), group_id=group.id)
        db.session.add(membership)
        db.session.commit()
        logging.info(f"Group created by user {get_jwt_identity()}: {data}")
        return jsonify({'message': 'Group created', 'group': {'id': group.id, 'name': group.name, 'description': group.description}}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Failed to create group: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to create group: {str(e)}'}), 500