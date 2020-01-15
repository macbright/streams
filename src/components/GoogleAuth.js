import React, { Component } from 'react'

class GoogleAuth extends Component {
	state = {isSignedIn: null };
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: '96837931472-f35o05s2fg3c991ajgrabpsmgklcdlil.apps.googleusercontent.com',
				scope: 'email'
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				this.setState({isSignedIn: this.auth.isSignedIn.get()});
				this.auth.isSignedIn.listen(this.onAuthChange);
			});
		});
	}

	onAuthChange = () => {
		this.setState({ isSignedIn: this.auth.isSignedIn.get()});
	}

	onSignIn = () => {
		this.auth.signIn();
	}

	onSignOut = () => {
		this.auth.signOut();
	}
	renderAuthButton() {
		if (this.state.isSignedIn === null) {
			return null
		} else if (this.state.isSignedIn) {
			return (
				<button onClick={this.onSignOut} className="ui green google button" >
					<i className="google icon" />
					Sign Out
				</button>
			)
		} else {
			return (
				<button onClick={this.onSignIn} className="ui red google button" >
					<i className="google icon" />
					Sign In with Google
				</button>
			)
		}
	}
	render() {
		return (
			<div>
				{this.renderAuthButton()}
			</div>
		)
	}
}
export default GoogleAuth;
