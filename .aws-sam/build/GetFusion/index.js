var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/clone/clone.js
var require_clone = __commonJS({
  "node_modules/clone/clone.js"(exports2, module2) {
    var clone = function() {
      "use strict";
      function _instanceof(obj, type) {
        return type != null && obj instanceof type;
      }
      var nativeMap;
      try {
        nativeMap = Map;
      } catch (_) {
        nativeMap = function() {
        };
      }
      var nativeSet;
      try {
        nativeSet = Set;
      } catch (_) {
        nativeSet = function() {
        };
      }
      var nativePromise;
      try {
        nativePromise = Promise;
      } catch (_) {
        nativePromise = function() {
        };
      }
      function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
        if (typeof circular === "object") {
          depth = circular.depth;
          prototype = circular.prototype;
          includeNonEnumerable = circular.includeNonEnumerable;
          circular = circular.circular;
        }
        var allParents = [];
        var allChildren = [];
        var useBuffer = typeof Buffer != "undefined";
        if (typeof circular == "undefined")
          circular = true;
        if (typeof depth == "undefined")
          depth = Infinity;
        function _clone(parent2, depth2) {
          if (parent2 === null)
            return null;
          if (depth2 === 0)
            return parent2;
          var child;
          var proto;
          if (typeof parent2 != "object") {
            return parent2;
          }
          if (_instanceof(parent2, nativeMap)) {
            child = new nativeMap();
          } else if (_instanceof(parent2, nativeSet)) {
            child = new nativeSet();
          } else if (_instanceof(parent2, nativePromise)) {
            child = new nativePromise(function(resolve, reject) {
              parent2.then(function(value) {
                resolve(_clone(value, depth2 - 1));
              }, function(err) {
                reject(_clone(err, depth2 - 1));
              });
            });
          } else if (clone2.__isArray(parent2)) {
            child = [];
          } else if (clone2.__isRegExp(parent2)) {
            child = new RegExp(parent2.source, __getRegExpFlags(parent2));
            if (parent2.lastIndex) child.lastIndex = parent2.lastIndex;
          } else if (clone2.__isDate(parent2)) {
            child = new Date(parent2.getTime());
          } else if (useBuffer && Buffer.isBuffer(parent2)) {
            if (Buffer.allocUnsafe) {
              child = Buffer.allocUnsafe(parent2.length);
            } else {
              child = new Buffer(parent2.length);
            }
            parent2.copy(child);
            return child;
          } else if (_instanceof(parent2, Error)) {
            child = Object.create(parent2);
          } else {
            if (typeof prototype == "undefined") {
              proto = Object.getPrototypeOf(parent2);
              child = Object.create(proto);
            } else {
              child = Object.create(prototype);
              proto = prototype;
            }
          }
          if (circular) {
            var index = allParents.indexOf(parent2);
            if (index != -1) {
              return allChildren[index];
            }
            allParents.push(parent2);
            allChildren.push(child);
          }
          if (_instanceof(parent2, nativeMap)) {
            parent2.forEach(function(value, key) {
              var keyChild = _clone(key, depth2 - 1);
              var valueChild = _clone(value, depth2 - 1);
              child.set(keyChild, valueChild);
            });
          }
          if (_instanceof(parent2, nativeSet)) {
            parent2.forEach(function(value) {
              var entryChild = _clone(value, depth2 - 1);
              child.add(entryChild);
            });
          }
          for (var i in parent2) {
            var attrs;
            if (proto) {
              attrs = Object.getOwnPropertyDescriptor(proto, i);
            }
            if (attrs && attrs.set == null) {
              continue;
            }
            child[i] = _clone(parent2[i], depth2 - 1);
          }
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(parent2);
            for (var i = 0; i < symbols.length; i++) {
              var symbol = symbols[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
              if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                continue;
              }
              child[symbol] = _clone(parent2[symbol], depth2 - 1);
              if (!descriptor.enumerable) {
                Object.defineProperty(child, symbol, {
                  enumerable: false
                });
              }
            }
          }
          if (includeNonEnumerable) {
            var allPropertyNames = Object.getOwnPropertyNames(parent2);
            for (var i = 0; i < allPropertyNames.length; i++) {
              var propertyName = allPropertyNames[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
              if (descriptor && descriptor.enumerable) {
                continue;
              }
              child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
              Object.defineProperty(child, propertyName, {
                enumerable: false
              });
            }
          }
          return child;
        }
        return _clone(parent, depth);
      }
      clone2.clonePrototype = function clonePrototype(parent) {
        if (parent === null)
          return null;
        var c = function() {
        };
        c.prototype = parent;
        return new c();
      };
      function __objToStr(o) {
        return Object.prototype.toString.call(o);
      }
      clone2.__objToStr = __objToStr;
      function __isDate(o) {
        return typeof o === "object" && __objToStr(o) === "[object Date]";
      }
      clone2.__isDate = __isDate;
      function __isArray(o) {
        return typeof o === "object" && __objToStr(o) === "[object Array]";
      }
      clone2.__isArray = __isArray;
      function __isRegExp(o) {
        return typeof o === "object" && __objToStr(o) === "[object RegExp]";
      }
      clone2.__isRegExp = __isRegExp;
      function __getRegExpFlags(re) {
        var flags = "";
        if (re.global) flags += "g";
        if (re.ignoreCase) flags += "i";
        if (re.multiline) flags += "m";
        return flags;
      }
      clone2.__getRegExpFlags = __getRegExpFlags;
      return clone2;
    }();
    if (typeof module2 === "object" && module2.exports) {
      module2.exports = clone;
    }
  }
});

