'use strict';
import {connect} from 'react-redux';
import React, { Component } from 'react';

import initialState from '../initialState';
import AUDIO from '../audio';

import Sidebar from '../components/Sidebar';
import Album from '../components/Album';
import AlbumsContainer from './AlbumsContainer.js';
import Player from '../components/Player';
import store from '../myRedux.js';
import toggle from '../actionCreators';
import toggleOne from '../actionCreators';

const mod = (num, m) =>((num % m) + m) % m;

const skip = (interval, { currentSongList, currentSong }) => {
  let idx = currentSongList.map(song => song.id).indexOf(currentSong.id);
  idx = mod(idx + interval, currentSongList.length);
  const next = currentSongList[idx];
  return [next, currentSongList];
};

const mapStateToProps = ({isPlaying, currentSong, currentSongList, selectedAlbum}) => ({
      isPlaying, currentSong, currentSongList
})      //why are the parentheses necessary after the arrow?


const mapDispatchToProps = function(dispatch, ownProps){
        return {
            toggleOne: (song, list) => dispatch(toggleOne(song, list)),
            toggle: () => dispatch(toggle())
        }
}

export default class AppContainer extends Component {

  constructor () {
    super();
  }

  componentDidMount () {
 
    // AUDIO.addEventListener('ended', () => 
    //   this.next());
    // AUDIO.addEventListener('timeupdate', () => 
    //   this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }



  // toggleOne (selectedSong, selectedSongList) {
  //   if (selectedSong.id !== this.state.currentSong.id)
  //     this.startSong(selectedSong, selectedSongList);
  //   else this.toggle();
  // }

  // toggle () {
  //   if (this.state.isPlaying) this.pause();
  //   else this.play();
  // }

  // next () {
  //   this.startSong(...skip(1, this.state));
  // }

  // prev () {
  //   this.startSong(...skip(-1, this.state));
  // }

  // seek (decimal) {
  //   AUDIO.currentTime = AUDIO.duration * decimal;
  //   this.setProgress(AUDIO.currentTime / AUDIO.duration);
  // }

  // setProgress (progress) {
  //   this.setState({ progress });
  // }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar />
        </div>
        <div className="col-xs-10">
          {this.props.selectedAlbum.id ?  <AlbumContainer> : <AlbumsContainer/> }             
        </div>        
      </div>
    );
  }
}

const NewAppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
