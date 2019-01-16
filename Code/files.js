/* load settings about file */
function init_files() {
    document.getElementById("ext1").childNodes[0].checked = true;
    document.getElementById("ext2").childNodes[0].checked = true;
    document.getElementById("ext3").childNodes[0].checked = true;

    // function reload local file list
    $("#file_refresh").unbind("click");
    $("#file_refresh").click(function () {
        local_file = read_store();
        file_listing(local_file);
        document.getElementById("ext1").childNodes[0].checked = true;
        document.getElementById("ext2").childNodes[0].checked = true;
        document.getElementById("ext3").childNodes[0].checked = true;
        document.getElementById("filterBar").value = "";
    });
    startdrop();
}

/* search the datastore */
function filter_function() {
    // pass value in searchbar to local filter function and datasa search function
    var x = document.getElementById("filterBar").value;
    x = x.replace(/\s/g, '');

    var list = $(".file_name");
    var extlist = $(".extElement");
    var i;

    for (i = 0; i < list.length; i++) {
        list[i].style.display = "none";   
    }
    var kml = document.getElementById("ext1").childNodes[0].checked;
    var geojson = document.getElementById("ext2").childNodes[0].checked;
    var meta = document.getElementById("ext3").childNodes[0].checked;

    for (i = 0; i < list.length; i++) {
        
        if ((list[i].title.toLowerCase()).includes(x.toLowerCase()) && list[i].title.includes(".kml") && kml) {
            list[i].style.display = "block";
        } else if ((list[i].title.toLowerCase()).includes(x.toLowerCase()) && list[i].title.includes(".geojson") && geojson){
            list[i].style.display = "block";
        } else if ((list[i].title.toLowerCase()).includes(x.toLowerCase()) && list[i].title.includes(".meta") && meta) {
            list[i].style.display = "block";
        }
    }
}

function data_list_function() {
   $(".data_close").unbind("click");
    // retract the data, close map layer
   $(".data_close").click(function () {
 
       var name = this.parentNode.title;
       var list = $(".file_name");
       var i;

       for (i = 0; i < list.length; i++) {

           if (name.includes(list[i].title)) {
               list[i].childNodes[0].style.background = "url('unchecked_checkbox_icon.bmp')";
           }
       }

       this.parentNode.remove();
       reverseUse(name);
       map_buffer[name].setMap(null);

    });
}

/*
    set file list style
*/
function file_list_style() {
    $(".file_name").css({
        "color": "black",
        "cursor": "pointer",
        "margin-bottom":"5px"
    });
    $(".file_content").css({
        "margin-left": "25px",
        "margin-top": "-20px",
        "width": "180px",
        "word-wrap": "break-word"
    });

   $(".file_status").css({
        "width": "20px",
        "height": "20px",
        
    }); 

   var list = $(".file_status");
   var i;
   for (i = 0; i < list.length; i++) {
       if (!list[i].style.background) {
           list[i].style.background = 'url("unchecked_checkbox_icon.bmp")';
       }
   }
   $(".file_name").unbind("click");

    // file checkbox function
   $(".file_name").click(function () {
        var status = this.childNodes[0].style.background;

        var name = this.title;
        var rname = this.childNodes[2].innerHTML;

        var list = $(".data_list");
        var i;

        // append to selected list 
        if (status.includes("unchecked")) {
            
            to_map_api(name);
            

            if (index == -1) {
                return;
        }

            this.childNodes[0].style.background = "url('checked_checkbox_icon.bmp')";

            var start = "<div class='data_list' title="+name+">";

            var legend_style = "background-color:" + legend_buffer[name] + ";height:10px;width:10px;margin:5px";
            var legend = "<div class='data_check'><div style=" + legend_style + "></div></div>";

            var close_style = "margin:5px;height:10px;width:10px;background:url('https://image.flaticon.com/icons/svg/566/566013.svg');\
                               background-size:cover;background-repeat:no-repeat;background-position:center center";
            var closebutton = "<div class='data_close' style=" + "margin-top:-15px;margin-left:210px" + "><div style=" + close_style + "></div></div>";
			
            var name_style = "margin-top:-20px;margin-left:25px;width:180px;color:black;word-wrap:break-word;cursor:-webkit-grab;cursor:grab;";
            var dataname = "<div style=" + name_style + ">" + rname + "</div>";
         
            var end = "</div>";
            $("#dataset").prepend(start + legend + closebutton + dataname + end);

            $(".data_list").css({
                "color": "black",
  
                "width": "100%",
                "background-color": "white",
                "margin-bottom": "10px"
            });

            startdrag();
            data_list_function();
 
        } else {
            // remove from selected list
            var name = this.title;
            var list = $(".data_list");

            var i;
            for (i = 0; i < list.length; i++) {
                if (name.includes(list[i].title)) {
                    this.childNodes[0].style.background = "url('unchecked_checkbox_icon.bmp')";
                    list[i].remove();
                }
            }
            reverseUse(name);
            map_buffer[name].setMap(null);
        }  
    });
}

// read local file list
function file_listing(arr) {
    var list = [];
    for (var key in arr) {
        list.push(key);
    }
    var clist = $(".file_name");

    var i;
    var j;
    var skip;
    for (i = 0; i < list.length; i++) {
        skip = 0;
        for (j = 0; j < clist.length; j++) {
            if (list[i] == clist[j].title) {
                 skip = 1;
            }
        }
        if (skip == 1) {
            continue;
        }

        var status = "<div class='file_status'></div>";
        var kml_style = "margin-top:-20px;margin-left:210px;height:20px;width:20px;background:url('https://image.flaticon.com/icons/svg/125/125956.svg');\
                               background-size:cover;background-repeat:no-repeat;background-position:center center";
        var json_style = "margin-top:-20px;margin-left:210px;height:20px;width:20px;background:url('https://image.flaticon.com/icons/svg/617/617623.svg');\
                               background-size:cover;background-repeat:no-repeat;background-position:center center";
        

        var kmlbutton = "<div style=" + kml_style + "></div>";
        var jsonbutton = "<div style=" + json_style + "></div>";
        var name_style = "margin-top:-20px;margin-left:25px;width:180px;color:black;word-wrap:break-word";
        var dataname = "<div style=" + name_style + ">" + local_file[list[i]].name + "</div>";

        var end = "</div>";
        if (local_file[list[i]].kml.includes(".kml")) {
            
            var start = "<div class='file_name' title=" + list[i]+".kml" + ">";
            $("#files_list").append(start + status + kmlbutton + dataname + end);
        }
        if (local_file[list[i]].json.includes(".geojson")) {
            var start = "<div class='file_name' title=" + list[i] + ".geojson" + ">";
            $("#files_list").append(start + status + jsonbutton + dataname + end);
        }
    }

    file_list_style();
}








