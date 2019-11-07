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
app.get('/1', (req, res) => { res.json({ ok: 1 }) })
app.get('/', (req, res) => { res.sendFile(path.resolve('.dist/index.html')) })
let data = { 'state': 1, 'data': [{ 'orderNumber': 0, 'projectName': '高中化学', 'teacherCount': 60, 'lessonCount': 948, 'uploadPercent': 0.4684, 'passPercent': 0.5000 }, { 'orderNumber': 0, 'projectName': '初中物理', 'teacherCount': 88, 'lessonCount': 1512, 'uploadPercent': 0.3810, 'passPercent': 0.4340 }, { 'orderNumber': 0, 'projectName': '初中化学', 'teacherCount': 43, 'lessonCount': 516, 'uploadPercent': 0.3430, 'passPercent': 0.5763 }, { 'orderNumber': 0, 'projectName': '高中语文', 'teacherCount': 70, 'lessonCount': 936, 'uploadPercent': 0.1998, 'passPercent': 0.6257 }, { 'orderNumber': 0, 'projectName': '初中语文', 'teacherCount': 180, 'lessonCount': 2172, 'uploadPercent': 0.1317, 'passPercent': 0.7238 }, { 'orderNumber': 0, 'projectName': '初中英语', 'teacherCount': 270, 'lessonCount': 3480, 'uploadPercent': 0.1313, 'passPercent': 0.6565 }, { 'orderNumber': 0, 'projectName': '初中数学', 'teacherCount': 176, 'lessonCount': 2268, 'uploadPercent': 0.1049, 'passPercent': 0.7815 }, { 'orderNumber': 0, 'projectName': '英才项目', 'teacherCount': 716, 'lessonCount': 8988, 'uploadPercent': 0.0946, 'passPercent': 0.7400 }, { 'orderNumber': 0, 'projectName': '高中生物', 'teacherCount': 36, 'lessonCount': 468, 'uploadPercent': 0.0705, 'passPercent': 0.6061 }, { 'orderNumber': 0, 'projectName': '高中物理', 'teacherCount': 59, 'lessonCount': 720, 'uploadPercent': 0.0681, 'passPercent': 0.4490 }, { 'orderNumber': 0, 'projectName': '高中数学', 'teacherCount': 92, 'lessonCount': 1140, 'uploadPercent': 0.0535, 'passPercent': 0.4098 }, { 'orderNumber': 0, 'projectName': '高中英语', 'teacherCount': 154, 'lessonCount': 1872, 'uploadPercent': 0.0278, 'passPercent': 0.3654 }, { 'orderNumber': 0, 'projectName': '初中生物', 'teacherCount': 27, 'lessonCount': 336, 'uploadPercent': 0.0119, 'passPercent': 0.7500 }, { 'orderNumber': 0, 'projectName': '初中历史', 'teacherCount': 12, 'lessonCount': 144, 'uploadPercent': 0.0069, 'passPercent': 1.0000 }, { 'orderNumber': 0, 'projectName': '初中地理', 'teacherCount': 10, 'lessonCount': 120, 'uploadPercent': 0.0000, 'passPercent': 0.0000 }, { 'orderNumber': 0, 'projectName': '初中政治', 'teacherCount': 7, 'lessonCount': 84, 'uploadPercent': 0.0000, 'passPercent': 0.0000 }, { 'orderNumber': 0, 'projectName': '高中地理', 'teacherCount': 19, 'lessonCount': 228, 'uploadPercent': 0.0000, 'passPercent': 0.0000 }, { 'orderNumber': 0, 'projectName': '高中政治', 'teacherCount': 15, 'lessonCount': 180, 'uploadPercent': 0.0000, 'passPercent': 0.0000 }, { 'orderNumber': 0, 'projectName': '高中历史', 'teacherCount': 24, 'lessonCount': 288, 'uploadPercent': 0.0000, 'passPercent': 0.0000 }], 'error': null, 'dataCount': 19 }
app.get('/query', (req, res) => {
  res.json(data)
})
