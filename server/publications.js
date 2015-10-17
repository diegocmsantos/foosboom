Meteor.publish( 'teams', allTeams );
Meteor.publish( 'games', allGames );

function allTeams() {
	return Teams.find( { ownerId: this.userId } );
}

function allGames() {
	return Games.find( { ownerId: this.userId } );
}