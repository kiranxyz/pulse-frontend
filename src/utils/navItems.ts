export const NAV_LINKS = Object.freeze([
  {
    label: "Overview",
    path: "/dashboard",
    roles: ["admin", "organizer", "ticketchecker"],
  },
  { label: "Users", path: "/dashboard/users", roles: ["admin"] },
  {
    label: "Checkers",
    path: "/dashboard/checkers",
    roles: ["admin", "organizer"],
  },
  { label: "Events", path: "/dashboard/events", roles: ["admin"] },
  {
    label: "Checker Dashboard",
    path: "/dashboard/checker",
    roles: ["ticketchecker", "admin"],
  },
  {
    label: "Check-In",
    path: "/dashboard/checkin",
    roles: ["ticketchecker", "admin"],
  },
  {
    label: "Manage Users",
    path: "/dashboard/orgusers",
    roles: ["admin", "organizer"],
  },
  {
    label: "Manage Events",
    path: "/dashboard/orgevents",
    roles: ["admin", "organizer"],
  },
  { label: "Settings", path: "/dashboard/settings", roles: ["admin"] },
]);
