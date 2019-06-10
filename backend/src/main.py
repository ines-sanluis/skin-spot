from .entidades.entidade import Session, engine, Base
from .entidades.analise import Analise, AnaliseSchema
from flask_cors import CORS
from flask import Flask, jsonify, request, send_file
from werkzeug.utils import secure_filename
import cv2
import sys, os
import numpy as np
import json


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
def imaxeUpload():
    global img
    if 'imaxe' not in request.files:
        print('Erro: non hai petición de imaxe')
        return jsonify("Non recibido")
    file = request.files['imaxe']
    if file.filename == '':
        print("Erro: non hai un arquivo seleccionado")
        return jsonify("Non recibido")
    filestr = request.files['imaxe'].read()
    npimg = np.fromstring(filestr, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
    return jsonify("Imaxe cargada")

@app.route('/canvas-roi', methods=['POST'])
def canvasRoi():
    global img, banda_l, banda_a, banda_b
    points = request.json
    print(points)
    array = np.array([points], dtype='int32')
    channel_count = img.shape[2]
    mask = np.zeros(img.shape, dtype=np.uint8)
    cv2.fillPoly(mask, array, (255,255,255))
    img = cv2.bitwise_and(img, mask)
    cv2.imwrite('../frontend/src/assets/images/mascara.png', img)
    return jsonify("Rexión de interese cargada")

@app.route('/get-results')
def getResults():
    global img
    banda_l = 0
    banda_a = 0
    banda_b = 0
    for r in range(0, img.shape[0]):
        for c in range(0, img.shape[1]):
            if img[r][c][0] == 0 and img[r][c][1] == 0 and img[r][c][2] == 0: continue
            lab = cv2.cvtColor(np.uint8([[img[r][c]]]), cv2.COLOR_BGR2LAB)[0][0]
            banda_l += lab[0]
            banda_a += lab[1]
            banda_b += lab[2]
    banda_l = banda_l / img.size
    banda_a = banda_a / img.size
    banda_b = banda_b / img.size

    return jsonify({'banda_l': banda_l, 'banda_a' : banda_a, 'banda_b': banda_b})
