
Tracker.autorun(function() {
    console.log("Is myPost ready?:", FlowRouter.subsReady("currentRoom"));
    console.log("Does all subscriptions ready?:", FlowRouter.subsReady());
});

