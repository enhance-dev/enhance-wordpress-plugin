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

