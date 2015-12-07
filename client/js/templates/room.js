/**
 * Created by ToixInHell on 01.12.2015.
 */
Template.main.helpers({
    isReady: function(sub) {
        if(sub) {
            var subrdy = FlowRouter.subsReady(sub);
            console.log("ready " + sub + " ? "+subrdy);
            return subrdy;
        } else {
            console.log(FlowRouter.subsReady());
            return FlowRouter.subsReady();

        }
    }

});
// State vars
var player;
var sliderUpdater;
var shouldScroll = false;
var appkey = "AIzaSyCeGrLBUdJ5_gb0WGIYUVSXEXARbsunQKk";
// Utility functions


var sendMessage = function (roomId, sender, text) {
    console.log("send");
    var message = new Message(sender, text);
    Rooms.update(roomId, {$push: {messages: message}});
}


var updateVideoTitle = function (roomId) {
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + App.getRoom().videoId + '&key=' + appkey+ '&part=snippet', function (data) {
        Rooms.update(roomId, {$set: { videoTitle: data.items[0].snippet.title }});
    });
}

 updateVideo = function (roomId, videoId, playing) {
    sendAdminMessage(Session.get('roomId'), App.getUsername(Session.get('userId')) + ' changed the video');

    Rooms.update(Session.get('roomId'),
        {$set:
        { videoId: videoId,
            videoPlaying: playing,
            videoTime: 0
        }});
    console.log(App.getRoom());
}

var getVideoId = function (url) {
    var videoId;
    if (url.indexOf("v=") == -1) {
        videoId = url;
    } else {
        var split = url.split("v=");
        if (split[1].indexOf("&") != -1) {
            videoId = split[1].split("&")[0];
        } else {
            videoId = split[1];
        }
    }
    return videoId;
}

var updateTime = function () {
    if (player && player.getCurrentTime) {
        if (App.getRoom().users[0] == Session.get('userId')) {
            Meteor.call('updateVideoTime', Session.get('roomId'), player.getCurrentTime());
        }
        $("#video-slider").slider("option", "disabled", !App.amIAdmin());
        $("#video-slider").slider("option", "value", player.getCurrentTime());
        $("#video-slider").slider("option", "max", player.getDuration());
        if (App.getRoom().videoTime > player.getCurrentTime() + 3) {
            player.seekTo(App.getRoom().videoTime + 0.5);
            if (!App.getRoom().videoPlaying) {
                player.pauseVideo();
            }
        }
    }
};

//Template.adminMessages.rendered = function() {
//    if (!this.initialized) {
//        // Initialize js components in room
//        var messagesBox = $('div.messages');
//        messagesBox.scrollTop(messagesBox[0].scrollHeight);
//
//        Meteor.setInterval(function () {
//            if (shouldScroll) {
//                messagesBox.scrollTop(messagesBox[0].scrollHeight);
//                shouldScroll = false;
//            }
//        }, 200);
//
//        sendAdminMessage(Session.get('roomId'), App.getUsername(Session.get('userId')) + ' entered the room');
//
//        this.initialized = true;
//    }
//}



window.onbeforeunload = function () {
    // Remove the user from the room
    Rooms.update(Session.get('roomId'), {$pull: { users: Session.get('userId')}});
    sendAdminMessage(Session.get('roomId'), App.getUsername(Session.get('userId')) + ' left the room');
}

