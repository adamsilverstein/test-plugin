import React from 'react';
import ReactDOM from 'react-dom';

import TestPlugin from './test-plugin';

import { createHooks } from '@wordpress/hooks';

window.wp = wp || {};
wp.hooks = wp.hooks || createHooks();

var appStartup = function() {
	console.log( 'rendering to... ', document.getElementById('wpadminbar') );
	var container = document.createElement( 'div' );
	document.getElementById('wpadminbar').appendChild( container );
	ReactDOM.render(
		<TestPlugin />,
		container
	);

}
wp.hooks.addAction( 'start-app', 'adam/test-plugin', appStartup );

//wp.hooks.removeAction( 'start-app', 'adam/test-plugin' );

// Create a container for the app.
jQuery( document ).ready( function() {
	wp.hooks.doAction( 'start-app' );
} );

/*
wp.hooks.addFilter(
	'button-name',
	'adam/test-plugin',
	function() { return 'This is the new NAME'; }
);

wp.hooks.removeFilter( 'button-name', 'adam/test-plugin' );
*/