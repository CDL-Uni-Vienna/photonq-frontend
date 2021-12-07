FROM node:lts-alpine
COPY build build
RUN npm install -g serve

EXPOSE 8080
ENTRYPOINT ["serve", "-s", "build", "-l", "8080"]