// node_modules/node-cache/lib/node_cache.js
var require_node_cache = __commonJS({
  "node_modules/node-cache/lib/node_cache.js"(exports2, module2) {
    (function() {
      var EventEmitter, NodeCache2, clone, splice = [].splice, boundMethodCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new Error("Bound instance method accessed before binding");
        }
      }, indexOf = [].indexOf;
      clone = require_clone();
      EventEmitter = require("events").EventEmitter;
      module2.exports = NodeCache2 = function() {
        class NodeCache3 extends EventEmitter {
          constructor(options = {}) {
            super();
            this.get = this.get.bind(this);
            this.mget = this.mget.bind(this);
            this.set = this.set.bind(this);
            this.mset = this.mset.bind(this);
            this.del = this.del.bind(this);
            this.take = this.take.bind(this);
            this.ttl = this.ttl.bind(this);
            this.getTtl = this.getTtl.bind(this);
            this.keys = this.keys.bind(this);
            this.has = this.has.bind(this);
            this.getStats = this.getStats.bind(this);
            this.flushAll = this.flushAll.bind(this);
            this.flushStats = this.flushStats.bind(this);
            this.close = this.close.bind(this);
            this._checkData = this._checkData.bind(this);
            this._check = this._check.bind(this);
            this._isInvalidKey = this._isInvalidKey.bind(this);
            this._wrap = this._wrap.bind(this);
            this._getValLength = this._getValLength.bind(this);
            this._error = this._error.bind(this);
            this._initErrors = this._initErrors.bind(this);
            this.options = options;
            this._initErrors();
            this.data = {};
            this.options = Object.assign({
              // convert all elements to string
              forceString: false,
              // used standard size for calculating value size
              objectValueSize: 80,
              promiseValueSize: 80,
              arrayValueSize: 40,
              // standard time to live in seconds. 0 = infinity;
              stdTTL: 0,
              // time in seconds to check all data and delete expired keys
              checkperiod: 600,
              // en/disable cloning of variables. If `true` you'll get a copy of the cached variable. If `false` you'll save and get just the reference
              useClones: true,
              // whether values should be deleted automatically at expiration
              deleteOnExpire: true,
              // enable legacy callbacks
              enableLegacyCallbacks: false,
              // max amount of keys that are being stored
              maxKeys: -1
            }, this.options);
            if (this.options.enableLegacyCallbacks) {
              console.warn("WARNING! node-cache legacy callback support will drop in v6.x");
              ["get", "mget", "set", "del", "ttl", "getTtl", "keys", "has"].forEach((methodKey) => {
                var oldMethod;
                oldMethod = this[methodKey];
                this[methodKey] = function(...args) {
                  var cb, err, ref, res;
                  ref = args, [...args] = ref, [cb] = splice.call(args, -1);
                  if (typeof cb === "function") {
                    try {
                      res = oldMethod(...args);
                      cb(null, res);
                    } catch (error1) {
                      err = error1;
                      cb(err);
                    }
                  } else {
                    return oldMethod(...args, cb);
                  }
                };
              });
            }
            this.stats = {
              hits: 0,
              misses: 0,
              keys: 0,
              ksize: 0,
              vsize: 0
            };
            this.validKeyTypes = ["string", "number"];
            this._checkData();
            return;
          }
          get(key) {
            var _ret, err;
            boundMethodCheck(this, NodeCache3);
            if ((err = this._isInvalidKey(key)) != null) {
              throw err;
            }
            if (this.data[key] != null && this._check(key, this.data[key])) {
              this.stats.hits++;
              _ret = this._unwrap(this.data[key]);
              return _ret;
            } else {
              this.stats.misses++;
              return void 0;
            }
          }
          mget(keys) {
            var _err, err, i, key, len, oRet;
            boundMethodCheck(this, NodeCache3);
            if (!Array.isArray(keys)) {
              _err = this._error("EKEYSTYPE");
              throw _err;
            }
            oRet = {};
            for (i = 0, len = keys.length; i < len; i++) {
              key = keys[i];
              if ((err = this._isInvalidKey(key)) != null) {
                throw err;
              }
              if (this.data[key] != null && this._check(key, this.data[key])) {
                this.stats.hits++;
                oRet[key] = this._unwrap(this.data[key]);
              } else {
                this.stats.misses++;
              }
            }
            return oRet;
          }
          set(key, value, ttl) {
            var _err, err, existent;
            boundMethodCheck(this, NodeCache3);
            if (this.options.maxKeys > -1 && this.stats.keys >= this.options.maxKeys) {
              _err = this._error("ECACHEFULL");
              throw _err;
            }
            if (this.options.forceString && false) {
              value = JSON.stringify(value);
            }
            if (ttl == null) {
              ttl = this.options.stdTTL;
            }
            if ((err = this._isInvalidKey(key)) != null) {
              throw err;
            }
            existent = false;
            if (this.data[key]) {
              existent = true;
              this.stats.vsize -= this._getValLength(this._unwrap(this.data[key], false));
            }
            this.data[key] = this._wrap(value, ttl);
            this.stats.vsize += this._getValLength(value);
            if (!existent) {
              this.stats.ksize += this._getKeyLength(key);
              this.stats.keys++;
            }
            this.emit("set", key, value);
            return true;
          }
          mset(keyValueSet) {
            var _err, err, i, j, key, keyValuePair, len, len1, ttl, val;
            boundMethodCheck(this, NodeCache3);
            if (this.options.maxKeys > -1 && this.stats.keys + keyValueSet.length >= this.options.maxKeys) {
              _err = this._error("ECACHEFULL");
              throw _err;
            }
            for (i = 0, len = keyValueSet.length; i < len; i++) {
              keyValuePair = keyValueSet[i];
              ({ key, val, ttl } = keyValuePair);
              if (ttl && typeof ttl !== "number") {
                _err = this._error("ETTLTYPE");
                throw _err;
              }
              if ((err = this._isInvalidKey(key)) != null) {
                throw err;
              }
            }
            for (j = 0, len1 = keyValueSet.length; j < len1; j++) {
              keyValuePair = keyValueSet[j];
              ({ key, val, ttl } = keyValuePair);
              this.set(key, val, ttl);
            }
            return true;
          }
          del(keys) {
            var delCount, err, i, key, len, oldVal;
            boundMethodCheck(this, NodeCache3);
            if (!Array.isArray(keys)) {
              keys = [keys];
            }
            delCount = 0;
            for (i = 0, len = keys.length; i < len; i++) {
              key = keys[i];
              if ((err = this._isInvalidKey(key)) != null) {
                throw err;
              }
              if (this.data[key] != null) {
                this.stats.vsize -= this._getValLength(this._unwrap(this.data[key], false));
                this.stats.ksize -= this._getKeyLength(key);
                this.stats.keys--;
                delCount++;
                oldVal = this.data[key];
                delete this.data[key];
                this.emit("del", key, oldVal.v);
              }
            }
            return delCount;
          }
          take(key) {
            var _ret;
            boundMethodCheck(this, NodeCache3);
            _ret = this.get(key);
            if (_ret != null) {
              this.del(key);
            }
            return _ret;
          }
          ttl(key, ttl) {
            var err;
            boundMethodCheck(this, NodeCache3);
            ttl || (ttl = this.options.stdTTL);
            if (!key) {
              return false;
            }
            if ((err = this._isInvalidKey(key)) != null) {
              throw err;
            }
            if (this.data[key] != null && this._check(key, this.data[key])) {
              if (ttl >= 0) {
                this.data[key] = this._wrap(this.data[key].v, ttl, false);
              } else {
                this.del(key);
              }
              return true;
            } else {
              return false;
            }
          }
          getTtl(key) {
            var _ttl, err;
            boundMethodCheck(this, NodeCache3);
            if (!key) {
              return void 0;
            }
            if ((err = this._isInvalidKey(key)) != null) {
              throw err;
            }
            if (this.data[key] != null && this._check(key, this.data[key])) {
              _ttl = this.data[key].t;
              return _ttl;
            } else {
              return void 0;
            }
          }
          keys() {
            var _keys;
            boundMethodCheck(this, NodeCache3);
            _keys = Object.keys(this.data);
            return _keys;
          }
          has(key) {
            var _exists;
            boundMethodCheck(this, NodeCache3);
            _exists = this.data[key] != null && this._check(key, this.data[key]);
            return _exists;
          }
          getStats() {
            boundMethodCheck(this, NodeCache3);
            return this.stats;
          }
          flushAll(_startPeriod = true) {
            boundMethodCheck(this, NodeCache3);
            this.data = {};
            this.stats = {
              hits: 0,
              misses: 0,
              keys: 0,
              ksize: 0,
              vsize: 0
            };
            this._killCheckPeriod();
            this._checkData(_startPeriod);
            this.emit("flush");
          }
          flushStats() {
            boundMethodCheck(this, NodeCache3);
            this.stats = {
              hits: 0,
              misses: 0,
              keys: 0,
              ksize: 0,
              vsize: 0
            };
            this.emit("flush_stats");
          }
          close() {
            boundMethodCheck(this, NodeCache3);
            this._killCheckPeriod();
          }
          _checkData(startPeriod = true) {
            var key, ref, value;
            boundMethodCheck(this, NodeCache3);
            ref = this.data;
            for (key in ref) {
              value = ref[key];
              this._check(key, value);
            }
            if (startPeriod && this.options.checkperiod > 0) {
              this.checkTimeout = setTimeout(this._checkData, this.options.checkperiod * 1e3, startPeriod);
              if (this.checkTimeout != null && this.checkTimeout.unref != null) {
                this.checkTimeout.unref();
              }
            }
          }
          // ## _killCheckPeriod
          // stop the checkdata period. Only needed to abort the script in testing mode.
          _killCheckPeriod() {
            if (this.checkTimeout != null) {
              return clearTimeout(this.checkTimeout);
            }
          }
          _check(key, data) {
            var _retval;
            boundMethodCheck(this, NodeCache3);
            _retval = true;
            if (data.t !== 0 && data.t < Date.now()) {
              if (this.options.deleteOnExpire) {
                _retval = false;
                this.del(key);
              }
              this.emit("expired", key, this._unwrap(data));
            }
            return _retval;
          }
          _isInvalidKey(key) {
            var ref;
            boundMethodCheck(this, NodeCache3);
            if (ref = typeof key, indexOf.call(this.validKeyTypes, ref) < 0) {
              return this._error("EKEYTYPE", {
                type: typeof key
              });
            }
          }
          _wrap(value, ttl, asClone = true) {
            var livetime, now, oReturn, ttlMultiplicator;
            boundMethodCheck(this, NodeCache3);
            if (!this.options.useClones) {
              asClone = false;
            }
            now = Date.now();
            livetime = 0;
            ttlMultiplicator = 1e3;
            if (ttl === 0) {
              livetime = 0;
            } else if (ttl) {
              livetime = now + ttl * ttlMultiplicator;
            } else {
              if (this.options.stdTTL === 0) {
                livetime = this.options.stdTTL;
              } else {
                livetime = now + this.options.stdTTL * ttlMultiplicator;
              }
            }
            return oReturn = {
              t: livetime,
              v: asClone ? clone(value) : value
            };
          }
          // ## _unwrap
          // internal method to extract get the value out of the wrapped value
          _unwrap(value, asClone = true) {
            if (!this.options.useClones) {
              asClone = false;
            }
            if (value.v != null) {
              if (asClone) {
                return clone(value.v);
              } else {
                return value.v;
              }
            }
            return null;
          }
          // ## _getKeyLength
          // internal method the calculate the key length
          _getKeyLength(key) {
            return key.toString().length;
          }
          _getValLength(value) {
            boundMethodCheck(this, NodeCache3);
            if (typeof value === "string") {
              return value.length;
            } else if (this.options.forceString) {
              return JSON.stringify(value).length;
            } else if (Array.isArray(value)) {
              return this.options.arrayValueSize * value.length;
            } else if (typeof value === "number") {
              return 8;
            } else if (typeof (value != null ? value.then : void 0) === "function") {
              return this.options.promiseValueSize;
            } else if (typeof Buffer !== "undefined" && Buffer !== null ? Buffer.isBuffer(value) : void 0) {
              return value.length;
            } else if (value != null && typeof value === "object") {
              return this.options.objectValueSize * Object.keys(value).length;
            } else if (typeof value === "boolean") {
              return 8;
            } else {
              return 0;
            }
          }
          _error(type, data = {}) {
            var error;
            boundMethodCheck(this, NodeCache3);
            error = new Error();
            error.name = type;
            error.errorcode = type;
            error.message = this.ERRORS[type] != null ? this.ERRORS[type](data) : "-";
            error.data = data;
            return error;
          }
          _initErrors() {
            var _errMsg, _errT, ref;
            boundMethodCheck(this, NodeCache3);
            this.ERRORS = {};
            ref = this._ERRORS;
            for (_errT in ref) {
              _errMsg = ref[_errT];
              this.ERRORS[_errT] = this.createErrorMessage(_errMsg);
            }
          }
          createErrorMessage(errMsg) {
            return function(args) {
              return errMsg.replace("__key", args.type);
            };
          }
        }
        ;
        NodeCache3.prototype._ERRORS = {
          "ENOTFOUND": "Key `__key` not found",
          "ECACHEFULL": "Cache max keys amount exceeded",
          "EKEYTYPE": "The key argument has to be of type `string` or `number`. Found: `__key`",
          "EKEYSTYPE": "The keys argument has to be an array.",
          "ETTLTYPE": "The ttl argument has to be a number."
        };
        return NodeCache3;
      }.call(this);
    }).call(exports2);
  }
});

