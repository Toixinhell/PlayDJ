/**
 * Created by ToixInHell on 03.12.2015.
 */
//ACTIVELIST TEMPLATE Configuration
Template.activelist.helpers({
    activeRoomList: function () {
         return Rooms.findOne(FlowRouter.getParam("roomId")).playlist.map(function (doc, index, cursor) {
            return _.extend(doc, {index: index});
        })
    },
    username: function () {

        return Meteor.user().username;
    }
});

Template.activelist.events({
    'click .clearActivePlaylist': function (e, t) {
        //alert(Session.get('userId'));
        console.log("remove");
        if(Meteor.userId() === Rooms.findOne(FlowRouter.getParam("roomId")).admin) {
            console.log(this.id.videoId);
            //Meteor.call("clearActiveList", Rooms.findOne(FlowRouter.getParam("roomId"))._id, this.id.videoId);
            Rooms.update(Rooms.findOne(FlowRouter.getParam("roomId"))._id,{ $pull: {'playlist':{ 'id.videoId': this.id.videoId}}});
        }
    },
    'click .playActivePlaylist': function (e, t) {
        console.log("add to list");
        console.log(this.index);
        if(Meteor.userId() === Rooms.findOne(FlowRouter.getParam("roomId")).admin) {
            var nextVidId = Rooms.findOne(FlowRouter.getParam("roomId")).playlist[this.index].id.videoId;
            updateVideo(this.id.videoId, nextVidId, true);
        }
    }
});

