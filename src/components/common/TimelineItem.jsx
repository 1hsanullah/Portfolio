import { motion } from 'framer-motion';

const TimelineItem = ({ logo, title, subtitle, date, location, description, items, className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex gap-4 mb-8 ${className}`}
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
        <img src={logo} alt={title} className="w-full h-full object-contain" />
      </div>
      
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-blue-600 dark:text-blue-400">{subtitle}</p>
        <div className="flex flex-wrap gap-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <p>{date}</p>
          {location && <p>• {location}</p>}
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-2">{description}</p>
        {items && (
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default TimelineItem; 