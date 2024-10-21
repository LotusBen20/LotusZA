"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireDefault(require("express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _multer = _interopRequireDefault(require("multer"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _sqlite = _interopRequireDefault(require("sqlite3"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Инициализация Express
var app = (0, _express["default"])();
var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = _path["default"].dirname(_filename);
var dbFilePath = _path["default"].join(_dirname, 'db', 'database.sqlite');

// Создание базы данных и таблиц, если они не существуют
var db = new _sqlite["default"].Database(dbFilePath, function (err) {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
  } else {
    db.run("CREATE TABLE IF NOT EXISTS users (\n            id TEXT PRIMARY KEY,\n            username TEXT,\n            email TEXT,\n            password TEXT,\n            isAdmin INTEGER,\n            registeredAt TEXT,\n            balance INTEGER DEFAULT 0,\n            avatar TEXT\n        )");
    db.run("CREATE TABLE IF NOT EXISTS posts (\n            id TEXT PRIMARY KEY,\n            title TEXT,\n            description TEXT\n        )");
  }
});

// Настройка multer для загрузки изображений
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _path["default"].join(_dirname, 'public', 'uploads', 'avatars'));
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + _path["default"].extname(file.originalname));
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});

// Middleware
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"]('public'));
app.set('views', _path["default"].join(_dirname, 'views'));
app.set('view engine', 'ejs');

// Сессии
app.use((0, _expressSession["default"])({
  secret: '3xtr3m3ly$ecure#r4nd0m5ecret!',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// Проверка аутентификации
var isAuthenticated = function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Главный маршрут
app.get('/', function (req, res) {
  return res.redirect('/home');
});

// Главная страница
app.get('/home', isAuthenticated, function (req, res) {
  var userId = req.session.userId;
  db.all('SELECT * FROM posts', [], function (err, posts) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Ошибка сервера');
    }
    db.get('SELECT * FROM users WHERE id = ?', [userId], function (err, user) {
      res.render('home', {
        posts: posts,
        user: user
      });
    });
  });
});

// Страница профиля
app.get('/profile', isAuthenticated, function (req, res) {
  var userId = req.session.userId;
  db.get('SELECT * FROM users WHERE id = ?', [userId], function (err, user) {
    if (user) {
      res.render('profile', {
        user: user
      });
    } else {
      res.redirect('/login');
    }
  });
});

// Страница пополнения счета
app.get('/recharge', isAuthenticated, function (req, res) {
  var userId = req.session.userId;
  db.get('SELECT * FROM users WHERE id = ?', [userId], function (err, user) {
    if (user) {
      res.render('recharge', {
        user: user
      });
    } else {
      res.redirect('/login');
    }
  });
});

// Обработка пополнения счета
app.post('/recharge', isAuthenticated, function (req, res) {
  var _req$body = req.body,
    username = _req$body.username,
    amount = _req$body.amount;
  var userId = req.session.userId;

  // Валидация суммы
  var amountToAdd = parseInt(amount);
  if (isNaN(amountToAdd) || amountToAdd <= 0) {
    return res.status(400).send('Некорректная сумма пополнения');
  }

  // Найдите пользователя по имени
  db.get('SELECT * FROM users WHERE username = ?', [username], function (err, targetUser) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Ошибка поиска пользователя');
    }
    if (!targetUser) {
      return res.status(404).send('Пользователь не найден');
    }

    // Обновление баланса найденного пользователя
    db.run('UPDATE users SET balance = balance + ? WHERE id = ?', [amountToAdd, targetUser.id], function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Ошибка пополнения счета');
      }
      res.redirect('/profile'); // Перенаправление на страницу профиля после успешного пополнения
    });
  });
});

// Страница "О нас"
app.get('/about', isAuthenticated, function (req, res) {
  var userId = req.session.userId;
  db.get('SELECT * FROM users WHERE id = ?', [userId], function (err, user) {
    res.render('about', {
      user: user
    });
  });
});

// Админ-панель
app.get('/adminpanel', isAuthenticated, function (req, res) {
  var userId = req.session.userId;
  db.get('SELECT * FROM users WHERE id = ?', [userId], function (err, user) {
    if (user && user.isAdmin) {
      // Получение всех пользователей
      db.all('SELECT * FROM users', [], function (err, users) {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Ошибка сервера');
        }
        // Получение всех постов
        db.all('SELECT * FROM posts', [], function (err, posts) {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Ошибка сервера');
          }
          res.render('adminpanel', {
            user: user,
            users: users,
            posts: posts
          }); // Передаем пользователей и посты в шаблон
        });
      });
    } else {
      res.redirect('/home');
    }
  });
});

