
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Sample scheduled posts
const initialScheduledPosts = [
  {
    id: 1,
    title: "Space Adventure Episode 1",
    date: new Date(2025, 4, 23, 10, 0),
    platform: "Instagram",
    type: "image",
    status: "scheduled",
  },
  {
    id: 2,
    title: "Character Introduction Video",
    date: new Date(2025, 4, 25, 14, 30),
    platform: "TikTok",
    type: "video",
    status: "scheduled",
  },
  {
    id: 3,
    title: "Behind the Scenes",
    date: new Date(2025, 4, 24, 16, 0),
    platform: "Twitter",
    type: "image",
    status: "scheduled",
  }
];

const SchedulePage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [scheduledPosts, setScheduledPosts] = useState(initialScheduledPosts);
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);

  const addNewScheduledPost = (post: any) => {
    setScheduledPosts([...scheduledPosts, {
      ...post,
      id: scheduledPosts.length + 1,
      status: "scheduled"
    }]);
    toast.success("Post scheduled successfully!");
    setIsNewPostDialogOpen(false);
  };

  const getPostsForSelectedDate = () => {
    if (!date) return [];
    
    return scheduledPosts.filter(post => 
      post.date.getDate() === date.getDate() &&
      post.date.getMonth() === date.getMonth() &&
      post.date.getFullYear() === date.getFullYear()
    );
  };

  // Dates that have scheduled posts
  const highlightedDates = scheduledPosts.map(post => post.date);

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">Content Schedule</h1>
            <p className="text-muted-foreground">
              Schedule and manage your automated content posts
            </p>
          </div>
          
          <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
            <DialogTrigger asChild>
              <Button>Schedule New Post</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule New Post</DialogTitle>
              </DialogHeader>
              <NewPostForm onSubmit={addNewScheduledPost} />
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Calendar */}
          <motion.div
            className="col-span-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar 
                  mode="single" 
                  selected={date}
                  onSelect={setDate} 
                  className="rounded-md border"
                  modifiers={{
                    booked: highlightedDates,
                  }}
                  modifiersStyles={{
                    booked: {
                      fontWeight: 'bold',
                      backgroundColor: 'hsl(var(--primary) / 0.1)',
                      color: 'hsl(var(--primary))',
                    }
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Scheduled Posts */}
          <motion.div
            className="col-span-1 lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>
                  {date ? (
                    `Posts Scheduled for ${date.toLocaleDateString()}`
                  ) : (
                    'Select a Date'
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getPostsForSelectedDate().length === 0 ? (
                  <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed">
                    <p className="text-muted-foreground">No posts scheduled for this date</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setIsNewPostDialogOpen(true)}
                    >
                      Schedule a Post
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getPostsForSelectedDate().map(post => (
                      <ScheduledPostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

const ScheduledPostCard = ({ post }: { post: any }) => {
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400';
      case 'twitter': return 'bg-blue-500';
      case 'facebook': return 'bg-blue-600';
      case 'tiktok': return 'bg-black';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'image': return '🖼️';
      case 'video': return '🎬';
      default: return '📄';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className={`h-1 w-full ${getPlatformColor(post.platform)}`} />
      <CardContent className="p-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="col-span-2">
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-muted-foreground">{post.platform}</p>
          </div>
          <div className="col-span-1 text-center">
            <div className="flex items-center justify-center">
              <span className="text-xl">{getTypeIcon(post.type)}</span>
            </div>
          </div>
          <div className="col-span-1 text-right">
            <p className="text-sm font-medium">
              {post.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <Button variant="outline" size="sm" className="mt-2">Edit</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const NewPostForm = ({ onSubmit }: { onSubmit: (post: any) => void }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('12:00');
  const [platform, setPlatform] = useState('instagram');
  const [contentType, setContentType] = useState('image');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !date || !time || !platform || !contentType) {
      toast.error("Please fill all fields");
      return;
    }

    const [hours, minutes] = time.split(':').map(Number);
    const scheduledDate = new Date(date);
    scheduledDate.setHours(hours, minutes);

    onSubmit({
      title,
      date: scheduledDate,
      platform,
      type: contentType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div>
        <label className="text-sm font-medium">Post Title</label>
        <Input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Date</label>
          <div className="mt-1">
            <Calendar 
              mode="single" 
              selected={date} 
              onSelect={setDate} 
              className="rounded-md border" 
              disabled={(date) => date < new Date()}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Time</label>
            <Input 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Platform</label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter/X</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium">Content Type</label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="submit">Schedule Post</Button>
      </div>
    </form>
  );
};

export default SchedulePage;
