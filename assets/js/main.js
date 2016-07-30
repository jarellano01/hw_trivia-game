$(function(){
	var triviaData = "assets/json/trivia-list.json";

	$.ajax({url: triviaData, method: 'GET'}).done(function(response) {
	     $("#body").html(triviaData[33]);
	     console.log(response);

	     console.log(response.Runtime)
	});
	
})