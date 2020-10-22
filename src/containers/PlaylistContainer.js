import React from 'react';
import PropTypes from 'prop-types';
import Playlist from '../components/Playlist/Playlist';

export default class PlaylistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areYouSure: false,
      deleteImminent: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete() {
    if (!this.state.areYouSure && !this.state.deleteImminent) {
      this.setState({
        areYouSure: true,
      }, () => {
        this.t = setTimeout(() => {
          this.setState({
            areYouSure: false
          })
        }, 5000);
      });
    } else if (this.state.areYouSure && !this.state.deleteImminent) {
      this.setState({
        deleteImminent: true
      }, () => {
        this.t = setTimeout(() => {
          this.props.removePlaylist('current');
        }, 3000);
      });
    } else if (this.state.deleteImminent) {
      this.setState({
        deleteImminent: false,
        areYouSure: false
      });
    };
  }
  render() {
    return (
      <Playlist
        tracks={this.props.tracks}
        playlistName={this.props.playlistName}
        handleListNameChange={this.props.handleListNameChange}
        removeTrack={this.props.removeTrack}
        savePlaylist={this.props.savePlaylist}
        playTrack={this.props.playTrack}
        pauseTrack={this.props.pauseTrack} 
        isTrackPlayed={this.props.isTrackPlayed}
        clearPlaylist={this.props.clearPlaylist}
        isCurrentPlaylistOnList={this.props.isCurrentPlaylistOnList}
        isSavedPlaylistAltered={this.props.isSavedPlaylistAltered}
        handleDelete={this.handleDelete}
        areYouSure={this.state.areYouSure}
        deleteImminent={this.state.deleteImminent}
      />
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.areYouSure && !prevState.deleteImminent) {
      clearTimeout(this.t);
    } else if (prevState.deleteImminent) {
      clearTimeout(this.t);
    };
  }
};

PlaylistContainer.propTypes = {
  tracks: PropTypes.array.isRequired,
  playlistName: PropTypes.string.isRequired,
  handleListNameChange: PropTypes.func.isRequired,
  removeTrack: PropTypes.func.isRequired,
  savePlaylist: PropTypes.func.isRequired,
  playTrack: PropTypes.func.isRequired,
  pauseTrack: PropTypes.func.isRequired,
  isTrackPlayed: PropTypes.bool.isRequired,
  clearPlaylist: PropTypes.func.isRequired,
  isCurrentPlaylistOnList: PropTypes.bool.isRequired,
  isSavedPlaylistAltered: PropTypes.bool.isRequired,
  removePlaylist: PropTypes.func
};
