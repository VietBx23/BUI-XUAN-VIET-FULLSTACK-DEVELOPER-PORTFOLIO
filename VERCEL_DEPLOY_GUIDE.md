# Hướng dẫn Deploy lên Vercel

## 🚀 Các bước deploy

### 1. Chuẩn bị project
```bash
npm run build
```

### 2. Deploy lên Vercel
- Truy cập [vercel.com](https://vercel.com)
- Import project từ GitHub
- Hoặc sử dụng Vercel CLI:
```bash
npm i -g vercel
vercel
```

### 3. Cấu hình Environment Variables trên Vercel
Trong Vercel Dashboard > Settings > Environment Variables, thêm:

```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

### 4. Kiểm tra cấu hình

#### ✅ Files cần thiết đã có:
- `api/send-email.js` - Vercel API route
- `vercel.json` - Cấu hình Vercel
- `package.json` - Dependencies (nodemailer)

#### ✅ Contact form đã được cập nhật:
- Gửi POST request đến `/api/send-email`
- Xử lý response từ API

## 🔧 Troubleshooting

### Lỗi 500 - Internal Server Error
- Kiểm tra Environment Variables trên Vercel
- Xem logs trong Vercel Dashboard > Functions

### Lỗi CORS
- API route tự động xử lý CORS
- Không cần cấu hình thêm

### Email không gửi được
- Kiểm tra Gmail App Password
- Đảm bảo 2FA đã bật cho Gmail
- Kiểm tra logs trong Vercel Functions

## 📝 Lưu ý
- API route chỉ hoạt động trên production (Vercel)
- Local development vẫn sử dụng Vite middleware
- Environment variables phải được set trên Vercel Dashboard