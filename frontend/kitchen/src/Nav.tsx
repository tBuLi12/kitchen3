import {
  Info,
  Kitchen,
  SoupKitchen,
  SvgIconComponent,
} from "@mui/icons-material";
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface NavLink {
  link: string;
  name: string;
  icon: SvgIconComponent;
}

const links: NavLink[] = [
  {
    link: "/dupa",
    name: "About",
    icon: Info,
  },
];

const userLinks: NavLink[] = [
  {
    link: "/dishes",
    name: "Dishes",
    icon: SoupKitchen,
  },
];

function NavButton({ link, disabled }: { link: NavLink; disabled?: boolean }) {
  const navigate = useNavigate();
  return (
    <ListItemButton onClick={() => navigate(link.link)} disabled={disabled}>
      <ListItemIcon
        sx={{ minWidth: { xs: 30, sm: 56 }, ml: { xs: "-4px", sm: 0 } }}
      >
        {<link.icon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
      </ListItemIcon>
      <ListItemText
        primary={link.name}
        primaryTypographyProps={{
          sx: { mr: { xs: 0, sm: 3 }, fontSize: { xs: 14, sm: 16 } },
        }}
      />
    </ListItemButton>
  );
}

export default function NavList({
  loggedIn,
  open,
}: {
  loggedIn: boolean;
  open: boolean;
}) {
  const thinNav = useMediaQuery((theme) =>
    (theme as any).breakpoints.down("sm")
  );
  console.log(thinNav);
  return (
    <Collapse
      in={open}
      orientation="horizontal"
      collapsedSize={thinNav ? 42 : 55}
      key={thinNav ? 46 : 55}
    >
      <List>
        {links.map((link, i) => (
          <NavButton key={i} link={link} />
        ))}
        <Divider />
        {userLinks.map((link, i) => (
          <NavButton key={i} link={link} disabled={!loggedIn} />
        ))}
      </List>
    </Collapse>
  );
}
