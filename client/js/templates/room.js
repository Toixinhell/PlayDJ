/**
 * Created by ToixInHell on 01.12.2015.
 */

// State vars
var player;
var sliderUpdater;
var shouldScroll = false;
var appkey = "AIzaSyCeGrLBUdJ5_gb0WGIYUVSXEXARbsunQKk";
// Utility functions

Template.room.helpers({

    isReady: function () {
        return FlowRouter.subsReady("currentRoom") && FlowRouter.subsReady("allUserCollections");
    },
    room: function () {
        return Rooms.findOne(FlowRouter.getParam("roomId"));
    },
    adminState: function () {

        console.log("AdminState Called: " + FlowRouter.getParam("roomId"));
       return Rooms.findOne(FlowRouter.getParam("roomId")).admin === Meteor.user()._id;
        }

});

var sendMessage = function (roomId, sender, text) {
    console.log("send");
    var message = new Message(sender, text);
    Rooms.update(roomId, {$push: {messages: message}});
}


var updateVideoTitle = function (roomId) {
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + Rooms.findOne(FlowRouter.getParam("roomId")).videoId + '&key=' + appkey+ '&part=snippet', function (data) {
        Rooms.update(roomId, {$set: { videoTitle: data.items[0].snippet.title }});
    });
}

 updateVideo = function (roomId, videoId, playing) {
    sendAdminMessage(Rooms.findOne(FlowRouter.getParam("roomId"))._id, Meteor.userId() + ' changed the video');

    Rooms.update(Rooms.findOne(FlowRouter.getParam("roomId"))._id,
        {$set:
        { videoId: videoId,
            videoPlaying: playing,
            videoTime: 0
        }});
    console.log(Rooms.findOne(FlowRouter.getParam("roomId")));
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

        if (Meteor.userId() === Rooms.findOne(FlowRouter.getParam("roomId")).admin) {
            console.log("update video");
            Meteor.call('updateVideoTime', Rooms.findOne(FlowRouter.getParam("roomId"))._id, player.getCurrentTime());
        }
        //$("#video-slider").slider("option", "disabled", Rooms.findOne(FlowRouter.getParam("roomId")).admin != Meteor.userId());
        $("#video-slider").slider("option", "value", player.getCurrentTime());
        $("#video-slider").slider("option", "max", player.getDuration());
        if (Rooms.findOne(FlowRouter.getParam("roomId")).videoTime > player.getCurrentTime() + 3) {
            player.seekTo(Rooms.findOne(FlowRouter.getParam("roomId")).videoTime + 0.5);
            if (!Rooms.findOne(FlowRouter.getParam("roomId")).videoPlaying) {
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
//        sendAdminMessage(Rooms.findOne(FlowRouter.getParam("roomId"))._id, Meteor.userId()) + ' entered the room');
//
//        this.initialized = true;
//    }
//}

getNextVideo = function (vidID) {
    var playlistArray = Rooms.findOne(FlowRouter.getParam("roomId")).playlist;

    var found=false;
    for(i = 0; i < playlistArray.length; i++) {
        var detail = playlistArray[i].id;
        if(detail.videoId === vidID) {
            found=true;
            break;
        }
    }
    if(found){
        var index = i;
        console.log(index);
        //Rooms.update(Rooms.findOne(FlowRouter.getParam("roomId"))._id, { $pull: {'playlist':{'id.videoId': vidID}}});
        return Rooms.findOne(FlowRouter.getParam("roomId")).playlist[index + 1].id.videoId;
    }
};

window.onbeforeunload = function () {
    // Remove the user from the room
    Rooms.update(Rooms.findOne(FlowRouter.getParam("roomId"))._id, {$pull: { users: Meteor.userId()}});
    sendAdminMessage(Rooms.findOne(FlowRouter.getParam("roomId"))._id, Meteor.userId() + ' left the room');
}

window.onYouTubeIframeAPIReady = function () {



    var roomQuery = Rooms.find(Rooms.findOne(FlowRouter.getParam("roomId"))._id);
    player = new YT.Player('ytplayer', {
        videoId: roomQuery.fetch()[0].videoId,
        width: '400',
        height: '400',
        playerVars: { autoplay: 0, controls: 0, showinfo: 0, iv_load_policy: 3 },
        events: {
            onReady: function (evt) {
                if (Rooms.findOne(FlowRouter.getParam("roomId")).videoPlaying) {
                    player.playVideo();
                }
            },
            onStateChange: function (evt) {
                        //updateVideoTitle(Rooms.findOne(FlowRouter.getParam("roomId"))._id);
                        console.log("state change: onStateChange ");
                        if (evt.data == YT.PlayerState.ENDED) {
                            console.log("YT.PlayerState.ENDED");
                            if(Meteor.userId() === Rooms.findOne(FlowRouter.getParam("roomId")).admin) {
                                var nextVid =  getNextVideo(Rooms.findOne(FlowRouter.getParam("roomId")).videoId);
                                console.log(nextVid);
                                if(nextVid) {
                                    updateVideo(Rooms.findOne(FlowRouter.getParam("roomId"))._id, nextVid, true);

                                }
                                else{
                                    updateVideo(Rooms.findOne(FlowRouter.getParam("roomId"))._id, "TUHgGK-tImY", false);
                                }
                            }
                            $('#iframe-overlay').hide();

                        } else if (evt.data == YT.PlayerState.UNSTARTED) {
                            console.log("YT.PlayerState.UNSTARTED")
                            $('#iframe-overlay').show();
                            var videoId = getVideoId(player.getVideoUrl());
                            if (videoId != Rooms.findOne(FlowRouter.getParam("roomId")).videoId) {
                                if(Meteor.userId() === Rooms.findOne(FlowRouter.getParam("roomId")).admin){
                                updateVideo(Rooms.findOne(FlowRouter.getParam("roomId"))._id, videoId, false);
                            }
                            }
                        }

                if (evt.data == YT.PlayerState.ENDED) {
                    $('#iframe-overlay').hide();

                } else if (evt.data == YT.PlayerState.UNSTARTED) {
                    $('#iframe-overlay').show();
                    var videoId = getVideoId(player.getVideoUrl());
                    if (videoId != Rooms.findOne(FlowRouter.getParam("roomId")).videoId && videoId != "https://www.youtube.com/watch") {
                        updateVideo(Rooms.findOne(FlowRouter.getParam("roomId"))._id, videoId);
                    }
                }
            }
        }

    });

    $( "#video-slider" ).slider({
        range: 'min',
        min: 0,
        max: 100,
        disabled:  Rooms.findOne(FlowRouter.getParam("roomId")).admin != Meteor.userId(),
        slide: function (evt, data) {
            // Rooms.update(Rooms.findOne(FlowRouter.getParam("roomId"))._id, {$set: { videoTime: data.value }});
        },
        create: function (evt, data) {
            console.log("create slider");
            sliderUpdater = Meteor.setInterval(updateTime, 500);
        },
        stop: function (evt, data) {
            Meteor.clearInterval(sliderUpdater);
            Meteor.call('changeVideoTime', Rooms.findOne(FlowRouter.getParam("roomId"))._id, data.value);
            sliderUpdater = Meteor.setInterval(updateTime, 500);
        }
    });

    roomQuery.observe({
        changed: function (newState, oldState) {
            if (oldState.videoId != newState.videoId) {
                // User changed the video
                player.loadVideoById(newState.videoId, Rooms.findOne(FlowRouter.getParam("roomId")).videoTime, "large");
                updateVideoTitle(Rooms.findOne(FlowRouter.getParam("roomId"))._id);
                if (!Rooms.findOne(FlowRouter.getParam("roomId")).videoPlaying) {
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
console.log("sendinf adminmsg");


    Rooms.update(roomId, {$push: { messages: message }});
}

var toggleVideoPlay = function () {
    if(Meteor.userId() === Rooms.findOne(FlowRouter.getParam("roomId")).admin) {
        console.log("togglePlay for Room " + Rooms.findOne(FlowRouter.getParam("roomId"))._id + " The playstate is: " + Rooms.findOne(FlowRouter.getParam("roomId")).videoPlaying);
        if (!Rooms.findOne(FlowRouter.getParam("roomId")).videoPlaying) {

            Rooms.update(Rooms.findOne(FlowRouter.getParam("roomId"))._id, {$set: {videoPlaying: true}});
            sendAdminMessage(Rooms.findOne(FlowRouter.getParam("roomId"))._id, Meteor.userId() + ' started the video');
        } else {

            Rooms.update(Rooms.findOne(FlowRouter.getParam("roomId"))._id, {$set: {videoPlaying: false}});
            sendAdminMessage(Rooms.findOne(FlowRouter.getParam("roomId"))._id, Meteor.userId() + ' paused the video');
        }
    }
}

//Template.adminMessages.messages = function () {
//    return Rooms.findOne(Rooms.findOne(FlowRouter.getParam("roomId"))._id).messages.map(function (message) {
//        if (message.type == 'user') {
//            message.username = App.getUsername(message.user);
//        }
//        return message;
//    });
//};

//Template.room.created = function() {
//    $.getScript('https://www.youtube.com/iframe_api');
//};
//

Template.room.created = function() {
    /* 2. This code loads the IFrame Player API code asynchronously. */
    console.log("Started player iFrame getter");
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];

    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    console.log("ended player iFrame getter");
};
Template.control.events({

    'click div#video-play': function (evt) {
            toggleVideoPlay();
    }
});

Template.video.events({
    'click div#iframe-overlay': function (evt) {
            toggleVideoPlay();
    }
});

