
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { EyeIcon, EyeOffIcon, CopyIcon, TrashIcon, PlusIcon } from 'lucide-react';

const ApiKeysPage = () => {
  // API Key for content generation services
  const [apiKey, setApiKey] = useState('sk-proj-Dgf-gz1jCcYV4R2p-iKEW2tPWGPRQ1qn**********************');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isAddKeyDialogOpen, setIsAddKeyDialogOpen] = useState(false);
  
  // Social media API keys
  const [socialKeys, setSocialKeys] = useState([
    { id: 1, name: 'Instagram API Key', key: '38fj3k2jf982hf982h3f982h3f98**********************', active: true },
    { id: 2, name: 'Twitter/X API Key', key: '9h289h38h93g89h3g98h3g9h389**********************', active: true },
  ]);

  const toggleKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${name} copied to clipboard`);
    });
  };

  const deleteKey = (id: number) => {
    setSocialKeys(socialKeys.filter(key => key.id !== id));
    toast.success('API key deleted successfully');
  };

  const toggleKeyStatus = (id: number) => {
    setSocialKeys(socialKeys.map(key => 
      key.id === id ? { ...key, active: !key.active } : key
    ));
    const key = socialKeys.find(k => k.id === id);
    if (key) {
      toast.success(`${key.name} ${!key.active ? 'activated' : 'deactivated'} successfully`);
    }
  };

  const addNewKey = (name: string, key: string) => {
    setSocialKeys([...socialKeys, {
      id: Date.now(),
      name,
      key,
      active: true
    }]);
    setIsAddKeyDialogOpen(false);
    toast.success('New API key added successfully');
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">API Keys</h1>
            <p className="text-muted-foreground">
              Manage your API keys for content generation and social media
            </p>
          </div>
          
          <Dialog open={isAddKeyDialogOpen} onOpenChange={setIsAddKeyDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusIcon className="h-4 w-4" /> Add New API Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AddKeyForm onSubmit={addNewKey} />
            </DialogContent>
          </Dialog>
        </motion.div>
        
        <div className="space-y-6">
          {/* Main API Key */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Content Generation API Key</CardTitle>
                <CardDescription>Your primary API key for AI content generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input 
                      value={apiKey}
                      readOnly
                      type={showApiKey ? 'text' : 'password'}
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={toggleKeyVisibility}
                    >
                      {showApiKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(apiKey, 'Content Generation API Key')}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="rounded-md bg-amber-500/10 p-4 text-sm text-amber-500">
                  <p>⚠️ Keep your API keys secure. Don't share them publicly.</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="api-status" defaultChecked={true} />
                  <label htmlFor="api-status">Active</label>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Regenerate</Button>
                  <Button>Update Key</Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          
          {/* Social Media API Keys */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Social Media API Keys</CardTitle>
                <CardDescription>API keys for your connected social media platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialKeys.map((socialKey) => (
                    <div 
                      key={socialKey.id} 
                      className="flex items-center justify-between gap-2 rounded-md border border-border p-4"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{socialKey.name}</h3>
                        <div className="relative mt-1">
                          <Input 
                            type="password" 
                            value={socialKey.key}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 items-center gap-2">
                        <Switch 
                          checked={socialKey.active} 
                          onCheckedChange={() => toggleKeyStatus(socialKey.id)} 
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(socialKey.key, socialKey.name)}
                        >
                          <CopyIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteKey(socialKey.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Permissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>API Permissions</CardTitle>
                <CardDescription>Control what your API keys can access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Content Generation</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow API to generate new content
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Character Creation</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow API to create and modify 3D characters
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Social Media Posting</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow API to post content to connected social accounts
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Analytics Reading</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow API to read analytics data
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => toast.success("API permissions updated successfully")}
                >
                  Save Permissions
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

const AddKeyForm = ({ onSubmit }: { onSubmit: (name: string, key: string) => void }) => {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !key) {
      toast.error("Please fill out all fields");
      return;
    }
    onSubmit(name, key);
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New API Key</DialogTitle>
        <DialogDescription>
          Enter the details for your new API key.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Key Name</label>
          <Input 
            placeholder="E.g. YouTube API Key" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">API Key</label>
          <Input 
            placeholder="Enter your API key" 
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="submit">Add Key</Button>
        </DialogFooter>
      </form>
    </>
  );
};

export default ApiKeysPage;
