//jshint esversion:6
//Imports modules
import { el } from '../lib/elements.js';
import { request } from '../lib/requestapi.js';
import { event } from '../lib/eventlistener.js';

//Slef invoked function to handle apps functions
(() => {
  (() => {
    request.getIP();
  })();

  const app = {
    searchStaion: () => {
      if(el.stationSearch.value.trim())
        request.stationName(el.stationSearch.value);
        el.stationSearch.value = '';
    },
    searchCity: () => {
      if(el.citySearch.value.trim())
        request.weatherForCity(el.citySearch.value);
    }
  };

  el.stationSearch.onkeydown = (event) => {
    if(event.keyCode === 13)
      app.searchStaion();
  };
  el.stationSearchSubmit.addEventListener('click', app.searchStaion);
  // event.click(el.stationSearchSubmit);
  // event.key(el.stationSearch);
})();
