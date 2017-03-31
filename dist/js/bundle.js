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
    fetch('http://ip-api.com/json/').then(function (response) {
      return response.json();
    }).then(function (data) {
      var lat = data.lat;
      var lon = data.lon;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZWxlbWVudHMuanMiLCJzcmMvanMvZXZlbnRsaXN0ZW5lci5qcyIsInNyYy9qcy9tYWluLmpzIiwic3JjL2pzL3JlbmRlcmNvbXBvbmVudC5qcyIsInNyYy9qcy9yZXF1ZXN0YXBpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0VBOztBQUVBO0FBQ08sSUFBTSxrQkFBSztBQUNoQixpQkFBZSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FEQztBQUVoQix1QkFBcUIsU0FBUyxjQUFULENBQXdCLGVBQXhCLENBRkw7QUFHaEIsa0JBQWdCLFNBQVMsY0FBVCxDQUF3QixrQkFBeEIsQ0FIQTtBQUloQixnQkFBYyxTQUFTLHNCQUFULENBQWdDLGVBQWhDLENBSkU7QUFLaEIsU0FBTyxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsQ0FMUztBQU1oQixlQUFhLFNBQVMsY0FBVCxDQUF3QixjQUF4QixDQU5HO0FBT2hCLFNBQU8sU0FBUyxjQUFULENBQXdCLE9BQXhCLENBUFM7QUFRaEIsZUFBYSxTQUFTLGNBQVQsQ0FBd0IsY0FBeEIsQ0FSRztBQVNoQixPQUFLLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQVRXO0FBVWhCLGdCQUFjLFNBQVMsY0FBVCxDQUF3QixlQUF4QixDQVZFO0FBV2hCLFVBQVEsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBWFE7QUFZaEIsYUFBVyxTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsQ0FaSztBQWFoQixVQUFRLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQWJRO0FBY2hCLGlCQUFlLFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FkQztBQWVoQixjQUFZLFNBQVMsY0FBVCxDQUF3QixhQUF4QixDQWZJO0FBZ0JoQixvQkFBa0IsU0FBUyxjQUFULENBQXdCLG9CQUF4QixDQWhCRjtBQWlCaEIsUUFBTSxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIs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VUFBSSxPQUFPLEtBQUssSUFBaEI7QUFDQSxVQUFJLE9BQU8sS0FBSyxPQUFMLENBQWEsQ0FBYixFQUFnQixFQUEzQjtBQUNBLFVBQUksT0FBTyxLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsT0FBZixDQUF1QixDQUF2QixDQUFYO0FBQ0EsOEJBQU8sYUFBUCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixFQUFpQyxJQUFqQztBQUNELEtBVEQsRUFTRyxLQVRILENBU1MsaUJBQVM7QUFDaEIsY0FBUSxHQUFSLENBQVksS0FBWjtBQUNELEtBWEQ7QUFZRDtBQW5Eb0IsQ0FBaEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9qc2hpbnQgZXN2ZXJzaW9uOjZcbi8vSW1wb3J0cyBtb2R1bGUgJ3JlcXVlc3QnIGZyb20gcmVxdWVzdGFwaS5qc1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4vcmVxdWVzdGFwaS5qcyc7XG5cbi8vRXhwb3J0cyBhbGwgZWxlbWVudHMgZnJvbSBIVE1MIHRvIGFueSBtb2R1bGUgdGhhdCB3YW50cyB0byB1c2UgaXRcbmV4cG9ydCBjb25zdCBlbCA9IHtcbiAgc3RhdGlvblNlYXJjaDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaCcpLFxuICBzdGF0aW9uU2VhcmNoU3VibWl0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LXNlYXJjaCcpLFxuICBzdGF0aW9uc1RvUGljazogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXRpb25zLXRvLXBpY2snKSxcbiAgc3RhdGlvbnNMaXN0OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdGF0aW9ucy1saXN0JyksXG4gIG1ldHJvOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWV0cm8nKSxcbiAgbWV0cm9IZWFkZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXRyby1oZWFkZXInKSxcbiAgdHJhbXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFtcycpLFxuICB0cmFtc0hlYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYW1zLWhlYWRlcicpLFxuICBidXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXMnKSxcbiAgdHJhaW5zSGVhZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5zLWhlYWRlcicpLFxuICB0cmFpbnM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbnMnKSxcbiAgYnVzSGVhZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnVzLWhlYWRlcicpLFxuICBsb2FkZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkZXInKSxcbiAgbG9hZGVyV2VhdGhlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRlci13ZWF0aGVyJyksXG4gIGNpdHlTZWFyY2g6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5LXNlYXJjaCcpLFxuICBjaXR5U2VhcmNoU3VibWl0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWNpdHktc2VhcmNoJyksXG4gIHRlbXA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wJyksXG4gIG5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJyksXG4gIGRlc2NyaXB0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKSxcbiAgbWV0cm9zRGl2OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWV0cm9zLWRpdicpLFxuICB0cmFtc0RpdjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYW1zLWRpdicpLFxuICBidXNEaXY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXMtZGl2JyksXG4gIGljb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpY29uJyksXG4gIGxvYWRpbmdTaXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGluZy1zaXRlJyksXG4gIHNpdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaXRlJylcblxufTtcbiIsIi8vanNoaW50IGVzdmVyc2lvbjo2XG5pbXBvcnQgeyBlbCB9IGZyb20gJy4vZWxlbWVudHMuanMnO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4vcmVxdWVzdGFwaS5qcyc7XG5cblxuZXhwb3J0IGNvbnN0IGV2ZW50ID0ge1xuICBjbGlja1N0YXRpb25MaXN0OiAoZGF0YSkgPT4ge1xuICAgIGxldCBzdGF0aW9ucyA9IEFycmF5LmZyb20oZWwuc3RhdGlvbnNMaXN0KTtcbiAgICBzdGF0aW9ucy5mb3JFYWNoKChzdGF0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgc3RhdGlvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBlbC5zdGF0aW9uc1RvUGljay5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmVxdWVzdC5yZWFsVGltZUluZm8oaW5kZXgsIGRhdGEpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSxcbiAgLy8ga2V5OiAoZWxlbWVudCkgPT4ge1xuICAvLyAgIGVsZW1lbnQub25rZXlkb3duID0gKGV2ZW50KSA9PiB7XG4gIC8vICAgICBpZihldmVudC5rZXlDb2RlID09PSAxMyl7XG4gIC8vICAgICAgIHJlcXVlc3Quc3RhdGlvbk5hbWUoZWxlbWVudC52YWx1ZS50cmltKCkpO1xuICAvLyAgICAgfVxuICAvLyAgIH07XG4gIC8vIH0sXG4gIC8vIGNsaWNrOiAoZWxlbWVudCkgPT4ge1xuICAvLyAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXF1ZXN0LnN0YXRpb25OYW1lKGVsLnN0YXRpb25TZWFyY2gudmFsdWUpKTtcbiAgLy8gfVxufTtcbiIsIi8vanNoaW50IGVzdmVyc2lvbjo2XG4vL0ltcG9ydHMgbW9kdWxlc1xuaW1wb3J0IHsgZWwgfSBmcm9tICcuL2VsZW1lbnRzLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuL3JlcXVlc3RhcGkuanMnO1xuaW1wb3J0IHsgZXZlbnQgfSBmcm9tICcuL2V2ZW50bGlzdGVuZXIuanMnO1xuXG4vL1NsZWYgaW52b2tlZCBmdW5jdGlvbiB0byBoYW5kbGUgYXBwcyBmdW5jdGlvbnNcbigoKSA9PiB7XG4gIHJlcXVlc3QuZ2V0SVAoKTtcblxuICBjb25zdCBhcHAgPSB7XG4gICAgc2VhcmNoU3RhaW9uOiAoKSA9PiB7XG4gICAgICBpZihlbC5zdGF0aW9uU2VhcmNoLnZhbHVlLnRyaW0oKSlcbiAgICAgICAgcmVxdWVzdC5zdGF0aW9uTmFtZShlbC5zdGF0aW9uU2VhcmNoLnZhbHVlKTtcbiAgICAgICAgZWwuc3RhdGlvblNlYXJjaC52YWx1ZSA9ICcnO1xuICAgIH0sXG4gICAgc2VhcmNoQ2l0eTogKCkgPT4ge1xuICAgICAgaWYoZWwuY2l0eVNlYXJjaC52YWx1ZS50cmltKCkpXG4gICAgICAgIHJlcXVlc3Qud2VhdGhlckZvckNpdHkoZWwuY2l0eVNlYXJjaC52YWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGVsLnN0YXRpb25TZWFyY2gub25rZXlkb3duID0gKGV2ZW50KSA9PiB7XG4gICAgaWYoZXZlbnQua2V5Q29kZSA9PT0gMTMpXG4gICAgICBhcHAuc2VhcmNoU3RhaW9uKCk7XG4gIH07XG4gIGVsLnN0YXRpb25TZWFyY2hTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhcHAuc2VhcmNoU3RhaW9uKTtcbiAgLy8gZXZlbnQuY2xpY2soZWwuc3RhdGlvblNlYXJjaFN1Ym1pdCk7XG4gIC8vIGV2ZW50LmtleShlbC5zdGF0aW9uU2VhcmNoKTtcbn0pKCk7XG4iLCIvL2pzaGludCBlc3ZlcnNpb246NlxuaW1wb3J0IHsgZWwgfSBmcm9tICcuL2VsZW1lbnRzLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuL3JlcXVlc3RhcGkuanMnO1xuaW1wb3J0IHsgZXZlbnQgfSBmcm9tICcuL2V2ZW50bGlzdGVuZXIuanMnO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyID0ge1xuICByZW5kZXJTdGF0aW9uOiAoZGF0YSkgPT4ge1xuICAgIGVsLnN0YXRpb25zVG9QaWNrLmlubmVySFRNTCA9ICcnO1xuICAgIGlmKGRhdGEuTWV0cm9zLmxlbmd0aCA+IDApe1xuICAgICAgZWwubWV0cm9zRGl2LmNsYXNzTmFtZSA9ICdjb2x1bW4gY29sLXhzLTEyIGNvbC1tZC02IGNvbC14bC00IGZsb2F0LWxlZnQgdGV4dC1jZW50ZXInO1xuICAgICAgZWwubWV0cm9IZWFkZXIuY2xhc3NOYW1lID0gJ3Zpc2libGUnO1xuICAgICAgZGF0YS5NZXRyb3MuZm9yRWFjaChtZXRyb3MgPT4ge1xuICAgICAgICBlbC5tZXRyby5pbm5lckhUTUwgKz1cbiAgICAgICAgYDxsaSBjbGFzcz1cInN0YXRpb25zLWluZm9cIj4ke21ldHJvcy5MaW5lTnVtYmVyfSBtb3QgJHttZXRyb3MuRGVzdGluYXRpb259IDxzcGFuIGNsYXNzPVwidGltZVwiPiR7bWV0cm9zLkRpc3BsYXlUaW1lfTwvc3Bhbj48L2xpPmA7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwubWV0cm9zRGl2LmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICB9XG4gICAgaWYoZGF0YS5UcmFtcy5sZW5ndGggPiAwKXtcbiAgICAgIGVsLnRyYW1zRGl2LmNsYXNzTmFtZSA9ICdjb2x1bW4gY29sLXhzLTEyIGNvbC1tZC02IGNvbC14bC00IGZsb2F0LWxlZnQgdGV4dC1jZW50ZXInO1xuICAgICAgZWwudHJhbXNIZWFkZXIuY2xhc3NOYW1lID0gJ3Zpc2libGUnO1xuICAgICAgZGF0YS5UcmFtcy5mb3JFYWNoKHRyYW1zID0+IHtcbiAgICAgICAgZWwudHJhbXMuaW5uZXJIVE1MICs9XG4gICAgICAgIGA8bGkgY2xhc3M9XCJzdGF0aW9ucy1pbmZvXCI+JHt0cmFtcy5MaW5lTnVtYmVyfSBtb3QgJHt0cmFtcy5EZXN0aW5hdGlvbn0gPHNwYW4gY2xhc3M9XCJ0aW1lXCI+JHt0cmFtcy5EaXNwbGF5VGltZX08L3NwYW4+PC9saT5gO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnRyYW1zRGl2LmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICB9XG4gICAgaWYoZGF0YS5CdXNlcy5sZW5ndGggPiAwKXtcbiAgICAgIGVsLmJ1c0Rpdi5jbGFzc05hbWUgPSAnY29sdW1uIGNvbC14cy0xMiBjb2wtbWQtNiBjb2wteGwtNCBmbG9hdC1sZWZ0IHRleHQtY2VudGVyJztcbiAgICAgIGVsLmJ1c0hlYWRlci5jbGFzc05hbWUgPSAndmlzaWJsZSc7XG4gICAgICBkYXRhLkJ1c2VzLmZvckVhY2goYnVzID0+IHtcbiAgICAgICAgZWwuYnVzLmlubmVySFRNTCArPVxuICAgICAgICBgPGxpIGNsYXNzPVwic3RhdGlvbnMtaW5mb1wiPiR7YnVzLkxpbmVOdW1iZXJ9IG1vdCAke2J1cy5EZXN0aW5hdGlvbn0gPHNwYW4gY2xhc3M9XCJ0aW1lXCI+JHtidXMuRGlzcGxheVRpbWV9PC9zcGFuPjwvbGk+YDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5idXNEaXYuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgIH1cbiAgICBpZihkYXRhLk1ldHJvcy5sZW5ndGggPCAxICYmIGRhdGEuVHJhbXMubGVuZ3RoIDwgMSAmJiBkYXRhLkJ1c2VzLmxlbmd0aCA8IDEpXG4gICAgICBlbC5zdGF0aW9uc1RvUGljay5pbm5lckhUTUwgPSAnSGl0dGFkZSBpbmdhIGF2Z8OlbmdhciBmw7ZyIHN0YXRpb25lbic7XG4gIH0sXG4gIHVzZXJQaWNrU3RhdGlvbjogKGRhdGEpID0+IHtcbiAgICBkYXRhLmZvckVhY2goc3RhdGlvbk5hbWUgPT4ge1xuICAgICAgZWwuc3RhdGlvbnNUb1BpY2suaW5uZXJIVE1MICs9XG4gICAgICBgPGxpIGNsYXNzPVwic3RhdGlvbnMtbGlzdFwiPiR7c3RhdGlvbk5hbWUuTmFtZX08L2xpPmA7XG4gICAgfSk7XG4gICAgZXZlbnQuY2xpY2tTdGF0aW9uTGlzdChkYXRhKTtcbiAgfSxcbiAgcmVuZGVyV2VhdGhlcjogKG5hbWUsIGljb24sIHRlbXApID0+IHtcbiAgICBlbC5pY29uLmNsYXNzTmFtZSA9ICdvd2Ygb3dmLScraWNvbisnIG93Zi01eCc7XG4gICAgZWwubmFtZS5pbm5lckhUTUwgPSBuYW1lO1xuICAgIGVsLnRlbXAuaW5uZXJIVE1MID0gdGVtcCsnICYjODQ1MTsnO1xuICB9LFxuICByZXNldFN0YXRpb25MaXN0OiAoKSA9PiB7XG4gICAgZWwuc3RhdGlvbnNUb1BpY2suaW5uZXJIVE1MID0gJyc7XG4gICAgZWwuYnVzLmlubmVySFRNTCA9ICcnO1xuICAgIGVsLnRyYW1zLmlubmVySFRNTCA9ICcnO1xuICAgIGVsLm1ldHJvLmlubmVySFRNTCA9ICcnO1xuICAgIGVsLm1ldHJvSGVhZGVyLmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICBlbC5idXNIZWFkZXIuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgIGVsLnRyYW1zSGVhZGVyLmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgfVxufTtcbiIsIi8vanNoaW50IGVzdmVyc2lvbjo2XG4vL0ltcG9ydHMgbW9kdWxlICdyZW5kZXInIGZyb20gcmVuZGVyY29tcG9uZW50LmpzXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICcuL3JlbmRlcmNvbXBvbmVudC5qcyc7XG5pbXBvcnQgeyBlbCB9IGZyb20gJy4vZWxlbWVudHMuanMnO1xuXG4vL0FQSWtleXMgZm9yIFNMXG5jb25zdCBwbGF0c3VwcHNsYWcgPSAnaHR0cHM6Ly9zbGFwaW9uZS5oZXJva3VhcHAuY29tP2tleT03ZDNjYjhiMjBmNTc0NWIyYmU1NDc0YTYyY2ZjYmNmNyZzZWFyY2hzdHJpbmc9JztcbmNvbnN0IHJlYWx0aWRzaW5mbyA9ICdodHRwczovL3NsYXBpdHdvLmhlcm9rdWFwcC5jb20/a2V5PTQ5OTJmNWEyYzM2NzQ4NDQ5OGJjYjAxYzg1ZjRjNzY2JnNpdGVpZD0nO1xuY29uc3Qgd2VhdGhlciA9ICcmQVBQSUQ9MjM5ZDFhOGEyYmIwZjQ3OTg1NzdiMjhjNGYyMjg0OWInO1xuXG4vL0V4cG9ydHMgcmVxdWVzdCBvYmplY3QgdG8gYW55IG1vZHVsZSB0aGF0IHdhbnRzIHRvIHVzZSBpdFxuZXhwb3J0IGNvbnN0IHJlcXVlc3QgPSB7XG4gIGdldElQOiAoKSA9PiB7XG4gICAgZmV0Y2goJ2h0dHA6Ly9pcC1hcGkuY29tL2pzb24vJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBsZXQgbGF0ID0gZGF0YS5sYXQ7XG4gICAgICBsZXQgbG9uID0gZGF0YS5sb247XG4gICAgICByZXF1ZXN0LndlYXRoZXJGb3JDaXR5KGxhdCwgbG9uKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG4gIH0sXG4gIHN0YXRpb25OYW1lOiAoc3RhdGlvbikgPT4ge1xuICAgIHJlbmRlci5yZXNldFN0YXRpb25MaXN0KCk7XG4gICAgZWwubG9hZGVyLmNsYXNzTmFtZSA9ICdzcGlubmVyJztcbiAgICBmZXRjaChwbGF0c3VwcHNsYWcrc3RhdGlvbisnJnN0YXRpb25zb25seT10cnVlJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBlbC5sb2FkZXIuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgICAgcmVuZGVyLnVzZXJQaWNrU3RhdGlvbihkYXRhLlJlc3BvbnNlRGF0YSk7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuICB9LFxuICByZWFsVGltZUluZm86IChpbmRleCwgZGF0YSkgPT4ge1xuICAgIGVsLmxvYWRlci5jbGFzc05hbWUgPSAnc3Bpbm5lcic7XG4gICAgZGF0YS5mb3JFYWNoKChzdGF0aW9uTmFtZSwgaSkgPT4ge1xuICAgICAgaWYoaW5kZXggPT0gaSlcbiAgICAgICAgZmV0Y2gocmVhbHRpZHNpbmZvK3N0YXRpb25OYW1lLlNpdGVJZCsnJnRpbWV3aW5kb3c9MzAnKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgIGVsLmxvYWRlci5jbGFzc05hbWUgPSAnaGlkZSc7XG4gICAgICAgICAgcmVuZGVyLnJlbmRlclN0YXRpb24oZGF0YS5SZXNwb25zZURhdGEpO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgd2VhdGhlckZvckNpdHk6IChsYXQsIGxvbikgPT4ge1xuICAgIGZldGNoKCdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0nK2xhdCsnJmxvbj0nK2xvbisnJnVuaXRzPW1ldHJpYycrd2VhdGhlcilcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBlbC5zaXRlLmNsYXNzTmFtZSA9ICdjb250YWluZXInO1xuICAgICAgbGV0IG5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICBsZXQgaWNvbiA9IGRhdGEud2VhdGhlclswXS5pZDtcbiAgICAgIGxldCB0ZW1wID0gZGF0YS5tYWluLnRlbXAudG9GaXhlZCgxKTtcbiAgICAgIHJlbmRlci5yZW5kZXJXZWF0aGVyKG5hbWUsIGljb24sIHRlbXApO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcbiAgfVxufTtcbiJdfQ==
