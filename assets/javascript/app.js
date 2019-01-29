$(document).ready(function () {

	var triviaTimer = 10;
	var correct = 0;
	var incorrect = 0;
	var quesAns = 0;
	var answers = [];
	var triviaQuestion = 0;

	// Begin trivia questions //
	var trivia = [
		q1 = {
			question: "Dark roasted coffee beans have…",	
			choices: ["Richer flavor", "Less caffeine", "Both"],
			correct: 2,
		},
		q2 = {
			question: "When you drink coffee, the caffeine is effective in your bloodstream…",
			choices: ["Instantly", "Within half and hour", "Within 10 minutes"],
			correct: 2,
		},
		q3 = {
			question: "More than ___ countries produce coffee.",
			choices: ["100", "50", "25"],
			correct: 1,
		},
		q4 = {
			question: "Adding milk to coffee…",
			correct: 2,
			choices: ["Slows the digestive process", "Mitigates the effect of caffeine", "Both"],
		},
		q5 = {
			question: "In Italy, during the 16th century coffee was banned as being…",
			choices: ["Over-stimulating", "Satanic", "Unhealthy"],
			correct: 1,
		},
		q6 = {
			question: "The meaning of the term “espresso” is…",
			choices: ["Forced out", "Expressive", "Under pressure"],
			correct: 0,
		},
		q7 = {
			question: "Pope Clement VII was a big coffee fan, so he…",
			choices: ["Served coffee at Mass", "Had coffee baptized", "Only let clergy members drink coffee"],
			correct: 1,
		},
		q8 = {
			question: "People who drink coffee are said to…",
			choices: ["Have less risk of developing Alzeimer's disease", "Have more energy for a workout within half an hour of drinking a cup of coffee", "Both"],
			correct: 2,
		},
	];

	var hide = function (elementId) {
		$(elementId).css("visibility", "hidden");
	};

	var show = function (elementId) {
		$(elementId).css("visibility", "visible");
	};
	
	var write = function (elementId, thing) {
		$(elementId).html('<h3>' + thing + "</h3>")
	};

	// function to write questions
	var questionWrite = function () {
		if (triviaQuestion <= 7) { 
			$('#questions').html('<h2>' + trivia[triviaQuestion].question + '</h2>');
			answers = trivia[triviaQuestion].choices;
			show('.answer');
			for (var i = 0; i < answers.length; i++) {
				$('#answer' + i).html('<h3>' + answers[i] + '</h3>');
			}
		}
		else {
			gameOver();
		}
	};

// clears answer content
	var answerClear = function () {

		for (var i = 0; i < 4; i++) {
			$('#answer' + i).html('');
		}
		hide('.answer');
	};

// clear startTitle / hide start button
	var start = function() {
		counter = setInterval(countDown, 1000);
		$('#startTitle').empty();
		hide('#start');
		questionWrite();	
	};
// clear all
	var clearScreen = function () {
		$('#startTitle').empty();
		$('#questions').empty();
		$('#scores').empty();
		answerClear();
	}

// begin timer countdown
	var countDown = function () {
		triviaTimer --;
		$('#timer').html('<h2> Time Remaining: ' + triviaTimer + '</h2>');
// end game when timer reaches 0
		if (triviaTimer === 0) {
			gameOver();
		}
	};
// stop and clear countdown
	var stop = function () {
		clearInterval(counter);
	};

// reset function
	var reset = function () {
		stop();
		triviaTimer = 10;
		answers = [];
		triviaQuestion = 0;
		clearScreen();
		$('#timer').empty();
		write('#startTitle', 'Press Start Button to Begin!');
		show('#start');
		hide('#reset');
	};
	
	var gameOver = function() {
		stop();
		clearScreen();

		write('#startTitle', '<h3>Game Over!</h3>');
		$('#scores').append('<h3>Results:</h3>');
		$('#scores').append('<h3>Questions answered: ' + quesAns + '</h3>');
		$('#scores').append('<h3>Questions correctly answered: ' + correct + '</h3>');
		$('#scores').append('<h3>Questions incorrectly answered: ' + incorrect + '</h3>');
		show('#reset');
	};

	var nextQuestion = function () {
		
		$('#questions').css('display', 'initial');
		$('#answers').css('display', 'initial');
		$('#answerMsg').css('display', 'none');
		clearInterval();
		triviaTimer = 10;
	}

	//check answer
	$('.answer').click(function () {
		var clicked = $(this);
		var value = clicked.attr('value');
		var correctAnswer = trivia[triviaQuestion].correct;

		if (value == correctAnswer) {
			$('#questions').empty();
			answerClear();
			$('#answers').css('display', 'none');
			$('#questions').css('display', 'none');
			$('#answerMsg').css('display', 'initial');
			$('#image').attr('src', trivia[triviaQuestion].gif);
			$('#image').css('display', 'initial');
			$('#answerMsg').html('<h3> You chose ' + answers[value] + '.</h3> <br><h3>The correct answer was ' + answers[correctAnswer] + '.</h3>');
			setInterval(nextQuestion, 5 * 1000);
			quesAns ++;
			correct ++;
			triviaQuestion ++;
			questionWrite();
		}
		else {
			quesAns ++;
			incorrect ++;
			triviaQuestion ++;
			triviaTimer = 10;
			$('#questions').empty();
			answerClear();
			questionWrite();
		}
	});

	 // click handlers	
	$('#start').on("click", start);
	$('#reset').on('click', reset);
})