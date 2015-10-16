Template.teams.helpers({

	teams: function () {
		return Teams.find({});
	},

	isCreatingTeam: function() {
		return Session.get('isCreatingTeam');
	}

});

Template.teams.events({

	'click a.create': btnCreateClick,
	'click a.cancel': btnCancelClick,
	'submit form.create-team': btnSubmitClick

});

function btnCreateClick( e, template ) {

	e.preventDefault();
	Session.set( 'isCreatingTeam', true );

}

function btnCancelClick( e, template ) {

	e.preventDefault();
	Session.set( 'isCreatingTeam', false );

}

function btnSubmitClick( e, template ) {

	e.preventDefault();
	var teamName = template.$('input[name=name]').val();

    Teams.insert({name: teamName}, function(error, _id){
    	if(error){
       		alert(error);
        	Session.set('isCreatingTeam', true);
        	Tracker.afterFlush(function(){
          		template.$('input[name=name]').val(teamName);
        	});
      	}
    });

    Session.set('isCreatingTeam', false);

}