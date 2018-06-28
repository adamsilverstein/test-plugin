import React from 'react';

import './header.css';

class TestPlugin extends React.Component {
	componentDidMount() {
	}

	filterClassName() {
		console.log( 'filterClassName' );
		// Our filter function
		function setBlockCustomClassName( className, blockName ) {
			return blockName === 'core/code' ?
				'my-plugin-code' :
				className;
		}

		// Adding the filter
		wp.hooks.addFilter(
			'blocks.getBlockDefaultClassName',
			'my-plugin/set-block-custom-class-name',
			setBlockCustomClassName
		);
	}

	filterExtraProps() {
		console.log( 'filterExtraProps' );
		console.log( addBackground );
		function addBackgroundColorStyle( props ) {
			return Object.assign( props, { style: { backgroundColor: 'red' } } );
		}

		wp.hooks.addFilter(
			'blocks.getSaveContent.extraProps',
			'my-plugin/add-background-color-style',
			addBackgroundColorStyle
		);
	}

	filterBlockEdit() {
		console.log( 'filterBlockEdit' );
		var el = wp.element.createElement;

		var withInspectorControls = wp.element.createHigherOrderComponent( function( BlockEdit ) {
			return function( props ) {
				return el(
					wp.element.Fragment,
					{},
					el(
						BlockEdit,
						props
					),
					el(
						wp.editor.InspectorControls,
						{},
						el(
							wp.components.PanelBody,
							{},
							'My custom control'
						)
					)
				);
			};
		}, 'withInspectorControls' );

		wp.hooks.addFilter( 'editor.BlockEdit', 'my-plugin/with-inspector-controls', withInspectorControls );
	}

	filterBlockListBlock() {
		console.log( 'filterBlockListBlock' );
		var el = wp.element.createElement;

		var withDataAlign = wp.element.createHigherOrderComponent( function( BlockListBlock ) {
			return function( props ) {
				var newProps = Object.assign(
					{},
					props,
					{
						wrapperProps: Object.assign(
							{},
							props.wrapperProps,
							{
								'data-align': props.block.attributes.align
							}
						)
					}
				);

				return el(
					BlockListBlock,
					newProps
				);
			};
		}, 'withAlign' );

		wp.hooks.addFilter( 'editor.BlockListBlock', 'my-plugin/with-data-align', withDataAlign );


	}
	render() {
		return (
			<div>
				<button className='button button-large'
					onClick={ this.filterExtraProps }
				>
					Filter Extra Props
				</button>
				<button className='button button-large'
					onClick={ this.filterClassName }
				>
					Filter Class Name
				</button>
				<button className='button button-large'
					onClick={ this.filterBlockEdit }
				>
					Filter Block Edit
				</button>
				<button className='button button-large'
					onClick={ this.filterBlockListBlock }
				>
					Filter Block List Block
				</button>
			</div>
		)

	}
}
export default TestPlugin;