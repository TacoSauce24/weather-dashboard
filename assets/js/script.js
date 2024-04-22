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