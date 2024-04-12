<?php
/*
Plugin Name: Enhance SSR
Plugin URI:  http://enhance.dev
Description: This plugin server side renders Enhance components
Version:     v0.0.2
Author:      Ryan Bethel
Author URI:  https://enhance.dev
*/

/**
* Include the autoloader
*/
add_action('plugins_loaded', function () {
    if (file_exists(__DIR__ . '/vendor/autoload.php')) {
        include __DIR__ . '/vendor/autoload.php';
    }
});

use Enhance\Enhancer;
use Enhance\Elements;
use Enhance\ShadyStyles;

// Start output buffering and register the modification function
function start_output_buffering() {
    $elementPath = __DIR__ . "/elements";
    $elements = new Elements($elementPath);
    $scopeMyStyle = new ShadyStyles();
    $enhance = new Enhancer([
        "elements" => $elements,
        "initialState" => [],
        "styleTransforms" => [[$scopeMyStyle, "styleTransform"]],
        "enhancedAttr" => true,
        "bodyContent" => false,
    ]);

    // ob_start("enhance_it");
    ob_start(function($buffer) use ($enhance) {
        return $enhance->ssr($buffer);
    });
}

add_action('template_redirect', 'start_output_buffering');


// Ensure the output buffer is flushed at the end of the request
function flush_output_buffer() {
    if (ob_get_length()) {
        ob_end_flush();
    }
}
add_action('shutdown', 'flush_output_buffer');




