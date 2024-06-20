import React from "react";
import {
  createFileRoute,
  Outlet,
  Link,
  redirect,
} from "@tanstack/react-router";
import Logo from "@/assets/logo.svg";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import {
  HambergerMenu,
  Category,
  Hierarchy,
  Personalcard,
  Setting2,
  Profile,
  Notification,
} from "iconsax-react";
import { authRouter } from "@/api/routers";

//TODO: implement Authentication flow: https://tanstack.com/router/latest/docs/framework/react/examples/authenticated-routes
export const Route = createFileRoute("/admin/_adminauth")({
  beforeLoad: async ({ context: { queryClient }, location }) => {
    try {
      await queryClient.ensureQueryData(authRouter.me.getFetchOptions());
    } catch (error) {
      throw redirect({
        to: "/admin/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },

  component: AuthLayout,
});

function AuthLayout() {
  const { data: user } = authRouter.me.useQuery();
  return (
    <div className="bg-[#F7F7F8] dark:bg-bluedark-1 min-h-screen">
      <div className="flex">
        <Sidebar>
          {user?.user.role !== "admin" && (
            <Link to="/admin" activeOptions={{ exact: true }} preload="intent">
              {({ isActive }) => (
                <SidebarItem
                  icon={<Category size={24} />}
                  text="Dashboard"
                  active={isActive}
                />
              )}
            </Link>
          )}
          <Link to="/admin/department" preload="intent">
            {({ isActive }) => (
              <SidebarItem
                icon={<Hierarchy />}
                text="Department"
                active={isActive}
              />
            )}
          </Link>
          <Link to="/admin/patient-records" preload="intent">
            {({ isActive }) => (
              <SidebarItem
                icon={<Personalcard />}
                text="Patients Records"
                active={isActive}
              />
            )}
          </Link>
          <Link to="/admin/notifications" preload="intent">
            {({ isActive }) => (
              <SidebarItem
                icon={<Notification />}
                text="Notifications"
                active={isActive}
              />
            )}
          </Link>
          <Link to="/admin/settings" preload="intent">
            {({ isActive }) => (
              <SidebarItem
                icon={<Setting2 />}
                text="Settings"
                active={isActive}
              />
            )}
          </Link>
          <Link to="/admin/profile" preload="intent">
            {({ isActive }) => (
              <SidebarItem
                icon={<Profile />}
                text="My Profile"
                active={isActive}
              />
            )}
          </Link>
        </Sidebar>
        <div className="flex-1 pt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const SidebarContext = React.createContext<{ expanded: boolean } | null>(null);

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = React.useState(true);

  function toggleExpanded() {
    setExpanded((curr) => !curr);
  }
  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside className="h-screen sticky top-0 flex flex-col gap-6 border-r shadow-sm">
        <div className="p-4 pb-2 flex gap-2 items-center">
          <IconButton
            variant="ghost"
            label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            onClick={toggleExpanded}
          >
            <HambergerMenu />
          </IconButton>
          <img
            src={Logo}
            alt="Medpass logo"
            className={cn(
              "overflow-hidden transition-all",
              expanded ? "w-24" : "w-0"
            )}
          />
        </div>

        <ul className="flex-1 px-4 flex flex-col gap-2.5">{children}</ul>
      </aside>
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a Sidebar");
  }
  return context;
}
export function SidebarItem({
  icon,
  text,
  active,
  alert,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}) {
  const { expanded } = useSidebar();

  return (
    <li
      className={cn(
        "relative flex items-center py-2 pl-3 font-medium rounded-md cursor-pointer transition-colors group",
        active
          ? "bg-white border border-[#96B1FF] shadow-sm text-[#445BB8]"
          : "hover:bg-indigo-50 text-gray-600"
      )}
    >
      <span className="mr-3">{icon}</span>
      <span
        className={cn(
          "overflow-hidden transition-all text-nowrap",
          expanded ? "w-52" : "w-0"
        )}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-1.5 w-2 h-2 rounded bg-[#445BB8] ${
            expanded ? "" : "top  -1.5"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-[#e8eeff] text-[#445BB8] text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          text-nowrap
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
