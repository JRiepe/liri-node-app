// Main

var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');

var fs = require('fs');
var keys = require('./keys.js')

var action = process.argv[2];
var value = process.argv[3];

console.log(action);
console.log(value);

doSwitch();

// end Main

// Functions below

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


function myTweets() {
	
// last 20 tweets console.log()

}


function spotifyThis() {
	if (value = null) {
		
	}
// if no song = "what's my age again" by blink 182
// console.log()
// 1. artist(s)
// 2. song name
// 3. preview link of the song from spotify
// 4. album that the song is a part of
// 5. song name
}


function movieThis() {
	if (!value) {
		value = "Mr. Nobody";	
	}

var url = 'http://www.omdbapi.com/?t='+value+'&plot=short&tomatoes=true&r=json';

request(url, function(err, response, body) {
	body = JSON.parse(body);
	console.log(body);
	console.log(body.Title);
	console.log(body.Year);
	console.log(body.imdbRating);
	console.log(body.Country);
	console.log(body.Language);
	console.log(body.Plot);
	console.log(body.Actors);
	console.log(body.tomatoRating);
	console.log(body.tomatoURL);
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

}


function doWhat() {
	fs.readFile('./random.txt', "utf8", function(err, data){
		data = data.split(', ');
		console.log(data);
		action = data[0];
		value = data[1];
		doSwitch();
	}); // end fs.readFile	

}
