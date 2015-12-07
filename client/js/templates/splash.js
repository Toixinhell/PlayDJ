/**
 * Created by ToixInHell on 07.12.2015.
 */
Template.splash.helpers({
    rooms: function() {
        //var postId = FlowRouter.getParam('postId');
        var room = Rooms.findOne() || {};
        return room;
    }
});

//Template.splash.onCreated(function() {
//    var self = this;
//    self.autorun(function() {
//        //var postId = FlowRouter.getParam('postId');
//        self.subscribe('allRooms');
//    });
//});