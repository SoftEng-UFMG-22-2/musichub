/**
 * Class that allows requests to python's API
 */
var SpotifyApi = (function () {
    var _baseUri = 'http://localhost:8000/api';
    var _accessToken = null;
    var _promiseImplementation = null;

     /************************************************************
     *                                                           *
     *                FETCHING AND REQUESTS SETUP                *
     *                                                           *
     ************************************************************/

    var WrapPromiseWithAbort = function (promise, onAbort) {
      promise.abort = onAbort;
      return promise;
    };

    var _promiseProvider = function (promiseFunction, onAbort) {
      var returnedPromise;
      if (_promiseImplementation !== null) {
        var deferred = _promiseImplementation.defer();
        promiseFunction(
          function (resolvedResult) {
            deferred.resolve(resolvedResult);
          },
          function (rejectedResult) {
            deferred.reject(rejectedResult);
          }
        );
        returnedPromise = deferred.promise;
      } else {
        if (window.Promise) {
          returnedPromise = new window.Promise(promiseFunction);
        }
      }

      if (returnedPromise) {
        return new WrapPromiseWithAbort(returnedPromise, onAbort);
      } else {
        return null;
      }
    };

    var _extend = function () {
      var args = Array.prototype.slice.call(arguments);
      var target = args[0];
      var objects = args.slice(1);
      target = target || {};
      objects.forEach(function (object) {
        for (var j in object) {
          if (object.hasOwnProperty(j)) {
            target[j] = object[j];
          }
        }
      });
      return target;
    };

    var _buildUrl = function (url, parameters) {
      var qs = '';
      for (var key in parameters) {
        if (parameters.hasOwnProperty(key)) {
          var value = parameters[key];
          qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
      }
      if (qs.length > 0) {
        // chop off last '&'
        qs = qs.substring(0, qs.length - 1);
        url = url + '?' + qs;
      }
      return url;
    };

    var _performRequest = function (requestData, callback) {
      var req = new XMLHttpRequest();

      var promiseFunction = function (resolve, reject) {
        function success(data) {
          if (resolve) {
            resolve(data);
          }
          if (callback) {
            callback(null, data);
          }
        }

        function failure() {
          if (reject) {
            reject(req);
          }
          if (callback) {
            callback(req, null);
          }
        }

        var type = requestData.type || 'GET';
        req.open(type, _buildUrl(requestData.url, requestData.params));
        if (_accessToken) {
          req.setRequestHeader('Authorization', 'Bearer ' + _accessToken);
        }

        req.onreadystatechange = function () {
          if (req.readyState === 4) {
            var data = null;
            try {
              data = req.responseText ? JSON.parse(req.responseText) : '';
            } catch (e) {
              console.error(e);
            }

            if (req.status >= 200 && req.status < 300) {
              success(data);
            } else {
              failure();
            }
          }
        };

        if (type === 'GET') {
          req.send(null);
        } else {
          var postData = null;
          if (requestData.postData) {
            if (requestData.contentType === 'image/jpeg') {
              postData = requestData.postData;
              req.setRequestHeader('Content-Type', requestData.contentType);
            } else {
              postData = JSON.stringify(requestData.postData);
              req.setRequestHeader('Content-Type', 'application/json');
            }
          }
          req.send(postData);
        }
      };

      if (callback) {
        promiseFunction();
        return null;
      } else {
        return _promiseProvider(promiseFunction, function () {
          req.abort();
        });
      }
    };

    var _checkParamsAndPerformRequest = function (
      requestData,
      options,
      callback,
      optionsAlwaysExtendParams
    ) {
      var opt = {};
      var cb = null;

      if (typeof options === 'object') {
        opt = options;
        cb = callback;
      } else if (typeof options === 'function') {
        cb = options;
      }

      // options extend postData, if any. Otherwise they extend parameters sent in the url
      var type = requestData.type || 'GET';
      if (type !== 'GET' && requestData.postData && !optionsAlwaysExtendParams) {
        requestData.postData = _extend(requestData.postData, opt);
      } else {
        requestData.params = _extend(requestData.params, opt);
      }
      return _performRequest(requestData, cb);
    };

    /**
     * Creates an instance of the wrapper
     * @constructor
     */
    var Constr = function () {};

    Constr.prototype = {
      constructor: SpotifyApi
    };

    /**
     * Fetches a resource through a generic GET request.
     *
     * @param {string} url The URL to be fetched
     * @param {function(Object,Object)} callback An optional callback
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    Constr.prototype.getGeneric = function (url, callback) {
      var requestData = {
        url: url
      };
      return _checkParamsAndPerformRequest(requestData, callback);
    };



    /************************************************************
     *                                                          *
     *                   API ACCESS FUNCTIONS                   *
     *                                                          *
     ************************************************************/

     Constr.prototype.login = function (options, callback) {
        var requestData = {
          url: _baseUri + '/start'
        };
        return _checkParamsAndPerformRequest(requestData, options, callback);
     };

     Constr.prototype.logout = function (options, callback) {
        var requestData = {
          url: _baseUri + '/logout'
        };
        return _checkParamsAndPerformRequest(requestData, options, callback);
    };
  
    Constr.prototype.isLoggedIn = function (options, callback) {
        var requestData = {
          url: _baseUri + '/isloggedin'
        };
        return _checkParamsAndPerformRequest(requestData, options, callback);
    };

    Constr.prototype.getMe = function (options, callback) {
      var requestData = {
        url: _baseUri + '/me'
      };
      return _checkParamsAndPerformRequest(requestData, options, callback);
    };

    Constr.prototype.getTopArtists = function (options, callback) {
        var requestData = {
            url: _baseUri + '/topartists'
        };
        return _checkParamsAndPerformRequest(requestData, options, callback);
    };

    Constr.prototype.getTopTracks = function (options, callback) {
      var requestData = {
          url: _baseUri + '/toptracks'
      };
      return _checkParamsAndPerformRequest(requestData, options, callback);
  };

    Constr.prototype.getUserPlaylists = function (options, callback) {
        var requestData = {
            url: _baseUri + '/playlists'
        };
        return _checkParamsAndPerformRequest(requestData, options, callback);
    };

    Constr.prototype.createPlaylist = function (options, callback) {
      var requestData = {
        url: _baseUri + '/create-playlist',
        type: 'POST',
        postData: options
      };
      return _checkParamsAndPerformRequest(requestData, options, callback);
    };

    return Constr;
})();


if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = SpotifyApi;
  }
