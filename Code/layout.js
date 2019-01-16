/*
	setup window 
	
	mainWindow	--	menu
					map
					data
					infobox
					file

*/
function init_window_default() {
    var h = window.innerHeight;
    var w = window.innerWidth;
    var m = (window.innerWidth - w) / 2;

    /* top layer */
    $("#mainWindow").css({
        "position":"absolute",
        "height": h + "px",
        "width": w + "px",
        "margin-left": "0px",
        "top": "0px",
        "left": "0px",
        "border": "",
        "font-size":"14px"
    });

    /* menu */
    $("#menu").css({
        "position": "absolute",
        "background-color": "black",
        "color": "white",
        "height": "40px",
        "width": "100%",
        "z-index": 5,
    });

    document.getElementById("viewmenu").style.left = 0 + "px";
    document.getElementById("helpmenu").style.left = 200 + "px";
    document.getElementById("resetmenu").style.left = 100 + "px";


    $(".horizontalList").css({
        "position": "absolute",
        "height": "40px",
        "width": "100px",
        "line-height": "40px",
        "text-align": "center"

    });
    $(".horizontalList").hover(function () {
        $(this).css("background-color", "gray");
    }, function () {
        $(this).css("background-color", "transparent");
    });

    /* map */
    $("#map").css({
        "position": "absolute",
        "top": "40px",
        "left": "250px",
        "height": (h - 40) + "px",
        "width": (w - 500) + "px",
        "z-index": "2",
        "outline": "1px solid black",
        "outline-offset": "-1px"
    });
    /* info-box */
    $("#info-box").css({
        "position": "absolute",
        "bottom": 0 + "px",
        "right":"0px",
        "height": h-40 + "px",
        "width": "250px",
        "background-color": "white",
        "overflow-y": "scroll",
        "z-index": 3,
        "outline": "1px solid black",
        "outline-offset": "-1px"
    });
	
	$("#infoTable").css({
		"table-layout":"fixed",
		"width":"230px",
		"word-wrap": "break-word",
    });
	
	$("table, td").css({
		"border": "1px solid black",
    });

    /* dataset window */
    $("#files").css({
        "position": "absolute",
        "display": "block",
        "top": "40px",
        "left": "0px",
        "height": h-40 + "px",
        "width": "250px",
        "background-color": "white",
        "z-index": 3,
        "outline": "1px solid black",
        "outline-offset": "-1px"
    });

    /* data filter */
    $("#filterBar").css({
        "position": "absolute",
        "height": "20px",
        "left": "1%",
        "top": "0.5%",
        "width": "95%",
        "outline": "1px solid black",
        "outline-offset": "1px"
    });  
    /* extension filter */
    $("#extRadio").css({
        "position": "absolute",
        "left": "1px",
        "top": "35px",
        "height": "20px",
        "width": "100%",

    }); 
    /* reload data list button */
    $("#file_refresh").css({
        "height": "25px",
        "top": "1px",
        "margin-left": "2px",
        "width": "25px",
        "outline": "1px solid black",
        "outline-offset": "1px",
        "background": "url('https://image.flaticon.com/icons/svg/565/565276.svg')",
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-position": "center center",
        "float": "left"
    });
    /* extension filter radio */
    $(".extElement").css({
        "margin-top":"2px",
        "margin-left": "5px",
        "float": "left",
        "white-space": "nowrap"
    });
    $(".extElement").hover(function () {
        $(this).css("color", "red");
    }, function () {
        $(this).css("color", "black");
        });

	/* data tag */
	$("#file_tag").css({
        "position": "absolute",
        "left": "0px",
        "top": "60px",
        "margin-top": "6px",
		"margin-left":"2px",
        "padding-left": "2px",
        "width": "228px",
        "background-color": "white",
		"z-index":5,
        "border-bottom": "1px solid black",
        "outline-offset": "-1px"
	});
    /* datastore list */
    $("#files_list").css({
        "position": "absolute",
        "left": "0px",
        "top": "60px",
        "margin-top": "5px",
        "padding-left": "2px",
        "padding-top": "20px",
        "height": (h-40)*0.6 - 20 + "px",
        "overflow-y": "scroll",
        "width": "248px",
        "background-color": "white",

        "outline": "1px solid black",
        "outline-offset": "-1px"
    }); 
    
    /* selected datesets */
    $("#data_tag").css({
        "position": "absolute",
        "left": "0px",
        "top": (h-40)*0.6+65 + "px",
        "margin-top": "px",
		"margin-left":"2px",
        "padding-left": "2px",
        "width": "227px",
        "background-color": "white",
		"z-index":5,
        "border-bottom": "1px solid black",
        "outline-offset": "-1px"
	})
    $("#dataset").css({
        "position": "absolute",
        "display": "block",
        "top": (h-40)*0.6+65 + "px",
        "left": "1px",
        "height": (h-40)-((h - 40) * 0.6+85) + "px",
        "width": "248px",
        "padding-top":"20px",
        "background-color": "white",
        "z-index": 3,
        "overflow-y": "scroll",
        "outline": "1px solid black",
        "outline-offset": "-1px"
    });
}



