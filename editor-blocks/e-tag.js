; (function(blocks, element, blockEditor, htm) {
  const RichText = blockEditor.RichText;
  const html = htm.bind(element.createElement);

  blocks.registerBlockType(
    'e-components/e-tag',
    {
      title: 'e-tag',
      icon: 'universal-access-alt',
      category: 'layout',
      attributes: {
        content: {
          type: 'string',
          source: 'html',
          selector: 'e-tag',
        },
      },
      edit: ({ attributes, setAttributes }) => {
        const onChangeContent = (newContent) => {
          setAttributes({ content: newContent });
        };

        return html`
				<${RichText}
				tagName     = "p"
				value       = ${attributes.content}
				onChange    = ${onChangeContent}
				placeholder = "Enter your content here..."
				/>
				`
      },
      save: ({ attributes }) => {
        return html`<e-tag>${attributes.content}</e-tag>`;
      },
    }
  );

})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.HTM);
