import React from 'react';

class TestPlugin extends React.Component {

	componentDidMount() {
		//this.filterBlockListBlock();
		wp.hooks.addAction( 'hookAdded', 'adam/test-plugin', () => {
			this.forceUpdate();
		} )
	}
	filterExtraProps() {
		console.log( 'filterExtraProps' );
		const addBackgroundColorStyle = ( props ) => {
			return Object.assign( props, { style: { backgroundColor: 'red' } } );
		}

		wp.hooks.addFilter(
			'blocks.getSaveContent.extraProps',
			'my-plugin/add-background-color-style',
			addBackgroundColorStyle
		);
	}

	filterClassName() {
		console.log( 'filterClassName' );
		// Our filter function
		const setBlockCustomClassName = ( className, blockName ) => {
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

	// Filter blocks, adding a data-alignment point.
	filterBlockListBlock() {
		var el = wp.element.createElement;

		var withDataAlign = wp.element.createHigherOrderComponent( function( BlockListBlock ) {
			return function() {
				var newProps = Object.assign(
					{},
					props,
					{
						wrapperProps: Object.assign(
							{},
							props.wrapperProps,
							{
								'data-alignment': props.block.attributes.align
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
			<div className='test-plugin-wrapper'>
				{ wp.hooks.applyFilters('button-name', 'Test buttons')}
				<button className='button'
					onClick={ this.filterExtraProps }
				>
					Filter Extra Props
				</button>
				<button className='button'
					onClick={ this.filterClassName }
				>
					Filter Class Name
				</button>
				<button className='button'
					onClick={ this.filterBlockEdit }
				>
					Filter Block Edit
				</button>
				<button className='button'
					onClick={ this.filterBlockListBlock }
				>
					Filter Block List Block
				</button>
			</div>
		)

	}
}
export default TestPlugin;