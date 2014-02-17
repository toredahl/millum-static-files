
// tinycarousel, move into its own file later.
(function(a){a.tiny=a.tiny||{};a.tiny.carousel={options:{start:1,display:1,axis:"x",controls:true,pager:false,interval:false,intervaltime:3000,rewind:false,animation:true,duration:1000,callback:null}};a.fn.tinycarousel_start=function(){a(this).data("tcl").start()};a.fn.tinycarousel_stop=function(){a(this).data("tcl").stop()};a.fn.tinycarousel_move=function(c){a(this).data("tcl").move(c-1,true)};function b(q,e){var i=this,h=a(".viewport:first",q),g=a(".overview:first",q),k=g.children(),f=a(".next:first",q),d=a(".prev:first",q),l=a(".pager:first",q),w=0,u=0,p=0,j=undefined,o=false,n=true,s=e.axis==="x";function m(){if(e.controls){d.toggleClass("disable",p<=0);f.toggleClass("disable",!(p+1<u))}if(e.pager){var x=a(".pagenum",l);x.removeClass("active");a(x[p]).addClass("active")}}function v(x){if(a(this).hasClass("pagenum")){i.move(parseInt(this.rel,10),true)}return false}function t(){if(e.interval&&!o){clearTimeout(j);j=setTimeout(function(){p=p+1===u?-1:p;n=p+1===u?false:p===0?true:n;i.move(n?1:-1)},e.intervaltime)}}function r(){if(e.controls&&d.length>0&&f.length>0){d.click(function(){i.move(-1);return false});f.click(function(){i.move(1);return false})}if(e.interval){q.hover(i.stop,i.start)}if(e.pager&&l.length>0){a("a",l).click(v)}}this.stop=function(){clearTimeout(j);o=true};this.start=function(){o=false;t()};this.move=function(y,z){p=z?y:p+=y;if(p>-1&&p<u){var x={};x[s?"left":"top"]=-(p*(w*e.display));g.animate(x,{queue:false,duration:e.animation?e.duration:0,complete:function(){if(typeof e.callback==="function"){e.callback.call(this,k[p],p)}}});m();t()}};function c(){w=s?a(k[0]).outerWidth(true):a(k[0]).outerHeight(true);var x=Math.ceil(((s?h.outerWidth():h.outerHeight())/(w*e.display))-1);u=Math.max(1,Math.ceil(k.length/e.display)-x);p=Math.min(u,Math.max(1,e.start))-2;g.css(s?"width":"height",(w*k.length));i.move(1);r();return i}return c()}a.fn.tinycarousel=function(d){var c=a.extend({},a.tiny.carousel.options,d);this.each(function(){a(this).data("tcl",new b(a(this),c))});return this}}(jQuery));


// foundation needs to be included. 
/*$(document).foundation({
  orbit: {
    bullets: false
  }
});*/

//= require foundation
//$(document).foundation();

$(document).ready(function(){
   
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
  
  // customise these better later...with random intervals and dynamic counting
  $('#slider2').tinycarousel({interval: true,  axis: 'y', intervaltime: 6000, duration: 1000, pager:false});
  $('#slider3').tinycarousel({interval: true,  axis: 'y', intervaltime: 3800, duration: 1400});
  $('#slider4').tinycarousel({interval: true,  axis: 'y', intervaltime: 4400, duration: 800});
  $('#slider5').tinycarousel({interval: true,  axis: 'y', intervaltime: 7400, duration: 1200});
  $('#slider6').tinycarousel({interval: true,  axis: 'y', intervaltime: 2900, duration: 1800});
  $('#slider1').tinycarousel({interval: true,  axis: 'y', intervaltime: 3000, duration: 800, pager:false});

//$(document).foundation('orbit', 'reflow');
  

});