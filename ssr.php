<?php
require __DIR__ . '/vendor/autoload.php';

use Extism\Plugin;
use Extism\Manifest;
use Extism\PathWasmSource;

function enhance_ssr($html_doc)
{
    function readElements($directory)
    {
        $elements = [];
        if (is_dir($directory)) {
            $dirHandle = opendir($directory);

            if ($dirHandle) {
                while (($filename = readdir($dirHandle)) !== false) {
                    $filePath = $directory . '/' . $filename;
                    if (is_file($filePath)) {
                        $key = pathinfo($filename, PATHINFO_FILENAME);
                        $content = file_get_contents($filePath);
                        $elements[$key] = $content;
                    }
                }
                closedir($dirHandle);
            }
        }
        return $elements;
    }

    $elements_path = __DIR__ . '/elements';
    $elements = readElements($elements_path);


    $wasm = new PathWasmSource(__DIR__ . "/vendor/enhance/ssr-wasm/enhance-ssr.wasm");
    $manifest = new Manifest($wasm);
    $enhance = new Plugin($manifest, true);



    $input = [
      "markup" => $html_doc,
      "elements" => $elements,
      "initialState" => []
    ];

    $payload = json_encode($input, JSON_PRETTY_PRINT);

    $output = $enhance->call("ssr", $payload);

    $output_decoded = json_decode($output);
    $htmlDocument = $output_decoded->document;

    return $htmlDocument . "\n";
}
