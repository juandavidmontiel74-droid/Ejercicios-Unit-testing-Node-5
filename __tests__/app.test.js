const request = require('supertest');
const app = require('../src/app');

describe('Contacts API', () => {

  // ── GET /api/contacts ──────────────────────────────────────────────────────
  describe('GET /api/contacts', () => {
    it('devuelve status 200 y un array', async () => {
      const res = await request(app).get('/api/contacts');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // ── GET /api/contacts/:id ──────────────────────────────────────────────────
  describe('GET /api/contacts/:id', () => {
    it('devuelve el contacto correcto', async () => {
      const res = await request(app).get('/api/contacts/1');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ id: 1, name: 'Ana García', email: 'ana@example.com' });
    });

    it('devuelve 404 para un ID inexistente', async () => {
      const res = await request(app).get('/api/contacts/9999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  // ── POST /api/contacts ─────────────────────────────────────────────────────
  describe('POST /api/contacts', () => {
    it('crea el contacto y devuelve 201 con el objeto creado', async () => {
      const res = await request(app)
        .post('/api/contacts')
        .send({ name: 'Carlos López', email: 'carlos@example.com', phone: '600555666' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ name: 'Carlos López', email: 'carlos@example.com' });
      expect(res.body.id).toBeDefined();
    });

    it('devuelve 400 si falta el name', async () => {
      const res = await request(app)
        .post('/api/contacts')
        .send({ email: 'sinname@example.com' });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/name/i);
    });

    it('devuelve 400 si el email no tiene @', async () => {
      const res = await request(app)
        .post('/api/contacts')
        .send({ name: 'Sin Arroba', email: 'correo-invalido' });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/@/);
    });
  });

  // ── PUT /api/contacts/:id ──────────────────────────────────────────────────
  describe('PUT /api/contacts/:id', () => {
    it('actualiza correctamente los campos enviados', async () => {
      const res = await request(app)
        .put('/api/contacts/2')
        .send({ phone: '699000111' });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ id: 2, phone: '699000111' });
    });

    it('devuelve 404 para un ID inexistente', async () => {
      const res = await request(app)
        .put('/api/contacts/9999')
        .send({ name: 'Nadie' });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  // ── DELETE /api/contacts/:id ───────────────────────────────────────────────
  describe('DELETE /api/contacts/:id', () => {
    it('elimina el contacto y devuelve confirmación', async () => {
      // Primero creamos uno para no afectar los datos de otros tests
      const created = await request(app)
        .post('/api/contacts')
        .send({ name: 'Temporal', email: 'temp@example.com' });

      const res = await request(app).delete(`/api/contacts/${created.body.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message');
    });

    it('devuelve 404 para un ID inexistente', async () => {
      const res = await request(app).delete('/api/contacts/9999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

});
