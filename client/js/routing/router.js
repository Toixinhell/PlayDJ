////code shared between client and server
//Router.configure({
//    // This is the default layout/top-level template
//    layoutTemplate: 'layout'
//});
//
//Router.map(function() {
//    // Route for the landing page when user is not logged in
//    this.route('splash', {
//        path: '/'
//    });
//
//// Route to our main app. Note that I use / path as I treat this as default behavior
//    this.route('main', {
//        path: '/main'
//    });
//
//
//});
//
//var requireLogin = function() {
//    if (! Meteor.user()) {
//        // If user is not logged in render landingpage
//        this.render('splash');
//    } else {
//     //   console.log("user logged in");
//        //if user is logged in render whatever route was requested
//        this.next();
//    }
//}
//var checkmain = function() {
//   // console.log(Rooms.findOne({users: Meteor.userId()}));
//    if (!Rooms.findOne({users: Meteor.userId()})) {
//        // If user is not logged in render landingpage
//        this.render('splash');
//    } else {
//        this.next();
//    }
//}
//
//Router.onBeforeAction(requireLogin, {except: ['splash']});
//Router.onBeforeAction(checkmain, {only: ['main']});
