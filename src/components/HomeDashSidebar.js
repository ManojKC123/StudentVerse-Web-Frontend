import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import GroupIcon from "@material-ui/icons/Group";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 324,
    position: "fixed",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="sidebar-user">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        className={classes.tabs}
      >
        <Link to="/">
          < HomeIcon/>
          <Tab label="Home" />
        </Link>
        <Link to="/tag-search">
          <TagFacesIcon />
          <Tab label="Tags" />
        </Link>
        <Link to="/user-search">
          < GroupIcon/>
          <Tab label="Users" />
        </Link>
      
      </Tabs>
    </div>
  );
}
