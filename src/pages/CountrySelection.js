import React from 'react'
import fetch from 'node-fetch'
import LeagueSelection from './LeagueSelection'

class CountrySelection extends React.Component {
    state = {
        teams: [],
        selectedTeam: "",
        validationError: ""
    };

    constructor(props) {
        super(props)
        this.leagueSelectionElement = React.createRef();

    }

    componentDidMount() {
        console.log(`in componentDidMount`)
        fetch(
            "/football/getCountries"
        )
            .then(response => {
                console.log(`in componentDidMount response - ${JSON.stringify(response)}`)
                return response.json();
            })
            .then(data => {

                let teamsFromApi = []
                data.forEach(element => {
                    console.log(`element is ${element.country_name}`)
                    teamsFromApi.push({ value: element.country_id, display: element.country_name });
                });

                console.log(`teamsFromApi is ${teamsFromApi}`)

                this.setState({
                    teams: [
                        {
                            value: "",
                            display:
                                "(Select your favourite country)"
                        }
                    ].concat(teamsFromApi)
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        console.log(`in render`)
        return (
            <div>
                <div
                    style={{
                        color: "black",
                        marginTop: "40px"
                    }}
                >
                    Football Standings
                </div>

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
                                    ? "You must select your favourite country"
                                    : ""
                        })

                        const { options, selectedIndex } = e.target;
                        console.log(options[selectedIndex].innerHTML);
                        //alert(`you have selected ${e.target.value} and its key is ${options[selectedIndex].text}`)
                        this.props.updateInput(e.target.value)
                        if (this.leagueSelectionElement.current) {
                            console.log('u[dafe ifs0i09')
                            this.leagueSelectionElement.current.updateLeagues(e.target.value)
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

                {this.state.selectedTeam !== "" && <LeagueSelection ref={this.leagueSelectionElement} countryId={this.state.selectedTeam} />}

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

export default CountrySelection