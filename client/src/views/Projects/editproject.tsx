import { Button } from '../../components';
import React from 'react';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import Icon from '@material-ui/core/Icon';
import { IconButton } from '@material-ui/core';
import Divinput from '../../components/divinput';
import moment from 'moment';
const Update_FORMATION = gql`
  mutation updateProject($id: String!, $projects: [ProjectInput]) {
    updateProject(id: $id, projects: $projects) {
      projects {
        id
        name
        description
        technology
        society
        size
        Site
        startDate
        EndDate
        status
        Progress
      }
    }
  }
`;
class editproject extends React.Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  render() {
    let name,
      description,
      Site,
      technology,
      startDate,
      society,
      EndDate,
      size,
      status,
      Progress;
    var datefin = new Date(
      moment.unix(this.props.endDate / 1000).format('YYYY-MM-DD')
    ).toLocaleDateString('en-GB', {
      // you can skip the first argument
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    var datedebut = new Date(
      moment.unix(this.props.startdate / 1000).format('YYYY-MM-DD')
    ).toLocaleDateString('en-GB', {
      // you can skip the first argument
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    console.log(datefin);
    var convertDate = function(usDate) {
      var dateParts = usDate.split(/(\d{1,2})[\/ -](\d{1,2})[\/ -](\d{4})/);
      return dateParts[3] + '-' + dateParts[1] + '-' + dateParts[2];
    };

    var resultfin = convertDate(datefin);
    var resultdebut = convertDate(datedebut);
    console.log(resultdebut);
    return (
      <Mutation
        mutation={Update_FORMATION}
        key={this.props.data.User.id}
        onCompleted={() => this.props.history.push('/projects')}
      >
        {(updateProject, { loading, error }) => (
          <>
            <Popup
              open={false}
              trigger={
                <IconButton color="secondary" aria-label="Delete">
                  <Icon>edit_icon</Icon>
                </IconButton>
              }
              position="top left"
              modal
              closeOnDocumentClick
            >
              {close => (
                <div>
                  <div className="container">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            updateProject({
                              variables: {
                                id: this.props.data.User.id,
                                projects: {
                                  id: this.props.id,
                                  name: name.value,
                                  description: description.value,
                                  Site: Site.value,
                                  size: size.value,
                                  status: status.value,
                                  technology: technology.value,
                                  startDate: startDate.value,
                                  society: society.value,
                                  EndDate: EndDate.value,
                                  Progress: Progress.value
                                }
                              }
                            }).then(() => {
                              close();
                            });
                            name.value = '';
                            description.value = '';
                            Site.value = '';
                            technology.value = '';
                            startDate.value = '';
                            society.value = '';
                            EndDate.value = '';
                            status.value = '';
                            size.value = '';
                            Progress.value = '';
                          }}
                        >
                          <br />
                          <Divinput
                            name="name"
                            defaultvalue={this.props.nom}
                            node={node => {
                              name = node;
                            }}
                          />
                          <Divinput
                            name="description"
                            defaultvalue={this.props.descr}
                            node={node => {
                              description = node;
                            }}
                          />
                          <Divinput
                            name="Site"
                            defaultvalue={this.props.site}
                            node={node => {
                              Site = node;
                            }}
                          />
                          <Divinput
                            name="technology"
                            defaultvalue={this.props.techno}
                            node={node => {
                              technology = node;
                            }}
                          />
                          <Divinput
                            name="society"
                            defaultvalue={this.props.soci}
                            node={node => {
                              society = node;
                            }}
                          />
                          <Divinput name="size" defaultvalue={this.props.siz} />
                          <Divinput
                            name="size"
                            defaultvalue={this.props.stat}
                            node={node => {
                              size = node;
                            }}
                          />
                          <Divinput
                            name="Progress"
                            defaultvalue={this.props.Prog}
                            node={node => {
                              Progress = node;
                            }}
                          />
                          <Divinput
                            name="status"
                            defaultvalue={this.props.stat}
                            node={node => {
                              status = node;
                            }}
                          />

                          <div className="form-group">
                            <label htmlFor="startDate">startDate:</label>
                            <input
                              type="date"
                              name="startDate"
                              ref={node => {
                                startDate = node;
                              }}
                              placeholder="startDate"
                              defaultValue={resultdebut}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="EndDate">EndDate:</label>
                            <input
                              type="date"
                              className="form-control"
                              name="EndDate"
                              ref={node => {
                                EndDate = node;
                              }}
                              placeholder="EndDate"
                              defaultValue={resultfin}
                            />
                          </div>
                          <Button color="primary" round type="submit">
                            Edit{' '}
                          </Button>
                          <Button
                            color="primary"
                            round
                            onClick={() => {
                              close();
                            }}
                          >
                            Close{' '}
                          </Button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </>
        )}
      </Mutation>
    );
  }
}
editproject.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(editproject);
