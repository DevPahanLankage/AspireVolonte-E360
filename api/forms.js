const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Lead Schema
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  insuranceType: String,
  contactTime: String,
  message: String,
  source: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'new' }
});

const Lead = mongoose.model('Lead', leadSchema);

// Email Templates
const emailTemplates = {
  welcome: {
    subject: 'Welcome to Aspire Volonte Insurance',
    html: `
      <h2>Thank you for choosing Aspire Volonte Insurance</h2>
      <p>We're excited to help you protect what matters most.</p>
      <p>Here's what happens next:</p>
      <ol>
        <li>Our insurance specialist will review your request</li>
        <li>We'll contact you during your preferred time</li>
        <li>We'll create a personalized insurance plan for you</li>
      </ol>
      <p>In the meantime, download our free Insurance Planning Guide:</p>
      <a href="/downloads/insurance-guide.pdf" style="background: #00509e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Download Guide</a>
    `
  },
  followUp: {
    subject: 'Your Insurance Quote from Aspire Volonte',
    html: `
      <h2>Your Personalized Insurance Quote</h2>
      <p>Based on the information you provided, we've prepared a customized insurance quote for you.</p>
      <p>Key benefits of your selected plan:</p>
      <ul>
        <li>Comprehensive coverage</li>
        <li>Flexible payment options</li>
        <li>24/7 customer support</li>
      </ul>
      <p>Schedule a call with our specialist to discuss your quote:</p>
      <a href="/schedule" style="background: #00509e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Schedule Call</a>
    `
  }
};

// Lead Nurturing Sequence
const nurturingSequence = [
  {
    delay: 0, // Immediate
    template: 'welcome'
  },
  {
    delay: 2 * 24 * 60 * 60 * 1000, // 2 days
    template: 'followUp'
  }
];

// Form Submission Handler
async function handleFormSubmission(req, res) {
  try {
    const { name, email, phone, insuranceType, contactTime, message, source } = req.body;

    // Create new lead in database
    const lead = new Lead({
      name,
      email,
      phone,
      insuranceType,
      contactTime,
      message,
      source
    });
    await lead.save();

    // Start nurturing sequence
    startNurturingSequence(lead);

    // Send internal notification
    await sendInternalNotification(lead);

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ error: 'Form submission failed' });
  }
}

// Start Nurturing Sequence
async function startNurturingSequence(lead) {
  for (const step of nurturingSequence) {
    setTimeout(async () => {
      try {
        const template = emailTemplates[step.template];
        await sendEmail(lead.email, template.subject, template.html);
      } catch (error) {
        console.error('Error sending nurturing email:', error);
      }
    }, step.delay);
  }
}

// Send Email
async function sendEmail(to, subject, html) {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject,
    html
  };
  await sgMail.send(msg);
}

// Send Internal Notification
async function sendInternalNotification(lead) {
  const msg = {
    to: process.env.INTERNAL_NOTIFICATION_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'New Lead Submission',
    html: `
      <h2>New Lead Details</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Insurance Type:</strong> ${lead.insuranceType}</p>
      <p><strong>Preferred Contact Time:</strong> ${lead.contactTime}</p>
      <p><strong>Message:</strong> ${lead.message}</p>
      <p><strong>Source:</strong> ${lead.source}</p>
    `
  };
  await sgMail.send(msg);
}

module.exports = {
  handleFormSubmission
}; 