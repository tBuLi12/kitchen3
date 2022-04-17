import { Info, Kitchen, SoupKitchen } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface NavLink {
  link: string;
  name: string;
  icon: JSX.Element;
}

const links: NavLink[] = [
  {
    link: "/dupa",
    name: "About",
    icon: <Info />,
  },
];

const userLinks: NavLink[] = [
  {
    link: "/dishes",
    name: "Dishes",
    icon: <SoupKitchen />,
  },
];

function getNavButton(
  link: NavLink,
  i: number,
  disabled: boolean,
  navigate: NavigateFunction
) {
  return (
    <ListItemButton
      key={i}
      onClick={() => navigate(link.link)}
      disabled={disabled}
    >
      <ListItemIcon>{link.icon}</ListItemIcon>
      <ListItemText primary={link.name} sx={{ mr: 3 }} />
    </ListItemButton>
  );
}

export default function NavList({ loggedIn }: { loggedIn: boolean }) {
  const navigate = useNavigate();
  return (
    <List>
      {links.map((link, i) => getNavButton(link, i, false, navigate))}
      <Divider />
      {userLinks.map((link, i) => getNavButton(link, i, !loggedIn, navigate))}
    </List>
  );
}
