This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A capstone front-end development Codecademy project. This is my second attempt on this with focus on developing the logic from scratch.

The presentational components and are functional and whenever extra logic was needed appropriate containers have been designed as class components. PropTypes have been implemented in all components receiving props. Font Awesome icons have been used to create extra buttons.

Specific additional functions and changes implemented:

1. Only components displaying relevant data are displayed.
2. Log-in and obtaining access token only requested when needed without losing data like search phrase or playlist content (sing sessionStorage). The access token expires at the right time.
3. Each track can be previewed if preview-url is available (minimalistic play/pause button). If Spotify api does not supply preview-url, a random sound from free libary (https://bigsoundbank.com) is played and play/pause button is red.
4. Songs added to a playlist from search results cannot be added again to the same playlist (although they still appear in the search results for clarity) and if a search is done with a playlist songs being displayed, the songs that appear in the playlist are not displayed.
5. Multiple user playlists functionality was added:
  - all saved user playlists are available
  - playlists are listed as playlist-list items, similar to tracks in design, with similar style function buttons (delete and edit)
  - playlist-list items contain Spotify images
  - a logic to disable/enable buttons depending on playlist content and origin has been used:
    * a playlist which is being edited has both buttons disabled in playlist-list item
    * pressing the Playlist delete button in the playlist-list item will deactivate the edit button until delete is done or cancelled.
6. Search button was redesigned:
  - Font Awesome icons rather than words
  - only acive if a search phrase is typed
  - if a search phrase has not been provided, user playlists can be obtained before initial search.
7. Save to Spotify button has been replaced and 3 functional buttons on the side of playlist name in the Playlist component:
  - clear playlist, delete playlist and save playlist
  - design in line with play/pause and add/remove track buttons
  - a logic to disable/enable buttons depending on playlist content and origin has been used:
    * a new playlist can only be cleared or saved (saving only possible if the playlist has tracks and name)
    * an edited playlist open from the playlist-list item using edit button:
      > can be cleared and no changes are saved
      > can be deleted
      > can only be saved if changes had been made.
8. Links to external URL of tracks, albums, artists and playlists on clicking relevant sections of tracks and playlist-list items.
9. Unique design of Delete playlist buttons:
  - on first click a query appears for 5 seconds ('Are you sure?') which reverses back to original button if not clicked
  - if the query sign is clicked and exclamation sign appears ('Delete imminent!') which if not clicked will activate playlist deletion; if exclamation sign is clicked it will cancel the deletion
  - both playlist-list item and playlist delete button have same functional design.
