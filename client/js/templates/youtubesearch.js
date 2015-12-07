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
        App.searchVid(el.value);
    },

    'keyup #vidSearch': function (e) {
        if (e.type == "keyup" && e.which == 13) {
            var el = document.getElementById("vidSearch");
            App.searchVid(el.value);
        }
    }


});

//RESULTITEM TEMPLATE Configuration
Template.resultitem.events({
    'click .addToVideolist': function (e, t) {
        //alert(Session.get('userId'));
        console.log(this);
       if(!App.checkIfInActiveList(this.id.videoId)){
           console.log("Checked and not in list");
           Meteor.call("addVideoToActivePlaylist", Meteor.user().username, this, Session.get('roomId'));
       }
        else
       {
           sendAdminMessage(Session.get('roomId'), ' Video already added');
       }
    }
});