import os
from typing import Union
import random

import spotipy
from spotipy.oauth2 import SpotifyOAuth

from model.spotipy_aux_functions import get_artist_ids
from model.spotify_api_functions import get_auth_key

"""
SpotifyModel class and functions
"""

class PlaylistModel():
    def __init__(self,scope:str="playlist-modify-public", redirect_uri:str="https://localhost:8000/logging-in"):
        """
        Initializes the credentials and auth manager 
        """
        self.auth_key=get_auth_key(os.environ["SPOTIPY_CLIENT_ID"],os.environ["SPOTIPY_CLIENT_SECRET"])
        
        self.auth_manager = SpotifyOAuth(scope=scope,
                    redirect_uri=redirect_uri,
                    client_id=os.environ["SPOTIPY_CLIENT_ID"],
                    client_secret=os.environ["SPOTIPY_CLIENT_SECRET"],
                    show_dialog=True,
                    cache_path="client_token.txt")

        self.sp = spotipy.Spotify(auth_manager=self.auth_manager)
        
    def pick_artists_top_tracks(self,artist_name_list:'list[str]') -> 'list[str]':
        """
        Picks top 10 tracks per artist, given list of artist names 
        """
        artist_ids = get_artist_ids(artist_name_list,self.auth_key)
        tracks_uris = []
        for artist_id in artist_ids:
            tracks_uris += [track["uri"] for track in self.sp.artist_top_tracks(artist_id,country="BR")["tracks"]]
        return tracks_uris
    
    def pick_tracks_from_user_playlists(self,desired_playlist_names:'list[str]',
                                        max_tracks_per_playlist:int=10,
                                        num_tracks_to_sample:int=100) -> 'list[str]':
        """
        Randomly picks tracks from the specified playlists 
        """
        all_user_playlists = self.sp.current_user_playlists()

        desired_playlists = []

        for playlist in all_user_playlists['items']:
            if playlist['name'] in desired_playlist_names:
                desired_playlists.append(playlist)

        if len(desired_playlists) == 0:
            raise ValueError("No playlists with the given names were found on your spotify page!")

        chosen_tracks = []

        for playlist in desired_playlists:
            curr_playlist_tracks = self.sp.user_playlist_tracks(user=self.sp.me()["id"],
                                                                playlist_id=playlist["id"],
                                                                limit=num_tracks_to_sample)["items"]

            curr_playlist_track_uris = [track['track']['uri'] for track in curr_playlist_tracks]

            curr_chosen_tracks = random.sample(curr_playlist_track_uris,k=max_tracks_per_playlist)
            chosen_tracks += curr_chosen_tracks

        chosen_tracks = list(set(chosen_tracks))

        return chosen_tracks
    
    def create_playlist(self,tracks_uris:'list[str]',
                             playlist_name:str="musichub_test")->Union[str,str]:
        """
        Creates a playlist from a list of track uris 
        """
        playlist_data = self.sp.user_playlist_create(
                    user=self.sp.me()["id"],
                    name=playlist_name)

        self.sp.playlist_add_items(
                    playlist_id=playlist_data["id"],
                    items=tracks_uris
                )

        return playlist_data["uri"],playlist_data["external_urls"]["spotify"]
