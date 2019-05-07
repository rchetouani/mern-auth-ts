import { List, ListItem, withStyles } from '@material-ui/core';
import footerStyle from '../../assets/jss/material-dashboard-react/footerStyle';
import * as React from 'react';

interface Props {
  classes: {
    footer: string;
    container: string;
    left: string;
    list: string;
    inlineBlock: string;
    block: string;
    right: string;
    a: string;
  };
}

const Footer: React.SFC<Props> = props => {
  const { classes } = props;

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <p className={classes.right}>
          <span>
            &copy; {new Date().getFullYear()}
            <a href="https://www.sqli-carrieres.com/" className={classes.a}>
              SQLI{' '}
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default withStyles(footerStyle)(Footer);
