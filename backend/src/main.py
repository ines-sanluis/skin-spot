from .entidades.entidade import Session, engine, Base
from .entidades.analise import Analise, AnaliseSchema
from flask_cors import CORS
from flask import Flask, jsonify, request
import cv2
import numpy as np

print("Backend Running")
img = 'NULL'
app = Flask(__name__)
CORS(app)
Base.metadata.create_all(engine)

@app.route('/ph2dataset/<diagnose>')
def getPh2Dataset(diagnose):
    session = Session()
    if diagnose == "todas": data_objects = session.query(Analise).all()
    else:
        if diagnose == "common_nevus": d = "Common Nevus"
        elif diagnose == "atypical_nevus": d = "Atypical Nevus"
        elif diagnose == "melanoma": d = "Melanoma"
        data_objects = session.query(Analise).filter(Analise.clinical_diagnosis == d)
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
