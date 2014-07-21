angular.module('musicPlayer', []).
    controller('PlaylistCtrl', function($scope, $filter, $http) {
        
  $scope.currentSong = 'Wish You Were Here';
  $scope.playlist = [];

  $scope.playlistSearch = '';

  $scope.playlistName = ''
  $scope.savedPlaylists = [];

  $http.get('/playlists.json').
      success(function(data) {
        data.forEach(function(pList) {
            $scope.savedPlaylists.push(pList);
        })
      }).
      error(function() {
        alert('Error');
      });

  $scope.currentPlaylist = {};

  $scope.addSong = function() {
    $scope.playlist.push($scope.currentSong);
    $scope.currentSong = '';
  };

  $scope.removeSong = function(song) {
    $scope.playlist.splice($scope.playlist.indexOf(song), 1);
    $scope.currentSong = '';
  };

  $scope.savePlaylist = function() {
    var orderBy = $filter('orderBy');
    $scope.savedPlaylists.push({
      name: $scope.playlistName,
      playlist: $scope.playlist
    });
    $scope.savedPlaylists = orderBy($scope.savedPlaylists, 'name');
    $scope.playlistName = '';
    $scope.currentSong = '';
    $scope.playlist = [];
  };

  $scope.setCurrentPlaylist = function(playlist) {
    if (playlist.file !== undefined) {
        $http.get('/' + playlist.file).
            success(function(data) {
                $scope.currentPlaylist = data;
            })
    }
    $scope.currentPlaylist = playlist;
  }
});
