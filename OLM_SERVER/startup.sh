#!/usr/bin/env bash
if [ ! -d /usr/src/olm-server/node_modules ]; then
  echo "Install dependencies..."
  cd /usr/src/olm-server && npm install --no-bin-links
fi
cd /usr/src/olm-server && nodemon -L server.js