import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

 class Album extends Component {
   constructor(props) {
     super(props);
 
     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       album: album, 
       currentSong: album.songs[0],
       isPlaying: false,
       isHovered: null,
     };   
      
     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
}

play() {
  this.audioElement.play();
  this.setState({ isPlaying: true });
}

pause() {
  this.audioElement.pause();
  this.setState({ isPlaying: false });
}   

setSong(song) {
  this.audioElement.src = song.audioSrc;
  this.setState({ currentSong: song });
}

handleSongClick(song) {
  const isSameSong = this.state.currentSong === song;
  if (this.state.isPlaying && isSameSong) {
    this.pause();
  } else {
    if (!isSameSong) { this.setSong(song); }     
    this.play();
  }
}

handleMouseOver(song) {
  this.setState ({isHovered: song})
}

handleMouseOut(song) {
  this.setState ({isHovered: null})
}

handleHover(song, index) {
  const isCurrentSong = this.state.currentSong === song;
  const hoveredSong = this.state.isHovered;
  const isPlaying = this.state.isPlaying;

  if (isCurrentSong){
    if (isPlaying) {
      return <span className="ion-md-pause"></span>
    }
    else {
      return <span className="ion-md-play-circle"></span>
    }
  }
  else {
    if (hoveredSong === song){
      return <span className="ion-md-play-circle"></span>
    }
    else {
      return <span>{index + 1}</span>
    }
  }
}

handlePrevClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex - 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}

handleNextClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const numberOfSongs = this.state.album.songs.length; 
  let newIndex = 0;
  if (currentIndex + 1 < numberOfSongs) {
    newIndex = currentIndex + 1;
  }
  else {
    newIndex = currentIndex;
  }
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}
 
   render() {
     return (
       <section className="album">
            <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
           <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
         </section>
         <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>  
           <tbody>
               {this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} 
                  onClick={() => this.handleSongClick(song)}
                  onMouseOver={() => this.handleMouseOver(song)}
                  onMouseOut={() => this.handleMouseOut(song)}>
                  <td>{this.handleHover(song, index)}</td>
                  <td>{song.title}</td>
                  <td>{song.duration} seconds</td>
                </tr>
              )
            }
           </tbody>
         </table> 
         <PlayerBar 
         isPlaying={this.state.isPlaying}
         currentSong={this.state.currentSong}
         handleSongClick={() => this.handleSongClick(this.state.currentSong)}
         handlePrevClick={() => this.handlePrevClick()}
         handleNextClick={() => this.handleNextClick()}
          />
       </section>
     );
   }
 }

export default Album;