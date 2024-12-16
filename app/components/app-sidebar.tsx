import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import { project1, project2, team1, team2, team3 } from "~/data/data";

import {
  House,
  CircleCheck,
  BellDot,
  ChartLine,
  Folder,
  Award,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Home",
      url: "#",
      items: [
        {
          title: "Homepage",
          icon: House,
          url: "#",
        },
        {
          title: "My Tasks",
          icon: CircleCheck,
          url: "#",
        },
        {
          title: "Inbox",
          icon: BellDot,
          url: "#",
        },
      ],
    },
    {
      title: "Insights",
      url: "#",
      items: [
        {
          title: "Reporting",
          icon: ChartLine,
          url: "#",
        },
        {
          title: "Portfolios",
          icon: Folder,
          url: "#",
        },
        {
          title: "Goals",
          icon: Award,
          url: "#",
        },
      ],
    },
    {
      title: "Projects",
      url: "#",
      items: [project1, project2].map((project) => ({
        title: project.name,
        icon: undefined,
        url: `/project/${project.id}`,
      })),
    },
    {
      title: "Teams",
      url: "#",
      items: [team1, team2, team3].map((team) => ({
        title: team.name,
        icon: undefined,
        url: `/team/${team.id}`,
      })),
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        {item.icon ? <item.icon /> : null}
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}