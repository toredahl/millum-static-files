
// tinycarousel script, may move into its own file later, but this will mean an extra server request, so maybe not. Do not forget the copyright notice.
/*********************************************
  tinycarousel: 
  Copyright 2013 Maarten Baijs
  http://www.baijs.com
*********************************************/

(function(a){a.tiny=a.tiny||{};a.tiny.carousel={options:{start:1,display:1,axis:"x",controls:true,pager:false,interval:false,intervaltime:3000,rewind:false,animation:true,duration:1000,callback:null}};a.fn.tinycarousel_start=function(){a(this).data("tcl").start()};a.fn.tinycarousel_stop=function(){a(this).data("tcl").stop()};a.fn.tinycarousel_move=function(c){a(this).data("tcl").move(c-1,true)};function b(q,e){var i=this,h=a(".viewport:first",q),g=a(".overview:first",q),k=g.children(),f=a(".next:first",q),d=a(".prev:first",q),l=a(".pager:first",q),w=0,u=0,p=0,j=undefined,o=false,n=true,s=e.axis==="x";function m(){if(e.controls){d.toggleClass("disable",p<=0);f.toggleClass("disable",!(p+1<u))}if(e.pager){var x=a(".pagenum",l);x.removeClass("active");a(x[p]).addClass("active")}}function v(x){if(a(this).hasClass("pagenum")){i.move(parseInt(this.rel,10),true)}return false}function t(){if(e.interval&&!o){clearTimeout(j);j=setTimeout(function(){p=p+1===u?-1:p;n=p+1===u?false:p===0?true:n;i.move(n?1:-1)},e.intervaltime)}}function r(){if(e.controls&&d.length>0&&f.length>0){d.click(function(){i.move(-1);return false});f.click(function(){i.move(1);return false})}if(e.interval){q.hover(i.stop,i.start)}if(e.pager&&l.length>0){a("a",l).click(v)}}this.stop=function(){clearTimeout(j);o=true};this.start=function(){o=false;t()};this.move=function(y,z){p=z?y:p+=y;if(p>-1&&p<u){var x={};x[s?"left":"top"]=-(p*(w*e.display));g.animate(x,{queue:false,duration:e.animation?e.duration:0,complete:function(){if(typeof e.callback==="function"){e.callback.call(this,k[p],p)}}});m();t()}};function c(){w=s?a(k[0]).outerWidth(true):a(k[0]).outerHeight(true);var x=Math.ceil(((s?h.outerWidth():h.outerHeight())/(w*e.display))-1);u=Math.max(1,Math.ceil(k.length/e.display)-x);p=Math.min(u,Math.max(1,e.start))-2;g.css(s?"width":"height",(w*k.length));i.move(1);r();return i}return c()}a.fn.tinycarousel=function(d){var c=a.extend({},a.tiny.carousel.options,d);this.each(function(){a(this).data("tcl",new b(a(this),c))});return this}}(jQuery));

//= responsive design, built with foundation: wordpress use required+ foundation:  http://themes.required.ch/  Recommend using a child theme of this theme for wordpress implementation.
// documentation for foundation can be found here: http://foundation.zurb.com/docs/


// createOverlay: this creates a askewed overlay, as shown on the design sketches. 
function createOverlay() {

  var anglefactor = 9;
  var cHeight = $(".overlay-container").height();
  var cWidth = $(".overlay-container").width();
  var halfWidth = cWidth/1.6;  // initialize to half the container width with factor 2... less than that will yield a larger overlay, more a smaller. 
  var lesserHalf = halfWidth - (halfWidth/anglefactor); // this is the cutoff for the lower part of the quadrant, and the size of the divisor decides the angle. i.e factor 8 will yield a straighter line than 6.
  var greaterHalf = halfWidth + (halfWidth/anglefactor);
  var canvas = document.getElementById('overlay');
  var ctx = canvas.getContext('2d');
  //console.log('-- cH :' + cHeight + '-- hW :' +  halfWidth + '  -- lH: ' + lesserHalf + ' -- gH: ' + greaterHalf);

  //The lineTo() method adds a new point and creates a line from that point to the last specified point in the canvas 
  ctx.fillStyle = '#fff'; // White at present version
  ctx.beginPath();
  ctx.moveTo(0,0); // start at upper left corner, pt 1
  //ctx.lineTo(0,0); // we may not need a line to it, we're already there
  ctx.lineTo(0, cHeight);  //pt 2, at coords 0,300 in this case. So we draw FROM that point, back to the previous one, i.e from pt 2 to pt 1, the upper left corner
  ctx.lineTo(lesserHalf, cHeight); // and so on again, find a new point, pt 3, draw back to the previous one, which now is pt2
  ctx.lineTo(greaterHalf,0); //the third corner of the polygon, pt 4, a little over halfway across the container, at the top
  ctx.lineTo(0, 0);  // from there, that is pt 4, and back to the first corner, to close up the polygon
  ctx.closePath();  // the actual closing
  ctx.fill();  // and then we fill it with the fill color
}


