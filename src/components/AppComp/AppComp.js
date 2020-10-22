import React from 'react';
import PropTypes from 'prop-types';
import './AppComp.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlaylistContainer from '../../containers/PlaylistContainer';

export default function AppComp(props) {
    const { playlistTracks, searchTracks, searchPhrase, handleSearchChange, playlistName, handleListNameChange, addTrack, removeTrack, search, savePlaylist, playTrack, pauseTrack, isTrackPlayed, playlists, clearPlaylist, removePlaylist, isCurrentPlaylistOnList, hasCheckedForPlaylists, getPlaylistDetails, isSavedPlaylistAltered } = props;
    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar 
                    searchPhrase={searchPhrase}
                    handleSearchChange={handleSearchChange}
                    handleClick={search}
                    playlists={playlists}
                    hasCheckedForPlaylists={hasCheckedForPlaylists}                    
                />
                <div className="App-playlist">
                    <SearchResults 
                        tracks={searchTracks}
                        addTrack={addTrack}
                        playTrack={playTrack}
                        pauseTrack={pauseTrack}
                        isTrackPlayed={isTrackPlayed}
                        playlists={playlists}
                        removePlaylist={removePlaylist}
                        hasCheckedForPlaylists={hasCheckedForPlaylists}
                        getPlaylistDetails={getPlaylistDetails}
                        isCurrentPlaylistOnList={isCurrentPlaylistOnList}
                        isSavedPlaylistAltered={isSavedPlaylistAltered}
                    />
                    <PlaylistContainer
                        tracks={playlistTracks}
                        playlistName={playlistName}
                        handleListNameChange={handleListNameChange}
                        removeTrack={removeTrack}
                        savePlaylist={savePlaylist}
                        playTrack={playTrack}
                        pauseTrack={pauseTrack} 
                        isTrackPlayed={isTrackPlayed}
                        clearPlaylist={clearPlaylist}
                        isCurrentPlaylistOnList={isCurrentPlaylistOnList}
                        isSavedPlaylistAltered={isSavedPlaylistAltered}
                        removePlaylist={removePlaylist}
                    />
                </div>
            </div>
        </div>
    );
};

AppComp.propTypes = {
    playlistTracks: PropTypes.array.isRequired,
    searchTracks: PropTypes.array.isRequired,
    searchPhrase: PropTypes.string.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
    playlistName: PropTypes.string.isRequired,
    handleListNameChange: PropTypes.func.isRequired,
    addTrack: PropTypes.func,
    removeTrack: PropTypes.func,
    search: PropTypes.func.isRequired,
    savePlaylist: PropTypes.func.isRequired,
    playTrack: PropTypes.func.isRequired,
    pauseTrack: PropTypes.func.isRequired,
    isTrackPlayed: PropTypes.bool.isRequired,
    playlists: PropTypes.array.isRequired,
    clearPlaylist: PropTypes.func.isRequired,
    removePlaylist: PropTypes.func.isRequired,
    isCurrentPlaylistOnList: PropTypes.bool.isRequired,
    hasCheckedForPlaylists: PropTypes.bool.isRequired,
    getPlaylistDetails: PropTypes.func.isRequired,
    isSavedPlaylistAltered: PropTypes.bool.isRequired
}
