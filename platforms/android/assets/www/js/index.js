
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        console.log("deviceready event called");
        navigator.notification.alert("deviceready event called");
        this.receivedEvent('deviceready');
        getLocation();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        var element = document.getElementById("dlLocationInfo");
        element.innerHTML = 
            "<dt>Latitude:</dt><dd> " + Latitude + "</dd>" + 
            "<dt>Longitude:</dt><dd> " + Longitude + "</dd>";

    }
};

app.initialize();

// Geographical locaiton section
var Latitude = undefined;
var Longitude = undefined;

function getLocation() {
    console.log("getLocation called");
    navigator.geolocation.getCurrentPosition(onLocSuccesss, onLocError, { enableHighAccuracy: true });
}

var onLocSuccesss = function (position) {
    console.log("onLocSuccess called");
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
}

var onLocError = function (error) {
    console.log("code: " + error.code + '\n' + "message: " + error.message + '\n');
}
// Camera section
function getPicture() {
    console.log("getPicture called");
    navigator.camera.getPicture( cameraSuccess, cameraError, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
}

function cameraSuccess(imageData) {
    var image = document.getElementById("smallImage");
    image.style.display="block";
    image.src = "data:image/jpeg;base64," + imageData;
}

function cameraError(message) {
    alert("failed because: " + message);
}