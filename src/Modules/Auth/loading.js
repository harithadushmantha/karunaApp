import React, { Component } from 'react';



export function Loading() 
{

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 1);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        elem.style.width = 0 +"%";
      } else {
        width++;
        elem.style.width = width + "%";
        
      }
      
    }
  }
}

return move;


}
