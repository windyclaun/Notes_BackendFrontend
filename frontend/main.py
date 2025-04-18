import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='')

@app.route('/')
def serve_index():
    return send_from_directory('', 'index.html')

@app.route('/editnote.html')
def serve_editnote():
    return send_from_directory('', 'editnote.html')

@app.route('/style/<path:path>')
def send_style(path):
    return send_from_directory('style', path)

@app.route('/scripts/<path:path>')
def send_scripts(path):
    return send_from_directory('scripts', path)
