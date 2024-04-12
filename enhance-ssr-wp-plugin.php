<?php
/*
Plugin Name: Enhance SSR
Plugin URI:  http://enhance.dev
Description: This plugin server side renders Enhance components
Version:     0.0.1
Author:      Ryan Bethel
Author URI:  https://enhance.dev
*/

require "./vendor/autoload.php";

use Enhance\Enhancer;
use Enhance\Elements;
use Enhance\ShadyStyles;

$elementPath = __DIR__ . "/../elements";
$elements = new Elements($elementPath);
$scopeMyStyle = new ShadyStyles();
$enhance = new Enhancer([
    "elements" => $elements,
    "initialState" => [],
    "styleTransforms" => [[$scopeMyStyle, "styleTransform"]],
    "enhancedAttr" => true,
    "bodyContent" => false,
]);


// Start output buffering and register the modification function
add_action('template_redirect', function() use ($enhance) {
    ob_start(function($buffer) use ($enhance) {
        return $enhance->ssr($buffer);
    });
});


// Define the function to modify the HTML output
function enhance_it($buffer)  {
    $buffer = $enhance->ssr($buffer);
    return $buffer;
}

// Ensure the output buffer is flushed at the end of the request
function flush_output_buffer() {
    if (ob_get_length()) {
        ob_end_flush();
    }
}
add_action('shutdown', 'flush_output_buffer');


