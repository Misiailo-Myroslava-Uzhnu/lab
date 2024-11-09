document.addEventListener('DOMContentLoaded', function () {
  // Пошук елементів
  var displayedImage = document.querySelector('.displayed-img'); // Велике зображення
  var thumbBar = document.querySelector('.thumb-bar');           // Контейнер для маленьких зображень
  var btn = document.querySelector('button');                    // Кнопка для затемнення/освітлення
  var overlay = document.querySelector('.overlay');              // Перекриття для ефекту затемнення

  // Масив з шляхами до зображень
  var imagePaths = [
    'images/pic1.jpg',
    'images/pic2.jpg',
    'images/pic3.jpg',
    'images/pic4.jpg',
    'images/pic5.jpg'
  ];

  // Цикл для додавання зображень в контейнер .thumb-bar
  for (var i = 0; i < imagePaths.length; i++) {
    // Створення нового елемента <img>
    var newImage = document.createElement('img');
    
    // Встановлення атрибута src для нового зображення
    newImage.setAttribute('src', imagePaths[i]);

    // Додавання обробника події onclick до кожного маленького зображення
    newImage.addEventListener('click', function() {
      // Отримуємо поточний шлях до зображення
      var src = this.getAttribute('src');
      
      // Встановлюємо атрибут src великого зображення
      displayedImage.setAttribute('src', src);
    });

    // Додавання нового зображення в контейнер .thumb-bar
    thumbBar.appendChild(newImage);
  }

  // Обробник події для кнопки Darken/Lighten
  btn.addEventListener('click', function() {
    // Перевірка поточного класу кнопки
    if (btn.classList.contains('dark')) {
      // Якщо клас "dark", змінюємо на "light"
      btn.classList.remove('dark');
      btn.classList.add('light');
      // Змінюємо текст кнопки
      btn.textContent = 'Світліше';
      // Змінюємо background-color overlay на затемнення
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
      // Якщо клас не "dark", повертаємо на "dark"
      btn.classList.remove('light');
      btn.classList.add('dark');
      // Відновлюємо текст кнопки
      btn.textContent = 'Темне';
      // Змінюємо background-color overlay на прозорий
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
  });
});
