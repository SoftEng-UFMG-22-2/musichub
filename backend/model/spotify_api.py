import spotipy
from spotipy.oauth2 import SpotifyOAuth

from model.spotipy_aux_functions import get_artist_ids
from model.spotipy_aux_functions import get_auth_key

from typing import Union
import random
import os

"""
This is a Static Class as our app is made for a single user only
- Do not instantiate it
"""
class SpotifyApi():
	# We now have 2 main static class variables:
	#  - SpotifyApi.auth_manager
	#  - SpotifyApi.sp   (this one is authenticated under the current User)

	logged = False # ! debug only

	"""
		Initializes the auth manager
	"""
	def start(scope         :str = "",
				 		redirect_uri  :str = "",
				 		client_id     :str = None,
				 		client_secret :str = None):

				SpotifyApi.logged = False # ! debug only

				if scope == "":
							return

				SpotifyApi.auth_manager = SpotifyOAuth(scope=scope,
						redirect_uri=redirect_uri,
						client_id=client_id,
						client_secret=client_secret,
						show_dialog=True,
						cache_path="client_token.txt")

	"""
		Initializes the authenticated Spotipy api
	"""
	def login(code):
		SpotifyApi.logged = True # ! debug only?
		SpotifyApi.auth_manager.get_access_token(code)
		SpotifyApi.sp = spotipy.Spotify(auth_manager=SpotifyApi.auth_manager)

	def get_auth_url():
		return SpotifyApi.auth_manager.get_authorize_url()

	def get_top_artists_dict(limit:int=10,time_range:str="medium_term"):
		"""
		Creates top artist name to image url dict
		"""
		top_artists_info = SpotifyApi.sp.current_user_top_artists(limit=limit,time_range=time_range)['items']
		artist_name2url = {}

		for artist_info in top_artists_info:
			artist_name2url[artist_info['name']] = artist_info['images'][0]['url']

		return artist_name2url

	def get_top_tracks_dict(limit:int=10,time_range:str="medium_term"):
		"""
		Creates top tracks name to image url dict
		"""
		top_tracks_info = SpotifyApi.sp.current_user_top_tracks(limit=limit,time_range=time_range)['items']
		tracks_name2url = {}

		for track_info in top_tracks_info:
			if len(track_info['album']['images']) > 0:
				tracks_name2url[track_info['name']] = track_info['album']['images'][0]['url']

		return tracks_name2url

	def get_playlist_dict(limit:int=30):
		"""
		Creates top artist name to image url dict
		"""
		playlists_info = SpotifyApi.sp.current_user_playlists(limit=limit)['items']
		playlist_name2url = {}

		for playlist_info in playlists_info:
			if len(playlist_info['images']) > 0:
				playlist_name2url[playlist_info['name']] = playlist_info['images'][0]['url']
		return playlist_name2url

	def pick_artists_top_tracks(artist_name_list:'list[str]') -> 'list[str]':
		"""
		Picks top 10 tracks per artist, given list of artist names
		"""
		artist_ids = get_artist_ids(artist_name_list,SpotifyApi.auth_key)
		tracks_uris = []
		for artist_id in artist_ids:
				tracks_uris += [track["uri"] for track in SpotifyApi.sp.artist_top_tracks(artist_id,country="BR")["tracks"]]
		return tracks_uris

	def pick_tracks_from_user_playlists(desired_playlist_names:'list[str]',
                                        max_tracks_per_playlist:int=10,
                                        num_tracks_to_sample:int=100) -> 'list[str]':
		"""
		Randomly picks tracks from the specified playlists
		"""
		all_user_playlists = SpotifyApi.sp.current_user_playlists()

		desired_playlists = []

		for playlist in all_user_playlists['items']:
				if playlist['name'] in desired_playlist_names:
						desired_playlists.append(playlist)

		if len(desired_playlists) == 0:
				raise ValueError("No playlists with the given names were found on your spotify page!")

		chosen_tracks = []

		for playlist in desired_playlists:
				curr_playlist_tracks = SpotifyApi.sp.user_playlist_tracks(user=SpotifyApi.sp.me()["id"],
																	playlist_id=playlist["id"],
																	limit=num_tracks_to_sample)["items"]

				curr_playlist_track_uris = [track['track']['uri'] for track in curr_playlist_tracks
				if track['track']['uri'].split(":")[1] != "local"]

				curr_chosen_tracks = random.sample(curr_playlist_track_uris,k=max_tracks_per_playlist)
				chosen_tracks += curr_chosen_tracks

		chosen_tracks = list(set(chosen_tracks))

		return chosen_tracks

	def create_playlist(tracks_uris:'list[str]',
                             playlist_name:str="musichub_test")->Union[str,str]:
		"""
		Creates a playlist from a list of track uris
		"""
		playlist_data = SpotifyApi.sp.user_playlist_create(
								user=SpotifyApi.sp.me()["id"],
								name=playlist_name)

		SpotifyApi.sp.playlist_add_items(
								playlist_id=playlist_data["id"],
								items=tracks_uris
						)

		return playlist_data["uri"],playlist_data["external_urls"]["spotify"]
