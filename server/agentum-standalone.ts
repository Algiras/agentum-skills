// @bun
// node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || undefined;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/hono/dist/http-exception.js
var HTTPException = class extends Error {
  res;
  status;
  constructor(status = 500, options) {
    super(options?.message, { cause: options?.cause });
    this.res = options?.res;
    this.status = status;
  }
  getResponse() {
    if (this.res) {
      const newResponse = new Response(this.res.body, {
        status: this.status,
        headers: this.res.headers
      });
      return newResponse;
    }
    return new Response(this.message, {
      status: this.status
    });
  }
};

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== undefined) {
    if (Array.isArray(form[key])) {
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
};
var handleParsingNestedValues = (form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
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
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1;i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1;j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match[1], new RegExp(`^${match[2]}(?=/${next})`)] : [label, match[1], new RegExp(`^${match[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match[1], true];
      }
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
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? undefined : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(keyIndex + 1, valueIndex === -1 ? nextKeyIndex === -1 ? undefined : nextKeyIndex : valueIndex);
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? undefined : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
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
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== undefined) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
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
    if (name) {
      return this.raw.headers.get(name) ?? undefined;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
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
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
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

// node_modules/hono/dist/utils/html.js
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
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then((res) => Promise.all(res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))).then(() => buffer[0]));
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/hono/dist/context.js
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
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers
    });
  }
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
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
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers;
    if (value === undefined) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
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
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers;
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
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

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
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
var Hono = class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
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
      if (app.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
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
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = (request) => request;
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
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
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
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
        if (!context.finalized) {
          throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
        }
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
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(new Request(/^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`, requestInit), Env, executionCtx);
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, undefined, event.request.method));
    });
  };
};

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = (method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  };
  this.match = match2;
  return match2(method, path);
}

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class _Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== undefined) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some((k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR)) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node;
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some((k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR)) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node;
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node;
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0;; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1;i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1;j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
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
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(path === "*" ? "" : `^${path.replace(/\/\*$|([.\\+*[^\]$()])/g, (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)")}$`);
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie;
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map((route) => [!/\*|\/:/.test(route[0]), ...route]).sort(([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length);
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length;i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (;paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length;i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length;j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length;k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach((p) => re.test(p) && routes[m][p].push([handler, paramCount]));
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length;i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = undefined;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]]));
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (;i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length;i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = undefined;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = (children) => {
  for (const _ in children) {
    return true;
  }
  return false;
};
var Node2 = class _Node {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length;i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node;
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length;i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== undefined) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length;i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
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
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length;k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0;p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(handlerSets, child.#children["*"], method, params, node.#params);
              }
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
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2;
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length;i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter, new TrieRouter]
    });
  }
};

// node_modules/hono/dist/middleware/cors/index.js
var cors = (options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
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
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  };
};

// node_modules/hono/dist/middleware/body-limit/index.js
var ERROR_MESSAGE = "Payload Too Large";
var BodyLimitError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "BodyLimitError";
  }
};
var bodyLimit = (options) => {
  const onError = options.onError || (() => {
    const res = new Response(ERROR_MESSAGE, {
      status: 413
    });
    throw new HTTPException(413, { res });
  });
  const maxSize = options.maxSize;
  return async function bodyLimit2(c, next) {
    if (!c.req.raw.body) {
      return next();
    }
    const hasTransferEncoding = c.req.raw.headers.has("transfer-encoding");
    const hasContentLength = c.req.raw.headers.has("content-length");
    if (hasTransferEncoding && hasContentLength) {}
    if (hasContentLength && !hasTransferEncoding) {
      const contentLength = parseInt(c.req.raw.headers.get("content-length") || "0", 10);
      return contentLength > maxSize ? onError(c) : next();
    }
    let size = 0;
    const rawReader = c.req.raw.body.getReader();
    const reader = new ReadableStream({
      async start(controller) {
        try {
          for (;; ) {
            const { done, value } = await rawReader.read();
            if (done) {
              break;
            }
            size += value.length;
            if (size > maxSize) {
              controller.error(new BodyLimitError(ERROR_MESSAGE));
              break;
            }
            controller.enqueue(value);
          }
        } finally {
          controller.close();
        }
      }
    });
    const requestInit = { body: reader, duplex: "half" };
    c.req.raw = new Request(c.req.raw, requestInit);
    await next();
    if (c.error instanceof BodyLimitError) {
      c.res = await onError(c);
    }
  };
};

// node_modules/hono/dist/middleware/request-id/request-id.js
var requestId = ({
  limitLength = 255,
  headerName = "X-Request-Id",
  generator = () => crypto.randomUUID()
} = {}) => {
  return async function requestId2(c, next) {
    let reqId = headerName ? c.req.header(headerName) : undefined;
    if (!reqId || reqId.length > limitLength || /[^\w\-=]/.test(reqId)) {
      reqId = generator(c);
    }
    c.set("requestId", reqId);
    if (headerName) {
      c.header(headerName, reqId);
    }
    await next();
  };
};

