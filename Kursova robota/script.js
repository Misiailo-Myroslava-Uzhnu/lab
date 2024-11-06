document.addEventListener("DOMContentLoaded", () => {
    let courses = [];
    let allCourses = [];

    // Завантаження даних з файлу courses.json
    fetch("courses.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Помилка завантаження файлу courses.json");
            }
            return response.json();
        })
        .then(data => {
            allCourses = data;
            courses = [...data]; // Зберігаємо оригінальний масив для фільтрації та сортування
            renderCourses();
        })
        .catch(error => {
            console.error("Помилка завантаження даних:", error);
            alert("Не вдалося завантажити дані курсів. Перевірте файл або сервер.");
        });

    // Рендеринг таблиці курсів
    function renderCourses() {
        const tableBody = document.querySelector("#coursesTable tbody");
        tableBody.innerHTML = ""; // очищаємо таблицю

        if (courses.length === 0) {
            document.getElementById("noResultsMessage").style.display = "block";
            return;
        } else {
            document.getElementById("noResultsMessage").style.display = "none";
        }

        // Додавання курсів в таблицю
        courses.forEach(course => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${course.courseId}</td>
                <td>${course.name}</td>
                <td>${course.instructor}</td>
                <td>${course.duration}</td>
                <td>${course.level}</td>
                <td>${course.language}</td>
            `;
            row.addEventListener("mouseover", () => showSyllabus(course.syllabus));
            row.addEventListener("mouseout", () => hideSyllabus());
            row.addEventListener("click", () => openModal(course));
            tableBody.appendChild(row);
        });
    }

    // Пошук та фільтрація курсів
    function filterCourses() {
        const searchText = document.getElementById("searchInput").value.toLowerCase();
        const levelFilter = document.getElementById("levelFilter").value;
        const languageFilter = document.getElementById("languageFilter").value;

        courses = allCourses.filter(course => {
            return (
                (course.name.toLowerCase().includes(searchText) || course.instructor.toLowerCase().includes(searchText)) &&
                (!levelFilter || course.level === levelFilter) &&
                (!languageFilter || course.language === languageFilter)
            );
        });

        renderCourses();
    }

    // Сортування курсів
    function sortCourses() {
        const sortBy = document.getElementById("sortSelect").value;
        if (sortBy === "level") {
            courses.sort((a, b) => a.level.localeCompare(b.level));
        } else if (sortBy === "duration") {
            courses.sort((a, b) => a.duration - b.duration);
        }
        renderCourses();
    }

    // Відображення спливаючого вікна з темами курсу
    function showSyllabus(syllabus) {
        const row = event.target.closest("tr");
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.innerHTML = "<strong>Теми курсу:</strong><ul>" + syllabus.map(item => `<li>${item}</li>`).join('') + "</ul>";
        row.appendChild(tooltip);
    }

    // Сховати спливаюче вікно
    function hideSyllabus() {
        const tooltip = document.querySelector(".tooltip");
        if (tooltip) tooltip.remove();
    }

    // Відкриття модального вікна з детальною інформацією
    function openModal(course) {
        document.getElementById("modalCourseName").textContent = course.name;
        document.getElementById("modalCourseDescription").textContent = course.description;
        const syllabusList = document.getElementById("modalSyllabus");
        syllabusList.innerHTML = course.syllabus.map(item => `<li>${item}</li>`).join('');
        document.getElementById("courseModal").style.display = "block";
    }

    // Закриття модального вікна
    function closeModal() {
        document.getElementById("courseModal").style.display = "none";
    }

    // Закриття модального вікна при натисканні на фон
    window.onclick = function(event) {
        if (event.target == document.getElementById("courseModal")) {
            closeModal();
        }
    };
});
