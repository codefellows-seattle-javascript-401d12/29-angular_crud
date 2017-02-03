'use strict';

const mockBindings = {
  gallery: {
    _id: 1234,
    name: 'test name',
    desc: 'test desc',
    pics: []
  },
  deleteDone: function(data) {
    expect(data.galleryData._id).toEqual(1234);
  }
};

describe('Gallery Item Component', function() {
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject( ($rootScope, $componentController, $httpBackend) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
    });
  });

  // //NOTE: this is just from class and doesn't actually apply to my project
  // describe('galleryItemCtrl.deleteDone()', () => {
  //   it('should call deleteDone', () => {
  //
  //     let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
  //     galleryItemCtrl.deleteDone({ galleryData: galleryItemCtrl.gallery });
  //
  //     this.$rootScope.$apply();
  //   });
  //
  //   it('should call deleteDone with a gallery after galleryDelete', () => {
  //     let url = `${__API_URL__}/api/gallery/1234`;
  //     let headers = {
  //       Authorization: 'Bearer test token',
  //       Accept: 'application/json'
  //     };
  //
  //     this.$httpBackend.expectDELETE(url, headers)
  //     .respond(204);
  //
  //     let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
  //     galleryItemCtrl.deleteGallery();
  //
  //     this.$httpBackend.flush();
  //     this.$rootScope.$apply();
  //   });
  // });
});
