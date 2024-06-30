from flask import Flask
from flask import render_template, request, jsonify
from spaceintopercent import spaceinto
import requests
headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzkyYzExODY3NGJkOTY3MTBkOGQ0NWQxOWYzYjc5MiIsIm5iZiI6MTcxOTYwOTI3OS4xODg2MDEsInN1YiI6IjY2NzgyNTdmZjdkYmZiY2I5NzcwMGU5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.70Nl7tY2A9iwMQhm6l38EwwKDW3ROQkjP4tAq9J1Xzo"
}
page = 1
searchword = ''
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search', methods=['POST'])
def userdata():
    global page
    page = 1
    user_data = request.form.get('formSearch')
    user_data_space = spaceinto(user_data)
    return search_movies(user_data_space)


@app.route('/getmovielist', methods=['GET'])
def getmovielist():
    url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"

    response = requests.get(url, headers=headers)
    jsonresponse = response.json()
    return jsonify({'movies': jsonresponse})


@app.route('/new_page', methods=['GET'])
def get_next_page():
    global page
    page += 1
    url = f"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page={
        page}&sort_by=popularity.desc"
    response = requests.get(url, headers=headers)
    jsonresponse = response.json()
    return jsonify({'movies': jsonresponse})


@app.route('/new_page_search', methods=['GET'])
def get_next_page_search():
    global page, searchword
    page += 1
    url = f"https://api.themoviedb.org/3/search/movie?query={
        searchword}&include_adult=false&language=en-US&page={page}"
    response = requests.get(url, headers=headers)
    jsonresponse = response.json()
    return jsonify({'movies': jsonresponse})


def search_movies(input):
    global searchword
    url = f"https://api.themoviedb.org/3/search/movie?query={
        input}&include_adult=false&language=en-US&page=1"
    searchword = input
    response = requests.get(url, headers=headers)
    jsonresponse = response.json()
    return jsonify({'movies': jsonresponse})
