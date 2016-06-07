// Main

var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');

var fs = require('fs');
var keys = require('./keys.js')

var action = process.argv[2];
var value = process.argv[3];

doSwitch();

// end Main

// Functions below

// Switch function directs which function to call based on inputs

function doSwitch() {
	switch(action){
	    case 'my-tweets':
	        myTweets();
	        break;
	    case 'spotify-this-song':
	        spotifyThis();
	        break;
	    case 'movie-this':
	        movieThis();
	        break;
	    case 'do-what-it-says':
	        doWhat();
	        break;
	} // end switch
} // end function doSwitch


// function myTweets() gets last 20 tweets by userName

function myTweets() {
	
	// console.log(keys.twitterKeys);
	var client = new Twitter(keys.twitterKeys);
	var userName = "johnriepe"
	// console.log(client);
	client.get('statuses/user_timeline', {screen_name: userName, count: 20}, function(error, tweets, response) {
   	//console.log(tweets);
   	//console.log(response);
   	
   	console.log("******************************************************");
	fs.appendFile('log.txt', "******************************************************" + '\n');
   	for (var prop in tweets) {
   		console.log('Tweet: ' + tweets[prop].text);
		console.log('Created: ' + tweets[prop].created_at);
		fs.appendFile('log.txt', 'Tweet: ' + tweets[prop].text + '\n');
		fs.appendFile('log.txt', 'Created: ' + tweets[prop].created_at + '\n');
	}
	}); // end client.get 

	

} // end function myTweets()

// function spotifyThis() gets a song title from spotify

function spotifyThis() {
	if (!value) {
		value = "what's my age again";
	}

	spotify.search({type: "track", query: value, limit: 1}, function(err, data) {
    console.log("******************************************************");
	fs.appendFile('log.txt', "******************************************************" + '\n');
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
    //console.log(data.tracks.items[0]);
    for (var prop in data.tracks.items[0].artists) {
   		console.log('Artist: ' + data.tracks.items[0].artists[prop].name);
   		fs.appendFile('log.txt', 'Artist: ' + data.tracks.items[0].artists[prop].name + '\n');
	}
    console.log('Song Name: ' + data.tracks.items[0].name);
    fs.appendFile('log.txt', 'Song Name: ' + data.tracks.items[0].name + '\n')
    console.log('Preview Link: ' + data.tracks.items[0].preview_url);
    fs.appendFile('log.txt', 'Preview Link: ' + data.tracks.items[0].preview_url + '\n')
    console.log('Album: ' + data.tracks.items[0].album.name);
    fs.appendFile('log.txt', 'Album: ' + data.tracks.items[0].album.name + '\n')
    	 
	}); // end spotify.search

// if no song = "what's my age again" by blink 182
// console.log()
// 1. artist(s)
// 2. song name
// 3. preview link of the song from spotify
// 4. album that the song is a part of
// 

} // end function spotifyThis()


// function movieThis() gets a movie title from OMDB API 

function movieThis() {
	if (!value) {
		value = "Mr. Nobody";	
	}

var url = 'http://www.omdbapi.com/?t='+value+'&plot=short&tomatoes=true&r=json';

request(url, function(err, response, body) {
	body = JSON.parse(body);
	console.log("******************************************************");
	fs.appendFile('log.txt', "******************************************************" + '\n')
	console.log('Title: ' + body.Title);
	fs.appendFile('log.txt', 'Title: ' + body.Title + '\n')
	console.log('Year: ' + body.Year);
	fs.appendFile('log.txt', 'Year: ' + body.Year + '\n')
	console.log('IMDB Rating: ' + body.imdbRating);
	fs.appendFile('log.txt', 'IMDB Rating: ' + body.imdbRating + '\n')
	console.log('Country: ' + body.Country);
	fs.appendFile('log.txt', 'Country: ' + body.Country + '\n')
	console.log('Language: ' + body.Language);
	fs.appendFile('log.txt', 'Language: ' + body.Language + '\n')
	console.log('Plot: ' + body.Plot);
	fs.appendFile('log.txt', 'Plot: ' + body.Plot + '\n')
	console.log('Actors: ' + body.Actors);
	fs.appendFile('log.txt', 'Actors: ' + body.Actors + '\n')
	console.log('Rotten Tomatoes Rating: ' + body.tomatoRating);
	fs.appendFile('log.txt', 'Roten Tomatoes Rating: ' + body.tomatoRating + '\n')
	console.log('Rotten Tomatoes URL: ' + body.tomatoURL);
	fs.appendFile('log.txt', 'Rotten Tomatoes URL: ' + body.tomatoURL + '\n')
})
// if no movie is provided then the program will output information for the movie: 'Mr. Nobody'
// console.log()
// 1. Title
// 2. Year
// 3. IMDB Rating
// 4. Country
// 5. Language
// 6. Plot
// 7. Actors
// 8. Rotten Tomatoes Rating
// 9. Rotton Tomatoes UrL

} // end function movieThis()


// function doWhat() gets information from text file that determines
// which of the three above functions is called and what search item is used
// it gets info and passes that back to doSwitch() to process

function doWhat() {
	fs.readFile('./random.txt', "utf8", function(err, data){
		data = data.split(',');
		//console.log(data);

		action = data[0];
		
		value = data[1];
		
		doSwitch(action);
	}); // end fs.readFile	

} // end function doWhat()
