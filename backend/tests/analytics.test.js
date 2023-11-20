const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Adjust the path based on your project structure
const expect = chai.expect;

chai.use(chaiHttp);

describe('Analytics Controller', () => {
  let shortUrlId; // Assume you have a short URL ID to use in the test cases

  // Before running the tests, create a short URL and store its ID
  before(async () => {
    const response = await chai
      .request(app)
      .post('/short')
      .send({
        original_url: 'https://www.example.com',
        expiration_date: '2023-12-31',
        title: 'Example Title',
        description: 'Example Description',
      });

    shortUrlId = response.body.short_url.split('/').pop();
  });

  // Test case for getting URL analytics
  it('should get URL analytics', async () => {
    const response = await chai.request(app).get(`/analytics/${shortUrlId}`);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('url_details');
    expect(response.body.url_details).to.have.property('original_url');
    expect(response.body.url_details).to.have.property('short_id');
    expect(response.body.url_details).to.have.property('stats');
    expect(response.body.url_details.stats).to.have.property('total_visitors');
    expect(response.body.url_details.stats).to.have.property('unique_visitors');
  });

  // Test case for getting all visitors with pagination
  it('should get all visitors with pagination', async () => {
    const response = await chai.request(app).get(`/analytics/visitors/${shortUrlId}?page=1`);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
  });

  // After running the tests, delete the created short URL
  after(async () => {
    await chai.request(app).delete(`/delete/${shortUrlId}`);
  });
});
