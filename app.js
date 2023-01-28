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
const _ = require('lodash'); //lodash


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

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema)

// Item.insertMany(defaultItems, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Succesfully saved default items to DB.");
//     }
// });

app.get('/', (req, res) => {

    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Succesfully saved default items to DB.");
                }
            });
            // res.redirect('/');
        } else {
            res.render('list', { listTitle: "Today", newListItems: foundItems });
        }

    })

    // const day = dateModule.getDate();
});

app.get("/:customListName", function (req, res) {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({ name: customListName }, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName)
            } else {
                res.render('list', { listTitle: foundList.name, newListItems: foundList.items })
            }
        }
    })





});


app.post("/", function (req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect('/');
    } else {
        List.findOne({ name: listName }, function (err, foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }

});

app.post("/delete", function (req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, function (err) {
            if (!err) {
                console.log("Succesfully Deleted");
                res.redirect('/');
            }
        })
    } else {
        List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, function (err, foundList) {
            if (!err) {
                res.redirect("/" + listName);
            }
        });
    }


});


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