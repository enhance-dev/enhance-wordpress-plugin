# Enhance Wordpress Plugin

This plugin server side renders enhance components for wordpress sites.
It is experimental and should probably not be used in production yet.

Two plugins are included:
1. `enhance-ssr-wp-plugin.php` server side render any enhance custom elements in the wordpress site.
These can be added in PHP templates, raw HTML blocks in the editor, or as predefined blocks.

2. `enhance-wp-blocks-plugin.php` demonstrates wrapping an Enhance component for use in the block editor.
This works with the SSR plugin. These blocks are stored in the WP database as HTML (i.e. <my-header>Hi</my-header>) and then the SSR plugin will them wherever they are used.

## Install Plugin Directly
To add the plugin to a Wordpress project you can clone this repository into a folder in the plugins directory for the project. 
All required dependencies are included in the vendor directory with the repository so running `composer install` should not be required.

## Install Plugin with Composer
Composer can also be used to install the plugin to a Wordpress project.

```sh
composer require enhance-dev/enhance-wordpress-plugin
```

## Development Copy of WordPress Instructions

- [Local](./docs/wp-local.md)

## Examples

### Write Elements
Enhance Elements are pure functions that accept `state` and return HTML.
Here is an example of `/elements/my-header.js`:
```javascript
<?php
function MyHeader($state) {
  return "<style>h1 { color: red; }</style><h1><slot></slot></h1>";
}
```
This can also be written as an html file since it does not depend on `$state` like:
```html
  <style>
    h1 { color: red; }
  </style>
  <h1>
    <slot></slot>
  </h1>

```

### Use Elements
This element is authored as an HTML web component or custom element (i.e. `<my-header>Cool</my-header>`).
With the SSR plugin these can be used anywhere in the wordpress site and the plugin will expand them just before they are sent to the browser.
They can be used:
1. Directly in PHP templates
![single.php template with my-header tag](/docs/images/in-php-template.png)

2. In raw HTML blocks anywhere
![my-header tag in raw html block](/docs/images/in-html-blocks.png)

3. As Gutenburg blocks
![my-header in WP editor](/docs/images/in-gutenburg-block.png)

### Enhance Elements as Gutenburg blocks
The new Wordpress block editor uses React for the editor and for rendering individual blocks before storing them as plain html in the database.
Enhance elements are pure functions that run on the server to render plain HTML.
That does not mean that they can't have clientside JavaScript, but the baseline experience is HTML.
One way to wrap Enhance Elements so that they work in the block editor is shown below:

```javascript
// custom-blocks/my-header.js
( function( blocks, element, blockEditor ) {
    let el = element.createElement;
    let RichText = blockEditor.RichText;

    blocks.registerBlockType( 'enhance-plugin/my-header-block', {
        title: 'My Header',
        icon: 'heading',
        category: 'layout',
        attributes: {
            content: {
                type: 'string',
                source: 'html',
                selector: 'my-header',
            },
        },
        edit: function( props ) {
            var content = props.attributes.content;
            function onChangeContent( newContent ) {
                props.setAttributes( { content: newContent } );
            }

            return el(
                RichText,
                {
                    tagName: 'h1',
                    className: 'my-custom-header',
                    style: { color: 'red' },
                    value: content,
                    onChange: onChangeContent,
                }
            );
        },
        // Save should be the authored/non-expanded html form of my-header (i.e. `<my-header>Hello World</my-header>`)
        save: function( props ) {
            const htmlContent = props.attributes.content
            return el( 'my-header', { dangerouslySetInnerHTML: { __html: htmlContent } } , null );
        },
      }
    );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );

```

