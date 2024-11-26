import { SignOutButton, UserButton, useUser } from '@clerk/clerk-react';
import { LogOut } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

function UserInfo() {
  const { user } = useUser();
  const { open } = useSidebar();
  return (
    <div className={`border-t border-gray-500 flex p-2 ${!open && 'justify-center'}`}>
      <UserButton />
      <div
        className={`
                flex justify-between items-center
                overflow-hidden transition-all ${open ? 'w-52 ml-3' : 'w-0'}
            `}>
        <div className="leading-4">
          <h4 className="font-semibold">{user?.username}</h4>
          <span className="text-sm font-semibold">{user?.fullName}</span>
        </div>
        <SignOutButton>
          <LogOut strokeWidth={2} size={15} />
        </SignOutButton>
      </div>
    </div>
  );
}

export default UserInfo;
