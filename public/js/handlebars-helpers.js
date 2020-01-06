var User = require("../../models").Users;

module.exports = {
    getTime: function(date) {
        if(!isToday(date)) {
            if(isYesterday(date)) return "Yesterday";

            return getDate(date);
        } 

        return getTime(date);
        
    }, 

    getJSONAsString: function(json) {
        return JSON.stringify(json);
    }
}

function isToday(date) {
    var today = new Date();

    return date.getFullYear() == today.getFullYear()
        && date.getMonth() == today.getMonth()
        && date.getDate() == today.getDate();
    
}

function isYesterday(date) {
    var today = new Date();

    return date.getFullYear() == today.getFullYear() 
        && date.getMonth == today.getMonth() 
        && date.getDate == today.getDate() - 1
}

function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var nightOrDay;

    if(hours > 11) {
        if(hours != 12) {
            hours = hours % 12;
        }

        nightOrDay = "p.m.";
    } else {
        nightOrDay = "a.m."
    }

    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    const time = hours + ":" + minutes + " " + nightOrDay;

    return time;
}

function getDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return month + "/" + day + "/" + year;
}