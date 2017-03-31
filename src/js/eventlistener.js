//jshint esversion:6
import { el } from './elements.js';
import { request } from './requestapi.js';


export const event = {
  //creates an eventlistener for each station being printed out after the search of station
  clickStationList: (data) => {
    let stations = Array.from(el.stationsList);
    //each element will have its own click eventlistener
    stations.forEach((station, index) => {
      station.onclick = () => {
        el.stationsToPick.innerHTML = '';
        //clicked element will send over with index to realTimeInfo
        request.realTimeInfo(index, data);
      };
    });
  },
};
