; (function(blocks, element, blockEditor, htm) {
  const html = htm.bind(element.createElement);

  blocks.registerBlockType(
    'e-components/e-badge',
    {
      title: 'e-badge',
      icon: 'tag',
      category: 'e_components',
      attributes: {
        content: {
          type: 'string',
          source: 'html',
          selector: 'e-badge',
        },
        count: {
          type: 'string',
          source: 'attribute',
          attribute: 'count',
          selector: 'e-badge',
        },
      },
      edit: ({ attributes, setAttributes }) => {
        const onChangeContent = (newContent) => {
          setAttributes({ content: newContent });
        }
        function updateCount(newValue) {
          setAttributes({ count: newValue });
        }

        return (html`
            <e-badge>
                <input
                    type="number"
                    value=${attributes.count}
                    placeholder="#"
                    onChange=${(event) => updateCount(parseInt(event.target.value, 10))}
                />
                <input
                    type="text"
                    value=${attributes.content}
                    placeholder="..."
                    onChange=${(event) => onChangeContent(event.target.value)}
                />
            </e-badge>
				`)
      },
      save: ({ attributes }) => {
        return (html`<e-badge count=${attributes.count?.toString()}>${attributes.content}</e-badge>`);
      },
    }
  );

})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.HTM);
