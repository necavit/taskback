#!/bin/bash

function usage() {
  echo ""
  echo "usage: taskback.sh"
  echo "    runs the taskback server in development mode and using nodemon"
  echo ""
}

if [ $# -gt 1 ]; then
  usage
fi

echo ""
echo "[taskback.sh] executing: NODE_ENV=development nodemon server.js"
echo ""
NODE_ENV=development nodemon server.js
