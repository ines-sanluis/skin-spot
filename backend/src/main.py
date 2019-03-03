from .entidades.entidade import Session, engine, Base
from .entidades.analise import Analise, AnaliseSchema
from flask_cors import CORS
from flask import Flask, jsonify, request
import cv2
import numpy as np

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

@app.route('/file-upload', methods=['POST'])
def imageUpload():
    # print(request.files)
    if 'image' not in request.files:
        print('Erro: non hai petición de imaxe')
        return jsonify("Non recibido")
    file = request.files['image']
    if file.filename == '':
        print("Erro: non hai un arquivo seleccionado")
        return jsonify("Non recibido")
    print(file)
    filestr = request.files['image'].read()
    npimg = np.fromstring(filestr, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
    # cv2.imshow('Imaxe', img) #titulo da imaxe e fonte
    # cv2.waitKey(0) #esperar a que o usuario pulse unha tecla
    # cv2.destroyAllWindows() #pechar a venta
    return jsonify("Recibido")
