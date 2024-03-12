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
          source: 'text',
          selector: 'my-card',
        },
        content: {
          type: 'string',
          source: 'html',
          selector: 'my-card',
        },
        title: {
          type: 'string',
          source: 'text',
          selector: 'my-custom-image-url',
        },
      },
      edit: function( props ) {
          var {title, content, imageUrl} = props.attributes;
          function onChangeTitle( newTitle ) {
            props.setAttributes( { title: newTitle } );
          }
          function onChangeContent( newContent ) {
            props.setAttributes( { content: newContent } );
          }
          function onChangeImageUrl( newImageUrl ) {
            props.setAttributes( { imageUrl: newImageUrl } );
          }

          return el(
            'div',
            {
              style: {
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                minWidth: '0',
                wordWrap: 'break-word',
                color: 'black',
                backgroundColor: '#fff',
                backgroundClip: 'border-box',
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '0.25rem',
              }
            },
            el('label', {}, 'Title'),
            el(
              PlainText,
              {
                  tagName: 'h5',
                  className: 'my-custom-title',
                  style: {
                    marginBottom: '0.75rem',
                    fontSize: '1.25rem',
                    fontWeight: '500'
                  },
                  value: title,
                  onChange: onChangeTitle,
              }
            ),
            el('label', {}, 'Description'),
            el(
              RichText,
              {
                  tagName: 'span',
                  className: 'my-custom-description',
                  style: { },
                  value: content,
                  onChange: onChangeContent,
              }
            ),
            el('label', {}, 'Image URL'),
            el(
              PlainText,
              {
                  className: 'my-custom-image-url',
                  value: imageUrl,
                  onChange: onChangeImageUrl,
              }
            ),
          )
      },
      // Save should be the authored/non-expanded html form of my-card (i.e. `<my-card>Hello World</my-card>`)
      save: function( props ) {
          let {title, content, imageUrl} = props.attributes
          if (imageUrl) {
            content = `<img src="${imageUrl}" slot="image"/>${content}`
          }
          return el( 'my-card', { title, dangerouslySetInnerHTML: { __html: content } } , null );
      },
    }
  );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );

/*
            el(
              RichText,
              {
                  tagName: 'span',
                  className: 'my-custom-description',
                  style: { },
                  value: content,
                  onChange: onChangeContent,
              }
            )
            */
