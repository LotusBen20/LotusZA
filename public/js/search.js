document.getElementById('searchToggle').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput');
    searchInput.classList.toggle('active');
    searchInput.focus(); // Фокусируемся на поле ввода
});

// Добавление функции фильтрации постов
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
    const filter = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(filter) || description.includes(filter)) {
            card.style.display = ""; // Показываем карточку
        } else {
            card.style.display = "none"; // Скрываем карточку
        }
    });
});