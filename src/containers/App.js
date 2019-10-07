import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { setSearchField, onRequestRobots } from '../actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getSearchField: e => dispatch(setSearchField(e.target.value)),
		requestRobots: () => dispatch(onRequestRobots())
	}
}

class App extends React.Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		robots: [],
	// 	}
	// }

	componentDidMount() {
		this.props.requestRobots();
	}

	render() {
		// const { robots } = this.state;
		const { searchField, getSearchField, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()));

		if (isPending) {
			return (<h1 className='light-blue tc'>Loading...</h1>);
		} else {
			return (
				<div className='tc pa2'>
					<h1 className='light-blue'>RoboFriends</h1>
					<SearchBox search={getSearchField} />
					<Scroll>
						<CardList robots={filteredRobots} />
					</Scroll>
				</div>
			);
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
