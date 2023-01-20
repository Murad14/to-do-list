const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded()); //body-parser
app.set('view engine', 'ejs'); //ejs

app.get('/', (req, res) => {

    var today = new Date();
    var currentDay = today.getDay();

    if (currentDay === 6 || currentDay === 0) {
        res.write("<h1>It's the weekend!</h1>");
    } else {
        res.sendFile(__dirname + "/index.html")
    }


})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})