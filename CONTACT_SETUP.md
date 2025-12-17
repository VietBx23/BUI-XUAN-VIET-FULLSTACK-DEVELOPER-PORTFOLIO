# 📧 Contact Form Setup Guide

## Option 1: Formspree (Recommended - Easiest)

### 1. Tạo tài khoản Formspree
- Truy cập: https://formspree.io/
- Đăng ký với email: vietbx23@gmail.com
- Tạo form mới

### 2. Lấy Form ID
- Sau khi tạo form, bạn sẽ có URL như: `https://formspree.io/f/YOUR_FORM_ID`
- Copy `YOUR_FORM_ID`

### 3. Cập nhật code
Trong `components/Footer.tsx`, thay:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```
Thành:
```javascript
const response = await fetch('https://formspree.io/f/FORM_ID_THỰC_TẾ', {
```

### 4. Deploy và test
- Deploy website
- Test form contact
- Email sẽ được gửi đến vietbx23@gmail.com

---

## Option 2: EmailJS (Advanced)

### 1. Tạo tài khoản EmailJS
- Truy cập: https://www.emailjs.com/
- Đăng ký tài khoản

### 2. Setup Gmail Service
- Tạo Email Service với Gmail
- Sử dụng email: vietbx23@gmail.com
- App password: jdee utax cypo igbq

### 3. Tạo Email Template
- Template ID: template_contact
- Template content:
```
From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

{{message}}
```

### 4. Lấy Public Key
- Vào Account > API Keys
- Copy Public Key

### 5. Cập nhật code
Thay trong Footer.tsx:
```javascript
user_id: 'YOUR_PUBLIC_KEY_THỰC_TẾ',
service_id: 'SERVICE_ID_THỰC_TẾ',
template_id: 'template_contact'
```

---

## Option 3: Netlify Forms (Nếu deploy trên Netlify)

### 1. Thêm attribute vào form
```html
<form netlify data-netlify="true" name="contact">
```

### 2. Netlify sẽ tự động handle
- Không cần code JavaScript phức tạp
- Email sẽ được gửi đến admin email

---

## 🚀 Quick Setup (5 phút)

**Cách nhanh nhất:**

1. Vào https://formspree.io/
2. Đăng ký với vietbx23@gmail.com
3. Tạo form mới
4. Copy Form ID
5. Thay trong code: `YOUR_FORM_ID` → `Form ID thực tế`
6. Deploy!

**Done!** 🎉