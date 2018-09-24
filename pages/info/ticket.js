import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Logo from '../../components/Logo';
import {Segment, Container, Image, Grid} from 'semantic-ui-react';

class ContracInfo extends Component {

	render() {
		return(
			<div>
				<Layout/>
				<Grid
					textAlign='center'
					style={{
						height: '100%',
						marginTop: '100px'
					}}
					verticalAlign='middle'>
					<Segment
						raised
						inverted
						style={{
							width: '900px',
							background: '#5c5f63'
						}}>

						<Logo/>
						<Segment>
								<Image
									centered
									src='/static/TicketContract.png'/>
						</Segment>

					</Segment>
				</Grid>
			</div>

		);
	}
}

export default ContracInfo;
