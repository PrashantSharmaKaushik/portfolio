import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "../data/skills";
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiFramer, SiVite } from "react-icons/si";
import { VscCode } from "react-icons/vsc";

const iconMap = {
  react: FaReact,
  javascript: FaJs,
  typescript: SiTypescript,
  html5: FaHtml5,
  css3: FaCss3Alt,
  tailwind: SiTailwindcss,
  framer: SiFramer,
  vite: SiVite,
  git: FaGitAlt,
  github: FaGithub,
  figma: FaFigma,
  vscode: VscCode,
};

// Scattered positions for each skill card
const scatteredPositions = [
  { left: "5%", top: "15%", delay: 0, duration: 4 },
  { left: "20%", top: "5%", delay: 0.2, duration: 5 },
  { left: "40%", top: "12%", delay: 0.4, duration: 4.5 },
  { left: "60%", top: "5%", delay: 0.1, duration: 5.5 },
  { left: "78%", top: "15%", delay: 0.3, duration: 4 },
  { left: "8%", top: "45%", delay: 0.5, duration: 5 },
  { left: "25%", top: "55%", delay: 0.2, duration: 4.5 },
  { left: "48%", top: "48%", delay: 0.4, duration: 5 },
  { left: "70%", top: "50%", delay: 0.1, duration: 4.5 },
  { left: "85%", top: "42%", delay: 0.3, duration: 5 },
  { left: "15%", top: "80%", delay: 0.2, duration: 4 },
  { left: "75%", top: "78%", delay: 0.4, duration: 5 },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            left: "10%",
            top: "20%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
          style={{
            background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
            right: "15%",
            top: "40%",
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full blur-3xl opacity-15"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            left: "40%",
            bottom: "10%",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies I work with
          </p>
        </motion.div>

        {/* Scattered Skills - Desktop */}
        <div className="relative h-[550px] hidden md:block">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.icon];
            const position = scatteredPositions[index] || scatteredPositions[0];

            return (
              <motion.div
                key={skill.name}
                className="absolute"
                style={{
                  left: position.left,
                  top: position.top,
                }}
                initial={{ opacity: 0, scale: 0, y: 50 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: position.delay,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <motion.div
                  className="relative group cursor-pointer"
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: position.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.15, y: -10 }}
                >
                  {/* Glossy Card */}
                  <div
                    className="relative px-5 py-4 rounded-2xl flex items-center gap-3 backdrop-blur-md"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      boxShadow:
                        "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    {/* Glossy shine effect */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
                      }}
                    />

                    {/* Icon container with glow */}
                    <div
                      className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${skill.color}20 0%, ${skill.color}10 100%)`,
                        boxShadow: `0 0 20px ${skill.color}30`,
                      }}
                    >
                      {Icon && (
                        <Icon
                          size={22}
                          style={{ color: skill.color }}
                          className="relative z-10"
                        />
                      )}
                    </div>

                    {/* Skill name */}
                    <span className="text-white font-medium text-sm relative z-10">
                      {skill.name}
                    </span>

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: `0 0 40px ${skill.color}40, 0 0 80px ${skill.color}20`,
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => {
            const left = 5 + ((i * 4.5) % 90);
            const top = 10 + ((i * 7) % 80);
            const size = 2 + (i % 3);
            const duration = 3 + (i % 4);
            const delay = i * 0.15;

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background:
                    i % 3 === 0
                      ? "#8b5cf6"
                      : i % 3 === 1
                      ? "#3b82f6"
                      : "#ec4899",
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Connection lines (subtle) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 10 20 Q 30 40, 50 30 T 90 50"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="0.2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.path
              d="M 5 60 Q 25 50, 45 70 T 85 55"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="0.2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: 0.8 }}
            />
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Skills Grid - Mobile */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.icon];
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-2xl flex items-center gap-3 cursor-pointer backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}20 0%, ${skill.color}10 100%)`,
                  }}
                >
                  {Icon && <Icon size={22} style={{ color: skill.color }} />}
                </div>
                <span className="text-white font-medium text-sm">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