// node_modules/hono/dist/utils/encode.js
var decodeBase64Url = (str) => {
  return decodeBase64(str.replace(/_|-/g, (m) => ({ _: "/", "-": "+" })[m] ?? m));
};
var encodeBase64Url = (buf) => encodeBase64(buf).replace(/\/|\+/g, (m) => ({ "/": "_", "+": "-" })[m] ?? m);
var encodeBase64 = (buf) => {
  let binary = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0, len = bytes.length;i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
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

// node_modules/hono/dist/middleware/secure-headers/secure-headers.js
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
  const options = { ...DEFAULT_OPTIONS, ...customOptions };
  const headersToSet = getFilteredHeaders(options);
  const callbacks = [];
  if (options.contentSecurityPolicy) {
    const [callback, value] = getCSPDirectives(options.contentSecurityPolicy);
    if (callback) {
      callbacks.push(callback);
    }
    headersToSet.push(["Content-Security-Policy", value]);
  }
  if (options.contentSecurityPolicyReportOnly) {
    const [callback, value] = getCSPDirectives(options.contentSecurityPolicyReportOnly);
    if (callback) {
      callbacks.push(callback);
    }
    headersToSet.push(["Content-Security-Policy-Report-Only", value]);
  }
  if (options.permissionsPolicy && Object.keys(options.permissionsPolicy).length > 0) {
    headersToSet.push([
      "Permissions-Policy",
      getPermissionsPolicyDirectives(options.permissionsPolicy)
    ]);
  }
  if (options.reportingEndpoints) {
    headersToSet.push(["Reporting-Endpoints", getReportingEndpoints(options.reportingEndpoints)]);
  }
  if (options.reportTo) {
    headersToSet.push(["Report-To", getReportToOptions(options.reportTo)]);
  }
  return async function secureHeaders2(ctx, next) {
    const headersToSetForReq = callbacks.length === 0 ? headersToSet : callbacks.reduce((acc, cb) => cb(ctx, acc), headersToSet);
    await next();
    setHeaders(ctx, headersToSetForReq);
    if (options?.removePoweredBy) {
      ctx.res.headers.delete("X-Powered-By");
    }
  };
};
function getFilteredHeaders(options) {
  return Object.entries(HEADERS_MAP).filter(([key]) => options[key]).map(([key, defaultValue]) => {
    const overrideValue = options[key];
    return typeof overrideValue === "string" ? [defaultValue[0], overrideValue] : defaultValue;
  });
}
function getCSPDirectives(contentSecurityPolicy) {
  const callbacks = [];
  const resultValues = [];
  for (const [directive, value] of Object.entries(contentSecurityPolicy)) {
    const valueArray = Array.isArray(value) ? value : [value];
    valueArray.forEach((value2, i) => {
      if (typeof value2 === "function") {
        const index = i * 2 + 2 + resultValues.length;
        callbacks.push((ctx, values) => {
          values[index] = value2(ctx, directive);
        });
      }
    });
    resultValues.push(directive.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (match, offset) => offset ? "-" + match.toLowerCase() : match.toLowerCase()), ...valueArray.flatMap((value2) => [" ", value2]), "; ");
  }
  resultValues.pop();
  return callbacks.length === 0 ? [undefined, resultValues.join("")] : [
    (ctx, headersToSet) => headersToSet.map((values) => {
      if (values[0] === "Content-Security-Policy" || values[0] === "Content-Security-Policy-Report-Only") {
        const clone = values[1].slice();
        callbacks.forEach((cb) => {
          cb(ctx, clone);
        });
        return [values[0], clone.join("")];
      } else {
        return values;
      }
    }),
    resultValues
  ];
}
function getPermissionsPolicyDirectives(policy) {
  return Object.entries(policy).map(([directive, value]) => {
    const kebabDirective = camelToKebab(directive);
    if (typeof value === "boolean") {
      return `${kebabDirective}=${value ? "*" : "none"}`;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return `${kebabDirective}=()`;
      }
      if (value.length === 1 && (value[0] === "*" || value[0] === "none")) {
        return `${kebabDirective}=${value[0]}`;
      }
      const allowlist = value.map((item) => ["self", "src"].includes(item) ? item : `"${item}"`);
      return `${kebabDirective}=(${allowlist.join(" ")})`;
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

// node_modules/hono/dist/middleware/timeout/index.js
var defaultTimeoutException = new HTTPException(504, {
  message: "Gateway Timeout"
});
var timeout = (duration, exception = defaultTimeoutException) => {
  return async function timeout2(context, next) {
    let timer;
    const timeoutPromise = new Promise((_, reject) => {
      timer = setTimeout(() => {
        reject(typeof exception === "function" ? exception(context) : exception);
      }, duration);
    });
    try {
      await Promise.race([next(), timeoutPromise]);
    } finally {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    }
  };
};

// node_modules/hono/dist/middleware/timing/timing.js
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
  return async function timing2(c, next) {
    const headers = [];
    const timers = /* @__PURE__ */ new Map;
    if (c.get("metric")) {
      return await next();
    }
    c.set("metric", { headers, timers });
    if (options.total) {
      startTime(c, "total", options.totalDescription);
    }
    await next();
    if (options.total) {
      endTime(c, "total");
    }
    if (options.autoEnd) {
      timers.forEach((_, key) => endTime(c, key));
    }
    const enabled = typeof options.enabled === "function" ? options.enabled(c) : options.enabled;
    if (enabled) {
      c.res.headers.append("Server-Timing", headers.join(","));
      const crossOrigin = typeof options.crossOrigin === "function" ? options.crossOrigin(c) : options.crossOrigin;
      if (crossOrigin) {
        c.res.headers.append("Timing-Allow-Origin", typeof crossOrigin === "string" ? crossOrigin : "*");
      }
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
  metrics.timers.set(name, { description, start: getTime() });
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

// src/domain/iban.ts
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

// src/domain/normalize.ts
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

// src/application/entity-service.ts
class EntityApplicationService {
  deps;
  constructor(deps) {
    this.deps = deps;
  }
  async resolveEntity(cmd) {
    const startedAt = Date.now();
    const effectiveJurisdiction = cmd.jurisdiction || cmd.country;
    const classified = classifyQuery(cmd.query, effectiveJurisdiction);
    const checkSanctionsFlag = cmd.checkSanctions !== false;
    const cleanPart = encodeURIComponent(classified.cleanedValue.toLowerCase());
    const jurPart = encodeURIComponent((effectiveJurisdiction ?? "all").toLowerCase());
    const cacheKey = `agentum:resolve:v1:${classified.type}:${cleanPart}:${jurPart}:${Boolean(cmd.verifyVat)}:${Boolean(cmd.includeParent)}:${checkSanctionsFlag}`;
    const cached = await this.deps.cacheStore.getCache(cacheKey);
    if (cached) {
      return {
        ...cached,
        modeUsed: "cache",
        latencyMs: Math.max(1, Date.now() - startedAt)
      };
    }
    let candidates = [];
    const modeUsed = this.deps.config.resolverMode;
    if (this.deps.config.resolverMode !== "live") {
      if (classified.type !== "NAME") {
        const exact = await this.deps.entityRepo.findByIdentifier(classified.type, classified.cleanedValue);
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
      const applicable = this.deps.upstreamProviders.filter((p) => p.supports(classified, effectiveJurisdiction));
      const settled = await Promise.allSettled(applicable.map((p) => p.search(classified, {
        jurisdiction: effectiveJurisdiction,
        includeParent: cmd.includeParent,
        timeoutMs: 2200
      })));
      const upstreamRecords = [];
      for (const res of settled) {
        if (res.status === "fulfilled" && Array.isArray(res.value)) {
          upstreamRecords.push(...res.value);
        }
      }
      if (upstreamRecords.length > 0) {
        await this.deps.entityRepo.upsertMany(upstreamRecords);
        const combined = [...candidates, ...upstreamRecords];
        combined.sort((a, b) => b.confidence - a.confidence);
        const seen = new Set;
        const deduplicated = [];
        for (const item of combined) {
          const key = `${item.primaryIdType}:${item.primaryIdValue}`;
          if (!seen.has(key)) {
            seen.add(key);
            deduplicated.push(item);
          }
        }
        candidates = deduplicated;
      }
    }
    const best = candidates[0] ?? null;
    let vatVerification = null;
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
    let compliance = null;
    if (cmd.checkSanctions !== false) {
      compliance = await this.deps.sanctionsRepo.screen({
        name: best?.canonicalName ?? cmd.query,
        country: best?.jurisdiction ?? cmd.jurisdiction,
        registrationNumber: best?.registrationNumber ?? best?.lei ?? undefined
      });
    }
    const result = {
      resolved: best !== null,
      confidence: best ? best.confidence : 0,
      queryType: classified.type,
      modeUsed,
      entity: best,
      compliance,
      vatVerification,
      candidates,
      latencyMs: Math.max(1, Date.now() - startedAt)
    };
    if (best !== null) {
      await this.deps.cacheStore.setCache(cacheKey, result, 3600);
    }
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
    if (vatRes) {
      vatValid = vatRes.valid;
      auditTrail.push(`[2/3] EU VIES VAT Check '${cmd.vatNumber}': ${vatValid ? "VALID (registered)" : "INVALID / UNCONFIRMED"}`);
    } else {
      auditTrail.push(`[2/3] VAT Check: Skipped (no EU VAT number provided)`);
    }
    const sanctionsHit = sanctionsRes.sanctioned === true;
    auditTrail.push(`[3/3] Sanctions Screening (OFAC/EU/UN): ${sanctionsHit ? "\uD83D\uDEA8 HIT DETECTED" : "\u2705 CLEAR"} (riskLevel=${sanctionsRes.riskLevel})`);
    let verdict = "APPROVED";
    let riskLevel = "CLEAR";
    if (sanctionsHit) {
      verdict = "REJECTED";
      riskLevel = "CRITICAL";
      auditTrail.push(`[VERDICT] \u274C REJECTED due to sanctions match on lists: ${sanctionsRes.matchedLists.join(", ")}`);
    } else if (vatValid === false) {
      verdict = "FLAGGED_FOR_REVIEW";
      riskLevel = "HIGH_RISK";
      auditTrail.push(`[VERDICT] \u26A0\uFE0F FLAGGED_FOR_REVIEW: EU VAT number was rejected or unconfirmed by VIES`);
    } else if (!entityRes.resolved || entityRes.confidence < 0.7) {
      verdict = "FLAGGED_FOR_REVIEW";
      riskLevel = "MEDIUM_RISK";
      auditTrail.push(`[VERDICT] \u26A0\uFE0F FLAGGED_FOR_REVIEW: Corporate entity identity resolution confidence is low (${Math.round(entityRes.confidence * 100)}%)`);
    } else if (sanctionsRes.riskLevel === "POTENTIAL_MATCH") {
      verdict = "FLAGGED_FOR_REVIEW";
      riskLevel = "MEDIUM_RISK";
      auditTrail.push(`[VERDICT] \u26A0\uFE0F FLAGGED_FOR_REVIEW: Near-threshold fuzzy sanctions similarity match requiring compliance review`);
    } else {
      verdict = "APPROVED";
      riskLevel = "CLEAR";
      auditTrail.push(`[VERDICT] \u2705 APPROVED: Verified corporate entity, clean sanctions record, valid VAT status`);
    }
    const baseConfidence = entityRes.confidence || 0.5;
    const vatBonus = vatValid === true ? 0.1 : vatValid === false ? -0.2 : 0;
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
      sanctionsScreening: sanctionsRes,
      auditTrail,
      evaluatedAt
    };
  }
  async verifyBankPayee(cmd) {
    return verifyBankPayee(cmd);
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

// node_modules/zod/v4/core/core.js
var NEVER = Object.freeze({
  status: "aborted"
});
function $constructor(name, initializer, params) {
  function init(inst, def) {
    if (!inst._zod) {
      Object.defineProperty(inst, "_zod", {
        value: {
          def,
          constr: _,
          traits: new Set
        },
        enumerable: false
      });
    }
    if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer(inst, def);
    const proto = _.prototype;
    const keys = Object.keys(proto);
    for (let i = 0;i < keys.length; i++) {
      const k = keys[i];
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
    var _a;
    const inst = params?.Parent ? new Definition : this;
    init(inst, def);
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
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
var $brand = Symbol("zod_brand");

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
var globalConfig = {};
function config(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}
// node_modules/zod/v4/core/util.js
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
function cached(getter) {
  const set = false;
  return {
    get value() {
      if (!set) {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
      throw new Error("cached value already set");
    }
  };
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
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepString = step.toString();
  let stepDecCount = (stepString.split(".")[1] || "").length;
  if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
    const match = stepString.match(/\d?e-(\d?)/);
    if (match?.[1]) {
      stepDecCount = Number.parseInt(match[1]);
    }
  }
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var EVALUATING = Symbol("evaluating");
function defineLazy(object, key, getter) {
  let value = undefined;
  Object.defineProperty(object, key, {
    get() {
      if (value === EVALUATING) {
        return;
      }
      if (value === undefined) {
        value = EVALUATING;
        value = getter();
      }
      return value;
    },
    set(v) {
      Object.defineProperty(object, key, {
        value: v
      });
    },
    configurable: true
  });
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
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
var allowsEval = cached(() => {
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
  return o;
}
var propertyKeyTypes = new Set(["string", "number", "symbol"]);
var primitiveTypes = new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
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
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
var NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-340282346638528860000000000000000000000, 340282346638528860000000000000000000000],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = {};
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        newShape[key] = currDef.shape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = { ...schema._zod.def.shape };
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        delete newShape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const checks = schema._zod.def.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    const existingShape = schema._zod.def.shape;
    for (const key in shape) {
      if (Object.getOwnPropertyDescriptor(existingShape, key) !== undefined) {
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
      }
    }
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to safeExtend: expected a plain object");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function merge(a, b) {
  const def = mergeDefs(a._zod.def, {
    get shape() {
      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: []
  });
  return clone(a, def);
}
function partial(Class, schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in oldShape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = Class ? new Class({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      } else {
        for (const key in oldShape) {
          shape[key] = Class ? new Class({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    },
    checks: []
  });
  return clone(schema, def);
}
function required(Class, schema, mask) {
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in shape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = new Class({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      } else {
        for (const key in oldShape) {
          shape[key] = new Class({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    }
  });
  return clone(schema, def);
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
function finalizeIssue(iss, ctx, config) {
  const full = { ...iss, path: iss.path ?? [] };
  if (!iss.message) {
    const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
    full.message = message;
  }
  delete full.inst;
  delete full.continue;
  if (!ctx?.reportInput) {
    delete full.input;
  }
  return full;
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

// node_modules/zod/v4/core/errors.js
var initializer = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false
  });
  inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false
  });
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
function flattenError(error, mapper = (issue) => issue.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error.issues) {
    if (sub.path.length > 0) {
      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
      fieldErrors[sub.path[0]].push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error, mapper = (issue) => issue.message) {
  const fieldErrors = { _errors: [] };
  const processError = (error) => {
    for (const issue of error.issues) {
      if (issue.code === "invalid_union" && issue.errors.length) {
        issue.errors.map((issues) => processError({ issues }));
      } else if (issue.code === "invalid_key") {
        processError({ issues: issue.issues });
      } else if (issue.code === "invalid_element") {
        processError({ issues: issue.issues });
      } else if (issue.path.length === 0) {
        fieldErrors._errors.push(mapper(issue));
      } else {
        let curr = fieldErrors;
        let i = 0;
        while (i < issue.path.length) {
          const el = issue.path[i];
          const terminal = i === issue.path.length - 1;
          if (!terminal) {
            curr[el] = curr[el] || { _errors: [] };
          } else {
            curr[el] = curr[el] || { _errors: [] };
            curr[el]._errors.push(mapper(issue));
          }
          curr = curr[el];
          i++;
        }
      }
    }
  };
  processError(error);
  return fieldErrors;
}

// node_modules/zod/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  if (result.issues.length) {
    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result.value;
};
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  if (result.issues.length) {
    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result.value;
};
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  return result.issues.length ? {
    success: false,
    error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? {
    success: false,
    error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
var _encode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _parse(_Err)(schema, value, ctx);
};
var _decode = (_Err) => (schema, value, _ctx) => {
  return _parse(_Err)(schema, value, _ctx);
};
var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _parseAsync(_Err)(schema, value, ctx);
};
var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _parseAsync(_Err)(schema, value, _ctx);
};
var _safeEncode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _safeParse(_Err)(schema, value, ctx);
};
var _safeDecode = (_Err) => (schema, value, _ctx) => {
  return _safeParse(_Err)(schema, value, _ctx);
};
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value, ctx);
};
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _safeParseAsync(_Err)(schema, value, _ctx);
};
// node_modules/zod/v4/core/regexes.js
var cuid = /^[cC][^\s-]{8,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version) => {
  if (!version)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^[A-Za-z0-9_-]*$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const time = timeSource({ precision: args.precision });
  const opts = ["Z"];
  if (args.local)
    opts.push("");
  if (args.offset)
    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const timeRegex = `${time}(?:${opts.join("|")})`;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var string = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;

// node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a = inst._zod).onattach ?? (_a.onattach = []);
});
var numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (def.value < curr) {
      if (def.inclusive)
        bag.maximum = def.value;
      else
        bag.exclusiveMaximum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin,
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
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (def.value > curr) {
      if (def.inclusive)
        bag.minimum = def.value;
      else
        bag.exclusiveMinimum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin,
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
  inst._zod.onattach.push((inst) => {
    var _a;
    (_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
  });
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
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
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
    if (isInt)
      bag.pattern = integer;
  });
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
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== undefined;
  });
  inst._zod.onattach.push((inst) => {
    const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
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
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== undefined;
  });
  inst._zod.onattach.push((inst) => {
    const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
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
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== undefined;
  });
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    bag.minimum = def.length;
    bag.maximum = def.length;
    bag.length = def.length;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
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
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    bag.format = def.format;
    if (def.pattern) {
      bag.patterns ?? (bag.patterns = new Set);
      bag.patterns.add(def.pattern);
    }
  });
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
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    bag.patterns ?? (bag.patterns = new Set);
    bag.patterns.add(pattern);
  });
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
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    bag.patterns ?? (bag.patterns = new Set);
    bag.patterns.add(pattern);
  });
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
  inst._zod.onattach.push((inst) => {
    const bag = inst._zod.bag;
    bag.patterns ?? (bag.patterns = new Set);
    bag.patterns.add(pattern);
  });
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

// node_modules/zod/v4/core/doc.js
class Doc {
  constructor(args = []) {
    this.content = [];
    this.indent = 0;
    if (this)
      this.args = args;
  }
  indented(fn) {
    this.indent += 1;
    fn(this);
    this.indent -= 1;
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
    const args = this?.args;
    const content = this?.content ?? [``];
    const lines = [...content.map((x) => `  ${x}`)];
    return new F(...args, lines.join(`
`));
  }
}

// node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 3,
  patch: 6
};

