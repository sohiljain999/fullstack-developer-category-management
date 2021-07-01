const expect = require('chai').expect
const axios = require('axios')

const baseUrl = 'http://localhost:3000/api'

describe('Test Fashion Categories', async () => {
  let parentId;
  let childId;

  it('should insert a parent category', function (done) {
    axios
      .post(baseUrl + '/add', {
        "name": "TestParent",
      })
      .then((res) => {
        expect(res.status).to.equal(201)
        expect(res.data.response).to.contains('Category')
        parentId = res.data.response.split(" ")[1]
        done()
      })
      .catch((error) => {
        console.error(error)
        done(error)
      })
  })

  it('should insert a child category', function (done) {
    axios
      .post(baseUrl + '/add', {
        "name": "TestChild",
        "parent": parentId
      })
      .then((res) => {
        expect(res.status).to.equal(201)
        expect(res.data.response).to.contains('Category')
        childId = res.data.response.split(" ")[1]
        done()
      })
      .catch((error) => {
        console.error(error)
        done(error)
      })
  })

  it('should fetch all categories', function (done) {
    axios
      .get(baseUrl + '/allCategories')
      .then((res) => {
        console.log(JSON.stringify(res.data.result, null, "  "))
        expect(res.status).to.equal(201)
        expect(res.data.status).to.equal('success')
        done()
      })
      .catch((error) => {
        console.error(error)
        done(error)
      })
  })

  it('should fetch descendants of a category', function (done) {
    axios
      .get(baseUrl + '/descendants', {
        params: {
          name: 'TestParent'
        }
      })
      .then((res) => {
        expect(res.status).to.equal(201)
        expect(res.data.result[0]._id).to.equal(childId)
        done()
      })
      .catch((error) => {
        console.error(error)
        done(error)
      })
  })

  it('should update a category', function (done) {
    axios
      .put(baseUrl + '/update', {
        "updatedName": "Parent"
      }, {
        params: {
          "category_id": parentId
        }
      })
      .then((res) => {
        expect(res.status).to.equal(201)
        expect(res.data.result._id).to.be.equal(parentId)
        done()
      })
      .catch((error) => {
        console.error(error)
        done(error)
      })
  })

  it('should delete a category', function (done) {
    axios
      .delete(baseUrl + '/remove', {
        params: {
          category_id: parentId
        }
      })
      .then((res) => {
        expect(res.status).to.equal(201)
        expect(res.data.result._id).to.be.equal(parentId)
        done()
      })
      .catch((error) => {
        console.error(error)
        done(error)
      })
  })

})
