
$(document).ready(
    function ($) {
        $.ajax(
            {
                url: 'http://api.open-notify.org/iss-now.json',
                method: "GET",
            }
        )
    }
)

let latitude = 0;
let longitude = 0;

let map = L.map('map').setView([latitude, longitude], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: '© OpenStreetMap'
}).addTo(map);



function satellite(){

    let dataARecuperer;
    $.ajax(
        {
            url: 'http://api.open-notify.org/iss-now.json',
            method: "GET",
            data: dataARecuperer
        })
        .done(function(data){
            latitude = data.iss_position.latitude;
            longitude = data.iss_position.longitude;
            document.getElementById('latitude').innerHTML=latitude;
            $('#latitude').html(latitude);
            $('#longitude').html(longitude);
            let circle = L.circle([latitude, longitude], {
                color: 'orange',
                fillColor: '#ffae00',
                fillOpacity: 0.8,
                radius: 8000
            }).addTo(map);

            circle.bindPopup("<b>ISS !</b><br>Voici ma position : <br> Latitude : " + latitude + "<br> Longitude : " + longitude).openPopup();

        })
        .fail(function (xhr, status, errorThrown){
            erreurAjax(xhr, status, errorThrown);
            alert('un problème est survenu, retentez votre chance')
        })
}

satellite()
setInterval(()=>{satellite()},1000)
