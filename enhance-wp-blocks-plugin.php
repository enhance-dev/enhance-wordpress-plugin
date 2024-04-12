<?php
/*
Plugin Name: Enhance component blocks
Plugin URI:  http://enhance.dev
Description: This plugin is an example of wrapping an enhance component for use in the block editor.
Version:     v0.0.2
Author:      Ryan Bethel
Author URI:  https://enhance.dev
*/

function plugin_enhance_custom_blocks() {
    $dir = plugin_dir_path(__FILE__) . '/editor-blocks/'; 
    $url = plugin_dir_url(__FILE__) . '/editor-blocks/'; 

    wp_register_script(
        'use-html-script',
        plugins_url( '/use-html.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element'),
        filemtime( plugin_dir_path( __FILE__ ) . 'use-html.js' )
    );

    // Check if the directory exists
    if (is_dir($dir)) {
        // Scan the directory for files
        $files = scandir($dir);

        // Check each file in the directory
        foreach ($files as $file) {
            // Use pathinfo to get file extension and check if it's a .js file
            if (pathinfo($file, PATHINFO_EXTENSION) === 'js') {
                // Construct a handle based on the file name (without extension)
                $handle = pathinfo($file, PATHINFO_FILENAME) . '-block-editor-script';

                // Register the script file with WordPress
                wp_register_script(
                    $handle,
                    $url . $file,
                    array('wp-blocks', 'wp-element','use-html-script'), 
                    filemtime($dir . $file) // Version: file modification time for cache busting
                );
            }
            if (pathinfo($file, PATHINFO_EXTENSION) === 'css') {
                // Construct a handle based on the file name (without extension)
                $handle = pathinfo($file, PATHINFO_FILENAME) . '-block-editor-style';

                // Register the script file with WordPress
                wp_register_style(
                    $handle,
                    $url . $file,
                    array(), 
                    filemtime($dir . $file) // Version: file modification time for cache busting
                );
            }
        }
        foreach ($files as $file) {
            // Use pathinfo to get file extension and check if it's a .js file
            if (pathinfo($file, PATHINFO_EXTENSION) === 'js') {
              register_block_type( 'enhance-blocks/' . pathinfo($file, PATHINFO_FILENAME), array(
                  //'render_callback' => 'my_header_render_block', // server side rendering
                  'editor_script' => pathinfo($file, PATHINFO_FILENAME) . '-block-editor-script',
                  'editor_style'  => pathinfo($file, PATHINFO_FILENAME) . '-block-editor-style',
              ) );
            }
        }
    }
}

add_action('init', 'plugin_enhance_custom_blocks');

