(function webpackUniversalModuleDefinition(root, factory) {
  const define = () => { };
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  // else if (typeof define === 'function' && define.amd)
  //   define([], factory);
  else if (typeof exports === 'object')
    exports["jsunicode"] = factory();
  else
    root["jsunicode"] = factory();
})(this, function () {
  return /******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
        /******/
      }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
        /******/
      };
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
      /******/
    }
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
        /******/
      }
      /******/
    };
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
      /******/
    };
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
      /******/
    };
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
    /******/
  })
/************************************************************************/
/******/([
/* 0 */
/***/ (function (module, exports) {

      module.exports = {
        binaryFormat: {
          hex: "hex",
          buffer: "buffer",
          byteArray: "byteArray",
          Uint8Array: "Uint8Array",
          base64: "base64",
          count: "count"
        },
        encoding: {
          guess: "guess",
          utf8: "UTF-8",
          utf16: "UTF-16",
          utf16be: "UTF-16BE",
          utf16le: "UTF-16LE",
          utf32: "UTF-32",
          utf32be: "UTF-32BE",
          utf32le: "UTF-32LE"
        },
        BOMMismatchBehavior: {
          trustRequest: "trustRequest",
          "throw": "throw",
          trustBOM: "trustBOM",
        },
        BOMBehavior: {
          never: "never",
          preserve: "preserve",
          auto: "auto",
          always: "always"
        },
        lineEndingConversion: {
          none: "none",
          lf: "lf",
          crlf: "crlf",
          cr: "cr"
        }
      };


      /***/
    }),
/* 1 */
/***/ (function (module, exports) {

      /*
      The MIT License (MIT)
      Copyright (c) 2016 Jeremy Rann
      
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      */

      var jsunicodeError = function (message) {
        var error = Error.call(this, message);

        this.name = "jsunicodeException";
        this.message = error.message;
        this.stack = error.stack;
      };

      var intermediateInheritor = function () { };
      intermediateInheritor.prototype = Error.prototype;
      jsunicodeError.prototype = new intermediateInheritor();

      module.exports = jsunicodeError;



      /***/
    }),
/* 2 */
/***/ (function (module, exports, __webpack_require__) {

      /*
      The MIT License (MIT)
      Copyright (c) 2016 Jeremy Rann
      
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      */
      var jsuError = __webpack_require__(1);
      var constants = __webpack_require__(0);

      var textBuilder = function (throwOnError, lineEndingConversion, validate) {
        var textBuilderResult;
        var isValid = true;
        if (validate) {
          textBuilderResult = {};
        }
        else {
          textBuilderResult = [];
        }
        if (throwOnError !== true && throwOnError !== false) {
          // Throw Error instead of jsuError since this is a "should never happen" error
          throw new Error("throwOnError argument required");
        }

        var validateCodePoint = function (codePoint) {
          if (codePoint < 0) {
            return false;
          }
          else if (codePoint >= 0xd800 && codePoint <= 0xdfff) {
            return false;
          }
          else if (codePoint > 0x10ffff) {
            return false;
          }

          return true;
        };

        // This polyfill is necessary for browsers without String.fromCodePoint (sigh)
        // I suppose I could just use the fromCharCode option always, but I'm a bit worried that
        // at some point a JavaScript implementation will complain that fromCharCode is nonsense
        // for a low surrogate value (in other words, String.fromCharCode(0xde02) doesn't really
        // make sense)
        var fromCodePoint = function (highSurrogate, lowSurrogate) {
          var codePoint;
          // In this case, only one argument was passed in, which is the code point
          if (lowSurrogate === undefined) {
            codePoint = highSurrogate;
            if (String.hasOwnProperty("fromCodePoint")) {
              return String.fromCodePoint(codePoint);
            }
            else {
              if (codePoint >= 0x10000) {
                var basis = codePoint - 0x10000;
                highSurrogate = 0xd800 + (basis >> 10);
                lowSurrogate = 0xdc00 + (basis & 0x3ff);
                return String.fromCharCode(highSurrogate) + String.fromCharCode(lowSurrogate);
              }
              else {
                return String.fromCharCode(codePoint);
              }
            }
          }
          else { // Otherwise, we have a surrogate pair
            if (String.hasOwnProperty("fromCodePoint")) {
              codePoint = 0x10000 + ((highSurrogate - 0xD800) << 10) + (lowSurrogate - 0xDC00);
              return String.fromCodePoint(codePoint);
            }
            else {
              return String.fromCharCode(highSurrogate) + String.fromCharCode(lowSurrogate);
            }
          }
        };

        var addError = function (err) {
          if (validate) {
            textBuilderResult[err] = textBuilderResult[err] || 0;
            textBuilderResult[err]++;
            isValid = false;
          }
          else if (throwOnError) {
            throw new jsuError(err);
          }
          else {
            textBuilderResult.push("\ufffd");
          }
        };

        var addCodePoint = function (highSurrogate, lowSurrogate) {
          if (!validate) {
            textBuilderResult.push(fromCodePoint(highSurrogate, lowSurrogate));
          }
        };

        var getResult = function () {
          if (validate) {
            return {
              isValid: isValid,
              exception: false,
              errors: textBuilderResult
            };
          }

          var stringResult = [];
          var i;
          switch (lineEndingConversion) {
            case constants.lineEndingConversion.none:
              stringResult = textBuilderResult;
              break;
            case constants.lineEndingConversion.lf:
              for (i = 0; i < textBuilderResult.length; i++) {
                if (textBuilderResult[i] === "\r") {
                  if (textBuilderResult[i + 1] !== "\n") {
                    stringResult.push("\n");
                  }
                }
                else {
                  stringResult.push(textBuilderResult[i]);
                }
              }
              break;
            case constants.lineEndingConversion.cr:
              for (i = 0; i < textBuilderResult.length; i++) {
                if (textBuilderResult[i] === "\n") {
                  if (textBuilderResult[i - 1] !== "\r") {
                    stringResult.push("\r");
                  }
                }
                else {
                  stringResult.push(textBuilderResult[i]);
                }
              }
              break;
            case constants.lineEndingConversion.crlf:
              for (i = 0; i < textBuilderResult.length; i++) {
                if (textBuilderResult[i] === "\n") {
                  if (textBuilderResult[i - 1] !== "\r") {
                    stringResult.push("\r");
                    stringResult.push("\n");
                  }
                }
                else if (textBuilderResult[i] === "\r") {
                  if (textBuilderResult[i + 1] !== "\n") {
                    stringResult.push("\r");
                    stringResult.push("\n");
                  }
                }
                else {
                  stringResult.push(textBuilderResult[i]);
                }
              }
              break;
            default:
              throw new Error("Unrecognized lineEndingConversion option");
          }

          return stringResult.join("");
        };

        return {
          addError: addError,
          addCodePoint: addCodePoint,
          validateCodePoint: validateCodePoint,
          getResult: getResult
        };
      };

      exports.textBuilder = textBuilder;



      /***/
    }),
/* 3 */
/***/ (function (module, exports, __webpack_require__) {

      /*
      The MIT License (MIT)
      Copyright (c) 2016 Jeremy Rann
      
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      */
      /*global Uint8Array */
      var jsuError = __webpack_require__(1);
      var constants = __webpack_require__(0);
      var byteReaders = {};

      // DEPRECATED: Use registerFactory or registerPrototype instead
      var register = function (name, byteReader) {
        byteReaders[name] = byteReader;
      };

      var registerFactory = function (name, byteReaderFactory) {
        if (typeof (byteReaderFactory) !== "function") {
          throw new Error("byteReaderFactory must be a function");
        }

        byteReaders[name] = byteReaderFactory;
      };

      var registerPrototype = function (name, byteReaderPrototype) {
        if (typeof (byteReaderPrototype) !== "function") {
          throw new Error("byteReaderPrototype must be a function");
        }

        byteReaders[name] = function () { return new byteReaderPrototype(); };
      };

      var unregister = function (name) {
        delete byteReaders[name];
      };

      registerFactory(constants.binaryFormat.hex, function () {
        var inpString;
        var index;

        var begin = function (value) {
          if (typeof (value) !== "string") {
            throw new Error("Invalid data type (expected type of string)");
          }
          inpString = value;
          index = 0;
          if (value.length % 2 !== 0) {
            throw new jsuError("Invalid hex string length");
          }
        };

        var read = function () {
          if (index >= inpString.length) {
            return null;
          }

          var currentByte = parseInt(inpString.substring(index, index + 2), 16);
          if (isNaN(currentByte)) {
            throw new jsuError("Invalid hex byte");
          }
          index = index + 2;
          return currentByte;
        };

        var deserialize = function (inpStr) {
          return inpStr;
        };

        return {
          begin: begin,
          read: read,
          deserialize: deserialize
        };
      });

      registerFactory(constants.binaryFormat.buffer, function () {
        var buffer;
        var index;

        var begin = function (value) {
          if (!(value instanceof Buffer)) {
            throw new Error("Invalid data type (expected instance of Buffer)");
          }
          buffer = value;
          index = 0;
        };

        var read = function () {
          if (index >= buffer.length) {
            return null;
          }

          return buffer.readUInt8(index++);
        };

        var deserialize = function (inpStr) {
          return JSON.parse(inpStr);
        };

        return {
          begin: begin,
          read: read,
          deserialize: deserialize
        };
      });

      var byteArrayReader = function (isTyped) {
        var arr;
        var index;

        var begin = function (value) {
          if (!(typeof (value) === "object")) {
            throw new Error("Invalid data type (expected typeof object)");
          }
          if (isTyped && !(value instanceof Uint8Array)) {
            throw new Error("Invalid data type (expected instance of Uint8Array)");
          }
          arr = value;
          index = 0;
        };

        var read = function () {
          if (index >= arr.length) {
            return null;
          }

          return arr[index++];
        };

        var deserialize;
        if (isTyped) {
          deserialize = function (inpStr) {
            return new Uint8Array(JSON.parse(inpStr));
          };
        }
        else {
          deserialize = function (inpStr) {
            return JSON.parse(inpStr);
          };
        }

        return {
          begin: begin,
          read: read,
          deserialize: deserialize
        };
      };

      registerFactory(constants.binaryFormat.byteArray, function () { return byteArrayReader(false); });
      registerFactory(constants.binaryFormat.Uint8Array, function () { return byteArrayReader(true); });

      var b64 = {
        "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6, "H": 7, "I": 8,
        "J": 9, "K": 10, "L": 11, "M": 12, "N": 13, "O": 14, "P": 15, "Q": 16,
        "R": 17, "S": 18, "T": 19, "U": 20, "V": 21, "W": 22, "X": 23, "Y": 24,
        "Z": 25, "a": 26, "b": 27, "c": 28, "d": 29, "e": 30, "f": 31, "g": 32,
        "h": 33, "i": 34, "j": 35, "k": 36, "l": 37, "m": 38, "n": 39, "o": 40,
        "p": 41, "q": 42, "r": 43, "s": 44, "t": 45, "u": 46, "v": 47, "w": 48,
        "x": 49, "y": 50, "z": 51, "0": 52, "1": 53, "2": 54, "3": 55, "4": 56,
        "5": 57, "6": 58, "7": 59, "8": 60, "9": 61, "+": 62, "/": 63
      };

      registerFactory(constants.binaryFormat.base64, function () {
        var inpString;
        var byteIndex;
        var charIndex;
        var buffer;
        var bufferedByteLength;

        var begin = function (value) {
          if (typeof (value) !== "string") {
            throw new Error("Invalid data type (expected typeof string)");
          }
          if (value.length % 4 !== 0) {
            throw new jsuError("base64 string length not divisible by 4 (padding is required)");
          }

          inpString = value;
          buffer = [null, null, null];
          byteIndex = 0;
          charIndex = 0;
          bufferedByteLength = (inpString.length / 4) * 3;
        };

        var read = function () {
          if (byteIndex >= bufferedByteLength) {
            return null;
          }

          if (byteIndex % 3 === 0) {
            var chars = inpString.substr(charIndex, 4);
            charIndex += 4;
            var byteParts = [null, null, null, null];
            for (var i = 0; i < 4; i++) {
              if (chars[i] === "=") {
                // Padding characters should only be at the end, and if the 2nd to last char is =, the last must be too
                if ((byteIndex + 3 < bufferedByteLength || i < 2) || (i === 2 && chars[3] !== "=")) {
                  throw new jsuError("Unexpected padding character");
                }
                else {
                  bufferedByteLength--;
                  byteParts[i] = null;
                }
              }
              else {
                byteParts[i] = b64[chars[i]];
                if (byteParts[i] === undefined) {
                  throw new jsuError("Unrecognized base64 character");
                }
              }
            }
            buffer[0] = (byteParts[0] << 2) + ((byteParts[1] & 0x30) >> 4);
            if (byteParts[2] !== null) {
              buffer[1] = ((byteParts[1] & 0xf) << 4) + ((byteParts[2] & 0x3C) >> 2);
            }
            if (byteParts[3] !== null) {
              buffer[2] = ((byteParts[2] & 0x3) << 6) + byteParts[3];
            }
          }

          var currentByte = buffer[byteIndex % 3];
          byteIndex++;
          return currentByte;
        };

        var deserialize = function (inpStr) {
          return inpStr;
        };

        return {
          begin: begin,
          read: read,
          deserialize: deserialize
        };
      });

      var get = function (name, options) {
        var reader = byteReaders[name];
        if (typeof (reader) === "function") {
          return reader(options);
        }
        else if (reader === undefined) {
          return undefined;
        }
        else {
          reader.options = options;
          return reader;
        }
      };

      var list = function () {
        return Object.keys(byteReaders);
      };

      exports.registerFactory = registerFactory;
      exports.registerPrototype = registerPrototype;
      exports.register = register;
      exports.unregister = unregister;
      exports.get = get;
      exports.list = list;



      /***/
    }),
/* 4 */
/***/ (function (module, exports, __webpack_require__) {

      /*
      The MIT License (MIT)
      Copyright (c) 2016 Jeremy Rann
      
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      */
      /* global Uint8Array */
      var byteWriters = {};
      var jsuError = __webpack_require__(1);
      var contants = __webpack_require__(0);

      // DEPRECATED: Use registerFactory or registerPrototype instead
      var register = function (name, byteWriter) {
        byteWriters[name] = byteWriter;
      };

      var registerFactory = function (name, byteWriterFactory) {
        if (typeof (byteWriterFactory) !== "function") {
          throw new Error("byteWriterFactory must be a function");
        }

        byteWriters[name] = byteWriterFactory;
      };

      var registerPrototype = function (name, byteWriterPrototype) {
        if (typeof (byteWriterPrototype) !== "function") {
          throw new Error("byteWriterPrototype must be a function");
        }

        byteWriters[name] = function () { return new byteWriterPrototype(); };
      };

      var unregister = function (name) {
        delete byteWriters[name];
      };

      registerFactory(contants.binaryFormat.hex, function (options) {
        var bytes = [];
        if (!options) { options = {}; }
        options = {
          upperCase: options.upperCase || false
        };

        var write = function (currentByte) {
          if (currentByte === 0) {
            bytes.push("00");
          }
          else {
            var result = currentByte.toString(16);
            if (result.length < 2) {
              result = "0" + result;
            }

            if (options.upperCase) {
              result = result.toUpperCase();
            }
            else {
              result = result.toLowerCase();
            }

            bytes.push(result);
          }
        };

        var finish = function () {
          return bytes.join("");
        };

        var serialize = function (bytes) {
          return bytes;
        };

        return {
          write: write,
          finish: finish,
          serialize: serialize
        };
      });

      registerFactory(contants.binaryFormat.byteArray, function () {
        var bytes = [];

        var write = function (currentByte) {
          bytes.push(currentByte);
        };

        var finish = function () {
          return bytes;
        };

        var serialize = function (bytes) {
          return JSON.stringify(bytes);
        };

        return {
          write: write,
          finish: finish,
          serialize: serialize

        };
      });

      var Uint8ArrayWriter = function () {
        var bytes = [];

        var write = function (currentByte) {
          bytes.push(currentByte);
        };

        var finish = function () {
          return new Uint8Array(bytes);
        };

        var serialize = function (bytes) {
          return JSON.stringify(Array.prototype.slice.call(bytes));
        };

        return {
          write: write,
          finish: finish,
          serialize: serialize
        };
      };

      registerFactory(contants.binaryFormat.Uint8Array, Uint8ArrayWriter);

      registerFactory(contants.binaryFormat.buffer, function () {
        var arrayWriter = Uint8ArrayWriter();

        var finish = function () {
          return Buffer.from(arrayWriter.finish());
        };

        var serialize = function (bytes) {
          return JSON.stringify(bytes);
        };

        return {
          write: arrayWriter.write,
          finish: finish,
          serialize: serialize
        };
      });

      registerFactory(contants.binaryFormat.count, function () {
        var byteCount = 0;
        var write = function () {
          byteCount++;
        };

        var finish = function () {
          return byteCount;
        };

        var serialize = function (bytes) {
          return bytes.toString();
        };

        return {
          write: write,
          finish: finish,
          serialize: serialize
        };
      });

      var b64 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
        "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
        "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g",
        "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
        "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2",
        "3", "4", "5", "6", "7", "8", "9", "+", "/"];

      registerFactory(contants.binaryFormat.base64, function () {
        var result = [];
        var firstByte = null;
        var secondByte = null;

        var write = function (currentByte) {
          if (firstByte === null) {
            firstByte = currentByte;
          }
          else if (secondByte === null) {
            secondByte = currentByte;
          }
          else {
            result.push(b64[firstByte >> 2]);
            result.push(b64[((firstByte & 0x3) << 4) + (secondByte >> 4)]);
            result.push(b64[((secondByte & 0xf) << 2) + (currentByte >> 6)]);
            result.push(b64[currentByte & 0x3f]);
            firstByte = null;
            secondByte = null;
          }
        };

        var finish = function () {
          if (firstByte !== null) {
            if (secondByte !== null) {
              result.push(b64[firstByte >> 2]);
              result.push(b64[((firstByte & 0x3) << 4) + (secondByte >> 4)]);
              result.push(b64[((secondByte & 0xf) << 2)]);
              result.push("=");
            }
            else {
              result.push(b64[firstByte >> 2]);
              result.push(b64[((firstByte & 0x3) << 4)]);
              result.push("==");
            }
          }
          return result.join("");
        };

        var serialize = function (bytes) {
          return bytes;
        };

        return {
          write: write,
          finish: finish,
          serialize: serialize
        };
      });

      var get = function (name, options) {
        var writer = byteWriters[name];
        if (typeof (writer) === "function") {
          writer = writer(options);
        }
        else if (writer === undefined) {
          return undefined;
        }
        else {
          writer.options = options;
        }

        return {
          write: function (currentByte) {
            if (typeof (currentByte) !== "number" || currentByte < 0 || currentByte > 255) {
              throw new jsuError("Invalid byte");
            }

            return writer.write(currentByte);
          },
          finish: writer.finish,
          serialize: writer.serialize
        };
      };

      var list = function () {
        return Object.keys(byteWriters);
      };

      exports.register = register;
      exports.registerFactory = registerFactory;
      exports.registerPrototype = registerPrototype;
      exports.unregister = unregister;
      exports.get = get;
      exports.list = list;



      /***/
    }),
/* 5 */
/***/ (function (module, exports, __webpack_require__) {

      /*
      The MIT License (MIT)
      Copyright (c) 2016 Jeremy Rann
      
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      */
      var encodings = __webpack_require__(6);
      var utf32 = __webpack_require__(7);
      var utf16 = __webpack_require__(8);
      var utf8 = __webpack_require__(9);
      var byteReader = __webpack_require__(3);
      var byteWriter = __webpack_require__(4);
      var jsunicodeError = __webpack_require__(1);
      var constants = __webpack_require__(0);

      encodings.register(constants.encoding.utf8, utf8);
      encodings.register(constants.encoding.utf16, utf16);
      encodings.register(constants.encoding.utf16be, utf16);
      encodings.register(constants.encoding.utf16le, utf16);
      encodings.register(constants.encoding.utf32, utf32);
      encodings.register(constants.encoding.utf32be, utf32);
      encodings.register(constants.encoding.utf32le, utf32);

      var countEncodedBytes = function (inpString, encoding) {
        if (encoding === undefined) {
          encoding = constants.encoding.utf8;
        }

        var result = encodings.encode(inpString, {
          encoding: encoding,
          byteWriter: constants.binaryFormat.count,
          throwOnError: true
        });

        return result;
      };

      var convertBytes = function (inpBytes, byteReaderName, byteWriterName, options) {
        options = options || {};
        options.byteReaderOptions = options.byteReaderOptions || {};
        options.byteWriterOptions = options.byteWriterOptions || {};

        var currentByteReader = byteReader.get(byteReaderName, options.byteReaderOptions);
        var currentByteWriter = byteWriter.get(byteWriterName, options.byteWriterOptions);

        currentByteReader.begin(inpBytes);
        var currentByte = currentByteReader.read();
        while (currentByte !== null) {
          currentByteWriter.write(currentByte);
          currentByte = currentByteReader.read();
        }

        return currentByteWriter.finish();
      };

      exports.constants = constants;
      exports.decode = encodings.decode;
      exports.encode = encodings.encode;
      exports.validate = encodings.validate;
      exports.createPeekableByteReader = encodings.createPeekableByteReader;
      exports.byteReader = byteReader;
      exports.byteWriter = byteWriter;
      exports.convertBytes = convertBytes;
      exports.countEncodedBytes = countEncodedBytes;
      exports.jsunicodeError = jsunicodeError;



      /***/
    }),
/* 6 */
/***/ (function (module, exports, __webpack_require__) {

      /*
      The MIT License (MIT)
      Copyright (c) 2016 Jeremy Rann
      
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      */
      var jsuError = __webpack_require__(1);
      var byteReader = __webpack_require__(3);
      var byteWriter = __webpack_require__(4);
      var constants = __webpack_require__(0);
      var encodings = {};

      var createPeekableByteReader = function (byteReader) {
        var buffer = [];

        var fillBuffer = function (count) {
          for (var i = buffer.length; i < count; i++) {
            buffer.push(byteReader.read());
          }
        };

        var begin = function (value) {
          return byteReader.begin(value);
        };

        var read = function () {
          if (buffer.length > 0) {
            return buffer.shift();
          }
          else {
            return byteReader.read();
          }
        };

        var peekArray = function (byteCount) {
          fillBuffer(byteCount);
          return buffer.slice(0, byteCount);
        };

        var peekByte = function () {
          return peekArray(1)[0];
        };

        var deserialize = function (inpStr) {
          return byteReader.deserialize(inpStr);
        };

        var skip = function (count) {
          if (!count) {
            count = 1;
          }

          fillBuffer(count);
          return buffer.splice(0, count);
        };

        // (this is a crappy compare; don't use it broadly)
        var arrayCompare = function (leftArray, rightArray) {
          for (var i = 0; i < leftArray.length; i++) {
            if (leftArray[i] !== rightArray[i]) {
              return false;
            }
          }

          return true;
        };

        var checkBOM = function (checkUTF32) {
          var firstBytes = peekArray(4);

          if (arrayCompare([0xef, 0xbb, 0xbf], firstBytes)) {
            return constants.encoding.utf8;
          }
          // Order matters here; a UTF-32LE BOM is a UTF-16LE BOM with two null bytes afterwards
          else if (checkUTF32 && arrayCompare([0x00, 0x00, 0xfe, 0xff], firstBytes)) {
            return constants.encoding.utf32be;
          }
          else if (checkUTF32 && arrayCompare([0xff, 0xfe, 0x00, 0x00], firstBytes)) {
            return constants.encoding.utf32le;
          }
          else if (arrayCompare([0xfe, 0xff], firstBytes)) {
            return constants.encoding.utf16be;
          }
          else if (arrayCompare([0xff, 0xfe], firstBytes)) {
            return constants.encoding.utf16le;
          }

          return null;
        };

        return {
          begin: begin,
          checkBOM: checkBOM,
          deserialize: deserialize,
          peekArray: peekArray,
          peekByte: peekByte,
          read: read,
          skip: skip
        };
      };

      var registerEncoding = function (encodingName, encoding) {
        encodings[encodingName] = encoding;
      };

      var getEncoding = function (encodingName) {
        return encodings[encodingName];
      };

      // Resolve a JavaScript string into an array of unicode code points
      var getCodePoints = function (inpString, throwOnError, lineEndingConversion) {
        var result = [];
        var searchingForSurrogate = false;
        var highSurrogate = null;
        var handleError = function (message) {
          if (throwOnError) {
            throw new jsuError(message);
          }
          else {
            result.push(0xfffd);
          }
        };

        for (var i = 0; i < inpString.length; i++) {
          var currentPoint = inpString.charCodeAt(i);
          // currentPoint < 0? Probably not possible, but covering bases anyway
          if (currentPoint > 0xffff || currentPoint < 0) {
            handleError("String contains invalid character data");
            // If we're looking for a low surrogate, we now have two errors; one for the missing pair,
            // and one for the strange found character
            if (searchingForSurrogate) {
              result.push(0xfffd);
              searchingForSurrogate = false;
            }
          }
          else if (currentPoint <= 0xd7ff || currentPoint >= 0xE000) {
            if (searchingForSurrogate === true) {
              handleError("Unmatched surrogate pair in string");
              searchingForSurrogate = false;
            }

            if (lineEndingConversion === constants.lineEndingConversion.lf) {
              if (currentPoint === 0x0d) {
                if (inpString.charCodeAt(i + 1) === 0x0a) {
                  continue;
                }
                else {
                  currentPoint = 0x0a;
                }
              }
            }
            else if (lineEndingConversion === constants.lineEndingConversion.cr) {
              if (currentPoint === 0x0d) {
                if (inpString.charCodeAt(i + 1) === 0x0a) {
                  i++;
                }
              }
              else if (currentPoint === 0x0a) {
                currentPoint = 0x0d;
              }
            }
            else if (lineEndingConversion === constants.lineEndingConversion.crlf) {
              if (currentPoint === 0x0d) {
                if (inpString.charCodeAt(i + 1) !== 0x0a) {
                  result.push(0x0d);
                  currentPoint = 0x0a;
                }
              }
              else if (currentPoint === 0x0a) {
                if (inpString.charCodeAt(i - 1) !== 0x0d) {
                  result.push(0x0d);
                }
              }
            }

            result.push(currentPoint);
          }
          else {
            if (searchingForSurrogate) {
              if (currentPoint < 0xdc00) {
                handleError("Low surrogate value not valid");
              }
              else {
                result.push((0x10000 + ((highSurrogate - 0xd800) << 10) + currentPoint - 0xdc00));
              }
              searchingForSurrogate = false;
            }
            else {
              if (currentPoint >= 0xdc00) {
                handleError("Unexpected high surrogate found");
              }
              else {
                searchingForSurrogate = true;
                highSurrogate = currentPoint;
              }
            }
          }
        }

        if (searchingForSurrogate) {
          handleError("Unexpected end of string (unmatched surrogate pair)");
        }

        return result;
      };

      var encode = function (inpString, options) {
        if (inpString !== null && typeof (inpString) !== "string") {
          throw new Error("Invalid data type (expected type of string");
        }
        if (!options) { options = {}; }
        options = {
          encoding: options.encoding || constants.encoding.utf8,
          byteWriter: options.byteWriter || constants.binaryFormat.hex,
          throwOnError: options.throwOnError || false,
          byteWriterOptions: options.byteWriterOptions || {},
          BOMBehavior: options.BOMBehavior || constants.BOMBehavior.never,
          lineEndingConversion: options.lineEndingConversion || constants.lineEndingConversion.none
        };

        var encoding = getEncoding(options.encoding);
        if (encoding === undefined) {
          throw new jsuError("Unrecognized encoding: " + options.encoding);
        }

        var writer = byteWriter.get(options.byteWriter, options.byteWriterOptions);
        if (writer === undefined) {
          throw new jsuError("Unrecognized byte writer name: " + options.byteWriter);
        }

        if (inpString === null || inpString === undefined) {
          return inpString;
        }

        var codePoints = getCodePoints(inpString, options.throwOnError, options.lineEndingConversion);

        var addBOM = false;
        var removeBOM = false;
        switch (options.BOMBehavior) {
          case constants.BOMBehavior.never:
            removeBOM = true;
            break;
          case constants.BOMBehavior.auto:
            addBOM = options.encoding.startsWith(constants.encoding.utf16);
            removeBOM = !addBOM;
            break;
          case constants.BOMBehavior.always:
            addBOM = true;
            break;
        }

        if (addBOM && codePoints[0] !== 0xfeff) {
          codePoints.unshift(0xfeff);
        }
        else if (removeBOM && codePoints[0] === 0xfeff) {
          codePoints.shift();
        }

        encoding.encode(codePoints, writer, options);

        var result = writer.finish();

        return result;
      };

      var decode = function (inpBytes, options) {
        if (options && options.validate === true) {
          try {
            return decodeInternal(inpBytes, options);
          }
          catch (error) {
            var errorMessage = "Unexpected " + ((error instanceof jsuError) ? "JSUnicode " : "") +
              "exception encountered";

            if (error && error.message && typeof (error.message) === "string") {
              errorMessage = errorMessage + ": " + error.message;
            }
            else if (typeof (error) === "string") {
              errorMessage = errorMessage + ": " + error;
            }

            var errorObject = {};
            errorObject[errorMessage] = 1;

            return {
              isValid: false,
              exception: true,
              errors: errorObject
            };
          }
        }
        else {
          return decodeInternal(inpBytes, options);
        }
      };

      var decodeInternal = function (inpBytes, options) {
        if (!options) { options = {}; }
        if (options.validate !== undefined && typeof (options.validate) !== "boolean") {
          throw new jsuError("Validate option must be of type boolean (got " + typeof (options.validate));
        }
        options = {
          encoding: options.encoding || constants.encoding.guess,
          byteReader: options.byteReader || constants.binaryFormat.hex,
          throwOnError: options.throwOnError || false,
          validate: options.validate || false,
          byteReaderOptions: options.byteReaderOptions || {},
          preserveBOM: options.preserveBOM || false,
          detectUTF32BOM: options.detectUTF32BOM || false,
          BOMMismatchBehavior: options.BOMMismatchBehavior || constants.BOMMismatchBehavior.throw,
          lineEndingConversion: options.lineEndingConversion || constants.lineEndingConversion.none
        };

        var reader = byteReader.get(options.byteReader, options.byteReaderOptions);
        if (reader === undefined) {
          throw new jsuError("Unrecognized byte reader name: " + options.byteReader);
        }
        reader = createPeekableByteReader(reader);

        if (options.encoding && options.encoding !== "guess") {
          if (!encodings.hasOwnProperty(options.encoding)) {
            throw new jsuError("Unrecognized encoding: " + options.encoding);
          }
        }

        if (inpBytes === null || inpBytes === undefined) {
          return inpBytes;
        }

        reader.begin(inpBytes);

        var bom = reader.checkBOM(options.detectUTF32BOM || options.encoding.startsWith(constants.encoding.utf32));
        if (bom) {
          // The value of "bom" might change if there's a mismatch (depending on options); go ahead and remove
          // the BOM first in case the number of bytes in the new BOM is different than the detected value
          if (!options.preserveBOM) {
            if (bom === constants.encoding.utf8) {
              reader.skip(3);
            }
            else if (bom.startsWith(constants.encoding.utf16)) {
              reader.skip(2);
            }
            else if (bom.startsWith(constants.encoding.utf32)) {
              reader.skip(4);
            }
          }

          var bomMismatch = false;
          if (options.encoding && options.encoding !== "guess") {
            switch (options.encoding) {
              case constants.encoding.utf16:
                bomMismatch = [constants.encoding.utf16le, constants.encoding.utf16be].indexOf(bom) < 0;
                break;
              case constants.encoding.utf32:
                bomMismatch = [constants.encoding.utf32le, constants.encoding.utf32be].indexOf(bom) < 0;
                break;
              default:
                bomMismatch = options.encoding !== bom;
                break;
            }
          }

          if (bomMismatch) {
            if (options.BOMMismatchBehavior === constants.BOMMismatchBehavior.throw) {
              throw new jsuError("Byte Order Mark/encoding mismatch");
            }
            else if (options.BOMMismatchBehavior === constants.BOMMismatchBehavior.trustRequest) {
              bom = options.encoding;
            }
          }

          options.encoding = bom;
        }

        if (options.encoding === "guess") {
          options.encoding = constants.encoding.utf8;
        }

        var encoding = getEncoding(options.encoding);

        var result = encoding.decode(reader, options);
        return result;
      };

      var validate = function (inpBytes, options) {
        if (!options) { options = {}; }
        options.validate = true;
        return decode(inpBytes, options);
      };

      exports.createPeekableByteReader = createPeekableByteReader;
      exports.register = registerEncoding;
      exports.get = getEncoding;
      exports.decode = decode;
      exports.encode = encode;
      exports.validate = validate;



      /***/
    }),
/* 7 */
/***/ (function (module, exports, __webpack_require__) {

      /*
      The MIT License (MIT)
      Copyright (c) 2016 Jeremy Rann
      
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      */
      var encUtil = __webpack_require__(2);
      var constants = __webpack_require__(0);

      var decode = function (reader, options) {
        var textBuilder = encUtil.textBuilder(options.throwOnError, options.lineEndingConversion, options.validate);
        var isLittleEndian = false;

        if (options.encoding === constants.encoding.utf32le || options.isLittleEndian) {
          isLittleEndian = true;
        }

        var bytes = [reader.read(), reader.read(), reader.read(), reader.read()];

        while (bytes[0] !== null) {
          if (bytes[1] === null || bytes[2] === null || bytes[3] === null) {
            textBuilder.addError("Unexpected end of input");
          }
          else if (bytes[0] < 0 || bytes[1] < 0 || bytes[2] < 0 || bytes[3] < 0 ||
            bytes[0] > 0xff || bytes[1] > 0xff || bytes[2] > 0xff || bytes[3] > 0xff) {
            textBuilder.addError("Invalid byte");
          }
          else {
            var codePoint;
            if (isLittleEndian) {
              codePoint = ((bytes[3] << 24) >>> 0) + (bytes[2] << 16) + (bytes[1] << 8) + bytes[0];
            }
            else {
              codePoint = ((bytes[0] << 24) >>> 0) + (bytes[1] << 16) + (bytes[2] << 8) + bytes[3];
            }

            textBuilder.addCodePoint(codePoint);
          }

          bytes = [reader.read(), reader.read(), reader.read(), reader.read()];
        }

        return textBuilder.getResult();
      };

      var encode = function (codePoints, writer, options) {
        var isLittleEndian = false;

        if (options.encoding === constants.encoding.utf32le || options.isLittleEndian) {
          isLittleEndian = true;
        }

        for (var i = 0; i < codePoints.length; i++) {
          var codePoint = codePoints[i];
          if (isLittleEndian) {
            writer.write(codePoint & 0xff);
            writer.write((codePoint & 0xff00) >> 8);
            writer.write((codePoint & 0xff0000) >> 16);
            writer.write((codePoint & 0xff000000) >>> 24);
          }
          else {
            writer.write((codePoint & 0xff000000) >>> 24);
            writer.write((codePoint & 0xff0000) >> 16);
            writer.write((codePoint & 0xff00) >> 8);
            writer.write(codePoint & 0xff);
          }
        }
      };

      exports.decode = decode;
      exports.encode = encode;



      /***/
    }),
/* 8 */
/***/ (function (module, exports, __webpack_require__) {

      /*
      The MIT License (MIT)
      Copyright (c) 2016 Jeremy Rann
      
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      */
      var encUtil = __webpack_require__(2);
      var constants = __webpack_require__(0);

      var decode = function (reader, options) {
        var textBuilder = encUtil.textBuilder(options.throwOnError, options.lineEndingConversion, options.validate);
        var isLittleEndian = false;

        if (options.encoding === constants.encoding.utf16le || options.isLittleEndian) {
          isLittleEndian = true;
        }

        var firstByte = reader.read();
        var secondByte = reader.read();
        var codePoint;
        var surrogateCodePoint = null;
        while (firstByte !== null) {
          if (secondByte === null) {
            textBuilder.addError("Odd number of bytes in byte stream (must be even for UTF-16)");
          }
          else if (firstByte < 0 || firstByte > 0xff || secondByte < 0 || secondByte > 0xff) {
            textBuilder.addError("Invalid byte");
          }
          else {
            if (isLittleEndian) {
              codePoint = secondByte * 0x100 + firstByte;
            }
            else {
              codePoint = firstByte * 0x100 + secondByte;
            }

            if (surrogateCodePoint !== null) {
              if (codePoint < 0xDC00 || codePoint > 0xDFFF) {
                textBuilder.addError("Surrogate code point not found when expected");
              }
              else {
                textBuilder.addCodePoint(surrogateCodePoint, codePoint);
              }
              surrogateCodePoint = null;
            }
            else {
              if (codePoint >= 0xDC00 && codePoint <= 0xDFFF) {
                textBuilder.addError("Invalid code point (in high surrogate range)");
                surrogateCodePoint = null;
              }
              else if (codePoint >= 0xD800 && codePoint <= 0xDBFF) {
                surrogateCodePoint = codePoint;
              }
              else {
                textBuilder.addCodePoint(codePoint);
                surrogateCodePoint = null;
              }
            }
          }
          firstByte = reader.read();
          secondByte = reader.read();
        }
        if (surrogateCodePoint !== null) {
          textBuilder.addError("High surrogate code point at end of byte stream (expected corresponding low surrogate code point)");
        }

        return textBuilder.getResult();
      };

      var encode = function (codePoints, writer, options) {
        var isLittleEndian = false;

        if (options.encoding === constants.encoding.utf16le || options.isLittleEndian) {
          isLittleEndian = true;
        }

        var writeTwoBytes = function (number) {
          if (isLittleEndian) {
            writer.write(number & 0xff);
            writer.write((number & 0xff00) >> 8);
          }
          else {
            writer.write((number & 0xff00) >> 8);
            writer.write(number & 0xff);
          }
        };

        for (var i = 0; i < codePoints.length; i++) {
          var codePoint = codePoints[i];
          // We're not going to bother validating code points here; the encoding library should take care of that
          // for us before we get here
          if (codePoint < 0x10000) {
            writeTwoBytes(codePoint);
          }
          else {
            var basis = codePoint - 0x10000;
            var highSurrogate = 0xd800 + (basis >> 10);
            var lowSurrogate = 0xdc00 + (basis & 0x3ff);
            writeTwoBytes(highSurrogate);
            writeTwoBytes(lowSurrogate);
          }
        }
      };

      exports.decode = decode;
      exports.encode = encode;



      /***/
    }),
/* 9 */
/***/ (function (module, exports, __webpack_require__) {

      /*
      The MIT License (MIT)
      Copyright (c) 2016 Jeremy Rann
      
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      */
      var encUtil = __webpack_require__(2);

      var decode = function (reader, options) {
        var currentByte = reader.read();
        var byteCount;
        var continuationByte;
        var codePoint;
        // Generally, it's invalid to encode a surrogate pair in UTF-8, but we'll allow a user
        // to specify that they have iffy data using the allowEncodedSurrogatePair option. In
        // that case, we still want to validate that the surrogate pair is really a pair.
        var highSurrogate = null;
        var textBuilder = encUtil.textBuilder(options.throwOnError, options.lineEndingConversion, options.validate);

        while (currentByte !== null) {
          if (currentByte < 0 || currentByte > 0xff) {
            textBuilder.addError("Invalid byte");
          }
          else if (currentByte < 0x80) {
            textBuilder.addCodePoint(currentByte);
            highSurrogate = null;
          }
          else {
            if ((currentByte & 0xe0) === 0xc0) {
              byteCount = 2;
              codePoint = (currentByte & 0x1f) << 6;
            }
            else if ((currentByte & 0xf0) === 0xe0) {
              byteCount = 3;
              codePoint = (currentByte & 0x0f) << 12;
            }
            else if ((currentByte & 0xf8) === 0xf0) {
              byteCount = 4;
              codePoint = (currentByte & 0x07) << 18;
            }
            else {
              textBuilder.addError("Invalid leading byte");
              currentByte = reader.read();
              continue;
            }

            for (var i = byteCount - 1; i > 0; i--) {
              continuationByte = reader.read();
              if (continuationByte === null) {
                textBuilder.addError("Unexpected end of byte stream");
              }
              else if ((continuationByte & 0xc0) !== 0x80) {
                textBuilder.addError("Invalid continuation byte");
              }
              else {
                codePoint += (continuationByte - 0x80) << ((i - 1) * 6);
              }
            }

            if (!textBuilder.validateCodePoint(codePoint)) {
              if (options.allowEncodedSurrogatePair && highSurrogate === null && codePoint >= 0xd800 && codePoint <= 0xdbff) {
                highSurrogate = codePoint;
              }
              else if (options.allowEncodedSurrogatePair && highSurrogate !== null && codePoint >= 0xdc00 && codePoint <= 0xdfff) {
                textBuilder.addCodePoint(highSurrogate, codePoint);
                highSurrogate = null;
              }
              else {
                textBuilder.addError("Invalid Unicode code point detected");
                highSurrogate = null;
              }
            }
            else {
              textBuilder.addCodePoint(codePoint);
              highSurrogate = null;
            }
          }
          currentByte = reader.read();
        }

        if (options.allowEncodedSurrogatePair && highSurrogate !== null) {
          textBuilder.addError("Unmatched encoded surrogate pair");
        }

        return textBuilder.getResult();
      };

      var encode = function (codePoints, writer/*, options*/) {
        for (var i = 0; i < codePoints.length; i++) {
          var codePoint = codePoints[i];
          if (codePoint < 0x80) {
            writer.write(codePoint);
          }
          else if (codePoint < 0x800) {
            writer.write(0xc0 + (codePoint >> 6));
            writer.write(0x80 + (codePoint & 0x3f));
          }
          else if (codePoint < 0x10000) {
            writer.write(0xe0 + (codePoint >> 12));
            writer.write(0x80 + ((codePoint >> 6) & 0x3f));
            writer.write(0x80 + (codePoint & 0x3f));
          }
          else {
            writer.write(0xf0 + (codePoint >> 18));
            writer.write(0x80 + ((codePoint >> 12) & 0x3f));
            writer.write(0x80 + ((codePoint >> 6) & 0x3f));
            writer.write(0x80 + (codePoint & 0x3f));
          }
        }
      };

      exports.decode = decode;
      exports.encode = encode;



      /***/
    })
/******/]);
});
//# sourceMappingURL=jsunicode.js.map
