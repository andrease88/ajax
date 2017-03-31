//jshint esversion:6
import { el } from './elements.js';
import { request } from './requestapi.js';


export const event = {
  clickStationList: (data) => {
    let stations = Array.from(el.stationsList);
    stations.forEach((station, index) => {
      station.onclick = () => {
        el.stationsToPick.innerHTML = '';
        request.realTimeInfo(index, data);
      };
    });
  },
  // key: (element) => {
  //   element.onkeydown = (event) => {
  //     if(event.keyCode === 13){
  //       request.stationName(element.value.trim());
  //     }
  //   };
  // },
  // click: (element) => {
  //   element.addEventListener('click', request.stationName(el.stationSearch.value));
  // }
};
