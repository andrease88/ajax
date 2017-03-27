(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _elements = require('../lib/elements.js');

var _requestapi = require('../lib/requestapi.js');

var _eventlistener = require('../lib/eventlistener.js');

//Slef invoked function to handle apps functions
(function () {
  (function () {
    _requestapi.request.getIP();
  })();

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

},{"../lib/elements.js":2,"../lib/eventlistener.js":3,"../lib/requestapi.js":5}],2:[function(require,module,exports){
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

},{"./requestapi.js":5}],3:[function(require,module,exports){
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

},{"./elements.js":2,"./requestapi.js":5}],4:[function(require,module,exports){
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
        _elements.el.metro.innerHTML += '<li class="stations-info">' + metros.LineNumber + ' mot ' + metros.Destination + ' ' + metros.DisplayTime + '</li>';
      });
    } else {
      _elements.el.metrosDiv.className = 'hide';
    }
    if (data.Trams.length > 0) {
      _elements.el.tramsDiv.className = 'column col-xs-12 col-md-6 col-xl-4 float-left text-center';
      _elements.el.tramsHeader.className = 'visible';
      data.Trams.forEach(function (trams) {
        _elements.el.trams.innerHTML += '<li class="stations-info">' + trams.LineNumber + ' mot ' + trams.Destination + ' ' + trams.DisplayTime + '</li>';
      });
    } else {
      _elements.el.tramsDiv.className = 'hide';
    }
    if (data.Buses.length > 0) {
      _elements.el.busDiv.className = 'column col-xs-12 col-md-6 col-xl-4 float-left text-center';
      _elements.el.busHeader.className = 'visible';
      data.Buses.forEach(function (bus) {
        _elements.el.bus.innerHTML += '<li class="stations-info">' + bus.LineNumber + ' mot ' + bus.Destination + ' ' + bus.DisplayTime + '</li>';
      });
    } else {
      _elements.el.busDiv.className = 'hide';
    }
    if (data.Metros.length < 1 && data.Trams.length < 1 && data.Buses.length < 1) _elements.el.stationsToPick.innerHTML = 'Hittade inga avgångar för stationen';
  },
  userPickStation: function userPickStation(data) {
    render.resetStationList();
    data.forEach(function (stationName) {
      _elements.el.stationsToPick.innerHTML += '<li class="stations-list">' + stationName.Name + '</li>';
    });
    _eventlistener.event.clickStationList(data);
  },
  renderWeather: function renderWeather(name, description, temp) {
    var weatherDescription = ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'shower rain', 'rain', 'thunderstorm', 'snow', 'mist'];
    weatherDescription.forEach(function (icon) {
      if (icon.includes(description)) {
        _elements.el.icon.src = '../weatherpics/' + icon + '.png';
      }
    });
    _elements.el.name.innerHTML = name;
    // el.description.innerHTML = description;
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

},{"./elements.js":2,"./eventlistener.js":3,"./requestapi.js":5}],5:[function(require,module,exports){
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
var platsuppslag = 'http://api.sl.se/api2/typeahead.json?key=7d3cb8b20f5745b2be5474a62cfcbcf7&searchstring=';
var realtidsinfo = 'http://api.sl.se/api2/realtimedeparturesV4.json?key=4992f5a2c367484498bcb01c85f4c766&siteid=';
var weather = '&APPID=239d1a8a2bb0f4798577b28c4f22849b';

//Exports request object to any module that wants to use it
var request = exports.request = {
  getIP: function getIP() {
    setTimeout(function () {
      fetch('http://ip-api.com/json/').then(function (response) {
        return response.json();
      }).then(function (data) {
        var lat = data.lat;
        var lon = data.lon;
        request.weatherForCity(lat, lon);
      }).catch(function (error) {
        console.log(error);
      });
    }, 2000);
  },
  stationName: function stationName(station) {
    _rendercomponent.render.resetStationList();
    _elements.el.loader.className = 'spinner';
    fetch(platsuppslag + station + '&stationsonly=true').then(function (response) {
      return response.json();
    }).then(function (data) {
      _elements.el.loader.className = 'hide';
      console.log(data);
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
        console.log(data);
      }).catch(function (error) {
        console.log(error);
      });
    });
  },
  weatherForCity: function weatherForCity(lat, lon) {
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric' + weather).then(function (response) {
      return response.json();
    }).then(function (data) {
      _elements.el.loadingSite.className = 'hide';
      _elements.el.site.className = 'container';
      var name = data.name;
      var description = data.weather[0].description;
      var temp = data.main.temp.toFixed(1);
      _rendercomponent.render.renderWeather(name, description, temp);
    }).catch(function (error) {
      console.log(error);
    });
  }
};

},{"./elements.js":2,"./rendercomponent.js":4}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9saWIvZWxlbWVudHMuanMiLCJzcmMvbGliL2V2ZW50bGlzdGVuZXIuanMiLCJzcmMvbGliL3JlbmRlcmNvbXBvbmVudC5qcyIsInNyYy9saWIvcmVxdWVzdGFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7QUFDQSxDQUFDLFlBQU07QUFDTCxHQUFDLFlBQU07QUFDTCx3QkFBUSxLQUFSO0FBQ0QsR0FGRDs7QUFJQSxNQUFNLE1BQU07QUFDVixrQkFBYyx3QkFBTTtBQUNsQixVQUFHLGFBQUcsYUFBSCxDQUFpQixLQUFqQixDQUF1QixJQUF2QixFQUFILEVBQ0Usb0JBQVEsV0FBUixDQUFvQixhQUFHLGFBQUgsQ0FBaUIsS0FBckM7QUFDQSxtQkFBRyxhQUFILENBQWlCLEtBQWpCLEdBQXlCLEVBQXpCO0FBQ0gsS0FMUztBQU1WLGdCQUFZLHNCQUFNO0FBQ2hCLFVBQUcsYUFBRyxVQUFILENBQWMsS0FBZCxDQUFvQixJQUFwQixFQUFILEVBQ0Usb0JBQVEsY0FBUixDQUF1QixhQUFHLFVBQUgsQ0FBYyxLQUFyQztBQUNIO0FBVFMsR0FBWjs7QUFZQSxlQUFHLGFBQUgsQ0FBaUIsU0FBakIsR0FBNkIsVUFBQyxLQUFELEVBQVc7QUFDdEMsUUFBRyxNQUFNLE9BQU4sS0FBa0IsRUFBckIsRUFDRSxJQUFJLFlBQUo7QUFDSCxHQUhEO0FBSUEsZUFBRyxtQkFBSCxDQUF1QixnQkFBdkIsQ0FBd0MsT0FBeEMsRUFBaUQsSUFBSSxZQUFyRDtBQUNBO0FBQ0E7QUFDRCxDQXhCRCxJLENBUEE7QUFDQTs7Ozs7Ozs7OztBQ0NBOztBQUVBO0FBQ08sSUFBTSxrQkFBSztBQUNoQixpQkFBZSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FEQztBQUVoQix1QkFBcUIsU0FBUyxjQUFULENBQXdCLGVBQXhC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QUFLLFlBQTFCO0FBQ0EsZ0JBQVEsR0FBUixDQUFZLElBQVo7QUFDRCxPQU5ELEVBTUcsS0FOSCxDQU1TLGlCQUFTO0FBQ2hCLGdCQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0QsT0FSRDtBQVNILEtBWEQ7QUFZRCxHQXpDb0I7QUEwQ3JCLGtCQUFnQix3QkFBQyxHQUFELEVBQU0sR0FBTixFQUFjO0FBQzVCLFVBQU0sd0RBQXNELEdBQXRELEdBQTBELE9BQTFELEdBQWtFLEdBQWxFLEdBQXNFLGVBQXRFLEdBQXNGLE9BQTVGLEVBQ0MsSUFERCxDQUNNLG9CQUFZO0FBQ2hCLGFBQU8sU0FBUyxJQUFULEVBQVA7QUFDRCxLQUhELEVBR0csSUFISCxDQUdRLGdCQUFRO0FBQ2QsbUJBQUcsV0FBSCxDQUFlLFNBQWYsR0FBMkIsTUFBM0I7QUFDQSxtQkFBRyxJQUFILENBQVEsU0FBUixHQUFvQixXQUFwQjtBQUNBLFVBQUksT0FBTyxLQUFLLElBQWhCO0FBQ0EsVUFBSSxjQUFjLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsV0FBbEM7QUFDQSxVQUFJLE9BQU8sS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLE9BQWYsQ0FBdUIsQ0FBdkIsQ0FBWDtBQUNBLDhCQUFPLGFBQVAsQ0FBcUIsSUFBckIsRUFBMkIsV0FBM0IsRUFBd0MsSUFBeEM7QUFDRCxLQVZELEVBVUcsS0FWSCxDQVVTLGlCQUFTO0FBQ2hCLGNBQVEsR0FBUixDQUFZLEtBQVo7QUFDRCxLQVpEO0FBYUQ7QUF4RG9CLENBQWhCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vanNoaW50IGVzdmVyc2lvbjo2XG4vL0ltcG9ydHMgbW9kdWxlc1xuaW1wb3J0IHsgZWwgfSBmcm9tICcuLi9saWIvZWxlbWVudHMuanMnO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uL2xpYi9yZXF1ZXN0YXBpLmpzJztcbmltcG9ydCB7IGV2ZW50IH0gZnJvbSAnLi4vbGliL2V2ZW50bGlzdGVuZXIuanMnO1xuXG4vL1NsZWYgaW52b2tlZCBmdW5jdGlvbiB0byBoYW5kbGUgYXBwcyBmdW5jdGlvbnNcbigoKSA9PiB7XG4gICgoKSA9PiB7XG4gICAgcmVxdWVzdC5nZXRJUCgpO1xuICB9KSgpO1xuXG4gIGNvbnN0IGFwcCA9IHtcbiAgICBzZWFyY2hTdGFpb246ICgpID0+IHtcbiAgICAgIGlmKGVsLnN0YXRpb25TZWFyY2gudmFsdWUudHJpbSgpKVxuICAgICAgICByZXF1ZXN0LnN0YXRpb25OYW1lKGVsLnN0YXRpb25TZWFyY2gudmFsdWUpO1xuICAgICAgICBlbC5zdGF0aW9uU2VhcmNoLnZhbHVlID0gJyc7XG4gICAgfSxcbiAgICBzZWFyY2hDaXR5OiAoKSA9PiB7XG4gICAgICBpZihlbC5jaXR5U2VhcmNoLnZhbHVlLnRyaW0oKSlcbiAgICAgICAgcmVxdWVzdC53ZWF0aGVyRm9yQ2l0eShlbC5jaXR5U2VhcmNoLnZhbHVlKTtcbiAgICB9XG4gIH07XG5cbiAgZWwuc3RhdGlvblNlYXJjaC5vbmtleWRvd24gPSAoZXZlbnQpID0+IHtcbiAgICBpZihldmVudC5rZXlDb2RlID09PSAxMylcbiAgICAgIGFwcC5zZWFyY2hTdGFpb24oKTtcbiAgfTtcbiAgZWwuc3RhdGlvblNlYXJjaFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFwcC5zZWFyY2hTdGFpb24pO1xuICAvLyBldmVudC5jbGljayhlbC5zdGF0aW9uU2VhcmNoU3VibWl0KTtcbiAgLy8gZXZlbnQua2V5KGVsLnN0YXRpb25TZWFyY2gpO1xufSkoKTtcbiIsIi8vanNoaW50IGVzdmVyc2lvbjo2XG4vL0ltcG9ydHMgbW9kdWxlICdyZXF1ZXN0JyBmcm9tIHJlcXVlc3RhcGkuanNcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuL3JlcXVlc3RhcGkuanMnO1xuXG4vL0V4cG9ydHMgYWxsIGVsZW1lbnRzIGZyb20gSFRNTCB0byBhbnkgbW9kdWxlIHRoYXQgd2FudHMgdG8gdXNlIGl0XG5leHBvcnQgY29uc3QgZWwgPSB7XG4gIHN0YXRpb25TZWFyY2g6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gnKSxcbiAgc3RhdGlvblNlYXJjaFN1Ym1pdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1zZWFyY2gnKSxcbiAgc3RhdGlvbnNUb1BpY2s6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGF0aW9ucy10by1waWNrJyksXG4gIHN0YXRpb25zTGlzdDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3RhdGlvbnMtbGlzdCcpLFxuICBtZXRybzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21ldHJvJyksXG4gIG1ldHJvSGVhZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWV0cm8taGVhZGVyJyksXG4gIHRyYW1zOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhbXMnKSxcbiAgdHJhbXNIZWFkZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFtcy1oZWFkZXInKSxcbiAgYnVzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnVzJyksXG4gIHRyYWluc0hlYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWlucy1oZWFkZXInKSxcbiAgdHJhaW5zOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5zJyksXG4gIGJ1c0hlYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1cy1oZWFkZXInKSxcbiAgbG9hZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGVyJyksXG4gIGxvYWRlcldlYXRoZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkZXItd2VhdGhlcicpLFxuICBjaXR5U2VhcmNoOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eS1zZWFyY2gnKSxcbiAgY2l0eVNlYXJjaFN1Ym1pdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1jaXR5LXNlYXJjaCcpLFxuICB0ZW1wOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcCcpLFxuICBuYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpLFxuICBkZXNjcmlwdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJyksXG4gIG1ldHJvc0RpdjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21ldHJvcy1kaXYnKSxcbiAgdHJhbXNEaXY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFtcy1kaXYnKSxcbiAgYnVzRGl2OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnVzLWRpdicpLFxuICBpY29uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbicpLFxuICBsb2FkaW5nU2l0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRpbmctc2l0ZScpLFxuICBzaXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2l0ZScpXG5cbn07XG4iLCIvL2pzaGludCBlc3ZlcnNpb246NlxuaW1wb3J0IHsgZWwgfSBmcm9tICcuL2VsZW1lbnRzLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuL3JlcXVlc3RhcGkuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBldmVudCA9IHtcbiAgY2xpY2tTdGF0aW9uTGlzdDogKGRhdGEpID0+IHtcbiAgICBsZXQgc3RhdGlvbnMgPSBBcnJheS5mcm9tKGVsLnN0YXRpb25zTGlzdCk7XG4gICAgc3RhdGlvbnMuZm9yRWFjaCgoc3RhdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgIHN0YXRpb24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZWwuc3RhdGlvbnNUb1BpY2suaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJlcXVlc3QucmVhbFRpbWVJbmZvKGluZGV4LCBkYXRhKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sXG4gIC8vIGtleTogKGVsZW1lbnQpID0+IHtcbiAgLy8gICBlbGVtZW50Lm9ua2V5ZG93biA9IChldmVudCkgPT4ge1xuICAvLyAgICAgaWYoZXZlbnQua2V5Q29kZSA9PT0gMTMpe1xuICAvLyAgICAgICByZXF1ZXN0LnN0YXRpb25OYW1lKGVsZW1lbnQudmFsdWUudHJpbSgpKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9O1xuICAvLyB9LFxuICAvLyBjbGljazogKGVsZW1lbnQpID0+IHtcbiAgLy8gICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVxdWVzdC5zdGF0aW9uTmFtZShlbC5zdGF0aW9uU2VhcmNoLnZhbHVlKSk7XG4gIC8vIH1cbn07XG4iLCIvL2pzaGludCBlc3ZlcnNpb246NlxuaW1wb3J0IHsgZWwgfSBmcm9tICcuL2VsZW1lbnRzLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuL3JlcXVlc3RhcGkuanMnO1xuaW1wb3J0IHsgZXZlbnQgfSBmcm9tICcuL2V2ZW50bGlzdGVuZXIuanMnO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyID0ge1xuICByZW5kZXJTdGF0aW9uOiAoZGF0YSkgPT4ge1xuICAgIGVsLnN0YXRpb25zVG9QaWNrLmlubmVySFRNTCA9ICcnO1xuICAgIGlmKGRhdGEuTWV0cm9zLmxlbmd0aCA+IDApe1xuICAgICAgZWwubWV0cm9zRGl2LmNsYXNzTmFtZSA9ICdjb2x1bW4gY29sLXhzLTEyIGNvbC1tZC02IGNvbC14bC00IGZsb2F0LWxlZnQgdGV4dC1jZW50ZXInO1xuICAgICAgZWwubWV0cm9IZWFkZXIuY2xhc3NOYW1lID0gJ3Zpc2libGUnO1xuICAgICAgZGF0YS5NZXRyb3MuZm9yRWFjaChtZXRyb3MgPT4ge1xuICAgICAgICBlbC5tZXRyby5pbm5lckhUTUwgKz1cbiAgICAgICAgYDxsaSBjbGFzcz1cInN0YXRpb25zLWluZm9cIj4ke21ldHJvcy5MaW5lTnVtYmVyfSBtb3QgJHttZXRyb3MuRGVzdGluYXRpb259ICR7bWV0cm9zLkRpc3BsYXlUaW1lfTwvbGk+YDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5tZXRyb3NEaXYuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgIH1cbiAgICBpZihkYXRhLlRyYW1zLmxlbmd0aCA+IDApe1xuICAgICAgZWwudHJhbXNEaXYuY2xhc3NOYW1lID0gJ2NvbHVtbiBjb2wteHMtMTIgY29sLW1kLTYgY29sLXhsLTQgZmxvYXQtbGVmdCB0ZXh0LWNlbnRlcic7XG4gICAgICBlbC50cmFtc0hlYWRlci5jbGFzc05hbWUgPSAndmlzaWJsZSc7XG4gICAgICBkYXRhLlRyYW1zLmZvckVhY2godHJhbXMgPT4ge1xuICAgICAgICBlbC50cmFtcy5pbm5lckhUTUwgKz1cbiAgICAgICAgYDxsaSBjbGFzcz1cInN0YXRpb25zLWluZm9cIj4ke3RyYW1zLkxpbmVOdW1iZXJ9IG1vdCAke3RyYW1zLkRlc3RpbmF0aW9ufSAke3RyYW1zLkRpc3BsYXlUaW1lfTwvbGk+YDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC50cmFtc0Rpdi5jbGFzc05hbWUgPSAnaGlkZSc7XG4gICAgfVxuICAgIGlmKGRhdGEuQnVzZXMubGVuZ3RoID4gMCl7XG4gICAgICBlbC5idXNEaXYuY2xhc3NOYW1lID0gJ2NvbHVtbiBjb2wteHMtMTIgY29sLW1kLTYgY29sLXhsLTQgZmxvYXQtbGVmdCB0ZXh0LWNlbnRlcic7XG4gICAgICBlbC5idXNIZWFkZXIuY2xhc3NOYW1lID0gJ3Zpc2libGUnO1xuICAgICAgZGF0YS5CdXNlcy5mb3JFYWNoKGJ1cyA9PiB7XG4gICAgICAgIGVsLmJ1cy5pbm5lckhUTUwgKz1cbiAgICAgICAgYDxsaSBjbGFzcz1cInN0YXRpb25zLWluZm9cIj4ke2J1cy5MaW5lTnVtYmVyfSBtb3QgJHtidXMuRGVzdGluYXRpb259ICR7YnVzLkRpc3BsYXlUaW1lfTwvbGk+YDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5idXNEaXYuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgIH1cbiAgICBpZihkYXRhLk1ldHJvcy5sZW5ndGggPCAxICYmIGRhdGEuVHJhbXMubGVuZ3RoIDwgMSAmJiBkYXRhLkJ1c2VzLmxlbmd0aCA8IDEpXG4gICAgICBlbC5zdGF0aW9uc1RvUGljay5pbm5lckhUTUwgPSAnSGl0dGFkZSBpbmdhIGF2Z8OlbmdhciBmw7ZyIHN0YXRpb25lbic7XG4gIH0sXG4gIHVzZXJQaWNrU3RhdGlvbjogKGRhdGEpID0+IHtcbiAgICByZW5kZXIucmVzZXRTdGF0aW9uTGlzdCgpO1xuICAgIGRhdGEuZm9yRWFjaChzdGF0aW9uTmFtZSA9PiB7XG4gICAgICBlbC5zdGF0aW9uc1RvUGljay5pbm5lckhUTUwgKz1cbiAgICAgIGA8bGkgY2xhc3M9XCJzdGF0aW9ucy1saXN0XCI+JHtzdGF0aW9uTmFtZS5OYW1lfTwvbGk+YDtcbiAgICB9KTtcbiAgICBldmVudC5jbGlja1N0YXRpb25MaXN0KGRhdGEpO1xuICB9LFxuICByZW5kZXJXZWF0aGVyOiAobmFtZSwgZGVzY3JpcHRpb24sIHRlbXApID0+IHtcbiAgICBsZXQgd2VhdGhlckRlc2NyaXB0aW9uID0gW1xuICAgICAgJ2NsZWFyIHNreScsXG4gICAgICAnZmV3IGNsb3VkcycsXG4gICAgICAnc2NhdHRlcmVkIGNsb3VkcycsXG4gICAgICAnYnJva2VuIGNsb3VkcycsXG4gICAgICAnc2hvd2VyIHJhaW4nLFxuICAgICAgJ3JhaW4nLFxuICAgICAgJ3RodW5kZXJzdG9ybScsXG4gICAgICAnc25vdycsXG4gICAgICAnbWlzdCdcbiAgICBdO1xuICAgIHdlYXRoZXJEZXNjcmlwdGlvbi5mb3JFYWNoKGljb24gPT4ge1xuICAgICAgaWYoaWNvbi5pbmNsdWRlcyhkZXNjcmlwdGlvbikpe1xuICAgICAgICBlbC5pY29uLnNyYyA9ICcuLi93ZWF0aGVycGljcy8nK2ljb24rJy5wbmcnO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGVsLm5hbWUuaW5uZXJIVE1MID0gbmFtZTtcbiAgICAvLyBlbC5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBkZXNjcmlwdGlvbjtcbiAgICBlbC50ZW1wLmlubmVySFRNTCA9IHRlbXArJyAmIzg0NTE7JztcbiAgfSxcbiAgcmVzZXRTdGF0aW9uTGlzdDogKCkgPT4ge1xuICAgIGVsLnN0YXRpb25zVG9QaWNrLmlubmVySFRNTCA9ICcnO1xuICAgIGVsLmJ1cy5pbm5lckhUTUwgPSAnJztcbiAgICBlbC50cmFtcy5pbm5lckhUTUwgPSAnJztcbiAgICBlbC5tZXRyby5pbm5lckhUTUwgPSAnJztcbiAgICBlbC5tZXRyb0hlYWRlci5jbGFzc05hbWUgPSAnaGlkZSc7XG4gICAgZWwuYnVzSGVhZGVyLmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICBlbC50cmFtc0hlYWRlci5jbGFzc05hbWUgPSAnaGlkZSc7XG4gIH1cbn07XG4iLCIvL2pzaGludCBlc3ZlcnNpb246NlxuLy9JbXBvcnRzIG1vZHVsZSAncmVuZGVyJyBmcm9tIHJlbmRlcmNvbXBvbmVudC5qc1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnLi9yZW5kZXJjb21wb25lbnQuanMnO1xuaW1wb3J0IHsgZWwgfSBmcm9tICcuL2VsZW1lbnRzLmpzJztcblxuLy9BUElrZXlzIGZvciBTTFxuY29uc3QgcGxhdHN1cHBzbGFnID0gJ2h0dHA6Ly9hcGkuc2wuc2UvYXBpMi90eXBlYWhlYWQuanNvbj9rZXk9N2QzY2I4YjIwZjU3NDViMmJlNTQ3NGE2MmNmY2JjZjcmc2VhcmNoc3RyaW5nPSc7XG5jb25zdCByZWFsdGlkc2luZm8gPSAnaHR0cDovL2FwaS5zbC5zZS9hcGkyL3JlYWx0aW1lZGVwYXJ0dXJlc1Y0Lmpzb24/a2V5PTQ5OTJmNWEyYzM2NzQ4NDQ5OGJjYjAxYzg1ZjRjNzY2JnNpdGVpZD0nO1xuY29uc3Qgd2VhdGhlciA9ICcmQVBQSUQ9MjM5ZDFhOGEyYmIwZjQ3OTg1NzdiMjhjNGYyMjg0OWInO1xuXG4vL0V4cG9ydHMgcmVxdWVzdCBvYmplY3QgdG8gYW55IG1vZHVsZSB0aGF0IHdhbnRzIHRvIHVzZSBpdFxuZXhwb3J0IGNvbnN0IHJlcXVlc3QgPSB7XG4gIGdldElQOiAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBmZXRjaCgnaHR0cDovL2lwLWFwaS5jb20vanNvbi8nKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGxldCBsYXQgPSBkYXRhLmxhdDtcbiAgICAgICAgbGV0IGxvbiA9IGRhdGEubG9uO1xuICAgICAgICByZXF1ZXN0LndlYXRoZXJGb3JDaXR5KGxhdCwgbG9uKTtcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSwgMjAwMCk7XG4gIH0sXG4gIHN0YXRpb25OYW1lOiAoc3RhdGlvbikgPT4ge1xuICAgIHJlbmRlci5yZXNldFN0YXRpb25MaXN0KCk7XG4gICAgZWwubG9hZGVyLmNsYXNzTmFtZSA9ICdzcGlubmVyJztcbiAgICBmZXRjaChwbGF0c3VwcHNsYWcrc3RhdGlvbisnJnN0YXRpb25zb25seT10cnVlJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBlbC5sb2FkZXIuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICByZW5kZXIudXNlclBpY2tTdGF0aW9uKGRhdGEuUmVzcG9uc2VEYXRhKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG4gIH0sXG4gIHJlYWxUaW1lSW5mbzogKGluZGV4LCBkYXRhKSA9PiB7XG4gICAgZWwubG9hZGVyLmNsYXNzTmFtZSA9ICdzcGlubmVyJztcbiAgICBkYXRhLmZvckVhY2goKHN0YXRpb25OYW1lLCBpKSA9PiB7XG4gICAgICBpZihpbmRleCA9PSBpKVxuICAgICAgICBmZXRjaChyZWFsdGlkc2luZm8rc3RhdGlvbk5hbWUuU2l0ZUlkKycmdGltZXdpbmRvdz0zMCcpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgZWwubG9hZGVyLmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICAgICAgICByZW5kZXIucmVuZGVyU3RhdGlvbihkYXRhLlJlc3BvbnNlRGF0YSk7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICB3ZWF0aGVyRm9yQ2l0eTogKGxhdCwgbG9uKSA9PiB7XG4gICAgZmV0Y2goJ2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PScrbGF0KycmbG9uPScrbG9uKycmdW5pdHM9bWV0cmljJyt3ZWF0aGVyKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgIGVsLmxvYWRpbmdTaXRlLmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICAgIGVsLnNpdGUuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG4gICAgICBsZXQgbmFtZSA9IGRhdGEubmFtZTtcbiAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICAgIGxldCB0ZW1wID0gZGF0YS5tYWluLnRlbXAudG9GaXhlZCgxKTtcbiAgICAgIHJlbmRlci5yZW5kZXJXZWF0aGVyKG5hbWUsIGRlc2NyaXB0aW9uLCB0ZW1wKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG4gIH1cbn07XG4iXX0=
