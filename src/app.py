import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # ✅ Importación de CORS

from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# Detectar entorno
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"

# Ruta de archivos estáticos
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../dist/')

# Inicializar app
app = Flask(__name__)
app.url_map.strict_slashes = False

# ✅ Aplicar CORS globalmente
CORS(app)  # ← Permite todas las solicitudes (o usa origins=["https://tudominio"] si quieres restringirlo)

# Configuración base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuración JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY") or "fallback-secret-key"
jwt = JWTManager(app)

# Inicializar extensiones
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Admin y comandos CLI
setup_admin(app)
setup_commands(app)

# Registrar rutas
app.register_blueprint(api, url_prefix='/api')

# Manejador de errores
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Sitemap de desarrollo
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Archivos estáticos
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

# Ejecutar servidor
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)