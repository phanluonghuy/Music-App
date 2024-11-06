#!/bin/sh

# Replace the placeholder with the actual SERVER_IP environment variable
envsubst '$SERVER_IP' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start Nginx
nginx -g "daemon off;"