import express from 'express';
import cors from 'cors';
import { query } from './db.js';
import { initializeDatabase } from './init-db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    const dbRes = await query('SELECT NOW()');
    res.json({
      status: 'UP',
      service: 'Ecell Backend API',
      timestamp: dbRes.rows[0].now,
    });
  } catch (err) {
    res.status(500).json({ status: 'DOWN', error: err.message });
  }
});

// GET /api/products - Filter by category or search query
app.get('/api/products', async (req, res) => {
  try {
    const { category, q } = req.query;
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }

    if (q) {
      params.push(`%${q}%`);
      sql += ` AND (name ILIKE $${params.length} OR description ILIKE $${params.length})`;
    }

    sql += ' ORDER BY id ASC';
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products - Add product
app.post('/api/products', async (req, res) => {
  try {
    const { name, category, price, stock, description, specs, image_url, badge } = req.body;
    const result = await query(
      `INSERT INTO products (name, category, price, stock, description, specs, image_url, badge)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, category, price, stock || 0, description, specs || {}, image_url || '', badge || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// GET /api/services - Software solutions catalog
app.get('/api/services', async (req, res) => {
  try {
    const result = await query('SELECT * FROM services ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// POST /api/service-requests - Submit software service booking
app.post('/api/service-requests', async (req, res) => {
  try {
    const { customer_name, customer_email, customer_phone, service_type, device_details, issue_description } = req.body;
    
    if (!customer_name || !customer_email || !customer_phone || !service_type) {
      return res.status(400).json({ error: 'Missing required customer contact details or service type' });
    }

    const result = await query(
      `INSERT INTO service_requests (customer_name, customer_email, customer_phone, service_type, device_details, issue_description)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [customer_name, customer_email, customer_phone, service_type, device_details || '', issue_description || '']
    );

    res.status(201).json({
      message: 'Service request submitted successfully!',
      request: result.rows[0]
    });
  } catch (err) {
    console.error('Error creating service request:', err);
    res.status(500).json({ error: 'Failed to submit service request' });
  }
});

// GET /api/service-requests - List service requests
app.get('/api/service-requests', async (req, res) => {
  try {
    const result = await query('SELECT * FROM service_requests ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service requests' });
  }
});

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Ecell Backend API running on port ${PORT}`);
  });
});
