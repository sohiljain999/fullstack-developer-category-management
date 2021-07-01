const {
  Category
} = require('../model/categories.model');

const {
  Utility
} = require('./utility');

var express = require('express');
var router = express.Router();

const utility = new Utility();

/*  "/api/add"
 *   POST: Add a new category
 */
router.post('/api/add', async (req, res) => {
  let parent = req.body.parent ? req.body.parent : null;
  const category = new Category({
    name: req.body.name,
    parent
  })
  try {
    let newCategory = await category.save();
    await utility.buildAncestors(newCategory._id, parent);
    res.status(201).send({
      response: `Category ${newCategory._id}`
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/*  "/api/allCategories"
 *   GET: Get all the categories
 */
router.get('/api/allCategories', async (req, res) => {
  try {
    const result = await Category.find({})
      .select({
        "_id": true,
        "name": true,
        "parent": true
      }).lean().exec();

    let arr = JSON.parse(JSON.stringify(result));

    let tree = await utility.createDataTree(arr);

    res.status(201).send({
      "status": "success",
      "result": tree
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/*  "/api/descendants"
 *   GET: Get all the descendants/childs/sub-childs of a category
 */
router.get('/api/descendants', async (req, res) => {
  try {
    const result = await Category.find({
        "ancestors.name": req.query.name
      })
      .select({
        "_id": true,
        "parent": true,
        "name": true
      })
      .exec();

    res.status(201).send({
      "status": "success",
      "result": result.length ? result : "No descendants present"
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/*  "/api/category"
 *   GET: Get a category by its id
 */
router.get('/api/category', async (req, res) => {
  try {
    const result = await Category.find({
        "_id": req.query.id
      })
      .select({
        "_id": true,
        "parent": true,
        "name": true,
        "ancestors": true
      })
      .exec();

    res.status(201).send({
      "status": "success",
      "result": result.length ? result : "Category not found..."
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/*  "/api/update"
 *   PUT: To update a category
 */
router.put('/api/update', async (req, res) => {
  try {
    let categoryId = req.query.category_id;
    let categoryName = req.body.updatedName;
    const category = await Category.findByIdAndUpdate(categoryId, {
      $set: {
        "name": categoryName
      }
    });

    const ancestors = await Category.updateMany({
      "ancestors._id": categoryId
    }, {
      "$set": {
        "ancestors.$.name": categoryName
      }
    }, {
      multi: true
    });

    res.status(201).send({
      "status": "category updated",
      "result": category 
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/*  "/api/remove"
 *   DELETE: To delete a category
 */
router.delete('/api/remove', async (req, res) => {
  try {
    let result;
    let categoryId = req.query.category_id;

    result = await Category.findByIdAndRemove(categoryId);
    if (result && result._doc.name) {
      let res = await Category.deleteMany({
        "ancestors._id": categoryId
      });
    }

    res.status(201).send({
      "status": "category deleted",
      "result": result
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = {
  router
}
