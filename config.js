/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],

	language: 'en',
	timeFormat: 24,
	units: 'imperial',

	modules: [
		// {
		// 	module: 'alert',
		// },
		// {
		// 	module: "updatenotification",
		// 	position: "top_bar"
		// },
		// {
		// 	module: 'clock',
		// 	position: 'top_left'
		// },
		// {
		// 	module: 'calendar',
		// 	header: 'My Calendar',
		// 	position: 'top_left',
		// 	config: {
		// 		timeFormat: 'absolute',
		// 		relative: 0,
		// 		calendars: [
		// 			{
		// 				symbol: 'calendar-check-o ',
		// 				url: 'https://calendar.google.com/calendar/ical/brian.dionigi%40gmail.com/private-f338352ab9d182c2db00d9d82c4dd61c/basic.ics'
		// 			},
		// 			{
		// 				symbol: 'calendar-check-o ',
		// 				url: 'https://calendar.google.com/calendar/ical/e370uqf7nlddpn22hh9k9ljgmo%40group.calendar.google.com/private-0032dc34444434dcc04c74d4facb5264/basic.ics'
		// 			},
		// 			{
		// 				symbol: 'calendar-check-o ',
		// 				url: 'https://calendar.google.com/calendar/ical/9jh7k972r3uvig1ftk4pi10pv0%40group.calendar.google.com/private-d70cd6c322e8b285fd0d0bd3d4ee657b/basic.ics'
		// 			},
		// 			{
		// 				symbol: 'calendar-check-o ',
		// 				url: 'https://calendar.google.com/calendar/ical/q75t040n6lsgvr9mvf2rcfa4dk%40group.calendar.google.com/private-a903a2074a1b8d8cfdd2bbc4aea83712/basic.ics'
		// 			}
		// 		],
		// 	}
		// },
		// {
		// 	module: 'MMM-wordnik',
		// 	position: 'top_bar',
		// 	config: {
		// 		api_key: '3bac8d0a21960dfd0ba04043bd5018260c73043a44638c2f9',
		// 		other_language: 'Korean',
		// 		show_example: 'True'
		// 	}
		// },
		// {
		// 	module: 'compliments',
		// 	position: 'lower_third'
		// },
		// {
		// 	module: 'currentweather',
		// 	position: 'bottom_left',
		// 	config: {
		// 		location: 'Naples',
		// 		locationID: '3163948',  //ID from http://www.openweathermap.org
		// 		appid: '71f0f15b43f844f709e07c00998a7d88'
		// 	}
		// },
		// {
		// 	module: 'weatherforecast',
		// 	position: 'bottom_left',
		// 	header: 'Weather Forecast',
		// 	config: {
		// 		location: 'Naples',
		// 		locationID: '3163948',  //ID from http://www.openweathermap.org
		// 		appid: '71f0f15b43f844f709e07c00998a7d88'
		// 	}
		// },
		// {
		// 	module: 'currentweather',
		// 	position: 'bottom_right',
		// 	config: {
		// 		location: 'Los Angeles',
		// 		locationID: '5368361',  //ID from http://www.openweathermap.org
		// 		appid: '71f0f15b43f844f709e07c00998a7d88'
		// 	}
		// },
		// {
		// 	module: 'weatherforecast',
		// 	position: 'bottom_right',
		// 	header: 'Weather Forecast',
		// 	config: {
		// 		location: 'Los Angeles',
		// 		locationID: '5368361',  //ID from http://www.openweathermap.org
		// 		appid: '71f0f15b43f844f709e07c00998a7d88'
		// 	}
		// },
		// {
		// 	module: 'newsfeed',
		// 	position: 'bottom_bar',
		// 	config: {
		// 		feeds: [
		// 			{
		// 				title: "New York Times",
		// 				url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
		// 			}
		// 		],
		// 		showSourceTitle: true,
		// 		showPublishDate: true
		// 	}
		// },
		// {
		// 	module: 'calendar_monthly',
		// 	position: 'top_right',
		// 	config: {
		// 		cssStyle: 'custom'
		// 			// The config property is optional
		// 			// Without a config, a default month view is shown
		// 			// Please see the 'Configuration Options' section for more information
		// 	}
		// },
		{
			module: 'MMM-workoutDisplay',
			position: 'top_right',
			config : {
				folderID: "0B9V9iwmZWstfaVdXSkdNRFV6Rnc"
			}
		},
		// {
		// 	module: 'newsfeed',
		// 	position: 'bottom_bar',
		// 	config: {
		// 		feeds: [
		// 			{
		// 				title: "NASA",
		// 				url: "https://www.nasa.gov/rss/dyn/solar_system.rss"
		// 			},
		// 			{
		// 				title: "Reuters Science News",
		// 				url: "http://feeds.reuters.com/reuters/scienceNews"
		// 			},
		// 			{
		// 				title: "New York Times",
		// 				url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
		// 			},
		// 			{
        //             	title: "BBC World News",
        //             	url: "http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml"
        //         	},
		// 		],
		// 		showSourceTitle: true,
		// 		showPublishDate: true
		// 	}
		//},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
