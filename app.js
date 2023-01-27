const express = require('express')
const app = express()
const port = 3000

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(express.json()) //body-parser
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose'); //mongoose
mongoose.set('strictQuery', true);
app.set('view engine', 'ejs'); //ejs


app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB'); //dtabase create & connect

const itemsSchema = ({
    name: String
});

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Succesfully saved default items to DB.");
    }
});

app.get('/', (req, res) => {

    // const day = dateModule.getDate();
    res.render('list', { listTitle: "Today", newListItems: items });

});


app.post("/", function (req, res) {

    let item = req.body.newItem

    if (req.body.list === "Work List") {
        workItems.push(item)
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

})

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
})

app.get("/about", function (req, res) {
    res.render("about");
})

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("work");
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})