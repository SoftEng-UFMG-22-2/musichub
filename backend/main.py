from model.spotify_auth_functions import get_auth_key
from model.spotipy_aux_functions import format_data,get_artist_ids
import spotipy
from spotipy.oauth2 import SpotifyOAuth,SpotifyClientCredentials
import pickle as pkl

def create_playlist_from_artists(artist_name_list:list)->None:
    credentials = pkl.load(open('spotipy_credentials.pkl','rb'))
    credentials['auth_key']=get_auth_key(credentials['client_id'],credentials['client_secret'])
    
    sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=credentials['client_id'],
                                                                             client_secret=credentials['client_secret']))
    artist_ids = get_artist_ids(artist_name_list,credentials['auth_key'])
    track_uris = []
    for artist_id in artist_ids:
        track_uris += [track['uri'] for track in sp.artist_top_tracks(artist_id,country='BR')['tracks']]

    print(track_uris)


if __name__ == "__main__":
    artist_name_list = ['Big Time Rush']
    create_playlist_from_artists(artist_name_list)