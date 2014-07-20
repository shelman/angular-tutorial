function PlaylistCtrl($scope, $filter, $http) {
  $scope.currentSong = 'Wish You Were Here';
  $scope.playlist = [];
  $scope.currentName = '';
  $scope.savedPlaylists = [];
  $scope.currentPlaylist = {};
  $scope.playlistSearch = '';

  $scope.addSong = function() {
    $scope.playlist.push($scope.currentSong);
    $scope.currentSong = '';
  }

  $scope.removeSong = function(song) {
    $scope.playlist.splice($scope.playlist.indexOf(song), 1);
  }

  $scope.savePlaylist = function() {
    $scope.savedPlaylists.push({
      name: $scope.currentName,
      playlist: $scope.playlist
    });
    $scope.savedPlaylists = $filter('orderBy')($scope.savedPlaylists, 'name');
    $scope.currentSong = '';
    $scope.playlist = [];
    $scope.currentName = '';
  }

  $scope.setCurrentPlaylist = function(playlist) {
    $http.get('/' + playlist.file).
        success(function(data) {
            playlist.playlist = data.playlist;    
            $scope.currentPlaylist = playlist;
        }).
        error(function(data) {
            console.log('Error fetching playlist');
        })
  }

  $http.get('playlists.json').
        success(function(data) {
            data.forEach(function(playlistInfo) {
                $scope.savedPlaylists.push({
                    name: playlistInfo.name,
                    file: playlistInfo.file
                });
            });
        }).
        error(function() {
            alert('Error fetching playlist');  
        });

}
