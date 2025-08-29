import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            <span className="gradient-text">Seng Vengchhuong</span>
          </h3>
          <p className="text-muted-foreground mb-6">
            Information Technology Engineering Student & Full-Stack Developer
          </p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="mailto:sengvengchhuong@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Email
            </a>
            <a
              href="tel:+855968053997"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Phone
            </a>
            <span className="text-muted-foreground">
              Phnom Penh, Cambodia
            </span>
          </div>
          
          <div className="pt-6 border-t border-border/30">
            <p className="text-sm text-muted-foreground">
              © 2024 Seng Vengchhuong. Built with React & Three.js
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;