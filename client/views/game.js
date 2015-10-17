Template.game.helpers({

	completed: isCompleted

});

Template.game.events({

	'click a.score': btnIncScoreClick,
	'click a.finish-game': btnFinishGameClick,
  	'click a.delete-game': btnDeleteGameClick

});

function isCompleted() {

	return Games.findOne( this._id ).completed;

}

function btnIncScoreClick( e, tpl ) {

	e.preventDefault();
    var data = $(e.currentTarget).data();
    var update = {$inc: {}};
    var selector = "teams." + data.index + ".score";
    update.$inc[selector] = data.inc;
    Games.update({_id: this._id}, update);

}

function btnFinishGameClick( e, tpl ) {

	e.preventDefault();
	Games.update({_id: this._id}, {$set: {completed: true}});

}

function btnDeleteGameClick( e, tpl ) {

	e.preventDefault();
    var gameId  = this._id;
    var teamIdA = this.teams[0]._id;
    var teamIdB = this.teams[1]._id;

    Games.remove(gameId, function (error) {
      if (!error) {
        Teams.update({_id: teamIdA}, {$pull: {gameIds: gameId}});
        Teams.update({_id: teamIdB}, {$pull: {gameIds: gameId}});
      }
    });

}