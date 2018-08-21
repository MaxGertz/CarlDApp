import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const LoginForm = () => (
  <div className='login-form'>
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
	<Grid textAlign='center' style={{ height: '100%', marginTop: '100px' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large'>
          <Segment stacked>
						<Form.Field>
							<Image src='static/header.png' size='massive'/>
						</Form.Field>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

					<Button color='yellow' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
					{/* TODO: change link to register page
						// TODO: change Text size */}
          New to us? <a href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default LoginForm
