window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let conditionIcon = document.querySelector('.icon');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "http://cors-anywhere.herokuapp.com/";
            const api = `http://api.weatherapi.com/v1/forecast.json?key=88ac78c11043448890d165322201308&q=${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })

            .then(data => {
                console.log(data);
                const { temp_f, temp_c,condition} = data.current;
                temperatureDegree.textContent = `${temp_f} F`;
                temperatureDegree.addEventListener("click", ()=>{
                    temperatureDegree.textContent = `${temp_c} C`;
                })
                temperatureDescription.textContent = condition.text;
                locationTimezone.textContent = data.location.tz_id;
                // Set Icons
                conditionIcon.src = `http:${condition.icon}`;
            })
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        const currentIcon = icon;
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});