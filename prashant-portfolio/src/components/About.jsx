import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "../data/profile";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get to know me better
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="w-72 h-72 md:w-96 md:h-96 mx-auto relative">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-blue rounded-2xl"
                animate={{
                  rotate: [6, 8, 6, 4, 6],
                  scale: [1, 1.02, 1, 0.98, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Secondary floating gradient */}
              <motion.div
                className="absolute inset-2 bg-gradient-to-br from-accent-pink/50 to-accent-purple/50 rounded-2xl blur-sm"
                animate={{
                  rotate: [-3, -5, -3, -1, -3],
                  scale: [0.98, 1, 0.98, 1.02, 0.98],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main image container */}
              <motion.div
                className="absolute inset-0 bg-dark-800 rounded-2xl flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-accent-purple/30 rounded-full"
                    style={{
                      left: `${20 + i * 12}%`,
                      top: `${15 + (i % 3) * 25}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                ))}

                {/* Animated emoji/image */}
                <motion.span
                  className="text-8xl relative z-10"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  👨‍💻
                </motion.span>

                {/* Glow effect behind image */}
                <motion.div
                  className="absolute w-32 h-32 bg-accent-purple/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Orbiting dots */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-accent-purple rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                >
                  <motion.div
                    className="absolute w-3 h-3 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full"
                    style={{
                      x: 150 + i * 20,
                      y: 0,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              A passionate developer creating digital experiences
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              I'm a frontend developer with a passion for creating beautiful,
              functional, and user-centered digital experiences. With years of
              experience in web development, I specialize in building responsive
              websites and applications that not only look great but also
              perform exceptionally.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Location", value: profile.location },
                { label: "Email", value: profile.email },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-dark-800 rounded-xl gradient-border"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-gray-500 text-sm mb-1">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
