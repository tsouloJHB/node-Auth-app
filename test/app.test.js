const request = require('supertest');
const app = require('../app');

describe('Auth ', () =>{
    it('should run',()=>{
        
    });
    it('GET /login  --> html body',()=>{
        return request(app).get('/login')
        .expect('Content-Type',/html/)
        .expect(200)
       
    }); 
    it('POST /login --> login user',()=>{
        return request(app).post('/login').send({
            email:'marry@gmail.com',
            password:'1234567'
        }).expect('Content-Type',/json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    user: expect.any(String)
                })
            );
        });
    });
    it('GET /signup  --> html body',()=>{
        return request(app).get('/signup')
        .expect('Content-Type', /html/)
        .expect(200)
    });
    // it('POST /signup  --> sign user',()=>{
        
    //     return request(app).post('/signup').send({
    //         email:'jeff@gmail.com',
    //         password:'1234567'
    //     }).expect('Content-Type',/json/)
    //     .expect(201)
    //     .then((response) => {
    //         expect(response.body).toEqual(
    //             expect.objectContaining({
    //                 user: expect.any(String)
    //             })
    //         );
    //     });

    // });
    it('GET /login/id  --> 404 if not found',()=>{
    
    });

});