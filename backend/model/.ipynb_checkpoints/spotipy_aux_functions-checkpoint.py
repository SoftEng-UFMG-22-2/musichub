import pickle as pkl
import spotipy
from spotipy.oauth2 import SpotifyOAuth

from .spotify_api_functions import request_artist_data,get_auth_key
"""
Funções auxiliares para manipular dados de artistas.
"""

def format_data(json_data:dict,sort_by_popularity:bool=True)->list[tuple]:
    artists = json_data['artists']
    items = artists['items']
    artists_data_list = []
    for item in items:
        name = item['name']
        artist_id = item['id']
        genres = ",".join( item['genres'] )
        popularity = item['popularity']
        artists_data_list.append((name,artist_id,genres,popularity))
    if sort_by_popularity:
        artists_data_list = sorted(artists_data_list,key=lambda x:x[-1],reverse=True)
    return artists_data_list

def get_artist_ids(artist_name_list:list,auth_key:str,pick_most_popular:bool=True,format_ids:bool=True)->list[str]:
    if pick_most_popular:
        artist_ids = [format_data(request_artist_data(artist_name,auth_key))[0][1] for artist_name in artist_name_list]
        if format_ids:
            artist_ids = ['spotify:artist:' + artist_id for artist_id in artist_ids]
        return artist_ids
    else:
        # TODO: IMPLEMENT
        pass
    
def init_spotipy(scope:str="playlist-modify-public",redirect_uri:str="https://henrysilvacs.github.io/basicMLpy/")->tuple:
    credentials = pkl.load(open("spotipy_credentials.pkl","rb"))
    credentials["auth_key"]=get_auth_key(credentials["client_id"],credentials["client_secret"])
    
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope,
                redirect_uri=redirect_uri,
                client_id=credentials['client_id'],
                client_secret=credentials['client_secret'],
                show_dialog=True,
                cache_path="client_token.txt"))
    return (sp,credentials)