
var extension = ".html";
var current_slide = 1;
var title_trail = "Steve's web dev presentation"

// for use by slides as they load.
var transition_in = function(){}
var transition_out = function(){}

function get_slide_url(number){
    return "./" + number + extension
}

function load_slide(number, replace_history){
    slide_url = get_slide_url(number);

    // run current slide's transition
    if(transition_out)
	transition_out();

    // init HTTP request
    var xmlhttp;
    if (window.XMLHttpRequest) {
	xmlhttp=new XMLHttpRequest(); // ie7, all others
    }else {
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); // stupid IEs.
    }

    // Handle the result when it happens
    xmlhttp.onreadystatechange=function(){
	if (xmlhttp.readyState==4 && xmlhttp.status==0){
	    document.getElementById("content").innerHTML = xmlhttp.responseText;
	    current_slide = number;
	    //parent.location.hash = current_slide

	    // handle history loading.
	    if(replace_history)
		history.replaceState({slide: current_slide},"Slide " + current_slide, "#" + current_slide); 
	    else
		history.pushState({slide: current_slide},"Slide " + current_slide, "#" + current_slide); 
		
	    // handle titlebar additions.
	    if(document.getElementsByTagName("h1").length > 0){
		if(document.getElementsByTagName("h2").length > 0)
		    document.title = document.getElementsByTagName("h1")[0].innerHTML + ": " + document.getElementsByTagName("h2")[0].innerHTML + " --- " + title_trail;
		else
		    document.title = document.getElementsByTagName("h1")[0].innerHTML + " --- " + title_trail;
	    }
	    // transition out.
	    if(transition_in)
		transition_in();

	}
    } 

    // Make request
    xmlhttp.open("GET", slide_url, true);
    xmlhttp.send();
}

function maintain_vertical_size(){
    //alert("Resiaze.");
    document.getElementById("content").style.height = window.innerHeight + "px";
}

function init(){
    slide = parent.location.hash;
    if(slide){
	re = /([0-9]+)/
	slide_id = parseInt(re.exec(slide));
	load_slide(slide_id);
    }else
	load_slide(1, true);
    

    maintain_vertical_size();
}

function click_controller(ev){
    //alert("Clicked: " + ev.relatedTarget);
    if(ev.button == 0)
	load_slide(current_slide + 1);
    else if(ev.button == 2 && current_slide > 1)
	load_slide(current_slide - 1);

    
    return false;
}

function resume_from_history(ev){
    window.history.go(-1);
    if(ev.state.slide)
	load_slide(ev.state.slide)
    return true;
}

// Maintain hooks on useful events.
window.onload		= init;
window.onresize		= maintain_vertical_size;
window.onmousedown	= function(){return false;}
window.oncontextmenu	= function(){return false;}
window.onclick		= click_controller;
window.onpopstate       = resume_from_history;
