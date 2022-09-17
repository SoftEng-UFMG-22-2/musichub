from model.spotipy_aux_functions import init_spotipy
from model.playlist_model import create_playlist_from_artists

if __name__ == "__main__":
    artist_name_list = ["BROCKHAMPTON","Kids See Ghosts","Kendrick Lamar"]
    sp,credentials = init_spotipy()
    
    playlist_uri,playlist_link = create_playlist_from_artists(sp,credentials,artist_name_list)
    
    print(playlist_link)