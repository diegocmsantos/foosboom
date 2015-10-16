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
	console.log( teamOneId );
	console.log( teamOneName );
	console.log( teamTwoId );
	console.log( teamTwoName );

	var game = {
      completed: false,
      createdAt: new Date(),
      teams: [
        {name: teamOneName, _id: teamOneId, score: 0},
        {name: teamTwoName, _id: teamTwoId, score: 0}
      ]
    };
   
    gameId = Games.insert(game);

    // Add this game to both teams gameIds
    Teams.update({_id: teamOneId}, {$addToSet: { gameIds: gameId}});
    Teams.update({_id: teamTwoId}, {$addToSet: { gameIds: gameId}});

    Session.set('isCreatingGame', false);

}