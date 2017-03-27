//jshint esversion:6
//Imports module 'render' from rendercomponent.js
import { render } from './rendercomponent.js';
import { el } from './elements.js';

//APIkeys for SL
const platsuppslag = 'http://api.sl.se/api2/typeahead.json?key=7d3cb8b20f5745b2be5474a62cfcbcf7&searchstring=';
const realtidsinfo = 'http://api.sl.se/api2/realtimedeparturesV4.json?key=4992f5a2c367484498bcb01c85f4c766&siteid=';
const weather = '&APPID=239d1a8a2bb0f4798577b28c4f22849b';

//Exports request object to any module that wants to use it
export const request = {
  getIP: () => {
    setTimeout(() => {
      fetch('http://ip-api.com/json/').then(response => {
        return response.json();
      }).then(data => {
        let lat = data.lat;
        let lon = data.lon;
        request.weatherForCity(lat, lon);
      }).catch(error => {
        console.log(error);
      });
    }, 2000);
  },
  stationName: (station) => {
    render.resetStationList();
    el.loader.className = 'spinner';
    fetch(platsuppslag+station+'&stationsonly=true').then(response => {
      return response.json();
    }).then(data => {
      el.loader.className = 'hide';
      console.log(data);
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
          console.log(data);
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
      el.loadingSite.className = 'hide';
      el.site.className = 'container';
      let name = data.name;
      let description = data.weather[0].description;
      let temp = data.main.temp.toFixed(1);
      render.renderWeather(name, description, temp);
    }).catch(error => {
      console.log(error);
    });
  }
};
