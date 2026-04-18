# Remove o container antigo
docker rm -f g-py 2>$null

# Cria e roda o container
docker run -dit `
  --name g-py `
  -v "${PWD}/backend/fastapi-py:/app" `
  -w /app `
  -p 8000:8000 `
  python:3.14-slim `
  sh

docker exec -it g-py bash