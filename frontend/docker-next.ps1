docker rm -f g-nextjs 2>$null

docker run -dit `
  --name g-nextjs `
  -v "${PWD}/frontend:/app" `
  -v /app/node_modules `
  -w /app `
  -p 3000:3000 `
  -e WATCHPACK_POLLING=true `
  -e CHOKIDAR_USEPOLLING=true `
  node:20 `
  sh -c "npm install && npm run dev"