window.onload = adPostedMessage

function adPostedMessage () {
  document.getElementById("adPosted").innerHTML = "Stimate utilizator, anunţul " + '<span id="newPostedAd"><a href="' + objJson[0].url + '">' + objJson[0].adName + '</a></span>' + " a fost postat cu succes!";
}
