const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
app.prepare().then(() => {
 createServer((req, res) => {
 // This tells it to parse the query portion ofthe URL.
const parsedUrl = parse(req.url, true)
const { pathname, query } = parsedUrl
 if (pathname === '/a') {
 app.render(req, res, '/a', query)
 } else if (pathname === '/b') {
 app.render(req, res, '/b', query)
 } else {
 handle(req, res, parsedUrl)
 }
 }).listen(3003, (err) => {
 if (err) throw err
 console.log('> Ready on http://localhost:3003')
 })
})