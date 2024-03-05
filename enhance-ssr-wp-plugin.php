<?php
/*
Plugin Name: Enhance SSR
Plugin URI:  http://enhance.dev
Description: This plugin server side renders Enhance components
Version:     0.1
Author:      Ryan Bethel
Author URI:  https://enhance.dev
*/

require __DIR__ . '/ssr.php';


// Start output buffering and register the modification function
function start_output_buffering() {
    ob_start("enhance_it");
}
add_action('template_redirect', 'start_output_buffering');

// Define the function to modify the HTML output
function enhance_it($buffer) {
    $buffer = enhance_ssr($buffer);
    return $buffer;
}

// Ensure the output buffer is flushed at the end of the request
function flush_output_buffer() {
    if (ob_get_length()) {
        ob_end_flush();
    }
}
add_action('shutdown', 'flush_output_buffer');


