
//presentation component 
import React from 'react';

export default class Albums extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){
        this.props.getAndLoadAlbums();
        this.props.play();
    }

    render(){
        return (
            
            this.props.selectedAlbum.id ? 
   
         ( <div className="album">
                 <div>
                     <h3>{ album.name }</h3>
                        <img src={ album.imageUrl } className="img-thumbnail" />
                </div>
                <Songs 
                    songs={album.songs}
                    currentSong={currentSong} 
                    isPlaying={isPlaying} 
                    toggle={toggle} />
                </div>
           )
            :
        <div>
            <h3>Albums</h3>
            {
            this.props.albums.map(function(album) {  
            return (
            <div className="row" key={album.id}>
                <div className="col-xs-4">
            
                <a className="thumbnail" href="#">
                    <img src={album.imageUrl} />
                    <div className="caption">
                    <h5>
                        <span></span>
                    </h5>
                    <small>{album.songs.length}</small>
                    </div>
                </a>
                </div>
            </div>
            )
            })
            }
        </div>
        
        )


    }

}

