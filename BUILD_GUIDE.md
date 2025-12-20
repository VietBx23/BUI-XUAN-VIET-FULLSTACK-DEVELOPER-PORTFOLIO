# Hướng dẫn Build và Deploy

## Scripts có sẵn

### Development
```bash
npm run dev              # Chạy development server (Vite)
npm run email-server     # Chạy email server riêng biệt
npm run dev:full         # Chạy cả dev server và email server
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

## Cấu hình đã sửa

✅ **Đã cài đặt type definitions:**
- `@types/node` - Cho Node.js types
- `@types/nodemailer` - Cho nodemailer types

✅ **Đã tối ưu vite.config.ts:**
- Loại bỏ email API khỏi Vite config (sử dụng server.js riêng biệt)
- Thêm code splitting cho vendor và router
- Cấu hình build tối ưu

✅ **Build thành công:**
- Output: `dist/` folder
- Gzip compression: ~45KB cho vendor, ~44KB cho main
- Build time: ~3 giây

## Cách sử dụng

1. **Development:**
   ```bash
   npm run dev:full
   ```
   - Frontend: http://localhost:3000
   - Email API: http://localhost:3002

2. **Production Build:**
   ```bash
   npm run build
   npm run preview
   ```
   - Preview: http://localhost:4173

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## Lưu ý

- Email server chạy riêng biệt trên port 3002
- Frontend build không bao gồm server-side code
- Cần cấu hình `.env` cho email functionality