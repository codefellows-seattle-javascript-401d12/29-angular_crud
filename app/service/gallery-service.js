'use strict';

module.exports = ['$log', '$q', '$http', '$rootScope', 'authService', galleryService];

const apiUrl = `${__API_URL__}/api/gallery`;

function galleryService($log, $q, $http, $rootScope, authService) {
  $log.debug('galleryService()');

  const service = {};
  service.galleries = [];

  function makeConfig(token) {
    return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  }

  function errors(err) {
    $log.error(err.message);
    return $q.reject(err);
  }

  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery()', gallery);

    authService.getToken()
    .then( token => {
      return $http.post(apiUrl, gallery, makeConfig(token));
    })
    .then( res => {
      $log.log('gallery created');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch(errors);
  };

  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries()');

    authService.getToken()
    .then( token => {
      return $http.get(apiUrl, makeConfig(token));
    })
    .then( res => {
      $log.log('galleries fetched');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch(errors);
  };

  service.deleteGallery = function(gallery) {
    $log.debug('galleryService.deleteGallery()', gallery);

    authService.getToken()
    .then( token => {
      return $http.delete(`${apiUrl}/${gallery._id}`, makeConfig(token));
    })
    .then( () => {
      $log.log('gallery deleted');
      return $q.resolve();
    })
    .catch(errors);
  };

  return service;
}
