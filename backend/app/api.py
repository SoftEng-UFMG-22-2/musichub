from typing import List

from model.spotipy_aux_functions import init_spotipy
from model.playlist_model import create_playlist_from_artists

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

DB: List[Artist] = [
    Artist(id=1, name="John Coltrane"),
    Artist(id=2, name="Duke Ellington")
]


@app.get('/', tags=["root"])
def index():
    return DB

@app.get('/login')
def index():
    return "https://open.spotify.com/"


if __name__ == "__main__":
    artist_name_list = ["BROCKHAMPTON","Kids See Ghosts","Kendrick Lamar"]


    playlist_uri,playlist_link = create_playlist_from_artists(sp,credentials,artist_name_list)

    print(playlist_link)

