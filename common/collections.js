/**
 * Created by ToixInHell on 01.12.2015.
 */
Messages = new Meteor.Collection("messages");
Rooms = new Meteor.Collection("rooms");
Videos = new Meteor.Collection("videos");
Profiles = new Meteor.Collection("profiles");
//Users = new Meteor.Collection("users");
// Objects
Room = function (userId, name) {

    //Room stuff
    this.roomname = name;
    this.admin = userId;

    //this.adminname= Meteor.users.find(userId).fetch();
    //Video stuff
    this.videoId = 'jofNR_WkoCE';
    this.videoTitle = 'Ylvis - The Fox (What Does The Fox Say?) [Official music video HD] ';
    this.videoPlaying = false;
    this.videoTime = 0;

    //Misc
    this.created = new Date(),

    //Room lists
    this.playlist=[];
    this.users = [];
    this.messages = [];
}
//
//ActivePlaylist = function () {
//
//    this.userid,
//    this.username,
//    this.data,
//    this.ts,
//    this.roomid,
//    this.playing;
//    this.played;
//
//}

//User = function (name) {
//    this.name = name;
//}

Message = function (user, text, type) {
    this.type = type ? type : 'user';
    this.user = user;
    this.text = text;
}
