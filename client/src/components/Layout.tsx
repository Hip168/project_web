import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import type { RootState } from '../store/store';
import Sidebar from './Sidebar/Sidebar';

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
    { path: '/admin', label: 'Trang Chủ', icon: '📊' },
    { path: '/admin/students', label: 'Sinh Viên', icon: '👨‍🎓' },
    { path: '/admin/classes', label: 'Lớp Học', icon: '🏫' },
    { path: '/admin/verification', label: 'Xác Thực', icon: '✅' },
    { path: '/admin/activities', label: 'Hoạt Động', icon: '🏆' },
    { path: '/admin/reports', label: 'Báo Cáo', icon: '📈' },
  ];

  const studentMenuItems = [
    { path: '/student', label: 'Trang Chủ', icon: '🏠' },
    { path: '/student/class', label: 'Lớp Của Tôi', icon: '👥' },
    { path: '/student/reports', label: 'Báo Cáo', icon: '📝' },
  ];

  const menuItems = user?.role === 'ADMIN' ? adminMenuItems : studentMenuItems;

  if (!user) return null;

  return (
    <div className="flex flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        userRole={user?.role || ""}
        userEmail={user?.email?.[0]?.toUpperCase() || "U"}
        handleLogout={handleLogout}
      >
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? "bg-indigo-700 text-white"
                : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
            } `}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
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
