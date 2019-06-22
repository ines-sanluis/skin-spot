from flask_cors import CORS
from flask import Flask, jsonify, request, send_file
from werkzeug.utils import secure_filename
import cv2, sys, os, json
import numpy as np
from sklearn.svm import SVC
from sklearn.externals import joblib
global img

app = Flask(__name__)
CORS(app)
modelo = joblib.load("svm/svm-modelo.pkl")
print("Backend Running")
img = None
# img = "../frontend/src/assets/images/lunar.png"

@app.route('/file-upload', methods=['POST'])
def imaxeUpload():
    global img
    filePath = "../frontend/src/assets/images/mascara.png"
    if os.path.exists(filePath): os.remove(filePath)
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
    # print("File upload: ", img)
    print("Imaxe enteira subida")
    return jsonify("Imaxe cargada")

@app.route('/canvas-roi', methods=['POST'])
def canvasRoi():
    global img, banda_l, banda_a, banda_b
    points = request.json
    array = np.array([points], dtype='int32')
    channel_count = img.shape[2]
    mask = np.zeros(img.shape, dtype=np.uint8)
    cv2.fillPoly(mask, array, (255,255,255))
    img = cv2.bitwise_and(img, mask)
    cv2.imwrite('../frontend/src/assets/images/mascara.png', img)
    print("Imaxe con mascara lista")
    return jsonify("Rexión de interese calculada")

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
    prediccion =  modelo.predict([[banda_l, banda_a, banda_b]])[0]
    if prediccion == 0:   prediccion = "Nevus común"
    elif prediccion == 1: prediccion = "Nevus atípico"
    else: prediccion = "Melanoma"
    print("Prediccion: ", prediccion)
    return jsonify({'banda_l': banda_l, 'banda_a' : banda_a, 'banda_b': banda_b, 'prediccion': prediccion})
