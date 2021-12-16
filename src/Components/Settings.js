import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useHistory } from "react-router";
import "../CSS/Settings.css";

export default function Settings() {
  const history = useHistory();
  return (
    <div className="settings">
      <h3>Settings</h3>
      <Box
        className="settings-container"
        // sx={{
        //   width: "100%",
        //   maxWidth: 360,
        //   marginX: "auto",
        // }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              className="settings-item"
              button
              key={item.id}
              onClick={() => history.push(item.itemLink)}
            >
              <ListItemIcon className="list-item-icon">
                <i className={item.itemIcon} />
              </ListItemIcon>
              <span>
                <ListItemText
                  className="settings-text"
                  primary={item.itemText}
                />
              </span>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
}

const menuItems = [
  {
    id: 1,
    itemIcon: "fas fa-key",
    itemText: "Change Password",
    itemLink: "/changepassword",
  },
  //   {
  //     id: 2,
  //     itemIcon: "fas fa-plus-circle",
  //     itemText: "Create",
  //     itemLink: "/createquestion",
  //   },
  //   {
  //     id: 3,
  //     itemIcon: "fas fa-book",
  //     itemText: "Question Bank",
  //     itemLink: "/questionbank",
  //   },
  //   {
  //     id: 4,
  //     itemIcon: "far fa-list-alt",
  //     itemText: "My Question",
  //     itemLink: "/myquestions",
  //   },
  //   {
  //     id: 5,
  //     itemIcon: "fas fa-cog",
  //     itemText: "Settings",
  //     itemLink: "/settings",
  //   },
];
