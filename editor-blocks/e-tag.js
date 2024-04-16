import htm from 'https://unpkg.com/htm?module'
(function(wp) {
  const { blocks, element, blockEditor, components } = wp
  const RichText = blockEditor.RichText;
  const html = htm.bind(element.createElement);

  blocks.registerBlockType('e-components/e-tag', {
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
        <RichText
          tagName="e-tag"
          value=${attributes.content}
          onChange=${onChangeContent}
        />
      `
    },
    save: ({ attributes }) => {
      return html`<e-tag>${attributes.content}</e-tag>`;
    },
  });

})(window.wp);
