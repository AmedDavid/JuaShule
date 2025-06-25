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

@bp.route('/groups/<int:id>/members', methods=['GET'])
@jwt_required()
def get_group_members(id):
    try:
        group = Group.query.get_or_404(id)
        memberships = GroupMembership.query.filter_by(group_id=id).all()
        members = [
            {
                "id": m.student.id,
                "username": m.student.username,
                "email": m.student.email
            }
            for m in memberships if m.student is not None
        ]
        return jsonify(members), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch members: {str(e)}'}), 500

@bp.route('/groups/memberships', methods=['GET'])
@jwt_required()
def get_user_memberships():
    try:
        current_user = int(get_jwt_identity())
        memberships = GroupMembership.query.filter_by(student_id=current_user).all()
        group_ids = [m.group_id for m in memberships]
        return jsonify(group_ids), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch memberships: {str(e)}'}), 500

@bp.route('/groups/<int:id>/join', methods=['PATCH'])
@jwt_required()
def join_group(id):
    try:
        group = Group.query.get_or_404(id)
        current_user = int(get_jwt_identity())
        existing_membership = GroupMembership.query.filter_by(student_id=current_user, group_id=id).first()
        if existing_membership:
            return jsonify({'message': 'Already a member'}), 200
        membership = GroupMembership(student_id=current_user, group_id=id)
        db.session.add(membership)
        db.session.commit()
        return jsonify({'message': 'Joined group'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to join group: {str(e)}'}), 500

@bp.route('/groups/<int:id>', methods=['PUT'])
@jwt_required()
def update_group(id):
    try:
        current_user = int(get_jwt_identity())
        logging.info(f"Update attempt for group {id} by user {current_user}")
        group = Group.query.get_or_404(id)
        logging.info(f"Group found: id={group.id}, creator_id={group.creator_id}, name={group.name}")
        if group.creator_id != current_user:
            logging.warning(f"Unauthorized: Group {id} creator_id {group.creator_id} != current_user {current_user}")
            return jsonify({'error': 'Unauthorized: Only the creator can update the group'}), 403
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        if 'name' in data and not data['name']:
            return jsonify({'error': 'Name is required'}), 400
        group.name = data.get('name', group.name)
        group.description = data.get('description', group.description)
        db.session.commit()
        logging.info(f"Group {id} updated by user {current_user}")
        return jsonify({'message': 'Group updated', 'group': {'id': group.id, 'name': group.name, 'description': group.description}}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Failed to update group {id}: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to update group: {str(e)}'}), 500


@bp.route('/groups/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_group(id):
    try:
        current_user = int(get_jwt_identity())
        logging.info(f"Delete attempt for group {id} by user {current_user}")
        group = Group.query.get_or_404(id)
        logging.info(f"Group found: id={group.id}, creator_id={group.creator_id}, name={group.name}")
        membership = GroupMembership.query.filter_by(student_id=current_user, group_id=id).first()
        if not membership:
            logging.warning(f"Unauthorized: User {current_user} is not a member of group {id}")
            return jsonify({'error': 'Unauthorized: You must be a member to leave or delete the group'}), 403
        if group.creator_id == current_user:
            logging.info(f"Creator {current_user} deleting group {id}")
            # Delete all memberships first to avoid foreign key constraint
            GroupMembership.query.filter_by(group_id=id).delete()
            db.session.delete(group)
            db.session.commit()
            logging.info(f"Group {id} deleted by creator {current_user}")
            return jsonify({'message': 'Group deleted'}), 200
        else:
            logging.info(f"Member {current_user} leaving group {id}")
            db.session.delete(membership)
            db.session.commit()
            logging.info(f"User {current_user} left group {id}")
            return jsonify({'message': 'Left group'}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Failed to delete group {id}: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to delete group: {str(e)}'}), 500
    