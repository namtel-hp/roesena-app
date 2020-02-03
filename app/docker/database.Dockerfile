FROM mysql:8

ENV MYSQL_DATABASE=RoeSeNa

ENV MYSQL_ROOT_PASSWORD=my_secret_pw

COPY init-scripts /docker-entrypoint-initdb.d

CMD [ "--default-authentication-plugin=mysql_native_password" ]