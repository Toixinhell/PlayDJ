/**
 * Created by ToixInHell on 03.12.2015.
 */
Template.video.rendered= function(){
    console.log('Estás aquí');
    $.getScript('https://www.youtube.com/iframe_api');
}


Template.video.helpers({
    videoId: function() {
        console.log("Rooms.find().videoId: " + Rooms.findOne().videoId);
        return Rooms.findOne().videoId;
    }
});

Template.control.helpers({
    isPlaying: function() {
        return Rooms.findOne().videoPlaying;
    },
    videoProgress: function() {
        return Rooms.findOne().videoTime;
    }
});

Template.info.helpers({
    title: function() {
        console.log(Rooms.find());
        return Rooms.findOne().videoTitle;
    }
});