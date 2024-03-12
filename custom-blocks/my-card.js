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
      },
      edit: function( props ) {
          var {title, content} = props.attributes;
          function onChangeTitle( newTitle ) {
            props.setAttributes( { title: newTitle } );
          }
          function onChangeContent( newContent ) {
            props.setAttributes( { content: newContent } );
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
          )
      },
      // Save should be the authored/non-expanded html form of my-card (i.e. `<my-card>Hello World</my-card>`)
      save: function( props ) {
          const title = props.attributes.title
          const htmlContent = props.attributes.content
          return el( 'my-card', { title, dangerouslySetInnerHTML: { __html: htmlContent } } , null );
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
