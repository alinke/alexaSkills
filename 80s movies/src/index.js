/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Flash Card skill. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "What color did the ghosts have to be for Pac Man to eat them?": [
            "Blue"
        ]
    },
    {
        "Who was the lead singer of The Police?": [
            "Sting"
          ]
    },

    {
        "What 1980's sitcom was Tony Danza in?": [
            "Who's the Boss"
        ]
    },

    {
        "Who was the dramatic red head that captured our attention when she was pretty in pink?": [
            "Molly Ringwald"
        ]
    },

    {
        "What was the 2nd fruit on the original pac-man?": [
            "Strawberry"
        ]
    },

    {
        "Which sitcom starred kids named theo, vanessa, and rudy": [
            "The Cosby Show"
        ]
    },

    {
        "Which late 80s pop act had their Grammy revoked for not singing the vocals on their album?": [
            "Milli Vanilli"
        ]
    },

    {
        "What was the best selling music album of the 80s": [
            "Thriller"
        ]
    },

    {
        "What was the highest grossing movie of the 80s?": [
            "E.T. The Extra-Terrestrial"
        ]
    },

    {
        "With over 50 reported casualties, what volcano erupted in 1980 that became the worst volcanic disaster in US history?": [
            "Mount Saint Helens"
        ]
    },

    {
        "What car was popularized in the movie Back to the Future?": [
            "Dolorean"
        ]
    },

    {
        "The famous music television TV station MTV was launched in 1981 – name the song of the first music video ever played?": [
            "Video Killed the Radio Star"
        ]
    },

    {
        "This gaming console, launched in 1983, became the best selling Video Game Console of the 80s? Name the Manufacturer": [
            "Nintendo"
        ]
    },

    {
        "Though this toy was technically invented in 1974, it gained its massive popularity in the 1980s. With over 350 MILLION units sold, it is widely considered to be the best selling toy in history.": [
            "Rubik's Cube"
        ]
    },

    {
        "Which NFL team won the most Super Bowls in the 80s?": [
            "San Francisco 49ers"
        ]
    },

    {
        "This Prime Minister of the United Kingdom was the first female leader of a Western country, nicknamed The Iron Lady": [
            "Margaret Thatcher"
        ]
    },

    {
        "What was the most famous and large-scale nuclear plant meltdown in history, occurring on April 26, 1986?": [
            "Chernobyl"
        ]
    },

    {
        "What world-changing musician was murdered outside of his building in New York City on the evening of December 8th, 1980?": [
            "John Lennon"
        ]
    },

    {
        "Which popular 1980s rock band got their name from the 1960s movie Barbarella?": [
            "Duran Duran"
        ]
    },

    {
        "Go ahead, make my day, was a famous quote by Clint Eastwood in which Dirty Harry sequel?": [
            "Sudden Impact"
        ]
    },

    {
        "What was the name of the Las Vegas hotel that caught fire in November of 1980 killing 85 people and injuring almost 700 people?": [
            "MGM Grand"
        ]
    },

    {
        "Who was the American track star that won four gold medals in the 1984 Olympics?": [
            "Designing Women"
        ]
    },

    {
        "Which championship pro football team had a rap music hit in the mid-80s with The Super Bowl Shuffle": [
            "Chicago Bears"
        ]
    },

    {
        "What was E.T.'s favorite kind of candy?": [
            "Reese's Pieces"
        ]
    },

    {
        "Which popular 1980s group had a hit with Careless Whisper?": [
            "Wham"
        ]
    },

    {
        "What 1984-1986 game show featured the whammy?": [
            "Press Your Luck"
        ]
    },

    {
        "What was the name of the Las Vegas hotel that caught fire in November of 1980 killing 85 people and injuring almost 700 people?": [
            "MGM Grand"
        ]
    },

    {
        "What was the first name of the character played by Michael Schoeffling in Sixteen Candles?": [
            "Jake"
        ]
    },

    {
        "Who was the TV action star of the '80s that had a pop album in 1986 entitled Heartbeat?": [
            "Don Johnson"
        ]
    },

    {
        "Who was the American track star that won four gold medals in the 1984 Olympics?": [
            "Carl Lewis"
        ]
    },

    {
        "I feel the need, the need for speed is a popular line from which film from 1986?": [
            "Top Gun"
        ]
    },

    {
        "Sonny Bono became the mayor of what town in Califronia in 1984?": [
            "Palm Springs"
        ]
    },

    {
        "On Three's Company, what city did the trio live in?": [
            "Santa Monica"
        ]
    },

    {
        "What was Roscoe's dogs name on the Dukes of Hazzard": [
            "Flash"
        ]
    },

    {
        "On Little House on the Prairie, what was Laura's horse's name": [
            "Bunny"
        ]
    },

    {
        "On Little House on the Prarie, what was the original name for the school teacher?": [
            "Miss Beatle"
        ]
    },

    {
        "What is the name of the cat in the smurfs?": [
            "Azriel"
        ]
    },
];




// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

//     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
//         context.fail("Invalid Application ID");
//      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
            handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 1;
var GAME_LENGTH = 5;
// Be sure to change this for your skill.
var CARD_TITLE = "80s Trivia";

function getWelcomeResponse(callback) {
    // Be sure to change this for your skill.
    var sessionAttributes = {},
        //CHANGE THIS TEXT
        speechOutput = "I will say " + GAME_LENGTH.toString()
            + "trivia questions from the eighties, try to get as many right as you can. Just say the answer. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]]),
        repromptText = spokenQuestion,

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += ""
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Sorry, your answer is not is our list. " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && intent.slots.Answer.value.toUpperCase() == correctAnswerText.toUpperCase()) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for playing eighties trivia";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]]);
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText =  spokenQuestion ;
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText +=  ""
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "To start a new game at any time, say, start new game"
        + "To repeat the last eighties sitcom actor, say, repeat. ",
        repromptText = "Try to get the right answer. ";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a custom closing statment when the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Thanks for playing eighties trivia!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return 1;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
