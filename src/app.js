const express = require('express');
const app = express();
app.use(express.json());

let contacts = [
  { id: 1, name: 'Ana García',   email: 'ana@example.com',   phone: '600111222' },
  { id: 2, name: 'Luis Pérez',   email: 'luis@example.com',  phone: '600333444' },
];
let nextId = 3;

// ── Helpers ──────────────────────────────────────────────────────────────────

function isValidEmail(email) {
  return typeof email === 'string' && email.includes('@');
}

// ── Rutas ────────────────────────────────────────────────────────────────────

// GET /api/contacts — devuelve todos los contactos
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

// GET /api/contacts/:id — devuelve un contacto por ID
app.get('/api/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === Number(req.params.id));
  if (!contact) return res.status(404).json({ error: 'Contacto no encontrado.' });
  res.json(contact);
});

// POST /api/contacts — crea un contacto
app.post('/api/contacts', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'El campo name es requerido.' });
  }
  if (!email || email.trim() === '') {
    return res.status(400).json({ error: 'El campo email es requerido.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'El campo email debe contener @.' });
  }

  const newContact = {
    id: nextId++,
    name: name.trim(),
    email: email.trim(),
    ...(phone !== undefined && { phone }),
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// PUT /api/contacts/:id — actualiza parcialmente un contacto
app.put('/api/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === Number(req.params.id));
  if (!contact) return res.status(404).json({ error: 'Contacto no encontrado.' });

  const { name, email, phone } = req.body;

  if (email !== undefined && !isValidEmail(email)) {
    return res.status(400).json({ error: 'El campo email debe contener @.' });
  }

  if (name  !== undefined) contact.name  = name.trim();
  if (email !== undefined) contact.email = email.trim();
  if (phone !== undefined) contact.phone = phone;

  res.json(contact);
});

// DELETE /api/contacts/:id — elimina un contacto
app.delete('/api/contacts/:id', (req, res) => {
  const index = contacts.findIndex(c => c.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Contacto no encontrado.' });

  contacts.splice(index, 1);
  res.json({ message: 'Contacto eliminado correctamente.' });
});

module.exports = app; // sin app.listen()
