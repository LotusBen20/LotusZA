import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import multer from 'multer';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';

// Инициализация Express
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, 'db', 'database.sqlite');

// Создание базы данных и таблиц, если они не существуют
const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT,
            email TEXT,
            password TEXT,
            isAdmin INTEGER,
            registeredAt TEXT,
            balance INTEGER DEFAULT 0,
            avatar TEXT
        )`);
        
        db.run(`CREATE TABLE IF NOT EXISTS posts (
            id TEXT PRIMARY KEY,
            title TEXT,
            description TEXT
        )`);
    }
});

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'uploads', 'avatars'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Сессии
app.use(session({
    secret: '3xtr3m3ly$ecure#r4nd0m5ecret!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Проверка аутентификации
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Главный маршрут
app.get('/', (req, res) => res.redirect('/home'));

// Главная страница
app.get('/home', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    db.all('SELECT * FROM posts', [], (err, posts) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Ошибка сервера');
        }
        db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
            res.render('home', { posts, user });
        });
    });
});

// Страница профиля
app.get('/profile', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (user) {
            res.render('profile', { user });
        } else {
            res.redirect('/login');
        }
    });
});

// Страница пополнения счета
app.get('/recharge', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (user) {
            res.render('recharge', { user });
        } else {
            res.redirect('/login');
        }
    });
});

// Обработка пополнения счета
app.post('/recharge', isAuthenticated, (req, res) => {
    const { username, amount } = req.body;
    const userId = req.session.userId;

    // Валидация суммы
    const amountToAdd = parseInt(amount);
    if (isNaN(amountToAdd) || amountToAdd <= 0) {
        return res.status(400).send('Некорректная сумма пополнения');
    }

    // Найдите пользователя по имени
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, targetUser) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Ошибка поиска пользователя');
        }

        if (!targetUser) {
            return res.status(404).send('Пользователь не найден');
        }

        // Обновление баланса найденного пользователя
        db.run('UPDATE users SET balance = balance + ? WHERE id = ?', [amountToAdd, targetUser.id], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Ошибка пополнения счета');
            }
            res.redirect('/profile'); // Перенаправление на страницу профиля после успешного пополнения
        });
    });
});

// Страница "О нас"
app.get('/about', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        res.render('about', { user });
    });
});

// Админ-панель
app.get('/adminpanel', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (user && user.isAdmin) {
            // Получение всех пользователей
            db.all('SELECT * FROM users', [], (err, users) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Ошибка сервера');
                }
                // Получение всех постов
                db.all('SELECT * FROM posts', [], (err, posts) => {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).send('Ошибка сервера');
                    }
                    res.render('adminpanel', { user, users, posts }); // Передаем пользователей и посты в шаблон
                });
            });
        } else {
            res.redirect('/home');
        }
    });
});

// Добавление поста
app.get('/add_post', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (user) {
            res.render('add_post', { user });
        } else {
            res.redirect('/login');
        }
    });
});

app.post('/create_post', isAuthenticated, (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.redirect('/add_post'); // Перенаправляем на страницу добавления поста при отсутствии данных
    }

    const postId = Date.now().toString();

    db.run('INSERT INTO posts (id, title, description) VALUES (?, ?, ?)', [postId, title, description], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Ошибка добавления поста');
        }
        res.redirect('/home'); // Перенаправление на главную страницу после успешного добавления
    });
});

// Обработка создания поста
app.post('/add_post', isAuthenticated, (req, res) => {
    const { title, description } = req.body;
    const postId = Date.now().toString();

    if (!title || !description) {
        return res.redirect('/add_post'); // Перенаправляем на страницу добавления поста при отсутствии данных
    }

    db.run('INSERT INTO posts (id, title, description) VALUES (?, ?, ?)', [postId, title, description], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Ошибка при создании поста');
        }
        res.redirect('/home');
    });
});

// Удаление поста
app.post('/delete_post', isAuthenticated, (req, res) => {
    const { postId } = req.body;

    // Удаление поста из базы данных
    db.run('DELETE FROM posts WHERE id = ?', [postId], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Ошибка удаления поста');
        }
        res.redirect('/adminpanel'); // Перенаправление на админ-панель после удаления
    });
});

// Удаление пользователя
app.post('/delete_user', isAuthenticated, (req, res) => {
    const { userId } = req.body;
    const currentUserId = req.session.userId;

    // Запрещаем удаление текущего пользователя
    if (currentUserId === userId) {
        return res.redirect('/adminpanel'); // Перенаправляем на админ-панель
    }

    // Удаление пользователя из базы данных
    db.run('DELETE FROM users WHERE id = ?', [userId], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Ошибка удаления пользователя');
        }
        res.redirect('/adminpanel'); // Перенаправление на админ-панель после удаления
    });
});

// Страница входа
app.get('/login', (req, res) => res.render('login_register'));

// Обработка входа
app.post('/login', async (req, res) => {
    const { username_or_email, password } = req.body;
    
    db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username_or_email, username_or_email], async (err, user) => {
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id;
            res.redirect('/home');
        } else {
            res.redirect('/login');
        }
    });
});

// Константа с ценой админки
const ADMIN_PRICE = 1000;

// Страница покупки админки
app.get('/buy_admin', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (user) {
            res.render('buy_admin', { user, adminPrice: ADMIN_PRICE });
        } else {
            res.redirect('/login');
        }
    });
});

// Обработка покупки админки
app.post('/buy_admin', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
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
app.get('/register', (req, res) => res.render('login_register'));

// Обработка регистрации
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.redirect('/register');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
  
    db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, existingUser) => {
        if (existingUser) {
            return res.redirect('/register');
        }

        const id = Date.now().toString();
        db.run('INSERT INTO users (id, username, email, password, isAdmin, registeredAt) VALUES (?, ?, ?, ?, ?, ?)', 
            [id, username, email, hashedPassword, 0, new Date().toISOString()], (err) => {
                if (err) {
                    console.error(err.message);
                }
                res.redirect('/login');
            });
    });
});

// Обработка загрузки аватарки
app.post('/upload_avatar', isAuthenticated, upload.single('avatar'), (req, res) => {
    const userId = req.session.userId;
    if (req.file) {
        db.run('UPDATE users SET avatar = ? WHERE id = ?', [`/uploads/avatars/${req.file.filename}`, userId]);
    }
    res.redirect('/profile');
});

// Страница редактирования профиля
app.get('/edit_profile', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (user) {
            res.render('edit_profile', { user });
        } else {
            res.redirect('/login');
        }
    });
});

// Обработка обновления профиля
app.post('/update_profile', isAuthenticated, (req, res) => {
    const { username, email } = req.body;
    const userId = req.session.userId;

    db.run('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, userId]);
    res.redirect('/profile');
});

// Страница смены пароля
app.get('/change_password', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (user) {
            res.render('change_password', { user });
        } else {
            res.redirect('/login');
        }
    });
});

// Обработка смены пароля
app.post('/change_password', isAuthenticated, async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.session.userId;

    db.get('SELECT * FROM users WHERE id = ?', [userId], async (err, user) => {
        if (user) {
            const passwordMatch = await bcrypt.compare(currentPassword, user.password);

            if (passwordMatch) {
                if (newPassword === confirmPassword) {
                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                    db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
                    res.redirect('/profile');
                } else {
                    res.redirect('/change_password');
                }
            } else {
                res.redirect('/change_password');
            }
        } else {
            res.redirect('/login');
        }
    });
});

// Обработка выхода
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }
        res.redirect('/login');
    });
});

// Обработка публикации поста
app.post('/create_post', isAuthenticated, (req, res) => {
    const { title, description } = req.body;
    const postId = Date.now().toString();

    db.run('INSERT INTO posts (id, title, description) VALUES (?, ?, ?)', [postId, title, description]);
    res.redirect('/home');
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    // console.log(`Сервер запущен на http://localhost:${PORT}`);
});
