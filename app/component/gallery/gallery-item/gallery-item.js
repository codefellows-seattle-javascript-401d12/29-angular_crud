'use strict';

require('./_gallery-item.scss');

module.exports = {
  template: require('./gallery-item.html'),
  controller: ['$log', 'galleryService', GalleryItemController],
  controllerAs: 'galleryItemCtrl'
};

function GalleryItemController($log, galleryService) {
  $log.debug('GalleryItemController()');

  this.gallery = {};

}
