var fs = require('fs');
var keys = require('./keys.js')

fs.readFile('./random.txt', "utf8", function(err, data){

        // Break down all the numbers inside
        data = data.split(', ');
        console.log(data);
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
}); // end fs.readFile