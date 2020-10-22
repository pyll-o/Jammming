import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faTrash, faQuestion, faExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Playlist(props) {
    const { tracks, playlistName, handleListNameChange, removeTrack, savePlaylist, playTrack, pauseTrack, isTrackPlayed, clearPlaylist, isCurrentPlaylistOnList, isSavedPlaylistAltered, handleDelete, areYouSure, deleteImminent } = props;
    const saveIcon = <FontAwesomeIcon icon={faSave} />;
    const timesIcon = <FontAwesomeIcon icon={faTimes} />;
    const trashIcon = <FontAwesomeIcon icon={faTrash} />;
    const questionIcon = <FontAwesomeIcon icon={faQuestion} />;
    const exclamationIcon = <FontAwesomeIcon icon={faExclamation} />;
    return (
        <div 
            className="Playlist"
            style={(tracks.length === 0) ? {display: 'none'} : {}}
        >
            <div className='Playlist-title'>
                <input 
                    value={playlistName} 
                    placeholder='New Playlist'
                    onChange={handleListNameChange}
                />
                <button                    
                    className={(tracks.length === 0 && !playlistName) ? 'Playlist-title-button-disabled' : 'Playlist-title-button'}
                    onClick={clearPlaylist}
                >
                    {timesIcon}
                </button>
                <button
                    className={!isCurrentPlaylistOnList ? 'Playlist-title-button-disabled' : 'Playlist-title-button'}
                    onClick={!isCurrentPlaylistOnList ? null : handleDelete}
                >
                    {(areYouSure || deleteImminent) ? (deleteImminent ? exclamationIcon : questionIcon) : trashIcon}
                </button>
                <button 
                    className={(tracks.length === 0 || !playlistName || (isCurrentPlaylistOnList && !isSavedPlaylistAltered)) ? 'Playlist-title-button-disabled' : 'Playlist-title-button'}
                    onClick={(tracks.length === 0 || !playlistName || (isCurrentPlaylistOnList && !isSavedPlaylistAltered)) ? null : savePlaylist}
                >
                    {saveIcon}
                </button>
            </div>
            <div
                className='Playlist-tracklist'
            >
                <TrackList
                    tracks={tracks}
                    isInPlaylist={true}
                    removeTrack={removeTrack}
                    playTrack={playTrack}
                    pauseTrack={pauseTrack}
                    isTrackPlayed={isTrackPlayed}
                />
            </div>     
        </div>
    );
};

Playlist.propTypes = {
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
    handleDelete: PropTypes.func.isRequired,
    areYouSure: PropTypes.bool.isRequired,
    deleteImminent: PropTypes.bool.isRequired
}
