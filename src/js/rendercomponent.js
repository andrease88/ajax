//jshint esversion:6
import { el } from './elements.js';
import { request } from './requestapi.js';
import { event } from './eventlistener.js';

//pretty much only render functions to manipulate with the DOM, nothing special
export const render = {
  renderStation: (data) => {
    el.stationsToPick.innerHTML = '';
    if(data.Metros.length > 0){
      el.metrosDiv.className = 'column col-xs-12 col-md-6 col-xl-4 float-left text-center';
      el.metroHeader.className = 'visible';
      data.Metros.forEach(metros => {
        el.metro.innerHTML +=
        `<li class="stations-info">${metros.LineNumber} mot ${metros.Destination} <span class="time">${metros.DisplayTime}</span></li>`;
      });
    } else {
      el.metrosDiv.className = 'hide';
    }
    if(data.Trams.length > 0){
      el.tramsDiv.className = 'column col-xs-12 col-md-6 col-xl-4 float-left text-center';
      el.tramsHeader.className = 'visible';
      data.Trams.forEach(trams => {
        el.trams.innerHTML +=
        `<li class="stations-info">${trams.LineNumber} mot ${trams.Destination} <span class="time">${trams.DisplayTime}</span></li>`;
      });
    } else {
      el.tramsDiv.className = 'hide';
    }
    if(data.Buses.length > 0){
      el.busDiv.className = 'column col-xs-12 col-md-6 col-xl-4 float-left text-center';
      el.busHeader.className = 'visible';
      data.Buses.forEach(bus => {
        el.bus.innerHTML +=
        `<li class="stations-info">${bus.LineNumber} mot ${bus.Destination} <span class="time">${bus.DisplayTime}</span></li>`;
      });
    } else {
      el.busDiv.className = 'hide';
    }
    if(data.Metros.length < 1 && data.Trams.length < 1 && data.Buses.length < 1)
      el.stationsToPick.innerHTML = 'Hittade inga avgångar för stationen';
  },
  userPickStation: (data) => {
    data.forEach(stationName => {
      el.stationsToPick.innerHTML +=
      `<li class="stations-list">${stationName.Name}</li>`;
    });
    event.clickStationList(data);
  },
  renderWeather: (name, icon, temp) => {
    el.icon.className = 'owf owf-'+icon+' owf-5x';
    el.name.innerHTML = name;
    el.temp.innerHTML = temp+' &#8451;';
  },
  resetStationList: () => {
    el.stationsToPick.innerHTML = '';
    el.bus.innerHTML = '';
    el.trams.innerHTML = '';
    el.metro.innerHTML = '';
    el.metroHeader.className = 'hide';
    el.busHeader.className = 'hide';
    el.tramsHeader.className = 'hide';
  }
};
