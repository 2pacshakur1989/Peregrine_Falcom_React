# Use an official Node.js runtime as a parent image
FROM node:14.18.3

# Set the working directory to /frontend
WORKDIR /peregrine-app-try

# Copy the current directory contents into the container at /frontend
COPY . /peregrine-app-try

# Install any needed packages
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
