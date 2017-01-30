'use strict';

require('./_gallery-item.scss');

module.exports = {
  template: require('./gallery-item.html'),
  controller: ['$log', GalleryItemController],
  controllerAs: 'galleryItemCtrl',
  bindings: {
    gallery: '<',
    onDelete: '&',
    onUpdate: '&'
  }
};

function GalleryItemController($log) {
  $log.debug('GalleryItemController()');

  $log.debug(this.gallery);

  this.delete = function() {
    this.onDelete({ gallery: this.gallery });
  };

  this.update = function(prop, value) {
    this.onUpdate({ gallery: this.gallery, prop, value });
  };
}
