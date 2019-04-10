#
# Dockerfile to run mongodb with authentication  
#
FROM mongo:latest

# Set metadata for this container
LABEL author="Alcindo Schleder <alcindoschleder@gmail.com>" \
    maintainer="Alcindo Schleder<alcindoschleder@gmail.com>" \
    version="1.0" \
    description="This container up a mongodb server."

# Copy file 'set_mongodb_password.sh' to /root 
ADD docker/set_mongodb_password.sh /root/set_mongodb_password.sh

# Set execute permission to shell script 'set_mongodb_password.sh', create directory /opt/data end execute shell script
RUN chmod +x /root/set_mongodb_password.sh \
    && mkdir /opt/data \
    && /root/set_mongodb_password.sh

# Create volume at /opt/data
VOLUME /opt/data

# Expose port 27017
EXPOSE 27017

# Set main program mongod process
ENTRYPOINT [ "mongod", "--auth"]
