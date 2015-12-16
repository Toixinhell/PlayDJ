
/*
 *   The Server starts up here !
 *
 *
 */
Meteor.startup(function () {

    /*
    *   Create a user stub
    *
     */

   // var userBaseProfile = JSON.parse();

    //resetRoom();

    //Meteor.setInterval(function () {
    //    var room = Rooms.findOne();
    //    if (room.users.length == 0) {
    //        resetRoom();
    //    }
    //}, 10000);
    //// Listen to incoming HTTP requests, can only be used on the server
    //WebApp.connectHandlers.use(function(req, res, next) {
    //    res.setHeader("Access-Control-Allow-Origin", "*");
    //    return next();
    //});
    //console.log(WebApp.connectHandlers);
});
/*   Accounts configuration
 *   take care of the user creation
 *
 */

Accounts.onCreateUser(function (options, user) {
    //var baseProfile = Meteor.settings.public.imARidiculousHumanBeing;
    //
    console.log("user creation profile:" + Meteor.settings.userBaseProfile);
    //
    //Profiles.insert(baseProfile);
    options.profile = Meteor.settings.userBaseProfile;
    options.profile.created = new Date();

    if (options.profile) {
        console.log("user has profile.");
        user.profile = options.profile;
    }
    return user;

});


/*
*   All server methods are declared here
*
*   they are called from the client:
*        Meteor.call('nameOfTheFunction', params);
*
 */
Meteor.methods({
    updateVideoTime: function (roomId, time) {
        //console.log("updateVideoTime roomid:" + roomId )
        if (Math.abs(time - Rooms.findOne().videoTime) < 3) {
            Rooms.update(Rooms.findOne()._id, {$set: { videoTime: time }});
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



        console.log(Rooms.findOne({_id:roomid},{ playlist: {id: {$elemMatch:{videoId:playlistitem}}}}));
      // Rooms.update({_id:roomid}, { $pull:{'playlist.id':{videoId: playlistitem}}});
    }
    }    ,
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
    addNewRoom: function (userId, name) {
        console.log("adding room");
        Rooms.insert(new Room(userId, name));



    },
    deleteRoom: function (userId, roomId) {


        console.log(userId + " is deleting room " + roomId);


        Rooms.remove(roomId);



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

/*
* Here we take care of All publications
*
* allRooms: all Rooms of the server (maybe better way?, make smaller?)
* singleRoom: the room the user is currently listening .. maybe better way of routing & user management?
*
*/

Meteor.publish('allRooms',  function(){
    console.log("publishing Rooms to client");
    return Rooms.find();
});
Meteor.publish('singleRoom',  function(roomId){
    console.log("publishing singleRoom to client");
    return Rooms.find(roomId);
});
Rooms.allow({
    insert: function (userId, doc) {
        // the user must be logged in, and the document must be owned by the user
        console.log("insert Rooms");

        return true;
    },
    update: function (userId, doc, fields, modifier) {
        // can only change your own documents
        console.log("updating Rooms");
        return true;
    },
    remove: function (userId, doc) {
        // can only remove your own documents
        console.log("remove Rooms");

        return true;
    }
});

/*
* allMessages: All messages of the server
*
*/
Meteor.publish('allMessages',  function(){
    console.log("publishing allMessages to client");
    return Messages.find();
});
Messages.allow({
    insert: function (userId, doc) {
        // the user must be logged in, and the document must be owned by the user
        console.log("insert Messages");

        return true;
    },
    update: function (userId, doc, fields, modifier) {
        // can only change your own documents
        console.log("update Messages");

        return true;
    },
    remove: function (userId, doc) {
        // can only remove your own documents
        console.log("Remove  Messages");

        return true;
    }
});


///*
// * allUserData: All User Data of the server
// *
// */
Meteor.publish("allUserData", function () {
    return Meteor.users.find();
});




/*
 * DEBUG: reset all Rooms
 *
 */

var resetRoom = function () {
    console.log("reset Room, server.js" )
    Rooms.remove({});

    Rooms.insert(new Room());
    console.log("new  Room ID: " + Rooms.findOne().roomid)
}


