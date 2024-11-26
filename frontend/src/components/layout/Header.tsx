'use client';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { GitBranch } from 'lucide-react';

export default function Header() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <div>
            <GitBranch />
          </div>
          <h1>QuizMaster</h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
