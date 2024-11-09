// 1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('customname'); // Текстове поле для імені
const randomize = document.querySelector('.randomize');  // Кнопка генерації історії
const story = document.querySelector('.story');  // Абзац для відображення історії

// Функція для випадкового вибору елемента з масиву
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// 2. RAW TEXT STRINGS

// Основний текст історії
const storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';

// Масиви для випадкових вставок
const insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
const insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
const insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

// 3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);  // Додаємо обробник події на кнопку

function result() {

  // Початкова версія історії
  let newStory = storyText;

  // Вибираємо випадкові значення для :insertx:, :inserty:, :insertz:
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  // Замінюємо заповнювачі в історії
  newStory = newStory.replace(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  // Якщо введене ім'я в customName, замінюємо "Bob" на введене ім'я
  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  // Якщо вибрано UK, перераховуємо одиниці для ваги та температури
  if (document.getElementById("uk").checked) {
    const weight = Math.round(300 / 14); // Перетворення з фунтів на стоуни (1 stone = 14 pounds)
    const temperature = Math.round((94 - 32) * 5/9); // Перетворення з Фаренгейта на Цельсія

    // Замінюємо значення у тексті історії
    newStory = newStory.replace('94 fahrenheit', temperature + ' centigrade');
    newStory = newStory.replace('300 pounds', weight + ' stone');
  }

  // Виводимо готову історію
  story.textContent = newStory;
  story.style.visibility = 'visible'; // Відображаємо історію
}
