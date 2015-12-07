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
        return App.getRoom().videoPlaying;
    },
    videoProgress: function() {
        return App.getRoom().videoTime;
    }
});

Template.info.helpers({
    title: function() {
        return App.getRoom().videoTitle;
    }
});