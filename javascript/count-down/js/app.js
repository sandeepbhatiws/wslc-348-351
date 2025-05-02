
function clock(){
    var date = '14 January 2025 03:00 PM';
    document.getElementById('end-date').innerText = date;
    var current_date = new Date();
    var date = new Date(date);

    var difference = (date - current_date) /1000;

    if(difference > 0){
        var days =  Math.floor(difference/3600 / 24);
        var hours =  Math.floor((difference/3600) % 24);
        var minutes = Math.floor((difference/60) % 60);
        var seconds = Math.floor(difference % 60);

        // console.log(days);
        
        document.getElementById('days').value = days;
        document.getElementById('hours').value = hours;
        document.getElementById('minutes').value = minutes;
        document.getElementById('seconds').value = seconds;
    }

    
    // 1 day = 24 hours
    // 1 Hours = 60 minutes
    // 60 minutes = 60 *60 = 3600
}

clock();

setInterval(clock, 1000);
