App = {
    getUser: function () {
        return Meteor.userId();
    },

    getUsername: function (userId) {
        //console.log("user here" + Meteor.user().username);
        return Meteor.user().username;
    },
    amIAdmin: function () {
        //console.log("user here" + Meteor.user().username);
        if (Meteor.userId() == Rooms.findOne(Session.get('roomId')).admin)
        {return true;}
        else
        {return false;}

    },

    getRoom: function () {
        if(Session.get('roomId'))
        {
            console.log("client whants to know its current room, returning for SessionID: " + Rooms.find({_id: Session.get('roomId')},{sort: {priority: 1}, limit: 1}));
            return Rooms.find({_id: Session.get('roomId')},{sort: {priority: 1}, limit: 1}).fetch();
        }


    },
    indexifyUsers: function () {
        var objects = App.getRoom(Session.get("roomId")).users;
        for (var i = 0; i < objects.length; i++) {
            objects[i].index = i;
        }
        console.log("indexifyUsers " + objects);
        return objects;
    },
    indexifyPlaylist: function () {
        var objects = App.getRoom(Session.get("roomId")).playlist;
        if(objects) {
            for (var i = 0; i < objects.length; i++) {
                objects[i].index = i;
            }
            console.log("indexifYPlaylist " + objects);
            return objects;
        }
        else{return "No playlist in Room";}
    },
    getNextVideo: function (vidID) {
        var playlistArray = App.indexifyPlaylist();

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
        //Rooms.update(Session.get('roomId'),{ $pull: {'playlist':{'id.videoId': vidID}}});
        return Rooms.findOne(Session.get('roomId')).playlist[index + 1].id.videoId;
        }
    },
    playActiveListVideo: function (vidID) {
        var playlistArray = App.indexifyPlaylist();

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
            //Rooms.update(Session.get('roomId'),{ $pull: {'playlist':{'id.videoId': vidID}}});
            return Rooms.findOne(Session.get('roomId')).playlist[index].id.videoId;
        }
    },
    checkIfInActiveList: function (vidID) {
        var playlistArray = App.indexifyPlaylist();

        var found=false;
        for(i = 0; i < playlistArray.length; i++) {
            var detail = playlistArray[i].id;
            if(detail.videoId === vidID) {
                found=true;
                break;
            }
        }
        if(found){
            return true;
        }
    },

    // Temporarily only support one room
    getDefaultRoomId: function () {
        return Rooms.findOne()._id;
    },

    enterRoom: function (roomId) {


        //Router.go('main');


    },
    searchVid: function(text){
        var appkey = "AIzaSyBnZGKAQtMggFMDCKxTwjFsfFcdkf1qy3I";
        var searchURL = 'https://www.googleapis.com/youtube/v3/search?order=viewCount&type=video&part=snippet&maxResults=25&q='+text+'&key='+ appkey;
        console.log(searchURL);
        $.getJSON(searchURL, function (data) {
            Session.set('responsYoutube', data);
        });

    }
}


