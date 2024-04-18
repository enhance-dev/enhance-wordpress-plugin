; (function(blocks, element, blockEditor, components, htm) {
  const InspectorControls = blockEditor.InspectorControls;
  const ToggleControl = components.ToggleControl
  const { Panel, PanelRow, PanelBody } = components
  const InnerBlocks = blockEditor.InnerBlocks;
  const html = htm.bind(element.createElement);

  blocks.registerBlockType(
    'e-components/e-box',
    {
      title: 'e-box',
      icon: 'text',
      category: 'e_components',
      attributes: {
        ord: {
          type: 'string',
          default: 'primary',
        },
      },
      edit: ({ attributes, setAttributes }) => {
        const toggleOrd = (newVal) => setAttributes({ ord: attributes.ord === 'secondary' ? 'primary' : 'secondary' })
        return (html`
        <div>
          <${InspectorControls}>
            <${Panel} header="My Panel">
              <${PanelBody} title="e-box Settings" initialOpen=${true}>
                <${PanelRow}>My Panel Inputs and Labels
                  <${ToggleControl}
                    label="Ordinal Priority"
                    checked=${attributes.ord !== "secondary"}
                    onChange=${toggleOrd}
                  />
                </${PanelRow}>
              </${PanelBody}>
            </${Panel}>
          </${InspectorControls}>
        <e-box ord=${attributes.org}>
          <${InnerBlocks} />
        </e-box>
        </div>
				`)
      },
      save: ({ attributes }) => {
        return (html`<e-box ord=${attributes.ord}><${InnerBlocks.Content}/></e-box>`);
      },
    },
  );

})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.HTM);
