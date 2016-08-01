/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 * This code is a modification of the Hello World template on https://github.com/amzn/alexa-skills-kit-js
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.9d0f3d37-ddba-43a0-9c6b-68993eac4778"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var hintResponse = "You can ask me about security, privacy, echo sales volumes, or business applications. Say thank you to exit."


/**
 * HelloWorld is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var HelloWorld = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
HelloWorld.prototype = Object.create(AlexaSkill.prototype);
HelloWorld.prototype.constructor = HelloWorld;

HelloWorld.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HelloWorld onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

HelloWorld.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("HelloWorld onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome C D P members. My name is Alexa. Adding a voice interface will make it easier for your users to use your applications. I am an open platform, geeks like Al are developing applications for me as we speak.";
    var repromptText = "You can ask me about security, privacy, echo sales volumes, or business applications if you like";
    response.ask(speechOutput, repromptText);
};

HelloWorld.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

HelloWorld.prototype.intentHandlers = {
    // register custom intent handlers


    "ThankYouIntent": function (intent, session, response) {

        speechOutput = {
            speech: "<speak>Thank you for your time. I hope you have a nice meeting. I look forward to joining your companies soon."
                + "<audio src='https://s3-us-west-1.amazonaws.com/alinke2000-s3/spook4.mp3'/>"
                + "</speak>",
            type: AlexaSkill.speechOutputType.SSML
        };

        response.tell(speechOutput);
    },

    "SecurityIntent": function (intent, session, response) {
        response.askWithCard("I do not yet support security voice prints but plan to in the future", hintResponse , "Security Question Asked", "I do not yet support security voice prints but plan to in the future");

    },
    "PrivacyIntent": function (intent, session, response) {
        response.askWithCard("I am always on.  But I am not always streaming data to the Cloud. I only send data to the Cloud when my wake up word of Alexa is spoken", hintResponse , "Privacy Question Asked", "I am always on but I am not always streaming data to the Cloud. I only send data to the Cloud when my wake up word of Alexa is spoken");

    },
    "SalesIntent": function (intent, session, response) {
        response.askWithCard("We have sold over three million amazon echos. There are one thousand people in Amazon working on Alexa right now", hintResponse , "Echo Sales Question", "We have sold over three million amazon echos. There one thousand people in Amazon working on Alexa right now");

    },
    "PushIntent": function (intent, session, response) {
        response.askWithCard("I do not support push notifications at this time. You have to ask me first and then I can give you a response", hintResponse , "Push Notifications Question", "I do not support push notifications at this time. You have to ask me first and then I can give you a response");
    },

  "BusinessApplicationsIntent": function (intent, session, response) {
      response.ask("Well that's what you're paid to do    but here are a few ideas. I could tell you the sales revenue forecast for your current quarter. I could tell you how many help desk tickets are open for a given queue. In fact I have an integration available with ServiceNow today.", hintResponse);

  },
    "AMAZON.HelpIntent": function (intent, session, response) {
      response.ask(hintResponse, hintResponse);
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var helloWorld = new HelloWorld();
    helloWorld.execute(event, context);
};
