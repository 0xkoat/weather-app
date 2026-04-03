FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG API_KEY_WEATHER
ARG BASE_URL

ENV API_KEY_WEATHER=${API_KEY_WEATHER}
ENV BASE_URL=${BASE_URL}

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY --from=builder /app/public/assets /usr/share/nginx/html/assets

EXPOSE 80


CMD ["nginx","-g","daemon off;"]