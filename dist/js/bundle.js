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
        _elements.el.icon.src = 'weatherpics/' + icon + '.png';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9saWIvZWxlbWVudHMuanMiLCJzcmMvbGliL2V2ZW50bGlzdGVuZXIuanMiLCJzcmMvbGliL3JlbmRlcmNvbXBvbmVudC5qcyIsInNyYy9saWIvcmVxdWVzdGFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7QUFDQSxDQUFDLFlBQU07QUFDTCxHQUFDLFlBQU07QUFDTCx3QkFBUSxLQUFSO0FBQ0QsR0FGRDs7QUFJQSxNQUFNLE1BQU07QUFDVixrQkFBYyx3QkFBTTtBQUNsQixVQUFHLGFBQUcsYUFBSCxDQUFpQixLQUFqQixDQUF1QixJQUF2QixFQUFILEVBQ0Usb0JBQVEsV0FBUixDQUFvQixhQUFHLGFBQUgsQ0FBaUIsS0FBckM7QUFDQSxtQkFBRyxhQUFILENBQWlCLEtBQWpCLEdBQXlCLEVBQXpCO0FBQ0gsS0FMUztBQU1WLGdCQUFZLHNCQUFNO0FBQ2hCLFVBQUcsYUFBRyxVQUFILENBQWMsS0FBZCxDQUFvQixJQUFwQixFQUFILEVBQ0Usb0JBQVEsY0FBUixDQUF1QixhQUFHLFVBQUgsQ0FBYyxLQUFyQztBQUNIO0FBVFMsR0FBWjs7QUFZQSxlQUFHLGFBQUgsQ0FBaUIsU0FBakIsR0FBNkIsVUFBQyxLQUFELEVBQVc7QUFDdEMsUUFBRyxNQUFNLE9BQU4sS0FBa0IsRUFBckIsRUFDRSxJQUFJLFlBQUo7QUFDSCxHQUhEO0FBSUEsZUFBRyxtQkFBSCxDQUF1QixnQkFBdkIsQ0FBd0MsT0FBeEMsRUFBaUQsSUFBSSxZQUFyRDtBQUNBO0FBQ0E7QUFDRCxDQXhCRCxJLENBUEE7QUFDQTs7Ozs7Ozs7OztBQ0NBOztBQUVBO0FBQ08sSUFBTSxrQkFBSztBQUNoQixpQkFBZSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FEQztBQUVoQix1QkFBcUIsU0FBUyxjQUFULENBQXdCLGVBQXhC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SyxZQUExQjtBQUNBLGdCQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0QsT0FORCxFQU1HLEtBTkgsQ0FNUyxpQkFBUztBQUNoQixnQkFBUSxHQUFSLENBQVksS0FBWjtBQUNELE9BUkQ7QUFTSCxLQVhEO0FBWUQsR0F6Q29CO0FBMENyQixrQkFBZ0Isd0JBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUM1QixVQUFNLHdEQUFzRCxHQUF0RCxHQUEwRCxPQUExRCxHQUFrRSxHQUFsRSxHQUFzRSxlQUF0RSxHQUFzRixPQUE1RixFQUNDLElBREQsQ0FDTSxvQkFBWTtBQUNoQixhQUFPLFNBQVMsSUFBVCxFQUFQO0FBQ0QsS0FIRCxFQUdHLElBSEgsQ0FHUSxnQkFBUTtBQUNkLG1CQUFHLFdBQUgsQ0FBZSxTQUFmLEdBQTJCLE1BQTNCO0FBQ0EsbUJBQUcsSUFBSCxDQUFRLFNBQVIsR0FBb0IsV0FBcEI7QUFDQSxVQUFJLE9BQU8sS0FBSyxJQUFoQjtBQUNBLFVBQUksY0FBYyxLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLFdBQWxDO0FBQ0EsVUFBSSxPQUFPLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxPQUFmLENBQXVCLENBQXZCLENBQVg7QUFDQSw4QkFBTyxhQUFQLENBQXFCLElBQXJCLEVBQTJCLFdBQTNCLEVBQXdDLElBQXhDO0FBQ0QsS0FWRCxFQVVHLEtBVkgsQ0FVUyxpQkFBUztBQUNoQixjQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0QsS0FaRDtBQWFEO0FBeERvQixDQUFoQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL2pzaGludCBlc3ZlcnNpb246NlxuLy9JbXBvcnRzIG1vZHVsZXNcbmltcG9ydCB7IGVsIH0gZnJvbSAnLi4vbGliL2VsZW1lbnRzLmpzJztcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi9saWIvcmVxdWVzdGFwaS5qcyc7XG5pbXBvcnQgeyBldmVudCB9IGZyb20gJy4uL2xpYi9ldmVudGxpc3RlbmVyLmpzJztcblxuLy9TbGVmIGludm9rZWQgZnVuY3Rpb24gdG8gaGFuZGxlIGFwcHMgZnVuY3Rpb25zXG4oKCkgPT4ge1xuICAoKCkgPT4ge1xuICAgIHJlcXVlc3QuZ2V0SVAoKTtcbiAgfSkoKTtcblxuICBjb25zdCBhcHAgPSB7XG4gICAgc2VhcmNoU3RhaW9uOiAoKSA9PiB7XG4gICAgICBpZihlbC5zdGF0aW9uU2VhcmNoLnZhbHVlLnRyaW0oKSlcbiAgICAgICAgcmVxdWVzdC5zdGF0aW9uTmFtZShlbC5zdGF0aW9uU2VhcmNoLnZhbHVlKTtcbiAgICAgICAgZWwuc3RhdGlvblNlYXJjaC52YWx1ZSA9ICcnO1xuICAgIH0sXG4gICAgc2VhcmNoQ2l0eTogKCkgPT4ge1xuICAgICAgaWYoZWwuY2l0eVNlYXJjaC52YWx1ZS50cmltKCkpXG4gICAgICAgIHJlcXVlc3Qud2VhdGhlckZvckNpdHkoZWwuY2l0eVNlYXJjaC52YWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGVsLnN0YXRpb25TZWFyY2gub25rZXlkb3duID0gKGV2ZW50KSA9PiB7XG4gICAgaWYoZXZlbnQua2V5Q29kZSA9PT0gMTMpXG4gICAgICBhcHAuc2VhcmNoU3RhaW9uKCk7XG4gIH07XG4gIGVsLnN0YXRpb25TZWFyY2hTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhcHAuc2VhcmNoU3RhaW9uKTtcbiAgLy8gZXZlbnQuY2xpY2soZWwuc3RhdGlvblNlYXJjaFN1Ym1pdCk7XG4gIC8vIGV2ZW50LmtleShlbC5zdGF0aW9uU2VhcmNoKTtcbn0pKCk7XG4iLCIvL2pzaGludCBlc3ZlcnNpb246NlxuLy9JbXBvcnRzIG1vZHVsZSAncmVxdWVzdCcgZnJvbSByZXF1ZXN0YXBpLmpzXG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0YXBpLmpzJztcblxuLy9FeHBvcnRzIGFsbCBlbGVtZW50cyBmcm9tIEhUTUwgdG8gYW55IG1vZHVsZSB0aGF0IHdhbnRzIHRvIHVzZSBpdFxuZXhwb3J0IGNvbnN0IGVsID0ge1xuICBzdGF0aW9uU2VhcmNoOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJyksXG4gIHN0YXRpb25TZWFyY2hTdWJtaXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQtc2VhcmNoJyksXG4gIHN0YXRpb25zVG9QaWNrOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdGlvbnMtdG8tcGljaycpLFxuICBzdGF0aW9uc0xpc3Q6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N0YXRpb25zLWxpc3QnKSxcbiAgbWV0cm86IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXRybycpLFxuICBtZXRyb0hlYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21ldHJvLWhlYWRlcicpLFxuICB0cmFtczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYW1zJyksXG4gIHRyYW1zSGVhZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhbXMtaGVhZGVyJyksXG4gIGJ1czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1cycpLFxuICB0cmFpbnNIZWFkZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbnMtaGVhZGVyJyksXG4gIHRyYWluczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWlucycpLFxuICBidXNIZWFkZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXMtaGVhZGVyJyksXG4gIGxvYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRlcicpLFxuICBsb2FkZXJXZWF0aGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGVyLXdlYXRoZXInKSxcbiAgY2l0eVNlYXJjaDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHktc2VhcmNoJyksXG4gIGNpdHlTZWFyY2hTdWJtaXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQtY2l0eS1zZWFyY2gnKSxcbiAgdGVtcDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbXAnKSxcbiAgbmFtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKSxcbiAgZGVzY3JpcHRpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpLFxuICBtZXRyb3NEaXY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXRyb3MtZGl2JyksXG4gIHRyYW1zRGl2OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhbXMtZGl2JyksXG4gIGJ1c0RpdjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1cy1kaXYnKSxcbiAgaWNvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ljb24nKSxcbiAgbG9hZGluZ1NpdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkaW5nLXNpdGUnKSxcbiAgc2l0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpdGUnKVxuXG59O1xuIiwiLy9qc2hpbnQgZXN2ZXJzaW9uOjZcbmltcG9ydCB7IGVsIH0gZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0YXBpLmpzJztcblxuXG5leHBvcnQgY29uc3QgZXZlbnQgPSB7XG4gIGNsaWNrU3RhdGlvbkxpc3Q6IChkYXRhKSA9PiB7XG4gICAgbGV0IHN0YXRpb25zID0gQXJyYXkuZnJvbShlbC5zdGF0aW9uc0xpc3QpO1xuICAgIHN0YXRpb25zLmZvckVhY2goKHN0YXRpb24sIGluZGV4KSA9PiB7XG4gICAgICBzdGF0aW9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGVsLnN0YXRpb25zVG9QaWNrLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXF1ZXN0LnJlYWxUaW1lSW5mbyhpbmRleCwgZGF0YSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9LFxuICAvLyBrZXk6IChlbGVtZW50KSA9PiB7XG4gIC8vICAgZWxlbWVudC5vbmtleWRvd24gPSAoZXZlbnQpID0+IHtcbiAgLy8gICAgIGlmKGV2ZW50LmtleUNvZGUgPT09IDEzKXtcbiAgLy8gICAgICAgcmVxdWVzdC5zdGF0aW9uTmFtZShlbGVtZW50LnZhbHVlLnRyaW0oKSk7XG4gIC8vICAgICB9XG4gIC8vICAgfTtcbiAgLy8gfSxcbiAgLy8gY2xpY2s6IChlbGVtZW50KSA9PiB7XG4gIC8vICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcXVlc3Quc3RhdGlvbk5hbWUoZWwuc3RhdGlvblNlYXJjaC52YWx1ZSkpO1xuICAvLyB9XG59O1xuIiwiLy9qc2hpbnQgZXN2ZXJzaW9uOjZcbmltcG9ydCB7IGVsIH0gZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0YXBpLmpzJztcbmltcG9ydCB7IGV2ZW50IH0gZnJvbSAnLi9ldmVudGxpc3RlbmVyLmpzJztcblxuZXhwb3J0IGNvbnN0IHJlbmRlciA9IHtcbiAgcmVuZGVyU3RhdGlvbjogKGRhdGEpID0+IHtcbiAgICBlbC5zdGF0aW9uc1RvUGljay5pbm5lckhUTUwgPSAnJztcbiAgICBpZihkYXRhLk1ldHJvcy5sZW5ndGggPiAwKXtcbiAgICAgIGVsLm1ldHJvc0Rpdi5jbGFzc05hbWUgPSAnY29sdW1uIGNvbC14cy0xMiBjb2wtbWQtNiBjb2wteGwtNCBmbG9hdC1sZWZ0IHRleHQtY2VudGVyJztcbiAgICAgIGVsLm1ldHJvSGVhZGVyLmNsYXNzTmFtZSA9ICd2aXNpYmxlJztcbiAgICAgIGRhdGEuTWV0cm9zLmZvckVhY2gobWV0cm9zID0+IHtcbiAgICAgICAgZWwubWV0cm8uaW5uZXJIVE1MICs9XG4gICAgICAgIGA8bGkgY2xhc3M9XCJzdGF0aW9ucy1pbmZvXCI+JHttZXRyb3MuTGluZU51bWJlcn0gbW90ICR7bWV0cm9zLkRlc3RpbmF0aW9ufSAke21ldHJvcy5EaXNwbGF5VGltZX08L2xpPmA7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwubWV0cm9zRGl2LmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICB9XG4gICAgaWYoZGF0YS5UcmFtcy5sZW5ndGggPiAwKXtcbiAgICAgIGVsLnRyYW1zRGl2LmNsYXNzTmFtZSA9ICdjb2x1bW4gY29sLXhzLTEyIGNvbC1tZC02IGNvbC14bC00IGZsb2F0LWxlZnQgdGV4dC1jZW50ZXInO1xuICAgICAgZWwudHJhbXNIZWFkZXIuY2xhc3NOYW1lID0gJ3Zpc2libGUnO1xuICAgICAgZGF0YS5UcmFtcy5mb3JFYWNoKHRyYW1zID0+IHtcbiAgICAgICAgZWwudHJhbXMuaW5uZXJIVE1MICs9XG4gICAgICAgIGA8bGkgY2xhc3M9XCJzdGF0aW9ucy1pbmZvXCI+JHt0cmFtcy5MaW5lTnVtYmVyfSBtb3QgJHt0cmFtcy5EZXN0aW5hdGlvbn0gJHt0cmFtcy5EaXNwbGF5VGltZX08L2xpPmA7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwudHJhbXNEaXYuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgIH1cbiAgICBpZihkYXRhLkJ1c2VzLmxlbmd0aCA+IDApe1xuICAgICAgZWwuYnVzRGl2LmNsYXNzTmFtZSA9ICdjb2x1bW4gY29sLXhzLTEyIGNvbC1tZC02IGNvbC14bC00IGZsb2F0LWxlZnQgdGV4dC1jZW50ZXInO1xuICAgICAgZWwuYnVzSGVhZGVyLmNsYXNzTmFtZSA9ICd2aXNpYmxlJztcbiAgICAgIGRhdGEuQnVzZXMuZm9yRWFjaChidXMgPT4ge1xuICAgICAgICBlbC5idXMuaW5uZXJIVE1MICs9XG4gICAgICAgIGA8bGkgY2xhc3M9XCJzdGF0aW9ucy1pbmZvXCI+JHtidXMuTGluZU51bWJlcn0gbW90ICR7YnVzLkRlc3RpbmF0aW9ufSAke2J1cy5EaXNwbGF5VGltZX08L2xpPmA7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuYnVzRGl2LmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICB9XG4gICAgaWYoZGF0YS5NZXRyb3MubGVuZ3RoIDwgMSAmJiBkYXRhLlRyYW1zLmxlbmd0aCA8IDEgJiYgZGF0YS5CdXNlcy5sZW5ndGggPCAxKVxuICAgICAgZWwuc3RhdGlvbnNUb1BpY2suaW5uZXJIVE1MID0gJ0hpdHRhZGUgaW5nYSBhdmfDpW5nYXIgZsO2ciBzdGF0aW9uZW4nO1xuICB9LFxuICB1c2VyUGlja1N0YXRpb246IChkYXRhKSA9PiB7XG4gICAgcmVuZGVyLnJlc2V0U3RhdGlvbkxpc3QoKTtcbiAgICBkYXRhLmZvckVhY2goc3RhdGlvbk5hbWUgPT4ge1xuICAgICAgZWwuc3RhdGlvbnNUb1BpY2suaW5uZXJIVE1MICs9XG4gICAgICBgPGxpIGNsYXNzPVwic3RhdGlvbnMtbGlzdFwiPiR7c3RhdGlvbk5hbWUuTmFtZX08L2xpPmA7XG4gICAgfSk7XG4gICAgZXZlbnQuY2xpY2tTdGF0aW9uTGlzdChkYXRhKTtcbiAgfSxcbiAgcmVuZGVyV2VhdGhlcjogKG5hbWUsIGRlc2NyaXB0aW9uLCB0ZW1wKSA9PiB7XG4gICAgbGV0IHdlYXRoZXJEZXNjcmlwdGlvbiA9IFtcbiAgICAgICdjbGVhciBza3knLFxuICAgICAgJ2ZldyBjbG91ZHMnLFxuICAgICAgJ3NjYXR0ZXJlZCBjbG91ZHMnLFxuICAgICAgJ2Jyb2tlbiBjbG91ZHMnLFxuICAgICAgJ3Nob3dlciByYWluJyxcbiAgICAgICdyYWluJyxcbiAgICAgICd0aHVuZGVyc3Rvcm0nLFxuICAgICAgJ3Nub3cnLFxuICAgICAgJ21pc3QnXG4gICAgXTtcbiAgICB3ZWF0aGVyRGVzY3JpcHRpb24uZm9yRWFjaChpY29uID0+IHtcbiAgICAgIGlmKGljb24uaW5jbHVkZXMoZGVzY3JpcHRpb24pKXtcbiAgICAgICAgZWwuaWNvbi5zcmMgPSAnd2VhdGhlcnBpY3MvJytpY29uKycucG5nJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBlbC5uYW1lLmlubmVySFRNTCA9IG5hbWU7XG4gICAgLy8gZWwuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gZGVzY3JpcHRpb247XG4gICAgZWwudGVtcC5pbm5lckhUTUwgPSB0ZW1wKycgJiM4NDUxOyc7XG4gIH0sXG4gIHJlc2V0U3RhdGlvbkxpc3Q6ICgpID0+IHtcbiAgICBlbC5zdGF0aW9uc1RvUGljay5pbm5lckhUTUwgPSAnJztcbiAgICBlbC5idXMuaW5uZXJIVE1MID0gJyc7XG4gICAgZWwudHJhbXMuaW5uZXJIVE1MID0gJyc7XG4gICAgZWwubWV0cm8uaW5uZXJIVE1MID0gJyc7XG4gICAgZWwubWV0cm9IZWFkZXIuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgIGVsLmJ1c0hlYWRlci5jbGFzc05hbWUgPSAnaGlkZSc7XG4gICAgZWwudHJhbXNIZWFkZXIuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICB9XG59O1xuIiwiLy9qc2hpbnQgZXN2ZXJzaW9uOjZcbi8vSW1wb3J0cyBtb2R1bGUgJ3JlbmRlcicgZnJvbSByZW5kZXJjb21wb25lbnQuanNcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJy4vcmVuZGVyY29tcG9uZW50LmpzJztcbmltcG9ydCB7IGVsIH0gZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5cbi8vQVBJa2V5cyBmb3IgU0xcbmNvbnN0IHBsYXRzdXBwc2xhZyA9ICdodHRwOi8vYXBpLnNsLnNlL2FwaTIvdHlwZWFoZWFkLmpzb24/a2V5PTdkM2NiOGIyMGY1NzQ1YjJiZTU0NzRhNjJjZmNiY2Y3JnNlYXJjaHN0cmluZz0nO1xuY29uc3QgcmVhbHRpZHNpbmZvID0gJ2h0dHA6Ly9hcGkuc2wuc2UvYXBpMi9yZWFsdGltZWRlcGFydHVyZXNWNC5qc29uP2tleT00OTkyZjVhMmMzNjc0ODQ0OThiY2IwMWM4NWY0Yzc2NiZzaXRlaWQ9JztcbmNvbnN0IHdlYXRoZXIgPSAnJkFQUElEPTIzOWQxYThhMmJiMGY0Nzk4NTc3YjI4YzRmMjI4NDliJztcblxuLy9FeHBvcnRzIHJlcXVlc3Qgb2JqZWN0IHRvIGFueSBtb2R1bGUgdGhhdCB3YW50cyB0byB1c2UgaXRcbmV4cG9ydCBjb25zdCByZXF1ZXN0ID0ge1xuICBnZXRJUDogKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZmV0Y2goJ2h0dHA6Ly9pcC1hcGkuY29tL2pzb24vJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBsZXQgbGF0ID0gZGF0YS5sYXQ7XG4gICAgICAgIGxldCBsb24gPSBkYXRhLmxvbjtcbiAgICAgICAgcmVxdWVzdC53ZWF0aGVyRm9yQ2l0eShsYXQsIGxvbik7XG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0sIDIwMDApO1xuICB9LFxuICBzdGF0aW9uTmFtZTogKHN0YXRpb24pID0+IHtcbiAgICByZW5kZXIucmVzZXRTdGF0aW9uTGlzdCgpO1xuICAgIGVsLmxvYWRlci5jbGFzc05hbWUgPSAnc3Bpbm5lcic7XG4gICAgZmV0Y2gocGxhdHN1cHBzbGFnK3N0YXRpb24rJyZzdGF0aW9uc29ubHk9dHJ1ZScpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgZWwubG9hZGVyLmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgcmVuZGVyLnVzZXJQaWNrU3RhdGlvbihkYXRhLlJlc3BvbnNlRGF0YSk7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuICB9LFxuICByZWFsVGltZUluZm86IChpbmRleCwgZGF0YSkgPT4ge1xuICAgIGVsLmxvYWRlci5jbGFzc05hbWUgPSAnc3Bpbm5lcic7XG4gICAgZGF0YS5mb3JFYWNoKChzdGF0aW9uTmFtZSwgaSkgPT4ge1xuICAgICAgaWYoaW5kZXggPT0gaSlcbiAgICAgICAgZmV0Y2gocmVhbHRpZHNpbmZvK3N0YXRpb25OYW1lLlNpdGVJZCsnJnRpbWV3aW5kb3c9MzAnKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgIGVsLmxvYWRlci5jbGFzc05hbWUgPSAnaGlkZSc7XG4gICAgICAgICAgcmVuZGVyLnJlbmRlclN0YXRpb24oZGF0YS5SZXNwb25zZURhdGEpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgd2VhdGhlckZvckNpdHk6IChsYXQsIGxvbikgPT4ge1xuICAgIGZldGNoKCdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0nK2xhdCsnJmxvbj0nK2xvbisnJnVuaXRzPW1ldHJpYycrd2VhdGhlcilcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBlbC5sb2FkaW5nU2l0ZS5jbGFzc05hbWUgPSAnaGlkZSc7XG4gICAgICBlbC5zaXRlLmNsYXNzTmFtZSA9ICdjb250YWluZXInO1xuICAgICAgbGV0IG5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICBsZXQgZGVzY3JpcHRpb24gPSBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgICBsZXQgdGVtcCA9IGRhdGEubWFpbi50ZW1wLnRvRml4ZWQoMSk7XG4gICAgICByZW5kZXIucmVuZGVyV2VhdGhlcihuYW1lLCBkZXNjcmlwdGlvbiwgdGVtcCk7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuICB9XG59O1xuIl19
