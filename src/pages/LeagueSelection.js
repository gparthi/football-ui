import React from 'react'
import fetch from 'node-fetch'
import TeamSelection from './TeamSelection'

class LeagueSelection extends React.Component {
    state = {
        teams: [],
        selectedTeam: "",
        validationError: ""
    };

    constructor(props) {
        super(props)
        this.teamSelectionElement = React.createRef();

    }

    updateLeagues(countryId) {
        console.log(`LeagueSelection updateLeagues ${countryId}`)
        fetch(
            `/football/leagues/${countryId}`
        )
            .then(response => {
                console.log(`in componentDidMount response - ${JSON.stringify(response)}`)
                return response.json();
            })
            .then(data => {

                let teamsFromApi = []
                data.forEach(element => {
                    console.log(`element is ${element.league_name}`)
                    teamsFromApi.push({ value: element.league_id, display: element.league_name });
                });

                console.log(`teamsFromApi is ${teamsFromApi}`)

                this.setState({
                    teams: [
                        {
                            value: "",
                            display:
                                "(Select League)"
                        }
                    ].concat(teamsFromApi)
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        console.log(`LeagueSelection componentDidMount ${this.props.countryId}`)
        this.updateLeagues(this.props.countryId)

    }

    render() {
        console.log(`in render`)
        return (
            <div>
                <select
                    style={{
                        marginTop: "10px"
                    }}

                    value={this.state.selectedTeam}
                    onChange={e => {
                        this.setState({
                            selectedTeam: e.target.value,
                            validationError:
                                e.target.value === ""
                                    ? "You must select your league"
                                    : ""
                        })

                        const { options, selectedIndex } = e.target;
                        console.log(options[selectedIndex].innerHTML);
                        //    alert(`you have selected ${e.target.value} and its key is ${options[selectedIndex].text}`)

                        if (this.teamSelectionElement.current) {
                            console.log('u[dafe ifs0i09')
                            this.teamSelectionElement.current.updateTeams(e.target.value)
                        }

                    }
                    }
                >
                    {this.state.teams.map(team => (
                        <option
                            key={team.value}
                            value={team.value}
                        >
                            {team.display}
                        </option>
                    ))}
                </select>


                {this.state.selectedTeam !== "" && <TeamSelection ref={this.teamSelectionElement} leagueId={this.state.selectedTeam} />}

                <div
                    style={{
                        color: "red",
                        marginTop: "5px"
                    }}
                >
                    {this.state.validationError}
                </div>
            </div>
        );
    }
}

export default LeagueSelection
