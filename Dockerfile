# Situs dihentikan permanen: seluruh path merespons HTTP 410 Gone.
# Tidak ada tahap build — tidak ada sumber Astro yang perlu dikompilasi.
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY server.js ecosystem.config.cjs ./

ENV NODE_ENV=production
RUN npm install pm2 -g

EXPOSE 30069
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
