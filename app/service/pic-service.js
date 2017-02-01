'use strict';

//NOTE: Upload dependency comes from ng-file-upload
module.exports = ['$log', '$q', 'Upload', 'authService', picService];

const galleryUrl = `${__API_URL__}/api/gallery`;

function picService($log, $q, Upload, authService) {
  $log.debug('picService()');

  let service = {};

  //TODO: Consider how to refactor this into a lib module.
  function errors(err) {
    $log.error(err.message);
    return $q.reject(err);
  }

  service.uploadGalleryPic = function(gallery, pic) {
    $log.debug('picService.uploadGalleryPic()');

    return authService.getToken()
    .then( token => {
      let url = `${galleryUrl}/${gallery._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: pic.name,
          desc: pic.desc,
          file: pic.file
        }
      });
    })
    .then( res => {
      //NOTE: slugram pushes.
      gallery.pics.unshift(res.data);
      return res.data;
    })
    .catch(errors);
  };

  return service;
}
