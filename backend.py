from flask import Flask
from flask import render_template, request, jsonify
from spaceintopercent import spaceinto
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/submit', methods=['POST'])
def userdata():
    user_data = request.form.get('formSearch')
    user_data_space = spaceinto(user_data)
    print(user_data_space)
    return jsonify({'user_data': user_data_space})
