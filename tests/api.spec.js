const request = require('supertest')
const app = require('../app/app')

describe('Post Endpoints', () => {
    var productCreated = null;
    var token = null;

    it('should create a jwt token', async () => {
      const res = await request(app)
        .get('/api/v1/auth')
        .send({
          email:"admin@admin.com",
          password: "admin"
      })
      token = res.body;
      expect(res.statusCode).toEqual(200)
    })

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/v1/movies')
      .set({'x-access-token': token.jwt})
      .send({
        title:"movie test",
        director: "director",
        nTotal: 9
    })
    productCreated = res.body;
    expect(res.statusCode).toEqual(201)
  })

  it('should get product by name', async () => {
    const res = await request(app)
      .get('/api/v1/movies')
      .set({'x-access-token': token.jwt})
      .query({ title: "movie test"})

    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(1)
  })

  it('should get product by id', async () => {
    const res = await request(app)
      .get('/api/v1/movies/'+productCreated[0].id)
      .set({'x-access-token': token.jwt})


    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(1)
  })

  it('should get product list', async () => {
    const res = await request(app)
      .get('/api/v1/movies/')
      .set({'x-access-token': token.jwt})

    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should delete product', async () => {
    const res = await request(app)
      .delete('/api/v1/movies/'+productCreated[0].id)
      .set({'x-access-token': token.jwt})

    expect(res.statusCode).toEqual(203)
  })

  it('should be forbiden', async () => {
    const res = await request(app)
      .get('/api/v1/movies/')
    expect(res.statusCode).toEqual(401)
  })
})