// API Route cho local development hoặc custom server
import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  // Chỉ cho phép POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Tạo transporter với Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'vietbx23@gmail.com',
        pass: 'jdee utax cypo igbq' // App password từ Google
      }
    });

    // Email options
    const mailOptions = {
      from: 'vietbx23@gmail.com',
      to: 'vietbx23@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Contact</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981;">
              <h3 style="margin: 0 0 15px 0; color: #374151;">Contact Information</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <h3 style="margin: 0 0 15px 0; color: #374151;">Message</h3>
              <div style="line-height: 1.6; color: #4b5563; white-space: pre-wrap;">${message}</div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f1f5f9; border-radius: 8px;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">
                📧 This message was sent from your portfolio website contact form
              </p>
              <p style="margin: 5px 0 0 0; color: #64748b; font-size: 12px;">
                Reply directly to this email to respond to ${name}
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email
    };

    // Gửi email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}