import React, {Component} from 'react';
import initialize from '../../utils/initialize';
import {initStore} from '../../redux';
import withRedux from 'next-redux-wrapper';
import axios from 'axios';
import {API} from '../../config';
import Logo from '../../components/Logo';
import Layout from '../../components/Layout';
import Menubar from '../../components/Menubar';
import AuthError from '../../components/AuthError';
import {Grid,
				Form,
				Message,
				Segment} from 'semantic-ui-react';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			success: false,
			errorMessage: '',
			licensePlate:''
		};
	}

	static async getInitialProps(ctx) {
		initialize(ctx);

		const token = ctx.store.getState().authentication.token;

		if (token) {
			const responseUser = await axios.get(
				`${API}/user `,
				{
					headers: {
					authorization: token
				}
			});
			const user = responseUser.data;

			return {user: user, loggedIn: true};
		}
	}

	addLicensePlate = async (event) => {
		event.preventDefault();

		try {
			this.setState({loading: true});

			const res = await axios.put(
				`${API}/api/user/addLicensePlate`,
				{
					_id: this.props.user._id,
					licensePlate: this.state.licensePlate
				}
			);
			if(res.status == 200) {
				this.setState({loading: false, success: true});
			} else {
				this.setState({loading: false, errorMessage: 'Could not add license plate!'});
			}

		} catch (err) {
			this.setState({loading: false, errorMessage: err.message});
		}
	}

	render() {
		return(
			<div>
				<Layout>

					{(this.props.loggedIn &&
						<Grid
							textAlign='center'
							style={{
								height: '100%',
								marginTop: '100px',
							}}
							verticalAlign='middle'>

							<Segment
								raised
								inverted
								style={{width: '900px', background: '#5c5f63' }}>

								<Grid.Column>
									<Logo/>
									<Menubar user={this.props.user}/>
								</Grid.Column>

								<Segment>

									<Form
										success={this.state.success}
										error={!!this.state.errorMessage}>
											<b>Add new license plate</b>
										<Form.Field>
											<Form.Group>
												<Form.Input
													icon='car'
													iconPosition='left'
													placeholder='License plate'
													value={this.state.licensePlate}
													onChange={event => this.setState({licensePlate: event.target.value})}/>
												<Form.Button
													loading={this.state.loading}
													style={{background:'#ffcc33', color:'#fff'}}
													onClick={this.addLicensePlate.bind(this)}>
													Add license plate
												</Form.Button>
											</Form.Group>
											<Message
		                    error
		                    header={'Oops!'}
		                    content={this.state.errorMessage}/>
											<Message
											    success
											    header='Added license plate!'/>
										</Form.Field>


									</Form>




								</Segment>

							</Segment>
						</Grid>
					) || <AuthError/>}
				</Layout>
			</div>
		)

	}

}

export default withRedux(initStore)(Settings);
