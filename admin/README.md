# Portfolio Admin Dashboard

Hệ thống quản lý nội dung portfolio với giao diện admin hiện đại.

## Tính năng

### 🔐 Authentication
- Đăng nhập bảo mật với credentials:
  - **Username**: `admin`
  - **Password**: `XuanViet23@`
- Session management với localStorage
- Auto-logout sau 24 giờ

### 📊 Dashboard Features
- **Personal Info Manager**: Quản lý thông tin cá nhân, liên hệ, career goals
- **Experience Manager**: CRUD operations cho kinh nghiệm làm việc
- **Projects Manager**: Quản lý dự án với images, links, tech stack
- **Skills Manager**: Quản lý kỹ năng theo categories với icons
- **Education Manager**: Cập nhật thông tin học vấn

### 🎨 UI/UX Features
- Modern dark/light theme
- Responsive design
- Real-time form validation
- Unsaved changes detection
- Loading states & success messages
- Intuitive CRUD operations

## Cách sử dụng

### 1. Truy cập Admin Dashboard
```
http://localhost:5173/admin
```

### 2. Đăng nhập
- Username: `admin`
- Password: `XuanViet23@`

### 3. Quản lý nội dung
- Chọn tab tương ứng từ sidebar
- Thêm/sửa/xóa thông tin
- Click "Save" để lưu thay đổi

## Cấu trúc Files

```
admin/
├── AdminDashboard.tsx      # Main dashboard component
├── LoginForm.tsx           # Authentication form
├── PersonalInfoManager.tsx # Personal info CRUD
├── ExperienceManager.tsx   # Experience CRUD
├── ProjectsManager.tsx     # Projects CRUD
├── SkillsManager.tsx       # Skills CRUD
├── EducationManager.tsx    # Education CRUD
└── README.md              # Documentation
```

## Data Storage

Hiện tại data được lưu trong localStorage với keys:
- `admin_auth` - Authentication data
- `portfolio_personal_data` - Personal information
- `portfolio_experience_data` - Work experience
- `portfolio_projects_data` - Projects data
- `portfolio_skills_data` - Skills data
- `portfolio_education_data` - Education data

## Security Features

- Password protection
- Session timeout
- Input validation
- XSS protection
- Secure form handling

## Future Enhancements

- [ ] Backend API integration
- [ ] Database storage
- [ ] File upload for images
- [ ] Bulk operations
- [ ] Export/Import functionality
- [ ] User roles & permissions
- [ ] Activity logging
- [ ] Real-time preview

## Technical Stack

- **React 18** + TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- **localStorage** for data persistence