export const initialState = {
    user: null,
    playlists: null,
    playing: false,
    item: null,
    top_artists: null,
    top_tracks: null,
    logged: false
    // REMOVER TOKEN DEPOIS QUE O DESENVOLVIMENTO TERMINAR
    // token: 'BQAqyXANwP2BIYvM3KKsjAE5kEgOeAACd401oDJsx6MBAfYhrGcQq1u4aV80beUqPQTTRgzyze3q0jmewRMR_aM_MUn6EeslAQwi3pbFWLDieT-8FX00oVdkVVNFE1mrLQhrZIZRg0elpn6-uzeOXTnwat-0uumYU0qJxzuXmm2PXJM5r_Wv9IoC3hZrxUnLFmvOWQbwEmMsqpDICB---B9BggeQQwL8cLhH1oHBMooxrktWDJChvgDuer8Ej_ZydbsEAgtbuDKDJDSPETmT22KK44DaKkND0dp43Co2ai8FzSwNnEfquVnifFIePHpFxBVy',
};

const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
        case 'SET_LOGGED':
            return {
                ...state,
                logged: action.logged
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists,
            };
        case 'SET_TOP_ARTISTS':
            return {
                ...state,
                top_artists: action.top_artists,
            };
        case 'SET_TOP_TRACKS':
            return {
                ...state,
                top_tracks: action.top_tracks,
            };
        default:
            return state;
    }
}

export default reducer;
