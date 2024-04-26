; (function(blocks, element, blockEditor, components, htm) {
  const InspectorControls = blockEditor.InspectorControls;
  const { RadioControl } = components
  const { Panel, PanelRow, PanelBody } = components
  const InnerBlocks = blockEditor.InnerBlocks;
  const html = htm.bind(element.createElement);

  blocks.registerBlockType(
    'e-components/e-rule',
    {
      title: 'e-rule',
      icon: 'minus',
      category: 'e_components',
      attributes: {
        orientation: {
          type: 'string',
          default: 'horizontal',
        },
      },
      edit: ({ attributes, setAttributes }) => {
        return (html`
        <div>
          <${InspectorControls}>
            <${Panel} header="My Panel">
              <${PanelBody} title="e-rule Settings" initialOpen=${true}>
                  <${RadioControl}
                      label="Orientation"
                      help="Vertical or Horizontal Orientation"
                      selected=${attributes.orientation}
                      options=${[
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' },
          ]}
                      onChange=${(newVal) => setAttributes({ orientation: newVal })}
                    />
              </${PanelBody}>
            </${Panel}>
          </${InspectorControls}>

          <e-rule ${attributes.orientation === 'horizontal' ? '' : 'orientation="vertical"'} > </e-rule>
        </div>
				`)
      },
      save: ({ attributes }) => {
        return (html`<e-rule ${attributes.orientation === 'horizontal' ? '' : 'orientation="vertical"'} ></e-rule>`);
      },
    },
  );

})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.HTM);
