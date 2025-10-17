project:
name: Bookstore App (TypeScript + Webpack)
description: >
Этот проект — это простое веб-приложение-каталог книг, написанное на TypeScript
с использованием Webpack и современных инструментов сборки.
structure: - dist/: Финальная сборка проекта - src/: Исходный код - src/img/: Изображения - src/scss/: Стили (SASS) - src/index.html: HTML-шаблон - src/typeScript/: Основной код на TypeScript - src/typeScript/index.ts: Точка входа - package.json: Описание зависимостей и скриптов - tsconfig.json: Конфигурация TypeScript - webpack.config.js: Конфигурация Webpack

scripts:
start: Запускает webpack-dev-server для локальной разработки и открывает браузер
build: Сборка проекта в продакшн (папку dist)

devDependencies:

- name: webpack
  description: Сборщик модулей
- name: webpack-cli
  description: CLI для Webpack
- name: webpack-dev-server
  description: Локальный сервер для разработки
- name: ts-loader
  description: Компиляция TypeScript в JavaScript
- name: typescript
  description: Язык TypeScript
- name: sass
  description: Преобразование SCSS в CSS
- name: sass-loader
  description: Загрузка и компиляция SCSS
- name: css-loader
  description: Импорт CSS в JavaScript
- name: mini-css-extract-plugin
  description: Извлечение CSS в отдельные файлы
- name: css-minimizer-webpack-plugin
  description: Минификация CSS
- name: html-webpack-plugin
  description: Генерация HTML на основе шаблона
- name: copy-webpack-plugin
  description: Копирование изображений в финальную сборку

webpack:
entry: ./src/typeScript/index.ts
output: dist/bundle.js
mode: development
devtool: source-map
devServer:
open: true
port: 8080
modules: - test: /\.ts$/
      use: ts-loader
    - test: /\.s[ac]ss$/
use: - MiniCssExtractPlugin.loader - css-loader - sass-loader - test: /\.(png|jpe?g|gif|svg)$/
type: asset/resource
plugins: - MiniCssExtractPlugin: Извлекает CSS в style.css - HtmlWebpackPlugin: Создаёт HTML на основе index.html - CopyWebpackPlugin: Копирует изображения в dist/img

run:
install: npm install
dev: npm run start
build: npm run build

features:

- Загрузка данных о книгах из внешнего API\*
- Добавление книг в корзину с сохранением в localStorage
- Переключение категорий книг
- Fallback для изображений
- Минималистичный адаптивный UI

\*Google API не отправляет актуальную стоимость книг, поэтому я создал отдельный метод ( getrandomPrice in helpers.ts), который генерирует случайную стоимость. Для актуальной стоимости в книжном проекте, лучше использовать платный Amazon API или аналоги.