// Добавление поста
app.get('/add_post', isAuthenticated, function (req, res) {
  var userId = req.session.userId;
  db.get('SELECT * FROM users WHERE id = ?', [userId], function (err, user) {
    if (user) {
      res.render('add_post', {
        user: user
      });
    } else {
      res.redirect('/login');
    }
  });
});
app.post('/create_post', isAuthenticated, function (req, res) {
  var _req$body2 = req.body,
    title = _req$body2.title,
    description = _req$body2.description;
  if (!title || !description) {
    return res.redirect('/add_post'); // Перенаправляем на страницу добавления поста при отсутствии данных
  }
  var postId = Date.now().toString();
  db.run('INSERT INTO posts (id, title, description) VALUES (?, ?, ?)', [postId, title, description], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Ошибка добавления поста');
    }
    res.redirect('/home'); // Перенаправление на главную страницу после успешного добавления
  });
});

// Обработка создания поста
app.post('/add_post', isAuthenticated, function (req, res) {
  var _req$body3 = req.body,
    title = _req$body3.title,
    description = _req$body3.description;
  var postId = Date.now().toString();
  if (!title || !description) {
    return res.redirect('/add_post'); // Перенаправляем на страницу добавления поста при отсутствии данных
  }
  db.run('INSERT INTO posts (id, title, description) VALUES (?, ?, ?)', [postId, title, description], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Ошибка при создании поста');
    }
    res.redirect('/home');
  });
});

// Удаление поста
app.post('/delete_post', isAuthenticated, function (req, res) {
  var postId = req.body.postId;

  // Удаление поста из базы данных
  db.run('DELETE FROM posts WHERE id = ?', [postId], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Ошибка удаления поста');
    }
    res.redirect('/adminpanel'); // Перенаправление на админ-панель после удаления
  });
});

// Удаление пользователя
app.post('/delete_user', isAuthenticated, function (req, res) {
  var userId = req.body.userId;
  var currentUserId = req.session.userId;

  // Запрещаем удаление текущего пользователя
  if (currentUserId === userId) {
    return res.redirect('/adminpanel'); // Перенаправляем на админ-панель
  }

  // Удаление пользователя из базы данных
  db.run('DELETE FROM users WHERE id = ?', [userId], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Ошибка удаления пользователя');
    }
    res.redirect('/adminpanel'); // Перенаправление на админ-панель после удаления
  });
});

// Страница входа
app.get('/login', function (req, res) {
  return res.render('login_register');
});

// Обработка входа
app.post('/login', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body4, username_or_email, password;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body4 = req.body, username_or_email = _req$body4.username_or_email, password = _req$body4.password;
          db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username_or_email, username_or_email], /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(err, user) {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.t0 = user;
                    if (!_context.t0) {
                      _context.next = 5;
                      break;
                    }
                    _context.next = 4;
                    return _bcrypt["default"].compare(password, user.password);
                  case 4:
                    _context.t0 = _context.sent;
                  case 5:
                    if (!_context.t0) {
                      _context.next = 10;
                      break;
                    }
                    req.session.userId = user.id;
                    res.redirect('/home');
                    _context.next = 11;
                    break;
                  case 10:
                    res.redirect('/login');
                  case 11:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x3, _x4) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// Константа с ценой админки
var ADMIN_PRICE = 1000;

// Страница покупки админки
app.get('/buy_admin', isAuthenticated, function (req, res) {
  var userId = req.session.userId;
  db.get('SELECT * FROM users WHERE id = ?', [userId], function (err, user) {
    if (user) {
      res.render('buy_admin', {
        user: user,
        adminPrice: ADMIN_PRICE
      });
    } else {
      res.redirect('/login');
    }
  });
});

// Обработка покупки админки
app.post('/buy_admin', isAuthenticated, function (req, res) {
  var userId = req.session.userId;
  db.get('SELECT * FROM users WHERE id = ?', [userId], function (err, user) {
    if (user) {
      if (user.balance >= ADMIN_PRICE) {
        db.run('UPDATE users SET balance = balance - ?, isAdmin = ? WHERE id = ?', [ADMIN_PRICE, 1, userId]);
        res.redirect('/profile');
      } else {
        res.redirect('/buy_admin');
      }
    } else {
      res.redirect('/login');
    }
  });
});

