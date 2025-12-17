# 📧 EmailJS Setup - 5 phút hoàn thành!

## 🚀 **Setup EmailJS (Miễn phí 200 emails/tháng)**

### **Bước 1: Tạo tài khoản EmailJS**
1. Vào https://www.emailjs.com/
2. Đăng ký với email: vietbx23@gmail.com
3. Verify email

### **Bước 2: Tạo Email Service**
1. Vào **Email Services** → **Add New Service**
2. Chọn **Gmail**
3. **Service ID**: `service_viet_portfolio`
4. Connect với Gmail: vietbx23@gmail.com
5. **Save**

### **Bước 3: Tạo Email Template**
1. Vào **Email Templates** → **Create New Template**
2. **Template ID**: `template_contact_form`
3. **Template content**:

```
Subject: Portfolio Contact: {{subject}}

From: {{from_name}} <{{from_email}}>

Message:
{{message}}

---
Sent from Portfolio Contact Form
```

4. **Save Template**

### **Bước 4: Lấy Public Key**
1. Vào **Account** → **General**
2. Copy **Public Key** (ví dụ: `qJX8vQqQJqJX8vQqQ`)

### **Bước 5: Cập nhật Code**
Trong `components/Footer.tsx`, thay:

```javascript
service_id: 'service_viet_portfolio',     // ← Service ID từ bước 2
template_id: 'template_contact_form',     // ← Template ID từ bước 3  
user_id: 'qJX8vQqQJqJX8vQqQ',           // ← Public Key từ bước 4
```

### **Bước 6: Deploy & Test**
1. Deploy website
2. Test form contact
3. Email sẽ đến vietbx23@gmail.com ngay lập tức!

---

## ✅ **Kết quả:**
- ✅ Người dùng điền form → bấm Send
- ✅ Email gửi trực tiếp từ website  
- ✅ Bạn nhận email trong vietbx23@gmail.com
- ✅ Không cần mở email client
- ✅ Hoạt động trên mọi device/browser

## 🎯 **Lưu ý:**
- **Miễn phí**: 200 emails/tháng
- **Không cần backend**: Chạy hoàn toàn từ frontend
- **Bảo mật**: Không expose password
- **Nhanh**: Setup 5 phút, hoạt động ngay

**Done!** 🎉