import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Welcome');
  });

  describe('/animals', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/animals')
        .expect(200)
        .expect([]);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/animals')
        .send({
          name: 'Chichi',
          breeds: ['Poodle', 'Smart', 'Beautiful'],
          age: 10,
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/animals')
        .send({
          name: 'Chichi',
          breeds: ['Poodle', 'Smart', 'Beautiful'],
          age: 10,
          other: 'Cute',
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/animals').expect(404);
    });
  });

  describe('/animals/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/animals/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/animals/999').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/animals/1')
        .send({ name: 'updated' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/animals/1').expect(200);
    });
  });
});
