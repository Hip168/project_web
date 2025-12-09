import { motion, useAnimation } from "motion/react"
import { Link } from "react-router-dom"

const MotionLink = motion(Link);

type Para = React.HTMLAttributes<HTMLAnchorElement> & {
  to: string;
  icon?: string;
  label: string;
  isActive?: boolean;
}

const SidebarButton = ({ to, icon='', label, isActive }: Para) => {
  const hightlightControls = useAnimation();
  
  return (
    <MotionLink
      to={to}
      className={`select-none relative flex z-10 items-center px-4 py-3 rounded-full cursor-pointer transition-colors
        ${isActive ? "text-white" : "text-indigo-200 hover:bg-indigo-800 hover:text-white"}  
      `}
      draggable={false}
    >
      {/* icon */}
      <img src={icon} alt={label} className="mr-3 aspect-square w-6 invert" />

      {/* typography */}
      <span>{label}</span>

      {/* Nền tô đậm */}
      {isActive && (
        <motion.div
          layoutId="highlightMain"
          className="absolute inset-0 rounded-full bg-indigo-700 -z-5"
          animate={hightlightControls}
          onLayoutAnimationStart={async () =>
            await hightlightControls.start({ width: 50, height: 50 })
          }
          onLayoutAnimationComplete={async () =>
            await hightlightControls.start({
              width: "auto",
              height: "auto",
            })
          }
          transition={{
            layout: { type: "spring", duration: 0.5, ease: "easeIn" },
            duration: 0.1,
            ease: "easeOut",
          }}
        />
      )}
    </MotionLink>
  );
}

export default SidebarButton;