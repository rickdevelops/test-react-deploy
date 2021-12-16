import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useHistory } from "react-router";
import "../CSS/NavDrawer.css";

export default function NavDrawer() {
  const history = useHistory();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div className="navdrawer">
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={item.id}
              onClick={() => history.push(item.itemLink)}
            >
              <ListItemIcon>
                {/* {index % 2 === 0 ? "<InboxIcon />" : "Mail"} */}
                <i className={item.itemIcon} />
              </ListItemIcon>
              <ListItemText primary={item.itemText} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </div>
  );

  return (
    <div>
      {/* {["left", "right", "top", "bottom"].map((anchor) => ( */}
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <i className="fas fa-bars" />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const menuItems = [
  {
    id: 1,
    itemIcon: "fas fa-plus-circle",
    itemText: "Create",
    itemLink: "/createquestion",
  },
  {
    id: 2,
    itemIcon: "fas fa-book",
    itemText: "Question Bank",
    itemLink: "/questionbank",
  },
  {
    id: 3,
    itemIcon: "far fa-list-alt",
    itemText: "My Question",
    itemLink: "/myquestions",
  },
  {
    id: 4,
    itemIcon: "fas fa-cog",
    itemText: "Settings",
    itemLink: "/settings",
  },
];
