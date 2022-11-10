function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;

	//source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
	//Tweet date implementation
	var date_format = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	document.getElementById('firstDate').innerText = tweet_array[tweet_array.length - 1].time.toLocaleDateString('en-US', date_format);
	document.getElementById('lastDate').innerText = tweet_array[0].time.toLocaleDateString('en-US', date_format);


	// tweet categories implementation
	var number_of_complete_event = 0;
	var number_of_liveEvent = 0;
	var number_of_achievement = 0;
	var number_of_miscellaneous = 0;

	

	for (let index = 0; index < tweet_array.length; index++) {
		const element = tweet_array[index];
		if (element.source === 'completed_event') { number_of_complete_event++; }
		else if (element.source === "live_event") { number_of_liveEvent++; }
		else if (element.source === "achievement") { number_of_achievement++; }
		else if (element.source === "miscellaneous") { number_of_miscellaneous++; }
		
	}

	document.getElementsByClassName('completedEvents')[0].innerHTML = number_of_complete_event;
	document.getElementsByClassName('liveEvents')[0].innerHTML = number_of_liveEvent;
	document.getElementsByClassName('achievements')[0].innerHTML = number_of_achievement;
	document.getElementsByClassName('miscellaneous')[0].innerHTML = number_of_miscellaneous;
	document.getElementsByClassName('completedEvents')[1].innerHTML = number_of_complete_event;

	// tweet percent display
	var completedEventPct = ((number_of_complete_event / tweet_array.length) * 100).toFixed(2);
	var liveEventPct = ((number_of_liveEvent / tweet_array.length) * 100).toFixed(2);
	var achievementPct = ((number_of_achievement / tweet_array.length) * 100).toFixed(2);
	var misscellaneousPct = ((number_of_miscellaneous / tweet_array.length) * 100).toFixed(2);

	document.getElementsByClassName('completedEventsPct')[0].innerHTML = completedEventPct + '%';
	document.getElementsByClassName('liveEventsPct')[0].innerHTML = liveEventPct + '%';
	document.getElementsByClassName('achievementsPct')[0].innerHTML = achievementPct + '%';
	document.getElementsByClassName('miscellaneousPct')[0].innerHTML = misscellaneousPct + '%';

	//User Written Tweets
	var number_of_user_wriiten_tweets = 0;

	for (let index = 0; index < tweet_array.length; index++) {
		const element = tweet_array[index];
		if(element.written) {
			number_of_user_wriiten_tweets++;
		}
		
	}
	var userWrittenTweetPct = ((number_of_user_wriiten_tweets / tweet_array.length) * 100).toFixed(2);
	document.getElementsByClassName('written')[0].innerHTML = number_of_user_wriiten_tweets;
	document.getElementsByClassName('writtenPct')[0].innerHTML = userWrittenTweetPct + '%';


}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});