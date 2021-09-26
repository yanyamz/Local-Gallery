const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.static(path.join(__dirname, '../dist')))

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, `${__dirname}/../dist/uploads/`)
	},

	filename: function(req, file, cb) {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.post('/', upload.array('multi-files'), (req, res) => {
	res.redirect('/')
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
