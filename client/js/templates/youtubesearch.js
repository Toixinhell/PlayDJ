/**
 * Created by ToixInHell on 03.12.2015.
 */
    //YOUTUBESEARCH TEMPLATE Configuration
Template.youtubeSearch.results = function () {
    return Session.get("responsYoutube") || [];
}

Template.youtubeSearch.helpers({
    foo: function () {
        return Session.get("responsYoutube") !== undefined;
    }
});

Template.youtubeSearch.events({
    'click input[type=button]': function (event, template) {
        var el = document.getElementById("vidSearch");

        _searchVid(el.value);
    },

    'keyup #vidSearch': function (e) {
        if (e.type == "keyup" && e.which == 13) {
            var el = document.getElementById("vidSearch");
            _searchVid(el.value);
        }
    }


});

_searchVid =  function(text){
    var appkey = "AIzaSyBnZGKAQtMggFMDCKxTwjFsfFcdkf1qy3I";
    var searchURL = 'https://www.googleapis.com/youtube/v3/search?order=viewCount&type=video&part=snippet&maxResults=25&q='+text+'&key='+ appkey;
    console.log(searchURL);
    $.getJSON(searchURL, function (data) {
        Session.set('responsYoutube', data);
    });

}


var checkIfInActiveList = function (vidID) {
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
        return true;
    }
};
//RESULTITEM TEMPLATE Configuration
Template.resultitem.events({
    'click .addToVideolist': function (e, t) {
        //alert(Session.get('userId'));
        console.log("this.id.videoId " + this.id.videoId);
       if(!checkIfInActiveList(this.id.videoId)){
           console.log("Checked and not in list.. user: "+  Meteor.user().username);
           Meteor.call("addVideoToActivePlaylist", Meteor.user().username, this, Rooms.findOne(FlowRouter.getParam("roomId"))._id);
       }
        else
       {
           sendAdminMessage(Session.get('roomId'), ' Video already added');
       }
    }
});