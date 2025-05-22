
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SocialConnector from '@/components/SocialConnector';
import { motion } from 'framer-motion';

const SocialPage = () => {
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold gradient-text">Social Connections</h1>
          <p className="text-muted-foreground">
            Connect to your social media accounts to autopost content
          </p>
        </motion.div>
        
        <SocialConnector />
      </div>
    </AppLayout>
  );
};

export default SocialPage;
