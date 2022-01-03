import React, { useState } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const ComplexSidebarItem = ({ icon: MainIconComponent, text, menu }) => {
  const location = useLocation();
  const [expand, setExpand] = useState(() => {
    for (const item of menu) {
      if (item.to === location.pathname) {
        return true;
      }
    }
  });

  useEffect(() => {
    for (const item of menu) {
      if (item.to === location.pathname) {
        setExpand(true);
        return;
      } else {
        setExpand(false);
      }
    }
  }, [menu, location.pathname]);

  return (
    <>
      <ListItemButton onClick={() => setExpand(!expand)}>
        <ListItemIcon>
          <MainIconComponent />
        </ListItemIcon>
        <ListItemText primary={text} />
        {expand ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={expand} timeout="auto" unmountOnExit>
        {menu.map((item, index) => {
          const { icon: IconComponent } = item;
          return (
            <List key={index} component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to={item.to}>
                <ListItemIcon>
                  <IconComponent />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </List>
          );
        })}
      </Collapse>
    </>
  );
};

export default ComplexSidebarItem;
