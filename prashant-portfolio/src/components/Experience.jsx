import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "../data/experience";
import { FiBriefcase } from "react-icons/fi";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="py-20 bg-dark-800/30 relative overflow-hidden"
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-10"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            left: "-10%",
            top: "20%",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full blur-3xl opacity-10"
          style={{
            background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
            right: "-5%",
            bottom: "20%",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
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
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-blue flex items-center justify-center"
          >
            <FiBriefcase size={28} />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline Line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, #8b5cf6, #3b82f6, #ec4899)",
            }}
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Glowing effect on timeline */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-0.5 md:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, #8b5cf6, #3b82f6, #ec4899)",
              filter: "blur(4px)",
            }}
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div
                className={`w-full md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <motion.div
                  className="ml-12 md:ml-0 p-6 rounded-2xl relative group cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glossy shine effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    }}
                  />

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow:
                        "0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.1)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
                        color: "#8b5cf6",
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {exp.duration}
                    </motion.span>

                    <h3 className="text-xl font-bold mt-3 text-white group-hover:text-accent-purple transition-colors duration-300">
                      {exp.role}
                    </h3>

                    <p className="text-gray-400 mt-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
                      {exp.company}
                    </p>

                    <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: 0.5 + index * 0.2 + techIndex * 0.1,
                          }}
                          whileHover={{
                            scale: 1.1,
                            background: "rgba(139, 92, 246, 0.3)",
                          }}
                          className="px-3 py-1 rounded-full text-xs text-gray-300 cursor-pointer transition-colors duration-300"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Animated Timeline Dot */}
              <motion.div
                className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {/* Pulsing ring */}
                <motion.div
                  className="absolute w-8 h-8 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />

                {/* Inner dot */}
                <motion.div
                  className="w-4 h-4 rounded-full relative z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                  }}
                  whileHover={{ scale: 1.3 }}
                />
              </motion.div>

              {/* Connection line to card (mobile) */}
              <motion.div
                className="absolute left-8 top-1/2 w-4 h-0.5 md:hidden"
                style={{
                  background: "linear-gradient(to right, #8b5cf6, transparent)",
                }}
                initial={{ width: 0 }}
                animate={isInView ? { width: 16 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.2 }}
              />
            </motion.div>
          ))}

          {/* End dot */}
          <motion.div
            className="absolute left-4 md:left-1/2 bottom-0 w-3 h-3 -translate-x-1/2 rounded-full"
            style={{
              background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
              boxShadow: "0 0 15px rgba(236, 72, 153, 0.5)",
            }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Experience;
