const express = require('express')
const app = express()
const port = 3000

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.use(express.urlencoded()); //body-parser
app.set('view engine', 'ejs'); //ejs

app.use(express.static("public"));



app.get('/', (req, res) => {

    let today = new Date();


    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);
    res.render('list', { listTitle: day, newListItems: items });

});


app.post("/", function(req,res){

    console.log(req.body);
    let item = req.body.newItem
    
    items.push(item);
    res.redirect("/");
})

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.post("work", function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("work");
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})