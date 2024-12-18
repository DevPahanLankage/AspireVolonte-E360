const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { db } = require('./config/firebase');
const { collection, addDoc, serverTimestamp } = require('firebase/firestore');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve static files
app.use(express.static(path.join(__dirname)));

// API Routes
app.post('/api/submit-form', async (req, res) => {
  try {
    const formData = {
      ...req.body,
      timestamp: serverTimestamp(),
      status: 'new'
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, 'leads'), formData);
    
    console.log('Form submitted:', docRef.id);
    res.json({ 
      success: true, 
      message: 'Form submitted successfully',
      leadId: docRef.id
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Form submission failed' });
  }
});

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the website`);
}); 