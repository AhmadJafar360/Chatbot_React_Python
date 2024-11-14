# Library yang digunakan untuk menjalankan sistem
import os
import re
import json
import nltk
import random
import numpy as np
import tensorflow as tf
import pickle
from nltk.stem import WordNetLemmatizer
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import CountVectorizer
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense

#Framework Python dan Middleware mengizinkan CORS, sehingga API bisa diakses dari pemrograman yang berbeda
from flask import Flask, request, jsonify
from flask_cors import CORS 

# Mengunduh library NLP
nltk.download('punkt')
nltk.download('wordnet')

app = Flask(__name__) #Inisialisasi objek Flask untuk aplikasi web.
CORS(app, methods=['POST'], headers=['Content-Type', 'Accept']) # Untuk mengizinkan permintaan dari domain lain

lemmatizer = WordNetLemmatizer()

# Membuka file json yang digunakan untuk sistem yang berisi "intents" yang termasuk "tag, pattern, responses"
with open('backend\data\data.json') as json_file:
    data = json.load(json_file)

# Text Processing/PreProcessing (Natural Language Processing)
words = []
classes = []
documents = []
ignore_words = ['?', '!']

for intent in data['intents']:
    for pattern in intent['patterns']:

        # Mengubah teks menjadi huruf kecil (case folding)
        pattern = pattern.lower()

        # Memecah kalimat menjadi kata-kata (Tokenizing).
        word_list = nltk.word_tokenize(pattern)

        # Mengubah kata ke bentuk dasarnya (Stemming/Lemmatization)
        word_list = [lemmatizer.lemmatize(w.lower()) for w in word_list if w not in ignore_words]
        words.extend(word_list)

        # Menambahkan pasangan kata-kata dan tag ke documents
        documents.append((word_list, intent['tag']))

        # Menambahkan tag ke daftar classes jika belum ada.
        if intent['tag'] not in classes:
            classes.append(intent['tag'])

# menyimpan tag dan pattern
words = sorted(list(set(words)))
classes = sorted(list(set(classes)))
pickle.dump(words, open('backend\\chatbot\\pattern.pkl', 'wb'))
pickle.dump(classes, open('backend\\chatbot\\tag.pkl', 'wb'))

# Training Data
training=[]
output_empty=[0]*len(classes)

for doc in documents:
    # Bag Of Words
    bag = [0] * len(words)
    word_patterns = doc[0]
    for word in words:
        bag[words.index(word)] = 1 if word in word_patterns else 0

    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1

    training.append([bag, output_row])

random.shuffle(training)
training = np.array(training)

Train_X = np.array(list(training[:, 0]))
Train_Y = np.array(list(training[:, 1]))


# Path untuk menyimpan model format HDF5.
menyimpan_model = 'backend\chatbot\Artificial_Neural_Network_Model.h5'

# Mengecek apakah model sudah ada.
history = None
if os.path.exists(menyimpan_model):
    # Jika ada, model akan dimuat.
    model = load_model(menyimpan_model)
else:
    # # Membuat model neural network secara berurutan.
    model = Sequential()
    # Input Layer [16 Neuron]
    model.add(Dense(64, input_shape=(Train_X.shape[1],), activation='relu'))
    # Hidden Layer Pertama [128 Neuron]
    model.add(Dense(128, activation='relu'))
    # Hidden Layer 2 [64 Neuron]
    model.add(Dense(64, activation='relu'))
    # Output Layer [Aktivasi Softmax]
    model.add(Dense(len(classes), activation='softmax'))

    # Mengompile model menggunakan optimizer adam dan categorical crossentropy loss
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    # Melatih model dengan data yang sudah diproses oleh NLP.
    model.fit(Train_X, Train_Y, epochs=200, batch_size=8, verbose=2)

    # menyimpan model training
    model.save(menyimpan_model)

    # menampilkan output hasil model
    print(f'\nPelatihan model selesai, file disimpan di {menyimpan_model}')

# Menampilkan hasil "accuracy" dan "loss" dalam bentuk grafik

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    tokens = nltk.word_tokenize(text)
    tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in ignore_words]
    return ' '.join(tokens)

vectorizer = CountVectorizer(vocabulary=words)
vectorizer.fit(words)

label_encoder = LabelEncoder()
label_encoder.fit(classes)

def get_response(user_input):
    # proses input
    preprocessed_input = preprocess_text(user_input)
    # Mengubah input menggunakan vectorizer
    input_vector = vectorizer.transform([preprocessed_input]).toarray()
    print(f"\nInput Vector:")
    print(np.array_str(input_vector, max_line_width=52))
    # Memprediksi probabilitas menggunakan model
    prediksi_masalah = model.predict(input_vector)
    # mencari indeks kelas dengan probabilitas tertinggi
    prediksi_kelas = np.argmax(prediksi_masalah)
    # Decode class menjadi tag
    prediksi_tag = label_encoder.inverse_transform([prediksi_kelas])[0]

    confidence = np.max(prediksi_masalah)
    if confidence < 0.5:  # Threshold untuk menentukan apakah input dikenali atau tidak
        return ["Mohon maaf, saya tidak mengerti pertanyaan anda, silahkan ajukan pertanyaan lain."], prediksi_kelas, "error"

    # Cetak prediksi_kelas dan prediksi_tag
    print(f"\nPrediksi Kelas: {prediksi_kelas}")
    print(f"\nPrediksi Tag: {prediksi_tag}")

    # Temukan respons sesuai tag
    for intent in data["intents"]:
        if intent["tag"] == prediksi_tag:
            return intent["responses"], prediksi_kelas, prediksi_tag

@app.route('/', methods=['OPTIONS'])
def handle_options():
    return jsonify({'status': 'success'}), 200

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data['message']

    bot_response, prediksi_kelas, prediksi_tag = get_response(user_input)

    return jsonify({
        'botResponse': bot_response,
        'prediksiKelas': int(prediksi_kelas),
        'prediksiTag': prediksi_tag
    })

if __name__ == '__main__':
    app.run(debug=True)

