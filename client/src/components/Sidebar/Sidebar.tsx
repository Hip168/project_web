import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Para = {
  userRole: string;
  userEmail: string;
  handleLogout: () => void;
  children?: React.ReactNode;
}

const Sidebar = ({ userRole, userEmail, handleLogout, children }: Para) => {
  const [open, setOpen] = useState(true);
  const [buttonHover, setButtonHover] = useState(false);

  const toggleSidebar = () => {
    setButtonHover(false);
    setOpen(!open);
  };
  
  return (
    <>
      {/* Outside sidebar button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed left-0 top-0 h-20 w-20 pt-2.5"
            onHoverStart={() => setButtonHover(true)}
            onHoverEnd={() => setButtonHover(false)}
          >
            <motion.button
              onClick={toggleSidebar}
              className="cursor-pointer px-3 py-1 bg-indigo-700 hover:bg-indigo-800 rounded text-sm transition-colors"
              animate={{ x: buttonHover ? 0 : "-100%" }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 50,
                ease: "easeOut",
              }}
            >
              <img
                className="aspect-square w-6 filter invert"
                src={"/hamburger.svg"}
                alt="menu toggle"
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="w-64 relative overflow-hidden h-screen bg-indigo-900 text-white flex flex-col"
            initial={{ x: "-150%", margin: 0, width: 0 }}
            animate={{ x: 0, margin: "auto", width: "16rem" }}
            exit={{ x: "-150%", margin: 0, width: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 50,
              ease: "easeOut",
            }}
          >
            <div className="p-6">
              <h1 className="text-2xl font-bold whitespace-nowrap">
                Hệ Thống QLSV
              </h1>
              <p className="text-indigo-300 text-sm mt-1">
                {userRole === "ADMIN" ? "Cổng Quản Trị" : "Cổng Sinh Viên"}
              </p>
              {/* Inside sidebar button */}
              <button
                onClick={toggleSidebar}
                className="absolute top-4 right-4 hover:text-white cursor-pointer"
              >
                <img
                  className="aspect-square w-6 fliter invert"
                  src={"/hamburger.svg"}
                  alt="menu toggle"
                />
              </button>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-hidden">
              {children}
            </nav>

            {/* User Info and Logout */}
            <div className="p-4 border-t border-indigo-800">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-lg font-bold">
                  {userEmail}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-sm truncate w-32">
                    {userEmail}
                  </p>
                  <p className="text-xs text-indigo-300">
                    {userRole === "ADMIN" ? "Quản Trị Viên" : "Sinh Viên"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
              >
                Đăng Xuất
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;