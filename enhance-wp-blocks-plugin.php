<?php
/*
Plugin Name: Enhance component blocks
Plugin URI:  http://enhance.dev
Description: This plugin is an example of wrapping an enhance component for use in the block editor.
Version:     v0.0.2
Author:      Ryan Bethel
Author URI:  https://enhance.dev
*/

function e_components_block_category( $categories, $post ) {
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'e_components',
                'title' => 'Enhance E-Components',
                'icon'  => 'wordpress',  
            ),
        )
    );
}
add_filter( 'block_categories_all', 'e_components_block_category', 1, 2 );


function enqueue_e_component_styles() {
	wp_register_style(
		'e-global-style',
		plugins_url( '/e-assets/e-global.css', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . '/e-assets/e-global.css' )
	);
    wp_enqueue_style('e-global-style');
}
add_action('wp_enqueue_scripts', 'enqueue_e_component_styles');


function plugin_enhance_custom_blocks() {
	$dir = plugin_dir_path( __FILE__ ) . '/editor-blocks/';
	$url = plugin_dir_url( __FILE__ ) . '/editor-blocks/';

	wp_register_script(
		'use-html-script',
		plugins_url( '/use-html.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'use-html.js' )
	);

	wp_register_script(
		'htm',
		plugins_url( 'dist/htm.bundle.js', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'use-html.js' )
	);
	wp_register_script(
		'htm-script',
		plugins_url( 'dist/htm.bundle.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'dist/htm.bundle.js' )
	);


	if ( is_dir( $dir ) ) {
		$files = scandir( $dir );

		foreach ( $files as $file ) {
			if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'js' ) {
				$handle = pathinfo( $file, PATHINFO_FILENAME ) . '-block-editor-script';

				wp_register_script(
					$handle,
					$url . $file,
					array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'use-html-script', 'htm' ),
					filemtime( $dir . $file )
				);
			}
			if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'css' ) {
				$handle = pathinfo( $file, PATHINFO_FILENAME ) . '-block-editor-style';

				wp_register_style(
					$handle,
					$url . $file,
					array(),
					filemtime( $dir . $file )
				);
			}
		}
		foreach ( $files as $file ) {
			if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'js' ) {
				register_block_type(
					'e-components/' . pathinfo( $file, PATHINFO_FILENAME ),
					array(
						// 'render_callback' => 'my_header_render_block', // server side rendering
						'editor_script' => pathinfo( $file, PATHINFO_FILENAME ) . '-block-editor-script',
						'editor_style'  => pathinfo( $file, PATHINFO_FILENAME ) . '-block-editor-style',
						'style'         => 'e-global-style',
					)
				);
			}
		}
	}
}

add_action( 'init', 'plugin_enhance_custom_blocks' );
