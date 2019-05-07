import {
  ClickAwayListener,
  Grow,
  Hidden,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  withStyles
} from '@material-ui/core';
import { Notifications, Person, Search } from '@material-ui/icons';
import headerLinksStyle from '../../assets/jss/material-dashboard-react/headerLinksStyle';
import cx from 'classnames';
import { CustomInput, IconButton as SearchButton } from '../../components';
import * as React from 'react';
import { Manager, Popper, Target } from 'react-popper';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import { connect } from 'react-redux';

interface Props {
  classes: {
    margin: string;
    search: string;
    searchButton: string;
    searchIcon: string;
    buttonLink: string;
    notifications: string;
    links: string;
    linkText: string;
    popperResponsive: string;
    dropdown: string;
    dropdownItem: string;
    popperClose: string;
  };
}

interface State {
  open: boolean;
  ouvert: boolean;
}

class HeaderLinks extends React.Component<Props & any, State & any> {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  static propTypes: {
    logoutUser: PropTypes.Validator<(...args: any[]) => any>;
    auth: PropTypes.Validator<object>;
  };
  constructor(props: Props) {
    super(props);

    this.state = { open: false, ouvert: false };

    this.handleClickNoti = this.handleClickNoti.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCloseNoti = this.handleCloseNoti.bind(this);
  }

  public render() {
    const { classes } = this.props;
    const { open } = this.state;
    const { ouvert } = this.state;

    return (
      <div>
        <CustomInput
          formControlProps={{
            className: classes.margin + ' ' + classes.search
          }}
          inputProps={{
            placeholder: 'Search',
            inputProps: {
              'aria-label': 'Search'
            }
          }}
        />
        <SearchButton
          color="white"
          aria-label="edit"
          customClass={classes.margin + ' ' + classes.searchButton}
        >
          <Search className={classes.searchIcon} />
        </SearchButton>

        <Manager style={{ display: 'inline-block' }}>
          <Target>
            <IconButton
              color="inherit"
              aria-label="Notifications"
              aria-owns={open ? 'menu-list' : undefined}
              aria-haspopup="true"
              onClick={this.handleClickNoti}
              className={classes.buttonLink}
            >
              <Notifications className={classes.links} />
              <span className={classes.notifications}>5</span>
              <Hidden mdUp>
                <p onClick={this.handleClickNoti} className={classes.linkText}>
                  Notification
                </p>
              </Hidden>
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Notifications"
              aria-owns={ouvert ? 'menu-list' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.buttonLink}
            >
              <Person className={classes.links} />
              <Hidden mdUp>
                <p onClick={this.handleClick} className={classes.linkText}>
                  Profile
                </p>
              </Hidden>
            </IconButton>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={cx(
              { [classes.popperClose]: !open },
              classes.popperResponsive
            )}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={open} style={{ transformOrigin: '0 0 0' }}>
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
          <Popper
            placement="bottom-start"
            eventsEnabled={ouvert}
            className={cx(
              { [classes.popperClose]: !ouvert },
              classes.popperResponsive
            )}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={ouvert} style={{ transformOrigin: '0 0 0' }}>
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <Link to="/user" style={{ textDecoration: 'none' }}>
                      <MenuItem>Profile</MenuItem>
                    </Link>

                    <MenuItem onClick={this.onLogoutClick}>Logout</MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }

  private handleClickNoti() {
    this.setState({ open: !this.state.open });
  }
  private handleClick() {
    this.setState({ ouvert: !this.state.ouvert });
  }
  private handleClose() {
    this.setState({ ouvert: false });
  }
  private handleCloseNoti() {
    this.setState({ open: false });
  }
}
HeaderLinks.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withStyles(headerLinksStyle)(HeaderLinks));
