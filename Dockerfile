FROM node:16.15.1 AS web

WORKDIR /app

COPY ./package.json /app/

RUN npm install yarn && yarn install

COPY . /app

RUN yarn run build


FROM nginx

COPY --from=web /app/build /usr/share/nginx/html
COPY --from=web /app/nginx.conf /etc/nginx/conf.d/default.conf

