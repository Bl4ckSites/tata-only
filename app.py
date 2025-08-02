from flask import Flask, request, jsonify
from flask_cors import CORS  # Importante para evitar erros de CORS

app = Flask(__name__)
CORS(app)  # Permite requisições de qualquer domínio

@app.route('/source')
def detect_source():
    # 1. Detecção por Referer
    referer = request.headers.get('Referer', '').lower()
    
    referer_map = {
        'instagram.com': 'instagram',
        'twitter.com': 'twitter',
        'x.com': 'twitter',
        'facebook.com': 'facebook',
        'tiktok.com': 'tiktok'
    }
    
    for domain, platform in referer_map.items():
        if domain in referer:
            return jsonify({'hide': platform})

    # 2. Detecção por User-Agent
    user_agent = request.headers.get('User-Agent', '').lower()
    
    ua_map = {
        'instagram': 'instagram',
        'twitter': 'twitter',
        'facebook': 'facebook',
        'fbav': 'facebook',  # Facebook App
        'tiktok': 'tiktok'
    }
    
    for keyword, platform in ua_map.items():
        if keyword in user_agent:
            return jsonify({'hide': platform})

    return jsonify({'hide': None})

if __name__ == '__main__':
    app.run(debug=True)