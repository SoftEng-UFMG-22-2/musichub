from typing import Union
#from model.spotipy_aux_functions import init_spotipy
#from model.playlist_model import create_playlist_from_artists
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


"""
if __name__ == "__main__":
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)

    artist_name_list = ["BROCKHAMPTON","Kids See Ghosts","Kendrick Lamar"]
    sp,credentials = init_spotipy()

    playlist_uri,playlist_link = create_playlist_from_artists(sp,credentials,artist_name_list)

    print(playlist_link)
"""
