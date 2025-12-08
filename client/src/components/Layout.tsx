import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import type { RootState } from '../store/store';
import Sidebar from './Sidebar/Sidebar';
import SidebarButton from './Sidebar/SidebarButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const adminMenuItems = [
    { path: '/admin', label: 'Trang Chủ', icon: '/TrangChu.svg' },
    { path: '/admin/students', label: 'Sinh Viên', icon: '/sinhvien.svg' },
    { path: '/admin/classes', label: 'Lớp Học', icon: '/lophoc.svg' },
    { path: '/admin/verification', label: 'Xác Thực', icon: '/xacthuc.svg' },
    { path: '/admin/activities', label: 'Hoạt Động', icon: '/hoatdong.svg' },
    { path: '/admin/reports', label: 'Báo Cáo', icon: '/report.svg' },
  ];

  const studentMenuItems = [
    { path: "/student", label: "Trang Chủ", icon: "/TrangChu.svg" },
    { path: "/student/class", label: "Lớp Của Tôi", icon: "/class.svg" },
    { path: "/student/reports", label: "Báo Cáo", icon: "/report.svg" },
  ];

  const menuItems = user?.role === 'ADMIN' ? adminMenuItems : studentMenuItems;

  if (!user) return null;

  return (
    <div className="flex flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        userRole={user?.role || ""}
        userEmail={user?.profile?.hoTen || "U"}
        handleLogout={handleLogout}
      >
        {menuItems.map((item) => (
          <SidebarButton
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.path}
          />
          // <Link
          //   key={item.path}
          //   to={item.path}
          //   className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
          //     location.pathname === item.path
          //       ? "bg-indigo-700 text-white"
          //       : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
          //   } `}
          // >
          //   <span className="mr-3">{item.icon}</span>
          //   {item.label}
          // </Link>
        ))}
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {menuItems.find((i) => i.path === location.pathname)?.label ||
              "Dashboard"}
          </h2>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
