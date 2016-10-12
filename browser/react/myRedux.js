
import React from 'react';
import * as redux from 'redux'; 
import ReactDOM from 'react-dom';
import initialState from './initialState.js';
const Provider = require('react-redux').Provider;
const connect = require('react-redux').connect;
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

export const GET_ALL_ALBUMS = "GET ALL ALBUMS";
export const START_PLAYING = 'START_PLAYING';
export const STOP_PLAYING = 'STOP_PLAYING';
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
export const SET_ALBUM = 'SET_ALBUM';

// function asyncThing () {
//     return function (dispatch) {
//         //.. stuff happens
//     }
// }

// //...

// asyncFunc()(dispatch)
// dispatch(asyncThing())

const isPlaying = (state = false, action) => {
  switch (action.type) {
    case START_PLAYING: return true;
    case STOP_PLAYING: return false;
    default: return state;
  }
};

const currentSong = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_SONG: return action.currentSong;
    default: return state;
  }
};

const currentSongList = (state = [], action) => {
  switch (action.type) {
    case SET_CURRENT_SONG: return action.currentSongList;
    default: return state;
  }
};

const albums = (state = [], action) => {
       //action has both a type and an action property
    switch(action.type){
        case GET_ALL_ALBUMS: return action.albums;
        default: return state; 
    }
 
}

const setAlbum = (state = {}, action) => {
    switch(action.type){
        case SET_ALBUM: return action.album;
        default: return state;
    }
}

const applyMiddleware = redux.applyMiddleware;

const rootReducer = redux.combineReducers({
    albums, 
    isPlaying,
    currentSong,
    currentSongList,
    setAlbum
})


const store = redux.createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware));








module.exports = {
    store: store,
}



