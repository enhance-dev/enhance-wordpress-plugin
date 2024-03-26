;(function(blocks, element){
  if (!window.useHtml) {window.useHtml = {}}
  if (!window.useHtml.init) { 
    window.useHtml.init = function initializeWrapper(name) {
      if (!window.useHtml._wrappers) { window.useHtml._wrappers={}}
      if (!window.useHtml._wrappers[name]) {window.useHtml._wrappers[name] = ReactComponentEditWrapperMaker(name)}
      /////////////////////////////////////////////////////////
      // React Component as a wrapper around the Custom Element for editing our component
      /////////////////////////////////////////////////////////
      function ReactComponentEditWrapperMaker(name){
        return function ReactComponentEditWrapper(props) {
          const { useEffect, useRef } = element
          const customElementAttributes = props.reactComponentAttributes
          const updaters = props.updaters
          const customElementRef = useRef(null);
          useEffect(() => {
            const customElement = customElementRef.current;
            const handleCustomChange = (event) => {
              const updates = Object.entries(event.detail)
              updates.forEach(([key, value]) => { updaters[key](value) })
            };
            customElement.addEventListener('custom-change', handleCustomChange);
            return () => {
              customElement.removeEventListener('custom-change', handleCustomChange);
            };
          }, []);

          return element.createElement(`${name}-ce-edit-wrapper`, { ref: customElementRef, ...customElementAttributes }, null);
        }
      }
    }
  }

  if (!window.useHtml.editWrap) {
    window.useHtml.editWrap = function editWrap(props,{ name, attributeNames, htmlTemplate, listeners }) {
      const reactComponentAttributes = props.attributes
      /////////////////////////////////////////////////////////
      // Custom Element as a container for our HTML component with Shadow DOM berrier
      /////////////////////////////////////////////////////////
      class CustomElementEditWrapper extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
          const initialData = {}
          attributeNames.forEach(key => { initialData[key] = this.getAttribute(key) || '' })
          this.shadowRoot.innerHTML = htmlTemplate(initialData)
          const sendEvent = (newDetails) => this.dispatchEvent(new CustomEvent('custom-change', {detail:newDetails}))
          listeners.forEach(listen => listen(this.shadowRoot,sendEvent))
        }
      }
      if (!customElements.get(`${name}-ce-edit-wrapper`)) { customElements.define(`${name}-ce-edit-wrapper`, CustomElementEditWrapper); }
      /////////////////////////////////////////////////////////////

      let updaters = {}
      attributeNames.forEach(key => {
        updaters[key] =
          function(newValue) {
            props.setAttributes({ [key]: newValue });
          }
      })
      return element.createElement(useHtml._wrappers[name], { reactComponentAttributes, updaters }, null);
    }
  }

  if (!window.useHtml.saveWrap) {
    window.useHtml.saveWrap = function saveWrap(props,{ tag, attributes = {}, html = '' }) {
      return element.createElement(tag, { dangerouslySetInnerHTML: { __html: html }, ...attributes }, null)
    }
  }

})(window.wp.blocks, window.wp.element);