// node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const checks = [...inst._zod.def.checks ?? []];
  if (inst._zod.traits.has("$ZodCheck")) {
    checks.unshift(inst);
  }
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
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks) {
        if (ch._zod.def.when) {
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
            if (!isAborted)
              isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
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
  defineLazy(inst, "~standard", () => ({
    validate: (value) => {
      try {
        const r = safeParse(inst, value);
        return r.success ? { value: r.data } : { issues: r.error?.issues };
      } catch (_) {
        return safeParseAsync(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
});
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
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
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const trimmed = payload.value.trim();
      const url = new URL(trimmed);
      if (def.hostname) {
        def.hostname.lastIndex = 0;
        if (!def.hostname.test(url.hostname)) {
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
      }
      if (def.protocol) {
        def.protocol.lastIndex = 0;
        if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) {
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
      }
      if (def.normalize) {
        payload.value = url.href;
      } else {
        payload.value = trimmed;
      }
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
  def.pattern ?? (def.pattern = nanoid);
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
  inst._zod.bag.format = `ipv4`;
});
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv6`;
  inst._zod.check = (payload) => {
    try {
      new URL(`http://[${payload.value}]`);
    } catch {
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
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    const parts = payload.value.split("/");
    try {
      if (parts.length !== 2)
        throw new Error;
      const [address, prefix] = parts;
      if (!prefix)
        throw new Error;
      const prefixNum = Number(prefix);
      if (`${prefixNum}` !== prefix)
        throw new Error;
      if (prefixNum < 0 || prefixNum > 128)
        throw new Error;
      new URL(`http://[${address}]`);
    } catch {
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
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64";
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
function isValidBase64URL(data) {
  if (!base64url.test(data))
    return false;
  const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64url);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64url";
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
  inst._zod.pattern = inst._zod.bag.pattern ?? number;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : undefined : undefined;
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
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
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
    payload.value = Array(input.length);
    const proms = [];
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
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handlePropertyResult(result, final, key, input, isOptionalOut) {
  if (result.issues.length) {
    if (isOptionalOut && !(key in input)) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (result.value === undefined) {
    if (key in input) {
      final.value[key] = undefined;
    }
  } else {
    final.value[key] = result.value;
  }
}
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  for (const k of keys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    keys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const isOptionalOut = _catchall.optout === "optional";
  for (const key in input) {
    if (keySet.has(key))
      continue;
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalOut)));
    } else {
      handlePropertyResult(r, payload, key, input, isOptionalOut);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst
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
  if (!desc?.get) {
    const sh = def.shape;
    Object.defineProperty(def, "shape", {
      get: () => {
        const newSh = { ...sh };
        Object.defineProperty(def, "shape", {
          value: newSh
        });
        return newSh;
      }
    });
  }
  const _normalized = cached(() => normalizeDef(def));
  defineLazy(inst._zod, "propValues", () => {
    const shape = def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        propValues[key] ?? (propValues[key] = new Set);
        for (const v of field.values)
          propValues[key].add(v);
      }
    }
    return propValues;
  });
  const isObject2 = isObject;
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
    payload.value = {};
    const proms = [];
    const shape = value.shape;
    for (const key of value.keys) {
      const el = shape[key];
      const isOptionalOut = el._zod.optout === "optional";
      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalOut)));
      } else {
        handlePropertyResult(r, payload, key, input, isOptionalOut);
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
  };
});
var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
  $ZodObject.init(inst, def);
  const superParse = inst._zod.parse;
  const _normalized = cached(() => normalizeDef(def));
  const generateFastpass = (shape) => {
    const doc = new Doc(["shape", "payload", "ctx"]);
    const normalized = _normalized.value;
    const parseStr = (key) => {
      const k = esc(key);
      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    };
    doc.write(`const input = payload.value;`);
    const ids = Object.create(null);
    let counter = 0;
    for (const key of normalized.keys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(`const newResult = {};`);
    for (const key of normalized.keys) {
      const id = ids[key];
      const k = esc(key);
      const schema = shape[key];
      const isOptionalOut = schema?._zod?.optout === "optional";
      doc.write(`const ${id} = ${parseStr(key)};`);
      if (isOptionalOut) {
        doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      } else {
        doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    const fn = doc.compile();
    return (payload, ctx) => fn(shape, payload, ctx);
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
      return handleCatchall([], input, payload, ctx, value, inst);
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
  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : undefined);
  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined);
  defineLazy(inst._zod, "values", () => {
    if (def.options.every((o) => o._zod.values)) {
      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return;
  });
  defineLazy(inst._zod, "pattern", () => {
    if (def.options.every((o) => o._zod.pattern)) {
      const patterns = def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return;
  });
  const single = def.options.length === 1;
  const first = def.options[0]._zod.run;
  inst._zod.parse = (payload, ctx) => {
    if (single) {
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
    for (const key of sharedKeys) {
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
  for (const iss of left.issues) {
    if (iss.code === "unrecognized_keys") {
      unrecIssue ?? (unrecIssue = iss);
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).l = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  for (const iss of right.issues) {
    if (iss.code === "unrecognized_keys") {
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).r = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length && unrecIssue) {
    result.issues.push({ ...unrecIssue, keys: bothKeys });
  }
  if (aborted(result))
    return result;
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
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
  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
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
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
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
function handleOptionalResult(result, input) {
  if (result.issues.length && input === undefined) {
    return { issues: [], value: undefined };
  }
  return result;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? new Set([...def.innerType._zod.values, undefined]) : undefined;
  });
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (def.innerType._zod.optin === "optional") {
      const result = def.innerType._zod.run(payload, ctx);
      if (result instanceof Promise)
        return result.then((r) => handleOptionalResult(r, payload.value));
      return handleOptionalResult(result, payload.value);
    }
    if (payload.value === undefined) {
      return payload;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
  inst._zod.parse = (payload, ctx) => {
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : undefined;
  });
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
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
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
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
  defineLazy(inst._zod, "values", () => {
    const v = def.innerType._zod.values;
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
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result) => {
        payload.value = result.value;
        if (result.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
            },
            input: payload.value
          });
          payload.issues = [];
        }
        return payload;
      });
    }
    payload.value = result.value;
    if (result.issues.length) {
      payload.value = def.catchValue({
        ...payload,
        error: {
          issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
        },
        input: payload.value
      });
      payload.issues = [];
    }
    return payload;
  };
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
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
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
  defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
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
// node_modules/zod/v4/locales/en.js
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
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
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
// node_modules/zod/v4/core/registries.js
var _a;
var $output = Symbol("ZodOutput");
var $input = Symbol("ZodInput");

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
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;
// node_modules/zod/v4/core/api.js
function _string(Class, params) {
  return new Class({
    type: "string",
    ...normalizeParams(params)
  });
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
  return new Class({
    type: "number",
    checks: [],
    ...normalizeParams(params)
  });
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
function _superRefine(fn) {
  const ch = _check((payload) => {
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  });
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
// node_modules/zod/v4/core/to-json-schema.js
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
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    external: params?.external ?? undefined
  };
}
function process2(schema, ctx, _params = { path: [], schemaPath: [] }) {
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
      process2(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta = ctx.metadataRegistry.get(schema);
  if (meta)
    Object.assign(result.schema, meta);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && result.schema._prefault)
    (_a = result.schema).default ?? (_a.default = result.schema._prefault);
  delete result.schema._prefault;
  const _result = ctx.seen.get(schema);
  return _result.schema;
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
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
      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
    }
    if (entry[1] === root) {
      return { ref: "#" };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + defId };
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
        continue;
      }
    }
  }
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
        Object.assign(schema, refSchema);
      }
      Object.assign(schema, _cached);
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
  for (const entry of [...ctx.seen.entries()].reverse()) {
    flattenRef(entry[0]);
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
  Object.assign(result, root.def ?? root.schema);
  const defs = ctx.external?.defs ?? {};
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (seen.def && seen.defId) {
      defs[seen.defId] = seen.def;
    }
  }
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
  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") {
    return isTransforming(def.innerType, ctx);
  }
  if (def.type === "intersection") {
    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  }
  if (def.type === "record" || def.type === "map") {
    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  }
  if (def.type === "pipe") {
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
  process2(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
  const { libraryOptions, target } = params ?? {};
  const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
  process2(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
// node_modules/zod/v4/core/json-schema-processors.js
var formatMap = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
};
var stringProcessor = (schema, ctx, _json, _params) => {
  const json = _json;
  json.type = "string";
  const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
  if (typeof minimum === "number")
    json.minLength = minimum;
  if (typeof maximum === "number")
    json.maxLength = maximum;
  if (format) {
    json.format = formatMap[format] ?? format;
    if (json.format === "")
      delete json.format;
    if (format === "time") {
      delete json.format;
    }
  }
  if (contentEncoding)
    json.contentEncoding = contentEncoding;
  if (patterns && patterns.size > 0) {
    const regexes = [...patterns];
    if (regexes.length === 1)
      json.pattern = regexes[0].source;
    else if (regexes.length > 1) {
      json.allOf = [
        ...regexes.map((regex) => ({
          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
          pattern: regex.source
        }))
      ];
    }
  }
};
var numberProcessor = (schema, ctx, _json, _params) => {
  const json = _json;
  const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
  if (typeof format === "string" && format.includes("int"))
    json.type = "integer";
  else
    json.type = "number";
  if (typeof exclusiveMinimum === "number") {
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.minimum = exclusiveMinimum;
      json.exclusiveMinimum = true;
    } else {
      json.exclusiveMinimum = exclusiveMinimum;
    }
  }
  if (typeof minimum === "number") {
    json.minimum = minimum;
    if (typeof exclusiveMinimum === "number" && ctx.target !== "draft-04") {
      if (exclusiveMinimum >= minimum)
        delete json.minimum;
      else
        delete json.exclusiveMinimum;
    }
  }
  if (typeof exclusiveMaximum === "number") {
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.maximum = exclusiveMaximum;
      json.exclusiveMaximum = true;
    } else {
      json.exclusiveMaximum = exclusiveMaximum;
    }
  }
  if (typeof maximum === "number") {
    json.maximum = maximum;
    if (typeof exclusiveMaximum === "number" && ctx.target !== "draft-04") {
      if (exclusiveMaximum <= maximum)
        delete json.maximum;
      else
        delete json.exclusiveMaximum;
    }
  }
  if (typeof multipleOf === "number")
    json.multipleOf = multipleOf;
};
var booleanProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var bigintProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("BigInt cannot be represented in JSON Schema");
  }
};
var symbolProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Symbols cannot be represented in JSON Schema");
  }
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
var undefinedProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Undefined cannot be represented in JSON Schema");
  }
};
var voidProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Void cannot be represented in JSON Schema");
  }
};
var neverProcessor = (_schema, _ctx, json, _params) => {
  json.not = {};
};
var anyProcessor = (_schema, _ctx, _json, _params) => {};
var unknownProcessor = (_schema, _ctx, _json, _params) => {};
var dateProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Date cannot be represented in JSON Schema");
  }
};
var enumProcessor = (schema, _ctx, json, _params) => {
  const def = schema._zod.def;
  const values = getEnumValues(def.entries);
  if (values.every((v) => typeof v === "number"))
    json.type = "number";
  if (values.every((v) => typeof v === "string"))
    json.type = "string";
  json.enum = values;
};
var literalProcessor = (schema, ctx, json, _params) => {
  const def = schema._zod.def;
  const vals = [];
  for (const val of def.values) {
    if (val === undefined) {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
      }
    } else if (typeof val === "bigint") {
      if (ctx.unrepresentable === "throw") {
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      } else {
        vals.push(Number(val));
      }
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
var nanProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("NaN cannot be represented in JSON Schema");
  }
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
  const file = {
    type: "string",
    format: "binary",
    contentEncoding: "binary"
  };
  const { minimum, maximum, mime } = schema._zod.bag;
  if (minimum !== undefined)
    file.minLength = minimum;
  if (maximum !== undefined)
    file.maxLength = maximum;
  if (mime) {
    if (mime.length === 1) {
      file.contentMediaType = mime[0];
      Object.assign(_json, file);
    } else {
      Object.assign(_json, file);
      _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
    }
  } else {
    Object.assign(_json, file);
  }
};
var successProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var customProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Custom types cannot be represented in JSON Schema");
  }
};
var functionProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Function types cannot be represented in JSON Schema");
  }
};
var transformProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Transforms cannot be represented in JSON Schema");
  }
};
var mapProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Map cannot be represented in JSON Schema");
  }
};
var setProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Set cannot be represented in JSON Schema");
  }
};
var arrayProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json.minItems = minimum;
  if (typeof maximum === "number")
    json.maxItems = maximum;
  json.type = "array";
  json.items = process2(def.element, ctx, { ...params, path: [...params.path, "items"] });
};
var objectProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "object";
  json.properties = {};
  const shape = def.shape;
  for (const key in shape) {
    json.properties[key] = process2(shape[key], ctx, {
      ...params,
      path: [...params.path, "properties", key]
    });
  }
  const allKeys = new Set(Object.keys(shape));
  const requiredKeys = new Set([...allKeys].filter((key) => {
    const v = def.shape[key]._zod;
    if (ctx.io === "input") {
      return v.optin === undefined;
    } else {
      return v.optout === undefined;
    }
  }));
  if (requiredKeys.size > 0) {
    json.required = Array.from(requiredKeys);
  }
  if (def.catchall?._zod.def.type === "never") {
    json.additionalProperties = false;
  } else if (!def.catchall) {
    if (ctx.io === "output")
      json.additionalProperties = false;
  } else if (def.catchall) {
    json.additionalProperties = process2(def.catchall, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
};
var unionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const isExclusive = def.inclusive === false;
  const options = def.options.map((x, i) => process2(x, ctx, {
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
  const a = process2(def.left, ctx, {
    ...params,
    path: [...params.path, "allOf", 0]
  });
  const b = process2(def.right, ctx, {
    ...params,
    path: [...params.path, "allOf", 1]
  });
  const isSimpleIntersection = (val) => ("allOf" in val) && Object.keys(val).length === 1;
  const allOf = [
    ...isSimpleIntersection(a) ? a.allOf : [a],
    ...isSimpleIntersection(b) ? b.allOf : [b]
  ];
  json.allOf = allOf;
};
var tupleProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "array";
  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
  const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
  const prefixItems = def.items.map((x, i) => process2(x, ctx, {
    ...params,
    path: [...params.path, prefixPath, i]
  }));
  const rest = def.rest ? process2(def.rest, ctx, {
    ...params,
    path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
  }) : null;
  if (ctx.target === "draft-2020-12") {
    json.prefixItems = prefixItems;
    if (rest) {
      json.items = rest;
    }
  } else if (ctx.target === "openapi-3.0") {
    json.items = {
      anyOf: prefixItems
    };
    if (rest) {
      json.items.anyOf.push(rest);
    }
    json.minItems = prefixItems.length;
    if (!rest) {
      json.maxItems = prefixItems.length;
    }
  } else {
    json.items = prefixItems;
    if (rest) {
      json.additionalItems = rest;
    }
  }
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json.minItems = minimum;
  if (typeof maximum === "number")
    json.maxItems = maximum;
};
var recordProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "object";
  const keyType = def.keyType;
  const keyBag = keyType._zod.bag;
  const patterns = keyBag?.patterns;
  if (def.mode === "loose" && patterns && patterns.size > 0) {
    const valueSchema = process2(def.valueType, ctx, {
      ...params,
      path: [...params.path, "patternProperties", "*"]
    });
    json.patternProperties = {};
    for (const pattern of patterns) {
      json.patternProperties[pattern.source] = valueSchema;
    }
  } else {
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json.propertyNames = process2(def.keyType, ctx, {
        ...params,
        path: [...params.path, "propertyNames"]
      });
    }
    json.additionalProperties = process2(def.valueType, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
  const keyValues = keyType._zod.values;
  if (keyValues) {
    const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
    if (validKeyValues.length > 0) {
      json.required = validKeyValues;
    }
  }
};
var nullableProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const inner = process2(def.innerType, ctx, params);
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
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var defaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json.default = JSON.parse(JSON.stringify(def.defaultValue));
};
var prefaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  if (ctx.io === "input")
    json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
var catchProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  let catchValue;
  try {
    catchValue = def.catchValue(undefined);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  json.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  const innerType = ctx.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
  process2(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json.readOnly = true;
};
var promiseProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var optionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
  const innerType = schema._zod.innerType;
  process2(innerType, ctx, params);
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
      process2(schema, ctx);
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
      schemas[key] = finalize(ctx, schema);
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
  process2(input, ctx);
  extractDefs(ctx, input);
  return finalize(ctx, input);
}
// node_modules/zod/v4/classic/iso.js
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function datetime2(params) {
  return _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function date2(params) {
  return _isoDate(ZodISODate, params);
}
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function time2(params) {
  return _isoTime(ZodISOTime, params);
}
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function duration2(params) {
  return _isoDuration(ZodISODuration, params);
}

// node_modules/zod/v4/classic/errors.js
var initializer2 = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  Object.defineProperties(inst, {
    format: {
      value: (mapper) => formatError(inst, mapper)
    },
    flatten: {
      value: (mapper) => flattenError(inst, mapper)
    },
    addIssue: {
      value: (issue) => {
        inst.issues.push(issue);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
    },
    addIssues: {
      value: (issues) => {
        inst.issues.push(...issues);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
    },
    isEmpty: {
      get() {
        return inst.issues.length === 0;
      }
    }
  });
};
var ZodError = $constructor("ZodError", initializer2);
var ZodRealError = $constructor("ZodError", initializer2, {
  Parent: Error
});

// node_modules/zod/v4/classic/parse.js
var parse3 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode = /* @__PURE__ */ _encode(ZodRealError);
var decode = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// node_modules/zod/v4/classic/schemas.js
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  $ZodType.init(inst, def);
  Object.assign(inst["~standard"], {
    jsonSchema: {
      input: createStandardJSONSchemaMethod(inst, "input"),
      output: createStandardJSONSchemaMethod(inst, "output")
    }
  });
  inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
  inst.def = def;
  inst.type = def.type;
  Object.defineProperty(inst, "_def", { value: def });
  inst.check = (...checks) => {
    return inst.clone(mergeDefs(def, {
      checks: [
        ...def.checks ?? [],
        ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
      ]
    }), {
      parent: true
    });
  };
  inst.with = inst.check;
  inst.clone = (def, params) => clone(inst, def, params);
  inst.brand = () => inst;
  inst.register = (reg, meta) => {
    reg.add(inst, meta);
    return inst;
  };
  inst.parse = (data, params) => parse3(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse2(inst, data, params);
  inst.parseAsync = async (data, params) => parseAsync2(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
  inst.spa = inst.safeParseAsync;
  inst.encode = (data, params) => encode(inst, data, params);
  inst.decode = (data, params) => decode(inst, data, params);
  inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
  inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
  inst.safeEncode = (data, params) => safeEncode(inst, data, params);
  inst.safeDecode = (data, params) => safeDecode(inst, data, params);
  inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
  inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
  inst.refine = (check, params) => inst.check(refine(check, params));
  inst.superRefine = (refinement) => inst.check(superRefine(refinement));
  inst.overwrite = (fn) => inst.check(_overwrite(fn));
  inst.optional = () => optional(inst);
  inst.exactOptional = () => exactOptional(inst);
  inst.nullable = () => nullable(inst);
  inst.nullish = () => optional(nullable(inst));
  inst.nonoptional = (params) => nonoptional(inst, params);
  inst.array = () => array(inst);
  inst.or = (arg) => union([inst, arg]);
  inst.and = (arg) => intersection(inst, arg);
  inst.transform = (tx) => pipe(inst, transform(tx));
  inst.default = (def) => _default(inst, def);
  inst.prefault = (def) => prefault(inst, def);
  inst.catch = (params) => _catch(inst, params);
  inst.pipe = (target) => pipe(inst, target);
  inst.readonly = () => readonly(inst);
  inst.describe = (description) => {
    const cl = inst.clone();
    globalRegistry.add(cl, { description });
    return cl;
  };
  Object.defineProperty(inst, "description", {
    get() {
      return globalRegistry.get(inst)?.description;
    },
    configurable: true
  });
  inst.meta = (...args) => {
    if (args.length === 0) {
      return globalRegistry.get(inst);
    }
    const cl = inst.clone();
    globalRegistry.add(cl, args[0]);
    return cl;
  };
  inst.isOptional = () => inst.safeParse(undefined).success;
  inst.isNullable = () => inst.safeParse(null).success;
  inst.apply = (fn) => fn(inst);
  return inst;
});
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
  const bag = inst._zod.bag;
  inst.format = bag.format ?? null;
  inst.minLength = bag.minimum ?? null;
  inst.maxLength = bag.maximum ?? null;
  inst.regex = (...args) => inst.check(_regex(...args));
  inst.includes = (...args) => inst.check(_includes(...args));
  inst.startsWith = (...args) => inst.check(_startsWith(...args));
  inst.endsWith = (...args) => inst.check(_endsWith(...args));
  inst.min = (...args) => inst.check(_minLength(...args));
  inst.max = (...args) => inst.check(_maxLength(...args));
  inst.length = (...args) => inst.check(_length(...args));
  inst.nonempty = (...args) => inst.check(_minLength(1, ...args));
  inst.lowercase = (params) => inst.check(_lowercase(params));
  inst.uppercase = (params) => inst.check(_uppercase(params));
  inst.trim = () => inst.check(_trim());
  inst.normalize = (...args) => inst.check(_normalize(...args));
  inst.toLowerCase = () => inst.check(_toLowerCase());
  inst.toUpperCase = () => inst.check(_toUpperCase());
  inst.slugify = () => inst.check(_slugify());
});
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
  inst.email = (params) => inst.check(_email(ZodEmail, params));
  inst.url = (params) => inst.check(_url(ZodURL, params));
  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
  inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
  inst.xid = (params) => inst.check(_xid(ZodXID, params));
  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
  inst.datetime = (params) => inst.check(datetime2(params));
  inst.date = (params) => inst.check(date2(params));
  inst.time = (params) => inst.check(time2(params));
  inst.duration = (params) => inst.check(duration2(params));
});
function string2(params) {
  return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
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
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.int = (params) => inst.check(int(params));
  inst.safe = (params) => inst.check(int(params));
  inst.positive = (params) => inst.check(_gt(0, params));
  inst.nonnegative = (params) => inst.check(_gte(0, params));
  inst.negative = (params) => inst.check(_lt(0, params));
  inst.nonpositive = (params) => inst.check(_lte(0, params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  inst.step = (value, params) => inst.check(_multipleOf(value, params));
  inst.finite = () => inst;
  const bag = inst._zod.bag;
  inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
  inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
  inst.isFinite = true;
  inst.format = bag.format ?? null;
});
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
  $ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
  inst.element = def.element;
  inst.min = (minLength, params) => inst.check(_minLength(minLength, params));
  inst.nonempty = (params) => inst.check(_minLength(1, params));
  inst.max = (maxLength, params) => inst.check(_maxLength(maxLength, params));
  inst.length = (len, params) => inst.check(_length(len, params));
  inst.unwrap = () => inst.element;
});
function array(element, params) {
  return _array(ZodArray, element, params);
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  $ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
  defineLazy(inst, "shape", () => {
    return def.shape;
  });
  inst.keyof = () => _enum(Object.keys(inst._zod.def.shape));
  inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall });
  inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
  inst.strip = () => inst.clone({ ...inst._zod.def, catchall: undefined });
  inst.extend = (incoming) => {
    return extend(inst, incoming);
  };
  inst.safeExtend = (incoming) => {
    return safeExtend(inst, incoming);
  };
  inst.merge = (other) => merge(inst, other);
  inst.pick = (mask) => pick(inst, mask);
  inst.omit = (mask) => omit(inst, mask);
  inst.partial = (...args) => partial(ZodOptional, inst, args[0]);
  inst.required = (...args) => required(ZodNonOptional, inst, args[0]);
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
  inst.options = Object.values(def.entries);
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
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
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
        _issue.input ?? (_issue.input = payload.value);
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
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
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
function superRefine(fn) {
  return _superRefine(fn);
}
// node_modules/zod/v4/classic/external.js
config(en_default());
// src/application/tool-registry.ts
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

