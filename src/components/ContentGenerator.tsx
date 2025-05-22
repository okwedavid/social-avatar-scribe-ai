
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const ContentGenerator = () => {
  const [contentType, setContentType] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [schedulePost, setSchedulePost] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt for your content");
      return;
    }

    setGenerating(true);
    // In a real app, this would call an AI API
    // For now, we'll simulate the generation
    
    setTimeout(() => {
      setGenerating(false);
      
      // Placeholder for generated content (would be from AI API)
      if (contentType === 'image') {
        // Use a placeholder image
        setGeneratedContent('https://source.unsplash.com/random/800x600/?character,3d,digital');
      } else {
        // For video we'd just show a success message for now
        toast.success("Video generated successfully!");
        setGeneratedContent('https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
      }
    }, 2000);
  };

  const handlePost = () => {
    if (schedulePost && !scheduledTime) {
      toast.error("Please select a time to schedule your post");
      return;
    }

    toast.success(
      schedulePost 
        ? `Content scheduled for posting on ${platform} at ${scheduledTime}` 
        : `Content posted to ${platform} successfully!`
    );
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <h2 className="text-2xl font-bold gradient-text">AI Content Generator</h2>
          <p className="text-muted-foreground">Create amazing content with your character</p>
        </div>

        <Tabs defaultValue="prompt" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="prompt">Prompt</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prompt" className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Content Type</label>
              <div className="flex space-x-4 py-2">
                <Button 
                  variant={contentType === 'image' ? 'default' : 'outline'}
                  onClick={() => setContentType('image')}
                  className="flex-1"
                >
                  Image
                </Button>
                <Button 
                  variant={contentType === 'video' ? 'default' : 'outline'}
                  onClick={() => setContentType('video')}
                  className="flex-1"
                >
                  Video
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Prompt</label>
              <Textarea 
                placeholder="Describe the content you want to generate..." 
                className="h-32"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Platform</label>
              <Select 
                value={platform} 
                onValueChange={setPlatform}
              >
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
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Schedule Post</label>
              <Switch 
                checked={schedulePost} 
                onCheckedChange={setSchedulePost} 
              />
            </div>

            {schedulePost && (
              <div>
                <label className="text-sm font-medium">Post Time</label>
                <Input 
                  type="datetime-local" 
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Style Reference</label>
              <div className="grid grid-cols-3 gap-2 py-2">
                <div className="cursor-pointer rounded-md border border-border p-1 hover:border-primary">
                  <img 
                    src="https://source.unsplash.com/random/200x200/?cartoon,3d" 
                    alt="Cartoon style" 
                    className="aspect-square h-full w-full rounded object-cover"
                  />
                </div>
                <div className="cursor-pointer rounded-md border border-border p-1 hover:border-primary">
                  <img 
                    src="https://source.unsplash.com/random/200x200/?realistic,3d" 
                    alt="Realistic style" 
                    className="aspect-square h-full w-full rounded object-cover"
                  />
                </div>
                <div className="cursor-pointer rounded-md border border-border p-1 hover:border-primary">
                  <img 
                    src="https://source.unsplash.com/random/200x200/?anime,3d" 
                    alt="Anime style" 
                    className="aspect-square h-full w-full rounded object-cover"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <Button 
            className="w-full" 
            onClick={handleGenerate}
            disabled={generating || !prompt}
          >
            {generating ? "Generating..." : "Generate Content"}
          </Button>
          
          {generatedContent && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handlePost}
            >
              {schedulePost ? "Schedule Post" : "Post Now"}
            </Button>
          )}
        </div>
      </motion.div>

      <motion.div
        className="flex min-h-[400px] items-center justify-center rounded-lg border border-border"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        {generatedContent ? (
          contentType === 'image' ? (
            <img 
              src={generatedContent} 
              alt="Generated content" 
              className="max-h-[600px] w-full rounded-lg object-contain p-2"
            />
          ) : (
            <video
              src={generatedContent}
              controls
              className="max-h-[600px] w-full rounded-lg object-contain p-2"
            >
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Generated content will appear here</p>
            <p className="text-sm text-muted-foreground">Enter a prompt and click generate</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ContentGenerator;
