
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const AccountPage = () => {
  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold gradient-text">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </motion.div>
        
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
          
          <TabsContent value="preferences">
            <PreferencesTab />
          </TabsContent>
          
          <TabsContent value="subscription">
            <SubscriptionTab />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

const ProfileTab = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://source.unsplash.com/random/300x300/?portrait" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm">
                Upload new image
              </Button>
              <Button variant="ghost" size="sm">
                Remove
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <Input defaultValue="John" />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <Input defaultValue="Doe" />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" defaultValue="john.doe@example.com" />
          </div>
          
          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea 
              className="w-full rounded-md border border-border bg-background px-3 py-2"
              rows={3}
              defaultValue="3D character creator and social media content specialist"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => toast.success("Profile updated successfully!")}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Current Password</label>
            <Input type="password" />
          </div>
          <div>
            <label className="text-sm font-medium">New Password</label>
            <Input type="password" />
          </div>
          <div>
            <label className="text-sm font-medium">Confirm New Password</label>
            <Input type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => toast.success("Password updated successfully!")}
          >
            Update Password
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const PreferencesTab = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Content Preferences</CardTitle>
          <CardDescription>Configure your content creation settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Auto AI-optimization</h3>
              <p className="text-sm text-muted-foreground">
                Let AI automatically optimize your content based on analytics
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Content Learning</h3>
              <p className="text-sm text-muted-foreground">
                Characters learn from content performance
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Show Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Show analytics on your dashboard
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Default Content Type</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="bg-primary/10">Image</Button>
              <Button variant="outline">Video</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => toast.success("Preferences saved successfully!")}
          >
            Save Preferences
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Receive email updates about your account
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Content Published Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Notifications when your content is published
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Marketing</h3>
              <p className="text-sm text-muted-foreground">
                Receive updates about new features
              </p>
            </div>
            <Switch defaultChecked={false} />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => toast.success("Notification preferences saved!")}
          >
            Save Preferences
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const SubscriptionTab = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Manage your subscription plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium gradient-text">Pro Plan</h3>
                <p className="text-muted-foreground">$19.99/month</p>
              </div>
              <div className="rounded-full bg-primary/20 px-3 py-1 text-sm text-primary">
                Active
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium">Features:</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span>✓</span> Unlimited character creation
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> 100 AI-generated contents per month
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> Connect up to 5 social media accounts
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> Advanced analytics
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Your next billing date is <span className="font-medium">June 15, 2025</span>
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Button variant="outline">Change Plan</Button>
          <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
            Cancel Subscription
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                    <span>💳</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Visa ending in 4242</h3>
                    <p className="text-sm text-muted-foreground">Expires 04/2026</p>
                  </div>
                </div>
                <div className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">
                  Default
                </div>
              </div>
            </div>
            <Button variant="outline">Add Payment Method</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your previous invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Pro Plan - May 2025</h3>
                  <p className="text-sm text-muted-foreground">May 15, 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">$19.99</span>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Pro Plan - April 2025</h3>
                  <p className="text-sm text-muted-foreground">April 15, 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">$19.99</span>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AccountPage;
