'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('NavbarController()');

  this.checkPath = function() {
    $log.debug('navbarCtrl.checkPath()');
    let path = $location.path();
    $log.debug('path:',path);
    if(path === '/landing') {
      this.hideButtons = true;
    }
    if(path !== '/landing') {
      this.hideButtons = false;
      authService.getToken()
      .catch( () => {
        $log.debug('navbar found no token');
        $location.url('/landing');
        // $location.url('/#/signin');
      });
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function() {
    $log.debug('navbarCtrl.logout()');
    this.hideButtons = true;
    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };
}