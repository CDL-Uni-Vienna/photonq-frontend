FROM nginxinc/nginx-unprivileged:1.20-alpine
COPY build /usr/share/nginx/html
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]