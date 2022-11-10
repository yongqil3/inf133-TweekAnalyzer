function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
}

function addEventHandlerForSearch() {

	//extract var from html
	var textFilter = document.getElementById('textFilter');
	var searchText = document.getElementById('searchText');
	var searchCount = document.getElementById('searchCount');
	var tweetTable = document.getElementById("tweetTable");


	//source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/
	const inputHandler = function (extract)
	{
		var tweetCount = 0;
		tweetTable.textContent = '';

		tweet_array.forEach(element => {
			var table = document.createElement('tr');
			var td_1 = document.createElement('td');
			var td_2 = document.createElement('td');
			var td_3 = document.createElement('td');
			var html_element_a = document.createElement('a');
			var html_element_span = document.createElement('span');

			// check input whether empty or not
			if (extract.target.value.length == 0)
			{
				searchCount.innerText = 0;
				tweetTable.innerText = '';
			}

			else if (element.writtenText.includes(extract.target.value) )
			{
				tweetCount++;

				//source: https://bobbyhadz.com/blog/javascript-create-element-with-text#:~:text=To%20create%20an%20element%20and,set%20the%20element%27s%20text%20content.
				var address = element.getHTMLTableRow(tweetCount)
				html_element_a.setAttribute('href', address);
				html_element_a.append(address)

				//source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf#:~:text=prototype.-,lastIndexOf(),searched%20backwards%2C%20starting%20at%20fromIndex%20.
				html_element_span.append(element.text.substring(element.text.lastIndexOf('#') - 1, element.length));

				// show tweetcount number 
				td_1.textContent = tweetCount;
				table.appendChild(td_1)

				// show activityType
				td_2.textContent = element.activityType
				table.appendChild(td_2)

				//tweet content
				td_3.textContent = element.text.substring(0, element.text.indexOf('http') - 1)
				//tweet address
				td_3.appendChild(html_element_a)
				//tweet badage
				td_3.appendChild(html_element_span)
				//combined tweet info
				table.appendChild(td_3)

				//update str to website
				tweetTable.appendChild(table);

			}
		});
		searchCount.innerText = tweetCount;
		searchText.innerText = extract.target.value;
	}
	textFilter.addEventListener('input', inputHandler);
}
//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});