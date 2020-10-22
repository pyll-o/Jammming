import React from 'react';
import AppComp from '../components/AppComp/AppComp';
import Spotify from '../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      playlistTracks: [],
      searchPhrase: '',
      searchTracks: [],
      playlistName: '',
      isTrackPlayed: false,
      playlists: [],
      isCurrentPlaylistOnList: false,
      hasCheckedForPlaylists: false,
      isSavedPlaylistAltered: false
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleListNameChange = this.handleListNameChange.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.search = this.search.bind(this);
    this.handleSearchResponse = this.handleSearchResponse.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.pauseTrack = this.pauseTrack.bind(this);
    this.clearPlaylist = this.clearPlaylist.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.removePlaylist = this.removePlaylist.bind(this);
    this.getPlaylistDetails = this.getPlaylistDetails.bind(this);
    this.handlePlaylistDetails = this.handlePlaylistDetails.bind(this);
  }
  handleSearchChange({target}) {
    this.setState({
      searchPhrase: target.value
    })
  }
  search() {
    Spotify.generateURLState();
    sessionStorage.searchPhrase = this.state.searchPhrase;
    sessionStorage.playlistName = this.state.playlistName;
    sessionStorage.playlistTracks = JSON.stringify(this.state.playlistTracks);
    const needsLogging = Spotify.spotifyLogin(sessionStorage.urlState);
    if (!needsLogging && this.state.searchPhrase) {
      Spotify.search(this.state.searchPhrase).then(response => this.handleSearchResponse(response));
      this.getPlaylists();
    } else if (!needsLogging && !this.state.searchPhrase) {
      this.getPlaylists();
    }
  }
  handleSearchResponse(response) {
    const searchTracks = response.map(track => ({
      title: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      id: track.id,
      URI: track.uri,
      preview: track.preview_url,
      doubledInPlaylist: false,
      url: track.external_urls.spotify,
      artistUrl: track.artists[0].external_urls.spotify,
      albumUrl: track.album.external_urls.spotify
    }));
    const searchTracksFiltered = searchTracks.filter(track => (!this.state.playlistTracks.map(plTrack => plTrack.id).includes(track.id)));
    this.setState({
      searchTracks: searchTracksFiltered,
      searchPhrase: '',
      isTrackPlayed: false
    });
  }
  handleListNameChange({target}) {
    this.setState({
      playlistName: target.value
    })
  }
  handlePlaylistDetails(response) {
    const playlistName = response.name;
    const playlistTracks = response.tracks.items.map(item => ({
      title: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name,
      id: item.track.id,
      URI: item.track.uri,
      doubledInPlaylist: true,
      preview: item.track.preview_url,
      url: item.track.external_urls.spotify,
      artistUrl: item.track.artists[0].external_urls.spotify,
      albumUrl: item.track.album.external_urls.spotify
    }));
    const trackArr = this.state.searchTracks;
    if (trackArr.length > 0) {
      const idArr = trackArr.map(track => track.id);
      trackArr.forEach(track => {
        track.doubledInPlaylist = false;
      });
      playlistTracks.forEach(playlistTrack => {
        console.log(playlistTrack);
        const index = idArr.indexOf(playlistTrack.id);
        if (index > -1) {
          trackArr[index].doubledInPlaylist = true;
        };        
      });
    };    
    this.setState({
      playlistName: playlistName,
      playlistTracks: playlistTracks,
      searchTracks: trackArr,
      isCurrentPlaylistOnList: true
    });
  }
  getPlaylists() {
    if (!this.state.isCurrentPlaylistOnList) {
      Spotify.getUserPlaylists().then(response => {
        const playlists = response.items.map(item => {
          return {
            id: item.id,
            name: item.name,
            tracks: item.tracks.total,
            images: item.images,
            viewedInDetail: false,
            url: item.external_urls.spotify
          }
        });
        this.setState({
          playlists: playlists,
          hasCheckedForPlaylists: true
        })
      });
    };    
  }
  savePlaylist() {
    const uriArr = this.state.playlistTracks.map(track => track.URI);    
    if (uriArr.length > 0 ) {
      sessionStorage.uriArr = JSON.stringify(uriArr);
      sessionStorage.playlistName = this.state.playlistName;
      sessionStorage.playlistTracks = JSON.stringify(this.state.playlistTracks);
      if (this.state.isCurrentPlaylistOnList) {
        const playlistArr = this.state.playlists;
        const editedPlaylistId = playlistArr.filter(playlist => playlist.viewedInDetail)[0].id;
        sessionStorage.editedPlaylistId = editedPlaylistId
        Spotify.updatePlaylist(sessionStorage.playlistName, JSON.parse(sessionStorage.uriArr), sessionStorage.editedPlaylistId).then(() => {
          sessionStorage.editedPlaylistId = '';
          this.getPlaylists();
          this.clearPlaylist();
        });
      } else {
        Spotify.addPlaylist(sessionStorage.playlistName, JSON.parse(sessionStorage.uriArr)).then(() => {
          this.getPlaylists();
          this.clearPlaylist();
        });
      };
    };
  }
  clearPlaylist() {
    this.setState({
      playlistTracks: [],
      playlistName: '',
      searchPhrase: sessionStorage.searchPhrase,
      isCurrentPlaylistOnList: false,
      isSavedPlaylistAltered: false
    }, () => {
      this.search();
    });
  }
  removePlaylist(playlistToRemove) {
    if (playlistToRemove === 'current') {
      Spotify.generateURLState();
      const playlistArr = this.state.playlists;
      const playlistToDeleteId = playlistArr.filter(playlist => playlist.viewedInDetail)[0].id;
      sessionStorage.playlistToDeleteId = playlistToDeleteId;
      sessionStorage.searchTracks = JSON.stringify(this.state.searchTracks);
      sessionStorage.playlistName = this.state.playlistName;
      sessionStorage.playlistTracks = JSON.stringify(this.state.playlistTracks);
      const needsLogging = Spotify.spotifyLogin(sessionStorage.urlState);
      if (!needsLogging) {
        Spotify.removePlaylist(sessionStorage.playlistToDeleteId).then(() => {
          this.clearPlaylist();
        });
        sessionStorage.playlistToDeleteId = '';
        sessionStorage.searchTracks = [];
      };
    } else {
      Spotify.generateURLState();
      sessionStorage.playlistToRemoveId = playlistToRemove.id;
      sessionStorage.searchTracks = JSON.stringify(this.state.searchTracks);
      sessionStorage.playlistName = this.state.playlistName;
      sessionStorage.playlistTracks = JSON.stringify(this.state.playlistTracks);
      const needsLogging = Spotify.spotifyLogin(sessionStorage.urlState);
      if (!needsLogging) {
        Spotify.removePlaylist(sessionStorage.playlistToRemoveId).then(() => {
          this.getPlaylists();
        });
        sessionStorage.playlistToRemoveId = '';
        sessionStorage.searchTracks = [];
      };
    };      
  }
  getPlaylistDetails(playlistToEdit) {
    const playlistsArr = this.state.playlists;
    const idArr = playlistsArr.map(item => item.id);
    const index = this.state.playlists.indexOf(playlistToEdit);    
    const oldEditedPlaylistArr = playlistsArr.filter(playlist => playlist.viewedInDetail);
    if (oldEditedPlaylistArr.length > 0) {
      const id = oldEditedPlaylistArr[0].id;
      const oldIndex = idArr.indexOf(id);
      playlistsArr[oldIndex].viewedInDetail = false;
    }
    playlistsArr[index].viewedInDetail = true;
    this.setState({
      playlists: playlistsArr
    }, () => {
      Spotify.generateURLState();
      sessionStorage.playlistToEditId = playlistToEdit.id;
      sessionStorage.searchTracks = JSON.stringify(this.state.searchTracks);
      const needsLogging = Spotify.spotifyLogin(sessionStorage.urlState);
      if (!needsLogging) {
        Spotify.getPlaylistDetails(sessionStorage.playlistToEditId).then(response => this.handlePlaylistDetails(response));
        sessionStorage.playlistToEditId = '';
        sessionStorage.searchTracks = [];
      };    
    });    
  }
  addTrack(trackToAdd) {
    if (!this.state.playlistTracks.map(track => track.id).includes(trackToAdd.id)) {
      const trackArr = this.state.searchTracks;
      const idArr = trackArr.map(track => track.id);
      const index = idArr.indexOf(trackToAdd.id);
      trackArr[index].doubledInPlaylist = true;
      trackToAdd.doubledInPlaylist = true;
      this.setState(prev => ({
        searchTracks: trackArr,
        playlistTracks: [...prev.playlistTracks, trackToAdd]
      }));
      if (this.state.isCurrentPlaylistOnList) {
        this.setState({
          isSavedPlaylistAltered: true
        })
      };
    };    
  }
  playTrack(track) {
    if (!this.state.isTrackPlayed) {
      this.setState({
        isTrackPlayed: true
      }, () => {
        document.getElementById(track.id).play();
      })
    }
  }
  pauseTrack(track) {
    if (this.state.isTrackPlayed) {
      this.setState({
        isTrackPlayed: false
      }, () => {
        document.getElementById(track.id).pause();
      })
    } else if (track !== null) {
      document.getElementById(track.id).pause();
    };
  }
  removeTrack(trackToRemove) {
    const searchArr = this.state.searchTracks;
    const idArr = searchArr.map(track => track.id);
    const updatedPlaylistTracks = this.state.playlistTracks.filter(track => track.id !== trackToRemove.id);
    if (idArr.includes(trackToRemove.id)) {
      const index = idArr.indexOf(trackToRemove.id);
      searchArr[index].doubledInPlaylist = false;
      this.setState({
        searchTracks: searchArr,
        playlistTracks: updatedPlaylistTracks
      })
    } else {
      this.setState({
        playlistTracks: updatedPlaylistTracks
      });
    };
    if (this.state.isCurrentPlaylistOnList) {
      this.setState({
        isSavedPlaylistAltered: true
      })
    };        
  }
  render() {
    return (
      <AppComp
        playlistTracks={this.state.playlistTracks}
        searchTracks={this.state.searchTracks} 
        searchPhrase={this.state.searchPhrase}
        handleSearchChange={this.handleSearchChange}
        playlistName={this.state.playlistName}
        handleListNameChange={this.handleListNameChange}
        addTrack={this.addTrack}
        removeTrack={this.removeTrack}
        search={this.search}
        savePlaylist={this.savePlaylist}
        playTrack={this.playTrack}
        pauseTrack={this.pauseTrack}
        isTrackPlayed={this.state.isTrackPlayed}
        playlists={this.state.playlists}
        clearPlaylist={this.clearPlaylist}
        removePlaylist={this.removePlaylist}
        isCurrentPlaylistOnList={this.state.isCurrentPlaylistOnList}
        hasCheckedForPlaylists={this.state.hasCheckedForPlaylists}
        getPlaylistDetails={this.getPlaylistDetails}
        isSavedPlaylistAltered={this.state.isSavedPlaylistAltered}
      />
    );
  }
  componentDidMount() {
    if (window.location.href.match(/access_token=/))  {
      Spotify.getAccessToken();
      this.setState({
        searchPhrase: sessionStorage.searchPhrase,
        searchTracks: ((!sessionStorage.searchPhrase && sessionStorage.searchTracks) ? JSON.parse(sessionStorage.searchTracks) : []),
        playlistName: sessionStorage.playlistName,
        playlistTracks: JSON.parse(sessionStorage.playlistTracks)
      }, () => {
        this.getPlaylists();
        if (this.state.searchPhrase) {
          Spotify.search(this.state.searchPhrase).then(response => this.handleSearchResponse(response));
        };
        if (sessionStorage.playlistToRemoveId) {
          Spotify.removePlaylist(sessionStorage.playlistToRemoveId).then(() => {
            this.getPlaylists();
          });
          sessionStorage.playlistToRemoveId = '';
          sessionStorage.searchTracks = [];
        };
        if (sessionStorage.playlistToDeleteId) {
          Spotify.removePlaylist(sessionStorage.playlistToDeleteId).then(() => {
            this.clearPlaylist();
          });
          sessionStorage.playlistToDeleteId = '';
          sessionStorage.searchTracks = [];
        }
        if (sessionStorage.playlistToEditId) {
          Spotify.getPlaylistDetails(sessionStorage.playlistToEditId).then(response => this.handlePlaylistDetails(response));
          sessionStorage.playlistToEditId = '';
          sessionStorage.searchTracks = [];
        };
        if (sessionStorage.editedPlaylistId) {
          Spotify.updatePlaylist(sessionStorage.playlistName, JSON.parse(sessionStorage.uriArr), sessionStorage.editedPlaylistId).then(() => {
            sessionStorage.editedPlaylistId = '';
            this.getPlaylists();
            this.clearPlaylist();
          });
        }
      });
    }
  }
};

export default App;