// Страница регистрации
app.get('/register', function (req, res) {
  return res.render('login_register');
});

// Обработка регистрации
app.post('/register', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body5, username, email, password, hashedPassword;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body5 = req.body, username = _req$body5.username, email = _req$body5.email, password = _req$body5.password;
          if (!(!username || !email || !password)) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.redirect('/register'));
        case 3:
          _context3.next = 5;
          return _bcrypt["default"].hash(password, 10);
        case 5:
          hashedPassword = _context3.sent;
          db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], function (err, existingUser) {
            if (existingUser) {
              return res.redirect('/register');
            }
            var id = Date.now().toString();
            db.run('INSERT INTO users (id, username, email, password, isAdmin, registeredAt) VALUES (?, ?, ?, ?, ?, ?)', [id, username, email, hashedPassword, 0, new Date().toISOString()], function (err) {
              if (err) {
                console.error(err.message);
              }
              res.redirect('/login');
            });
          });
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// Обработка загрузки аватарки
app.post('/upload_avatar', isAuthenticated, upload.single('avatar'), function (req, res) {
  var userId = req.session.userId;
  if (req.file) {
    db.run('UPDATE users SET avatar = ? WHERE id = ?', ["/uploads/avatars/".concat(req.file.filename), userId]);
  }
  res.redirect('/profile');
});

// Страница редактирования профиля
app.get('/edit_profile', isAuthenticated, function (req, res) {
  var userId = req.session.userId;
  db.get('SELECT * FROM users WHERE id = ?', [userId], function (err, user) {
    if (user) {
      res.render('edit_profile', {
        user: user
      });
    } else {
      res.redirect('/login');
    }
  });
});

// Обработка обновления профиля
app.post('/update_profile', isAuthenticated, function (req, res) {
  var _req$body6 = req.body,
    username = _req$body6.username,
    email = _req$body6.email;
  var userId = req.session.userId;
  db.run('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, userId]);
  res.redirect('/profile');
});

// Страница смены пароля
app.get('/change_password', isAuthenticated, function (req, res) {
  var userId = req.session.userId;
  db.get('SELECT * FROM users WHERE id = ?', [userId], function (err, user) {
    if (user) {
      res.render('change_password', {
        user: user
      });
    } else {
      res.redirect('/login');
    }
  });
});

// Обработка смены пароля
app.post('/change_password', isAuthenticated, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body7, currentPassword, newPassword, confirmPassword, userId;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body7 = req.body, currentPassword = _req$body7.currentPassword, newPassword = _req$body7.newPassword, confirmPassword = _req$body7.confirmPassword;
          userId = req.session.userId;
          db.get('SELECT * FROM users WHERE id = ?', [userId], /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(err, user) {
              var passwordMatch, hashedPassword;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!user) {
                      _context4.next = 19;
                      break;
                    }
                    _context4.next = 3;
                    return _bcrypt["default"].compare(currentPassword, user.password);
                  case 3:
                    passwordMatch = _context4.sent;
                    if (!passwordMatch) {
                      _context4.next = 16;
                      break;
                    }
                    if (!(newPassword === confirmPassword)) {
                      _context4.next = 13;
                      break;
                    }
                    _context4.next = 8;
                    return _bcrypt["default"].hash(newPassword, 10);
                  case 8:
                    hashedPassword = _context4.sent;
                    db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
                    res.redirect('/profile');
                    _context4.next = 14;
                    break;
                  case 13:
                    res.redirect('/change_password');
                  case 14:
                    _context4.next = 17;
                    break;
                  case 16:
                    res.redirect('/change_password');
                  case 17:
                    _context4.next = 20;
                    break;
                  case 19:
                    res.redirect('/login');
                  case 20:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x9, _x10) {
              return _ref5.apply(this, arguments);
            };
          }());
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// Обработка выхода
app.post('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      return res.redirect('/home');
    }
    res.redirect('/login');
  });
});

// Обработка публикации поста
app.post('/create_post', isAuthenticated, function (req, res) {
  var _req$body8 = req.body,
    title = _req$body8.title,
    description = _req$body8.description;
  var postId = Date.now().toString();
  db.run('INSERT INTO posts (id, title, description) VALUES (?, ?, ?)', [postId, title, description]);
  res.redirect('/home');
});

// Запуск сервера
var PORT = 3000;
app.listen(PORT, function () {
  // console.log(`Сервер запущен на http://localhost:${PORT}`);
});
