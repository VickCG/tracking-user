
#FROM centos:7

# install nginx
#RUN yum update; yum clean all
#RUN yum -y install epel-release; yum clean all
#RUN yum -y install nginx; yum clean all
## forward request and error logs to docker log collector
#RUN ln -sf /dev/stdout /var/log/nginx/access.log
#RUN ln -sf /dev/stderr /var/log/nginx/error.log

FROM nginx:alpine

COPY .docker/nginx-dev.conf /etc/nginx/nginx.conf

# Config Node
FROM node:10.15.0

MAINTAINER vicknguyen, vietnguyen11101992@gmail.com

## Create app directory
RUN mkdir -p /usr/src/olm-server
WORKDIR /usr/src/olm-server

## Install node dependencies
COPY package.json /usr/src/olm-server/
RUN npm install

## Bundle source
COPY . /usr/src/olm-server
EXPOSE 3000
CMD [ "npm", "start" ]