
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
        getPicture();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

    }
};

app.initialize();

// Geographical location section
var Latitude = undefined;
var Longitude = undefined;
var TimeStamp = undefined;

var geolocationSuccesss = function(position) {
    console.log("onLocSuccess called");
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    TimeStamp = position.timestamp;

    var element = document.getElementById("geoLocationInfo");
    element.innerHTML = 
        "<dt>Latitude </dt><dd> " + Latitude + "</dd>" + 
        "<dt>Longitude </dt><dd> " + Longitude + "</dd>" +
        "<dt>Time </dt><dd> " + TimeStamp + "</dd>";
}

var geolocationError = function (error) {
    console.log("code: " + error.code + '\n' + "message: " + error.message + '\n');
}

function getLocation() {
    console.log("getLocation called");
    navigator.geolocation.getCurrentPosition(geolocationSuccesss, geolocationError, { enableHighAccuracy: true });
}

// Camera section

var cameraSuccess = function(imageURI) {
    var image = document.getElementById("smallImage");
    image.style.display="block";
    image.src = imageURI;
}

var cameraError = function(message) {
    alert("failed because: " + message);
}

/*
var cameraOptions = function(srcType) {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options; 
}
*/

function getPicture() {
    console.log("getPicture called");
    var srcType = Camera.PictureSourceType.CAMERA;
    navigator.camera.getPicture( cameraSuccess, cameraError, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
}