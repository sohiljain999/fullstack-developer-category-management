var mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'Category'
  },
  ancestors: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true
    },
    name: String
  }]
});

//const Category = mongoose.model('Category', categorySchema);

module.exports = {
  init: () => mongoose.connect(process.env.DATABASE_URL),
  close: () => mongoose.disconnect(),
  Category: mongoose.model('Category', categorySchema)
}
