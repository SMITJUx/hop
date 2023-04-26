FROM node:alpine

# Set image metadata
LABEL version="1.0"
LABEL description="Flight delay node.js app"

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm cache clean --force && npm ci

# Copy app source to image
COPY . .

# Set application PORT and expose docker PORT, 80 is what Elastic Beanstalk expects
EXPOSE 3000

CMD [ "npm", "run", "start" ]