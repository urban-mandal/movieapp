import requests

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzkyYzExODY3NGJkOTY3MTBkOGQ0NWQxOWYzYjc5MiIsIm5iZiI6MTcxOTYwOTI3OS4xODg2MDEsInN1YiI6IjY2NzgyNTdmZjdkYmZiY2I5NzcwMGU5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.70Nl7tY2A9iwMQhm6l38EwwKDW3ROQkjP4tAq9J1Xzo"
}

url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"

response = requests.get(url, headers=headers)

print(response, type(response.text))
