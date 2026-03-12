import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Code2, Monitor, Smartphone, Server } from 'lucide-react';

const projects = [
  {
    title: 'Ecommerce Website',
    description: 'A full-stack shopping platform featuring secure payment processing, real-time inventory tracking, and an intuitive admin dashboard that helped increase client sales by 150%.',
    category: 'Web',
    tags: ['React', 'Express.js', 'Node.js', 'MongoDB'],
    link: 'https://github.com/sengson-great/store-admin-panel',
  },
//   {
//     title: 'Ecommerce Mobile App',
//     description: 'Cross-platform mobile shopping app with biometric authentication, offline mode, and barcode scanning capabilities for seamless product discovery.',
//     category: 'Mobile',
//     tags: ['Flutter', 'Dart', 'Firebase'],
//     link: 'https://example.com/project1',
//   },
  {
    title: 'Social Media App',
    description: 'Canvas-based paper editing platform with AI assistance for seamless document management and event coordination.',
    category: 'Mobile',
    tags: ['Flutter', 'Firebase'],
    link: 'https://github.com/sengson-great/social-media-flutter',
  },
  {
    title: 'Paperless Event Management',
    description: 'AI-powered digital coordination system for large-scale events, automating ticketing, attendee check-ins, and real-time schedule updates.',
    category: 'Web',
    tags: ['Next.js', 'Firebase'],
    link: 'https://github.com/sengson-great/great-paperless-events',
  },
  {
    title: 'Employee Management System',
    description: 'Enterprise HR solution streamlining employee data management, payroll processing, and performance tracking for mid-sized companies.',
    category: 'Backend',
    tags: ['Spring Boot', 'Java', 'SQL'],
    link: 'https://github.com/sengson-great/Employee-Management',
  },
  {
    title: 'Library Management System',
    description: 'Digital cataloging platform with automated book lending, return tracking, and patron management for community libraries.',
    category: 'Backend',
    tags: ['ExpressJS', 'NodeJS', 'MongoDB'],
    link: 'https://github.com/sengson-great/libray-management',
  },
  {
    title: 'School Management System',
    description: 'Comprehensive admin portal for managing student records, classes, tutors, and schedules.',
    category: 'Web',
    tags: ['Vue', 'Laravel'],
    link: 'https://github.com/sengson-great/school-management',
  },
  {
    title: 'Order Apps',
    description: 'Barista ordering platform with automated chatbot notifications for order status updates and admin alerts.',
    category: 'Fullstack',
    tags: ['Next.js', 'Laravel'],
    link: 'https://github.com/sengson-great/sales-order',
  },
  {
    title: 'Driver Apps',
    description: 'Delivery management system that captures delivery photos and automatically shares them with Telegram groups for real-time tracking.',
    category: 'Web',
    tags: ['Vue', 'Laravel'],
    link: 'https://github.com/VathanaProgrammer/delivery-app',
  },
  {
    title: 'Ultimate POS System',
    description: 'Point-of-sale solution with offline support, comprehensive sales reporting, and inventory management for retail businesses.',
    category: 'Backend',
    tags: ['Laravel', 'MySQL'],
    link: 'https://github.com/VathanaProgrammer/UltimatePOS',
  },
  {
    title: 'Scanner App',
    description: 'High-speed document scanning utility with OCR technology for text extraction and digital document organization.',
    category: 'Mobile',
    tags: ['Flutter', 'Machine Learning'],
    link: 'https://github.com/sengson-great/qr_code_scanner',
  },
  {
    title: 'Fitness Tracker App',
    description: 'Personal fitness companion for tracking workouts, monitoring progress, and achieving health goals with real-time analytics.',
    category: 'Mobile',
    tags: ['React Native', 'Supabase', 'PostgreSQL'],
    link: 'https://github.com/sengson-great/fitness-tracker',
  },
];

const categories = ['All', 'Web', 'Mobile', 'Backend'];

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = projects.filter(
    (p) => activeTab === 'All' || p.category === activeTab
  );

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Project <span className="text-primary tracking-tighter italic">Showcase</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive list of web, mobile, and enterprise applications.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeTab === cat
                  ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                  : 'bg-background hover:border-primary/50 text-muted-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Animated Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group relative h-full overflow-hidden border-border/60 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {project.category === 'Web' ? <Monitor size={20}/> : 
                         project.category === 'Mobile' ? <Smartphone size={20}/> : 
                         <Server size={20}/>}
                      </div>
                      <div className="flex gap-3">
                        <a href={project.link} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-medium text-[10px] uppercase tracking-wider">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;