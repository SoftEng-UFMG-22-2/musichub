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

# Just a root access test
@app.get('/', tags=["root"])
def index():
    if SpotifyApi.logged:
      return SpotifyApi.sp.me()
    return "Not logged"

## Login Step 1
#   Starts a new SpotifyApi Session and
#   returns the spotify authorization page link
@app.get('/api/start')
def start_spotify_api_session():
  SpotifyApi.start(configs.scopes, configs.redirectUri, configs.clientId, configs.clientSecret)
  #return sp_session.get_auth_url().replace("response_type=code","response_type=token")
  return SpotifyApi.get_auth_url()

## Login Step 2
#   Finishs initializing the API
#   using the auth code on the URL
@app.get('/api/login/')
def login(code):
  SpotifyApi.login(code)
  return RedirectResponse("http://localhost:3000")

### Checks if a User is logged in
@app.get('/api/logout')
def logout():
  SpotifyApi.logged = False

### Checks if a User is logged in
@app.get('/api/isloggedin')
def is_logged_in():
  return SpotifyApi.logged

### Returns info about the user
@app.get('/me')
def index():
    if SpotifyApi.logged:
      return SpotifyApi.sp.me()
    return "Not logged"

### Returns the top artists of the user
@app.get('/api/topartists')
def get_top_artists():
    return SpotifyApi.get_top_artists_dict(10)


### Returns the playlists of the user
@app.get('/api/toptracks')
def get_user_top_tracks():
    return SpotifyApi.get_top_tracks_dict(10)


### Returns the playlists of the user
@app.get('/api/playlists')
def get_user_playlists():
    return SpotifyApi.get_playlist_dict(30)


@app.post('/create-playlist')
def create_playlist_based_on_artists(artist_name_list:list[str]):
  artist_top_tracks = SpotifyApi.pick_artists_top_tracks(artist_name_list)
  return SpotifyApi.create_playlist(artist_top_tracks,playlist_name="MusicHub:TopArtistsMix")

@app.post('/create-mix-playlist')
def create_playlist_based_on_playlists(desired_playlist_names:list[str]):
  playlists_tracks = SpotifyApi.pick_tracks_from_user_playlists(desired_playlist_names)
  return SpotifyApi.create_playlist(playlists_tracks, playlist_name="MusicHub:PlaylistMix")