
//stateful component
import setAlbum from '../actionCreators';
import setCurrentSong from '../actionCreators';
import stopPlaying from '../actionCreators';
import startPlaying from '../actionCreators';
import {connect} from 'react-redux';
import Albums from '../components/Albums';
import Album from '../components/Album';
import {store} from '../myRedux'
import getAndConvertAlbums from '../actionCreators';
import thunkMiddleware from 'redux-thunk';
// import {getAlbums} from '../myRedux'






//accepts a presentational component and returns the stateful component 

// function connect( (mapStateToProps, mapDispatchToProps) => 
//     fnThatTakesAComponent => newComponent
// );

//containers are the smart components that wrap dumb components 

const mapStateToProps = function ({albums, selectedAlbum}, ownProps){
    return {albums, selectedAlbum};
}


const mapDispatchToProps = function(dispatch, ownProps){
        return {
            getAndLoadAlbums () {
               dispatch(getAndConvertAlbums())                    
            }, 
            pause () {
                dispatch(stopPlaying());
            }, 
            play () {
                dispatch(startPlaying());
            }, 
            setAlbum(){
                dispatch(setAlbum());
            }, 
            setCurrentSong(){
                dispatch(setCurrentSong());
            }
        }
}



//dispatch is a fn on store
// const mapDispatchToProps = function(dispatch, ownProps){
//     return {
//         loadAlbums(albums){
//             dispatch(getAndLoadAlbums(albums));
//         }
//         }
// }

//dispatch({type: GET_ALL_ALBUMS, albums})

//mapStateToProps: if anything other than UI changes changes the state --> trigger re-rendering
//mapDispatchToProps: if the user triggers a state change --> fire off a dispatch to the store 
const AlbumsContainer = connect(mapStateToProps, mapDispatchToProps)(Albums);

export default AlbumsContainer;