window.onYouTubeIframeAPIReady = function () {
    var roomQuery = Rooms.find(Session.get('roomId'));
    player = new YT.Player('ytplayer', {
        videoId: roomQuery.fetch()[0].videoId,
        width: '600',
        height: '400',
        playerVars: { autoplay: 0, controls: 0, showinfo: 0, iv_load_policy: 3 },
        events: {
            onReady: function (evt) {
                if (App.getRoom().videoPlaying) {
                    player.playVideo();
                }
            },
            onStateChange: function (evt) {
                //updateVideoTitle(Session.get('roomId'));
                console.log("state change:  ")
                if (evt.data == YT.PlayerState.ENDED) {
                    console.log("YT.PlayerState.ENDED");
                    if(App.amIAdmin()) {
                        var nextVid = App.getNextVideo(App.getRoom().videoId);
                        console.log(nextVid);
                        updateVideo(Session.get('roomId'), nextVid, true);
                    }
                    $('#iframe-overlay').hide();

                } else if (evt.data == YT.PlayerState.UNSTARTED) {
                    console.log("YT.PlayerState.UNSTARTED")
                    $('#iframe-overlay').show();
                    var videoId = getVideoId(player.getVideoUrl());
                    if (videoId != App.getRoom().videoId) {
                        if(App.amIAdmin()){
                        updateVideo(Session.get('roomId'), videoId, false);
                    }
                    }
                }
            }
        }
    });

    $( "#video-slider" ).slider({
        range: 'min',
        min: 0,
        max: 100,
        slide: function (evt, data) {
            // Rooms.update(Session.get('roomId'), {$set: { videoTime: data.value }});
        },
        create: function (evt, data) {
            sliderUpdater = Meteor.setInterval(updateTime, 500);
        },
        stop: function (evt, data) {
            Meteor.clearInterval(sliderUpdater);
            Meteor.call('changeVideoTime', Session.get('roomId'), data.value);
            sliderUpdater = Meteor.setInterval(updateTime, 500);
        }
    });

    roomQuery.observe({
        changed: function (newState, oldState) {

            if (oldState.videoId != newState.videoId) {
                // User changed the video
                player.loadVideoById(newState.videoId, App.getRoom().videoTime, "large");
                updateVideoTitle(Session.get('roomId'));
                if (!App.getRoom().videoPlaying) {
                    player.pauseVideo();
                }
            } else if (oldState.videoPlaying != newState.videoPlaying) {
                if (!oldState.videoPlaying && newState.videoPlaying) {
                    player.playVideo();
                    $("#video-slider").slider("option", "max", player.getDuration());
                } else if (oldState.videoPlaying && !newState.videoPlaying) {
                    player.pauseVideo();
                }
            } else if (oldState.videoTime > newState.videoTime || oldState.videoTime < newState.videoTime - 2) {
                Meteor.clearInterval(sliderUpdater);
                player.seekTo(newState.videoTime);
                sliderUpdater = Meteor.setInterval(updateTime, 500);
            }
            //else if (oldState.messages.length < newState.messages.length) {
            //    var messagesBox = $('div.messages');
            //    if (messagesBox.scrollTop() + messagesBox.height() > messagesBox[0].scrollHeight - 100) {
            //        shouldScroll = true;
            //    }
            //}
        }
    });
}

sendAdminMessage = function (roomId, text) {
    var message = new Message('', text, 'admin');

    sAlert.info(text);

    Rooms.update(roomId, {$push: { messages: message }});
}

var toggleVideoPlay = function () {

    if (!App.getRoom().videoPlaying) {
        Rooms.update(Session.get('roomId'), {$set: { videoPlaying: true }});
        sendAdminMessage(Session.get('roomId'), App.getUsername(Session.get('userId')) + ' started the video');
    } else {
        Rooms.update(Session.get('roomId'), {$set: { videoPlaying: false }});
        sendAdminMessage(Session.get('roomId'), App.getUsername(Session.get('userId')) + ' paused the video');
    }
}

//Template.adminMessages.messages = function () {
//    return Rooms.findOne(Session.get('roomId')).messages.map(function (message) {
//        if (message.type == 'user') {
//            message.username = App.getUsername(message.user);
//        }
//        return message;
//    });
//};

//Template.room.created = function() {
//    $.getScript('https://www.youtube.com/iframe_api');
//};
Template.control.events({
    'click div#video-play': function (evt) {
        if(App.amIAdmin()){ toggleVideoPlay();}

    }
});

Template.video.events({
    'click div#iframe-overlay': function (evt) {
        if(App.amIAdmin()){ toggleVideoPlay();}
    }
});

