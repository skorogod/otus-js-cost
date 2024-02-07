# OTUS-JS-BASIC-COST [![codecov](https://codecov.io/gh/skorogod/otus-js-cost/graph/badge.svg?token=LG7M4FD2N0)](https://codecov.io/gh/skorogod/otus-js-cost)

В данном репозитории представлена реализация проекта **"Приложение для учета раcходов"**, выполненная в рамках курса JS-Basic платформы онлайн-образования "Otus".

Ссылка на страницу приложения: https://skorogod.github.io/otus-js-cost

## Требования

В своей работе приложение использует взаимодействие с Firebase API.
При желании, Вы можете подключить к приложению собственную базу данных Firebase Firestore.

## Начало работы

1. Клонируйте репозиторий
2. Выполните установку зависимостей: `npm install`
3. Настройте локальные эмуляторы Firebase следуя [инструкции](https://firebase.google.com/docs/emulator-suite) (для локального запуска приложения и тестирования)
4. Запустить проект локально: `npm run start`
5. Собрать проект: `npm run build:prod`

## Подключение собственной базы данных Firebase Firestore

1. Создайте приложение Firebase, следуя [инструкции](https://firebase.google.com/docs/web/setup)
2. Создайте базу данных Firestore в своем приложении, следуя [инструкции](https://firebase.google.com/docs/firestore/quickstart)
3. Настройте Firebase Authentication для работы с учетными данными пользователей, следуя [инструкции](https://firebase.google.com/docs/auth/web/start)
4. После создания приложения у Вас будет объект конфигурации с учетными данными Вашего Firebase приложения.
5. Если Вы хотите использовать собственную базу данных Firestore, замените данные из объекта _firebaseConfig_ на учетные данные своего приложения. Объект _firebaseConfig_ находится в файле firebase\firebase.ts.

## Тестирование

Тестирование кода осуществлялось с помощью библиотек jest и @testing-library/react. Для тестирование взаимодействия приложения с Firebase API были использованы локальные эмуляторы Firebase.

Для настройки локальных эмуляторов Firebase воспользуйтесь [инструкцией](https://firebase.google.com/docs/emulator-suite)

После настройки локальных эмуляторов Firebase можно приступать к тестированию. Для этого:

1. Запустите локальные эмуляторы Firebase: `npm run emulators:start`
2. Запустить тесты: `npm test`
