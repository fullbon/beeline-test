#!/bin/bash

CURRENT_PATH=$(realpath "$(dirname "${BASH_SOURCE[0]}")")
CONFIG_PATH="$CURRENT_PATH/../config"

. $CONFIG_PATH/.env || eval 'echo "Could not source container config file" 1>&2; exit 1'

Green='\033[0;32m'
Color_Off='\033[0m'

while true; do
  echo -e "${Green}Зайти в консоль контейнера${Color_Off}"
  echo "[1] Laravel"
  echo "[2] DB"

  read -r choice </dev/tty

  case $choice in

    '1')
      docker exec -it $CONTAINER_NAME-app bash
      break;
    ;;

    '2')
      docker exec -it $CONTAINER_NAME-db bash
      break;
    ;;

    *)
      echo "Отмена" >&2
      break;
  esac

done