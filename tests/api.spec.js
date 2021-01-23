const request = require('supertest')
const app = require('../app/app')

describe('Endpoints', () => {
    var productCreated = null;
    var token = null;
    var alocateMovie = null;

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

  it('should alocate movie', async () => {
    const res = await request(app)
      .post('/api/v1/locadora/')
      .set({'x-access-token': token.jwt})
      .send({
        movieId: productCreated[0].id,
        userId: 1,
        volumes: 1
      })

    alocateMovie = res.body;
    expect(res.statusCode).toEqual(201)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should get movie alocate list', async () => {
    const res = await request(app)
      .get('/api/v1/locadora/')
      .set({'x-access-token': token.jwt})

    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should get movie alocate by id', async () => {
    const res = await request(app)
      .get('/api/v1/locadora/'+alocateMovie[0].id)
      .set({'x-access-token': token.jwt})

    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should get movie devolução', async () => {
    const res = await request(app)
      .get('/api/v1/locadora/devolucao/'+alocateMovie[0].id)
      .set({'x-access-token': token.jwt})

    expect(res.statusCode).toEqual(200)
  })

  it('should get movie alocate by id', async () => {
    const res = await request(app)
      .get('/api/v1/history/')
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