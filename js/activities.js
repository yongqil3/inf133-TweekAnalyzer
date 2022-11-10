function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// test value working or not
	//console.log(tweet_array[0].distance);

	// store values in a array
	var types_exercises = [];

	for (let index = 0; index < tweet_array.length; index++) {
		const element = tweet_array[index];

		if (types_exercises.includes(element.activityType) == false) {
			if (element.activityType != "other activity" && element.activityType != "unknown") {

				types_exercises.push(element.activityType);
			}
		}
	}

	//console.log(types_exercises.length);

	//calculate the 3 most
	let activity_map = new Object();

	for (let index = 0; index < types_exercises.length; index++) {
		const element = types_exercises[index];
		activity_map[element] = { total_count: 0, total_distance: 0 };
	}

	for (let index = 0; index < tweet_array.length; index++) {
		const element = tweet_array[index];
		if (types_exercises.includes(element.activityType)) {
			activity_map[element.activityType].total_count++;
			activity_map[element.activityType].total_distance += element.distance;
		}
		//console.log(element.distance);

	}

	//console.log(activity_map["moutain biking"].total_distance);

	//re-mapping to find "top 3 activity name"
	var temp_arr = [];
	let activity_re_map = new Object();
	for (let index = 0; index < types_exercises.length; index++) {
		const element = types_exercises[index];
		activity_re_map[activity_map[element].total_count] = index;
		temp_arr.push(activity_map[element].total_count);
	}

	// source https://www.w3schools.com/jsref/jsref_sort.asp Sort numbers in descending order
	temp_arr.sort((function (a, b) { return b - a }));
	//console.log(temp_arr);

	//test getdateType()
	//console.log(tweet_array[1312].dayType);

	var total_weekday_count, total_weekend_count;
	var weekdayOrWeekendLonger;
	tweet_array.forEach(element => {
		if (element.activityTypex == types_exercises[activity_re_map[temp_arr[0]]]) {
			if (element.dayType == "weekday") {
				total_weekday_count++;
			}
			total_weekend_count++;
		}
	});

	if (total_weekday_count > total_weekend_count) {
		weekdayOrWeekendLonger = "weekday";
	}
	weekdayOrWeekendLonger = "weekend";

	var firstMostActivity = types_exercises[activity_re_map[temp_arr[0]]];
	var secondMostActivit = types_exercises[activity_re_map[temp_arr[1]]];
	var thirdMostActivit = types_exercises[activity_re_map[temp_arr[2]]];


	//update span
	document.getElementById('numberActivities').innerText = types_exercises.length;
	document.getElementById('firstMost').innerText = firstMostActivity;
	document.getElementById('secondMost').innerText = secondMostActivit;
	document.getElementById('thirdMost').innerText = thirdMostActivit;

	document.getElementById('longestActivityType').innerText = types_exercises[activity_re_map[temp_arr[0]]];
	document.getElementById('shortestActivityType').innerText = types_exercises[activity_re_map[temp_arr[temp_arr.length - 1]]];
	document.getElementById('weekdayOrWeekendLonger').innerText = weekdayOrWeekendLonger;


	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	var activityArr = [];
	tweet_array.forEach(element => {
		if (types_exercises.includes(element.activityType)) {
			activityArr.push({
				activityType: element.activityType,
				count: activity_map[element.activityType].total_count,
			}
			)
		}
	});

	var top_activity_arr = [];
	tweet_array.forEach(element => {
		if ((element.activityType === firstMostActivity) ||
			(element.activityType === secondActivity) ||
			(element.activityType === thirdActivity)) {
			top_activity_arr.push({
				activityType: element.activityType,
				day: element.day,
				distance: element.distance
			});
			console.log(element.distance);
		}
	});


	activity_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"height": 360,
		"width": 700,
		"data": {
			"values": activityArr
		},
		//TODO: Add mark and encoding
		"mark": "point",
		"encoding": {
			"x": {
				"field": "activityType",
				"sort": { "op": "count", "field": "activityType", "order": "descending" },
				"axis": { "title": "Activity" }
			},
			"y": {
				"aggregate": "count",
				"scale": { "type": "log" },
			},
		},

	};
	vegaEmbed('#activityVis', activity_vis_spec, { actions: false });



	//define spec for vega-lite visualization for distance by day of the week for 3 most tweeted-about activities

	dis_vis_spec =
	{
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A plot of the distances by day of the week for all of the three most tweeted-about activities. ",
		"height": 360,
		"width": 700,
		"data": {
			"values": top_activity_arr
		},
		"selection": {
			"paintbrush": {
				"type": "multi",
			}
		},
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": { "title": "day of the week" }
			},
			"y": {
				"field": "distance",
				"type": "quantitative"
			},
			"color": {
				"field": "activityType",
			}
		}
	}
	vegaEmbed('#distanceVis', dis_vis_spec, { actions: false });

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	distance_vis_aggregated = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
		"description": "A plot of the distances by day of the week for all of the three most tweeted-about activities",
		"width": 700,
		"height": 360,
		"data": {
			"values": top_activity_arr
		},
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": { "title": "day of the week" }
			},
			"y": {
				"field": "distance",
				"aggregate": "average",

			},

			"color": {
				"field": "activityType",
			}
		}
	};
	vegaEmbed('#distanceVisAggregated', distance_vis_aggregated, { actions: false });
	document.getElementById("distanceVisAggregated").style.display = "none";

}



//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	var btn = document.getElementById("aggregate");
	const inputHandler = function (extract) {
		let button = extract.target;
		if (button.innerText == "Show all activities") {
			button.innerText = "Show means";
			document.getElementById("distanceVis").style.display = "";
			document.getElementById("distanceVisAggregated").style.display = "none";
		} else if (button.innerText == "Show means") {
			button.innerText = "Show all activities";
			document.getElementById("distanceVis").style.display = "none";
			document.getElementById("distanceVisAggregated").style.display = "";
		}
	}
	btn.addEventListener('click', inputHandler);
	loadSavedRunkeeperTweets().then(parseTweets);

});