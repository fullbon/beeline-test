# Тестовое задание для Билайна

## Задание

1. Создать две таблицы
2. Связать их
3. Сделать CRUD

## Локальный запуск
```shell
cp config/.env.example config/.env
scripts/start.sh -w --build
# ключ -w для запуска из по Windows
# --build для пересборки
```

## Скрипты
```shell
# Запуск
cp config/.env.example config/.env
mkdir -p services/db/data
scripts/start.sh
```
```shell
# Остановка
scripts/stop.sh
```
```shell
# Лог контейнеров
scripts/log.sh
```
```shell
# Зайти в bash контейнера
scripts/bash.sh
```

## Ссылки
- http://localhost - приложение
- http://localhost:81 - phppgadmin

## Стек

- **PHP**: 8.38
- **Laravel**: 11.9
- **Docker**: Для контейнеризации
- **Postgresql**: 12.19-bullseye
- **MUI**: 6.1.4