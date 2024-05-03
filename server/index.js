const http = require('http')
const { PORT = 8000 } = process.env

const fs = require('fs')
const path = require('path')
const PUBLIC_DIRECTORY = path.join(__dirname, '../public')

const onRequest = (req, res) => { 
  const indexFile = path.join(PUBLIC_DIRECTORY, 'index.html')
  const findCarFile = path.join(PUBLIC_DIRECTORY, 'find-car.html')

  const indexHTML = fs.readFileSync(indexFile, 'utf-8')
  const findCarHTML = fs.readFileSync(findCarFile, 'utf-8')
  switch (req.url) {
    case "/":
      res.writeHead(200);
      res.end(indexHTML);
      break;
    case "/find-car":
        res.writeHead(200);
        res.end(findCarHTML);
      break;
    default:
      break;
  }

  fs.readFile(PUBLIC_DIRECTORY + req.url, (err, data) => { 
    if (err) {
      res.writeHead(404)
      res.end("Not Found")
    } else { 
      res.writeHead(200)
      res.end(data)
    }
  })
}

const server = http.createServer(onRequest);

server.listen(PORT, 'localhost', () => { 
  console.log(`Server berjalan pada localhost : ${PORT}...`)
})