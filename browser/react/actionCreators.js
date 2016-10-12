import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import initialState from './initialState.js';
import * as redux from 'redux'; 
import React from 'react';


export const GET_ALL_ALBUMS = "GET ALL ALBUMS";
export const START_PLAYING = 'START_PLAYING';
export const STOP_PLAYING = 'STOP_PLAYING';
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
export const SET_ALBUM = 'SET_ALBUM';

// const getAlbums = function(albums) {
//     return {type: GET_ALL_ALBUMS, albums}
// };


const convertAlbum = album => {
  album.imageUrl = `/api/albums/${album.id}/image`;
  album.songs = album.songs.map(convertSong);
  return album;
};

const convertSong = song => {
  song.audioUrl = `/api/songs/${song.id}/audio`;
  return song;
};


export const getAndConvertAlbums = () => {
    return dispatch => {
      fetch('/api/albums')
        .then(res => res.json())
        .then(albums => {
            albums= albums.map(convertAlbum);
            dispatch({type: GET_ALL_ALBUMS, albums}) 
        });                  
    
    }
}

export const startPlaying = () => {
    return (dispatch) => {
        AUDIO.play();
        dispatch({type: START_PLAYING})
    }
}

export const stopPlaying= () =>{
    return (dispatch) => {
        AUDIO.pause();
        dispatch({type: STOP_PLAYING});
    }
}

export const setCurrentSong = (selectedSong, currentSongList) => {
    return (dispatch) => {
        dispatch({type: SET_CURRENT_SONG, currentSong: selectedSong});
    }
}

export const setAlbum = (album) => {
    return (dispatch) => {
        dispatch({type: SET_ALBUM, album});
    }
}

export const load = (currentSong, currentSongList) => dispatch => {
  AUDIO.src = currentSong.audioUrl;
  AUDIO.load();
  dispatch(setCurrentSong(currentSong, currentSongList));
};

export const startSong = (song, list) => dispatch => {
  dispatch(pause());
  dispatch(load(song, list));
  dispatch(play());
};

export const toggle = () => (dispatch, getState) => {
  const { isPlaying } = getState();
  if (isPlaying) dispatch(pause()); 
  else dispatch(play());
};

export const toggleOne = (selectedSong, selectedSongList) => 
  (dispatch, getState) => {
    const { currentSong } = getState();
    if (selectedSong.id !== currentSong.id)
      dispatch(startSong(selectedSong, selectedSongList));
    else dispatch(toggle());
};


