import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    title: 'Assistant for the National Cambodian Election 2023',
    company: 'National Election Committee',
    description: 'Assisted in organization, voter registration, ballot distribution, and polling station setup.',
    year: '2023',
    type: 'Civic Service'
  },
  {
    title: 'Shop Assistant',
    company: "Family's Shop",
    description: 'Supported customer service, cash transactions, and inventory organization.',
    year: 'Ongoing',
    type: 'Retail'
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Work Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional experience in civic service and customer relations
          </p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="floating-card shadow-card backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-bold">{exp.title}</CardTitle>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{exp.year}</Badge>
                      <Badge variant="outline">{exp.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;