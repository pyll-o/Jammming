import React from 'react';
import PropTypes from 'prop-types';
import './PlaylistListItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faQuestion, faExclamation } from '@fortawesome/free-solid-svg-icons';

export default function PlaylistListItem(props) {
    const { playlist, handleRemove, editPlaylist, areYouSure, deleteImminent, linkToPlaylist, isEdited, isCurrentPlaylistOnList, isSavedPlaylistAltered } = props;
    const trashIcon = <FontAwesomeIcon icon={faTrash} size='xs' />;
    const editIcon = <FontAwesomeIcon icon={faEdit} size='xs' />;
    const questionIcon = <FontAwesomeIcon icon={faQuestion} size='xs' />;
    const exclamationIcon = <FontAwesomeIcon icon={faExclamation} size='xs' />;
    return (        
        <div className="PlaylistListItem">
            <div className="Playlist-information">
                <h3 className='PlaylistListItem-link' onClick={linkToPlaylist}>{playlist.name}</h3>
                <p>Number of tracks: {playlist.tracks}</p>
            </div>
            <div className='img-container'>
                <img
                    src={(playlist.images.length > 0) ? playlist.images[0].url : ''}
                    alt=''
                    onClick={linkToPlaylist}
                />
            </div> 
            <button 
                className={isEdited ? 'Playlist-action-disabled' : 'Playlist-action'}
                onClick={!isEdited ? handleRemove : null}
            >
                {(areYouSure || deleteImminent) ? (deleteImminent ? exclamationIcon : questionIcon) : trashIcon}
            </button>
            <button 
                className={(areYouSure || deleteImminent || isEdited || ((isCurrentPlaylistOnList && isSavedPlaylistAltered))) ? 'Playlist-action-disabled' :'Playlist-action'}
                onClick={(isEdited || ((isCurrentPlaylistOnList && isSavedPlaylistAltered))) ? null : editPlaylist}
            >
                {editIcon}
            </button>
        </div>        
    );
};

PlaylistListItem.propTypes = {
    playlist: PropTypes.object.isRequired,
    editPlaylist: PropTypes.func.isRequired,
    areYouSure: PropTypes.bool.isRequired,
    deleteImminent: PropTypes.bool.isRequired,
    handleRemove: PropTypes.func.isRequired,
    linkToPlaylist: PropTypes.func.isRequired,
    isEdited: PropTypes.bool.isRequired,
    isCurrentPlaylistOnList: PropTypes.bool.isRequired,
    isSavedPlaylistAltered: PropTypes.bool.isRequired
}
