import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    emailjs.sendForm(
      'service_4yeek4k', // Your Service ID
      'template_w4amtft', // Your Template ID
      form.current,
      '02T4vyG4D05x_-h3G' // Your Public Key
    )
      .then((result) => {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.'
        });
        form.current.reset();
      })
      .catch((error) => {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send message. Please try again.'
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="relative section-spacing bg-apple-gray-100/50 dark:bg-apple-gray-800/50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-apple-gray-50/30 to-transparent dark:via-apple-gray-900/30"></div>
      
      <div className="relative container mx-auto max-w-3xl container-padding">
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Get in Touch</span>
            </h2>
            <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
              Let's discuss how we can work together to bring your ideas to life
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-morphism rounded-3xl p-8 lg:p-12"
          >
            <form ref={form} onSubmit={handleSubmit} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="from_name" className="block text-lg font-semibold mb-3 text-apple-gray-700 dark:text-apple-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  className="w-full px-6 py-4 rounded-2xl border border-apple-gray-200 dark:border-apple-gray-600 bg-white/80 dark:bg-apple-gray-800/80 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="reply_to" className="block text-lg font-semibold mb-3 text-apple-gray-700 dark:text-apple-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  id="reply_to"
                  name="reply_to"
                  className="w-full px-6 py-4 rounded-2xl border border-apple-gray-200 dark:border-apple-gray-600 bg-white/80 dark:bg-apple-gray-800/80 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="message" className="block text-lg font-semibold mb-3 text-apple-gray-700 dark:text-apple-gray-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-6 py-4 rounded-2xl border border-apple-gray-200 dark:border-apple-gray-600 bg-white/80 dark:bg-apple-gray-800/80 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all duration-300 resize-none"
                  required
                ></textarea>
              </motion.div>

              {/* Status Message */}
              {submitStatus.message && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-6 rounded-2xl ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-800/50 dark:text-green-200 border border-green-200 dark:border-green-700' 
                      : 'bg-red-100 text-red-700 dark:bg-red-800/50 dark:text-red-200 border border-red-200 dark:border-red-700'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className={`w-full bg-apple-blue text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-apple hover:shadow-apple-hover transition-all duration-300 ${
                  isSubmitting 
                    ? 'opacity-75 cursor-not-allowed' 
                    : 'hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact; 