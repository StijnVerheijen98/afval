document.addEventListener('DOMContentLoaded', () => {

    // Openingstijden van de server ophalen
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://www.dennisvanriet.nl/gemeentebalkendam/index.php?data=openingstijden", true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const tijden = JSON.parse(this.responseText);

            Object.keys(tijden.openingstijden).forEach(function(key){
                document.getElementById("openingstijden").innerHTML += "<p>" + key + ' : ' + tijden.openingstijden[key] + "</p>";
            });
        }
    };

    // Postcode Search bar Function
    document.getElementById("search").addEventListener('keyup',loadResults);
    function loadResults() {
        document.getElementById("results").innerHTML = "<img src='img/ajax-loader.gif'>";

        const xhttp = new XMLHttpRequest();
        const str = document.getElementById("search").value;

        xhttp.open("GET", "http://www.dennisvanriet.nl/gemeentebalkendam/index.php?data=afvalkalender&postcode="+str, true);
        xhttp.send();

        xhttp.onreadystatechange = function() {
            if (str === "") {
                document.getElementById("results").innerHTML = "";
                return;
            }

            if (this.readyState === 4 && this.status === 200) {
                if(this.responseText === '{"verwerk":}'){
                    document.getElementById("results").innerHTML = "Geen gegevens";
                } else {
                    document.getElementById("results").innerHTML = JSON.parse(this.responseText).verwerk;
                }
            }
        };
    }
});