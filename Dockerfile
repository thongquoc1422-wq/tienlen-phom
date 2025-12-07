# Step 1: Build React app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Step 2: Serve build bằng Nginx
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Optional: Copy custom nginx config nếu cần
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
