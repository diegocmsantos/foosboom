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
 
    var teamName = tpl.$('input[name="name"]').val();
    if(teamName.length){
    	Teams.update(this._id, {$set: {name: teamName}});
      	Session.set('editedTeamId', null);
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