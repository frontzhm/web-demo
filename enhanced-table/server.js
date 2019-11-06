// npm i express body-parser
let express = require('express')
let bodyParser = require('body-parser')
let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// 设置跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  // 让options请求快速返回
  req.method === 'OPTIONS' ? res.sendStatus(200) : next()
})
app.listen(3333, () => { console.log('端口3333已启动') })
const path = require('path')
app.use(express.static('./dist'))
app.get('/', (req, res) => { res.sendFile(path.resolve('dist/index.html')) })
