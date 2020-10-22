import React from 'react';
import PropTypes from 'prop-types';
import './TrackList.css';
import TrackContainer from '../../containers/TrackContainer';

export default function TrackList(props) {
    const { tracks, isInPlaylist, addTrack, removeTrack, playTrack, pauseTrack, isTrackPlayed } = props;
    return (
        <div className="TrackList">
            {tracks.map(track => {
                return <TrackContainer
                    track={track}                    
                    key={track.id}                    
                    isInPlaylist={isInPlaylist}
                    addTrack={addTrack}
                    removeTrack={removeTrack}
                    playTrack={playTrack}
                    pauseTrack={pauseTrack}
                    isTrackPlayed={isTrackPlayed}
                />
            })}
        </div>
    );
};

TrackList.propTypes = {
    tracks: PropTypes.array,
    isInPlaylist: PropTypes.bool.isRequired,
    addTrack: PropTypes.func,
    removeTrack: PropTypes.func,
    playTrack: PropTypes.func.isRequired,
    pauseTrack: PropTypes.func.isRequired,
    isTrackPlayed: PropTypes.bool.isRequired
}
