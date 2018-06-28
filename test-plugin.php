<?php
/**
 * Plugin Name:       Test Plugin
 * Description:       Demo Test Plugin.
 * Version:           1.0.0
 * Author:            Adam Silverstein
 * Author URI:        http://10up.com
 * License:           GPLv2 or later
 * Text Domain:       Test Plugin
 * Domain Path:       /lang/
 * GitHub Plugin URI: https://github.com/adamsilverstein/test-plugin
 */

 namespace TestPlugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'HT_VERSION', '1.0.0' );

/**
 * Register plugin components
 */
add_action(
	'init', function() {
		add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts' );
		add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts' );
	}
);

function enqueue_scripts() {
	wp_enqueue_script( 'test-plugin', plugins_url( 'dist/main.js', __FILE__ ), array( 'jquery' ), HT_VERSION, true );
	wp_enqueue_style( 'test-plugin', plugins_url( 'styles.css', __FILE__ ) );
}
