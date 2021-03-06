import ENV from 'coretheloothound/config/environment';
import Ember from 'ember';

/**
 * Controller for the login/logout view
 */
export default Ember.Controller.extend({
  needs: ['application'],

  apikey: Ember.computed.alias('controllers.application.apikey'),
  account: Ember.computed.alias('controllers.application.account'),
  loggedIn: Ember.computed.alias('controllers.application.loggedIn'),

  actions: {
    logout: function() {
      var _this = this;

      Ember.$.ajax({
        type: 'GET',
        url: ENV.api + '/logout',
        headers: {
          Authorization: 'apikey ' + _this.get('apikey')
        },
        success: function() {
          _this.get('storage').removeValue('apikey');
          _this.set('apikey', undefined);
          _this.set('account', undefined);
          _this.transitionToRoute('index');
        }
      });
    }
  }
});
