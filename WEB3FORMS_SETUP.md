# 📧 Web3Forms Setup - 2 phút hoàn thành!

## 🚀 **Cách đơn giản nhất (Miễn phí 1000 emails/tháng)**

### **Bước 1: Lấy Access Key**
1. Vào https://web3forms.com/
2. Nhập email: vietbx23@gmail.com
3. Nhấn **Create Access Key**
4. Copy Access Key (ví dụ: `abcd1234-5678-90ef-ghij-klmnopqrstuv`)

### **Bước 2: Cập nhật Code**
Thay toàn bộ phần fetch trong `components/Footer.tsx`:

```javascript
// Sử dụng Web3Forms - Đơn giản nhất
const formData = new FormData();
formData.append('access_key', 'abcd1234-5678-90ef-ghij-klmnopqrstuv'); // ← Access Key từ bước 1
formData.append('name', formState.name);
formData.append('email', formState.email);
formData.append('subject', formState.subject);
formData.append('message', formState.message);

const response = await fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  body: formData
});
```

### **Bước 3: Deploy & Test**
1. Deploy website
2. Test form contact  
3. Email đến vietbx23@gmail.com ngay!

---

## ✅ **Ưu điểm Web3Forms:**
- ✅ **Siêu đơn giản**: Chỉ cần 1 Access Key
- ✅ **Miễn phí**: 1000 emails/tháng
- ✅ **Không cần setup**: Không cần tạo template
- ✅ **Spam protection**: Built-in
- ✅ **File upload**: Support (nếu cần)

## 🎯 **So sánh:**

| Service | Setup Time | Free Limit | Complexity |
|---------|------------|------------|------------|
| **Web3Forms** | 2 phút | 1000/tháng | ⭐ Siêu dễ |
| **EmailJS** | 5 phút | 200/tháng | ⭐⭐ Dễ |
| **API Backend** | 30 phút | Unlimited | ⭐⭐⭐⭐⭐ Khó |

**Recommend: Web3Forms!** 🎉