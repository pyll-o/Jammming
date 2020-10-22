import React from 'react';
import PropTypes from 'prop-types';
import PlaylistListItem from '../components/PlaylistListItem/PlaylistListItem';

export default class PlaylistListItemContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areYouSure: false,
            deleteImminent: false,
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.editPlaylist = this.editPlaylist.bind(this);
        this.linkToPlaylist = this.linkToPlaylist.bind(this);
    }   
    linkToPlaylist() {
        window.open(this.props.playlist.url);
    }
    editPlaylist() {
       this.props.getPlaylistDetails(this.props.playlist);
    }
    handleRemove() {
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
                    this.props.removePlaylist(this.props.playlist);
                }, 3000);
            });
        } else if (this.state.deleteImminent) {
            this.setState({
                deleteImminent: false,
                areYouSure: false
            })
        }
    }
    render() {
        return (
            <PlaylistListItem
                playlist={this.props.playlist}
                areYouSure={this.state.areYouSure}
                deleteImminent={this.state.deleteImminent}
                handleRemove={this.handleRemove}
                editPlaylist={this.editPlaylist}
                linkToPlaylist={this.linkToPlaylist}
                isCurrentPlaylistOnList={this.props.isCurrentPlaylistOnList}
                isSavedPlaylistAltered={this.props.isSavedPlaylistAltered}
                isEdited={this.props.playlist.viewedInDetail}
            />
        );
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.areYouSure && !prevState.deleteImminent) {
            clearTimeout(this.t);
        } else if (prevState.deleteImminent) {
            clearTimeout(this.t);
        }
    }
};

PlaylistListItem.propTypes = {
    playlist: PropTypes.object.isRequired,
    removePlaylist: PropTypes.func,
    getPlaylistDetails: PropTypes.func,
    isCurrentPlaylistOnList: PropTypes.bool.isRequired,
    isSavedPlaylistAltered: PropTypes.bool.isRequired
}
