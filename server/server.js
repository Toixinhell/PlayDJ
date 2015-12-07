

Meteor.methods({
    updateVideoTime: function (roomId, time) {
        //console.log("updateVideoTime roomid:" + roomId )
        if (Math.abs(time - Rooms.findOne(roomId).videoTime) < 3) {
            Rooms.update(roomId, {$set: { videoTime: time }});
        }
    },
    changeVideoTime: function (roomId, time) {
        Rooms.update(roomId, {$set: { videoTime: time }});
    },
    clearActiveList: function (roomid, playlistitem) {

        var room = Rooms.findOne({_id:roomid},{ playlist: {id: {$elemMatch:{videoId:playlistitem}}}});
        var playlist = room.playlist;

        for (i = 0; i < playlist.length; i++) {
            console.log("REMOVE LIST ADMIN SERVER  " + playlistitem);
            // If you need to access a value in the nested doc:
            var nestedDoc = playlist[i];

            Rooms.update({_id:roomid},{ $pull: {'playlist':{'id.videoId': playlistitem}}});

}
        console.log(Rooms.findOne({_id:roomid},{ playlist: {id: {$elemMatch:{videoId:playlistitem}}}}));
      // Rooms.update({_id:roomid}, { $pull:{'playlist.id':{videoId: playlistitem}}});
    },
    addVideo: function (text, id,data) {

        Videos.insert({


            owner:id,
            videoID: text,
            data: data,
            ts: new Date()

        });

    },
    addVideoToActivePlaylist: function (username, data, roomId) {

        Rooms.update(roomId, {$push: {playlist: data}});
    },

    deleteVideo: function (vidID) {

            Videos.remove(vidID);



    },
    addUserToRoom: function (roomId, userId) {
        console.log("server: adding user "+userId+" to Room: " + roomId);
        Rooms.update(roomId, {$push: {users: userId}});

    },
    changeVideo: function (roomID,vidID) {
        console.log("room : "+roomID + " video: "+ vidID);
        Rooms.update(roomID, {$set: {videoId: vidID, videoPlaying: true}});
    },
    giveOnAdmin: function(oldId, roomId){
            console.log("ROOM: "+roomId+" user old: "+oldId+" new :"+Rooms.findOne(roomId).users[0]);
            Rooms.update(roomId,{admin: Rooms.findOne(roomId).users[0]});
//            Rooms.findOne(Session.get('roomId')).users[index + 1];

        }



});

// Function to auto-create a room on start up
// Temporary hack until we support multiple rooms
var resetRoom = function () {
    console.log("reset Room, server.js" )
    Rooms.remove({});

    Rooms.insert(new Room());
    console.log("new  Room ID: " + Rooms.findOne().roomid)
}

Meteor.publish('allRooms',  function(){
    console.log("publishing Rooms to client");
    return Rooms.find();
});
Meteor.publish('singleRoom',  function(roomId){
    console.log("publishing singleRoom to client");
    return Rooms.findOne(roomId);
});
Meteor.publish('allMessages',  function(){
    console.log("publishing allMessages to client");
    return Messages.find();
});
/**
 * HTTP Header Security
 *
 * enforce HTTP Strict Transport Security (HSTS) to prevent ManInTheMiddle-attacks
 * on supported browsers (all but IE)
 * > http://www.html5rocks.com/en/tutorials/security/transport-layer-security
 *
 * @header Strict-Transport-Security: max-age=2592000; includeSubDomains
 */

Meteor.startup(function () {
    console.log("Meteor.startup(), server.js")
    resetRoom();

    //Meteor.setInterval(function () {
    //    var room = Rooms.findOne();
    //    if (room.users.length == 0) {
    //        resetRoom();
    //    }
    //
    //}, 10000);
    //// Listen to incoming HTTP requests, can only be used on the server
    //WebApp.connectHandlers.use(function(req, res, next) {
    //    res.setHeader("Access-Control-Allow-Origin", "*");
    //    return next();
    //});
    //console.log(WebApp.connectHandlers);
});

