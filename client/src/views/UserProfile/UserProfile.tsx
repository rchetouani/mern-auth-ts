import { Grid } from '@material-ui/core';
import { ItemGrid, RegularCard } from '../../components';
import React, { Component } from 'react';
import Profile from './ProfileCard';
import EditCard from './EditCard';

class UserProfile extends Component<any, any> {
  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={8}>
            <RegularCard
              cardTitle="Edit Profile"
              cardSubtitle="Complete your profile"
              content={
                <div>
                  <EditCard />
                </div>
              }
            />
          </ItemGrid>
          <Profile />
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
