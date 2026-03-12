import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import Github from './images/github.svg'
import Linkedin from './images/linkedinicon.svg'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '096 805 3997',
    href: 'tel:+855968053997'
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'sengvengchhuong@gmail.com',
    href: 'mailto:sengvengchhuong@gmail.com'
  },
  {
    icon: Github,
    label: 'Github',
    value: 'github.com/sengson-great',
    href: 'https://github.com/sengson-great'
  },
  {
    icon: Linkedin,
    label: 'Linkedin',
    value: 'Seng Vengchhourng',
    href: 'https://www.linkedin.com/in/vengchhourng-seng-808581361/'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Sangkat Chaom Chau 1, Khan Pur Senchey, Phnom Penh',
    href: null
  }
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's connect and discuss opportunities to work together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="floating-card shadow-card backdrop-blur-sm border-border/50 h-full">
                <CardContent className="p-6 text-center">
                  {typeof contact.icon === 'string' ? (
                    <img
                      src={contact.icon}
                      alt={contact.label}
                      className="w-8 h-8 mx-auto mb-4 object-contain bg-white rounded-full"
                    />
                  ) : (
                    <contact.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                  )}
                  <h3 className="font-semibold mb-2">{contact.label}</h3>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{contact.value}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-primary hover:opacity-90 glow-effect transition-all duration-300"
              onClick={() => window.open('mailto:sengvengchhuong@gmail.com', '_blank')}
            >
              <Mail className="w-5 h-5 mr-2" />
              Send Email
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 hover:border-primary hover:bg-primary/10"
              onClick={() => window.open('tel:+855968053997', '_blank')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;