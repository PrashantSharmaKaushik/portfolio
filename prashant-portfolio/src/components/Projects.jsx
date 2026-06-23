import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { projects } from "../data/projects";
import { FiGithub, FiExternalLink } from "react-icons/fi";

// Tooltip component that renders in a portal
const Tooltip = ({ children, isVisible, position }) => {
  if (!isVisible) return null;

  return createPortal(
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [techTooltipPosition, setTechTooltipPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleDescriptionHover = (e, projectId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left,
      y: rect.bottom + 8,
      width: rect.width,
    });
    setHoveredProject(projectId);
  };

  const handleTechHover = (e, projectId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTechTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
    setHoveredTech(projectId);
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Some of my recent work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group h-full"
            >
              <div className="bg-dark-800 rounded-2xl overflow-hidden gradient-border hover:glow transition-all duration-300 h-full flex flex-col">
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center p-1">
                    <img
                      src={project?.image}
                      alt={project.title}
                      className="max-w-full max-h-full"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML = `<span class="text-6xl opacity-50">🚀</span>`;
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-dark-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-dark-700 rounded-full hover:bg-accent-purple transition-colors"
                      >
                        <FiGithub size={20} />
                      </motion.a>
                    )}
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-dark-700 rounded-full hover:bg-accent-purple transition-colors"
                    >
                      <FiExternalLink size={20} />
                    </motion.a>
                  </div>
                </div>
                {/* Project Info */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Title - Single line with ellipsis */}
                  <h3
                    className="text-xl font-bold mb-2 truncate"
                    title={project.title}
                  >
                    {project.title}
                  </h3>

                  {/* Description - 3 lines with ellipsis and tooltip */}
                  <div
                    className="relative mb-4 flex-grow"
                    onMouseEnter={(e) => handleDescriptionHover(e, project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <p
                      className="text-gray-400 text-sm cursor-pointer"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        minHeight: "3.75rem",
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Portal Tooltip for Description */}
                    <Tooltip
                      isVisible={
                        hoveredProject === project.id &&
                        project.description.length > 100
                      }
                      position={tooltipPosition}
                    >
                      <AnimatePresence>
                        {hoveredProject === project.id &&
                          project.description.length > 100 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{
                                duration: 0.2,
                                ease: "easeOut",
                              }}
                              style={{ width: tooltipPosition.width }}
                              className="pointer-events-auto"
                            >
                              <div
                                className="relative p-4 rounded-xl text-sm text-gray-200 leading-relaxed"
                                style={{
                                  background:
                                    "linear-gradient(135deg, rgba(30, 30, 46, 0.98) 0%, rgba(20, 20, 35, 0.98) 100%)",
                                  border: "1px solid rgba(139, 92, 246, 0.3)",
                                  boxShadow:
                                    "0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.2)",
                                  backdropFilter: "blur(10px)",
                                }}
                              >
                                {/* Arrow */}
                                <div
                                  className="absolute -top-2 left-6 w-4 h-4 rotate-45"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(30, 30, 46, 0.98) 0%, rgba(20, 20, 35, 0.98) 100%)",
                                    borderLeft:
                                      "1px solid rgba(139, 92, 246, 0.3)",
                                    borderTop:
                                      "1px solid rgba(139, 92, 246, 0.3)",
                                  }}
                                />
                                {/* Glow effect */}
                                <motion.div
                                  className="absolute inset-0 rounded-xl opacity-50 pointer-events-none"
                                  style={{
                                    background:
                                      "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
                                  }}
                                  animate={{
                                    opacity: [0.3, 0.5, 0.3],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                />
                                <p className="relative z-10">
                                  {project.description}
                                </p>
                              </div>
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </Tooltip>
                  </div>

                  {/* Technologies - Fixed height container with tooltip */}
                  <div className="flex flex-wrap gap-2 mt-auto min-h-[60px] content-start relative">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-dark-700 rounded-full text-xs text-accent-purple h-fit"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <div
                        className="relative"
                        onMouseEnter={(e) => handleTechHover(e, project.id)}
                        onMouseLeave={() => setHoveredTech(null)}
                      >
                        <span className="px-3 py-1 bg-dark-700 rounded-full text-xs text-gray-400 h-fit cursor-pointer hover:bg-dark-600 hover:text-accent-purple transition-colors">
                          +{project.technologies.length - 4} more
                        </span>

                        {/* Portal Tooltip for Technologies */}
                        <Tooltip
                          isVisible={hoveredTech === project.id}
                          position={techTooltipPosition}
                        >
                          <AnimatePresence>
                            {hoveredTech === project.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                transition={{
                                  duration: 0.2,
                                  ease: "easeOut",
                                }}
                                className="pointer-events-auto"
                                style={{
                                  transform: "translate(-50%, -100%)",
                                }}
                              >
                                <div
                                  className="relative p-3 rounded-xl"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(30, 30, 46, 0.98) 0%, rgba(20, 20, 35, 0.98) 100%)",
                                    border: "1px solid rgba(139, 92, 246, 0.3)",
                                    boxShadow:
                                      "0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.2)",
                                    backdropFilter: "blur(10px)",
                                    minWidth: "150px",
                                  }}
                                >
                                  {/* Arrow */}
                                  <div
                                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(30, 30, 46, 0.98) 0%, rgba(20, 20, 35, 0.98) 100%)",
                                      borderRight:
                                        "1px solid rgba(139, 92, 246, 0.3)",
                                      borderBottom:
                                        "1px solid rgba(139, 92, 246, 0.3)",
                                    }}
                                  />
                                  {/* Glow effect */}
                                  <motion.div
                                    className="absolute inset-0 rounded-xl opacity-50 pointer-events-none"
                                    style={{
                                      background:
                                        "radial-gradient(circle at 50% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
                                    }}
                                    animate={{
                                      opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  />
                                  <div className="relative z-10 flex flex-wrap gap-2">
                                    {project.technologies
                                      .slice(4)
                                      .map((tech, idx) => (
                                        <motion.span
                                          key={tech}
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{
                                            duration: 0.2,
                                            delay: idx * 0.05,
                                          }}
                                          className="px-3 py-1 bg-dark-600 rounded-full text-xs text-accent-purple whitespace-nowrap"
                                        >
                                          {tech}
                                        </motion.span>
                                      ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
