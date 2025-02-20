import { motion } from 'framer-motion';

const TimelineItem = ({ logo, title, subtitle, date, description, items }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-4 mb-8"
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 p-2">
        <img src={logo} alt={title} className="w-full h-full object-contain" />
      </div>
      
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-blue-600 dark:text-blue-400">{subtitle}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{date}</p>
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