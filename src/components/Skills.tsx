import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const skillsData = [
  { name: 'ReactJS', category: 'Frontend' },
  { name: 'Flutter/React Native', category: 'Cross-platform Development' },
  { name: 'SQL & NoSQL', category: 'Database' },
  { name: 'VueJS', category: 'Frontend' },
  { name: 'NextJS', category: 'Fullstack' },
  { name: 'ExpressJS', category: 'Backend' },
  { name: 'Laravel', category: 'Backend' },
  { name: 'Spring Boot', category: 'Backend' },
  //{ name: 'Python', category: 'Backend' },
  { name: 'TailwindCSS', category: 'Frontend' },
  { name: 'Figma', category: 'Design' },
  //{ name: 'C#', category: 'Backend' },
  { name: 'API Integration', category: 'Integration' },
  { name: 'AI Integration', category: 'Integration' },
  { name: 'Telegram Bot Integration', category: 'Integration' },
  { name: 'OOP Principles', category: 'Concepts' },
  { name: 'Git & GitHub', category: 'Tools' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'VPS Management', category: 'DevOps' },
  { name: 'CI/CD with GitHub Actions', category: 'DevOps' },
];

const categoryColors = {
  'Development': 'border-primary/20 bg-primary/5',
  'Database': 'border-accent/20 bg-accent/5',
  'Frontend': 'border-primary-glow/20 bg-primary-glow/5',
  'Backend': 'border-secondary/20 bg-secondary/10',
  'Systems': 'border-destructive/20 bg-destructive/5',
  'Integration': 'border-muted/30 bg-muted/10',
  'Concepts': 'border-primary/30 bg-primary/10',
  'Tools': 'border-accent/30 bg-accent/10',
  'DevOps': 'border-primary-glow/30 bg-primary-glow/10',
};

const Skills = () => {
  return (
    <section className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive set of technical skills developed through academic studies and hands-on projects
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className={`floating-card border-2 ${categoryColors[skill.category]} backdrop-blur-sm`}>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-sm md:text-base mb-1">{skill.name}</h3>
                  <span className="text-xs text-muted-foreground">{skill.category}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;