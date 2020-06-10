import React from 'react'
import fetch from 'node-fetch'

class TeamSelection extends React.Component {
    state = {
        teams: [],
        selectedTeam: "",
        validationError: "",
        leagueId: "",
        standings: "",
        leagueName: "",
        countryName: ""
    };

    fetchStandings(teamId) {
        fetch(
            `/football/standings/${this.state.leagueId}`
        )
            .then(response => {
                console.log(`TeamSelection fetchStandings response - ${JSON.stringify(response)}`)
                return response.json();
            })
            .then(data => {

                data.forEach(item => {

                    if (item.team_id === teamId) {
                        // this.setState({standings: {
                        //     Country : item.country_name,
                        //     LeagueName : item.league_name,
                        //     Position : item.overall_league_position

                        // }})
                        this.setState({ standings: item.overall_league_position })
                        this.setState({ leagueName: item.league_name })
                        this.setState({ countryName: item.country_name })

                    }

                })
            })
    }

    updateTeams(leagueId) {
        console.log(`LeagueSelection updateLeagues ${leagueId}`)
        this.setState({ leagueId: leagueId })
        fetch(
            `/football/teams/${leagueId}`
        )
            .then(response => {
                console.log(`in componentDidMount response - ${JSON.stringify(response)}`)
                return response.json();
            })
            .then(data => {

                let teamsFromApi = []
                data.forEach(element => {
                    console.log(`element is ${element.league_name}`)
                    teamsFromApi.push({ value: element.team_key, display: element.team_name });
                });

                console.log(`teamsFromApi is ${teamsFromApi}`)

                this.setState({
                    teams: [
                        {
                            value: "",
                            display:
                                "(Select Team)"
                        }
                    ].concat(teamsFromApi)
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        console.log(`LeagueSelection componentDidMount ${this.props.leagueId}`)
        this.updateTeams(this.props.leagueId)
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
                                    ? "You must select your team"
                                    : ""
                        })

                        const { options, selectedIndex } = e.target;
                        console.log(options[selectedIndex].innerHTML);
                        this.fetchStandings(e.target.value)
                       // alert(`you have selected ${e.target.value} and its key is ${options[selectedIndex].text}`)
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
                <div
                    style={{
                        color: "blue",
                        marginTop: "10px"
                    }}
                >
                    {this.state.countryName} {this.state.leagueName} {this.state.standings}

                </div>
            </div>
        );
    }
}

export default TeamSelection
