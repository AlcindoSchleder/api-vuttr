#
# Dockerfile to run node.js application 
#
FROM node:10-alpine

# create application directories
RUN echo "alias l='ls -al --color'" >> /root/.bashrc \
    && mkdir /opt/node \
    && mkdir /opt/node/api-vuttr \
    && mkdir /opt/node/commom \
    && mkdir /etc/vktioapi \
    && apk add --update gcc g++ make \
    && apk add --update python python-dev py-pip

# set node workdir
WORKDIR /opt/node

# Copy all files of apllication to container image
ADD *.key /etc/vktioapi/
ADD api-vuttr /opt/node/api-vuttr
ADD commom /opt/node/commom

# Metadata
LABEL   Author="Alcindo Schleder<alcindoschleder@gmail.com>" \
        maintainer="Alcindo Schleder<alcindoschleder@gmail.com>" \
        version="1.0" \
        description="This is a simple VUTTR api that list, insert, update and delete data on mongodb."

# Environment Applications
ENV APPLICATION_DIR=/opt/node/api-vuttr
ENV APPLICATION_CMM_DIR=/opt/node/commom
ENV NODE_API_DIR=/opt/node/api-vuttr
ENV NODE_ENV=development

# this install node.js libraries and update npm if need and all dependencies to run app
RUN npm install -g npm \
    && npm install -g mocha \
    && cd /opt/node/api-vuttr \
    && npm --save install

# Map local directory with container directory
VOLUME /opt/node

# Expose port 3000
EXPOSE 3000

# Container Main Process
ENTRYPOINT [ "node", "/opt/node/api-vuttr/api.js" ]
