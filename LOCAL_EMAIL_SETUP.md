# 📧 Local Email Setup - Gửi Email Thật Từ Local

## 🚀 **Setup Hoàn Thành - Chỉ Cần Chạy!**

### **Bước 1: Start Email Server + Frontend**

**Option 1: Chạy cả hai cùng lúc (Khuyến nghị)**
```bash
npm run dev:full
```

**Option 2: Chạy riêng lẻ (2 terminals)**
```bash
# Terminal 1: Email Server
npm run email-server

# Terminal 2: Frontend
npm run dev
```

### **Bước 2: Test Contact Form**

1. **Mở browser**: http://localhost:5173
2. **Scroll xuống** Contact Form
3. **Fill form** với thông tin test:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Message
   - Message: This is a test message
4. **Click Send** → Email sẽ gửi thật đến vietbx23@gmail.com!

---

## ✅ **Cách Hoạt Động:**

### **Local Development:**
- ✅ **Frontend**: http://localhost:5173 (Vite)
- ✅ **Email Server**: http://localhost:3001 (Express)
- ✅ **Form submit** → Call local API → **Gửi email thật**

### **Production:**
- ✅ **Frontend**: Netlify/Vercel
- ✅ **Email Server**: Netlify Functions
- ✅ **Form submit** → Call serverless function → **Gửi email thật**

---

## 🔧 **Troubleshooting:**

### **Lỗi "Failed to fetch":**
```bash
# Đảm bảo email server đang chạy
npm run email-server
```

### **Lỗi "Email configuration error":**
- ✅ Check file `.env` có đúng credentials
- ✅ Gmail App Password phải 16 ký tự
- ✅ 2-Step Verification phải được bật

### **Check Email Server Status:**
```bash
# Mở browser: http://localhost:3001/api/health
# Sẽ thấy: {"status":"OK","message":"Email server is running"}
```

---

## 📧 **Email Template:**

Khi gửi thành công, email sẽ có format đẹp:

```
Subject: Portfolio Contact: [Subject từ form]

┌─────────────────────────────────┐
│        New Contact Message      │
└─────────────────────────────────┘

Contact Information:
• Name: [Tên người gửi]
• Email: [Email người gửi] 
• Subject: [Chủ đề]

Message:
[Nội dung tin nhắn]

---
Sent from Portfolio Contact Form
[Timestamp Vietnam]
```

---

## 🎯 **Commands Summary:**

```bash
# Chạy cả hai (Khuyến nghị)
npm run dev:full

# Chỉ email server
npm run email-server

# Chỉ frontend
npm run dev

# Check health
curl http://localhost:3001/api/health
```

**Done!** 🎉 **Form giờ gửi email thật từ local development!**