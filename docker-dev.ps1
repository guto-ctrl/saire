# Remove o container antigo se existir (porque o Docker não esquece, ele só julga)
docker rm -f g-node 2>$null

# Cria e roda o container em background
docker run -dit `
  --name g-node `
  -v "${PWD}:/app" `
  -w /app `
  node:20-alpine `
  sh

# Entra no container
docker exec -it g-node sh