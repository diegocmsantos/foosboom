Teams = new Mongo.Collection('teams');

Teams.allow({

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

  teamUpdate: function(teamId, teamName) {

    check(Meteor.userId(), String);
    check(teamId, String);
    check(teamName, String);

    var team = Teams.findOne(teamId);

    if ( team ) {

      Teams.update( teamId, { $set: { name: newName } }, function( error ) {

        if ( !error ) {

          if ( team.gameIds ) {

            var games = Games.find( { _id: { $in: team.gameIds } } );

            games.fetch().forEach(function( game ) {

              game.teams.map(function( team ) {

                if (team._id == teamId) {

                  team.name = newName;

                }

                Games.update( { _id: game._id }, { $set: { teams: game.team } } );

              })

            });
            
          }

          return teamId;

        }

      });

    } else {

      throw new Meteor.Error("team-does-not-exist", "This team doesn't exist in the database");

    };

  }

});