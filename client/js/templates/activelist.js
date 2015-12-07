/**
 * Created by ToixInHell on 03.12.2015.
 */
//ACTIVELIST TEMPLATE Configuration
Template.activelist.helpers({
    act: function () {

        return Rooms.find().playlist;
    },
    username: function () {

        return Meteor.user().username;
    }
});
Template.activelist.events({
    'click .clearActivePlaylist': function (e, t) {
        //alert(Session.get('userId'));
        console.log("remove");
        if(App.amIAdmin()) {
            console.log(this.id.videoId);
            Meteor.call("clearActiveList", Session.get("roomId"), this.id.videoId);
        }
    },
    'click .playActivePlaylist': function (e, t) {
        if(App.amIAdmin()) {
            var nextVidId = App.playActiveListVideo(this.id.videoId);
            updateVideo(Session.get('roomId'), nextVidId, true);
        }
    }
});
