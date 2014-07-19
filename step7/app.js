function PlaylistCtrl($scope) {
  $scope.currentSong = 'Brown Eyed Women';
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
    $scope.currentSong = '';
    $scope.playlist = [];
    $scope.currentName = '';
  }

  $scope.setCurrentPlaylist = function(playlist) {
    $scope.currentPlaylist = playlist;
  }

}
