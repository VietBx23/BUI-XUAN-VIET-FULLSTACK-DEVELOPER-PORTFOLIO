# Hướng dẫn Build và Deploy

## Scripts có sẵn

### Development
```bash
npm run dev              # Chạy development server (Vite) với email API
npm run email-server     # Chạy email server riêng biệt (không cần thiết)
npm run dev:full         # Chạy cả dev server và email server (không cần thiết)
```

### Production
```bash
npm install              # Cài đặt dependencies
npm run build            # Build production
npm run preview          # Preview build locally
```

### Deploy
```bash
npm run deploy           # Build và deploy lên Vercel production
npm run deploy:preview   # Build và deploy lên Vercel preview
```

## Email Functionality

### Development
- Email API hoạt động trực tiếp trong Vite dev server
- Endpoint: `http://localhost:3000/api/send-email`
- Gửi email thực qua Gmail SMTP

### Production
- **Lưu ý quan trọng**: Email API trong Vite config chỉ hoạt động trong development
- Trong production, form sẽ:
  1. Lưu message vào localStorage
  2. Hiển thị thông báo yêu cầu liên hệ trực tiếp qua email
  3. Không gửi email tự động

### Giải pháp cho Production
Để có email functionality trong production, cần:

1. **Vercel**: Sử dụng file `api/send-email.js` (đã có sẵn)
2. **Netlify**: Tạo Netlify Functions
3. **Hoặc**: Sử dụng service như EmailJS, Web3Forms

## Cấu hình đã sửa

✅ **Email handling cải thiện:**
- Xử lý lỗi JSON parsing
- Fallback khi API không khả dụng
- Lưu message vào localStorage trong mọi trường hợp
- Thông báo rõ ràng cho user

✅ **Development experience:**
- Chỉ cần `npm run dev` để chạy tất cả
- Email API tích hợp trong Vite
- Hot reload hoạt động bình thường

## Cách sử dụng

1. **Development:**
   ```bash
   npm run dev
   ```
   - Frontend + Email API: http://localhost:3000
   - Form gửi email thực qua Gmail

2. **Production Build:**
   ```bash
   npm run build
   npm run preview
   ```
   - Preview: http://localhost:4173
   - Form lưu vào localStorage + yêu cầu liên hệ trực tiếp

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## Environment Variables

Cần thiết cho development:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

## Lưu ý Production

- Messages được lưu trong localStorage của browser
- Admin panel có thể xem messages đã lưu
- User được hướng dẫn liên hệ trực tiếp qua email
- Không có email tự động trong production (trừ khi setup serverless functions)