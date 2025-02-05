"use client";

import { UserButton } from "@clerk/nextjs";

export default function UserMenu() {
  return (
    <div className="flex items-center gap-4">
      <UserButton 
        afterSignOutUrl="/sign-in"
        appearance={{
          elements: {
            avatarBox: "h-8 w-8",
            userButtonTrigger: "hover:opacity-80 transition-opacity"
          }
        }}
      />
    </div>
  );
} 