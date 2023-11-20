const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Adjust the path based on your project structure
const expect = chai.expect;

chai.use(chaiHttp);

describe('URL Controller', () => {
  let shortUrlId; // Used to store the short URL ID for testing later

  // Test case for creating a new short URL
  it('should create a new short URL', async () => {
    const response = await chai
      .request(app)
      .post('/short')
      .send({
        original_url: 'https://www.example.com',
        expiration_date: '2023-12-31',
        title: 'Example Title',
        description: 'Example Description',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('short_url');
    shortUrlId = response.body.short_url.split('/').pop(); // Extracting short ID from the URL
  });

  // Test case for updating a short URL
  it('should update a short URL', async () => {
    const response = await chai
      .request(app)
      .put(`/update/${shortUrlId}`)
      .send({
        title: 'Updated Title',
        description: 'Updated Description',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('title').equal('Updated Title');
    expect(response.body).to.have.property('description').equal('Updated Description');
  });

  // Test case for getting all short URLs by App Id
  it('should get all short URLs by App Id', async () => {
    const response = await chai.request(app).get('/appid');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
  });

  // Test case for deleting a short URL
  it('should delete a short URL', async () => {
    const response = await chai.request(app).delete(`/delete/${shortUrlId}`);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('success').equal(true);
  });

  // Additional test cases can be added based on your requirements
});
