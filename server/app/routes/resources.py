from flask import Blueprint, request, jsonify
from .. import db
from ..models.resource import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging



bp = Blueprint('resources', __name__, url_prefix='/api')

