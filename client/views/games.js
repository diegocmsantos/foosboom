Template.games.helpers({

	games: allGames,
	teams: allTeams,
	isCreatingGame: isCreatingGame

});

Template.games.events({

	'click a.create': btnCreateGameClick,
	'click a.cancel': btnCancelGameClick,
	'submit form.form-create': btnSubmitGameClick

});

function allGames() {

	return Games.find();

}

function allTeams() {

	return Teams.find();

}

function isCreatingGame( e, tpl ) {

	return Session.get('isCreatingGame');

}

function btnCreateGameClick( e, tpl ) {

	e.preventDefault();
	Session.set( 'isCreatingGame', true );

}

function btnCancelGameClick( e, tpl ) {

	e.preventDefault();
	Session.set( 'isCreatingGame', false );

}

function btnSubmitGameClick( e, tpl ) {

	e.preventDefault();
	var teamOneId = tpl.$( '[name=teamOne]' ).val();
	var teamOneName = tpl.$("select[name=teamOne] option:selected").text();
	var teamTwoId = tpl.$( '[name=teamTwo]' ).val();
	var teamTwoName = tpl.$("select[name=teamTwo] option:selected").text();

    Meteor.call( 'gamesInsert', teamOneId, teamTwoId, function( error, response ) {

        if ( error ) {

            alert( error.reason );
            Session.get( 'isCreatingGame', true );
            Tracker.afterFlush(function(){
                tpl.$("select[name=teamOne]").val(teamOneId);
                tpl.$("select[name=teamTwo]").val(teamTwoId);
            });

        }

    } );

    Session.set('isCreatingGame', false);

}