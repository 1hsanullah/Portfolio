import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon,
  EnvelopeIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    {
      icon: EnvelopeIcon,
      label: "Email",
      action: () => window.location.href = "mailto:isadiq715@gmail.com",
      color: "bg-red-500 hover:bg-red-600"
    },
    {
      icon: UserIcon,
      label: "LinkedIn",
      action: () => window.open("https://www.linkedin.com/in/ihsanullah-sadiq-624a5b201/", "_blank"),
      color: "bg-blue-600 hover:bg-blue-700"
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Quick Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3"
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ delay: index * 0.1, duration: 0.2 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className={`w-12 h-12 ${action.color} text-white rounded-full shadow-apple hover:shadow-apple-hover transition-all duration-300 flex items-center justify-center group relative`}
              >
                <action.icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-apple-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                    {action.label}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-4 border-transparent border-l-apple-gray-800"></div>
                  </div>
                </div>
              </motion.button>
            ))}
            
            {/* Contact Form Button */}
            <motion.button
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ delay: quickActions.length * 0.1, duration: 0.2 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="w-12 h-12 bg-apple-blue hover:bg-blue-700 text-white rounded-full shadow-apple hover:shadow-apple-hover transition-all duration-300 flex items-center justify-center group relative"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              
              {/* Tooltip */}
              <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-apple-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                  Contact Form
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-4 border-transparent border-l-apple-gray-800"></div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-apple-blue hover:bg-blue-700 text-white rounded-full shadow-apple hover:shadow-apple-hover transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <ChatBubbleLeftRightIcon className="w-6 h-6" />
          )}
        </motion.div>
        
        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;