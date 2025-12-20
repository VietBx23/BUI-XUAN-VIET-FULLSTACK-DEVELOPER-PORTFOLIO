import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Custom plugin for email API
    {
      name: 'email-api',
      configureServer(server) {
        server.middlewares.use('/api/send-email', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end('Method Not Allowed')
            return
          }

          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', async () => {
            try {
              const { name, email, subject, message } = JSON.parse(body)

              if (!name || !email || !subject || !message) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: false, message: 'Missing required fields' }))
                return
              }

              // Send email
              await transporter.sendMail({
                from: process.env.GMAIL_USER,
                to: process.env.GMAIL_USER,
                replyTo: email,
                subject: `Portfolio Contact: ${subject}`,
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px 10px 0 0;">
                      <h2 style="color: white; margin: 0;">New Contact Message</h2>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                      <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #1f2937; margin-top: 0;">Contact Information</h3>
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
                      </div>
                      
                      <div style="background: white; padding: 20px; border-radius: 8px;">
                        <h3 style="color: #1f2937; margin-top: 0;">Message</h3>
                        <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                      </div>
                      
                      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
                        <p>Sent from Portfolio Contact Form</p>
                        <p>${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>
                      </div>
                    </div>
                  </div>
                `
              })

              console.log(`📧 Email sent from ${name} (${email})`)

              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, message: 'Email sent successfully' }))

            } catch (error) {
              console.error('❌ Email error:', error)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, message: 'Failed to send email' }))
            }
          })
        })
      }
    }
  ],
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true
  }
})