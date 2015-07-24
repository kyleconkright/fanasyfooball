Todos = new Meteor.Collection('todos');

if(Meteor.isClient){
  Template.todos.helpers({
    'todo': function(){
      return Todos.find();
    }
  });

  Template.todos.events({
    'submit form': function(e){
      e.preventDefault();
      var todoName = $('[name="todoName"]').val();
      Todos.insert({
        name: todoName,
        completed: false,
        createdAt: new Date()
      });
      $('[name=todoName]').val('');
    }
  });

  Template.todoItem.events({
    
    'click .delete-todo': function(e){
      e.preventDefault();
      var documentId = this._id;
      var confirm = window.confirm("delete?");
      if(confirm) {
        Todos.remove({_id: documentId});
      }
    },

    'keyup [name=todoItem]': function(e){
      var documentId = this._id;
      var todoItem = e.target.value;
      Todos.update({ _id: documentId }, {$set: { name: todoItem }});
    }


  });
}//client

if(Meteor.isServer){
    // server code goes here
}