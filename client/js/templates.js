/**
 * Created by ToixInHell on 02.12.2015.
 */





   /* //VIDEOPLAYER TEMPLATE Configuration
    Template.videoPlayer.helpers({
        video: function () {
            if (!Session.get('playvidid')) {
                Session.set('playvidid', 'pFWBlESrd58');
            }

            return Videos.findOne({_id: Session.get('playvidid')});
        }

    });*/






    ////MESSAGES TEMPLATE Configuration
    //Template.messages.helpers({
    //    messages: function () {
    //        return Messages.find({room: Session.get("roomname")}, {sort: {ts: -1}});
    //    },
    //    roomname: function () {
    //        return Session.get("roomname");
    //    }
    //});
    //
    ////MESSAGE TEMPLATE Configuration
    //Template.message.helpers({
    //    timestamp: function () {
    //        return this.ts.toLocaleString();
    //    }
    //});


    //Template.rooms.helpers({
    //    rooms: function () {
    //        return Rooms.find();
    //    }
    //});
    //
    //
    ////ROOM TEMPLATE Configuration
    //Template.roomlist.events({
    //    'click li': function (e) {
    //        //alert(this.roomname);
    //        Session.set("roomname", this.roomname);
    //    }
    //});

//    //ACTIVEROOM TEMPLATE Configuration
//Template.activeRoom.helpers({
//    roomname: function () {
//        return Session.get("roomname");
//    }
//});


    //Template.videoPlayer.rendered = function() {
    //    /* 2. This code loads the IFrame Player API code asynchronously. */
    //    var tag = document.createElement('script');
    //
    //    tag.src = "https://www.youtube.com/iframe_api";
    //    var firstScriptTag = document.getElementsByTagName('script')[0];
    //    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //
    //    /* 3. This function creates an <iframe> (and YouTube player) */
    //    /*    after the API code downloads. */
    //    var player;
    //
    //
    //    //alert(ActivePlaylist.find().fetch());
    //    //console.log(ActivePlaylist.find({}).fetch());
    //
    //    onYouTubeIframeAPIReady = function() {
    //
    //        var playlist = ActivePlaylist.find({}).fetch();
    //        console.log(playlist);
    //        player = new YT.Player('player', {
    //            height: '390',
    //            width: '640',
    //            videoId: 'M7lc1UVf-VE',
    //            events: {
    //                'onReady': onPlayerReady,
    //                'onStateChange': onPlayerStateChange
    //            }
    //        });
    //    };
    //
    //    /* 4. The API will call this function when the video player is ready. */
    //    onPlayerReady = function(event) {
    //        event.target.playVideo();
    //    };
    //
    //    /* 5. The API calls this function when the player's state changes. */
    //    /*    The function indicates that when playing a video (state=1), */
    //    /*    the player should play for six seconds and then stop. */
    //    var done = false;
    //    onPlayerStateChange = function(event) {
    //        if (event.data == YT.PlayerState.PLAYING && !done) {
    //            setTimeout(stopVideo, 6000);
    //            done = true;
    //        }
    //    };
    //    stopVideo = function() {
    //        player.stopVideo();
    //    };
    //};



