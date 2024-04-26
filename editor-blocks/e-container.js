; (function(blocks, element, blockEditor, components, htm) {
  const InspectorControls = blockEditor.InspectorControls;
  const { RadioControl } = components
  const { Panel, PanelRow, PanelBody } = components
  const InnerBlocks = blockEditor.InnerBlocks;
  const html = htm.bind(element.createElement);

  blocks.registerBlockType(
    'e-components/e-container',
    {
      title: 'e-container',
      icon: 'align-wide',
      category: 'e_components',
      attributes: {
        maxwidth: {
          type: 'string',
          default: 'md',
        },
      },
      edit: ({ attributes, setAttributes }) => {
        return (html`
        <div>
          <${InspectorControls}>
            <${Panel} header="My Panel">
              <${PanelBody} title="e-container Settings" initialOpen=${true}>
                  <${RadioControl}
                      label="Max Width"
                      help="Container Size"
                      selected=${attributes.maxwidth}
                      options=${[
            { label: 'small', value: 'sm' },
            { label: 'medium', value: 'md' },
            { label: 'none', value: 'none' },
          ]}
                      onChange=${(newVal) => setAttributes({ maxwidth: newVal })}
                    />
              </${PanelBody}>
            </${Panel}>
          </${InspectorControls}>

          <e-container maxwidth=${attributes.maxwidth} >
            <${InnerBlocks} />
          </e-container>
        </div>
				`)
      },
      save: ({ attributes }) => {
        return (html`<e-container maxwidth=${attributes.maxwidth}><${InnerBlocks.Content}/></e-container>`);
      },
    },
  );

})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.HTM);
