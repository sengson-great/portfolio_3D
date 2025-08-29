import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const languages = [
  { name: 'Khmer', level: 'Native', percentage: 100, color: 'bg-primary' },
  { name: 'English', level: 'Fluent', percentage: 90, color: 'bg-accent' },
  { name: 'French', level: 'Elementary', percentage: 40, color: 'bg-primary-glow' },
  { name: 'Chinese', level: 'Beginner', percentage: 25, color: 'bg-secondary' },
];

const Languages = () => {
  return (
    <section id="languages" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Languages</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Multilingual communication abilities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="floating-card shadow-card backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">{lang.name}</h3>
                    <span className="text-sm text-muted-foreground">{lang.level}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${lang.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;