/**
 * Created by ToixInHell on 09.12.2015.
 */
Template.profileSidebar.helpers({
    authInProcess: function() {
        return Meteor.loggingIn();
    },
    canShow: function() {
        return !!Meteor.user();
    },
    user: function(){
        return Meteor.user();
    }
});

