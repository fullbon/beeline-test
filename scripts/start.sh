#!/bin/bash

# Подгружаем конфиг
CURRENT_PATH=$(realpath "$(dirname "${BASH_SOURCE[0]}")")
CONFIG_PATH="$CURRENT_PATH/../config"

# Проверяем, есть ли ключ -w или --windows среди аргументов
# Все из-за того, что postgresql конфликтует с файловой системой винды,
# из-за этого приходится создавать виртуальный volume, в остальном yml-ы идентичны
for arg in "$@"; do
  if [[ "$arg" == "-w" || "$arg" == "--windows" ]]; then
    COMPOSE_FILE="docker-compose-windows.yml"
    break
  fi
done

# Если ключ -w или --windows не найден, используем docker-compose.yml
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.yml}"

# Удаляем ключ w или --windows из списка аргументов
filtered_args=()
for arg in "$@"; do
  if [[ "$arg" != "-w" && "$arg" != "--windows" ]]; then
    filtered_args+=("$arg")
  fi
done

DOCKER_BUILDKIT=0 docker-compose -f "$CONFIG_PATH/$COMPOSE_FILE" up -d "${filtered_args[@]}"