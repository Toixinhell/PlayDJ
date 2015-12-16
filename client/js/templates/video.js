/**
 * Created by ToixInHell on 03.12.2015.
 */

Template.video.helpers({
    videoId: function() {
        return Rooms.findOne().videoId;
    }
});

Template.control.helpers({
    isPlaying: function() {
        return Rooms.findOne().videoPlaying;
    },
    isAdmin: function() {
            if(Meteor.userId() === Rooms.findOne().admin){
                return true;
            }
            return [];
    },
    videoProgress: function() {
        return Rooms.findOne().videoTime;
    }
});

Template.info.helpers({
    title: function() {
        console.log("HEllo title video.js");
        return Rooms.findOne().videoTitle;
    }
});
Template.video.destroyed = function() {
    Meteor.clearInterval(sliderUpdater);
};

