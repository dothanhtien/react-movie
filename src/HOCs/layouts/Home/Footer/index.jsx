import React from "react";
import { Box } from "@mui/system";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";

const Footer = () => {
  return (
    <Container fixed>
      <Box py={2}>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h6">GET IN TOUCH</Typography>
            <List>
              <ListItem>
                <ListItemText primary="FAQs" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Give us feedback" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Contact us" />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h6">ABOUT MOVIE STAR</Typography>
            <List>
              <ListItem>
                <ListItemText primary="About us" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Find us" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Schedule" />
              </ListItem>
              <ListItem>
                <ListItemText primary="News" />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h6">LEGAL STUFF</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Terms & Conditions" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Privacy policy" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Cookie policy" />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h6">CONNECT WITH US</Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FacebookIcon />
                </ListItemIcon>
                <ListItemText primary="Facebook" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <TwitterIcon />
                </ListItemIcon>
                <ListItemText primary="Twitter" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <GoogleIcon />
                </ListItemIcon>
                <ListItemText primary="Google" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} borderTop="1px solid rgba(0,0,0,0.3)">
        <Typography variant="caption" component="p">
          {new Date().getFullYear()} © {process.env.REACT_APP_NAME}
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
