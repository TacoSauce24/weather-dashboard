// api key variable
var apiKey = "1f6f694ad415ec6809cb1502b2268a83";

// city and state variables 
var city = "";
var state = "";

// dom element variables 
var searchButtonEl = document.getElementById('search');
var cityEl = document.getElementById('city-input');
var stateEl = document.getElementById('state-input');
var searchCardEl = document.getElementById('search-card');
var cityNameEL = document.getElementById('city-name');

// auto complete for state input element 
$(function () {
    var stateNames = [
        'AL',
        'AK',
        'AZ',
        'AR',
        'CA',
        'CO',
        'CT',
        'DE',
        'FL',
        'GA',
        'HI',
        'ID',
        'IL',
        'IN',
        'IA',
        'KS',
        'KY',
        'LA',
        'ME',
        'MD',
        'MA',
        'MI',
        'MN',
        'MS',
        'MO',
        'MT',
        'NE',
        'NV',
        'NH',
        'NJ',
        'NM',
        'NY',
        'NC',
        'ND',
        'OH',
        'OK',
        'OR',
        'PA',
        'RI',
        'SC',
        'SD',
        'TN',
        "TX",
        'UT',
        'VT',
        'VA',
        'WA',
        'WV',
        'WI',
        'WY'
    ];
    $("#state-input").autocomplete({
        source: stateNames,
    });
});

function runSearch(url,cityState) {
    // fetch weather information  
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const { lat, lon } = data[0];
            //return lat and long variables for use in the weather API
            var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
            // fetch weather data 
            fetch(weatherApi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    //set and declare weather data variables
                    var list = data.list;
                    var index = 1;
                    //set date and variables for "todays" weather
                    var today = dayjs().format('MM/DD/YYYY');
                    var listItem0 = list[0];
                    // set and declare weather data variables 
                    var main0 = listItem0.main;
                    var wind0 = listItem0.wind;
                    var weather0 = listItem0.weather;
                        var dateText0 = today;
                        $("#tomorrow0" + " li:first-child").text("Date: " + dateText0);
                        var tempText = main0.temp;
                        $("#tomorrow0" + " li:nth-child(2)").text("Temp: " + tempText);
                        var windText = wind0.speed;
                        $("#tomorrow0" + " li:nth-child(3)").text("Wind: " + windText);
                        var humText = main0.humidity;
                        $("#tomorrow0" + " li:nth-child(4)").text("Humidity: " + humText);
                        var icon = weather0[0].icon;
                        $("#tomorrow0" + " img").attr("src", "https://openweathermap.org/img/wn/" + icon + ".png");
                        $("#tomorrow0" + " img").removeAttr("hidden");

                    // for loop for iterating through the 5 day weather data array - increase iteration by 7 for each pass through to get the next days weather
                    for (var i = 1; i < list.length; i++) {
                        var listItem = list[i];

                        // set and declare weather data variables 
                        var main = listItem.main;
                        var wind = listItem.wind;
                        var weather = listItem.weather;
                        var dateText = dayjs(listItem.dt_txt).format('MM/DD/YYYY');
                        var dateTime = dayjs(listItem.dt_txt).format('HH');
                        var dateTimeMinusThree = dayjs(listItem0.dt_txt).subtract(3, 'hour').format('HH');
                            // if(dateTimeMinusThree < 0) {
                            //     dateTimeMinusThree = 21
                            // } else {
                            //     dateTimeMinusThree = dayjs(listItem0.dt_txt).subtract(3, 'hour').format('HH');
                            // }
                        var tomorrow = dayjs(today).add(1, 'day').format('MM/DD/YYYY');
                        var todayPlusFive = dayjs(today).add(6, 'day').format('MM/DD/YYYY');
                        if (dateText >= tomorrow && dateText < todayPlusFive && dateTime == 12) {

                        // create dom elements and assign weather data 
                        var elementId = "#tomorrow" + index;

                        var dateText = dayjs(listItem.dt_txt).format('MM/DD/YYYY');
                        $(elementId + " li:first-child").text("Date: " + dateText);

                        var tempText = main.temp;
                        $(elementId + " li:nth-child(2)").text("Temp: " + tempText);

                        var windText = wind.speed;
                        $(elementId + " li:nth-child(3)").text("Wind: " + windText);

                        var humText = main.humidity;
                        $(elementId + " li:nth-child(4)").text("Humidity: " + humText);

                        var icon = weather[0].icon;

                        $(elementId + " img").attr("src", "https://openweathermap.org/img/wn/" + icon + ".png");
                        $(elementId + " img").removeAttr("hidden");
                        
                        index++;
                        }
                    }

                    cityNameEL.textContent = cityState;
                })
        })
}

//   event listener for page load to add in the search history to the search buttons
window.addEventListener("load", function (event) {
    // pull search history from local storage 
    var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
    //button creation variable
    buttonCreate = "button";
    var si = 0;
    // for loop for iterating through the array variables in session storage and creating the buttons in the search area
    for (let si = 0; si < searchHistory.length; si++) {
        var buttonEl = document.createElement(buttonCreate);
        buttonEl.textContent = searchHistory[si],
            buttonEl.setAttribute("class", "btn btn-secondary w-100 m-2 p-3 s-3");
        buttonEl.setAttribute("type", "button");
        searchCardEl.appendChild(buttonEl);
    
    }

});

// event listener for the city and state search input boxes 
searchButtonEl.addEventListener("click", function () {
    //pull in values from the search input boxes
    var city = $("#city-input").val();
    var state = $("#state-input").val();
    var cityState = city+","+state;
    var searchHistory = [];
    //capitalize city and state inputs - for display and local storate
    city = city.toLowerCase().replace(/(^|\s)\S/g, function (letter) {
        return letter.toUpperCase();
    });
    state = state.toUpperCase();
    //declare search history array heck if values already exist in local storage
    var history = JSON.parse(localStorage.getItem("history")) || [];
    //append City and State to history array and store in local storage
    history.push(city + "," + state);
    localStorage.setItem("history", JSON.stringify(history));
    var geoCodeAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityState + ",usa&limit=1&appid=" + apiKey;
    runSearch(geoCodeAPI,cityState);
    searchHistory = JSON.parse(localStorage.getItem("history")) || [];
    buttonCreate = "button";
    var si = 0;
    // for loop for iterating through the array variables in session storage and creating the buttons in the search area
    for (let si = 0; si < searchHistory.length; si++) {
        var buttonEl = document.createElement(buttonCreate);
        buttonEl.textContent = searchHistory[si],
            buttonEl.setAttribute("class", "btn btn-secondary w-100 m-2 p-3 s-3");
        buttonEl.setAttribute("type", "button");
        searchCardEl.appendChild(buttonEl);
    
    }
});
// event listener for  the secondary search history buttons in the search area 
$(document).on("click", ".btn-secondary", function (event) {
    event.preventDefault();
    //captures the name of each card to use in geocode api
    var cityState = $(this).text();
    // set the geocode API to pull lat and long 
    var geoCodeAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityState + ",usa&limit=1&appid=" + apiKey;
    runSearch(geoCodeAPI,cityState); // will send cityState variable to Function
});