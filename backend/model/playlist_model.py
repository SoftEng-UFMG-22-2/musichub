import spotipy

from .spotipy_aux_functions import get_artist_ids

"""
Funções relacionadas ao modelo de geração de playlists.
"""

def create_playlist_from_artists(sp:spotipy.client.Spotify,credentials:dict,artist_name_list:list,playlist_name:str="musichub_test")->[str,str]:
    artist_ids = get_artist_ids(artist_name_list,credentials["auth_key"])
    track_uris = []
    for artist_id in artist_ids:
        track_uris += [track["uri"] for track in sp.artist_top_tracks(artist_id,country="BR")["tracks"]]

    playlist_data = sp.user_playlist_create(
                user=sp.me()["id"],
                name=playlist_name)
    
    sp.playlist_add_items(
                playlist_id=playlist_data["id"],
                items=track_uris
            )
    
    return playlist_data["uri"],playlist_data["external_urls"]["spotify"]