// node_modules/node-cache/index.js
var require_node_cache2 = __commonJS({
  "node_modules/node-cache/index.js"(exports2, module2) {
    (function() {
      var exports3;
      exports3 = module2.exports = require_node_cache();
      exports3.version = "5.1.2";
    }).call(exports2);
  }
});

// index.mts
var index_exports = {};
__export(index_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(index_exports);
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_lib_dynamodb = require("@aws-sdk/lib-dynamodb");
var import_node_cache = __toESM(require_node_cache2(), 1);
var myCache = new import_node_cache.default();
var ddbClient = new import_client_dynamodb.DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" });
var ddbDocClient = import_lib_dynamodb.DynamoDBDocumentClient.from(ddbClient);
var handler = async (event) => {
  try {
    const idPersonaje = event.queryStringParameters?.id;
    if (!idPersonaje) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Falta el par\xE1metro id en la URL." })
      };
    }
    let recuperar = myCache.get(idPersonaje);
    if (recuperar) {
      recuperar.id = idPersonaje;
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Registro encontrado", data: recuperar })
      };
    }
    const params = {
      TableName: process.env.DATAFUSIONADALOG_TABLE_NAME,
      FilterExpression: "idPersonaje = :id",
      ExpressionAttributeValues: { ":id": idPersonaje }
    };
    const result = await ddbDocClient.send(new import_lib_dynamodb.ScanCommand(params));
    if (result.Items && result.Items.length > 0) {
      myCache.set(idPersonaje, result.Items, 1800);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Registro encontrado", data: result.Items[0] })
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No se encontr\xF3 un registro con ese idPersonaje." })
      };
    }
  } catch (error) {
    console.error("Error al buscar registro:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al buscar registro", error: error.message })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
