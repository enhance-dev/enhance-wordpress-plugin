(function(blocks, useHtml) {
  useHtml.init('my-header')

  blocks.registerBlockType(
    'e-components/my-header',
    {
      title: 'My Header',
      icon: 'heading',
      category: 'layout',
      attributes: {
        content: {
          type: 'string',
          source: 'text',
          selector: 'my-header',
        },
        something: {
          type: 'string',
          source: 'attribute',
          attribute: 'something',
          selector: 'my-header',
        },
      },
      edit: function(props) {
        return useHtml.editWrap(
          props,
          {
            name: 'my-header',
            attributeNames: ['content', 'something'],
            htmlTemplate: (attrs) => {
              return `
							<style>
							/* Styles for your input component */
							input {
								padding: 8px;
								margin: 10px 0;
								box - sizing: border - box;
								border: 1px solid #ccc;
								border - radius: 4px;
							}
							</style>
							<label something="${attrs.something}" > Header Content:
							<input type="text" placeholder="Enter some text" value="${attrs.content || ''}" />
							</label>
							`
            },
            listeners: [
              (blockRoot, sendUpdate) => blockRoot.querySelector('input').addEventListener(
                'input',
                (event) => {
                  sendUpdate({ content: event.target.value });
                }
              )
            ]
          },
        );
      },
      save: function(props) {
        return useHtml.saveWrap(
          props,
          {
            tag: 'my-header',
            attributes: { something: props.attributes?.something || 'nothing' },
            html: props.attributes?.content
          }
        )
      },
    }
  );

})(window.wp.blocks, window.useHtml);
