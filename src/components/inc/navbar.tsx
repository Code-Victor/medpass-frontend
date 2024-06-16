import { IconButton } from "../ui/icon-button";
import {Notification } from "iconsax-react";
export const Navbar = () => {
  return (
    <nav className="flex justify-end items-center px-6 h-[64px] border-b border-b-gray-6">

      <div className="flex gap-2">
        <IconButton label="notifications" variant="ghost">
          <Notification />
        </IconButton>
        <img
          className="w-12 h-12 rounded-full border-gray-6 border"
          src="https://api.dicebear.com/9.x/micah/svg"
          alt="avatar"
        />
      </div>
    </nav>
  );
};

