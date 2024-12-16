import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "asana" },
    { name: "description", content: "Hackathon clone of asana" },
  ];
};

export default function Index() {
  return <Outlet />;
}
