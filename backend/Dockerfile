FROM node:20-slim

RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

RUN groupadd -r appgroup && useradd -m -r -g appgroup appuser

WORKDIR /app
COPY --chown=appuser:appgroup package*.json ./
RUN npm install
COPY --chown=appuser:appgroup . .

# Cria a pasta uploads com as permissões corretas
RUN mkdir -p /app/uploads && chown appuser:appgroup /app/uploads

RUN chmod +x /app/wait-for-mysql.sh

USER appuser

EXPOSE 5000
CMD ["/app/wait-for-mysql.sh", "db", "root", "root", "docker", "npm", "start"]