// src/domain/entity.ts
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
  "DOMAIN",
  "NAME"
]);
var ClassifiedQuerySchema = object({
  raw: string2(),
  type: IdentifierTypeSchema,
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
  officers: array(OfficerRecordSchema).optional()
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
  listSource: _enum(["OFAC_SDN", "EU_FSF"]),
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
  listSource: _enum(["OFAC_SDN", "EU_FSF"]),
  externalId: string2(),
  primaryName: string2(),
  entityType: string2(),
  programs: array(string2()),
  score: number2(),
  remarks: string2().optional()
});
var SanctionsScreenResultSchema = object({
  sanctioned: boolean2(),
  riskLevel: _enum(["CLEAR", "POTENTIAL_MATCH", "EXACT_MATCH"]),
  matchScore: number2(),
  matchedLists: array(string2()),
  matches: array(SanctionsMatchSchema)
});
var ResolveEntityCommandSchema = object({
  query: string2().min(1).describe("Company name, domain, or registration number (LEI, CIK, EIN, UK Company No, Swiss UID, ABN/ACN, UEN, JAR, VAT)"),
  jurisdiction: string2().optional().describe("Optional 2-letter ISO country code (e.g. GB, CH, AU, SG, US, LT, DE) or auto-detected"),
  country: string2().optional().describe("Alias for jurisdiction"),
  verifyVat: boolean2().optional().describe("Verify EU VAT number against live VIES if available"),
  includeParent: boolean2().optional().describe("Include parent and ultimate parent LEI relationships"),
  checkSanctions: boolean2().optional().describe("Cross-screen entity against OFAC SDN & EU Financial Sanctions (default true)"),
  includeOfficers: boolean2().optional().describe("Include corporate directors, executives, and officers when available")
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
  payeeName: string2().optional().describe("Optional legal payee name to cross-check against bank account jurisdiction")
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

// src/application/tools/entity.tools.ts
function registerEntityTools(registry, service, config) {
  registry.register(defineTool({
    id: "entity.resolve",
    mcpName: "resolve_entity",
    httpMethod: "POST",
    httpPath: "/v1/entity/resolve",
    category: "entity",
    summary: "Deterministic Global Corporate Entity & Registry Resolver",
    description: "Deterministic Global Corporate Entity & Registry Resolver. Resolves official national corporate registry records, company status, and business identifiers worldwide across primary commercial jurisdictions (including US, UK, EU-27, Switzerland, Australia, Singapore, and global LEI). Accepts company names, domains, or national registration numbers with optional ISO country code.",
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

// src/config.ts
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
    freeCallsPerDay: Number.parseInt(env.FREE_CALLS_PER_DAY ?? "5", 10) || 5,
    priceEntityResolveUsd: env.PRICE_ENTITY_RESOLVE_USD ?? "0.005",
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
    adminSyncToken: env.ADMIN_SYNC_TOKEN ?? "agm_sync_7c4f9b2e8a1d6f3c5e0b9a4d2f7e1c8b"
  };
}
var config2 = loadConfig();

// src/adapters/inbound/http/discovery.adapter.ts
import crypto2 from "crypto";

// node_modules/hono/dist/utils/jwt/jwa.js
var AlgorithmTypes = /* @__PURE__ */ ((AlgorithmTypes2) => {
  AlgorithmTypes2["HS256"] = "HS256";
  AlgorithmTypes2["HS384"] = "HS384";
  AlgorithmTypes2["HS512"] = "HS512";
  AlgorithmTypes2["RS256"] = "RS256";
  AlgorithmTypes2["RS384"] = "RS384";
  AlgorithmTypes2["RS512"] = "RS512";
  AlgorithmTypes2["PS256"] = "PS256";
  AlgorithmTypes2["PS384"] = "PS384";
  AlgorithmTypes2["PS512"] = "PS512";
  AlgorithmTypes2["ES256"] = "ES256";
  AlgorithmTypes2["ES384"] = "ES384";
  AlgorithmTypes2["ES512"] = "ES512";
  AlgorithmTypes2["EdDSA"] = "EdDSA";
  return AlgorithmTypes2;
})(AlgorithmTypes || {});

// node_modules/hono/dist/helper/adapter/index.js
var knownUserAgents = {
  deno: "Deno",
  bun: "Bun",
  workerd: "Cloudflare-Workers",
  node: "Node.js"
};
var getRuntimeKey = () => {
  const global = globalThis;
  const userAgentSupported = typeof navigator !== "undefined" && typeof navigator.userAgent === "string";
  if (userAgentSupported) {
    for (const [runtimeKey, userAgent] of Object.entries(knownUserAgents)) {
      if (checkUserAgentEquals(userAgent)) {
        return runtimeKey;
      }
    }
  }
  if (typeof global?.EdgeRuntime === "string") {
    return "edge-light";
  }
  if (global?.fastly !== undefined) {
    return "fastly";
  }
  if (global?.process?.release?.name === "node") {
    return "node";
  }
  return "other";
};
var checkUserAgentEquals = (platform) => {
  const userAgent = navigator.userAgent;
  return userAgent.startsWith(platform);
};

// node_modules/hono/dist/utils/jwt/types.js
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
var CryptoKeyUsage = /* @__PURE__ */ ((CryptoKeyUsage2) => {
  CryptoKeyUsage2["Encrypt"] = "encrypt";
  CryptoKeyUsage2["Decrypt"] = "decrypt";
  CryptoKeyUsage2["Sign"] = "sign";
  CryptoKeyUsage2["Verify"] = "verify";
  CryptoKeyUsage2["DeriveKey"] = "deriveKey";
  CryptoKeyUsage2["DeriveBits"] = "deriveBits";
  CryptoKeyUsage2["WrapKey"] = "wrapKey";
  CryptoKeyUsage2["UnwrapKey"] = "unwrapKey";
  return CryptoKeyUsage2;
})(CryptoKeyUsage || {});

// node_modules/hono/dist/utils/jwt/utf8.js
var utf8Encoder = new TextEncoder;
var utf8Decoder = new TextDecoder;

// node_modules/hono/dist/utils/jwt/jws.js
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
  return decodeBase64(pem.replace(/-+(BEGIN|END).*/g, "").replace(/\s/g, ""));
}
async function importPrivateKey(key, alg) {
  if (!crypto.subtle || !crypto.subtle.importKey) {
    throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
  }
  if (isCryptoKey(key)) {
    if (key.type !== "private" && key.type !== "secret") {
      throw new Error(`unexpected key type: CryptoKey.type is ${key.type}, expected private or secret`);
    }
    return key;
  }
  const usages = [CryptoKeyUsage.Sign];
  if (typeof key === "object") {
    return await crypto.subtle.importKey("jwk", key, alg, false, usages);
  }
  if (key.includes("PRIVATE")) {
    return await crypto.subtle.importKey("pkcs8", pemToBinary(key), alg, false, usages);
  }
  return await crypto.subtle.importKey("raw", utf8Encoder.encode(key), alg, false, usages);
}
async function importPublicKey(key, alg) {
  if (!crypto.subtle || !crypto.subtle.importKey) {
    throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
  }
  if (isCryptoKey(key)) {
    if (key.type === "public" || key.type === "secret") {
      return key;
    }
    key = await exportPublicJwkFrom(key);
  }
  if (typeof key === "string" && key.includes("PRIVATE")) {
    const privateKey = await crypto.subtle.importKey("pkcs8", pemToBinary(key), alg, true, [
      CryptoKeyUsage.Sign
    ]);
    key = await exportPublicJwkFrom(privateKey);
  }
  const usages = [CryptoKeyUsage.Verify];
  if (typeof key === "object") {
    return await crypto.subtle.importKey("jwk", key, alg, false, usages);
  }
  if (key.includes("PUBLIC")) {
    return await crypto.subtle.importKey("spki", pemToBinary(key), alg, false, usages);
  }
  return await crypto.subtle.importKey("raw", utf8Encoder.encode(key), alg, false, usages);
}
async function exportPublicJwkFrom(privateKey) {
  if (privateKey.type !== "private") {
    throw new Error(`unexpected key type: ${privateKey.type}`);
  }
  if (!privateKey.extractable) {
    throw new Error("unexpected private key is unextractable");
  }
  const jwk = await crypto.subtle.exportKey("jwk", privateKey);
  const { kty } = jwk;
  const { alg, e, n } = jwk;
  const { crv, x, y } = jwk;
  return { kty, alg, e, n, crv, x, y, key_ops: [CryptoKeyUsage.Verify] };
}
function getKeyAlgorithm(name) {
  switch (name) {
    case "HS256":
      return {
        name: "HMAC",
        hash: {
          name: "SHA-256"
        }
      };
    case "HS384":
      return {
        name: "HMAC",
        hash: {
          name: "SHA-384"
        }
      };
    case "HS512":
      return {
        name: "HMAC",
        hash: {
          name: "SHA-512"
        }
      };
    case "RS256":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: {
          name: "SHA-256"
        }
      };
    case "RS384":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: {
          name: "SHA-384"
        }
      };
    case "RS512":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: {
          name: "SHA-512"
        }
      };
    case "PS256":
      return {
        name: "RSA-PSS",
        hash: {
          name: "SHA-256"
        },
        saltLength: 32
      };
    case "PS384":
      return {
        name: "RSA-PSS",
        hash: {
          name: "SHA-384"
        },
        saltLength: 48
      };
    case "PS512":
      return {
        name: "RSA-PSS",
        hash: {
          name: "SHA-512"
        },
        saltLength: 64
      };
    case "ES256":
      return {
        name: "ECDSA",
        hash: {
          name: "SHA-256"
        },
        namedCurve: "P-256"
      };
    case "ES384":
      return {
        name: "ECDSA",
        hash: {
          name: "SHA-384"
        },
        namedCurve: "P-384"
      };
    case "ES512":
      return {
        name: "ECDSA",
        hash: {
          name: "SHA-512"
        },
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
  const runtime = getRuntimeKey();
  if (runtime === "node" && !!crypto.webcrypto) {
    return key instanceof crypto.webcrypto.CryptoKey;
  }
  return key instanceof CryptoKey;
}

// node_modules/hono/dist/utils/jwt/jwt.js
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
    encodedHeader = encodeJwtPart({ alg, typ: "JWT", kid: privateKey.kid });
  } else {
    encodedHeader = encodeJwtPart({ alg, typ: "JWT" });
  }
  const partialToken = `${encodedHeader}.${encodedPayload}`;
  const signaturePart = await signing(privateKey, alg, utf8Encoder.encode(partialToken));
  const signature = encodeSignaturePart(signaturePart);
  return `${partialToken}.${signature}`;
};
var verify = async (token, publicKey, algOrOptions) => {
  if (!algOrOptions) {
    throw new JwtAlgorithmRequired;
  }
  const {
    alg,
    iss,
    nbf = true,
    exp = true,
    iat = true,
    aud
  } = typeof algOrOptions === "string" ? { alg: algOrOptions } : algOrOptions;
  if (!alg) {
    throw new JwtAlgorithmRequired;
  }
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    throw new JwtTokenInvalid(token);
  }
  const { header, payload } = decode2(token);
  if (!isTokenHeader(header)) {
    throw new JwtHeaderInvalid(header);
  }
  if (header.alg !== alg) {
    throw new JwtAlgorithmMismatch(alg, header.alg);
  }
  const now = Date.now() / 1000 | 0;
  if (nbf && payload.nbf && payload.nbf > now) {
    throw new JwtTokenNotBefore(token);
  }
  if (exp && payload.exp && payload.exp <= now) {
    throw new JwtTokenExpired(token);
  }
  if (iat && payload.iat && now < payload.iat) {
    throw new JwtTokenIssuedAt(now, payload.iat);
  }
  if (iss) {
    if (!payload.iss) {
      throw new JwtTokenIssuer(iss, null);
    }
    if (typeof iss === "string" && payload.iss !== iss) {
      throw new JwtTokenIssuer(iss, payload.iss);
    }
    if (iss instanceof RegExp && !iss.test(payload.iss)) {
      throw new JwtTokenIssuer(iss, payload.iss);
    }
  }
  if (aud) {
    if (!payload.aud) {
      throw new JwtPayloadRequiresAud(payload);
    }
    const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    const matched = audiences.some((payloadAud) => aud instanceof RegExp ? aud.test(payloadAud) : typeof aud === "string" ? payloadAud === aud : Array.isArray(aud) && aud.includes(payloadAud));
    if (!matched) {
      throw new JwtTokenAudience(aud, payload.aud);
    }
  }
  const headerPayload = token.substring(0, token.lastIndexOf("."));
  const verified = await verifying(publicKey, alg, decodeBase64Url(tokenParts[2]), utf8Encoder.encode(headerPayload));
  if (!verified) {
    throw new JwtTokenSignatureMismatched(token);
  }
  return payload;
};
var symmetricAlgorithms = [
  AlgorithmTypes.HS256,
  AlgorithmTypes.HS384,
  AlgorithmTypes.HS512
];
var verifyWithJwks = async (token, options, init) => {
  const verifyOpts = options.verification || {};
  const header = decodeHeader(token);
  if (!isTokenHeader(header)) {
    throw new JwtHeaderInvalid(header);
  }
  if (!header.kid) {
    throw new JwtHeaderRequiresKid(header);
  }
  if (symmetricAlgorithms.includes(header.alg)) {
    throw new JwtSymmetricAlgorithmNotAllowed(header.alg);
  }
  if (!options.allowedAlgorithms.includes(header.alg)) {
    throw new JwtAlgorithmNotAllowed(header.alg, options.allowedAlgorithms);
  }
  if (options.jwks_uri) {
    const response = await fetch(options.jwks_uri, init);
    if (!response.ok) {
      throw new Error(`failed to fetch JWKS from ${options.jwks_uri}`);
    }
    const data = await response.json();
    if (!data.keys) {
      throw new Error('invalid JWKS response. "keys" field is missing');
    }
    if (!Array.isArray(data.keys)) {
      throw new Error('invalid JWKS response. "keys" field is not an array');
    }
    if (options.keys) {
      options.keys.push(...data.keys);
    } else {
      options.keys = data.keys;
    }
  } else if (!options.keys) {
    throw new Error('verifyWithJwks requires options for either "keys" or "jwks_uri" or both');
  }
  const matchingKey = options.keys.find((key) => key.kid === header.kid);
  if (!matchingKey) {
    throw new JwtTokenInvalid(token);
  }
  if (matchingKey.alg && matchingKey.alg !== header.alg) {
    throw new JwtAlgorithmMismatch(matchingKey.alg, header.alg);
  }
  return await verify(token, matchingKey, {
    alg: header.alg,
    ...verifyOpts
  });
};
var decode2 = (token) => {
  try {
    const [h, p] = token.split(".");
    const header = decodeJwtPart(h);
    const payload = decodeJwtPart(p);
    return {
      header,
      payload
    };
  } catch {
    throw new JwtTokenInvalid(token);
  }
};
var decodeHeader = (token) => {
  try {
    const [h] = token.split(".");
    return decodeJwtPart(h);
  } catch {
    throw new JwtTokenInvalid(token);
  }
};

