'use strict';

describe('Edit Gallery Component', function() {
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
    this.$bindings = function() {
      let bindings = {
        gallery: {
          _id: '1234',
          name: 'test name',
          desc: 'test desc'
          //We don't care about pics in this component.
        },
        onComplete: function() {
          console.log('onComplete called');
        }
      };
      return bindings;
    };
  });

  it('should contain proper component bindings', () => {
    let bindings = this.$bindings();
    spyOn(bindings, 'onComplete');
    let editGalleryCtrl = this.$componentController('editGallery', null, bindings);

    expect(editGalleryCtrl.gallery.name).toEqual(bindings.gallery.name);
    expect(editGalleryCtrl.gallery.desc).toEqual(bindings.gallery.desc);
    expect(typeof editGalleryCtrl.onComplete).toEqual('function');
    expect(bindings.onComplete).toHaveBeenCalledTimes(0);
    this.$rootScope.$apply();
  });

  describe('editGalleryCtrl.updateGallery()', () => {
    it('should make a valid put request and call onComplete', () => {
      let bindings = this.$bindings();
      spyOn(bindings, 'onComplete');

      let url = `${__API_URL__}/api/gallery/${bindings.gallery._id}`;

      //TODO: Make headers factory.
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer test token'
      };

      this.$httpBackend.expectPUT(url, {
        _id: bindings.gallery._id,
        name: 'updated name',
        desc: 'updated desc',
        // pics: []
      }, headers).respond(200);

      let editGalleryCtrl = this.$componentController('editGallery', null, bindings);
      editGalleryCtrl.gallery.name = 'updated name';
      editGalleryCtrl.gallery.desc = 'updated desc';
      editGalleryCtrl.update();

      this.$httpBackend.flush();
      this.$rootScope.$apply();

      expect(bindings.onComplete).toHaveBeenCalled();
    });
  });
});
