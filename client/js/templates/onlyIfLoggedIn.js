/**
 * Created by ToixInHell on 07.12.2015.
 */
Template.onlyIfLoggedIn.helpers({
    authInProcess: function() {
        return Meteor.loggingIn();
    },
    canShow: function() {
        return !!Meteor.user();
    }
});