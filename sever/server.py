from flask import Flask, jsonify, render_template, request, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
import hashlib


app = Flask( __name__ , static_folder='../hackbotbi-web/dist/static',template_folder = '../hackbotbi-web/dist')
cors = CORS( app, origins = '*', supports_credentials=True)
url = os.getenv('URL')
app.config["SQLALCHEMY_DATABASE_URI"] = url.replace("mysql://", "mysql+mysqlconnector://")
db = SQLAlchemy(app)
app.secret_key = os.getenv('SECRET_SESSION')

class Users ( db.Model ):
    user_id       = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_mail     = db.Column(db.String(255), nullable=False)
    user_password = db.Column(db.String(255), nullable=False)

class Clients ( db.Model ):
    client_id   = db.Column(db.Integer, primary_key=True, autoincrement=True)
    client_mail = db.Column(db.String(255), nullable=False)
    client_name = db.Column(db.String(50), nullable=False)
    client_lastname = db.Column(db.String(50), nullable=False)
    client_lat  = db.Column(db.Numeric(9,6), nullable=False)
    client_long = db.Column(db.Numeric(9,6), nullable=False)
    client_user = db.Column(db.String(255), nullable=False)

@app.route ( "/")
def index():
    return render_template("index.html")

@app.route ( "/index")
def main():
    return render_template("index.html")

@app.route('/<path:path>')
def catch_all(path):
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
            session['logged'] = True
            session['email'] = user_mail
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
        session['email'] = user_mail
        return jsonify({"message":"Usuario creado exitosamente"}), 200

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Sesión cerrada"}), 200

@app.route("/get/clients", methods=["GET"])
def getclients():
    if 'logged' in session and session['logged']:
        clients = db.session.execute(db.select(Clients).where(Clients.client_user == session['email']).order_by(Clients.client_id)).scalars()
        clients_list = [
            {"id": client.client_id, "mail": client.client_mail, "name": client.client_name, "lastname":client.client_lastname, 
             "lat":client.client_lat, "long":client.client_long}
            for client in clients
        ]
        return jsonify({"clients": clients_list})
    else:
        return render_template("index.html")

@app.route('/check-session', methods=['GET'])
def check_session():
    if 'logged' in session and session['logged']:
        return jsonify({"logged": True, "user": session['email']}), 200
    else:
        return jsonify({"logged": False}), 401
    
if __name__ == "__main__":
    app.run( debug = True, host = '0.0.0.0', port = 5555)