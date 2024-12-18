const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.submitForm = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const formData = req.body;
    formData.timestamp = admin.firestore.FieldValue.serverTimestamp();

    // Determine the collection based on form type
    let collection = 'leads';
    if (formData.type === 'newsletter') {
      collection = 'newsletter_subscribers';
    } else if (formData.type === 'quick-quote') {
      collection = 'quote_requests';
    }

    // Add the document to Firestore
    await admin.firestore().collection(collection).add(formData);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}); 