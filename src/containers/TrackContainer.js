import React from 'react';
import PropTypes from 'prop-types';
import Track from '../components/Track/Track';

export default class TrackContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlayed: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.play = this.play.bind(this);
        this.titleLink = this.titleLink.bind(this);
        this.albumLink = this.albumLink.bind(this);
        this.artistLink = this.artistLink.bind(this);
    }
    handleClick() {
        if (!this.props.isInPlaylist) {
            this.props.addTrack(this.props.track);
        } else {
            this.props.removeTrack(this.props.track);
        }
    }
    play() {
        if (!this.state.isPlayed) {            
            this.setState({
                isPlayed: true
            }, () => {
                this.props.playTrack(this.props.track);
            });             
        } else {            
            this.setState({
                isPlayed: false
            }, () => {
                this.props.pauseTrack(this.props.track);
            });            
        };    
    }
    titleLink() {
        window.open(this.props.track.url);
    }
    artistLink() {
        window.open(this.props.track.artistUrl);
    }
    albumLink() {
        window.open(this.props.track.albumUrl);
    }
    render() {
        return (
            <Track 
                track={this.props.track}
                isInPlaylist={this.props.isInPlaylist}
                handleClick={this.handleClick}
                play={this.play}
                isPlayed={this.state.isPlayed}
                isTrackPlayed={this.props.isTrackPlayed}
                titleLink={this.titleLink}
                artistLink={this.artistLink}
                albumLink={this.albumLink}
            />
        );
    }
    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.isTrackPlayed !== this.props.isTrackPlayed) && prevState.isPlayed && prevProps.isTrackPlayed) {
            this.setState({
                isPlayed: false
            }, () => {
                this.props.pauseTrack(this.props.track);
            });
        }
    }
    componentWillUnmount() {
        if (this.props.isInPlaylist && this.state.isPlayed) {
            this.props.pauseTrack(this.props.track);
        }
    }
};

TrackContainer.propTypes = {
    addTrack: PropTypes.func,
    isInPlaylist: PropTypes.bool.isRequired,
    track: PropTypes.object.isRequired,
    removeTrack: PropTypes.func,
    playTrack: PropTypes.func.isRequired,
    pauseTrack: PropTypes.func.isRequired,
    isTrackPlayed: PropTypes.bool.isRequired
}
