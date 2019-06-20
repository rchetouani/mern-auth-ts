import { Grid, Paper } from '@material-ui/core';
import { ItemGrid, RegularCard } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ListFormation from './ListFormation';
import FormationFollowed from './FormationFollowed';
import ProposeFormation from './ProposeFormation';
interface TabContainerProps {
  children?: React.ReactNode;
}

function TabContainer(props: TabContainerProps) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class Formation extends Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: 0
    };
  }

  handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    this.setState({ value: newValue });
  }

  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Formation"
              content={
                <div>
                  <Paper>
                    <Tabs
                      value={this.state.value}
                      onChange={this.handleChange.bind(this)}
                    >
                      <Tab label="Liste des formations" />
                      <Tab label="Mes formations suivies" />
                      <Tab label="Proposer une formation" />
                    </Tabs>
                  </Paper>
                  {this.state.value === 0 && (
                    <ListFormation history={this.props.history} />
                  )}
                  {this.state.value === 1 && (
                    <FormationFollowed history={this.props.history} />
                  )}
                  {this.state.value === 2 && (
                    <ProposeFormation history={this.props.history} />
                  )}
                </div>
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Formation);
