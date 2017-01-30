'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController];

function HomeController($log, $rootScope, galleryService) {
  $log.debug('HomeController()');

  this.title = 'Welcome home from homeCtrl';

  this.fetchGalleries = function() {
    $log.debug('homeCtrl.fetchGalleries');
    galleryService.fetchGalleries()
    .then( galleries => {
      $log.log('fetched galleries');
      this.galleries = galleries;
    });
  };

  this.fetchGalleries();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });
}
