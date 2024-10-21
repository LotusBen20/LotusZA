import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Включите это в случае, если планируете использовать Node.js в рендерере
        }
    });

    // Путь к вашему EJS файлу
    const ejsFilePath = path.join(__dirname, 'home.ejs');

    // Чтение EJS файла
    fs.readFile(ejsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения EJS файла:', err);
            return; // Если произошла ошибка, выходим
        }

        // Рендеринг EJS в HTML
        try {
            const html = ejs.render(data, {
                title: 'SlayerZA',
                // Передайте другие данные в EJS, если необходимо
            });

            // Загружаем скомпилированный HTML в окно
            win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));
        } catch (renderError) {
            console.error('Ошибка рендеринга EJS:', renderError);
        }
    });

    win.on('closed', () => {
        win = null;
    });
    win.webContents.openDevTools(); // Открывает DevTools для отладки
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
