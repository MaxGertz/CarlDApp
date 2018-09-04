import React from 'react';
import {Container, Surface} from 'semantic-ui-react';
import Head from 'next/head';

export default(props) => {
  return (
	<Container>
    <Head>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"/>
    </Head>
			<style jsx global>{`
								body {
									background: grey url(static/background.jpg)center fixed !important;
									background-size: cover !important;
									background-repeat: no-repeat;
									background-attachment: fixed;
									}`}
			</style>

    	{props.children}

  </Container>
  )
}
