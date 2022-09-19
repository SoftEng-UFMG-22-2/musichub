"""
Prerequisites
    Before running main.py, on your (env)$
    set the environment variables:
      (env)$ export SPOTIPY_CLIENT_ID=936338be25574faa91f16cff0823a78b
      (env)$ export SPOTIPY_CLIENT_SECRET=client_secret_here

    --> on Windows, use `SET` instead of `export`
"""

from urllib import request
from fastapi import FastAPI, Query, Request
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from model.spotipy_aux_functions import auth_spotipy
from model.playlist_model import create_playlist_from_artists

from model.artist_model import Artist

app = FastAPI(
  title = "MusicHub",
  description = "Connect to your spotify account, discover your favorite artists and tracks, create new playlists",
  version = "0.1"
)

origins = [
  "http://localhost:3000",
  "localhost:3000"
]

# This enables *Cross Origin Resource Sharing*
# Basically it allows the frontend to make requests to this app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# TODO: Change the location of this
client_data = dict()

# Just a root access test
@app.get('/', tags=["root"])
def index():
    return [Artist(id=1, name="John Coltrane"), Artist(id=2, name="Duke Ellington")]


# We come here from Login Button
# How it works:
  # We define the type of operation (i.e. GET on /login)
@app.get('/login')
def redirect_to_authorise(): # and the first defined function is called
    auth_url = auth_spotipy(redirect_uri="https://localhost:8000/logging-in")
    return RedirectResponse(auth_url) # we then return either an object that turns into a JSON or a response

    """ Training code of the authorization request !!! REMOVE IT LATER !!!
    query_params = {
      "client_id" : "936338be25574faa91f16cff0823a78b", # ID of the Spotify App I created to access users data
      "response_type" : "code",
      "redirect_uri" : "https://localhost:8000",
      "scope" : "playlist-modify-public",
      "show_dialog" : "true"
    }

    url = f'https://accounts.spotify.com/authorize/?'
    query = "client_id=" + query_params["client_id"] + "&"
    query+= "response_type=" + query_params["response_type"] + "&"
    query+= "redirect_uri=" + query_params["redirect_uri"] + "&"
    query+= "scope=" + query_params["scope"] + "&"
    query+= "show_dialog=" + query_params["show_dialog"] + "&"
    return RedirectResponse(url + query)"""


# We are coming from Spotify auth page
@app.post('/logging-in')
def logging_in():
  return ["Received"]

@app.post('/create-playlist-artists')
def create_playlists_based_on_artists():
  #artist_name_list = ["BROCKHAMPTON","Kids See Ghosts","Kendrick Lamar"]
  #playlist_uri,playlist_link = create_playlist_from_artists(sp,credentials,artist_name_list)
  return
