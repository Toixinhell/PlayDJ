/**
 * Created by ToixInHell on 03.12.2015.
 */
//VIDEOITEM TEMPLATE Configuration
Template.videoitem.events({
    'click .list': function (evt, tmpl) {
        //alert(this._id);
        // Session.set('playvidid',this._id);
    },
    'click .removelist': function (evt, tmpl) {
        Meteor.call("deleteVideo", this._id);
    },
    'click .playvideo': function (evt, tmpl) {
        //alert(this.videoID);
        //alert(App.getRoom().videoId);
        //Rooms.update(Session.get('roomId'),
        //    {$set:
        //    { videoId: this.videoID,
        //        videoPlaying: false,
        //        videoTime: 0
        //    }});
        console.log(App.getRoom().videoId);
        if (Session.get("roomId").videoId != this.videoID) {
            console.log(this.data);
            Meteor.call("addVideoToActivePlaylist", Meteor.user().username, this.data, Session.get("roomID"));
        }

    }
});

//VIDEOLIST TEMPLATE Configuration
Template.videolist.helpers({
    videos: function () {
        return Videos.find({owner: Session.get('userId')});
    }
});

Template.videolist.events({
    'click .sendVideo': function (e) {
        _addVideoToQueue();
    },
    'keyup #videoMsg': function (e) {
        if (e.type == "keyup" && e.which == 13) {
            _addVideoToQueue();
        }
    }
});
// Extracted function for a  event
_addVideoToQueue = function () {
    var el = document.getElementById("videoMsg");
    console.log("added video");
    var appkey = "AIzaSyCeGrLBUdJ5_gb0WGIYUVSXEXARbsunQKk";
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + el.value + '&key=' + appkey+ '&part=snippet', function (data) {
        console.log(data.items[0].snippet);
        Meteor.call("addVideo", el.value,Session.get('userId'), data.items[0]);
    });
    //Meteor.call("addVideo", el.value,Session.get('userId'), data.items[0].snippet);
    //Videos.insert({user: Meteor.user().username, videoID: el.value, ts: new Date()});
    // alert(Videos.find());
    el.value = "";
    el.focus();
};