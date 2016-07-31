$(function(){
	var interval=undefined;
	var timeLeft;
	var scoreCorrect=0;
	var scoreIncorrect=0;
	var scoreUnanswered=0;
	var questionsLeft = 3;

	$("#start").click(function(){
		$("#initial-screen").hide();
		$("#timer, #question, #body").fadeIn("slow");
		newQuestion();
	})
	$("#restart").click(function(){
		$("#final").hide();
		restart();
	})
	function restart(){
		$("#timer, #question, #body").fadeIn("slow");
		scoreCorrect = 0;
		scoreIncorrect = 0;
		scoreUnanswered = 0;
		questionsLeft = 3;
		newQuestion();
	}

	function finish(){
		$("#score-correct").text(scoreCorrect);
		$("#score-incorrect").text(scoreIncorrect);
		$("#score-unanswered").text(scoreUnanswered);
		$("#trivia-container > div").hide();
		$("#game-title").show();
		$("#final").fadeIn("slow");

	}

	function newQuestion(){
		timeLeft = 30;
		interval = setInterval(updateCountDown, 1000);

		var triviaData = "assets/json/trivia-list.json";
		$("#result").hide();
		$("#answers").fadeIn("slow");
		$.ajax({url: triviaData, method: 'GET'}).done(function(response) {
			var randId = Math.floor(Math.random() * response.length);


			$('#answers').empty();
		    $("#cur-question").html(response[randId].question);

		    var a1 = $("<div class='radio'><label><input type='radio' name='optradio' class='option' id='A'>" + response[randId].A + "</label></div>");
		    var a2 = $("<div class='radio'><label><input type='radio' name='optradio' class='option' id='B'>" + response[randId].B + "</label></div>");
		    var a3 = $("<div class='radio'><label><input type='radio' name='optradio' class='option' id='C'>" + response[randId].C + "</label></div>");
		    var a4 = $("<div class='radio'><label><input type='radio' name='optradio' class='option' id='D'>" + response[randId].D + "</label></div>");

		    $("#answers").append(a1).append(a2).append(a3).append(a4);

		    $(".option").click(function(){
		    	console.log(this);
		    	console.log($(this).attr("id"));
		    	console.log(response[randId].answer)
		    	
		    	var a = response[randId].answer;

		    	if($(this).attr("id") == response[randId].answer)
		    	{
		    		var result = "winner";
		    		var shownResult = $("<div>Correct!!!</div>");
		    		scoreCorrect++;
		    	}
		    	else{
		    		var result = "loser";
		    		var shownResult = $("<div>Nope!!!</div>")
		    		var correctAnswer = $("<div>The correct answer is " + response[randId][a] + ".</div>");
		    		scoreIncorrect++;
		    	}
		    	$("#result").empty();
		    	$("#result").append(shownResult).append(correctAnswer);
		    	
		    	submitAnswer(result);	
		    	
		    })

		});
	}

	function updateCountDown(){
		$("#t-left").text(timeLeft);
		timeLeft --;
		if(timeLeft<=0){
			answersUnanswered++;
			submitAnswer("loser");
		}
	}

	function submitAnswer(result){
		clearInterval(interval);
		questionsLeft--;
		$("#answers").hide();

		var gif = "https://api.giphy.com/v1/gifs/search?q="+ result +"&api_key=dc6zaTOxFJmzC";

		$.ajax({url: gif, method:'GET'}).done(function(response){
			
			var randId = Math.floor(Math.random() * response.data.length);

			var resultImage = $('<img src="' + response.data[randId].images.fixed_height.url + '" class="img-responsive" alt="Image">');
			$("#result").append(resultImage);
			$("#result").fadeIn("slow");
		})

		if(questionsLeft<=0){
			setTimeout(finish, 5000);
		}
		else{
			setTimeout(newQuestion, 5000);
		}
	}
	
})