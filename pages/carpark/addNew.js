import React, {Component} from 'react';
import axios from 'axios';
import {API} from '../../config';
import web3 from '../../ethereum/web3';
import Carpark from '../../ethereum/carpark';
import carparkFactory from '../../ethereum/carparkfactory';

import Layout from '../../components/Layout';
import Logo from '../../components/Logo';
import Menubar from '../../components/Menubar';
import {Grid, Segment, Form, Button, Message} from 'semantic-ui-react';

class AddCarpark extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name:'',
			parkingSpaces:'',
			costHour: '',
			street:'',
			number:'',
			zipcode:'',
			city:'',
			country:'',
			loading: false,
			success: false,
			errorMessage:''
		};
	}

	createCarpark = async (event) => {
		event.preventDefault();

		const{
			name,
			parkingSpaces,
			costHour,
			street,
			number,
			zipcode,
			city,
			country
		} = this.state;

		if(name != null || parkingSpaces != null || street != null
			 || zipcode != null || city != null) {
				 this.setState({loading: true, errorMessage:'', success: false});

				 try {
					 const accounts = await web3.eth.getAccounts();
					 console.log(accounts);
					 // string name, string costPerHour, uint32 parkingSpaces

					 await carparkFactory.methods.deployCarpark(
						 name, costHour, parkingSpaces
					 ).send({
						 from: accounts[0]
					 });

					 const deployedCarparks = await carparkFactory.methods.getDeployedCarparks().call();
					 const carparkAddress = deployedCarparks[deployedCarparks.length-1];
					 const carparkSC = Carpark(carparkAddress);

					 await carparkSC.methods.addLocation(
						 street, number, zipcode, city, country
					 ).send({
						 from: accounts[0]
					 });

					 const res = await axios.post(
						 `${API}/api/carpark/addCarpark`,
						 {
							 name: name,
							 wallet: carparkAddress,
							 address: {
								 street: street,
								 number: number,
								 zipCode: zipcode,
								 city: city,
								 country: country
							 },
							 parkingSpaces: parkingSpaces,
							 costHour: costHour
						 });

						 if(res.status == 201) {
						 	this.setState({loading: false, success: true})
						 } else {
							 this.setState({
								 loading: false,
								 errorMessage:'Carpark created but not saved in db!'
							 });
						 }
				 } catch (err) {
					 this.setState({errorMessage: err.message});
				 }
		} else {
			this.setState({errorMessage: 'Please enter all required informations'})
		}
	}

	render() {
		return(
			<div>
				<Layout>
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
							</Grid.Column>

							<Segment>
								<Form
									error={!!this.state.errorMessage}
									success={this.state.success}>
									<Form.Group style={{marginTop: '1em'}}>
											<Form.Input
												label='Name'
												placeholder='Name'
												icon='warehouse'
												iconPosition='left'
												type='text'
												width={6}
												value={this.state.name}
												onChange={event => this.setState({name: event.target.value})}/>
											<Form.Input
												label='Parking Spaces'
												placeholder='Parking spaces'
												icon='car'
												iconPosition='left'
												type='number'
												width={4}
												value={this.state.parkingSpaces}
												onChange={event => this.setState({parkingSpaces: event.target.value})}/>
											<Form.Input
												placeholder='Ether/Hour'
												label='Cost per hour in ether'
												icon='ethereum'
												iconPosition='left'
												type=	'number'
												width={3}
												value={this.state.costHour}
												onChange={event => this.setState({costHour: event.target.value})}/>

									</Form.Group>
									<b>Address</b>
									<Form.Group inline>
										<Form.Input
											placeholder='Street'
											width={10}
											value={this.state.street}
											onChange={event => this.setState({street: event.target.value})}/>
										<Form.Input
											placeholder='Number'
											width={3}
											value={this.state.number}
											onChange={event => this.setState({number: event.target.value})}/>
									</Form.Group>
									<Form.Group inline>
										<Form.Input
											placeholder='Zipcode'
											width={3}
											value={this.state.zipcode}
											onChange={event => this.setState({zipcode: event.target.value})}/>
										<Form.Input
											placeholder='City'
											width={10}
											value={this.state.city}
											onChange={event => this.setState({city: event.target.value})}/>
									</Form.Group>
									<Form.Input
										placeholder='Country'
										width={13}
										type='text'
										value={this.state.country}
										onChange={event => this.setState({country: event.target.value})}/>

									<Message
										error
										header={'Oops!'}
										content={this.state.errorMessage}/>
										<Message
											success
											header='Created new carpark!'/>

									<Button
										fluid
										loading={this.state.loading}
										onClick={this.createCarpark.bind(this)}
										style={{marginTop: '2em',marginBottom: '2em', background:'#ffcc33', color:'#fff'}}
										>Create new carpark
									</Button>
								</Form>
							</Segment>
						</Segment>
					</Grid>
				</Layout>
			</div>

		)
	}
}

export default AddCarpark;
