'use client';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Blocks } from 'lucide-react';

export default function Header() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <div>
            <Blocks />
          </div>
          <h1>Quizer</h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
