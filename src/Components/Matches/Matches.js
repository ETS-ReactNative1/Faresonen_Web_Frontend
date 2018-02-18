import React, { Component } from 'react';
import { List, Divider } from 'semantic-ui-react';
import MatchInfo from './MatchInfo';

class Matches extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			matches: [],
			loading: true
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			matches: nextProps.matches,
			loading: false
		});
	}

	render() {
		if(this.state.loading) {
			return <p>Henter kamper</p>
		}
		const nextMatches = this.state.matches.map((m) => {
			return (
				<List.Item key={m.id}>
					<MatchInfo match={m}>
					</MatchInfo>
					<Divider />
				</List.Item>
				)
		});
		return (
			<div>
				<List>
					{ nextMatches }
				</List>
			</div>
			)
	}
}

export default Matches;