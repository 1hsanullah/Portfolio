import { motion } from 'framer-motion';

const TimelineItem = ({ logo, title, subtitle, date, description, items, className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex gap-6 ${className}`}
    >
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 ">
          <img src={logo} alt={title} className="w-full h-full object-contain" />
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-blue-600 dark:text-blue-400">{subtitle}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{date}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">{description}</p>
        {items && (
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            {items.map((item, index) => (
              <li key={index} className="text-sm">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default TimelineItem; 