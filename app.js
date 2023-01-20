const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded()); //body-parser
app.set('view engine', 'ejs'); //ejs

app.get('/', (req, res) => {

    var today = new Date();
    var currentDay = today.getDay();
    var day = "";

    if (currentDay === 6 || currentDay === 0) {
        day = "Weekend";
    } else {
        day = "Weekday";
    }
    res.render('list', {kindOfDay: day});

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})