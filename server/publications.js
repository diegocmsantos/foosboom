Meteor.publish( 'teams', allTeams );
Meteor.publish( 'games', allGames );

function allTeams() {
	return Teams.find({});
}

function allGames() {
	return Games.find({});
}