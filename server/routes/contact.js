import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

const router = express.Router();

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'devmuhammadiqbal@gmail.com',
      pass: process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD
    }
  });
};

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
      phone,
      company,
      projectType,
      budget,
      timeline,
      source
    } = req.body;

    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Create contact entry
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      phone,
      company,
      projectType,
      budget,
      timeline,
      source,
      ipAddress,
      userAgent
    });

    await contact.save();

    // Send email notification
    try {
      const transporter = createTransporter();
      
      // Email to Muhammad Iqbal
      const mailToOwner = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: 'devmuhammadiqbal@gmail.com',
        subject: `New Contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="margin-bottom: 20px;">
                <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Company:</strong> ${company || 'Not provided'}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #333;">Project Information</h3>
                <p><strong>Project Type:</strong> ${projectType}</p>
                <p><strong>Budget:</strong> ${budget}</p>
                <p><strong>Timeline:</strong> ${timeline}</p>
                <p><strong>Source:</strong> ${source}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #333;">Subject</h3>
                <p style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">${subject}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #333;">Message</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>IP Address:</strong> ${ipAddress}</p>
              </div>
            </div>
          </div>
        `
      };

      // Auto-reply to sender
      const mailToSender = {
        from: `"Muhammad Iqbal Khan" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thank you for reaching out, ${name}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Your Message!</h1>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <p>Hi <strong>${name}</strong>,</p>
              
              <p>Thank you for reaching out! I've received your message about "<strong>${subject}</strong>" and I'm excited to learn more about your project.</p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                <h3 style="margin-top: 0; color: #333;">What's Next?</h3>
                <ul style="color: #555; line-height: 1.6;">
                  <li>I'll review your requirements carefully</li>
                  <li>You can expect a detailed response within 24 hours</li>
                  <li>We can schedule a call to discuss your project in detail</li>
                </ul>
              </div>
              
              <p>In the meantime, feel free to:</p>
              <ul style="color: #555; line-height: 1.6;">
                <li>Check out my <a href="https://linkedin.com/in/m-iqbal-khan" style="color: #667eea;">LinkedIn profile</a></li>
                <li>Explore my latest projects on my portfolio</li>
                <li>Connect with me on social media</li>
              </ul>
              
              <div style="margin-top: 30px; text-align: center;">
                <p style="color: #666; margin-bottom: 10px;">Best regards,</p>
                <p style="font-size: 18px; font-weight: bold; color: #333; margin: 0;">Muhammad Iqbal Khan</p>
                <p style="color: #667eea; margin: 5px 0;">Mobile App Developer | React Native Specialist</p>
                <p style="color: #666; font-size: 14px;">📱 +92 332 8001541 | 📧 devmuhammadiqbal@gmail.com</p>
              </div>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailToOwner);
      await transporter.sendMail(mailToSender);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    });
  }
});

// GET /api/contact - Get all contacts (for admin)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-userAgent -ipAddress');

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      contacts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// PUT /api/contact/:id/status - Update contact status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated',
      contact
    });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
});

export default router;