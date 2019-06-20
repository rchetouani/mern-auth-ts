import { Grid } from '@material-ui/core';
import { ItemGrid, RegularCard } from '../../components';
import React, { Component } from 'react';
import Addproject from './addproject';
import Listproject from './Listproject';
class Project extends Component<any, any> {
  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Edit Project"
              content={
                <div>
                  <Addproject history={this.props.history} />
                  <Listproject history={this.props.history} />
                </div>
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

export default Project;
