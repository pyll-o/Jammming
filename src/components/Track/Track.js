import React from 'react';
import PropTypes from 'prop-types';
import './Track.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';

export default function Track(props) {
    const { track, isInPlaylist, handleClick, play, isPlayed, isTrackPlayed, titleLink, artistLink, albumLink } = props;
    const playButton = <FontAwesomeIcon icon={faPlay} size='xs' />;
    const pauseButton = <FontAwesomeIcon icon={faPause} size='xs' />;
    return (
        <div className="Track">
            <div className="Track-information">
                <h3 className='Track-link' onClick={titleLink}>{track.title}</h3>
                <p><span className='Track-link' onClick={artistLink}>{track.artist}</span> | <span className='Track-link' onClick={albumLink}>{track.album}</span></p>
            </div>
            <audio 
                loop id={track.id} 
                src={track.preview ? track.preview : `https://bigsoundbank.com/UPLOAD/mp3/0${Math.floor((Math.random() * 900) + 100)}.mp3`}
            >
                Your browser does not support the audio element
            </audio>
            <button
                className={(isPlayed || !isTrackPlayed) ? (track.preview ? 'Track-action' : 'Track-action red') : 'Track-action-disabled'}
                onClick={(isPlayed || !isTrackPlayed) ? play : null}
            >
                {isPlayed ? pauseButton : playButton}
            </button>
            <button 
                className={(track.doubledInPlaylist && !isInPlaylist) ? 'Track-action-disabled' : 'Track-action'} 
                onClick={handleClick}
            >
                {isInPlaylist ? '-' : '+'}
            </button>
        </div>
    );
};

Track.propTypes = {
    track: PropTypes.object.isRequired,
    isInPlaylist: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    isPlayed: PropTypes.bool.isRequired,
    isTrackPlayed: PropTypes.bool.isRequired,
    titleLink: PropTypes.func.isRequired,
    artistLink: PropTypes.func.isRequired,
    albumLink: PropTypes.func.isRequired
}