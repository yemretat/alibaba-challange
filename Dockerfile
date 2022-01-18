# Coud be useful for deployment.

# Create image from:
FROM node:alpine

# Creating a new directory for app files and setting path in the container
RUN mkdir -p /trendyol-challange && chown -R node:node /trendyol-challange

# setting working directory in the container
WORKDIR /trendyol-challange

# grant permission of node project directory to node user

COPY --chown=node:node . . 

RUN npm install
RUN npm install concurrently

EXPOSE 5000


CMD [ "npm", "start" ]


