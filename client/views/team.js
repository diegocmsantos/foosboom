Template.team.helpers({

	isEditingTeam: function() {
		return Session.get( 'editedTeamId' ) === this._id;
	}

});

Template.team.events({

	"click a.edit": fillEditedTeamId,
 
  "submit form.form-edit": btnSubmitEditForm,
 
  "click a.cancel": btnCancelEditForm,

	'click a.remove': btnRemoveTeamClick

});

function fillEditedTeamId( e, tpl ) {

	e.preventDefault();
    Session.set( 'editedTeamId', this._id );

}

function btnSubmitEditForm( e, tpl ) {

	e.preventDefault();
 
  var teamName = tpl.$("input[name=name]").val();
  var self = this;

  if( teamName.length ){

    Meteor.call( "teamUpdate", this._id, teamName, function( error ) {

      if( error ) {

        alert(error.reason);
        Session.set('editedTeamId', self._id);

        Tracker.afterFlush(function() {
          tpl.$("input[name=name]").val(teamName);
          tpl.$("input[name=name]").focus();
        });

      }

    });

    Session.set('isEditingTeam', null);
    
  }

}

function btnCancelEditForm( e, tpl ) {

    	e.preventDefault();
    	Session.set('editedTeamId', null);

}

function btnRemoveTeamClick( e, tpl ) {

    	e.preventDefault();
    	Teams.remove(this._id);

}