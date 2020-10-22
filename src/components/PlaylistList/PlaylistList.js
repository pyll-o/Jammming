import React from 'react';
import PropTypes from 'prop-types';
import './PlaylistList.css';
import PlaylistListItemContainer from '../../containers/PlaylistListItemContainer';

export default function PlaylistList(props) {
    const { playlists, removePlaylist, getPlaylistDetails, isSavedPlaylistAltered, isCurrentPlaylistOnList } = props;
    return (
        <div className='PlaylistList'>
            {playlists.map(playlist => {
                return (
                    <PlaylistListItemContainer
                        playlist={playlist}
                        key={playlist.id}
                        removePlaylist={removePlaylist}
                        getPlaylistDetails={getPlaylistDetails}
                        isSavedPlaylistAltered={isSavedPlaylistAltered}
                        isCurrentPlaylistOnList={isCurrentPlaylistOnList}
                    />
                )
            })}
        </div>
    );
}

PlaylistList.propTypes = {
    playlists: PropTypes.array.isRequired,
    removePlaylist: PropTypes.func.isRequired,
    getPlaylistDetails: PropTypes.func.isRequired,
    isSavedPlaylistAltered: PropTypes.bool.isRequired,
    isCurrentPlaylistOnList: PropTypes.bool.isRequired
}
