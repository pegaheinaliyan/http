const PORT = process.env.PORT || 3000;

let quotes = require('./quotes.json'),
    app = require('../server/server.js'),
    chai = require('chai'),
    chaiHttp = require('chai-http'), 
    chalk = require('chalk'), 
    should = chai.should(),
    fs = require('fs');

app.listen(PORT, () => console.log( 
  //sets server to listen to PORT and outputs to the CL
  chalk.yellow.bold('Test server listening on port: ') 
  + chalk.cyan.bold(PORT)
));

chai.use(chaiHttp);


describe('GET /api', () => {
  let status, response;

  before(done => {
    chai.request(app)
      .get('/api')
      .set(
        'Content-Type', 'application/json'
      )
      .end((err, res) => {
        status = res.status;
        response = res.text;
        done();
      })
  });

  it('should return status 200.', done => {
    status.should.equal(200);
    done();
  });

  it('should provide a welcome message.', done => {
    response.should.be.a('string');
    done();
  });

});

describe('GET /api/quotes', () => {
  let status, response, quotes;

  before(done => {
    chai.request(app)
      .get('/api/quotes')
      .set(
        'Content-Type', 'application/json'
      )
      .end((err, res) => {
        status = res.status;
        response = res.text;
        done();
      });
  });

  it('should return status 200.', done => {
    status.should.equal(200);
    done();
  });

  it('should be a JSON object.', done => {
    response.should.be.a('string');
    response = JSON.parse(response);
    response.should.be.an('object');
    done();
  });


  it('should have a "quotes" property containing an array.', done => {
    response.should.have.a.property('quotes').that.is.an('array');
    quotes = response.quotes;
    done();
  });

  it('should contain only quotes with both "text" and an "author".', done => {
    for(let quote of quotes) {
      quote.should.be.an('object');
      quote.should.have.a.property('text');
      quote.should.have.a.property('author');
      quote.text.should.not.equal('');
      quote.author.should.not.equal('');
    }
    done();
  });

  it('should allow an author parameter.', done => {
    chai.request(app)
      .get('/api/quotes?author=\'\'')
      .set(
        'Content-Type', 'application/json'
      )
      .end((err, res) => {
        JSON.parse(res.text).length.should.equal(0);
        done();
      });
  });
});

describe('GET /api/quotes/random', () => {
  let status, response;

  before(done => {
    chai.request(app)
      .get('/api/quotes/random')
      .set(
        'Content-Type', 'application/json'
      )
      .end((err, res) => {
        status = res.status;
        response = res.text;
        done();
      });
  });

  it('should return status 200.', done => {
    status.should.equal(200);
    done();
  });

  it('should be a JSON object.', done => {
    response.should.be.a('string');
    response = JSON.parse(response);
    response.should.be.an('object');
    done();
  });

  it('should be random', done => {
    let a, b;
    chai.request(app)
      .get('/api/quotes/random')
      .set(
        'Content-Type', 'application/json'
      )
      .end((err, res) => {
        a = res.text;
        chai.request(app)
        .get('/api/quotes/random')
        .set(
          'Content-Type', 'application/json'
        )
        .end((err, res) => {
          b = res.text;
          a.should.not.equal(b);
          done();
        });
      });
  });
});


describe('POST /api/quotes', () => {
  let status, response;

  before(done => {
    chai.request(app)
      .post('/api/quotes')
      .set(
        'Content-Type', 'application/json'
      )
      .send(quotes)
      .end((err, res) => {
        status = res.status;
        done();
      });
  });

  it('should return a 200 status.', done => {
    status.should.equal(200);
    done();
  });

  it('should overwrite the existing quote file.', done => {
    chai.request(app)
      .get('/api/quotes')
      .set(
        'Content-Type', 'application/json'
      )
      .end((err, res) => {
        JSON.parse(res.text).quotes.should.deep.equal(quotes);
        done();
      });
  });

  it('should return status 400 if "text" is empty.', done => {
    chai.request(app)
      .post('/api/quotes')
      .set(
        'Content-Type', 'application/json'
      )
      .send([{
        text: ''
      }])
      .end((err, res) => {
        res.status.should.equal(400);
        done();
      });
    });

  xit('should fill in blank or missing authors with "Anonymous".', done => {
    //Your code here!
  });

  xit('should clear the file if passed an empty request body', done => {
    //Your code here!
  });
});

xdescribe('PUT /api/quotes', () => {
  let status, response, appendData = {
    "text": "Wubba lubba dub dub!", 
    "author": "Rick Sanchez"
  };

  before(done => {
    chai.request(app)
      .post('/api/quotes')
      .set(
        'Content-Type', 'application/json'
      )
      .send(quotes)
      .end(() => {
        done();
      });
  });

  after(done => {
    chai.request(app)
      .post('/api/quotes')
      .set(
        'Content-Type', 'application/json'
      )
      .send(quotes)
      .end(() => {
        done();
      });
  });

  it('should return status 400 if "text" is empty.', done => {
    chai.request(app)
      .put('/api/quotes')
      .set(
        'Content-Type', 'application/json'
      )
      .send({
        text: ''
      })
      .end((err, res) => {
        res.status.should.equal(400);
        done();
      });
    });

  xit('should append new entries to the end of the file.', done => {
    chai.request(app)
      .put('/api/quotes')
      .set(
        'Content-Type', 'application/json'
      )
      .send(appendData)
      .end((err, res) => {
        status = res.status;
        chai.request(app)
        .get('/api/quotes')
        .set(
          'Content-Type', 'application/json'
        )
        .end((err, res) => {
          JSON.parse(res.text).quotes.pop().should.deep.equal(appendData);
          done();
        });
      });
  });

  xit('should fill in blank or missing authors with "Anonymous".', done => {
    //Your code here!
  });
});
