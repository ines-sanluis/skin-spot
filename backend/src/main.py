from .entidades.entidade import Session, engine, Base
from .entidades.analise import Analise, AnaliseSchema
from flask_cors import CORS
from flask import Flask, jsonify, request

print("Backend Running")

app = Flask(__name__)
CORS(app)
Base.metadata.create_all(engine)

@app.route('/ph2dataset')
def getPh2Dataset():
    session = Session()
    data_objects = session.query(Analise).all()
    schema = AnaliseSchema(many=True)
    data = schema.dump(data_objects)
    session.close()
    return jsonify(data.data)

@app.route('/common_nevus')
def getCommonNevus():
    session = Session()
    data_objects = session.query(Analise).filter(Analise.clinical_diagnosis == 'Common Nevus')
    schema = AnaliseSchema(many=True)
    data = schema.dump(data_objects)
    session.close()
    return jsonify(data.data)

@app.route('/atypical_nevus')
def getAtypicalNevus():
    session = Session()
    data_objects = session.query(Analise).filter(Analise.clinical_diagnosis == 'Atypical Nevus')
    schema = AnaliseSchema(many=True)
    data = schema.dump(data_objects)
    session.close()
    return jsonify(data.data)

@app.route('/melanoma')
def getMelanoma():
    session = Session()
    data_objects = session.query(Analise).filter(Analise.clinical_diagnosis == 'Melanoma')
    schema = AnaliseSchema(many=True)
    data = schema.dump(data_objects)
    session.close()
    return jsonify(data.data)
