#!/bin/bash

CURRENT_PATH=$(realpath "$(dirname "${BASH_SOURCE[0]}")")
CONFIG_PATH="$CURRENT_PATH/../config"

cd $CONFIG_PATH
docker-compose down