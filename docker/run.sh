#!/bin/bash
set -m

if [ ! -f ../data/mongo/.mongodb_password_set ]; then
    ./set_mongodb_password.sh
fi

fg
