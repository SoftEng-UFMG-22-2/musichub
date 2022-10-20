redirectUri = "http://localhost:8000/api/login/"

clientId = "936338be25574faa91f16cff0823a78b"
clientSecret = "ce8b13f2be744c8499610305f95f498b"

scopes = [
    "ugc-image-upload",
    # Spotify Connect
    "user-read-playback-state",
    "user-modify-playback-state","user-read-currently-playing",
    # Playback
    "app-remote-control",
    "streaming",
    # Playlists
    "playlist-read-private","playlist-read-collaborative","playlist-modify-private","playlist-modify-public",
    # Follow
    "user-follow-modify",
    "user-follow-read",
    # Listening History
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
    # Library
    "user-library-modify",
    "user-library-read",
]
