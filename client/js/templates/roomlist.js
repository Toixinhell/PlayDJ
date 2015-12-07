/**
 * Created by ToixInHell on 05.12.2015.
 */
//VIDEOLIST TEMPLATE Configuration
Template.roomlist.helpers({
    authInProcess: function() {
        return Meteor.loggingIn();
    },
    canShow: function() {
        return !!Meteor.user();
    },
    rooms: function () {
        console.log("fetching Rooms from roomlist "+ Rooms.find().fetch());
        return Rooms.find().fetch();
    }
});
Template.roomlist.events({
    'click .enterRoom': function (e, t) {
         FlowRouter.go('/rooms/'+this._id);
    }
});