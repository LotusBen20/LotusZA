// Получаем элементы
const modal = document.getElementById('uploadAvatarModal');
const btn = document.getElementById("myBtn");
const closeBtn = document.getElementsByClassName("close")[0];

// Функция для открытия модального окна
const openModal = () => {
    modal.classList.add('show'); // Добавляем класс для показа
    modal.classList.remove('hide'); // Убираем класс скрытия
    modal.setAttribute('aria-hidden', 'false'); // Для доступности
};

// Функция для закрытия модального окна
const closeModal = () => {
    modal.classList.add('hide'); // Добавляем класс скрытия
    modal.classList.remove('show'); // Убираем класс показа
    modal.setAttribute('aria-hidden', 'true'); // Для доступности
};

// Открытие модального окна
btn.onclick = openModal;

// Закрытие модального окна при нажатии на элемент с классом "close"
closeBtn.onclick = closeModal;

// Закрытие модального окна при клике вне его
window.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
};

// Закрытие модального окна при нажатии клавиши Escape
window.onkeydown = (event) => {
    if (event.key === "Escape" && modal.classList.contains('show')) {
        closeModal();
    }
};
