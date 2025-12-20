# 📧 Gmail App Password Setup - Gửi Email Trực Tiếp

## 🚀 **Setup với Gmail cá nhân + Netlify Functions**

### **Bước 1: Tạo Gmail App Password**

1. **Vào Google Account**: https://myaccount.google.com/
2. **Security** → **2-Step Verification** (bật nếu chưa có)
3. **App passwords** → **Select app**: Mail → **Select device**: Other
4. **Đặt tên**: "Portfolio Contact Form"
5. **Copy mật khẩu 16 ký tự**: `abcd efgh ijkl mnop`

### **Bước 2: Setup Environment Variables**

**Netlify:**
1. Vào Netlify Dashboard → Site Settings → Environment Variables
2. Thêm:
   - `GMAIL_USER` = `vietbx23@gmail.com`
   - `GMAIL_APP_PASSWORD` = `abcd efgh ijkl mnop` (từ bước 1)

**Vercel:**
1. Vào Vercel Dashboard → Project Settings → Environment Variables
2. Thêm same variables như trên

### **Bước 3: Files đã tạo**

✅ `netlify/functions/send-email.js` - Serverless function
✅ `netlify/functions/package.json` - Dependencies

### **Bước 4: Cập nhật Footer.tsx**

Thay phần `handleSubmit` trong `components/Footer.tsx`:

```javascript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // Gửi email qua Netlify Function
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formState.name,
        email: formState.email,
        subject: formState.subject,
        message: formState.message
      })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // Reset form
      setFormState({ name: '', email: '', subject: '', message: '' });
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 16px 24px; border-radius: 12px; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3); z-index: 9999; font-weight: 600;">
          ✅ Email sent successfully!
        </div>
      `;
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 4000);
    } else {
      throw new Error(result.message || 'Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Show error message
    const errorMessage = document.createElement('div');
    errorMessage.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: #ef4444; color: white; padding: 16px 24px; border-radius: 12px; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3); z-index: 9999; font-weight: 600;">
        ❌ Failed to send email. Please try again.
      </div>
    `;
    document.body.appendChild(errorMessage);
    
    setTimeout(() => {
      document.body.removeChild(errorMessage);
    }, 5000);
  } finally {
    setIsSubmitting(false);
  }
};
```

### **Bước 5: Deploy & Test**

1. **Commit & Push** code
2. **Deploy** trên Netlify/Vercel
3. **Test form** → Email sẽ đến Gmail ngay lập tức!

---

## ✅ **Kết quả:**

- ✅ **Form gửi email thật** đến vietbx23@gmail.com
- ✅ **Template đẹp** với HTML styling
- ✅ **Reply-to** = email người gửi
- ✅ **Secure** - App password, không expose credentials
- ✅ **Free** - Không giới hạn emails
- ✅ **Fast** - Gửi ngay lập tức

## 🎯 **Email Template:**

```
Subject: Portfolio Contact: [Subject từ form]

From: [Tên người gửi] <[Email người gửi]>

Message:
[Nội dung tin nhắn]

---
Sent from Portfolio Contact Form
[Timestamp]
```

**Done!** 🎉 Form giờ sẽ gửi email thật đến Gmail của bạn!