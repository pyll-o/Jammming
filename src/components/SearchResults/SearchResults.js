import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';
import PlaylistList from '../PlaylistList/PlaylistList';

export default function SearchResults(props) {
    const { tracks, addTrack, playTrack, pauseTrack, isTrackPlayed, playlists, removePlaylist, hasCheckedForPlaylists, getPlaylistDetails, isCurrentPlaylistOnList, isSavedPlaylistAltered } = props;
    return (
        <div 
            className="SearchResults"
            style={(tracks.length === 0 && playlists.length === 0 && !hasCheckedForPlaylists) ? {display: 'none'} : {}}
        >
            <h2>{(tracks.length === 0) ? 'No search results' : 'Search Results:'}</h2>
            <div 
            className='SearchResults-tracklist'
            style={(tracks.length === 0) ? {display: 'none'} : {}}
            >
                <TrackList 
                    tracks={tracks}
                    isInPlaylist={false}
                    addTrack={addTrack}
                    playTrack={playTrack}
                    pauseTrack={pauseTrack}
                    isTrackPlayed={isTrackPlayed}
                />
            </div>
            <h2 style={{paddingTop: '.88rem'}}>
                {(playlists.length === 0) ? 'No playlists to display' : 'My Playlists:'}
            </h2>
            <div 
                className='SearchResults-playlists'
                style={(tracks.length === 0) ? {height: '840px'} : {}}
            >
                <PlaylistList
                    playlists={playlists}
                    removePlaylist={removePlaylist}
                    getPlaylistDetails={getPlaylistDetails}
                    isSavedPlaylistAltered={isSavedPlaylistAltered}
                    isCurrentPlaylistOnList={isCurrentPlaylistOnList}
                />
            </div>
        </div>
    );
};

SearchResults.propTypes = {
    tracks: PropTypes.array.isRequired,
    addTrack: PropTypes.func.isRequired,
    playTrack: PropTypes.func.isRequired,
    pauseTrack: PropTypes.func.isRequired,
    isTrackPlayed: PropTypes.bool.isRequired,
    playlists: PropTypes.array.isRequired,
    removePlaylist: PropTypes.func.isRequired,
    hasCheckedForPlaylists: PropTypes.bool.isRequired,
    getPlaylistDetails: PropTypes.func.isRequired,
    isSavedPlaylistAltered: PropTypes.bool.isRequired,
    isCurrentPlaylistOnList: PropTypes.bool.isRequired
}
