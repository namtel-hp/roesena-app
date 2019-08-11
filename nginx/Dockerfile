FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY dev-config.conf /etc/nginx/nginx.conf
# COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]