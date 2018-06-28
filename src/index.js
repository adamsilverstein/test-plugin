import React from 'react';
import ReactDOM from 'react-dom';

import TestPlugin from './test-plugin';

// Create a container for the app.
const container = new jQuery( '<div />' ).attr( 'id', 'approot' );
jQuery( 'body' ).prepend( container );
jQuery( document ).ready( function() {
	ReactDOM.render(
	<TestPlugin />,
	document.getElementById('approot')
	);
} );
