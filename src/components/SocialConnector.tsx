
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Social media platform definitions
const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📸',
    color: 'bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400',
    connected: false,
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: '🐦',
    color: 'bg-blue-500',
    connected: false,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '👍',
    color: 'bg-blue-600',
    connected: false,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '🎵',
    color: 'bg-black',
    connected: false,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '▶️',
    color: 'bg-red-600',
    connected: false,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-blue-700',
    connected: false,
  },
];

const SocialConnector = () => {
  const [socialPlatforms, setSocialPlatforms] = useState(platforms);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');

  const connectPlatform = (platformId: string) => {
    // For demo purposes, just show a dialog and set as connected
    setConnectingPlatform(platformId);
  };

  const handleConnect = () => {
    if (!apiKey) {
      toast.error('Please enter your API key');
      return;
    }

    // Simulate connection
    toast.success(`Connected to ${socialPlatforms.find(p => p.id === connectingPlatform)?.name}`);
    
    // Update platform connection status
    setSocialPlatforms(platforms => 
      platforms.map(platform => 
        platform.id === connectingPlatform 
          ? { ...platform, connected: true } 
          : platform
      )
    );
    
    setConnectingPlatform(null);
    setApiKey('');
  };

  const handleDisconnect = (platformId: string) => {
    // Simulate disconnection
    setSocialPlatforms(platforms =>
      platforms.map(platform =>
        platform.id === platformId
          ? { ...platform, connected: false }
          : platform
      )
    );
    toast.success(`Disconnected from ${socialPlatforms.find(p => p.id === platformId)?.name}`);
  };

  const connectedCount = socialPlatforms.filter(p => p.connected).length;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold gradient-text">Connect Social Media</h2>
        <p className="text-muted-foreground">Link your social media accounts to autopost content</p>
      </motion.div>

      {/* Connection Status */}
      <motion.div
        className="rounded-lg border border-border p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Connection Status</h3>
            <p className="text-sm text-muted-foreground">
              {connectedCount === 0
                ? "No platforms connected"
                : `${connectedCount} platform${connectedCount > 1 ? 's' : ''} connected`}
            </p>
          </div>
          <Badge variant={connectedCount > 0 ? "default" : "outline"}>
            {connectedCount > 0 ? "Active" : "Inactive"}
          </Badge>
        </div>
      </motion.div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {socialPlatforms.map((platform, index) => (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className={`h-2 w-full ${platform.color}`} />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-2xl">{platform.icon}</span>
                    {platform.name}
                  </CardTitle>
                  <Badge variant={platform.connected ? "default" : "outline"}>
                    {platform.connected ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                <CardDescription>Share your content on {platform.name}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                {platform.connected ? (
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => handleDisconnect(platform.id)}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => connectPlatform(platform.id)}
                  >
                    Connect
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Connection Dialog */}
      {connectingPlatform && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="w-full max-w-md rounded-lg bg-card p-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="mb-2 text-xl font-bold">
              Connect {socialPlatforms.find(p => p.id === connectingPlatform)?.name}
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Enter your API key to connect your account
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">API Key</label>
                <Input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={handleConnect}
                >
                  Connect
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setConnectingPlatform(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SocialConnector;
