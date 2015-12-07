/**
 * Created by ToixInHell on 02.12.2015.
 */

Template.splash.events({
    'click input[type=button]': function (event, template) {
        App.enterRoom(App.getDefaultRoomId());
    }
});

