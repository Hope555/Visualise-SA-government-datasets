function init_menu() {
    $("#menu").css("cursor", "default");
}

/*
    switch display mode
*/
function view_switch() {
    if ($("#view_button").html() == "Simple"){
        $("#files").css({
            "display":"none"
        })
        $("#map").css({
            "width": window.innerWidth - 250 + "px",
            "left": "0px",
        })
		document.getElementById("view_button").innerHTML = "Advanced";
    } else if ($("#view_button").html() =="Advanced"){
        $("#files").css({
            "display": "block"
        })
        $("#map").css({
            "width": window.innerWidth - 500 + "px",
            "left": "250px",
        })
		document.getElementById("view_button").innerHTML = "Simple"
	}
}

/*
    open hele/about dialogue
*/
function open_about() {
    about = "SA DATASET VISUALISATION APP\nversion " + version +"\n©TEAM 25\n";
    about += "\n";
    about += "* all available datasets are in the datasets list\n";
    about += "* you can select up to 10 datasets\n";
    about += "* you can move the mouse to the map and see more information\n";
	about += "* you can drag selected datasets to change their order\n"
    alert(about);
}

