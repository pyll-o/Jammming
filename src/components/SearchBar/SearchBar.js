import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar(props) {
    const { searchPhrase, handleSearchChange, handleClick, playlists, hasCheckedForPlaylists } = props;
    const searchIcon = <FontAwesomeIcon icon={faSearch} size='2x' />;
    const listIcon = <FontAwesomeIcon icon={faList} size='2x' />;
    return (
        <div className="SearchBar">
            <input 
                placeholder="Enter A Song, Album, or Artist" 
                value={searchPhrase}
                onChange={handleSearchChange}
            />
            <button 
                className={(searchPhrase || (playlists.length === 0 && !hasCheckedForPlaylists)) ? 'SearchButton' : 'SearchButton-inactive'} 
                onClick={(searchPhrase || (playlists.length === 0 && !hasCheckedForPlaylists)) ? handleClick : null}
            >
                {(searchPhrase || playlists.length > 0 || hasCheckedForPlaylists) ? searchIcon : listIcon}
            </button>
        </div>
    );
};

SearchBar.propTypes = {
    searchPhrase: PropTypes.string.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    playlists: PropTypes.array.isRequired,
    hasCheckedForPlaylists: PropTypes.bool.isRequired
}
