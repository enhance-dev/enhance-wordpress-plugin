<?php
/*
Plugin Name: Enhance components as Guetenburg blocks
Plugin URI:  http://enhance.dev
Description: This plugin is an example of wrapping an enhance component for use in the block editor.
Version:     0.1
Author:      Ryan Bethel
Author URI:  https://enhance.dev
*/

function my_header_register_block() {
    wp_register_script(
        'my-header-block-editor-script',
        plugins_url( '/custom-blocks/my-header.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-block-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . '/custom-blocks/my-header.js' )
    );

    wp_register_style(
        'my-header-block-editor-style',
        plugins_url( '/custom-blocks/my-header.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . '/custom-blocks/my-header.css' )
    );

    register_block_type( 'enhance-blocks/my-header', array(
        //'render_callback' => 'my_header_render_block', // server side rendering
        'editor_script' => 'my-header-block-editor-script',
        'editor_style'  => 'my-header-block-editor-style',
    ) );
}

function my_card_register_block() {
    wp_register_script(
        'my-card-block-editor-script',
        plugins_url( '/custom-blocks/my-card.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-block-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . '/custom-blocks/my-card.js' )
    );

    wp_register_style(
        'my-card-block-editor-style',
        plugins_url( '/custom-blocks/my-card.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . '/custom-blocks/my-card.css' )
    );

    register_block_type( 'enhance-blocks/my-card', array(
        //'render_callback' => 'my_header_render_block', // server side rendering
        'editor_script' => 'my-card-block-editor-script',
        'editor_style'  => 'my-card-block-editor-style',
    ) );
}

add_action( 'init', 'my_header_register_block' );
add_action( 'init', 'my_card_register_block' );
