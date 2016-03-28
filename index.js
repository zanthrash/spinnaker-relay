import React from 'react';
import ReactDom from 'react-dom';
import Relay from 'react-relay';

class Application extends React.Component {
	render() {

		let application = this.props.store.application;

		return (
				<div>
					<h1>{application.name}</h1>
					<Attributes application={application} />
				</div>
		)
	}
}

Application = Relay.createContainer(Application, {
	fragments: {
		store: () => Relay.QL`
			fragment on SpinAPI {
				application(name:\"deck\") {
					name,
					${Attributes.getFragment('application')}
				}
			}
		`
	}
});

class Attributes extends React.Component {
	render() {

		let application = this.props.application;

		return (
			<div>
				<h2>{application.attributes.description}</h2>
				<ul>
					<li>{application.attributes.email}</li>
				</ul>
			</div>
		);
	}
}

Attributes = Relay.createContainer(Attributes, {
	fragments: {
		application: () => Relay.QL`
			fragment on Application {
					attributes {
						description
						email
						owner
					}
			}
		`
	}
});

class SpinnakerApplicationRoute extends Relay.Route {
	static routeName = "SpinnakerApplicationRoute";
	static queries = {
		store: ((Component) => {
			return Relay.QL`
				query root {
					spin {${Component.getFragment('store')}}
				}
			`
		})
	}
}

Relay.injectNetworkLayer(
	new Relay.DefaultNetworkLayer('http://localhost:3000/graphql')
);

let mountNode = document.getElementById('container');

let rootComponent = <Relay.RootContainer
											Component={Application}
                      route={new SpinnakerApplicationRoute()}
										/>

ReactDom.render(rootComponent, mountNode);