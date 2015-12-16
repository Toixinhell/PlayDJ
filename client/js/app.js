////Accounts.onLogin(function () {
////    if (FlowRouter.current().route.group.name === 'private') {
////        console.log("on login triggered")
////        FlowRouter.go('/main')
////    }
////
////});
//
//App = {
//    getUser: function () {
//        return Meteor.userId();
//    },
//
//    getUsername: function (userId) {
//        //console.log("user here" + Meteor.user().username);
//        return Meteor.user().username;
//    },
//
//
//    //getRoom: function () {
//    //    if(Session.get('roomId'))
//    //    {
//    //        return Rooms.findOne(FlowRouter.param("roomId")).fetch();
//    //    }
//    //
//    //
//    //},
//    indexifyUsers: function () {
//        var objects = App.getRoom(Session.get("roomId")).users;
//        for (var i = 0; i < objects.length; i++) {
//            objects[i].index = i;
//        }
//        console.log("indexifyUsers " + objects);
//        return objects;
//    },
//    indexifyPlaylist: function () {
//        var objects = App.getRoom(Session.get("roomId")).playlist;
//        if(objects) {
//            for (var i = 0; i < objects.length; i++) {
//                objects[i].index = i;
//            }
//            console.log("indexifYPlaylist " + objects);
//            return objects;
//        }
//        else{return "No playlist in Room";}
//    },
//
//
//
//    // Temporarily only support one room
//    getDefaultRoomId: function () {
//        return Rooms.findOne()._id;
//    },
//
//    enterRoom: function (roomId) {
//
//
//        //Router.go('main');
//
//
//    },
//    searchVid: function(text){
//        var appkey = "AIzaSyBnZGKAQtMggFMDCKxTwjFsfFcdkf1qy3I";
//        var searchURL = 'https://www.googleapis.com/youtube/v3/search?order=viewCount&type=video&part=snippet&maxResults=25&q='+text+'&key='+ appkey;
//        console.log(searchURL);
//        $.getJSON(searchURL, function (data) {
//            Session.set('responsYoutube', data);
//        });
//
//    }
//}
//
//
