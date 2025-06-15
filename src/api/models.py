from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
import bcrypt  # ✅ Necesario para hashear y verificar contraseñas

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # No incluir la contraseña por seguridad
        }

    # ✅ Guardar contraseña encriptada
    def set_password(self, password_plaintext):
        self.password = bcrypt.hashpw(
            password_plaintext.encode('utf-8'), 
            bcrypt.gensalt()
        ).decode('utf-8')

    # ✅ Verificar contraseña
    def check_password(self, password_plaintext):
        return bcrypt.checkpw(
            password_plaintext.encode('utf-8'), 
            self.password.encode('utf-8')
        )