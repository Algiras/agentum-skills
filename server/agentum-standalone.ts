// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  if (mod && typeof mod === "object" || typeof mod === "function") {
    for (let key of __getOwnPropNames(mod))
      if (!__hasOwnProp.call(to, key))
        __defProp(to, key, {
          get: __accessProp.bind(mod, key),
          enumerable: true
        });
  }
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};

// ../../../../Projects/agentum/node_modules/xmlchars/xml/1.0/ed5.js
var require_ed5 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CHAR = `\t
\r -\uD7FF\uE000-\uFFFD\uD800\uDC00-\uDBFF\uDFFF`;
  exports.S = ` 	\r
`;
  exports.NAME_START_CHAR = ":A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\uD800\uDC00-\uDB7F\uDFFF";
  exports.NAME_CHAR = "-" + exports.NAME_START_CHAR + ".0-9\xB7\u0300-\u036F\u203F-\u2040";
  exports.CHAR_RE = new RegExp("^[" + exports.CHAR + "]$", "u");
  exports.S_RE = new RegExp("^[" + exports.S + "]+$", "u");
  exports.NAME_START_CHAR_RE = new RegExp("^[" + exports.NAME_START_CHAR + "]$", "u");
  exports.NAME_CHAR_RE = new RegExp("^[" + exports.NAME_CHAR + "]$", "u");
  exports.NAME_RE = new RegExp("^[" + exports.NAME_START_CHAR + "][" + exports.NAME_CHAR + "]*$", "u");
  exports.NMTOKEN_RE = new RegExp("^[" + exports.NAME_CHAR + "]+$", "u");
  var TAB = 9;
  var NL = 10;
  var CR = 13;
  var SPACE = 32;
  exports.S_LIST = [SPACE, NL, CR, TAB];
  function isChar(c) {
    return c >= SPACE && c <= 55295 || c === NL || c === CR || c === TAB || c >= 57344 && c <= 65533 || c >= 65536 && c <= 1114111;
  }
  exports.isChar = isChar;
  function isS(c) {
    return c === SPACE || c === NL || c === CR || c === TAB;
  }
  exports.isS = isS;
  function isNameStartChar(c) {
    return c >= 65 && c <= 90 || c >= 97 && c <= 122 || c === 58 || c === 95 || c === 8204 || c === 8205 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 767 || c >= 880 && c <= 893 || c >= 895 && c <= 8191 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
  }
  exports.isNameStartChar = isNameStartChar;
  function isNameChar(c) {
    return isNameStartChar(c) || c >= 48 && c <= 57 || c === 45 || c === 46 || c === 183 || c >= 768 && c <= 879 || c >= 8255 && c <= 8256;
  }
  exports.isNameChar = isNameChar;
});

// ../../../../Projects/agentum/node_modules/xmlchars/xml/1.1/ed2.js
var require_ed2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CHAR = "\x01-\uD7FF\uE000-\uFFFD\uD800\uDC00-\uDBFF\uDFFF";
  exports.RESTRICTED_CHAR = "\x01-\b\v\f\x0E-\x1F\x7F-\x84\x86-\x9F";
  exports.S = ` 	\r
`;
  exports.NAME_START_CHAR = ":A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\uD800\uDC00-\uDB7F\uDFFF";
  exports.NAME_CHAR = "-" + exports.NAME_START_CHAR + ".0-9\xB7\u0300-\u036F\u203F-\u2040";
  exports.CHAR_RE = new RegExp("^[" + exports.CHAR + "]$", "u");
  exports.RESTRICTED_CHAR_RE = new RegExp("^[" + exports.RESTRICTED_CHAR + "]$", "u");
  exports.S_RE = new RegExp("^[" + exports.S + "]+$", "u");
  exports.NAME_START_CHAR_RE = new RegExp("^[" + exports.NAME_START_CHAR + "]$", "u");
  exports.NAME_CHAR_RE = new RegExp("^[" + exports.NAME_CHAR + "]$", "u");
  exports.NAME_RE = new RegExp("^[" + exports.NAME_START_CHAR + "][" + exports.NAME_CHAR + "]*$", "u");
  exports.NMTOKEN_RE = new RegExp("^[" + exports.NAME_CHAR + "]+$", "u");
  var TAB = 9;
  var NL = 10;
  var CR = 13;
  var SPACE = 32;
  exports.S_LIST = [SPACE, NL, CR, TAB];
  function isChar(c) {
    return c >= 1 && c <= 55295 || c >= 57344 && c <= 65533 || c >= 65536 && c <= 1114111;
  }
  exports.isChar = isChar;
  function isRestrictedChar(c) {
    return c >= 1 && c <= 8 || c === 11 || c === 12 || c >= 14 && c <= 31 || c >= 127 && c <= 132 || c >= 134 && c <= 159;
  }
  exports.isRestrictedChar = isRestrictedChar;
  function isCharAndNotRestricted(c) {
    return c === 9 || c === 10 || c === 13 || c > 31 && c < 127 || c === 133 || c > 159 && c <= 55295 || c >= 57344 && c <= 65533 || c >= 65536 && c <= 1114111;
  }
  exports.isCharAndNotRestricted = isCharAndNotRestricted;
  function isS(c) {
    return c === SPACE || c === NL || c === CR || c === TAB;
  }
  exports.isS = isS;
  function isNameStartChar(c) {
    return c >= 65 && c <= 90 || c >= 97 && c <= 122 || c === 58 || c === 95 || c === 8204 || c === 8205 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 767 || c >= 880 && c <= 893 || c >= 895 && c <= 8191 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
  }
  exports.isNameStartChar = isNameStartChar;
  function isNameChar(c) {
    return isNameStartChar(c) || c >= 48 && c <= 57 || c === 45 || c === 46 || c === 183 || c >= 768 && c <= 879 || c >= 8255 && c <= 8256;
  }
  exports.isNameChar = isNameChar;
});

// ../../../../Projects/agentum/node_modules/xmlchars/xmlns/1.0/ed3.js
var require_ed3 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.NC_NAME_START_CHAR = "A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\uD800\uDC00-\uDB7F\uDFFF";
  exports.NC_NAME_CHAR = "-" + exports.NC_NAME_START_CHAR + ".0-9\xB7\u0300-\u036F\u203F-\u2040";
  exports.NC_NAME_START_CHAR_RE = new RegExp("^[" + exports.NC_NAME_START_CHAR + "]$", "u");
  exports.NC_NAME_CHAR_RE = new RegExp("^[" + exports.NC_NAME_CHAR + "]$", "u");
  exports.NC_NAME_RE = new RegExp("^[" + exports.NC_NAME_START_CHAR + "][" + exports.NC_NAME_CHAR + "]*$", "u");
  function isNCNameStartChar(c) {
    return c >= 65 && c <= 90 || c === 95 || c >= 97 && c <= 122 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 767 || c >= 880 && c <= 893 || c >= 895 && c <= 8191 || c >= 8204 && c <= 8205 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
  }
  exports.isNCNameStartChar = isNCNameStartChar;
  function isNCNameChar(c) {
    return isNCNameStartChar(c) || (c === 45 || c === 46 || c >= 48 && c <= 57 || c === 183 || c >= 768 && c <= 879 || c >= 8255 && c <= 8256);
  }
  exports.isNCNameChar = isNCNameChar;
});

// ../../../../Projects/agentum/node_modules/saxes/saxes.js
var require_saxes = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SaxesParser = exports.EVENTS = undefined;
  var ed5 = require_ed5();
  var ed2 = require_ed2();
  var NSed3 = require_ed3();
  var isS = ed5.isS;
  var isChar10 = ed5.isChar;
  var isNameStartChar = ed5.isNameStartChar;
  var isNameChar = ed5.isNameChar;
  var S_LIST = ed5.S_LIST;
  var NAME_RE = ed5.NAME_RE;
  var isChar11 = ed2.isChar;
  var isNCNameStartChar = NSed3.isNCNameStartChar;
  var isNCNameChar = NSed3.isNCNameChar;
  var NC_NAME_RE = NSed3.NC_NAME_RE;
  var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
  var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
  var rootNS = {
    __proto__: null,
    xml: XML_NAMESPACE,
    xmlns: XMLNS_NAMESPACE
  };
  var XML_ENTITIES = {
    __proto__: null,
    amp: "&",
    gt: ">",
    lt: "<",
    quot: '"',
    apos: "'"
  };
  var EOC = -1;
  var NL_LIKE = -2;
  var S_BEGIN = 0;
  var S_BEGIN_WHITESPACE = 1;
  var S_DOCTYPE = 2;
  var S_DOCTYPE_QUOTE = 3;
  var S_DTD = 4;
  var S_DTD_QUOTED = 5;
  var S_DTD_OPEN_WAKA = 6;
  var S_DTD_OPEN_WAKA_BANG = 7;
  var S_DTD_COMMENT = 8;
  var S_DTD_COMMENT_ENDING = 9;
  var S_DTD_COMMENT_ENDED = 10;
  var S_DTD_PI = 11;
  var S_DTD_PI_ENDING = 12;
  var S_TEXT = 13;
  var S_ENTITY = 14;
  var S_OPEN_WAKA = 15;
  var S_OPEN_WAKA_BANG = 16;
  var S_COMMENT = 17;
  var S_COMMENT_ENDING = 18;
  var S_COMMENT_ENDED = 19;
  var S_CDATA = 20;
  var S_CDATA_ENDING = 21;
  var S_CDATA_ENDING_2 = 22;
  var S_PI_FIRST_CHAR = 23;
  var S_PI_REST = 24;
  var S_PI_BODY = 25;
  var S_PI_ENDING = 26;
  var S_XML_DECL_NAME_START = 27;
  var S_XML_DECL_NAME = 28;
  var S_XML_DECL_EQ = 29;
  var S_XML_DECL_VALUE_START = 30;
  var S_XML_DECL_VALUE = 31;
  var S_XML_DECL_SEPARATOR = 32;
  var S_XML_DECL_ENDING = 33;
  var S_OPEN_TAG = 34;
  var S_OPEN_TAG_SLASH = 35;
  var S_ATTRIB = 36;
  var S_ATTRIB_NAME = 37;
  var S_ATTRIB_NAME_SAW_WHITE = 38;
  var S_ATTRIB_VALUE = 39;
  var S_ATTRIB_VALUE_QUOTED = 40;
  var S_ATTRIB_VALUE_CLOSED = 41;
  var S_ATTRIB_VALUE_UNQUOTED = 42;
  var S_CLOSE_TAG = 43;
  var S_CLOSE_TAG_SAW_WHITE = 44;
  var TAB = 9;
  var NL = 10;
  var CR = 13;
  var SPACE = 32;
  var BANG = 33;
  var DQUOTE = 34;
  var AMP = 38;
  var SQUOTE = 39;
  var MINUS = 45;
  var FORWARD_SLASH = 47;
  var SEMICOLON = 59;
  var LESS = 60;
  var EQUAL = 61;
  var GREATER = 62;
  var QUESTION = 63;
  var OPEN_BRACKET = 91;
  var CLOSE_BRACKET = 93;
  var NEL = 133;
  var LS = 8232;
  var isQuote = (c) => c === DQUOTE || c === SQUOTE;
  var QUOTES = [DQUOTE, SQUOTE];
  var DOCTYPE_TERMINATOR = [...QUOTES, OPEN_BRACKET, GREATER];
  var DTD_TERMINATOR = [...QUOTES, LESS, CLOSE_BRACKET];
  var XML_DECL_NAME_TERMINATOR = [EQUAL, QUESTION, ...S_LIST];
  var ATTRIB_VALUE_UNQUOTED_TERMINATOR = [...S_LIST, GREATER, AMP, LESS];
  function nsPairCheck(parser, prefix, uri) {
    switch (prefix) {
      case "xml":
        if (uri !== XML_NAMESPACE) {
          parser.fail(`xml prefix must be bound to ${XML_NAMESPACE}.`);
        }
        break;
      case "xmlns":
        if (uri !== XMLNS_NAMESPACE) {
          parser.fail(`xmlns prefix must be bound to ${XMLNS_NAMESPACE}.`);
        }
        break;
      default:
    }
    switch (uri) {
      case XMLNS_NAMESPACE:
        parser.fail(prefix === "" ? `the default namespace may not be set to ${uri}.` : `may not assign a prefix (even "xmlns") to the URI ${XMLNS_NAMESPACE}.`);
        break;
      case XML_NAMESPACE:
        switch (prefix) {
          case "xml":
            break;
          case "":
            parser.fail(`the default namespace may not be set to ${uri}.`);
            break;
          default:
            parser.fail("may not assign the xml namespace to another prefix.");
        }
        break;
      default:
    }
  }
  function nsMappingCheck(parser, mapping) {
    for (const local of Object.keys(mapping)) {
      nsPairCheck(parser, local, mapping[local]);
    }
  }
  var isNCName = (name) => NC_NAME_RE.test(name);
  var isName = (name) => NAME_RE.test(name);
  var FORBIDDEN_START = 0;
  var FORBIDDEN_BRACKET = 1;
  var FORBIDDEN_BRACKET_BRACKET = 2;
  exports.EVENTS = [
    "xmldecl",
    "text",
    "processinginstruction",
    "doctype",
    "comment",
    "opentagstart",
    "attribute",
    "opentag",
    "closetag",
    "cdata",
    "error",
    "end",
    "ready"
  ];
  var EVENT_NAME_TO_HANDLER_NAME = {
    xmldecl: "xmldeclHandler",
    text: "textHandler",
    processinginstruction: "piHandler",
    doctype: "doctypeHandler",
    comment: "commentHandler",
    opentagstart: "openTagStartHandler",
    attribute: "attributeHandler",
    opentag: "openTagHandler",
    closetag: "closeTagHandler",
    cdata: "cdataHandler",
    error: "errorHandler",
    end: "endHandler",
    ready: "readyHandler"
  };

  class SaxesParser {
    constructor(opt) {
      this.opt = opt !== null && opt !== undefined ? opt : {};
      this.fragmentOpt = !!this.opt.fragment;
      const xmlnsOpt = this.xmlnsOpt = !!this.opt.xmlns;
      this.trackPosition = this.opt.position !== false;
      this.fileName = this.opt.fileName;
      if (xmlnsOpt) {
        this.nameStartCheck = isNCNameStartChar;
        this.nameCheck = isNCNameChar;
        this.isName = isNCName;
        this.processAttribs = this.processAttribsNS;
        this.pushAttrib = this.pushAttribNS;
        this.ns = Object.assign({ __proto__: null }, rootNS);
        const additional = this.opt.additionalNamespaces;
        if (additional != null) {
          nsMappingCheck(this, additional);
          Object.assign(this.ns, additional);
        }
      } else {
        this.nameStartCheck = isNameStartChar;
        this.nameCheck = isNameChar;
        this.isName = isName;
        this.processAttribs = this.processAttribsPlain;
        this.pushAttrib = this.pushAttribPlain;
      }
      this.stateTable = [
        this.sBegin,
        this.sBeginWhitespace,
        this.sDoctype,
        this.sDoctypeQuote,
        this.sDTD,
        this.sDTDQuoted,
        this.sDTDOpenWaka,
        this.sDTDOpenWakaBang,
        this.sDTDComment,
        this.sDTDCommentEnding,
        this.sDTDCommentEnded,
        this.sDTDPI,
        this.sDTDPIEnding,
        this.sText,
        this.sEntity,
        this.sOpenWaka,
        this.sOpenWakaBang,
        this.sComment,
        this.sCommentEnding,
        this.sCommentEnded,
        this.sCData,
        this.sCDataEnding,
        this.sCDataEnding2,
        this.sPIFirstChar,
        this.sPIRest,
        this.sPIBody,
        this.sPIEnding,
        this.sXMLDeclNameStart,
        this.sXMLDeclName,
        this.sXMLDeclEq,
        this.sXMLDeclValueStart,
        this.sXMLDeclValue,
        this.sXMLDeclSeparator,
        this.sXMLDeclEnding,
        this.sOpenTag,
        this.sOpenTagSlash,
        this.sAttrib,
        this.sAttribName,
        this.sAttribNameSawWhite,
        this.sAttribValue,
        this.sAttribValueQuoted,
        this.sAttribValueClosed,
        this.sAttribValueUnquoted,
        this.sCloseTag,
        this.sCloseTagSawWhite
      ];
      this._init();
    }
    get closed() {
      return this._closed;
    }
    _init() {
      var _a;
      this.openWakaBang = "";
      this.text = "";
      this.name = "";
      this.piTarget = "";
      this.entity = "";
      this.q = null;
      this.tags = [];
      this.tag = null;
      this.topNS = null;
      this.chunk = "";
      this.chunkPosition = 0;
      this.i = 0;
      this.prevI = 0;
      this.carriedFromPrevious = undefined;
      this.forbiddenState = FORBIDDEN_START;
      this.attribList = [];
      const { fragmentOpt } = this;
      this.state = fragmentOpt ? S_TEXT : S_BEGIN;
      this.reportedTextBeforeRoot = this.reportedTextAfterRoot = this.closedRoot = this.sawRoot = fragmentOpt;
      this.xmlDeclPossible = !fragmentOpt;
      this.xmlDeclExpects = ["version"];
      this.entityReturnState = undefined;
      let { defaultXMLVersion } = this.opt;
      if (defaultXMLVersion === undefined) {
        if (this.opt.forceXMLVersion === true) {
          throw new Error("forceXMLVersion set but defaultXMLVersion is not set");
        }
        defaultXMLVersion = "1.0";
      }
      this.setXMLVersion(defaultXMLVersion);
      this.positionAtNewLine = 0;
      this.doctype = false;
      this._closed = false;
      this.xmlDecl = {
        version: undefined,
        encoding: undefined,
        standalone: undefined
      };
      this.line = 1;
      this.column = 0;
      this.ENTITIES = Object.create(XML_ENTITIES);
      (_a = this.readyHandler) === null || _a === undefined || _a.call(this);
    }
    get position() {
      return this.chunkPosition + this.i;
    }
    get columnIndex() {
      return this.position - this.positionAtNewLine;
    }
    on(name, handler) {
      this[EVENT_NAME_TO_HANDLER_NAME[name]] = handler;
    }
    off(name) {
      this[EVENT_NAME_TO_HANDLER_NAME[name]] = undefined;
    }
    makeError(message) {
      var _a;
      let msg = (_a = this.fileName) !== null && _a !== undefined ? _a : "";
      if (this.trackPosition) {
        if (msg.length > 0) {
          msg += ":";
        }
        msg += `${this.line}:${this.column}`;
      }
      if (msg.length > 0) {
        msg += ": ";
      }
      return new Error(msg + message);
    }
    fail(message) {
      const err = this.makeError(message);
      const handler = this.errorHandler;
      if (handler === undefined) {
        throw err;
      } else {
        handler(err);
      }
      return this;
    }
    write(chunk) {
      if (this.closed) {
        return this.fail("cannot write after close; assign an onready handler.");
      }
      let end = false;
      if (chunk === null) {
        end = true;
        chunk = "";
      } else if (typeof chunk === "object") {
        chunk = chunk.toString();
      }
      if (this.carriedFromPrevious !== undefined) {
        chunk = `${this.carriedFromPrevious}${chunk}`;
        this.carriedFromPrevious = undefined;
      }
      let limit = chunk.length;
      const lastCode = chunk.charCodeAt(limit - 1);
      if (!end && (lastCode === CR || lastCode >= 55296 && lastCode <= 56319)) {
        this.carriedFromPrevious = chunk[limit - 1];
        limit--;
        chunk = chunk.slice(0, limit);
      }
      const { stateTable } = this;
      this.chunk = chunk;
      this.i = 0;
      while (this.i < limit) {
        stateTable[this.state].call(this);
      }
      this.chunkPosition += limit;
      return end ? this.end() : this;
    }
    close() {
      return this.write(null);
    }
    getCode10() {
      const { chunk, i } = this;
      this.prevI = i;
      this.i = i + 1;
      if (i >= chunk.length) {
        return EOC;
      }
      const code = chunk.charCodeAt(i);
      this.column++;
      if (code < 55296) {
        if (code >= SPACE || code === TAB) {
          return code;
        }
        switch (code) {
          case NL:
            this.line++;
            this.column = 0;
            this.positionAtNewLine = this.position;
            return NL;
          case CR:
            if (chunk.charCodeAt(i + 1) === NL) {
              this.i = i + 2;
            }
            this.line++;
            this.column = 0;
            this.positionAtNewLine = this.position;
            return NL_LIKE;
          default:
            this.fail("disallowed character.");
            return code;
        }
      }
      if (code > 56319) {
        if (!(code >= 57344 && code <= 65533)) {
          this.fail("disallowed character.");
        }
        return code;
      }
      const final = 65536 + (code - 55296) * 1024 + (chunk.charCodeAt(i + 1) - 56320);
      this.i = i + 2;
      if (final > 1114111) {
        this.fail("disallowed character.");
      }
      return final;
    }
    getCode11() {
      const { chunk, i } = this;
      this.prevI = i;
      this.i = i + 1;
      if (i >= chunk.length) {
        return EOC;
      }
      const code = chunk.charCodeAt(i);
      this.column++;
      if (code < 55296) {
        if (code > 31 && code < 127 || code > 159 && code !== LS || code === TAB) {
          return code;
        }
        switch (code) {
          case NL:
            this.line++;
            this.column = 0;
            this.positionAtNewLine = this.position;
            return NL;
          case CR: {
            const next = chunk.charCodeAt(i + 1);
            if (next === NL || next === NEL) {
              this.i = i + 2;
            }
          }
          case NEL:
          case LS:
            this.line++;
            this.column = 0;
            this.positionAtNewLine = this.position;
            return NL_LIKE;
          default:
            this.fail("disallowed character.");
            return code;
        }
      }
      if (code > 56319) {
        if (!(code >= 57344 && code <= 65533)) {
          this.fail("disallowed character.");
        }
        return code;
      }
      const final = 65536 + (code - 55296) * 1024 + (chunk.charCodeAt(i + 1) - 56320);
      this.i = i + 2;
      if (final > 1114111) {
        this.fail("disallowed character.");
      }
      return final;
    }
    getCodeNorm() {
      const c = this.getCode();
      return c === NL_LIKE ? NL : c;
    }
    unget() {
      this.i = this.prevI;
      this.column--;
    }
    captureTo(chars) {
      let { i: start } = this;
      const { chunk } = this;
      while (true) {
        const c = this.getCode();
        const isNLLike = c === NL_LIKE;
        const final = isNLLike ? NL : c;
        if (final === EOC || chars.includes(final)) {
          this.text += chunk.slice(start, this.prevI);
          return final;
        }
        if (isNLLike) {
          this.text += `${chunk.slice(start, this.prevI)}
`;
          start = this.i;
        }
      }
    }
    captureToChar(char) {
      let { i: start } = this;
      const { chunk } = this;
      while (true) {
        let c = this.getCode();
        switch (c) {
          case NL_LIKE:
            this.text += `${chunk.slice(start, this.prevI)}
`;
            start = this.i;
            c = NL;
            break;
          case EOC:
            this.text += chunk.slice(start);
            return false;
          default:
        }
        if (c === char) {
          this.text += chunk.slice(start, this.prevI);
          return true;
        }
      }
    }
    captureNameChars() {
      const { chunk, i: start } = this;
      while (true) {
        const c = this.getCode();
        if (c === EOC) {
          this.name += chunk.slice(start);
          return EOC;
        }
        if (!isNameChar(c)) {
          this.name += chunk.slice(start, this.prevI);
          return c === NL_LIKE ? NL : c;
        }
      }
    }
    skipSpaces() {
      while (true) {
        const c = this.getCodeNorm();
        if (c === EOC || !isS(c)) {
          return c;
        }
      }
    }
    setXMLVersion(version) {
      this.currentXMLVersion = version;
      if (version === "1.0") {
        this.isChar = isChar10;
        this.getCode = this.getCode10;
      } else {
        this.isChar = isChar11;
        this.getCode = this.getCode11;
      }
    }
    sBegin() {
      if (this.chunk.charCodeAt(0) === 65279) {
        this.i++;
        this.column++;
      }
      this.state = S_BEGIN_WHITESPACE;
    }
    sBeginWhitespace() {
      const iBefore = this.i;
      const c = this.skipSpaces();
      if (this.prevI !== iBefore) {
        this.xmlDeclPossible = false;
      }
      switch (c) {
        case LESS:
          this.state = S_OPEN_WAKA;
          if (this.text.length !== 0) {
            throw new Error("no-empty text at start");
          }
          break;
        case EOC:
          break;
        default:
          this.unget();
          this.state = S_TEXT;
          this.xmlDeclPossible = false;
      }
    }
    sDoctype() {
      var _a;
      const c = this.captureTo(DOCTYPE_TERMINATOR);
      switch (c) {
        case GREATER: {
          (_a = this.doctypeHandler) === null || _a === undefined || _a.call(this, this.text);
          this.text = "";
          this.state = S_TEXT;
          this.doctype = true;
          break;
        }
        case EOC:
          break;
        default:
          this.text += String.fromCodePoint(c);
          if (c === OPEN_BRACKET) {
            this.state = S_DTD;
          } else if (isQuote(c)) {
            this.state = S_DOCTYPE_QUOTE;
            this.q = c;
          }
      }
    }
    sDoctypeQuote() {
      const q = this.q;
      if (this.captureToChar(q)) {
        this.text += String.fromCodePoint(q);
        this.q = null;
        this.state = S_DOCTYPE;
      }
    }
    sDTD() {
      const c = this.captureTo(DTD_TERMINATOR);
      if (c === EOC) {
        return;
      }
      this.text += String.fromCodePoint(c);
      if (c === CLOSE_BRACKET) {
        this.state = S_DOCTYPE;
      } else if (c === LESS) {
        this.state = S_DTD_OPEN_WAKA;
      } else if (isQuote(c)) {
        this.state = S_DTD_QUOTED;
        this.q = c;
      }
    }
    sDTDQuoted() {
      const q = this.q;
      if (this.captureToChar(q)) {
        this.text += String.fromCodePoint(q);
        this.state = S_DTD;
        this.q = null;
      }
    }
    sDTDOpenWaka() {
      const c = this.getCodeNorm();
      this.text += String.fromCodePoint(c);
      switch (c) {
        case BANG:
          this.state = S_DTD_OPEN_WAKA_BANG;
          this.openWakaBang = "";
          break;
        case QUESTION:
          this.state = S_DTD_PI;
          break;
        default:
          this.state = S_DTD;
      }
    }
    sDTDOpenWakaBang() {
      const char = String.fromCodePoint(this.getCodeNorm());
      const owb = this.openWakaBang += char;
      this.text += char;
      if (owb !== "-") {
        this.state = owb === "--" ? S_DTD_COMMENT : S_DTD;
        this.openWakaBang = "";
      }
    }
    sDTDComment() {
      if (this.captureToChar(MINUS)) {
        this.text += "-";
        this.state = S_DTD_COMMENT_ENDING;
      }
    }
    sDTDCommentEnding() {
      const c = this.getCodeNorm();
      this.text += String.fromCodePoint(c);
      this.state = c === MINUS ? S_DTD_COMMENT_ENDED : S_DTD_COMMENT;
    }
    sDTDCommentEnded() {
      const c = this.getCodeNorm();
      this.text += String.fromCodePoint(c);
      if (c === GREATER) {
        this.state = S_DTD;
      } else {
        this.fail("malformed comment.");
        this.state = S_DTD_COMMENT;
      }
    }
    sDTDPI() {
      if (this.captureToChar(QUESTION)) {
        this.text += "?";
        this.state = S_DTD_PI_ENDING;
      }
    }
    sDTDPIEnding() {
      const c = this.getCodeNorm();
      this.text += String.fromCodePoint(c);
      if (c === GREATER) {
        this.state = S_DTD;
      }
    }
    sText() {
      if (this.tags.length !== 0) {
        this.handleTextInRoot();
      } else {
        this.handleTextOutsideRoot();
      }
    }
    sEntity() {
      let { i: start } = this;
      const { chunk } = this;
      loop:
        while (true) {
          switch (this.getCode()) {
            case NL_LIKE:
              this.entity += `${chunk.slice(start, this.prevI)}
`;
              start = this.i;
              break;
            case SEMICOLON: {
              const { entityReturnState } = this;
              const entity = this.entity + chunk.slice(start, this.prevI);
              this.state = entityReturnState;
              let parsed;
              if (entity === "") {
                this.fail("empty entity name.");
                parsed = "&;";
              } else {
                parsed = this.parseEntity(entity);
                this.entity = "";
              }
              if (entityReturnState !== S_TEXT || this.textHandler !== undefined) {
                this.text += parsed;
              }
              break loop;
            }
            case EOC:
              this.entity += chunk.slice(start);
              break loop;
            default:
          }
        }
    }
    sOpenWaka() {
      const c = this.getCode();
      if (isNameStartChar(c)) {
        this.state = S_OPEN_TAG;
        this.unget();
        this.xmlDeclPossible = false;
      } else {
        switch (c) {
          case FORWARD_SLASH:
            this.state = S_CLOSE_TAG;
            this.xmlDeclPossible = false;
            break;
          case BANG:
            this.state = S_OPEN_WAKA_BANG;
            this.openWakaBang = "";
            this.xmlDeclPossible = false;
            break;
          case QUESTION:
            this.state = S_PI_FIRST_CHAR;
            break;
          default:
            this.fail("disallowed character in tag name");
            this.state = S_TEXT;
            this.xmlDeclPossible = false;
        }
      }
    }
    sOpenWakaBang() {
      this.openWakaBang += String.fromCodePoint(this.getCodeNorm());
      switch (this.openWakaBang) {
        case "[CDATA[":
          if (!this.sawRoot && !this.reportedTextBeforeRoot) {
            this.fail("text data outside of root node.");
            this.reportedTextBeforeRoot = true;
          }
          if (this.closedRoot && !this.reportedTextAfterRoot) {
            this.fail("text data outside of root node.");
            this.reportedTextAfterRoot = true;
          }
          this.state = S_CDATA;
          this.openWakaBang = "";
          break;
        case "--":
          this.state = S_COMMENT;
          this.openWakaBang = "";
          break;
        case "DOCTYPE":
          this.state = S_DOCTYPE;
          if (this.doctype || this.sawRoot) {
            this.fail("inappropriately located doctype declaration.");
          }
          this.openWakaBang = "";
          break;
        default:
          if (this.openWakaBang.length >= 7) {
            this.fail("incorrect syntax.");
          }
      }
    }
    sComment() {
      if (this.captureToChar(MINUS)) {
        this.state = S_COMMENT_ENDING;
      }
    }
    sCommentEnding() {
      var _a;
      const c = this.getCodeNorm();
      if (c === MINUS) {
        this.state = S_COMMENT_ENDED;
        (_a = this.commentHandler) === null || _a === undefined || _a.call(this, this.text);
        this.text = "";
      } else {
        this.text += `-${String.fromCodePoint(c)}`;
        this.state = S_COMMENT;
      }
    }
    sCommentEnded() {
      const c = this.getCodeNorm();
      if (c !== GREATER) {
        this.fail("malformed comment.");
        this.text += `--${String.fromCodePoint(c)}`;
        this.state = S_COMMENT;
      } else {
        this.state = S_TEXT;
      }
    }
    sCData() {
      if (this.captureToChar(CLOSE_BRACKET)) {
        this.state = S_CDATA_ENDING;
      }
    }
    sCDataEnding() {
      const c = this.getCodeNorm();
      if (c === CLOSE_BRACKET) {
        this.state = S_CDATA_ENDING_2;
      } else {
        this.text += `]${String.fromCodePoint(c)}`;
        this.state = S_CDATA;
      }
    }
    sCDataEnding2() {
      var _a;
      const c = this.getCodeNorm();
      switch (c) {
        case GREATER: {
          (_a = this.cdataHandler) === null || _a === undefined || _a.call(this, this.text);
          this.text = "";
          this.state = S_TEXT;
          break;
        }
        case CLOSE_BRACKET:
          this.text += "]";
          break;
        default:
          this.text += `]]${String.fromCodePoint(c)}`;
          this.state = S_CDATA;
      }
    }
    sPIFirstChar() {
      const c = this.getCodeNorm();
      if (this.nameStartCheck(c)) {
        this.piTarget += String.fromCodePoint(c);
        this.state = S_PI_REST;
      } else if (c === QUESTION || isS(c)) {
        this.fail("processing instruction without a target.");
        this.state = c === QUESTION ? S_PI_ENDING : S_PI_BODY;
      } else {
        this.fail("disallowed character in processing instruction name.");
        this.piTarget += String.fromCodePoint(c);
        this.state = S_PI_REST;
      }
    }
    sPIRest() {
      const { chunk, i: start } = this;
      while (true) {
        const c = this.getCodeNorm();
        if (c === EOC) {
          this.piTarget += chunk.slice(start);
          return;
        }
        if (!this.nameCheck(c)) {
          this.piTarget += chunk.slice(start, this.prevI);
          const isQuestion = c === QUESTION;
          if (isQuestion || isS(c)) {
            if (this.piTarget === "xml") {
              if (!this.xmlDeclPossible) {
                this.fail("an XML declaration must be at the start of the document.");
              }
              this.state = isQuestion ? S_XML_DECL_ENDING : S_XML_DECL_NAME_START;
            } else {
              this.state = isQuestion ? S_PI_ENDING : S_PI_BODY;
            }
          } else {
            this.fail("disallowed character in processing instruction name.");
            this.piTarget += String.fromCodePoint(c);
          }
          break;
        }
      }
    }
    sPIBody() {
      if (this.text.length === 0) {
        const c = this.getCodeNorm();
        if (c === QUESTION) {
          this.state = S_PI_ENDING;
        } else if (!isS(c)) {
          this.text = String.fromCodePoint(c);
        }
      } else if (this.captureToChar(QUESTION)) {
        this.state = S_PI_ENDING;
      }
    }
    sPIEnding() {
      var _a;
      const c = this.getCodeNorm();
      if (c === GREATER) {
        const { piTarget } = this;
        if (piTarget.toLowerCase() === "xml") {
          this.fail("the XML declaration must appear at the start of the document.");
        }
        (_a = this.piHandler) === null || _a === undefined || _a.call(this, {
          target: piTarget,
          body: this.text
        });
        this.piTarget = this.text = "";
        this.state = S_TEXT;
      } else if (c === QUESTION) {
        this.text += "?";
      } else {
        this.text += `?${String.fromCodePoint(c)}`;
        this.state = S_PI_BODY;
      }
      this.xmlDeclPossible = false;
    }
    sXMLDeclNameStart() {
      const c = this.skipSpaces();
      if (c === QUESTION) {
        this.state = S_XML_DECL_ENDING;
        return;
      }
      if (c !== EOC) {
        this.state = S_XML_DECL_NAME;
        this.name = String.fromCodePoint(c);
      }
    }
    sXMLDeclName() {
      const c = this.captureTo(XML_DECL_NAME_TERMINATOR);
      if (c === QUESTION) {
        this.state = S_XML_DECL_ENDING;
        this.name += this.text;
        this.text = "";
        this.fail("XML declaration is incomplete.");
        return;
      }
      if (!(isS(c) || c === EQUAL)) {
        return;
      }
      this.name += this.text;
      this.text = "";
      if (!this.xmlDeclExpects.includes(this.name)) {
        switch (this.name.length) {
          case 0:
            this.fail("did not expect any more name/value pairs.");
            break;
          case 1:
            this.fail(`expected the name ${this.xmlDeclExpects[0]}.`);
            break;
          default:
            this.fail(`expected one of ${this.xmlDeclExpects.join(", ")}`);
        }
      }
      this.state = c === EQUAL ? S_XML_DECL_VALUE_START : S_XML_DECL_EQ;
    }
    sXMLDeclEq() {
      const c = this.getCodeNorm();
      if (c === QUESTION) {
        this.state = S_XML_DECL_ENDING;
        this.fail("XML declaration is incomplete.");
        return;
      }
      if (isS(c)) {
        return;
      }
      if (c !== EQUAL) {
        this.fail("value required.");
      }
      this.state = S_XML_DECL_VALUE_START;
    }
    sXMLDeclValueStart() {
      const c = this.getCodeNorm();
      if (c === QUESTION) {
        this.state = S_XML_DECL_ENDING;
        this.fail("XML declaration is incomplete.");
        return;
      }
      if (isS(c)) {
        return;
      }
      if (!isQuote(c)) {
        this.fail("value must be quoted.");
        this.q = SPACE;
      } else {
        this.q = c;
      }
      this.state = S_XML_DECL_VALUE;
    }
    sXMLDeclValue() {
      const c = this.captureTo([this.q, QUESTION]);
      if (c === QUESTION) {
        this.state = S_XML_DECL_ENDING;
        this.text = "";
        this.fail("XML declaration is incomplete.");
        return;
      }
      if (c === EOC) {
        return;
      }
      const value = this.text;
      this.text = "";
      switch (this.name) {
        case "version": {
          this.xmlDeclExpects = ["encoding", "standalone"];
          const version = value;
          this.xmlDecl.version = version;
          if (!/^1\.[0-9]+$/.test(version)) {
            this.fail("version number must match /^1\\.[0-9]+$/.");
          } else if (!this.opt.forceXMLVersion) {
            this.setXMLVersion(version);
          }
          break;
        }
        case "encoding":
          if (!/^[A-Za-z][A-Za-z0-9._-]*$/.test(value)) {
            this.fail("encoding value must match /^[A-Za-z0-9][A-Za-z0-9._-]*$/.");
          }
          this.xmlDeclExpects = ["standalone"];
          this.xmlDecl.encoding = value;
          break;
        case "standalone":
          if (value !== "yes" && value !== "no") {
            this.fail('standalone value must match "yes" or "no".');
          }
          this.xmlDeclExpects = [];
          this.xmlDecl.standalone = value;
          break;
        default:
      }
      this.name = "";
      this.state = S_XML_DECL_SEPARATOR;
    }
    sXMLDeclSeparator() {
      const c = this.getCodeNorm();
      if (c === QUESTION) {
        this.state = S_XML_DECL_ENDING;
        return;
      }
      if (!isS(c)) {
        this.fail("whitespace required.");
        this.unget();
      }
      this.state = S_XML_DECL_NAME_START;
    }
    sXMLDeclEnding() {
      var _a;
      const c = this.getCodeNorm();
      if (c === GREATER) {
        if (this.piTarget !== "xml") {
          this.fail("processing instructions are not allowed before root.");
        } else if (this.name !== "version" && this.xmlDeclExpects.includes("version")) {
          this.fail("XML declaration must contain a version.");
        }
        (_a = this.xmldeclHandler) === null || _a === undefined || _a.call(this, this.xmlDecl);
        this.name = "";
        this.piTarget = this.text = "";
        this.state = S_TEXT;
      } else {
        this.fail("The character ? is disallowed anywhere in XML declarations.");
      }
      this.xmlDeclPossible = false;
    }
    sOpenTag() {
      var _a;
      const c = this.captureNameChars();
      if (c === EOC) {
        return;
      }
      const tag = this.tag = {
        name: this.name,
        attributes: Object.create(null)
      };
      this.name = "";
      if (this.xmlnsOpt) {
        this.topNS = tag.ns = Object.create(null);
      }
      (_a = this.openTagStartHandler) === null || _a === undefined || _a.call(this, tag);
      this.sawRoot = true;
      if (!this.fragmentOpt && this.closedRoot) {
        this.fail("documents may contain only one root.");
      }
      switch (c) {
        case GREATER:
          this.openTag();
          break;
        case FORWARD_SLASH:
          this.state = S_OPEN_TAG_SLASH;
          break;
        default:
          if (!isS(c)) {
            this.fail("disallowed character in tag name.");
          }
          this.state = S_ATTRIB;
      }
    }
    sOpenTagSlash() {
      if (this.getCode() === GREATER) {
        this.openSelfClosingTag();
      } else {
        this.fail("forward-slash in opening tag not followed by >.");
        this.state = S_ATTRIB;
      }
    }
    sAttrib() {
      const c = this.skipSpaces();
      if (c === EOC) {
        return;
      }
      if (isNameStartChar(c)) {
        this.unget();
        this.state = S_ATTRIB_NAME;
      } else if (c === GREATER) {
        this.openTag();
      } else if (c === FORWARD_SLASH) {
        this.state = S_OPEN_TAG_SLASH;
      } else {
        this.fail("disallowed character in attribute name.");
      }
    }
    sAttribName() {
      const c = this.captureNameChars();
      if (c === EQUAL) {
        this.state = S_ATTRIB_VALUE;
      } else if (isS(c)) {
        this.state = S_ATTRIB_NAME_SAW_WHITE;
      } else if (c === GREATER) {
        this.fail("attribute without value.");
        this.pushAttrib(this.name, this.name);
        this.name = this.text = "";
        this.openTag();
      } else if (c !== EOC) {
        this.fail("disallowed character in attribute name.");
      }
    }
    sAttribNameSawWhite() {
      const c = this.skipSpaces();
      switch (c) {
        case EOC:
          return;
        case EQUAL:
          this.state = S_ATTRIB_VALUE;
          break;
        default:
          this.fail("attribute without value.");
          this.text = "";
          this.name = "";
          if (c === GREATER) {
            this.openTag();
          } else if (isNameStartChar(c)) {
            this.unget();
            this.state = S_ATTRIB_NAME;
          } else {
            this.fail("disallowed character in attribute name.");
            this.state = S_ATTRIB;
          }
      }
    }
    sAttribValue() {
      const c = this.getCodeNorm();
      if (isQuote(c)) {
        this.q = c;
        this.state = S_ATTRIB_VALUE_QUOTED;
      } else if (!isS(c)) {
        this.fail("unquoted attribute value.");
        this.state = S_ATTRIB_VALUE_UNQUOTED;
        this.unget();
      }
    }
    sAttribValueQuoted() {
      const { q, chunk } = this;
      let { i: start } = this;
      while (true) {
        switch (this.getCode()) {
          case q:
            this.pushAttrib(this.name, this.text + chunk.slice(start, this.prevI));
            this.name = this.text = "";
            this.q = null;
            this.state = S_ATTRIB_VALUE_CLOSED;
            return;
          case AMP:
            this.text += chunk.slice(start, this.prevI);
            this.state = S_ENTITY;
            this.entityReturnState = S_ATTRIB_VALUE_QUOTED;
            return;
          case NL:
          case NL_LIKE:
          case TAB:
            this.text += `${chunk.slice(start, this.prevI)} `;
            start = this.i;
            break;
          case LESS:
            this.text += chunk.slice(start, this.prevI);
            this.fail("disallowed character.");
            return;
          case EOC:
            this.text += chunk.slice(start);
            return;
          default:
        }
      }
    }
    sAttribValueClosed() {
      const c = this.getCodeNorm();
      if (isS(c)) {
        this.state = S_ATTRIB;
      } else if (c === GREATER) {
        this.openTag();
      } else if (c === FORWARD_SLASH) {
        this.state = S_OPEN_TAG_SLASH;
      } else if (isNameStartChar(c)) {
        this.fail("no whitespace between attributes.");
        this.unget();
        this.state = S_ATTRIB_NAME;
      } else {
        this.fail("disallowed character in attribute name.");
      }
    }
    sAttribValueUnquoted() {
      const c = this.captureTo(ATTRIB_VALUE_UNQUOTED_TERMINATOR);
      switch (c) {
        case AMP:
          this.state = S_ENTITY;
          this.entityReturnState = S_ATTRIB_VALUE_UNQUOTED;
          break;
        case LESS:
          this.fail("disallowed character.");
          break;
        case EOC:
          break;
        default:
          if (this.text.includes("]]>")) {
            this.fail('the string "]]>" is disallowed in char data.');
          }
          this.pushAttrib(this.name, this.text);
          this.name = this.text = "";
          if (c === GREATER) {
            this.openTag();
          } else {
            this.state = S_ATTRIB;
          }
      }
    }
    sCloseTag() {
      const c = this.captureNameChars();
      if (c === GREATER) {
        this.closeTag();
      } else if (isS(c)) {
        this.state = S_CLOSE_TAG_SAW_WHITE;
      } else if (c !== EOC) {
        this.fail("disallowed character in closing tag.");
      }
    }
    sCloseTagSawWhite() {
      switch (this.skipSpaces()) {
        case GREATER:
          this.closeTag();
          break;
        case EOC:
          break;
        default:
          this.fail("disallowed character in closing tag.");
      }
    }
    handleTextInRoot() {
      let { i: start, forbiddenState } = this;
      const { chunk, textHandler: handler } = this;
      scanLoop:
        while (true) {
          switch (this.getCode()) {
            case LESS: {
              this.state = S_OPEN_WAKA;
              if (handler !== undefined) {
                const { text } = this;
                const slice = chunk.slice(start, this.prevI);
                if (text.length !== 0) {
                  handler(text + slice);
                  this.text = "";
                } else if (slice.length !== 0) {
                  handler(slice);
                }
              }
              forbiddenState = FORBIDDEN_START;
              break scanLoop;
            }
            case AMP:
              this.state = S_ENTITY;
              this.entityReturnState = S_TEXT;
              if (handler !== undefined) {
                this.text += chunk.slice(start, this.prevI);
              }
              forbiddenState = FORBIDDEN_START;
              break scanLoop;
            case CLOSE_BRACKET:
              switch (forbiddenState) {
                case FORBIDDEN_START:
                  forbiddenState = FORBIDDEN_BRACKET;
                  break;
                case FORBIDDEN_BRACKET:
                  forbiddenState = FORBIDDEN_BRACKET_BRACKET;
                  break;
                case FORBIDDEN_BRACKET_BRACKET:
                  break;
                default:
                  throw new Error("impossible state");
              }
              break;
            case GREATER:
              if (forbiddenState === FORBIDDEN_BRACKET_BRACKET) {
                this.fail('the string "]]>" is disallowed in char data.');
              }
              forbiddenState = FORBIDDEN_START;
              break;
            case NL_LIKE:
              if (handler !== undefined) {
                this.text += `${chunk.slice(start, this.prevI)}
`;
              }
              start = this.i;
              forbiddenState = FORBIDDEN_START;
              break;
            case EOC:
              if (handler !== undefined) {
                this.text += chunk.slice(start);
              }
              break scanLoop;
            default:
              forbiddenState = FORBIDDEN_START;
          }
        }
      this.forbiddenState = forbiddenState;
    }
    handleTextOutsideRoot() {
      let { i: start } = this;
      const { chunk, textHandler: handler } = this;
      let nonSpace = false;
      outRootLoop:
        while (true) {
          const code = this.getCode();
          switch (code) {
            case LESS: {
              this.state = S_OPEN_WAKA;
              if (handler !== undefined) {
                const { text } = this;
                const slice = chunk.slice(start, this.prevI);
                if (text.length !== 0) {
                  handler(text + slice);
                  this.text = "";
                } else if (slice.length !== 0) {
                  handler(slice);
                }
              }
              break outRootLoop;
            }
            case AMP:
              this.state = S_ENTITY;
              this.entityReturnState = S_TEXT;
              if (handler !== undefined) {
                this.text += chunk.slice(start, this.prevI);
              }
              nonSpace = true;
              break outRootLoop;
            case NL_LIKE:
              if (handler !== undefined) {
                this.text += `${chunk.slice(start, this.prevI)}
`;
              }
              start = this.i;
              break;
            case EOC:
              if (handler !== undefined) {
                this.text += chunk.slice(start);
              }
              break outRootLoop;
            default:
              if (!isS(code)) {
                nonSpace = true;
              }
          }
        }
      if (!nonSpace) {
        return;
      }
      if (!this.sawRoot && !this.reportedTextBeforeRoot) {
        this.fail("text data outside of root node.");
        this.reportedTextBeforeRoot = true;
      }
      if (this.closedRoot && !this.reportedTextAfterRoot) {
        this.fail("text data outside of root node.");
        this.reportedTextAfterRoot = true;
      }
    }
    pushAttribNS(name, value) {
      var _a;
      const { prefix, local } = this.qname(name);
      const attr = { name, prefix, local, value };
      this.attribList.push(attr);
      (_a = this.attributeHandler) === null || _a === undefined || _a.call(this, attr);
      if (prefix === "xmlns") {
        const trimmed = value.trim();
        if (this.currentXMLVersion === "1.0" && trimmed === "") {
          this.fail("invalid attempt to undefine prefix in XML 1.0");
        }
        this.topNS[local] = trimmed;
        nsPairCheck(this, local, trimmed);
      } else if (name === "xmlns") {
        const trimmed = value.trim();
        this.topNS[""] = trimmed;
        nsPairCheck(this, "", trimmed);
      }
    }
    pushAttribPlain(name, value) {
      var _a;
      const attr = { name, value };
      this.attribList.push(attr);
      (_a = this.attributeHandler) === null || _a === undefined || _a.call(this, attr);
    }
    end() {
      var _a, _b;
      if (!this.sawRoot) {
        this.fail("document must contain a root element.");
      }
      const { tags } = this;
      while (tags.length > 0) {
        const tag = tags.pop();
        this.fail(`unclosed tag: ${tag.name}`);
      }
      if (this.state !== S_BEGIN && this.state !== S_TEXT) {
        this.fail("unexpected end.");
      }
      const { text } = this;
      if (text.length !== 0) {
        (_a = this.textHandler) === null || _a === undefined || _a.call(this, text);
        this.text = "";
      }
      this._closed = true;
      (_b = this.endHandler) === null || _b === undefined || _b.call(this);
      this._init();
      return this;
    }
    resolve(prefix) {
      var _a, _b;
      let uri = this.topNS[prefix];
      if (uri !== undefined) {
        return uri;
      }
      const { tags } = this;
      for (let index = tags.length - 1;index >= 0; index--) {
        uri = tags[index].ns[prefix];
        if (uri !== undefined) {
          return uri;
        }
      }
      uri = this.ns[prefix];
      if (uri !== undefined) {
        return uri;
      }
      return (_b = (_a = this.opt).resolvePrefix) === null || _b === undefined ? undefined : _b.call(_a, prefix);
    }
    qname(name) {
      const colon = name.indexOf(":");
      if (colon === -1) {
        return { prefix: "", local: name };
      }
      const local = name.slice(colon + 1);
      const prefix = name.slice(0, colon);
      if (prefix === "" || local === "" || local.includes(":")) {
        this.fail(`malformed name: ${name}.`);
      }
      return { prefix, local };
    }
    processAttribsNS() {
      var _a;
      const { attribList } = this;
      const tag = this.tag;
      {
        const { prefix, local } = this.qname(tag.name);
        tag.prefix = prefix;
        tag.local = local;
        const uri = tag.uri = (_a = this.resolve(prefix)) !== null && _a !== undefined ? _a : "";
        if (prefix !== "") {
          if (prefix === "xmlns") {
            this.fail('tags may not have "xmlns" as prefix.');
          }
          if (uri === "") {
            this.fail(`unbound namespace prefix: ${JSON.stringify(prefix)}.`);
            tag.uri = prefix;
          }
        }
      }
      if (attribList.length === 0) {
        return;
      }
      const { attributes } = tag;
      const seen = new Set;
      for (const attr of attribList) {
        const { name, prefix, local } = attr;
        let uri;
        let eqname;
        if (prefix === "") {
          uri = name === "xmlns" ? XMLNS_NAMESPACE : "";
          eqname = name;
        } else {
          uri = this.resolve(prefix);
          if (uri === undefined) {
            this.fail(`unbound namespace prefix: ${JSON.stringify(prefix)}.`);
            uri = prefix;
          }
          eqname = `{${uri}}${local}`;
        }
        if (seen.has(eqname)) {
          this.fail(`duplicate attribute: ${eqname}.`);
        }
        seen.add(eqname);
        attr.uri = uri;
        attributes[name] = attr;
      }
      this.attribList = [];
    }
    processAttribsPlain() {
      const { attribList } = this;
      const attributes = this.tag.attributes;
      for (const { name, value } of attribList) {
        if (attributes[name] !== undefined) {
          this.fail(`duplicate attribute: ${name}.`);
        }
        attributes[name] = value;
      }
      this.attribList = [];
    }
    openTag() {
      var _a;
      this.processAttribs();
      const { tags } = this;
      const tag = this.tag;
      tag.isSelfClosing = false;
      (_a = this.openTagHandler) === null || _a === undefined || _a.call(this, tag);
      tags.push(tag);
      this.state = S_TEXT;
      this.name = "";
    }
    openSelfClosingTag() {
      var _a, _b, _c;
      this.processAttribs();
      const { tags } = this;
      const tag = this.tag;
      tag.isSelfClosing = true;
      (_a = this.openTagHandler) === null || _a === undefined || _a.call(this, tag);
      (_b = this.closeTagHandler) === null || _b === undefined || _b.call(this, tag);
      const top = this.tag = (_c = tags[tags.length - 1]) !== null && _c !== undefined ? _c : null;
      if (top === null) {
        this.closedRoot = true;
      }
      this.state = S_TEXT;
      this.name = "";
    }
    closeTag() {
      const { tags, name } = this;
      this.state = S_TEXT;
      this.name = "";
      if (name === "") {
        this.fail("weird empty close tag.");
        this.text += "</>";
        return;
      }
      const handler = this.closeTagHandler;
      let l = tags.length;
      while (l-- > 0) {
        const tag = this.tag = tags.pop();
        this.topNS = tag.ns;
        handler === null || handler === undefined || handler(tag);
        if (tag.name === name) {
          break;
        }
        this.fail("unexpected close tag.");
      }
      if (l === 0) {
        this.closedRoot = true;
      } else if (l < 0) {
        this.fail(`unmatched closing tag: ${name}.`);
        this.text += `</${name}>`;
      }
    }
    parseEntity(entity) {
      if (entity[0] !== "#") {
        const defined = this.ENTITIES[entity];
        if (defined !== undefined) {
          return defined;
        }
        this.fail(this.isName(entity) ? "undefined entity." : "disallowed character in entity name.");
        return `&${entity};`;
      }
      let num = NaN;
      if (entity[1] === "x" && /^#x[0-9a-f]+$/i.test(entity)) {
        num = parseInt(entity.slice(2), 16);
      } else if (/^#[0-9]+$/.test(entity)) {
        num = parseInt(entity.slice(1), 10);
      }
      if (!this.isChar(num)) {
        this.fail("malformed character entity.");
        return `&${entity};`;
      }
      return String.fromCodePoint(num);
    }
  }
  exports.SaxesParser = SaxesParser;
});

// ../../agentum-clean-release/agentum/src/adapters/outbound/persistence/payment-ledger.adapter.ts
var CREATE_TABLE = `CREATE TABLE IF NOT EXISTS payment_consumptions (
  payment_key TEXT PRIMARY KEY, rail TEXT NOT NULL, resource TEXT NOT NULL,
  price_usd TEXT NOT NULL, fingerprint TEXT NOT NULL, status TEXT NOT NULL,
  provider_reference TEXT, settlement_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS payment_consumptions_created_at_idx ON payment_consumptions (created_at DESC)`;
class PostgresPaymentLedger {
  databaseUrl;
  sql = null;
  initialization = null;
  constructor(databaseUrl) {
    this.databaseUrl = databaseUrl;
  }
  async db() {
    if (this.sql)
      return this.sql;
    if (!this.initialization)
      this.initialization = (async () => {
        const db = new Bun.SQL(this.databaseUrl);
        try {
          await db.unsafe(CREATE_TABLE);
          this.sql = db;
          return db;
        } catch (error) {
          await db.close().catch(() => {});
          throw error;
        }
      })();
    try {
      return await this.initialization;
    } catch (error) {
      this.initialization = null;
      throw error;
    }
  }
  async find(key) {
    const db = await this.db();
    const rows = await db`SELECT status FROM payment_consumptions WHERE payment_key=${key}`;
    return rows[0]?.status ?? null;
  }
  async claim(claim) {
    const db = await this.db();
    const rows = await db`INSERT INTO payment_consumptions (payment_key,rail,resource,price_usd,fingerprint,provider_reference,status)
      VALUES (${claim.key},${claim.rail},${claim.resource},${claim.priceUsd},${claim.fingerprint},${claim.providerReference ?? null},'CLAIMED')
      ON CONFLICT (payment_key) DO NOTHING RETURNING payment_key`;
    return rows.length === 1;
  }
  async complete(key, status, settlementReference) {
    const db = await this.db();
    const rows = await db`UPDATE payment_consumptions SET status=${status},settlement_reference=${settlementReference ?? null},updated_at=NOW()
      WHERE payment_key=${key} AND status='CLAIMED' RETURNING payment_key`;
    if (rows.length !== 1)
      throw new Error("Payment claim is not pending");
  }
  async listRecent(limit) {
    const db = await this.db();
    const bounded = Number.isFinite(limit) ? Math.max(0, Math.min(100, Math.floor(limit))) : 0;
    const rows = await db`SELECT payment_key,rail,resource,price_usd,fingerprint,provider_reference,settlement_reference,status,created_at,updated_at
      FROM payment_consumptions ORDER BY created_at DESC LIMIT ${bounded}`;
    return rows.map((r) => ({
      key: r.payment_key,
      rail: r.rail,
      resource: r.resource,
      priceUsd: r.price_usd,
      fingerprint: r.fingerprint,
      providerReference: r.provider_reference ?? undefined,
      settlementReference: r.settlement_reference ?? undefined,
      status: r.status,
      createdAt: new Date(r.created_at).toISOString(),
      updatedAt: new Date(r.updated_at).toISOString()
    }));
  }
}

// ../../../../Projects/agentum/node_modules/hono/dist/http-exception.js
var HTTPException = class extends Error {
  res;
  status;
  constructor(status = 500, options) {
    super(options?.message, { cause: options?.cause });
    this.res = options?.res;
    this.status = status;
  }
  getResponse() {
    if (this.res)
      return new Response(this.res.body, {
        status: this.status,
        headers: this.res.headers
      });
    return new Response(this.message, { status: this.status });
  }
};

// ../../../../Projects/agentum/node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = Symbol();

// ../../../../Projects/agentum/node_modules/hono/dist/utils/crypto.js
var sha256 = async (data) => {
  return await createHash(data, {
    name: "SHA-256",
    alias: "sha256"
  });
};
var createHash = async (data, algorithm) => {
  let sourceBuffer;
  if (ArrayBuffer.isView(data) || data instanceof ArrayBuffer)
    sourceBuffer = data;
  else {
    if (typeof data === "object")
      data = JSON.stringify(data);
    sourceBuffer = new TextEncoder().encode(String(data));
  }
  if (crypto && crypto.subtle) {
    const buffer = await crypto.subtle.digest({ name: algorithm.name }, sourceBuffer);
    return Array.prototype.map.call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2)).join("");
  }
  return null;
};

// ../../../../Projects/agentum/node_modules/hono/dist/utils/buffer.js
var constantTimeEqualString = (a, b) => {
  const aLen = a.length;
  const bLen = b.length;
  const maxLen = Math.max(aLen, bLen);
  let out = aLen ^ bLen;
  for (let i = 0;i < maxLen; i++) {
    const aChar = i < aLen ? a.charCodeAt(i) : 0;
    const bChar = i < bLen ? b.charCodeAt(i) : 0;
    out |= aChar ^ bChar;
  }
  return out === 0;
};
var timingSafeEqualString = async (a, b, hashFunction) => {
  if (!hashFunction)
    hashFunction = sha256;
  const [sa, sb] = await Promise.all([hashFunction(a), hashFunction(b)]);
  if (sa == null || sb == null || typeof sa !== "string" || typeof sb !== "string")
    return false;
  const hashEqual = constantTimeEqualString(sa, sb);
  const originalEqual = constantTimeEqualString(a, b);
  return hashEqual && originalEqual;
};
var timingSafeEqual = async (a, b, hashFunction) => {
  if (typeof a === "string" && typeof b === "string")
    return timingSafeEqualString(a, b, hashFunction);
  if (!hashFunction)
    hashFunction = sha256;
  const [sa, sb] = await Promise.all([hashFunction(a), hashFunction(b)]);
  if (!sa || !sb || typeof sa !== "string" || typeof sb !== "string")
    return false;
  return timingSafeEqualString(sa, sb);
};
var bufferToFormData = (arrayBuffer, contentType) => {
  return new Response(arrayBuffer, { headers: { "Content-Type": contentType.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase()) } }).formData();
};

// ../../../../Projects/agentum/node_modules/hono/dist/utils/body.js
var MAX_NESTED_OBJECTS = 1e4;
var isRawRequest = (request) => ("headers" in request);
var parseBody = async (request, options = Object.create(null)) => {
  const { all = false, dot = false } = options;
  const mediaType = (isRawRequest(request) ? request.headers : request.raw.headers).get("Content-Type")?.split(";")[0].trim().toLowerCase();
  if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded")
    return parseFormData(request, {
      all,
      dot
    });
  return {};
};
async function parseFormData(request, options) {
  if (!isRawRequest(request) && request.bodyCache.formData)
    return convertFormDataToBodyData(await request.bodyCache.formData, options);
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const arrayBuffer = await request.arrayBuffer();
  const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
  if (!isRawRequest(request))
    request.bodyCache.formData = formDataPromise;
  const formData = await formDataPromise;
  if (formData)
    return convertFormDataToBodyData(formData, options);
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = Object.create(null);
  const nestingState = { count: 0 };
  formData.forEach((value, key) => {
    if (!(options.all || key.endsWith("[]")))
      form[key] = value;
    else
      handleParsingAllValues(form, key, value);
  });
  if (options.dot)
    Object.entries(form).forEach(([key, value]) => {
      if (key.includes(".")) {
        handleParsingNestedValues(form, key, value, nestingState);
        delete form[key];
      }
    });
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== undefined) {
    if (Array.isArray(form[key]))
      form[key].push(value);
    else
      form[key] = [form[key], value];
  } else if (!key.endsWith("[]"))
    form[key] = value;
  else
    form[key] = [value];
};
var handleParsingNestedValues = (form, key, value, state) => {
  if (/(?:^|\.)__proto__\./.test(key))
    return;
  let nestedForm = form;
  const keys = key.split(".", 34);
  if (keys.length > 33)
    throwNestingLimitExceeded();
  keys.forEach((key, index) => {
    if (index === keys.length - 1)
      nestedForm[key] = value;
    else {
      if (!nestedForm[key] || typeof nestedForm[key] !== "object" || Array.isArray(nestedForm[key]) || nestedForm[key] instanceof File) {
        if (state.count++ >= MAX_NESTED_OBJECTS)
          throwNestingLimitExceeded();
        nestedForm[key] = Object.create(null);
      }
      nestedForm = nestedForm[key];
    }
  });
};
var throwNestingLimitExceeded = () => {
  throw new Error("Nesting limit exceeded");
};

// ../../../../Projects/agentum/node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "")
    paths.shift();
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match, index) => {
    const mark = `@${index}`;
    groups.push([mark, match]);
    return mark;
  });
  return {
    groups,
    path
  };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1;i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1;j >= 0; j--)
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*")
    return "*";
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match[2])
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [
          cacheKey,
          match[1],
          new RegExp(`^${match[2]}(?=/${next})`)
        ] : [
          label,
          match[1],
          new RegExp(`^${match[2]}$`)
        ];
      else
        patternCache[cacheKey] = [
          label,
          match[1],
          true
        ];
    }
    return patternCache[cacheKey];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
      try {
        return decoder(match);
      } catch {
        return match;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (;i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? undefined : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35)
      break;
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length)
    sub = mergePath(sub, ...rest);
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":"))
    return null;
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment))
      basePath += "/" + segment;
    else if (/\:/.test(segment)) {
      if (segment.charCodeAt(segment.length - 1) === 63) {
        if (results.length === 0 && basePath === "")
          results.push("/");
        else
          results.push(basePath);
        const optionalSegment = segment.slice(0, -1);
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else
        basePath += "/" + segment;
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var tryDecodeURIComponent = (str) => str.indexOf("%") !== -1 ? tryDecode(str, decodeURIComponent_) : str;
var _decodeURI = (value) => {
  if (value.indexOf("+") !== -1)
    value = value.replace(/\+/g, " ");
  return tryDecodeURIComponent(value);
};
var _getQueryParam = (url, key, multiple) => {
  const hashIndex = url.indexOf("#", 8);
  if (hashIndex !== -1)
    url = url.slice(0, hashIndex);
  let encoded;
  if (!multiple && key && key.indexOf("%") === -1 && key.indexOf("+") === -1) {
    let keyIndex = url.indexOf("?", 8);
    if (keyIndex === -1)
      return;
    if (!url.startsWith(key, keyIndex + 1))
      keyIndex = url.indexOf(`&${key}`, keyIndex + 1);
    while (keyIndex !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? undefined : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode))
        return "";
      keyIndex = url.indexOf(`&${key}`, keyIndex + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded)
      return;
  }
  const results = Object.create(null);
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1)
      valueIndex = -1;
    let name = url.slice(keyIndex + 1, valueIndex === -1 ? nextKeyIndex === -1 ? undefined : nextKeyIndex : valueIndex);
    if (encoded)
      name = _decodeURI(name);
    keyIndex = nextKeyIndex;
    if (name === "")
      continue;
    let value;
    if (valueIndex === -1)
      value = "";
    else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? undefined : nextKeyIndex);
      if (encoded)
        value = _decodeURI(value);
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name])))
        results[name] = [];
      results[name].push(value);
    } else
      results[name] ??= value;
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// ../../../../Projects/agentum/node_modules/hono/dist/request.js
var HonoRequest = class {
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex]?.[1][key];
    const param = this.#getParamValue(paramKey);
    return param && tryDecodeURIComponent(param);
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex]?.[1] ?? {});
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== undefined)
        decoded[key] = tryDecodeURIComponent(value);
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name)
      return this.raw.headers.get(name) ?? undefined;
    const headerData = Object.create(null);
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody)
      return cachedBody;
    for (const anyCachedKey in bodyCache)
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json")
          body = JSON.stringify(body);
        const contentType = anyCachedKey === "formData" ? undefined : raw.headers.get("content-type");
        return new Response(body, { headers: contentType ? { "Content-Type": contentType } : undefined })[key]();
      });
    return bodyCache[key] = raw[key]();
  };
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    (this.#validatedData ??= {})[target] = data;
  }
  valid(target) {
    return this.#validatedData?.[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// ../../../../Projects/agentum/node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise))
      str = str.toString();
    if (str instanceof Promise)
      str = await str;
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length)
    return Promise.resolve(str);
  if (buffer)
    buffer[0] += str;
  else
    buffer = [str];
  const resStr = Promise.all(callbacks.map((c) => c({
    phase,
    buffer,
    context
  }))).then((res) => Promise.all(res.filter(Boolean).map((str) => resolveCallback(str, phase, false, context, buffer))).then(() => buffer[0]));
  if (preserveCallbacks)
    return raw(await resStr, callbacks);
  else
    return resStr;
};

// ../../../../Projects/agentum/node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = (contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
};
var createResponseInstance = (body, init) => new Response(body, init);
var Context = class {
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx)
      return this.#executionCtx;
    else
      throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (this.#executionCtx)
      return this.#executionCtx;
    else
      throw Error("This context has no ExecutionContext");
  }
  get res() {
    return this.#res ||= createResponseInstance(null, { headers: this.#preparedHeaders ??= new Headers });
  }
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type")
          continue;
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies)
            _res.headers.append("set-cookie", cookie);
        } else
          _res.headers.set(k, v);
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  setLayout = (layout) => this.#layout = layout;
  getLayout = () => this.#layout;
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  header = (name, value, options) => {
    if (this.finalized)
      this.#res = createResponseInstance(this.#res.body, this.#res);
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers;
    if (value === undefined)
      headers.delete(name);
    else if (options?.append)
      headers.append(name, value);
    else
      headers.set(name, value);
  };
  status = (status) => {
    this.#status = status;
  };
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map;
    this.#var.set(key, value);
  };
  get = (key) => {
    return this.#var ? this.#var.get(key) : undefined;
  };
  get var() {
    if (!this.#var)
      return {};
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    let responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders;
    if (typeof arg === "object" && arg.headers) {
      responseHeaders ??= new Headers;
      for (const [key, value] of new Headers(arg.headers))
        if (key === "set-cookie")
          responseHeaders.append(key, value);
        else
          responseHeaders.set(key, value);
    }
    if (headers) {
      if (!responseHeaders) {
        let count = 0;
        for (const k in headers)
          if (++count > 1 || typeof headers[k] !== "string") {
            responseHeaders = new Headers;
            break;
          }
      }
      if (responseHeaders)
        for (const k in headers) {
          const v = headers[k];
          if (typeof v === "string")
            responseHeaders.set(k, v);
          else {
            responseHeaders.delete(k);
            for (const v2 of v)
              responseHeaders.append(k, v2);
          }
        }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, {
      status,
      headers: responseHeaders ?? headers
    });
  }
  newResponse = (...args) => this.#newResponse(...args);
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(text, arg, setDefaultContentType(TEXT_PLAIN, headers));
  };
  json = (object, arg, headers) => {
    return this.#newResponse(JSON.stringify(object), arg, setDefaultContentType("application/json", headers));
  };
  html = (html, arg, headers) => {
    const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  redirect = (location, status) => {
    const locationString = String(location);
    this.header("Location", !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString));
    return this.newResponse(null, status ?? 302);
  };
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
};

// ../../../../Projects/agentum/node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index)
        throw new Error("next() called multiple times");
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else
        handler = i === middleware.length && next || undefined;
      if (handler)
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else
            throw err;
        }
      else if (context.finalized === false && onNotFound)
        res = await onNotFound(context);
      if (res && (context.finalized === false || isError))
        context.res = res;
      return context;
    }
  };
};

// ../../../../Projects/agentum/node_modules/hono/dist/router.js
var METHODS = [
  "get",
  "post",
  "put",
  "delete",
  "options",
  "patch",
  "query"
];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// ../../../../Projects/agentum/node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// ../../../../Projects/agentum/node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  query;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    [...METHODS, "all"].forEach((method) => {
      this[method] = (args1, ...args) => {
        const methodName = method.toUpperCase();
        if (typeof args1 === "string")
          this.#path = args1;
        else
          this.#addRoute(methodName, this.#path, args1);
        args.forEach((handler) => {
          this.#addRoute(methodName, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          const methodName = m.toUpperCase();
          for (const handler of handlers)
            this.#addRoute(methodName, this.#path, handler);
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string")
        this.#path = arg1;
      else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute("ALL", this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app) {
    const subApp = this.basePath(path);
    app.routes.map((r) => {
      let handler;
      if (app.errorHandler === errorHandler)
        handler = r.handler;
      else {
        handler = async (c, next) => (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function")
        optionHandler = options;
      else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false)
          replaceRequest = (request) => request;
        else
          replaceRequest = options.replaceRequest;
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options = optionHandler(c);
      return Array.isArray(options) ? options : [options];
    } : (c) => {
      let executionContext = undefined;
      try {
        executionContext = c.executionCtx;
      } catch {}
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res)
        return res;
      await next();
    };
    this.#addRoute("ALL", mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler, baseRoutePath) {
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== undefined ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler
    };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error)
      return this.errorHandler(err, c);
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD")
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then((resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized)
          throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request)
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    input = input.toString();
    return this.fetch(new Request(/^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`, requestInit), Env, executionCtx);
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, undefined, event.request.method));
    });
  };
};

// ../../../../Projects/agentum/node_modules/hono/dist/router/utils.js
var createNullObject = () => Object.create(null);

// ../../../../Projects/agentum/node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match = (method, path) => {
    const matcher = matchers[method] || matchers["ALL"];
    const staticMatch = matcher[2][path];
    if (staticMatch)
      return staticMatch;
    const match = path.match(matcher[0]);
    if (!match)
      return [[], emptyParam];
    const index = match.indexOf("", 1);
    return [matcher[1][index], match];
  };
  this.match = match;
  return match(method, path);
}

// ../../../../Projects/agentum/node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = /* @__PURE__ */ new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1)
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  if (b.length === 1)
    return 1;
  if (a === ".*" || a === "(?:|/.*)")
    return b === "(?:|/.*)" ? -1 : 1;
  else if (b === ".*" || b === "(?:|/.*)")
    return -1;
  if (a === "[^/]+")
    return 1;
  else if (b === "[^/]+")
    return -1;
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class Node {
  #index;
  #varIndex;
  #children = createNullObject();
  insert(tokens, index, paramMap, context, isStatic) {
    let node = this;
    for (let i = 0, len = tokens.length;i < len; i++) {
      const token = tokens[i];
      const pattern = token.length === 1 ? token === "*" ? i === len - 1 ? [
        "",
        "",
        ".*"
      ] : [
        "",
        "",
        LABEL_REG_EXP_STR
      ] : null : token === "/*" ? [
        "",
        "",
        TAIL_WILDCARD_REG_EXP_STR
      ] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      let nextNode;
      if (pattern) {
        const name = pattern[1];
        let regexpStr = pattern[2] || "[^/]+";
        if (name && pattern[2]) {
          if (regexpStr === ".*")
            throw PATH_ERROR;
          regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
          if (/\((?!\?:)/.test(regexpStr))
            throw PATH_ERROR;
          if (regexpStr.length === 1 && regExpMetaChars.has(regexpStr))
            throw PATH_ERROR;
        }
        nextNode = node.#children[regexpStr];
        if (!nextNode) {
          if (regexpStr !== ".*" && regexpStr !== "(?:|/.*)") {
            for (const k in node.#children)
              if ((regexpStr.length > 1 || k.length > 1) && k !== ".*" && k !== "(?:|/.*)")
                throw PATH_ERROR;
          }
          nextNode = node.#children[regexpStr] = new Node;
        }
        if (name !== "") {
          nextNode.#varIndex ??= context.varIndex++;
          paramMap.push([name, nextNode.#varIndex]);
        }
      } else {
        nextNode = node.#children[token];
        if (!nextNode) {
          for (const k in node.#children)
            if (k.length > 1 && k !== ".*" && k !== "(?:|/.*)")
              throw PATH_ERROR;
          nextNode = node.#children[token] = new Node;
        }
      }
      node = nextNode;
    }
    if (node.#index !== undefined)
      throw PATH_ERROR;
    node.#index = isStatic ? -1 : index;
  }
  buildRegExpStr() {
    const strList = Object.keys(this.#children).sort(compareKey).map((k) => {
      const c = this.#children[k];
      const childStr = c.buildRegExpStr();
      return childStr === "" ? "" : (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + childStr;
    }).filter(Boolean);
    if (typeof this.#index === "number" && this.#index !== -1)
      strList.unshift(`#${this.#index}`);
    if (strList.length === 0)
      return "";
    if (strList.length === 1)
      return strList[0];
    return "(?:" + strList.join("|") + ")";
  }
};

// ../../../../Projects/agentum/node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node;
  #index = 0;
  paths = createNullObject();
  insert(path, isStatic) {
    if (isStatic) {
      this.#root.insert(path.split(""), 0, [], this.#context, true);
      return;
    }
    const paramAssoc = [];
    const groups = [];
    let markedPath = path;
    for (let i = 0;; ) {
      let replaced = false;
      markedPath = markedPath.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced)
        break;
    }
    const tokens = markedPath.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1;i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1;j >= 0; j--)
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
    }
    this.#root.insert(tokens, this.#index, paramAssoc, this.#context, false);
    this.paths[path] = [this.#index++, paramAssoc];
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "")
      return [
        /^$/,
        [],
        []
      ];
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== undefined) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== undefined) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [
      new RegExp(`^${regexp}`),
      indexReplacementMap,
      paramReplacementMap
    ];
  }
};

// ../../../../Projects/agentum/node_modules/hono/dist/router/reg-exp-router/router.js
var wildcardRegExpCache = createNullObject();
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(`^${path.replace(/\/:[^/{}]+(?:\{\[\^\/]\+})?(?=[/{]|$)|\/?\*$|([.\\+*[^\]$()?{}|])/g, (match, metaChar) => metaChar ? `\\${metaChar}` : match === "/*" ? TAIL_WILDCARD_REG_EXP_STR : match === "*" ? ".*" : `/:${LABEL_REG_EXP_STR}`)}$`);
}
function findMiddleware(middleware, path) {
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length))
    if (buildWildcardRegExp(k).test(path))
      return [...middleware[k]];
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  #tries;
  constructor() {
    this.#middleware = { ["ALL"]: createNullObject() };
    this.#routes = { ["ALL"]: createNullObject() };
    this.#tries = { ["ALL"]: new Trie };
  }
  #insertPath(method, path) {
    try {
      this.#tries[method].insert(path, !/\*|\/:/.test(path));
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware)
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    if (!middleware[method]) {
      this.#tries[method] = new Trie;
      for (const handlerMap of [middleware, routes]) {
        handlerMap[method] = createNullObject();
        for (const p in handlerMap["ALL"]) {
          handlerMap[method][p] = [...handlerMap["ALL"][p]];
          this.#insertPath(method, p);
        }
      }
    }
    if (path === "/*")
      path = "*";
    const methods = method === "ALL" ? Object.keys(middleware) : [method];
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      for (const m of methods)
        if (!middleware[m][path]) {
          this.#insertPath(m, path);
          middleware[m][path] = findMiddleware(middleware[m], path) || findMiddleware(middleware["ALL"], path) || [];
        }
      for (const handlerMap of [middleware, routes])
        for (const m of methods)
          for (const p in handlerMap[m])
            re.test(p) && handlerMap[m][p].push([handler, path]);
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (const path of paths)
      for (const m of methods) {
        if (!routes[m][path]) {
          this.#insertPath(m, path);
          routes[m][path] = findMiddleware(middleware[m], path) || findMiddleware(middleware["ALL"], path) || [];
        }
        routes[m][path].push([handler, path]);
      }
  }
  match = match;
  buildAllMatchers() {
    const matchers = createNullObject();
    for (const method of Object.keys(this.#routes))
      matchers[method] = this.#buildMatcher(method);
    this.#middleware = this.#routes = this.#tries = undefined;
    wildcardRegExpCache = createNullObject();
    return matchers;
  }
  #buildMatcher(method) {
    const middleware = this.#middleware[method];
    const routes = this.#routes[method];
    const trie = this.#tries[method];
    const staticMap = createNullObject();
    const handlerData = [];
    const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
    for (const r of [middleware, routes])
      for (const path in r) {
        const handlers = r[path];
        const pathData = trie.paths[path];
        if (!pathData) {
          staticMap[path] = [handlers.map(([h]) => [h, createNullObject()]), emptyParam];
          continue;
        }
        handlerData[pathData[0]] = handlers.map(([h, handlerPath]) => [h, trie.paths[handlerPath][1].reduceRight((map, [key], i) => {
          map[key] = paramReplacementMap[pathData[1][i][1]];
          return map;
        }, createNullObject())]);
      }
    return [
      regexp,
      indexReplacementMap.map((i) => handlerData[i]),
      staticMap
    ];
  }
};

// ../../../../Projects/agentum/node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes)
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    this.#routes.push([
      method,
      path,
      handler
    ]);
  }
  match(method, path) {
    if (!this.#routes)
      throw new Error("Fatal error");
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (;i < len; i++) {
      const router = routers[i];
      try {
        for (let i = 0, len = routes.length;i < len; i++)
          router.add(...routes[i]);
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError)
          continue;
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = undefined;
      break;
    }
    if (i === len)
      throw new Error("Fatal error");
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1)
      throw new Error("No active router has been determined yet.");
    return this.#routers[0];
  }
};

// ../../../../Projects/agentum/node_modules/hono/dist/router/trie-router/node.js
var emptyParams = createNullObject();
var order = 0;
var Node2 = class Node {
  #methods = [];
  #children = createNullObject();
  #patterns = [];
  #pattern;
  #params = emptyParams;
  insert(method, path, handler) {
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = /* @__PURE__ */ new Set;
    let i = 0;
    for (const p of parts) {
      const nextP = parts[++i];
      const pattern = getPattern(p, nextP) || (nextP === undefined && p && p.indexOf("*") === p.length - 1 ? p : null);
      const isParam = Array.isArray(pattern);
      const key = isParam ? pattern[0] : pattern || p;
      const child = curNode.#children[key] ||= new Node;
      if (pattern && !child.#pattern) {
        child.#pattern = pattern;
        curNode.#patterns.push(child);
      }
      curNode = child;
      if (isParam)
        possibleKeys.add(pattern[1]);
    }
    curNode.#methods.push({ [method]: {
      handler,
      possibleKeys: [...possibleKeys],
      score: ++order
    } });
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length;i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m["ALL"];
      if (handlerSet) {
        handlerSet.params = createNullObject();
        handlerSets.push(handlerSet);
        for (let i = 0, len = handlerSet.possibleKeys.length;i < len; i++) {
          const key = handlerSet.possibleKeys[i];
          handlerSet.params[key] = params?.[key] && !i ? params[key] : nodeParams[key] ?? params?.[key];
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    let curNodes = [this];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0;i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length;j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"])
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else
            tempNodes.push(nextNode);
        }
        for (const child of node.#patterns) {
          const pattern = child.#pattern;
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (typeof pattern === "string") {
            if (pattern === "*" || part.startsWith(pattern.slice(0, -1))) {
              this.#pushHandlerSets(handlerSets, child, method, node.#params);
              if (pattern === "*") {
                child.#params = params;
                tempNodes.push(child);
              }
            }
            continue;
          }
          const [, name, matcher] = pattern;
          if (!part && matcher === true)
            continue;
          if (matcher !== true) {
            if (!partOffsets) {
              partOffsets = [];
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0;p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.slice(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (m[0].length === restPathString.length && child.#children["*"])
                this.#pushHandlerSets(handlerSets, child.#children["*"], method, node.#params, params);
              for (const _ in child.#children) {
                child.#params = params;
                const componentCount = m[0].match(/\//g)?.length ?? 0;
                (curNodesQueue[componentCount] ||= []).push(child);
                break;
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"])
                this.#pushHandlerSets(handlerSets, child.#children["*"], method, params, node.#params);
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets[1])
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// ../../../../Projects/agentum/node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node = new Node2;
  add(method, path, handler) {
    for (const result of checkOptionalParameter(path) || [path])
      this.#node.insert(method, result, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// ../../../../Projects/agentum/node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({ routers: [new RegExpRouter, new TrieRouter] });
  }
};

// ../../../../Projects/agentum/node_modules/hono/dist/middleware/cors/index.js
var cors = (options) => {
  const opts = {
    origin: "*",
    allowMethods: [
      "GET",
      "HEAD",
      "PUT",
      "POST",
      "DELETE",
      "PATCH",
      "QUERY"
    ],
    allowHeaders: [],
    exposeHeaders: [],
    ...options
  };
  const exposeHeadersStr = opts.exposeHeaders?.length ? opts.exposeHeaders.join(",") : undefined;
  const allowHeadersStr = opts.allowHeaders?.length ? opts.allowHeaders.join(",") : undefined;
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*")
        return () => optsOrigin;
      else
        return (origin) => optsOrigin === origin ? origin : null;
    } else if (typeof optsOrigin === "function")
      return optsOrigin;
    else
      return (origin) => optsOrigin.includes(origin) ? origin : null;
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function")
      return async (origin, c) => (await optsAllowMethods(origin, c)).join(",");
    else if (Array.isArray(optsAllowMethods)) {
      const methodsStr = optsAllowMethods.join(",");
      return () => methodsStr;
    } else
      return () => "";
  })(opts.allowMethods);
  return async function cors(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin)
      set("Access-Control-Allow-Origin", allowOrigin);
    if (opts.credentials)
      set("Access-Control-Allow-Credentials", "true");
    if (exposeHeadersStr)
      set("Access-Control-Expose-Headers", exposeHeadersStr);
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*")
        c.res.headers.append("Vary", "Origin");
      if (opts.maxAge != null)
        set("Access-Control-Max-Age", opts.maxAge.toString());
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods)
        set("Access-Control-Allow-Methods", allowMethods);
      let headersStr = allowHeadersStr;
      if (!headersStr) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders)
          headersStr = requestHeaders.split(",").map((h) => h.trim()).join(",");
      }
      if (headersStr) {
        set("Access-Control-Allow-Headers", headersStr);
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*")
      c.header("Vary", "Origin", { append: true });
  };
};

// ../../../../Projects/agentum/node_modules/hono/dist/middleware/body-limit/index.js
var ERROR_MESSAGE = "Payload Too Large";
var bodyLimit = (options) => {
  const onError = options.onError || (() => {
    const res = new Response(ERROR_MESSAGE, { status: 413 });
    throw new HTTPException(413, { res });
  });
  const maxSize = options.maxSize;
  return async function bodyLimit(c, next) {
    if (!c.req.raw.body)
      return next();
    const hasTransferEncoding = c.req.raw.headers.has("transfer-encoding");
    if (c.req.raw.headers.has("content-length") && !hasTransferEncoding)
      return parseInt(c.req.raw.headers.get("content-length") || "0", 10) > maxSize ? onError(c) : next();
    let size = 0;
    const chunks = [];
    const rawReader = c.req.raw.body.getReader();
    for (;; ) {
      const { done, value } = await rawReader.read();
      if (done)
        break;
      size += value.length;
      if (size > maxSize)
        return onError(c);
      chunks.push(value);
    }
    const requestInit = {
      body: new ReadableStream({ start(controller) {
        for (const chunk of chunks)
          controller.enqueue(chunk);
        controller.close();
      } }),
      duplex: "half"
    };
    c.req.raw = new Request(c.req.raw, requestInit);
    return next();
  };
};

// ../../../../Projects/agentum/node_modules/hono/dist/middleware/request-id/request-id.js
var requestId = ({ limitLength = 255, headerName = "X-Request-Id", generator = () => crypto.randomUUID() } = {}) => {
  return async function requestId(c, next) {
    let reqId = headerName ? c.req.header(headerName) : undefined;
    if (!reqId || reqId.length > limitLength || /[^\w\-=]/.test(reqId))
      reqId = generator(c);
    c.set("requestId", reqId);
    if (headerName)
      c.header(headerName, reqId);
    await next();
  };
};

// ../../../../Projects/agentum/node_modules/hono/dist/utils/encode.js
var decodeBase64Url = (str) => {
  return decodeBase64(str.replace(/_|-/g, (m) => ({
    _: "/",
    "-": "+"
  })[m] ?? m));
};
var encodeBase64Url = (buf) => encodeBase64(buf).replace(/\/|\+/g, (m) => ({
  "/": "_",
  "+": "-"
})[m] ?? m);
var encodeBase64 = (buf) => {
  let binary = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0, len = bytes.length;i < len; i++)
    binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
};
var decodeBase64 = (str) => {
  const binary = atob(str);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  const half = binary.length / 2;
  for (let i = 0, j = binary.length - 1;i <= half; i++, j--) {
    bytes[i] = binary.charCodeAt(i);
    bytes[j] = binary.charCodeAt(j);
  }
  return bytes;
};

// ../../../../Projects/agentum/node_modules/hono/dist/middleware/secure-headers/secure-headers.js
var HEADERS_MAP = {
  crossOriginEmbedderPolicy: ["Cross-Origin-Embedder-Policy", "require-corp"],
  crossOriginResourcePolicy: ["Cross-Origin-Resource-Policy", "same-origin"],
  crossOriginOpenerPolicy: ["Cross-Origin-Opener-Policy", "same-origin"],
  originAgentCluster: ["Origin-Agent-Cluster", "?1"],
  referrerPolicy: ["Referrer-Policy", "no-referrer"],
  strictTransportSecurity: ["Strict-Transport-Security", "max-age=15552000; includeSubDomains"],
  xContentTypeOptions: ["X-Content-Type-Options", "nosniff"],
  xDnsPrefetchControl: ["X-DNS-Prefetch-Control", "off"],
  xDownloadOptions: ["X-Download-Options", "noopen"],
  xFrameOptions: ["X-Frame-Options", "SAMEORIGIN"],
  xPermittedCrossDomainPolicies: ["X-Permitted-Cross-Domain-Policies", "none"],
  xXssProtection: ["X-XSS-Protection", "0"]
};
var DEFAULT_OPTIONS = {
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: true,
  crossOriginOpenerPolicy: true,
  originAgentCluster: true,
  referrerPolicy: true,
  strictTransportSecurity: true,
  xContentTypeOptions: true,
  xDnsPrefetchControl: true,
  xDownloadOptions: true,
  xFrameOptions: true,
  xPermittedCrossDomainPolicies: true,
  xXssProtection: true,
  removePoweredBy: true,
  permissionsPolicy: {}
};
var secureHeaders = (customOptions) => {
  const options = {
    ...DEFAULT_OPTIONS,
    ...customOptions
  };
  const headersToSet = getFilteredHeaders(options);
  const callbacks = [];
  if (options.contentSecurityPolicy) {
    const [callback, value] = getCSPDirectives(options.contentSecurityPolicy, "Content-Security-Policy");
    if (callback)
      callbacks.push(callback);
    headersToSet.push(["Content-Security-Policy", value]);
  }
  if (options.contentSecurityPolicyReportOnly) {
    const [callback, value] = getCSPDirectives(options.contentSecurityPolicyReportOnly, "Content-Security-Policy-Report-Only");
    if (callback)
      callbacks.push(callback);
    headersToSet.push(["Content-Security-Policy-Report-Only", value]);
  }
  if (options.permissionsPolicy && Object.keys(options.permissionsPolicy).length > 0)
    headersToSet.push(["Permissions-Policy", getPermissionsPolicyDirectives(options.permissionsPolicy)]);
  if (options.reportingEndpoints)
    headersToSet.push(["Reporting-Endpoints", getReportingEndpoints(options.reportingEndpoints)]);
  if (options.reportTo)
    headersToSet.push(["Report-To", getReportToOptions(options.reportTo)]);
  return async function secureHeaders(ctx, next) {
    const headersToSetForReq = callbacks.length === 0 ? headersToSet : callbacks.reduce((acc, cb) => cb(ctx, acc), headersToSet);
    await next();
    setHeaders(ctx, headersToSetForReq);
    if (options?.removePoweredBy)
      ctx.res.headers.delete("X-Powered-By");
  };
};
function getFilteredHeaders(options) {
  return Object.entries(HEADERS_MAP).filter(([key]) => options[key]).map(([key, defaultValue]) => {
    const overrideValue = options[key];
    return typeof overrideValue === "string" ? [defaultValue[0], overrideValue] : defaultValue;
  });
}
function getCSPDirectives(contentSecurityPolicy, headerName) {
  const callbacks = [];
  const resultValues = [];
  for (const [directive, value] of Object.entries(contentSecurityPolicy)) {
    const valueArray = Array.isArray(value) ? value : [value];
    valueArray.forEach((value, i) => {
      if (typeof value === "function") {
        const index = i * 2 + 2 + resultValues.length;
        callbacks.push((ctx, values) => {
          values[index] = value(ctx, directive);
        });
      }
    });
    resultValues.push(directive.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (match, offset) => offset ? "-" + match.toLowerCase() : match.toLowerCase()), ...valueArray.flatMap((value) => [" ", value]), "; ");
  }
  resultValues.pop();
  return callbacks.length === 0 ? [undefined, resultValues.join("")] : [(ctx, headersToSet) => headersToSet.map((values) => {
    if (values[0] === headerName) {
      const clone = values[1].slice();
      callbacks.forEach((cb) => {
        cb(ctx, clone);
      });
      return [values[0], clone.join("")];
    } else
      return values;
  }), resultValues];
}
function getPermissionsPolicyDirectives(policy) {
  return Object.entries(policy).map(([directive, value]) => {
    const kebabDirective = camelToKebab(directive);
    if (typeof value === "boolean")
      return `${kebabDirective}=${value ? "*" : "()"}`;
    if (Array.isArray(value)) {
      if (value.length === 0)
        return `${kebabDirective}=()`;
      if (value.length === 1 && value[0] === "*")
        return `${kebabDirective}=*`;
      if (value.length === 1 && value[0] === "none")
        return `${kebabDirective}=()`;
      return `${kebabDirective}=(${value.map((item) => ["self", "src"].includes(item) ? item : `"${item}"`).join(" ")})`;
    }
    return "";
  }).filter(Boolean).join(", ");
}
function camelToKebab(str) {
  return str.replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
}
function getReportingEndpoints(reportingEndpoints = []) {
  return reportingEndpoints.map((endpoint) => `${endpoint.name}="${endpoint.url}"`).join(", ");
}
function getReportToOptions(reportTo = []) {
  return reportTo.map((option) => JSON.stringify(option)).join(", ");
}
function setHeaders(ctx, headersToSet) {
  headersToSet.forEach(([header, value]) => {
    ctx.res.headers.set(header, value);
  });
}

// ../../../../Projects/agentum/node_modules/hono/dist/middleware/timeout/index.js
var defaultTimeoutException = new HTTPException(504, { message: "Gateway Timeout" });
var timeout = (duration, exception = defaultTimeoutException) => {
  return async function timeout(context, next) {
    let timer;
    const timeoutPromise = new Promise((_, reject) => {
      timer = setTimeout(() => {
        reject(typeof exception === "function" ? exception(context) : exception);
      }, duration);
    });
    try {
      await Promise.race([next(), timeoutPromise]);
    } finally {
      if (timer !== undefined)
        clearTimeout(timer);
    }
  };
};

// ../../../../Projects/agentum/node_modules/hono/dist/middleware/timing/timing.js
var getTime = () => {
  try {
    return performance.now();
  } catch {}
  return Date.now();
};
var timing = (config) => {
  const options = {
    total: true,
    enabled: true,
    totalDescription: "Total Response Time",
    autoEnd: true,
    crossOrigin: false,
    ...config
  };
  return async function timing(c, next) {
    const headers = [];
    const timers = /* @__PURE__ */ new Map;
    if (c.get("metric"))
      return await next();
    c.set("metric", {
      headers,
      timers
    });
    if (options.total)
      startTime(c, "total", options.totalDescription);
    await next();
    if (options.total)
      endTime(c, "total");
    if (options.autoEnd)
      timers.forEach((_, key) => {
        endTime(c, key);
      });
    if (typeof options.enabled === "function" ? options.enabled(c) : options.enabled) {
      c.res.headers.append("Server-Timing", headers.join(","));
      const crossOrigin = typeof options.crossOrigin === "function" ? options.crossOrigin(c) : options.crossOrigin;
      if (crossOrigin)
        c.res.headers.append("Timing-Allow-Origin", typeof crossOrigin === "string" ? crossOrigin : "*");
    }
  };
};
var setMetric = (c, name, valueDescription, description, precision) => {
  const metrics = c.get("metric");
  if (!metrics) {
    console.warn("Metrics not initialized! Please add the `timing()` middleware to this route!");
    return;
  }
  if (typeof valueDescription === "number") {
    const dur = valueDescription.toFixed(precision || 1);
    const metric = description ? `${name};dur=${dur};desc="${description}"` : `${name};dur=${dur}`;
    metrics.headers.push(metric);
  } else {
    const metric = valueDescription ? `${name};desc="${valueDescription}"` : `${name}`;
    metrics.headers.push(metric);
  }
};
var startTime = (c, name, description) => {
  const metrics = c.get("metric");
  if (!metrics) {
    console.warn("Metrics not initialized! Please add the `timing()` middleware to this route!");
    return;
  }
  metrics.timers.set(name, {
    description,
    start: getTime()
  });
};
var endTime = (c, name, precision) => {
  const metrics = c.get("metric");
  if (!metrics) {
    console.warn("Metrics not initialized! Please add the `timing()` middleware to this route!");
    return;
  }
  const timer = metrics.timers.get(name);
  if (!timer) {
    console.warn(`Timer "${name}" does not exist!`);
    return;
  }
  const { description, start } = timer;
  const duration = getTime() - start;
  setMetric(c, name, duration, description, precision);
  metrics.timers.delete(name);
};

// ../../agentum-clean-release/agentum/src/domain/iban.ts
var IBAN_LENGTHS_BY_COUNTRY = {
  AL: 28,
  AD: 24,
  AT: 20,
  AZ: 28,
  BH: 22,
  BE: 16,
  BA: 20,
  BR: 29,
  BG: 22,
  CR: 22,
  HR: 21,
  CY: 28,
  CZ: 24,
  DK: 18,
  DO: 28,
  EE: 20,
  FO: 18,
  FI: 18,
  FR: 27,
  GE: 22,
  DE: 22,
  GI: 23,
  GR: 27,
  GL: 18,
  GT: 28,
  HU: 28,
  IS: 26,
  IE: 22,
  IL: 23,
  IT: 27,
  JO: 30,
  KZ: 20,
  XK: 20,
  KW: 30,
  LV: 21,
  LB: 28,
  LI: 21,
  LT: 20,
  LU: 20,
  MK: 19,
  MT: 31,
  MR: 27,
  MU: 30,
  MD: 24,
  MC: 27,
  ME: 22,
  NL: 18,
  NO: 15,
  PK: 24,
  PS: 29,
  PL: 28,
  PT: 25,
  QA: 29,
  RO: 24,
  LC: 32,
  SM: 27,
  ST: 25,
  SA: 24,
  RS: 22,
  SC: 31,
  SK: 24,
  SI: 19,
  ES: 24,
  SE: 24,
  CH: 21,
  TN: 24,
  TR: 26,
  AE: 23,
  GB: 22,
  VA: 22,
  VG: 24
};
function validateIbanMod97(normalizedIban) {
  if (normalizedIban.length < 5)
    return false;
  const rearranged = normalizedIban.slice(4) + normalizedIban.slice(0, 4);
  let digits = "";
  for (let i = 0;i < rearranged.length; i++) {
    const code = rearranged.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      digits += (code - 55).toString();
    } else if (code >= 48 && code <= 57) {
      digits += rearranged[i];
    } else {
      return false;
    }
  }
  try {
    return BigInt(digits) % 97n === 1n;
  } catch {
    return false;
  }
}
function extractBankCode(countryCode, normalizedIban) {
  if (normalizedIban.length < 8)
    return null;
  switch (countryCode) {
    case "DE":
      return normalizedIban.slice(4, 12);
    case "GB":
      return normalizedIban.slice(4, 8);
    case "FR":
      return normalizedIban.slice(4, 9);
    case "LT":
      return normalizedIban.slice(4, 9);
    case "CH":
      return normalizedIban.slice(4, 9);
    default:
      return normalizedIban.slice(4, 8);
  }
}
function verifyBankPayee(cmd) {
  const issues = [];
  const checkedAt = new Date().toISOString();
  const normalized = (cmd.iban || "").replace(/[\s\-_.]/g, "").toUpperCase();
  if (!normalized) {
    return {
      valid: false,
      normalizedIban: "",
      countryCode: "",
      bankCode: null,
      checksumValid: false,
      countryMatch: null,
      expectedLength: null,
      actualLength: 0,
      issues: ["IBAN string is empty"],
      checkedAt
    };
  }
  const countryCode = normalized.slice(0, 2);
  const actualLength = normalized.length;
  const expectedLength = IBAN_LENGTHS_BY_COUNTRY[countryCode] ?? null;
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    issues.push(`Invalid country code prefix '${countryCode}'`);
  }
  if (expectedLength !== null && actualLength !== expectedLength) {
    issues.push(`Invalid length for country ${countryCode}: expected ${expectedLength} characters, received ${actualLength}`);
  } else if (expectedLength === null && (actualLength < 14 || actualLength > 34)) {
    issues.push(`Unrecognized country ${countryCode} or length outside valid IBAN range (14-34)`);
  }
  const checksumValid = validateIbanMod97(normalized);
  if (!checksumValid) {
    issues.push("MOD-97 checksum check failed: invalid IBAN digits");
  }
  let countryMatch = null;
  if (cmd.expectedCountry) {
    const expected = cmd.expectedCountry.trim().toUpperCase();
    countryMatch = countryCode === expected;
    if (!countryMatch) {
      issues.push(`PAYEE MISMATCH WARNING: IBAN country (${countryCode}) does not match expected corporate country (${expected})`);
    }
  }
  const bankCode = extractBankCode(countryCode, normalized);
  const valid = issues.length === 0 || issues.length === 1 && countryMatch === false;
  return {
    valid: checksumValid && (expectedLength === null || actualLength === expectedLength),
    normalizedIban: normalized,
    countryCode,
    bankCode,
    checksumValid,
    countryMatch,
    expectedLength,
    actualLength,
    issues,
    checkedAt
  };
}

// ../../agentum-clean-release/agentum/src/domain/countries/types.ts
var COUNTRY_ALIASES = {
  UK: "GB",
  EL: "GR"
};
function normalizeCountryCode(code) {
  if (!code)
    return "";
  const upper = code.trim().toUpperCase();
  return COUNTRY_ALIASES[upper] || upper;
}

// ../../agentum-clean-release/agentum/src/domain/identifiers/checksums.ts
function luhn(digits) {
  const clean = digits.replace(/\D/g, "");
  if (!clean)
    return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = clean.length - 1;i >= 0; i--) {
    let digit = parseInt(clean[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9)
        digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}
function mod97(cleanDigits) {
  const clean = cleanDigits.replace(/\D/g, "");
  if (clean.length !== 10)
    return false;
  const base = parseInt(clean.slice(0, 8), 10);
  const check = parseInt(clean.slice(8, 10), 10);
  const remainder = base % 97;
  return 97 - remainder === check;
}
function cnpjChecksum(cleanDigits) {
  const clean = cleanDigits.replace(/\D/g, "");
  if (clean.length !== 14)
    return false;
  if (/^(\d)\1{13}$/.test(clean))
    return false;
  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let s1 = 0;
  for (let i = 0;i < 12; i++) {
    s1 += parseInt(clean[i], 10) * w1[i];
  }
  const r1 = s1 % 11;
  const d1 = r1 < 2 ? 0 : 11 - r1;
  if (parseInt(clean[12], 10) !== d1)
    return false;
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let s2 = 0;
  for (let i = 0;i < 13; i++) {
    s2 += parseInt(clean[i], 10) * w2[i];
  }
  const r2 = s2 % 11;
  const d2 = r2 < 2 ? 0 : 11 - r2;
  return parseInt(clean[13], 10) === d2;
}
function jpCnChecksum(cleanDigits) {
  const clean = cleanDigits.replace(/\D/g, "");
  if (clean.length !== 13)
    return false;
  const checkDigit = parseInt(clean[0], 10);
  const basic = clean.slice(1).split("").map((c) => parseInt(c, 10));
  const rev = [...basic].reverse();
  let s = 0;
  for (let i = 0;i < 12; i++) {
    const weight = i % 2 === 0 ? 1 : 2;
    s += rev[i] * weight;
  }
  const rem = s % 9;
  const expected = rem === 0 ? 0 : 9 - rem;
  return checkDigit === expected;
}
function cnUsccChecksum(cleanRaw) {
  const clean = cleanRaw.toUpperCase().replace(/[\s-]/g, "");
  if (clean.length !== 18)
    return false;
  const CHARS = "0123456789ABCDEFGHJKLMNPQRTUWXY";
  const WEIGHTS = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
  let sum = 0;
  for (let i = 0;i < 17; i++) {
    const idx = CHARS.indexOf(clean[i]);
    if (idx === -1)
      return false;
    sum += idx * WEIGHTS[i];
  }
  const rem = sum % 31;
  const checkVal = (31 - rem) % 31;
  return clean[17] === CHARS[checkVal];
}
function inGstinChecksum(cleanRaw) {
  const clean = cleanRaw.toUpperCase().replace(/[\s-]/g, "");
  if (clean.length !== 15)
    return false;
  const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let sum = 0;
  for (let i = 0;i < 14; i++) {
    const val = CHARS.indexOf(clean[i]);
    if (val === -1)
      return false;
    const factor = i % 2 === 0 ? 1 : 2;
    const prod = val * factor;
    sum += Math.floor(prod / 36) + prod % 36;
  }
  const rem = sum % 36;
  const checkCode = (36 - rem) % 36;
  return clean[14] === CHARS[checkCode];
}
function plNipChecksum(cleanDigits) {
  const clean = cleanDigits.replace(/\D/g, "");
  if (clean.length !== 10)
    return false;
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  for (let i = 0;i < 9; i++) {
    sum += parseInt(clean[i], 10) * weights[i];
  }
  const rem = sum % 11;
  if (rem === 10)
    return false;
  return rem === parseInt(clean[9], 10);
}
function czIcoChecksum(cleanDigits) {
  const clean = cleanDigits.replace(/\D/g, "");
  if (clean.length !== 8)
    return false;
  const weights = [8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0;i < 7; i++) {
    sum += parseInt(clean[i], 10) * weights[i];
  }
  const rem = sum % 11;
  let expected = 0;
  if (rem === 0 || rem === 1) {
    expected = 1 - rem;
  } else if (rem === 10) {
    expected = 1;
  } else {
    expected = 11 - rem;
  }
  return expected === parseInt(clean[7], 10);
}
function noOrgnrChecksum(cleanDigits) {
  const clean = cleanDigits.replace(/\D/g, "");
  if (clean.length !== 9)
    return false;
  const weights = [3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0;i < 8; i++) {
    sum += parseInt(clean[i], 10) * weights[i];
  }
  const rem = sum % 11;
  if (rem === 1)
    return false;
  const expected = rem === 0 ? 0 : 11 - rem;
  return expected === parseInt(clean[8], 10);
}
function fiYtunnusChecksum(cleanRaw) {
  const clean = cleanRaw.replace(/\D/g, "");
  if (clean.length !== 8)
    return false;
  const weights = [7, 9, 10, 5, 8, 4, 2];
  let sum = 0;
  for (let i = 0;i < 7; i++) {
    sum += parseInt(clean[i], 10) * weights[i];
  }
  const rem = sum % 11;
  if (rem === 1)
    return false;
  const expected = rem === 0 ? 0 : 11 - rem;
  return expected === parseInt(clean[7], 10);
}

// ../../agentum-clean-release/agentum/src/domain/identifiers/registry.ts
var cleanDigits = (raw) => raw.replace(/\D/g, "");
var cleanAlphaNum = (raw) => raw.toUpperCase().replace(/[\s-]/g, "");
var NATIONAL_ID_SCHEMES = [
  { scheme: "LV_REGCODE", country: "LV", kind: "COMPANY", pattern: /^\d{11}$/, normalize: cleanDigits },
  {
    scheme: "FR_SIREN",
    country: "FR",
    kind: "COMPANY",
    pattern: /^\d{9}$/,
    normalize: cleanDigits,
    checksum: luhn
  },
  {
    scheme: "FR_SIRET",
    country: "FR",
    kind: "BOTH",
    pattern: /^\d{14}$/,
    normalize: cleanDigits,
    checksum: luhn
  },
  {
    scheme: "BR_CNPJ",
    country: "BR",
    kind: "BOTH",
    pattern: /^\d{14}$/,
    normalize: cleanDigits,
    checksum: cnpjChecksum
  },
  {
    scheme: "JP_CN",
    country: "JP",
    kind: "BOTH",
    pattern: /^\d{13}$/,
    normalize: cleanDigits,
    checksum: jpCnChecksum
  },
  {
    scheme: "CN_USCC",
    country: "CN",
    kind: "BOTH",
    pattern: /^[0-9A-HJ-NP-RT-UW-Y]{18}$/,
    normalize: cleanAlphaNum,
    checksum: cnUsccChecksum
  },
  {
    scheme: "IN_GSTIN",
    country: "IN",
    kind: "TAX",
    pattern: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    normalize: cleanAlphaNum,
    checksum: inGstinChecksum
  },
  {
    scheme: "IN_PAN",
    country: "IN",
    kind: "TAX",
    pattern: /^[A-Z]{5}\d{4}[A-Z]$/,
    normalize: cleanAlphaNum
  },
  {
    scheme: "IN_CIN",
    country: "IN",
    kind: "COMPANY",
    pattern: /^[UL]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/,
    normalize: cleanAlphaNum
  },
  {
    scheme: "PL_NIP",
    country: "PL",
    kind: "TAX",
    pattern: /^\d{10}$/,
    normalize: cleanDigits,
    checksum: plNipChecksum
  },
  {
    scheme: "PL_REGON",
    country: "PL",
    kind: "COMPANY",
    pattern: /^(\d{9}|\d{14})$/,
    normalize: cleanDigits
  },
  {
    scheme: "PL_KRS",
    country: "PL",
    kind: "COMPANY",
    pattern: /^\d{10}$/,
    normalize: cleanDigits
  },
  {
    scheme: "CZ_ICO",
    country: "CZ",
    kind: "COMPANY",
    pattern: /^\d{8}$/,
    normalize: cleanDigits,
    checksum: czIcoChecksum
  },
  {
    scheme: "NO_ORGNR",
    country: "NO",
    kind: "COMPANY",
    pattern: /^\d{9}$/,
    normalize: cleanDigits,
    checksum: noOrgnrChecksum
  },
  {
    scheme: "FI_YTUNNUS",
    country: "FI",
    kind: "BOTH",
    pattern: /^\d{8}$/,
    normalize: cleanDigits,
    checksum: fiYtunnusChecksum
  },
  {
    scheme: "BE_KBO",
    country: "BE",
    kind: "BOTH",
    pattern: /^(0|1)\d{9}$/,
    normalize: (r) => {
      const d = cleanDigits(r);
      return d.length === 9 ? "0" + d : d;
    },
    checksum: mod97
  },
  {
    scheme: "DK_CVR",
    country: "DK",
    kind: "BOTH",
    pattern: /^\d{8}$/,
    normalize: cleanDigits
  },
  {
    scheme: "NL_KVK",
    country: "NL",
    kind: "COMPANY",
    pattern: /^\d{8}$/,
    normalize: cleanDigits
  },
  {
    scheme: "EE_REGCODE",
    country: "EE",
    kind: "COMPANY",
    pattern: /^\d{8}$/,
    normalize: cleanDigits
  },
  {
    scheme: "ES_NIF",
    country: "ES",
    kind: "BOTH",
    pattern: /^[A-HJ-NP-SUVW]\d{7}[0-9A-J]$/i,
    normalize: cleanAlphaNum
  },
  {
    scheme: "IT_PIVA",
    country: "IT",
    kind: "BOTH",
    pattern: /^\d{11}$/,
    normalize: cleanDigits
  },
  {
    scheme: "SE_ORGNR",
    country: "SE",
    kind: "COMPANY",
    pattern: /^\d{10}$/,
    normalize: cleanDigits,
    checksum: luhn
  },
  {
    scheme: "AT_FN",
    country: "AT",
    kind: "COMPANY",
    pattern: /^\d{1,6}[A-Z]$/i,
    normalize: cleanAlphaNum
  },
  {
    scheme: "IE_CRO",
    country: "IE",
    kind: "COMPANY",
    pattern: /^\d{5,7}[A-Z]?$/i,
    normalize: cleanAlphaNum
  },
  {
    scheme: "MX_RFC",
    country: "MX",
    kind: "TAX",
    pattern: /^[A-Z&\u00D1]{3,4}\d{6}[A-V1-9][A-Z1-9][0-9A]$/i,
    normalize: cleanAlphaNum
  },
  {
    scheme: "KR_BRN",
    country: "KR",
    kind: "COMPANY",
    pattern: /^\d{10}$/,
    normalize: cleanDigits
  },
  {
    scheme: "CA_BN",
    country: "CA",
    kind: "TAX",
    pattern: /^\d{9}$/,
    normalize: cleanDigits,
    checksum: luhn
  },
  {
    scheme: "NZ_NZBN",
    country: "NZ",
    kind: "COMPANY",
    pattern: /^9429\d{9}$/,
    normalize: cleanDigits,
    checksum: luhn
  },
  {
    scheme: "HK_BR",
    country: "HK",
    kind: "COMPANY",
    pattern: /^\d{8}$/,
    normalize: cleanDigits
  },
  {
    scheme: "AE_TRN",
    country: "AE",
    kind: "TAX",
    pattern: /^100\d{12}$/,
    normalize: cleanDigits
  },
  {
    scheme: "DE_VAT",
    country: "DE",
    kind: "TAX",
    pattern: /^DE\d{9}$/i,
    normalize: cleanAlphaNum
  }
];
function validateNationalId(raw, country) {
  if (!raw || !country)
    return null;
  const iso2 = normalizeCountryCode(country);
  const candidates = NATIONAL_ID_SCHEMES.filter((s) => s.country === iso2);
  let invalid = null;
  for (const validator of candidates) {
    const cleaned = validator.normalize(raw);
    if (validator.pattern.test(cleaned)) {
      const valid = validator.checksum ? validator.checksum(cleaned) : true;
      const result = {
        scheme: validator.scheme,
        valid,
        cleaned
      };
      if (valid)
        return result;
      invalid ??= result;
    }
  }
  return invalid;
}
function detectSchemes(raw, countryHint) {
  if (!raw)
    return [];
  const iso2 = countryHint ? normalizeCountryCode(countryHint) : null;
  const pool = iso2 ? NATIONAL_ID_SCHEMES.filter((s) => s.country === iso2) : NATIONAL_ID_SCHEMES;
  const matches = [];
  for (const validator of pool) {
    const cleaned = validator.normalize(raw);
    if (validator.pattern.test(cleaned)) {
      const valid = validator.checksum ? validator.checksum(cleaned) : true;
      if (valid) {
        matches.push({
          scheme: validator.scheme,
          country: validator.country,
          cleaned
        });
      }
    }
  }
  return matches;
}

// ../../agentum-clean-release/agentum/src/domain/entity-identifier.ts
function registrationKey(record) {
  if (!record.registrationNumber)
    return null;
  const country = normalizeCountryCode(record.jurisdiction);
  const matches = NATIONAL_ID_SCHEMES.filter((s) => {
    if (s.country !== country || s.kind === "TAX")
      return false;
    const id = s.normalize(record.registrationNumber);
    return s.pattern.test(id) && (!s.checksum || s.checksum(id));
  });
  if (matches.length !== 1)
    return null;
  const scheme = matches[0];
  return `${country}:${scheme.scheme}:${scheme.normalize(record.registrationNumber)}`;
}
function coalesceRegistryRecords(records) {
  const result = [];
  const primaryKeys = new Set;
  for (const record of records) {
    const primaryKey = `${record.jurisdiction}:${record.primaryIdType}:${record.primaryIdValue}`;
    if (primaryKeys.has(primaryKey))
      continue;
    primaryKeys.add(primaryKey);
    const key = registrationKey(record);
    const index = key ? result.findIndex((other) => {
      const corroborating = record.primaryIdType === "NATIONAL_REG" && other.sources.some((s) => s.source === "GLEIF") || other.primaryIdType === "NATIONAL_REG" && record.sources.some((s) => s.source === "GLEIF");
      return corroborating && registrationKey(other) === key && other.normalizedName === record.normalizedName && !(other.lei && record.lei && other.lei !== record.lei);
    }) : -1;
    if (index < 0) {
      result.push(record);
      continue;
    }
    const other = result[index];
    const national = record.primaryIdType === "NATIONAL_REG" ? record : other;
    const gleif = national === record ? other : record;
    result[index] = {
      ...national,
      lei: national.lei ?? gleif.lei,
      parentLei: national.parentLei ?? gleif.parentLei,
      ultimateParentLei: national.ultimateParentLei ?? gleif.ultimateParentLei,
      headquartersAddress: national.headquartersAddress ?? gleif.headquartersAddress,
      aliases: [...new Set([...national.aliases, ...gleif.aliases])],
      tickers: [...new Set([...national.tickers, ...gleif.tickers])],
      domains: [...new Set([...national.domains, ...gleif.domains])],
      sources: [...national.sources, ...gleif.sources].filter((source, i, all) => all.findIndex((s) => s.source === source.source && s.sourceId === source.sourceId) === i)
    };
  }
  return result;
}
function matchesEntityIdentifier(entity, query) {
  const clean = (value) => value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  const equal = (value) => Boolean(value && clean(value) === clean(query.cleanedValue));
  const primary = entity.primaryIdType === query.type && equal(entity.primaryIdValue);
  switch (query.type) {
    case "LEI":
      return primary || equal(entity.lei);
    case "EU_VAT":
      return primary || equal(entity.vatNumber);
    case "US_EIN":
      return primary || equal(entity.taxId);
    case "US_CIK": {
      const cik = entity.cik ?? (entity.primaryIdType === "US_CIK" ? entity.primaryIdValue : null);
      return Boolean(cik && cik.replace(/^0+/, "") === query.cleanedValue.replace(/^0+/, ""));
    }
    case "DOMAIN": {
      const domain = (value) => value.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
      return entity.domains.some((value) => domain(value) === domain(query.cleanedValue));
    }
    case "NAME":
      return false;
    case "NATIONAL_ID": {
      if (query.scheme === "PL_NIP")
        return equal(entity.taxId);
      if (query.scheme === "PL_KRS")
        return equal(entity.registrationNumber) && (entity.registrationAuthority === "PL_KRS" || entity.sources.some((s) => s.source === "PL_KRS"));
      return primary || equal(entity.registrationNumber) || equal(entity.taxId);
    }
    default:
      return primary || equal(entity.registrationNumber);
  }
}

// ../../agentum-clean-release/agentum/src/domain/normalize.ts
var LEGAL_FORMS = [
  { pattern: "UZDAROJI AKCINE BENDROVE", form: "UAB" },
  { pattern: "AKCINE BENDROVE", form: "AB" },
  { pattern: "MAZOJI BENDRIJA", form: "MB" },
  { pattern: "VIESOJI ISTAIGA", form: "VSI" },
  { pattern: "LIMITED LIABILITY COMPANY", form: "LLC" },
  { pattern: "PUBLIC LIMITED COMPANY", form: "PLC" },
  { pattern: "PROPRIETARY LIMITED", form: "PTY LTD" },
  { pattern: "PRIVATE LIMITED", form: "PTE LTD" },
  { pattern: "PTY LTD", form: "PTY LTD" },
  { pattern: "PTE LTD", form: "PTE LTD" },
  { pattern: "SP Z O O", form: "SP ZOO" },
  { pattern: "SP ZOO", form: "SP ZOO" },
  { pattern: "INCORPORATED", form: "INC" },
  { pattern: "CORPORATION", form: "CORP" },
  { pattern: "LIMITED", form: "LTD" },
  { pattern: "GMBH", form: "GMBH" },
  { pattern: "SARL", form: "SARL" },
  { pattern: "CORP", form: "CORP" },
  { pattern: "UAB", form: "UAB" },
  { pattern: "VSI", form: "VSI" },
  { pattern: "INC", form: "INC" },
  { pattern: "LLC", form: "LLC" },
  { pattern: "LTD", form: "LTD" },
  { pattern: "PLC", form: "PLC" },
  { pattern: "SAS", form: "SAS" },
  { pattern: "SIA", form: "SIA" },
  { pattern: "AB", form: "AB" },
  { pattern: "MB", form: "MB" },
  { pattern: "AG", form: "AG" },
  { pattern: "BV", form: "BV" },
  { pattern: "NV", form: "NV" },
  { pattern: "OU", form: "OU" },
  { pattern: "PJSC", form: "PJSC" },
  { pattern: "OJSC", form: "OJSC" },
  { pattern: "JSC", form: "JSC" },
  { pattern: "PAO", form: "PAO" },
  { pattern: "OOO", form: "OOO" },
  { pattern: "ZAO", form: "ZAO" },
  { pattern: "OAO", form: "OAO" }
];
var JURISDICTION_BY_LEGAL_FORM = {
  "PTY LTD": "AU",
  PTY: "AU",
  "PTE LTD": "SG",
  PLC: "GB",
  UAB: "LT",
  MB: "LT",
  VSI: "LT",
  "SP ZOO": "PL",
  OU: "EE",
  SIA: "LV",
  SAS: "FR",
  SARL: "FR",
  BV: "NL",
  NV: "NL"
};
var HOMOGLYPHS = {
  "\u0410": "A",
  "\u0430": "A",
  "\u0412": "B",
  "\u0432": "B",
  "\u0421": "C",
  "\u0441": "C",
  "\u0415": "E",
  "\u0435": "E",
  "\u041D": "H",
  "\u043D": "H",
  "\u0406": "I",
  "\u0456": "I",
  "\u0408": "J",
  "\u0458": "J",
  "\u041A": "K",
  "\u043A": "K",
  "\u041C": "M",
  "\u043C": "M",
  "\u041E": "O",
  "\u043E": "O",
  "\u0420": "P",
  "\u0440": "P",
  "\u0422": "T",
  "\u0442": "T",
  "\u0423": "Y",
  "\u0443": "Y",
  "\u0425": "X",
  "\u0445": "X",
  "\u0391": "A",
  "\u0392": "B",
  "\u0395": "E",
  "\u0396": "Z",
  "\u0397": "H",
  "\u0399": "I",
  "\u039A": "K",
  "\u039C": "M",
  "\u039D": "N",
  "\u039F": "O",
  "\u03A1": "P",
  "\u03A4": "T",
  "\u03A5": "Y",
  "\u03A7": "X"
};
function foldDiacritics(str) {
  let out = str;
  for (const [ch, repl] of Object.entries(HOMOGLYPHS)) {
    if (out.includes(ch)) {
      out = out.split(ch).join(repl);
    }
  }
  return out.replace(/[\u0142\u0141]/g, "L").replace(/[\u00F8\u00D8]/g, "O").replace(/[\u00DF\u1E9E]/g, "SS").replace(/[\u00E6\u00C6]/g, "AE").replace(/[\u0153\u0152]/g, "OE").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}
function normalizeCompanyName(raw) {
  if (!raw || typeof raw !== "string") {
    return { normalizedName: "", detectedLegalForm: null };
  }
  let s = foldDiacritics(raw);
  s = s.replace(/[\u201E\u201C\u201D"'\u00AB\u00BB\u2018\u2019\u201A\u201B\u201F`]/g, "");
  s = s.replace(/[()\[\]{}]/g, " ");
  s = s.replace(/[,;]/g, " ");
  s = s.replace(/\./g, "");
  s = s.replace(/\s+/g, " ").trim();
  let detectedLegalForm = null;
  for (const entry of LEGAL_FORMS) {
    if (s.startsWith(entry.pattern + " ")) {
      detectedLegalForm = entry.form;
      s = s.slice(entry.pattern.length + 1).trim();
      break;
    }
  }
  for (const entry of LEGAL_FORMS) {
    if (s.endsWith(" " + entry.pattern)) {
      if (!detectedLegalForm) {
        detectedLegalForm = entry.form;
      }
      s = s.slice(0, -(entry.pattern.length + 1)).trim();
      break;
    }
  }
  if (!detectedLegalForm) {
    for (const entry of LEGAL_FORMS) {
      if (s === entry.pattern) {
        detectedLegalForm = entry.form;
        break;
      }
    }
  }
  return {
    normalizedName: s,
    detectedLegalForm
  };
}
function extractDomain(input) {
  const trimmed = input.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      return url.hostname.replace(/^www\./i, "").toLowerCase();
    } catch {
      return null;
    }
  }
  if (!/\s/.test(trimmed) && trimmed.includes(".")) {
    const match = trimmed.match(/^([a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,})(?::\d+)?(?:\/.*)?$/i);
    if (match && match[1]) {
      return match[1].replace(/^www\./i, "").toLowerCase();
    }
  }
  return null;
}
function classifyQuery(raw, jurisdictionHint) {
  const trimmed = raw.trim();
  const cleanDigits = trimmed.replace(/[\s-]/g, "");
  const cleanAlphanum = trimmed.toUpperCase().replace(/[\s-]/g, "");
  const polishPrefix = /^(KRS|NIP|REGON)\s*:\s*([\d\s-]+)$/i.exec(trimmed);
  if (polishPrefix || jurisdictionHint?.toUpperCase() === "PL" && /^[\d\s-]+$/.test(trimmed)) {
    const match = polishPrefix ? { scheme: `PL_${polishPrefix[1].toUpperCase()}`, cleaned: polishPrefix[2].replace(/\D/g, ""), valid: true } : validateNationalId(trimmed, "PL");
    const explicitScheme = polishPrefix?.[1].toUpperCase();
    const validExplicit = !polishPrefix || (explicitScheme === "NIP" ? validateNationalId(match?.cleaned ?? "", "PL")?.scheme === "PL_NIP" : explicitScheme === "REGON" ? /^(\d{9}|\d{14})$/.test(match?.cleaned ?? "") : /^\d{10}$/.test(match?.cleaned ?? ""));
    if (match?.valid && validExplicit)
      return {
        raw,
        type: "NATIONAL_ID",
        scheme: match.scheme,
        cleanedValue: match.cleaned,
        normalizedName: match.cleaned,
        detectedLegalForm: null,
        inferredCountry: "PL"
      };
    if (polishPrefix)
      return { raw, type: "NAME", cleanedValue: trimmed, normalizedName: trimmed.toUpperCase(), detectedLegalForm: null, inferredCountry: "PL" };
  }
  const domain = extractDomain(trimmed);
  if (domain) {
    const domainLabel = domain.split(".")[0];
    const { normalizedName } = normalizeCompanyName(domainLabel);
    return {
      raw,
      type: "DOMAIN",
      cleanedValue: domain,
      normalizedName: normalizedName || domain.toUpperCase(),
      detectedLegalForm: null,
      inferredCountry: jurisdictionHint ? jurisdictionHint.toUpperCase() : null
    };
  }
  const cleanChe = trimmed.toUpperCase().replace(/[\s\-. ]/g, "");
  const cheMatch = cleanChe.match(/^CHE(\d{9})(?:HR|MWST|TVA|IVA)?$/);
  if (cheMatch) {
    const cleanVal = "CHE" + cheMatch[1];
    return {
      raw,
      type: "CH_UID",
      cleanedValue: cleanVal,
      normalizedName: cleanVal,
      detectedLegalForm: null,
      inferredCountry: "CH"
    };
  }
  const cleanId = cleanAlphanum;
  if (/^[0-9A-Z]{18}[0-9]{2}$/.test(cleanId)) {
    return {
      raw,
      type: "LEI",
      cleanedValue: cleanId,
      normalizedName: cleanId,
      detectedLegalForm: null,
      inferredCountry: jurisdictionHint ? jurisdictionHint.toUpperCase() : null
    };
  }
  const cleanVat = trimmed.toUpperCase().replace(/[\s\-. ]/g, "");
  const vatMatch = cleanVat.match(/^(AT|BE|BG|CY|CZ|DE|DK|EE|EL|ES|FI|FR|HR|HU|IE|IT|LT|LU|LV|MT|NL|PL|PT|RO|SE|SI|SK)([0-9A-Z]{8,12})$/);
  if (vatMatch) {
    const cc = vatMatch[1];
    return {
      raw,
      type: "EU_VAT",
      cleanedValue: cleanVat,
      normalizedName: cleanVat,
      detectedLegalForm: null,
      inferredCountry: cc
    };
  }
  const isSgHint = !jurisdictionHint || jurisdictionHint.toUpperCase() === "SG";
  if (isSgHint && /^(\d{8,9}[A-Z]|[TSR]\d{2}[A-Z0-9]{2}\d{4}[A-Z])$/.test(cleanAlphanum)) {
    return {
      raw,
      type: "SG_UEN",
      cleanedValue: cleanAlphanum,
      normalizedName: cleanAlphanum,
      detectedLegalForm: null,
      inferredCountry: "SG"
    };
  }
  const isGb = jurisdictionHint?.toUpperCase() === "GB" || jurisdictionHint?.toUpperCase() === "UK";
  const ukCrnPrefixes = new Set([
    "SC",
    "NI",
    "OC",
    "SO",
    "NC",
    "R0",
    "ZC",
    "FC",
    "GE",
    "LP",
    "SL",
    "NL",
    "NO",
    "NP",
    "SE",
    "FE",
    "NA",
    "SA",
    "IP",
    "SP",
    "IC",
    "SI",
    "NV",
    "PC",
    "CE"
  ]);
  const isLikelyUkPrefix = ukCrnPrefixes.has(cleanAlphanum.slice(0, 2));
  if (/^[A-Z]{2}\d{6}$/.test(cleanAlphanum)) {
    if (isGb || !jurisdictionHint && isLikelyUkPrefix) {
      return {
        raw,
        type: "UK_CRN",
        cleanedValue: cleanAlphanum,
        normalizedName: cleanAlphanum,
        detectedLegalForm: null,
        inferredCountry: "GB"
      };
    }
  }
  if (isGb && /^\d{7,8}$/.test(cleanDigits)) {
    const padded = cleanDigits.padStart(8, "0");
    return {
      raw,
      type: "UK_CRN",
      cleanedValue: padded,
      normalizedName: padded,
      detectedLegalForm: null,
      inferredCountry: "GB"
    };
  }
  const isAuHint = !jurisdictionHint || jurisdictionHint.toUpperCase() === "AU";
  if (isAuHint && /^\d{11}$/.test(cleanDigits)) {
    return {
      raw,
      type: "AU_ABN",
      cleanedValue: cleanDigits,
      normalizedName: cleanDigits,
      detectedLegalForm: null,
      inferredCountry: "AU"
    };
  }
  if (jurisdictionHint?.toUpperCase() === "AU" && /^\d{9}$/.test(cleanDigits)) {
    return {
      raw,
      type: "AU_ACN",
      cleanedValue: cleanDigits,
      normalizedName: cleanDigits,
      detectedLegalForm: null,
      inferredCountry: "AU"
    };
  }
  const einMatch = trimmed.match(/^(?:EIN\s*:?\s*)?(\d{2}-\d{7})$/i);
  if (einMatch) {
    const einValue = einMatch[1];
    return {
      raw,
      type: "US_EIN",
      cleanedValue: einValue,
      normalizedName: einValue,
      detectedLegalForm: null,
      inferredCountry: "US"
    };
  }
  const cikMatch = trimmed.match(/^CIK(\d{1,10})$/i);
  if (cikMatch) {
    const padded = cikMatch[1].padStart(10, "0");
    return {
      raw,
      type: "US_CIK",
      cleanedValue: padded,
      normalizedName: padded,
      detectedLegalForm: null,
      inferredCountry: "US"
    };
  }
  if (/^000\d{7}$/.test(trimmed)) {
    return {
      raw,
      type: "US_CIK",
      cleanedValue: trimmed,
      normalizedName: trimmed,
      detectedLegalForm: null,
      inferredCountry: "US"
    };
  }
  if (/^[1-3]\d{8}$/.test(cleanDigits)) {
    const isLtHint = !jurisdictionHint || jurisdictionHint.toUpperCase() === "LT";
    if (isLtHint) {
      return {
        raw,
        type: "LT_JAR",
        cleanedValue: cleanDigits,
        normalizedName: cleanDigits,
        detectedLegalForm: null,
        inferredCountry: "LT"
      };
    }
  }
  if (jurisdictionHint && (jurisdictionHint.toUpperCase() !== "PL" || /^[\d\s-]+$/.test(trimmed))) {
    const nationalMatch = validateNationalId(trimmed, jurisdictionHint);
    if (nationalMatch && nationalMatch.valid) {
      return {
        raw,
        type: "NATIONAL_ID",
        scheme: nationalMatch.scheme,
        cleanedValue: nationalMatch.cleaned,
        normalizedName: nationalMatch.cleaned,
        detectedLegalForm: null,
        inferredCountry: jurisdictionHint.toUpperCase()
      };
    }
  } else {
    if (/\d/.test(trimmed) && trimmed.length >= 6) {
      const detected = detectSchemes(trimmed);
      if (detected.length === 1) {
        const match = detected[0];
        return {
          raw,
          type: "NATIONAL_ID",
          scheme: match.scheme,
          cleanedValue: match.cleaned,
          normalizedName: match.cleaned,
          detectedLegalForm: null,
          inferredCountry: match.country
        };
      }
    }
  }
  const { normalizedName, detectedLegalForm } = normalizeCompanyName(raw);
  const inferredCountry = jurisdictionHint ? jurisdictionHint.toUpperCase() : detectedLegalForm && JURISDICTION_BY_LEGAL_FORM[detectedLegalForm] || null;
  return {
    raw,
    type: "NAME",
    cleanedValue: trimmed,
    normalizedName,
    detectedLegalForm,
    inferredCountry
  };
}
function extractTrigrams(str) {
  const trigrams = new Set;
  if (!str)
    return trigrams;
  const padded = "  " + str + " ";
  for (let i = 0;i <= padded.length - 3; i++) {
    trigrams.add(padded.slice(i, i + 3));
  }
  return trigrams;
}
function trigramSimilarity(a, b) {
  const normA = normalizeCompanyName(a).normalizedName;
  const normB = normalizeCompanyName(b).normalizedName;
  if (normA === normB) {
    return 1;
  }
  const setA = extractTrigrams(normA);
  const setB = extractTrigrams(normB);
  if (setA.size === 0 && setB.size === 0) {
    return 1;
  }
  if (setA.size === 0 || setB.size === 0) {
    return 0;
  }
  let intersectionSize = 0;
  for (const tri of setA) {
    if (setB.has(tri)) {
      intersectionSize++;
    }
  }
  const unionSize = setA.size + setB.size - intersectionSize;
  if (unionSize === 0) {
    return 0;
  }
  return intersectionSize / unionSize;
}
function wordTrigramSimilarity(a, b) {
  const fullSim = trigramSimilarity(a, b);
  const normA = normalizeCompanyName(a).normalizedName;
  const normB = normalizeCompanyName(b).normalizedName;
  if (!normA || !normB)
    return fullSim;
  const wordsA = normA.split(/\s+/).filter(Boolean);
  const wordsB = normB.split(/\s+/).filter(Boolean);
  if (wordsA.length === wordsB.length)
    return fullSim;
  const [shorterWords, longerWords] = wordsA.length < wordsB.length ? [wordsA, wordsB] : [wordsB, wordsA];
  const shorterJoined = shorterWords.join(" ");
  if (shorterJoined.length < 5)
    return fullSim;
  let maxWindowSim = fullSim;
  const winLen = shorterWords.length;
  for (let i = 0;i <= longerWords.length - winLen; i++) {
    const windowStr = longerWords.slice(i, i + winLen).join(" ");
    const sim = trigramSimilarity(shorterJoined, windowStr) * 0.92;
    if (sim > maxWindowSim)
      maxWindowSim = sim;
  }
  return maxWindowSim;
}

// ../../agentum-clean-release/agentum/src/domain/countries/catalog.ts
var ISO_ENTRIES = [
  ["AD", "Andorra", "Europe"],
  ["AE", "United Arab Emirates", "Asia"],
  ["AF", "Afghanistan", "Asia"],
  ["AG", "Antigua and Barbuda", "Americas"],
  ["AI", "Anguilla", "Americas"],
  ["AL", "Albania", "Europe"],
  ["AM", "Armenia", "Asia"],
  ["AO", "Angola", "Africa"],
  ["AQ", "Antarctica", "Polar"],
  ["AR", "Argentina", "Americas"],
  ["AS", "American Samoa", "Oceania"],
  ["AT", "Austria", "Europe"],
  ["AU", "Australia", "Oceania"],
  ["AW", "Aruba", "Americas"],
  ["AX", "\xC5land Islands", "Europe"],
  ["AZ", "Azerbaijan", "Asia"],
  ["BA", "Bosnia and Herzegovina", "Europe"],
  ["BB", "Barbados", "Americas"],
  ["BD", "Bangladesh", "Asia"],
  ["BE", "Belgium", "Europe"],
  ["BF", "Burkina Faso", "Africa"],
  ["BG", "Bulgaria", "Europe"],
  ["BH", "Bahrain", "Asia"],
  ["BI", "Burundi", "Africa"],
  ["BJ", "Benin", "Africa"],
  ["BL", "Saint Barth\xE9lemy", "Americas"],
  ["BM", "Bermuda", "Americas"],
  ["BN", "Brunei", "Asia"],
  ["BO", "Bolivia", "Americas"],
  ["BQ", "Bonaire, Sint Eustatius and Saba", "Americas"],
  ["BR", "Brazil", "Americas"],
  ["BS", "Bahamas", "Americas"],
  ["BT", "Bhutan", "Asia"],
  ["BV", "Bouvet Island", "Americas"],
  ["BW", "Botswana", "Africa"],
  ["BY", "Belarus", "Europe"],
  ["BZ", "Belize", "Americas"],
  ["CA", "Canada", "Americas"],
  ["CC", "Cocos (Keeling) Islands", "Oceania"],
  ["CD", "Democratic Republic of the Congo", "Africa"],
  ["CF", "Central African Republic", "Africa"],
  ["CG", "Republic of the Congo", "Africa"],
  ["CH", "Switzerland", "Europe"],
  ["CI", "C\xF4te d'Ivoire", "Africa"],
  ["CK", "Cook Islands", "Oceania"],
  ["CL", "Chile", "Americas"],
  ["CM", "Cameroon", "Africa"],
  ["CN", "China", "Asia"],
  ["CO", "Colombia", "Americas"],
  ["CR", "Costa Rica", "Americas"],
  ["CU", "Cuba", "Americas"],
  ["CV", "Cabo Verde", "Africa"],
  ["CW", "Cura\xE7ao", "Americas"],
  ["CX", "Christmas Island", "Oceania"],
  ["CY", "Cyprus", "Europe"],
  ["CZ", "Czechia", "Europe"],
  ["DE", "Germany", "Europe"],
  ["DJ", "Djibouti", "Africa"],
  ["DK", "Denmark", "Europe"],
  ["DM", "Dominica", "Americas"],
  ["DO", "Dominican Republic", "Americas"],
  ["DZ", "Algeria", "Africa"],
  ["EC", "Ecuador", "Americas"],
  ["EE", "Estonia", "Europe"],
  ["EG", "Egypt", "Africa"],
  ["EH", "Western Sahara", "Africa"],
  ["ER", "Eritrea", "Africa"],
  ["ES", "Spain", "Europe"],
  ["ET", "Ethiopia", "Africa"],
  ["FI", "Finland", "Europe"],
  ["FJ", "Fiji", "Oceania"],
  ["FK", "Falkland Islands", "Americas"],
  ["FM", "Micronesia", "Oceania"],
  ["FO", "Faroe Islands", "Europe"],
  ["FR", "France", "Europe"],
  ["GA", "Gabon", "Africa"],
  ["GB", "United Kingdom", "Europe"],
  ["GD", "Grenada", "Americas"],
  ["GE", "Georgia", "Asia"],
  ["GF", "French Guiana", "Americas"],
  ["GG", "Guernsey", "Europe"],
  ["GH", "Ghana", "Africa"],
  ["GI", "Gibraltar", "Europe"],
  ["GL", "Greenland", "Americas"],
  ["GM", "Gambia", "Africa"],
  ["GN", "Guinea", "Africa"],
  ["GP", "Guadeloupe", "Americas"],
  ["GQ", "Equatorial Guinea", "Africa"],
  ["GR", "Greece", "Europe"],
  ["GS", "South Georgia and South Sandwich Islands", "Americas"],
  ["GT", "Guatemala", "Americas"],
  ["GU", "Guam", "Oceania"],
  ["GW", "Guinea-Bissau", "Africa"],
  ["GY", "Guyana", "Americas"],
  ["HK", "Hong Kong", "Asia"],
  ["HM", "Heard Island and McDonald Islands", "Oceania"],
  ["HN", "Honduras", "Americas"],
  ["HR", "Croatia", "Europe"],
  ["HT", "Haiti", "Americas"],
  ["HU", "Hungary", "Europe"],
  ["ID", "Indonesia", "Asia"],
  ["IE", "Ireland", "Europe"],
  ["IL", "Israel", "Asia"],
  ["IM", "Isle of Man", "Europe"],
  ["IN", "India", "Asia"],
  ["IO", "British Indian Ocean Territory", "Africa"],
  ["IQ", "Iraq", "Asia"],
  ["IR", "Iran", "Asia"],
  ["IS", "Iceland", "Europe"],
  ["IT", "Italy", "Europe"],
  ["JE", "Jersey", "Europe"],
  ["JM", "Jamaica", "Americas"],
  ["JO", "Jordan", "Asia"],
  ["JP", "Japan", "Asia"],
  ["KE", "Kenya", "Africa"],
  ["KG", "Kyrgyzstan", "Asia"],
  ["KH", "Cambodia", "Asia"],
  ["KI", "Kiribati", "Oceania"],
  ["KM", "Comoros", "Africa"],
  ["KN", "Saint Kitts and Nevis", "Americas"],
  ["KP", "North Korea", "Asia"],
  ["KR", "South Korea", "Asia"],
  ["KW", "Kuwait", "Asia"],
  ["KY", "Cayman Islands", "Americas"],
  ["KZ", "Kazakhstan", "Asia"],
  ["LA", "Laos", "Asia"],
  ["LB", "Lebanon", "Asia"],
  ["LC", "Saint Lucia", "Americas"],
  ["LI", "Liechtenstein", "Europe"],
  ["LK", "Sri Lanka", "Asia"],
  ["LR", "Liberia", "Africa"],
  ["LS", "Lesotho", "Africa"],
  ["LT", "Lithuania", "Europe"],
  ["LU", "Luxembourg", "Europe"],
  ["LV", "Latvia", "Europe"],
  ["LY", "Libya", "Africa"],
  ["MA", "Morocco", "Africa"],
  ["MC", "Monaco", "Europe"],
  ["MD", "Moldova", "Europe"],
  ["ME", "Montenegro", "Europe"],
  ["MF", "Saint Martin", "Americas"],
  ["MG", "Madagascar", "Africa"],
  ["MH", "Marshall Islands", "Oceania"],
  ["MK", "North Macedonia", "Europe"],
  ["ML", "Mali", "Africa"],
  ["MM", "Myanmar", "Asia"],
  ["MN", "Mongolia", "Asia"],
  ["MO", "Macao", "Asia"],
  ["MP", "Northern Mariana Islands", "Oceania"],
  ["MQ", "Martinique", "Americas"],
  ["MR", "Mauritania", "Africa"],
  ["MS", "Montserrat", "Americas"],
  ["MT", "Malta", "Europe"],
  ["MU", "Mauritius", "Africa"],
  ["MV", "Maldives", "Asia"],
  ["MW", "Malawi", "Africa"],
  ["MX", "Mexico", "Americas"],
  ["MY", "Malaysia", "Asia"],
  ["MZ", "Mozambique", "Africa"],
  ["NA", "Namibia", "Africa"],
  ["NC", "New Caledonia", "Oceania"],
  ["NE", "Niger", "Africa"],
  ["NF", "Norfolk Island", "Oceania"],
  ["NG", "Nigeria", "Africa"],
  ["NI", "Nicaragua", "Americas"],
  ["NL", "Netherlands", "Europe"],
  ["NO", "Norway", "Europe"],
  ["NP", "Nepal", "Asia"],
  ["NR", "Nauru", "Oceania"],
  ["NU", "Niue", "Oceania"],
  ["NZ", "New Zealand", "Oceania"],
  ["OM", "Oman", "Asia"],
  ["PA", "Panama", "Americas"],
  ["PE", "Peru", "Americas"],
  ["PF", "French Polynesia", "Oceania"],
  ["PG", "Papua New Guinea", "Oceania"],
  ["PH", "Philippines", "Asia"],
  ["PK", "Pakistan", "Asia"],
  ["PL", "Poland", "Europe"],
  ["PM", "Saint Pierre and Miquelon", "Americas"],
  ["PN", "Pitcairn", "Oceania"],
  ["PR", "Puerto Rico", "Americas"],
  ["PS", "Palestine", "Asia"],
  ["PT", "Portugal", "Europe"],
  ["PW", "Palau", "Oceania"],
  ["PY", "Paraguay", "Americas"],
  ["QA", "Qatar", "Asia"],
  ["RE", "R\xE9union", "Africa"],
  ["RO", "Romania", "Europe"],
  ["RS", "Serbia", "Europe"],
  ["RU", "Russia", "Europe"],
  ["RW", "Rwanda", "Africa"],
  ["SA", "Saudi Arabia", "Asia"],
  ["SB", "Solomon Islands", "Oceania"],
  ["SC", "Seychelles", "Africa"],
  ["SD", "Sudan", "Africa"],
  ["SE", "Sweden", "Europe"],
  ["SG", "Singapore", "Asia"],
  ["SH", "Saint Helena", "Africa"],
  ["SI", "Slovenia", "Europe"],
  ["SJ", "Svalbard and Jan Mayen", "Europe"],
  ["SK", "Slovakia", "Europe"],
  ["SL", "Sierra Leone", "Africa"],
  ["SM", "San Marino", "Europe"],
  ["SN", "Senegal", "Africa"],
  ["SO", "Somalia", "Africa"],
  ["SR", "Suriname", "Americas"],
  ["SS", "South Sudan", "Africa"],
  ["ST", "Sao Tome and Principe", "Africa"],
  ["SV", "El Salvador", "Americas"],
  ["SX", "Sint Maarten", "Americas"],
  ["SY", "Syria", "Asia"],
  ["SZ", "Eswatini", "Africa"],
  ["TC", "Turks and Caicos Islands", "Americas"],
  ["TD", "Chad", "Africa"],
  ["TF", "French Southern Territories", "Polar"],
  ["TG", "Togo", "Africa"],
  ["TH", "Thailand", "Asia"],
  ["TJ", "Tajikistan", "Asia"],
  ["TK", "Tokelau", "Oceania"],
  ["TL", "Timor-Leste", "Asia"],
  ["TM", "Turkmenistan", "Asia"],
  ["TN", "Tunisia", "Africa"],
  ["TO", "Tonga", "Oceania"],
  ["TR", "Turkey", "Asia"],
  ["TT", "Trinidad and Tobago", "Americas"],
  ["TV", "Tuvalu", "Oceania"],
  ["TW", "Taiwan", "Asia"],
  ["TZ", "Tanzania", "Africa"],
  ["UA", "Ukraine", "Europe"],
  ["UG", "Uganda", "Africa"],
  ["UM", "United States Minor Outlying Islands", "Americas"],
  ["US", "United States", "Americas"],
  ["UY", "Uruguay", "Americas"],
  ["UZ", "Uzbekistan", "Asia"],
  ["VA", "Vatican City", "Europe"],
  ["VC", "Saint Vincent and the Grenadines", "Americas"],
  ["VE", "Venezuela", "Americas"],
  ["VG", "British Virgin Islands", "Americas"],
  ["VI", "U.S. Virgin Islands", "Americas"],
  ["VN", "Vietnam", "Asia"],
  ["VU", "Vanuatu", "Oceania"],
  ["WF", "Wallis and Futuna", "Oceania"],
  ["WS", "Samoa", "Oceania"],
  ["YE", "Yemen", "Asia"],
  ["YT", "Mayotte", "Africa"],
  ["ZA", "South Africa", "Africa"],
  ["ZM", "Zambia", "Africa"],
  ["ZW", "Zimbabwe", "Africa"]
];
var OVERLAY_PROFILES = {
  GB: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["UK_CRN", "GB_VAT"],
    legalForms: ["Ltd", "Limited", "PLC", "LLP"],
    sources: [
      {
        id: "uk_companies_house",
        kind: "LIVE_API",
        access: "FREE_REGISTRATION",
        envKey: "COMPANIES_HOUSE_API_KEY",
        cacheTtlSeconds: 86400,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  CH: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["CH_UID"],
    legalForms: ["AG", "SA", "GmbH", "Sarl"],
    sources: [
      {
        id: "ch_zefix",
        kind: "LIVE_API",
        access: "FREE",
        cacheTtlSeconds: 86400,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  AU: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["AU_ABN", "AU_ACN"],
    legalForms: ["Pty Ltd", "Ltd", "Proprietary Limited"],
    sources: [
      {
        id: "au_abr",
        kind: "LIVE_API",
        access: "FREE_REGISTRATION",
        envKey: "ABR_GUID",
        cacheTtlSeconds: 86400,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  SG: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["SG_UEN"],
    legalForms: ["Pte. Ltd.", "Ltd.", "LLP"],
    sources: [
      {
        id: "sg_acra",
        kind: "LIVE_API",
        access: "FREE",
        cacheTtlSeconds: 86400,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  US: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["US_CIK", "US_EIN"],
    legalForms: ["Inc.", "LLC", "Corp.", "Corporation"],
    sources: [
      {
        id: "us_sec_edgar",
        kind: "LIVE_API",
        access: "FREE",
        cacheTtlSeconds: 86400,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  LT: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["LT_JAR", "LT_VAT"],
    legalForms: ["UAB", "AB", "V\u0161\u012E", "MB"],
    sources: [
      {
        id: "lt_jar",
        kind: "LIVE_API",
        access: "FREE",
        cacheTtlSeconds: 86400,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  FR: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["FR_SIREN", "FR_SIRET", "FR_VAT"],
    legalForms: ["SAS", "SARL", "SA", "SASU", "EURL"],
    sources: [
      {
        id: "fr_recherche_entreprises",
        kind: "LIVE_API",
        access: "FREE",
        cacheTtlSeconds: 86400 * 7,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  PL: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["PL_NIP", "PL_REGON", "PL_KRS"],
    legalForms: ["Sp. z o.o.", "S.A.", "Sp. k."],
    sources: [
      {
        id: "pl_krs",
        kind: "LIVE_API",
        access: "FREE",
        cacheTtlSeconds: 86400,
        resaleAllowed: true,
        costPerCallUsd: 0,
        operations: ["ENTITY_ID_LOOKUP"]
      },
      {
        id: "pl_mf_whitelist",
        operations: ["BANK_ACCOUNT_OWNERSHIP"],
        kind: "TAX_AUTHORITY",
        access: "FREE",
        cacheTtlSeconds: 86400,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  LV: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["LV_REGCODE"],
    legalForms: ["SIA", "AS"],
    sources: [{
      id: "lv_ur",
      kind: "LIVE_API",
      access: "FREE",
      cacheTtlSeconds: 86400,
      resaleAllowed: true,
      costPerCallUsd: 0,
      operations: ["ENTITY_ID_LOOKUP", "ENTITY_NAME_SEARCH"]
    }]
  },
  CZ: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["CZ_ICO"],
    legalForms: ["s.r.o.", "a.s.", "v.o.s."],
    sources: [
      {
        id: "cz_ares",
        kind: "LIVE_API",
        access: "FREE",
        cacheTtlSeconds: 86400 * 7,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  NO: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["NO_ORGNR"],
    legalForms: ["AS", "ASA", "ENK"],
    sources: [
      {
        id: "no_brreg",
        kind: "LIVE_API",
        access: "FREE",
        cacheTtlSeconds: 86400 * 7,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  FI: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["FI_YTUNNUS"],
    legalForms: ["Oy", "Oyj", "Ky"],
    sources: [
      {
        id: "fi_prh_ytj",
        kind: "LIVE_API",
        access: "FREE",
        cacheTtlSeconds: 86400 * 7,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  EE: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["EE_REGCODE"],
    legalForms: ["O\xDC", "AS", "T\xDC"],
    sources: [
      {
        id: "ee_ariregister",
        kind: "BULK",
        access: "FREE",
        cacheTtlSeconds: 86400,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  BE: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["BE_KBO"],
    legalForms: ["BV", "NV", "SRL", "SA"],
    sources: [
      {
        id: "be_kbo",
        kind: "BULK",
        access: "FREE",
        cacheTtlSeconds: 86400 * 7,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  NZ: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["NZ_NZBN"],
    legalForms: ["Limited", "Ltd"],
    sources: [
      {
        id: "nz_nzbn",
        kind: "LIVE_API",
        access: "FREE_REGISTRATION",
        envKey: "NZBN_API_KEY",
        cacheTtlSeconds: 86400 * 7,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  BR: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["BR_CNPJ"],
    legalForms: ["Ltda", "S.A.", "ME", "EPP"],
    sources: [
      {
        id: "br_cnpj",
        kind: "LIVE_API",
        access: "FREE",
        cacheTtlSeconds: 86400 * 7,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  CA: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["CA_BN"],
    legalForms: ["Inc.", "Corp.", "Ltd.", "ULC"],
    sources: [
      {
        id: "ca_corp",
        implemented: false,
        kind: "LIVE_API",
        access: "FREE",
        cacheTtlSeconds: 86400 * 7,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  },
  JP: {
    coverage: "L2_VERIFIED",
    wave: 1,
    idSchemes: ["JP_CN"],
    legalForms: ["\u682A\u5F0F\u4F1A\u793E", "\u5408\u540C\u4F1A\u793E", "\u6709\u9650\u4F1A\u793E", "K.K."],
    sources: [
      {
        id: "jp_nta",
        kind: "LIVE_API",
        access: "FREE_REGISTRATION",
        envKey: "JP_NTA_APP_ID",
        cacheTtlSeconds: 86400 * 7,
        resaleAllowed: true,
        costPerCallUsd: 0
      }
    ]
  }
};
var COUNTRY_MAP = new Map;
var SCHEMES_BY_COUNTRY = new Map;
for (const s of NATIONAL_ID_SCHEMES) {
  const list = SCHEMES_BY_COUNTRY.get(s.country) || [];
  if (!list.includes(s.scheme)) {
    list.push(s.scheme);
  }
  SCHEMES_BY_COUNTRY.set(s.country, list);
}
for (const [iso2, name, region] of ISO_ENTRIES) {
  const overlay = OVERLAY_PROFILES[iso2] || {};
  const regSchemes = SCHEMES_BY_COUNTRY.get(iso2) || [];
  const combinedSchemes = Array.from(new Set([...overlay.idSchemes ?? [], ...regSchemes]));
  let coverage = overlay.coverage ?? "L0_SCREENED";
  if (coverage === "L0_SCREENED" && combinedSchemes.length > 0) {
    coverage = "L1_VALIDATED";
  }
  COUNTRY_MAP.set(iso2, {
    iso2,
    name,
    region,
    coverage,
    wave: overlay.wave ?? null,
    idSchemes: combinedSchemes,
    legalForms: overlay.legalForms ?? [],
    sources: overlay.sources ?? []
  });
}
function getCountryProfile(code, env = process.env) {
  const iso2 = normalizeCountryCode(code);
  const found = COUNTRY_MAP.get(iso2);
  if (found) {
    return withAvailableSources(found, env);
  }
  return {
    iso2: iso2 || "XX",
    name: "Unknown",
    region: "Unknown",
    coverage: "L0_SCREENED",
    wave: null,
    idSchemes: [],
    legalForms: [],
    sources: []
  };
}
function withAvailableSources(profile, env) {
  const sources = profile.sources.filter((source) => source.kind !== "BULK" && source.implemented !== false && (!source.envKey || Boolean(env[source.envKey]?.trim())));
  return {
    ...profile,
    sources,
    coverage: profile.coverage === "L2_VERIFIED" && profile.sources.length > 0 && sources.length === 0 ? profile.idSchemes.length > 0 ? "L1_VALIDATED" : "L0_SCREENED" : profile.coverage
  };
}
function listCoverage(env = process.env) {
  return Array.from(COUNTRY_MAP.values(), (profile) => withAvailableSources(profile, env));
}

// ../../agentum-clean-release/agentum/src/ports/outbound/upstream-provider.port.ts
class UpstreamProviderError extends Error {
  reason;
  httpStatus;
  retryAfterSeconds;
  constructor(reason, httpStatus, retryAfterSeconds) {
    super(reason);
    this.reason = reason;
    this.httpStatus = httpStatus;
    this.retryAfterSeconds = retryAfterSeconds;
    this.name = "UpstreamProviderError";
  }
}

// ../../agentum-clean-release/agentum/src/application/source-router.ts
class SourceRouter {
  free;
  paid;
  timeoutMs;
  inFlight = new Map;
  constructor(deps) {
    this.free = deps.free;
    this.paid = deps.paid;
    this.timeoutMs = deps.timeoutMs ?? 2500;
  }
  async resolve(query, opts = {}) {
    const sourcesTried = [];
    const supportedFree = this.free.filter((p) => p.supports(query, opts.jurisdiction));
    const freePromises = supportedFree.map(async (provider) => {
      const start = Date.now();
      try {
        const key = JSON.stringify([provider.sourceName, query, opts.jurisdiction]);
        let pending = this.inFlight.get(key);
        if (!pending) {
          pending = provider.search(query, {
            jurisdiction: opts.jurisdiction,
            timeoutMs: this.timeoutMs
          });
          if (this.inFlight.size < 128) {
            this.inFlight.set(key, pending);
            const finish = () => {
              if (this.inFlight.get(key) === pending)
                this.inFlight.delete(key);
            };
            pending.then(finish, finish);
          }
        }
        const records = (await pending).map((record) => structuredClone(record));
        const elapsed = Date.now() - start;
        const status = records.length > 0 ? "HIT" : "MISS";
        sourcesTried.push({
          source: provider.sourceName,
          tier: "FREE",
          status,
          ms: elapsed
        });
        return records;
      } catch (error) {
        const elapsed = Date.now() - start;
        sourcesTried.push({
          source: provider.sourceName,
          tier: "FREE",
          status: "ERROR",
          ms: elapsed,
          ...error instanceof UpstreamProviderError ? {
            reason: error.reason,
            httpStatus: error.httpStatus,
            retryAfterSeconds: error.retryAfterSeconds
          } : { reason: "UNAVAILABLE" }
        });
        return [];
      }
    });
    const settled = await Promise.allSettled(freePromises);
    const freeRecords = [];
    for (const res of settled) {
      if (res.status === "fulfilled" && res.value.length > 0) {
        freeRecords.push(...res.value);
      }
    }
    if (freeRecords.length > 0) {
      return {
        records: freeRecords,
        sourcesTried,
        costUsd: 0
      };
    }
    if (opts.allowPaidSources && this.paid && this.paid.supports(query, opts.jurisdiction)) {
      const start = Date.now();
      try {
        const records = await this.paid.search(query, {
          jurisdiction: opts.jurisdiction,
          timeoutMs: this.timeoutMs
        });
        const elapsed = Date.now() - start;
        const hit = records.length > 0;
        sourcesTried.push({
          source: this.paid.sourceName,
          tier: "PAID",
          status: hit ? "HIT" : "MISS",
          ms: elapsed
        });
        return {
          records,
          sourcesTried,
          costUsd: hit ? this.paid.costPerCallUsd : 0
        };
      } catch {
        const elapsed = Date.now() - start;
        sourcesTried.push({
          source: this.paid.sourceName,
          tier: "PAID",
          status: "ERROR",
          ms: elapsed
        });
      }
    }
    return {
      records: [],
      sourcesTried,
      costUsd: 0
    };
  }
}

// ../../../../Projects/agentum/node_modules/zod/v4/core/util.js
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function joinValues(array, separator = "|") {
  return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}

class Cached {
  constructor(getter) {
    this._getter = getter;
    this._value = undefined;
  }
  get value() {
    const getter = this._getter;
    if (getter !== undefined) {
      this._value = getter();
      this._getter = undefined;
    }
    return this._value;
  }
}
function cached(getter) {
  return new Cached(getter);
}
function nullish(input) {
  return input === null || input === undefined;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
  const ratio = val / step;
  const roundedRatio = Math.round(ratio);
  const tolerance = 4 * Number.EPSILON * Math.max(Math.abs(ratio), 1);
  if (Math.abs(ratio - roundedRatio) < tolerance)
    return 0;
  return ratio - roundedRatio;
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function rawShape(def) {
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  return desc?.get ? desc.get.raw : desc?.value;
}
function sourceShape(schema) {
  return rawShape(schema._zod.def) ?? schema._zod.def.shape;
}
function deferProp(target, key, getter) {
  Object.defineProperty(target, key, {
    get() {
      const value = getter();
      assignProp(this, key, value);
      return value;
    },
    enumerable: true,
    configurable: true
  });
}
function putProp(target, key, value) {
  if (key in target)
    assignProp(target, key, value);
  else
    target[key] = value;
}
function mirrorShape(target, source, keys, wrap) {
  const raw = sourceShape(source);
  for (const key of keys) {
    const desc = Object.getOwnPropertyDescriptor(raw, key);
    if (!desc.enumerable)
      continue;
    if (desc.get) {
      deferProp(target, key, () => {
        const value = source._zod.def.shape[key];
        return wrap ? wrap(value, key) : value;
      });
    } else
      putProp(target, key, wrap ? wrap(desc.value, key) : desc.value);
  }
}
function mirrorProps(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    const desc = Object.getOwnPropertyDescriptor(source, key);
    if (!desc.enumerable)
      continue;
    if (desc.get)
      deferProp(target, key, () => source[key]);
    else
      putProp(target, key, desc.value);
  }
}
function mergeDefs(...defs) {
  const mergedDescriptors = {};
  for (const def of defs) {
    const descriptors = Object.getOwnPropertyDescriptors(def);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = /* @__PURE__ */ cached(() => {
  if (globalConfig.jitless) {
    return false;
  }
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === undefined)
    return true;
  if (typeof ctor !== "function")
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function shallowClone(o) {
  if (isPlainObject(o))
    return { ...o };
  if (Array.isArray(o))
    return [...o];
  if (o instanceof Map)
    return new Map(o);
  if (o instanceof Set)
    return new Set(o);
  return o;
}
var propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== undefined) {
    if (params?.error !== undefined)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint")
    return value.toString() + "n";
  if (typeof value === "string")
    return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin !== undefined && shape[k]._zod.optout === "optional";
  });
}
var NUMBER_FORMAT_RANGES = /* @__PURE__ */ (() => ({
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-340282346638528860000000000000000000000, 340282346638528860000000000000000000000],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}))();
var BIGINT_FORMAT_RANGES = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  }
  const newShape = {};
  mirrorShape(newShape, schema, maskedKeys(schema, mask));
  return clone(schema, mergeDefs(currDef, { shape: newShape, checks: [] }));
}
function maskedKeys(schema, mask) {
  const raw = sourceShape(schema);
  const keys = [];
  for (const key of Reflect.ownKeys(mask)) {
    if (!Object.getOwnPropertyDescriptor(raw, key)?.enumerable) {
      throw new Error(`Unrecognized key: "${String(key)}"`);
    }
    if (mask[key])
      keys.push(key);
  }
  return keys;
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  }
  const omitted = new Set(maskedKeys(schema, mask));
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key) => !omitted.has(key)));
  return clone(schema, mergeDefs(currDef, { shape: newShape, checks: [] }));
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const checks = schema._zod.def.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    const existingShape = sourceShape(schema);
    for (const key of Reflect.ownKeys(shape)) {
      if (Object.getOwnPropertyDescriptor(existingShape, key) !== undefined) {
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
      }
    }
  }
  return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function extended(schema, shape) {
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)));
  mirrorProps(newShape, shape);
  return newShape;
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to safeExtend: expected a plain object");
  }
  return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function merge(a, b) {
  if (!b?._zod?.def) {
    throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
  }
  if (a._zod.def.checks?.length) {
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  }
  const newShape = {};
  mirrorShape(newShape, a, Reflect.ownKeys(sourceShape(a)));
  mirrorShape(newShape, b, Reflect.ownKeys(sourceShape(b)));
  const def = mergeDefs(a._zod.def, {
    shape: newShape,
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: b._zod.def.checks ?? []
  });
  return clone(a, def);
}
function partial(Class, schema, mask, name = "partial") {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(`.${name}() cannot be used on object schemas containing refinements`);
  }
  const selected = mask ? new Set(maskedKeys(schema, mask)) : undefined;
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class && ((value, key) => selected && !selected.has(key) ? value : new Class({ type: "optional", innerType: value })));
  return clone(schema, mergeDefs(schema._zod.def, { shape: newShape, checks: [] }));
}
function required(Class, schema, mask) {
  const selected = mask ? new Set(maskedKeys(schema, mask)) : undefined;
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value, key) => selected && !selected.has(key) ? value : new Class({ type: "nonoptional", innerType: value }));
  return clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
}
function aborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex;i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true) {
      return true;
    }
  }
  return false;
}
function explicitlyAborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex;i < x.issues.length; i++) {
    if (x.issues[i]?.continue === false) {
      return true;
    }
  }
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a;
    (_a = iss).path ?? (_a.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function sizeCaps(defChecks) {
  const caps = [];
  for (const ch of defChecks ?? []) {
    const d = ch._zod.def;
    if (!/_(length|size)$|_equals$/.test(d.check))
      break;
    const max = d.maximum ?? d.length ?? d.size;
    if (max >= 0)
      caps.push([max, ch]);
  }
  return caps;
}
function attachSchema(issues, start, inst) {
  var _a;
  for (let i = start;i < issues.length; i++) {
    (_a = issues[i]).schema ?? (_a.schema = inst);
  }
}
function finalizeIssue(iss, ctx, config) {
  var _a;
  const traits = iss.inst?._zod?.traits;
  if (traits?.has("$ZodType")) {
    if (traits.has("$ZodCheck"))
      (_a = iss).schema ?? (_a.schema = iss.inst);
    else
      iss.schema = iss.inst;
  }
  const schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : undefined;
  const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(schemaError?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
  const full = {};
  for (const k of Object.keys(iss)) {
    if (k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__")
      continue;
    full[k] = iss[k];
  }
  full.path ?? (full.path = []);
  full.message = message;
  if (ctx?.reportInput) {
    full.input = iss.input;
  }
  return full;
}
var highSurrogate = /[\uD800-\uDBFF]/;
function codePointLength(str) {
  const units = str.length;
  if (!highSurrogate.test(str))
    return units;
  let count = units;
  for (let i = 0;i < units - 1; i++) {
    if ((str.charCodeAt(i) & 64512) === 55296 && (str.charCodeAt(i + 1) & 64512) === 56320) {
      count--;
      i++;
    }
  }
  return count;
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function parsedType(data) {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "nan" : "number";
    }
    case "object": {
      if (data === null) {
        return "null";
      }
      if (Array.isArray(data)) {
        return "array";
      }
      const obj = data;
      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
        return obj.constructor.name;
      }
    }
  }
  return t;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
function members(proto, table) {
  for (const key in table) {
    const desc = Object.getOwnPropertyDescriptor(table, key);
    if (desc.get)
      Object.defineProperty(proto, key, { ...desc, enumerable: false });
    else
      defineBound(proto, key, desc.value);
  }
}
function own(inst, key, value, enumerable = true) {
  Object.defineProperty(inst, key, { configurable: true, writable: true, enumerable, value });
  return value;
}
function hide(inst, key, value) {
  return own(inst, key, value, false);
}
function derived(computes, table) {
  for (const key in computes) {
    const compute = computes[key];
    Object.defineProperty(table, key, {
      configurable: true,
      enumerable: true,
      get() {
        return own(this, key, compute(this));
      },
      set(value) {
        own(this, key, value);
      }
    });
  }
  return table;
}
function defineBound(proto, key, fn) {
  Object.defineProperty(proto, key, {
    configurable: true,
    get() {
      return this == null ? fn : own(this, key, fn.bind(this));
    },
    set(value) {
      own(this, key, value);
    }
  });
}
function claim(inst, sentinel) {
  const proto = Object.getPrototypeOf(inst);
  return sentinel in proto ? undefined : proto;
}
var installing;
var broke = false;
var breaker = {
  configurable: true,
  get() {
    broke = true;
    return;
  }
};
function defineLazyInternal(inst, key, compute) {
  const proto = Object.getPrototypeOf(inst._zod);
  if (key in proto && installing !== inst._zod) {
    installing = undefined;
    return;
  }
  installing = inst._zod;
  Object.defineProperty(proto, key, {
    configurable: true,
    get() {
      Object.defineProperty(this, key, breaker);
      const outer = broke;
      broke = false;
      try {
        const value = compute(this);
        if (broke)
          delete this[key];
        else
          Object.defineProperty(this, key, { configurable: true, writable: true, value });
        broke = broke || outer;
        return value;
      } catch (err) {
        delete this[key];
        broke = broke || outer;
        throw err;
      }
    },
    set(value) {
      Object.defineProperty(this, key, { configurable: true, writable: true, value });
    }
  });
}
function installLazyProp(inst, key, make, enumerable) {
  const proto = claim(inst, key);
  if (!proto)
    return;
  Object.defineProperty(proto, key, {
    configurable: true,
    get() {
      const desc = { configurable: true, writable: true, enumerable, value: undefined };
      Object.defineProperty(this, key, desc);
      desc.value = make(this);
      Object.defineProperty(this, key, desc);
      return desc.value;
    },
    set(value) {
      Object.defineProperty(this, key, { configurable: true, writable: true, enumerable, value });
    }
  });
}
var CONSTANT_CATCH = "~constantCatch";
function constantCatch(value) {
  const fn = () => value;
  fn[CONSTANT_CATCH] = true;
  return fn;
}

// ../../../../Projects/agentum/node_modules/zod/v4/core/core.js
var _a;
var _zodDesc = { value: undefined, enumerable: false };
var _E = "captureStackTrace" in Error ? Error : null;
function newError(Definition) {
  const E = _E;
  if (E) {
    const saved = E.stackTraceLimit;
    if (typeof saved === "number") {
      try {
        E.stackTraceLimit = 0;
      } catch {
        _E = null;
        return new Definition;
      }
      try {
        return new Definition;
      } finally {
        E.stackTraceLimit = saved;
      }
    }
  }
  return new Definition;
}
function $constructor(name, initializer, proto, params) {
  const zodProto = {};
  function Internals(def) {
    this.def = def;
    this.constr = _;
    this.traits = new Set;
  }
  Internals.prototype = zodProto;
  const protoMembers = proto;
  const initialized = protoMembers && new WeakSet;
  function init(inst, def) {
    if (!inst._zod) {
      _zodDesc.value = new Internals(def);
      try {
        Object.defineProperty(inst, "_zod", _zodDesc);
      } finally {
        _zodDesc.value = undefined;
      }
    } else if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer(inst, def);
    if (initialized) {
      const own = Object.getPrototypeOf(inst);
      const ctorProto = inst._zod.constr.prototype;
      let up = own;
      while (up && up !== ctorProto)
        up = Object.getPrototypeOf(up);
      const target = up ?? own;
      if (!initialized.has(target)) {
        initialized.add(target);
        members(target, protoMembers);
      }
    }
    const proto = _.prototype;
    for (const k in proto) {
      if (!Object.prototype.hasOwnProperty.call(proto, k))
        continue;
      if (!(k in inst)) {
        inst[k] = proto[k].bind(inst);
      }
    }
  }
  const Parent = params?.Parent ?? Object;

  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    const inst = params?.Parent ? newError(Definition) : this;
    init(inst, def);
    const deferred = inst._zod.deferred;
    if (deferred) {
      for (const fn of deferred) {
        fn();
      }
      inst._zod.deferred = undefined;
    }
    const pp = globalThis.__zod_globalConfig?.postProcessor;
    if (pp)
      pp(inst);
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
class $ZodAsyncError extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
}

class $ZodEncodeError extends Error {
  constructor(name) {
    super(`Encountered unidirectional transform during encode: ${name}`);
    this.name = "ZodEncodeError";
  }
}
(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
var globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}
// ../../../../Projects/agentum/node_modules/zod/v4/core/errors.js
function _getMessage() {
  const internals = this._zod;
  internals.message ?? (internals.message = JSON.stringify(internals.def, jsonStringifyReplacer, 2));
  return internals.message;
}
function _setMessage(value) {
  this._zod.message = value;
}
var _messageDesc = {
  get: _getMessage,
  set: _setMessage,
  enumerable: true,
  configurable: true
};
var _issuesDesc = { value: undefined, enumerable: false };
var _installedToString = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
var initializer = (inst, def) => {
  inst.name = "$ZodError";
  _issuesDesc.value = def;
  Object.defineProperty(inst, "issues", _issuesDesc);
  _issuesDesc.value = undefined;
  Object.defineProperty(inst, "message", _messageDesc);
  const proto = Object.getPrototypeOf(inst);
  if (!_installedToString.has(proto)) {
    _installedToString.add(proto);
    Object.defineProperty(proto, "toString", {
      configurable: true,
      enumerable: false,
      get() {
        const value = () => this.message;
        Object.defineProperty(this, "toString", { value, configurable: true, writable: true });
        return value;
      },
      set(value) {
        Object.defineProperty(this, "toString", { value, configurable: true, writable: true });
      }
    });
  }
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, undefined, {
  Parent: Error
});
function node(obj, key, make) {
  if (!Object.prototype.hasOwnProperty.call(obj, key)) {
    if (key === "__proto__") {
      Object.defineProperty(obj, key, { value: make(), writable: true, enumerable: true, configurable: true });
    } else {
      obj[key] = make();
    }
  }
  return obj[key];
}
function flattenError(error, mapper = (issue) => issue.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error.issues) {
    if (sub.path.length > 0) {
      node(fieldErrors, sub.path[0], () => []).push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error, mapper = (issue) => issue.message) {
  const fieldErrors = { _errors: [] };
  const processError = (error, path = []) => {
    for (const issue of error.issues) {
      if (issue.code === "invalid_union" && issue.errors.length) {
        issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
      } else if (issue.code === "invalid_key") {
        processError({ issues: issue.issues }, [...path, ...issue.path]);
      } else if (issue.code === "invalid_element") {
        processError({ issues: issue.issues }, [...path, ...issue.path]);
      } else {
        const fullpath = [...path, ...issue.path];
        if (fullpath.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < fullpath.length) {
            const el = fullpath[i];
            const terminal = i === fullpath.length - 1;
            if (el === "_errors") {
              if (terminal)
                curr._errors.push(mapper(issue));
              i++;
              continue;
            }
            if (!Object.prototype.hasOwnProperty.call(curr, el)) {
              Object.defineProperty(curr, el, {
                value: { _errors: [] },
                enumerable: true,
                writable: true,
                configurable: true
              });
            }
            const node = curr[el];
            if (terminal) {
              node._errors.push(mapper(issue));
            }
            curr = node;
            i++;
          }
        }
      }
    }
  };
  processError(error);
  return fieldErrors;
}

// ../../../../Projects/agentum/node_modules/zod/v4/core/parse.js
function finalizeParams(callee, params) {
  return { callee: params?.callee ?? callee, Err: params?.Err };
}
var _parse = (_Err) => {
  const fn = (schema, value, _ctx, _params) => {
    const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
    const result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise) {
      throw new $ZodAsyncError;
    }
    if (result.issues.length) {
      const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
      captureStackTrace(e, _params?.callee ?? fn);
      throw e;
    }
    return result.value;
  };
  return fn;
};
var _parseAsync = (_Err) => {
  const fn = async (schema, value, _ctx, params) => {
    const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
      result = await result;
    if (result.issues.length) {
      const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
      captureStackTrace(e, params?.callee ?? fn);
      throw e;
    }
    return result.value;
  };
  return fn;
};
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  return result.issues.length ? failure(_Err, result.issues, ctx) : { success: true, data: result.value };
};
function failure(Err, issues, ctx) {
  let error;
  return {
    success: false,
    get error() {
      if (!error) {
        error = new Err(issues.map((iss) => finalizeIssue(iss, ctx, config())));
        issues = undefined;
        ctx = undefined;
      }
      return error;
    },
    set error(e) {
      error = e;
      issues = undefined;
      ctx = undefined;
    }
  };
}
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? failure(_Err, result.issues, ctx) : { success: true, data: result.value };
};
var COMPILE_INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid");
var COMPILE_FALLBACK = /* @__PURE__ */ Symbol.for("zod.compile.fallback");
var validate = (schema, value, _ctx) => {
  const validator = schema._zod.bag.validator;
  if (validator !== undefined) {
    if (validator(value) !== COMPILE_INVALID)
      return true;
    if (validator.definite === true && _ctx === undefined)
      return false;
  }
  return validateFallback(schema, value, _ctx);
};
function validateFallback(schema, value, _ctx) {
  const ctx = _ctx ? { ..._ctx, async: false, abortEarly: true } : { async: false, abortEarly: true };
  const fallbackRun = schema._zod.bag.fallbackRun;
  let result;
  if (fallbackRun) {
    ctx[COMPILE_FALLBACK] = true;
    result = fallbackRun({ value, issues: [] }, ctx);
  } else {
    result = schema._zod.run({ value, issues: [] }, ctx);
  }
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  return result.issues.length === 0;
}
var validateAsync = async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: true, abortEarly: true } : { async: true, abortEarly: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length === 0;
};
var _encode = (_Err) => {
  const parse = _parse(_Err);
  const fn = (schema, value, _ctx, _params) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return parse(schema, value, ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var _decode = (_Err) => {
  const parse = _parse(_Err);
  const fn = (schema, value, _ctx, _params) => {
    return parse(schema, value, _ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var _encodeAsync = (_Err) => {
  const parseAsync = _parseAsync(_Err);
  const fn = async (schema, value, _ctx, _params) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return await parseAsync(schema, value, ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var _decodeAsync = (_Err) => {
  const parseAsync = _parseAsync(_Err);
  const fn = async (schema, value, _ctx, _params) => {
    return await parseAsync(schema, value, _ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var _safeEncode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParse(_Err)(schema, value, ctx);
};
var _safeDecode = (_Err) => (schema, value, _ctx) => {
  return _safeParse(_Err)(schema, value, _ctx);
};
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value, ctx);
};
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _safeParseAsync(_Err)(schema, value, _ctx);
};
// ../../../../Projects/agentum/node_modules/zod/v4/core/regexes.js
var cuid = /^[cC][0-9a-z]{6,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
function nanoidOfLength(length) {
  return new RegExp(`^[a-zA-Z0-9_-]{${length}}$`);
}
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version) => {
  if (!version)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var _emoji = `^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`;
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
var httpProtocol = /^https?$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
function anchor(source) {
  return new RegExp(`^${source}$`);
}
var date = /* @__PURE__ */ anchor(dateSource);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : args.seconds ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const opts = ["Z"];
  if (args.offset)
    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const qualified = `${timeSource({ precision: args.precision, seconds: true })}(?:${opts.join("|")})`;
  const timeRegex = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var anyString = /^[\s\S]{0,}$/;
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;

// ../../../../Projects/agentum/node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a = inst._zod).onattach ?? (_a.onattach = []);
});
var _whenHasLength = (payload) => {
  const val = payload.value;
  return !nullish(val) && val.length !== undefined;
};
var numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin: numericOriginMap[typeof payload.value] ?? origin,
      code: "too_big",
      maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin: numericOriginMap[typeof payload.value] ?? origin,
      code: "too_small",
      minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? def.value !== BigInt(0) && payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
    if (isMultiple)
      return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          continue: false,
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const units = input.length;
    const length = typeof input === "string" && units > def.maximum ? codePointLength(input) : units;
    if (length <= def.maximum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const units = input.length;
    const length = typeof input === "string" && units >= def.minimum && units < def.minimum * 2 ? codePointLength(input) : units;
    if (length >= def.minimum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const units = input.length;
    const length = typeof input === "string" && units >= def.length && units <= def.length * 2 ? codePointLength(input) : units;
    if (length === def.length)
      return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a, _b;
  $ZodCheck.init(inst, def);
  if (def.pattern)
    (_a = inst._zod).check ?? (_a.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b = inst._zod).check ?? (_b.check = () => {});
});
var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position},}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});

// ../../../../Projects/agentum/node_modules/zod/v4/core/doc.js
class Doc {
  constructor(args = [], closed = {}) {
    this.content = [];
    this.indent = 0;
    this.args = args;
    this.closed = closed;
  }
  indented(fn) {
    this.indent += 1;
    try {
      fn(this);
    } finally {
      this.indent -= 1;
    }
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content.split(`
`).filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const content = this?.content ?? [``];
    const factory = new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {
${content.join(`
`)}
};`);
    return factory(...Object.values(this.closed));
  }
}

// ../../../../Projects/agentum/node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 6,
  patch: 7
};

// ../../../../Projects/agentum/node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const defChecks = inst._zod.def.checks;
  const checks = inst._zod.traits.has("$ZodCheck") ? [inst, ...defChecks ?? []] : defChecks?.length ? [...defChecks] : [];
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks, ctx) => {
      if (payload.memo)
        return payload;
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks) {
        if (ch._zod.def.when) {
          if (explicitlyAborted(payload))
            continue;
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError;
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            attachSchema(payload.issues, currLen, inst);
            if (!isAborted)
              isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          attachSchema(payload.issues, currLen, inst);
          if (!isAborted)
            isAborted = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    const handleCanaryResult = (canary, payload, ctx) => {
      if (aborted(canary)) {
        canary.aborted = true;
        return canary;
      }
      const checkResult = runChecks(payload, checks, ctx);
      if (checkResult instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
      }
      return inst._zod.parse(checkResult, ctx);
    };
    inst._zod.run = (payload, ctx) => {
      if (ctx.skipChecks) {
        return inst._zod.parse(payload, ctx);
      }
      if (ctx.direction === "backward") {
        const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
        if (canary instanceof Promise) {
          return canary.then((canary) => {
            return handleCanaryResult(canary, payload, ctx);
          });
        }
        return handleCanaryResult(canary, payload, ctx);
      }
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return result.then((result) => runChecks(result, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
}, {
  get "~standard"() {
    return hide(this, "~standard", standardProps(this));
  },
  set "~standard"(value) {
    own(this, "~standard", value);
  }
});
var toStandardResult = (r, ctx) => r.issues.length ? { issues: r.issues.map((iss) => finalizeIssue(iss, ctx, config())) } : { value: r.value };
async function validateAsync2(inst, value) {
  const ctx = { async: true };
  return toStandardResult(await inst._zod.run({ value, issues: [] }, ctx), ctx);
}
function standardProps(inst) {
  return {
    validate: (value) => {
      const ctx = { async: false };
      try {
        const r = inst._zod.run({ value, issues: [] }, ctx);
        if (!(r instanceof Promise))
          return toStandardResult(r, ctx);
      } catch (_) {}
      return validateAsync2(inst, value);
    },
    vendor: "zod",
    version: 1
  };
}
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = def.pattern ?? anyString;
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_) {}
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid);
  $ZodStringFormat.init(inst, def);
});
var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    };
    const v = versionMap[def.version];
    if (v === undefined)
      throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid(v));
  } else
    def.pattern ?? (def.pattern = uuid());
  $ZodStringFormat.init(inst, def);
});
var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email);
  $ZodStringFormat.init(inst, def);
});
var URL_BAD_FORMAT = 1;
var URL_UNPARSEABLE = 2;
function canParseURL(input) {
  try {
    if (typeof URL !== "undefined" && typeof URL.canParse === "function")
      return URL.canParse(input);
    new URL(input);
    return true;
  } catch {
    return false;
  }
}
function validateURL(trimmed, def) {
  if (!("normalize" in def) && !("hostname" in def) && !("protocol" in def)) {
    return canParseURL(trimmed) || URL_UNPARSEABLE;
  }
  return parseURLObject(trimmed, def);
}
function parseURLObject(trimmed, def) {
  if (!def.normalize && def.protocol?.source === httpProtocol.source && !/^https?:\/\//i.test(trimmed)) {
    return URL_BAD_FORMAT;
  }
  try {
    if (typeof URL !== "undefined") {
      const URLStatic = URL;
      if (typeof URLStatic.parse === "function")
        return URLStatic.parse(trimmed) ?? URL_UNPARSEABLE;
    }
    return new URL(trimmed);
  } catch {
    return URL_UNPARSEABLE;
  }
}
var asciiTabOrNewline = /[\t\n\r]/g;
function stripTabAndNewline(value) {
  return value.replace(asciiTabOrNewline, "");
}
function urlHostnameOk(url, hostname) {
  hostname.lastIndex = 0;
  return hostname.test(url.hostname);
}
function urlProtocolOk(url, protocol) {
  protocol.lastIndex = 0;
  return protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol);
}
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const trimmed = payload.value.trim();
      const url = validateURL(trimmed, def);
      if (url === URL_BAD_FORMAT) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid URL format",
          input: payload.value,
          inst,
          continue: !def.abort
        });
        return;
      }
      if (url === URL_UNPARSEABLE) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          input: payload.value,
          inst,
          continue: !def.abort
        });
        return;
      }
      if (url === true) {
        payload.value = stripTabAndNewline(trimmed);
        return;
      }
      if (def.hostname && !urlHostnameOk(url, def.hostname)) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid hostname",
          pattern: def.hostname.source,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      }
      if (def.protocol && !urlProtocolOk(url, def.protocol)) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid protocol",
          pattern: def.protocol.source,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      }
      payload.value = def.normalize ? url.href : stripTabAndNewline(trimmed);
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji());
  $ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  if (def.length !== undefined && (!Number.isInteger(def.length) || def.length < 1))
    throw new Error(`Invalid nanoid length: ${def.length}`);
  def.pattern ?? (def.pattern = def.length === undefined ? nanoid : nanoidOfLength(def.length));
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2);
  $ZodStringFormat.init(inst, def);
});
var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid);
  $ZodStringFormat.init(inst, def);
});
var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid);
  $ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date);
  $ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration);
  $ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4);
  $ZodStringFormat.init(inst, def);
});
var ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
function isValidIPv6(value) {
  if (!ipv6Alphabet.test(value))
    return false;
  return canParseURL(`http://[${value}]`);
}
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (!isValidIPv6(payload.value)) {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4);
  $ZodStringFormat.init(inst, def);
});
function isValidCIDRv6(value) {
  const parts = value.split("/");
  if (parts.length !== 2)
    return false;
  const [address, prefix] = parts;
  if (!prefix)
    return false;
  const prefixNum = Number(prefix);
  if (`${prefixNum}` !== prefix)
    return false;
  if (prefixNum < 0 || prefixNum > 128)
    return false;
  return isValidIPv6(address);
}
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (!isValidCIDRv6(payload.value)) {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (/\s/.test(data))
    return false;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
var base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/;
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64Charset);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var base64urlCharset = /^[A-Za-z0-9_-]*$/;
function isValidBase64URL(data) {
  if (!base64urlCharset.test(data))
    return false;
  const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64urlCharset);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164);
  $ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT(payload.value, def.alg))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = number;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? String(input) : undefined : undefined;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
function capSize(inst, size) {
  const caps = sizeCaps(inst._zod.def.checks);
  if (!caps.length)
    return;
  const cap = Math.min(...caps.map((c) => c[0]));
  const parse = inst._zod.parse;
  inst._zod.parse = (payload, ctx) => {
    const n = size(payload.value);
    if (n > cap && !ctx?.skipChecks && ctx?.direction !== "backward") {
      for (const [max, ch] of sizeCaps(inst._zod.def.checks)) {
        if (n > max && ch._zod.def.when(payload)) {
          const start = payload.issues.length;
          ch._zod.check(payload);
          payload.issues[start].continue = false;
          attachSchema(payload.issues, start, inst);
          return payload;
        }
      }
    }
    return parse(payload, ctx);
  };
}
var arraySize = (input) => Array.isArray(input) ? input.length : -1;
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = memo ? memo.alloc(inst, payload, Array(input.length), ctx) : Array(input.length);
    const proms = [];
    const abortEarly = ctx?.abortEarly;
    for (let i = 0;i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result) => handleArrayResult(result, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
        if (abortEarly && result.issues.length !== 0 && aborted(result))
          break;
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
  capSize(inst, arraySize);
});
function handlePropertyResult(result, final, key, input, optin, optout) {
  const isPresent = key in input;
  const isOptionalOut = optout === "optional";
  if (!isPresent && isOptionalOut && optin === "optional") {
    return;
  }
  if (result.issues.length) {
    if (optin !== undefined && isOptionalOut && !isPresent) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (!isPresent && optin === undefined) {
    if (!result.issues.length) {
      final.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: undefined,
        path: [key]
      });
    }
    return;
  }
  if (result.value === undefined) {
    if (isPresent || optin === "defaulted" && !isOptionalOut) {
      final.value[key] = undefined;
    }
  } else {
    final.value[key] = result.value;
  }
}
var NO_SYMBOL_KEYS = [];
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  const ownSymbols = Object.getOwnPropertySymbols(def.shape);
  const symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS;
  const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
  for (const k of allKeys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    allKeys,
    symbolKeys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst, abortEarly) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const optin = _catchall.optin;
  const optout = _catchall.optout;
  let seen = 0;
  for (const key in input) {
    if (abortEarly && payload.issues.length !== seen) {
      if (aborted(payload, seen))
        break;
      seen = payload.issues.length;
    }
    if (keySet.has(key))
      continue;
    if (key === "__proto__") {
      if (t === "never")
        unrecognized.push(key);
      continue;
    }
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
    } else {
      handlePropertyResult(r, payload, key, input, optin, optout);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst,
      continue: true
    });
  }
  if (!proms.length)
    return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  const sh = desc?.get ? desc.get.raw : def.shape ?? {};
  if (sh) {
    const get = () => {
      const newSh = { ...sh };
      Object.defineProperty(def, "shape", { value: newSh });
      get.raw = newSh;
      return newSh;
    };
    get.raw = sh;
    Object.defineProperty(def, "shape", { get });
  }
  const _normalized = cached(() => normalizeDef(def));
  defineLazyInternal(inst, "propValues", (zod) => {
    const shape = zod.def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        if (!Object.prototype.hasOwnProperty.call(propValues, key)) {
          assignProp(propValues, key, new Set);
        }
        for (const v of field.values)
          propValues[key].add(v);
        if (field.optin !== undefined)
          propValues[key].add(undefined);
      }
    }
    return propValues;
  });
  const isObject2 = isObject;
  const catchall = def.catchall;
  let value;
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
    const proms = [];
    const shape = value.shape;
    const abortEarly = ctx?.abortEarly;
    let seen = payload.issues.length;
    for (const key of value.allKeys) {
      if (abortEarly && payload.issues.length !== seen) {
        if (aborted(payload, seen))
          break;
        seen = payload.issues.length;
      }
      if (key === "__proto__")
        continue;
      const el = shape[key];
      const optin = el._zod.optin;
      const optout = el._zod.optout;
      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
      } else {
        handlePropertyResult(r, payload, key, input, optin, optout);
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst, abortEarly === true);
  };
});
var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
  $ZodObject.init(inst, def);
  const superParse = inst._zod.parse;
  const _normalized = cached(() => normalizeDef(def));
  const memo = globalConfig.memoizer;
  const generateFastpass = (shape) => {
    const normalized = _normalized.value;
    const syms = normalized.symbolKeys;
    const doc = new Doc(["payload", "ctx"], { shape, inst, memo, syms });
    const parseStr = (k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    const prefixStr = (id, k) => `
          let ${id}_ab = false;
          for (let i = 0; i < ${id}.issues.length; i++) {
            const iss = ${id}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${id}_ab = true;
          }
          if (${id}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
    doc.write(`const input = payload.value;`);
    const ids = Object.create(null);
    let counter = 0;
    for (const key of normalized.allKeys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(memo ? `const newResult = memo.alloc(inst, payload, {}, ctx);` : `const newResult = {};`);
    for (const key of normalized.allKeys) {
      if (key === "__proto__")
        continue;
      const id = ids[key];
      const k = typeof key === "symbol" ? `syms[${syms.indexOf(key)}]` : esc(key);
      const isPresent = `${k} in input`;
      const schema = shape[key];
      const optin = schema?._zod?.optin;
      const isOptionalIn = optin !== undefined;
      const isOptionalOut = schema?._zod?.optout === "optional";
      doc.write(`const ${id} = ${parseStr(k)};`);
      if (isOptionalIn && isOptionalOut) {
        const assign = optin === "optional" ? `${id}_present` : `${id}.value !== undefined || ${id}_present`;
        doc.write(`
        const ${id}_present = ${isPresent};
        if (!${id}.issues.length || ${id}_present) {
          if (${id}.issues.length) {${prefixStr(id, k)}
          }

          if (${assign}) {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
      } else if (!isOptionalIn) {
        doc.write(`
        const ${id}_present = ${isPresent};
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${id}_present) {
          newResult[${k}] = ${id}.value;
        }

      `);
      } else {
        doc.write(`
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
      `);
        if (optin === "defaulted") {
          doc.write(`newResult[${k}] = ${id}.value;`);
        } else {
          doc.write(`
        if (${id}.value !== undefined || ${isPresent}) {
          newResult[${k}] = ${id}.value;
        }
      `);
        }
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    return doc.compile();
  };
  let fastpass;
  const isObject2 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval2 = allowsEval;
  const fastEnabled = jit && allowsEval2.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass)
        fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
      if (!catchall)
        return payload;
      return handleCatchall([], input, payload, ctx, value, inst, ctx?.abortEarly === true);
    }
    return superParse(payload, ctx);
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  const nonaborted = results.filter((r) => !aborted(r));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "optin", (zod) => zod.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : zod.def.options.some((o) => o._zod.optin !== undefined) ? "optional" : undefined);
  defineLazyInternal(inst, "optout", (zod) => zod.def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined);
  defineLazyInternal(inst, "values", (zod) => {
    if (zod.def.options.every((o) => o._zod.values)) {
      return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return;
  });
  defineLazyInternal(inst, "pattern", (zod) => {
    if (zod.def.options.every((o) => o._zod.pattern)) {
      const patterns = zod.def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return;
  });
  const first = def.options.length === 1 ? def.options[0]._zod.run : null;
  inst._zod.parse = (payload, ctx) => {
    if (first) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results) => {
      return handleUnionResults(results, payload, inst, ctx);
    });
  };
});
var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left, right]) => {
        return handleIntersectionResults(payload, left, right);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    if (Object.prototype.hasOwnProperty.call(newObj, "__proto__"))
      delete newObj.__proto__;
    for (const key of sharedKeys) {
      if (key === "__proto__")
        continue;
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0;index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  const unrecKeys = new Map;
  let unrecIssue;
  const keyIssues = new Map;
  const collect = (iss, side) => {
    let keys;
    if (iss.code === "unrecognized_keys" && !iss.path?.length) {
      unrecIssue ?? (unrecIssue = iss);
      keys = iss.keys;
    } else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
      const k = String(iss.path[0]);
      if (!keyIssues.has(k))
        keyIssues.set(k, iss);
      keys = [k];
    } else {
      return false;
    }
    for (const k of keys) {
      if (!unrecKeys.has(k))
        unrecKeys.set(k, {});
      unrecKeys.get(k)[side] = true;
    }
    return true;
  };
  for (const iss of left.issues) {
    if (!collect(iss, "l"))
      result.issues.push(iss);
  }
  for (const iss of right.issues) {
    if (!collect(iss, "r"))
      result.issues.push(iss);
  }
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length) {
    const aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
    if (aggregated.length)
      result.issues.push({ ...unrecIssue, keys: aggregated });
    for (const k of bothKeys) {
      if (!aggregated.includes(k) && keyIssues.has(k))
        result.issues.push(keyIssues.get(k));
    }
  }
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    if (aborted(result))
      return result;
    throw new Error(`Unmergable intersection. Error path: ` + `${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  const valuesSet = new Set(values);
  inst._zod.values = valuesSet;
  defineLazyInternal(inst, "pattern", (zod) => {
    const patternValues = getEnumValues(zod.def.entries).filter((k) => propertyKeyTypes.has(typeof k));
    return new RegExp(patternValues.length ? `^(${patternValues.map((o) => escapeRegex(o.toString())).join("|")})$` : "^[^\\s\\S]$");
  });
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (valuesSet.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  const values = new Set(def.values);
  inst._zod.values = values;
  defineLazyInternal(inst, "pattern", (zod) => {
    const vals = zod.def.values;
    return new RegExp(vals.length ? `^(${vals.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$` : "^[^\\s\\S]$");
  });
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  globalConfig.memoizer?.guard(inst);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    const _out = def.transform(payload.value, payload);
    if (ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output) => {
        payload.value = output;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError;
    }
    payload.value = _out;
    return payload;
  };
});
function handleOptionalResult(payload, result) {
  payload.value = result.issues.length ? undefined : result.value;
  return payload;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
  inst._zod.optout = "optional";
  defineLazyInternal(inst, "values", (zod) => {
    const values = zod.def.innerType._zod.values;
    return values ? new Set([...values, undefined]) : undefined;
  });
  defineLazyInternal(inst, "pattern", (zod) => {
    const pattern = zod.def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === undefined) {
      if (def.innerType._zod.optin !== "defaulted")
        return payload;
      const result = def.innerType._zod.run({ value: payload.value, issues: [] }, ctx);
      if (result instanceof Promise)
        return result.then((result) => handleOptionalResult(payload, result));
      return handleOptionalResult(payload, result);
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  defineLazyInternal(inst, "pattern", (zod) => zod.def.innerType._zod.pattern);
  inst._zod.parse = (payload, ctx) => {
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin);
  defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
  defineLazyInternal(inst, "pattern", (zod) => {
    const pattern = zod.def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : undefined;
  });
  defineLazyInternal(inst, "values", (zod) => {
    return zod.def.innerType._zod.values ? new Set([...zod.def.innerType._zod.values, null]) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "defaulted";
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result) => handleDefaultResult(result, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === undefined) {
    payload.value = def.defaultValue;
  }
  return payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "defaulted";
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "values", (zod) => {
    const v = zod.def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== undefined)) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result) => handleNonOptionalResult(result, inst));
    }
    return handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === undefined) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
function handleCatchResult(payload, result, def, ctx) {
  if (!result.issues.length) {
    payload.value = result.value;
    if (result.memo)
      payload.memo = true;
    return payload;
  }
  payload.value = def.catchValue({
    ...result,
    value: payload.value,
    error: {
      issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
    },
    input: payload.value
  });
  return payload;
}
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
  defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run({ value: payload.value, issues: [] }, ctx);
    if (result instanceof Promise) {
      return result.then((result) => handleCatchResult(payload, result, def, ctx));
    }
    return handleCatchResult(payload, result, def, ctx);
  };
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
  defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
  defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
  defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right) => handlePipeResult(right, def.in, ctx));
      }
      return handlePipeResult(right, def.in, ctx);
    }
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left) => handlePipeResult(left, def.out, ctx));
    }
    return handlePipeResult(left, def.out, ctx);
  };
});
function handlePipeResult(left, next, ctx) {
  if (left.issues.some((iss) => iss.code !== "unrecognized_keys")) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "propValues", (zod) => zod.def.innerType._zod.propValues);
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  defineLazyInternal(inst, "optin", (zod) => zod.def.innerType?._zod?.optin);
  defineLazyInternal(inst, "optout", (zod) => zod.def.innerType?._zod?.optout);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  if (!payload.memo)
    payload.value = Object.freeze(payload.value);
  return payload;
}
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r) => handleRefineResult(r, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      path: [...inst._zod.def.path ?? []],
      continue: !inst._zod.def.abort
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}
// ../../../../Projects/agentum/node_modules/zod/v4/core/memoizer.js
class $ZodCyclicError extends Error {
  constructor() {
    super(`Cannot parse a reference cycle that closes through a transform`);
    this.name = "ZodCyclicError";
  }
}
var STATE = "~memo";
var NO_ISSUES = [];
function isRef(value) {
  return value !== null && typeof value === "object";
}
function cloneIssues(issues) {
  return issues.map((iss) => iss.path ? { ...iss, path: iss.path.slice() } : { ...iss });
}
var recursive = /* @__PURE__ */ new WeakMap;
var NONE = 0;
var ASSUMED = 1;
var PROVEN = 2;
function isRecursive(inst, stack, resolve) {
  const cached = recursive.get(inst);
  if (cached !== undefined)
    return cached ? PROVEN : NONE;
  if (stack.has(inst))
    return PROVEN;
  stack.add(inst);
  let result = NONE;
  const check = (child) => {
    if (result !== PROVEN && child?._zod) {
      const answer = isRecursive(child, stack, resolve);
      if (answer > result)
        result = answer;
    }
  };
  const shape = (sh, spread) => {
    let answer = NONE;
    for (const key of Reflect.ownKeys(sh)) {
      const desc = Object.getOwnPropertyDescriptor(sh, key);
      if (spread && !desc.enumerable)
        continue;
      const child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack, resolve) : NONE;
      if (child > answer)
        answer = child;
    }
    return answer;
  };
  const merge = (answer) => {
    if (answer > result)
      result = answer;
  };
  const def = inst._zod.def;
  const kind = def.type;
  switch (kind) {
    case "object": {
      const raw = rawShape(def);
      merge(raw ? shape(raw, true) : ASSUMED);
      check(def.catchall);
      break;
    }
    case "array":
      check(def.element);
      break;
    case "tuple":
      for (const el of def.items)
        check(el);
      check(def.rest);
      break;
    case "record":
    case "map":
      check(def.keyType);
      check(def.valueType);
      break;
    case "set":
      check(def.valueType);
      break;
    case "union":
      for (const el of def.options)
        check(el);
      break;
    case "intersection":
      check(def.left);
      check(def.right);
      break;
    case "optional":
    case "nullable":
    case "default":
    case "prefault":
    case "catch":
    case "readonly":
    case "nonoptional":
    case "promise":
    case "success":
      check(def.innerType);
      break;
    case "pipe":
      check(def.in);
      check(def.out);
      break;
    case "function":
      check(def.input);
      check(def.output);
      break;
    case "lazy": {
      const inner = def._cachedInner ?? (resolve ? inst._zod.innerType : undefined);
      merge(inner ? isRecursive(inner, stack, false) : ASSUMED);
      break;
    }
    case "template_literal":
    case "string":
    case "number":
    case "int":
    case "boolean":
    case "bigint":
    case "symbol":
    case "undefined":
    case "null":
    case "void":
    case "never":
    case "any":
    case "unknown":
    case "date":
    case "nan":
    case "enum":
    case "literal":
    case "file":
    case "transform":
    case "custom":
      break;
    default: {
      for (const key in def) {
        const desc = Object.getOwnPropertyDescriptor(def, key);
        if (!desc || desc.get)
          continue;
        const value = desc.value;
        if (!value || typeof value !== "object")
          continue;
        if (value._zod)
          check(value);
        else if (Array.isArray(value))
          for (const el of value)
            check(el);
      }
    }
  }
  stack.delete(inst);
  return settle(inst, result);
}
function settle(inst, answer) {
  if (answer !== ASSUMED)
    recursive.set(inst, answer === PROVEN);
  return answer;
}
function bucketFor(state, inst) {
  let bucket = state.buckets.get(inst);
  if (!bucket) {
    bucket = new WeakMap;
    state.buckets.set(inst, bucket);
  }
  return bucket;
}
var handoff;
var open = [];
var memo = {
  alloc(_inst, payload, empty) {
    const bucket = handoff;
    if (!bucket)
      return empty;
    handoff = undefined;
    const entry = { value: empty, issues: null };
    bucket.set(payload.value, entry);
    open.push(entry);
    return empty;
  },
  guard(inst) {
    var _a;
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred.push(() => {
      const base = inst._zod.parse;
      const wrapped = (payload, ctx) => {
        if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value))
          throw new $ZodCyclicError;
        return base(payload, ctx);
      };
      inst._zod.parse = wrapped;
      if (inst._zod.run === base)
        inst._zod.run = wrapped;
    });
  },
  attach(inst) {
    var _a;
    let isRecursiveInst;
    let rechecked = false;
    let lastCtx;
    let lastBucket;
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred.push(() => {
      const base = inst._zod.parse;
      const wrapped = (payload, ctx) => {
        if (isRecursiveInst === undefined) {
          const walked = isRecursive(inst, new Set, false);
          if (walked === NONE) {
            inst._zod.parse = base;
            if (inst._zod.run === wrapped)
              inst._zod.run = base;
            return base(payload, ctx);
          }
          if (walked === PROVEN || rechecked)
            isRecursiveInst = true;
          else
            rechecked = true;
        }
        const input = payload.value;
        if (!isRef(input))
          return base(payload, ctx);
        let state = ctx[STATE];
        if (!state) {
          state = { buckets: new WeakMap, backEdges: undefined };
          ctx[STATE] = state;
        }
        let bucket;
        if (lastCtx === ctx) {
          bucket = lastBucket;
        } else {
          bucket = bucketFor(state, inst);
          lastCtx = ctx;
          lastBucket = bucket;
        }
        const hit = bucket.get(input);
        if (hit) {
          payload.value = hit.value;
          if (hit.issues) {
            if (hit.issues.length)
              payload.issues.push(...cloneIssues(hit.issues));
          } else {
            payload.memo = true;
            state.backEdges ?? (state.backEdges = new WeakSet);
            state.backEdges.add(hit.value);
          }
          return payload;
        }
        handoff = bucket;
        const depth = open.length;
        const result = base(payload, ctx);
        handoff = undefined;
        const entry = open.length > depth ? open.pop() : undefined;
        if (result instanceof Promise) {
          return result.then((r) => {
            if (entry)
              entry.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES;
            return r;
          });
        }
        if (entry)
          entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES;
        return result;
      };
      inst._zod.parse = wrapped;
      if (inst._zod.run === base)
        inst._zod.run = wrapped;
    });
  }
};
function memoizer() {
  return memo;
}
function isBackEdge(ctx, value) {
  const backEdges = ctx[STATE]?.backEdges;
  return backEdges !== undefined && isRef(value) && backEdges.has(value);
}
// ../../../../Projects/agentum/node_modules/zod/v4/locales/en.js
var error = () => {
  const Sizable = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    currency_code: "currency code",
    credit_card: "credit card number",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  function getTypeName(type, input) {
    if (type === "number" && typeof input === "number" && !Number.isFinite(input)) {
      return String(input);
    }
    return TypeDictionary[type] ?? type;
  }
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = getTypeName(issue.expected);
        const receivedType = parsedType(issue.input);
        const received = getTypeName(receivedType, issue.input);
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.exact ? "exactly " : issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.exact ? "exactly " : issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Invalid string: must start with "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Invalid string: must end with "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Invalid string: must include "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Invalid string: must match pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue.origin}`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `Invalid discriminator value. Expected ${opts}`;
        }
        if (issue.inclusive === false) {
          return "Invalid input: more than one option matched";
        }
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue.origin}`;
      default:
        return `Invalid input`;
    }
  };
};
function en_default() {
  return {
    localeError: error()
  };
}
// ../../../../Projects/agentum/node_modules/zod/v4/core/registries.js
var _a2;
class $ZodRegistry {
  constructor() {
    this._map = new WeakMap;
    this._idmap = new Map;
  }
  add(schema, ..._meta) {
    const meta = _meta[0];
    this._map.set(schema, meta);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.set(meta.id, schema);
    }
    return this;
  }
  clear() {
    this._map = new WeakMap;
    this._idmap = new Map;
    return this;
  }
  remove(schema) {
    const meta = this._map.get(schema);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.delete(meta.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      const f = { ...pm, ...this._map.get(schema) };
      return Object.keys(f).length ? f : undefined;
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
}
function registry() {
  return new $ZodRegistry;
}
(_a2 = globalThis).__zod_globalRegistry ?? (_a2.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;
// ../../../../Projects/agentum/node_modules/zod/v4/core/api.js
function snapshotChecks(def) {
  if (def.checks)
    def.checks = [...def.checks];
  return def;
}
function _string(Class, params) {
  return new Class(snapshotChecks({ type: "string", ...normalizeParams(params) }));
}
function _email(Class, params) {
  return new Class({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _guid(Class, params) {
  return new Class({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuid(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuidv4(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
function _uuidv6(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
function _uuidv7(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
function _url(Class, params) {
  return new Class({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _emoji2(Class, params) {
  return new Class({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _nanoid(Class, params) {
  return new Class({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid(Class, params) {
  return new Class({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid2(Class, params) {
  return new Class({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ulid(Class, params) {
  return new Class({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _xid(Class, params) {
  return new Class({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ksuid(Class, params) {
  return new Class({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv4(Class, params) {
  return new Class({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv6(Class, params) {
  return new Class({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv4(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv6(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64(Class, params) {
  return new Class({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64url(Class, params) {
  return new Class({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _e164(Class, params) {
  return new Class({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _jwt(Class, params) {
  return new Class({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _isoDateTime(Class, params) {
  return new Class({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDate(Class, params) {
  return new Class({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _isoTime(Class, params) {
  return new Class({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDuration(Class, params) {
  return new Class({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _number(Class, params) {
  return new Class(snapshotChecks({ type: "number", checks: [], ...normalizeParams(params) }));
}
function _int(Class, params) {
  return new Class({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
function _boolean(Class, params) {
  return new Class({
    type: "boolean",
    ...normalizeParams(params)
  });
}
function _any(Class) {
  return new Class({
    type: "any"
  });
}
function _unknown(Class) {
  return new Class({
    type: "unknown"
  });
}
function _never(Class, params) {
  return new Class({
    type: "never",
    ...normalizeParams(params)
  });
}
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
function _normalize(form) {
  return _overwrite((input) => input.normalize(form));
}
function _trim() {
  return _overwrite((input) => input.trim());
}
function _toLowerCase() {
  return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
  return _overwrite((input) => input.toUpperCase());
}
function _slugify() {
  return _overwrite((input) => slugify(input));
}
function _array(Class, element, params) {
  return new Class({
    type: "array",
    element,
    ...normalizeParams(params)
  });
}
function _refine(Class, fn, _params) {
  const schema = new Class({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
function _superRefine(fn, params) {
  const ch = _check((payload) => {
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        if (!("input" in _issue))
          _issue.input = payload.value;
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  }, params);
  return ch;
}
function _check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
// ../../../../Projects/agentum/node_modules/zod/v4/core/to-json-schema.js
function assignProps(target, ...sources) {
  for (const source of sources) {
    for (const key of Reflect.ownKeys(source)) {
      if (Object.prototype.propertyIsEnumerable.call(source, key)) {
        assignProp(target, key, source[key]);
      }
    }
  }
  return target;
}
function initializeContext(params) {
  let target = params?.target ?? "draft-2020-12";
  if (target === "draft-4")
    target = "draft-04";
  if (target === "draft-7")
    target = "draft-07";
  return {
    processors: params.processors ?? {},
    metadataRegistry: params?.metadata ?? globalRegistry,
    target,
    unrepresentable: params?.unrepresentable ?? "throw",
    override: params?.override ?? (() => {}),
    io: params?.io ?? "output",
    counter: 0,
    seen: new Map,
    sharedDefsExtractedFor: undefined,
    sharedEmitDoneFor: undefined,
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    intersections: [],
    deferred: [],
    external: params?.external ?? undefined
  };
}
function handleUnrepresentable(schema, ctx, json, params, message) {
  const result = typeof ctx.unrepresentable === "function" ? ctx.unrepresentable({ zodSchema: schema, path: params.path, message }) : ctx.unrepresentable;
  if (result === "any")
    return false;
  if (result === undefined || result === "throw")
    throw new Error(message);
  Object.assign(json, result);
  return true;
}
function processSchema(schema, ctx, _params = { path: [], schemaPath: [] }) {
  var _a;
  const def = schema._zod.def;
  const seen = ctx.seen.get(schema);
  if (seen) {
    seen.count++;
    const isCycle = _params.schemaPath.includes(schema);
    if (isCycle) {
      seen.cycle = _params.path;
    }
    return seen.schema;
  }
  const result = { schema: {}, count: 1, cycle: undefined, path: _params.path };
  ctx.seen.set(schema, result);
  ctx.sharedDefsExtractedFor = undefined;
  ctx.sharedEmitDoneFor = undefined;
  const overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema) {
    result.schema = overrideSchema;
  } else {
    const params = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path
    };
    if (schema._zod.processJSONSchema) {
      schema._zod.processJSONSchema(ctx, result.schema, params);
    } else {
      const _json = result.schema;
      const processor = ctx.processors[def.type];
      if (!processor) {
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
      }
      processor(schema, ctx, _json, params);
    }
    const parent = schema._zod.parent;
    if (parent) {
      if (!result.ref)
        result.ref = parent;
      processSchema(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta = ctx.metadataRegistry.get(schema);
  if (meta)
    assignProps(result.schema, meta);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && "_prefault" in result.schema)
    (_a = result.schema).default ?? (_a.default = result.schema._prefault);
  delete result.schema._prefault;
  const _result = ctx.seen.get(schema);
  return _result.schema;
}
function encodeJSONPointerSegment(segment) {
  return segment.replace(/~/g, "~0").replace(/\//g, "~1");
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external)
    return;
  const idToSchema = new Map;
  for (const entry of ctx.seen.entries()) {
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      const existing = idToSchema.get(id);
      if (existing && existing !== entry[0]) {
        throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      }
      idToSchema.set(id, entry[0]);
    }
  }
  const makeURI = (entry) => {
    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      const externalId = ctx.external.registry.get(entry[0])?.id;
      const uriGenerator = ctx.external.uri ?? ((id) => id);
      if (externalId) {
        return { ref: uriGenerator(externalId) };
      }
      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
      entry[1].defId = id;
      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}` };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    if (entry[1] === root && !entry[1].schema.id) {
      return { ref: uriPrefix };
    }
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + encodeJSONPointerSegment(defId) };
  };
  const extractToDef = (entry) => {
    if (entry[1].schema.$ref) {
      return;
    }
    const seen = entry[1];
    const { ref, defId } = makeURI(entry);
    seen.def = { ...seen.schema };
    if (defId)
      seen.defId = defId;
    const schema = seen.schema;
    for (const key in schema) {
      delete schema[key];
    }
    schema.$ref = ref;
  };
  if (ctx.cycles === "throw") {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.cycle) {
        throw new Error("Cycle detected: " + `#/${seen.cycle?.join("/")}/<root>` + '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.');
      }
    }
  }
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (schema === entry[0]) {
      extractToDef(entry);
      continue;
    }
    if (ctx.external) {
      const ext = ctx.external.registry.get(entry[0])?.id;
      if (schema !== entry[0] && ext) {
        extractToDef(entry);
        continue;
      }
    }
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      extractToDef(entry);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry);
      continue;
    }
    if (seen.count > 1) {
      if (ctx.reused === "ref") {
        extractToDef(entry);
      }
    }
  }
  if (ctx.external)
    ctx.sharedDefsExtractedFor = ctx.external;
}
function compactTypeUnion(schema) {
  const options = schema.anyOf;
  if (!Array.isArray(options) || options.length === 0 || schema.type !== undefined)
    return;
  const types = [];
  for (const option of options) {
    if (!option || typeof option !== "object")
      return;
    compactTypeUnion(option);
    const keys = Object.keys(option);
    if (keys.length !== 1 || keys[0] !== "type")
      return;
    const type = option.type;
    for (const member of Array.isArray(type) ? type : [type]) {
      if (typeof member !== "string")
        return;
      if (!types.includes(member))
        types.push(member);
    }
  }
  delete schema.anyOf;
  schema.type = types.length === 1 ? types[0] : types;
}
var FOLDABLE_KEYS = new Set(["type", "properties", "required", "additionalProperties"]);
var UNION_KEYS = ["oneOf", "anyOf"];
function undeclaredConstraint(member) {
  const extra = member.additionalProperties;
  if (extra === undefined || extra === false || typeof extra !== "object" || extra === null)
    return null;
  return Object.keys(extra).length ? extra : null;
}
function foldObjects(members) {
  const objects = [];
  for (const member of members) {
    if (typeof member !== "object" || member.type !== "object")
      return null;
    for (const key in member) {
      if (!FOLDABLE_KEYS.has(key))
        return null;
    }
    objects.push(member);
  }
  const properties = {};
  const required = new Set;
  for (const object of objects) {
    for (const key in object.properties) {
      if (Object.prototype.hasOwnProperty.call(properties, key))
        continue;
      const parts = [];
      for (const other of objects) {
        const part = other.properties?.[key] ?? undeclaredConstraint(other);
        if (part === null || part === undefined)
          continue;
        if (!parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part)))
          parts.push(part);
      }
      const merged = parts.length === 1 ? parts[0] : foldObjects(parts) ?? { allOf: parts };
      assignProp(properties, key, merged);
    }
    for (const key of object.required ?? [])
      required.add(key);
  }
  const folded = { type: "object", properties };
  if (required.size)
    folded.required = [...required];
  if (objects.every((object) => object.additionalProperties === false)) {
    folded.additionalProperties = false;
  } else {
    const constraints = [];
    for (const object of objects) {
      const constraint = undeclaredConstraint(object);
      if (constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint)))
        constraints.push(constraint);
    }
    if (constraints.length === 1)
      folded.additionalProperties = constraints[0];
    else if (constraints.length > 1)
      folded.additionalProperties = { allOf: constraints };
  }
  return folded;
}
function foldIntersection(json) {
  const allOf = json.allOf;
  if (!Array.isArray(allOf) || allOf.length < 2)
    return;
  for (const key of FOLDABLE_KEYS)
    if (key in json)
      return;
  const unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k])));
  let folded = null;
  if (!unions.length) {
    folded = foldObjects(allOf);
  } else {
    const union = unions[0];
    const keyword = UNION_KEYS.find((k) => Array.isArray(union[k]));
    if (Object.keys(union).length !== 1)
      return;
    const rest = allOf.filter((m) => m !== union);
    const branches = union[keyword].map((branch) => foldObjects([...rest, branch]));
    if (branches.some((b) => !b))
      return;
    folded = { [keyword]: branches };
  }
  if (!folded)
    return;
  delete json.allOf;
  assignProps(json, folded);
}
function finalize(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const flattenRef = (zodSchema) => {
    const seen = ctx.seen.get(zodSchema);
    if (seen.ref === null)
      return;
    const schema = seen.def ?? seen.schema;
    const _cached = { ...schema };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
        schema.allOf = schema.allOf ?? [];
        schema.allOf.push(refSchema);
      } else {
        assignProps(schema, refSchema);
      }
      assignProps(schema, _cached);
      const isParentRef = zodSchema._zod.parent === ref;
      if (isParentRef) {
        for (const key in schema) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (!(key in _cached)) {
            delete schema[key];
          }
        }
      }
      if (refSchema.$ref && refSeen.def) {
        for (const key in schema) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) {
            delete schema[key];
          }
        }
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) {
          for (const key in schema) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) {
              delete schema[key];
            }
          }
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema,
      path: seen.path ?? []
    });
  };
  if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
    for (const entry of [...ctx.seen.entries()].reverse()) {
      flattenRef(entry[0]);
    }
    if (ctx.target !== "openapi-3.0") {
      for (const entry of ctx.seen.entries()) {
        compactTypeUnion(entry[1].def ?? entry[1].schema);
      }
    }
    for (const rewrite of ctx.deferred)
      rewrite();
    if (ctx.intersections.length) {
      const carriers = new Map;
      for (const seen of ctx.seen.values()) {
        for (const json of [seen.schema, seen.def]) {
          const allOf = json?.allOf;
          if (!Array.isArray(allOf))
            continue;
          const existing = carriers.get(allOf);
          if (existing)
            existing.push(json);
          else
            carriers.set(allOf, [json]);
        }
      }
      for (const allOf of ctx.intersections) {
        for (const json of carriers.get(allOf) ?? [])
          foldIntersection(json);
      }
    }
  }
  const result = {};
  if (ctx.target === "draft-2020-12") {
    result.$schema = "https://json-schema.org/draft/2020-12/schema";
  } else if (ctx.target === "draft-07") {
    result.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (ctx.target === "draft-04") {
    result.$schema = "http://json-schema.org/draft-04/schema#";
  } else if (ctx.target === "openapi-3.0") {}
  if (ctx.external?.uri) {
    const id = ctx.external.registry.get(schema)?.id;
    if (!id)
      throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id);
  }
  assignProps(result, root.defId ? root.schema : root.def ?? root.schema);
  const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
  if (rootMetaId !== undefined && result.id === rootMetaId)
    delete result.id;
  const defs = ctx.external?.defs ?? {};
  if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.def && seen.defId) {
        if (seen.def.id === seen.defId)
          delete seen.def.id;
        assignProp(defs, seen.defId, seen.def);
      }
    }
  }
  if (ctx.external)
    ctx.sharedEmitDoneFor = ctx.external;
  if (ctx.external) {} else {
    if (Object.keys(defs).length > 0) {
      if (ctx.target === "draft-2020-12") {
        result.$defs = defs;
      } else {
        result.definitions = defs;
      }
    }
  }
  try {
    const finalized = JSON.parse(JSON.stringify(result));
    Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
        }
      },
      enumerable: false,
      writable: false
    });
    return finalized;
  } catch (_err) {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: new Set };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const def = _schema._zod.def;
  if (def.type === "transform")
    return true;
  if (def.type === "array")
    return isTransforming(def.element, ctx);
  if (def.type === "set")
    return isTransforming(def.valueType, ctx);
  if (def.type === "lazy")
    return isTransforming(def.getter(), ctx);
  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault" || def.type === "catch") {
    return isTransforming(def.innerType, ctx);
  }
  if (def.type === "intersection") {
    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  }
  if (def.type === "record" || def.type === "map") {
    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  }
  if (def.type === "pipe") {
    if (_schema._zod.traits.has("$ZodCodec"))
      return true;
    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
  }
  if (def.type === "object") {
    for (const key in def.shape) {
      if (isTransforming(def.shape[key], ctx))
        return true;
    }
    return false;
  }
  if (def.type === "union") {
    for (const option of def.options) {
      if (isTransforming(option, ctx))
        return true;
    }
    return false;
  }
  if (def.type === "tuple") {
    for (const item of def.items) {
      if (isTransforming(item, ctx))
        return true;
    }
    if (def.rest && isTransforming(def.rest, ctx))
      return true;
    return false;
  }
  return false;
}
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
  const ctx = initializeContext({ ...params, processors });
  processSchema(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
  const { libraryOptions, target } = params ?? {};
  const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
  processSchema(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
// ../../../../Projects/agentum/node_modules/zod/v4/core/json-schema-processors.js
var narrowMin = (agg, key, value) => {
  if (agg[key] === undefined || value > agg[key])
    agg[key] = value;
};
var narrowMax = (agg, key, value) => {
  if (agg[key] === undefined || value < agg[key])
    agg[key] = value;
};
var narrowBoth = (agg, value) => {
  narrowMin(agg, "minimum", value);
  narrowMax(agg, "maximum", value);
};
var addDivisor = (agg, value) => {
  agg.multipleOf ?? (agg.multipleOf = []);
  if (!agg.multipleOf.includes(value))
    agg.multipleOf.push(value);
};
var addPattern = (agg, pattern) => {
  agg.patterns ?? (agg.patterns = new Set);
  agg.patterns.add(pattern);
};
var intersectMime = (agg, mime) => {
  agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
};
var setFormat = (agg, format) => {
  agg.format = format;
  if (format.includes("int"))
    agg.isInt = true;
};
var minContributor = (agg, def) => narrowMin(agg, "minimum", def.minimum);
var maxContributor = (agg, def) => narrowMax(agg, "maximum", def.maximum);
var formatContributor = (ranges) => (agg, def) => {
  setFormat(agg, def.format);
  const [minimum, maximum] = ranges[def.format];
  narrowMin(agg, "minimum", minimum);
  narrowMax(agg, "maximum", maximum);
};
var contributors = {
  greater_than: (agg, def) => narrowMin(agg, def.inclusive ? "minimum" : "exclusiveMinimum", def.value),
  less_than: (agg, def) => narrowMax(agg, def.inclusive ? "maximum" : "exclusiveMaximum", def.value),
  multiple_of: (agg, def) => addDivisor(agg, def.value),
  number_format: formatContributor(NUMBER_FORMAT_RANGES),
  bigint_format: formatContributor(BIGINT_FORMAT_RANGES),
  min_length: minContributor,
  max_length: maxContributor,
  length_equals: (agg, def) => narrowBoth(agg, def.length),
  min_size: minContributor,
  max_size: maxContributor,
  size_equals: (agg, def) => narrowBoth(agg, def.size),
  string_format: (agg, def) => {
    setFormat(agg, def.format);
    if (def.pattern)
      addPattern(agg, def.pattern);
    if (def.format === "base64" || def.format === "base64url")
      agg.contentEncoding = def.format;
    if (def.local || def.precision === -1)
      agg.laxFormat = true;
  },
  mime_type: (agg, def) => intersectMime(agg, def.mime)
};
function aggregateChecks(schema) {
  const agg = {};
  const def = schema._zod.def;
  const list = schema._zod.traits.has("$ZodCheck") ? [schema, ...def.checks ?? []] : def.checks ?? [];
  for (const ch of list)
    contributors[ch._zod.def.check]?.(agg, ch._zod.def);
  const bag = schema._zod.bag;
  if (bag.minimum !== undefined)
    narrowMin(agg, "minimum", bag.minimum);
  if (bag.exclusiveMinimum !== undefined)
    narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum);
  if (bag.maximum !== undefined)
    narrowMax(agg, "maximum", bag.maximum);
  if (bag.exclusiveMaximum !== undefined)
    narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum);
  if (bag.multipleOf !== undefined)
    addDivisor(agg, bag.multipleOf);
  if (bag.format !== undefined) {
    agg.format ?? (agg.format = bag.format);
    if (bag.format.includes("int"))
      agg.isInt = true;
  }
  if (bag.mime)
    intersectMime(agg, bag.mime);
  for (const pattern of bag.patterns ?? [])
    addPattern(agg, pattern);
  return agg;
}
var formatMap = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
};
var exactPatterns = new Map([
  [base64Charset, base64],
  [base64urlCharset, base64url]
]);
var exactPattern = (p) => exactPatterns.get(p) ?? p;
var stringProcessor = (schema, ctx, _json, _params) => {
  const json = _json;
  json.type = "string";
  const { minimum, maximum, format, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
  if (typeof minimum === "number")
    json.minLength = minimum;
  if (typeof maximum === "number")
    json.maxLength = maximum;
  if (format) {
    json.format = formatMap[format] ?? format;
    if (json.format === "")
      delete json.format;
    if (format === "time" || laxFormat) {
      delete json.format;
    }
  }
  if (contentEncoding)
    json.contentEncoding = contentEncoding;
  if (patterns && patterns.size > 0) {
    const patternList = [...patterns].map(exactPattern);
    if (patternList.length === 1)
      json.pattern = patternList[0].source;
    else if (patternList.length > 1) {
      json.allOf = [
        ...patternList.map((regex) => ({
          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
          pattern: regex.source
        }))
      ];
    }
  }
};
var numberProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const { minimum, maximum, multipleOf, exclusiveMaximum, exclusiveMinimum, isInt } = aggregateChecks(schema);
  json.type = isInt ? "integer" : "number";
  const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
  const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
  const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
  if (exMin) {
    if (legacy) {
      json.minimum = exclusiveMinimum;
      json.exclusiveMinimum = true;
    } else {
      json.exclusiveMinimum = exclusiveMinimum;
    }
  } else if (typeof minimum === "number") {
    json.minimum = minimum;
  }
  if (exMax) {
    if (legacy) {
      json.maximum = exclusiveMaximum;
      json.exclusiveMaximum = true;
    } else {
      json.exclusiveMaximum = exclusiveMaximum;
    }
  } else if (typeof maximum === "number") {
    json.maximum = maximum;
  }
  if (multipleOf) {
    const divisors = new Set;
    for (const divisor of multipleOf) {
      if (Number.isFinite(divisor) && divisor !== 0)
        divisors.add(Math.abs(divisor));
      else
        handleUnrepresentable(schema, ctx, json, params, `A multipleOf divisor of ${divisor} cannot be represented in JSON Schema`);
    }
    const [first, ...rest] = divisors;
    if (first !== undefined)
      json.multipleOf = first;
    if (rest.length)
      json.allOf = [...json.allOf ?? [], ...rest.map((m) => ({ multipleOf: m }))];
  }
};
var booleanProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var bigintProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "BigInt cannot be represented in JSON Schema");
};
var symbolProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Symbols cannot be represented in JSON Schema");
};
var nullProcessor = (_schema, ctx, json, _params) => {
  if (ctx.target === "openapi-3.0") {
    json.type = "string";
    json.nullable = true;
    json.enum = [null];
  } else {
    json.type = "null";
  }
};
var undefinedProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Undefined cannot be represented in JSON Schema");
};
var voidProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Void cannot be represented in JSON Schema");
};
var neverProcessor = (_schema, _ctx, json, _params) => {
  json.not = {};
};
var anyProcessor = (_schema, _ctx, _json, _params) => {};
var unknownProcessor = (_schema, _ctx, _json, _params) => {};
var dateProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Date cannot be represented in JSON Schema");
};
var enumProcessor = (schema, _ctx, json, _params) => {
  const def = schema._zod.def;
  const values = getEnumValues(def.entries);
  if (values.length === 0) {
    json.not = {};
    return;
  }
  if (values.every((v) => typeof v === "number"))
    json.type = "number";
  if (values.every((v) => typeof v === "string"))
    json.type = "string";
  json.enum = values;
};
var literalProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  if (def.values.length === 0) {
    json.not = {};
    return;
  }
  const vals = [];
  for (const val of def.values) {
    if (val === undefined) {
      if (handleUnrepresentable(schema, ctx, json, params, "Literal `undefined` cannot be represented in JSON Schema"))
        return;
    } else if (typeof val === "bigint") {
      if (handleUnrepresentable(schema, ctx, json, params, "BigInt literals cannot be represented in JSON Schema"))
        return;
      vals.push(Number(val));
    } else {
      vals.push(val);
    }
  }
  if (vals.length === 0) {} else if (vals.length === 1) {
    const val = vals[0];
    json.type = val === null ? "null" : typeof val;
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.enum = [val];
    } else {
      json.const = val;
    }
  } else {
    if (vals.every((v) => typeof v === "number"))
      json.type = "number";
    if (vals.every((v) => typeof v === "string"))
      json.type = "string";
    if (vals.every((v) => typeof v === "boolean"))
      json.type = "boolean";
    if (vals.every((v) => v === null))
      json.type = "null";
    json.enum = vals;
  }
};
var nanProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "NaN cannot be represented in JSON Schema");
};
var templateLiteralProcessor = (schema, _ctx, json, _params) => {
  const _json = json;
  const pattern = schema._zod.pattern;
  if (!pattern)
    throw new Error("Pattern not found in template literal");
  _json.type = "string";
  _json.pattern = pattern.source;
};
var fileProcessor = (schema, _ctx, json, _params) => {
  const _json = json;
  _json.type = "string";
  _json.format = "binary";
  _json.contentEncoding = "binary";
  const { minimum, maximum, mime } = aggregateChecks(schema);
  if (minimum !== undefined)
    _json.minLength = minimum;
  if (maximum !== undefined)
    _json.maxLength = maximum;
  if (!mime)
    return;
  if (mime.length === 0)
    _json.not = {};
  else if (mime.length === 1)
    _json.contentMediaType = mime[0];
  else
    _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
};
var successProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var customProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
};
var functionProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Function types cannot be represented in JSON Schema");
};
var transformProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
};
var mapProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Map cannot be represented in JSON Schema");
};
var setProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Set cannot be represented in JSON Schema");
};
var arrayProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  const { minimum, maximum } = aggregateChecks(schema);
  if (typeof minimum === "number")
    json.minItems = minimum;
  if (typeof maximum === "number")
    json.maxItems = maximum;
  json.type = "array";
  json.items = processSchema(def.element, ctx, {
    ...params,
    path: [...params.path, "items"]
  });
};
function inputOptin(schema) {
  const def = schema._zod.def;
  if (def.type === "pipe" && def.in._zod.traits.has("$ZodTransform")) {
    return inputOptin(def.out);
  }
  if (def.type === "catch") {
    return inputOptin(def.innerType);
  }
  return schema._zod.optin;
}
var objectProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  const shape = def.shape;
  const symbolKeys = Object.getOwnPropertySymbols(shape);
  if (symbolKeys.length && handleUnrepresentable(schema, ctx, json, params, "Symbol keys cannot be represented in JSON Schema")) {
    return;
  }
  json.type = "object";
  json.properties = {};
  for (const key in shape) {
    assignProp(json.properties, key, processSchema(shape[key], ctx, {
      ...params,
      path: [...params.path, "properties", key]
    }));
  }
  const requiredKeys = [];
  for (const key of Object.keys(shape)) {
    const field = def.shape[key];
    if (ctx.io === "input" ? inputOptin(field) === undefined : field._zod.optout === undefined) {
      requiredKeys.push(key);
    }
  }
  if (requiredKeys.length > 0) {
    json.required = requiredKeys;
  }
  if (def.catchall?._zod.def.type === "never") {
    json.additionalProperties = false;
  } else if (!def.catchall) {
    if (ctx.io === "output")
      json.additionalProperties = false;
  } else if (def.catchall) {
    json.additionalProperties = processSchema(def.catchall, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
};
var unionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const isExclusive = def.inclusive === false;
  const options = def.options.map((x, i) => processSchema(x, ctx, {
    ...params,
    path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
  }));
  if (isExclusive) {
    json.oneOf = options;
  } else {
    json.anyOf = options;
  }
};
var intersectionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const a = processSchema(def.left, ctx, {
    ...params,
    path: [...params.path, "allOf", 0]
  });
  const b = processSchema(def.right, ctx, {
    ...params,
    path: [...params.path, "allOf", 1]
  });
  const isSimpleIntersection = (val) => ("allOf" in val) && Object.keys(val).length === 1;
  const allOf = [
    ...isSimpleIntersection(a) ? a.allOf : [a],
    ...isSimpleIntersection(b) ? b.allOf : [b]
  ];
  json.allOf = allOf;
  ctx.intersections.push(allOf);
};
var tupleProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "array";
  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
  const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
  const prefixItems = def.items.map((x, i) => processSchema(x, ctx, {
    ...params,
    path: [...params.path, prefixPath, i]
  }));
  const rest = def.rest ? processSchema(def.rest, ctx, {
    ...params,
    path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
  }) : null;
  let minItems = def.items.length;
  while (minItems > 0) {
    const item = def.items[minItems - 1];
    const optional = ctx.io === "input" ? inputOptin(item) !== undefined : item._zod.optout === "optional";
    if (!optional)
      break;
    minItems--;
  }
  const maxItems = def.items.length;
  const isClosed = !def.rest;
  if (ctx.target === "draft-2020-12") {
    json.prefixItems = prefixItems;
    if (isClosed) {
      json.items = false;
    } else if (rest) {
      json.items = rest;
    }
    if (minItems > 0)
      json.minItems = minItems;
    if (isClosed)
      json.maxItems = maxItems;
  } else if (ctx.target === "openapi-3.0") {
    json.items = {
      anyOf: prefixItems
    };
    if (rest) {
      json.items.anyOf.push(rest);
    }
    if (minItems > 0)
      json.minItems = minItems;
    if (isClosed)
      json.maxItems = maxItems;
  } else {
    json.items = prefixItems;
    if (isClosed) {
      json.additionalItems = false;
    } else if (rest) {
      json.additionalItems = rest;
    }
    if (minItems > 0)
      json.minItems = minItems;
    if (isClosed)
      json.maxItems = maxItems;
  }
  const { minimum, maximum } = aggregateChecks(schema);
  if (typeof minimum === "number")
    json.minItems = minimum;
  if (typeof maximum === "number")
    json.maxItems = maximum;
};
function stringifyKeyNames(bySchema, json, visited) {
  if (json.$ref) {
    if (visited.has(json))
      return json;
    visited.add(json);
    const def = bySchema.get(json)?.def;
    if (!def)
      return json;
    const inlined = stringifyKeyNames(bySchema, def, visited);
    return inlined === def ? json : inlined;
  }
  for (const keyword of ["anyOf", "oneOf"]) {
    const branches = json[keyword];
    if (!Array.isArray(branches))
      continue;
    const mapped = branches.map((branch) => stringifyKeyNames(bySchema, branch, visited));
    if (mapped.some((branch, i) => branch !== branches[i]))
      json = { ...json, [keyword]: mapped };
  }
  const types = Array.isArray(json.type) ? json.type : [json.type];
  const numericType = !types.includes("string") && types.some((t) => t === "number" || t === "integer");
  const values = json.enum ?? (json.const !== undefined ? [json.const] : undefined);
  if (!numericType && !values?.some((v) => typeof v === "number"))
    return json;
  const { minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf, format, id, ...rest } = json;
  if (rest.enum)
    rest.enum = rest.enum.map((v) => typeof v === "number" ? String(v) : v);
  else if (typeof rest.const === "number")
    rest.const = String(rest.const);
  if (!numericType)
    return rest;
  rest.type = "string";
  if (!values)
    rest.pattern = (types.includes("number") ? number : integer).source;
  return rest;
}
var pendingRecords = new WeakMap;
function rewriteKeyNames(ctx) {
  const bySchema = new Map;
  for (const entry of ctx.seen.values()) {
    if (entry.def && !bySchema.has(entry.schema))
      bySchema.set(entry.schema, entry);
  }
  const rewrites = new Map;
  for (const record of pendingRecords.get(ctx) ?? []) {
    const seen = ctx.seen.get(record);
    const names = (seen?.def ?? seen?.schema)?.propertyNames;
    if (!names || names === true || rewrites.has(names))
      continue;
    const rewritten = stringifyKeyNames(bySchema, names, new Set);
    if (rewritten !== names)
      rewrites.set(names, rewritten);
  }
  if (!rewrites.size)
    return;
  for (const entry of ctx.seen.values()) {
    for (const carrier of [entry.schema, entry.def]) {
      const rewritten = carrier && rewrites.get(carrier.propertyNames);
      if (rewritten)
        carrier.propertyNames = rewritten;
    }
  }
}
var recordProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "object";
  const keyType = def.keyType;
  const patterns = aggregateChecks(keyType).patterns;
  if (def.mode === "loose" && patterns && patterns.size > 0) {
    const valueSchema = processSchema(def.valueType, ctx, {
      ...params,
      path: [...params.path, "patternProperties", "*"]
    });
    json.patternProperties = {};
    for (const pattern of patterns) {
      assignProp(json.patternProperties, exactPattern(pattern).source, valueSchema);
    }
  } else {
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json.propertyNames = processSchema(def.keyType, ctx, {
        ...params,
        path: [...params.path, "propertyNames"]
      });
      let pending = pendingRecords.get(ctx);
      if (!pending) {
        pending = [];
        pendingRecords.set(ctx, pending);
        ctx.deferred.push(() => rewriteKeyNames(ctx));
      }
      pending.push(schema);
    }
    json.additionalProperties = processSchema(def.valueType, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
  const keyValues = keyType._zod.values;
  const omittableOnInput = ctx.io === "input" && inputOptin(def.valueType) !== undefined;
  if (keyValues && !def.partial && !omittableOnInput) {
    const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
    if (validKeyValues.length > 0) {
      json.required = validKeyValues.map(String);
    }
  }
};
var nullableProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const inner = processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  if (ctx.target === "openapi-3.0") {
    seen.ref = def.innerType;
    json.nullable = true;
  } else {
    json.anyOf = [inner, { type: "null" }];
  }
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var UNREPRESENTABLE_DEFAULT = Symbol();
function serializeDefaultValue(value, schema, ctx, json, params) {
  let unrepresentable = false;
  const serialized = JSON.stringify(value, (_, val) => {
    if (typeof val !== "bigint")
      return val;
    unrepresentable = true;
    return null;
  });
  if (!unrepresentable)
    return JSON.parse(serialized);
  handleUnrepresentable(schema, ctx, json, params, "BigInt defaults cannot be represented in JSON Schema");
  return UNREPRESENTABLE_DEFAULT;
}
var defaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
  if (value !== UNREPRESENTABLE_DEFAULT)
    json.default = value;
};
var prefaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  if (ctx.io !== "input")
    return;
  const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
  if (value !== UNREPRESENTABLE_DEFAULT)
    json._prefault = value;
};
var catchProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  let catchValue;
  try {
    catchValue = def.catchValue(undefined);
  } catch {
    handleUnrepresentable(schema, ctx, json, params, "Dynamic catch values are not supported in JSON Schema");
    return;
  }
  json.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  const inIsTransform = def.in._zod.traits.has("$ZodTransform");
  const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
  processSchema(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json.readOnly = true;
};
var promiseProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var optionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
  const innerType = schema._zod.innerType;
  processSchema(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var allProcessors = {
  string: stringProcessor,
  number: numberProcessor,
  boolean: booleanProcessor,
  bigint: bigintProcessor,
  symbol: symbolProcessor,
  null: nullProcessor,
  undefined: undefinedProcessor,
  void: voidProcessor,
  never: neverProcessor,
  any: anyProcessor,
  unknown: unknownProcessor,
  date: dateProcessor,
  enum: enumProcessor,
  literal: literalProcessor,
  nan: nanProcessor,
  template_literal: templateLiteralProcessor,
  file: fileProcessor,
  success: successProcessor,
  custom: customProcessor,
  function: functionProcessor,
  transform: transformProcessor,
  map: mapProcessor,
  set: setProcessor,
  array: arrayProcessor,
  object: objectProcessor,
  union: unionProcessor,
  intersection: intersectionProcessor,
  tuple: tupleProcessor,
  record: recordProcessor,
  nullable: nullableProcessor,
  nonoptional: nonoptionalProcessor,
  default: defaultProcessor,
  prefault: prefaultProcessor,
  catch: catchProcessor,
  pipe: pipeProcessor,
  readonly: readonlyProcessor,
  promise: promiseProcessor,
  optional: optionalProcessor,
  lazy: lazyProcessor
};
function toJSONSchema(input, params) {
  if ("_idmap" in input) {
    const registry = input;
    const ctx = initializeContext({ ...params, processors: allProcessors });
    const defs = {};
    for (const entry of registry._idmap.entries()) {
      const [_, schema] = entry;
      processSchema(schema, ctx);
    }
    const schemas = {};
    const external = {
      registry,
      uri: params?.uri,
      defs
    };
    ctx.external = external;
    for (const entry of registry._idmap.entries()) {
      const [key, schema] = entry;
      extractDefs(ctx, schema);
      assignProp(schemas, key, finalize(ctx, schema));
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const ctx = initializeContext({ ...params, processors: allProcessors });
  processSchema(input, ctx);
  extractDefs(ctx, input);
  return finalize(ctx, input);
}
// ../../../../Projects/agentum/node_modules/zod/v4/classic/errors.js
var _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function _lazyMethod(proto, key, make) {
  Object.defineProperty(proto, key, {
    configurable: true,
    enumerable: false,
    get() {
      const value = make(this);
      Object.defineProperty(this, key, { value, configurable: true, writable: true });
      return value;
    },
    set(value) {
      Object.defineProperty(this, key, { value, configurable: true, writable: true });
    }
  });
}
var initializer2 = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  const proto = Object.getPrototypeOf(inst);
  if (_installedErrorProtos.has(proto))
    return;
  _installedErrorProtos.add(proto);
  _lazyMethod(proto, "format", (self) => (mapper) => formatError(self, mapper));
  _lazyMethod(proto, "flatten", (self) => (mapper) => flattenError(self, mapper));
  _lazyMethod(proto, "addIssue", (self) => (issue) => {
    self.issues.push(issue);
    self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
  });
  _lazyMethod(proto, "addIssues", (self) => (issues) => {
    self.issues.push(...issues);
    self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
  });
  Object.defineProperty(proto, "isEmpty", {
    configurable: true,
    enumerable: false,
    get() {
      return this.issues.length === 0;
    }
  });
};
var ZodRealError = /* @__PURE__ */ $constructor("ZodError", initializer2, undefined, {
  Parent: Error
});

// ../../../../Projects/agentum/node_modules/zod/v4/classic/parse.js
var parse2 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode = /* @__PURE__ */ _encode(ZodRealError);
var decode = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// ../../../../Projects/agentum/node_modules/zod/v4/classic/schemas.js
function _ensureDefaultLocale() {
  if (!globalConfig.localeError)
    config(en_default());
}
function _ensureDefaultMemoizer() {
  if (!globalConfig.memoizer)
    config({ memoizer: memoizer() });
}
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  _ensureDefaultLocale();
  $ZodType.init(inst, def);
  inst.def = def;
  inst.type = def.type;
  return inst;
}, {
  check(...chks) {
    const def = this.def;
    return this.clone(mergeDefs(def, {
      checks: [
        ...def.checks ?? [],
        ...chks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
      ]
    }), { parent: true });
  },
  with(...chks) {
    return this.check(...chks);
  },
  clone(def, params) {
    return clone(this, def, params);
  },
  brand() {
    return this;
  },
  register(reg, meta) {
    reg.add(this, meta);
    return this;
  },
  refine(check, params) {
    return this.check(refine(check, params));
  },
  superRefine(refinement, params) {
    return this.check(superRefine(refinement, params));
  },
  overwrite(fn) {
    return this.check(_overwrite(fn));
  },
  optional() {
    return optional(this);
  },
  exactOptional() {
    return exactOptional(this);
  },
  nullable() {
    return nullable(this);
  },
  nullish() {
    return optional(nullable(this));
  },
  nonoptional(params) {
    return nonoptional(this, params);
  },
  array() {
    return array(this);
  },
  or(arg) {
    return union([this, arg]);
  },
  and(arg) {
    return intersection(this, arg);
  },
  transform(tx) {
    return pipe(this, transform(tx));
  },
  default(d) {
    return _default(this, d);
  },
  prefault(d) {
    return prefault(this, d);
  },
  catch(params) {
    return _catch(this, params);
  },
  pipe(target) {
    return pipe(this, target);
  },
  readonly() {
    return readonly(this);
  },
  describe(description) {
    const cl = this.clone();
    globalRegistry.add(cl, { description });
    return cl;
  },
  meta(...args) {
    if (args.length === 0)
      return globalRegistry.get(this);
    const cl = this.clone();
    globalRegistry.add(cl, args[0]);
    return cl;
  },
  isOptional() {
    return this.safeParse(undefined).success;
  },
  isNullable() {
    return this.safeParse(null).success;
  },
  apply(fn, ...args) {
    return args.length === 0 ? fn(this) : fn(this, ...args);
  },
  get "~standard"() {
    return hide(this, "~standard", {
      ...standardProps(this),
      jsonSchema: {
        input: createStandardJSONSchemaMethod(this, "input"),
        output: createStandardJSONSchemaMethod(this, "output")
      }
    });
  },
  set "~standard"(value) {
    own(this, "~standard", value);
  },
  parse: function _parse(data, params) {
    return parse2(this, data, params, { callee: _parse });
  },
  parseAsync: async function _parseAsync(data, params) {
    return await parseAsync(this, data, params, { callee: _parseAsync });
  },
  safeParse(data, params) {
    return safeParse(this, data, params);
  },
  async safeParseAsync(data, params) {
    return safeParseAsync(this, data, params);
  },
  get spa() {
    return this?.safeParseAsync;
  },
  set spa(value) {
    own(this, "spa", value);
  },
  validate(data, params) {
    return validate(this, data, params);
  },
  validateAsync(data, params) {
    return validateAsync(this, data, params);
  },
  encode: function _encode(data, params) {
    return encode(this, data, params, { callee: _encode });
  },
  decode: function _decode(data, params) {
    return decode(this, data, params, { callee: _decode });
  },
  encodeAsync: async function _encodeAsync(data, params) {
    return await encodeAsync(this, data, params, { callee: _encodeAsync });
  },
  decodeAsync: async function _decodeAsync(data, params) {
    return await decodeAsync(this, data, params, { callee: _decodeAsync });
  },
  safeEncode(data, params) {
    return safeEncode(this, data, params);
  },
  safeDecode(data, params) {
    return safeDecode(this, data, params);
  },
  async safeEncodeAsync(data, params) {
    return safeEncodeAsync(this, data, params);
  },
  async safeDecodeAsync(data, params) {
    return safeDecodeAsync(this, data, params);
  },
  toJSONSchema(params) {
    return createToJSONSchemaMethod(this, {})(params);
  },
  get description() {
    return globalRegistry.get(this)?.description;
  },
  get _def() {
    return this._zod.def;
  }
});
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
}, /* @__PURE__ */ derived({
  format: (inst) => aggregateChecks(inst).format ?? null,
  minLength: (inst) => aggregateChecks(inst).minimum ?? null,
  maxLength: (inst) => aggregateChecks(inst).maximum ?? null
}, {
  regex(...args) {
    return this.check(_regex(...args));
  },
  includes(...args) {
    return this.check(_includes(...args));
  },
  startsWith(...args) {
    return this.check(_startsWith(...args));
  },
  endsWith(...args) {
    return this.check(_endsWith(...args));
  },
  min(...args) {
    return this.check(_minLength(...args));
  },
  max(...args) {
    return this.check(_maxLength(...args));
  },
  length(...args) {
    return this.check(_length(...args));
  },
  nonempty(...args) {
    return this.check(_minLength(1, ...args));
  },
  lowercase(params) {
    return this.check(_lowercase(params));
  },
  uppercase(params) {
    return this.check(_uppercase(params));
  },
  trim() {
    return this.check(_trim());
  },
  normalize(...args) {
    return this.check(_normalize(...args));
  },
  toLowerCase() {
    return this.check(_toLowerCase());
  },
  toUpperCase() {
    return this.check(_toUpperCase());
  },
  slugify() {
    return this.check(_slugify());
  }
}));
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
}, {
  email(params) {
    return this.check(_email(ZodEmail, params));
  },
  url(params) {
    return this.check(_url(ZodURL, params));
  },
  jwt(params) {
    return this.check(_jwt(ZodJWT, params));
  },
  emoji(params) {
    return this.check(_emoji2(ZodEmoji, params));
  },
  guid(params) {
    return this.check(_guid(ZodGUID, params));
  },
  uuid(params) {
    return this.check(_uuid(ZodUUID, params));
  },
  uuidv4(params) {
    return this.check(_uuidv4(ZodUUID, params));
  },
  uuidv6(params) {
    return this.check(_uuidv6(ZodUUID, params));
  },
  uuidv7(params) {
    return this.check(_uuidv7(ZodUUID, params));
  },
  nanoid(params) {
    return this.check(_nanoid(ZodNanoID, params));
  },
  cuid(params) {
    return this.check(_cuid(ZodCUID, params));
  },
  cuid2(params) {
    return this.check(_cuid2(ZodCUID2, params));
  },
  ulid(params) {
    return this.check(_ulid(ZodULID, params));
  },
  base64(params) {
    return this.check(_base64(ZodBase64, params));
  },
  base64url(params) {
    return this.check(_base64url(ZodBase64URL, params));
  },
  xid(params) {
    return this.check(_xid(ZodXID, params));
  },
  ksuid(params) {
    return this.check(_ksuid(ZodKSUID, params));
  },
  ipv4(params) {
    return this.check(_ipv4(ZodIPv4, params));
  },
  ipv6(params) {
    return this.check(_ipv6(ZodIPv6, params));
  },
  cidrv4(params) {
    return this.check(_cidrv4(ZodCIDRv4, params));
  },
  cidrv6(params) {
    return this.check(_cidrv6(ZodCIDRv6, params));
  },
  e164(params) {
    return this.check(_e164(ZodE164, params));
  },
  datetime(params) {
    return this.check(_isoDateTime(ZodISODateTime, params));
  },
  date(params) {
    return this.check(_isoDate(ZodISODate, params));
  },
  time(params) {
    return this.check(_isoTime(ZodISOTime, params));
  },
  duration(params) {
    return this.check(_isoDuration(ZodISODuration, params));
  }
});
function string2(params) {
  return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function url(params) {
  return _url(ZodURL, params);
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
  inst.isFinite = true;
}, /* @__PURE__ */ derived({
  minValue: (inst) => {
    const { minimum, exclusiveMinimum } = aggregateChecks(inst);
    return Math.max(minimum ?? Number.NEGATIVE_INFINITY, exclusiveMinimum ?? Number.NEGATIVE_INFINITY);
  },
  maxValue: (inst) => {
    const { maximum, exclusiveMaximum } = aggregateChecks(inst);
    return Math.min(maximum ?? Number.POSITIVE_INFINITY, exclusiveMaximum ?? Number.POSITIVE_INFINITY);
  },
  isInt: (inst) => {
    const { isInt, multipleOf } = aggregateChecks(inst);
    return !!isInt || !!multipleOf?.some(Number.isSafeInteger);
  },
  format: (inst) => aggregateChecks(inst).format ?? null
}, {
  gt(value, params) {
    return this.check(_gt(value, params));
  },
  gte(value, params) {
    return this.check(_gte(value, params));
  },
  min(value, params) {
    return this.check(_gte(value, params));
  },
  lt(value, params) {
    return this.check(_lt(value, params));
  },
  lte(value, params) {
    return this.check(_lte(value, params));
  },
  max(value, params) {
    return this.check(_lte(value, params));
  },
  int(params) {
    return this.check(int(params));
  },
  safe(params) {
    return this.check(int(params));
  },
  positive(params) {
    return this.check(_gt(0, params));
  },
  nonnegative(params) {
    return this.check(_gte(0, params));
  },
  negative(params) {
    return this.check(_lt(0, params));
  },
  nonpositive(params) {
    return this.check(_lte(0, params));
  },
  multipleOf(value, params) {
    return this.check(_multipleOf(value, params));
  },
  step(value, params) {
    return this.check(_multipleOf(value, params));
  },
  finite() {
    return this;
  }
}));
function number2(params) {
  return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean2(params) {
  return _boolean(ZodBoolean, params);
}
var ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => anyProcessor(inst, ctx, json, params);
});
function any() {
  return _any(ZodAny);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unknownProcessor(inst, ctx, json, params);
});
function unknown() {
  return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
  return _never(ZodNever, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
  inst.element = def.element;
}, {
  min(n, params) {
    return this.check(_minLength(n, params));
  },
  nonempty(params) {
    return this.check(_minLength(1, params));
  },
  max(n, params) {
    return this.check(_maxLength(n, params));
  },
  length(n, params) {
    return this.check(_length(n, params));
  },
  unwrap() {
    return this.element;
  }
});
function array(element, params) {
  return _array(ZodArray, element, params);
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
  installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
}, {
  keyof() {
    return _enum(Object.keys(this._zod.def.shape));
  },
  catchall(catchall) {
    return this.clone(mergeDefs(this._zod.def, { catchall }));
  },
  passthrough() {
    return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
  },
  loose() {
    return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
  },
  strict() {
    return this.clone(mergeDefs(this._zod.def, { catchall: never() }));
  },
  strip() {
    return this.clone(mergeDefs(this._zod.def, { catchall: undefined }));
  },
  extend(incoming) {
    return extend(this, incoming);
  },
  safeExtend(incoming) {
    return safeExtend(this, incoming);
  },
  merge(other) {
    return merge(this, other);
  },
  pick(mask) {
    return pick(this, mask);
  },
  omit(mask) {
    return omit(this, mask);
  },
  partial(...args) {
    return partial(ZodOptional, this, args[0]);
  },
  exactPartial(...args) {
    return partial(ZodExactOptional, this, args[0], "exactPartial");
  },
  required(...args) {
    return required(ZodNonOptional, this, args[0]);
  }
});
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...normalizeParams(params)
  };
  return new ZodObject(def);
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right
  });
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
  inst.enum = def.entries;
  inst.options = [...inst._zod.values];
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    }
  });
});
function literal(value, params) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodTransform.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
  inst._zod.parse = (payload, _ctx) => {
    if (_ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        if (!("input" in _issue))
          _issue.input = payload.value;
        _issue.inst ?? (_issue.inst = inst);
        payload.issues.push(issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output) => {
        payload.value = output;
        return payload;
      });
    }
    payload.value = output;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType
  });
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
  $ZodExactOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType
  });
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType
  });
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : constantCatch(catchValue)
  });
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
  });
}
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType
  });
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
  return _superRefine(fn, params);
}
// ../../../../Projects/agentum/node_modules/zod/v4/classic/iso.js
var exports_iso = {};
__export(exports_iso, {
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  date: () => date2,
  datetime: () => datetime2,
  duration: () => duration2,
  time: () => time2
});
function datetime2(params) {
  return _isoDateTime(ZodISODateTime, params);
}
function date2(params) {
  return _isoDate(ZodISODate, params);
}
function time2(params) {
  return _isoTime(ZodISOTime, params);
}
function duration2(params) {
  return _isoDuration(ZodISODuration, params);
}
// ../../agentum-clean-release/agentum/src/domain/company-events.ts
var CompanyEventSchema = object({
  id: string2().min(1),
  source: literal("FR_BODACC"),
  sourceUrl: url().refine((value) => {
    try {
      const url2 = new URL(value);
      return url2.protocol === "https:" && url2.hostname === "www.bodacc.fr";
    } catch {
      return false;
    }
  }),
  publishedAt: exports_iso.date(),
  category: string2().min(1),
  description: string2().min(1),
  companyRegistrationNumber: string2().regex(/^\d{9}$/)
});
var CompanyEventsResultSchema = object({
  status: _enum(["OK", "UNAVAILABLE", "UNSUPPORTED"]),
  source: string2().nullable(),
  events: array(CompanyEventSchema),
  truncated: boolean2(),
  error: string2().optional()
});

// ../../agentum-clean-release/agentum/src/application/entity-service.ts
class EntityApplicationService {
  deps;
  sourceRouter;
  constructor(deps) {
    this.deps = deps;
    this.sourceRouter = new SourceRouter({
      free: this.deps.upstreamProviders,
      paid: this.deps.commercialAggregator,
      timeoutMs: 2200
    });
  }
  async resolveEntity(cmd) {
    const startedAt = Date.now();
    const countryInput = cmd.jurisdiction || cmd.country;
    const requestedJurisdiction = countryInput ? normalizeCountryCode(countryInput) : undefined;
    const classified = classifyQuery(cmd.query, requestedJurisdiction);
    const effectiveJurisdiction = requestedJurisdiction || (classified.type !== "NAME" ? classified.inferredCountry : undefined) || undefined;
    const cleanPart = encodeURIComponent(classified.cleanedValue.toLowerCase());
    const jurPart = encodeURIComponent((effectiveJurisdiction ?? "all").toLowerCase());
    const identityCacheKey = `agentum:identity:v2:${classified.type}:${classified.scheme ?? "legacy"}:${cleanPart}:${jurPart}:${Boolean(cmd.verifyVat)}:${Boolean(cmd.includeParent)}`;
    let candidates = [];
    let best = null;
    let modeUsed = this.deps.config.resolverMode;
    let vatVerification = null;
    let routerAttempts = [];
    let paidUsed = false;
    const cachedIdentity = await this.deps.cacheStore.getCache(identityCacheKey);
    if (cachedIdentity) {
      best = cachedIdentity.best;
      candidates = cachedIdentity.candidates;
      modeUsed = "cache";
      vatVerification = cachedIdentity.vatVerification;
      routerAttempts = cachedIdentity.routerAttempts;
      paidUsed = cachedIdentity.paidUsed;
    } else {
      if (this.deps.config.resolverMode !== "live") {
        if (classified.type !== "NAME") {
          const exact = await this.deps.entityRepo.findByIdentifier(classified.type, classified.cleanedValue, effectiveJurisdiction, classified.scheme);
          if (exact) {
            candidates.push({ ...exact, confidence: 0.99 });
          }
        }
        if (candidates.length === 0) {
          const fuzzy = await this.deps.entityRepo.searchFuzzy(classified.normalizedName, { jurisdiction: effectiveJurisdiction, limit: 5 });
          candidates.push(...fuzzy);
        }
        candidates.sort((a, b) => b.confidence - a.confidence);
      }
      const shouldQueryUpstream = this.deps.config.resolverMode === "live" || this.deps.config.resolverMode === "hybrid" && (candidates.length === 0 || candidates[0].confidence < 0.82);
      if (shouldQueryUpstream) {
        const routerRes = await this.sourceRouter.resolve(classified, {
          jurisdiction: effectiveJurisdiction,
          allowPaidSources: cmd.allowPaidSources
        });
        routerAttempts = routerRes.sourcesTried;
        paidUsed = routerRes.costUsd > 0;
        const upstreamRecords = routerRes.records;
        if (upstreamRecords.length > 0) {
          await this.deps.entityRepo.upsertMany(upstreamRecords);
          candidates = [...candidates, ...upstreamRecords];
        }
      }
      candidates = coalesceRegistryRecords(candidates);
      for (const c of candidates) {
        if (effectiveJurisdiction && normalizeCountryCode(c.jurisdiction) !== normalizeCountryCode(effectiveJurisdiction)) {
          c.confidence = 0;
          continue;
        }
        if (classified.type !== "NAME" && classified.cleanedValue) {
          if (matchesEntityIdentifier(c, classified)) {
            c.confidence = Math.max(c.confidence, 0.95);
          } else {
            c.confidence = Math.min(c.confidence, 0.1);
          }
        } else {
          const queryTerm = classified.normalizedName || classified.cleanedValue || classified.raw;
          const nameSim = Math.max(trigramSimilarity(queryTerm, c.normalizedName), wordTrigramSimilarity(queryTerm, c.normalizedName));
          const aliasSims = (c.aliases || []).map((a) => {
            const { normalizedName: aNorm } = normalizeCompanyName(a);
            return Math.max(trigramSimilarity(queryTerm, aNorm), wordTrigramSimilarity(queryTerm, aNorm));
          });
          const bestSim = Math.max(nameSim, ...aliasSims);
          c.confidence = Math.round(bestSim * 100) / 100;
        }
      }
      candidates.sort((a, b) => b.confidence - a.confidence);
      let ambiguous = false;
      if (classified.type === "NAME" && candidates.length >= 2) {
        const c1 = candidates[0];
        const c2 = candidates[1];
        if (c1 && c2 && c1.confidence - c2.confidence < 0.05) {
          ambiguous = true;
        }
      }
      best = ambiguous ? null : candidates[0] ?? null;
      if (best && best.confidence < 0.6) {
        best = null;
      }
      if (cmd.verifyVat && (best?.vatNumber || classified.type === "EU_VAT")) {
        const vatToVerify = best?.vatNumber ?? classified.cleanedValue;
        try {
          vatVerification = await this.deps.vatValidator.verifyVat(vatToVerify, this.deps.config.viesTimeoutMs);
        } catch (err) {
          vatVerification = {
            valid: false,
            countryCode: vatToVerify.slice(0, 2).toUpperCase(),
            vatNumber: vatToVerify.slice(2),
            fullVat: vatToVerify.toUpperCase(),
            registeredName: null,
            registeredAddress: null,
            checkedAt: new Date().toISOString(),
            source: "EU_VIES",
            error: err instanceof Error ? err.message : String(err)
          };
        }
      }
      if (best !== null) {
        await this.deps.cacheStore.setCache(identityCacheKey, {
          best,
          candidates,
          modeUsed,
          vatVerification,
          routerAttempts,
          paidUsed
        }, 3600);
      }
    }
    let compliance = null;
    if (cmd.checkSanctions !== false) {
      compliance = await this.deps.sanctionsRepo.screen({
        name: best?.canonicalName ?? cmd.query,
        country: best?.jurisdiction ?? cmd.jurisdiction,
        registrationNumber: best?.registrationNumber ?? best?.lei ?? undefined
      });
    }
    let beneficialOwnership;
    if (cmd.includeBeneficialOwners && best) {
      const adapter = (this.deps.beneficialOwnershipAdapters ?? []).find((a) => a.supportsEntity(best));
      if (!adapter) {
        beneficialOwnership = { status: "UNSUPPORTED", source: null, ownerCount: 0 };
      } else {
        try {
          const owners = await adapter.listBeneficialOwners(best, 2200);
          best = { ...best, beneficialOwners: owners };
          beneficialOwnership = { status: "OK", source: adapter.sourceName, ownerCount: owners.length };
        } catch (err) {
          beneficialOwnership = {
            status: "UNAVAILABLE",
            source: adapter.sourceName,
            ownerCount: 0,
            error: err instanceof Error ? err.message : String(err)
          };
        }
      }
    }
    let companyEvents;
    if (cmd.includeCompanyEvents) {
      const adapter = best && this.deps.companyEventsAdapters?.find((a) => a.supportsEntity(best));
      if (!adapter || !best) {
        companyEvents = { status: "UNSUPPORTED", source: null, events: [], truncated: false };
      } else {
        try {
          companyEvents = CompanyEventsResultSchema.parse(await adapter.listEvents(best, 2200));
        } catch {
          companyEvents = { status: "UNAVAILABLE", source: null, events: [], truncated: false, error: "COMPANY_EVENTS_UNAVAILABLE" };
        }
      }
    }
    const targetCountry = effectiveJurisdiction || classified.inferredCountry || "XX";
    const profile = getCountryProfile(targetCountry);
    const isResolved = best !== null && best.confidence >= 0.6;
    const result = {
      resolved: isResolved,
      confidence: best ? best.confidence : 0,
      queryType: classified.type,
      modeUsed,
      entity: best,
      compliance,
      vatVerification,
      candidates,
      coverage: {
        country: profile.iso2,
        level: profile.coverage,
        sourcesTried: routerAttempts,
        paidSourceUsed: paidUsed
      },
      ...beneficialOwnership ? { beneficialOwnership } : {},
      ...companyEvents ? { companyEvents } : {},
      latencyMs: Math.max(1, Date.now() - startedAt)
    };
    return result;
  }
  async verifyVat(input) {
    const normalized = input.vatNumber.replace(/\s+/g, "").toUpperCase();
    const cacheKey = `agentum:vat:v1:${normalized}`;
    const cached = await this.deps.cacheStore.getCache(cacheKey);
    if (cached) {
      return { ...cached, source: "CACHE" };
    }
    const res = await this.deps.vatValidator.verifyVat(input.vatNumber, this.deps.config.viesTimeoutMs);
    let linkedEntity = await this.deps.entityRepo.findByIdentifier("EU_VAT", res.fullVat);
    if (!linkedEntity && res.registeredName) {
      const fuzzy = await this.deps.entityRepo.searchFuzzy(normalizeCompanyName(res.registeredName).normalizedName, { jurisdiction: res.countryCode, limit: 1 });
      linkedEntity = fuzzy[0] ?? null;
    }
    const result = {
      ...res,
      linkedEntity: linkedEntity ?? null
    };
    await this.deps.cacheStore.setCache(cacheKey, result, 3600);
    return result;
  }
  async screenSanctions(input) {
    return this.deps.sanctionsRepo.screen(input);
  }
  async checkVendor(cmd) {
    const auditTrail = [];
    const evaluatedAt = new Date().toISOString();
    auditTrail.push(`[1/3] Initiating automated KYB due diligence for '${cmd.name}' (${cmd.country ?? "Global"})...`);
    const entityPromise = this.resolveEntity({
      query: cmd.registrationNumber || cmd.name,
      jurisdiction: cmd.country,
      country: cmd.country
    });
    const vatPromise = cmd.vatNumber ? this.verifyVat({ vatNumber: cmd.vatNumber }) : Promise.resolve(null);
    const sanctionsPromise = this.screenSanctions({
      name: cmd.name,
      country: cmd.country,
      registrationNumber: cmd.registrationNumber
    });
    const [entityRes, vatRes, sanctionsRes] = await Promise.all([
      entityPromise,
      vatPromise,
      sanctionsPromise
    ]);
    const entity = entityRes.entity;
    if (entityRes.resolved && entity) {
      auditTrail.push(`      \u2713 Entity Resolved: '${entity.canonicalName}' (${entity.jurisdiction}) | Primary ID: ${entity.primaryIdValue} (${entity.primaryIdType})`);
      if (entity.lei)
        auditTrail.push(`      \u2713 GLEIF LEI: ${entity.lei}`);
    } else {
      auditTrail.push(`      \u26A0\uFE0F Entity resolution yielded no exact match (confidence=${entityRes.confidence})`);
    }
    let vatValid = null;
    let vatOwnershipMismatch = false;
    let vatOwnershipConfirmed = false;
    if (vatRes) {
      vatValid = vatRes.valid;
      auditTrail.push(`[2/3] EU VIES VAT Check '${cmd.vatNumber}': ${vatValid ? "VALID (registered)" : "INVALID / UNCONFIRMED"}`);
      if (vatValid && entity) {
        const entityVat = entity.vatNumber?.replace(/\s+/g, "").toUpperCase();
        const inputVat = cmd.vatNumber?.replace(/\s+/g, "").toUpperCase();
        if (entityVat && inputVat && entityVat === inputVat) {
          vatOwnershipConfirmed = true;
          auditTrail.push(`      \u2713 VAT Ownership Confirmed: Entity record contains registered VAT '${inputVat}'`);
        } else if (vatRes.linkedEntity) {
          const isSameEntity = Boolean(entity.id) && vatRes.linkedEntity.id === entity.id || vatRes.linkedEntity.jurisdiction === entity.jurisdiction && vatRes.linkedEntity.primaryIdType === entity.primaryIdType && vatRes.linkedEntity.primaryIdValue === entity.primaryIdValue;
          if (isSameEntity) {
            vatOwnershipConfirmed = true;
            auditTrail.push(`      \u2713 VAT Ownership Confirmed: Linked entity matches resolved entity (${entity.canonicalName})`);
          } else {
            vatOwnershipMismatch = true;
            auditTrail.push(`      \uD83D\uDEA8 VAT OWNERSHIP MISMATCH: VAT '${cmd.vatNumber}' is registered to '${vatRes.linkedEntity.canonicalName}' (${vatRes.linkedEntity.primaryIdValue}), NOT '${entity.canonicalName}'`);
          }
        } else if (vatRes.registeredName) {
          const sim = trigramSimilarity(vatRes.registeredName, entity.canonicalName);
          if (sim >= 0.6) {
            vatOwnershipConfirmed = true;
            auditTrail.push(`      \u2713 VAT Ownership Confirmed via registered name similarity (${Math.round(sim * 100)}%)`);
          } else if (sim < 0.3) {
            vatOwnershipMismatch = true;
            auditTrail.push(`      \uD83D\uDEA8 VAT OWNERSHIP MISMATCH: VAT '${cmd.vatNumber}' registered name '${vatRes.registeredName}' does not match '${entity.canonicalName}' (similarity ${Math.round(sim * 100)}%)`);
          }
        }
      }
    } else {
      auditTrail.push(`[2/3] VAT Check: Skipped (no EU VAT number provided)`);
    }
    const canonicalSanctions = entityRes.compliance;
    const suppliedHit = sanctionsRes.sanctioned === true;
    const canonicalHit = canonicalSanctions?.sanctioned === true;
    const sanctionsHit = suppliedHit || canonicalHit;
    if (canonicalHit) {
      auditTrail.push(`[3/3] \uD83D\uDEA8 SANCTIONS HIT ON RESOLVED ENTITY: '${entity?.canonicalName}' matches list(s): ${canonicalSanctions?.matchedLists.join(", ")}`);
    }
    if (suppliedHit) {
      auditTrail.push(`[3/3] \uD83D\uDEA8 SANCTIONS HIT ON SUPPLIED VENDOR NAME: '${cmd.name}' matches list(s): ${sanctionsRes.matchedLists.join(", ")}`);
    }
    if (!sanctionsHit) {
      auditTrail.push(`[3/3] Sanctions Screening (OFAC/EU/UN): \u2705 CLEAR (riskLevel=${sanctionsRes.riskLevel})`);
    }
    const sanctionsDegraded = Boolean(sanctionsRes.degraded || canonicalSanctions?.degraded);
    const degradedReason = sanctionsRes.degradedReason || canonicalSanctions?.degradedReason;
    const allMatches = [...sanctionsRes.matches, ...canonicalSanctions?.matches ?? []];
    const allMatchedLists = Array.from(new Set([...sanctionsRes.matchedLists, ...canonicalSanctions?.matchedLists ?? []]));
    const maxMatchScore = Math.max(sanctionsRes.matchScore, canonicalSanctions?.matchScore ?? 0);
    const combinedSanctions = {
      sanctioned: sanctionsHit,
      riskLevel: sanctionsHit ? maxMatchScore >= 0.95 ? "EXACT_MATCH" : "POTENTIAL_MATCH" : sanctionsDegraded ? "UNKNOWN" : sanctionsRes.riskLevel === "POTENTIAL_MATCH" || canonicalSanctions?.riskLevel === "POTENTIAL_MATCH" ? "POTENTIAL_MATCH" : "CLEAR",
      matchScore: maxMatchScore,
      matchedLists: allMatchedLists,
      matches: allMatches,
      degraded: sanctionsDegraded,
      degradedReason,
      coverage: sanctionsRes.coverage || canonicalSanctions?.coverage
    };
    let verdict = "APPROVED";
    let riskLevel = "CLEAR";
    if (sanctionsHit) {
      verdict = "REJECTED";
      riskLevel = "CRITICAL";
      auditTrail.push(`[VERDICT] \u274C REJECTED due to sanctions match on lists: ${allMatchedLists.join(", ")}`);
    } else if (sanctionsDegraded) {
      verdict = "FLAGGED_FOR_REVIEW";
      riskLevel = "HIGH_RISK";
      auditTrail.push(`[VERDICT] \u26A0\uFE0F FLAGGED_FOR_REVIEW: Sanctions screening is in degraded mode (${degradedReason ?? "coverage threshold unmet"}). Unqualified approval is prohibited.`);
    } else if (entity && entity.status && ["INACTIVE", "DISSOLVED", "LIQUIDATING"].includes(entity.status)) {
      verdict = "FLAGGED_FOR_REVIEW";
      riskLevel = "HIGH_RISK";
      auditTrail.push(`[VERDICT] \u26A0\uFE0F FLAGGED_FOR_REVIEW: Corporate entity status is '${entity.status}' (not active). Verification cannot be approved.`);
    } else if (entity && (!entity.status || entity.status === "UNKNOWN")) {
      verdict = "FLAGGED_FOR_REVIEW";
      riskLevel = "MEDIUM_RISK";
      auditTrail.push(`[VERDICT] \u26A0\uFE0F FLAGGED_FOR_REVIEW: Corporate entity status is 'UNKNOWN' (standing unverified). Unqualified approval is prohibited.`);
    } else if (vatOwnershipMismatch) {
      verdict = "FLAGGED_FOR_REVIEW";
      riskLevel = "HIGH_RISK";
      auditTrail.push(`[VERDICT] \u26A0\uFE0F FLAGGED_FOR_REVIEW: EU VAT number belongs to a different entity than the resolved vendor.`);
    } else if (vatValid === false) {
      verdict = "FLAGGED_FOR_REVIEW";
      riskLevel = "HIGH_RISK";
      auditTrail.push(`[VERDICT] \u26A0\uFE0F FLAGGED_FOR_REVIEW: EU VAT number was rejected or unconfirmed by VIES`);
    } else if (vatValid === true && !vatOwnershipConfirmed) {
      verdict = "FLAGGED_FOR_REVIEW";
      riskLevel = "MEDIUM_RISK";
      auditTrail.push(`[VERDICT] \u26A0\uFE0F FLAGGED_FOR_REVIEW: VAT registration is valid, but ownership by this vendor is unconfirmed.`);
    } else if (!entityRes.resolved || entityRes.confidence < 0.7) {
      verdict = "FLAGGED_FOR_REVIEW";
      riskLevel = "MEDIUM_RISK";
      auditTrail.push(`[VERDICT] \u26A0\uFE0F FLAGGED_FOR_REVIEW: Corporate entity identity resolution confidence is low (${Math.round(entityRes.confidence * 100)}%)`);
    } else if (combinedSanctions.riskLevel === "POTENTIAL_MATCH") {
      verdict = "FLAGGED_FOR_REVIEW";
      riskLevel = "MEDIUM_RISK";
      auditTrail.push(`[VERDICT] \u26A0\uFE0F FLAGGED_FOR_REVIEW: Near-threshold fuzzy sanctions similarity match requiring compliance review`);
    } else {
      verdict = "APPROVED";
      riskLevel = "CLEAR";
      auditTrail.push(`[VERDICT] \u2705 APPROVED: Verified corporate entity, clean sanctions record, valid VAT status`);
    }
    const baseConfidence = entityRes.confidence || 0.5;
    const vatBonus = vatOwnershipMismatch ? -0.3 : vatOwnershipConfirmed ? 0.1 : vatValid === false ? -0.2 : 0;
    const confidence = Math.min(1, Math.max(0, baseConfidence + vatBonus));
    return {
      vendorName: cmd.name,
      verdict,
      riskLevel,
      confidence,
      sanctionsHit,
      vatValid,
      entity,
      vatVerification: vatRes,
      sanctionsScreening: combinedSanctions,
      auditTrail,
      evaluatedAt
    };
  }
  async verifyBankPayee(cmd) {
    const base = verifyBankPayee(cmd);
    if (!base.valid) {
      return base;
    }
    if (cmd.payeeTaxId && this.deps.bankOwnershipAdapters && this.deps.bankOwnershipAdapters.length > 0) {
      const adapter = this.deps.bankOwnershipAdapters.find((a) => a.supports(base.countryCode));
      if (adapter) {
        try {
          const res = await adapter.verify(base.normalizedIban, cmd.payeeTaxId);
          if (res.matched === true) {
            return {
              ...base,
              ownershipVerified: true,
              ownershipSource: adapter.sourceName
            };
          } else if (res.matched === false) {
            return {
              ...base,
              valid: false,
              ownershipVerified: false,
              ownershipSource: adapter.sourceName,
              issues: [
                ...base.issues,
                `Bank account '${base.normalizedIban}' is not registered to taxpayer '${cmd.payeeTaxId}' in official ${adapter.sourceName} register`
              ]
            };
          } else {
            return {
              ...base,
              ownershipVerified: null,
              ownershipSource: adapter.sourceName
            };
          }
        } catch {
          return {
            ...base,
            ownershipVerified: null,
            ownershipSource: adapter.sourceName
          };
        }
      }
    }
    return {
      ...base,
      ownershipVerified: null,
      ownershipSource: null
    };
  }
  async batchResolve(cmd) {
    const startedAt = Date.now();
    const promises = cmd.items.map(async (item) => {
      try {
        const country = item.country || item.jurisdiction;
        const res = await this.resolveEntity({
          query: item.query,
          country,
          jurisdiction: country
        });
        return {
          query: item.query,
          country,
          resolved: res.resolved,
          entity: res.entity,
          confidence: res.confidence
        };
      } catch (err) {
        return {
          query: item.query,
          country: item.country || item.jurisdiction,
          resolved: false,
          entity: null,
          confidence: 0,
          error: err?.message || "Internal resolution error"
        };
      }
    });
    const results = await Promise.all(promises);
    const resolvedCount = results.filter((r) => r.resolved).length;
    const unresolvedCount = results.length - resolvedCount;
    return {
      total: results.length,
      resolvedCount,
      unresolvedCount,
      results,
      durationMs: Math.max(1, Date.now() - startedAt)
    };
  }
}

// ../../agentum-clean-release/agentum/src/application/tool-registry.ts
function defineTool(def) {
  return def;
}

class ToolRegistry {
  toolsById = new Map;
  toolsByMcpName = new Map;
  register(tool) {
    this.toolsById.set(tool.id, tool);
    this.toolsByMcpName.set(tool.mcpName, tool);
  }
  getAll() {
    return Array.from(this.toolsById.values());
  }
  getById(id) {
    return this.toolsById.get(id);
  }
  getByMcpName(mcpName) {
    return this.toolsByMcpName.get(mcpName);
  }
  toJsonSchema(schema) {
    if (typeof toJSONSchema === "function") {
      const raw = toJSONSchema(schema);
      const { $schema: _ignored, "~standard": _std, ...rest } = raw;
      return rest;
    }
    return { type: "object" };
  }
}

// ../../agentum-clean-release/agentum/src/domain/entity.ts
var IdentifierTypeSchema = _enum([
  "LEI",
  "EU_VAT",
  "LT_JAR",
  "US_CIK",
  "US_EIN",
  "UK_CRN",
  "CH_UID",
  "AU_ABN",
  "AU_ACN",
  "SG_UEN",
  "NATIONAL_ID",
  "DOMAIN",
  "NAME"
]);
var ClassifiedQuerySchema = object({
  raw: string2(),
  type: IdentifierTypeSchema,
  scheme: string2().optional(),
  cleanedValue: string2(),
  normalizedName: string2(),
  detectedLegalForm: string2().nullable(),
  inferredCountry: string2().nullable()
});
var AddressRecordSchema = object({
  street: string2().optional(),
  city: string2().optional(),
  postalCode: string2().optional(),
  region: string2().optional(),
  country: string2()
});
var EntityDataSourceRefSchema = object({
  source: string2(),
  sourceId: string2(),
  fetchedAt: string2()
});
var PrimaryIdTypeSchema = _enum([
  "LEI",
  "LT_JAR",
  "US_CIK",
  "US_EIN",
  "EU_VAT",
  "NATIONAL_REG"
]);
var EntityStatusSchema = _enum([
  "ACTIVE",
  "INACTIVE",
  "DISSOLVED",
  "LIQUIDATING",
  "UNKNOWN"
]);
var OfficerRecordSchema = object({
  name: string2(),
  role: string2(),
  appointedOn: string2().optional(),
  resignedOn: string2().optional(),
  nationality: string2().optional(),
  occupation: string2().optional()
});
var BeneficialOwnerRecordSchema = object({
  name: string2(),
  kind: _enum(["INDIVIDUAL", "CORPORATE", "LEGAL_PERSON", "PROTECTED", "UNKNOWN"]),
  naturesOfControl: array(string2()),
  notifiedOn: string2().optional(),
  ceasedOn: string2().optional(),
  nationality: string2().optional(),
  countryOfResidence: string2().optional(),
  birthYearMonth: string2().optional(),
  registrationNumber: string2().optional(),
  countryRegistered: string2().optional(),
  legalForm: string2().optional(),
  source: string2()
});
var CanonicalEntityRecordSchema = object({
  id: string2().optional(),
  canonicalName: string2(),
  normalizedName: string2(),
  jurisdiction: string2(),
  region: _enum(["EU", "US", "OTHER"]),
  primaryIdType: PrimaryIdTypeSchema,
  primaryIdValue: string2(),
  lei: string2().nullable(),
  registrationNumber: string2().nullable(),
  registrationAuthority: string2().nullable(),
  vatNumber: string2().nullable(),
  vatValid: boolean2().nullable(),
  taxId: string2().nullable(),
  cik: string2().nullable(),
  tickers: array(string2()),
  legalForm: string2().nullable(),
  status: EntityStatusSchema,
  incorporationDate: string2().nullable(),
  legalAddress: AddressRecordSchema.nullable(),
  headquartersAddress: AddressRecordSchema.nullable(),
  parentLei: string2().nullable(),
  ultimateParentLei: string2().nullable(),
  domains: array(string2()),
  aliases: array(string2()),
  sources: array(EntityDataSourceRefSchema),
  confidence: number2().min(0).max(1),
  officers: array(OfficerRecordSchema).optional(),
  beneficialOwners: array(BeneficialOwnerRecordSchema).optional()
});
var VatVerificationResultSchema = object({
  valid: boolean2(),
  countryCode: string2(),
  vatNumber: string2(),
  fullVat: string2(),
  registeredName: string2().nullable(),
  registeredAddress: string2().nullable(),
  checkedAt: string2(),
  source: _enum(["EU_VIES", "CACHE", "SYNTAX_ONLY"]),
  error: string2().optional()
});
var SanctionsEntrySchema = object({
  listSource: _enum(["OFAC_SDN", "EU_FSF", "UN_SC", "UK_FCDO"]),
  externalId: string2(),
  primaryName: string2(),
  aliases: array(string2()),
  entityType: _enum(["ENTITY", "INDIVIDUAL", "VESSEL", "AIRCRAFT"]),
  countries: array(string2()),
  programs: array(string2()),
  identifiers: array(string2()),
  remarks: string2().optional()
});
var SanctionsMatchSchema = object({
  listSource: _enum(["OFAC_SDN", "EU_FSF", "UN_SC", "UK_FCDO"]),
  externalId: string2(),
  primaryName: string2(),
  entityType: string2(),
  programs: array(string2()),
  score: number2(),
  remarks: string2().optional()
});
var SanctionsScreenResultSchema = object({
  sanctioned: boolean2(),
  riskLevel: _enum(["CLEAR", "POTENTIAL_MATCH", "EXACT_MATCH", "UNKNOWN"]),
  matchScore: number2(),
  matchedLists: array(string2()),
  matches: array(SanctionsMatchSchema),
  degraded: boolean2().default(false),
  degradedReason: string2().optional(),
  coverage: object({
    recordCount: number2(),
    sourcesScreened: array(string2()),
    lastSyncAt: string2().nullable().optional()
  }).optional()
});
var ResolveEntityCommandSchema = object({
  query: string2().min(1).describe("Company name, domain, or registration number (LEI, CIK, EIN, UK Company No, Swiss UID, ABN/ACN, UEN, JAR, VAT)"),
  jurisdiction: string2().optional().describe("Optional 2-letter ISO country code (e.g. GB, CH, AU, SG, US, LT, DE) or auto-detected"),
  country: string2().optional().describe("Alias for jurisdiction"),
  verifyVat: boolean2().optional().describe("Verify EU VAT number against live VIES if available"),
  includeParent: boolean2().optional().describe("Include parent and ultimate parent LEI relationships"),
  checkSanctions: boolean2().optional().describe("Cross-screen entity against OFAC SDN, EU FSF, UN SC and UK FCDO sanctions lists (default true)"),
  includeOfficers: boolean2().optional().describe("Include corporate directors, executives, and officers when available"),
  includeBeneficialOwners: boolean2().optional().describe("Include current beneficial owners (e.g. UK Persons with Significant Control) when available"),
  includeCompanyEvents: boolean2().optional().describe("Include recent official company notices where available (France BODACC); dated evidence, not a current-status or ownership verdict"),
  allowPaidSources: boolean2().optional().describe("Allow fallback to commercial paid aggregators when official registries are paywalled or unavailable")
});
var ResolveEntityResultSchema = object({
  resolved: boolean2(),
  confidence: number2(),
  queryType: IdentifierTypeSchema,
  modeUsed: _enum(["local", "hybrid", "live", "cache"]),
  entity: CanonicalEntityRecordSchema.nullable(),
  compliance: SanctionsScreenResultSchema.nullable(),
  vatVerification: VatVerificationResultSchema.nullable(),
  candidates: array(CanonicalEntityRecordSchema),
  coverage: object({
    country: string2(),
    level: string2(),
    sourcesTried: array(any()),
    paidSourceUsed: boolean2()
  }).optional(),
  beneficialOwnership: object({
    status: _enum(["OK", "UNAVAILABLE", "UNSUPPORTED"]),
    source: string2().nullable(),
    ownerCount: number2(),
    error: string2().optional()
  }).optional(),
  companyEvents: CompanyEventsResultSchema.optional(),
  latencyMs: number2()
});
var VerifyVatCommandSchema = object({
  vatNumber: string2().min(4).describe("EU VAT number including 2-letter country prefix (e.g. 'LT100004278519')")
});
var VerifyVatResultSchema = VatVerificationResultSchema.extend({
  linkedEntity: CanonicalEntityRecordSchema.nullable()
});
var ScreenSanctionsCommandSchema = object({
  name: string2().min(1).describe("Entity or individual name to screen"),
  country: string2().optional().describe("Optional 2-letter ISO country code"),
  registrationNumber: string2().optional().describe("Optional company registration, LEI, or tax ID"),
  threshold: number2().min(0.1).max(1).optional().describe("Trigram similarity threshold (default 0.75)")
});
var CheckVendorCommandSchema = object({
  name: string2().min(1).describe("Legal or trade name of the vendor/counterparty"),
  country: string2().optional().describe("2-letter ISO country code (e.g. 'DE', 'GB', 'US', 'CH', 'AU', 'SG')"),
  vatNumber: string2().optional().describe("EU VAT number with 2-letter country prefix (e.g. 'DE129274202')"),
  registrationNumber: string2().optional().describe("National registration number (CRN, UID, ABN, UEN, CIK, or LEI)"),
  domain: string2().optional().describe("Vendor primary web domain (e.g. 'siemens.com')")
});
var CheckVendorResultSchema = object({
  vendorName: string2(),
  verdict: _enum(["APPROVED", "FLAGGED_FOR_REVIEW", "REJECTED"]),
  riskLevel: _enum(["CLEAR", "LOW_RISK", "MEDIUM_RISK", "HIGH_RISK", "CRITICAL"]),
  confidence: number2(),
  sanctionsHit: boolean2(),
  vatValid: boolean2().nullable(),
  entity: CanonicalEntityRecordSchema.nullable(),
  vatVerification: VatVerificationResultSchema.nullable(),
  sanctionsScreening: SanctionsScreenResultSchema.nullable(),
  auditTrail: array(string2()),
  evaluatedAt: string2()
});
var VerifyBankPayeeCommandSchema = object({
  iban: string2().min(10).describe("International Bank Account Number (IBAN), spaces permitted"),
  expectedCountry: string2().optional().describe("Expected 2-letter ISO country code of the payee/vendor (e.g. 'DE')"),
  payeeName: string2().optional().describe("Optional legal payee name to cross-check against bank account jurisdiction"),
  payeeTaxId: string2().optional().describe("National tax/business registration number (e.g. Polish NIP or Czech I\u010CO) to verify account ownership against official public registers")
});
var VerifyBankPayeeResultSchema = object({
  valid: boolean2(),
  normalizedIban: string2(),
  countryCode: string2(),
  bankCode: string2().nullable(),
  checksumValid: boolean2(),
  countryMatch: boolean2().nullable(),
  expectedLength: number2().nullable(),
  actualLength: number2(),
  ownershipVerified: boolean2().nullable().optional(),
  ownershipSource: string2().nullable().optional(),
  issues: array(string2()),
  checkedAt: string2()
});
var BatchResolveItemSchema = object({
  query: string2().min(1).describe("Company name, domain, or registration number"),
  country: string2().optional().describe("Optional 2-letter ISO country code"),
  jurisdiction: string2().optional().describe("Alias for country")
});
var BatchResolveCommandSchema = object({
  items: array(BatchResolveItemSchema).min(1).max(25).describe("List of entities to resolve (1 to 25 items)")
});
var BatchResolveResultSchema = object({
  total: number2(),
  resolvedCount: number2(),
  unresolvedCount: number2(),
  results: array(object({
    query: string2(),
    country: string2().optional(),
    resolved: boolean2(),
    entity: CanonicalEntityRecordSchema.nullable(),
    confidence: number2(),
    error: string2().optional()
  })),
  durationMs: number2()
});

// ../../agentum-clean-release/agentum/src/application/tools/entity.tools.ts
function registerEntityTools(registry, service, config) {
  registry.register(defineTool({
    id: "entity.resolve",
    mcpName: "resolve_entity",
    httpMethod: "POST",
    httpPath: "/v1/entity/resolve",
    category: "entity",
    summary: "Deterministic Global Corporate Entity & Registry Resolver",
    description: "Deterministic Global Corporate Entity & Registry Resolver. Resolves official national corporate registry records, company status, and business identifiers worldwide across primary commercial jurisdictions (including US, UK, EU-27, Switzerland, Singapore, and global LEI). Accepts company names, domains, or national registration numbers with optional ISO country code.",
    priceUsd: config.priceEntityResolveUsd,
    inputSchema: ResolveEntityCommandSchema,
    outputSchema: ResolveEntityResultSchema,
    handler: (input) => service.resolveEntity(input)
  }));
  registry.register(defineTool({
    id: "entity.vat_verify",
    mcpName: "verify_eu_vat",
    httpMethod: "POST",
    httpPath: "/v1/entity/vat-verify",
    category: "compliance",
    summary: "Verify EU VAT registration status via VIES",
    description: "Validates European Union VAT identification numbers against the live official EU VIES system, linking against known company profiles.",
    priceUsd: config.priceVatVerifyUsd,
    inputSchema: VerifyVatCommandSchema,
    outputSchema: VerifyVatResultSchema,
    handler: (input) => service.verifyVat(input)
  }));
  registry.register(defineTool({
    id: "entity.sanctions_screen",
    mcpName: "screen_sanctions",
    httpMethod: "POST",
    httpPath: "/v1/entity/sanctions-screen",
    category: "compliance",
    summary: "Screen entity or individual against global sanctions lists",
    description: "Performs fuzzy and exact sanctions screening against OFAC SDN and EU Financial Sanctions with configurable similarity thresholds.",
    priceUsd: config.priceSanctionsCheckUsd,
    inputSchema: ScreenSanctionsCommandSchema,
    outputSchema: SanctionsScreenResultSchema,
    handler: (input) => service.screenSanctions(input)
  }));
  registry.register(defineTool({
    id: "compliance.check_vendor",
    mcpName: "check_vendor",
    httpMethod: "POST",
    httpPath: "/v1/compliance/check-vendor",
    category: "compliance",
    summary: "All-in-one 1-shot vendor KYB due diligence & compliance verdict",
    description: "Composite autonomous KYB vendor due diligence tool. Concurrently resolves corporate identity across global registers, validates European Commission VIES VAT numbers, and screens global sanctions (OFAC/EU/UN). Returns a definitive compliance verdict (APPROVED, FLAGGED_FOR_REVIEW, or REJECTED) with a full audit trail in a single round trip.",
    priceUsd: config.priceCheckVendorUsd,
    inputSchema: CheckVendorCommandSchema,
    outputSchema: CheckVendorResultSchema,
    handler: (input) => service.checkVendor(input)
  }));
  registry.register(defineTool({
    id: "compliance.verify_bank_payee",
    mcpName: "verify_bank_payee",
    httpMethod: "POST",
    httpPath: "/v1/compliance/verify-bank-payee",
    category: "compliance",
    summary: "Verify SEPA / international IBAN format, checksum, and country alignment",
    description: "Validates International Bank Account Numbers (IBAN) using ISO 13616 specifications and MOD-97 checksum validation. Verifies whether the issuing country matches the expected corporate jurisdiction to prevent invoice fraud and redirection attacks.",
    priceUsd: config.priceVerifyBankPayeeUsd,
    inputSchema: VerifyBankPayeeCommandSchema,
    outputSchema: VerifyBankPayeeResultSchema,
    handler: (input) => service.verifyBankPayee(input)
  }));
  registry.register(defineTool({
    id: "entity.batch_resolve",
    mcpName: "batch_resolve",
    httpMethod: "POST",
    httpPath: "/v1/entity/batch-resolve",
    category: "entity",
    summary: "Batch resolve multiple corporate entities concurrently (up to 25)",
    description: "Concurrently resolves multiple corporate entity names, registration numbers, or domains across national registries. Optimized for agent data pipelines, CSV processing, and batch supplier onboarding.",
    priceUsd: config.priceBatchResolveUsd,
    inputSchema: BatchResolveCommandSchema,
    outputSchema: BatchResolveResultSchema,
    handler: (input) => service.batchResolve(input)
  }));
}

// ../../agentum-clean-release/agentum/src/config.ts
function parseRole(raw) {
  if (raw === "api" || raw === "worker" || raw === "all")
    return raw;
  return "all";
}
function parseResolverMode(raw) {
  if (raw === "hybrid" || raw === "local" || raw === "live")
    return raw;
  return "hybrid";
}
function parsePaymentMode(raw, nodeEnv) {
  if (raw === "live" || raw === "sandbox")
    return raw;
  return nodeEnv === "production" ? "live" : "sandbox";
}
function parseBoolFlag(raw, defaultValue) {
  if (raw === undefined || raw === "")
    return defaultValue;
  return raw.toLowerCase() === "true" || raw === "1";
}
function loadConfig(env = process.env) {
  const nodeEnv = env.NODE_ENV ?? "development";
  const paymentMode = parsePaymentMode(env.PAYMENT_MODE, nodeEnv);
  const isLive = paymentMode === "live";
  const quotaLimit = Number(env.FREE_CALLS_PER_DAY || "5");
  return {
    port: Number.parseInt(env.PORT ?? "3000", 10) || 3000,
    nodeEnv,
    serviceRole: parseRole(env.SERVICE_ROLE),
    resolverMode: parseResolverMode(env.RESOLVER_MODE),
    paymentMode,
    featureStrictPayments: parseBoolFlag(env.FEATURE_STRICT_PAYMENTS, isLive),
    featureReplayProtection: parseBoolFlag(env.FEATURE_REPLAY_PROTECTION, isLive),
    featureLiveStripeVerify: parseBoolFlag(env.FEATURE_LIVE_STRIPE_VERIFY, isLive),
    featureSanctionsWordMatch: parseBoolFlag(env.FEATURE_SANCTIONS_WORD_MATCH, true),
    publicBaseUrl: (env.PUBLIC_BASE_URL ?? "http://localhost:3000").replace(/\/+$/, ""),
    databaseUrl: env.DATABASE_URL ?? "",
    redisUrl: env.REDIS_URL ?? "",
    freeCallsPerDay: Number.isSafeInteger(quotaLimit) && quotaLimit >= 0 ? quotaLimit : 5,
    priceEntityResolveUsd: env.PRICE_ENTITY_RESOLVE_USD ?? "0.005",
    priceEntityResolvePaidUsd: env.PRICE_ENTITY_RESOLVE_PAID_USD ?? "0.050",
    priceVatVerifyUsd: env.PRICE_VAT_VERIFY_USD ?? "0.005",
    priceSanctionsCheckUsd: env.PRICE_SANCTIONS_CHECK_USD ?? "0.005",
    priceCheckVendorUsd: env.PRICE_CHECK_VENDOR_USD ?? "0.010",
    priceVerifyBankPayeeUsd: env.PRICE_VERIFY_BANK_PAYEE_USD ?? "0.003",
    priceBatchResolveUsd: env.PRICE_BATCH_RESOLVE_USD ?? "0.025",
    x402Enabled: (env.X402_ENABLED ?? "true").toLowerCase() !== "false",
    x402Network: env.X402_NETWORK ?? "eip155:84532",
    x402PayToEvm: env.X402_PAY_TO_EVM ?? "0x000000000000000000000000000000000000dEaD",
    x402PayToSvm: env.X402_PAY_TO_SVM ?? "",
    x402FacilitatorUrl: env.X402_FACILITATOR_URL ?? "https://x402.org/facilitator",
    cdpApiKeyId: env.CDP_API_KEY_ID ?? "",
    cdpApiKeySecret: env.CDP_API_KEY_SECRET ?? "",
    mppEnabled: (env.MPP_ENABLED ?? "true").toLowerCase() !== "false",
    mppSecretKey: env.MPP_SECRET_KEY ?? "9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e",
    stripeSecretKey: env.STRIPE_SECRET_KEY ?? "",
    stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET ?? "",
    tempoRecipientAddress: env.TEMPO_RECIPIENT_ADDRESS ?? env.X402_PAY_TO_EVM ?? "0x000000000000000000000000000000000000dEaD",
    tempoTestnet: (env.TEMPO_TESTNET ?? "true").toLowerCase() !== "false",
    secEdgarUserAgent: env.SEC_EDGAR_USER_AGENT ?? "Agentum/1.0 (algimantask@wix.com)",
    viesTimeoutMs: Number.parseInt(env.VIES_TIMEOUT_MS ?? "4000", 10) || 4000,
    adminSyncToken: (() => {
      const DEFAULT_DEV_ADMIN_TOKEN = "agm_sync_7c4f9b2e8a1d6f3c5e0b9a4d2f7e1c8b";
      const token = env.ADMIN_SYNC_TOKEN ?? DEFAULT_DEV_ADMIN_TOKEN;
      if (nodeEnv === "production" && (!env.ADMIN_SYNC_TOKEN || env.ADMIN_SYNC_TOKEN === DEFAULT_DEV_ADMIN_TOKEN)) {
        throw new Error("ADMIN_SYNC_TOKEN must be explicitly configured in production");
      }
      return token;
    })()
  };
}
var config2 = loadConfig();

// ../../agentum-clean-release/agentum/src/adapters/inbound/http/discovery.adapter.ts
import crypto2 from "crypto";

// ../../../../Projects/agentum/node_modules/hono/dist/utils/jwt/jwa.js
var AlgorithmTypes = /* @__PURE__ */ function(AlgorithmTypes) {
  AlgorithmTypes["HS256"] = "HS256";
  AlgorithmTypes["HS384"] = "HS384";
  AlgorithmTypes["HS512"] = "HS512";
  AlgorithmTypes["RS256"] = "RS256";
  AlgorithmTypes["RS384"] = "RS384";
  AlgorithmTypes["RS512"] = "RS512";
  AlgorithmTypes["PS256"] = "PS256";
  AlgorithmTypes["PS384"] = "PS384";
  AlgorithmTypes["PS512"] = "PS512";
  AlgorithmTypes["ES256"] = "ES256";
  AlgorithmTypes["ES384"] = "ES384";
  AlgorithmTypes["ES512"] = "ES512";
  AlgorithmTypes["EdDSA"] = "EdDSA";
  return AlgorithmTypes;
}({});

// ../../../../Projects/agentum/node_modules/hono/dist/utils/jwt/types.js
var JwtAlgorithmNotImplemented = class extends Error {
  constructor(alg) {
    super(`${alg} is not an implemented algorithm`);
    this.name = "JwtAlgorithmNotImplemented";
  }
};
var JwtAlgorithmRequired = class extends Error {
  constructor() {
    super('JWT verification requires "alg" option to be specified');
    this.name = "JwtAlgorithmRequired";
  }
};
var JwtAlgorithmMismatch = class extends Error {
  constructor(expected, actual) {
    super(`JWT algorithm mismatch: expected "${expected}", got "${actual}"`);
    this.name = "JwtAlgorithmMismatch";
  }
};
var JwtTokenInvalid = class extends Error {
  constructor(token) {
    super(`invalid JWT token: ${token}`);
    this.name = "JwtTokenInvalid";
  }
};
var JwtTokenNotBefore = class extends Error {
  constructor(token) {
    super(`token (${token}) is being used before it's valid`);
    this.name = "JwtTokenNotBefore";
  }
};
var JwtTokenExpired = class extends Error {
  constructor(token) {
    super(`token (${token}) expired`);
    this.name = "JwtTokenExpired";
  }
};
var JwtTokenIssuedAt = class extends Error {
  constructor(currentTimestamp, iat) {
    super(`Invalid "iat" claim, must be a valid number lower than "${currentTimestamp}" (iat: "${iat}")`);
    this.name = "JwtTokenIssuedAt";
  }
};
var JwtTokenIssuer = class extends Error {
  constructor(expected, iss) {
    super(`expected issuer "${expected}", got ${iss ? `"${iss}"` : "none"} `);
    this.name = "JwtTokenIssuer";
  }
};
var JwtHeaderInvalid = class extends Error {
  constructor(header) {
    super(`jwt header is invalid: ${JSON.stringify(header)}`);
    this.name = "JwtHeaderInvalid";
  }
};
var JwtHeaderRequiresKid = class extends Error {
  constructor(header) {
    super(`required "kid" in jwt header: ${JSON.stringify(header)}`);
    this.name = "JwtHeaderRequiresKid";
  }
};
var JwtSymmetricAlgorithmNotAllowed = class extends Error {
  constructor(alg) {
    super(`symmetric algorithm "${alg}" is not allowed for JWK verification`);
    this.name = "JwtSymmetricAlgorithmNotAllowed";
  }
};
var JwtAlgorithmNotAllowed = class extends Error {
  constructor(alg, allowedAlgorithms) {
    super(`algorithm "${alg}" is not in the allowed list: [${allowedAlgorithms.join(", ")}]`);
    this.name = "JwtAlgorithmNotAllowed";
  }
};
var JwtTokenSignatureMismatched = class extends Error {
  constructor(token) {
    super(`token(${token}) signature mismatched`);
    this.name = "JwtTokenSignatureMismatched";
  }
};
var JwtPayloadRequiresAud = class extends Error {
  constructor(payload) {
    super(`required "aud" in jwt payload: ${JSON.stringify(payload)}`);
    this.name = "JwtPayloadRequiresAud";
  }
};
var JwtTokenAudience = class extends Error {
  constructor(expected, aud) {
    super(`expected audience "${Array.isArray(expected) ? expected.join(", ") : expected}", got "${aud}"`);
    this.name = "JwtTokenAudience";
  }
};

// ../../../../Projects/agentum/node_modules/hono/dist/utils/jwt/utf8.js
var utf8Encoder = new TextEncoder;
var utf8Decoder = new TextDecoder;

// ../../../../Projects/agentum/node_modules/hono/dist/helper/adapter/index.js
var knownUserAgents = {
  deno: "Deno",
  bun: "Bun",
  workerd: "Cloudflare-Workers",
  node: "Node.js"
};
var getRuntimeKey = () => {
  const global = globalThis;
  if (typeof navigator !== "undefined" && typeof navigator.userAgent === "string") {
    for (const [runtimeKey, userAgent] of Object.entries(knownUserAgents))
      if (checkUserAgentEquals(userAgent))
        return runtimeKey;
  }
  if (typeof global?.EdgeRuntime === "string")
    return "edge-light";
  if (global?.fastly !== undefined)
    return "fastly";
  if (global?.process?.release?.name === "node")
    return "node";
  return "other";
};
var checkUserAgentEquals = (platform) => {
  return navigator.userAgent.startsWith(platform);
};

// ../../../../Projects/agentum/node_modules/hono/dist/utils/jwt/jws.js
async function signing(privateKey, alg, data) {
  const algorithm = getKeyAlgorithm(alg);
  const cryptoKey = await importPrivateKey(privateKey, algorithm);
  return await crypto.subtle.sign(algorithm, cryptoKey, data);
}
async function verifying(publicKey, alg, signature, data) {
  const algorithm = getKeyAlgorithm(alg);
  const cryptoKey = await importPublicKey(publicKey, algorithm);
  return await crypto.subtle.verify(algorithm, cryptoKey, signature, data);
}
function pemToBinary(pem) {
  return decodeBase64(pem.replace(/-+(BEGIN|END).*?-+/g, "").replace(/\s/g, ""));
}
async function importPrivateKey(key, alg) {
  if (!crypto.subtle || !crypto.subtle.importKey)
    throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
  if (isCryptoKey(key)) {
    if (key.type !== "private" && key.type !== "secret")
      throw new Error(`unexpected key type: CryptoKey.type is ${key.type}, expected private or secret`);
    return key;
  }
  const usages = ["sign"];
  if (typeof key === "object")
    return await crypto.subtle.importKey("jwk", key, alg, false, usages);
  if (key.includes("PRIVATE"))
    return await crypto.subtle.importKey("pkcs8", pemToBinary(key), alg, false, usages);
  return await crypto.subtle.importKey("raw", utf8Encoder.encode(key), alg, false, usages);
}
async function importPublicKey(key, alg) {
  if (!crypto.subtle || !crypto.subtle.importKey)
    throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
  if (isCryptoKey(key)) {
    if (key.type === "public" || key.type === "secret")
      return key;
    key = await exportPublicJwkFrom(key);
  }
  if (typeof key === "string" && key.includes("PRIVATE"))
    key = await exportPublicJwkFrom(await crypto.subtle.importKey("pkcs8", pemToBinary(key), alg, true, ["sign"]));
  const usages = ["verify"];
  if (typeof key === "object")
    return await crypto.subtle.importKey("jwk", key, alg, false, usages);
  if (key.includes("PUBLIC"))
    return await crypto.subtle.importKey("spki", pemToBinary(key), alg, false, usages);
  return await crypto.subtle.importKey("raw", utf8Encoder.encode(key), alg, false, usages);
}
async function exportPublicJwkFrom(privateKey) {
  if (privateKey.type !== "private")
    throw new Error(`unexpected key type: ${privateKey.type}`);
  if (!privateKey.extractable)
    throw new Error("unexpected private key is unextractable");
  const jwk = await crypto.subtle.exportKey("jwk", privateKey);
  const { kty } = jwk;
  const { alg, e, n } = jwk;
  const { crv, x, y } = jwk;
  return {
    kty,
    alg,
    e,
    n,
    crv,
    x,
    y,
    key_ops: ["verify"]
  };
}
function getKeyAlgorithm(name) {
  switch (name) {
    case "HS256":
      return {
        name: "HMAC",
        hash: { name: "SHA-256" }
      };
    case "HS384":
      return {
        name: "HMAC",
        hash: { name: "SHA-384" }
      };
    case "HS512":
      return {
        name: "HMAC",
        hash: { name: "SHA-512" }
      };
    case "RS256":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
    case "RS384":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-384" }
      };
    case "RS512":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-512" }
      };
    case "PS256":
      return {
        name: "RSA-PSS",
        hash: { name: "SHA-256" },
        saltLength: 32
      };
    case "PS384":
      return {
        name: "RSA-PSS",
        hash: { name: "SHA-384" },
        saltLength: 48
      };
    case "PS512":
      return {
        name: "RSA-PSS",
        hash: { name: "SHA-512" },
        saltLength: 64
      };
    case "ES256":
      return {
        name: "ECDSA",
        hash: { name: "SHA-256" },
        namedCurve: "P-256"
      };
    case "ES384":
      return {
        name: "ECDSA",
        hash: { name: "SHA-384" },
        namedCurve: "P-384"
      };
    case "ES512":
      return {
        name: "ECDSA",
        hash: { name: "SHA-512" },
        namedCurve: "P-521"
      };
    case "EdDSA":
      return {
        name: "Ed25519",
        namedCurve: "Ed25519"
      };
    default:
      throw new JwtAlgorithmNotImplemented(name);
  }
}
function isCryptoKey(key) {
  if (getRuntimeKey() === "node" && !!crypto.webcrypto)
    return key instanceof crypto.webcrypto.CryptoKey;
  return key instanceof CryptoKey;
}

// ../../../../Projects/agentum/node_modules/hono/dist/utils/jwt/jwt.js
var encodeJwtPart = (part) => encodeBase64Url(utf8Encoder.encode(JSON.stringify(part)).buffer).replace(/=/g, "");
var encodeSignaturePart = (buf) => encodeBase64Url(buf).replace(/=/g, "");
var decodeJwtPart = (part) => JSON.parse(utf8Decoder.decode(decodeBase64Url(part)));
function isTokenHeader(obj) {
  if (typeof obj === "object" && obj !== null) {
    const objWithAlg = obj;
    return "alg" in objWithAlg && Object.values(AlgorithmTypes).includes(objWithAlg.alg) && (!("typ" in objWithAlg) || objWithAlg.typ === "JWT");
  }
  return false;
}
var sign = async (payload, privateKey, alg = "HS256") => {
  const encodedPayload = encodeJwtPart(payload);
  let encodedHeader;
  if (typeof privateKey === "object" && "alg" in privateKey) {
    alg = privateKey.alg;
    encodedHeader = encodeJwtPart({
      alg,
      typ: "JWT",
      kid: privateKey.kid
    });
  } else
    encodedHeader = encodeJwtPart({
      alg,
      typ: "JWT"
    });
  const partialToken = `${encodedHeader}.${encodedPayload}`;
  const signaturePart = await signing(privateKey, alg, utf8Encoder.encode(partialToken));
  return `${partialToken}.${encodeSignaturePart(signaturePart)}`;
};
var verify = async (token, publicKey, algOrOptions) => {
  if (!algOrOptions)
    throw new JwtAlgorithmRequired;
  const { alg, iss, nbf = true, exp = true, iat = true, aud } = typeof algOrOptions === "string" ? { alg: algOrOptions } : algOrOptions;
  if (!alg)
    throw new JwtAlgorithmRequired;
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3)
    throw new JwtTokenInvalid(token);
  const { header, payload } = decode2(token);
  if (!isTokenHeader(header))
    throw new JwtHeaderInvalid(header);
  if (header.alg !== alg)
    throw new JwtAlgorithmMismatch(alg, header.alg);
  const now = Math.floor(Date.now() / 1000);
  if (nbf && payload.nbf !== undefined) {
    if (typeof payload.nbf !== "number" || !Number.isFinite(payload.nbf) || payload.nbf > now)
      throw new JwtTokenNotBefore(token);
  }
  if (exp && payload.exp !== undefined) {
    if (typeof payload.exp !== "number" || !Number.isFinite(payload.exp) || payload.exp <= now)
      throw new JwtTokenExpired(token);
  }
  if (iat && payload.iat !== undefined) {
    if (typeof payload.iat !== "number" || !Number.isFinite(payload.iat) || now < payload.iat)
      throw new JwtTokenIssuedAt(now, payload.iat);
  }
  if (iss) {
    if (!payload.iss)
      throw new JwtTokenIssuer(iss, null);
    if (typeof iss === "string" && payload.iss !== iss)
      throw new JwtTokenIssuer(iss, payload.iss);
    if (iss instanceof RegExp && !iss.test(payload.iss))
      throw new JwtTokenIssuer(iss, payload.iss);
  }
  if (aud) {
    if (!payload.aud)
      throw new JwtPayloadRequiresAud(payload);
    if (!(Array.isArray(payload.aud) ? payload.aud : [payload.aud]).some((payloadAud) => aud instanceof RegExp ? aud.test(payloadAud) : typeof aud === "string" ? payloadAud === aud : Array.isArray(aud) && aud.includes(payloadAud)))
      throw new JwtTokenAudience(aud, payload.aud);
  }
  const headerPayload = token.substring(0, token.lastIndexOf("."));
  let signature;
  try {
    signature = decodeBase64Url(tokenParts[2]);
  } catch {
    throw new JwtTokenInvalid(token);
  }
  if (!await verifying(publicKey, alg, signature, utf8Encoder.encode(headerPayload)))
    throw new JwtTokenSignatureMismatched(token);
  return payload;
};
var symmetricAlgorithms = [
  "HS256",
  "HS384",
  "HS512"
];
var verifyWithJwks = async (token, options, init) => {
  const verifyOpts = options.verification || {};
  const header = decodeHeader(token);
  if (!isTokenHeader(header))
    throw new JwtHeaderInvalid(header);
  if (!header.kid)
    throw new JwtHeaderRequiresKid(header);
  if (symmetricAlgorithms.includes(header.alg))
    throw new JwtSymmetricAlgorithmNotAllowed(header.alg);
  if (!options.allowedAlgorithms.includes(header.alg))
    throw new JwtAlgorithmNotAllowed(header.alg, options.allowedAlgorithms);
  let verifyKeys = options.keys ? [...options.keys] : undefined;
  if (options.jwks_uri) {
    const response = await fetch(options.jwks_uri, init);
    if (!response.ok)
      throw new Error(`failed to fetch JWKS from ${options.jwks_uri}`);
    const data = await response.json();
    if (!data.keys)
      throw new Error('invalid JWKS response. "keys" field is missing');
    if (!Array.isArray(data.keys))
      throw new Error('invalid JWKS response. "keys" field is not an array');
    verifyKeys ??= [];
    verifyKeys.push(...data.keys);
  } else if (!verifyKeys)
    throw new Error('verifyWithJwks requires options for either "keys" or "jwks_uri" or both');
  const matchingKey = verifyKeys.find((key) => key.kid === header.kid);
  if (!matchingKey)
    throw new JwtTokenInvalid(token);
  if (matchingKey.alg && matchingKey.alg !== header.alg)
    throw new JwtAlgorithmMismatch(matchingKey.alg, header.alg);
  return await verify(token, matchingKey, {
    alg: header.alg,
    ...verifyOpts
  });
};
var decode2 = (token) => {
  const parts = token.split(".");
  if (parts.length !== 3)
    throw new JwtTokenInvalid(token);
  try {
    return {
      header: decodeJwtPart(parts[0]),
      payload: decodeJwtPart(parts[1])
    };
  } catch {
    throw new JwtTokenInvalid(token);
  }
};
var decodeHeader = (token) => {
  const parts = token.split(".");
  if (parts.length !== 3)
    throw new JwtTokenInvalid(token);
  try {
    return decodeJwtPart(parts[0]);
  } catch {
    throw new JwtTokenInvalid(token);
  }
};

// ../../../../Projects/agentum/node_modules/hono/dist/utils/jwt/index.js
var Jwt = {
  sign,
  verify,
  decode: decode2,
  verifyWithJwks
};

// ../../../../Projects/agentum/node_modules/hono/dist/middleware/jwt/jwt.js
var verifyWithJwks2 = Jwt.verifyWithJwks;
var verify2 = Jwt.verify;
var decode3 = Jwt.decode;
var sign2 = Jwt.sign;

// ../../agentum-clean-release/agentum/src/adapters/inbound/http/discovery.adapter.ts
function mountDiscoveryAdapter(app, registry, config) {
  app.get("/", (c) => {
    const accept = c.req.header("accept") ?? "";
    const discoveryPayload = {
      service: "agentum",
      name: "Agentum \u2014 Deterministic Global Corporate Entity, VAT & Sanctions Resolver",
      version: "0.2.0",
      publicBaseUrl: config.publicBaseUrl,
      skillsRepository: "https://github.com/Algiras/agentum-skills",
      discovery: {
        mcpEndpoint: `${config.publicBaseUrl}/mcp`,
        mcpWellKnown: `${config.publicBaseUrl}/.well-known/mcp.json`,
        openApiSpec: `${config.publicBaseUrl}/openapi.json`,
        openAiPlugin: `${config.publicBaseUrl}/.well-known/ai-plugin.json`,
        a2aAgentCard: `${config.publicBaseUrl}/.well-known/agent.json`,
        x402Manifest: `${config.publicBaseUrl}/.well-known/x402.json`,
        mppManifest: `${config.publicBaseUrl}/.well-known/mpp.json`,
        llmsTxt: `${config.publicBaseUrl}/llms.txt`,
        llmsFullTxt: `${config.publicBaseUrl}/llms-full.txt`
      },
      freeTierCallsPerDay: config.freeCallsPerDay,
      paymentRails: ["x402-v2", "mpp-stripe-tempo"],
      tools: registry.getAll().map((t) => ({
        name: t.mcpName,
        httpMethod: t.httpMethod,
        httpPath: t.httpPath,
        priceUsd: t.priceUsd,
        summary: t.summary
      }))
    };
    if (accept.includes("text/html")) {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Agentum \u2014 Deterministic Global Corporate Entity, VAT &amp; Sanctions Resolver for AI Agents</title>
  <meta name="description" content="Deterministic Global corporate entity resolution (UK Companies House, Swiss ZEFIX, Singapore ACRA, US SEC EDGAR, EU Registries, GLEIF LEI), live EU Commission VIES VAT validation, and OFAC/EU/UN sanctions screening via Streamable HTTP MCP &amp; REST with x402 v2 and Stripe/Tempo MPP micropayments." />
  <link rel="canonical" href="${config.publicBaseUrl}/" />
  <link rel="icon" type="image/svg+xml" href="${config.publicBaseUrl}/logo.svg" />
  <link rel="mcp-server" href="${config.publicBaseUrl}/mcp" />
  <link rel="openapi" href="${config.publicBaseUrl}/openapi.json" type="application/json" />
  <link rel="alternate" href="${config.publicBaseUrl}/llms.txt" type="text/plain" title="LLM Discovery" />
  <link rel="sitemap" type="application/xml" href="${config.publicBaseUrl}/sitemap.xml" />
  
  <!-- OpenGraph Metadata -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Agentum" />
  <meta property="og:url" content="${config.publicBaseUrl}/" />
  <meta property="og:title" content="Agentum \u2014 Deterministic Global Corporate Entity Resolver for AI Agents" />
  <meta property="og:description" content="Zero-signup Streamable HTTP MCP server for deterministic corporate KYB, national registries (UK, CH, SG, US, EU), VIES VAT, and OFAC sanctions resolution with inline micropayments." />
  <meta property="og:image" content="${config.publicBaseUrl}/logo.png" />
  
  <!-- Twitter Card Metadata -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Agentum \u2014 Deterministic Global Corporate Entity Resolver for AI Agents" />
  <meta name="twitter:description" content="Deterministic global corporate entity resolution, EU VIES VAT, and OFAC sanctions screening for autonomous AI agents." />
  <meta name="twitter:image" content="${config.publicBaseUrl}/logo.png" />

  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebAPI",
            name: "Agentum Entity & Compliance Resolver API",
            description: "Deterministic global corporate entity resolution, live EU VIES VAT validation, and OFAC/EU/UN sanctions screening for autonomous AI agents.",
            documentation: config.publicBaseUrl + "/openapi.json",
            url: config.publicBaseUrl,
            termsOfService: config.publicBaseUrl + "/terms",
            provider: {
              "@type": "Organization",
              name: "Agentum Network",
              url: "https://github.com/Algiras/agentum-skills"
            }
          },
          {
            "@type": "SoftwareApplication",
            name: "Agentum MCP Server",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Cloud / HTTP",
            offers: {
              "@type": "Offer",
              price: "0.00",
              priceCurrency: "USD",
              description: "5 free calls per day; $0.002 to $0.005 per call beyond via x402 or MPP"
            },
            featureList: [
              "UK Companies House official corporate registry lookup",
              "Swiss Federal Commercial Registry (ZEFIX / UID) lookup",
              "Singapore ACRA (UEN) corporate entity directory",
              "GLEIF Legal Entity Identifier (LEI) resolution across 200+ countries",
              "US SEC EDGAR CIK, EIN and public ticker corporate resolution",
              "Lithuania Registr\u0173 centras JAR registry lookup",
              "Live European Commission VIES VAT number validation across 27 EU member states",
              "OFAC SDN, EU Financial Sanctions, and UN Security Council screening (26,650+ records)",
              "1-shot composite KYB vendor due diligence & compliance verdict",
              "SEPA & international IBAN validation, MOD-97 checksum & payee fraud guard",
              "Concurrent batch entity resolution for up to 25 companies",
              "Model Context Protocol (MCP) Streamable HTTP with Server-Sent Events",
              "Coinbase x402 v2 USDC on Base settlement",
              "Stripe & Tempo Machine Payments Protocol (MPP)"
            ]
          }
        ]
      })}</script>

  <style>
    :root {
      --bg: #0b0f19;
      --bg-page: #f8fafc;
      --bg-card: #ffffff;
      --border: #e2e8f0;
      --border-dark: #1e293b;
      --text: #0f172a;
      --text-muted: #64748b;
      --text-dim: #94a3b8;
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --accent: #0ea5e9;
      --success: #10b981;
      --danger: #ef4444;
      --warning: #f59e0b;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", Helvetica, Arial, sans-serif;
      background: var(--bg-page);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 32px 20px 80px;
    }

    /* Top Navigation */
    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 20px;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      margin-bottom: 28px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 1.15rem;
      color: #0f172a;
      text-decoration: none;
    }
    .brand-logo {
      width: 28px;
      height: 28px;
    }
    .nav-links {
      display: flex;
      gap: 16px;
      align-items: center;
      font-size: 0.85rem;
    }
    .nav-link {
      color: #475569;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.15s;
    }
    .nav-link:hover { color: var(--primary); }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { transform: scale(0.95); opacity: 0.8; }
      50% { transform: scale(1.15); opacity: 1; }
      100% { transform: scale(0.95); opacity: 0.8; }
    }

    /* Hero Section */
    .hero {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 36px 32px;
      margin-bottom: 32px;
      box-shadow: 0 4px 12px -2px rgba(15,23,42,0.04);
    }
    .hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #eff6ff;
      color: #1e40af;
      border: 1px solid #bfdbfe;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .hero h1 {
      font-size: 2.2rem;
      letter-spacing: -0.02em;
      line-height: 1.25;
      color: #0f172a;
      margin-bottom: 14px;
      font-weight: 800;
    }
    .hero p {
      font-size: 1.05rem;
      color: #475569;
      line-height: 1.6;
      max-width: 960px;
      margin-bottom: 20px;
    }
    .pill-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 5px 11px;
      border-radius: 8px;
      font-size: 0.78rem;
      font-weight: 600;
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #e2e8f0;
      transition: all 0.15s;
    }
    .badge:hover {
      background: #e2e8f0;
      border-color: #cbd5e1;
    }
    .badge.badge-blue { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
    .badge.badge-purple { background: #f5f3ff; color: #6d28d9; border-color: #ddd6fe; }
    .badge.badge-green { background: #ecfdf5; color: #047857; border-color: #a7f3d0; }

    /* Section Headings */
    .section-head {
      margin: 40px 0 18px;
    }
    .section-head h2 {
      font-size: 1.35rem;
      color: #0f172a;
      font-weight: 700;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-head p {
      font-size: 0.9rem;
      color: #64748b;
      margin-top: 4px;
    }

    /* Cards */
    .card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 22px 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
      margin-bottom: 20px;
    }

    /* Interactive Playground */
    .playground-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 1px solid #f1f5f9;
    }
    .tab-btn {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 7px 13px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 500;
      color: #334155;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .tab-btn:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
    .tab-btn.active {
      background: #2563eb;
      color: #ffffff;
      border-color: #2563eb;
      font-weight: 600;
      box-shadow: 0 2px 4px rgba(37,99,235,0.25);
    }

    .tool-info-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 16px;
      font-size: 0.82rem;
    }
    .tool-info-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .method-tag {
      background: #0f172a;
      color: #38bdf8;
      font-family: ui-monospace, Menlo, Monaco, monospace;
      font-weight: 700;
      font-size: 0.72rem;
      padding: 3px 6px;
      border-radius: 4px;
    }
    .endpoint-tag {
      font-family: ui-monospace, Menlo, Monaco, monospace;
      color: #0f172a;
      font-weight: 600;
    }
    .price-pill {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      padding: 2px 8px;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 0.74rem;
    }

    /* Dynamic Form */
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-group.full-width {
      grid-column: 1 / -1;
    }
    .form-label {
      font-size: 0.78rem;
      font-weight: 600;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .form-input, .form-textarea {
      width: 100%;
      padding: 9px 12px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.92rem;
      color: #0f172a;
      background: #ffffff;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .form-textarea {
      font-family: ui-monospace, Menlo, Monaco, monospace;
      font-size: 0.82rem;
      min-height: 90px;
      resize: vertical;
    }
    .form-input:focus, .form-textarea:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
    }
    .form-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 18px;
    }
    .btn-execute {
      background: #0f172a;
      color: #ffffff;
      border: none;
      padding: 10px 22px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s;
    }
    .btn-execute:hover {
      background: #1e293b;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .btn-execute:disabled {
      background: #64748b;
      cursor: not-allowed;
      transform: none;
    }

    /* Terminal & Result Container */
    .terminal-window {
      background: #090d16;
      border: 1px solid #1e293b;
      border-radius: 10px;
      overflow: hidden;
      margin-top: 14px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
    }
    .terminal-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      background: #0f172a;
      border-bottom: 1px solid #1e293b;
    }
    .window-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ctrl-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .ctrl-red { background: #ef4444; }
    .ctrl-yellow { background: #f59e0b; }
    .ctrl-green { background: #10b981; }

    .terminal-title {
      font-family: ui-monospace, Menlo, Monaco, monospace;
      font-size: 0.78rem;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .btn-copy-sm {
      background: rgba(255,255,255,0.08);
      color: #f8fafc;
      border: 1px solid rgba(255,255,255,0.15);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.74rem;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.15s;
    }
    .btn-copy-sm:hover {
      background: rgba(255,255,255,0.18);
    }
    .btn-copy-sm.copied {
      background: #059669;
      border-color: #10b981;
    }

    .verdict-banner {
      display: none;
      padding: 10px 16px;
      font-size: 0.85rem;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .verdict-approved {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border-color: rgba(16, 185, 129, 0.3);
    }
    .verdict-review {
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
      border-color: rgba(245, 158, 11, 0.3);
    }
    .verdict-rejected {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.3);
    }

    .status-badge {
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 0.72rem;
    }
    .status-200 { background: #065f46; color: #a7f3d0; }
    .status-err { background: #7f1d1d; color: #fecaca; }

    .json-output {
      padding: 16px;
      font-family: ui-monospace, Menlo, Monaco, Consolas, monospace;
      font-size: 0.82rem;
      line-height: 1.5;
      color: #f8fafc;
      overflow-x: auto;
      max-height: 380px;
      white-space: pre;
    }

    /* JSON Syntax Highlighting */
    .hl-key { color: #38bdf8; font-weight: 600; }
    .hl-string { color: #4ade80; }
    .hl-number { color: #fb923c; }
    .hl-bool { color: #c084fc; font-weight: 600; }
    .hl-null { color: #94a3b8; font-style: italic; }

    /* Recipes Section */
    .recipes-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    .recipes-tabs {
      display: flex;
      flex-wrap: wrap;
      background: #f8fafc;
      border-bottom: 1px solid var(--border);
      padding: 6px 8px 0;
      gap: 4px;
    }
    .recipe-tab {
      background: transparent;
      border: 1px solid transparent;
      border-bottom: none;
      padding: 8px 16px;
      border-radius: 8px 8px 0 0;
      cursor: pointer;
      font-size: 0.84rem;
      font-weight: 500;
      color: #64748b;
      transition: all 0.15s;
    }
    .recipe-tab:hover {
      color: #0f172a;
      background: rgba(0,0,0,0.02);
    }
    .recipe-tab.active {
      background: #ffffff;
      color: var(--primary);
      border-color: var(--border);
      font-weight: 600;
      box-shadow: 0 -1px 3px rgba(0,0,0,0.03);
    }
    .recipe-content {
      display: none;
      position: relative;
    }
    .recipe-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      padding: 8px 16px;
      border-bottom: 1px solid #1e293b;
    }
    .recipe-lang {
      font-family: ui-monospace, Menlo, Monaco, monospace;
      font-size: 0.72rem;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .code-block {
      background: #090d16;
      color: #f8fafc;
      padding: 16px 20px;
      font-family: ui-monospace, Menlo, Monaco, Consolas, monospace;
      font-size: 0.83rem;
      line-height: 1.55;
      overflow-x: auto;
      white-space: pre;
    }

    /* Core Tools Grid */
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .tool-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px 22px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s ease;
    }
    .tool-card:hover {
      border-color: #cbd5e1;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px -2px rgba(15,23,42,0.08);
    }
    .tool-top {
      margin-bottom: 12px;
    }
    .tool-header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }
    .tool-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #0f172a;
    }
    .tool-route {
      font-family: ui-monospace, Menlo, Monaco, monospace;
      font-size: 0.76rem;
      color: #0284c7;
      background: #e0f2fe;
      padding: 2px 7px;
      border-radius: 4px;
      font-weight: 600;
      display: inline-block;
      margin-bottom: 8px;
    }
    .tool-desc {
      font-size: 0.86rem;
      color: #475569;
      line-height: 1.5;
      margin-bottom: 12px;
    }
    .tool-features {
      list-style: none;
      font-size: 0.8rem;
      color: #64748b;
    }
    .tool-features li {
      margin-bottom: 5px;
      padding-left: 16px;
      position: relative;
    }
    .tool-features li::before {
      content: "\u2713";
      color: #10b981;
      font-weight: 700;
      position: absolute;
      left: 0;
    }
    .tool-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 14px;
      border-top: 1px solid #f1f5f9;
      margin-top: 12px;
      font-size: 0.78rem;
    }

    /* Grid 2 */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }
    @media (max-width: 768px) {
      .grid-2 { grid-template-columns: 1fr; }
      .container { padding: 18px 14px 60px; }
      .hero { padding: 24px 18px; }
      .hero h1 { font-size: 1.65rem; }
      .nav-links { display: none; }
    }

    /* Discovery Table / List */
    .discovery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 12px;
    }
    .discovery-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.84rem;
    }
    .discovery-item a {
      color: #0f172a;
      text-decoration: none;
      font-weight: 600;
    }
    .discovery-item a:hover {
      color: var(--primary);
    }
    .discovery-badge {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 0.72rem;
      background: #e2e8f0;
      color: #334155;
      padding: 2px 6px;
      border-radius: 4px;
    }

    /* Footer */
    footer {
      text-align: center;
      padding: 32px 0 20px;
      color: #94a3b8;
      font-size: 0.82rem;
      border-top: 1px solid var(--border);
      margin-top: 48px;
    }
    footer a { color: #64748b; text-decoration: none; }
    footer a:hover { color: var(--primary); }

    .spinner {
      display: inline-block;
      width: 12px;
      height: 12px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: #ffffff;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Top Navigation Bar -->
    <header class="nav-bar">
      <a href="${config.publicBaseUrl}/" class="brand">
        <svg class="brand-logo" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nav-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#6366f1"/>
            </linearGradient>
          </defs>
          <rect width="512" height="512" rx="112" fill="#0f172a"/>
          <polygon points="256,72 416,164 416,348 256,440 96,348 96,164" fill="none" stroke="url(#nav-grad)" stroke-width="26" stroke-linejoin="round"/>
          <polygon points="256,140 356,198 356,314 256,372 156,314 156,198" fill="url(#nav-grad)" fill-opacity="0.2" stroke="#38bdf8" stroke-width="14" stroke-linejoin="round"/>
          <path d="M216 260 L246 290 L304 226" fill="none" stroke="#38bdf8" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>AGENTUM</span>
        <span style="font-size: 0.72rem; background:#f1f5f9; color:#475569; padding:2px 6px; border-radius:4px; font-weight:600;">v0.2.0</span>
      </a>
      <div class="nav-links">
        <a href="#playground" class="nav-link">Interactive Playground</a>
        <a href="#recipes" class="nav-link">Quickstart Recipes</a>
        <a href="#tools" class="nav-link">6 Core Tools</a>
        <a href="${config.publicBaseUrl}/mcp" class="nav-link">MCP Endpoint</a>
        <a href="${config.publicBaseUrl}/openapi.json" class="nav-link">OpenAPI Spec</a>
        <a href="https://github.com/Algiras/agentum-skills" target="_blank" rel="noopener" class="nav-link">GitHub</a>
        <div class="status-pill">
          <span class="status-dot"></span>
          <span>5 Free Calls / Day</span>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-eyebrow">
        <span>\uD83E\uDD16</span>
        <span>The Autonomous KYB &amp; Entity Resolution Platform for AI Agents</span>
      </div>
      <h1>Deterministic Corporate Entity, VAT &amp; Sanctions Resolver</h1>
      <p>Zero-signup <strong>Streamable HTTP Model Context Protocol (MCP) server</strong> and <strong>REST API</strong>. Query authoritative corporate registries across <strong>UK</strong> (Companies House), <strong>Switzerland</strong> (ZEFIX), <strong>Singapore</strong> (ACRA), <strong>United States</strong> (SEC EDGAR), <strong>Lithuania</strong> (JAR), and <strong>GLEIF worldwide LEI</strong>, with real-time <strong>European Commission VIES VAT</strong> validation, 26,650+ OFAC/EU/UN sanctions screening, and inline Dual-402 micropayments (<a href="${config.publicBaseUrl}/.well-known/x402.json">Coinbase x402 v2 Base USDC</a> &amp; <a href="${config.publicBaseUrl}/.well-known/mpp.json">Stripe/Tempo MPP</a>).</p>
      
      <div class="pill-cloud">
        <span class="badge badge-blue">\u26A1 Model Context Protocol (Streamable HTTP)</span>
        <span class="badge">\uD83C\uDDEC\uD83C\uDDE7 UK Companies House</span>
        <span class="badge">\uD83C\uDDE8\uD83C\uDDED Swiss ZEFIX</span>
        <span class="badge">\uD83C\uDDF8\uD83C\uDDEC Singapore ACRA</span>
        <span class="badge">\uD83C\uDDFA\uD83C\uDDF8 US SEC EDGAR</span>
        <span class="badge">\uD83C\uDF10 GLEIF LEI Worldwide</span>
        <span class="badge">\uD83C\uDDF1\uD83C\uDDF9 Lithuania JAR</span>
        <span class="badge badge-purple">\uD83C\uDDEA\uD83C\uDDFA EU VIES VAT</span>
        <span class="badge">\uD83D\uDEE1\uFE0F OFAC / EU / UN Sanctions</span>
        <span class="badge badge-green">\u26A1 1-Shot KYB Check</span>
        <span class="badge badge-green">\uD83C\uDFE6 IBAN Fraud Guard</span>
        <span class="badge">\uD83D\uDCE6 Batch Resolver</span>
        <span class="badge">Coinbase x402 v2 (Base USDC)</span>
        <span class="badge">Stripe &amp; Tempo MPP</span>
      </div>
    </section>

    <!-- SECTION 1: Interactive Live Demo Playground -->
    <div class="section-head" id="playground">
      <h2>\u26A1 Interactive Live Demo Playground</h2>
      <p>Test all 6 tools &amp; global national registries live in your browser. Powered by 5 free daily calls per agent.</p>
    </div>
    <div class="card">
      <div class="playground-tabs" id="presetTabs">
        <!-- Tab buttons rendered by JavaScript -->
      </div>

      <!-- Active Tool Info Ribbon -->
      <div class="tool-info-bar" id="toolInfoBar">
        <div class="tool-info-left">
          <span class="method-tag" id="toolMethod">POST</span>
          <span class="endpoint-tag" id="toolEndpoint">/v1/entity/resolve</span>
          <span class="badge badge-blue" id="toolMcpName">resolve_entity</span>
          <span class="price-pill" id="toolPrice">$0.002 USD</span>
        </div>
        <div style="font-size:0.78rem; color:#64748b;" id="toolSummary">Official UK Companies House lookup</div>
      </div>

      <!-- Dynamic Form -->
      <div class="form-grid" id="formFields">
        <!-- Rendered dynamically by setPreset() -->
      </div>

      <div class="form-actions">
        <button class="btn-execute" id="btnRun" onclick="runPlayground()">Run Execution \u2794</button>
        <span style="font-size:0.78rem; color:#64748b;">Instant response from production Agentum cluster.</span>
      </div>

      <!-- High Contrast Terminal Response Box -->
      <div class="terminal-window" id="playgroundTerminal" style="display:none;">
        <div class="terminal-bar">
          <div class="window-controls">
            <span class="ctrl-dot ctrl-red"></span>
            <span class="ctrl-dot ctrl-yellow"></span>
            <span class="ctrl-dot ctrl-green"></span>
          </div>
          <div class="terminal-title" id="responseStatus">Ready</div>
          <button class="btn-copy-sm" onclick="copyResponseJson(this)">Copy JSON</button>
        </div>
        <div id="verdictBanner" class="verdict-banner"></div>
        <pre class="json-output" id="jsonOutput"></pre>
      </div>
    </div>

    <!-- SECTION 2: Multi-Framework Quickstart Recipes -->
    <div class="section-head" id="recipes">
      <h2>\uD83D\uDE80 Multi-Framework Quickstart Recipes</h2>
      <p>Connect Agentum to Claude Desktop, Cursor, LangChain, Vercel AI SDK, Python CrewAI, or raw cURL with 1-click copy.</p>
    </div>
    <div class="recipes-card">
      <div class="recipes-tabs">
        <button class="recipe-tab active" data-recipe="claude" onclick="switchRecipe('claude')">Claude &amp; Cursor (MCP)</button>
        <button class="recipe-tab" data-recipe="langchain-ts" onclick="switchRecipe('langchain-ts')">LangChain TS</button>
        <button class="recipe-tab" data-recipe="vercel-ai" onclick="switchRecipe('vercel-ai')">Vercel AI SDK</button>
        <button class="recipe-tab" data-recipe="python" onclick="switchRecipe('python')">Python (CrewAI / LangChain)</button>
        <button class="recipe-tab" data-recipe="curl" onclick="switchRecipe('curl')">cURL REST (Dual-402)</button>
      </div>

      <!-- Recipe 1: Claude & Cursor MCP -->
      <div class="recipe-content" id="recipe-claude" style="display:block;">
        <div class="recipe-header">
          <span class="recipe-lang">Terminal CLI / .mcp.json</span>
          <button class="btn-copy-sm" onclick="copyCode(this, 'code-claude')">Copy Snippet</button>
        </div>
        <pre class="code-block" id="code-claude"><code># 1. Claude Code / Claude Desktop Streamable HTTP MCP (One-command setup):
claude mcp add --transport http agentum ${config.publicBaseUrl}/mcp

# 2. Or add to ~/.cursor/mcp.json or claude_desktop_config.json:
{
  "mcpServers": {
    "agentum": {
      "url": "${config.publicBaseUrl}/mcp"
    }
  }
}

# 3. Or launch via zero-config stdio npm bridge:
npx -y agentum-mcp</code></pre>
      </div>

      <!-- Recipe 2: LangChain TS -->
      <div class="recipe-content" id="recipe-langchain-ts">
        <div class="recipe-header">
          <span class="recipe-lang">TypeScript / JavaScript</span>
          <button class="btn-copy-sm" onclick="copyCode(this, 'code-langchain-ts')">Copy Snippet</button>
        </div>
        <pre class="code-block" id="code-langchain-ts"><code>// npm install agentum-langchain @langchain/openai @langchain/langgraph
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { AgentumToolkit } from "agentum-langchain";

// 1. Initialize Agentum Toolkit (5 free calls/day out-of-the-box)
const toolkit = new AgentumToolkit({
  baseUrl: "${config.publicBaseUrl}",
  // Optional: EVM private key for automatic $0.002-$0.005 Base USDC micropayments
  // privateKey: process.env.BASE_PRIVATE_KEY,
});

// 2. Bind all 6 compliance tools to your LangChain agent
const agent = createReactAgent({
  llm: new ChatOpenAI({ model: "gpt-4o", temperature: 0 }),
  tools: toolkit.getTools(),
});

// 3. Run autonomous multi-jurisdiction KYB investigation
const result = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "Run 1-shot KYB on Siemens AG (DE) and verify bank IBAN DE89370400440532013000.",
    },
  ],
});
console.log(result.messages[result.messages.length - 1].content);</code></pre>
      </div>

      <!-- Recipe 3: Vercel AI SDK -->
      <div class="recipe-content" id="recipe-vercel-ai">
        <div class="recipe-header">
          <span class="recipe-lang">TypeScript / Vercel AI SDK</span>
          <button class="btn-copy-sm" onclick="copyCode(this, 'code-vercel-ai')">Copy Snippet</button>
        </div>
        <pre class="code-block" id="code-vercel-ai"><code>// npm install ai @ai-sdk/openai agentum-langchain
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createAgentumAiTools } from "agentum-langchain";

// Generate response with Agentum tools automatically wired
const { text } = await generateText({
  model: openai("gpt-4o"),
  tools: createAgentumAiTools({
    baseUrl: "${config.publicBaseUrl}",
  }),
  prompt: "Verify Grab Holdings in Singapore via ACRA, check EU VAT DE129274202, and screen SEVERSTAL for sanctions.",
});

console.log(text);</code></pre>
      </div>

      <!-- Recipe 4: Python CrewAI -->
      <div class="recipe-content" id="recipe-python">
        <div class="recipe-header">
          <span class="recipe-lang">Python (LangChain / CrewAI)</span>
          <button class="btn-copy-sm" onclick="copyCode(this, 'code-python')">Copy Snippet</button>
        </div>
        <pre class="code-block" id="code-python"><code># pip install agentum-langchain langchain crewai
from agentum_langchain import AgentumToolkit
from crewai import Agent, Task, Crew

# 1. Initialize tools (5 free calls/day per agent)
toolkit = AgentumToolkit(base_url="${config.publicBaseUrl}")
tools = toolkit.get_tools()

# 2. Define autonomous compliance agent
compliance_officer = Agent(
    role="Senior Corporate KYB Analyst",
    goal="Deterministically resolve entities, verify EU VAT, and screen sanctions",
    tools=tools,
    verbose=True,
)

# 3. Execute KYB due diligence task
task = Task(
    description="Verify Nestle SA in Switzerland (ZEFIX) and check for OFAC sanctions.",
    expected_output="Comprehensive corporate verification and sanctions screening report.",
    agent=compliance_officer,
)

crew = Crew(agents=[compliance_officer], tasks=[task])
crew.kickoff()</code></pre>
      </div>

      <!-- Recipe 5: cURL REST -->
      <div class="recipe-content" id="recipe-curl">
        <div class="recipe-header">
          <span class="recipe-lang">cURL / Dual-402 Headers</span>
          <button class="btn-copy-sm" onclick="copyCode(this, 'code-curl')">Copy Snippet</button>
        </div>
        <pre class="code-block" id="code-curl"><code># 1. Free Tier (5 free calls/day per agent fingerprint)
curl -X POST "${config.publicBaseUrl}/v1/compliance/check-vendor" \\
  -H "Content-Type: application/json" \\
  -H "X-Agent-Id: autonomous-agent-01" \\
  -d '{"name": "Siemens AG", "country": "DE", "vatNumber": "DE129274202"}'

# 2. HTTP 402 with Coinbase x402 v2 payment header (Base USDC)
curl -X POST "${config.publicBaseUrl}/v1/entity/resolve" \\
  -H "Content-Type: application/json" \\
  -H "PAYMENT-SIGNATURE: 0x&lt;eip3009_base_usdc_signature&gt;" \\
  -d '{"query": "Rolls-Royce plc", "jurisdictionHint": "GB"}'

# 3. HTTP 402 with Stripe &amp; Tempo MPP payment header
curl -X POST "${config.publicBaseUrl}/v1/compliance/verify-bank-payee" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Payment proof=&lt;tempo_micropayment_receipt&gt;" \\
  -d '{"iban": "DE89 3704 0044 0532 0130 00", "expectedCountry": "DE"}'</code></pre>
      </div>
    </div>

    <!-- SECTION 3: The 6 Core Agent Tools -->
    <div class="section-head" id="tools">
      <h2>\uD83D\uDEE0\uFE0F The 6 Core Autonomous KYB &amp; Compliance Tools</h2>
      <p>Purpose-built for autonomous AI agents, enterprise pipelines, and automated supplier workflows.</p>
    </div>
    <div class="tools-grid">
      <!-- Tool 1: resolve_entity -->
      <div class="tool-card">
        <div class="tool-top">
          <div class="tool-header-row">
            <span class="tool-title">\uD83C\uDF10 Entity Resolver</span>
            <span class="badge badge-blue">resolve_entity</span>
          </div>
          <span class="tool-route">POST /v1/entity/resolve</span>
          <p class="tool-desc">Deterministic resolution across configured national registries + worldwide GLEIF LEI. Resolves canonical names, registration codes, status, and legal forms.</p>
          <ul class="tool-features">
            <li>UK Companies House (CRN) &amp; Swiss ZEFIX (UID)</li>
            <li>Singapore ACRA (UEN)</li>
            <li>US SEC EDGAR (CIK/EIN) &amp; GLEIF LEI (200+ countries)</li>
          </ul>
        </div>
        <div class="tool-footer">
          <span style="font-weight:600; color:#0f172a;">$0.002 USD / call</span>
          <span style="color:#64748b;">Free tier eligible</span>
        </div>
      </div>

      <!-- Tool 2: verify_eu_vat -->
      <div class="tool-card">
        <div class="tool-top">
          <div class="tool-header-row">
            <span class="tool-title">\uD83C\uDDEA\uD83C\uDDFA EU VIES VAT Validator</span>
            <span class="badge badge-purple">verify_eu_vat</span>
          </div>
          <span class="tool-route">POST /v1/entity/vat-verify</span>
          <p class="tool-desc">Direct live validation against European Commission VIES across all 27 member states. Verifies company legal name, seat address, and cross-links canonical entity profile.</p>
          <ul class="tool-features">
            <li>Official EU Commission real-time XML/REST gateway</li>
            <li>Detects deregistered or fraudulent EU VAT numbers</li>
            <li>Links VAT identity to GLEIF and national registers</li>
          </ul>
        </div>
        <div class="tool-footer">
          <span style="font-weight:600; color:#0f172a;">$0.002 USD / call</span>
          <span style="color:#64748b;">Free tier eligible</span>
        </div>
      </div>

      <!-- Tool 3: screen_sanctions -->
      <div class="tool-card">
        <div class="tool-top">
          <div class="tool-header-row">
            <span class="tool-title">\uD83D\uDEE1\uFE0F Sanctions Screener</span>
            <span class="badge">screen_sanctions</span>
          </div>
          <span class="tool-route">POST /v1/entity/sanctions-screen</span>
          <p class="tool-desc">Consolidated screening against 26,650+ records from US Treasury OFAC SDN, EU Financial Sanctions, and UN Security Council. Sub-millisecond trigram fuzzy matching.</p>
          <ul class="tool-features">
            <li>Zero false-positive trigram similarity engine</li>
            <li>Tracks OFAC SDN, EU EEAS, and UN Consolidated lists</li>
            <li>Configurable match threshold and risk level assessment</li>
          </ul>
        </div>
        <div class="tool-footer">
          <span style="font-weight:600; color:#0f172a;">$0.002 USD / call</span>
          <span style="color:#64748b;">Free tier eligible</span>
        </div>
      </div>

      <!-- Tool 4: check_vendor -->
      <div class="tool-card">
        <div class="tool-top">
          <div class="tool-header-row">
            <span class="tool-title">\u26A1 1-Shot KYB Due Diligence</span>
            <span class="badge badge-green">check_vendor</span>
          </div>
          <span class="tool-route">POST /v1/compliance/check-vendor</span>
          <p class="tool-desc">Composite 1-shot KYB due diligence tool. Concurrently resolves identity, verifies EU VAT, screens sanctions, and returns an autonomous compliance verdict with full audit trail.</p>
          <ul class="tool-features">
            <li>Returns APPROVED, FLAGGED_FOR_REVIEW, or REJECTED</li>
            <li>Risk level rating: CLEAR, LOW, MEDIUM, HIGH, CRITICAL</li>
            <li>Includes audit trail timeline for compliance logs</li>
          </ul>
        </div>
        <div class="tool-footer">
          <span style="font-weight:600; color:#0f172a;">$0.005 USD / call</span>
          <span style="color:#64748b;">Free tier eligible</span>
        </div>
      </div>

      <!-- Tool 5: verify_bank_payee -->
      <div class="tool-card">
        <div class="tool-top">
          <div class="tool-header-row">
            <span class="tool-title">\uD83C\uDFE6 Bank Payee &amp; IBAN Guard</span>
            <span class="badge badge-green">verify_bank_payee</span>
          </div>
          <span class="tool-route">POST /v1/compliance/verify-bank-payee</span>
          <p class="tool-desc">SEPA &amp; international IBAN verification using ISO 13616 specifications, country length rules, and MOD-97 checksum validation. Detects corporate jurisdiction mismatches.</p>
          <ul class="tool-features">
            <li>MOD-97 checksum calculation &amp; normalization</li>
            <li>Guards against supplier invoice redirection fraud</li>
            <li>Extracts bank code and validates issuing jurisdiction</li>
          </ul>
        </div>
        <div class="tool-footer">
          <span style="font-weight:600; color:#0f172a;">$0.002 USD / call</span>
          <span style="color:#64748b;">Free tier eligible</span>
        </div>
      </div>

      <!-- Tool 6: batch_resolve -->
      <div class="tool-card">
        <div class="tool-top">
          <div class="tool-header-row">
            <span class="tool-title">\uD83D\uDCE6 Batch Entity Resolver</span>
            <span class="badge">batch_resolve</span>
          </div>
          <span class="tool-route">POST /v1/entity/batch-resolve</span>
          <p class="tool-desc">Concurrently resolves up to 25 corporate entities across national registries in a single round trip. Ideal for data pipelines, CSV supplier lists, and batch onboarding.</p>
          <ul class="tool-features">
            <li>Resolves up to 25 entities concurrently in one HTTP call</li>
            <li>Reports resolved vs unresolved counts with confidence</li>
            <li>Saves roundtrips and optimizes agent tool execution</li>
          </ul>
        </div>
        <div class="tool-footer">
          <span style="font-weight:600; color:#0f172a;">$0.010 USD / call</span>
          <span style="color:#64748b;">Free tier eligible</span>
        </div>
      </div>
    </div>

    <!-- SECTION 4: Supported Jurisdictions & Data Upstreams -->
    <div class="section-head">
      <h2>\uD83C\uDF0D Supported Jurisdictions &amp; Primary Upstreams</h2>
      <p>Registry availability depends on server configuration. See <a href="/v1/coverage">current registry coverage</a>.</p>
    </div>
    <div class="grid-2">
      <div class="card">
        <ul style="list-style:none; font-size:0.88rem; color:#334155;">
          <li style="margin-bottom:12px;"><strong>\uD83C\uDDEC\uD83C\uDDE7 UK Companies House:</strong> Real-time lookup of English, Welsh, Scottish, and Northern Irish company registration numbers (CRN) and official legal names.</li>
          <li style="margin-bottom:12px;"><strong>\uD83C\uDDE8\uD83C\uDDED Swiss ZEFIX Registry:</strong> Cantonal commercial registers, legal seats, and Unique Enterprise Identifiers (UID / CHE).</li>
          <li style="margin-bottom:12px;"><strong>\uD83C\uDDF8\uD83C\uDDEC Singapore ACRA:</strong> Accounting &amp; Corporate Regulatory Authority Unique Entity Numbers (UEN) and business records.</li>
          <li><strong>\uD83C\uDDF1\uD83C\uDDF9 Lithuania Registr\u0173 centras (JAR):</strong> Legal entity code (JAR) and company register.</li>
        </ul>
      </div>
      <div class="card">
        <ul style="list-style:none; font-size:0.88rem; color:#334155;">
          <li style="margin-bottom:12px;"><strong>\uD83C\uDDFA\uD83C\uDDF8 US SEC EDGAR:</strong> Central Index Key (CIK), Employer Identification Number (EIN), and publicly traded tickers.</li>
          <li style="margin-bottom:12px;"><strong>\uD83C\uDF10 GLEIF Worldwide:</strong> Global Legal Entity Identifier (LEI) worldwide verification across 200+ countries and territories.</li>
          <li style="margin-bottom:12px;"><strong>\uD83C\uDDEA\uD83C\uDDFA European Commission VIES:</strong> Real-time VAT validity cross-check across all 27 EU member states.</li>
          <li><strong>\uD83D\uDEE1\uFE0F Consolidated Sanctions:</strong> US Treasury OFAC SDN, European Union Financial Sanctions (EEAS), and UN Security Council Consolidated List (26,650+ records).</li>
        </ul>
      </div>
    </div>

    <!-- SECTION 5: Autonomous Dual-402 Micropayment Protocol -->
    <div class="section-head">
      <h2>\uD83D\uDCB3 Autonomous Dual-402 Micropayment Protocol</h2>
      <p>Seamless settlement for autonomous AI agents without credit cards, subscriptions, or manual API billing.</p>
    </div>
    <div class="grid-2">
      <div class="card">
        <h3 style="font-size:1.05rem; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
          <span>\u26A1</span> <span>Coinbase x402 v2 (Base USDC)</span>
        </h3>
        <p style="font-size:0.86rem; color:#475569; margin-bottom:12px;">Agentum implements the official Coinbase x402 specification. When daily free tier quota is exhausted, endpoints return HTTP 402 with a standard <code>PAYMENT-REQUIRED</code> header detailing payment terms.</p>
        <div style="font-size:0.8rem; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:10px 12px; font-family:ui-monospace,Menlo,monospace; color:#334155;">
          Rail: eip155:8453 (Base Mainnet)<br/>
          Asset: USDC ($0.002 - $0.005 / call)<br/>
          Header: PAYMENT-SIGNATURE: 0x&lt;eip3009&gt;
        </div>
      </div>
      <div class="card">
        <h3 style="font-size:1.05rem; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
          <span>\uD83C\uDF10</span> <span>Stripe &amp; Tempo MPP</span>
        </h3>
        <p style="font-size:0.86rem; color:#475569; margin-bottom:12px;">Supports the Machine Payments Protocol (MPP) co-developed by Stripe and Tempo. Allows AI agents to settle calls via HTTP <code>WWW-Authenticate: Payment</code> and <code>Authorization: Payment</code> headers.</p>
        <div style="font-size:0.8rem; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:10px 12px; font-family:ui-monospace,Menlo,monospace; color:#334155;">
          Rail: Tempo Stablecoins &amp; Stripe<br/>
          Method: Shared Payment Tokens / Streaming<br/>
          Header: Authorization: Payment proof=&lt;token&gt;
        </div>
      </div>
    </div>

    <!-- SECTION 6: Machine & Agent Discovery Coordinates -->
    <div class="section-head">
      <h2>\uD83D\uDCE1 Machine &amp; Agent Discovery Coordinates</h2>
      <p>Standardized discovery manifests for autonomous agent crawlers, LLMs, and registry aggregators.</p>
    </div>
    <div class="card">
      <div class="discovery-grid">
        <div class="discovery-item">
          <div>
            <a href="${config.publicBaseUrl}/mcp">Streamable HTTP MCP</a>
            <div style="font-size:0.75rem; color:#64748b;">Primary MCP Server URL</div>
          </div>
          <span class="discovery-badge">/mcp</span>
        </div>
        <div class="discovery-item">
          <div>
            <a href="${config.publicBaseUrl}/.well-known/mcp.json">MCP Manifest</a>
            <div style="font-size:0.75rem; color:#64748b;">RFC Discovery JSON</div>
          </div>
          <span class="discovery-badge">/.well-known/mcp.json</span>
        </div>
        <div class="discovery-item">
          <div>
            <a href="${config.publicBaseUrl}/openapi.json">OpenAPI 3.1 Spec</a>
            <div style="font-size:0.75rem; color:#64748b;">Full REST Schemas &amp; x-402</div>
          </div>
          <span class="discovery-badge">/openapi.json</span>
        </div>
        <div class="discovery-item">
          <div>
            <a href="${config.publicBaseUrl}/llms.txt">LLMs.txt Reference</a>
            <div style="font-size:0.75rem; color:#64748b;">Agent Compact Summary</div>
          </div>
          <span class="discovery-badge">/llms.txt</span>
        </div>
        <div class="discovery-item">
          <div>
            <a href="${config.publicBaseUrl}/llms-full.txt">LLMs-Full Reference</a>
            <div style="font-size:0.75rem; color:#64748b;">Complete Schemas &amp; Prompts</div>
          </div>
          <span class="discovery-badge">/llms-full.txt</span>
        </div>
        <div class="discovery-item">
          <div>
            <a href="${config.publicBaseUrl}/.well-known/ai-plugin.json">OpenAI Plugin Manifest</a>
            <div style="font-size:0.75rem; color:#64748b;">ChatGPT Actions Spec</div>
          </div>
          <span class="discovery-badge">/ai-plugin.json</span>
        </div>
        <div class="discovery-item">
          <div>
            <a href="${config.publicBaseUrl}/.well-known/agent.json">Google A2A Card</a>
            <div style="font-size:0.75rem; color:#64748b;">Agent2Agent Protocol</div>
          </div>
          <span class="discovery-badge">/agent.json</span>
        </div>
        <div class="discovery-item">
          <div>
            <a href="${config.publicBaseUrl}/.well-known/x402.json">Coinbase x402 Bazaar</a>
            <div style="font-size:0.75rem; color:#64748b;">Base USDC Micropayments</div>
          </div>
          <span class="discovery-badge">/x402.json</span>
        </div>
        <div class="discovery-item">
          <div>
            <a href="${config.publicBaseUrl}/.well-known/mpp.json">Stripe/Tempo MPP</a>
            <div style="font-size:0.75rem; color:#64748b;">Machine Payments Spec</div>
          </div>
          <span class="discovery-badge">/mpp.json</span>
        </div>
        <div class="discovery-item">
          <div>
            <a href="https://github.com/Algiras/agentum-skills" target="_blank" rel="noopener">GitHub Skills Repo</a>
            <div style="font-size:0.75rem; color:#64748b;">Open Source &amp; Packages</div>
          </div>
          <span class="discovery-badge">GitHub</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer>
      <p>MIT License &copy; 2026 Agentum Network &bull; <a href="${config.publicBaseUrl}/pricing">Pricing</a> &bull; <a href="${config.publicBaseUrl}/terms">Terms</a> &bull; <a href="${config.publicBaseUrl}/privacy">Privacy</a> &bull; <a href="https://github.com/Algiras/agentum-skills" target="_blank" rel="noopener">Algiras/agentum-skills</a></p>
    </footer>
  </div>

  <script>
    var currentPresetId = 'uk';
    var lastResponseData = null;

    var PRESETS = {
      'uk': {
        id: 'uk',
        name: '\uD83C\uDDEC\uD83C\uDDE7 UK Companies House',
        tool: 'resolve_entity',
        method: 'POST',
        endpoint: '/v1/entity/resolve',
        price: '$0.002 USD',
        summary: 'Official UK Companies House lookup by legal name or 8-char CRN',
        fields: [
          { id: 'query', label: 'Company Name or CRN', value: 'Rolls-Royce plc', placeholder: 'e.g. Rolls-Royce plc or 00132876' },
          { id: 'jurisdictionHint', label: 'Jurisdiction Hint', value: 'GB', placeholder: 'GB' }
        ],
        makeBody: function(f) { return { query: f.query, jurisdictionHint: f.jurisdictionHint || 'GB' }; }
      },
      'ch': {
        id: 'ch',
        name: '\uD83C\uDDE8\uD83C\uDDED Swiss ZEFIX',
        tool: 'resolve_entity',
        method: 'POST',
        endpoint: '/v1/entity/resolve',
        price: '$0.002 USD',
        summary: 'Swiss Federal Commercial Registry (ZEFIX) lookup by CHE-xxx UID or company name',
        fields: [
          { id: 'query', label: 'Company Name or UID', value: 'Nestle SA', placeholder: 'e.g. Nestle SA or CHE-105.909.036' },
          { id: 'jurisdictionHint', label: 'Jurisdiction Hint', value: 'CH', placeholder: 'CH' }
        ],
        makeBody: function(f) { return { query: f.query, jurisdictionHint: f.jurisdictionHint || 'CH' }; }
      },
      'sg': {
        id: 'sg',
        name: '\uD83C\uDDF8\uD83C\uDDEC Singapore ACRA',
        tool: 'resolve_entity',
        method: 'POST',
        endpoint: '/v1/entity/resolve',
        price: '$0.002 USD',
        summary: 'Singapore Accounting & Corporate Regulatory Authority (ACRA) directory by UEN or company name',
        fields: [
          { id: 'query', label: 'Company Name or UEN', value: 'Grab Holdings', placeholder: 'e.g. Grab Holdings or 201800123A' },
          { id: 'jurisdictionHint', label: 'Jurisdiction Hint', value: 'SG', placeholder: 'SG' }
        ],
        makeBody: function(f) { return { query: f.query, jurisdictionHint: f.jurisdictionHint || 'SG' }; }
      },
      'us': {
        id: 'us',
        name: '\uD83C\uDDFA\uD83C\uDDF8 US SEC EDGAR',
        tool: 'resolve_entity',
        method: 'POST',
        endpoint: '/v1/entity/resolve',
        price: '$0.002 USD',
        summary: 'US SEC EDGAR corporate database by CIK, EIN, stock ticker, or legal name',
        fields: [
          { id: 'query', label: 'Company Name, CIK, or Ticker', value: 'Apple Inc', placeholder: 'e.g. Apple Inc, 0000320193, or AAPL' },
          { id: 'jurisdictionHint', label: 'Jurisdiction Hint', value: 'US', placeholder: 'US' }
        ],
        makeBody: function(f) { return { query: f.query, jurisdictionHint: f.jurisdictionHint || 'US' }; }
      },
      'eu_lei': {
        id: 'eu_lei',
        name: '\uD83C\uDDEA\uD83C\uDDFA EU LEI / GLEIF',
        tool: 'resolve_entity',
        method: 'POST',
        endpoint: '/v1/entity/resolve',
        price: '$0.002 USD',
        summary: 'GLEIF worldwide Legal Entity Identifier resolution across 200+ countries',
        fields: [
          { id: 'query', label: 'Company Name or 20-char LEI', value: 'Siemens AG', placeholder: 'e.g. Siemens AG or W38RGI023J3WT1HWRP32' },
          { id: 'jurisdictionHint', label: 'Jurisdiction Hint', value: 'DE', placeholder: 'DE' }
        ],
        makeBody: function(f) { return { query: f.query, jurisdictionHint: f.jurisdictionHint || 'DE' }; }
      },
      'vat': {
        id: 'vat',
        name: '\uD83C\uDDEA\uD83C\uDDFA EU VIES VAT Check',
        tool: 'verify_eu_vat',
        method: 'POST',
        endpoint: '/v1/entity/vat-verify',
        price: '$0.002 USD',
        summary: 'Real-time European Commission VIES VAT status validation across all 27 EU member states',
        fields: [
          { id: 'vatNumber', label: 'Full EU VAT Number (with country code prefix)', value: 'DE129274202', placeholder: 'e.g. DE129274202 or IE6388047V' }
        ],
        makeBody: function(f) { return { vatNumber: f.vatNumber }; }
      },
      'sanctions': {
        id: 'sanctions',
        name: '\uD83D\uDEE1\uFE0F OFAC Sanctions Screen',
        tool: 'screen_sanctions',
        method: 'POST',
        endpoint: '/v1/entity/sanctions-screen',
        price: '$0.002 USD',
        summary: 'Screen individuals & companies against 26,650+ records from OFAC SDN, EU Financial Sanctions, and UN Security Council',
        fields: [
          { id: 'name', label: 'Entity or Individual Name', value: 'Sberbank', placeholder: 'e.g. Sberbank, Gazprom, or Wagner Group' },
          { id: 'threshold', label: 'Trigram Similarity Threshold (0.0 to 1.0)', value: '0.75', placeholder: '0.75' }
        ],
        makeBody: function(f) { return { name: f.name, threshold: parseFloat(f.threshold) || 0.75 }; }
      },
      'kyb': {
        id: 'kyb',
        name: '\u26A1 1-Shot KYB Due Diligence',
        tool: 'check_vendor',
        method: 'POST',
        endpoint: '/v1/compliance/check-vendor',
        price: '$0.005 USD',
        summary: 'Composite 1-shot KYB: concurrent entity resolution, live VIES VAT check, and OFAC/EU sanctions screening with verdict',
        fields: [
          { id: 'name', label: 'Vendor Legal Name', value: 'Siemens AG', placeholder: 'e.g. Siemens AG' },
          { id: 'country', label: 'Country Code (ISO 2-letter)', value: 'DE', placeholder: 'e.g. DE, GB, US, CH, SG' },
          { id: 'vatNumber', label: 'EU VAT Number (Optional)', value: 'DE129274202', placeholder: 'e.g. DE129274202' }
        ],
        makeBody: function(f) {
          var b = { name: f.name };
          if (f.country) b.country = f.country;
          if (f.vatNumber) b.vatNumber = f.vatNumber;
          return b;
        }
      },
      'iban': {
        id: 'iban',
        name: '\uD83C\uDFE6 Bank Payee & IBAN Fraud Guard',
        tool: 'verify_bank_payee',
        method: 'POST',
        endpoint: '/v1/compliance/verify-bank-payee',
        price: '$0.002 USD',
        summary: 'SEPA & international IBAN format, country length, MOD-97 checksum, and country mismatch verification',
        fields: [
          { id: 'iban', label: 'International Bank Account Number (IBAN)', value: 'DE89 3704 0044 0532 0130 00', placeholder: 'e.g. DE89 3704 0044 0532 0130 00' },
          { id: 'expectedCountry', label: 'Expected Payee Country', value: 'DE', placeholder: 'DE' },
          { id: 'payeeName', label: 'Payee Legal Name (Optional)', value: 'Siemens AG', placeholder: 'Siemens AG' }
        ],
        makeBody: function(f) {
          var b = { iban: f.iban };
          if (f.expectedCountry) b.expectedCountry = f.expectedCountry;
          if (f.payeeName) b.payeeName = f.payeeName;
          return b;
        }
      },
      'batch': {
        id: 'batch',
        name: '\uD83D\uDCE6 Batch Entity Resolver',
        tool: 'batch_resolve',
        method: 'POST',
        endpoint: '/v1/entity/batch-resolve',
        price: '$0.010 USD',
        summary: 'Concurrently resolve up to 25 corporate entities across national registries in a single round trip',
        fields: [
          {
            id: 'itemsJson',
            label: 'Entities to Resolve (JSON Array, 1-25 items)',
            value: JSON.stringify([
              { "query": "Rolls-Royce plc", "country": "GB" },
              { "query": "Nestle SA", "country": "CH" },
              { "query": "Grab Holdings", "country": "SG" }
            ], null, 2),
            isTextarea: true,
            placeholder: '[{"query": "...", "country": "..."}]'
          }
        ],
        makeBody: function(f) {
          try {
            var parsed = JSON.parse(f.itemsJson);
            return { items: Array.isArray(parsed) ? parsed : [parsed] };
          } catch (e) {
            return { items: [{ query: f.itemsJson }] };
          }
        }
      }
    };

    function initPlayground() {
      var tabsContainer = document.getElementById('presetTabs');
      tabsContainer.innerHTML = '';
      Object.keys(PRESETS).forEach(function(key) {
        var p = PRESETS[key];
        var btn = document.createElement('button');
        btn.className = 'tab-btn' + (key === currentPresetId ? ' active' : '');
        btn.textContent = p.name;
        btn.onclick = function() { setPreset(key); };
        tabsContainer.appendChild(btn);
      });
      setPreset(currentPresetId);
    }

    function setPreset(id) {
      currentPresetId = id;
      var p = PRESETS[id];
      if (!p) return;

      // Update active tab styling
      document.querySelectorAll('#presetTabs .tab-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.textContent.trim() === p.name.trim());
      });

      // Update info ribbon
      document.getElementById('toolMethod').textContent = p.method;
      document.getElementById('toolEndpoint').textContent = p.endpoint;
      document.getElementById('toolMcpName').textContent = p.tool;
      document.getElementById('toolPrice').textContent = p.price;
      document.getElementById('toolSummary').textContent = p.summary;

      // Render form fields
      var fieldsContainer = document.getElementById('formFields');
      fieldsContainer.innerHTML = '';
      p.fields.forEach(function(f) {
        var group = document.createElement('div');
        group.className = 'form-group' + (f.isTextarea ? ' full-width' : '');
        var label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = f.label;
        group.appendChild(label);

        if (f.isTextarea) {
          var textarea = document.createElement('textarea');
          textarea.className = 'form-textarea';
          textarea.id = 'field_' + f.id;
          textarea.value = f.value;
          textarea.placeholder = f.placeholder;
          group.appendChild(textarea);
        } else {
          var input = document.createElement('input');
          input.type = 'text';
          input.className = 'form-input';
          input.id = 'field_' + f.id;
          input.value = f.value;
          input.placeholder = f.placeholder;
          input.onkeydown = function(e) {
            if (e.key === 'Enter') runPlayground();
          };
          group.appendChild(input);
        }
        fieldsContainer.appendChild(group);
      });
    }

    function syntaxHighlight(json) {
      if (typeof json !== 'string') {
        json = JSON.stringify(json, null, 2);
      }
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/(".*?"(:)?|true|false|null|-?[0-9]+([.][0-9]+)?)/g, function (match) {
        var cls = 'hl-number';
        if (match.startsWith('"')) {
          cls = match.endsWith(':') ? 'hl-key' : 'hl-string';
        } else if (match === 'true' || match === 'false') {
          cls = 'hl-bool';
        } else if (match === 'null') {
          cls = 'hl-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
    }

    async function runPlayground() {
      var preset = PRESETS[currentPresetId];
      if (!preset) return;
      var btn = document.getElementById('btnRun');
      var terminal = document.getElementById('playgroundTerminal');
      var jsonBox = document.getElementById('jsonOutput');
      var statusEl = document.getElementById('responseStatus');
      var verdictEl = document.getElementById('verdictBanner');

      var formValues = {};
      preset.fields.forEach(function(f) {
        var el = document.getElementById('field_' + f.id);
        formValues[f.id] = el ? el.value.trim() : '';
      });
      var reqBody = preset.makeBody(formValues);

      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Executing...';
      terminal.style.display = 'block';
      statusEl.textContent = 'Calling ' + preset.method + ' ' + preset.endpoint + '...';
      verdictEl.style.display = 'none';
      jsonBox.innerHTML = '<span style="color:#64748b;">// Awaiting live response from ' + preset.endpoint + '...</span>';

      var startTime = performance.now();
      try {
        var res = await fetch(preset.endpoint, {
          method: preset.method,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Agent-Id': 'agentum-web-playground'
          },
          body: JSON.stringify(reqBody)
        });
        var duration = Math.round(performance.now() - startTime);
        var remaining = res.headers.get('X-Free-Tier-Remaining') || '5';
        var rail = res.headers.get('X-Payment-Rail') || 'FREE';
        var statusText = res.status + ' ' + (res.status === 200 ? 'OK' : res.status === 402 ? 'Payment Required' : 'Status');

        var data;
        try {
          data = await res.json();
        } catch (e) {
          data = { rawText: await res.text() };
        }

        lastResponseData = data;
        statusEl.innerHTML = '<span class="status-badge status-' + (res.status === 200 ? '200' : 'err') + '">' + statusText + '</span> \u2022 <span>\u23F1 ' + duration + 'ms</span> \u2022 <span>Rail: <strong style="color:#38bdf8">' + rail + '</strong></span> \u2022 <span>Free Calls: <strong style="color:#4ade80">' + remaining + ' remaining today</strong></span>';

        if (data.verdict) {
          verdictEl.style.display = 'block';
          var verdictClass = data.verdict === 'APPROVED' ? 'verdict-approved' : data.verdict === 'REJECTED' ? 'verdict-rejected' : 'verdict-review';
          var verdictIcon = data.verdict === 'APPROVED' ? '\u2705' : data.verdict === 'REJECTED' ? '\u26D4' : '\u26A0\uFE0F';
          verdictEl.className = 'verdict-banner ' + verdictClass;
          verdictEl.innerHTML = '<strong>' + verdictIcon + ' KYB Verdict: ' + data.verdict + '</strong> &nbsp;|&nbsp; Risk Level: <strong>' + (data.riskLevel || 'N/A') + '</strong> &nbsp;|&nbsp; Sanctions: <strong>' + (data.sanctionsHit ? 'HIT DETECTED' : 'CLEAR') + '</strong> &nbsp;|&nbsp; VAT: <strong>' + (data.vatValid === true ? 'VALID' : data.vatValid === false ? 'INVALID' : 'N/A') + '</strong>';
        } else if (data.valid !== undefined && preset.id === 'iban') {
          verdictEl.style.display = 'block';
          var ibanClass = data.valid && data.checksumValid ? 'verdict-approved' : 'verdict-rejected';
          verdictEl.className = 'verdict-banner ' + ibanClass;
          verdictEl.innerHTML = '<strong>' + (data.valid ? '\u2705 IBAN Valid' : '\u274C IBAN Invalid') + '</strong> &nbsp;|&nbsp; Country: <strong>' + data.countryCode + '</strong> &nbsp;|&nbsp; Checksum: <strong>' + (data.checksumValid ? 'VALID' : 'INVALID') + '</strong> &nbsp;|&nbsp; Country Match: <strong>' + (data.countryMatch === true ? 'MATCH' : data.countryMatch === false ? 'MISMATCH' : 'N/A') + '</strong>';
        } else if (data.sanctioned !== undefined) {
          verdictEl.style.display = 'block';
          var sancClass = data.sanctioned ? 'verdict-rejected' : 'verdict-approved';
          verdictEl.className = 'verdict-banner ' + sancClass;
          verdictEl.innerHTML = '<strong>' + (data.sanctioned ? '\uD83D\uDEA8 SANCTIONS HIT' : '\u2705 SANCTIONS CLEAR') + '</strong> &nbsp;|&nbsp; Risk Level: <strong>' + data.riskLevel + '</strong> &nbsp;|&nbsp; Matched Lists: <strong>' + (data.matchedLists && data.matchedLists.length ? data.matchedLists.join(', ') : 'None') + '</strong>';
        } else if (data.valid !== undefined && preset.id === 'vat') {
          verdictEl.style.display = 'block';
          var vatClass = data.valid ? 'verdict-approved' : 'verdict-rejected';
          verdictEl.className = 'verdict-banner ' + vatClass;
          verdictEl.innerHTML = '<strong>' + (data.valid ? '\u2705 EU VIES VAT VALID' : '\u274C VAT INVALID') + '</strong> &nbsp;|&nbsp; Country: <strong>' + data.countryCode + '</strong> &nbsp;|&nbsp; Number: <strong>' + data.vatNumber + '</strong>';
        }

        jsonBox.innerHTML = syntaxHighlight(data);
      } catch (err) {
        statusEl.innerHTML = '<span class="status-badge status-err">ERROR</span> \u2022 ' + err.message;
        jsonBox.innerHTML = '<span style="color:#f87171;">Error executing request: ' + err.message + '</span>';
      } finally {
        btn.disabled = false;
        btn.innerHTML = 'Run Execution \u2794';
      }
    }

    function copyResponseJson(btn) {
      if (!lastResponseData) return;
      var text = JSON.stringify(lastResponseData, null, 2);
      navigator.clipboard.writeText(text).then(function() {
        var original = btn.innerHTML;
        btn.innerHTML = '\u2713 Copied!';
        btn.classList.add('copied');
        setTimeout(function() {
          btn.innerHTML = original;
          btn.classList.remove('copied');
        }, 2000);
      });
    }

    function copyCode(btn, elementId) {
      var el = document.getElementById(elementId);
      if (!el) return;
      var text = el.innerText || el.textContent;
      navigator.clipboard.writeText(text).then(function() {
        var original = btn.innerHTML;
        btn.innerHTML = '\u2713 Copied!';
        btn.classList.add('copied');
        setTimeout(function() {
          btn.innerHTML = original;
          btn.classList.remove('copied');
        }, 2000);
      }).catch(function() {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.innerHTML = '\u2713 Copied!';
        setTimeout(function() { btn.innerHTML = 'Copy Snippet'; }, 2000);
      });
    }

    function switchRecipe(recipeId) {
      document.querySelectorAll('.recipe-tab').forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.recipe-content').forEach(function(c) { c.style.display = 'none'; });
      var activeTab = document.querySelector('.recipe-tab[data-recipe="' + recipeId + '"]');
      if (activeTab) activeTab.classList.add('active');
      var target = document.getElementById('recipe-' + recipeId);
      if (target) target.style.display = 'block';
    }

    // Initialize on load
    window.addEventListener('DOMContentLoaded', initPlayground);
  </script>
</body>
</html>`;
      return c.html(html);
    }
    return c.json(discoveryPayload);
  });
  app.get("/health", (c) => {
    return c.json({
      status: "ok",
      service: "agentum",
      architecture: "hexagonal-ports-and-adapters",
      serviceRole: config.serviceRole,
      resolverMode: config.resolverMode,
      paymentMode: config.paymentMode,
      toolsCount: registry.getAll().length,
      payments: {
        x402Enabled: config.x402Enabled,
        x402Network: config.x402Network,
        mppEnabled: config.mppEnabled,
        freeCallsPerDay: config.freeCallsPerDay
      },
      features: {
        strictPayments: config.featureStrictPayments,
        replayProtection: config.featureReplayProtection,
        liveStripeVerify: config.featureLiveStripeVerify,
        sanctionsWordMatch: config.featureSanctionsWordMatch
      }
    });
  });
  app.get("/v1/coverage", (c) => {
    const level = c.req.query("level");
    const all = listCoverage();
    const filtered = level ? all.filter((p) => p.coverage === level) : all;
    return c.json({
      totalCountries: all.length,
      byLevel: {
        L3_ENRICHED: all.filter((p) => p.coverage === "L3_ENRICHED").length,
        L2_VERIFIED: all.filter((p) => p.coverage === "L2_VERIFIED").length,
        L1_VALIDATED: all.filter((p) => p.coverage === "L1_VALIDATED").length,
        L0_SCREENED: all.filter((p) => p.coverage === "L0_SCREENED").length
      },
      countries: filtered
    });
  });
  app.get("/v1/coverage/:country", (c) => {
    const code = c.req.param("country");
    const profile = getCountryProfile(code);
    return c.json(profile);
  });
  app.get("/openapi.json", (c) => {
    const paths = {};
    for (const tool of registry.getAll()) {
      const methodKey = tool.httpMethod.toLowerCase();
      paths[tool.httpPath] = {
        [methodKey]: {
          operationId: tool.mcpName,
          summary: tool.summary,
          description: tool.description,
          tags: [tool.category],
          "x-402": {
            version: 2,
            scheme: "exact",
            priceUsd: tool.priceUsd,
            network: config.x402Network,
            payTo: config.x402PayToEvm,
            facilitatorUrl: config.x402FacilitatorUrl,
            freeCallsPerDay: config.freeCallsPerDay
          },
          "x-mpp": {
            priceUsd: tool.priceUsd,
            currency: "USD",
            methods: config.stripeSecretKey ? ["tempo", "stripe"] : ["tempo"],
            recipient: config.tempoRecipientAddress,
            testnet: config.tempoTestnet
          },
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: registry.toJsonSchema(tool.inputSchema)
              }
            }
          },
          responses: {
            "200": {
              description: "Deterministic tool execution response",
              content: {
                "application/json": {
                  schema: registry.toJsonSchema(tool.outputSchema)
                }
              }
            },
            "402": {
              description: "Payment Required \u2014 returns PAYMENT-REQUIRED (x402 v2) and WWW-Authenticate: Payment (Stripe/Tempo MPP) headers"
            }
          }
        }
      };
    }
    return c.json({
      openapi: "3.1.0",
      info: {
        title: "Agentum Global Entity Resolver API",
        version: "0.2.0",
        description: "Deterministic global corporate entity resolution (UK Companies House, Swiss ZEFIX, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI), live EU Commission VIES VAT validation, and OFAC/EU/UN sanctions screening for autonomous AI agents. Supports HTTP 402 via Coinbase x402 v2 and Stripe/Tempo MPP."
      },
      servers: [{ url: config.publicBaseUrl }],
      paths
    });
  });
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <polygon points="256,72 416,164 416,348 256,440 96,348 96,164" fill="none" stroke="url(#accent)" stroke-width="24" stroke-linejoin="round"/>
  <polygon points="256,140 356,198 356,314 256,372 156,314 156,198" fill="url(#accent)" fill-opacity="0.15" stroke="#38bdf8" stroke-width="12" stroke-linejoin="round"/>
  <path d="M216 260 L246 290 L304 226" fill="none" stroke="#38bdf8" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  app.get("/logo.svg", (c) => c.body(logoSvg, 200, {
    "Content-Type": "image/svg+xml; charset=utf-8",
    "Cache-Control": "public, max-age=86400"
  }));
  app.get("/favicon.ico", (c) => c.body(logoSvg, 200, {
    "Content-Type": "image/svg+xml; charset=utf-8",
    "Cache-Control": "public, max-age=86400"
  }));
  app.get("/favicon.png", (c) => c.body(logoSvg, 200, {
    "Content-Type": "image/svg+xml; charset=utf-8",
    "Cache-Control": "public, max-age=86400"
  }));
  app.get("/pricing", (c) => c.json({
    service: "agentum-entity-resolver",
    currency: "USD",
    freeCallsPerDay: config.freeCallsPerDay,
    rails: ["x402", "mpp"],
    tools: registry.getAll().map((t) => ({
      name: t.mcpName,
      httpPath: t.httpPath,
      priceUsd: t.priceUsd
    }))
  }));
  const handleMcpServerCard = (c) => c.json({
    name: "agentum-entity-resolver",
    title: "Agentum Global Corporate Entity, VAT & Sanctions Resolver",
    version: "0.2.0",
    description: "Deterministic Global Corporate Entity (UK Companies House, Swiss ZEFIX, Singapore ACRA, US SEC EDGAR, European Registries, Worldwide GLEIF LEI), live EU VIES VAT, and OFAC/EU/UN Sanctions screening.",
    protocolVersion: "2025-03-26",
    endpoint: `${config.publicBaseUrl}/mcp`,
    transport: "streamable-http",
    icon: `${config.publicBaseUrl}/logo.svg`,
    authentication: {
      type: "none",
      schemes: ["none"]
    },
    capabilities: {
      tools: { listChanged: false },
      resources: { subscribe: false, listChanged: false },
      prompts: { listChanged: false }
    },
    tools: registry.getAll().map((t) => ({
      name: t.mcpName,
      description: t.description,
      inputSchema: registry.toJsonSchema(t.inputSchema)
    }))
  });
  app.get("/.well-known/mcp/server-card", handleMcpServerCard);
  app.get("/.well-known/mcp/server-card/:name", handleMcpServerCard);
  const handleProtectedResource = (c) => c.json({
    resource: `${config.publicBaseUrl}/mcp`,
    authorization_servers: [config.publicBaseUrl],
    bearer_methods_supported: ["header"],
    scopes_supported: ["mcp:tools", "mcp:resources", "mcp:prompts"],
    resource_documentation: `${config.publicBaseUrl}/llms.txt`
  });
  app.get("/.well-known/oauth-protected-resource", handleProtectedResource);
  app.get("/.well-known/oauth-protected-resource/:name", handleProtectedResource);
  const handleOAuthServerMetadata = (c) => c.json({
    issuer: config.publicBaseUrl,
    authorization_endpoint: `${config.publicBaseUrl}/oauth/authorize`,
    token_endpoint: `${config.publicBaseUrl}/oauth/token`,
    registration_endpoint: `${config.publicBaseUrl}/oauth/register`,
    response_types_supported: ["code"],
    grant_types_supported: [
      "authorization_code",
      "client_credentials",
      "refresh_token"
    ],
    token_endpoint_auth_methods_supported: [
      "none",
      "client_secret_post",
      "client_secret_basic"
    ],
    code_challenge_methods_supported: ["S256", "plain"],
    scopes_supported: ["mcp:tools", "mcp:resources", "mcp:prompts"],
    service_documentation: `${config.publicBaseUrl}/llms.txt`
  });
  app.get("/.well-known/oauth-authorization-server", handleOAuthServerMetadata);
  app.get("/.well-known/oauth-authorization-server/:name", handleOAuthServerMetadata);
  app.get("/.well-known/openid-configuration", handleOAuthServerMetadata);
  const oauthClients = new Map;
  const oauthAuthCodes = new Map;
  oauthClients.set("anon", {
    clientId: "anon",
    clientName: "Anonymous Agent Client",
    redirectUris: [],
    grantTypes: ["authorization_code", "client_credentials"],
    createdAt: Date.now()
  });
  app.post("/oauth/register", async (c) => {
    let body = {};
    try {
      body = await c.req.json();
    } catch {}
    const clientId = `agm_client_${crypto2.randomUUID().replace(/-/g, "").slice(0, 16)}`;
    const clientSecret = `agm_secret_${crypto2.randomUUID().replace(/-/g, "")}`;
    const redirectUris = Array.isArray(body.redirect_uris) ? body.redirect_uris : [];
    const grantTypes = body.grant_types ?? [
      "authorization_code",
      "refresh_token",
      "client_credentials"
    ];
    oauthClients.set(clientId, {
      clientId,
      clientSecret,
      clientName: body.client_name ?? "MCP Agent Client",
      redirectUris,
      grantTypes,
      createdAt: Date.now()
    });
    return c.json({
      client_id: clientId,
      client_secret: clientSecret,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      client_secret_expires_at: 0,
      client_name: body.client_name ?? "MCP Agent Client",
      redirect_uris: redirectUris,
      grant_types: grantTypes,
      response_types: body.response_types ?? ["code"],
      token_endpoint_auth_method: body.token_endpoint_auth_method ?? "none"
    }, 201);
  });
  app.get("/oauth/authorize", (c) => {
    const redirectUri = c.req.query("redirect_uri");
    const state = c.req.query("state");
    const clientId = c.req.query("client_id") ?? "anon";
    const codeChallenge = c.req.query("code_challenge");
    const codeChallengeMethod = c.req.query("code_challenge_method") ?? "S256";
    const scope = c.req.query("scope") ?? "mcp:tools mcp:resources mcp:prompts";
    const client = oauthClients.get(clientId);
    if (!client) {
      return c.json({ error: "invalid_client", error_description: "Unknown client_id" }, 400);
    }
    if (redirectUri && client.redirectUris.length > 0 && !client.redirectUris.includes(redirectUri)) {
      return c.json({ error: "invalid_request", error_description: "redirect_uri mismatch for registered client" }, 400);
    }
    const code = `agm_code_${crypto2.randomUUID().replace(/-/g, "")}`;
    oauthAuthCodes.set(code, {
      code,
      clientId,
      redirectUri: redirectUri || undefined,
      codeChallenge: codeChallenge || undefined,
      codeChallengeMethod: codeChallengeMethod || undefined,
      scope,
      expiresAt: Date.now() + 5 * 60 * 1000,
      used: false
    });
    if (redirectUri) {
      let target;
      try {
        target = new URL(redirectUri);
      } catch {
        return c.json({ error: "invalid_redirect_uri" }, 400);
      }
      const allowedHosts = [
        "chatgpt.com",
        "chat.openai.com",
        "claude.ai",
        "claude.com",
        "chat.mistral.ai",
        "gemini.google.com"
      ];
      const isRegisteredUri = client.redirectUris.includes(redirectUri);
      const isLoopback = ["localhost", "127.0.0.1", "[::1]"].includes(target.hostname);
      const isAllowedHost = target.protocol === "https:" && allowedHosts.some((h) => target.hostname === h || target.hostname.endsWith(`.${h}`));
      if (!isRegisteredUri && !isLoopback && !isAllowedHost) {
        return c.json({ error: "invalid_redirect_uri" }, 400);
      }
      target.searchParams.set("code", code);
      if (state)
        target.searchParams.set("state", state);
      return c.redirect(target.toString(), 302);
    }
    return c.json({ code, state });
  });
  app.post("/oauth/token", async (c) => {
    let body = {};
    const contentType = c.req.header("content-type") ?? "";
    if (contentType.includes("application/json")) {
      try {
        body = await c.req.json();
      } catch {
        return c.json({ error: "invalid_request", error_description: "Malformed JSON body" }, 400);
      }
    } else {
      try {
        const formData = await c.req.formData();
        for (const [k, v] of formData.entries()) {
          body[k] = typeof v === "string" ? v : v.name;
        }
      } catch {
        body = c.req.query();
      }
    }
    const grantType = body.grant_type;
    const supportedGrants = ["authorization_code", "client_credentials", "refresh_token"];
    if (!grantType || !supportedGrants.includes(grantType)) {
      return c.json({
        error: "unsupported_grant_type",
        error_description: `grant_type must be one of: ${supportedGrants.join(", ")}`
      }, 400);
    }
    let sub = "agent_anonymous";
    let tokenScope = "mcp:tools mcp:resources mcp:prompts";
    if (grantType === "authorization_code") {
      const code = body.code;
      if (!code || typeof code !== "string") {
        return c.json({ error: "invalid_grant", error_description: "Missing authorization code" }, 400);
      }
      const authCode = oauthAuthCodes.get(code);
      if (!authCode) {
        return c.json({ error: "invalid_grant", error_description: "Invalid or unissued authorization code" }, 400);
      }
      if (authCode.used) {
        return c.json({ error: "invalid_grant", error_description: "Authorization code has already been used" }, 400);
      }
      if (Date.now() > authCode.expiresAt) {
        return c.json({ error: "invalid_grant", error_description: "Authorization code has expired" }, 400);
      }
      authCode.used = true;
      const clientId = body.client_id ?? "anon";
      if (authCode.clientId && authCode.clientId !== clientId) {
        return c.json({ error: "invalid_grant", error_description: "client_id mismatch for authorization code" }, 400);
      }
      if (authCode.redirectUri && body.redirect_uri && authCode.redirectUri !== body.redirect_uri) {
        return c.json({ error: "invalid_grant", error_description: "redirect_uri mismatch for authorization code" }, 400);
      }
      if (authCode.codeChallenge) {
        const codeVerifier = body.code_verifier;
        if (!codeVerifier || typeof codeVerifier !== "string") {
          return c.json({ error: "invalid_grant", error_description: "Missing PKCE code_verifier" }, 400);
        }
        let computedChallenge = codeVerifier;
        if (authCode.codeChallengeMethod === "S256" || !authCode.codeChallengeMethod) {
          computedChallenge = crypto2.createHash("sha256").update(codeVerifier).digest("base64url");
        }
        if (computedChallenge !== authCode.codeChallenge) {
          return c.json({ error: "invalid_grant", error_description: "PKCE verification failed" }, 400);
        }
      }
      sub = `agent_${authCode.clientId}_${authCode.code.slice(-8)}`;
      tokenScope = authCode.scope || tokenScope;
    } else if (grantType === "client_credentials") {
      const clientId = body.client_id;
      const clientSecret = body.client_secret;
      if (!clientId) {
        return c.json({ error: "invalid_client", error_description: "Missing client_id" }, 401);
      }
      const client = oauthClients.get(clientId);
      if (!client) {
        return c.json({ error: "invalid_client", error_description: "Unknown client_id" }, 401);
      }
      if (client.clientSecret && client.clientSecret !== clientSecret) {
        return c.json({ error: "invalid_client", error_description: "Invalid client_secret" }, 401);
      }
      sub = `client_${clientId}`;
    }
    const now = Math.floor(Date.now() / 1000);
    const jti = crypto2.randomUUID();
    const expiresIn = 3600;
    const secret = process.env.JWT_SECRET || crypto2.createHmac("sha256", config.adminSyncToken || "agentum-dev-only").update("agentum:jwt:v1").digest("hex");
    const accessToken = await sign2({
      iss: config.publicBaseUrl,
      sub,
      jti,
      scope: tokenScope,
      iat: now,
      exp: now + expiresIn
    }, secret, "HS256");
    return c.json({
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: expiresIn,
      refresh_token: `agm_ref_${crypto2.randomUUID().replace(/-/g, "")}`,
      scope: tokenScope
    });
  });
  app.get("/privacy", (c) => c.html(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><title>Privacy Policy \u2014 Agentum</title>
<style>body{font-family:system-ui,sans-serif;max-width:720px;margin:40px auto;padding:0 20px;line-height:1.6;color:#111}</style></head>
<body>
  <h1>Agentum Privacy Policy</h1>
  <p><strong>Effective Date:</strong> November 3, 2026</p>
  <p>Agentum (<code>${config.publicBaseUrl}</code>) provides deterministic corporate entity resolution, EU VIES VAT validation, and public sanctions screening for AI agents and developers.</p>
  <h2>1. Data Processed</h2>
  <p>Agentum queries public corporate registries (GLEIF, US SEC EDGAR, Lithuania Registr\u0173 centras JAR, EU Commission VIES) and public sanctions lists (OFAC SDN, EU Financial Sanctions, UN Security Council). We do not store personal user conversations or sell caller data.</p>
  <h2>2. Rate Limiting &amp; Payment Receipts</h2>
  <p>Anonymous caller fingerprints (hashed IP or <code>X-Agent-Id</code>) and spent HTTP 402 payment nonces (<code>x402</code> / <code>MPP</code>) are stored temporarily in Redis for daily free-quota enforcement and replay protection.</p>
  <h2>3. Contact</h2>
  <p>Questions: <a href="https://github.com/Algiras/agentum-skills">github.com/Algiras/agentum-skills</a></p>
</body></html>`));
  app.get("/terms", (c) => c.html(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><title>Terms of Service \u2014 Agentum</title>
<style>body{font-family:system-ui,sans-serif;max-width:720px;margin:40px auto;padding:0 20px;line-height:1.6;color:#111}</style></head>
<body>
  <h1>Agentum Terms of Service</h1>
  <p><strong>Effective Date:</strong> November 3, 2026</p>
  <p>By accessing Agentum (<code>${config.publicBaseUrl}</code>) via MCP or REST, you agree that registry and sanctions results are provided on an "as-is" informational basis from official upstream public sources (GLEIF, SEC EDGAR, EU VIES, OFAC, EU FSF, UN SC) and do not constitute formal legal counsel.</p>
</body></html>`));
  app.get("/.well-known/ai-plugin.json", (c) => {
    return c.json({
      schema_version: "v1",
      name_for_human: "Agentum Entity & Compliance Resolver",
      name_for_model: "agentum_entity_resolver",
      description_for_human: "Resolve global companies (UK CRN, Swiss UID, Singapore UEN, US SEC CIK, EU registries, LEI), validate EU VAT via VIES, and screen OFAC/EU/UN sanctions.",
      description_for_model: "Use this plugin whenever you need to verify a company registration number, look up an LEI or US SEC CIK, validate a European Union VAT number via VIES, or screen a company/individual against OFAC SDN, EU Financial Sanctions, and UN Security Council lists. Includes daily free quota; supports x402 v2 and Stripe/Tempo MPP micropayments.",
      auth: {
        type: "none"
      },
      api: {
        type: "openapi",
        url: `${config.publicBaseUrl}/openapi.json`
      },
      logo_url: `${config.publicBaseUrl}/logo.svg`,
      contact_email: "compliance@asimplek.cloud",
      legal_info_url: `${config.publicBaseUrl}/terms`,
      privacy_policy_url: `${config.publicBaseUrl}/privacy`
    });
  });
  const handleA2aCard = (c) => {
    return c.json({
      name: "Agentum Compliance & Entity Resolver Agent",
      description: "Deterministic global corporate entity resolution (UK Companies House, Swiss ZEFIX, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI), live EU VIES VAT validation, and OFAC/EU/UN sanctions screening.",
      url: config.publicBaseUrl,
      mcpUrl: `${config.publicBaseUrl}/mcp`,
      version: "0.2.0",
      provider: {
        organization: "Agentum Network",
        url: "https://github.com/Algiras/agentum-skills"
      },
      capabilities: {
        streaming: true,
        pushNotifications: false,
        stateTransitionHistory: false
      },
      authentication: {
        schemes: ["none", "x402", "Payment"],
        freeTierCallsPerDay: config.freeCallsPerDay
      },
      defaultInputModes: ["application/json", "text/plain"],
      defaultOutputModes: ["application/json"],
      skills: registry.getAll().map((t) => ({
        id: t.mcpName,
        name: t.summary,
        description: t.description,
        tags: [t.category, "kyb", "compliance", "entity-resolution", "sanctions", "vat"],
        examples: t.mcpName === "resolve_entity" ? ["Resolve NVIDIA CORP (US)", "Resolve Revolut Bank UAB (LT)", "Resolve Nestle SA (CH)"] : t.mcpName === "verify_eu_vat" ? ["Verify EU VAT IE6388047V", "Verify EU VAT LT100011706713", "Verify EU VAT DE129274202"] : ["Screen SEVERSTAL PAO against OFAC and EU sanctions"]
      }))
    });
  };
  app.get("/.well-known/agent.json", handleA2aCard);
  app.get("/.well-known/agent-card.json", handleA2aCard);
  app.get("/.well-known/x402.json", (c) => {
    return c.json({
      x402Version: 2,
      service: "agentum-entity-resolver",
      description: "Deterministic Global Corporate Entity, EU VIES VAT & OFAC/EU/UN Sanctions Resolver",
      network: config.x402Network,
      payTo: config.x402PayToEvm,
      facilitatorUrl: config.x402FacilitatorUrl,
      freeCallsPerDay: config.freeCallsPerDay,
      mcpEndpoint: `${config.publicBaseUrl}/mcp`,
      resources: registry.getAll().map((t) => ({
        resource: `${config.publicBaseUrl}${t.httpPath}`,
        method: t.httpMethod,
        mcpTool: t.mcpName,
        description: t.description,
        scheme: "exact",
        priceUsd: t.priceUsd,
        network: config.x402Network,
        payTo: config.x402PayToEvm,
        inputSchema: registry.toJsonSchema(t.inputSchema),
        outputSchema: registry.toJsonSchema(t.outputSchema)
      }))
    });
  });
  app.get("/.well-known/mpp.json", (c) => {
    return c.json({
      protocol: "mpp",
      version: "1.0",
      service: "agentum-entity-resolver",
      currency: "USD",
      methods: config.stripeSecretKey ? ["stripe", "tempo"] : ["tempo"],
      recipient: config.tempoRecipientAddress,
      testnet: config.tempoTestnet,
      freeCallsPerDay: config.freeCallsPerDay,
      mcpEndpoint: `${config.publicBaseUrl}/mcp`,
      endpoints: registry.getAll().map((t) => ({
        url: `${config.publicBaseUrl}${t.httpPath}`,
        method: t.httpMethod,
        mcpTool: t.mcpName,
        priceUsd: t.priceUsd,
        description: t.description
      }))
    });
  });
  app.get("/robots.txt", (c) => {
    const txt = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

# Agent & LLM Discovery Endpoints
# LLMs.txt: ${config.publicBaseUrl}/llms.txt
# LLMs-Full.txt: ${config.publicBaseUrl}/llms-full.txt
# MCP Manifest: ${config.publicBaseUrl}/.well-known/mcp.json
# OpenAPI 3.1: ${config.publicBaseUrl}/openapi.json
Sitemap: ${config.publicBaseUrl}/sitemap.xml
`;
    return c.text(txt, 200, { "Content-Type": "text/plain; charset=utf-8" });
  });
  app.get("/sitemap.xml", (c) => {
    const urls = [
      "",
      "/health",
      "/v1/entity/resolve",
      "/v1/entity/vat-verify",
      "/v1/entity/sanctions-screen",
      "/v1/compliance/check-vendor",
      "/v1/compliance/verify-bank-payee",
      "/v1/entity/batch-resolve",
      "/llms.txt",
      "/llms-full.txt",
      "/openapi.json",
      "/.well-known/mcp.json",
      "/.well-known/mcp/server-card",
      "/.well-known/ai-plugin.json",
      "/.well-known/agent.json",
      "/.well-known/x402.json",
      "/.well-known/mpp.json",
      "/terms",
      "/privacy"
    ];
    const now = new Date().toISOString().split("T")[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${config.publicBaseUrl}${u}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u === "" || u.startsWith("/v1/") ? "daily" : "weekly"}</changefreq>
    <priority>${u === "" ? "1.0" : u.startsWith("/v1/") ? "0.95" : u.includes("llms") || u.includes("mcp") ? "0.9" : "0.7"}</priority>
  </url>`).join(`
`)}
</urlset>`;
    return c.text(xml, 200, { "Content-Type": "application/xml; charset=utf-8" });
  });
  app.get("/e4c8b2d1f9a34e5687b1c0d4f2a59e71.txt", (c) => {
    return c.text("e4c8b2d1f9a34e5687b1c0d4f2a59e71", 200, {
      "Content-Type": "text/plain; charset=utf-8"
    });
  });
  app.get("/google*", (c) => {
    const path = c.req.path.replace(/^\//, "");
    if (path.endsWith(".html")) {
      return c.text(`google-site-verification: ${path}`, 200, {
        "Content-Type": "text/html; charset=utf-8"
      });
    }
    return c.text("Not found", 404);
  });
  app.get("/llms.txt", (c) => {
    const toolsList = registry.getAll().map((t) => `- \`${t.httpMethod} ${t.httpPath}\` (MCP: \`${t.mcpName}\`, $${t.priceUsd}/call): ${t.summary} \u2014 ${t.description}`).join(`
`);
    const body = `# Agentum \u2014 Global Corporate Entity, VAT & Sanctions Resolver for AI Agents

> Deterministic global company registration resolution across national registries (UK Companies House, Swiss ZEFIX, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI), live EU Commission VIES VAT validation, corporate bank payee verification, and OFAC/EU/UN sanctions screening.

## Access & Pricing
- **Free Tier:** ${config.freeCallsPerDay} free calls/day per agent (\`X-Agent-Id\` or IP) \u2014 zero signup or API keys required.
- **Inline HTTP 402 Micropayments:**
  1. **x402 v2 (\`PAYMENT-REQUIRED\` / \`PAYMENT-SIGNATURE\`):** Settles USDC on \`${config.x402Network}\` to \`${config.x402PayToEvm}\`.
  2. **Stripe + Tempo MPP (\`WWW-Authenticate: Payment\` / \`Authorization: Payment\`):** Settles Tempo stablecoins and Stripe PaymentIntents / Shared Payment Tokens.

## Machine Discovery Endpoints
- Streamable HTTP MCP Server: ${config.publicBaseUrl}/mcp
- MCP Manifest: ${config.publicBaseUrl}/.well-known/mcp.json
- OpenAPI 3.1 Spec: ${config.publicBaseUrl}/openapi.json
- OpenAI Plugin Manifest: ${config.publicBaseUrl}/.well-known/ai-plugin.json
- A2A Agent Card: ${config.publicBaseUrl}/.well-known/agent.json
- x402 Bazaar Manifest: ${config.publicBaseUrl}/.well-known/x402.json
- MPP Manifest: ${config.publicBaseUrl}/.well-known/mpp.json
- Full LLM Guide: ${config.publicBaseUrl}/llms-full.txt
- Skills & Plugin Repo: https://github.com/Algiras/agentum-skills

## Available Tools
${toolsList}
`;
    return c.text(body, 200, { "Content-Type": "text/plain; charset=utf-8" });
  });
  app.get("/llms-full.txt", (c) => {
    const detailedTools = registry.getAll().map((t) => `### ${t.mcpName} (\`${t.httpMethod} ${t.httpPath}\` \u2014 $${t.priceUsd} USD)
${t.description}

Input JSON Schema:
\`\`\`json
${JSON.stringify(registry.toJsonSchema(t.inputSchema), null, 2)}
\`\`\``).join(`

`);
    const body = `# Agentum \u2014 Complete Technical Reference for AI Agents (llms-full.txt)

Base URL: ${config.publicBaseUrl}
MCP Streamable HTTP Endpoint: ${config.publicBaseUrl}/mcp
Public Skills Repo: https://github.com/Algiras/agentum-skills

## 1. Quick Connect
\`\`\`bash
claude mcp add --transport http agentum ${config.publicBaseUrl}/mcp
npx skills add Algiras/agentum-skills
\`\`\`

## 2. Tools & Schemas
${detailedTools}

## 3. MCP Capabilities
- Tools: \`resolve_entity\`, \`verify_eu_vat\`, \`screen_sanctions\`, \`check_vendor\`, \`verify_bank_payee\`, \`batch_resolve\` (pass \`_meta: { "compact": true }\` for compact summaries + \`resource_link\`)
- Resources: \`agentum://entity/{query}/compact\`, \`agentum://entity/{query}\`, \`agentum://vat/{vatNumber}\`, \`agentum://sanctions/{name}\`, \`agentum://results/{requestId}\`, \`agentum://pricing\`, \`agentum://jurisdictions\`, \`agentum://registries/coverage\`
- Prompts: \`kyb_due_diligence_report\`, \`sanctions_escalation_review\`, \`vendor_onboarding_check\`
- Elicitation & Sampling: \`elicitation/prepare\`, \`sampling/prepare\`, inline \`_meta.elicitation\` and \`_meta.samplingRequest\`
`;
    return c.text(body, 200, { "Content-Type": "text/plain; charset=utf-8" });
  });
  app.get("/.well-known/mcp.json", (c) => {
    return c.json({
      mcpVersion: "2025-03-26",
      name: "agentum-entity-resolver",
      version: "0.2.0",
      description: "Deterministic Global Corporate Entity, VAT & Sanctions Resolver with x402 v2 and Stripe/Tempo MPP micropayments",
      transport: {
        type: "streamable-http",
        url: `${config.publicBaseUrl}/mcp`
      },
      capabilities: {
        tools: true,
        resources: true,
        resourceTemplates: true,
        prompts: true,
        completions: true,
        logging: true,
        elicitation: true,
        sampling: true
      },
      authentication: {
        freeTierCallsPerDay: config.freeCallsPerDay,
        protocols: ["x402-v2", "mpp-tempo-stripe"]
      },
      tools: registry.getAll().map((t) => ({
        name: t.mcpName,
        httpPath: t.httpPath,
        description: t.description,
        priceUsd: t.priceUsd,
        inputSchema: registry.toJsonSchema(t.inputSchema)
      })),
      prompts: [
        "kyb_due_diligence_report",
        "sanctions_escalation_review",
        "vendor_onboarding_check"
      ],
      resources: [
        "agentum://pricing",
        "agentum://registries/coverage",
        "agentum://jurisdictions",
        "agentum://entity/{query}",
        "agentum://entity/{query}/compact",
        "agentum://vat/{vatNumber}",
        "agentum://sanctions/{name}",
        "agentum://results/{requestId}"
      ]
    });
  });
}

// ../../agentum-clean-release/agentum/src/adapters/inbound/http/rest.adapter.ts
import crypto4 from "crypto";

// ../../../../Projects/agentum/node_modules/hono/dist/middleware/bearer-auth/index.js
var TOKEN_STRINGS = "[A-Za-z0-9._~+/-]+=*";
var PREFIX = "Bearer";
var HEADER = "Authorization";
var bearerAuth = (options) => {
  if (!(("token" in options) || ("verifyToken" in options)))
    throw new Error('bearer auth middleware requires options for "token" or "verifyToken"');
  if (!options.realm)
    options.realm = "";
  if (options.prefix === undefined)
    options.prefix = PREFIX;
  const realm = options.realm?.replace(/"/g, "\\\"");
  const prefix = options.prefix;
  const tokenRegexp = new RegExp(`^${TOKEN_STRINGS}$`);
  const wwwAuthenticatePrefix = prefix === "" ? "" : `${prefix} `;
  const throwHTTPException = async (c, status, wwwAuthenticateHeader, messageOption) => {
    const wwwAuthenticateHeaderValue = typeof wwwAuthenticateHeader === "function" ? await wwwAuthenticateHeader(c) : wwwAuthenticateHeader;
    const headers = { "WWW-Authenticate": typeof wwwAuthenticateHeaderValue === "string" ? wwwAuthenticateHeaderValue : `${wwwAuthenticatePrefix}${Object.entries(wwwAuthenticateHeaderValue).map(([key, value]) => `${key}="${value}"`).join(",")}` };
    const responseMessage = typeof messageOption === "function" ? await messageOption(c) : messageOption;
    const res = typeof responseMessage === "string" ? new Response(responseMessage, {
      status,
      headers
    }) : new Response(JSON.stringify(responseMessage), {
      status,
      headers: {
        ...headers,
        "content-type": "application/json"
      }
    });
    throw new HTTPException(status, { res });
  };
  return async function bearerAuth(c, next) {
    const headerToken = c.req.header(options.headerName || HEADER);
    if (!headerToken)
      await throwHTTPException(c, 401, options.noAuthenticationHeader?.wwwAuthenticateHeader || `${wwwAuthenticatePrefix}realm="${realm}"`, options.noAuthenticationHeader?.message || options.noAuthenticationHeaderMessage || "Unauthorized");
    else {
      let tokenValue;
      if (prefix === "")
        tokenValue = headerToken;
      else {
        const headerLower = headerToken.toLowerCase();
        const prefixLower = prefix.toLowerCase();
        if (headerLower.startsWith(prefixLower) && headerToken[prefix.length] === " ")
          tokenValue = headerToken.slice(prefix.length).trimStart();
      }
      if (!tokenValue || !tokenRegexp.test(tokenValue))
        await throwHTTPException(c, 400, options.invalidAuthenticationHeader?.wwwAuthenticateHeader || `${wwwAuthenticatePrefix}error="invalid_request"`, options.invalidAuthenticationHeader?.message || options.invalidAuthenticationHeaderMessage || "Bad Request");
      else {
        let equal = false;
        if ("verifyToken" in options)
          equal = await options.verifyToken(tokenValue, c);
        else if (typeof options.token === "string")
          equal = await timingSafeEqual(options.token, tokenValue, options.hashFunction);
        else if (Array.isArray(options.token) && options.token.length > 0) {
          for (const token of options.token)
            if (await timingSafeEqual(token, tokenValue, options.hashFunction)) {
              equal = true;
              break;
            }
        }
        if (!equal)
          await throwHTTPException(c, 401, options.invalidToken?.wwwAuthenticateHeader || `${wwwAuthenticatePrefix}error="invalid_token"`, options.invalidToken?.message || options.invalidTokenMessage || "Unauthorized");
      }
    }
    await next();
  };
};

// ../../agentum-clean-release/agentum/src/adapters/outbound/telemetry/railway-logger.ts
function classifyAgentFamily(ua) {
  const lower = ua.toLowerCase();
  if (lower.includes("claude") || lower.includes("anthropic"))
    return "Anthropic-Claude";
  if (lower.includes("chatgpt") || lower.includes("openai") || lower.includes("gptbot"))
    return "OpenAI-ChatGPT";
  if (lower.includes("mistral") || lower.includes("httpx2"))
    return "Mistral-LeChat";
  if (lower.includes("gemini") || lower.includes("google"))
    return "Google-Gemini";
  if (lower.includes("mcp") || lower.includes("httpx") || lower.includes("python"))
    return "MCP-SDK-Client";
  if (lower.includes("mozilla") || lower.includes("chrome") || lower.includes("safari"))
    return "Browser";
  return "Autonomous-Agent";
}

class RailwayTelemetryTracker {
  recentEvents = [];
  maxRecent = 150;
  totalRequests = 0;
  byMcpMethod = {};
  byTool = {};
  byPaymentRail = {};
  byAgentFamily = {};
  byStatus = {};
  log(event) {
    const full = {
      timestamp: new Date().toISOString(),
      ...event
    };
    console.log(JSON.stringify({
      level: full.level,
      msg: full.msg,
      service: "agentum",
      timestamp: full.timestamp,
      ...full.method ? { httpMethod: full.method } : {},
      ...full.path ? { path: full.path } : {},
      ...full.status !== undefined ? { status: full.status } : {},
      ...full.durationMs !== undefined ? { durationMs: full.durationMs } : {},
      ...full.mcpMethod ? { mcpMethod: full.mcpMethod } : {},
      ...full.toolName ? { toolName: full.toolName } : {},
      ...full.paymentRail ? { paymentRail: full.paymentRail } : {},
      ...full.agentFamily ? { agentFamily: full.agentFamily } : {},
      ...full.userAgent ? { userAgent: full.userAgent.slice(0, 120) } : {},
      ...full.sessionId ? { sessionId: full.sessionId } : {},
      ...full.error ? { error: full.error } : {}
    }));
    this.totalRequests += 1;
    if (full.mcpMethod) {
      this.byMcpMethod[full.mcpMethod] = (this.byMcpMethod[full.mcpMethod] ?? 0) + 1;
    }
    if (full.toolName) {
      this.byTool[full.toolName] = (this.byTool[full.toolName] ?? 0) + 1;
    }
    if (full.paymentRail) {
      this.byPaymentRail[full.paymentRail] = (this.byPaymentRail[full.paymentRail] ?? 0) + 1;
    }
    if (full.agentFamily) {
      this.byAgentFamily[full.agentFamily] = (this.byAgentFamily[full.agentFamily] ?? 0) + 1;
    }
    if (full.status !== undefined) {
      const key = String(full.status);
      this.byStatus[key] = (this.byStatus[key] ?? 0) + 1;
    }
    this.recentEvents.unshift(full);
    if (this.recentEvents.length > this.maxRecent) {
      this.recentEvents.pop();
    }
  }
  getSummary() {
    return {
      totalTrackedEvents: this.totalRequests,
      byAgentFamily: { ...this.byAgentFamily },
      byMcpMethod: { ...this.byMcpMethod },
      byTool: { ...this.byTool },
      byPaymentRail: { ...this.byPaymentRail },
      byStatus: { ...this.byStatus }
    };
  }
  getFullReport() {
    return {
      ...this.getSummary(),
      recentEvents: this.recentEvents.slice(0, 50)
    };
  }
}
var globalTelemetry = new RailwayTelemetryTracker;

// ../../agentum-clean-release/agentum/src/adapters/inbound/http/dual-402.middleware.ts
import crypto3 from "crypto";
function computeCallerFingerprint(headers, connection) {
  if (connection?.production) {
    const identity = connection.address || "anonymous-no-transport-address";
    return crypto3.createHash("sha256").update(identity).digest("hex");
  }
  const normalized = {};
  for (const [key, value] of Object.entries(headers)) {
    if (value !== undefined) {
      normalized[key.toLowerCase()] = value;
    }
  }
  const clientIp = normalized["cf-connecting-ip"] || normalized["x-real-ip"] || (normalized["x-forwarded-for"] ? normalized["x-forwarded-for"].split(",")[0].trim() : undefined);
  const raw = clientIp || normalized["x-agent-id"] || "anonymous-local";
  return crypto3.createHash("sha256").update(raw).digest("hex");
}
async function evaluateDual402Gate(opts) {
  const normalizedHeaders = {};
  for (const [k, v] of Object.entries(opts.headers)) {
    if (v !== undefined) {
      normalizedHeaders[k.toLowerCase()] = v;
    }
  }
  const challengeContext = {
    priceUsd: opts.priceUsd,
    resource: opts.resource,
    description: opts.description
  };
  const buildChallenge = () => {
    const x402Ch = opts.x402Verifier.buildChallenge(challengeContext);
    const mppCh = opts.mppVerifier.buildChallenge(challengeContext);
    return {
      priceUsd: opts.priceUsd,
      resource: opts.resource,
      description: opts.description,
      x402HeaderBase64: x402Ch.headerValue,
      x402Payload: x402Ch.payload,
      mppWwwAuthenticate: mppCh.headerValue,
      mppChallengeId: mppCh.payload.id ?? ""
    };
  };
  const hasPayment = normalizedHeaders["payment-signature"] || normalizedHeaders["x-payment"] || opts.metaPayment?.x402 || opts.metaPayment?.mpp || normalizedHeaders.authorization?.trim().toLowerCase().startsWith("payment ");
  if (hasPayment && opts.config.nodeEnv === "production" && opts.config.paymentMode === "live" && (!opts.config.redisUrl || !opts.config.featureReplayProtection)) {
    return { allowed: false, challenge: buildChallenge(), error: "Live production payments require shared replay protection" };
  }
  const verifyPayment = async (credential, spentKey, rail, verifier) => {
    const ledger = opts.config.paymentMode === "live" ? opts.paymentLedger : undefined;
    const serviceFailure = () => ({ allowed: false, challenge: buildChallenge(), reconciliationRequired: true, error: "Payment status requires reconciliation; do not pay again" });
    if (opts.config.nodeEnv === "production" && opts.config.paymentMode === "live" && (!ledger || !opts.config.featureStrictPayments))
      return serviceFailure();
    if (credential.length > 16384)
      return { allowed: false, challenge: buildChallenge(), error: "Payment credential exceeds size limit" };
    if (!ledger && opts.config.featureReplayProtection) {
      try {
        if (!await opts.cacheStore.claimOnce(spentKey, 604800))
          return { allowed: false, challenge: buildChallenge(), error: "Payment credential replay detected" };
      } catch {
        return serviceFailure();
      }
    }
    const key = crypto3.createHash("sha256").update(spentKey).digest("hex");
    const bounded = async (promise, timeoutMs = 2000) => {
      let timer;
      try {
        return await Promise.race([promise, new Promise((_, reject) => {
          timer = setTimeout(() => reject(new Error("Payment ledger timeout")), timeoutMs);
        })]);
      } finally {
        if (timer)
          clearTimeout(timer);
      }
    };
    let authenticated;
    let settle;
    if (ledger) {
      try {
        if (await bounded(ledger.find(key)))
          return serviceFailure();
        const day = new Date().toISOString().slice(0, 10);
        if (await bounded(opts.cacheStore.incrementDailyQuota(`payment-preflight:${opts.fingerprint}`, day)) > 100)
          return serviceFailure();
        if (rail === "X402" && verifier.prepareForClaim) {
          const prepared = await bounded(verifier.prepareForClaim(credential, challengeContext), 12000);
          authenticated = prepared.authentication;
          settle = prepared.settle;
        } else {
          if (!verifier.verifyBeforeClaim)
            return serviceFailure();
          authenticated = await bounded(verifier.verifyBeforeClaim(credential, challengeContext), 12000);
        }
        if (!authenticated.verified) {
          if (authenticated.outcome === "REJECTED")
            return { allowed: false, challenge: buildChallenge(), error: authenticated.error };
          return serviceFailure();
        }
        const path = new URL(opts.resource, opts.config.publicBaseUrl).pathname;
        if (!await bounded(ledger.claim({ key, rail, resource: path, priceUsd: opts.priceUsd, fingerprint: opts.fingerprint, providerReference: rail === "MPP" ? credential.match(/\b(pi_[A-Za-z0-9_]{10,})\b/)?.[1] : undefined })))
          return serviceFailure();
      } catch {
        return serviceFailure();
      }
    }
    let verification;
    try {
      verification = authenticated && rail === "MPP" ? authenticated : settle ? await bounded(settle(), 12000) : await bounded(verifier.verifyAndSettle(credential, challengeContext), 12000);
    } catch {
      verification = { verified: false, rail, outcome: "UNCERTAIN" };
    }
    const status = verification.verified ? "SETTLED" : verification.outcome === "REJECTED" ? "REJECTED" : "UNCERTAIN";
    if (ledger) {
      try {
        await bounded(ledger.complete(key, status, verification.settlementReference));
      } catch {
        return serviceFailure();
      }
    }
    if (verification.verified)
      return { allowed: true, verification };
    if (status === "UNCERTAIN" && ledger)
      return serviceFailure();
    return { allowed: false, challenge: buildChallenge(), error: verification.error };
  };
  const x402Cred = normalizedHeaders["payment-signature"] ?? normalizedHeaders["x-payment"] ?? opts.metaPayment?.x402;
  if (x402Cred) {
    let identity = x402Cred.trim();
    try {
      const payload = JSON.parse(identity.startsWith("{") ? identity : Buffer.from(identity, "base64").toString("utf8"));
      const auth = payload.payload?.authorization;
      identity = auth?.nonce && auth?.from ? `${opts.config.x402Network}:${String(auth.from).toLowerCase()}:${String(auth.nonce).toLowerCase()}` : String(payload.payload?.signature ?? payload.signature ?? identity).toLowerCase();
    } catch {}
    const spentKey = `agentum:spent:x402:${crypto3.createHash("sha256").update(identity).digest("hex")}`;
    return verifyPayment(x402Cred, spentKey, "X402", opts.x402Verifier);
  }
  const authHeader = normalizedHeaders["authorization"];
  let mppCred = opts.metaPayment?.mpp;
  if (authHeader && authHeader.trim().toLowerCase().startsWith("payment ")) {
    mppCred = authHeader;
  }
  if (mppCred) {
    const piMatch = mppCred.match(/\b(pi_[A-Za-z0-9_]{10,})\b/);
    const spentKey = piMatch ? `agentum:spent:stripe:${piMatch[1]}` : `agentum:spent:mpp:${crypto3.createHash("sha256").update(mppCred.trim()).digest("hex")}`;
    return verifyPayment(mppCred, spentKey, "MPP", opts.mppVerifier);
  }
  const dateKey = new Date().toISOString().slice(0, 10);
  const currentUsed = await opts.cacheStore.getDailyQuota(opts.fingerprint, dateKey);
  if (currentUsed >= opts.config.freeCallsPerDay) {
    return {
      allowed: false,
      challenge: buildChallenge()
    };
  }
  const used = await opts.cacheStore.incrementDailyQuota(opts.fingerprint, dateKey);
  if (used <= opts.config.freeCallsPerDay) {
    return {
      allowed: true,
      verification: {
        verified: true,
        rail: "FREE",
        remainingFreeCalls: opts.config.freeCallsPerDay - used
      }
    };
  }
  return {
    allowed: false,
    challenge: buildChallenge()
  };
}
function createDual402Middleware(opts) {
  return async (c, next) => {
    const headers = {};
    if (c.req.raw && c.req.raw.headers) {
      c.req.raw.headers.forEach((val, key) => {
        headers[key.toLowerCase()] = val;
      });
    } else {
      const all = c.req.header();
      for (const [k, v] of Object.entries(all)) {
        if (typeof v === "string") {
          headers[k.toLowerCase()] = v;
        }
      }
    }
    const fingerprint = computeCallerFingerprint(headers, {
      production: opts.config.nodeEnv === "production",
      address: c.env?.remoteAddress
    });
    const resource = c.req.url;
    const gate = await evaluateDual402Gate({
      config: opts.config,
      cacheStore: opts.cacheStore,
      paymentLedger: opts.paymentLedger,
      x402Verifier: opts.x402Verifier,
      mppVerifier: opts.mppVerifier,
      fingerprint,
      priceUsd: opts.priceUsd,
      resource,
      description: opts.description,
      headers
    });
    if (!gate.allowed) {
      if (gate.reconciliationRequired)
        return c.json({ error: gate.error, reconciliationRequired: true }, 503);
      c.header("PAYMENT-REQUIRED", gate.challenge.x402HeaderBase64);
      c.header("WWW-Authenticate", gate.challenge.mppWwwAuthenticate);
      c.header("X-Free-Tier-Limit", String(opts.config.freeCallsPerDay));
      c.header("X-Free-Tier-Remaining", "0");
      return c.json({
        error: gate.error ?? "Payment Required: Daily free tier exhausted",
        priceUsd: opts.priceUsd,
        x402: gate.challenge.x402Payload,
        mpp: {
          wwwAuthenticate: gate.challenge.mppWwwAuthenticate,
          challengeId: gate.challenge.mppChallengeId
        }
      }, 402);
    }
    c.set("paymentVerification", gate.verification);
    c.set("callerFingerprint", fingerprint);
    c.header("X-Payment-Rail", gate.verification.rail);
    if (gate.verification.remainingFreeCalls !== undefined) {
      c.header("X-Free-Tier-Limit", String(opts.config.freeCallsPerDay));
      c.header("X-Free-Tier-Remaining", String(gate.verification.remainingFreeCalls));
    }
    if (gate.verification.receiptHeaderName && gate.verification.receiptHeaderValue) {
      c.header(gate.verification.receiptHeaderName, gate.verification.receiptHeaderValue);
    }
    await next();
    if (c.res) {
      if (!c.res.headers.has("X-Payment-Rail")) {
        c.res.headers.set("X-Payment-Rail", gate.verification.rail);
      }
      if (gate.verification.remainingFreeCalls !== undefined && !c.res.headers.has("X-Free-Tier-Remaining")) {
        c.res.headers.set("X-Free-Tier-Limit", String(opts.config.freeCallsPerDay));
        c.res.headers.set("X-Free-Tier-Remaining", String(gate.verification.remainingFreeCalls));
      }
      if (gate.verification.receiptHeaderName && gate.verification.receiptHeaderValue && !c.res.headers.has(gate.verification.receiptHeaderName)) {
        c.res.headers.set(gate.verification.receiptHeaderName, gate.verification.receiptHeaderValue);
      }
    }
  };
}

// ../../agentum-clean-release/agentum/src/adapters/inbound/http/rest.adapter.ts
function mountRestToolsAdapter(app, deps) {
  for (const tool of deps.registry.getAll()) {
    const paymentGate = createDual402Middleware({
      config: deps.config,
      cacheStore: deps.cacheStore,
      paymentLedger: deps.paymentLedger,
      x402Verifier: deps.x402Verifier,
      mppVerifier: deps.mppVerifier,
      priceUsd: tool.priceUsd,
      description: tool.summary
    });
    const validateInput = async (c, next) => {
      let rawBody = {};
      try {
        rawBody = await c.req.json();
      } catch {
        return c.json({ error: "Invalid JSON request body" }, 400);
      }
      const parsed = tool.inputSchema.safeParse(rawBody);
      if (!parsed.success) {
        return c.json({
          error: "Validation Error",
          issues: parsed.error.issues
        }, 400);
      }
      c.set("validatedBody", parsed.data);
      await next();
    };
    app.on(tool.httpMethod, tool.httpPath, validateInput, paymentGate, async (c) => {
      const parsedData = c.get("validatedBody");
      const verification = c.get("paymentVerification");
      const fingerprint = c.get("callerFingerprint") ?? "anonymous";
      const startMs = Date.now();
      const result = await tool.handler(parsedData, {
        callerFingerprint: fingerprint,
        paymentRail: verification?.rail ?? "FREE",
        remainingFreeCalls: verification?.remainingFreeCalls,
        requestId: crypto4.randomUUID()
      });
      const ua = c.req.header("user-agent") ?? "";
      globalTelemetry.log({
        level: "info",
        msg: `REST ${tool.httpMethod} ${tool.httpPath} [${tool.mcpName}]`,
        method: tool.httpMethod,
        path: tool.httpPath,
        status: 200,
        durationMs: Date.now() - startMs,
        toolName: tool.mcpName,
        paymentRail: verification?.rail ?? "FREE",
        agentFamily: classifyAgentFamily(ua),
        userAgent: ua
      });
      return c.json(result, 200);
    });
  }
  app.use("/v1/admin/*", bearerAuth({
    verifyToken: async (token) => {
      const expected = deps.config.adminSyncToken;
      if (!expected || expected.length === 0)
        return false;
      const a = Buffer.from(token);
      const b = Buffer.from(expected);
      if (a.length !== b.length)
        return false;
      return crypto4.timingSafeEqual(a, b);
    }
  }));
  app.get("/v1/admin/payment-consumptions", async (c) => {
    if (!deps.paymentLedger)
      return c.json({ error: "Payment ledger unavailable" }, 503);
    const raw = Number(c.req.query("limit") ?? "50");
    const limit = Number.isInteger(raw) ? Math.max(1, Math.min(raw, 100)) : 50;
    let timer;
    try {
      const records = await Promise.race([deps.paymentLedger.listRecent(limit), new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("timeout")), 2000);
      })]);
      return c.json({ records });
    } catch {
      return c.json({ error: "Payment ledger unavailable" }, 503);
    } finally {
      if (timer)
        clearTimeout(timer);
    }
  });
  app.get("/v1/admin/telemetry", (c) => {
    return c.json(globalTelemetry.getFullReport(), 200);
  });
  app.post("/v1/admin/sync", async (c) => {
    let sources;
    try {
      const body = await c.req.json();
      if (Array.isArray(body?.sources)) {
        sources = body.sources;
      }
    } catch {}
    const report = await deps.ingestWorker.runSync(sources);
    return c.json(report, 200);
  });
  app.get("/v1/admin/features", (c) => {
    return c.json({
      paymentMode: deps.config.paymentMode,
      features: {
        strictPayments: deps.config.featureStrictPayments,
        replayProtection: deps.config.featureReplayProtection,
        liveStripeVerify: deps.config.featureLiveStripeVerify,
        sanctionsWordMatch: deps.config.featureSanctionsWordMatch
      }
    });
  });
  app.post("/v1/admin/features", async (c) => {
    let body = {};
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON request body" }, 400);
    }
    if (body.paymentMode === "sandbox" || body.paymentMode === "live") {
      deps.config.paymentMode = body.paymentMode;
      const isLive = body.paymentMode === "live";
      deps.config.featureStrictPayments = isLive;
      deps.config.featureReplayProtection = isLive;
      deps.config.featureLiveStripeVerify = isLive;
    }
    if (typeof body.strictPayments === "boolean") {
      deps.config.featureStrictPayments = body.strictPayments;
    }
    if (typeof body.replayProtection === "boolean") {
      deps.config.featureReplayProtection = body.replayProtection;
    }
    if (typeof body.liveStripeVerify === "boolean") {
      deps.config.featureLiveStripeVerify = body.liveStripeVerify;
    }
    if (typeof body.sanctionsWordMatch === "boolean") {
      deps.config.featureSanctionsWordMatch = body.sanctionsWordMatch;
    }
    return c.json({
      updated: true,
      paymentMode: deps.config.paymentMode,
      features: {
        strictPayments: deps.config.featureStrictPayments,
        replayProtection: deps.config.featureReplayProtection,
        liveStripeVerify: deps.config.featureLiveStripeVerify,
        sanctionsWordMatch: deps.config.featureSanctionsWordMatch
      }
    });
  });
}

// ../../agentum-clean-release/agentum/src/adapters/inbound/mcp/mcp-http.adapter.ts
import crypto5 from "crypto";
var KNOWN_JURISDICTIONS = [
  "LT",
  "US",
  "DE",
  "IE",
  "GB",
  "FR",
  "NL",
  "EE",
  "LV",
  "PL",
  "SE",
  "FI",
  "ES",
  "IT"
];
var KNOWN_COMPANY_SUGGESTIONS = [
  "Ignitis grup\u0117 UAB",
  "Revolut Bank UAB",
  "Telia Lietuva AB",
  "Apple Inc.",
  "Stripe, Inc.",
  "Siemens AG",
  "NVIDIA CORP",
  "Alphabet Inc.",
  "Microsoft Corporation"
];
var MCP_PROMPTS = [
  {
    name: "kyb_due_diligence_report",
    description: "Generate a comprehensive Know-Your-Business (KYB) corporate resolution, EU VIES VAT validation, and OFAC/EU/UN sanctions compliance report for a company.",
    arguments: [
      {
        name: "companyName",
        description: "Legal name, registration code, LEI, or CIK of the company",
        required: true
      },
      {
        name: "jurisdiction",
        description: "ISO-2 country/jurisdiction hint (e.g., LT, US, DE, IE)",
        required: false
      },
      {
        name: "vatNumber",
        description: "Optional EU VAT number (e.g., LT100011706713, IE6388047V)",
        required: false
      }
    ]
  },
  {
    name: "sanctions_escalation_review",
    description: "Perform an adversarial sanctions and watchlist escalation review (including Cyrillic/Greek homoglyph and alias screening) across OFAC SDN, EU Financial Sanctions, UN Security Council, and UK FCDO Sanctions List.",
    arguments: [
      {
        name: "entityName",
        description: "Entity or individual name to screen",
        required: true
      },
      {
        name: "country",
        description: "Optional ISO-2 country code",
        required: false
      }
    ]
  },
  {
    name: "vendor_onboarding_check",
    description: "Automated procurement and accounts-payable vendor verification workflow combining entity resolution, live VAT check, and sanctions clearance.",
    arguments: [
      {
        name: "vendorName",
        description: "Vendor legal name or registration number",
        required: true
      },
      {
        name: "vatOrTaxId",
        description: "EU VAT number, US EIN/CIK, or national registration ID",
        required: false
      }
    ]
  }
];
function buildElicitationPayload(opts) {
  if (opts.reason === "payment_required") {
    return {
      method: "elicitation/create",
      params: {
        message: `Daily free quota exhausted. Approve micropayment ($${opts.priceUsd ?? "0.005"} USD) via Coinbase x402 v2 (Base USDC) or Stripe/Tempo MPP to continue tool execution.`,
        requestedSchema: {
          type: "object",
          properties: {
            rail: {
              type: "string",
              title: "Payment Rail",
              description: "Choose x402 (Base USDC) or MPP (Stripe/Tempo)",
              enum: ["x402", "mpp"],
              enumNames: ["Coinbase x402 v2 (USDC)", "Stripe / Tempo MPP"]
            },
            credential: {
              type: "string",
              title: "Payment Credential / Proof",
              description: "Base64 x402 PAYMENT-SIGNATURE payload or MPP Payment proof (e.g., pi_... or spt_...)"
            }
          },
          required: ["rail", "credential"]
        }
      }
    };
  }
  return {
    method: "elicitation/create",
    params: {
      message: `Additional corporate context is needed to disambiguate "${opts.query ?? ""}"${opts.candidatesCount ? ` (${opts.candidatesCount} candidates found)` : ""}. Please provide jurisdiction or exact registration identifier:`,
      requestedSchema: {
        type: "object",
        properties: {
          jurisdictionHint: {
            type: "string",
            title: "Jurisdiction (ISO-2)",
            description: "Two-letter country code (e.g., LT, US, DE, IE, GB)",
            enum: KNOWN_JURISDICTIONS
          },
          registrationId: {
            type: "string",
            title: "Registration Code / LEI / VAT / CIK",
            description: "Optional exact registration number, 20-char LEI, EU VAT, or SEC CIK"
          },
          includeSanctionsCheck: {
            type: "boolean",
            title: "Run OFAC/EU/UN Sanctions Screening",
            default: true
          }
        },
        required: ["jurisdictionHint"]
      }
    }
  };
}
function buildSamplingRequestPayload(opts) {
  return {
    method: "sampling/createMessage",
    params: {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Analyze the following deterministic corporate & compliance resolution data for "${opts.subject}" and provide a concise risk adjudication (CLEAR, REVIEW_REQUIRED, or BLOCKED) with rationale:

${JSON.stringify(opts.structuredData, null, 2)}`
          }
        }
      ],
      systemPrompt: "You are a senior corporate compliance and sanctions adjudication officer. Base your assessment strictly on the provided GLEIF, SEC EDGAR, EU VIES VAT, and OFAC/EU/UN sanctions records.",
      includeContext: "thisServer",
      maxTokens: 512,
      modelPreferences: {
        hints: [{ name: "claude-sonnet-4" }, { name: "gemini-2.5-flash" }],
        intelligencePriority: 0.8,
        speedPriority: 0.7,
        costPriority: 0.5
      }
    }
  };
}
function formatMarkdownSummary(toolName, output) {
  if (toolName === "resolve_entity") {
    if (!output.resolved) {
      return `\u274C Entity not resolved for query "${output.query ?? ""}".`;
    }
    const e = output.entity ?? {};
    const lines = [
      `### \uD83C\uDFE2 ${e.canonicalName ?? "Unknown Entity"} (${e.jurisdiction ?? "Global"})`,
      `- **Status:** ${e.status ?? "ACTIVE"}`,
      `- **Primary ID:** \`${e.primaryIdValue ?? "N/A"}\` (${e.primaryIdType ?? "REGISTRATION_NUMBER"})`,
      `- **Registry Source:** ${e.registrySource ?? "National Registry"}`,
      `- **Sanctions Clearance:** ${output.compliance?.sanctioned ? "\uD83D\uDEA8 SANCTIONED" : "\u2705 Clear"}`
    ];
    if (e.lei)
      lines.push(`- **LEI:** \`${e.lei}\``);
    if (e.secCik)
      lines.push(`- **SEC CIK:** \`${e.secCik}\``);
    if (e.incorporationDate)
      lines.push(`- **Incorporated:** ${e.incorporationDate}`);
    if (e.address?.street || e.address?.city) {
      const parts = [
        e.address.street,
        e.address.city,
        e.address.postalCode,
        e.address.country
      ].filter(Boolean);
      lines.push(`- **Address:** ${parts.join(", ")}`);
    }
    return lines.join(`
`);
  }
  if (toolName === "verify_eu_vat") {
    const lines = [
      `### \uD83C\uDDEA\uD83C\uDDFA EU VAT Verification: \`${output.vatNumber ?? ""}\``,
      `- **Validity:** ${output.valid ? "\u2705 VALID" : "\u274C INVALID"}`,
      `- **Company:** ${output.viesName ?? output.linkedEntity?.canonicalName ?? "N/A"}`
    ];
    if (output.viesAddress)
      lines.push(`- **Address:** ${output.viesAddress}`);
    if (output.linkedEntity?.primaryIdValue) {
      lines.push(`- **Linked Entity ID:** \`${output.linkedEntity.primaryIdValue}\` (${output.linkedEntity.jurisdiction})`);
    }
    return lines.join(`
`);
  }
  if (toolName === "screen_sanctions") {
    const hits = Array.isArray(output.matches) ? output.matches.length : 0;
    const lines = [
      `### \uD83D\uDEE1\uFE0F Sanctions Screening: "${output.query ?? ""}"`,
      `- **Status:** ${output.sanctioned ? "\uD83D\uDEA8 MATCH FOUND" : "\u2705 CLEAR"}`,
      `- **Matches:** ${hits}`
    ];
    if (hits > 0 && output.matches[0]) {
      lines.push(`- **Top Match:** ${output.matches[0].primaryName} (${output.matches[0].listSource}, score: ${output.matches[0].matchScore})`);
    }
    return lines.join(`
`);
  }
  if (toolName === "check_vendor") {
    const verdictIcon = output.verdict === "APPROVED" ? "\u2705" : output.verdict === "REJECTED" ? "\uD83D\uDEA8" : "\u26A0\uFE0F";
    const lines = [
      `### ${verdictIcon} Vendor KYB Verdict: **[${output.verdict ?? "UNKNOWN"}]**`,
      `- **Vendor:** ${output.vendorName ?? "N/A"}`,
      `- **Risk Level:** ${output.riskLevel ?? "CLEAR"}`,
      `- **Confidence:** ${Math.round((output.confidence ?? 0) * 100)}%`,
      `- **Sanctions Clearance:** ${output.sanctionsHit ? "\uD83D\uDEA8 SANCTIONED HIT" : "\u2705 CLEAR"}`,
      `- **VAT Status:** ${output.vatValid === true ? "\u2705 VALID" : output.vatValid === false ? "\u274C INVALID" : "N/A"}`
    ];
    if (output.entity) {
      lines.push(`- **Resolved Entity:** ${output.entity.canonicalName} (${output.entity.jurisdiction})`);
      if (output.entity.lei)
        lines.push(`- **LEI:** \`${output.entity.lei}\``);
    }
    if (Array.isArray(output.auditTrail) && output.auditTrail.length > 0) {
      lines.push(`
**Audit Trail:**`);
      output.auditTrail.forEach((line) => lines.push(`> ${line}`));
    }
    return lines.join(`
`);
  }
  if (toolName === "verify_bank_payee") {
    const statusIcon = output.valid ? "\u2705" : "\u274C";
    const lines = [
      `### ${statusIcon} IBAN Payee Validation: \`${output.normalizedIban ?? ""}\``,
      `- **Validity:** ${output.valid ? "\u2705 VALID" : "\u274C INVALID"}`,
      `- **Country Code:** ${output.countryCode ?? "N/A"}`,
      `- **Checksum (Mod-97):** ${output.checksumValid ? "\u2705 Valid" : "\u274C Failed"}`,
      `- **Country Match:** ${output.countryMatch === true ? "\u2705 Match" : output.countryMatch === false ? "\u26A0\uFE0F MISMATCH" : "N/A"}`
    ];
    if (output.bankCode)
      lines.push(`- **Bank Code:** \`${output.bankCode}\``);
    if (Array.isArray(output.issues) && output.issues.length > 0) {
      lines.push(`
**Observations:**`);
      output.issues.forEach((iss) => lines.push(`- ${iss}`));
    }
    return lines.join(`
`);
  }
  if (toolName === "batch_resolve") {
    const lines = [
      `### \uD83D\uDCE6 Batch Entity Resolution (${output.total ?? 0} items)`,
      `- **Resolved:** ${output.resolvedCount ?? 0} / ${output.total ?? 0}`,
      `- **Unresolved:** ${output.unresolvedCount ?? 0}`,
      `- **Duration:** ${output.durationMs ?? 0}ms`
    ];
    if (Array.isArray(output.results)) {
      lines.push(`
**Results:**`);
      output.results.slice(0, 10).forEach((r) => {
        lines.push(`- ${r.resolved ? "\u2705" : "\u274C"} **${r.query}**: ${r.resolved ? r.entity?.canonicalName ?? "Found" : r.error ?? "Not found"}`);
      });
      if (output.results.length > 10) {
        lines.push(`_...and ${output.results.length - 10} more items._`);
      }
    }
    return lines.join(`
`);
  }
  return JSON.stringify(output, null, 2);
}
function mountMcpHttpAdapter(app, deps) {
  let currentLogLevel = "info";
  app.get("/mcp", (c) => {
    const rawHeaders = {};
    c.req.raw?.headers?.forEach((v, k) => {
      rawHeaders[k.toLowerCase()] = v;
    });
    const incomingSessionId = rawHeaders["mcp-session-id"] ?? c.req.header("mcp-session-id") ?? crypto5.randomUUID();
    const accept = (rawHeaders["accept"] ?? c.req.header("accept") ?? "").toLowerCase();
    const ua = (rawHeaders["user-agent"] ?? c.req.header("user-agent") ?? "").toLowerCase();
    const hasSessionHeader = Boolean(rawHeaders["mcp-session-id"] || c.req.header("mcp-session-id"));
    globalTelemetry.log({
      level: "info",
      msg: `MCP GET probe (accept=${accept}, session=${hasSessionHeader})`,
      method: "GET",
      path: "/mcp",
      mcpMethod: "GET",
      agentFamily: classifyAgentFamily(ua),
      userAgent: ua,
      sessionId: incomingSessionId
    });
    if (accept.includes("text/event-stream") || hasSessionHeader) {
      return new Response(null, {
        status: 405,
        headers: {
          Allow: "POST, DELETE",
          "Mcp-Session-Id": incomingSessionId
        }
      });
    }
    c.header("Mcp-Session-Id", incomingSessionId);
    return c.json({
      protocolVersion: "2025-03-26",
      serverInfo: {
        name: "agentum-entity-resolver",
        version: "0.1.0"
      },
      transport: "streamable-http",
      endpoint: `${deps.config.publicBaseUrl}/mcp`,
      capabilities: {
        tools: { listChanged: false },
        resources: { subscribe: false, listChanged: false },
        prompts: { listChanged: false },
        completions: {},
        logging: {},
        experimental: {
          elicitation: true,
          sampling: true,
          x402: true,
          mpp: true
        }
      }
    });
  });
  app.delete("/mcp", (c) => {
    const incomingSessionId = c.req.header("mcp-session-id") ?? crypto5.randomUUID();
    return new Response(null, {
      status: 204,
      headers: { "Mcp-Session-Id": incomingSessionId }
    });
  });
  app.post("/mcp", async (c) => {
    const remoteAddress = typeof c.env === "object" && c.env !== null && "remoteAddress" in c.env && typeof c.env.remoteAddress === "string" ? c.env.remoteAddress : undefined;
    const incomingSessionId = c.req.header("mcp-session-id") ?? crypto5.randomUUID();
    c.header("Mcp-Session-Id", incomingSessionId);
    let rawPayload;
    try {
      rawPayload = await c.req.json();
    } catch {
      return c.json({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error" }
      }, 400);
    }
    const ua = c.req.header("user-agent") ?? "";
    const rpcMethod = Array.isArray(rawPayload) ? `batch(${rawPayload.length})` : String(rawPayload?.method ?? "unknown");
    const toolCalled = !Array.isArray(rawPayload) && rawPayload?.method === "tools/call" ? String(rawPayload?.params?.name ?? "") : undefined;
    globalTelemetry.log({
      level: "info",
      msg: `MCP POST ${rpcMethod}${toolCalled ? ` [${toolCalled}]` : ""}`,
      method: "POST",
      path: "/mcp",
      mcpMethod: rpcMethod,
      toolName: toolCalled,
      agentFamily: classifyAgentFamily(ua),
      userAgent: ua,
      sessionId: incomingSessionId
    });
    const rawHeaders = {};
    if (c.req.raw && c.req.raw.headers) {
      c.req.raw.headers.forEach((value, key) => {
        rawHeaders[key.toLowerCase()] = value;
      });
    } else {
      const all = c.req.header();
      for (const [k, v] of Object.entries(all)) {
        if (typeof v === "string") {
          rawHeaders[k.toLowerCase()] = v;
        }
      }
    }
    const handleSingleRpc = async (rpc) => {
      if (rpc.method === "notifications/initialized" || typeof rpc.method === "string" && rpc.method.startsWith("notifications/") || rpc.id === undefined && typeof rpc.method === "string" && ![
        "initialize",
        "ping",
        "tools/list",
        "tools/call",
        "resources/list",
        "resources/templates/list",
        "resources/read",
        "prompts/list",
        "prompts/get",
        "completion/complete",
        "logging/setLevel",
        "elicitation/prepare",
        "sampling/prepare"
      ].includes(rpc.method)) {
        return { isNotification: true };
      }
      const id = rpc.id ?? null;
      if (rpc.method === "ping") {
        return {
          isNotification: false,
          body: { jsonrpc: "2.0", id, result: {} }
        };
      }
      if (rpc.method === "initialize") {
        const clientCaps = rpc.params?.capabilities ?? {};
        const clientInfo = rpc.params?.clientInfo ?? {};
        const requestedProto = typeof rpc.params?.protocolVersion === "string" ? rpc.params.protocolVersion : "2025-03-26";
        const negotiatedProto = [
          "2025-06-18",
          "2025-03-26",
          "2024-11-05"
        ].includes(requestedProto) ? requestedProto : "2025-03-26";
        await deps.cacheStore.setCache(`agentum:mcp:session:${incomingSessionId}`, {
          clientInfo,
          capabilities: clientCaps,
          protocolVersion: negotiatedProto,
          userAgent: ua,
          agentFamily: classifyAgentFamily(ua)
        }, 86400);
        return {
          isNotification: false,
          body: {
            jsonrpc: "2.0",
            id,
            result: {
              protocolVersion: negotiatedProto,
              serverInfo: {
                name: "agentum-entity-resolver",
                version: "0.2.0"
              },
              instructions: `Use resolve_entity, verify_eu_vat, and screen_sanctions for authoritative global corporate entity resolution (UK, Switzerland, Singapore, US, EU, and worldwide GLEIF LEI), live EU VIES VAT validation, and OFAC/EU/UN sanctions screening. Includes ${deps.config.freeCallsPerDay} free calls/day; subsequent calls use x402 v2 or Stripe/Tempo MPP via HTTP headers or _meta.`,
              capabilities: {
                tools: { listChanged: false },
                resources: { subscribe: false, listChanged: false },
                prompts: { listChanged: false },
                completions: {},
                logging: {},
                experimental: {
                  elicitation: {
                    enabled: true,
                    clientSupported: Boolean(clientCaps.elicitation)
                  },
                  sampling: {
                    enabled: true,
                    clientSupported: Boolean(clientCaps.sampling)
                  },
                  x402: { version: 2 },
                  mpp: { version: "1.0" },
                  structuredContent: {
                    enabled: true,
                    modes: ["compact", "full", "markdown"]
                  }
                }
              }
            }
          }
        };
      }
      if (rpc.method === "logging/setLevel") {
        const requestedLevel = rpc.params?.level;
        if (typeof requestedLevel === "string") {
          currentLogLevel = requestedLevel;
        }
        return {
          isNotification: false,
          body: {
            jsonrpc: "2.0",
            id,
            result: { level: currentLogLevel }
          }
        };
      }
      if (rpc.method === "resources/list") {
        return {
          isNotification: false,
          body: {
            jsonrpc: "2.0",
            id,
            result: {
              resources: [
                {
                  uri: "agentum://pricing",
                  name: "Agentum Pricing & Dual-402 Payment Rails",
                  description: "Free tier quota and inline HTTP 402 micropayment configuration (Coinbase x402 v2 on Base + Stripe/Tempo MPP)",
                  mimeType: "application/json"
                },
                {
                  uri: "agentum://registries/coverage",
                  name: "Supported Corporate & Sanctions Registries",
                  description: "Coverage metadata for GLEIF LEI, US SEC EDGAR, Lithuania Registr\u0173 centras JAR, EU Commission VIES VAT, OFAC SDN, EU Financial Sanctions, UN Security Council, and UK FCDO Sanctions List",
                  mimeType: "application/json"
                },
                {
                  uri: "agentum://jurisdictions",
                  name: "Compact Supported Jurisdictions & Identifier Formats",
                  description: "Token-efficient reference of supported ISO-2 jurisdictions and primary corporate identifier formats (LEI, CIK, EIN, LT_JAR, EU_VAT)",
                  mimeType: "application/json"
                }
              ]
            }
          }
        };
      }
      if (rpc.method === "resources/templates/list") {
        return {
          isNotification: false,
          body: {
            jsonrpc: "2.0",
            id,
            result: {
              resourceTemplates: [
                {
                  uriTemplate: "agentum://entity/{query}",
                  name: "Canonical Corporate Entity Profile (Compact or Full)",
                  description: "Resolve any EU/US company by LEI, VAT, CIK, registration code, or legal name. Append /compact for a minimal token-saving card.",
                  mimeType: "application/json"
                },
                {
                  uriTemplate: "agentum://vat/{vatNumber}",
                  name: "Live EU VIES VAT Validation Record",
                  description: "Validate an EU VAT number (e.g., IE6388047V, LT100011706713) against the European Commission VIES system",
                  mimeType: "application/json"
                },
                {
                  uriTemplate: "agentum://sanctions/{name}",
                  name: "Global Sanctions Screening Summary",
                  description: "Compact sanctions screening summary (top 3 matches) against OFAC SDN, EU Consolidated Financial Sanctions, UN Security Council, and UK FCDO Sanctions List",
                  mimeType: "application/json"
                },
                {
                  uriTemplate: "agentum://results/{requestId}",
                  name: "Cached Tool Execution Result",
                  description: "Retrieve the full cached JSON payload of a prior MCP tool call by its requestId without re-executing or re-paying",
                  mimeType: "application/json"
                }
              ]
            }
          }
        };
      }
      if (rpc.method === "resources/read") {
        const uri = String(rpc.params?.uri ?? "");
        if (uri === "agentum://pricing") {
          return {
            isNotification: false,
            body: {
              jsonrpc: "2.0",
              id,
              result: {
                contents: [
                  {
                    uri,
                    mimeType: "application/json",
                    text: JSON.stringify({
                      freeCallsPerDay: deps.config.freeCallsPerDay,
                      paymentMode: deps.config.paymentMode,
                      pricesUsd: {
                        resolve_entity: deps.config.priceEntityResolveUsd,
                        verify_eu_vat: deps.config.priceVatVerifyUsd,
                        screen_sanctions: deps.config.priceSanctionsCheckUsd
                      },
                      rails: {
                        x402: {
                          enabled: deps.config.x402Enabled,
                          network: deps.config.x402Network,
                          payTo: deps.config.x402PayToEvm,
                          facilitatorUrl: deps.config.x402FacilitatorUrl
                        },
                        mpp: {
                          enabled: deps.config.mppEnabled,
                          recipient: deps.config.tempoRecipientAddress,
                          testnet: deps.config.tempoTestnet,
                          methods: deps.config.stripeSecretKey ? ["stripe", "tempo"] : ["tempo"]
                        }
                      }
                    }, null, 2)
                  }
                ]
              }
            }
          };
        }
        if (uri === "agentum://registries/coverage") {
          const all = listCoverage();
          return {
            isNotification: false,
            body: {
              jsonrpc: "2.0",
              id,
              result: {
                contents: [
                  {
                    uri,
                    mimeType: "application/json",
                    text: JSON.stringify({
                      totalCountries: all.length,
                      summary: {
                        L3_ENRICHED: all.filter((p) => p.coverage === "L3_ENRICHED").length,
                        L2_VERIFIED: all.filter((p) => p.coverage === "L2_VERIFIED").length,
                        L1_VALIDATED: all.filter((p) => p.coverage === "L1_VALIDATED").length,
                        L0_SCREENED: all.filter((p) => p.coverage === "L0_SCREENED").length
                      },
                      liveOfficialRegistries: [
                        ...process.env.COMPANIES_HOUSE_API_KEY?.trim() ? ["UK Companies House (GB)"] : [],
                        "Swiss ZEFIX (CH)",
                        ...process.env.ABR_GUID?.trim() ? ["Australian ABR (AU)"] : [],
                        "Singapore ACRA (SG)",
                        "US SEC EDGAR (US)",
                        "Lithuania Registr\u0173 centras JAR (LT)",
                        "France Recherche Entreprises (FR)",
                        "Poland Ministry of Justice KRS (PL; KRS identifier lookup only)",
                        "Latvia Enterprise Register open data (LV)",
                        "Czech ARES (CZ)",
                        "Norway Br\xF8nn\xF8ysundregistrene (NO)",
                        "Finland PRH Virre (FI)",
                        ...process.env.NZBN_API_KEY?.trim() ? ["New Zealand NZBN (NZ)"] : [],
                        "Brazil Receita Federal CNPJ (BR)",
                        ...process.env.JP_NTA_APP_ID?.trim() ? ["Japan National Tax Agency (JP)"] : [],
                        "GLEIF Global LEI Index (GLOBAL)"
                      ],
                      taxAndAccountRegistries: [
                        "European Commission VIES VAT Validation API (27 EU Member States)",
                        "Poland Ministry of Finance White List (Bia\u0142a lista VAT)",
                        "Czech Republic MoF Unreliable VAT Payers & Bank Accounts"
                      ],
                      sanctionsLists: [
                        "US Treasury OFAC Specially Designated Nationals (SDN)",
                        "European Union Consolidated Financial Sanctions (FSF)",
                        "United Nations Security Council Consolidated List (UN SC)"
                      ],
                      fallbackAggregator: process.env.OPENCORPORATES_API_KEY?.trim() ? "OpenCorporates API (commercial paid fallback; per-request opt-in required)" : null
                    }, null, 2)
                  }
                ]
              }
            }
          };
        }
        if (uri === "agentum://jurisdictions") {
          return {
            isNotification: false,
            body: {
              jsonrpc: "2.0",
              id,
              result: {
                contents: [
                  {
                    uri,
                    mimeType: "application/json",
                    text: JSON.stringify({
                      jurisdictions: KNOWN_JURISDICTIONS,
                      idTypes: ["LEI", "EU_VAT", "LT_JAR", "US_CIK", "US_EIN", "DOMAIN"]
                    })
                  }
                ]
              }
            }
          };
        }
        if (uri.startsWith("agentum://results/")) {
          const reqId = decodeURIComponent(uri.slice("agentum://results/".length));
          const cached = await deps.cacheStore.getCache(`agentum:mcp:result:${reqId}`);
          if (!cached) {
            return {
              isNotification: false,
              body: {
                jsonrpc: "2.0",
                id,
                error: { code: -32002, message: `Cached result not found: ${uri}` }
              }
            };
          }
          return {
            isNotification: false,
            body: {
              jsonrpc: "2.0",
              id,
              result: {
                contents: [
                  {
                    uri,
                    mimeType: "application/json",
                    text: JSON.stringify(cached)
                  }
                ]
              }
            }
          };
        }
        if (uri.startsWith("agentum://entity/")) {
          const rawPath = uri.slice("agentum://entity/".length);
          const isCompact = rawPath.endsWith("/compact");
          const cleanPath = isCompact ? rawPath.slice(0, -"/compact".length) : rawPath;
          const query = decodeURIComponent(cleanPath);
          const resolveTool = deps.registry.getByMcpName("resolve_entity");
          if (resolveTool) {
            const fingerprint = computeCallerFingerprint(rawHeaders, { production: deps.config.nodeEnv === "production", address: remoteAddress });
            const gate = await evaluateDual402Gate({
              config: deps.config,
              cacheStore: deps.cacheStore,
              paymentLedger: deps.paymentLedger,
              x402Verifier: deps.x402Verifier,
              mppVerifier: deps.mppVerifier,
              fingerprint,
              priceUsd: resolveTool.priceUsd,
              resource: `${deps.config.publicBaseUrl}${resolveTool.httpPath}`,
              description: resolveTool.summary,
              headers: rawHeaders
            });
            if (!gate.allowed && gate.reconciliationRequired)
              return { isNotification: false, body: { jsonrpc: "2.0", id, error: { code: -32001, message: gate.error } } };
            if (!gate.allowed) {
              return {
                isNotification: false,
                headers: {
                  "PAYMENT-REQUIRED": gate.challenge.x402HeaderBase64,
                  "WWW-Authenticate": gate.challenge.mppWwwAuthenticate
                },
                body: {
                  jsonrpc: "2.0",
                  id,
                  error: {
                    code: -32000,
                    message: gate.error ?? "Payment Required: Daily free tier exhausted",
                    data: {
                      x402: gate.challenge.x402Payload,
                      mpp: {
                        wwwAuthenticate: gate.challenge.mppWwwAuthenticate,
                        challengeId: gate.challenge.mppChallengeId
                      }
                    }
                  }
                }
              };
            }
            const out = await resolveTool.handler({ query, checkSanctions: true, verifyVat: false }, {
              callerFingerprint: fingerprint,
              paymentRail: gate.verification.rail,
              requestId: crypto5.randomUUID()
            });
            const payload = isCompact ? {
              resolved: out.resolved,
              id: out.entity?.primaryIdValue ?? null,
              idType: out.entity?.primaryIdType ?? null,
              name: out.entity?.canonicalName ?? null,
              jurisdiction: out.entity?.jurisdiction ?? null,
              status: out.entity?.status ?? null,
              lei: out.entity?.lei ?? null,
              vat: out.entity?.vatNumber ?? null,
              cik: out.entity?.cik ?? null,
              sanctioned: out.compliance?.sanctioned ?? false
            } : out;
            return {
              isNotification: false,
              body: {
                jsonrpc: "2.0",
                id,
                result: {
                  contents: [
                    {
                      uri,
                      mimeType: "application/json",
                      text: JSON.stringify(payload)
                    }
                  ]
                }
              }
            };
          }
        }
        if (uri.startsWith("agentum://vat/")) {
          const vatNumber = decodeURIComponent(uri.slice("agentum://vat/".length));
          const vatTool = deps.registry.getByMcpName("verify_eu_vat");
          if (vatTool) {
            const fingerprint = computeCallerFingerprint(rawHeaders, { production: deps.config.nodeEnv === "production", address: remoteAddress });
            const gate = await evaluateDual402Gate({
              config: deps.config,
              cacheStore: deps.cacheStore,
              paymentLedger: deps.paymentLedger,
              x402Verifier: deps.x402Verifier,
              mppVerifier: deps.mppVerifier,
              fingerprint,
              priceUsd: vatTool.priceUsd,
              resource: `${deps.config.publicBaseUrl}${vatTool.httpPath}`,
              description: vatTool.summary,
              headers: rawHeaders
            });
            if (!gate.allowed && gate.reconciliationRequired)
              return { isNotification: false, body: { jsonrpc: "2.0", id, error: { code: -32001, message: gate.error } } };
            if (!gate.allowed) {
              return {
                isNotification: false,
                headers: {
                  "PAYMENT-REQUIRED": gate.challenge.x402HeaderBase64,
                  "WWW-Authenticate": gate.challenge.mppWwwAuthenticate
                },
                body: {
                  jsonrpc: "2.0",
                  id,
                  error: {
                    code: -32000,
                    message: gate.error ?? "Payment Required: Daily free tier exhausted",
                    data: {
                      x402: gate.challenge.x402Payload,
                      mpp: {
                        wwwAuthenticate: gate.challenge.mppWwwAuthenticate,
                        challengeId: gate.challenge.mppChallengeId
                      }
                    }
                  }
                }
              };
            }
            const out = await vatTool.handler({ vatNumber }, {
              callerFingerprint: fingerprint,
              paymentRail: gate.verification.rail,
              requestId: crypto5.randomUUID()
            });
            return {
              isNotification: false,
              body: {
                jsonrpc: "2.0",
                id,
                result: {
                  contents: [
                    {
                      uri,
                      mimeType: "application/json",
                      text: JSON.stringify(out, null, 2)
                    }
                  ]
                }
              }
            };
          }
        }
        if (uri.startsWith("agentum://sanctions/")) {
          const name = decodeURIComponent(uri.slice("agentum://sanctions/".length));
          const sanctionsTool = deps.registry.getByMcpName("screen_sanctions");
          if (sanctionsTool) {
            const fingerprint = computeCallerFingerprint(rawHeaders, { production: deps.config.nodeEnv === "production", address: remoteAddress });
            const gate = await evaluateDual402Gate({
              config: deps.config,
              cacheStore: deps.cacheStore,
              paymentLedger: deps.paymentLedger,
              x402Verifier: deps.x402Verifier,
              mppVerifier: deps.mppVerifier,
              fingerprint,
              priceUsd: sanctionsTool.priceUsd,
              resource: `${deps.config.publicBaseUrl}${sanctionsTool.httpPath}`,
              description: sanctionsTool.summary,
              headers: rawHeaders
            });
            if (!gate.allowed && gate.reconciliationRequired)
              return { isNotification: false, body: { jsonrpc: "2.0", id, error: { code: -32001, message: gate.error } } };
            if (!gate.allowed) {
              return {
                isNotification: false,
                headers: {
                  "PAYMENT-REQUIRED": gate.challenge.x402HeaderBase64,
                  "WWW-Authenticate": gate.challenge.mppWwwAuthenticate
                },
                body: {
                  jsonrpc: "2.0",
                  id,
                  error: {
                    code: -32000,
                    message: gate.error ?? "Payment Required: Daily free tier exhausted",
                    data: {
                      x402: gate.challenge.x402Payload,
                      mpp: {
                        wwwAuthenticate: gate.challenge.mppWwwAuthenticate,
                        challengeId: gate.challenge.mppChallengeId
                      }
                    }
                  }
                }
              };
            }
            const out = await sanctionsTool.handler({ name, threshold: 0.75 }, {
              callerFingerprint: fingerprint,
              paymentRail: gate.verification.rail,
              requestId: crypto5.randomUUID()
            });
            return {
              isNotification: false,
              body: {
                jsonrpc: "2.0",
                id,
                result: {
                  contents: [
                    {
                      uri,
                      mimeType: "application/json",
                      text: JSON.stringify(out, null, 2)
                    }
                  ]
                }
              }
            };
          }
        }
        return {
          isNotification: false,
          body: {
            jsonrpc: "2.0",
            id,
            error: { code: -32002, message: `Resource not found: ${uri}` }
          }
        };
      }
      if (rpc.method === "prompts/list") {
        return {
          isNotification: false,
          body: {
            jsonrpc: "2.0",
            id,
            result: {
              prompts: MCP_PROMPTS
            }
          }
        };
      }
      if (rpc.method === "prompts/get") {
        const promptName = String(rpc.params?.name ?? "");
        const args = rpc.params?.arguments ?? {};
        const found = MCP_PROMPTS.find((p) => p.name === promptName);
        if (!found) {
          return {
            isNotification: false,
            body: {
              jsonrpc: "2.0",
              id,
              error: { code: -32602, message: `Unknown prompt: ${promptName}` }
            }
          };
        }
        let promptText = "";
        if (promptName === "kyb_due_diligence_report") {
          const company = args.companyName ?? "<COMPANY_NAME>";
          const jur = args.jurisdiction ? ` (jurisdictionHint: "${args.jurisdiction}")` : "";
          const vat = args.vatNumber ? `
2. Call \`verify_eu_vat\` with vatNumber="${args.vatNumber}".` : "\n2. If the resolved entity has an EU VAT number, call `verify_eu_vat` to confirm live VIES status.";
          promptText = `Perform a complete KYB & compliance verification for "${company}"${jur}:
1. Call \`resolve_entity\` with query="${company}"${args.jurisdiction ? `, jurisdictionHint="${args.jurisdiction}"` : ""}, checkSanctions=true.${vat}
3. Call \`screen_sanctions\` for any parent or alias entities discovered.
4. Synthesize a deterministic KYB summary covering canonical registration IDs (LEI, CIK, JAR, VAT), active status, VIES VAT validity, and OFAC/EU/UN sanctions clearance.`;
        } else if (promptName === "sanctions_escalation_review") {
          const entity = args.entityName ?? "<ENTITY_NAME>";
          promptText = `Conduct an adversarial sanctions escalation review for "${entity}":
1. Call \`screen_sanctions\` with name="${entity}"${args.country ? `, country="${args.country}"` : ""} and threshold=0.70.
2. Evaluate all returned matches across OFAC_SDN, EU_FSF, UN_SC, and UK_FCDO, paying special attention to Cyrillic/Latin homoglyphs, transliterated aliases, and registration numbers.
3. Classify the counterparty as CLEAR, POTENTIAL_MATCH_ESCALATE, or CONFIRMED_SANCTIONED.`;
        } else {
          const vendor = args.vendorName ?? "<VENDOR_NAME>";
          promptText = `Run an automated vendor onboarding check for "${vendor}"${args.vatOrTaxId ? ` (Tax/VAT ID: ${args.vatOrTaxId})` : ""}:
1. Resolve the legal entity via \`resolve_entity\`.
2. Validate EU VAT via \`verify_eu_vat\` if applicable.
3. Screen against global sanctions via \`screen_sanctions\`.
4. Output an onboarding decision JSON: { approved: boolean, canonicalId: string, vatValid: boolean | null, sanctioned: boolean }.`;
        }
        return {
          isNotification: false,
          body: {
            jsonrpc: "2.0",
            id,
            result: {
              description: found.description,
              messages: [
                {
                  role: "user",
                  content: {
                    type: "text",
                    text: promptText
                  }
                }
              ]
            }
          }
        };
      }
      if (rpc.method === "completion/complete") {
        const argName = String(rpc.params?.argument?.name ?? "");
        const argValue = String(rpc.params?.argument?.value ?? "").toUpperCase();
        let values = [];
        if (argName === "jurisdiction" || argName === "jurisdictionHint" || argName === "country") {
          values = KNOWN_JURISDICTIONS.filter((j) => j.startsWith(argValue));
        } else {
          values = KNOWN_COMPANY_SUGGESTIONS.filter((c) => c.toUpperCase().includes(argValue));
        }
        return {
          isNotification: false,
          body: {
            jsonrpc: "2.0",
            id,
            result: {
              completion: {
                values: values.slice(0, 10),
                total: values.length,
                hasMore: values.length > 10
              }
            }
          }
        };
      }
      if (rpc.method === "elicitation/prepare") {
        const reason = rpc.params?.reason === "payment_required" ? "payment_required" : "entity_disambiguation";
        return {
          isNotification: false,
          body: {
            jsonrpc: "2.0",
            id,
            result: buildElicitationPayload({
              reason,
              priceUsd: rpc.params?.priceUsd,
              query: rpc.params?.query,
              candidatesCount: rpc.params?.candidatesCount
            })
          }
        };
      }
      if (rpc.method === "sampling/prepare") {
        const subject = String(rpc.params?.subject ?? "Unknown Entity");
        const structuredData = rpc.params?.data ?? {};
        return {
          isNotification: false,
          body: {
            jsonrpc: "2.0",
            id,
            result: buildSamplingRequestPayload({
              subject,
              structuredData
            })
          }
        };
      }
      if (rpc.method === "tools/list") {
        return {
          isNotification: false,
          body: {
            jsonrpc: "2.0",
            id,
            result: {
              tools: deps.registry.getAll().map((t) => ({
                name: t.mcpName,
                description: `${t.description} (Price: $${t.priceUsd}/call after ${deps.config.freeCallsPerDay} free/day)`,
                inputSchema: deps.registry.toJsonSchema(t.inputSchema),
                outputSchema: deps.registry.toJsonSchema(t.outputSchema),
                annotations: {
                  title: t.summary,
                  readOnlyHint: true,
                  destructiveHint: false,
                  idempotentHint: true,
                  openWorldHint: true,
                  priceUsd: t.priceUsd,
                  httpPath: t.httpPath
                }
              }))
            }
          }
        };
      }
      if (rpc.method === "tools/call") {
        const toolName = rpc.params?.name;
        const tool = typeof toolName === "string" ? deps.registry.getByMcpName(toolName) : undefined;
        if (!tool) {
          return {
            isNotification: false,
            body: {
              jsonrpc: "2.0",
              id,
              error: {
                code: -32602,
                message: `Unknown tool: ${String(toolName)}`
              }
            }
          };
        }
        const parsedArgs = tool.inputSchema.safeParse(rpc.params?.arguments ?? {});
        if (!parsedArgs.success) {
          return {
            isNotification: false,
            body: {
              jsonrpc: "2.0",
              id,
              result: {
                isError: true,
                content: [
                  {
                    type: "text",
                    text: JSON.stringify({
                      error: "Validation Error",
                      issues: parsedArgs.error.issues
                    })
                  }
                ],
                _meta: {
                  elicitation: buildElicitationPayload({
                    reason: "entity_disambiguation",
                    query: String(rpc.params?.arguments?.query ?? "")
                  })
                }
              }
            }
          };
        }
        const fingerprint = computeCallerFingerprint(rawHeaders, { production: deps.config.nodeEnv === "production", address: remoteAddress });
        const argsObj = rpc.params?.arguments && typeof rpc.params.arguments === "object" ? rpc.params.arguments : {};
        const metaObj = rpc.params?._meta && typeof rpc.params._meta === "object" ? rpc.params._meta : {};
        const meta = {
          ...argsObj._meta,
          ...metaObj,
          ...argsObj.format ? { format: argsObj.format } : {}
        };
        const gate = await evaluateDual402Gate({
          config: deps.config,
          cacheStore: deps.cacheStore,
          paymentLedger: deps.paymentLedger,
          x402Verifier: deps.x402Verifier,
          mppVerifier: deps.mppVerifier,
          fingerprint,
          priceUsd: tool.priceUsd,
          resource: `${deps.config.publicBaseUrl}${tool.httpPath}`,
          description: tool.summary,
          headers: rawHeaders,
          metaPayment: {
            x402: typeof meta?.x402Payment === "string" ? meta.x402Payment : undefined,
            mpp: typeof meta?.mppPayment === "string" ? meta.mppPayment : undefined
          }
        });
        if (!gate.allowed && gate.reconciliationRequired)
          return { isNotification: false, body: { jsonrpc: "2.0", id, error: { code: -32001, message: gate.error } } };
        if (!gate.allowed) {
          const paymentElicitation = buildElicitationPayload({
            reason: "payment_required",
            priceUsd: tool.priceUsd
          });
          return {
            isNotification: false,
            headers: {
              "PAYMENT-REQUIRED": gate.challenge.x402HeaderBase64,
              "WWW-Authenticate": gate.challenge.mppWwwAuthenticate
            },
            body: {
              jsonrpc: "2.0",
              id,
              result: {
                isError: true,
                content: [
                  {
                    type: "text",
                    text: JSON.stringify({
                      error: gate.error ?? "Payment Required: Daily free tier exhausted",
                      priceUsd: tool.priceUsd,
                      x402: gate.challenge.x402Payload,
                      mpp: {
                        wwwAuthenticate: gate.challenge.mppWwwAuthenticate,
                        challengeId: gate.challenge.mppChallengeId
                      }
                    })
                  }
                ],
                _meta: {
                  paymentRequired: {
                    priceUsd: tool.priceUsd,
                    x402HeaderBase64: gate.challenge.x402HeaderBase64,
                    x402: gate.challenge.x402Payload,
                    mppWwwAuthenticate: gate.challenge.mppWwwAuthenticate,
                    mppChallengeId: gate.challenge.mppChallengeId
                  },
                  elicitation: paymentElicitation
                }
              }
            }
          };
        }
        const requestId = crypto5.randomUUID();
        const output = await tool.handler(parsedArgs.data, {
          callerFingerprint: fingerprint,
          paymentRail: gate.verification.rail,
          remainingFreeCalls: gate.verification.remainingFreeCalls,
          requestId
        });
        const resultResourceUri = `agentum://results/${requestId}`;
        await deps.cacheStore.setCache(`agentum:mcp:result:${requestId}`, output, 3600);
        const responseMeta = {
          paymentRail: gate.verification.rail,
          remainingFreeCalls: gate.verification.remainingFreeCalls,
          resultResourceUri
        };
        if (tool.mcpName === "resolve_entity" && (output?.resolved === false || Array.isArray(output?.candidates) && output.candidates.length > 1 || meta?.elicitIfAmbiguous === true)) {
          responseMeta.elicitation = buildElicitationPayload({
            reason: "entity_disambiguation",
            query: String(parsedArgs.data?.query ?? ""),
            candidatesCount: Array.isArray(output?.candidates) ? output.candidates.length : 0
          });
        }
        if (meta?.enableSampling === true || output?.sanctioned === true || output?.compliance?.sanctioned === true) {
          responseMeta.samplingRequest = buildSamplingRequestPayload({
            subject: String(parsedArgs.data?.query ?? parsedArgs.data?.name ?? parsedArgs.data?.vatNumber ?? tool.mcpName),
            structuredData: output
          });
        }
        const sessionData = await deps.cacheStore.getCache(`agentum:mcp:session:${incomingSessionId}`);
        const isCompactMode = meta?.compact === true;
        const isStrictText = meta?.textOnly === true || sessionData?.capabilities?.textOnly === true || !isCompactMode && (ua.includes("ChatGPT") || ua.includes("Mistral"));
        const format = typeof meta?.format === "string" ? meta.format : meta?.markdown === true ? "markdown" : "json";
        const compactSummary = tool.mcpName === "resolve_entity" ? {
          resolved: output?.resolved,
          id: output?.entity?.primaryIdValue ?? null,
          name: output?.entity?.canonicalName ?? null,
          jurisdiction: output?.entity?.jurisdiction ?? null,
          sanctioned: output?.compliance?.sanctioned ?? false,
          fullResourceUri: resultResourceUri
        } : tool.mcpName === "screen_sanctions" ? {
          sanctioned: output?.sanctioned,
          matchCount: Array.isArray(output?.matches) ? output.matches.length : 0,
          topMatch: output?.matches?.[0]?.primaryName ?? null,
          fullResourceUri: resultResourceUri
        } : tool.mcpName === "check_vendor" ? {
          vendorName: output?.vendorName,
          verdict: output?.verdict,
          riskLevel: output?.riskLevel,
          sanctionsHit: output?.sanctionsHit,
          vatValid: output?.vatValid,
          fullResourceUri: resultResourceUri
        } : tool.mcpName === "verify_bank_payee" ? {
          valid: output?.valid,
          countryCode: output?.countryCode,
          checksumValid: output?.checksumValid,
          countryMatch: output?.countryMatch,
          fullResourceUri: resultResourceUri
        } : tool.mcpName === "batch_resolve" ? {
          total: output?.total,
          resolvedCount: output?.resolvedCount,
          unresolvedCount: output?.unresolvedCount,
          fullResourceUri: resultResourceUri
        } : {
          valid: output?.valid,
          vatNumber: output?.vatNumber,
          companyName: output?.viesName ?? output?.linkedEntity?.canonicalName ?? null,
          fullResourceUri: resultResourceUri
        };
        const textOutput = format === "markdown" ? formatMarkdownSummary(tool.mcpName, output) : JSON.stringify(isCompactMode ? compactSummary : output);
        const contentBlocks = [
          {
            type: "text",
            text: textOutput
          }
        ];
        if (!isStrictText) {
          contentBlocks.push({
            type: "resource_link",
            uri: resultResourceUri,
            name: `${tool.mcpName} full result (${requestId.slice(0, 8)})`,
            mimeType: "application/json"
          });
        }
        return {
          isNotification: false,
          body: {
            jsonrpc: "2.0",
            id,
            result: {
              isError: false,
              content: contentBlocks,
              structuredContent: isCompactMode ? compactSummary : output,
              _meta: responseMeta
            }
          }
        };
      }
      return {
        isNotification: false,
        body: {
          jsonrpc: "2.0",
          id,
          error: {
            code: -32601,
            message: `Method not found: ${String(rpc.method)}`
          }
        }
      };
    };
    if (Array.isArray(rawPayload)) {
      if (rawPayload.length === 0) {
        return c.json({
          jsonrpc: "2.0",
          id: null,
          error: { code: -32600, message: "Invalid Request: empty batch" }
        }, 400);
      }
      const responses = [];
      for (const item of rawPayload) {
        const res = await handleSingleRpc(item ?? {});
        if (res.headers) {
          for (const [hk, hv] of Object.entries(res.headers)) {
            c.header(hk, hv);
          }
        }
        if (!res.isNotification && res.body) {
          responses.push(res.body);
        }
      }
      if (responses.length === 0) {
        return new Response(null, {
          status: 204,
          headers: { "Mcp-Session-Id": incomingSessionId }
        });
      }
      return c.json(responses);
    }
    const single = await handleSingleRpc(rawPayload ?? {});
    if (single.headers) {
      for (const [hk, hv] of Object.entries(single.headers)) {
        c.header(hk, hv);
      }
    }
    if (single.isNotification) {
      const accept = c.req.header("accept") ?? "";
      const notifStatus = accept.includes("text/event-stream") ? 202 : 204;
      return new Response(null, {
        status: notifStatus,
        headers: { "Mcp-Session-Id": incomingSessionId }
      });
    }
    return c.json(single.body ?? { jsonrpc: "2.0", id: null, result: {} });
  });
}

// ../../agentum-clean-release/agentum/src/adapters/inbound/worker/official-sanctions.ts
var import_saxes = __toESM(require_saxes(), 1);
var add = (array, value) => {
  const v = value?.trim();
  if (v && !array.includes(v))
    array.push(v);
};
async function parseOfficialXml(chunks, source) {
  const parser = new import_saxes.SaxesParser;
  const entries = [];
  let depth = 0, root = "", recordDepth = 0, recordSize = 0, recordStart = 0, current;
  let stack = [], text = "", names = [], seenContainers = new Set;
  const attr = (attrs, name) => String(attrs[name] ?? "");
  parser.on("doctype", () => {
    throw new Error("DTD is prohibited in sanctions XML");
  });
  parser.on("opentag", (tag) => {
    depth++;
    if (depth > 64)
      throw new Error("XML depth exceeds limit");
    const name = tag.name;
    stack.push(name);
    text = "";
    if (depth === 1) {
      root = name;
      if (root !== (source === "UN_SC" ? "CONSOLIDATED_LIST" : "export"))
        throw new Error("Wrong sanctions XML root");
    }
    if (depth === 1 && source === "EU_FSF" && attr(tag.attributes, "xmlns") !== "http://eu.europa.ec/fpi/fsd/export")
      throw new Error("Wrong EU sanctions namespace");
    if (depth === 2) {
      if (source === "EU_FSF" ? name !== "sanctionEntity" : !["INDIVIDUALS", "ENTITIES"].includes(name) || seenContainers.has(name))
        throw new Error("Invalid sanctions XML structure");
      seenContainers.add(name);
    }
    if (source === "UN_SC" && depth === 3 && (stack[1] === "INDIVIDUALS" && name !== "INDIVIDUAL" || stack[1] === "ENTITIES" && name !== "ENTITY"))
      throw new Error("Invalid UN sanctions XML structure");
    if (source === "UN_SC" && depth === 3 && (stack[1] === "INDIVIDUALS" && name === "INDIVIDUAL" || stack[1] === "ENTITIES" && name === "ENTITY") || source === "EU_FSF" && depth === 2 && name === "sanctionEntity") {
      if (current)
        throw new Error("Nested sanctions record");
      recordDepth = depth;
      recordSize = 0;
      recordStart = parser.position;
      names = [];
      current = { listSource: source, externalId: source === "EU_FSF" ? attr(tag.attributes, "logicalId") : "", primaryName: "", aliases: [], identifiers: [], countries: [], programs: [], entityType: name === "INDIVIDUAL" ? "INDIVIDUAL" : "ENTITY" };
      if (source === "EU_FSF") {
        add(current.identifiers, attr(tag.attributes, "euReferenceNumber"));
        add(current.identifiers, attr(tag.attributes, "unitedNationId"));
      }
    } else if (current && source === "EU_FSF") {
      if (name === "nameAlias")
        add(names, attr(tag.attributes, "wholeName"));
      if (name === "subjectType")
        current.entityType = attr(tag.attributes, "code") === "person" ? "INDIVIDUAL" : "ENTITY";
      if (name === "regulation")
        add(current.programs, attr(tag.attributes, "programme"));
      if (name === "identification")
        add(current.identifiers, attr(tag.attributes, "number"));
      if (name === "citizenship" || name === "address") {
        const code = attr(tag.attributes, "countryIso2Code");
        if (code !== "00")
          add(current.countries, code);
      }
    }
  });
  parser.on("text", (value) => {
    text += value;
    if (current && (recordSize += value.length) > 1024 * 1024)
      throw new Error("Sanctions XML record exceeds limit");
  });
  parser.on("cdata", (value) => {
    text += value;
    if (current && (recordSize += value.length) > 1024 * 1024)
      throw new Error("Sanctions XML record exceeds limit");
  });
  parser.on("closetag", (tag) => {
    const value = text.trim(), name = tag.name;
    if (current && source === "UN_SC") {
      if (name === "DATAID" && depth === recordDepth + 1)
        current.externalId = value;
      if (/^(FIRST_NAME|SECOND_NAME|THIRD_NAME|FOURTH_NAME)$/.test(name) && depth === recordDepth + 1)
        add(names, value);
      if (name === "ALIAS_NAME")
        add(current.aliases, value);
      if (name === "NUMBER" && stack.some((x) => x.endsWith("_DOCUMENT")))
        add(current.identifiers, value);
      if (name === "REFERENCE_NUMBER")
        add(current.identifiers, value);
      if (name === "UN_LIST_TYPE")
        add(current.programs, value);
      if (name === "COUNTRY")
        add(current.countries, value);
      if (name === "COMMENTS1")
        current.remarks = value || undefined;
    } else if (current && source === "EU_FSF" && name === "remark" && value)
      current.remarks = [current.remarks, value].filter(Boolean).join("; ");
    if (current && depth === recordDepth) {
      current.primaryName = source === "UN_SC" ? names.join(" ") : names.shift() ?? "";
      if (source === "EU_FSF")
        for (const n of names)
          add(current.aliases, n);
      if (!current.externalId || !current.primaryName)
        throw new Error("Invalid sanctions XML record");
      if (!current.programs.length)
        current.programs.push(source);
      entries.push(current);
      current = undefined;
    }
    stack.pop();
    depth--;
    text = "";
  });
  for await (const chunk of chunks) {
    parser.write(chunk);
    if (current && parser.position - recordStart > 1024 * 1024)
      throw new Error("Sanctions XML record exceeds limit");
  }
  parser.close();
  if (!root || !entries.length || current || depth || source === "UN_SC" && (!seenContainers.has("INDIVIDUALS") || !seenContainers.has("ENTITIES")))
    throw new Error("Invalid sanctions XML document");
  return entries;
}

class UkSanctionsCsvCollector {
  header;
  preamble = false;
  entries = new Map;
  primary = new Set;
  accept(row) {
    if (!this.preamble) {
      if (row.length !== 1 || !/^Report Date:/i.test(row[0]))
        throw new Error("Invalid UK CSV report date");
      this.preamble = true;
      return;
    }
    if (!this.header) {
      this.header = row.map((x) => x.toLowerCase());
      const required = ["unique id", "name 6", "name 1", "name type", "regime name", "designation type", "sanctions imposed"];
      if (new Set(this.header).size !== this.header.length || required.some((x) => !this.header.includes(x)))
        throw new Error("Invalid UK CSV header");
      return;
    }
    if (row.length !== this.header.length)
      throw new Error("Invalid UK CSV row");
    const get = (name) => row[this.header.indexOf(name)]?.trim() ?? "";
    const id = get("unique id"), name = [1, 2, 3, 4, 5, 6].map((i) => get(`name ${i}`)).filter(Boolean).join(" "), type = get("designation type").toLowerCase();
    if (!id || !type || get("name type").toLowerCase() === "primary name" && !name)
      throw new Error("Invalid UK CSV record");
    let e = this.entries.get(id);
    if (!e) {
      e = { listSource: "UK_FCDO", externalId: id, primaryName: name, aliases: [], countries: [], identifiers: [], programs: [], entityType: type === "individual" ? "INDIVIDUAL" : type === "ship" ? "VESSEL" : type === "aircraft" ? "AIRCRAFT" : "ENTITY" };
      this.entries.set(id, e);
    }
    if (get("name type").toLowerCase() === "primary name") {
      if (e.primaryName !== name && !this.primary.has(id))
        add(e.aliases, e.primaryName);
      e.primaryName = name;
      this.primary.add(id);
    } else if (name && name !== e.primaryName)
      add(e.aliases, name);
    for (const key of ["un reference number", "ofsi group id", "national identifier number", "passport number", "business registration number (s)", "imo number", "hull identification number (hin)"])
      add(e.identifiers, get(key));
    add(e.countries, get("nationality(/ies)"));
    add(e.countries, get("address country"));
    add(e.programs, get("regime name"));
    const remarks = [get("sanctions imposed"), get("other information")].filter(Boolean).join("; ");
    if (remarks)
      e.remarks = remarks;
  }
  finish() {
    if (!this.header || !this.entries.size || this.primary.size !== this.entries.size || [...this.entries.values()].some((e) => !e.primaryName.trim()))
      throw new Error("Invalid UK CSV records");
    return [...this.entries.values()];
  }
}

// ../../agentum-clean-release/agentum/src/adapters/inbound/worker/feed-stream.ts
async function* responseBytes(response, limit, signal) {
  const reader = response.body?.getReader();
  if (!reader)
    throw new Error("Feed response has no body");
  let completed = false;
  let total = 0;
  try {
    while (true) {
      if (signal?.aborted)
        throw new Error("Feed request aborted");
      let onAbort;
      const aborted = new Promise((_, reject) => {
        if (signal) {
          onAbort = () => reject(new Error("Feed request aborted"));
          signal.addEventListener("abort", onAbort, { once: true });
        }
      });
      let result;
      try {
        result = await Promise.race([reader.read(), aborted]);
      } finally {
        if (onAbort)
          signal?.removeEventListener("abort", onAbort);
      }
      if (result.done) {
        completed = true;
        return;
      }
      const chunk = result.value;
      if (!chunk)
        throw new Error("Feed response returned an empty chunk");
      total += chunk.byteLength;
      if (total > limit)
        throw new Error("Feed response exceeds size limit");
      yield chunk;
    }
  } finally {
    if (!completed)
      reader.cancel().catch(() => {});
    try {
      reader.releaseLock();
    } catch {}
  }
}
async function* decodeUtf8(chunks) {
  const decoder = new TextDecoder("utf-8", { fatal: true });
  for await (const chunk of chunks) {
    const text = decoder.decode(chunk, { stream: true });
    if (text)
      yield text;
  }
  const tail = decoder.decode();
  if (tail)
    yield tail;
}

class CsvRowDecoder {
  row = [];
  field = "";
  inQuotes = false;
  quoteClosed = false;
  quoteWhitespace = false;
  skipLf = false;
  started = false;
  *push(text) {
    for (const ch of text) {
      if (!this.started) {
        this.started = true;
        if (ch === "\uFEFF")
          continue;
      }
      if (this.skipLf) {
        this.skipLf = false;
        if (ch === `
`)
          continue;
      }
      if (this.inQuotes) {
        if (ch === '"') {
          this.inQuotes = false;
          this.quoteClosed = true;
        } else
          this.field += ch;
      } else if (this.quoteClosed && ch === '"' && !this.quoteWhitespace) {
        this.field += '"';
        this.inQuotes = true;
        this.quoteClosed = false;
      } else if (ch === '"') {
        if (this.field.trim() || this.quoteClosed)
          throw new Error("Invalid quote in CSV field");
        this.inQuotes = true;
      } else if (ch === ",") {
        this.finishField();
      } else if (ch === "\r" || ch === `
`) {
        this.finishField();
        const row = this.finishRow();
        this.skipLf = ch === "\r";
        if (row)
          yield row;
      } else {
        if (this.quoteClosed && ch !== " " && ch !== "\t")
          throw new Error("Invalid CSV after closing quote");
        if (this.quoteClosed)
          this.quoteWhitespace = true;
        this.field += ch;
      }
    }
  }
  *finish() {
    if (this.inQuotes)
      throw new Error("Unterminated quoted CSV field");
    if (this.field.length || this.row.length || this.quoteClosed) {
      this.finishField();
      const row = this.finishRow();
      if (row)
        yield row;
    }
  }
  finishField() {
    this.row.push(this.field.trim());
    this.field = "";
    this.quoteClosed = false;
    this.quoteWhitespace = false;
  }
  finishRow() {
    const row = this.row;
    this.row = [];
    return row.length > 1 || row.length === 1 && row[0] !== "" && row[0] !== "\x1A" ? row : undefined;
  }
}
async function* csvRows(chunks) {
  const decoder = new CsvRowDecoder;
  for await (const chunk of chunks)
    yield* decoder.push(chunk);
  yield* decoder.finish();
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/persistence/db-schema.ts
var entitiesTable = {
  tableName: "entities",
  columns: [
    "id",
    "canonical_name",
    "normalized_name",
    "jurisdiction",
    "region",
    "primary_id_type",
    "primary_id_value",
    "lei",
    "registration_number",
    "registration_authority",
    "vat_number",
    "vat_valid",
    "vat_checked_at",
    "tax_id",
    "cik",
    "tickers",
    "legal_form",
    "status",
    "incorporation_date",
    "legal_address",
    "headquarters_address",
    "parent_lei",
    "ultimate_parent_lei",
    "domains",
    "aliases",
    "sanctions_flag",
    "sanctions_matches",
    "sources",
    "raw_metadata",
    "updated_at"
  ],
  createSql: `
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    CREATE TABLE IF NOT EXISTS entities (
      id TEXT PRIMARY KEY,
      canonical_name TEXT NOT NULL,
      normalized_name TEXT NOT NULL,
      jurisdiction VARCHAR(16) NOT NULL,
      region VARCHAR(8) NOT NULL,
      primary_id_type VARCHAR(32) NOT NULL,
      primary_id_value VARCHAR(64) NOT NULL,
      lei VARCHAR(20),
      registration_number VARCHAR(64),
      registration_authority VARCHAR(32),
      vat_number VARCHAR(32),
      vat_valid BOOLEAN,
      vat_checked_at TIMESTAMPTZ,
      tax_id VARCHAR(32),
      cik VARCHAR(16),
      tickers JSONB NOT NULL DEFAULT '[]'::jsonb,
      legal_form VARCHAR(64),
      status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
      incorporation_date VARCHAR(32),
      legal_address JSONB,
      headquarters_address JSONB,
      parent_lei VARCHAR(20),
      ultimate_parent_lei VARCHAR(20),
      domains JSONB NOT NULL DEFAULT '[]'::jsonb,
      aliases TEXT NOT NULL DEFAULT '',
      sanctions_flag BOOLEAN NOT NULL DEFAULT FALSE,
      sanctions_matches JSONB NOT NULL DEFAULT '[]'::jsonb,
      sources JSONB NOT NULL DEFAULT '[]'::jsonb,
      raw_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (jurisdiction, primary_id_type, primary_id_value)
    );
    CREATE INDEX IF NOT EXISTS idx_entities_normalized_name_trgm
      ON entities USING GIN (normalized_name gin_trgm_ops);
    CREATE INDEX IF NOT EXISTS idx_entities_aliases_trgm
      ON entities USING GIN (aliases gin_trgm_ops);
    CREATE INDEX IF NOT EXISTS idx_entities_lei ON entities (lei);
    CREATE INDEX IF NOT EXISTS idx_entities_vat ON entities (vat_number);
    CREATE INDEX IF NOT EXISTS idx_entities_reg ON entities (registration_number);
  `
};
var sanctionsEntriesTable = {
  tableName: "sanctions_entries",
  columns: [
    "id",
    "list_source",
    "external_id",
    "entity_type",
    "primary_name",
    "normalized_name",
    "aliases",
    "countries",
    "programs",
    "identifiers",
    "remarks",
    "updated_at"
  ],
  createSql: `
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    CREATE TABLE IF NOT EXISTS sanctions_entries (
      id TEXT PRIMARY KEY,
      list_source VARCHAR(32) NOT NULL,
      external_id VARCHAR(64) NOT NULL,
      entity_type VARCHAR(32) NOT NULL DEFAULT 'ENTITY',
      primary_name TEXT NOT NULL,
      normalized_name TEXT NOT NULL,
      aliases TEXT NOT NULL DEFAULT '',
      countries JSONB NOT NULL DEFAULT '[]'::jsonb,
      programs JSONB NOT NULL DEFAULT '[]'::jsonb,
      identifiers JSONB NOT NULL DEFAULT '[]'::jsonb,
      remarks TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (list_source, external_id)
    );
    CREATE INDEX IF NOT EXISTS idx_sanctions_normalized_name_trgm
      ON sanctions_entries USING GIN (normalized_name gin_trgm_ops);
  `
};
var syncRunsTable = {
  tableName: "sync_runs",
  columns: [
    "id",
    "dataset",
    "status",
    "rows_upserted",
    "started_at",
    "finished_at",
    "error_message"
  ],
  createSql: `
    CREATE TABLE IF NOT EXISTS sync_runs (
      id TEXT PRIMARY KEY,
      dataset VARCHAR(32) NOT NULL,
      status VARCHAR(16) NOT NULL,
      rows_upserted INTEGER NOT NULL DEFAULT 0,
      started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      finished_at TIMESTAMPTZ,
      error_message TEXT
    );
  `
};

// ../../agentum-clean-release/agentum/src/adapters/outbound/persistence/entity-repository.adapter.ts
var SEED_ENTITIES = [
  {
    id: "LT_JAR:301844044",
    canonicalName: 'AB \u201EIgnitis grup\u0117"',
    normalizedName: "IGNITIS GRUPE",
    jurisdiction: "LT",
    region: "EU",
    primaryIdType: "LT_JAR",
    primaryIdValue: "301844044",
    lei: "529900T8BM49AURSDO55",
    registrationNumber: "301844044",
    registrationAuthority: "RA000432",
    vatNumber: "LT100004278519",
    vatValid: true,
    taxId: null,
    cik: null,
    tickers: ["IGN1L"],
    legalForm: "AB",
    status: "ACTIVE",
    incorporationDate: "2008-08-28",
    legalAddress: {
      street: "Laisv\u0117s pr. 10",
      city: "Vilnius",
      postalCode: "LT-04215",
      country: "LT"
    },
    headquartersAddress: {
      street: "Laisv\u0117s pr. 10",
      city: "Vilnius",
      postalCode: "LT-04215",
      country: "LT"
    },
    parentLei: null,
    ultimateParentLei: null,
    domains: ["ignitisgrupe.lt", "ignitis.lt"],
    aliases: ["UAB IGNITIS GRUPE", "LIETUVOS ENERGIJA", "IGNITIS"],
    sources: [
      {
        source: "LT_JAR",
        sourceId: "301844044",
        fetchedAt: "2026-01-01T00:00:00Z"
      }
    ],
    confidence: 0.99
  },
  {
    id: "LT_JAR:304580906",
    canonicalName: "Revolut Bank UAB",
    normalizedName: "REVOLUT BANK",
    jurisdiction: "LT",
    region: "EU",
    primaryIdType: "LT_JAR",
    primaryIdValue: "304580906",
    lei: "21380085LV5M2Y9K5N70",
    registrationNumber: "304580906",
    registrationAuthority: "RA000432",
    vatNumber: "LT100011706713",
    vatValid: true,
    taxId: null,
    cik: null,
    tickers: [],
    legalForm: "UAB",
    status: "ACTIVE",
    incorporationDate: "2017-06-20",
    legalAddress: {
      street: "Konstitucijos pr. 21B",
      city: "Vilnius",
      postalCode: "LT-08130",
      country: "LT"
    },
    headquartersAddress: {
      street: "Konstitucijos pr. 21B",
      city: "Vilnius",
      postalCode: "LT-08130",
      country: "LT"
    },
    parentLei: null,
    ultimateParentLei: null,
    domains: ["revolut.com"],
    aliases: ["REVOLUT BANKAS", "REVOLUT LITHUANIA"],
    sources: [
      {
        source: "LT_JAR",
        sourceId: "304580906",
        fetchedAt: "2026-01-01T00:00:00Z"
      }
    ],
    confidence: 0.99
  },
  {
    id: "US_CIK:0000320193",
    canonicalName: "Apple Inc.",
    normalizedName: "APPLE",
    jurisdiction: "US",
    region: "US",
    primaryIdType: "US_CIK",
    primaryIdValue: "0000320193",
    lei: "HWUPKR0MPOU8FGXBT394",
    registrationNumber: "C0806592",
    registrationAuthority: "RA000598",
    vatNumber: null,
    vatValid: null,
    taxId: "94-2404110",
    cik: "0000320193",
    tickers: ["AAPL"],
    legalForm: "INC",
    status: "ACTIVE",
    incorporationDate: "1977-01-03",
    legalAddress: {
      street: "One Apple Park Way",
      city: "Cupertino",
      region: "CA",
      postalCode: "95014",
      country: "US"
    },
    headquartersAddress: {
      street: "One Apple Park Way",
      city: "Cupertino",
      region: "CA",
      postalCode: "95014",
      country: "US"
    },
    parentLei: null,
    ultimateParentLei: null,
    domains: ["apple.com"],
    aliases: ["APPLE COMPUTER INC", "APPLE INCORPORATED"],
    sources: [
      {
        source: "SEC_EDGAR",
        sourceId: "0000320193",
        fetchedAt: "2026-01-01T00:00:00Z"
      }
    ],
    confidence: 0.99
  },
  {
    id: "LEI:5493006MHB84DD0ZWV18",
    canonicalName: "Stripe, Inc.",
    normalizedName: "STRIPE",
    jurisdiction: "US",
    region: "US",
    primaryIdType: "LEI",
    primaryIdValue: "5493006MHB84DD0ZWV18",
    lei: "5493006MHB84DD0ZWV18",
    registrationNumber: "4675506",
    registrationAuthority: "RA000602",
    vatNumber: null,
    vatValid: null,
    taxId: "27-0465600",
    cik: "0001511164",
    tickers: [],
    legalForm: "INC",
    status: "ACTIVE",
    incorporationDate: "2009-09-22",
    legalAddress: {
      street: "354 Oyster Point Blvd",
      city: "South San Francisco",
      region: "CA",
      postalCode: "94080",
      country: "US"
    },
    headquartersAddress: {
      street: "354 Oyster Point Blvd",
      city: "South San Francisco",
      region: "CA",
      postalCode: "94080",
      country: "US"
    },
    parentLei: null,
    ultimateParentLei: null,
    domains: ["stripe.com"],
    aliases: ["STRIPE INC", "STRIPE PAYMENTS"],
    sources: [
      {
        source: "GLEIF",
        sourceId: "5493006MHB84DD0ZWV18",
        fetchedAt: "2026-01-01T00:00:00Z"
      }
    ],
    confidence: 0.98
  },
  {
    id: "LEI:W38RGI023J3WT1HWRP32",
    canonicalName: "Siemens Aktiengesellschaft",
    normalizedName: "SIEMENS AKTIENGESELLSCHAFT",
    jurisdiction: "DE",
    region: "EU",
    primaryIdType: "LEI",
    primaryIdValue: "W38RGI023J3WT1HWRP32",
    lei: "W38RGI023J3WT1HWRP32",
    registrationNumber: "HRB 6684",
    registrationAuthority: "RA000192",
    vatNumber: "DE129274202",
    vatValid: true,
    taxId: null,
    cik: null,
    tickers: ["SIE"],
    legalForm: "AG",
    status: "ACTIVE",
    incorporationDate: "1847-10-12",
    legalAddress: {
      street: "Werner-von-Siemens-Stra\xDFe 1",
      city: "Munich",
      postalCode: "80333",
      country: "DE"
    },
    headquartersAddress: {
      street: "Werner-von-Siemens-Stra\xDFe 1",
      city: "Munich",
      postalCode: "80333",
      country: "DE"
    },
    parentLei: null,
    ultimateParentLei: null,
    domains: ["siemens.com"],
    aliases: ["SIEMENS AG", "SIEMENS"],
    sources: [
      {
        source: "GLEIF",
        sourceId: "W38RGI023J3WT1HWRP32",
        fetchedAt: "2026-01-01T00:00:00Z"
      }
    ],
    confidence: 0.99
  }
];

class InMemoryEntityRepositoryAdapter {
  entities = new Map;
  constructor(initialEntities = SEED_ENTITIES) {
    for (const entity of initialEntities) {
      const key = `${entity.jurisdiction}:${entity.primaryIdType}:${entity.primaryIdValue}`;
      this.entities.set(key, { ...entity });
    }
  }
  async findByIdentifier(type, value, jurisdiction, scheme) {
    if (!value.trim())
      return null;
    const aliases = { VAT: "EU_VAT", TAX: "US_EIN", CIK: "US_CIK", NATIONAL_REG: "NATIONAL_ID" };
    const parsedType = IdentifierTypeSchema.safeParse(aliases[type] ?? type);
    if (!parsedType.success || parsedType.data === "NAME")
      return null;
    const query = { ...classifyQuery(value, jurisdiction), type: parsedType.data, ...scheme ? { scheme } : {} };
    const targetJur = normalizeCountryCode(jurisdiction || query.inferredCountry || "");
    for (const entity of this.entities.values()) {
      if (targetJur && entity.jurisdiction.toUpperCase() !== targetJur)
        continue;
      if (matchesEntityIdentifier(entity, query))
        return { ...entity };
    }
    return null;
  }
  async searchFuzzy(normalizedName, opts) {
    const limit = opts?.limit ?? 5;
    const scored = [];
    for (const entity of this.entities.values()) {
      if (opts?.jurisdiction) {
        const jur = opts.jurisdiction.toUpperCase();
        if (jur === "EU" || jur === "US") {
          const matchRegion = entity.region === jur;
          const matchJur = entity.jurisdiction.toUpperCase() === jur;
          if (!matchRegion && !matchJur) {
            continue;
          }
        } else {
          if (entity.jurisdiction.toUpperCase() !== jur) {
            continue;
          }
        }
      }
      const nameSim = trigramSimilarity(normalizedName, entity.normalizedName);
      const aliasSims = entity.aliases.map((a) => trigramSimilarity(normalizedName, a));
      const score = Math.max(nameSim, ...aliasSims);
      if (score >= 0.3) {
        scored.push({ entity, score });
      }
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map(({ entity, score }) => ({
      ...entity,
      confidence: Math.round(score * 1e4) / 1e4
    }));
  }
  async upsertMany(entities) {
    let count = 0;
    for (const entity of entities) {
      const key = `${entity.jurisdiction}:${entity.primaryIdType}:${entity.primaryIdValue}`;
      this.entities.set(key, { ...entity });
      count++;
    }
    return count;
  }
  async count() {
    return this.entities.size;
  }
}

class HybridPostgresEntityRepositoryAdapter {
  databaseUrl;
  memory;
  sql = null;
  sqlHealthy = true;
  initPromise = null;
  constructor(databaseUrl, initialEntities = SEED_ENTITIES) {
    this.databaseUrl = databaseUrl;
    this.memory = new InMemoryEntityRepositoryAdapter(initialEntities);
  }
  async ensureDb() {
    if (!this.databaseUrl)
      return null;
    const databaseUrl = this.databaseUrl;
    if (this.sql && this.sqlHealthy)
      return this.sql;
    if (!this.initPromise) {
      this.initPromise = (async () => {
        try {
          const db = new Bun.SQL(databaseUrl);
          await db.unsafe(entitiesTable.createSql);
          this.sql = db;
          this.sqlHealthy = true;
        } catch (err) {
          console.error("[entities:db] ensureDb failed:", err);
          this.sql = null;
          this.sqlHealthy = false;
        }
      })();
    }
    await this.initPromise;
    if (!this.sql || !this.sqlHealthy)
      this.initPromise = null;
    return this.sqlHealthy ? this.sql : null;
  }
  async findByIdentifier(type, value, jurisdiction, scheme) {
    const db = await this.ensureDb();
    if (db && this.sqlHealthy) {
      try {
        const cleanVal = value.trim();
        const query = classifyQuery(cleanVal, jurisdiction);
        const jurFilter = normalizeCountryCode(jurisdiction || query.inferredCountry || "") || null;
        const normalized = cleanVal.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        const domain = cleanVal.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
        const rows = await db`
          SELECT * FROM entities
          WHERE (${jurFilter}::text IS NULL OR jurisdiction = ${jurFilter})
            AND (regexp_replace(upper(primary_id_value), '[^A-Z0-9]', '', 'g') = ${normalized}
              OR regexp_replace(upper(lei), '[^A-Z0-9]', '', 'g') = ${normalized}
              OR regexp_replace(upper(vat_number), '[^A-Z0-9]', '', 'g') = ${normalized}
              OR regexp_replace(upper(registration_number), '[^A-Z0-9]', '', 'g') = ${normalized}
              OR regexp_replace(upper(tax_id), '[^A-Z0-9]', '', 'g') = ${normalized}
              OR cik = ${query.type === "US_CIK" ? query.cleanedValue : cleanVal}
              OR domains @> ${JSON.stringify([domain])}::text::jsonb)
        `;
        const candidates = rows.map(mapRowToEntity);
        const matching = await new InMemoryEntityRepositoryAdapter(candidates).findByIdentifier(type, value, jurisdiction, scheme);
        if (matching)
          return matching;
      } catch {
        this.sqlHealthy = false;
      }
    }
    return this.memory.findByIdentifier(type, value, jurisdiction, scheme);
  }
  async searchFuzzy(normalizedName, opts) {
    const db = await this.ensureDb();
    if (db && this.sqlHealthy) {
      try {
        const limit = opts?.limit ?? 5;
        const rows = await db`
          SELECT *, similarity(normalized_name, ${normalizedName}) as sm
          FROM entities
          WHERE similarity(normalized_name, ${normalizedName}) >= 0.3
          ORDER BY sm DESC
          LIMIT ${limit}
        `;
        if (rows && rows.length > 0) {
          return rows.map((r) => mapRowToEntity(r, r.sm));
        }
      } catch {
        this.sqlHealthy = false;
      }
    }
    return this.memory.searchFuzzy(normalizedName, opts);
  }
  async upsertMany(entities) {
    const memCount = await this.memory.upsertMany(entities);
    const db = await this.ensureDb();
    if (db && this.sqlHealthy) {
      try {
        const dedupedMap = new Map;
        for (const e of entities) {
          const key = `${e.jurisdiction}:${e.primaryIdType}:${e.primaryIdValue}`;
          const prev = dedupedMap.get(key);
          if (prev) {
            prev.tickers = Array.from(new Set([...prev.tickers, ...e.tickers]));
            prev.aliases = Array.from(new Set([...prev.aliases, ...e.aliases]));
          } else {
            dedupedMap.set(key, { ...e });
          }
        }
        const deduped = Array.from(dedupedMap.values());
        const BATCH_SIZE = 500;
        for (let i = 0;i < deduped.length; i += BATCH_SIZE) {
          const chunk = deduped.slice(i, i + BATCH_SIZE).map((e) => ({
            id: e.id ?? `${e.jurisdiction}:${e.primaryIdType}:${e.primaryIdValue}`,
            canonical_name: e.canonicalName,
            normalized_name: e.normalizedName || e.canonicalName.toUpperCase(),
            jurisdiction: e.jurisdiction,
            region: e.region,
            primary_id_type: e.primaryIdType,
            primary_id_value: e.primaryIdValue,
            lei: e.lei ?? null,
            registration_number: e.registrationNumber ?? null,
            registration_authority: e.registrationAuthority ?? null,
            vat_number: e.vatNumber ?? null,
            vat_valid: e.vatValid ?? null,
            tax_id: e.taxId ?? null,
            cik: e.cik ?? null,
            tickers: e.tickers ?? [],
            legal_form: e.legalForm ?? null,
            status: e.status ?? "ACTIVE",
            incorporation_date: e.incorporationDate ?? null,
            legal_address: e.legalAddress ?? null,
            headquarters_address: e.headquartersAddress ?? null,
            parent_lei: e.parentLei ?? null,
            ultimate_parent_lei: e.ultimateParentLei ?? null,
            domains: e.domains ?? [],
            aliases: (e.aliases ?? []).join(" | "),
            sources: e.sources ?? []
          }));
          await db`
            INSERT INTO entities (
              id, canonical_name, normalized_name, jurisdiction, region,
              primary_id_type, primary_id_value, lei, registration_number,
              registration_authority, vat_number, vat_valid, tax_id, cik,
              tickers, legal_form, status, incorporation_date, legal_address,
              headquarters_address, parent_lei, ultimate_parent_lei, domains,
              aliases, sources, updated_at
            )
            SELECT
              r.id, r.canonical_name, r.normalized_name, r.jurisdiction, r.region,
              r.primary_id_type, r.primary_id_value, r.lei, r.registration_number,
              r.registration_authority, r.vat_number, r.vat_valid, r.tax_id, r.cik,
              r.tickers, r.legal_form, r.status, r.incorporation_date, r.legal_address,
              r.headquarters_address, r.parent_lei, r.ultimate_parent_lei, r.domains,
              r.aliases, r.sources, NOW()
            FROM jsonb_to_recordset(${JSON.stringify(chunk)}::text::jsonb) AS r(
              id text,
              canonical_name text,
              normalized_name text,
              jurisdiction text,
              region text,
              primary_id_type text,
              primary_id_value text,
              lei text,
              registration_number text,
              registration_authority text,
              vat_number text,
              vat_valid boolean,
              tax_id text,
              cik text,
              tickers jsonb,
              legal_form text,
              status text,
              incorporation_date text,
              legal_address jsonb,
              headquarters_address jsonb,
              parent_lei text,
              ultimate_parent_lei text,
              domains jsonb,
              aliases text,
              sources jsonb
            )
            ON CONFLICT (jurisdiction, primary_id_type, primary_id_value) DO UPDATE SET
              canonical_name = EXCLUDED.canonical_name,
              normalized_name = EXCLUDED.normalized_name,
              lei = COALESCE(EXCLUDED.lei, entities.lei),
              vat_number = COALESCE(EXCLUDED.vat_number, entities.vat_number),
              vat_valid = COALESCE(EXCLUDED.vat_valid, entities.vat_valid),
              tickers = EXCLUDED.tickers,
              legal_address = COALESCE(EXCLUDED.legal_address, entities.legal_address),
              headquarters_address = COALESCE(EXCLUDED.headquarters_address, entities.headquarters_address),
              parent_lei = COALESCE(EXCLUDED.parent_lei, entities.parent_lei),
              ultimate_parent_lei = COALESCE(EXCLUDED.ultimate_parent_lei, entities.ultimate_parent_lei),
              domains = EXCLUDED.domains,
              aliases = EXCLUDED.aliases,
              sources = EXCLUDED.sources,
              updated_at = NOW()
          `;
        }
      } catch (error) {
        throw error;
      }
    } else if (this.databaseUrl) {
      throw new Error("Cannot persist entities: PostgreSQL unavailable");
    }
    return memCount;
  }
  async count() {
    const db = await this.ensureDb();
    if (db && this.sqlHealthy) {
      try {
        const rows = await db`SELECT count(*)::int as count FROM entities`;
        if (rows && rows[0]) {
          return Number(rows[0].count);
        }
      } catch {
        this.sqlHealthy = false;
      }
    }
    return this.memory.count();
  }
}
function mapRowToEntity(row, similarityScore) {
  return {
    id: row.id,
    canonicalName: row.canonical_name,
    normalizedName: row.normalized_name,
    jurisdiction: row.jurisdiction,
    region: row.region,
    primaryIdType: row.primary_id_type,
    primaryIdValue: row.primary_id_value,
    lei: row.lei ?? null,
    registrationNumber: row.registration_number ?? null,
    registrationAuthority: row.registration_authority ?? null,
    vatNumber: row.vat_number ?? null,
    vatValid: row.vat_valid ?? null,
    taxId: row.tax_id ?? null,
    cik: row.cik ?? null,
    tickers: typeof row.tickers === "string" ? JSON.parse(row.tickers) : row.tickers ?? [],
    legalForm: row.legal_form ?? null,
    status: row.status ?? "ACTIVE",
    incorporationDate: row.incorporation_date ?? null,
    legalAddress: typeof row.legal_address === "string" ? JSON.parse(row.legal_address) : row.legal_address ?? null,
    headquartersAddress: typeof row.headquarters_address === "string" ? JSON.parse(row.headquarters_address) : row.headquarters_address ?? null,
    parentLei: row.parent_lei ?? null,
    ultimateParentLei: row.ultimate_parent_lei ?? null,
    domains: typeof row.domains === "string" ? JSON.parse(row.domains) : row.domains ?? [],
    aliases: typeof row.aliases === "string" ? row.aliases.split(" ").filter(Boolean) : Array.isArray(row.aliases) ? row.aliases : [],
    sources: typeof row.sources === "string" ? JSON.parse(row.sources) : row.sources ?? [],
    confidence: similarityScore !== undefined ? Math.round(similarityScore * 1e4) / 1e4 : 0.99
  };
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/persistence/sanctions-repository.adapter.ts
var SEED_SANCTIONS = [
  {
    listSource: "OFAC_SDN",
    externalId: "OFAC-18201",
    primaryName: "GAZPROMBANK OJSC",
    aliases: [
      "BANK GPB",
      "GPB OJSC",
      "JOINT STOCK COMPANY GAZPROMBANK",
      "GAZPROMBANK"
    ],
    entityType: "ENTITY",
    countries: ["RU"],
    programs: ["RUSSIA-EO14024"],
    identifiers: ["350000100001", "1027700167110"],
    remarks: "Designated pursuant to E.O. 14024"
  },
  {
    listSource: "EU_FSF",
    externalId: "EU-FSF-9912",
    primaryName: "SEVERSTAL PAO",
    aliases: ["PAO SEVERSTAL", "SEVERSTAL JSC", "SEVERSTAL"],
    entityType: "ENTITY",
    countries: ["RU"],
    programs: ["EU-REG-269-2014"],
    identifiers: ["3528000597", "1023501239462"],
    remarks: "EU Council Regulation (EU) No 269/2014"
  },
  {
    listSource: "OFAC_SDN",
    externalId: "OFAC-9001",
    primaryName: "AL-QAIDA LOGISTICS NETWORK",
    aliases: ["AL-QAEDA PROCUREMENT GROUP", "TANZIM QA'IDAT AL-JIHAD"],
    entityType: "ENTITY",
    countries: ["AF", "PK"],
    programs: ["SDGT"],
    identifiers: [],
    remarks: "Designated under E.O. 13224"
  }
];
var REQUIRED_FEEDS = ["OFAC_SDN", "EU_FSF", "UN_SC", "UK_FCDO"];
function assessCoverage(totalRecords, statuses, minRecords = 100, maxAgeMs = 168 * 3600 * 1000) {
  const issues = [];
  const refreshed = [];
  if (totalRecords < minRecords) {
    issues.push(`Sanctions database contains only ${totalRecords} records (minimum ${minRecords} required for production clearance)`);
  }
  for (const source of REQUIRED_FEEDS) {
    const feed = statuses.get(source);
    const timestamp = feed?.lastRefreshedAt ? Date.parse(feed.lastRefreshedAt) : NaN;
    if (!feed || feed.status !== "OK" || !Number.isSafeInteger(feed.recordCount) || feed.recordCount < minRecords) {
      issues.push(`${source} feed is missing, failed, or incomplete`);
    } else if (!Number.isFinite(timestamp) || Date.now() - timestamp > maxAgeMs || timestamp > Date.now() + 300000) {
      issues.push(`${source} feed is stale or has no valid refresh timestamp`);
    } else {
      refreshed.push(timestamp);
    }
  }
  return {
    totalRecords,
    lastRefreshedAt: refreshed.length === REQUIRED_FEEDS.length ? new Date(Math.min(...refreshed)).toISOString() : null,
    degraded: issues.length > 0,
    degradedReason: issues.length ? issues.join("; ") : undefined,
    feeds: Object.fromEntries(statuses)
  };
}
function validateSnapshot(source, entries, previous, minRecords = 100) {
  if (entries.length < minRecords || previous >= 10 && entries.length < previous * 0.8)
    throw new Error("Sanctions snapshot is too small compared with the last published snapshot");
  if (entries.some((entry) => entry.listSource !== source || !entry.externalId || !entry.primaryName) || new Set(entries.map((entry) => entry.externalId)).size !== entries.length)
    throw new Error("Invalid or duplicate sanctions snapshot entries");
}

class InMemorySanctionsRepositoryAdapter {
  entries = new Map;
  feedStatus = new Map;
  attempts = new Map;
  minRecords;
  maxAgeMs;
  lastRefreshedAt = null;
  constructor(initialEntries = SEED_SANCTIONS, options = {}) {
    this.minRecords = options.minRecords ?? 100;
    this.maxAgeMs = (options.maxAgeHours ?? 168) * 3600 * 1000;
    for (const entry of initialEntries) {
      this.entries.set(`${entry.listSource}:${entry.externalId}`, { ...entry });
    }
    if (initialEntries.length > 0) {
      this.lastRefreshedAt = new Date().toISOString();
      this.feedStatus.set("SEED", {
        source: "SEED",
        recordCount: initialEntries.length,
        lastRefreshedAt: this.lastRefreshedAt,
        status: initialEntries.length >= this.minRecords ? "OK" : "DEGRADED"
      });
    }
  }
  async recordFeedSync(status) {
    this.feedStatus.set(status.source, status);
    if (status.status === "OK") {
      this.lastRefreshedAt = status.lastRefreshedAt ?? new Date().toISOString();
    }
  }
  async getFeedStatus() {
    return assessCoverage(this.entries.size, this.feedStatus, this.minRecords, this.maxAgeMs);
  }
  async screen(input) {
    const threshold = input.threshold ?? 0.75;
    const matches = [];
    const regUpper = input.registrationNumber?.trim().toUpperCase();
    for (const entry of this.entries.values()) {
      let score = 0;
      if (regUpper && entry.identifiers.some((id) => id.toUpperCase() === regUpper)) {
        score = 1;
      } else {
        const nameSim = Math.max(trigramSimilarity(input.name, entry.primaryName), wordTrigramSimilarity(input.name, entry.primaryName));
        const aliasSims = entry.aliases.map((a) => Math.max(trigramSimilarity(input.name, a), wordTrigramSimilarity(input.name, a)));
        score = Math.max(nameSim, ...aliasSims);
      }
      if (score >= threshold) {
        matches.push({
          listSource: entry.listSource,
          externalId: entry.externalId,
          primaryName: entry.primaryName,
          entityType: entry.entityType,
          programs: entry.programs,
          score: Math.round(score * 1e4) / 1e4,
          remarks: entry.remarks
        });
      }
    }
    matches.sort((a, b) => b.score - a.score);
    const maxScore = matches.length > 0 ? matches[0].score : 0;
    const feedStatus = await this.getFeedStatus();
    let riskLevel = maxScore >= 0.95 ? "EXACT_MATCH" : matches.length > 0 ? "POTENTIAL_MATCH" : this.entries.size === 0 ? "UNKNOWN" : "CLEAR";
    const matchedLists = Array.from(new Set(matches.map((m) => m.listSource)));
    const sourcesScreened = Array.from(new Set(Array.from(this.entries.values()).map((e) => e.listSource)));
    return {
      sanctioned: matches.length > 0,
      riskLevel,
      matchScore: maxScore,
      matchedLists,
      matches,
      degraded: feedStatus.degraded,
      degradedReason: feedStatus.degradedReason,
      coverage: {
        recordCount: this.entries.size,
        sourcesScreened,
        lastSyncAt: feedStatus.lastRefreshedAt
      }
    };
  }
  async upsertMany(entries) {
    let count = 0;
    for (const entry of entries) {
      this.entries.set(`${entry.listSource}:${entry.externalId}`, { ...entry });
      count++;
    }
    return count;
  }
  async beginFeedAttempt(source) {
    const token = crypto.randomUUID();
    this.attempts.set(source, token);
    return token;
  }
  async failFeedAttempt(source, attempt, error) {
    if (this.attempts.get(source) === attempt)
      await this.recordFeedSync({ source, recordCount: 0, lastRefreshedAt: null, status: "FAILED", error });
  }
  async replaceFeedSnapshot(source, entries, refreshedAt, attempt) {
    if (attempt && this.attempts.get(source) !== attempt)
      throw new Error("Superseded sanctions feed attempt");
    const previous = [...this.entries.values()].filter((entry) => entry.listSource === source).length;
    validateSnapshot(source, entries, previous, this.minRecords);
    for (const [key, entry] of this.entries)
      if (entry.listSource === source)
        this.entries.delete(key);
    for (const entry of entries)
      this.entries.set(`${source}:${entry.externalId}`, { ...entry });
    await this.recordFeedSync({ source, recordCount: entries.length, lastRefreshedAt: refreshedAt, status: "OK" });
  }
  async count() {
    return this.entries.size;
  }
}

class HybridPostgresSanctionsRepositoryAdapter {
  databaseUrl;
  minRecords;
  fallback;
  sql = null;
  initPromise = null;
  constructor(databaseUrl, minRecords = 100) {
    this.databaseUrl = databaseUrl;
    this.minRecords = minRecords;
    this.fallback = new InMemorySanctionsRepositoryAdapter(SEED_SANCTIONS, {
      minRecords
    });
  }
  async ensureDb() {
    if (!this.databaseUrl)
      return null;
    if (this.sql)
      return this.sql;
    if (!this.initPromise) {
      this.initPromise = (async () => {
        let db;
        try {
          const SqlCtor = globalThis.Bun?.SQL;
          if (!SqlCtor)
            return;
          db = new SqlCtor(this.databaseUrl);
          try {
            await db.unsafe(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
          } catch (extErr) {
            console.warn("[sanctions:db] pg_trgm extension creation skipped/failed:", extErr);
          }
          await db.unsafe(sanctionsEntriesTable.createSql);
          await db.unsafe(syncRunsTable.createSql);
          this.sql = db;
        } catch (err) {
          console.error("[sanctions:db] ensureDb failed:", err);
          if (db)
            await db.close().catch(() => {});
          this.sql = null;
        }
      })();
    }
    await this.initPromise;
    if (!this.sql)
      this.initPromise = null;
    return this.sql;
  }
  async recordFeedSync(status) {
    await this.fallback.recordFeedSync(status);
    if (!this.databaseUrl)
      return;
    const db = await this.ensureDb();
    if (!db)
      throw new Error("Cannot persist sanctions feed status: PostgreSQL unavailable");
    await db`
      INSERT INTO sync_runs (id, dataset, status, rows_upserted, finished_at, error_message)
      VALUES (${`sanctions-feed:${status.source}`}, ${status.source}, ${status.status}, ${status.recordCount}, ${status.lastRefreshedAt}, ${status.error ?? null})
      ON CONFLICT (id) DO UPDATE SET
        dataset = EXCLUDED.dataset, status = EXCLUDED.status,
        rows_upserted = EXCLUDED.rows_upserted, finished_at = EXCLUDED.finished_at,
        error_message = EXCLUDED.error_message
    `;
  }
  async getFeedStatus() {
    const db = await this.ensureDb();
    if (!db) {
      const fb = await this.fallback.getFeedStatus();
      return {
        ...fb,
        degraded: true,
        degradedReason: "PostgreSQL database unavailable; operating in degraded fallback mode"
      };
    }
    try {
      const rows = await db`SELECT COUNT(*)::int AS cnt FROM sanctions_entries`;
      const persisted = await db`
        SELECT dataset, status, rows_upserted, finished_at, error_message
        FROM sync_runs WHERE id LIKE 'sanctions-feed:%'
      `;
      const feeds = new Map(persisted.map((row) => [String(row.dataset), {
        source: String(row.dataset),
        status: row.status,
        recordCount: Number(row.rows_upserted),
        lastRefreshedAt: row.finished_at ? new Date(row.finished_at).toISOString() : null,
        error: row.error_message ?? undefined
      }]));
      return assessCoverage(Number(rows[0]?.cnt ?? 0), feeds);
    } catch {
      const fb = await this.fallback.getFeedStatus();
      return {
        ...fb,
        degraded: true,
        degradedReason: "Database query error checking sanctions feed status"
      };
    }
  }
  async screen(input) {
    const db = await this.ensureDb();
    if (!db) {
      const fallbackRes = await this.fallback.screen(input);
      return {
        ...fallbackRes,
        degraded: true,
        degradedReason: "PostgreSQL database connection unavailable; fell back to in-memory dataset"
      };
    }
    try {
      const threshold = input.threshold ?? 0.75;
      const normName = normalizeCompanyName(input.name).normalizedName;
      const regUpper = input.registrationNumber?.trim().toUpperCase() ?? "";
      const rows = await db`
        SELECT
          list_source,
          external_id,
          entity_type,
          primary_name,
          programs,
          remarks,
          CASE
            WHEN ${regUpper} <> '' AND identifiers @> to_jsonb(${regUpper}::text) THEN 1.0
            ELSE GREATEST(
              similarity(normalized_name, ${normName}),
              word_similarity(normalized_name, ${normName}) * 0.92,
              similarity(aliases, ${normName}),
              word_similarity(${normName}, aliases) * 0.92
            )
          END AS score
        FROM sanctions_entries
        WHERE
          (${regUpper} <> '' AND identifiers @> to_jsonb(${regUpper}::text))
          OR similarity(normalized_name, ${normName}) >= ${threshold}
          OR word_similarity(normalized_name, ${normName}) * 0.92 >= ${threshold}
          OR similarity(aliases, ${normName}) >= ${threshold}
        ORDER BY score DESC
        LIMIT 20
      `;
      const matches = rows.map((r) => ({
        listSource: r.list_source,
        externalId: String(r.external_id),
        primaryName: String(r.primary_name),
        entityType: r.entity_type,
        programs: Array.isArray(r.programs) ? r.programs : [],
        score: Math.round(Number(r.score) * 1e4) / 1e4,
        remarks: r.remarks ? String(r.remarks) : undefined
      })).filter((m) => m.score >= threshold);
      const feedStatus = await this.getFeedStatus();
      const totalCount = feedStatus.totalRecords;
      const isDegraded = feedStatus.degraded;
      const maxScore = matches.length > 0 ? matches[0].score : 0;
      const riskLevel = maxScore >= 0.95 ? "EXACT_MATCH" : matches.length > 0 ? "POTENTIAL_MATCH" : isDegraded && totalCount === 0 ? "UNKNOWN" : "CLEAR";
      return {
        sanctioned: matches.length > 0,
        riskLevel,
        matchScore: maxScore,
        matchedLists: Array.from(new Set(matches.map((m) => m.listSource))),
        matches,
        degraded: isDegraded,
        degradedReason: feedStatus.degradedReason,
        coverage: {
          recordCount: totalCount,
          sourcesScreened: [...REQUIRED_FEEDS],
          lastSyncAt: feedStatus.lastRefreshedAt
        }
      };
    } catch {
      const fallbackRes = await this.fallback.screen(input);
      return {
        ...fallbackRes,
        degraded: true,
        degradedReason: "PostgreSQL query failed; fell back to degraded in-memory dataset"
      };
    }
  }
  async upsertMany(entries) {
    await this.fallback.upsertMany(entries);
    if (!this.databaseUrl)
      return entries.length;
    const db = await this.ensureDb();
    if (!db)
      throw new Error("Cannot persist sanctions data: PostgreSQL unavailable");
    await this.writeEntries(db, entries);
    return entries.length;
  }
  async writeEntries(db, entries) {
    const BATCH_SIZE = 500;
    for (let i = 0;i < entries.length; i += BATCH_SIZE) {
      const chunk = entries.slice(i, i + BATCH_SIZE).map((entry) => ({
        id: `${entry.listSource}:${entry.externalId}`,
        list_source: entry.listSource,
        external_id: entry.externalId,
        entity_type: entry.entityType,
        primary_name: entry.primaryName,
        normalized_name: normalizeCompanyName(entry.primaryName).normalizedName || entry.primaryName.toUpperCase(),
        aliases: entry.aliases.map((a) => normalizeCompanyName(a).normalizedName).filter(Boolean).join(" | "),
        countries: entry.countries,
        programs: entry.programs,
        identifiers: entry.identifiers,
        remarks: entry.remarks ?? null
      }));
      await db`
          INSERT INTO sanctions_entries (
            id, list_source, external_id, entity_type, primary_name,
            normalized_name, aliases, countries, programs, identifiers, remarks, updated_at
          )
          SELECT
            r.id, r.list_source, r.external_id, r.entity_type, r.primary_name,
            r.normalized_name, r.aliases, r.countries, r.programs, r.identifiers, r.remarks, NOW()
          FROM jsonb_to_recordset(${JSON.stringify(chunk)}::text::jsonb) AS r(
            id text,
            list_source text,
            external_id text,
            entity_type text,
            primary_name text,
            normalized_name text,
            aliases text,
            countries jsonb,
            programs jsonb,
            identifiers jsonb,
            remarks text
          )
          ON CONFLICT (list_source, external_id) DO UPDATE SET
            primary_name = EXCLUDED.primary_name,
            normalized_name = EXCLUDED.normalized_name,
            aliases = EXCLUDED.aliases,
            countries = EXCLUDED.countries,
            programs = EXCLUDED.programs,
            identifiers = EXCLUDED.identifiers,
            remarks = EXCLUDED.remarks,
            updated_at = NOW()
        `;
    }
  }
  async beginFeedAttempt(source) {
    if (!this.databaseUrl)
      return this.fallback.beginFeedAttempt(source);
    const db = await this.ensureDb();
    if (!db)
      throw new Error("Cannot begin sanctions feed attempt: PostgreSQL unavailable");
    const token = crypto.randomUUID();
    await db.begin(async (tx) => {
      await tx`SELECT pg_advisory_xact_lock(hashtext(${`sanctions-feed:${source}`}))`;
      await tx`INSERT INTO sync_runs (id, dataset, status, error_message) VALUES (${`sanctions-attempt:${source}`}, ${source}, 'RUNNING', ${token})
        ON CONFLICT (id) DO UPDATE SET status = 'RUNNING', error_message = EXCLUDED.error_message`;
    });
    return token;
  }
  async failFeedAttempt(source, attempt, error) {
    if (!this.databaseUrl)
      return this.fallback.failFeedAttempt(source, attempt, error);
    const db = await this.ensureDb();
    if (!db)
      throw new Error("Cannot record sanctions feed failure: PostgreSQL unavailable");
    await db.begin(async (tx) => {
      await tx`SELECT pg_advisory_xact_lock(hashtext(${`sanctions-feed:${source}`}))`;
      const current = await tx`SELECT error_message FROM sync_runs WHERE id = ${`sanctions-attempt:${source}`}`;
      if (current[0]?.error_message !== attempt)
        return;
      await tx`INSERT INTO sync_runs (id, dataset, status, rows_upserted, finished_at, error_message)
        VALUES (${`sanctions-feed:${source}`}, ${source}, 'FAILED', 0, NULL, ${error})
        ON CONFLICT (id) DO UPDATE SET status = 'FAILED', rows_upserted = 0, finished_at = NULL, error_message = EXCLUDED.error_message`;
    });
  }
  async replaceFeedSnapshot(source, entries, refreshedAt, attempt) {
    if (!this.databaseUrl)
      return this.fallback.replaceFeedSnapshot(source, entries, refreshedAt, attempt);
    const db = await this.ensureDb();
    if (!db)
      throw new Error("Cannot persist sanctions data: PostgreSQL unavailable");
    await db.begin(async (tx) => {
      await tx`SELECT pg_advisory_xact_lock(hashtext(${`sanctions-feed:${source}`}))`;
      if (attempt) {
        const current = await tx`SELECT error_message FROM sync_runs WHERE id = ${`sanctions-attempt:${source}`}`;
        if (current[0]?.error_message !== attempt)
          throw new Error("Superseded sanctions feed attempt");
      }
      const rows = await tx`SELECT COUNT(*)::int AS cnt FROM sanctions_entries WHERE list_source = ${source}`;
      validateSnapshot(source, entries, Number(rows[0]?.cnt ?? 0), this.minRecords);
      await tx`DELETE FROM sanctions_entries WHERE list_source = ${source}`;
      await this.writeEntries(tx, entries);
      await tx`
        INSERT INTO sync_runs (id, dataset, status, rows_upserted, finished_at, error_message)
        VALUES (${`sanctions-feed:${source}`}, ${source}, 'OK', ${entries.length}, ${refreshedAt}, NULL)
        ON CONFLICT (id) DO UPDATE SET status = 'OK', rows_upserted = EXCLUDED.rows_upserted,
          finished_at = EXCLUDED.finished_at, error_message = NULL
      `;
    });
  }
  async count() {
    const db = await this.ensureDb();
    if (!db)
      return this.fallback.count();
    try {
      const rows = await db`SELECT COUNT(*)::int AS cnt FROM sanctions_entries`;
      return Math.max(Number(rows[0]?.cnt ?? 0), await this.fallback.count());
    } catch {
      return this.fallback.count();
    }
  }
}

// ../../agentum-clean-release/agentum/src/adapters/inbound/worker/ingest.adapter.ts
var DEFAULT_BULK_FEED_URLS = {
  ofacSdnCsvUrl: "https://www.treasury.gov/ofac/downloads/sdn.csv",
  euFsfSimpleCsvUrl: "https://webgate.ec.europa.eu/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content?token=dG9rZW4tMjAxNw",
  unScSimpleCsvUrl: "https://scsanctions.un.org/resources/xml/en/consolidated.xml",
  ukFcdoSimpleCsvUrl: "https://sanctionslist.fcdo.gov.uk/docs/UK-Sanctions-List.csv",
  secCompanyTickersUrl: "https://www.sec.gov/files/company_tickers.json",
  ltJarBulkJsonUrl: "https://get.data.gov.lt/datasets/gov/rc/jar/iregistruoti/JuridinisAsmuo?limit(500)",
  gleifBulkJsonUrl: "https://api.gleif.org/api/v1/lei-records?page[size]=200&page[number]=1"
};
function parseOfacRows(rows) {
  const entries = [];
  for (const cols of rows) {
    const entNum = cols[0]?.replace(/^-0-$/, "").trim();
    const sdnName = cols[1]?.replace(/^-0-$/, "").trim();
    if (!entNum || !sdnName || !/^\d+$/.test(entNum))
      continue;
    const sdnTypeRaw = (cols[2] ?? "").toUpperCase();
    const entityType = sdnTypeRaw.includes("INDIVIDUAL") ? "INDIVIDUAL" : sdnTypeRaw.includes("VESSEL") ? "VESSEL" : sdnTypeRaw.includes("AIRCRAFT") ? "AIRCRAFT" : "ENTITY";
    const programRaw = (cols[3] ?? "").replace(/^-0-$/, "").trim();
    const programs = programRaw ? programRaw.split(/[;\]]+/).map((p) => p.replace(/^\[/, "").trim()).filter(Boolean) : ["OFAC_SDN"];
    const remarksRaw = (cols[11] ?? "").replace(/^-0-$/, "").trim();
    const aliases = [];
    const akaRegex = /a\.k\.a\.\s*'([^']+)'/gi;
    let match;
    while ((match = akaRegex.exec(remarksRaw)) !== null) {
      if (match[1])
        aliases.push(match[1].trim());
    }
    const identifiers = [];
    const idRegex = /(?:Tax ID No\.|Registration ID|Registration Number|Company Number|LEI|INN|OGRN)\s*([A-Z0-9-]{5,24})/gi;
    while ((match = idRegex.exec(remarksRaw)) !== null) {
      if (match[1])
        identifiers.push(match[1].trim().toUpperCase());
    }
    entries.push({
      listSource: "OFAC_SDN",
      externalId: `OFAC-${entNum}`,
      primaryName: sdnName,
      aliases,
      entityType,
      countries: [],
      programs,
      identifiers,
      remarks: remarksRaw || undefined
    });
  }
  return entries;
}
function parseOpenSanctionsRows(rows, listSource) {
  const entries = [];
  if (rows.length <= 1)
    return entries;
  const header = rows[0].map((h) => h.toLowerCase());
  const idxId = header.indexOf("id");
  const idxSchema = header.indexOf("schema");
  const idxName = header.indexOf("name");
  const idxAliases = header.indexOf("aliases");
  const idxCountries = header.indexOf("countries");
  const idxIdentifiers = header.indexOf("identifiers");
  const idxSanctions = header.indexOf("sanctions");
  for (let i = 1;i < rows.length; i++) {
    const cols = rows[i];
    const id = cols[idxId >= 0 ? idxId : 0]?.trim();
    const name = cols[idxName >= 0 ? idxName : 2]?.trim();
    if (!id || !name)
      continue;
    const schemaRaw = (cols[idxSchema >= 0 ? idxSchema : 1] ?? "").toLowerCase();
    const entityType = schemaRaw === "person" ? "INDIVIDUAL" : schemaRaw === "vessel" ? "VESSEL" : schemaRaw === "airplane" ? "AIRCRAFT" : "ENTITY";
    const aliases = (cols[idxAliases >= 0 ? idxAliases : 3] ?? "").split(";").map((s) => s.trim()).filter(Boolean);
    const countries = (cols[idxCountries >= 0 ? idxCountries : 5] ?? "").split(";").map((s) => s.trim().toUpperCase()).filter(Boolean);
    const identifiers = (cols[idxIdentifiers >= 0 ? idxIdentifiers : 7] ?? "").split(";").map((s) => s.trim().toUpperCase()).filter(Boolean);
    const sanctionsRaw = (cols[idxSanctions >= 0 ? idxSanctions : 8] ?? "").trim();
    entries.push({
      listSource,
      externalId: id,
      primaryName: name,
      aliases,
      entityType,
      countries,
      programs: sanctionsRaw ? sanctionsRaw.split(";").map((s) => s.trim()).filter(Boolean) : [listSource],
      identifiers,
      remarks: sanctionsRaw || undefined
    });
  }
  return entries;
}
function parseSecCompanyTickersJson(payload, limit = 15000) {
  const nowIso = new Date().toISOString();
  const entities = [];
  for (const row of Object.values(payload)) {
    if (entities.length >= limit)
      break;
    if (!row || row.cik_str === undefined || !row.title)
      continue;
    const cik = String(row.cik_str).padStart(10, "0");
    const legalName = String(row.title).trim();
    const ticker = row.ticker ? String(row.ticker).trim().toUpperCase() : undefined;
    const norm = normalizeCompanyName(legalName);
    entities.push({
      id: `US_CIK:${cik}`,
      canonicalName: legalName,
      normalizedName: norm.normalizedName || legalName.toUpperCase(),
      jurisdiction: "US",
      region: "US",
      primaryIdType: "US_CIK",
      primaryIdValue: cik,
      lei: null,
      registrationNumber: null,
      registrationAuthority: "RA000598",
      vatNumber: null,
      vatValid: null,
      taxId: null,
      cik,
      tickers: ticker ? [ticker] : [],
      legalForm: norm.detectedLegalForm ?? "CORP",
      status: "ACTIVE",
      incorporationDate: null,
      legalAddress: null,
      headquartersAddress: null,
      parentLei: null,
      ultimateParentLei: null,
      domains: [],
      aliases: ticker ? [ticker] : [],
      sources: [
        {
          source: "SEC_EDGAR",
          sourceId: cik,
          fetchedAt: nowIso
        }
      ],
      confidence: 0.96
    });
  }
  return entities;
}
function parseLithuaniaJarBulkJson(payload) {
  const rows = payload._data ?? payload.data ?? [];
  const nowIso = new Date().toISOString();
  const entities = [];
  for (const r of rows) {
    const jaKodas = String(r.ja_kodas ?? r.kodas ?? "").trim();
    const jaPavadinimas = String(r.ja_pavadinimas ?? r.pavadinimas ?? "").trim();
    if (!jaKodas || !jaPavadinimas)
      continue;
    const norm = normalizeCompanyName(jaPavadinimas);
    const statusRaw = String(r.statusas ?? r.teisinis_statusas ?? "").toUpperCase();
    const status = statusRaw.includes("ISREGISTRUOT") || statusRaw.includes("I\u0160REGISTRUOT") ? "DISSOLVED" : statusRaw.includes("LIKVID") ? "LIQUIDATING" : "ACTIVE";
    entities.push({
      id: `LT_JAR:${jaKodas}`,
      canonicalName: jaPavadinimas,
      normalizedName: norm.normalizedName || jaPavadinimas.toUpperCase(),
      jurisdiction: "LT",
      region: "EU",
      primaryIdType: "LT_JAR",
      primaryIdValue: jaKodas,
      lei: null,
      registrationNumber: jaKodas,
      registrationAuthority: "LT_JAR",
      vatNumber: null,
      vatValid: null,
      taxId: null,
      cik: null,
      tickers: [],
      legalForm: String(r.formos_trumpinys ?? norm.detectedLegalForm ?? "UAB"),
      status,
      incorporationDate: r.reg_data ? String(r.reg_data) : null,
      legalAddress: null,
      headquartersAddress: r.adresas ? {
        street: String(r.adresas),
        country: "LT"
      } : null,
      parentLei: null,
      ultimateParentLei: null,
      domains: [],
      aliases: [],
      sources: [
        {
          source: "LT_REGISTRU_CENTRAS",
          sourceId: jaKodas,
          fetchedAt: nowIso
        }
      ],
      confidence: 0.98
    });
  }
  return entities;
}

class SanctionsCsvCollector {
  source;
  entries = [];
  header = null;
  rowCount = 0;
  constructor(source) {
    this.source = source;
  }
  finish() {
    if (!this.rowCount || this.source !== "OFAC_SDN" && !this.entries.length)
      throw new Error("Invalid sanctions CSV records");
    return this.entries;
  }
  accept(row) {
    this.rowCount++;
    if (this.source === "OFAC_SDN") {
      if (row.length !== 12 || !/^\d+$/.test(row[0]) || !row[1] || row[1] === "-0-")
        throw new Error("Invalid OFAC CSV records");
      this.entries.push(...parseOfacRows([row]));
      return;
    }
    if (!this.header) {
      this.header = row.map((value) => value.toLowerCase());
      const required = ["id", "schema", "name", "aliases", "countries", "identifiers", "sanctions"];
      if (new Set(this.header).size !== this.header.length || required.some((name) => !this.header.includes(name)))
        throw new Error("Invalid sanctions CSV headers");
      return;
    }
    if (row.length !== this.header.length || !row[this.header.indexOf("id")] || !row[this.header.indexOf("name")])
      throw new Error("Invalid sanctions CSV records");
    this.entries.push(...parseOpenSanctionsRows([this.header, row], this.source));
  }
}
var OPEN_SANCTIONS_FEEDS = {
  eu_fsf_live: { listSource: "EU_FSF", urlKey: "euFsfSimpleCsvUrl" },
  un_sc_live: { listSource: "UN_SC", urlKey: "unScSimpleCsvUrl" },
  uk_fcdo_live: { listSource: "UK_FCDO", urlKey: "ukFcdoSimpleCsvUrl" }
};

class DatasetIngestWorkerAdapter {
  deps;
  fetchImpl;
  feedUrls;
  secUserAgent;
  activeSync = null;
  constructor(deps) {
    this.deps = deps;
    this.fetchImpl = deps.fetchImpl ?? fetch;
    this.feedUrls = { ...DEFAULT_BULK_FEED_URLS, ...deps.feedUrls };
    this.secUserAgent = deps.secUserAgent ?? "Agentum/1.0 (algimantask@wix.com)";
  }
  async beginFeedAttempt(source) {
    if (!this.deps.sanctionsRepo.beginFeedAttempt || !this.deps.sanctionsRepo.failFeedAttempt)
      throw new Error("Sanctions repository cannot coordinate feed attempts");
    return this.deps.sanctionsRepo.beginFeedAttempt(source);
  }
  async publishSnapshot(source, entries, refreshedAt, attempt) {
    if (!this.deps.sanctionsRepo.replaceFeedSnapshot)
      throw new Error("Sanctions repository cannot publish atomic snapshots");
    await this.deps.sanctionsRepo.replaceFeedSnapshot(source, entries, refreshedAt, attempt);
  }
  async fetchBody(url, format, init) {
    let lastError;
    for (let attempt = 0;attempt < 2; attempt++) {
      const controller = new AbortController;
      let timer;
      try {
        return await Promise.race([
          (async () => {
            const response = await this.fetchImpl(url, { ...init, signal: controller.signal });
            if (!response.ok)
              throw new Error(`HTTP ${response.status}`);
            const bytes = responseBytes(response, this.deps.maxFeedBytes ?? 100 * 1024 * 1024, controller.signal);
            if (format !== "json") {
              const selectedFormat = format === "OFAC_SDN" ? undefined : this.deps.sanctionsFormats?.[format];
              const official = selectedFormat === "official" || selectedFormat !== "opensanctions" && (url === DEFAULT_BULK_FEED_URLS[format === "EU_FSF" ? "euFsfSimpleCsvUrl" : format === "UN_SC" ? "unScSimpleCsvUrl" : "ukFcdoSimpleCsvUrl"] || (format === "EU_FSF" || format === "UN_SC") && new URL(url).pathname.toLowerCase().endsWith(".xml"));
              if (official && (format === "EU_FSF" || format === "UN_SC"))
                return await parseOfficialXml(decodeUtf8(bytes), format);
              if (format !== "OFAC_SDN" && !official && selectedFormat !== "opensanctions" && !new URL(url).pathname.toLowerCase().endsWith(".csv"))
                throw new Error("Unknown sanctions feed format; configure sanctionsFormats");
              const officialUk = official && format === "UK_FCDO";
              const collector = officialUk ? new UkSanctionsCsvCollector : new SanctionsCsvCollector(format);
              for await (const row of csvRows(decodeUtf8(bytes)))
                collector.accept(row);
              return collector.finish();
            }
            const chunks = [];
            for await (const chunk of bytes)
              chunks.push(chunk);
            return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks)));
          })(),
          new Promise((_, reject) => {
            timer = setTimeout(() => {
              controller.abort();
              reject(new Error("Feed request timed out"));
            }, this.deps.requestTimeoutMs ?? (format !== "json" && format !== "OFAC_SDN" && (url === DEFAULT_BULK_FEED_URLS.euFsfSimpleCsvUrl || url === DEFAULT_BULK_FEED_URLS.unScSimpleCsvUrl || url === DEFAULT_BULK_FEED_URLS.ukFcdoSimpleCsvUrl || this.deps.sanctionsFormats?.[format] === "official") ? 120000 : 30000));
          })
        ]);
      } catch (error) {
        controller.abort();
        lastError = error;
        if (attempt === 0)
          await new Promise((resolve) => setTimeout(resolve, 100));
      } finally {
        if (timer)
          clearTimeout(timer);
      }
    }
    throw lastError;
  }
  runSync(sources = ["seed_eu_us", "ofac_eu_sanctions"]) {
    const key = JSON.stringify([...sources].sort());
    if (this.activeSync) {
      if (this.activeSync.key !== key)
        return Promise.reject(new Error("Another sync is already running"));
      return this.activeSync.promise;
    }
    const promise = this.performSync(sources).finally(() => {
      this.activeSync = null;
    });
    this.activeSync = { key, promise };
    return promise;
  }
  async performSync(sources = ["seed_eu_us", "ofac_eu_sanctions"]) {
    const started = Date.now();
    const sourceDetails = {};
    await this.deps.entityRepo.upsertMany(SEED_ENTITIES);
    if (sources.includes("ofac_eu_sanctions") && !sources.includes("all") && await this.deps.sanctionsRepo.count() < 100)
      await this.deps.sanctionsRepo.upsertMany(SEED_SANCTIONS);
    const expandedSources = sources.includes("all") ? [
      "seed_eu_us",
      "ofac_eu_sanctions",
      "ofac_sdn_live",
      "eu_fsf_live",
      "un_sc_live",
      "uk_fcdo_live",
      "sec_edgar_bulk",
      "lt_jar_bulk"
    ] : sources;
    for (const src of expandedSources) {
      if (src === "seed_eu_us") {
        sourceDetails[src] = {
          status: "ok",
          recordsLoaded: SEED_ENTITIES.length
        };
        continue;
      }
      if (src === "ofac_eu_sanctions") {
        sourceDetails[src] = {
          status: "ok",
          recordsLoaded: SEED_SANCTIONS.length
        };
        await this.deps.sanctionsRepo.recordFeedSync?.({
          source: "SEED",
          recordCount: SEED_SANCTIONS.length,
          lastRefreshedAt: new Date().toISOString(),
          status: "DEGRADED"
        });
        continue;
      }
      if (src === "ofac_sdn_live") {
        let attempt;
        try {
          attempt = await this.beginFeedAttempt("OFAC_SDN");
          const parsed = await this.fetchBody(this.feedUrls.ofacSdnCsvUrl, "OFAC_SDN");
          await this.publishSnapshot("OFAC_SDN", parsed, new Date().toISOString(), attempt);
          sourceDetails[src] = { status: "ok", recordsLoaded: parsed.length };
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : String(err);
          if (attempt)
            await this.deps.sanctionsRepo.failFeedAttempt("OFAC_SDN", attempt, errMsg);
          sourceDetails[src] = {
            status: "skipped_or_offline",
            recordsLoaded: 0,
            error: errMsg
          };
        }
        continue;
      }
      const openSanctionsFeed = OPEN_SANCTIONS_FEEDS[src];
      if (openSanctionsFeed) {
        const listSource = openSanctionsFeed.listSource;
        const url = this.feedUrls[openSanctionsFeed.urlKey];
        let attempt;
        try {
          attempt = await this.beginFeedAttempt(listSource);
          const parsed = await this.fetchBody(url, listSource);
          await this.publishSnapshot(listSource, parsed, new Date().toISOString(), attempt);
          sourceDetails[src] = { status: "ok", recordsLoaded: parsed.length };
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : String(err);
          if (attempt)
            await this.deps.sanctionsRepo.failFeedAttempt(listSource, attempt, errMsg);
          sourceDetails[src] = {
            status: "skipped_or_offline",
            recordsLoaded: 0,
            error: errMsg
          };
        }
        continue;
      }
      if (src === "sec_edgar_bulk") {
        try {
          const json = await this.fetchBody(this.feedUrls.secCompanyTickersUrl, "json", {
            headers: {
              "User-Agent": this.secUserAgent,
              Accept: "application/json"
            }
          });
          const payload = json;
          const parsed = parseSecCompanyTickersJson(payload);
          await this.deps.entityRepo.upsertMany(parsed);
          sourceDetails[src] = { status: "ok", recordsLoaded: parsed.length };
        } catch (err) {
          sourceDetails[src] = {
            status: "skipped_or_offline",
            recordsLoaded: 0,
            error: err instanceof Error ? err.message : String(err)
          };
        }
        continue;
      }
      if (src === "lt_jar_bulk") {
        try {
          const json = await this.fetchBody(this.feedUrls.ltJarBulkJsonUrl, "json", {
            headers: { Accept: "application/json" }
          });
          const payload = json;
          const parsed = parseLithuaniaJarBulkJson(payload);
          await this.deps.entityRepo.upsertMany(parsed);
          sourceDetails[src] = { status: "ok", recordsLoaded: parsed.length };
        } catch (err) {
          sourceDetails[src] = {
            status: "skipped_or_offline",
            recordsLoaded: 0,
            error: err instanceof Error ? err.message : String(err)
          };
        }
        continue;
      }
    }
    return {
      synced: expandedSources,
      entitiesIndexed: await this.deps.entityRepo.count(),
      sanctionsIndexed: await this.deps.sanctionsRepo.count(),
      durationMs: Math.max(1, Date.now() - started),
      sourceDetails
    };
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/payments/mpp.adapter.ts
import crypto6 from "crypto";

class MppPaymentAdapter {
  config;
  fetchImpl;
  rail = "MPP";
  constructor(config, fetchImpl = fetch) {
    this.config = config;
    this.fetchImpl = fetchImpl;
  }
  buildChallenge(ctx) {
    const challengeId = crypto6.createHmac("sha256", this.config.mppSecretKey).update(`${ctx.resource}:${ctx.priceUsd}`).digest("hex").slice(0, 24);
    const requestObj = {
      amount: ctx.priceUsd,
      currency: "USD",
      recipient: this.config.tempoRecipientAddress,
      description: ctx.description,
      methods: this.config.stripeSecretKey ? ["tempo", "stripe"] : ["tempo"],
      testnet: this.config.tempoTestnet
    };
    const requestB64 = Buffer.from(JSON.stringify(requestObj)).toString("base64url");
    const headerValue = `Payment id="${challengeId}", realm="agentum", method="tempo", intent="charge", request="${requestB64}"`;
    return {
      headerName: "WWW-Authenticate",
      headerValue,
      payload: {
        id: challengeId,
        ...requestObj
      }
    };
  }
  async verifyBeforeClaim(credential, ctx) {
    if (!this.config.featureStrictPayments || !this.config.stripeSecretKey || !/\bpi_[A-Za-z0-9_]{10,}\b/.test(credential)) {
      return { verified: false, rail: "MPP", outcome: "REJECTED", error: "A live Stripe PaymentIntent is required" };
    }
    return this.verifyAndSettle(credential, ctx);
  }
  async verifyAndSettle(credential, ctx) {
    if (!credential || typeof credential !== "string") {
      return {
        verified: false,
        rail: "MPP",
        error: "Invalid MPP payment credential"
      };
    }
    let cred = credential.trim();
    if (cred.startsWith("Payment ")) {
      cred = cred.slice(8).trim();
    }
    if (cred.toLowerCase().includes("invalid")) {
      return {
        verified: false,
        rail: "MPP",
        error: "Invalid MPP payment credential"
      };
    }
    const piMatch = cred.match(/\b(pi_[A-Za-z0-9_]{10,})\b/);
    const shouldVerifyStripe = Boolean(piMatch && this.config.stripeSecretKey) && (this.config.featureLiveStripeVerify || this.config.featureStrictPayments || cred.includes("verifyStripe=true"));
    if (shouldVerifyStripe && piMatch) {
      try {
        const piId = piMatch[1];
        const res = await this.fetchImpl(`https://api.stripe.com/v1/payment_intents/${encodeURIComponent(piId)}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.config.stripeSecretKey}`
          },
          signal: AbortSignal.timeout(1e4)
        });
        if (!res.ok) {
          return {
            verified: false,
            rail: "MPP",
            error: `Stripe PaymentIntent verification failed (HTTP ${res.status})`
          };
        }
        const piData = await res.json();
        if (piData.status !== "succeeded") {
          return {
            verified: false,
            rail: "MPP",
            error: `Stripe PaymentIntent status is '${piData.status ?? "unknown"}', expected 'succeeded'`
          };
        }
        if ((piData.currency ?? "").toLowerCase() !== "usd") {
          return {
            verified: false,
            rail: "MPP",
            error: `Stripe PaymentIntent currency is '${piData.currency ?? "unknown"}', expected 'usd'`
          };
        }
        const requiredCents = Math.round(parseFloat(ctx.priceUsd) * 100);
        const minCents = Math.max(1, requiredCents);
        if (!Number.isSafeInteger(piData.amount) || typeof piData.amount !== "number" || piData.amount < 0) {
          return { verified: false, rail: "MPP", error: "Stripe PaymentIntent amount is missing or invalid" };
        }
        if (piData.amount < minCents) {
          return {
            verified: false,
            rail: "MPP",
            error: `Stripe PaymentIntent amount ${piData.amount} cents is less than required ${minCents} cents`
          };
        }
        const expectedResource = new URL(ctx.resource, this.config.publicBaseUrl).pathname;
        if (piData.metadata?.agentum_resource !== expectedResource) {
          return { verified: false, rail: "MPP", error: "Stripe PaymentIntent is not bound to this Agentum resource" };
        }
        const receipt = {
          status: "succeeded",
          id: piData.id ?? piId,
          rail: "MPP_STRIPE_LIVE",
          amountUsd: ctx.priceUsd,
          stripeAmountCents: piData.amount
        };
        return {
          verified: true,
          rail: "MPP",
          payer: `stripe:${piData.id ?? piId}`,
          settlementReference: piId,
          receiptHeaderName: "Payment-Receipt",
          receiptHeaderValue: Buffer.from(JSON.stringify(receipt)).toString("base64url")
        };
      } catch (err) {
        return {
          verified: false,
          rail: "MPP",
          error: err instanceof Error ? err.message : "Stripe verification network error"
        };
      }
    }
    if (this.config.featureStrictPayments) {
      return {
        verified: false,
        rail: "MPP",
        error: "Strict payment mode requires a live verified Stripe PaymentIntent (pi_...) or signed Tempo proof"
      };
    }
    let hasProof = false;
    if (cred.includes("proof=") || cred.includes("token=") || cred.includes("spt_")) {
      hasProof = true;
    } else {
      try {
        const parsed = JSON.parse(cred);
        if (parsed && typeof parsed === "object") {
          if (parsed.proof || parsed.token || parsed.spt || parsed.signature) {
            hasProof = true;
          }
        }
      } catch {
        try {
          const decoded = Buffer.from(cred, "base64url").toString("utf-8");
          const parsed = JSON.parse(decoded);
          if (parsed && typeof parsed === "object") {
            if (parsed.proof || parsed.token || parsed.spt || parsed.signature) {
              hasProof = true;
            }
          }
        } catch {}
      }
    }
    if (hasProof) {
      const receipt = {
        status: "succeeded",
        id: `rcpt_${Date.now()}`,
        amountUsd: ctx.priceUsd
      };
      return {
        verified: true,
        rail: "MPP",
        payer: "mpp-verified-agent",
        receiptHeaderName: "Payment-Receipt",
        receiptHeaderValue: Buffer.from(JSON.stringify(receipt)).toString("base64url")
      };
    }
    return {
      verified: false,
      rail: "MPP",
      error: "Invalid MPP payment credential"
    };
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/payments/x402.adapter.ts
class X402PaymentAdapter {
  config;
  fetchImpl;
  rail = "X402";
  constructor(config, fetchImpl = fetch) {
    this.config = config;
    this.fetchImpl = fetchImpl;
  }
  buildChallenge(ctx) {
    const atomicUnits = Math.round(Number.parseFloat(ctx.priceUsd) * 1e6).toString();
    const payload = {
      x402Version: 2,
      error: "Payment Required",
      resource: {
        url: ctx.resource,
        description: ctx.description,
        mimeType: "application/json"
      },
      accepts: [
        {
          scheme: "exact",
          network: this.config.x402Network,
          maxAmountRequired: atomicUnits,
          amount: atomicUnits,
          asset: this.config.x402Network === "eip155:8453" ? "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" : "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
          payTo: this.config.x402PayToEvm,
          maxTimeoutSeconds: 300,
          extra: {
            name: this.config.x402Network === "eip155:8453" ? "USD Coin" : "USDC",
            version: "2",
            priceUsd: ctx.priceUsd
          }
        }
      ]
    };
    const headerValue = Buffer.from(JSON.stringify(payload)).toString("base64");
    return {
      headerName: "PAYMENT-REQUIRED",
      headerValue,
      payload
    };
  }
  async verifyBeforeClaim(credential, ctx) {
    let decoded;
    try {
      const input = credential.trim();
      decoded = JSON.parse(input.startsWith("{") ? input : Buffer.from(input, "base64").toString("utf8"));
    } catch {
      return { verified: false, rail: "X402", outcome: "REJECTED", error: "Invalid x402 payload" };
    }
    if (!decoded || typeof decoded !== "object" || !this.config.x402FacilitatorUrl)
      return { verified: false, rail: "X402", outcome: "REJECTED", error: "Live facilitator verification is required" };
    const requirements = this.buildChallenge(ctx).payload.accepts[0];
    try {
      const response = await this.fetchImpl(`${this.config.x402FacilitatorUrl}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x402Version: decoded.x402Version ?? 2, paymentPayload: decoded, paymentRequirements: requirements }),
        signal: AbortSignal.timeout(1e4)
      });
      if (!response.ok)
        return { verified: false, rail: "X402", outcome: "UNCERTAIN", error: "Facilitator verification unavailable" };
      const data = await response.json();
      const valid = data.isValid ?? data.valid ?? data.verified;
      if (valid !== true)
        return { verified: false, rail: "X402", outcome: valid === false ? "REJECTED" : "UNCERTAIN", error: "Facilitator verification rejected or unconfirmed" };
      return { verified: true, rail: "X402" };
    } catch {
      return { verified: false, rail: "X402", outcome: "UNCERTAIN", error: "Facilitator verification unavailable" };
    }
  }
  async prepareForClaim(credential, ctx) {
    const context = { ...ctx };
    const authentication = await this.verifyBeforeClaim(credential, context);
    const decoded = authentication.verified ? JSON.parse(credential.trim().startsWith("{") ? credential.trim() : Buffer.from(credential.trim(), "base64").toString("utf8")) : null;
    const requirements = this.buildChallenge(context).payload.accepts[0];
    const body = JSON.stringify({ x402Version: decoded?.x402Version ?? 2, paymentPayload: decoded, paymentRequirements: requirements });
    return { authentication, settle: async () => {
      if (!authentication.verified)
        return authentication;
      try {
        const response = await this.fetchImpl(`${this.config.x402FacilitatorUrl}/settle`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          signal: AbortSignal.timeout(1e4)
        });
        if (!response.ok)
          return { verified: false, rail: "X402", outcome: "UNCERTAIN", error: "Facilitator settlement failed" };
        const settlement = await response.json();
        const transaction = settlement?.transaction ?? settlement?.txHash ?? settlement?.settlementId;
        if (settlement?.success !== true || typeof transaction !== "string" || !transaction || settlement.network !== undefined && settlement.network !== this.config.x402Network)
          return { verified: false, rail: "X402", outcome: "UNCERTAIN", error: "Facilitator settlement rejected or unconfirmed" };
        const payer = decoded.payer ?? decoded.payload?.payer ?? decoded.payload?.authorization?.from ?? "0xAgentPayer";
        const receipt = { ...settlement, transaction, success: true, rail: "X402", network: this.config.x402Network, payer, settledAt: new Date().toISOString() };
        return { verified: true, rail: "X402", payer, settlementReference: transaction, receiptHeaderName: "PAYMENT-RESPONSE", receiptHeaderValue: Buffer.from(JSON.stringify(receipt)).toString("base64") };
      } catch {
        return { verified: false, rail: "X402", outcome: "UNCERTAIN", error: "Facilitator settlement unavailable" };
      }
    } };
  }
  async verifyAndSettle(credential, ctx) {
    if (!credential || typeof credential !== "string") {
      return { verified: false, rail: "X402", error: "Invalid x402 payload" };
    }
    const trimmed = credential.trim();
    let decoded = null;
    if (trimmed.startsWith("{")) {
      try {
        decoded = JSON.parse(trimmed);
      } catch {}
    } else if (trimmed.startsWith("0x") && trimmed.length >= 10) {
      decoded = { signature: trimmed };
    }
    if (!decoded) {
      try {
        const decodedStr = Buffer.from(trimmed, "base64").toString("utf-8");
        decoded = JSON.parse(decodedStr);
      } catch {
        try {
          decoded = JSON.parse(trimmed);
        } catch {
          return { verified: false, rail: "X402", error: "Invalid x402 payload" };
        }
      }
    }
    if (!decoded || typeof decoded !== "object") {
      return { verified: false, rail: "X402", error: "Invalid x402 payload" };
    }
    const sig = typeof decoded.signature === "string" ? decoded.signature : typeof decoded.payload?.signature === "string" ? decoded.payload.signature : undefined;
    const hasCandidate = Boolean(sig || decoded.x402Version);
    if (!hasCandidate) {
      return { verified: false, rail: "X402", error: "Missing valid x402 signature" };
    }
    const shouldCallFacilitator = Boolean(this.config.x402FacilitatorUrl) && (this.config.featureStrictPayments === true || decoded.useFacilitator === true);
    let settlement;
    if (shouldCallFacilitator) {
      const prepared = await this.prepareForClaim(credential, ctx);
      return prepared.authentication.verified ? prepared.settle() : prepared.authentication;
    } else if (this.config.featureStrictPayments) {
      return {
        verified: false,
        rail: "X402",
        error: "Strict payment mode requires facilitator verification"
      };
    } else {
      const isTestMode = decoded.testMode === true;
      const isExactWithSig = decoded.scheme === "exact" && typeof sig === "string" && sig.length > 0;
      const isValidHexSig = typeof sig === "string" && sig.startsWith("0x") && sig.length >= 10;
      if (!isTestMode && !isExactWithSig && !isValidHexSig) {
        return {
          verified: false,
          rail: "X402",
          error: "Missing valid x402 signature"
        };
      }
    }
    const payer = decoded.payer ?? decoded.payload?.payer ?? decoded.payload?.authorization?.from ?? "0xAgentPayer";
    const receipt = {
      ...settlement,
      success: true,
      rail: "X402",
      network: this.config.x402Network,
      payer,
      settledAt: new Date().toISOString()
    };
    return {
      verified: true,
      rail: "X402",
      payer,
      settlementReference: typeof settlement?.transaction === "string" ? settlement.transaction : undefined,
      receiptHeaderName: "PAYMENT-RESPONSE",
      receiptHeaderValue: Buffer.from(JSON.stringify(receipt)).toString("base64")
    };
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/persistence/quota-cache.adapter.ts
class InMemoryQuotaAndCacheAdapter {
  cache = new Map;
  quotas = new Map;
  async getCache(key) {
    const entry = this.cache.get(key);
    if (!entry)
      return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return JSON.parse(entry.serialized);
  }
  async setCache(key, value, ttlSeconds) {
    this.cache.set(key, {
      serialized: JSON.stringify(value),
      expiresAt: Date.now() + ttlSeconds * 1000
    });
  }
  async incrementDailyQuota(fingerprint, dateKey) {
    const key = `agentum:free:${dateKey}:${fingerprint}`;
    const next = (this.quotas.get(key) ?? 0) + 1;
    this.quotas.set(key, next);
    return next;
  }
  async claimOnce(key, ttlSeconds) {
    const existing = this.cache.get(key);
    if (existing && Date.now() <= existing.expiresAt)
      return false;
    this.cache.set(key, { serialized: "true", expiresAt: Date.now() + ttlSeconds * 1000 });
    return true;
  }
  async getDailyQuota(fingerprint, dateKey) {
    const key = `agentum:free:${dateKey}:${fingerprint}`;
    return this.quotas.get(key) ?? 0;
  }
}

class RedisQuotaAndCacheAdapter {
  redisUrl;
  fallback = new InMemoryQuotaAndCacheAdapter;
  redisClient = null;
  redisHealthy = false;
  constructor(redisUrl) {
    this.redisUrl = redisUrl;
    if (redisUrl) {
      try {
        this.redisClient = new Bun.RedisClient(redisUrl);
        this.redisHealthy = true;
      } catch {
        this.redisClient = null;
        this.redisHealthy = false;
      }
    }
  }
  async claimOnce(key, ttlSeconds) {
    if (!this.redisClient || !this.redisHealthy)
      throw new Error("Payment replay store unavailable");
    let timer;
    try {
      const result = await Promise.race([
        this.redisClient.send("SET", [key, "true", "NX", "EX", String(ttlSeconds)]),
        new Promise((_, reject) => {
          timer = setTimeout(() => {
            this.redisHealthy = false;
            this.redisClient?.close();
            reject(new Error("Payment replay store timed out"));
          }, 2000);
        })
      ]);
      return result === "OK";
    } finally {
      clearTimeout(timer);
    }
  }
  async getCache(key) {
    if (this.redisClient && this.redisHealthy) {
      try {
        const raw = await this.redisClient.get(key);
        if (raw)
          return JSON.parse(raw);
      } catch {
        this.redisHealthy = false;
      }
    }
    return this.fallback.getCache(key);
  }
  async setCache(key, value, ttlSeconds) {
    await this.fallback.setCache(key, value, ttlSeconds);
    if (this.redisClient && this.redisHealthy) {
      try {
        await this.redisClient.set(key, JSON.stringify(value), "EX", ttlSeconds);
      } catch {
        this.redisHealthy = false;
      }
    }
  }
  async incrementDailyQuota(fingerprint, dateKey) {
    const key = `agentum:free:${dateKey}:${fingerprint}`;
    if (this.redisClient && this.redisHealthy) {
      try {
        const val = await this.redisClient.incr(key);
        if (val === 1) {
          await this.redisClient.expire(key, 86400);
        }
        return Number(val);
      } catch {
        this.redisHealthy = false;
      }
    }
    return this.fallback.incrementDailyQuota(fingerprint, dateKey);
  }
  async getDailyQuota(fingerprint, dateKey) {
    const key = `agentum:free:${dateKey}:${fingerprint}`;
    if (this.redisClient && this.redisHealthy) {
      try {
        const val = await this.redisClient.get(key);
        return val ? Number.parseInt(val, 10) : 0;
      } catch {
        this.redisHealthy = false;
      }
    }
    return this.fallback.getDailyQuota(fingerprint, dateKey);
  }
}
function createQuotaAndCacheAdapter(redisUrl) {
  if (!redisUrl) {
    return new InMemoryQuotaAndCacheAdapter;
  }
  return new RedisQuotaAndCacheAdapter(redisUrl);
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/eu-vies.adapter.ts
function parseEuVatNumber(raw) {
  if (!raw || typeof raw !== "string") {
    return null;
  }
  const clean = raw.trim().toUpperCase().replace(/[\s\-. ]/g, "");
  const match = clean.match(/^(AT|BE|BG|CY|CZ|DE|DK|EE|EL|ES|FI|FR|HR|HU|IE|IT|LT|LU|LV|MT|NL|PL|PT|RO|SE|SI|SK)([0-9A-Z]{8,12})$/);
  if (!match) {
    return null;
  }
  return {
    countryCode: match[1],
    vatNumber: match[2],
    fullVat: `${match[1]}${match[2]}`
  };
}

class EuViesVatAdapter {
  fetchImpl;
  defaultTimeoutMs;
  constructor(fetchImpl = fetch, defaultTimeoutMs = 4000) {
    this.fetchImpl = fetchImpl;
    this.defaultTimeoutMs = defaultTimeoutMs;
  }
  async verifyVat(rawVat, timeoutMs) {
    const checkedAt = new Date().toISOString();
    const parsed = parseEuVatNumber(rawVat);
    if (!parsed) {
      return {
        valid: false,
        countryCode: "UNKNOWN",
        vatNumber: rawVat,
        fullVat: rawVat,
        registeredName: null,
        registeredAddress: null,
        checkedAt,
        source: "SYNTAX_ONLY",
        error: "Invalid EU VAT format"
      };
    }
    const url = `https://ec.europa.eu/taxation_customs/vies/rest-api/ms/${parsed.countryCode}/vat/${parsed.vatNumber}`;
    try {
      const signal = AbortSignal.timeout(timeoutMs ?? this.defaultTimeoutMs);
      const res = await this.fetchImpl(url, {
        signal,
        headers: {
          Accept: "application/json"
        }
      });
      if (!res.ok) {
        return {
          valid: false,
          countryCode: parsed.countryCode,
          vatNumber: parsed.vatNumber,
          fullVat: parsed.fullVat,
          registeredName: null,
          registeredAddress: null,
          checkedAt,
          source: "SYNTAX_ONLY",
          error: "VIES upstream unreachable; syntax validated but unconfirmed"
        };
      }
      const data = await res.json();
      const valid = Boolean(data?.isValid ?? data?.valid ?? false);
      const name = typeof data?.name === "string" && data.name.trim() !== "---" && data.name.trim() !== "" ? data.name.trim() : null;
      const address = typeof data?.address === "string" && data.address.trim() !== "---" && data.address.trim() !== "" ? data.address.trim() : null;
      return {
        valid,
        countryCode: parsed.countryCode,
        vatNumber: parsed.vatNumber,
        fullVat: parsed.fullVat,
        registeredName: name,
        registeredAddress: address,
        checkedAt,
        source: "EU_VIES"
      };
    } catch {
      return {
        valid: false,
        countryCode: parsed.countryCode,
        vatNumber: parsed.vatNumber,
        fullVat: parsed.fullVat,
        registeredName: null,
        registeredAddress: null,
        checkedAt,
        source: "SYNTAX_ONLY",
        error: "VIES upstream unreachable; syntax validated but unconfirmed"
      };
    }
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/gleif.adapter.ts
var EU_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "EL",
  "GR",
  "ES",
  "FI",
  "FR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK"
]);
function deriveRegion(country) {
  const c = country.toUpperCase();
  if (c === "US")
    return "US";
  if (EU_COUNTRIES.has(c))
    return "EU";
  return "OTHER";
}

class GleifUpstreamAdapter {
  fetchImpl;
  sourceName = "GLEIF";
  constructor(fetchImpl = fetch) {
    this.fetchImpl = fetchImpl;
  }
  supports(_query, _jurisdiction) {
    return true;
  }
  async search(query, opts) {
    let url;
    if (query.type === "LEI") {
      url = `https://api.gleif.org/api/v1/lei-records/${encodeURIComponent(query.cleanedValue)}`;
    } else {
      url = `https://api.gleif.org/api/v1/lei-records?filter[entity.legalName]=${encodeURIComponent(query.normalizedName || query.cleanedValue)}&page[size]=5`;
      if (opts?.jurisdiction && /^[A-Za-z]{2}$/.test(opts.jurisdiction)) {
        url += `&filter[entity.legalAddress.country]=${encodeURIComponent(opts.jurisdiction.toUpperCase())}`;
      }
    }
    try {
      const signal = AbortSignal.timeout(opts?.timeoutMs ?? 2200);
      const res = await this.fetchImpl(url, {
        signal,
        headers: {
          Accept: "application/vnd.api+json, application/json"
        }
      });
      if (!res.ok) {
        return [];
      }
      const json = await res.json();
      const rawItems = Array.isArray(json?.data) ? json.data : json?.data ? [json.data] : [];
      return rawItems.map(mapGleifItem);
    } catch {
      return [];
    }
  }
}
function mapGleifItem(item) {
  const lei = String(item.attributes?.lei || item.id || "");
  const legalName = item.attributes?.entity?.legalName?.name || item.id || "UNKNOWN";
  const { normalizedName, detectedLegalForm } = normalizeCompanyName(legalName);
  const legalAddr = item.attributes?.entity?.legalAddress;
  const hqAddr = item.attributes?.entity?.headquartersAddress;
  const rawCountry = legalAddr?.country || (item.attributes?.entity?.jurisdiction ? item.attributes.entity.jurisdiction.split("-")[0] : "OTHER");
  const country = (rawCountry || "OTHER").toUpperCase();
  const region = deriveRegion(country);
  const aliases = [];
  if (Array.isArray(item.attributes?.entity?.otherNames)) {
    for (const on of item.attributes.entity.otherNames) {
      if (typeof on === "string")
        aliases.push(on);
      else if (on?.name)
        aliases.push(on.name);
    }
  }
  if (Array.isArray(item.attributes?.entity?.transliteratedOtherNames)) {
    for (const ton of item.attributes.entity.transliteratedOtherNames) {
      if (typeof ton === "string")
        aliases.push(ton);
      else if (ton?.name)
        aliases.push(ton.name);
    }
  }
  const legalAddress = legalAddr ? {
    street: Array.isArray(legalAddr.addressLines) ? legalAddr.addressLines.join(", ") : legalAddr.addressLines || undefined,
    city: legalAddr.city || undefined,
    postalCode: legalAddr.postalCode || undefined,
    region: legalAddr.region || undefined,
    country: legalAddr.country || country
  } : null;
  const headquartersAddress = hqAddr ? {
    street: Array.isArray(hqAddr.addressLines) ? hqAddr.addressLines.join(", ") : hqAddr.addressLines || undefined,
    city: hqAddr.city || undefined,
    postalCode: hqAddr.postalCode || undefined,
    region: hqAddr.region || undefined,
    country: hqAddr.country || country
  } : null;
  let status = "ACTIVE";
  const rawStatus = (item.attributes?.entity?.status || "").toUpperCase();
  if (rawStatus === "INACTIVE")
    status = "INACTIVE";
  else if (rawStatus === "RETIRED" || rawStatus === "DISSOLVED")
    status = "DISSOLVED";
  return {
    id: `LEI:${lei}`,
    canonicalName: legalName,
    normalizedName,
    jurisdiction: country,
    region,
    primaryIdType: "LEI",
    primaryIdValue: lei,
    lei,
    registrationNumber: item.attributes?.entity?.registeredAs ?? null,
    registrationAuthority: item.attributes?.entity?.registeredAt?.id ?? null,
    vatNumber: null,
    vatValid: null,
    taxId: null,
    cik: null,
    tickers: [],
    legalForm: detectedLegalForm || item.attributes?.entity?.legalForm?.id || null,
    status,
    incorporationDate: item.attributes?.registration?.initialRegistrationDate ?? null,
    legalAddress,
    headquartersAddress,
    parentLei: item.relationships?.["direct-parent"]?.data?.id ?? null,
    ultimateParentLei: item.relationships?.["ultimate-parent"]?.data?.id ?? null,
    domains: [],
    aliases,
    sources: [
      {
        source: "GLEIF",
        sourceId: lei,
        fetchedAt: new Date().toISOString()
      }
    ],
    confidence: 0.98
  };
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/lithuania-jar.adapter.ts
class LithuaniaJarUpstreamAdapter {
  fetchImpl;
  sourceName = "LT_JAR";
  constructor(fetchImpl = fetch) {
    this.fetchImpl = fetchImpl;
  }
  supports(query, jurisdiction) {
    if (query.type === "LT_JAR")
      return true;
    if (query.inferredCountry === "LT")
      return true;
    if (!jurisdiction)
      return true;
    const jur = jurisdiction.toUpperCase();
    return jur === "LT" || jur === "EU";
  }
  async search(query, opts) {
    const baseUrl = "https://get.data.gov.lt/datasets/gov/rc/jar/iregistruoti/JuridinisAsmuo?:format=json";
    let url = baseUrl;
    if (query.type === "LT_JAR" || /^\d+$/.test(query.cleanedValue)) {
      url += `&ja_kodas=${encodeURIComponent(query.cleanedValue)}`;
    } else {
      url += `&ja_pavadinimas=${encodeURIComponent(query.normalizedName || query.cleanedValue)}`;
    }
    url += "&:limit=5";
    try {
      const signal = AbortSignal.timeout(opts?.timeoutMs ?? 2500);
      const res = await this.fetchImpl(url, {
        signal,
        headers: {
          Accept: "application/json"
        }
      });
      if (!res.ok) {
        return [];
      }
      const json = await res.json();
      const rows = Array.isArray(json?._data) ? json._data : [];
      const records = [];
      for (const row of rows) {
        const code = String(row.ja_kodas ?? "");
        if (!code)
          continue;
        const name = row.ja_pavadinimas || "UNKNOWN";
        const { normalizedName, detectedLegalForm } = normalizeCompanyName(name);
        const legalAddress = row.pilnas_adresas ? {
          street: row.pilnas_adresas,
          country: "LT"
        } : null;
        records.push({
          id: `LT_JAR:${code}`,
          canonicalName: name,
          normalizedName,
          jurisdiction: "LT",
          region: "EU",
          primaryIdType: "LT_JAR",
          primaryIdValue: code,
          lei: null,
          registrationNumber: code,
          registrationAuthority: "RA000432",
          vatNumber: null,
          vatValid: null,
          taxId: null,
          cik: null,
          tickers: [],
          legalForm: detectedLegalForm,
          status: "ACTIVE",
          incorporationDate: row.reg_data ?? null,
          legalAddress,
          headquartersAddress: null,
          parentLei: null,
          ultimateParentLei: null,
          domains: [],
          aliases: [],
          sources: [
            {
              source: "LT_JAR",
              sourceId: code,
              fetchedAt: new Date().toISOString()
            }
          ],
          confidence: query.type === "LT_JAR" ? 0.99 : 0.9
        });
      }
      return records;
    } catch {
      return [];
    }
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/sec-edgar.adapter.ts
class SecEdgarUpstreamAdapter {
  userAgent;
  fetchImpl;
  sourceName = "SEC_EDGAR";
  constructor(userAgent = "Agentum/1.0 (algimantask@wix.com)", fetchImpl = fetch) {
    this.userAgent = userAgent;
    this.fetchImpl = fetchImpl;
  }
  supports(query, jurisdiction) {
    if (query.type === "US_CIK" || query.type === "US_EIN")
      return true;
    if (!jurisdiction)
      return true;
    return jurisdiction.toUpperCase() === "US";
  }
  async search(query, opts) {
    const headers = {
      "User-Agent": this.userAgent,
      Accept: "application/json"
    };
    try {
      const signal = AbortSignal.timeout(opts?.timeoutMs ?? 2500);
      if (query.type === "US_CIK") {
        const cik = query.cleanedValue.padStart(10, "0");
        const url = `https://data.sec.gov/submissions/CIK${cik}.json`;
        const res = await this.fetchImpl(url, { signal, headers });
        if (!res.ok) {
          return [];
        }
        const data = await res.json();
        const name = data.name || "UNKNOWN";
        const { normalizedName, detectedLegalForm } = normalizeCompanyName(name);
        const rawEin = data.ein ? String(data.ein).replace(/\D/g, "") : null;
        const ein = rawEin && rawEin.length === 9 ? `${rawEin.slice(0, 2)}-${rawEin.slice(2)}` : rawEin;
        const bAddr = data.addresses?.business || data.addresses?.mailing;
        const legalAddress = bAddr ? {
          street: [bAddr.street1, bAddr.street2].filter(Boolean).join(", ") || undefined,
          city: bAddr.city || undefined,
          region: bAddr.stateOrCountry || undefined,
          postalCode: bAddr.zipCode || undefined,
          country: "US"
        } : null;
        const aliases = [];
        if (Array.isArray(data.formerNames)) {
          for (const fn of data.formerNames) {
            if (fn?.name && typeof fn.name === "string") {
              aliases.push(fn.name);
            }
          }
        }
        return [
          {
            id: `US_CIK:${cik}`,
            canonicalName: name,
            normalizedName,
            jurisdiction: "US",
            region: "US",
            primaryIdType: "US_CIK",
            primaryIdValue: cik,
            lei: null,
            registrationNumber: null,
            registrationAuthority: "RA000598",
            vatNumber: null,
            vatValid: null,
            taxId: ein,
            cik,
            tickers: Array.isArray(data.tickers) ? data.tickers : [],
            legalForm: detectedLegalForm || "INC",
            status: "ACTIVE",
            incorporationDate: null,
            legalAddress,
            headquartersAddress: null,
            parentLei: null,
            ultimateParentLei: null,
            domains: [],
            aliases,
            sources: [
              {
                source: "SEC_EDGAR",
                sourceId: cik,
                fetchedAt: new Date().toISOString()
              }
            ],
            confidence: 0.99
          }
        ];
      }
      const url = "https://www.sec.gov/files/company_tickers.json";
      const res = await this.fetchImpl(url, { signal, headers });
      if (!res.ok) {
        return [];
      }
      const json = await res.json();
      const entries = Object.values(json);
      const scored = [];
      const queryClean = query.cleanedValue.toUpperCase();
      const queryNorm = query.normalizedName || queryClean;
      for (const entry of entries) {
        const isTickerMatch = entry.ticker?.toUpperCase() === queryClean;
        const sim = trigramSimilarity(queryNorm, entry.title);
        const score = isTickerMatch ? 1 : sim;
        if (score >= 0.35) {
          scored.push({ item: entry, score });
        }
      }
      scored.sort((a, b) => b.score - a.score);
      const limit = 5;
      return scored.slice(0, limit).map(({ item, score }) => {
        const cikStr = String(item.cik_str).padStart(10, "0");
        const { normalizedName, detectedLegalForm } = normalizeCompanyName(item.title);
        return {
          id: `US_CIK:${cikStr}`,
          canonicalName: item.title,
          normalizedName,
          jurisdiction: "US",
          region: "US",
          primaryIdType: "US_CIK",
          primaryIdValue: cikStr,
          lei: null,
          registrationNumber: null,
          registrationAuthority: "RA000598",
          vatNumber: null,
          vatValid: null,
          taxId: null,
          cik: cikStr,
          tickers: item.ticker ? [item.ticker] : [],
          legalForm: detectedLegalForm || "INC",
          status: "ACTIVE",
          incorporationDate: null,
          legalAddress: null,
          headquartersAddress: null,
          parentLei: null,
          ultimateParentLei: null,
          domains: [],
          aliases: [],
          sources: [
            {
              source: "SEC_EDGAR",
              sourceId: cikStr,
              fetchedAt: new Date().toISOString()
            }
          ],
          confidence: Math.round(score * 1e4) / 1e4
        };
      });
    } catch {
      return [];
    }
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/uk-companies-house.adapter.ts
class UkCompaniesHouseAdapter {
  sourceName = "UK_COMPANIES_HOUSE";
  apiKey;
  fetchImpl;
  constructor(opts = {}) {
    this.apiKey = opts.apiKey ?? process.env.COMPANIES_HOUSE_API_KEY;
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }
  supports(query, jurisdiction) {
    if (!this.apiKey?.trim())
      return false;
    if (query.type === "UK_CRN")
      return true;
    if (query.inferredCountry === "GB" || query.inferredCountry === "UK")
      return true;
    if (jurisdiction) {
      const jur = jurisdiction.toUpperCase();
      return jur === "GB" || jur === "UK";
    }
    return false;
  }
  async search(query, opts) {
    if (!this.apiKey?.trim())
      return [];
    const isCrn = query.type === "UK_CRN" || (/^[A-Z]{2}\d{6}$/i.test(query.cleanedValue) || /^\d{7,8}$/.test(query.cleanedValue) && (query.inferredCountry === "GB" || opts?.jurisdiction?.toUpperCase() === "GB"));
    const timeout = opts?.timeoutMs ?? 2200;
    const signal = AbortSignal.timeout(timeout);
    const headers = this.headers();
    try {
      if (isCrn) {
        const crn = /^\d{1,8}$/.test(query.cleanedValue) ? query.cleanedValue.padStart(8, "0") : query.cleanedValue.toUpperCase();
        const url = `https://api.company-information.service.gov.uk/company/${encodeURIComponent(crn)}`;
        const res = await this.fetchImpl(url, { signal, headers });
        if (!res.ok) {
          return [];
        }
        const data = await res.json();
        return [this.mapSingleCompany(data)];
      }
      const q = encodeURIComponent(query.normalizedName || query.cleanedValue);
      const url = `https://api.company-information.service.gov.uk/search/companies?q=${q}&items_per_page=5`;
      const res = await this.fetchImpl(url, { signal, headers });
      if (!res.ok) {
        return [];
      }
      const data = await res.json();
      const items = Array.isArray(data?.items) ? data.items : [];
      return items.map((item) => this.mapSearchItem(item));
    } catch {
      return [];
    }
  }
  supportsEntity(entity) {
    if (!this.apiKey?.trim())
      return false;
    const jur = entity.jurisdiction.toUpperCase();
    return (jur === "GB" || jur === "UK") && Boolean(this.companyNumberOf(entity));
  }
  async listBeneficialOwners(entity, timeoutMs = 2200) {
    const crn = this.companyNumberOf(entity);
    if (!crn)
      throw new Error("Entity has no UK company number");
    if (!this.apiKey)
      throw new Error("COMPANIES_HOUSE_API_KEY is not configured");
    const url = `https://api.company-information.service.gov.uk/company/${encodeURIComponent(crn)}/persons-with-significant-control?items_per_page=100`;
    const res = await this.fetchImpl(url, { signal: AbortSignal.timeout(timeoutMs), headers: this.headers() });
    if (res.status === 404)
      return [];
    if (!res.ok)
      throw new Error(`Companies House PSC lookup failed: HTTP ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data?.items) ? data.items : [];
    return items.filter((item) => item && !item.ceased_on && item.ceased !== true).map((item) => this.mapPsc(item));
  }
  companyNumberOf(entity) {
    const raw = (entity.registrationNumber ?? (entity.id?.startsWith("UK_CRN:") ? entity.primaryIdValue : "")).trim().toUpperCase();
    if (/^\d{1,8}$/.test(raw))
      return raw.padStart(8, "0");
    if (/^[A-Z]{2}\d{6}$/.test(raw))
      return raw;
    return null;
  }
  headers() {
    const headers = { Accept: "application/json" };
    if (this.apiKey)
      headers.Authorization = `Basic ${Buffer.from(`${this.apiKey}:`).toString("base64")}`;
    return headers;
  }
  mapPsc(item) {
    const kindRaw = String(item.kind ?? "");
    const kind = kindRaw.startsWith("individual-") ? "INDIVIDUAL" : kindRaw.startsWith("corporate-entity-") ? "CORPORATE" : kindRaw.startsWith("legal-person-") ? "LEGAL_PERSON" : kindRaw.startsWith("super-secure-") ? "PROTECTED" : "UNKNOWN";
    const dob = item.date_of_birth;
    const ident = item.identification ?? {};
    const str = (v) => typeof v === "string" && v.trim() ? v.trim() : undefined;
    return {
      name: str(item.name) ?? (kind === "PROTECTED" ? "Protected PSC (details suppressed)" : "UNKNOWN"),
      kind,
      naturesOfControl: Array.isArray(item.natures_of_control) ? item.natures_of_control.map(String) : [],
      notifiedOn: str(item.notified_on),
      ceasedOn: str(item.ceased_on),
      nationality: str(item.nationality),
      countryOfResidence: str(item.country_of_residence),
      birthYearMonth: dob?.year && dob?.month ? `${dob.year}-${String(dob.month).padStart(2, "0")}` : undefined,
      registrationNumber: str(ident.registration_number),
      countryRegistered: str(ident.country_registered),
      legalForm: str(ident.legal_form),
      source: this.sourceName
    };
  }
  mapStatus(statusRaw) {
    const s = String(statusRaw ?? "").toLowerCase();
    if (s === "active")
      return "ACTIVE";
    if (["dissolved", "converted-closed", "closed", "liquidation", "receivership", "administration"].includes(s)) {
      return "INACTIVE";
    }
    return "UNKNOWN";
  }
  mapSingleCompany(data) {
    const crn = String(data.company_number ?? "");
    const rawName = String(data.company_name ?? "UNKNOWN");
    const { normalizedName, detectedLegalForm } = normalizeCompanyName(rawName);
    let legalAddress = null;
    if (data.registered_office_address) {
      const addr = data.registered_office_address;
      const streetParts = [addr.address_line_1, addr.address_line_2, addr.care_of].filter(Boolean);
      legalAddress = {
        street: streetParts.join(", ") || undefined,
        city: addr.locality || undefined,
        postalCode: addr.postal_code || undefined,
        region: addr.region || undefined,
        country: "GB"
      };
    }
    return {
      id: `UK_CRN:${crn}`,
      canonicalName: rawName,
      normalizedName,
      jurisdiction: "GB",
      region: "OTHER",
      primaryIdType: "NATIONAL_REG",
      primaryIdValue: crn,
      lei: null,
      registrationNumber: crn,
      registrationAuthority: "UK Companies House",
      vatNumber: null,
      vatValid: null,
      taxId: null,
      cik: null,
      tickers: [],
      legalForm: data.type ? String(data.type).toUpperCase() : detectedLegalForm,
      status: this.mapStatus(data.company_status),
      incorporationDate: data.date_of_creation || null,
      legalAddress,
      headquartersAddress: null,
      parentLei: null,
      ultimateParentLei: null,
      domains: [],
      aliases: [],
      sources: [
        {
          source: this.sourceName,
          sourceId: crn,
          fetchedAt: new Date().toISOString()
        }
      ],
      confidence: 0.98
    };
  }
  mapSearchItem(item) {
    const crn = String(item.company_number ?? "");
    const rawName = String(item.title ?? "UNKNOWN");
    const { normalizedName, detectedLegalForm } = normalizeCompanyName(rawName);
    let legalAddress = null;
    if (item.address) {
      const addr = item.address;
      const streetParts = [addr.address_line_1, addr.address_line_2, addr.care_of].filter(Boolean);
      legalAddress = {
        street: streetParts.join(", ") || undefined,
        city: addr.locality || undefined,
        postalCode: addr.postal_code || undefined,
        region: addr.region || undefined,
        country: "GB"
      };
    }
    return {
      id: `UK_CRN:${crn}`,
      canonicalName: rawName,
      normalizedName,
      jurisdiction: "GB",
      region: "OTHER",
      primaryIdType: "NATIONAL_REG",
      primaryIdValue: crn,
      lei: null,
      registrationNumber: crn,
      registrationAuthority: "UK Companies House",
      vatNumber: null,
      vatValid: null,
      taxId: null,
      cik: null,
      tickers: [],
      legalForm: item.company_type ? String(item.company_type).toUpperCase() : detectedLegalForm,
      status: this.mapStatus(item.company_status),
      incorporationDate: item.date_of_creation || null,
      legalAddress,
      headquartersAddress: null,
      parentLei: null,
      ultimateParentLei: null,
      domains: [],
      aliases: [],
      sources: [
        {
          source: this.sourceName,
          sourceId: crn,
          fetchedAt: new Date().toISOString()
        }
      ],
      confidence: 0.9
    };
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/swiss-zefix.adapter.ts
class SwissZefixAdapter {
  sourceName = "SWISS_ZEFIX";
  fetchImpl;
  constructor(opts = {}) {
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }
  supports(query, jurisdiction) {
    if (query.type === "CH_UID")
      return true;
    if (query.inferredCountry === "CH")
      return true;
    if (jurisdiction) {
      return jurisdiction.toUpperCase() === "CH";
    }
    return false;
  }
  formatUid(raw) {
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 9) {
      return `CHE-${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}`;
    }
    return null;
  }
  async search(query, opts) {
    const timeout = opts?.timeoutMs ?? 2200;
    const signal = AbortSignal.timeout(timeout);
    const formattedUid = this.formatUid(query.cleanedValue);
    try {
      if (query.type === "CH_UID" && formattedUid) {
        const url = `https://www.zefix.ch/ZefixREST/api/v1/company/uid/${encodeURIComponent(formattedUid)}`;
        const res = await this.fetchImpl(url, {
          signal,
          headers: { Accept: "application/json" }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && (data.name || data.uid)) {
            return [this.mapSingleCompany(data, formattedUid)];
          }
        }
      }
      const searchUrl = "https://www.zefix.ch/ZefixREST/api/v1/firm/search.json";
      const q = query.normalizedName || query.cleanedValue;
      const res = await this.fetchImpl(searchUrl, {
        method: "POST",
        signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: q,
          maxEntries: 5
        })
      });
      if (!res.ok) {
        return [];
      }
      const json = await res.json();
      const list = Array.isArray(json) ? json : Array.isArray(json?.list) ? json.list : [];
      return list.map((item) => this.mapSingleCompany(item));
    } catch {
      return [];
    }
  }
  mapStatus(statusRaw) {
    const s = String(statusRaw ?? "").toUpperCase();
    if (s === "ACTIVE" || s === "1")
      return "ACTIVE";
    if (["CANCELLED", "IN_LIQUIDATION", "DELETED", "INACTIVE", "0"].includes(s)) {
      return "INACTIVE";
    }
    return "UNKNOWN";
  }
  mapSingleCompany(data, fallbackUid) {
    const uid = data.uid || fallbackUid || "UNKNOWN";
    const rawName = String(data.name ?? "UNKNOWN");
    const { normalizedName, detectedLegalForm } = normalizeCompanyName(rawName);
    let legalAddress = null;
    if (data.address) {
      legalAddress = {
        street: data.address.street || undefined,
        city: data.address.city || undefined,
        postalCode: data.address.swissZipCode ? String(data.address.swissZipCode) : undefined,
        region: data.canton || undefined,
        country: "CH"
      };
    }
    let legalForm = null;
    if (data.legalForm && typeof data.legalForm === "object") {
      legalForm = data.legalForm.name?.de || data.legalForm.name?.fr || data.legalForm.name?.en || detectedLegalForm;
    } else {
      legalForm = detectedLegalForm;
    }
    return {
      id: `CH_UID:${uid}`,
      canonicalName: rawName,
      normalizedName,
      jurisdiction: "CH",
      region: "OTHER",
      primaryIdType: "NATIONAL_REG",
      primaryIdValue: uid,
      lei: null,
      registrationNumber: uid,
      registrationAuthority: "Swiss Federal Commercial Registry (ZEFIX)",
      vatNumber: null,
      vatValid: null,
      taxId: null,
      cik: null,
      tickers: [],
      legalForm,
      status: this.mapStatus(data.status),
      incorporationDate: null,
      legalAddress,
      headquartersAddress: null,
      parentLei: null,
      ultimateParentLei: null,
      domains: [],
      aliases: [],
      sources: [
        {
          source: this.sourceName,
          sourceId: uid,
          fetchedAt: new Date().toISOString()
        }
      ],
      confidence: 0.95
    };
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/australian-abr.adapter.ts
class AustralianAbrAdapter {
  sourceName = "AU_ABR";
  guid;
  fetchImpl;
  constructor(opts = {}) {
    this.guid = opts.guid ?? process.env.ABR_GUID ?? "";
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }
  supports(query, jurisdiction) {
    if (!this.guid?.trim())
      return false;
    if (query.type === "AU_ABN" || query.type === "AU_ACN")
      return true;
    if (query.inferredCountry === "AU")
      return true;
    if (jurisdiction) {
      return jurisdiction.toUpperCase() === "AU";
    }
    return false;
  }
  parseJsonpOrJson(text) {
    const trimmed = text.trim();
    if (!trimmed)
      return null;
    try {
      return JSON.parse(trimmed);
    } catch {
      const stripped = trimmed.replace(/^[a-zA-Z0-9_$.]+\(/, "").replace(/\);?$/, "");
      try {
        return JSON.parse(stripped);
      } catch {
        return null;
      }
    }
  }
  async getResponseData(res) {
    if (typeof res.text === "function") {
      const text = await res.text();
      return this.parseJsonpOrJson(text);
    }
    if (typeof res.json === "function") {
      return await res.json();
    }
    return null;
  }
  async search(query, opts) {
    if (!this.guid?.trim())
      return [];
    const timeout = opts?.timeoutMs ?? 2200;
    const signal = AbortSignal.timeout(timeout);
    try {
      const cleanDigits = query.cleanedValue.replace(/\D/g, "");
      if (query.type === "AU_ABN" || cleanDigits.length === 11) {
        const url = `https://abr.business.gov.au/json/AbnDetails.aspx?abn=${encodeURIComponent(cleanDigits)}&guid=${encodeURIComponent(this.guid)}`;
        const res = await this.fetchImpl(url, { signal, headers: { Accept: "application/json" } });
        if (!res.ok)
          return [];
        const data = await this.getResponseData(res);
        if (data && (data.Abn || data.EntityName)) {
          return [this.mapSingleCompany(data)];
        }
        return [];
      }
      if (query.type === "AU_ACN" || cleanDigits.length === 9 && (query.inferredCountry === "AU" || opts?.jurisdiction?.toUpperCase() === "AU")) {
        const url = `https://abr.business.gov.au/json/AcnDetails.aspx?acn=${encodeURIComponent(cleanDigits)}&guid=${encodeURIComponent(this.guid)}`;
        const res = await this.fetchImpl(url, { signal, headers: { Accept: "application/json" } });
        if (!res.ok)
          return [];
        const data = await this.getResponseData(res);
        if (data && (data.Abn || data.Acn || data.EntityName)) {
          return [this.mapSingleCompany(data)];
        }
        return [];
      }
      const q = encodeURIComponent(query.normalizedName || query.cleanedValue);
      const url = `https://abr.business.gov.au/json/MatchingNames.aspx?name=${q}&maxResults=5&guid=${encodeURIComponent(this.guid)}`;
      const res = await this.fetchImpl(url, { signal, headers: { Accept: "application/json" } });
      if (!res.ok)
        return [];
      const data = await this.getResponseData(res);
      const names = Array.isArray(data?.Names) ? data.Names : Array.isArray(data) ? data : [];
      return names.map((item) => this.mapMatchingName(item));
    } catch {
      return [];
    }
  }
  mapStatus(statusRaw) {
    const s = String(statusRaw ?? "").toLowerCase();
    if (s === "active")
      return "ACTIVE";
    if (["cancelled", "inactive", "deregistered", "strike-off"].includes(s)) {
      return "INACTIVE";
    }
    return "UNKNOWN";
  }
  mapSingleCompany(data) {
    const abn = String(data.Abn ?? "").replace(/\s/g, "");
    const acn = data.Acn ? String(data.Acn).replace(/\s/g, "") : null;
    const idVal = abn || acn || "UNKNOWN";
    const rawName = String(data.EntityName ?? data.BusinessName ?? "UNKNOWN");
    const { normalizedName, detectedLegalForm } = normalizeCompanyName(rawName);
    let legalAddress = null;
    if (data.AddressPostcode || data.AddressState) {
      legalAddress = {
        postalCode: data.AddressPostcode || undefined,
        region: data.AddressState || undefined,
        country: "AU"
      };
    }
    return {
      id: abn ? `AU_ABN:${abn}` : `AU_ACN:${acn}`,
      canonicalName: rawName,
      normalizedName,
      jurisdiction: "AU",
      region: "OTHER",
      primaryIdType: "NATIONAL_REG",
      primaryIdValue: idVal,
      lei: null,
      registrationNumber: idVal,
      registrationAuthority: "Australian Business Register (ABR)",
      vatNumber: null,
      vatValid: null,
      taxId: abn || null,
      cik: null,
      tickers: [],
      legalForm: data.EntityTypeName || detectedLegalForm,
      status: this.mapStatus(data.EntityStatusCode),
      incorporationDate: null,
      legalAddress,
      headquartersAddress: null,
      parentLei: null,
      ultimateParentLei: null,
      domains: [],
      aliases: [],
      sources: [
        {
          source: this.sourceName,
          sourceId: idVal,
          fetchedAt: new Date().toISOString()
        }
      ],
      confidence: 0.98
    };
  }
  mapMatchingName(item) {
    const abn = String(item.Abn ?? "").replace(/\s/g, "");
    const rawName = String(item.Name ?? item.EntityName ?? "UNKNOWN");
    const { normalizedName, detectedLegalForm } = normalizeCompanyName(rawName);
    let legalAddress = null;
    if (item.Postcode || item.State) {
      legalAddress = {
        postalCode: item.Postcode || undefined,
        region: item.State || undefined,
        country: "AU"
      };
    }
    return {
      id: `AU_ABN:${abn}`,
      canonicalName: rawName,
      normalizedName,
      jurisdiction: "AU",
      region: "OTHER",
      primaryIdType: "NATIONAL_REG",
      primaryIdValue: abn,
      lei: null,
      registrationNumber: abn,
      registrationAuthority: "Australian Business Register (ABR)",
      vatNumber: null,
      vatValid: null,
      taxId: abn || null,
      cik: null,
      tickers: [],
      legalForm: detectedLegalForm,
      status: "ACTIVE",
      incorporationDate: null,
      legalAddress,
      headquartersAddress: null,
      parentLei: null,
      ultimateParentLei: null,
      domains: [],
      aliases: [],
      sources: [
        {
          source: this.sourceName,
          sourceId: abn,
          fetchedAt: new Date().toISOString()
        }
      ],
      confidence: 0.9
    };
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/singapore-acra.adapter.ts
class SingaporeAcraAdapter {
  sourceName = "SG_ACRA";
  fetchImpl;
  constructor(opts = {}) {
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }
  supports(query, jurisdiction) {
    if (query.type === "SG_UEN")
      return true;
    if (query.inferredCountry === "SG")
      return true;
    if (jurisdiction) {
      return jurisdiction.toUpperCase() === "SG";
    }
    return false;
  }
  async search(query, opts) {
    const timeout = opts?.timeoutMs ?? 2200;
    const signal = AbortSignal.timeout(timeout);
    try {
      const q = query.type === "SG_UEN" ? query.cleanedValue : query.normalizedName || query.cleanedValue;
      const url = `https://data.gov.sg/api/action/datastore_search?resource_id=d_688b934f82c1059ec0a794b2918ea9d5&q=${encodeURIComponent(q)}&limit=5`;
      const res = await this.fetchImpl(url, {
        signal,
        headers: { Accept: "application/json" }
      });
      if (!res.ok) {
        return [];
      }
      const json = await res.json();
      const records = Array.isArray(json?.result?.records) ? json.result.records : Array.isArray(json?.records) ? json.records : [];
      return records.map((record) => this.mapRecord(record));
    } catch {
      return [];
    }
  }
  mapStatus(statusRaw) {
    const s = String(statusRaw ?? "").toLowerCase();
    if (s.includes("inactive") || s.includes("struck") || s.includes("dissolved") || s.includes("winding") || s.includes("liquidation") || s.includes("ceased")) {
      return "INACTIVE";
    }
    if (s.includes("live") || s.includes("registered") || s.includes("active")) {
      return "ACTIVE";
    }
    return "UNKNOWN";
  }
  mapRecord(record) {
    const uen = String(record.uen ?? record.entity_uen ?? record.uen_issue_code ?? "UNKNOWN").trim();
    const rawName = String(record.entity_name ?? record.name ?? "UNKNOWN");
    const { normalizedName, detectedLegalForm } = normalizeCompanyName(rawName);
    let legalAddress = null;
    const street = record.reg_street_name || record.address_street_name || record.street_name;
    const postalCode = record.reg_postal_code || record.postal_code;
    if (street || postalCode) {
      legalAddress = {
        street: street || undefined,
        postalCode: postalCode || undefined,
        country: "SG"
      };
    }
    const legalForm = record.entity_type_description || record.entity_type || detectedLegalForm;
    return {
      id: `SG_UEN:${uen}`,
      canonicalName: rawName,
      normalizedName,
      jurisdiction: "SG",
      region: "OTHER",
      primaryIdType: "NATIONAL_REG",
      primaryIdValue: uen,
      lei: null,
      registrationNumber: uen,
      registrationAuthority: "Singapore ACRA (UEN)",
      vatNumber: null,
      vatValid: null,
      taxId: uen,
      cik: null,
      tickers: [],
      legalForm,
      status: this.mapStatus(record.entity_status_description || record.status),
      incorporationDate: record.reg_date || record.registration_date || null,
      legalAddress,
      headquartersAddress: null,
      parentLei: null,
      ultimateParentLei: null,
      domains: [],
      aliases: [],
      sources: [
        {
          source: this.sourceName,
          sourceId: uen,
          fetchedAt: new Date().toISOString()
        }
      ],
      confidence: 0.98
    };
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/configurable-registry.adapter.ts
var EU_COUNTRIES2 = new Set([
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK"
]);
function getByDotPath(obj, path) {
  if (!obj || !path)
    return;
  const parts = path.split(".");
  let cur = obj;
  for (const part of parts) {
    if (cur == null || typeof cur !== "object")
      return;
    cur = cur[part];
  }
  return cur;
}

class ConfigurableRegistryAdapter {
  sourceName;
  config;
  fetchImpl;
  env;
  constructor(config, deps) {
    this.config = config;
    this.sourceName = config.sourceName;
    this.fetchImpl = deps?.fetchImpl ?? fetch;
    this.env = deps?.env ?? (typeof process !== "undefined" ? process.env : {});
  }
  hasRequiredCredentials(isIdLookup) {
    if (this.config.enabled === false)
      return false;
    const template = isIdLookup ? this.config.lookupUrl : this.config.searchUrl;
    if (!template)
      return false;
    const urlMatches = template.match(/\$\{([^}]+)\}/g);
    if (urlMatches) {
      for (const m of urlMatches) {
        const varName = m.slice(2, -1);
        if (!this.env[varName]?.trim()) {
          return false;
        }
      }
    }
    if (this.config.headers) {
      for (const rawVal of Object.values(this.config.headers)) {
        const hMatches = rawVal.match(/\$\{([^}]+)\}/g);
        if (hMatches) {
          for (const m of hMatches) {
            const varName = m.slice(2, -1);
            if (!this.env[varName]?.trim()) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }
  supports(query, jurisdiction) {
    const isIdLookup = Boolean(query.scheme && this.config.schemes.includes(query.scheme));
    if (!this.hasRequiredCredentials(isIdLookup))
      return false;
    if (query.scheme && this.config.schemes.includes(query.scheme)) {
      return true;
    }
    if (query.type === "NAME" && this.config.searchUrl) {
      const targetCountry = jurisdiction || query.inferredCountry;
      if (targetCountry && targetCountry.toUpperCase() === this.config.country.toUpperCase()) {
        return true;
      }
    }
    return false;
  }
  async search(query, opts) {
    let url;
    const isIdLookup = Boolean(query.scheme && this.config.schemes.includes(query.scheme));
    if (isIdLookup) {
      if (!this.hasRequiredCredentials(true))
        return [];
      const id = this.config.formatId?.(query.cleanedValue) ?? query.cleanedValue;
      url = this.config.lookupUrl.replace("{id}", encodeURIComponent(id));
    } else if (query.type === "NAME" && this.config.searchUrl) {
      if (!this.hasRequiredCredentials(false))
        return [];
      url = this.config.searchUrl.replace("{q}", encodeURIComponent(query.cleanedValue || query.raw));
    } else {
      return [];
    }
    let hasMissingCred = false;
    url = url.replace(/\$\{([^}]+)\}/g, (_, varName) => {
      const val = this.env[varName]?.trim() ?? "";
      if (!val)
        hasMissingCred = true;
      return encodeURIComponent(val);
    });
    if (hasMissingCred)
      return [];
    const headers = {
      Accept: "application/json"
    };
    if (this.config.headers) {
      for (const [key, rawVal] of Object.entries(this.config.headers)) {
        const val = rawVal.replace(/\$\{([^}]+)\}/g, (_, varName) => {
          return this.env[varName]?.trim() ?? "";
        });
        headers[key] = val;
      }
    }
    const timeout = opts?.timeoutMs || this.config.timeoutMs || 2500;
    const body = !isIdLookup && this.config.searchBody ? JSON.stringify(this.config.searchBody(query.cleanedValue || query.raw)) : undefined;
    if (body !== undefined)
      headers["Content-Type"] = "application/json";
    try {
      const response = await this.fetchImpl(url, {
        method: body === undefined ? "GET" : "POST",
        headers,
        body,
        signal: AbortSignal.timeout(timeout)
      });
      if (!response.ok) {
        if (response.status === 404 || response.status === 410)
          return [];
        const retryAfter = response.headers?.get("retry-after");
        const retrySeconds = retryAfter && /^\d+$/.test(retryAfter) ? Math.min(Number(retryAfter), 86400) : undefined;
        throw new UpstreamProviderError(response.status === 429 ? "RATE_LIMITED" : response.status === 401 || response.status === 403 ? "ACCESS_DENIED" : "UNAVAILABLE", response.status, retrySeconds);
      }
      let data;
      try {
        data = await response.json();
      } catch {
        throw new UpstreamProviderError("INVALID_RESPONSE");
      }
      if (!data || typeof data !== "object")
        throw new UpstreamProviderError("INVALID_RESPONSE");
      if (this.config.validateResponse && !this.config.validateResponse(data, query)) {
        throw new UpstreamProviderError("INVALID_RESPONSE");
      }
      let items = [];
      const resultsPath = !isIdLookup && this.config.searchResultsPath ? this.config.searchResultsPath : this.config.resultsPath;
      if (resultsPath && getByDotPath(data, resultsPath)) {
        const extracted = getByDotPath(data, resultsPath);
        if (Array.isArray(extracted)) {
          items = extracted;
        } else if (extracted != null && typeof extracted === "object") {
          items = [extracted];
        }
      } else {
        items = Array.isArray(data) ? data : [data];
      }
      const records = [];
      const now = new Date().toISOString();
      for (const rawItem of items) {
        const item = this.config.normalizeItem?.(rawItem) ?? rawItem;
        const idVal = getByDotPath(item, this.config.fieldMap.id);
        const nameVal = getByDotPath(item, this.config.fieldMap.name);
        if (!nameVal)
          continue;
        let status = "UNKNOWN";
        const slettedato = item.slettedato || item.deletionDate || item.datumZaniku;
        const isDeleted = Boolean(slettedato || item.deleted === true || item.isDeleted === true);
        const isLiquidation = Boolean(item.konkurs === true || item.underAvvikling === true || item.underTvangsavviklingEllerTvangsopplosning === true || item.inLiquidation === true);
        if (isDeleted) {
          status = "DISSOLVED";
        } else if (isLiquidation) {
          status = "LIQUIDATING";
        } else if (item.registrertIEnhetsregisteret === true) {
          status = "ACTIVE";
        } else if (this.config.fieldMap.status) {
          const rawStatus = String(getByDotPath(item, this.config.fieldMap.status) ?? "").trim();
          if (rawStatus && this.config.statusMap[rawStatus]) {
            status = this.config.statusMap[rawStatus];
          } else if (rawStatus && this.config.statusMap[rawStatus.toUpperCase()]) {
            status = this.config.statusMap[rawStatus.toUpperCase()];
          } else if (rawStatus && this.config.statusMap["*"]) {
            status = this.config.statusMap["*"];
          } else {
            status = "UNKNOWN";
          }
        } else {
          status = "UNKNOWN";
        }
        const street = this.config.fieldMap.street ? String(getByDotPath(item, this.config.fieldMap.street) ?? "") : undefined;
        const city = this.config.fieldMap.city ? String(getByDotPath(item, this.config.fieldMap.city) ?? "") : undefined;
        const postalCode = this.config.fieldMap.postalCode ? String(getByDotPath(item, this.config.fieldMap.postalCode) ?? "") : undefined;
        const cleanName = String(nameVal).trim();
        const { normalizedName, detectedLegalForm } = normalizeCompanyName(cleanName);
        const jurUpper = this.config.country.toUpperCase();
        const region = jurUpper === "US" ? "US" : EU_COUNTRIES2.has(jurUpper) ? "EU" : "OTHER";
        const cleanId = idVal ? String(idVal).trim() : query.cleanedValue;
        const entityId = `${jurUpper}_${query.scheme || "REG"}:${cleanId}`;
        let confidence = 0.5;
        if (isIdLookup) {
          const idClean = cleanId.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
          const queryClean = query.cleanedValue.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
          confidence = idClean === queryClean ? 0.99 : 0.1;
        } else {
          const queryTerm = query.normalizedName || query.cleanedValue || query.raw;
          const sim = trigramSimilarity(queryTerm, normalizedName);
          confidence = Math.round(sim * 100) / 100;
        }
        records.push({
          id: entityId,
          canonicalName: cleanName,
          normalizedName,
          jurisdiction: jurUpper,
          region,
          primaryIdType: "NATIONAL_REG",
          primaryIdValue: cleanId,
          lei: null,
          registrationNumber: cleanId,
          registrationAuthority: this.sourceName,
          vatNumber: null,
          vatValid: null,
          taxId: this.config.fieldMap.taxId ? getByDotPath(item, this.config.fieldMap.taxId) ?? null : null,
          cik: null,
          tickers: [],
          legalForm: this.config.fieldMap.legalForm ? getByDotPath(item, this.config.fieldMap.legalForm) ?? detectedLegalForm : detectedLegalForm,
          status,
          incorporationDate: this.config.fieldMap.incorporationDate ? getByDotPath(item, this.config.fieldMap.incorporationDate) ?? null : null,
          legalAddress: {
            street: street || undefined,
            city: city || undefined,
            postalCode: postalCode || undefined,
            country: jurUpper
          },
          headquartersAddress: null,
          parentLei: null,
          ultimateParentLei: null,
          domains: [],
          aliases: [],
          confidence,
          sources: [
            {
              source: this.sourceName,
              sourceId: cleanId,
              fetchedAt: now
            }
          ]
        });
      }
      if (items.length > 0 && records.length === 0)
        throw new UpstreamProviderError("INVALID_RESPONSE");
      return records;
    } catch (error) {
      if (error instanceof UpstreamProviderError)
        throw error;
      throw new UpstreamProviderError(error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError") ? "TIMEOUT" : "UNAVAILABLE");
    }
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/registry-configs.ts
function normalizeFinnishCompany(company) {
  const name = company.names?.find((n) => n.type === "1" && !n.endDate)?.name;
  const address = company.addresses?.find((a) => a.type === 1) ?? company.addresses?.[0];
  const postOffices = address?.postOffices;
  const form = company.companyForms?.find((f) => !f.endDate)?.descriptions;
  return {
    businessId: company.businessId?.value,
    name,
    status: company.companySituations?.some((s) => !s.endDate) ? undefined : company.tradeRegisterStatus,
    deletionDate: company.endDate,
    registrationDate: company.registrationDate,
    legalForm: form?.find((d) => d.languageCode === "3")?.description ?? form?.[0]?.description,
    street: [address?.street, address?.buildingNumber].filter(Boolean).join(" "),
    city: postOffices?.find((p) => p.languageCode === "1")?.city ?? postOffices?.[0]?.city,
    postalCode: address?.postCode
  };
}
var REGISTRY_CONFIGS = [
  {
    sourceName: "LV_UR",
    country: "LV",
    schemes: ["LV_REGCODE"],
    lookupUrl: "https://data.gov.lv/dati/api/3/action/datastore_search?resource_id=25e80bf3-f107-4ab4-89ef-251b5b9374e9&limit=20&filters=%7B%22regcode%22%3A%22{id}%22%7D",
    searchUrl: "https://data.gov.lv/dati/api/3/action/datastore_search?resource_id=25e80bf3-f107-4ab4-89ef-251b5b9374e9&limit=20&q={q}",
    resultsPath: "result.records",
    validateResponse: (data) => data.success === true && Array.isArray(data.result?.records),
    normalizeItem: (item) => ({
      id: item.regcode,
      name: item.name,
      legalForm: item.type_text,
      street: item.address,
      postalCode: item.index,
      incorporationDate: typeof item.registered === "string" ? item.registered.slice(0, 10) : undefined,
      deletionDate: item.terminated
    }),
    fieldMap: { id: "id", name: "name", legalForm: "legalForm", street: "street", postalCode: "postalCode", incorporationDate: "incorporationDate" },
    statusMap: {}
  },
  {
    sourceName: "PL_KRS",
    country: "PL",
    schemes: ["PL_KRS"],
    lookupUrl: "https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/{id}?rejestr=P&format=json",
    resultsPath: "odpis",
    validateResponse: (data, query) => data.odpis?.naglowekA?.numerKRS === query.cleanedValue && Boolean(data.odpis?.dane?.dzial1?.danePodmiotu?.nazwa),
    normalizeItem: (item) => {
      const company = item.dane?.dzial1?.danePodmiotu;
      const address = item.dane?.dzial1?.siedzibaIAdres?.adres;
      return {
        id: item.naglowekA?.numerKRS,
        name: company?.nazwa,
        legalForm: company?.formaPrawna,
        taxId: company?.identyfikatory?.nip,
        street: [address?.ulica, address?.nrDomu, address?.nrLokalu].filter(Boolean).join(" "),
        city: address?.miejscowosc,
        postalCode: address?.kodPocztowy,
        inLiquidation: Boolean(item.dane?.dzial6?.likwidacja && Object.keys(item.dane.dzial6.likwidacja).length)
      };
    },
    fieldMap: { id: "id", name: "name", taxId: "taxId", legalForm: "legalForm", street: "street", city: "city", postalCode: "postalCode" },
    statusMap: {}
  },
  {
    sourceName: "FR_RECHERCHE_ENTREPRISES",
    country: "FR",
    schemes: ["FR_SIREN", "FR_SIRET"],
    lookupUrl: "https://recherche-entreprises.api.gouv.fr/search?q={id}",
    searchUrl: "https://recherche-entreprises.api.gouv.fr/search?q={q}",
    resultsPath: "results",
    fieldMap: {
      id: "siren",
      name: "nom_complet",
      status: "etat_administratif",
      street: "siege.adresse",
      city: "siege.libelle_commune",
      postalCode: "siege.code_postal"
    },
    statusMap: {
      A: "ACTIVE",
      C: "DISSOLVED",
      ACTIVE: "ACTIVE"
    }
  },
  {
    sourceName: "CZ_ARES",
    country: "CZ",
    schemes: ["CZ_ICO"],
    lookupUrl: "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/{id}",
    searchUrl: "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/vyhledat",
    searchBody: (term) => ({ obchodniJmeno: term, start: 0, pocet: 20 }),
    searchResultsPath: "ekonomickeSubjekty",
    fieldMap: {
      id: "ico",
      name: "obchodniJmeno",
      status: "stavSubjektu",
      city: "sidlo.nazevObce",
      postalCode: "sidlo.psc"
    },
    statusMap: {
      AKTIVNI: "ACTIVE",
      ZANIKLY: "DISSOLVED",
      ACTIVE: "ACTIVE"
    }
  },
  {
    sourceName: "NO_BRREG",
    country: "NO",
    schemes: ["NO_ORGNR"],
    lookupUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/{id}",
    searchUrl: "https://data.brreg.no/enhetsregisteret/api/enheter?navn={q}",
    resultsPath: "_embedded.enheter",
    fieldMap: {
      id: "organisasjonsnummer",
      name: "navn",
      city: "forretningsadresse.poststed",
      postalCode: "forretningsadresse.postnummer"
    },
    statusMap: {
      ACTIVE: "ACTIVE",
      SLETTET: "DISSOLVED"
    }
  },
  {
    sourceName: "FI_PRH_YTJ",
    country: "FI",
    schemes: ["FI_YTUNNUS"],
    lookupUrl: "https://avoindata.prh.fi/opendata-ytj-api/v3/companies?businessId={id}",
    searchUrl: "https://avoindata.prh.fi/opendata-ytj-api/v3/companies?name={q}",
    formatId: (id) => /^\d{8}$/.test(id) ? `${id.slice(0, 7)}-${id.slice(7)}` : id,
    resultsPath: "companies",
    normalizeItem: normalizeFinnishCompany,
    fieldMap: {
      id: "businessId",
      name: "name",
      status: "status",
      street: "street",
      city: "city",
      postalCode: "postalCode",
      legalForm: "legalForm",
      incorporationDate: "registrationDate"
    },
    statusMap: {
      "1": "ACTIVE",
      "2": "INACTIVE",
      "4": "DISSOLVED"
    }
  },
  {
    sourceName: "NZ_NZBN",
    country: "NZ",
    schemes: ["NZ_NZBN"],
    lookupUrl: "https://api.business.govt.nz/services/v4/nzbn/entities/{id}",
    searchUrl: "https://api.business.govt.nz/services/v4/nzbn/entities?search-term={q}",
    headers: {
      "Ocp-Apim-Subscription-Key": "${NZBN_API_KEY}"
    },
    fieldMap: {
      id: "nzbn",
      name: "entityName",
      status: "entityStatusDescription"
    },
    statusMap: {
      Registered: "ACTIVE",
      Removed: "DISSOLVED",
      ACTIVE: "ACTIVE"
    }
  },
  {
    sourceName: "BR_CNPJ",
    country: "BR",
    schemes: ["BR_CNPJ"],
    lookupUrl: "https://brasilapi.com.br/api/cnpj/v1/{id}",
    fieldMap: {
      id: "cnpj",
      name: "razao_social",
      status: "descricao_situacao_cadastral",
      city: "municipio",
      street: "logradouro",
      postalCode: "cep"
    },
    statusMap: {
      ATIVA: "ACTIVE",
      BAIXADA: "DISSOLVED",
      SUSPENSA: "INACTIVE",
      INAPTA: "INACTIVE"
    }
  },
  {
    enabled: false,
    sourceName: "CA_CORP",
    country: "CA",
    schemes: ["CA_BN"],
    lookupUrl: "https://ised-isde.canada.ca/corp/api/corporations/{id}",
    searchUrl: "https://ised-isde.canada.ca/corp/api/corporations?q={q}",
    fieldMap: {
      id: "corporationNumber",
      name: "corporateName",
      status: "status"
    },
    statusMap: {
      Active: "ACTIVE",
      Dissolved: "DISSOLVED",
      ACTIVE: "ACTIVE"
    }
  },
  {
    sourceName: "JP_NTA",
    country: "JP",
    schemes: ["JP_CN"],
    lookupUrl: "https://api.houjin-bangou.nta.go.jp/4/num?id=${JP_NTA_APP_ID}&number={id}&type=12",
    searchUrl: "https://api.houjin-bangou.nta.go.jp/4/name?id=${JP_NTA_APP_ID}&name={q}&type=12",
    resultsPath: "corporation",
    fieldMap: {
      id: "corporateNumber",
      name: "name",
      status: "process",
      city: "cityName"
    },
    statusMap: {
      "01": "ACTIVE",
      "11": "ACTIVE",
      "12": "ACTIVE",
      "71": "DISSOLVED",
      "72": "DISSOLVED",
      ACTIVE: "ACTIVE"
    }
  }
];

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/commercial-aggregator.adapter.ts
var EU_COUNTRIES3 = new Set([
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK"
]);

class OpenCorporatesAggregatorAdapter {
  sourceName = "OPENCORPORATES";
  costPerCallUsd;
  fetchImpl;
  apiKey;
  constructor(deps) {
    this.fetchImpl = deps?.fetchImpl ?? fetch;
    this.apiKey = deps?.apiKey ?? (typeof process !== "undefined" ? process.env.OPENCORPORATES_API_KEY : undefined);
    this.costPerCallUsd = deps?.costPerCallUsd ?? 0.05;
  }
  supports(query, jurisdiction) {
    if (!this.apiKey?.trim())
      return false;
    return true;
  }
  async search(query, opts) {
    if (!this.apiKey?.trim())
      return [];
    const term = query.cleanedValue || query.raw;
    if (!term)
      return [];
    let url = `https://api.opencorporates.com/v0.4/companies/search?q=${encodeURIComponent(term)}`;
    const jur = opts?.jurisdiction || query.inferredCountry;
    if (jur) {
      url += `&jurisdiction_code=${encodeURIComponent(jur.toLowerCase())}`;
    }
    if (this.apiKey) {
      url += `&api_token=${encodeURIComponent(this.apiKey)}`;
    }
    const timeout = opts?.timeoutMs || 2500;
    try {
      const res = await this.fetchImpl(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(timeout)
      });
      if (!res.ok) {
        return [];
      }
      const data = await res.json();
      const companies = data?.results?.companies;
      if (!Array.isArray(companies)) {
        return [];
      }
      const now = new Date().toISOString();
      const records = [];
      for (const item of companies) {
        const c = item.company;
        if (!c?.name)
          continue;
        const cleanName = String(c.name).trim();
        const { normalizedName, detectedLegalForm } = normalizeCompanyName(cleanName);
        const jurUpper = (c.jurisdiction_code || jur || "XX").toUpperCase();
        const region = jurUpper === "US" ? "US" : EU_COUNTRIES3.has(jurUpper) ? "EU" : "OTHER";
        const cleanId = String(c.company_number || cleanName).trim();
        const entityId = `OC_${jurUpper}:${cleanId}`;
        records.push({
          id: entityId,
          canonicalName: cleanName,
          normalizedName,
          jurisdiction: jurUpper,
          region,
          primaryIdType: "NATIONAL_REG",
          primaryIdValue: cleanId,
          lei: null,
          registrationNumber: cleanId,
          registrationAuthority: "OpenCorporates",
          vatNumber: null,
          vatValid: null,
          taxId: null,
          cik: null,
          tickers: [],
          legalForm: c.company_type || detectedLegalForm,
          status: (() => {
            if (!c.current_status)
              return "UNKNOWN";
            const raw = String(c.current_status).toLowerCase();
            if (raw.includes("dissolved") || raw.includes("struck off") || raw.includes("deleted")) {
              return "DISSOLVED";
            }
            if (raw.includes("liquidation") || raw.includes("bankruptcy") || raw.includes("insolvent")) {
              return "LIQUIDATING";
            }
            if (raw.includes("inactive") || raw.includes("dormant") || raw.includes("suspended")) {
              return "INACTIVE";
            }
            if (raw.includes("active") || raw.includes("live") || raw.includes("registered") || raw.includes("existing")) {
              return "ACTIVE";
            }
            return "UNKNOWN";
          })(),
          incorporationDate: c.incorporation_date || null,
          legalAddress: {
            street: c.registered_address_in_full || undefined,
            country: jurUpper
          },
          headquartersAddress: null,
          parentLei: null,
          ultimateParentLei: null,
          domains: [],
          aliases: [],
          confidence: (() => {
            if (query.type !== "NAME" && query.cleanedValue) {
              const idClean = cleanId.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
              const queryClean = query.cleanedValue.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
              return idClean === queryClean ? 0.95 : 0.1;
            }
            const queryTerm = query.normalizedName || query.cleanedValue || query.raw;
            const sim = trigramSimilarity(queryTerm, normalizedName);
            return Math.round(sim * 100) / 100;
          })(),
          sources: [
            {
              source: this.sourceName,
              sourceId: cleanId,
              fetchedAt: now
            }
          ]
        });
      }
      return records;
    } catch {
      return [];
    }
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/poland-whitelist.adapter.ts
class PolandWhiteListAdapter {
  sourceName = "PL_MF_WHITELIST";
  fetchImpl;
  constructor(deps) {
    this.fetchImpl = deps?.fetchImpl ?? fetch;
  }
  supports(country) {
    return country?.toUpperCase() === "PL";
  }
  async verify(iban, taxId, timeoutMs = 2500) {
    const cleanTax = taxId.replace(/\D/g, "");
    const cleanIban = iban.replace(/\s+/g, "").toUpperCase();
    const accountNum = cleanIban.startsWith("PL") ? cleanIban.slice(2) : cleanIban;
    if (!cleanTax || accountNum.length !== 26) {
      return { matched: null };
    }
    const today = new Date().toISOString().slice(0, 10);
    const url = `https://wl-api.mf.gov.pl/api/search/nip/${cleanTax}?date=${today}`;
    try {
      const res = await this.fetchImpl(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(timeoutMs)
      });
      if (!res.ok) {
        return { matched: null };
      }
      const data = await res.json();
      const subject = data?.result?.subject;
      if (!subject) {
        return { matched: false };
      }
      const accountNumbers = subject.accountNumbers || [];
      const matched = accountNumbers.some((acc) => acc.replace(/\D/g, "") === accountNum);
      return { matched };
    } catch {
      return { matched: null };
    }
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/czech-vat-accounts.adapter.ts
class CzechVatAccountsAdapter {
  sourceName = "CZ_ARES_VAT_ACCOUNTS";
  fetchImpl;
  constructor(deps) {
    this.fetchImpl = deps?.fetchImpl ?? fetch;
  }
  supports(country) {
    return country?.toUpperCase() === "CZ";
  }
  async verify(iban, taxId, timeoutMs = 2500) {
    const cleanIco = taxId.replace(/\D/g, "");
    const cleanIban = iban.replace(/\s+/g, "").toUpperCase();
    if (!cleanIco || !cleanIban.startsWith("CZ")) {
      return { matched: null };
    }
    const url = `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-vr/${cleanIco}`;
    try {
      const res = await this.fetchImpl(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(timeoutMs)
      });
      if (!res.ok) {
        return { matched: null };
      }
      const data = await res.json();
      const accounts = data?.bankovniUcty || [];
      const matched = accounts.some((acc) => acc.replace(/\s+/g, "").toUpperCase() === cleanIban);
      return { matched };
    } catch {
      return { matched: null };
    }
  }
}

// ../../agentum-clean-release/agentum/src/adapters/outbound/upstreams/bodacc.adapter.ts
var SOURCE = "FR_BODACC";
var ENDPOINT = "https://www.bodacc.fr/api/explore/v2.1/catalog/datasets/annonces-commerciales/records";
var MAX_BYTES = 256 * 1024;
var ResponseSchema = object({ total_count: number2().int().nonnegative(), results: array(object({
  id: string2().regex(/^[A-Za-z0-9]+$/),
  dateparution: exports_iso.date(),
  familleavis_lib: string2().min(1),
  typeavis_lib: string2().min(1),
  registre: array(string2()),
  url_complete: string2()
})) });
function sirenOf(entity) {
  if (entity.jurisdiction !== "FR" || !entity.registrationNumber || !/^\d+$/.test(entity.registrationNumber))
    return null;
  const id = entity.registrationNumber;
  if (id.length === 9 && luhn(id))
    return id;
  if (id.length === 14 && entity.primaryIdValue === id && luhn(id) && luhn(id.slice(0, 9)))
    return id.slice(0, 9);
  return null;
}

class BodaccAdapter {
  fetchImpl;
  maxResults;
  constructor(options = {}) {
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.maxResults = Number.isFinite(options.maxResults) ? Math.min(20, Math.max(1, Math.floor(options.maxResults))) : 20;
  }
  supportsEntity(entity) {
    return sirenOf(entity) !== null;
  }
  async listEvents(entity, timeoutMs = 2200) {
    const siren = sirenOf(entity);
    if (!siren)
      return { status: "UNSUPPORTED", source: null, events: [], truncated: false };
    const controller = new AbortController;
    let timer;
    let reader;
    let completed = false;
    try {
      const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(new Error("timeout"));
        }, Math.max(1, timeoutMs));
      });
      const operation = async () => {
        const url = new URL(ENDPOINT);
        url.searchParams.set("where", `registre="${siren}"`);
        url.searchParams.set("select", "id,dateparution,familleavis_lib,typeavis_lib,registre,url_complete");
        url.searchParams.set("order_by", "dateparution desc");
        url.searchParams.set("limit", String(this.maxResults));
        const response = await this.fetchImpl(url, { signal: controller.signal });
        if (controller.signal.aborted) {
          response.body?.cancel().catch(() => {});
          throw new Error("timeout");
        }
        if (!response.ok || !response.body)
          throw new Error("response");
        const responseReader = response.body.getReader();
        reader = responseReader;
        const chunks = [];
        let size = 0;
        while (true) {
          const { done, value } = await responseReader.read();
          if (done) {
            completed = true;
            break;
          }
          size += value.byteLength;
          if (size > MAX_BYTES)
            throw new Error("size");
          chunks.push(value);
        }
        const bytes = new Uint8Array(size);
        let offset = 0;
        for (const chunk of chunks) {
          bytes.set(chunk, offset);
          offset += chunk.byteLength;
        }
        const payload = ResponseSchema.parse(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)));
        if (payload.results.length > this.maxResults || payload.total_count < payload.results.length)
          throw new Error("count");
        const events = payload.results.map((row) => {
          if (!row.registre.some((id) => /^\d{9}$/.test(id.replace(/ /g, "")) && id.replace(/ /g, "") === siren))
            throw new Error("identity");
          const expectedUrl = `https://www.bodacc.fr/pages/annonces-commerciales-detail/?q.id=id:${row.id}`;
          if (row.url_complete !== expectedUrl)
            throw new Error("url");
          return CompanyEventSchema.parse({ id: row.id, source: SOURCE, sourceUrl: expectedUrl, publishedAt: row.dateparution, category: row.familleavis_lib, description: row.typeavis_lib, companyRegistrationNumber: siren });
        });
        return { status: "OK", source: SOURCE, events, truncated: payload.total_count > events.length };
      };
      return await Promise.race([operation(), timeout]);
    } catch {
      return { status: "UNAVAILABLE", source: SOURCE, events: [], truncated: false, error: "BODACC_UNAVAILABLE" };
    } finally {
      if (timer)
        clearTimeout(timer);
      if (!completed) {
        controller.abort();
        reader?.cancel().catch(() => {});
      }
      try {
        reader?.releaseLock();
      } catch {}
    }
  }
}

// ../../agentum-clean-release/agentum/src/app.ts
function createApp(overrides = {}, customDeps) {
  const appConfig = {
    ...loadConfig(),
    ...overrides
  };
  const fetchImpl = customDeps?.fetchImpl ?? fetch;
  const cacheStore = createQuotaAndCacheAdapter(appConfig.redisUrl);
  const paymentLedger = appConfig.databaseUrl ? new PostgresPaymentLedger(appConfig.databaseUrl) : undefined;
  const entityRepo = appConfig.databaseUrl ? new HybridPostgresEntityRepositoryAdapter(appConfig.databaseUrl) : new InMemoryEntityRepositoryAdapter;
  const sanctionsRepo = appConfig.databaseUrl ? new HybridPostgresSanctionsRepositoryAdapter(appConfig.databaseUrl, appConfig.nodeEnv === "production" ? 100 : 1) : new InMemorySanctionsRepositoryAdapter(undefined, {
    minRecords: appConfig.nodeEnv === "production" ? 100 : 1
  });
  const configurableAdapters = REGISTRY_CONFIGS.map((cfg) => new ConfigurableRegistryAdapter(cfg, { fetchImpl }));
  const ukCompaniesHouse = new UkCompaniesHouseAdapter({ fetchImpl });
  const upstreamProviders = [
    new GleifUpstreamAdapter(fetchImpl),
    new LithuaniaJarUpstreamAdapter(fetchImpl),
    new SecEdgarUpstreamAdapter(appConfig.secEdgarUserAgent, fetchImpl),
    ukCompaniesHouse,
    new SwissZefixAdapter({ fetchImpl }),
    new AustralianAbrAdapter({ fetchImpl }),
    new SingaporeAcraAdapter({ fetchImpl }),
    ...configurableAdapters
  ];
  const vatValidator = new EuViesVatAdapter(fetchImpl, appConfig.viesTimeoutMs);
  const entityService = new EntityApplicationService({
    config: appConfig,
    entityRepo,
    sanctionsRepo,
    cacheStore,
    upstreamProviders,
    commercialAggregator: new OpenCorporatesAggregatorAdapter({ fetchImpl }),
    bankOwnershipAdapters: [
      new PolandWhiteListAdapter({ fetchImpl }),
      new CzechVatAccountsAdapter({ fetchImpl })
    ],
    beneficialOwnershipAdapters: [ukCompaniesHouse],
    companyEventsAdapters: [new BodaccAdapter({ fetchImpl })],
    vatValidator
  });
  const registry = new ToolRegistry;
  registerEntityTools(registry, entityService, appConfig);
  const x402Verifier = new X402PaymentAdapter(appConfig, fetchImpl);
  const mppVerifier = new MppPaymentAdapter(appConfig, fetchImpl);
  const ingestWorker = new DatasetIngestWorkerAdapter({
    entityRepo,
    sanctionsRepo,
    fetchImpl,
    secUserAgent: appConfig.secEdgarUserAgent
  });
  const app = new Hono2;
  app.use("*", requestId());
  app.use("*", timing());
  app.use("*", secureHeaders({ crossOriginResourcePolicy: "cross-origin" }));
  app.use("/mcp", bodyLimit({ maxSize: 256 * 1024, onError: (c) => c.json({ error: "Payload too large" }, 413) }));
  app.use("/v1/*", bodyLimit({ maxSize: 256 * 1024, onError: (c) => c.json({ error: "Payload too large" }, 413) }));
  app.use("/oauth/*", bodyLimit({ maxSize: 16 * 1024, onError: (c) => c.json({ error: "Payload too large" }, 413) }));
  app.use("/mcp", timeout(30000));
  app.use("/v1/entity/*", timeout(30000));
  app.use("/v1/vat/*", timeout(30000));
  app.use("/v1/sanctions/*", timeout(30000));
  app.use("*", cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "PAYMENT-SIGNATURE",
      "X-PAYMENT",
      "X-Agent-Id",
      "Mcp-Session-Id"
    ],
    exposeHeaders: [
      "PAYMENT-REQUIRED",
      "PAYMENT-RESPONSE",
      "WWW-Authenticate",
      "Payment-Receipt",
      "X-Payment-Rail",
      "X-Free-Tier-Remaining",
      "Mcp-Session-Id",
      "X-Request-Id",
      "Server-Timing"
    ]
  }));
  mountDiscoveryAdapter(app, registry, appConfig);
  mountRestToolsAdapter(app, {
    registry,
    config: appConfig,
    cacheStore,
    paymentLedger,
    x402Verifier,
    mppVerifier,
    ingestWorker
  });
  mountMcpHttpAdapter(app, {
    registry,
    config: appConfig,
    cacheStore,
    paymentLedger,
    x402Verifier,
    mppVerifier
  });
  return {
    app,
    config: appConfig,
    registry,
    entityService,
    ingestWorker,
    cacheStore,
    entityRepo,
    sanctionsRepo
  };
}

// ../../agentum-clean-release/agentum/src/adapters/inbound/worker/schedule.ts
function scheduleRefresh(refresh, intervalMs) {
  refresh();
  const timer = setInterval(refresh, intervalMs);
  timer.unref();
  return () => clearInterval(timer);
}

// ../../agentum-clean-release/agentum/src/index.ts
var { app, config: config3, ingestWorker } = createApp();
if (config3.serviceRole === "all" || config3.serviceRole === "worker") {
  const syncSources = config3.nodeEnv === "production" ? ["ofac_sdn_live", "eu_fsf_live", "un_sc_live", "uk_fcdo_live", "sec_edgar_bulk", "lt_jar_bulk"] : ["seed_eu_us", "ofac_eu_sanctions"];
  const refresh = () => {
    ingestWorker.runSync(syncSources).then((report) => {
      for (const [source, detail] of Object.entries(report.sourceDetails)) {
        if (detail.status !== "ok")
          console.error(`[agentum:worker] ${source} refresh failed:`, detail.error);
      }
    }).catch((err) => console.error("[agentum:worker] sync error:", err));
  };
  if (config3.nodeEnv === "production") {
    scheduleRefresh(refresh, 24 * 60 * 60 * 1000);
  } else
    refresh();
}
console.log(`[agentum] starting serviceRole=${config3.serviceRole} resolverMode=${config3.resolverMode} port=${config3.port}`);
var src_default = {
  port: config3.port,
  hostname: "0.0.0.0",
  fetch(request, server) {
    const remoteAddress = server && typeof server.requestIP === "function" ? server.requestIP(request)?.address : undefined;
    return app.fetch(request, { remoteAddress });
  }
};
export {
  src_default as default
};
