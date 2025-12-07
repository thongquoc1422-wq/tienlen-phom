# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve bằng nginx
FROM nginx:stable-alpine

# Copy thư mục dist từ builder stage sang nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: copy config nginx nếu bạn có (bỏ qua nếu không có)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
