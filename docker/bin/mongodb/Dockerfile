#
# Dockerfile to run mongodb with authentication  
#
FROM alpine:edge

# Set metadata for this container
LABEL author="Alcindo Schleder <alcindoschleder@gmail.com>" \
    maintainer="Alcindo Schleder<alcindoschleder@gmail.com>" \
    version="1.0" \
    description="This container up a mongodb server."

# Copy file 'set_mongodb_password.sh' to /root 
ADD set_mongodb_password /usr/sbin/set_mongodb_password

ENV MONGODB_DATA_DIR=/opt/data
ENV MONGODB_LOG_DIR=/var/log/mongo

# Set execute permission to shell script 'set_mongodb_password.sh', create directory /opt/data end execute shell script
RUN mkdir /opt/data && mkdir /var/log/mongo \
    && echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories \
    && echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories \
    && apk update \
    && apk add --no-cache mongodb mongodb-tools \
    && /bin/sh -c "mongod --dbpath /opt/data &" \
    && chmod +x /usr/sbin/set_mongodb_password \
    && /usr/sbin/set_mongodb_password

# Create volume at /opt/data
VOLUME /opt/data
VOLUME /var/log/mongo

# Expose port 27017
EXPOSE 27017

# Set main program mongod process
ENTRYPOINT [ "mongod", "--dbpath", "/opt/data", "--logpath", "/var/log/mongo/mongodb.log", "--auth", "&" ]
