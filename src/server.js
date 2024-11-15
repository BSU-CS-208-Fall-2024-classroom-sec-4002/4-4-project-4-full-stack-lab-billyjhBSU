import express from 'express'
import sql from 'sqlite3'
const sqlite3 = sql.verbose()

// Create an in memory table to use
const db = new sqlite3.Database(':memory:')

// This is just for testing you would not want to create the table every
// time you start up the app feel free to improve this code :)
db.run(`CREATE TABLE todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL)`)
   
const app = express()
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false }))

// Get
app.get('/', function (req, res) {
    db.all('SELECT id, task FROM todo', function(err, rows) {
        if (err) {
            console.error(err)
            return res.status(500).send('Database error occurred')
        }
        res.render('index', { tasks: rows })
    })
})

// Add
app.post('/', function (req, res) {
    console.log('adding todo item')
    const stmt = db.prepare('INSERT INTO todo (task) VALUES (?)')
    stmt.run(req.body.todo, function(err) {
        if (err) {
            console.error(err)
            return res.status(500).send('Error adding todo item')
        }
        res.redirect('/')
    })
    stmt.finalize()
})

// Delete
app.post('/delete', function (req, res) {
    console.log('deleting todo item')
    const stmt = db.prepare('DELETE FROM todo WHERE id = ?')
    stmt.run(req.body.id, function(err) {
        if (err) {
            console.error(err)
            return res.status(500).send('Error deleting todo item')
        }
        res.redirect('/')
    })
    stmt.finalize()
})

// Start the web server
app.listen(3000, function () {
    console.log('Listening on port 3000...')
})