const express = require('express');
const app = express();
const PORT = 3000;

// Middleware untuk membaca JSON body dari request [cite: 662]
app.use(express.json());

// Data dummy (in-memory) [cite: 663-665]
let products = [
    { id: 1, name: 'Pensil 28', price: 5000, stock: 120 },
    { id: 2, name: 'Buku Tulis', price: 12000, stock: 50 },
];

// 1. GET: Ambil semua produk [cite: 667]
app.get('/products', (req, res) => {
    res.json({ status: 'success', data: products });
});

// 2. GET by ID: Ambil 1 produk [cite: 673]
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ status: 'error', message: 'Product not found' });
    }
    res.json({ status: 'success', data: product });
});

// 3. POST: Tambah produk baru [cite: 680]
app.post('/products', (req, res) => {
    const { name, price, stock } = req.body;

    // Validasi sederhana [cite: 682]
    if (!name || price == null || stock == null) {
        return res.status(400).json({ status: 'error', message: 'Invalid input' });
    }

    const newProduct = { id: products.length + 1, name, price, stock };
    products.push(newProduct);

    // Status 201 Created [cite: 685]
    res.status(201).json({ status: 'success', message: 'Product created', data: newProduct });
});

// 4. PUT: Update produk [cite: 688]
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ status: 'error', message: 'Product not found' });
    }

    const { name, price, stock } = req.body;
    // Update data di array
    products[index] = { id, name, price, stock };

    res.json({ status: 'success', message: 'Product updated', data: products[index] });
});

// 5. DELETE: Hapus produk [cite: 700]
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ status: 'error', message: 'Product not found' });
    }

    // Hapus dari array
    products.splice(index, 1);
    
    res.json({ status: 'success', message: 'Product deleted' });
});

// Jalankan Server [cite: 707]
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});