//jshint esversion:6
//Imports module 'render' from rendercomponent.js
import { render } from './rendercomponent.js';
import { el } from './elements.js';

//APIkeys for SL
const platsuppslag = 'https://slapione.herokuapp.com?key=7d3cb8b20f5745b2be5474a62cfcbcf7&searchstring=';
const realtidsinfo = 'https://slapitwo.herokuapp.com?key=4992f5a2c367484498bcb01c85f4c766&siteid=';
const weather = '&APPID=239d1a8a2bb0f4798577b28c4f22849b';

//Exports request object to any module that wants to use it
export const request = {
  getIP: () => {
    fetch('http://ip-api.com/json/').then(response => {
      return response.json();
    }).then(data => {
      let lat = data.lat;
      let lon = data.lon;
      request.weatherForCity(lat, lon);
    }).catch(error => {
      console.log(error);
    });
  },
  stationName: (station) => {
    render.resetStationList();
    el.loader.className = 'spinner';
    fetch(platsuppslag+station+'&stationsonly=true').then(response => {
      return response.json();
    }).then(data => {
      el.loader.className = 'hide';
      render.userPickStation(data.ResponseData);
    }).catch(error => {
      console.log(error);
    });
  },
  realTimeInfo: (index, data) => {
    el.loader.className = 'spinner';
    data.forEach((stationName, i) => {
      if(index == i)
        fetch(realtidsinfo+stationName.SiteId+'&timewindow=30').then(response => {
          return response.json();
        }).then(data => {
          el.loader.className = 'hide';
          render.renderStation(data.ResponseData);
        }).catch(error => {
          console.log(error);
        });
    });
  },
  weatherForCity: (lat, lon) => {
    fetch('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=metric'+weather)
    .then(response => {
      return response.json();
    }).then(data => {
      el.site.className = 'container';
      let name = data.name;
      let icon = data.weather[0].id;
      let temp = data.main.temp.toFixed(1);
      render.renderWeather(name, icon, temp);
    }).catch(error => {
      console.log(error);
    });
  }
};
