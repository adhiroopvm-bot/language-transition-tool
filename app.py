from flask import Flask, render_template, request, jsonify
from googletrans import Translator
from gtts import gTTS
import os

app = Flask(__name__)
translator = Translator()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    text = data.get('text')
    src = data.get('src')
    dest = data.get('dest')

    try:
        translated = translator.translate(text, src=src, dest=dest)
        return jsonify({'translated_text': translated.text})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/speak', methods=['POST'])
def speak_text():
    data = request.get_json()
    text = data.get('text')
    language = data.get('language', 'en')

    try:
        tts = gTTS(text=text, lang=language)
        audio_path = os.path.join("static", "output.mp3")
        tts.save(audio_path)
        return jsonify({'audio_path': '/' + audio_path})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
