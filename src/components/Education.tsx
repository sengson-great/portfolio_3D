import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const education = [
  {
    degree: 'Bachelor of Information Technology Engineering',
    institution: 'Royal University of Phnom Penh',
    period: '2023 – Present',
    status: 'Current',
    description: 'Specializing in software engineering, database management, and modern development practices.'
  },
  {
    degree: 'High School Diploma',
    institution: 'Prekdambauk High School',
    period: '2017 – 2023',
    status: 'Completed',
    description: 'Comprehensive secondary education with focus on mathematics and sciences.'
  }
];

const Education = () => {
  return (
    <section id="education" className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Academic foundation in Information Technology and Engineering
          </p>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="floating-card shadow-card backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-bold">{edu.degree}</CardTitle>
                      <p className="text-primary font-medium">{edu.institution}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{edu.period}</Badge>
                      <Badge 
                        variant={edu.status === 'Current' ? 'default' : 'outline'}
                        className={edu.status === 'Current' ? 'bg-gradient-primary' : ''}
                      >
                        {edu.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{edu.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;