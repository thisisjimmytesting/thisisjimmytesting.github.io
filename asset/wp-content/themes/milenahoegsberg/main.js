
/*

    Milena Høgsberg
    Design & Development: Leon Klaßen—www.leonklassen.com
    2022

*/


"use strict";




( function () {



// LOAD ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


document.addEventListener( 'DOMContentLoaded', init );


function init() {
    
    // contact
    const contact_element = document.getElementsByClassName( "contact" )[0];
    contact_element.innerHTML = '<a href="mailto:' + contact_element.innerHTML + '@gmail.com">' + contact_element.innerHTML + '@gmail.com</a>';
    
    // init the menu jump
    document.getElementsByClassName( "jump_about" )[0].addEventListener( "click", function() {
    
        // scroll
        scrollToY( document.getElementsByClassName( "about" )[0].getBoundingClientRect().top + window.scrollY - 50 );
        
        // hide the menu
        menuClose();
    
    }, false );
    
    // init the burger menu
    document.getElementsByClassName( "burger" )[0].addEventListener( "click", function() {
        if ( document.getElementsByTagName( "nav" )[0].className.indexOf( "hidden" ) < 0 ) {
            menuClose();
        } else {
            menuOpen();
        }
    }, false );
        
}


function menuOpen() {
    classRemove( document.getElementsByTagName( "nav" )[0], "hidden" );
    classAdd( document.getElementsByClassName( "burger" )[0], "active" );
}

function menuClose() {
    classAdd( document.getElementsByTagName( "nav" )[0], "hidden" );
    classRemove( document.getElementsByClassName( "burger" )[0], "active" );
}



// FILTER —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


document.addEventListener( 'DOMContentLoaded', filterInit );


function filterInit() {
    
    // filter from url
    let filter_from_url = null;
    if( window.location.hash && ( window.location.hash == "#curating" || window.location.hash == "#writing" || window.location.hash == "#conversations" ) ) {
        filter_from_url = window.location.hash;
    }
    
    // actions
    const filter_elements = document.getElementsByClassName( "grid_filter" );
    for ( const filter_element of filter_elements ) {
    
        filter_element.addEventListener( "click", filterAction.bind( null, filter_element ), false );
        
        // direct filtering from url
        if ( filter_from_url == "#" + filter_element.dataset.filter ) {
            filterAction( filter_element );
        }
        
    }
    
}


function filterAction( filter_element ) {
    
    var current_filter = filter_element.dataset.filter;
    
    const filter_elements = document.getElementsByClassName( "grid_filter" );
    for ( const filter_element of filter_elements ) {
        classRemove( filter_element, "active" ); 
    }
    
    if ( current_filter != "" ) {
        classAdd( filter_element, "active" ); 
    }
    
    const grid_elements = document.getElementsByClassName( "grid" )[0].getElementsByTagName( "li" );
    for ( const grid_element of grid_elements ) {
        if ( current_filter == "" || grid_element.dataset.tags.indexOf( current_filter ) >= 0 ) {
            grid_element.style.display = "block";
        } else {
            grid_element.style.display = "none";
        }
    } 
    
    if ( current_filter != "" ) {
        classAdd( document.getElementsByTagName( "nav" )[0], "filter_active" );
    } else {
        classRemove( document.getElementsByTagName( "nav" )[0], "filter_active" );
    }
    
    scrollToY( 0 );
    
    // hide the menu
    menuClose();

}



// VISUALS —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


var visuals_data = [];


document.addEventListener( 'DOMContentLoaded', visualsInit );

function visualsInit() {
    
    const visual_elements = document.getElementsByClassName( "visual" );
    for ( const visual_element of visual_elements ) {
        visuals_data.push( {
            "visual_element" : visual_element,
            "slider_element" : visual_element.getElementsByClassName( "slider" )[0],
            "elements" : visual_element.getElementsByClassName( "element" ),
            "visual_mode" : visual_element.dataset.visualMode,
            "total" : visual_element.getElementsByClassName( "element" ).length,
            "position" : 0,
            "direction" : "forward",
        } );   
    }
    
    for ( const visual_data of visuals_data ) {
        
        if ( visual_data.visual_mode == "horizontal" ) {
            visual_data.slider_element.style.width = ( visual_data.total * 100 ) + "%";
            let count = 0;
            for ( const element of visual_data.elements ) {
                element.style.width = ( 100 / visual_data.total ) + "%";
                element.style.left = ( ( 100 / visual_data.total ) * count ) + "%";
                count++;
            }
        }
        
        if ( visual_data.visual_mode == "vertical" ) {
            visual_data.slider_element.style.height = ( visual_data.total * 100 ) + "%";
            let count = 0;
            for ( const element of visual_data.elements ) {
                element.style.height = ( 100 / visual_data.total ) + "%";
                element.style.top = ( ( 100 / visual_data.total ) * count ) + "%";
                count++;
            }
        }
        
        for ( const element of visual_data.elements ) {
            element.style.display = "block";
        }
        
        visual_data.slider_element.style.transform = "translate3d(0px,0px,0)";
        
        if ( visual_data.total > 1 ) {
            visualsRequestSwitch( visual_data );
        }
        
    }
    
    console.log( visuals_data ); 
        
}


function visualsRequestSwitch( visual_data ) {
    window.setTimeout( visualsSwitch.bind( null, visual_data ), zufall( 8 * 1000, 12 * 1000 ) );   // 8 - 12 sec
}


function visualsSwitch( visual_data ) {

    if ( visual_data.direction == "forward" ) {
        if ( visual_data.position + 1 < visual_data.total ) {
            visual_data.position++;
        } else {
            visual_data.direction = "backward";
            visual_data.position--;
        }
    } else if ( visual_data.direction == "backward" ) {
        if ( visual_data.position - 1 >= 0 ) {
            visual_data.position--;
        } else {
            visual_data.direction = "forward";
            visual_data.position++;
        }
    }
    
    if ( visual_data.visual_mode == "horizontal" ) {
        visual_data.slider_element.style.transform = "translate3d(-" + ( 100 / visual_data.total * visual_data.position ) + "%,0px,0)";
    }
    
    if ( visual_data.visual_mode == "vertical" ) {
        visual_data.slider_element.style.transform = "translate3d(0px,-" + ( 100 / visual_data.total * visual_data.position ) + "%,0)";
    }

    console.log( "switch" );
    
    visualsRequestSwitch( visual_data );
    
}



// HELP ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

function zufall( a, b ) {
    return Math.floor( Math.random() * ( b - a + 1 ) ) + a;
}

function classAdd( element, class_string ) {
    if ( element.className.indexOf( class_string ) < 0 ) {
        element.className = element.className + " " + class_string;
    }
}

function classRemove( element, class_string ) {
    element.className = element.className.replace( new RegExp( " " + class_string + "", "g" ) , "" ).replace( new RegExp( class_string, "g" ) , "" );
}


function stringToSlug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    
    str = str.replace(/ß/g,"ss"); // ß ersetzen
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

/*

https://easings.net/de

*/

function easeOutQuart( x ) {
    return 1 - Math.pow( 1 - x, 4 );
}

function easeOutExpo( x ) {
    return x === 1 ? 1 : 1 - Math.pow( 2, -10 * x );
}


function post( url, callback_function, fail_function, callback_id, parameter ){
    try {
    
        if ( parameter == null ) {
            parameter = {};
        }
        
        parameter["random"] = Math.random(); // gegen cache
        
        let parameter_result = [];
        for ( const element in parameter ) {
            parameter_result.push( element + "=" + encodeURIComponent( parameter[element] ) );
        }
        parameter_result = parameter_result.join( "&" );
        
        const http_request = new XMLHttpRequest();
        http_request.overrideMimeType('text/xml; charset=UTF-8');
        
        http_request.onreadystatechange = function() {
            if (http_request.readyState == 4) {
                if (http_request.status == 200) {
                    if (callback_function!=null&&callback_id!=null) {
                        callback_function.call( this, callback_id, http_request.responseText );
                    } else if (callback_function!=null) {
                        callback_function.call( this, http_request.responseText );
                    }
                } else {
                    
                    if (fail_function!=null&&callback_id!=null) {
                        fail_function.call( this, callback_id, http_request.status, http_request.responseText );
                    } else if (fail_function!=null) {
                        fail_function.call( this, http_request.status, http_request.responseText );
                    }
    
                }
            }
        }
        
        //  http_request.onprogress = function(event) {
        //      if (event.lengthComputable) {
        //          $("navigation_progress").style.webkitTransform="translate3d("+ ( -70+   ((event.loaded/event.total)*70)    )+"%,0px,0)";
        //      }
        //  }
        
        http_request.open('POST', url,true);
        http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        http_request.send(parameter_result);
        
    } catch(e) {
    
    }

}


// SCROLL ————————————————————————————————————————————————————————————————————————————————————————————

var current_is_auto_scroll = false;

// first add raf shim
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// main function
function scrollToY(scrollTargetY, speed, easing) {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    var scrollY = window.scrollY || document.documentElement.scrollTop,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;
        
    // min time .1, max time .8 seconds
    var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    var easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);

            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
            current_is_auto_scroll=true;
        } else {
            current_is_auto_scroll=false;
            window.scrollTo(0, scrollTargetY);
        }
    }

    // call it once to get started
    tick();
}



// main function
function scrollElementToX( element, scrollTargetX, speed, easing) {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    var scrollY = element.scrollLeft,
        scrollTargetY = scrollTargetX || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;
        
    // min time .1, max time .8 seconds
    var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    var easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);

            element.scrollLeft = scrollY + ((scrollTargetY - scrollY) * t);
        } else {
            element.scrollLeft = scrollTargetY;
        }
    }

    // call it once to get started
    tick();
}



} )();
