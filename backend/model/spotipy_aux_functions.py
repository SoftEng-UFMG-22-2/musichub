from .spotify_auth_functions import request_artist_data

"""
Funções auxiliares para manipular dados de artistas.
"""

def format_data(json_data:dict,sort_by_popularity:bool=True)->list:
    artists = json_data['artists']
    items = artists['items']
    artists_data_list = []
    for item in items:
        name = item['name']
        artist_id = item['id']
        genres = ",".join( item['genres'] )
        popularity = item['popularity']
        if genres=="":
            continue
        artists_data_list.append((name,artist_id,genres,popularity))
    if sort_by_popularity:
        artists_data_list = sorted(artists_data_list,key=lambda x:x[-1],reverse=True)
    return artists_data_list

def get_artist_ids(artist_name_list:list,auth_key:str,pick_most_popular:bool=True,format_ids:bool=True)->list:
    if pick_most_popular:
        artist_ids = [format_data(request_artist_data(artist_name,auth_key))[0][1] for artist_name in artist_name_list]
        if format_ids:
            artist_ids = ['spotify:artist:' + artist_id for artist_id in artist_ids]
        return artist_ids
    else:
        # TODO IMPLEMENT
        pass