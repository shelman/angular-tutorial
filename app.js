var app = angular.module('tutorial', []); 
app.controller('PlaylistCtrl', PlaylistCtrl);
function PlaylistCtrl($scope, $http) {
    $scope.currentSong = '';
    $scope.playlist = [];
    $scope.playlistSet = [];
    $scope.playlistName = '';

    $scope.addSong = function() {
        $scope.playlist.push($scope.currentSong);
        $scope.currentSong = '';
    };

    $scope.removeSong = function(index) {
        $scope.playlist.splice(index, 1);
    };

    $scope.savePlaylist = function() {
        $scope.playlistSet.push({
            name: $scope.playlistName,
            playlist: $scope.playlist
        });
        $scope.playlistName = '';
        $scope.playlist = [];
    };

    $scope.currentPlaylist = {};
    $scope.displaySelected = function(playlist) {
        $http.get(playlist.file).success(function(data) {
            $scope.currentPlaylist = data;
        });
    };

    $scope.playlistSearch = '';

    $http.get('playlists.json').
        success(function(data) {
            $scope.playlistSet = data;
        });
}
