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

from model.playlist_model import PlaylistModel
from model.artist_model import Artist
from model.spotify_api import SpotifyApi

import model.configs as configs


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

# TODO: Place it somewhereelse or make it a FastAPI Session later
sp_session = SpotifyApi()

# Just a root access test
@app.get('/', tags=["root"])
def index():
    return [Artist(id=1, name="John Coltrane"), Artist(id=2, name="Duke Ellington")]


### Starts a new SpotifyApi Session
@app.get('/start')
def start_spotify_api_session():
  sp_session = SpotifyApi(configs.scopes, configs.redirectUri, configs.clientId, configs.clientSecret)
  return sp_session.get_auth_url()

### Returns the spotify authorization page link
@app.get('/api/login_url')
def get_login_url():
    sp_session = SpotifyApi(configs.scopes, configs.redirectUri, configs.clientId, configs.clientSecret)
    return sp_session.get_authorize_url()


# We are coming from Spotify auth page
@app.post('/logging-in')
def logging_in():
    return ["Received"]

@app.post('/create-playlist-artists')
def create_playlists_based_on_artists():
    return
