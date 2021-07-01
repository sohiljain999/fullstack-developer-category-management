const {
  Category
} = require('../model/categories.model');

var _ = require('underscore');

class Utility {

  buildAncestors = async (id, parent_id) => {
    let ancest = [];
    try {
      let parent_category = await Category.findOne({
        "_id": parent_id
      }, {
        "name": 1,
        "ancestors": 1
      }).exec();
      if (parent_category) {
        const {
          _id,
          name
        } = parent_category;
        const ancest = [...parent_category.ancestors];
        ancest.unshift({
          _id,
          name
        })
        const category = await Category.findByIdAndUpdate(id, {
          $set: {
            "ancestors": ancest
          }
        });
      }
    } catch (err) {
      console.log(err.message)
    }
  };

  createDataTree = async (dataset) => {
    const obj = Object.create(null);
    dataset.forEach(aData => obj[aData._id] = {
      ...aData,
      childNodes: []
    });
    const dataTree = [];
    dataset.forEach(aData => {
      if (aData.parent) obj[aData.parent].childNodes.push(obj[aData._id])
      else dataTree.push(obj[aData._id])
    });
    return dataTree;
  };

}


// Export the utility class
module.exports = {
  Utility
}
