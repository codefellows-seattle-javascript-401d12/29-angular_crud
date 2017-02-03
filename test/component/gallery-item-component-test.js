'use strict';

const mockBindings = {
  gallery: {
    _id: 1234,
    name: 'gallery name',
    desc: 'gallery desc',
    pics: []
  }
};

describe('Gallery Item Component', function() {
  beforeEach( () => {
    //TODO: refactor to have a beforeEach general setup module.
    angular.mock.module('cfgram');
    angular.mock.inject( ($rootScope, $componentController, $httpBackend) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('galleryItemCtrl.delete()', () => {
    it('should make a valid delete request', () => {
      let url = `${__API_URL__}/api/gallery/${mockBindings.gallery._id}`;
      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer test token'
      };

      this.$httpBackend.expectDELETE(url, headers).respond(204);

      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
      galleryItemCtrl.delete();

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  }); //delete()
});
