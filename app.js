const express = require('express')
const app = express()
const port = 3000

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

express.json() //body-parser
app.set('view engine', 'ejs'); //ejs
const dateModule = require(__dirname + "/date.js");

app.use(express.static("public"));



app.get('/', (req, res) => {

    const day = dateModule.getDate();
    res.render('list', { listTitle: day, newListItems: items });

});


app.post("/", function(req,res){

    let item = req.body.newItem

    if (req.body.list === "Work List"){
        workItems.push(item)
        res.redirect("/work");
    } else{
        items.push(item);
        res.redirect("/");
    }
   
})

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.get("/about", function(req,res){
    res.render("about");
})

app.post("/work", function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("work");
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})