// node_modules/hono/dist/utils/jwt/index.js
var Jwt = { sign, verify, decode: decode2, verifyWithJwks };

// node_modules/hono/dist/middleware/jwt/jwt.js
var verifyWithJwks2 = Jwt.verifyWithJwks;
var verify2 = Jwt.verify;
var decode3 = Jwt.decode;
var sign2 = Jwt.sign;

// src/adapters/inbound/http/discovery.adapter.ts
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
  <meta name="description" content="Deterministic Global corporate entity resolution (UK Companies House, Swiss ZEFIX, Australian ABR, Singapore ACRA, US SEC EDGAR, EU Registries, GLEIF LEI), live EU Commission VIES VAT validation, and OFAC/EU/UN sanctions screening via Streamable HTTP MCP &amp; REST with x402 v2 and Stripe/Tempo MPP micropayments." />
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
  <meta property="og:description" content="Zero-signup Streamable HTTP MCP server for deterministic corporate KYB, national registries (UK, CH, AU, SG, US, EU), VIES VAT, and OFAC sanctions resolution with inline micropayments." />
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
            documentation: `${config.publicBaseUrl}/openapi.json`,
            url: config.publicBaseUrl,
            termsOfService: `${config.publicBaseUrl}/terms`,
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
              "Australian Business Register (ABR / ABN / ACN) lookup",
              "Singapore ACRA (UEN) corporate entity directory",
              "GLEIF Legal Entity Identifier (LEI) resolution",
              "US SEC EDGAR CIK and EIN resolution",
              "Lithuania Registr\u0173 centras JAR registry lookup",
              "Deterministic legal form auto-alignment across global jurisdictions",
              "Live European Commission VIES VAT number validation",
              "OFAC SDN, EU Financial Sanctions, and UN Security Council screening",
              "Model Context Protocol (MCP) Streamable HTTP with Server-Sent Events",
              "Coinbase x402 v2 USDC on Base settlement",
              "Stripe & Tempo Machine Payments Protocol (MPP)"
            ]
          }
        ]
      })}</script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; max-width: 920px; margin: 40px auto; padding: 0 24px; line-height: 1.6; color: #1e293b; background: #fafafa; }
    header { border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; }
    h1 { font-size: 1.85rem; color: #0f172a; margin-bottom: 8px; }
    h2 { font-size: 1.25rem; color: #1e293b; margin-top: 32px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
    code, pre { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; }
    pre { padding: 14px; overflow-x: auto; background: #0f172a; color: #f8fafc; border-radius: 8px; font-size: 0.85rem; }
    pre code { background: transparent; color: inherit; padding: 0; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; background: #e0e7ff; color: #3730a3; margin-right: 6px; margin-bottom: 6px; }
    .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    ul { padding-left: 20px; }
    li { margin-bottom: 6px; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .playground-tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
    .tab-btn { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.82rem; font-weight: 500; transition: all 0.15s ease; }
    .tab-btn:hover { background: #e2e8f0; }
    .tab-btn.active { background: #2563eb; color: #fff; border-color: #2563eb; font-weight: 600; }
    .search-row { display: flex; gap: 8px; margin-bottom: 12px; }
    .search-input { flex: 1; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; }
    .btn-run { background: #0f172a; color: #fff; border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem; }
    .btn-run:hover { background: #334155; }
    .result-box { display: none; background: #0f172a; color: #f8fafc; padding: 14px; border-radius: 6px; font-family: ui-monospace, Menlo, monospace; font-size: 0.82rem; max-height: 320px; overflow-y: auto; white-space: pre-wrap; word-break: break-all; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media (max-width: 720px) { .grid-2 { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header>
    <h1>Agentum \u2014 Global Corporate Entity, VAT &amp; Sanctions Resolver</h1>
    <p>Zero-signup <strong>Streamable HTTP Model Context Protocol (MCP) Server</strong> and <strong>REST API</strong> for autonomous AI agents. Deterministic entity resolution across <strong>UK</strong> (Companies House), <strong>Switzerland</strong> (ZEFIX), <strong>Australia</strong> (ABR/ABN), <strong>Singapore</strong> (ACRA), <strong>United States</strong> (SEC EDGAR), <strong>Lithuania</strong> (JAR), and <strong>GLEIF worldwide LEI</strong>, with real-time <strong>European Commission VIES VAT validation</strong>, 26,650+ OFAC/EU/UN sanctions screening, and Dual-402 micropayments (<a href="${config.publicBaseUrl}/.well-known/x402.json">Coinbase x402 v2 USDC on Base</a> &amp; <a href="${config.publicBaseUrl}/.well-known/mpp.json">Stripe/Tempo MPP</a>).</p>
    <div style="margin-top: 10px;">
      <span class="badge">Model Context Protocol</span>
      <span class="badge">UK Companies House</span>
      <span class="badge">Swiss ZEFIX</span>
      <span class="badge">Australian ABR</span>
      <span class="badge">Singapore ACRA</span>
      <span class="badge">GLEIF Worldwide LEI</span>
      <span class="badge">US SEC EDGAR</span>
      <span class="badge">EU VIES VAT</span>
      <span class="badge">OFAC/EU/UN Sanctions</span>
      <span class="badge">LangChain &amp; CrewAI</span>
      <span class="badge">Base USDC x402</span>
    </div>
  </header>

  <h2>Interactive Live Demo (5 Free Calls / Day)</h2>
  <div class="card">
    <div class="playground-tabs">
      <button class="tab-btn active" onclick="setMode('entity', 'Rolls-Royce plc', 'GB')">\uD83C\uDDEC\uD83C\uDDE7 UK Companies House</button>
      <button class="tab-btn" onclick="setMode('entity', 'Nestle SA', 'CH')">\uD83C\uDDE8\uD83C\uDDED Swiss ZEFIX</button>
      <button class="tab-btn" onclick="setMode('entity', 'Atlassian Pty Ltd', 'AU')">\uD83C\uDDE6\uD83C\uDDFA Australian ABR</button>
      <button class="tab-btn" onclick="setMode('entity', 'Grab Holdings', 'SG')">\uD83C\uDDF8\uD83C\uDDEC Singapore ACRA</button>
      <button class="tab-btn" onclick="setMode('entity', 'Apple Inc', 'US')">\uD83C\uDDFA\uD83C\uDDF8 US SEC EDGAR</button>
      <button class="tab-btn" onclick="setMode('entity', 'Siemens AG', 'DE')">\uD83C\uDDEA\uD83C\uDDFA EU LEI / GLEIF</button>
      <button class="tab-btn" onclick="setMode('vat', 'DE129274202', '')">\uD83C\uDDEA\uD83C\uDDFA EU VIES VAT Check</button>
      <button class="tab-btn" onclick="setMode('sanctions', 'Sberbank', '')">\uD83D\uDEE1\uFE0F OFAC Sanctions Screen</button>
    </div>
    <div class="search-row">
      <input type="text" id="demoQuery" class="search-input" value="Rolls-Royce plc" placeholder="Enter company name, registration number, LEI, CIK, or VAT..." />
      <button class="btn-run" onclick="runDemo()">Resolve</button>
    </div>
    <div id="demoResult" class="result-box"></div>
  </div>
  <script>
    let currentMode = 'entity';
    let currentHint = 'GB';
    function setMode(mode, val, hint) {
      currentMode = mode;
      currentHint = hint;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('demoQuery').value = val;
    }
    async function runDemo() {
      const q = document.getElementById('demoQuery').value.trim();
      const box = document.getElementById('demoResult');
      box.style.display = 'block';
      box.textContent = 'Resolving query via live Agentum API...';
      try {
        let ep = '/v1/entity/resolve';
        let body = { query: q };
        if (currentHint) body.jurisdictionHint = currentHint;
        if (currentMode === 'vat') {
          ep = '/v1/entity/vat-verify';
          body = { vatNumber: q };
        } else if (currentMode === 'sanctions') {
          ep = '/v1/entity/sanctions-screen';
          body = { name: q };
        }
        const res = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(body)
        });
        const remaining = res.headers.get('X-Free-Tier-Remaining');
        const rail = res.headers.get('X-Payment-Rail');
        const data = await res.json();
        box.textContent = JSON.stringify({
          status: res.status,
          paymentRail: rail,
          freeTierRemainingToday: remaining,
          response: data
        }, null, 2);
      } catch (err) {
        box.textContent = 'Error: ' + err.message;
      }
    }
  </script>

  <h2>Quick Connect &amp; Integration Examples</h2>
  <div class="grid-2">
    <div class="card">
      <p><strong>Claude Code &amp; Desktop (MCP):</strong></p>
      <pre><code>claude mcp add --transport http agentum ${config.publicBaseUrl}/mcp

# Or via zero-config stdio npm bridge:
npx -y agentum-mcp</code></pre>
    </div>
    <div class="card">
      <p><strong>LangChain (TypeScript &amp; JavaScript):</strong></p>
      <pre><code>import { AgentumToolkit } from "agentum-langchain";

const toolkit = new AgentumToolkit({
  baseUrl: "${config.publicBaseUrl}"
});
const tools = toolkit.getTools();</code></pre>
    </div>
    <div class="card">
      <p><strong>LangChain / CrewAI (Python):</strong></p>
      <pre><code># pip install agentum-langchain langchain
from agentum_langchain import AgentumToolkit

toolkit = AgentumToolkit(base_url="${config.publicBaseUrl}")
agent_tools = toolkit.get_tools()</code></pre>
    </div>
    <div class="card">
      <p><strong>Vercel AI SDK / OpenAI Functions:</strong></p>
      <pre><code>import { agentumTools } from "agentum-langchain/ai-sdk";

const { resolve_entity, verify_eu_vat } = agentumTools({
  baseUrl: "${config.publicBaseUrl}"
});</code></pre>
    </div>
  </div>

  <h2>Machine &amp; Agent Discovery Coordinates</h2>
  <div class="card">
    <ul>
      <li><a href="${config.publicBaseUrl}/mcp"><strong>Streamable HTTP MCP Server:</strong> <code>${config.publicBaseUrl}/mcp</code></a></li>
      <li><a href="${config.publicBaseUrl}/.well-known/mcp.json"><strong>MCP Discovery Manifest:</strong> <code>/.well-known/mcp.json</code></a></li>
      <li><a href="${config.publicBaseUrl}/.well-known/mcp/server-card"><strong>MCP Server Card:</strong> <code>/.well-known/mcp/server-card</code></a></li>
      <li><a href="${config.publicBaseUrl}/openapi.json"><strong>OpenAPI 3.1 Spec:</strong> <code>/openapi.json</code></a></li>
      <li><a href="${config.publicBaseUrl}/.well-known/ai-plugin.json"><strong>OpenAI Actions &amp; Plugins:</strong> <code>/.well-known/ai-plugin.json</code></a></li>
      <li><a href="${config.publicBaseUrl}/.well-known/agent.json"><strong>A2A Agent Card:</strong> <code>/.well-known/agent.json</code></a></li>
      <li><a href="${config.publicBaseUrl}/.well-known/x402.json"><strong>Coinbase x402 Bazaar (Base USDC):</strong> <code>/.well-known/x402.json</code></a></li>
      <li><a href="${config.publicBaseUrl}/.well-known/mpp.json"><strong>Stripe / Tempo MPP Manifest:</strong> <code>/.well-known/mpp.json</code></a></li>
      <li><a href="${config.publicBaseUrl}/llms.txt"><strong>LLMs.txt Discovery:</strong> <code>/llms.txt</code></a> &amp; <a href="${config.publicBaseUrl}/llms-full.txt"><code>/llms-full.txt</code></a></li>
      <li><a href="${config.publicBaseUrl}/sitemap.xml"><strong>XML Sitemap:</strong> <code>/sitemap.xml</code></a></li>
      <li><a href="https://github.com/Algiras/agentum-skills"><strong>GitHub Skills &amp; Manifests:</strong> <code>Algiras/agentum-skills</code></a></li>
    </ul>
  </div>

  <h2>Supported Jurisdictions &amp; Primary Data Sources</h2>
  <div class="card">
    <ul>
      <li><strong>\uD83C\uDDEC\uD83C\uDDE7 UK Companies House:</strong> Real-time lookup of English, Welsh, Scottish, and Northern Irish company registration numbers (CRN) and canonical legal names.</li>
      <li><strong>\uD83C\uDDE8\uD83C\uDDED Swiss Federal Commercial Registry (ZEFIX):</strong> Cantonal commercial registers, legal seats, and Unique Enterprise Identifiers (UID / CHE).</li>
      <li><strong>\uD83C\uDDE6\uD83C\uDDFA Australian Business Register (ABR):</strong> Australian Business Numbers (ABN) and Australian Company Numbers (ACN) lookup.</li>
      <li><strong>\uD83C\uDDF8\uD83C\uDDEC Singapore ACRA:</strong> Accounting and Corporate Regulatory Authority Unique Entity Numbers (UEN) and entity records.</li>
      <li><strong>\uD83C\uDDFA\uD83C\uDDF8 US SEC EDGAR:</strong> Central Index Key (CIK), Employer Identification Number (EIN), and public equity tickers.</li>
      <li><strong>\uD83C\uDF10 GLEIF Worldwide:</strong> Global Legal Entity Identifier (LEI) worldwide verification across 200+ countries.</li>
      <li><strong>\uD83C\uDDF1\uD83C\uDDF9 Lithuania Registr\u0173 centras (JAR):</strong> Legal entity code (JAR) and company register.</li>
      <li><strong>\uD83C\uDDEA\uD83C\uDDFA European Commission VIES:</strong> Real-time VAT validity cross-check across all 27 EU member states.</li>
      <li><strong>\uD83D\uDEE1\uFE0F Consolidated Sanctions:</strong> Real-time screening against US Treasury OFAC SDN, European Union Financial Sanctions (EEAS), and UN Security Council Consolidated List (26,650+ records).</li>
    </ul>
  </div>
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
        description: "Deterministic global corporate entity resolution (UK Companies House, Swiss ZEFIX, Australian ABR, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI), live EU Commission VIES VAT validation, and OFAC/EU/UN sanctions screening for autonomous AI agents. Supports HTTP 402 via Coinbase x402 v2 and Stripe/Tempo MPP."
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
    description: "Deterministic Global Corporate Entity (UK Companies House, Swiss ZEFIX, Australian ABR, Singapore ACRA, US SEC EDGAR, European Registries, Worldwide GLEIF LEI), live EU VIES VAT, and OFAC/EU/UN Sanctions screening.",
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
  app.post("/oauth/register", async (c) => {
    let body = {};
    try {
      body = await c.req.json();
    } catch {}
    const clientId = `agm_client_${crypto2.randomUUID().replace(/-/g, "").slice(0, 16)}`;
    const clientSecret = `agm_secret_${crypto2.randomUUID().replace(/-/g, "")}`;
    return c.json({
      client_id: clientId,
      client_secret: clientSecret,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      client_secret_expires_at: 0,
      client_name: body.client_name ?? "MCP Agent Client",
      redirect_uris: Array.isArray(body.redirect_uris) ? body.redirect_uris : [],
      grant_types: body.grant_types ?? [
        "authorization_code",
        "refresh_token",
        "client_credentials"
      ],
      response_types: body.response_types ?? ["code"],
      token_endpoint_auth_method: body.token_endpoint_auth_method ?? "none"
    }, 201);
  });
  app.get("/oauth/authorize", (c) => {
    const redirectUri = c.req.query("redirect_uri");
    const state = c.req.query("state");
    const clientId = c.req.query("client_id") ?? "anon";
    const code = `agm_code_${clientId}_${crypto2.randomUUID().replace(/-/g, "").slice(0, 16)}`;
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
      const isLoopback = ["localhost", "127.0.0.1", "[::1]"].includes(target.hostname);
      const isAllowedHost = target.protocol === "https:" && allowedHosts.some((h) => target.hostname === h || target.hostname.endsWith(`.${h}`));
      if (!isLoopback && !isAllowedHost) {
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
    const now = Math.floor(Date.now() / 1000);
    const jti = crypto2.randomUUID();
    const secret = process.env.JWT_SECRET || crypto2.createHmac("sha256", config.adminSyncToken || "agentum-dev-only").update("agentum:jwt:v1").digest("hex");
    const accessToken = await sign2({
      iss: config.publicBaseUrl,
      sub: `agent_${jti.slice(0, 12)}`,
      jti,
      scope: "mcp:tools mcp:resources mcp:prompts",
      iat: now,
      exp: now + 31536000
    }, secret, "HS256");
    return c.json({
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: 31536000,
      refresh_token: `agm_ref_${crypto2.randomUUID().replace(/-/g, "")}`,
      scope: "mcp:tools mcp:resources mcp:prompts"
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
      description_for_human: "Resolve global companies (UK CRN, Swiss UID, Australian ABN, Singapore UEN, US SEC CIK, EU registries, LEI), validate EU VAT via VIES, and screen OFAC/EU/UN sanctions.",
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
      description: "Deterministic global corporate entity resolution (UK Companies House, Swiss ZEFIX, Australian ABR, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI), live EU VIES VAT validation, and OFAC/EU/UN sanctions screening.",
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
        examples: t.mcpName === "resolve_entity" ? ["Resolve NVIDIA CORP (US)", "Resolve Revolut Bank UAB (LT)", "Resolve Atlassian Pty Ltd (AU)", "Resolve Nestle SA (CH)"] : t.mcpName === "verify_eu_vat" ? ["Verify EU VAT IE6388047V", "Verify EU VAT LT100011706713", "Verify EU VAT DE129274202"] : ["Screen SEVERSTAL PAO against OFAC and EU sanctions"]
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
    <changefreq>${u === "" ? "daily" : "weekly"}</changefreq>
    <priority>${u === "" ? "1.0" : u.includes("llms") || u.includes("mcp") ? "0.9" : "0.7"}</priority>
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

> Deterministic global company registration resolution across national registries (UK Companies House, Swiss ZEFIX, Australian ABR, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI), live EU Commission VIES VAT validation, and OFAC/EU/UN sanctions screening.

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
- Tools: \`resolve_entity\`, \`verify_eu_vat\`, \`screen_sanctions\` (pass \`_meta: { "compact": true }\` for compact summaries + \`resource_link\`)
- Resources: \`agentum://entity/{query}/compact\`, \`agentum://entity/{query}\`, \`agentum://vat/{vatNumber}\`, \`agentum://sanctions/{name}\`, \`agentum://results/{requestId}\`, \`agentum://pricing\`, \`agentum://jurisdictions\`
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

// src/adapters/inbound/http/rest.adapter.ts
import crypto4 from "crypto";

// node_modules/hono/dist/utils/crypto.js
var sha256 = async (data) => {
  const algorithm = { name: "SHA-256", alias: "sha256" };
  const hash = await createHash(data, algorithm);
  return hash;
};
var createHash = async (data, algorithm) => {
  let sourceBuffer;
  if (ArrayBuffer.isView(data) || data instanceof ArrayBuffer) {
    sourceBuffer = data;
  } else {
    if (typeof data === "object") {
      data = JSON.stringify(data);
    }
    sourceBuffer = new TextEncoder().encode(String(data));
  }
  if (crypto && crypto.subtle) {
    const buffer = await crypto.subtle.digest({
      name: algorithm.name
    }, sourceBuffer);
    const hash = Array.prototype.map.call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2)).join("");
    return hash;
  }
  return null;
};

// node_modules/hono/dist/utils/buffer.js
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
  if (!hashFunction) {
    hashFunction = sha256;
  }
  const [sa, sb] = await Promise.all([hashFunction(a), hashFunction(b)]);
  if (sa == null || sb == null || typeof sa !== "string" || typeof sb !== "string") {
    return false;
  }
  const hashEqual = constantTimeEqualString(sa, sb);
  const originalEqual = constantTimeEqualString(a, b);
  return hashEqual && originalEqual;
};
var timingSafeEqual = async (a, b, hashFunction) => {
  if (typeof a === "string" && typeof b === "string") {
    return timingSafeEqualString(a, b, hashFunction);
  }
  if (!hashFunction) {
    hashFunction = sha256;
  }
  const [sa, sb] = await Promise.all([hashFunction(a), hashFunction(b)]);
  if (!sa || !sb || typeof sa !== "string" || typeof sb !== "string") {
    return false;
  }
  return timingSafeEqualString(sa, sb);
};

// node_modules/hono/dist/middleware/bearer-auth/index.js
var TOKEN_STRINGS = "[A-Za-z0-9._~+/-]+=*";
var PREFIX = "Bearer";
var HEADER = "Authorization";
var bearerAuth = (options) => {
  if (!(("token" in options) || ("verifyToken" in options))) {
    throw new Error('bearer auth middleware requires options for "token"');
  }
  if (!options.realm) {
    options.realm = "";
  }
  if (options.prefix === undefined) {
    options.prefix = PREFIX;
  }
  const realm = options.realm?.replace(/"/g, "\\\"");
  const prefixRegexStr = options.prefix === "" ? "" : `${options.prefix} +`;
  const regexp = new RegExp(`^${prefixRegexStr}(${TOKEN_STRINGS}) *$`, "i");
  const wwwAuthenticatePrefix = options.prefix === "" ? "" : `${options.prefix} `;
  const throwHTTPException = async (c, status, wwwAuthenticateHeader, messageOption) => {
    const wwwAuthenticateHeaderValue = typeof wwwAuthenticateHeader === "function" ? await wwwAuthenticateHeader(c) : wwwAuthenticateHeader;
    const headers = {
      "WWW-Authenticate": typeof wwwAuthenticateHeaderValue === "string" ? wwwAuthenticateHeaderValue : `${wwwAuthenticatePrefix}${Object.entries(wwwAuthenticateHeaderValue).map(([key, value]) => `${key}="${value}"`).join(",")}`
    };
    const responseMessage = typeof messageOption === "function" ? await messageOption(c) : messageOption;
    const res = typeof responseMessage === "string" ? new Response(responseMessage, { status, headers }) : new Response(JSON.stringify(responseMessage), {
      status,
      headers: {
        ...headers,
        "content-type": "application/json"
      }
    });
    throw new HTTPException(status, { res });
  };
  return async function bearerAuth2(c, next) {
    const headerToken = c.req.header(options.headerName || HEADER);
    if (!headerToken) {
      await throwHTTPException(c, 401, options.noAuthenticationHeader?.wwwAuthenticateHeader || `${wwwAuthenticatePrefix}realm="${realm}"`, options.noAuthenticationHeader?.message || options.noAuthenticationHeaderMessage || "Unauthorized");
    } else {
      const match = regexp.exec(headerToken);
      if (!match) {
        await throwHTTPException(c, 400, options.invalidAuthenticationHeader?.wwwAuthenticateHeader || `${wwwAuthenticatePrefix}error="invalid_request"`, options.invalidAuthenticationHeader?.message || options.invalidAuthenticationHeaderMessage || "Bad Request");
      } else {
        let equal = false;
        if ("verifyToken" in options) {
          equal = await options.verifyToken(match[1], c);
        } else if (typeof options.token === "string") {
          equal = await timingSafeEqual(options.token, match[1], options.hashFunction);
        } else if (Array.isArray(options.token) && options.token.length > 0) {
          for (const token of options.token) {
            if (await timingSafeEqual(token, match[1], options.hashFunction)) {
              equal = true;
              break;
            }
          }
        }
        if (!equal) {
          await throwHTTPException(c, 401, options.invalidToken?.wwwAuthenticateHeader || `${wwwAuthenticatePrefix}error="invalid_token"`, options.invalidToken?.message || options.invalidTokenMessage || "Unauthorized");
        }
      }
    }
    await next();
  };
};

// src/adapters/outbound/telemetry/railway-logger.ts
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

// src/adapters/inbound/http/dual-402.middleware.ts
import crypto3 from "crypto";
function computeCallerFingerprint(headers) {
  const normalized = {};
  for (const [key, value] of Object.entries(headers)) {
    if (value !== undefined) {
      normalized[key.toLowerCase()] = value;
    }
  }
  const raw = normalized["x-agent-id"] || normalized["x-forwarded-for"] || "anonymous-local";
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
  const x402Cred = normalizedHeaders["payment-signature"] ?? normalizedHeaders["x-payment"] ?? opts.metaPayment?.x402;
  if (x402Cred) {
    const spentKey = `agentum:spent:x402:${crypto3.createHash("sha256").update(x402Cred).digest("hex")}`;
    if (opts.config.featureReplayProtection) {
      const alreadySpent = await opts.cacheStore.getCache(spentKey);
      if (alreadySpent) {
        return {
          allowed: false,
          challenge: buildChallenge(),
          error: "Payment credential replay detected: x402 token already spent"
        };
      }
    }
    const verification = await opts.x402Verifier.verifyAndSettle(x402Cred, challengeContext);
    if (verification.verified) {
      if (opts.config.featureReplayProtection) {
        await opts.cacheStore.setCache(spentKey, true, 604800);
      }
      return { allowed: true, verification };
    }
    return {
      allowed: false,
      challenge: buildChallenge(),
      error: verification.error
    };
  }
  const authHeader = normalizedHeaders["authorization"];
  let mppCred = opts.metaPayment?.mpp;
  if (authHeader && authHeader.trim().toLowerCase().startsWith("payment ")) {
    mppCred = authHeader;
  }
  if (mppCred) {
    const spentKey = `agentum:spent:mpp:${crypto3.createHash("sha256").update(mppCred.trim()).digest("hex")}`;
    if (opts.config.featureReplayProtection) {
      const alreadySpent = await opts.cacheStore.getCache(spentKey);
      if (alreadySpent) {
        return {
          allowed: false,
          challenge: buildChallenge(),
          error: "Payment credential replay detected: MPP token already spent"
        };
      }
    }
    const verification = await opts.mppVerifier.verifyAndSettle(mppCred, challengeContext);
    if (verification.verified) {
      if (opts.config.featureReplayProtection) {
        await opts.cacheStore.setCache(spentKey, true, 604800);
      }
      return { allowed: true, verification };
    }
    return {
      allowed: false,
      challenge: buildChallenge(),
      error: verification.error
    };
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
    const fingerprint = computeCallerFingerprint(headers);
    const resource = c.req.url;
    const gate = await evaluateDual402Gate({
      config: opts.config,
      cacheStore: opts.cacheStore,
      x402Verifier: opts.x402Verifier,
      mppVerifier: opts.mppVerifier,
      fingerprint,
      priceUsd: opts.priceUsd,
      resource,
      description: opts.description,
      headers
    });
    if (!gate.allowed) {
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

// src/adapters/inbound/http/rest.adapter.ts
function mountRestToolsAdapter(app, deps) {
  for (const tool of deps.registry.getAll()) {
    const paymentGate = createDual402Middleware({
      config: deps.config,
      cacheStore: deps.cacheStore,
      x402Verifier: deps.x402Verifier,
      mppVerifier: deps.mppVerifier,
      priceUsd: tool.priceUsd,
      description: tool.summary
    });
    app.on(tool.httpMethod, tool.httpPath, paymentGate, async (c) => {
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
      const verification = c.get("paymentVerification");
      const fingerprint = c.get("callerFingerprint") ?? "anonymous";
      const startMs = Date.now();
      const result = await tool.handler(parsed.data, {
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

// src/adapters/inbound/mcp/mcp-http.adapter.ts
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
    description: "Perform an adversarial sanctions and watchlist escalation review (including Cyrillic/Greek homoglyph and alias screening) across OFAC SDN, EU Financial Sanctions, and UN Security Council lists.",
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
              instructions: `Use resolve_entity, verify_eu_vat, and screen_sanctions for authoritative global corporate entity resolution (UK, Switzerland, Australia, Singapore, US, EU, and worldwide GLEIF LEI), live EU VIES VAT validation, and OFAC/EU/UN sanctions screening. Includes ${deps.config.freeCallsPerDay} free calls/day; subsequent calls use x402 v2 or Stripe/Tempo MPP via HTTP headers or _meta.`,
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
                  description: "Coverage metadata for GLEIF LEI, US SEC EDGAR, Lithuania Registr\u0173 centras JAR, EU Commission VIES VAT, OFAC SDN, EU Financial Sanctions, and UN Security Council lists",
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
                  description: "Compact sanctions screening summary (top 3 matches) against OFAC SDN, EU Consolidated Financial Sanctions, and UN Security Council lists",
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
                      corporateRegistries: [
                        "GLEIF Global LEI Index (ISO 17442)",
                        "US SEC EDGAR Company Submissions & CIK Index",
                        "Lithuania Registr\u0173 centras (JAR Open Data)"
                      ],
                      taxRegistries: [
                        "European Commission VIES VAT Validation API (27 EU Member States)"
                      ],
                      sanctionsLists: [
                        "US Treasury OFAC Specially Designated Nationals (SDN)",
                        "European Union Consolidated Financial Sanctions (FSF)",
                        "United Nations Security Council Consolidated List (UN SC)"
                      ]
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
            const fingerprint = computeCallerFingerprint(rawHeaders);
            const gate = await evaluateDual402Gate({
              config: deps.config,
              cacheStore: deps.cacheStore,
              x402Verifier: deps.x402Verifier,
              mppVerifier: deps.mppVerifier,
              fingerprint,
              priceUsd: resolveTool.priceUsd,
              resource: `${deps.config.publicBaseUrl}${resolveTool.httpPath}`,
              description: resolveTool.summary,
              headers: rawHeaders
            });
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
            const fingerprint = computeCallerFingerprint(rawHeaders);
            const gate = await evaluateDual402Gate({
              config: deps.config,
              cacheStore: deps.cacheStore,
              x402Verifier: deps.x402Verifier,
              mppVerifier: deps.mppVerifier,
              fingerprint,
              priceUsd: vatTool.priceUsd,
              resource: `${deps.config.publicBaseUrl}${vatTool.httpPath}`,
              description: vatTool.summary,
              headers: rawHeaders
            });
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
            const fingerprint = computeCallerFingerprint(rawHeaders);
            const gate = await evaluateDual402Gate({
              config: deps.config,
              cacheStore: deps.cacheStore,
              x402Verifier: deps.x402Verifier,
              mppVerifier: deps.mppVerifier,
              fingerprint,
              priceUsd: sanctionsTool.priceUsd,
              resource: `${deps.config.publicBaseUrl}${sanctionsTool.httpPath}`,
              description: sanctionsTool.summary,
              headers: rawHeaders
            });
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
2. Evaluate all returned matches across OFAC_SDN, EU_FSF, and UN_SC, paying special attention to Cyrillic/Latin homoglyphs, transliterated aliases, and registration numbers.
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
        const fingerprint = computeCallerFingerprint(rawHeaders);
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

// src/adapters/outbound/persistence/entity-repository.adapter.ts
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
      const key = `${entity.primaryIdType}:${entity.primaryIdValue}`;
      this.entities.set(key, { ...entity });
    }
  }
  async findByIdentifier(type, value) {
    const rawVal = value.trim();
    if (!rawVal)
      return null;
    if (type === "DOMAIN") {
      const domainClean = rawVal.toLowerCase().replace(/^https?:\/\//i, "").replace(/^www\./i, "").split("/")[0];
      for (const entity of this.entities.values()) {
        if (entity.domains.some((d) => d.toLowerCase() === domainClean)) {
          return { ...entity };
        }
      }
      return null;
    }
    const valUpper = rawVal.toUpperCase();
    const cleanNoSpaces = valUpper.replace(/[\s\-. ]/g, "");
    for (const entity of this.entities.values()) {
      if (entity.primaryIdValue.toUpperCase() === valUpper || entity.primaryIdValue.toUpperCase().replace(/[\s\-. ]/g, "") === cleanNoSpaces) {
        return { ...entity };
      }
      if (entity.lei && entity.lei.toUpperCase() === valUpper) {
        return { ...entity };
      }
      if (entity.vatNumber && entity.vatNumber.toUpperCase().replace(/[\s\-. ]/g, "") === cleanNoSpaces) {
        return { ...entity };
      }
      if (entity.registrationNumber && (entity.registrationNumber.toUpperCase() === valUpper || entity.registrationNumber.toUpperCase().replace(/[\s\-. ]/g, "") === cleanNoSpaces)) {
        return { ...entity };
      }
      if (entity.taxId && (entity.taxId.toUpperCase() === valUpper || entity.taxId.toUpperCase().replace(/[\s-]/g, "") === valUpper.replace(/[\s-]/g, ""))) {
        return { ...entity };
      }
      if (entity.cik && (entity.cik.toUpperCase() === valUpper || entity.cik.replace(/^0+/, "") === valUpper.replace(/^0+/, ""))) {
        return { ...entity };
      }
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
      const key = `${entity.primaryIdType}:${entity.primaryIdValue}`;
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
  constructor(databaseUrl, initialEntities = SEED_ENTITIES) {
    this.databaseUrl = databaseUrl;
    this.memory = new InMemoryEntityRepositoryAdapter(initialEntities);
    if (databaseUrl) {
      try {
        this.sql = new Bun.SQL(databaseUrl);
      } catch {
        this.sql = null;
        this.sqlHealthy = false;
      }
    }
  }
  async findByIdentifier(type, value) {
    if (this.sql && this.sqlHealthy) {
      try {
        const cleanVal = value.trim();
        const rows = await this.sql`
          SELECT * FROM entities
          WHERE primary_id_value = ${cleanVal}
             OR lei = ${cleanVal}
             OR vat_number = ${cleanVal}
             OR registration_number = ${cleanVal}
             OR tax_id = ${cleanVal}
             OR cik = ${cleanVal}
          LIMIT 1
        `;
        if (rows && rows.length > 0) {
          return mapRowToEntity(rows[0]);
        }
      } catch {
        this.sqlHealthy = false;
      }
    }
    return this.memory.findByIdentifier(type, value);
  }
  async searchFuzzy(normalizedName, opts) {
    if (this.sql && this.sqlHealthy) {
      try {
        const limit = opts?.limit ?? 5;
        const rows = await this.sql`
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
    if (this.sql && this.sqlHealthy) {
      try {
        const dedupedMap = new Map;
        for (const e of entities) {
          const key = `${e.primaryIdType}:${e.primaryIdValue}`;
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
            id: e.id ?? `${e.primaryIdType}:${e.primaryIdValue}`,
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
          await this.sql`
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
            FROM jsonb_to_recordset(${JSON.stringify(chunk)}::jsonb) AS r(
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
            ON CONFLICT (primary_id_type, primary_id_value) DO UPDATE SET
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
      } catch {}
    }
    return memCount;
  }
  async count() {
    if (this.sql && this.sqlHealthy) {
      try {
        const rows = await this.sql`SELECT count(*)::int as count FROM entities`;
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

// src/adapters/outbound/persistence/db-schema.ts
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

// src/adapters/outbound/persistence/sanctions-repository.adapter.ts
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

class InMemorySanctionsRepositoryAdapter {
  entries = new Map;
  constructor(initialEntries = SEED_SANCTIONS) {
    for (const entry of initialEntries) {
      this.entries.set(`${entry.listSource}:${entry.externalId}`, { ...entry });
    }
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
    const riskLevel = maxScore >= 0.95 ? "EXACT_MATCH" : matches.length > 0 ? "POTENTIAL_MATCH" : "CLEAR";
    const matchedLists = Array.from(new Set(matches.map((m) => m.listSource)));
    return {
      sanctioned: matches.length > 0,
      riskLevel,
      matchScore: maxScore,
      matchedLists,
      matches
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
  async count() {
    return this.entries.size;
  }
}

class HybridPostgresSanctionsRepositoryAdapter {
  databaseUrl;
  fallback = new InMemorySanctionsRepositoryAdapter;
  sql = null;
  initPromise = null;
  constructor(databaseUrl) {
    this.databaseUrl = databaseUrl;
  }
  async ensureDb() {
    if (!this.databaseUrl)
      return null;
    if (this.sql)
      return this.sql;
    if (!this.initPromise) {
      this.initPromise = (async () => {
        try {
          const SqlCtor = globalThis.Bun?.SQL;
          if (!SqlCtor)
            return;
          const db = new SqlCtor(this.databaseUrl);
          await db.unsafe(sanctionsEntriesTable.createSql);
          this.sql = db;
        } catch {
          this.sql = null;
        }
      })();
    }
    await this.initPromise;
    return this.sql;
  }
  async screen(input) {
    const db = await this.ensureDb();
    if (!db) {
      return this.fallback.screen(input);
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
      if (matches.length === 0) {
        return this.fallback.screen(input);
      }
      const maxScore = matches[0].score;
      const riskLevel = maxScore >= 0.95 ? "EXACT_MATCH" : matches.length > 0 ? "POTENTIAL_MATCH" : "CLEAR";
      return {
        sanctioned: matches.length > 0,
        riskLevel,
        matchScore: maxScore,
        matchedLists: Array.from(new Set(matches.map((m) => m.listSource))),
        matches
      };
    } catch {
      return this.fallback.screen(input);
    }
  }
  async upsertMany(entries) {
    await this.fallback.upsertMany(entries);
    const db = await this.ensureDb();
    if (!db)
      return entries.length;
    try {
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
          FROM jsonb_to_recordset(${JSON.stringify(chunk)}::jsonb) AS r(
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
    } catch {}
    return entries.length;
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

// src/adapters/inbound/worker/ingest.adapter.ts
var DEFAULT_BULK_FEED_URLS = {
  ofacSdnCsvUrl: "https://www.treasury.gov/ofac/downloads/sdn.csv",
  euFsfSimpleCsvUrl: "https://data.opensanctions.org/datasets/latest/eu_fsf/targets.simple.csv",
  unScSimpleCsvUrl: "https://data.opensanctions.org/datasets/latest/un_sc_sanctions/targets.simple.csv",
  secCompanyTickersUrl: "https://www.sec.gov/files/company_tickers.json",
  ltJarBulkJsonUrl: "https://get.data.gov.lt/datasets/gov/rc/jar/iregistruoti/JuridinisAsmuo?limit(500)",
  gleifBulkJsonUrl: "https://api.gleif.org/api/v1/lei-records?page[size]=200&page[number]=1"
};
function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0;i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}
function parseOfacSdnCsv(csvText) {
  const entries = [];
  const lines = csvText.split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line === "\x1A")
      continue;
    const cols = parseCsvLine(line);
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
function parseOpenSanctionsSimpleCsv(csvText, listSource) {
  const entries = [];
  const lines = csvText.split(/\r?\n/);
  if (lines.length <= 1)
    return entries;
  const header = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
  const idxId = header.indexOf("id");
  const idxSchema = header.indexOf("schema");
  const idxName = header.indexOf("name");
  const idxAliases = header.indexOf("aliases");
  const idxCountries = header.indexOf("countries");
  const idxIdentifiers = header.indexOf("identifiers");
  const idxSanctions = header.indexOf("sanctions");
  for (let i = 1;i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line)
      continue;
    const cols = parseCsvLine(line);
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

class DatasetIngestWorkerAdapter {
  deps;
  fetchImpl;
  feedUrls;
  secUserAgent;
  constructor(deps) {
    this.deps = deps;
    this.fetchImpl = deps.fetchImpl ?? fetch;
    this.feedUrls = { ...DEFAULT_BULK_FEED_URLS, ...deps.feedUrls };
    this.secUserAgent = deps.secUserAgent ?? "Agentum/1.0 (algimantask@wix.com)";
  }
  async runSync(sources = ["seed_eu_us", "ofac_eu_sanctions"]) {
    const started = Date.now();
    const sourceDetails = {};
    await this.deps.entityRepo.upsertMany(SEED_ENTITIES);
    await this.deps.sanctionsRepo.upsertMany(SEED_SANCTIONS);
    const expandedSources = sources.includes("all") ? [
      "seed_eu_us",
      "ofac_eu_sanctions",
      "ofac_sdn_live",
      "eu_fsf_live",
      "un_sc_live",
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
        continue;
      }
      if (src === "ofac_sdn_live") {
        try {
          const res = await this.fetchImpl(this.feedUrls.ofacSdnCsvUrl);
          if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
          const csv = await res.text();
          const parsed = parseOfacSdnCsv(csv);
          await this.deps.sanctionsRepo.upsertMany(parsed);
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
      if (src === "eu_fsf_live" || src === "un_sc_live") {
        const listSource = src === "eu_fsf_live" ? "EU_FSF" : "UN_SC";
        const url = src === "eu_fsf_live" ? this.feedUrls.euFsfSimpleCsvUrl : this.feedUrls.unScSimpleCsvUrl;
        try {
          const res = await this.fetchImpl(url);
          if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
          const csv = await res.text();
          const parsed = parseOpenSanctionsSimpleCsv(csv, listSource);
          await this.deps.sanctionsRepo.upsertMany(parsed);
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
      if (src === "sec_edgar_bulk") {
        try {
          const res = await this.fetchImpl(this.feedUrls.secCompanyTickersUrl, {
            headers: {
              "User-Agent": this.secUserAgent,
              Accept: "application/json"
            }
          });
          if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          const parsed = parseSecCompanyTickersJson(json);
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
          const res = await this.fetchImpl(this.feedUrls.ltJarBulkJsonUrl, {
            headers: { Accept: "application/json" }
          });
          if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          const parsed = parseLithuaniaJarBulkJson(json);
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

// src/adapters/outbound/payments/mpp.adapter.ts
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
          }
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

// src/adapters/outbound/payments/x402.adapter.ts
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
    if (shouldCallFacilitator) {
      try {
        const res = await this.fetchImpl(`${this.config.x402FacilitatorUrl}/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: decoded, context: ctx })
        });
        if (!res.ok) {
          return {
            verified: false,
            rail: "X402",
            error: "Facilitator verification failed"
          };
        }
        const data = await res.json().catch(() => ({}));
        if (data.valid === false || data.verified === false || this.config.featureStrictPayments && data.valid !== true && data.verified !== true) {
          return {
            verified: false,
            rail: "X402",
            error: data.error ?? "Facilitator verification rejected"
          };
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Facilitator verification error";
        return { verified: false, rail: "X402", error: message };
      }
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
      receiptHeaderName: "PAYMENT-RESPONSE",
      receiptHeaderValue: Buffer.from(JSON.stringify(receipt)).toString("base64")
    };
  }
}

// src/adapters/outbound/persistence/quota-cache.adapter.ts
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

// src/adapters/outbound/upstreams/eu-vies.adapter.ts
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

// src/adapters/outbound/upstreams/gleif.adapter.ts
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

// src/adapters/outbound/upstreams/lithuania-jar.adapter.ts
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

// src/adapters/outbound/upstreams/sec-edgar.adapter.ts
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

// src/adapters/outbound/upstreams/uk-companies-house.adapter.ts
class UkCompaniesHouseAdapter {
  sourceName = "UK_COMPANIES_HOUSE";
  apiKey;
  fetchImpl;
  constructor(opts = {}) {
    this.apiKey = opts.apiKey ?? process.env.COMPANIES_HOUSE_API_KEY;
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }
  supports(query, jurisdiction) {
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
    const isCrn = query.type === "UK_CRN" || (/^[A-Z]{2}\d{6}$/i.test(query.cleanedValue) || /^\d{7,8}$/.test(query.cleanedValue) && (query.inferredCountry === "GB" || opts?.jurisdiction?.toUpperCase() === "GB"));
    const timeout = opts?.timeoutMs ?? 2200;
    const signal = AbortSignal.timeout(timeout);
    const headers = {
      Accept: "application/json"
    };
    if (this.apiKey) {
      headers.Authorization = `Basic ${Buffer.from(`${this.apiKey}:`).toString("base64")}`;
    }
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

// src/adapters/outbound/upstreams/swiss-zefix.adapter.ts
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

// src/adapters/outbound/upstreams/australian-abr.adapter.ts
class AustralianAbrAdapter {
  sourceName = "AU_ABR";
  guid;
  fetchImpl;
  constructor(opts = {}) {
    this.guid = opts.guid ?? process.env.ABR_GUID ?? "dummy-guid";
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }
  supports(query, jurisdiction) {
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

// src/adapters/outbound/upstreams/singapore-acra.adapter.ts
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
    if (s.includes("live") || s.includes("registered") || s.includes("active")) {
      return "ACTIVE";
    }
    if (s.includes("struck") || s.includes("dissolved") || s.includes("winding") || s.includes("liquidation") || s.includes("ceased") || s.includes("inactive")) {
      return "INACTIVE";
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

// src/app.ts
function createApp(overrides = {}, customDeps) {
  const appConfig = {
    ...loadConfig(),
    ...overrides
  };
  const fetchImpl = customDeps?.fetchImpl ?? fetch;
  const cacheStore = createQuotaAndCacheAdapter(appConfig.redisUrl);
  const entityRepo = appConfig.databaseUrl ? new HybridPostgresEntityRepositoryAdapter(appConfig.databaseUrl) : new InMemoryEntityRepositoryAdapter;
  const sanctionsRepo = appConfig.databaseUrl ? new HybridPostgresSanctionsRepositoryAdapter(appConfig.databaseUrl) : new InMemorySanctionsRepositoryAdapter;
  const upstreamProviders = [
    new GleifUpstreamAdapter(fetchImpl),
    new LithuaniaJarUpstreamAdapter(fetchImpl),
    new SecEdgarUpstreamAdapter(appConfig.secEdgarUserAgent, fetchImpl),
    new UkCompaniesHouseAdapter({ fetchImpl }),
    new SwissZefixAdapter({ fetchImpl }),
    new AustralianAbrAdapter({ fetchImpl }),
    new SingaporeAcraAdapter({ fetchImpl })
  ];
  const vatValidator = new EuViesVatAdapter(fetchImpl, appConfig.viesTimeoutMs);
  const entityService = new EntityApplicationService({
    config: appConfig,
    entityRepo,
    sanctionsRepo,
    cacheStore,
    upstreamProviders,
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
    x402Verifier,
    mppVerifier,
    ingestWorker
  });
  mountMcpHttpAdapter(app, {
    registry,
    config: appConfig,
    cacheStore,
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

// src/index.ts
var { app, config: config3, ingestWorker } = createApp();
if (config3.serviceRole === "all" || config3.serviceRole === "worker") {
  ingestWorker.runSync().catch((err) => {
    console.error("[agentum:worker] initial seed sync error:", err);
  });
}
console.log(`[agentum] starting serviceRole=${config3.serviceRole} resolverMode=${config3.resolverMode} port=${config3.port}`);
var src_default = {
  port: config3.port,
  hostname: "0.0.0.0",
  fetch: app.fetch
};
export {
  src_default as default
};
