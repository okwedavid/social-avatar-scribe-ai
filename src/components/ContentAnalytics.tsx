
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Sample data
const performanceData = [
  { date: 'Mon', views: 4000, likes: 2400, shares: 1200, comments: 800 },
  { date: 'Tue', views: 3000, likes: 1398, shares: 900, comments: 700 },
  { date: 'Wed', views: 2000, likes: 9800, shares: 2200, comments: 1500 },
  { date: 'Thu', views: 2780, likes: 3908, shares: 1400, comments: 1000 },
  { date: 'Fri', views: 1890, likes: 4800, shares: 1700, comments: 1200 },
  { date: 'Sat', views: 2390, likes: 3800, shares: 1500, comments: 900 },
  { date: 'Sun', views: 3490, likes: 4300, shares: 1900, comments: 1300 },
];

const sentimentData = [
  { name: 'Positive', value: 65, color: '#22c55e' },
  { name: 'Neutral', value: 25, color: '#3b82f6' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

const topPerformingContent = [
  {
    id: 1,
    thumbnail: 'https://source.unsplash.com/random/300x200/?character,3d,1',
    title: 'Character in space adventure',
    views: 12500,
    likes: 8700,
    platform: 'Instagram',
  },
  {
    id: 2,
    thumbnail: 'https://source.unsplash.com/random/300x200/?character,3d,2',
    title: 'Superhero character animation',
    views: 9800,
    likes: 6500,
    platform: 'TikTok',
  },
  {
    id: 3,
    thumbnail: 'https://source.unsplash.com/random/300x200/?character,3d,3',
    title: 'Character versus villain',
    views: 8400,
    likes: 5200,
    platform: 'Twitter',
  },
];

const ContentAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [platform, setPlatform] = useState('all');

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-8">
      <motion.div
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <h2 className="text-2xl font-bold gradient-text">Content Analytics</h2>
          <p className="text-muted-foreground">Track your content performance and engagement</p>
        </div>

        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard 
          title="Total Views"
          value="254.2K"
          change="+12%"
          positive={true}
          delay={0.3}
        />
        <AnalyticsCard
          title="Engagement Rate"
          value="6.8%"
          change="+2.5%"
          positive={true}
          delay={0.4}
        />
        <AnalyticsCard
          title="New Followers"
          value="1.2K"
          change="+18%"
          positive={true}
          delay={0.5}
        />
        <AnalyticsCard
          title="Avg. Watch Time"
          value="2:45"
          change="-0.5%"
          positive={false}
          delay={0.6}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Track views, likes and other metrics over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs defaultValue="views">
                <TabsList className="mb-4 grid w-full grid-cols-4">
                  <TabsTrigger value="views">Views</TabsTrigger>
                  <TabsTrigger value="likes">Likes</TabsTrigger>
                  <TabsTrigger value="shares">Shares</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="views" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="likes" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="likes" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="shares" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="shares" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="comments" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="comments" stroke="#ff8042" fill="#ff8042" />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Audience Sentiment</CardTitle>
              <CardDescription>How viewers are responding to your content</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sentimentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {/* Fix: change the function to use fill prop directly with a string value */}
                    <Bar dataKey="value" fill="#8884d8">
                      {sentimentData.map((entry, index) => (
                        <rect key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Performing Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>Your highest engaging content across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topPerformingContent.map((content) => (
                <Card key={content.id} className="overflow-hidden">
                  <img 
                    src={content.thumbnail}
                    alt={content.title}
                    className="h-40 w-full object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-medium">{content.title}</h3>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <span>👁️</span> {formatNumber(content.views)}
                      </div>
                      <div className="flex items-center gap-1">
                        <span>❤️</span> {formatNumber(content.likes)}
                      </div>
                      <div className="mt-1 rounded bg-primary/20 px-2 py-1 text-xs">
                        {content.platform}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

// Analytics Card Component
const AnalyticsCard = ({ title, value, change, positive, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className={`mt-1 flex items-center text-xs ${positive ? 'text-green-500' : 'text-red-500'}`}>
            <span>{change}</span>
            <span className="ml-1">vs. prev. period</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContentAnalytics;
