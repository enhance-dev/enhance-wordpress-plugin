; (function(blocks, element, blockEditor, components, htm) {
  const InspectorControls = blockEditor.InspectorControls;
  const useBlockProps = blockEditor.useBlockProps;
  const { RadioControl, ToggleControl } = components
  const { Panel, PanelRow, PanelBody } = components
  const InnerBlocks = blockEditor.InnerBlocks;
  const html = htm.bind(element.createElement);

  blocks.registerBlockType(
    'e-components/e-alert',
    {
      title: 'e-alert',
      icon: 'warning',
      category: 'e_components',
      attributes: {
        dismissible: {
          type: 'string',
          attribute: 'dismissible',
          source: 'attribute',
          selector: 'e-alert',
          default: "true",
        },
        type: {
          type: 'string',
          default: 'info',
          source: 'attribute',
          attribute: 'type',
          selector: 'e-alert',
        },
      },
      edit: ({ attributes, setAttributes }) => {
        const isDismissible = attributes.dismissible !== "false"
        const toggleDismiss = () => {
          setAttributes({ dismissible: isDismissible ? 'false' : 'true' })
        }
        return (html`
          <${InspectorControls}>
            <${Panel} header="My Panel">
              <${PanelBody} title="e-alert Settings" initialOpen=${true}>
                  <${RadioControl}
                      label="Type of Alert"
                      help="Warning, Error, Info, Success"
                      selected=${attributes.type}
                      options=${[
            { label: 'Info', value: 'info' },
            { label: 'Warning', value: 'warn' },
            { label: 'Error', value: 'error' },
            { label: 'Success', value: 'success' },
          ]}
                      onChange=${(newVal) => setAttributes({ type: newVal })}
                    />
                  <${ToggleControl}
                    label="Dismissible"
                    checked=${isDismissible}
                    onChange=${toggleDismiss}
                  />
              </${PanelBody}>
            </${Panel}>
          </${InspectorControls}>
        <e-alert type=${attributes.type} dismissible=${isDismissible ? 'true' : 'false'} > <${InnerBlocks} /> </e-alert>

    `)
      },
      save: ({ attributes }) => {
        const isDismissible = attributes.dismissible !== "false"
        return (
          html`<e-alert type=${attributes.type} dismissible=${isDismissible ? 'true' : 'false'} ><${InnerBlocks.Content} /></e-alert>`
        );
      },
    },
  );

})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.HTM);
