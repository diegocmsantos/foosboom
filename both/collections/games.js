Games = new Mongo.Collection('games');

Games.allow({

  insert: allowInsert,
  update: allowUpdate,
  remove: allowRemove,
  fetch: ['ownerId']

});

function allowInsert(userId, doc) {

  return (userId && doc.owner == userId);

}

function allowUpdate(userId, doc, fields, modifier) {

  return doc.owner == userId;

}

function allowRemove(userId, doc) {

  return doc.owner == userId;

}

Meteor.methods({

  gamesInsert: function( teamOneId, teamTwoId ) {

    check( Meteor.userId(), String );
    check( teamOneId, String );
    check( teamTwoId, String );

    if(!teamOne || !teamTwo){
      throw new Meteor.Error( "invalid-parameters", "One of the teams doesn't exist in the database");
    }

    var teamOne = Teams.findOne({
      _id: teamOneId,
      ownerId: Meteor.userId()
    });
    var teamTwo = Teams.findOne({
      _id: teamTwoId,
      ownerId: Meteor.userId()
    });

    var teamOneData = {
      _id: teamOne._id,
      name: teamOne.name,
      score: 0
    };

    var teamTwoData = {
      _id: teamTwo._id,
      name: teamTwo.name,
      score: 0
    };

    var game = {
      ownerId: Meteor.userId(),
      teams: [teamOneData, teamTwoData],
      completed: false
    };

    var gameId = Games.insert(game);

    // Update each team's cached array of game ids
    Teams.update({
      _id: teamOneData._id
    }, {
      $addToSet: {
        gameIds: gameId
      }
    });
    Teams.update({
      _id: teamTwoData._id
    }, {
      $addToSet: {
        gameIds: gameId
      }
    });

    // Copy Meteor.insert(), which just returns the _id
    return gameId;
  }

});