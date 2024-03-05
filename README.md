# Enhance Wordpress Plugin

This plugin server side renders enhance components for wordpress sites.
It is experimental and should not be used in production yet.

Two plugins are included:
1. `enhance-ssr-wp-plugin.php` will serverside render any enhance custom elements in the wordpress site.
These can be added in PHP templates, raw HTML blocks in the editor, or as predefined blocks.

2. `enhance-wp-blocks-plugin.php` demonstrates wrapping an Enhance component for use in the block editor. 
This works together with the SSR plugin. These blocks are stored in the WP database as HTML (i.e. <my-header>Hi</my-header>) and then the SSR plugin will serverside render them.


## Requirements
This plugin requires that you can install the [Extism](https://extism.org) binary to in order to run the WASM (Web Assembly) Enhance SSR library.
It also requires that you can edit the `php.ini` file for the environment. 
For that reason it may not be possible to run the plugin in some free wordpress hosting providers.

### Install Extism Runtime Dependency

For this library, you first need to install the Extism Runtime by following the instructions in the [PHP SDK Repository](https://github.com/extism/php-sdk#install-the-extism-runtime-dependency).

### Install dependencies

```sh
composer install
```

### Enable FFI
Since PHP does not have a built in WASM interperter it uses shared C libraries.
Add the following to `php.ini`.

```sh
ffi.enable=true
```



