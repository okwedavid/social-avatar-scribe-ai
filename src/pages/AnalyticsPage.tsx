
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ContentAnalytics from '@/components/ContentAnalytics';
import { motion } from 'framer-motion';

const AnalyticsPage = () => {
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold gradient-text">Analytics</h1>
          <p className="text-muted-foreground">
            Track performance and optimize your content
          </p>
        </motion.div>
        
        <ContentAnalytics />
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;
