import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from "react-icons/fi";
import { profile } from "../data/profile";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-sm flex items-center gap-1"
          >
            © {currentYear} Made with <FiHeart className="text-accent-pink" />{" "}
            by <span className="gradient-text font-medium">{profile.name}</span>
          </motion.p>

          <div className="flex gap-4">
            {[{ icon: FiLinkedin, link: profile.social.linkedin }].map(
              ({ icon: Icon, link }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: "#8b5cf6" }}
                  className="text-gray-400 transition-colors duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
