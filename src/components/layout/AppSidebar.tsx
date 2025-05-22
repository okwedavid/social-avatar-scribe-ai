
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    id: 'create',
    label: 'Create',
    items: [
      { path: '/', title: 'Character Creator', icon: '👤' },
      { path: '/content', title: 'Content Generator', icon: '🎬' },
    ]
  },
  {
    id: 'manage',
    label: 'Manage',
    items: [
      { path: '/social', title: 'Social Connections', icon: '🔗' },
      { path: '/analytics', title: 'Analytics', icon: '📊' },
      { path: '/schedule', title: 'Schedule', icon: '📅' },
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    items: [
      { path: '/account', title: 'Account', icon: '⚙️' },
      { path: '/api', title: 'API Keys', icon: '🔑' },
    ]
  }
];

const AppSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  
  const getExpandedGroups = () => {
    const result: string[] = [];
    menuItems.forEach(group => {
      if (group.items.some(item => currentPath === item.path)) {
        result.push(group.id);
      }
    });
    return result;
  };
  
  const [expandedGroups, setExpandedGroups] = useState<string[]>(getExpandedGroups());

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex w-full items-center rounded-md px-3 py-2 transition-colors ${
      isActive 
        ? "bg-sidebar-accent text-primary font-medium" 
        : "hover:bg-sidebar-accent/50"
    }`;

  return (
    <Sidebar
      className={`transition-all duration-200 ${collapsed ? "w-16" : "w-64"}`}
      collapsible
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <motion.h1 
            className="text-lg font-bold gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            3D Content Creator
          </motion.h1>
        )}
        <SidebarTrigger className={collapsed ? "mx-auto" : ""} />
      </div>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup
            key={group.id}
            open={expandedGroups.includes(group.id)}
            onOpenChange={() => toggleGroup(group.id)}
          >
            <SidebarGroupLabel className="px-4 py-2">
              {!collapsed && group.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.path} end className={getNavCls}>
                        <span className="mr-2 text-xl">{item.icon}</span>
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <div className="mt-auto p-4">
        {!collapsed && (
          <div className="rounded-md border border-border bg-sidebar-accent p-4 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Connected Accounts</span>
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                <span className="text-xs">2</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
