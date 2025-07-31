import { motion } from 'framer-motion';

const TimelineItem = ({ logo, title, subtitle, date, description, items, className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`group relative ${className}`}
    >
      <div className="glass-morphism rounded-3xl p-8 card-hover">
        <div className="flex gap-6">
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-apple-gray-100 dark:bg-apple-gray-800 shadow-apple group-hover:shadow-apple-hover transition-shadow duration-300">
              <img src={logo} alt={title} className="w-full h-full object-contain p-2" />
            </div>
          </motion.div>
          
          <div className="flex-grow">
            <motion.h3 
              className="text-2xl font-bold text-apple-gray-800 dark:text-white mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h3>
            
            <motion.p 
              className="text-apple-blue font-semibold text-lg mb-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {subtitle}
            </motion.p>
            
            <motion.p 
              className="text-apple-gray-500 dark:text-apple-gray-400 text-sm font-medium mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {date}
            </motion.p>
            
            <motion.p 
              className="text-apple-gray-600 dark:text-apple-gray-300 mb-4 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {description}
            </motion.p>
            
            {items && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start gap-3 text-apple-gray-600 dark:text-apple-gray-400"
                    >
                      <div className="w-1.5 h-1.5 bg-apple-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem; 