import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Smooth spring animation for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  // Transform scroll progress to various line movements
  const line1Y = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const line2Y = useTransform(smoothProgress, [0, 1], ["100%", "0%"]);
  const line3X = useTransform(smoothProgress, [0, 1], ["-50%", "50%"]);
  const line4X = useTransform(smoothProgress, [0, 1], ["50%", "-50%"]);
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(smoothProgress, [0, 1], [180, 0]);
  const scale1 = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.5, 1]);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* SVG Container for animated paths */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient definitions */}
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Vertical Moving Line 1 - Left Side */}
      <motion.div
        className="absolute left-[10%] w-[1px] h-[30vh]"
        style={{
          y: line1Y,
          background:
            "linear-gradient(to bottom, transparent, #8b5cf6, transparent)",
          filter: "blur(1px)",
          boxShadow: "0 0 20px #8b5cf6",
        }}
      />

      {/* Vertical Moving Line 2 - Right Side */}
      <motion.div
        className="absolute right-[15%] w-[1px] h-[40vh]"
        style={{
          y: line2Y,
          background:
            "linear-gradient(to bottom, transparent, #3b82f6, transparent)",
          filter: "blur(1px)",
          boxShadow: "0 0 20px #3b82f6",
        }}
      />

      {/* Horizontal Moving Line 1 - Top */}
      <motion.div
        className="absolute top-[20%] h-[1px] w-[25vw]"
        style={{
          x: line3X,
          left: "20%",
          background:
            "linear-gradient(to right, transparent, #ec4899, transparent)",
          filter: "blur(1px)",
          boxShadow: "0 0 20px #ec4899",
        }}
      />

      {/* Horizontal Moving Line 2 - Bottom */}
      <motion.div
        className="absolute bottom-[30%] h-[1px] w-[30vw]"
        style={{
          x: line4X,
          right: "10%",
          background:
            "linear-gradient(to right, transparent, #8b5cf6, transparent)",
          filter: "blur(1px)",
          boxShadow: "0 0 20px #8b5cf6",
        }}
      />

      {/* Diagonal Rotating Line 1 */}
      <motion.div
        className="absolute top-[40%] left-[5%] w-[20vw] h-[1px] origin-left"
        style={{
          rotate: rotate1,
          background: "linear-gradient(to right, #8b5cf6, transparent)",
          filter: "blur(0.5px)",
          boxShadow: "0 0 15px #8b5cf6",
        }}
      />

      {/* Diagonal Rotating Line 2 */}
      <motion.div
        className="absolute bottom-[40%] right-[5%] w-[15vw] h-[1px] origin-right"
        style={{
          rotate: rotate2,
          background: "linear-gradient(to left, #3b82f6, transparent)",
          filter: "blur(0.5px)",
          boxShadow: "0 0 15px #3b82f6",
        }}
      />

      {/* Scaling Circle Line */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-accent-purple/10"
        style={{
          scale: scale1,
        }}
      />

      {/* Mouse Following Curved Line */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={`M 0 50 Q ${mousePosition.x / 2} ${
            mousePosition.y / 2
          }, 50 50 T 100 50`}
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="0.15"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        <motion.path
          d={`M 50 0 Q ${mousePosition.x / 2} ${
            mousePosition.y / 2
          }, 50 50 T 50 100`}
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="0.1"
          filter="url(#glow)"
        />
      </svg>

      {/* Floating Wave Lines - Scroll Controlled */}
      <motion.svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ y: line1Y }}
      >
        <motion.path
          d="M -10 30 Q 10 20, 30 30 T 70 30 T 110 30"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="0.2"
          filter="url(#glow)"
          animate={{
            d: [
              "M -10 30 Q 10 20, 30 30 T 70 30 T 110 30",
              "M -10 30 Q 10 40, 30 30 T 70 30 T 110 30",
              "M -10 30 Q 10 20, 30 30 T 70 30 T 110 30",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>

      <motion.svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ y: line2Y }}
      >
        <motion.path
          d="M -10 70 Q 20 60, 40 70 T 80 70 T 110 70"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="0.2"
          filter="url(#glow)"
          animate={{
            d: [
              "M -10 70 Q 20 60, 40 70 T 80 70 T 110 70",
              "M -10 70 Q 20 80, 40 70 T 80 70 T 110 70",
              "M -10 70 Q 20 60, 40 70 T 80 70 T 110 70",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>

      {/* Orbiting Dots with Trail */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
          style={{ rotate: rotate1 }}
        >
          {[0, 120, 240].map((deg, i) => (
            <motion.div
              key={`orbit-dot-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ["#8b5cf6", "#3b82f6", "#ec4899"][i],
                boxShadow: `0 0 15px ${["#8b5cf6", "#3b82f6", "#ec4899"][i]}`,
                top: "50%",
                left: "50%",
                transform: `rotate(${deg}deg) translateX(200px) translateY(-50%)`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Random Floating Lines */}
      {[...Array(5)].map((_, i) => {
        const isHorizontal = i % 2 === 0;
        const position = 15 + i * 18;
        const colors = ["#8b5cf6", "#3b82f6", "#ec4899"];
        const color = colors[i % 3];

        return (
          <motion.div
            key={`float-line-${i}`}
            className="absolute"
            style={{
              [isHorizontal ? "top" : "left"]: `${position}%`,
              [isHorizontal ? "left" : "top"]: "0",
              width: isHorizontal ? "15vw" : "1px",
              height: isHorizontal ? "1px" : "15vh",
              background: `linear-gradient(${
                isHorizontal ? "to right" : "to bottom"
              }, transparent, ${color}, transparent)`,
              filter: "blur(1px)",
              boxShadow: `0 0 10px ${color}`,
            }}
            animate={{
              [isHorizontal ? "x" : "y"]: ["0vw", "85vw", "0vw"],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Corner Accent Lines */}
      <motion.div
        className="absolute top-0 left-0 w-[200px] h-[1px] origin-left"
        style={{
          background: "linear-gradient(to right, #8b5cf6, transparent)",
          rotate: useTransform(smoothProgress, [0, 1], [45, 90]),
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[200px] h-[1px] origin-right"
        style={{
          background: "linear-gradient(to left, #3b82f6, transparent)",
          rotate: useTransform(smoothProgress, [0, 1], [-45, -90]),
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[200px] h-[1px] origin-left"
        style={{
          background: "linear-gradient(to right, #ec4899, transparent)",
          rotate: useTransform(smoothProgress, [0, 1], [-45, -90]),
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[200px] h-[1px] origin-right"
        style={{
          background: "linear-gradient(to left, #8b5cf6, transparent)",
          rotate: useTransform(smoothProgress, [0, 1], [45, 90]),
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
