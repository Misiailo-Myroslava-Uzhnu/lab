document.addEventListener('DOMContentLoaded', function () {
    const coursesTable = document.querySelector('#coursesTable tbody');
    const searchInput = document.getElementById('searchInput');
    const levelFilter = document.getElementById('levelFilter');
    const languageFilter = document.getElementById('languageFilter');
    const sortOrder = document.getElementById('sortOrder');
    const courseModal = document.getElementById('courseModal');
    const closeModal = document.getElementById('closeModal');
    const courseName = document.getElementById('courseName');
    const courseDescription = document.getElementById('courseDescription');
    const courseSyllabus = document.getElementById('courseSyllabus');

    let courses = []; 
    let filteredCourses = []; 

    const loadCourses = () => {
        const data = [
            
    {
        "courseId": "CS101",
        "name": "Введення в програмування",
        "instructor": "Олександр Іванов",
        "duration": 20,
        "level": "Початковий",
        "language": "Українська",
        "description": "Цей курс дасть вам основи програмування.",
        "syllabus": ["Змінні", "Умови", "Цикли", "Функції"]
    },
    {
        "courseId": "CS102",
        "name": "Основи веб-розробки",
        "instructor": "Марина Гриценко",
        "duration": 25,
        "level": "Початковий",
        "language": "Українська",
        "description": "Навчимо створювати веб-сайти з нуля за допомогою HTML, CSS та JavaScript.",
        "syllabus": ["HTML", "CSS", "JavaScript", "Основи DOM"]
    },
    {
        "courseId": "CS201",
        "name": "Алгоритми та структури даних",
        "instructor": "Іван Петров",
        "duration": 40,
        "level": "Середній",
        "language": "Англійська",
        "description": "Курс по вивченню ефективних алгоритмів і структур даних.",
        "syllabus": ["Сортування", "Пошук", "Бінарні дерева", "Графи"]
    },
    {
        "courseId": "CS202",
        "name": "Розробка на Python",
        "instructor": "Ірина Сидоренко",
        "duration": 30,
        "level": "Середній",
        "language": "Англійська",
        "description": "Розробка програм за допомогою Python: від основ до складних проектів.",
        "syllabus": ["Основи Python", "Функції", "Об'єктно-орієнтоване програмування", "Модулі"]
    },
    {
        "courseId": "CS301",
        "name": "Машинне навчання",
        "instructor": "Олег Коваль",
        "duration": 50,
        "level": "Високий",
        "language": "Англійська",
        "description": "Курс по машинному навчанню, використовуючи алгоритми та бібліотеки Python.",
        "syllabus": ["Вступ до машинного навчання", "Лінійна регресія", "Класифікація", "Глибоке навчання"]
    },
    {
        "courseId": "CS302",
        "name": "Глибоке навчання та нейронні мережі",
        "instructor": "Катерина Ярмоленко",
        "duration": 45,
        "level": "Високий",
        "language": "Англійська",
        "description": "Курс, який охоплює найновіші досягнення в галузі глибокого навчання.",
        "syllabus": ["Основи нейронних мереж", "Зворотне поширення помилки", "Конволюційні мережі", "Рекурентні нейронні мережі"]
    },
    {
        "courseId": "CS303",
        "name": "Мобільна розробка для Android",
        "instructor": "Анна Шевченко",
        "duration": 35,
        "level": "Середній",
        "language": "Англійська",
        "description": "Курс по розробці мобільних додатків для Android з використанням Java та Kotlin.",
        "syllabus": ["Основи Android", "Розробка інтерфейсу користувача", "Kotlin для Android", "Зберігання даних"]
    },
    {
        "courseId": "CS401",
        "name": "Безпека інформаційних систем",
        "instructor": "Владимир Мороз",
        "duration": 60,
        "level": "Високий",
        "language": "Англійська",
        "description": "Курс по вивченню захисту інформаційних систем від кіберзагроз.",
        "syllabus": ["Основи безпеки", "Шифрування", "Атаки та захист", "Міжнародні стандарти безпеки"]
    },
    {
        "courseId": "CS402",
        "name": "Адміністрування Linux-систем",
        "instructor": "Олексій Ковальчук",
        "duration": 30,
        "level": "Середній",
        "language": "Українська",
        "description": "Курс з адміністрування серверів на базі Linux.",
        "syllabus": ["Інсталяція Linux", "Основи командного рядка", "Мережеві сервіси", "Безпека Linux"]
    },
    {
        "courseId": "CS403",
        "name": "Веб-безпека",
        "instructor": "Марина Литвинова",
        "duration": 40,
        "level": "Високий",
        "language": "Англійська",
        "description": "Курс по веб-безпеці для розробників і адміністраторів веб-сайтів.",
        "syllabus": ["Основи веб-безпеки", "SQL-ін'єкції", "XSS", "Ідентифікація та автентифікація"]
    }


        ];

        try {
            // Імітуємо успішне завантаження
            console.log("Дані завантажено успішно!");
            courses = data;
            filteredCourses = data;
            renderCourses(filteredCourses);
        } catch (error) {
            console.error("Помилка завантаження курсів: ", error);
            alert("Не вдалося завантажити курси.");
        }
    };

    // Функція для рендерингу таблиці курсів
    function renderCourses(coursesList) {
        coursesTable.innerHTML = ''; // Очистка таблиці
        if (coursesList.length === 0) {
            coursesTable.innerHTML = '<tr><td colspan="6">Нічого не знайдено</td></tr>';
            return;
        }
        coursesList.forEach(course => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${course.courseId}</td>
                <td>${course.name}</td>
                <td>${course.instructor}</td>
                <td>${course.duration} год</td>
                <td>${course.level}</td>
                <td>${course.language}</td>
            `;
            tr.addEventListener('click', () => showCourseDetails(course));
            tr.addEventListener('mouseover', () => showSyllabus(course));
            tr.addEventListener('mouseout', () => hideSyllabus());
            coursesTable.appendChild(tr);
        });
    }

    // Функція для відображення деталей курсу
    function showCourseDetails(course) {
        courseName.textContent = course.name;
        courseDescription.textContent = course.description || 'Опис курсу відсутній';
        courseSyllabus.innerHTML = course.syllabus.map(topic => `<li>${topic}</li>`).join('');
        courseModal.style.display = 'flex';
    }

    // Функція для закриття модального вікна
    closeModal.addEventListener('click', () => {
        courseModal.style.display = 'none';
    });

    // Функція для показу тем курсу при наведенні
    function showSyllabus(course) {
        const tooltip = document.createElement('div');
        tooltip.className = 'syllabus-tooltip';
        tooltip.textContent = course.syllabus.join(', ');
        document.body.appendChild(tooltip);
    }

    // Функція для приховування тем курсу
    function hideSyllabus() {
        const tooltip = document.querySelector('.syllabus-tooltip');
        if (tooltip) tooltip.remove();
    }

    // Фільтрація курсів
    function filterCourses() {
        let filtered = courses;

        // Фільтрація за рівнем складності
        if (levelFilter.value) {
            filtered = filtered.filter(course => course.level === levelFilter.value);
        }

        // Фільтрація за мовою викладання
        if (languageFilter.value) {
            filtered = filtered.filter(course => course.language === languageFilter.value);
        }

        // Фільтрація за пошуком
        const searchValue = searchInput.value.toLowerCase();
        if (searchValue) {
            filtered = filtered.filter(course => 
                course.name.toLowerCase().includes(searchValue) || 
                course.instructor.toLowerCase().includes(searchValue)
            );
        }

        // Сортування
        const sortBy = sortOrder.value;
        if (sortBy === 'level') {
            filtered.sort((a, b) => a.level.localeCompare(b.level));
        } else if (sortBy === 'duration') {
            filtered.sort((a, b) => a.duration - b.duration);
        }

        renderCourses(filtered);
    }

    // Слухачі для фільтрів та пошуку
    searchInput.addEventListener('input', filterCourses);
    levelFilter.addEventListener('change', filterCourses);
    languageFilter.addEventListener('change', filterCourses);
    sortOrder.addEventListener('change', filterCourses);

    // Завантаження курсів при завантаженні сторінки
    loadCourses();
});
