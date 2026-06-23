import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiMail,
  FiMapPin,
  FiBriefcase,
  FiLinkedin,
  FiPhoneCall,
} from "react-icons/fi";
import { profile } from "../data/profile";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: FiBriefcase,
      value: `${profile.role} at ${profile.company || "Freelancer"}`,
    },
    { icon: FiPhoneCall, value: profile.mobile },
    { icon: FiMail, value: profile.email, link: `mailto:${profile.email}` },
    { icon: FiMapPin, value: profile.location },
  ];

  const socialLinks = [
    {
      icon: FiLinkedin,
      href: profile.social?.linkedin || "#",
      label: "LinkedIn",
      color: "#3b82f6",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-dark-800/30 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-400">
            I'm always open to new opportunities and collaborations
          </p>
        </motion.div>

        {/* Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative p-8 md:p-10 rounded-3xl group overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Glossy effect */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%)",
            }}
          />

          {/* Hover border glow effect */}
          <motion.div
            className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #ec4899)",
              padding: "1px",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "xor",
              WebkitMaskComposite: "xor",
            }}
          />

          {/* Hover glow shadow */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              boxShadow:
                "0 0 40px rgba(139, 92, 246, 0.2), 0 0 80px rgba(139, 92, 246, 0.1)",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Left Side - Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              className="flex-shrink-0"
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-accent-purple via-accent-blue to-accent-pink p-[2px]">
                <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center">
                  <motion.span
                    className="text-5xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    👋
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Info */}
            <div className="flex-1 text-center md:text-left">
              {/* Name */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl md:text-3xl font-bold text-white mb-4"
              >
                {profile.name}
              </motion.h3>

              {/* Contact Info - Left Aligned */}
              <div className="flex flex-col items-center md:items-start gap-3 mb-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const content = (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <motion.span
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(139, 92, 246, 0.15)",
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon size={16} className="text-accent-purple" />
                      </motion.span>
                      <span className="text-sm md:text-base text-left">
                        {info.value}
                      </span>
                    </motion.div>
                  );

                  return info.link ? (
                    <a
                      key={index}
                      href={info.link}
                      className="hover:text-accent-purple"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex justify-center md:justify-start gap-3"
              >
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.9 + index * 0.1,
                        type: "spring",
                      }}
                      whileHover={{
                        scale: 1.15,
                        y: -3,
                      }}
                      className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group/social"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <Icon
                        size={18}
                        className="text-gray-400 group-hover/social:text-white transition-colors"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow: `0 0 20px ${social.color}40`,
                        }}
                      />
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center text-gray-600 text-sm mt-8"
        >
          Prefer email? Drop me a line anytime!
        </motion.p>
      </div>
    </section>
  );
};

export default Contact;