function startTinySlideshows(startslider) {  

  for(var i=0; i< 10;i++) // at present there are 7 on the front page... these may slow the browser down, if allowed to run free....
  {

      var $slider = $("#slider"+i);
      // check if the element exists, and if so, calculate a random interval, with a minimum time
      if ($slider.length>0) 
      {
        var interval = Math.floor((Math.random()*600)+1)*10+2000;
        var duration = 5000; 
        if(startslider){
          $slider.tinycarousel({interval: true,  axis: 'y', intervaltime: interval, duration: duration, pager:false});      
        }else {
          $slider.stop(); // this does not quite work as well as desired.
        }
    }
  }
}  


//.tinycarousel({interval: true,  axis: 'y', intervaltime: 2000, duration: 1000, pager:true});      
// we use Ajax complete, because we are loading the footer and header element on every page. Redo this in wordpress as desired. 
$( document ).ajaxComplete(function() {
  var frontPage = $(".overlay-container").length > 0;
  if ( frontPage) {
    createOverlay();
  }
  
  
//$(document).ready(function(){ 
   
  var mouse_is_inside = false;
  $('.menu-20').removeClass("menu-selected");
  
  
  $('#expand-menu-button').on('click', function(){
      $('#mobile-expand-menu').toggle();
  }); 
  
  $("#template-changer li").on('click mouseover', function() {
    
    var current = $(this).children("span").html();
    var currentId = $(this).children("div").attr("id");
    console.log("now what : " + currentId);
    $(".selected-item").removeClass("selected-item");
    $(this).toggleClass("selected-item");

    if (currentId == "about") {
      // here we want to show the narrow menu
      $("#floating-menu-narrow").show();
      $("#floating-menu").hide();
      mouse_is_inside = true;
        
    } else if (currentId == "products") {
      $("#floating-menu").show();
      $("#floating-menu-narrow").hide();
      mouse_is_inside = true;
      $("#floating-menu .menu-20").mouseover(function() {
        $(".blue-color").removeClass("blue-color");
        $(".blue-borders").removeClass("blue-borders");
        
        var currentItemHeader = $(this).find("h3");
        currentItemHeader.addClass("blue-color");

        var currentItemText = $(this).find("div.menu-text");
        currentItemText.addClass("blue-borders");    
      });
      
    } else if (currentId == "customerservice") {
       mouse_is_inside = true;
      $("#floating-menu").hide();
      $("#floating-menu-narrow").hide();
      //no menu at all here 
    }else {
      mouse_is_inside=false;
    }
    
  });
  
  $("#Xtemplate-changer li").on('mouseout', function() {
    mouse_is_inside=false;  
    $('#floating-menu').hide();
    $('#floating-menu-narrow').hide();
    $(".selected-item").removeClass("selected-item");
  });
    
  $("body").mouseup(function(){ 
    if(mouse_is_inside) {
      $('#floating-menu').hide();
      $('#floating-menu-narrow').hide();
          mouse_is_inside=false;
          $(".selected-item").removeClass("selected-item");
      }     
    });
  
  // we start the slider first time, regardless
  var has_focus = true;

  if(has_focus) {
    startTinySlideshows(true);
  }

  // the idea here was to halt the slideshows if nobody was watching, i.e window.onblur, but have not had the time to look into that. Leave it as a Nice to have/TODO option. 
  window.onfocus = function(){  
    has_focus=true;  
    //console.log("Window has the focus...");
    //startTinySlideshows(true);
  }

  // if the user leaves the page, we stop the slider 
  window.onblur = function(){  
    has_focus=false;  
    //console.log("Window do not have focus...");
  }

  $(".movehorizontal").on("swipe", function(){
      alert("you did it");
  });


});