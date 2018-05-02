import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import LiveTeaseGenerator from "../LiveTeaseGenerator";
import altOmFotballMatchService from "../../../services/altOmFotballMatchService";
import leagues from "../../../Data/leagues";
import LiveTeasePreview from "../LiveTeasePreview";

class ProgramTeaseGeneratorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        matches: [],
        channels: ["TV 2 Sport Premium"],
        matchTimeText: "",
        matchTime: "",
        selectedMatch: ""
      },
      loading: true
    };
  }

  componentDidMount() {
    const { tournamentId, seasonId } = leagues.leagues[2];
    if (!tournamentId || !seasonId) {
      console.log(
        `Det er ingen turneringsID eller sesongID tilgjengelig for Premier League`
      );
    }
    this.getMatches(tournamentId, seasonId);
  }

  setMatchTimeText = matchTimeText =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        matchTimeText
      }
    });

  setTime = matchTime =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        matchTime
      }
    });

  setSelectedMatch = selectedMatch =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        selectedMatch
      }
    });

  setChannels = channels =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        channels
      }
    });

  getMatches = (tournamentId, seasonId) => {
    altOmFotballMatchService
      .getOnlyDoneMatches(tournamentId, seasonId)
      .then(data => {
        this.setState({
          ...this.state,
          data: {
            ...this.state.data,
            matches: data
          },
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          ...this.state,
          error: "Kunne ikke hente kamper fra AltomFotball",
          loading: false
        });
      });
  };

  createScript = () => {
    const [home, away] = altOmFotballMatchService.splitNames(
      this.state.data.selectedMatch,
      "-"
    );
    return `Super S18 ${this.state.data.channels[0]}`;
  };

  render() {
    const script = this.createScript();
    console.log(script);
    const {
      matches,
      channels,
      selectedMatch,
      matchTimeText,
      matchTime
    } = this.state.data;
    return (
      <Segment>
        <LiveTeaseGenerator
          matches={matches}
          defaultChannels={channels}
          loading={this.state.loading}
          setMatchTimeText={this.setMatchTimeText}
          setTime={this.setTime}
          setSelectedMatch={this.setSelectedMatch}
          setChannels={this.setChannels}
        />
        <LiveTeasePreview
          selectedMatch={selectedMatch}
          matchTimeText={matchTimeText}
          matchTime={matchTime}
          channels={channels}
          script={script}
        />
      </Segment>
    );
  }
}
export default ProgramTeaseGeneratorContainer;