( function( blocks, element, blockEditor ) {
  let el = element.createElement;
  let RichText = blockEditor.RichText;
  let PlainText = blockEditor.PlainText;

  blocks.registerBlockType( 'enhance-plugin/my-card-block', {
      title: 'My Card',
      icon: 'heart',
      category: 'layout',
      attributes: {
        title: {
          type: 'string',
          source: 'attribute',
          attribute: 'title',
          selector: 'my-card',
        },
        content: {
          type: 'string',
          source: 'html',
          selector: 'my-card',
        },
        url: {
          type: 'string',
          source: 'attribute',
          attribute: 'url',
          selector: 'my-card',
        },
      },
      edit: function( props ) {
          var {title, content, url} = props.attributes;
          function onChangeTitle( newTitle ) {
            props.setAttributes( { title: newTitle } );
          }
          function onChangeContent( newContent ) {
            props.setAttributes( { content: newContent } );
          }
          function onChangeUrl( newUrl ) {
            props.setAttributes( { url: newUrl } );
          }

          return el(
            'div',
            {
              className: 'my-custom-card',
            },
            el('label', {}, 'Title'),
            el(
              PlainText,
              {
                  value: title,
                  onChange: onChangeTitle,
              }
            ),
            el('label', {}, 'Description'),
            el(
              RichText,
              {
                  value: content,
                  onChange: onChangeContent,
              }
            ),
            el('label', {}, 'Image URL'),
            el(
              PlainText,
              {
                  value: url,
                  onChange: onChangeUrl,
              }
            ),
          )
      },
      // Save should be the authored/non-expanded html form of my-card (i.e. `<my-card>Hello World</my-card>`)
      save: function( props ) {
          let {title, content, url} = props.attributes
          return el( 'my-card', { title, url, dangerouslySetInnerHTML: { __html: content } } , null );
      },
    }
  );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );
