(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.el = undefined;

var _requestapi = require('./requestapi.js');

//Exports all elements from HTML to any module that wants to use it
var el = exports.el = {
  stationSearch: document.getElementById('search'),
  stationSearchSubmit: document.getElementById('submit-search'),
  stationsToPick: document.getElementById('stations-to-pick'),
  stationsList: document.getElementsByClassName('stations-list'),
  metro: document.getElementById('metro'),
  metroHeader: document.getElementById('metro-header'),
  trams: document.getElementById('trams'),
  tramsHeader: document.getElementById('trams-header'),
  bus: document.getElementById('bus'),
  trainsHeader: document.getElementById('trains-header'),
  trains: document.getElementById('trains'),
  busHeader: document.getElementById('bus-header'),
  loader: document.getElementById('loader'),
  loaderWeather: document.getElementById('loader-weather'),
  citySearch: document.getElementById('city-search'),
  citySearchSubmit: document.getElementById('submit-city-search'),
  temp: document.getElementById('temp'),
  name: document.getElementById('name'),
  description: document.getElementById('description'),
  metrosDiv: document.getElementById('metros-div'),
  tramsDiv: document.getElementById('trams-div'),
  busDiv: document.getElementById('bus-div'),
  icon: document.getElementById('icon'),
  loadingSite: document.getElementById('loading-site'),
  site: document.getElementById('site')

}; //jshint esversion:6
//Imports module 'request' from requestapi.js

},{"./requestapi.js":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.event = undefined;

var _elements = require('./elements.js');

var _requestapi = require('./requestapi.js');

//jshint esversion:6
var event = exports.event = {
  clickStationList: function clickStationList(data) {
    var stations = Array.from(_elements.el.stationsList);
    stations.forEach(function (station, index) {
      station.onclick = function () {
        _elements.el.stationsToPick.innerHTML = '';
        _requestapi.request.realTimeInfo(index, data);
      };
    });
  }
};

},{"./elements.js":1,"./requestapi.js":5}],3:[function(require,module,exports){
'use strict';

var _elements = require('./elements.js');

var _requestapi = require('./requestapi.js');

var _eventlistener = require('./eventlistener.js');

//Slef invoked function to handle apps functions
(function () {
  _requestapi.request.getIP();

  var app = {
    searchStaion: function searchStaion() {
      if (_elements.el.stationSearch.value.trim()) _requestapi.request.stationName(_elements.el.stationSearch.value);
      _elements.el.stationSearch.value = '';
    },
    searchCity: function searchCity() {
      if (_elements.el.citySearch.value.trim()) _requestapi.request.weatherForCity(_elements.el.citySearch.value);
    }
  };

  _elements.el.stationSearch.onkeydown = function (event) {
    if (event.keyCode === 13) app.searchStaion();
  };
  _elements.el.stationSearchSubmit.addEventListener('click', app.searchStaion);
  // event.click(el.stationSearchSubmit);
  // event.key(el.stationSearch);
})(); //jshint esversion:6
//Imports modules

},{"./elements.js":1,"./eventlistener.js":2,"./requestapi.js":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = undefined;

var _elements = require('./elements.js');

var _requestapi = require('./requestapi.js');

var _eventlistener = require('./eventlistener.js');

var render = exports.render = {
  renderStation: function renderStation(data) {
    _elements.el.stationsToPick.innerHTML = '';
    if (data.Metros.length > 0) {
      _elements.el.metrosDiv.className = 'column col-xs-12 col-md-6 col-xl-4 float-left text-center';
      _elements.el.metroHeader.className = 'visible';
      data.Metros.forEach(function (metros) {
        _elements.el.metro.innerHTML += '<li class="stations-info">' + metros.LineNumber + ' mot ' + metros.Destination + ' <span class="time">' + metros.DisplayTime + '</span></li>';
      });
    } else {
      _elements.el.metrosDiv.className = 'hide';
    }
    if (data.Trams.length > 0) {
      _elements.el.tramsDiv.className = 'column col-xs-12 col-md-6 col-xl-4 float-left text-center';
      _elements.el.tramsHeader.className = 'visible';
      data.Trams.forEach(function (trams) {
        _elements.el.trams.innerHTML += '<li class="stations-info">' + trams.LineNumber + ' mot ' + trams.Destination + ' <span class="time">' + trams.DisplayTime + '</span></li>';
      });
    } else {
      _elements.el.tramsDiv.className = 'hide';
    }
    if (data.Buses.length > 0) {
      _elements.el.busDiv.className = 'column col-xs-12 col-md-6 col-xl-4 float-left text-center';
      _elements.el.busHeader.className = 'visible';
      data.Buses.forEach(function (bus) {
        _elements.el.bus.innerHTML += '<li class="stations-info">' + bus.LineNumber + ' mot ' + bus.Destination + ' <span class="time">' + bus.DisplayTime + '</span></li>';
      });
    } else {
      _elements.el.busDiv.className = 'hide';
    }
    if (data.Metros.length < 1 && data.Trams.length < 1 && data.Buses.length < 1) _elements.el.stationsToPick.innerHTML = 'Hittade inga avgångar för stationen';
  },
  userPickStation: function userPickStation(data) {
    data.forEach(function (stationName) {
      _elements.el.stationsToPick.innerHTML += '<li class="stations-list">' + stationName.Name + '</li>';
    });
    _eventlistener.event.clickStationList(data);
  },
  renderWeather: function renderWeather(name, icon, temp) {
    _elements.el.icon.className = 'owf owf-' + icon + ' owf-5x';
    _elements.el.name.innerHTML = name;
    _elements.el.temp.innerHTML = temp + ' &#8451;';
  },
  resetStationList: function resetStationList() {
    _elements.el.stationsToPick.innerHTML = '';
    _elements.el.bus.innerHTML = '';
    _elements.el.trams.innerHTML = '';
    _elements.el.metro.innerHTML = '';
    _elements.el.metroHeader.className = 'hide';
    _elements.el.busHeader.className = 'hide';
    _elements.el.tramsHeader.className = 'hide';
  }
}; //jshint esversion:6

},{"./elements.js":1,"./eventlistener.js":2,"./requestapi.js":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = undefined;

var _rendercomponent = require('./rendercomponent.js');

var _elements = require('./elements.js');

//APIkeys for SL
//jshint esversion:6
//Imports module 'render' from rendercomponent.js
var platsuppslag = 'https://slapione.herokuapp.com?key=7d3cb8b20f5745b2be5474a62cfcbcf7&searchstring=';
var realtidsinfo = 'https://slapitwo.herokuapp.com?key=4992f5a2c367484498bcb01c85f4c766&siteid=';
var weather = '&APPID=239d1a8a2bb0f4798577b28c4f22849b';

//Exports request object to any module that wants to use it
var request = exports.request = {
  getIP: function getIP() {
    fetch('https://ipapi.co/json').then(function (response) {
      return response.json();
    }).then(function (data) {
      var lat = data.latitude;
      var lon = data.longitude;
      console.log(lat, lon);
      request.weatherForCity(lat, lon);
    }).catch(function (error) {
      console.log(error);
    });
  },
  stationName: function stationName(station) {
    _rendercomponent.render.resetStationList();
    _elements.el.loader.className = 'spinner';
    fetch(platsuppslag + station + '&stationsonly=true').then(function (response) {
      return response.json();
    }).then(function (data) {
      _elements.el.loader.className = 'hide';
      _rendercomponent.render.userPickStation(data.ResponseData);
    }).catch(function (error) {
      console.log(error);
    });
  },
  realTimeInfo: function realTimeInfo(index, data) {
    _elements.el.loader.className = 'spinner';
    data.forEach(function (stationName, i) {
      if (index == i) fetch(realtidsinfo + stationName.SiteId + '&timewindow=30').then(function (response) {
        return response.json();
      }).then(function (data) {
        _elements.el.loader.className = 'hide';
        _rendercomponent.render.renderStation(data.ResponseData);
      }).catch(function (error) {
        console.log(error);
      });
    });
  },
  weatherForCity: function weatherForCity(lat, lon) {
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric' + weather).then(function (response) {
      return response.json();
    }).then(function (data) {
      _elements.el.site.className = 'container';
      var name = data.name;
      var icon = data.weather[0].id;
      var temp = data.main.temp.toFixed(1);
      _rendercomponent.render.renderWeather(name, icon, temp);
    }).catch(function (error) {
      console.log(error);
    });
  }
};

},{"./elements.js":1,"./rendercomponent.js":4}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZWxlbWVudHMuanMiLCJzcmMvanMvZXZlbnRsaXN0ZW5lci5qcyIsInNyYy9qcy9tYWluLmpzIiwic3JjL2pzL3JlbmRlcmNvbXBvbmVudC5qcyIsInNyYy9qcy9yZXF1ZXN0YXBpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0VBOztBQUVBO0FBQ08sSUFBTSxrQkFBSztBQUNoQixpQkFBZSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FEQztBQUVoQix1QkFBcUIsU0FBUyxjQUFULENBQXdCLGVBQXhCLENBRkw7QUFHaEIsa0JBQWdCLFNBQVMsY0FBVCxDQUF3QixrQkFBeEIsQ0FIQTtBQUloQixnQkFBYyxTQUFTLHNCQUFULENBQWdDLGVBQWhDLENBSkU7QUFLaEIsU0FBTyxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsQ0FMUztBQU1oQixlQUFhLFNBQVMsY0FBVCxDQUF3QixjQUF4QixDQU5HO0FBT2hCLFNBQU8sU0FBUyxjQUFULENBQXdCLE9BQXhCLENBUFM7QUFRaEIsZUFBYSxTQUFTLGNBQVQsQ0FBd0IsY0FBeEIsQ0FSRztBQVNoQixPQUFLLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQVRXO0FBVWhCLGdCQUFjLFNBQVMsY0FBVCxDQUF3QixlQUF4QixDQVZFO0FBV2hCLFVBQVEsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBWFE7QUFZaEIsYUFBVyxTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsQ0FaSztBQWFoQixVQUFRLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQWJRO0FBY2hCLGlCQUFlLFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FkQztBQWVoQixjQUFZLFNBQVMsY0FBVCxDQUF3QixhQUF4QixDQWZJO0FBZ0JoQixvQkFBa0IsU0FBUyxjQUFULENBQXdCLG9CQUF4QixDQWhCRjtBQWlCaEIsUUFBTSxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIs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QkFBRyxJQUFILENBQVEsU0FBUixHQUFvQixXQUFwQjtBQUNBLFVBQUksT0FBTyxLQUFLLElBQWhCO0FBQ0EsVUFBSSxPQUFPLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsRUFBM0I7QUFDQSxVQUFJLE9BQU8sS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLE9BQWYsQ0FBdUIsQ0FBdkIsQ0FBWDtBQUNBLDhCQUFPLGFBQVAsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsRUFBaUMsSUFBakM7QUFDRCxLQVRELEVBU0csS0FUSCxDQVNTLGlCQUFTO0FBQ2hCLGNBQVEsR0FBUixDQUFZLEtBQVo7QUFDRCxLQVhEO0FBWUQ7QUFwRG9CLENBQWhCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vanNoaW50IGVzdmVyc2lvbjo2XG4vL0ltcG9ydHMgbW9kdWxlICdyZXF1ZXN0JyBmcm9tIHJlcXVlc3RhcGkuanNcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuL3JlcXVlc3RhcGkuanMnO1xuXG4vL0V4cG9ydHMgYWxsIGVsZW1lbnRzIGZyb20gSFRNTCB0byBhbnkgbW9kdWxlIHRoYXQgd2FudHMgdG8gdXNlIGl0XG5leHBvcnQgY29uc3QgZWwgPSB7XG4gIHN0YXRpb25TZWFyY2g6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gnKSxcbiAgc3RhdGlvblNlYXJjaFN1Ym1pdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1zZWFyY2gnKSxcbiAgc3RhdGlvbnNUb1BpY2s6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGF0aW9ucy10by1waWNrJyksXG4gIHN0YXRpb25zTGlzdDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3RhdGlvbnMtbGlzdCcpLFxuICBtZXRybzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21ldHJvJyksXG4gIG1ldHJvSGVhZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWV0cm8taGVhZGVyJyksXG4gIHRyYW1zOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhbXMnKSxcbiAgdHJhbXNIZWFkZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFtcy1oZWFkZXInKSxcbiAgYnVzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnVzJyksXG4gIHRyYWluc0hlYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWlucy1oZWFkZXInKSxcbiAgdHJhaW5zOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5zJyksXG4gIGJ1c0hlYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1cy1oZWFkZXInKSxcbiAgbG9hZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGVyJyksXG4gIGxvYWRlcldlYXRoZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkZXItd2VhdGhlcicpLFxuICBjaXR5U2VhcmNoOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eS1zZWFyY2gnKSxcbiAgY2l0eVNlYXJjaFN1Ym1pdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1jaXR5LXNlYXJjaCcpLFxuICB0ZW1wOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcCcpLFxuICBuYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpLFxuICBkZXNjcmlwdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJyksXG4gIG1ldHJvc0RpdjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21ldHJvcy1kaXYnKSxcbiAgdHJhbXNEaXY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFtcy1kaXYnKSxcbiAgYnVzRGl2OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnVzLWRpdicpLFxuICBpY29uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbicpLFxuICBsb2FkaW5nU2l0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRpbmctc2l0ZScpLFxuICBzaXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2l0ZScpXG5cbn07XG4iLCIvL2pzaGludCBlc3ZlcnNpb246NlxuaW1wb3J0IHsgZWwgfSBmcm9tICcuL2VsZW1lbnRzLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuL3JlcXVlc3RhcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBldmVudCA9IHtcbiAgY2xpY2tTdGF0aW9uTGlzdDogKGRhdGEpID0+IHtcbiAgICBsZXQgc3RhdGlvbnMgPSBBcnJheS5mcm9tKGVsLnN0YXRpb25zTGlzdCk7XG4gICAgc3RhdGlvbnMuZm9yRWFjaCgoc3RhdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgIHN0YXRpb24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZWwuc3RhdGlvbnNUb1BpY2suaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJlcXVlc3QucmVhbFRpbWVJbmZvKGluZGV4LCBkYXRhKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sXG4gIC8vIGtleTogKGVsZW1lbnQpID0+IHtcbiAgLy8gICBlbGVtZW50Lm9ua2V5ZG93biA9IChldmVudCkgPT4ge1xuICAvLyAgICAgaWYoZXZlbnQua2V5Q29kZSA9PT0gMTMpe1xuICAvLyAgICAgICByZXF1ZXN0LnN0YXRpb25OYW1lKGVsZW1lbnQudmFsdWUudHJpbSgpKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9O1xuICAvLyB9LFxuICAvLyBjbGljazogKGVsZW1lbnQpID0+IHtcbiAgLy8gICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVxdWVzdC5zdGF0aW9uTmFtZShlbC5zdGF0aW9uU2VhcmNoLnZhbHVlKSk7XG4gIC8vIH1cbn07XG4iLCIvL2pzaGludCBlc3ZlcnNpb246NlxuLy9JbXBvcnRzIG1vZHVsZXNcbmltcG9ydCB7IGVsIH0gZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0YXBpLmpzJztcbmltcG9ydCB7IGV2ZW50IH0gZnJvbSAnLi9ldmVudGxpc3RlbmVyLmpzJztcblxuLy9TbGVmIGludm9rZWQgZnVuY3Rpb24gdG8gaGFuZGxlIGFwcHMgZnVuY3Rpb25zXG4oKCkgPT4ge1xuICByZXF1ZXN0LmdldElQKCk7XG5cbiAgY29uc3QgYXBwID0ge1xuICAgIHNlYXJjaFN0YWlvbjogKCkgPT4ge1xuICAgICAgaWYoZWwuc3RhdGlvblNlYXJjaC52YWx1ZS50cmltKCkpXG4gICAgICAgIHJlcXVlc3Quc3RhdGlvbk5hbWUoZWwuc3RhdGlvblNlYXJjaC52YWx1ZSk7XG4gICAgICAgIGVsLnN0YXRpb25TZWFyY2gudmFsdWUgPSAnJztcbiAgICB9LFxuICAgIHNlYXJjaENpdHk6ICgpID0+IHtcbiAgICAgIGlmKGVsLmNpdHlTZWFyY2gudmFsdWUudHJpbSgpKVxuICAgICAgICByZXF1ZXN0LndlYXRoZXJGb3JDaXR5KGVsLmNpdHlTZWFyY2gudmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICBlbC5zdGF0aW9uU2VhcmNoLm9ua2V5ZG93biA9IChldmVudCkgPT4ge1xuICAgIGlmKGV2ZW50LmtleUNvZGUgPT09IDEzKVxuICAgICAgYXBwLnNlYXJjaFN0YWlvbigpO1xuICB9O1xuICBlbC5zdGF0aW9uU2VhcmNoU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXBwLnNlYXJjaFN0YWlvbik7XG4gIC8vIGV2ZW50LmNsaWNrKGVsLnN0YXRpb25TZWFyY2hTdWJtaXQpO1xuICAvLyBldmVudC5rZXkoZWwuc3RhdGlvblNlYXJjaCk7XG59KSgpO1xuIiwiLy9qc2hpbnQgZXN2ZXJzaW9uOjZcbmltcG9ydCB7IGVsIH0gZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0YXBpLmpzJztcbmltcG9ydCB7IGV2ZW50IH0gZnJvbSAnLi9ldmVudGxpc3RlbmVyLmpzJztcblxuZXhwb3J0IGNvbnN0IHJlbmRlciA9IHtcbiAgcmVuZGVyU3RhdGlvbjogKGRhdGEpID0+IHtcbiAgICBlbC5zdGF0aW9uc1RvUGljay5pbm5lckhUTUwgPSAnJztcbiAgICBpZihkYXRhLk1ldHJvcy5sZW5ndGggPiAwKXtcbiAgICAgIGVsLm1ldHJvc0Rpdi5jbGFzc05hbWUgPSAnY29sdW1uIGNvbC14cy0xMiBjb2wtbWQtNiBjb2wteGwtNCBmbG9hdC1sZWZ0IHRleHQtY2VudGVyJztcbiAgICAgIGVsLm1ldHJvSGVhZGVyLmNsYXNzTmFtZSA9ICd2aXNpYmxlJztcbiAgICAgIGRhdGEuTWV0cm9zLmZvckVhY2gobWV0cm9zID0+IHtcbiAgICAgICAgZWwubWV0cm8uaW5uZXJIVE1MICs9XG4gICAgICAgIGA8bGkgY2xhc3M9XCJzdGF0aW9ucy1pbmZvXCI+JHttZXRyb3MuTGluZU51bWJlcn0gbW90ICR7bWV0cm9zLkRlc3RpbmF0aW9ufSA8c3BhbiBjbGFzcz1cInRpbWVcIj4ke21ldHJvcy5EaXNwbGF5VGltZX08L3NwYW4+PC9saT5gO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLm1ldHJvc0Rpdi5jbGFzc05hbWUgPSAnaGlkZSc7XG4gICAgfVxuICAgIGlmKGRhdGEuVHJhbXMubGVuZ3RoID4gMCl7XG4gICAgICBlbC50cmFtc0Rpdi5jbGFzc05hbWUgPSAnY29sdW1uIGNvbC14cy0xMiBjb2wtbWQtNiBjb2wteGwtNCBmbG9hdC1sZWZ0IHRleHQtY2VudGVyJztcbiAgICAgIGVsLnRyYW1zSGVhZGVyLmNsYXNzTmFtZSA9ICd2aXNpYmxlJztcbiAgICAgIGRhdGEuVHJhbXMuZm9yRWFjaCh0cmFtcyA9PiB7XG4gICAgICAgIGVsLnRyYW1zLmlubmVySFRNTCArPVxuICAgICAgICBgPGxpIGNsYXNzPVwic3RhdGlvbnMtaW5mb1wiPiR7dHJhbXMuTGluZU51bWJlcn0gbW90ICR7dHJhbXMuRGVzdGluYXRpb259IDxzcGFuIGNsYXNzPVwidGltZVwiPiR7dHJhbXMuRGlzcGxheVRpbWV9PC9zcGFuPjwvbGk+YDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC50cmFtc0Rpdi5jbGFzc05hbWUgPSAnaGlkZSc7XG4gICAgfVxuICAgIGlmKGRhdGEuQnVzZXMubGVuZ3RoID4gMCl7XG4gICAgICBlbC5idXNEaXYuY2xhc3NOYW1lID0gJ2NvbHVtbiBjb2wteHMtMTIgY29sLW1kLTYgY29sLXhsLTQgZmxvYXQtbGVmdCB0ZXh0LWNlbnRlcic7XG4gICAgICBlbC5idXNIZWFkZXIuY2xhc3NOYW1lID0gJ3Zpc2libGUnO1xuICAgICAgZGF0YS5CdXNlcy5mb3JFYWNoKGJ1cyA9PiB7XG4gICAgICAgIGVsLmJ1cy5pbm5lckhUTUwgKz1cbiAgICAgICAgYDxsaSBjbGFzcz1cInN0YXRpb25zLWluZm9cIj4ke2J1cy5MaW5lTnVtYmVyfSBtb3QgJHtidXMuRGVzdGluYXRpb259IDxzcGFuIGNsYXNzPVwidGltZVwiPiR7YnVzLkRpc3BsYXlUaW1lfTwvc3Bhbj48L2xpPmA7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuYnVzRGl2LmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICB9XG4gICAgaWYoZGF0YS5NZXRyb3MubGVuZ3RoIDwgMSAmJiBkYXRhLlRyYW1zLmxlbmd0aCA8IDEgJiYgZGF0YS5CdXNlcy5sZW5ndGggPCAxKVxuICAgICAgZWwuc3RhdGlvbnNUb1BpY2suaW5uZXJIVE1MID0gJ0hpdHRhZGUgaW5nYSBhdmfDpW5nYXIgZsO2ciBzdGF0aW9uZW4nO1xuICB9LFxuICB1c2VyUGlja1N0YXRpb246IChkYXRhKSA9PiB7XG4gICAgZGF0YS5mb3JFYWNoKHN0YXRpb25OYW1lID0+IHtcbiAgICAgIGVsLnN0YXRpb25zVG9QaWNrLmlubmVySFRNTCArPVxuICAgICAgYDxsaSBjbGFzcz1cInN0YXRpb25zLWxpc3RcIj4ke3N0YXRpb25OYW1lLk5hbWV9PC9saT5gO1xuICAgIH0pO1xuICAgIGV2ZW50LmNsaWNrU3RhdGlvbkxpc3QoZGF0YSk7XG4gIH0sXG4gIHJlbmRlcldlYXRoZXI6IChuYW1lLCBpY29uLCB0ZW1wKSA9PiB7XG4gICAgZWwuaWNvbi5jbGFzc05hbWUgPSAnb3dmIG93Zi0nK2ljb24rJyBvd2YtNXgnO1xuICAgIGVsLm5hbWUuaW5uZXJIVE1MID0gbmFtZTtcbiAgICBlbC50ZW1wLmlubmVySFRNTCA9IHRlbXArJyAmIzg0NTE7JztcbiAgfSxcbiAgcmVzZXRTdGF0aW9uTGlzdDogKCkgPT4ge1xuICAgIGVsLnN0YXRpb25zVG9QaWNrLmlubmVySFRNTCA9ICcnO1xuICAgIGVsLmJ1cy5pbm5lckhUTUwgPSAnJztcbiAgICBlbC50cmFtcy5pbm5lckhUTUwgPSAnJztcbiAgICBlbC5tZXRyby5pbm5lckhUTUwgPSAnJztcbiAgICBlbC5tZXRyb0hlYWRlci5jbGFzc05hbWUgPSAnaGlkZSc7XG4gICAgZWwuYnVzSGVhZGVyLmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICBlbC50cmFtc0hlYWRlci5jbGFzc05hbWUgPSAnaGlkZSc7XG4gIH1cbn07XG4iLCIvL2pzaGludCBlc3ZlcnNpb246NlxuLy9JbXBvcnRzIG1vZHVsZSAncmVuZGVyJyBmcm9tIHJlbmRlcmNvbXBvbmVudC5qc1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnLi9yZW5kZXJjb21wb25lbnQuanMnO1xuaW1wb3J0IHsgZWwgfSBmcm9tICcuL2VsZW1lbnRzLmpzJztcblxuLy9BUElrZXlzIGZvciBTTFxuY29uc3QgcGxhdHN1cHBzbGFnID0gJ2h0dHBzOi8vc2xhcGlvbmUuaGVyb2t1YXBwLmNvbT9rZXk9N2QzY2I4YjIwZjU3NDViMmJlNTQ3NGE2MmNmY2JjZjcmc2VhcmNoc3RyaW5nPSc7XG5jb25zdCByZWFsdGlkc2luZm8gPSAnaHR0cHM6Ly9zbGFwaXR3by5oZXJva3VhcHAuY29tP2tleT00OTkyZjVhMmMzNjc0ODQ0OThiY2IwMWM4NWY0Yzc2NiZzaXRlaWQ9JztcbmNvbnN0IHdlYXRoZXIgPSAnJkFQUElEPTIzOWQxYThhMmJiMGY0Nzk4NTc3YjI4YzRmMjI4NDliJztcblxuLy9FeHBvcnRzIHJlcXVlc3Qgb2JqZWN0IHRvIGFueSBtb2R1bGUgdGhhdCB3YW50cyB0byB1c2UgaXRcbmV4cG9ydCBjb25zdCByZXF1ZXN0ID0ge1xuICBnZXRJUDogKCkgPT4ge1xuICAgIGZldGNoKCdodHRwczovL2lwYXBpLmNvL2pzb24nKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgIGxldCBsYXQgPSBkYXRhLmxhdGl0dWRlO1xuICAgICAgbGV0IGxvbiA9IGRhdGEubG9uZ2l0dWRlO1xuICAgICAgY29uc29sZS5sb2cobGF0LCBsb24pO1xuICAgICAgcmVxdWVzdC53ZWF0aGVyRm9yQ2l0eShsYXQsIGxvbik7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuICB9LFxuICBzdGF0aW9uTmFtZTogKHN0YXRpb24pID0+IHtcbiAgICByZW5kZXIucmVzZXRTdGF0aW9uTGlzdCgpO1xuICAgIGVsLmxvYWRlci5jbGFzc05hbWUgPSAnc3Bpbm5lcic7XG4gICAgZmV0Y2gocGxhdHN1cHBzbGFnK3N0YXRpb24rJyZzdGF0aW9uc29ubHk9dHJ1ZScpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgZWwubG9hZGVyLmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICAgIHJlbmRlci51c2VyUGlja1N0YXRpb24oZGF0YS5SZXNwb25zZURhdGEpO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcbiAgfSxcbiAgcmVhbFRpbWVJbmZvOiAoaW5kZXgsIGRhdGEpID0+IHtcbiAgICBlbC5sb2FkZXIuY2xhc3NOYW1lID0gJ3NwaW5uZXInO1xuICAgIGRhdGEuZm9yRWFjaCgoc3RhdGlvbk5hbWUsIGkpID0+IHtcbiAgICAgIGlmKGluZGV4ID09IGkpXG4gICAgICAgIGZldGNoKHJlYWx0aWRzaW5mbytzdGF0aW9uTmFtZS5TaXRlSWQrJyZ0aW1ld2luZG93PTMwJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICBlbC5sb2FkZXIuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgICAgICAgIHJlbmRlci5yZW5kZXJTdGF0aW9uKGRhdGEuUmVzcG9uc2VEYXRhKTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHdlYXRoZXJGb3JDaXR5OiAobGF0LCBsb24pID0+IHtcbiAgICBmZXRjaCgnaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JytsYXQrJyZsb249Jytsb24rJyZ1bml0cz1tZXRyaWMnK3dlYXRoZXIpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgZWwuc2l0ZS5jbGFzc05hbWUgPSAnY29udGFpbmVyJztcbiAgICAgIGxldCBuYW1lID0gZGF0YS5uYW1lO1xuICAgICAgbGV0IGljb24gPSBkYXRhLndlYXRoZXJbMF0uaWQ7XG4gICAgICBsZXQgdGVtcCA9IGRhdGEubWFpbi50ZW1wLnRvRml4ZWQoMSk7XG4gICAgICByZW5kZXIucmVuZGVyV2VhdGhlcihuYW1lLCBpY29uLCB0ZW1wKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG4gIH1cbn07XG4iXX0=
