import { IconButton } from '@material-ui/core';
import { Button } from '../../components';
import React from 'react';
import { Mutation } from 'react-apollo';
import Popup from 'reactjs-popup';
import Divinput from '../../components/divinput';
import Icon from '@material-ui/core/Icon';
import { gql } from 'apollo-boost';
import moment from 'moment';
const Update_FORMATION = gql`
  mutation updateFormation($id: String!, $formations: [FormationInput]) {
    updateFormation(id: $id, formations: $formations) {
      formations {
        id
        name
        Type
        Site
        Rank
        Formateur
        startDate
        EndDate
      }
    }
  }
`;
class editformation extends React.Component<any, any> {
  render() {
    let name, Type, Site, Rank, startDate, Formateur, EndDate;

    var datefin = new Date(
      moment.unix(this.props.enddate / 1000).format('YYYY-MM-DD')
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
        onCompleted={() => this.props.history.push('/Formation')}
      >
        {(updateFormation, { loading, error }) => (
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
                            updateFormation({
                              variables: {
                                id: this.props.data.User.id,
                                formations: {
                                  id: this.props.id,
                                  name: name.value,
                                  Type: Type.value,
                                  Site: Site.value,
                                  Rank: Rank.value,
                                  startDate: startDate.value,
                                  Formateur: Formateur.value,
                                  EndDate: EndDate.value
                                }
                              }
                            }).then(() => {
                              close();
                            });
                            name.value = '';
                            Type.value = '';
                            Site.value = '';
                            Rank.value = '';
                            startDate.value = '';
                            Formateur.value = '';
                            EndDate.value = '';
                            close();
                          }}
                        >
                          <br />
                          <Divinput
                            name={name}
                            defaultvalue={this.props.nom}
                            node={node => {
                              name = node;
                            }}
                          />
                          <Divinput
                            name={Type}
                            defaultvalue={this.props.type}
                            node={node => {
                              Type = node;
                            }}
                          />
                          <Divinput
                            name={Site}
                            defaultvalue={this.props.site}
                            node={node => {
                              Site = node;
                            }}
                          />
                          <Divinput
                            name={Rank}
                            defaultvalue={this.props.rank}
                            node={node => {
                              Rank = node;
                            }}
                          />
                          <Divinput
                            name={Formateur}
                            defaultvalue={this.props.formateur}
                            node={node => {
                              Formateur = node;
                            }}
                          />

                          <div className="form-group">
                            <label htmlFor="startDate">startDate:</label>
                            <input
                              type="Date"
                              className="form-control"
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
                              type="Date"
                              className="form-control"
                              name="EndDate"
                              ref={node => {
                                EndDate = node;
                              }}
                              placeholder="EndDate"
                              defaultValue={resultfin}
                            />
                          </div>
                          <Button type="submit">Edit </Button>
                          <Button
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
export default editformation;
