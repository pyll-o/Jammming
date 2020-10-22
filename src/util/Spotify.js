const Spotify = {
    clientId: process.env.REACT_APP_USER_ID,
    accessToken: '',
    tokenExpiry: null,
    redirectURI: process.env.REACT_APP_REDIRECT_URI,
    generateURLState() {
        sessionStorage.urlState = Math.floor(Math.random() * 100000).toString();
    },
    getAccessToken() {
        if (window.location.href.match(/state=(\d+)/)[1] === sessionStorage.urlState) {
            this.accessToken = window.location.href.match(/access_token=([^&]+)/)[1];
            this.tokenExpiry = window.location.href.match(/expires_in=([^&]+)/)[1];
            const tokenExpiryDate = Date.now() + (this.tokenExpiry * 1000);
            window.history.pushState('AccessToken', null, '/');
            setTimeout(() => (this.accessToken = ''), tokenExpiryDate - Date.now());
        }
    },
    getUserId(){
        const url = `https://api.spotify.com/v1/me`;
        return fetch(url, {
            headers: {
                "Authorization": `Bearer ${this.accessToken}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(jsonResponse => jsonResponse.id);  
    },
    getUserPlaylists() {
        const url = `https://api.spotify.com/v1/me/playlists`
        return fetch(url, {
            headers: {
                "Authorization": `Bearer ${this.accessToken}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        });
    },
    getPlaylistDetails(playlistId) {
        const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
        return fetch(url, {
            headers: {
                "Authorization": `Bearer ${this.accessToken}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        });
    },
    createPlaylist(userId, playlistName){
        const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
        const jsonBody = JSON.stringify({
            name: playlistName
        });
        return fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${this.accessToken}`,
                "Content-Type": "application/json"
            },
            body: jsonBody
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        });
    },
    addPlaylist(playlistName, uriArr) {
        if (!this.accessToken) {
            this.generateURLState();
            this.spotifyLogin(sessionStorage.urlState);
        } else {
            return this.getUserId().then(response => {
                return this.createPlaylist(response, playlistName)
            }).then(response => {
                const playlistId = response.id;
                const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
                const jsonBody = JSON.stringify({
                    uris: uriArr
                });
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${this.accessToken}`,
                        "Content-Type": "application/json"
                    },
                    body: jsonBody
                });
            }).then(response => {
                if (response.ok){
                    return response.json();
                }
            });
        };        
    },
    removePlaylist(playlistId) {
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
        return fetch(url, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${this.accessToken}`
            }
        }).then(response => {
            if (response.ok) {
                return response;
            }
        });
    },
    updatePlaylist(playlistName, uriArr, playlistId) {
        if (!this.accessToken) {
            this.generateURLState();
            this.spotifyLogin(sessionStorage.urlState);
        } else {
            const url1 = `https://api.spotify.com/v1/playlists/${playlistId}`;
            const url2 = `${url1}/tracks`;
            return fetch(url1, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: playlistName
                })
            }).then(response => {
                if (response.ok) {
                    return fetch(url2, {
                        method: 'PUT',
                        headers: {
                            "Authorization": `Bearer ${this.accessToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            uris: uriArr
                        })
                    });
                };
            }).then(response => {
                if (response.ok) {
                    return response;
                }
            });
        };
    },
    spotifyLogin(urlState) {
        const url = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${encodeURIComponent(this.redirectURI)}&state=${urlState}&scope=playlist-modify-public`;
        if (!this.accessToken) {
            window.location.href = url;
            return true;
        } else {
            return false;
        }  
    },
    search(phrase) {
        if (phrase) {
            const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(phrase)}&type=track`;
            return fetch(url, {
                headers: {
                "Authorization": `Bearer ${this.accessToken}`
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }   
            }).then(jsonResponse => {
                const items = jsonResponse.tracks.items;
                return items;
            });
        };        
    }
}

export default Spotify;
