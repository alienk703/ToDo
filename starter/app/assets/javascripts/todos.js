$(document).ready(function() {

  // When the form is submitted, send a request to the server to create a todo
  // After you're sure the todo was created in the DB, prepend an <li> to the list of todos with the new todo info
	$("form").on("submit", function(event) {
	event.preventDefault();
		text = $("input")[0].value

		$.post("/todos", { todo:{task: text} }).done(function(data){
		$('ul').prepend("<li data-todo-id"+data.id+'>'+data.task+"<input id=\"done\" name=\"done\" type=\"checkbox\" value=\"yes\"><span>&times</span></li>");
		})
		.error("hodor?");
	});

	$("span").on('click', function(){

		parent = $(this).parent();	

		$.ajax({
	    url: '/todos/' + parent.attr("data-todo-id"),
	    type: 'DELETE',
	    success: function(result) {
	    	parent.remove();
	     
	    }
	});

	});

	$("ul input").on("click", function(){
		var eval;
		parent = $(this).parent();

		if (parent.hasClass("done")){
			eval = false;
		}else {
			eval = true;
		}

		$.ajax({
		url: '/todos/'+ parent.attr("data-todo-id"),
		type: 'PUT',
		data: { todo: {done: eval}},
		success: function(){
			parent.toggleClass("done");
		}
	});
	})



  // Create some way to update the todos when they are checked off, so that you can see which ones you've completed
  // Create a way to delete the todos when you hit the "X" next to their name

});


