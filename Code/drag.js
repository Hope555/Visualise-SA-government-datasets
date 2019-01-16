// set in filename click
/* allow the item to be dragged */
function startdrag() {

    var draglist = document.getElementById("dataset").childNodes;

    draglist[0].draggable = "true";
    draglist[0].ondragstart = function (ev) {
        ev.dataTransfer.setData("text", ev.target.title);
    }
    
} 

// set in dataset tag
/* allow the place receive dragged item */ 
function startdrop() {
    document.getElementById("dataset").ondragover = function (ev) {
        ev.preventDefault();
    }

    // change datasets/overlays order
    document.getElementById("dataset").ondrop = function (ev) {
        var name = ev.dataTransfer.getData("text");
		//console.log(name);
        var list = document.getElementById("dataset").childNodes;
        var place = ev.clientY;
        var dragged;
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].title == name) {
                dragged = list[i];
            }
        }

        if (place < list[0].getBoundingClientRect().y + 5) {
            $("#dataset").prepend(dragged);
        }else {
            for (i = 0; i < list.length; i++) {
                if (place > list[i].getBoundingClientRect().y + 5) {
                    list[i].after(dragged);
                }
            }
        }
		list = document.getElementById("dataset").childNodes;
        for (i = 0; i < list.length; i++) {
            //console.log(list[i].title);
            temp = findUse(list[i].title)
			map_buffer[list[i].title].setStyle({
                icon: customizePoint(temp),
                strokeWeight: 1,
                strokeColor: legend_buffer[list[i].title],
                fillColor: legend_buffer[list[i].title],
                zIndex: list.length - i - 1,
            });
        }
    };
    
}