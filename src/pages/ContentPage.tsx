
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ContentGenerator from '@/components/ContentGenerator';
import { motion } from 'framer-motion';

const ContentPage = () => {
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold gradient-text">Content Generator</h1>
          <p className="text-muted-foreground">
            Create AI-powered content for your social media
          </p>
        </motion.div>
        
        <ContentGenerator />
      </div>
    </AppLayout>
  );
};

export default ContentPage;
