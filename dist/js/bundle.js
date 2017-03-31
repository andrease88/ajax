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
  //creates an eventlistener for each station being printed out after the search of station
  clickStationList: function clickStationList(data) {
    var stations = Array.from(_elements.el.stationsList);
    //each element will have its own click eventlistener
    stations.forEach(function (station, index) {
      station.onclick = function () {
        _elements.el.stationsToPick.innerHTML = '';
        //clicked element will send over with index to realTimeInfo
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
  //calls function getIP in the request module
  _requestapi.request.getIP();

  var app = {
    //searchStaion will fire as soon as there's any value in the input field of search station
    searchStaion: function searchStaion() {
      if (_elements.el.stationSearch.value.trim()) _requestapi.request.stationName(_elements.el.stationSearch.value);
      _elements.el.stationSearch.value = '';
    }
  };
  //this makes it so that enter can be used to trigger the function to fire if any value is inside of searchfield
  _elements.el.stationSearch.onkeydown = function (event) {
    if (event.keyCode === 13) app.searchStaion();
  };
  _elements.el.stationSearchSubmit.addEventListener('click', app.searchStaion);
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

//pretty much only render functions to manipulate with the DOM, nothing special
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
  //Function to get lat + lon from were you're located in the world
  getIP: function getIP() {
    //Fetches from ipapi.co
    fetch('https://ipapi.co/json').then(function (response) {
      return response.json();
    }).then(function (data) {
      //sets lat + lon to send over to next fetch (weatherForCity)
      var lat = data.latitude;
      var lon = data.longitude;
      request.weatherForCity(lat, lon);
    }).catch(function (error) {
      console.log(error);
    });
  },
  //Function to get siteid of a station form sl platsuppslag api
  stationName: function stationName(station) {
    _rendercomponent.render.resetStationList();
    //loader css animation starts
    _elements.el.loader.className = 'spinner';
    fetch(platsuppslag + station + '&stationsonly=true').then(function (response) {
      return response.json();
    }).then(function (data) {
      //loader css animation stops
      _elements.el.loader.className = 'hide';
      //renders all stations that matched with users input and is now selectable
      _rendercomponent.render.userPickStation(data.ResponseData);
    }).catch(function (error) {
      console.log(error);
    });
  },
  //selected station will now fetch with its siteid to see when next departure is within next 30 mins
  realTimeInfo: function realTimeInfo(index, data) {
    _elements.el.loader.className = 'spinner';
    /*previous result from stationName() will loop through and see if
    index of users choice is equal to some index in data.response*/
    data.forEach(function (stationName, i) {
      if (index == i)
        //if so, next fetch will go
        fetch(realtidsinfo + stationName.SiteId + '&timewindow=30').then(function (response) {
          return response.json();
        }).then(function (data) {
          _elements.el.loader.className = 'hide';
          //sends over dataresponse for this station picked
          _rendercomponent.render.renderStation(data.ResponseData);
        }).catch(function (error) {
          console.log(error);
        });
    });
  },
  //weatherForCity takes 2 parameters, lat + lon
  weatherForCity: function weatherForCity(lat, lon) {
    //fetches the current weather for this lat + lon
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric' + weather).then(function (response) {
      return response.json();
    }).then(function (data) {
      _elements.el.site.className = 'container';
      //sets some variables to be used later on in the render module
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZWxlbWVudHMuanMiLCJzcmMvanMvZXZlbnRsaXN0ZW5lci5qcyIsInNyYy9qcy9tYWluLmpzIiwic3JjL2pzL3JlbmRlcmNvbXBvbmVudC5qcyIsInNyYy9qcy9yZXF1ZXN0YXBpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0VBOztBQUVBO0FBQ08sSUFBTSxrQkFBSztBQUNoQixpQkFBZSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FEQztBQUVoQix1QkFBcUIsU0FBUyxjQUFULENBQXdCLGVBQXhCLENBRkw7QUFHaEIsa0JBQWdCLFNBQVMsY0FBVCxDQUF3QixrQkFBeEIsQ0FIQTtBQUloQixnQkFBYyxTQUFTLHNCQUFULENBQWdDLGVBQWhDLENBSkU7QUFLaEIsU0FBTyxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsQ0FMUztBQU1oQixlQUFhLFNBQVMsY0FBVCxDQUF3QixjQUF4QixDQU5HO0FBT2hCLFNBQU8sU0FBUyxjQUFULENBQXdCLE9BQXhCLENBUFM7QUFRaEIsZUFBYSxTQUFTLGNBQVQsQ0FBd0IsY0FBeEIsQ0FSRztBQVNoQixPQUFLLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQVRXO0FBVWhCLGdCQUFjLFNBQVMsY0FBVCxDQUF3QixlQUF4QixDQVZFO0FBV2hCLFVBQVEsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBWFE7QUFZaEIsYUFBVyxTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsQ0FaSztBQWFoQixVQUFRLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQWJRO0FBY2hCLGlCQUFlLFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FkQztBQWVoQixjQUFZLFNBQVMsY0FBVCxDQUF3QixhQUF4QixDQWZJO0FBZ0JoQixvQkFBa0IsU0FBUyxjQUFULENBQXdCLG9CQUF4QixDQWhCRjtBQWlCaEIsUUFBTSxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIs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QUNBLFVBQUksT0FBTyxLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLEVBQTNCO0FBQ0EsVUFBSSxPQUFPLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxPQUFmLENBQXVCLENBQXZCLENBQVg7QUFDQSw4QkFBTyxhQUFQLENBQXFCLElBQXJCLEVBQTJCLElBQTNCLEVBQWlDLElBQWpDO0FBQ0QsS0FWRCxFQVVHLEtBVkgsQ0FVUyxpQkFBUztBQUNoQixjQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0QsS0FaRDtBQWFEO0FBbEVvQixDQUFoQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL2pzaGludCBlc3ZlcnNpb246NlxuLy9JbXBvcnRzIG1vZHVsZSAncmVxdWVzdCcgZnJvbSByZXF1ZXN0YXBpLmpzXG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0YXBpLmpzJztcblxuLy9FeHBvcnRzIGFsbCBlbGVtZW50cyBmcm9tIEhUTUwgdG8gYW55IG1vZHVsZSB0aGF0IHdhbnRzIHRvIHVzZSBpdFxuZXhwb3J0IGNvbnN0IGVsID0ge1xuICBzdGF0aW9uU2VhcmNoOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJyksXG4gIHN0YXRpb25TZWFyY2hTdWJtaXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQtc2VhcmNoJyksXG4gIHN0YXRpb25zVG9QaWNrOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdGlvbnMtdG8tcGljaycpLFxuICBzdGF0aW9uc0xpc3Q6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N0YXRpb25zLWxpc3QnKSxcbiAgbWV0cm86IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXRybycpLFxuICBtZXRyb0hlYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21ldHJvLWhlYWRlcicpLFxuICB0cmFtczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYW1zJyksXG4gIHRyYW1zSGVhZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhbXMtaGVhZGVyJyksXG4gIGJ1czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1cycpLFxuICB0cmFpbnNIZWFkZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbnMtaGVhZGVyJyksXG4gIHRyYWluczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWlucycpLFxuICBidXNIZWFkZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXMtaGVhZGVyJyksXG4gIGxvYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRlcicpLFxuICBsb2FkZXJXZWF0aGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGVyLXdlYXRoZXInKSxcbiAgY2l0eVNlYXJjaDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHktc2VhcmNoJyksXG4gIGNpdHlTZWFyY2hTdWJtaXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQtY2l0eS1zZWFyY2gnKSxcbiAgdGVtcDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbXAnKSxcbiAgbmFtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKSxcbiAgZGVzY3JpcHRpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpLFxuICBtZXRyb3NEaXY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXRyb3MtZGl2JyksXG4gIHRyYW1zRGl2OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhbXMtZGl2JyksXG4gIGJ1c0RpdjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1cy1kaXYnKSxcbiAgaWNvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ljb24nKSxcbiAgbG9hZGluZ1NpdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkaW5nLXNpdGUnKSxcbiAgc2l0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpdGUnKVxuXG59O1xuIiwiLy9qc2hpbnQgZXN2ZXJzaW9uOjZcbmltcG9ydCB7IGVsIH0gZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0YXBpLmpzJztcblxuXG5leHBvcnQgY29uc3QgZXZlbnQgPSB7XG4gIC8vY3JlYXRlcyBhbiBldmVudGxpc3RlbmVyIGZvciBlYWNoIHN0YXRpb24gYmVpbmcgcHJpbnRlZCBvdXQgYWZ0ZXIgdGhlIHNlYXJjaCBvZiBzdGF0aW9uXG4gIGNsaWNrU3RhdGlvbkxpc3Q6IChkYXRhKSA9PiB7XG4gICAgbGV0IHN0YXRpb25zID0gQXJyYXkuZnJvbShlbC5zdGF0aW9uc0xpc3QpO1xuICAgIC8vZWFjaCBlbGVtZW50IHdpbGwgaGF2ZSBpdHMgb3duIGNsaWNrIGV2ZW50bGlzdGVuZXJcbiAgICBzdGF0aW9ucy5mb3JFYWNoKChzdGF0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgc3RhdGlvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBlbC5zdGF0aW9uc1RvUGljay5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgLy9jbGlja2VkIGVsZW1lbnQgd2lsbCBzZW5kIG92ZXIgd2l0aCBpbmRleCB0byByZWFsVGltZUluZm9cbiAgICAgICAgcmVxdWVzdC5yZWFsVGltZUluZm8oaW5kZXgsIGRhdGEpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSxcbn07XG4iLCIvL2pzaGludCBlc3ZlcnNpb246NlxuLy9JbXBvcnRzIG1vZHVsZXNcbmltcG9ydCB7IGVsIH0gZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0YXBpLmpzJztcbmltcG9ydCB7IGV2ZW50IH0gZnJvbSAnLi9ldmVudGxpc3RlbmVyLmpzJztcblxuLy9TbGVmIGludm9rZWQgZnVuY3Rpb24gdG8gaGFuZGxlIGFwcHMgZnVuY3Rpb25zXG4oKCkgPT4ge1xuICAvL2NhbGxzIGZ1bmN0aW9uIGdldElQIGluIHRoZSByZXF1ZXN0IG1vZHVsZVxuICByZXF1ZXN0LmdldElQKCk7XG5cbiAgY29uc3QgYXBwID0ge1xuICAgIC8vc2VhcmNoU3RhaW9uIHdpbGwgZmlyZSBhcyBzb29uIGFzIHRoZXJlJ3MgYW55IHZhbHVlIGluIHRoZSBpbnB1dCBmaWVsZCBvZiBzZWFyY2ggc3RhdGlvblxuICAgIHNlYXJjaFN0YWlvbjogKCkgPT4ge1xuICAgICAgaWYoZWwuc3RhdGlvblNlYXJjaC52YWx1ZS50cmltKCkpXG4gICAgICAgIHJlcXVlc3Quc3RhdGlvbk5hbWUoZWwuc3RhdGlvblNlYXJjaC52YWx1ZSk7XG4gICAgICAgIGVsLnN0YXRpb25TZWFyY2gudmFsdWUgPSAnJztcbiAgICB9LFxuICB9O1xuICAvL3RoaXMgbWFrZXMgaXQgc28gdGhhdCBlbnRlciBjYW4gYmUgdXNlZCB0byB0cmlnZ2VyIHRoZSBmdW5jdGlvbiB0byBmaXJlIGlmIGFueSB2YWx1ZSBpcyBpbnNpZGUgb2Ygc2VhcmNoZmllbGRcbiAgZWwuc3RhdGlvblNlYXJjaC5vbmtleWRvd24gPSAoZXZlbnQpID0+IHtcbiAgICBpZihldmVudC5rZXlDb2RlID09PSAxMylcbiAgICAgIGFwcC5zZWFyY2hTdGFpb24oKTtcbiAgfTtcbiAgZWwuc3RhdGlvblNlYXJjaFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFwcC5zZWFyY2hTdGFpb24pO1xufSkoKTtcbiIsIi8vanNoaW50IGVzdmVyc2lvbjo2XG5pbXBvcnQgeyBlbCB9IGZyb20gJy4vZWxlbWVudHMuanMnO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4vcmVxdWVzdGFwaS5qcyc7XG5pbXBvcnQgeyBldmVudCB9IGZyb20gJy4vZXZlbnRsaXN0ZW5lci5qcyc7XG5cbi8vcHJldHR5IG11Y2ggb25seSByZW5kZXIgZnVuY3Rpb25zIHRvIG1hbmlwdWxhdGUgd2l0aCB0aGUgRE9NLCBub3RoaW5nIHNwZWNpYWxcbmV4cG9ydCBjb25zdCByZW5kZXIgPSB7XG4gIHJlbmRlclN0YXRpb246IChkYXRhKSA9PiB7XG4gICAgZWwuc3RhdGlvbnNUb1BpY2suaW5uZXJIVE1MID0gJyc7XG4gICAgaWYoZGF0YS5NZXRyb3MubGVuZ3RoID4gMCl7XG4gICAgICBlbC5tZXRyb3NEaXYuY2xhc3NOYW1lID0gJ2NvbHVtbiBjb2wteHMtMTIgY29sLW1kLTYgY29sLXhsLTQgZmxvYXQtbGVmdCB0ZXh0LWNlbnRlcic7XG4gICAgICBlbC5tZXRyb0hlYWRlci5jbGFzc05hbWUgPSAndmlzaWJsZSc7XG4gICAgICBkYXRhLk1ldHJvcy5mb3JFYWNoKG1ldHJvcyA9PiB7XG4gICAgICAgIGVsLm1ldHJvLmlubmVySFRNTCArPVxuICAgICAgICBgPGxpIGNsYXNzPVwic3RhdGlvbnMtaW5mb1wiPiR7bWV0cm9zLkxpbmVOdW1iZXJ9IG1vdCAke21ldHJvcy5EZXN0aW5hdGlvbn0gPHNwYW4gY2xhc3M9XCJ0aW1lXCI+JHttZXRyb3MuRGlzcGxheVRpbWV9PC9zcGFuPjwvbGk+YDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5tZXRyb3NEaXYuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgIH1cbiAgICBpZihkYXRhLlRyYW1zLmxlbmd0aCA+IDApe1xuICAgICAgZWwudHJhbXNEaXYuY2xhc3NOYW1lID0gJ2NvbHVtbiBjb2wteHMtMTIgY29sLW1kLTYgY29sLXhsLTQgZmxvYXQtbGVmdCB0ZXh0LWNlbnRlcic7XG4gICAgICBlbC50cmFtc0hlYWRlci5jbGFzc05hbWUgPSAndmlzaWJsZSc7XG4gICAgICBkYXRhLlRyYW1zLmZvckVhY2godHJhbXMgPT4ge1xuICAgICAgICBlbC50cmFtcy5pbm5lckhUTUwgKz1cbiAgICAgICAgYDxsaSBjbGFzcz1cInN0YXRpb25zLWluZm9cIj4ke3RyYW1zLkxpbmVOdW1iZXJ9IG1vdCAke3RyYW1zLkRlc3RpbmF0aW9ufSA8c3BhbiBjbGFzcz1cInRpbWVcIj4ke3RyYW1zLkRpc3BsYXlUaW1lfTwvc3Bhbj48L2xpPmA7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwudHJhbXNEaXYuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgIH1cbiAgICBpZihkYXRhLkJ1c2VzLmxlbmd0aCA+IDApe1xuICAgICAgZWwuYnVzRGl2LmNsYXNzTmFtZSA9ICdjb2x1bW4gY29sLXhzLTEyIGNvbC1tZC02IGNvbC14bC00IGZsb2F0LWxlZnQgdGV4dC1jZW50ZXInO1xuICAgICAgZWwuYnVzSGVhZGVyLmNsYXNzTmFtZSA9ICd2aXNpYmxlJztcbiAgICAgIGRhdGEuQnVzZXMuZm9yRWFjaChidXMgPT4ge1xuICAgICAgICBlbC5idXMuaW5uZXJIVE1MICs9XG4gICAgICAgIGA8bGkgY2xhc3M9XCJzdGF0aW9ucy1pbmZvXCI+JHtidXMuTGluZU51bWJlcn0gbW90ICR7YnVzLkRlc3RpbmF0aW9ufSA8c3BhbiBjbGFzcz1cInRpbWVcIj4ke2J1cy5EaXNwbGF5VGltZX08L3NwYW4+PC9saT5gO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmJ1c0Rpdi5jbGFzc05hbWUgPSAnaGlkZSc7XG4gICAgfVxuICAgIGlmKGRhdGEuTWV0cm9zLmxlbmd0aCA8IDEgJiYgZGF0YS5UcmFtcy5sZW5ndGggPCAxICYmIGRhdGEuQnVzZXMubGVuZ3RoIDwgMSlcbiAgICAgIGVsLnN0YXRpb25zVG9QaWNrLmlubmVySFRNTCA9ICdIaXR0YWRlIGluZ2EgYXZnw6VuZ2FyIGbDtnIgc3RhdGlvbmVuJztcbiAgfSxcbiAgdXNlclBpY2tTdGF0aW9uOiAoZGF0YSkgPT4ge1xuICAgIGRhdGEuZm9yRWFjaChzdGF0aW9uTmFtZSA9PiB7XG4gICAgICBlbC5zdGF0aW9uc1RvUGljay5pbm5lckhUTUwgKz1cbiAgICAgIGA8bGkgY2xhc3M9XCJzdGF0aW9ucy1saXN0XCI+JHtzdGF0aW9uTmFtZS5OYW1lfTwvbGk+YDtcbiAgICB9KTtcbiAgICBldmVudC5jbGlja1N0YXRpb25MaXN0KGRhdGEpO1xuICB9LFxuICByZW5kZXJXZWF0aGVyOiAobmFtZSwgaWNvbiwgdGVtcCkgPT4ge1xuICAgIGVsLmljb24uY2xhc3NOYW1lID0gJ293ZiBvd2YtJytpY29uKycgb3dmLTV4JztcbiAgICBlbC5uYW1lLmlubmVySFRNTCA9IG5hbWU7XG4gICAgZWwudGVtcC5pbm5lckhUTUwgPSB0ZW1wKycgJiM4NDUxOyc7XG4gIH0sXG4gIHJlc2V0U3RhdGlvbkxpc3Q6ICgpID0+IHtcbiAgICBlbC5zdGF0aW9uc1RvUGljay5pbm5lckhUTUwgPSAnJztcbiAgICBlbC5idXMuaW5uZXJIVE1MID0gJyc7XG4gICAgZWwudHJhbXMuaW5uZXJIVE1MID0gJyc7XG4gICAgZWwubWV0cm8uaW5uZXJIVE1MID0gJyc7XG4gICAgZWwubWV0cm9IZWFkZXIuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgIGVsLmJ1c0hlYWRlci5jbGFzc05hbWUgPSAnaGlkZSc7XG4gICAgZWwudHJhbXNIZWFkZXIuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICB9XG59O1xuIiwiLy9qc2hpbnQgZXN2ZXJzaW9uOjZcbi8vSW1wb3J0cyBtb2R1bGUgJ3JlbmRlcicgZnJvbSByZW5kZXJjb21wb25lbnQuanNcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJy4vcmVuZGVyY29tcG9uZW50LmpzJztcbmltcG9ydCB7IGVsIH0gZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5cbi8vQVBJa2V5cyBmb3IgU0xcbmNvbnN0IHBsYXRzdXBwc2xhZyA9ICdodHRwczovL3NsYXBpb25lLmhlcm9rdWFwcC5jb20/a2V5PTdkM2NiOGIyMGY1NzQ1YjJiZTU0NzRhNjJjZmNiY2Y3JnNlYXJjaHN0cmluZz0nO1xuY29uc3QgcmVhbHRpZHNpbmZvID0gJ2h0dHBzOi8vc2xhcGl0d28uaGVyb2t1YXBwLmNvbT9rZXk9NDk5MmY1YTJjMzY3NDg0NDk4YmNiMDFjODVmNGM3NjYmc2l0ZWlkPSc7XG5jb25zdCB3ZWF0aGVyID0gJyZBUFBJRD0yMzlkMWE4YTJiYjBmNDc5ODU3N2IyOGM0ZjIyODQ5Yic7XG5cbi8vRXhwb3J0cyByZXF1ZXN0IG9iamVjdCB0byBhbnkgbW9kdWxlIHRoYXQgd2FudHMgdG8gdXNlIGl0XG5leHBvcnQgY29uc3QgcmVxdWVzdCA9IHtcbiAgLy9GdW5jdGlvbiB0byBnZXQgbGF0ICsgbG9uIGZyb20gd2VyZSB5b3UncmUgbG9jYXRlZCBpbiB0aGUgd29ybGRcbiAgZ2V0SVA6ICgpID0+IHtcbiAgICAvL0ZldGNoZXMgZnJvbSBpcGFwaS5jb1xuICAgIGZldGNoKCdodHRwczovL2lwYXBpLmNvL2pzb24nKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgIC8vc2V0cyBsYXQgKyBsb24gdG8gc2VuZCBvdmVyIHRvIG5leHQgZmV0Y2ggKHdlYXRoZXJGb3JDaXR5KVxuICAgICAgbGV0IGxhdCA9IGRhdGEubGF0aXR1ZGU7XG4gICAgICBsZXQgbG9uID0gZGF0YS5sb25naXR1ZGU7XG4gICAgICByZXF1ZXN0LndlYXRoZXJGb3JDaXR5KGxhdCwgbG9uKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG4gIH0sXG4gIC8vRnVuY3Rpb24gdG8gZ2V0IHNpdGVpZCBvZiBhIHN0YXRpb24gZm9ybSBzbCBwbGF0c3VwcHNsYWcgYXBpXG4gIHN0YXRpb25OYW1lOiAoc3RhdGlvbikgPT4ge1xuICAgIHJlbmRlci5yZXNldFN0YXRpb25MaXN0KCk7XG4gICAgLy9sb2FkZXIgY3NzIGFuaW1hdGlvbiBzdGFydHNcbiAgICBlbC5sb2FkZXIuY2xhc3NOYW1lID0gJ3NwaW5uZXInO1xuICAgIGZldGNoKHBsYXRzdXBwc2xhZytzdGF0aW9uKycmc3RhdGlvbnNvbmx5PXRydWUnKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgIC8vbG9hZGVyIGNzcyBhbmltYXRpb24gc3RvcHNcbiAgICAgIGVsLmxvYWRlci5jbGFzc05hbWUgPSAnaGlkZSc7XG4gICAgICAvL3JlbmRlcnMgYWxsIHN0YXRpb25zIHRoYXQgbWF0Y2hlZCB3aXRoIHVzZXJzIGlucHV0IGFuZCBpcyBub3cgc2VsZWN0YWJsZVxuICAgICAgcmVuZGVyLnVzZXJQaWNrU3RhdGlvbihkYXRhLlJlc3BvbnNlRGF0YSk7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuICB9LFxuICAvL3NlbGVjdGVkIHN0YXRpb24gd2lsbCBub3cgZmV0Y2ggd2l0aCBpdHMgc2l0ZWlkIHRvIHNlZSB3aGVuIG5leHQgZGVwYXJ0dXJlIGlzIHdpdGhpbiBuZXh0IDMwIG1pbnNcbiAgcmVhbFRpbWVJbmZvOiAoaW5kZXgsIGRhdGEpID0+IHtcbiAgICBlbC5sb2FkZXIuY2xhc3NOYW1lID0gJ3NwaW5uZXInO1xuICAgIC8qcHJldmlvdXMgcmVzdWx0IGZyb20gc3RhdGlvbk5hbWUoKSB3aWxsIGxvb3AgdGhyb3VnaCBhbmQgc2VlIGlmXG4gICAgaW5kZXggb2YgdXNlcnMgY2hvaWNlIGlzIGVxdWFsIHRvIHNvbWUgaW5kZXggaW4gZGF0YS5yZXNwb25zZSovXG4gICAgZGF0YS5mb3JFYWNoKChzdGF0aW9uTmFtZSwgaSkgPT4ge1xuICAgICAgaWYoaW5kZXggPT0gaSlcbiAgICAgICAgLy9pZiBzbywgbmV4dCBmZXRjaCB3aWxsIGdvXG4gICAgICAgIGZldGNoKHJlYWx0aWRzaW5mbytzdGF0aW9uTmFtZS5TaXRlSWQrJyZ0aW1ld2luZG93PTMwJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICBlbC5sb2FkZXIuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgICAgICAgIC8vc2VuZHMgb3ZlciBkYXRhcmVzcG9uc2UgZm9yIHRoaXMgc3RhdGlvbiBwaWNrZWRcbiAgICAgICAgICByZW5kZXIucmVuZGVyU3RhdGlvbihkYXRhLlJlc3BvbnNlRGF0YSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICAvL3dlYXRoZXJGb3JDaXR5IHRha2VzIDIgcGFyYW1ldGVycywgbGF0ICsgbG9uXG4gIHdlYXRoZXJGb3JDaXR5OiAobGF0LCBsb24pID0+IHtcbiAgICAvL2ZldGNoZXMgdGhlIGN1cnJlbnQgd2VhdGhlciBmb3IgdGhpcyBsYXQgKyBsb25cbiAgICBmZXRjaCgnaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JytsYXQrJyZsb249Jytsb24rJyZ1bml0cz1tZXRyaWMnK3dlYXRoZXIpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgZWwuc2l0ZS5jbGFzc05hbWUgPSAnY29udGFpbmVyJztcbiAgICAgIC8vc2V0cyBzb21lIHZhcmlhYmxlcyB0byBiZSB1c2VkIGxhdGVyIG9uIGluIHRoZSByZW5kZXIgbW9kdWxlXG4gICAgICBsZXQgbmFtZSA9IGRhdGEubmFtZTtcbiAgICAgIGxldCBpY29uID0gZGF0YS53ZWF0aGVyWzBdLmlkO1xuICAgICAgbGV0IHRlbXAgPSBkYXRhLm1haW4udGVtcC50b0ZpeGVkKDEpO1xuICAgICAgcmVuZGVyLnJlbmRlcldlYXRoZXIobmFtZSwgaWNvbiwgdGVtcCk7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuICB9XG59O1xuIl19
