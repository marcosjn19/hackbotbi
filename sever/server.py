from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
import hashlib


app = Flask( __name__ , static_folder='../hackbotbi-web/dist/static',template_folder = '../hackbotbi-web/dist')
cors = CORS( app, origins = '*' )
url = os.getenv('URL')
app.config["SQLALCHEMY_DATABASE_URI"] = url.replace("mysql://", "mysql+mysqlconnector://")
db = SQLAlchemy(app)

class Users ( db.Model ):
    user_id       = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_mail     = db.Column(db.String(255), nullable=False)
    user_password = db.Column(db.String(255), nullable=False)

@app.route ( "/")
def index():
    return render_template("index.html")

@app.route ( "/users", methods = ['GET'] ) 
def getusers():
    users = db.session.execute(db.select(Users).order_by(Users.user_id)).scalars()
    users_list = [
        {"id": user.user_id, "mail": user.user_mail, "pass": user.user_password}
        for user in users
    ]
    return jsonify({"users": users_list})

@app.route("/login", methods=["POST"])
def login():
    user_mail = request.json.get("mail")
    user_password = request.json.get("password")
    user = Users.query.filter_by(user_mail=user_mail).first()

    if user:
        hashed_password = hashlib.sha256(user_password.encode()).hexdigest()
        if hashed_password == user.user_password:
            return jsonify({"message": "Login correcto", "user_id": user.user_id}), 200
        else:
            return jsonify({"message": "Credenciales no validas"}), 401
    else:
        return jsonify({"message": "User not found"}), 404

@app.route("/register", methods=["POST"])
def register():
    user_mail = request.json.get("mail")
    user_password = request.json.get("password")
    user = Users.query.filter_by(user_mail=user_mail).first()

    if user:
        return jsonify({"message": "Usuario ya existe"}), 401
    else:
        db.session.add(Users(user_mail=user_mail, user_password=user_password))
        db.session.commit()
        return jsonify({"message":"Usuario creado exitosamente"}), 200
    
if __name__ == "__main__":
    app.run( debug = True, host = '0.0.0.0', port = 5555)