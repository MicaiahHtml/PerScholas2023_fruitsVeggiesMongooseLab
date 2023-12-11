const mongoose = require("mongoose");
const fruitSchema = new mongoose.Schema({
    name: { type: String, required: true},
    color: { type: String, required: true},
    readyToEat: Boolean
});

const Fruit = mongoose.model("fruit", fruitSchema);

module.exports = Fruit;

//exporting the fruit model from the file. We are creating a schema that will be enforced on our data.
 