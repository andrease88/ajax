//jshint esversion:6
//Imports modules
import { el } from './elements.js';
import { request } from './requestapi.js';
import { event } from './eventlistener.js';

//Slef invoked function to handle apps functions
(() => {
  //calls function getIP in the request module
  request.getIP();

  const app = {
    //searchStaion will fire as soon as there's any value in the input field of search station
    searchStaion: () => {
      if(el.stationSearch.value.trim())
        request.stationName(el.stationSearch.value);
        el.stationSearch.value = '';
    },
  };
  //this makes it so that enter can be used to trigger the function to fire if any value is inside of searchfield
  el.stationSearch.onkeydown = (event) => {
    if(event.keyCode === 13)
      app.searchStaion();
  };
  el.stationSearchSubmit.addEventListener('click', app.searchStaion);
})();
