// // ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// // ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// // ____________________________________________________________________
// import request from 'supertest';
// import { app } from '../../express';

// describe('UserController', () => {
//   it('should register a user successfully', async () => {
//     const response = await request(app)
//       .post('/api/users/register')
//       .send({
//         user_name: 'Test',
//         user_last_name: 'User',
//         user_email: 'test@example.com',
//         user_password: 'StrongPass123!'
//       });

//     expect(response.status).toBe(201);
//     expect(response.body.message).toBe('User registered successfully');
//   });

//   it('should return an error if the email is already taken', async () => {
//     await request(app)
//       .post('/api/users/register')
//       .send({
//         user_name: 'Test',
//         user_last_name: 'User',
//         user_email: 'test@example.com',
//         user_password: 'StrongPass123!'
//       });

//     const response = await request(app)
//       .post('/api/users/register')
//       .send({
//         user_name: 'Another Test',
//         user_last_name: 'Another User',
//         user_email: 'test@example.com',
//         user_password: 'StrongPass123!'
//       });

//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe('User already exists');
//   });
// });
