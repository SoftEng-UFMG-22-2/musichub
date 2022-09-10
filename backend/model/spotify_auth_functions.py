import requests as r
from sys import argv, exit
from base64 import b64encode
import json

"""
Funções para fazer requests com a API do spotify.
"""

def get_auth_key(client_id:str,client_secret:str)->str:
    headers = {}
    client_str = f"{client_id}:{client_secret}"
    client_str_bytes = client_str.encode('ascii')
    client_str = b64encode( client_str_bytes ) 
    client_str = client_str.decode('ascii')
    auth_header = f"Basic {client_str}"
    headers['Authorization'] = auth_header
    data = {
        "grant_type" : "client_credentials"
    }
    url = "https://accounts.spotify.com/api/token"
    myreq = r.post(url, headers=headers, data=data)
    status_code = myreq.status_code 
    content = myreq.content.decode('ascii')
    json_data = json.loads(content)
    access_token = json_data['access_token']
    return access_token

def request_artist_data(artist_name:str,auth_key:str)->dict:
    url = f"https://api.spotify.com/v1/search?type=artist&q={artist_name}"
    headers = {
        "Accept"        : "application/json",
        "Content-Type"  : "application/json",
    }
    headers['Authorization'] = f"Bearer {auth_key}"
    myreq = r.get(url, headers=headers)
    content = myreq.content
    status_code = myreq.status_code 
    if status_code != 200:
        print("Error: status code:", status_code)
        exit(-1)
    json_data = json.loads(content)
    return json_data