# 🚀 API Email Deploy Guide

## ✅ **Đã Setup:**

### **Files Created:**
- `api/send-email.js` - Netlify Functions
- `api/send-email-vercel.js` - Vercel API Routes  
- `api/send-email.ts` - TypeScript version
- `api/package.json` - Dependencies
- `netlify.toml` - Netlify config
- `vercel.json` - Vercel config

### **Gmail Configuration:**
- **Email**: vietbx23@gmail.com
- **App Password**: jdee utax cypo igbq
- **SMTP**: Gmail service

---

## 🌐 **Deploy Instructions:**

### **1. Netlify Deploy:**
```bash
# 1. Build project
npm run build

# 2. Deploy to Netlify
# - Connect GitHub repo
# - Build command: npm run build
# - Publish directory: dist
# - Functions directory: api

# 3. API sẽ available tại:
# https://your-site.netlify.app/.netlify/functions/send-email
```

### **2. Vercel Deploy:**
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod

# 3. API sẽ available tại:
# https://your-site.vercel.app/api/send-email-vercel
```

### **3. Custom Server:**
```bash
# Sử dụng api/send-email.ts với Next.js hoặc Express
```

---

## 🔧 **Frontend Integration:**

Form sẽ tự động detect platform:
- **Netlify**: `/.netlify/functions/send-email`
- **Vercel**: `/api/send-email-vercel`  
- **Other**: `/api/send-email`

---

## 📧 **Email Features:**

### **Gửi đến:** vietbx23@gmail.com
### **Template HTML đẹp:**
- Header gradient xanh
- Contact info trong box
- Message với formatting
- Footer thông tin
- Reply-to sender email

### **Error Handling:**
- Validation input
- SMTP error handling  
- Fallback to mailto
- User-friendly messages

---

## 🧪 **Test API:**

### **Local Test:**
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

### **Production Test:**
```bash
curl -X POST https://your-site.com/.netlify/functions/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject", 
    "message": "Test message"
  }'
```

---

## ✅ **Ready to Deploy!**

1. **Push code** to GitHub
2. **Connect** to Netlify/Vercel
3. **Deploy** 
4. **Test** contact form
5. **Receive emails** in vietbx23@gmail.com

**All set!** 🎉