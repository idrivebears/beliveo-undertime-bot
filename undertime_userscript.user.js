//author: Alex Walls

// ==UserScript==
// @name        believe in undertime
// @description beliveo undertime bot
// @match     https://www.beliveo.net/beliveo/extranet/my-work/activities/ut-se-scheduler/*
// @match     https://www.beliveo.net/*
// @match     http://www.beliveo.net/*
// @match     http://www.beliveo.com/*
// ==/UserScript==

var divInjection = document.getElementById('undertime-schedule-container');

if(divInjection != null) {
    //insert control buttons
    divInjection.innerHTML += '<input type="button" id="ut_bot_start" value="start escriptin" class="schedule_slots_button">';
    divInjection.innerHTML += '<input type="button" id="ut_bot_stop" value="stop escriptin" class="schedule_slots_button">';
    //setting click listeners
    document.getElementById('ut_bot_start').addEventListener("click", startScripting, false);
    document.getElementById('ut_bot_stop').addEventListener("click", stopScripting, false);
}

var INTERVALTIME = 5000; //refreshes every 5 seconds
var timeoutID;
// if cookie isbotactive is true, keep refreshing, if not stay cool

if(getCookieValue("isbotactive")) {
   timeoutID = setTimeout(checkUndertime, INTERVALTIME);
}
else {
   clearTimeout(timeoutID);
}

function getCookieValue(cookieName) {
    cookieName += "=";

    var cookieArray = document.cookie.split(';');
    console.log(document.cookie);
    console.log(cookieArray);

    for(var i = 0; i < cookieArray.length; i++) {
        cookie = cookieArray[i];
        while(cookie.charAt(0) == ' ') {
            if(cookie.indexOf(cookieName) == 0) {
                if(cookie.substring(name.length, cookie.length) == "true") {
                    return true;
                }
            }
        }
    }

    return false;
}

function startScripting() {
    //create cookie
    document.cookie = "isbotactive=true";
    //refresh page
    window.location.reload();
    console.log("Scripting started.");
}

function stopScripting() {
    //set cookie to false
    document.cookie = "isbotactive=false";
    //refresh page
    window.location.reload();
    console.log("Scripting stopped.");
}

function checkUndertime() {
    var submitButtonId = "schedule_slots";

    var underTimeClassName = ".agents_not_avail_se .schedule-agent .ut_avail .agents_avail_ut"; //dots needed for selector search
    var underTimeSelected  = "agents_not_avail_se schedule-agent ut_avail agents_avail_ut slot_selected";

    var underTimeItems = document.querySelectorAll(underTimeClassName);

    if(underTimeItems !== 0) {
        for(var i = 0; i < underTimeItems.length; i++) {
            //change class to underTimeSelected
            underTimeItems[i].className = underTimeSelected;
            console.log("Undertime found and taken.");
        }

        //activate schedule button
        console.log("Undertime scheduled.");
        document.getElementById(submitButtonId).click(); //submitting the schedule
    }
    else{
        console.log("No undertime found.");
    }

    //refresh the site
    window.location.reload();

}
