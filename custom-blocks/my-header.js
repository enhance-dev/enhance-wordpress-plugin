(function(blocks, element, blockEditor) {
  let el = element.createElement;
  let RichText = blockEditor.RichText;

  blocks.registerBlockType('enhance-plugin/my-header-block', {
    title: 'My Header',
    icon: 'heading',
    category: 'layout',
    attributes: {
      content: {
        type: 'string',
        source: 'html',
        selector: 'my-header',
      },
    },
    edit: function(props) {
      var content = props.attributes.content;
      function onChangeContent(newContent) {
        props.setAttributes({ content: newContent });
      }

      return el(
        RichText,
        {
          tagName: 'h1',
          className: 'my-custom-header',
          style: { color: 'red' },
          value: content,
          onChange: onChangeContent,
        }
      );
    },
    // Save should be the authored/non-expanded html form of my-header (i.e. `<my-header>Hello World</my-header>`)
    save: function(props) {
      const htmlContent = props.attributes.content
      return el('my-header', { dangerouslySetInnerHTML: { __html: htmlContent } }, null);
    },
  }
  );
})(window.wp.blocks, window.wp.element, window.wp.blockEditor);










(function(blocks, element, blockEditor) {

  /////////////////////////////////////////////////////////
  // Custom Element as a container for our HTML component with Shadow DOM berrier
  /////////////////////////////////////////////////////////
  class CustomElementEditWrapper extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
      const initialcontent = this.getAttribute('initialcontent');
      this.shadowRoot.innerHTML = `
        <style>
          /* Styles for your input component */
          input {
            padding: 8px;
            margin: 10px 0;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
        </style>
        <label>Header Content:
          <input type="text" placeholder="Enter some text" value="${initialcontent}" />
        </label>
      `;
      this.shadowRoot.querySelector('input').addEventListener('input', (event) => {
        this.dispatchEvent(new CustomEvent('custom-change', { detail: { newValue: event.target.value } }));
      });
    }
    // static get observedAttributes() {
    //   return ['initialcontent'];
    // }
    // attributeChangedCallback(name, oldValue, newValue) {
    //   console.log('attributeChangedCallback',name, oldValue, newValue);
    //   const input = this.shadowRoot.querySelector('input')
    //   if(name==='initialcontent'){
    //   if (newValue && input && input.value !== newValue) input.value = newValue;
    //   }
    // }
  }
  customElements.define('custom-element-edit-wrapper', CustomElementEditWrapper);

  /////////////////////////////////////////////////////////
  // React Component as a wrapper around the Custom Element for editing our component
  /////////////////////////////////////////////////////////
  const { useEffect, useRef } = element

  function ReactComponentEditWrapper(props) {
    const customElementRef = useRef(null);

    useEffect(() => {
      const customElement = customElementRef.current;
      const handleCustomChange = (event) => {
        props.onChangeContent({ content: event.detail.newValue });
      };
      customElement.addEventListener('custom-change', handleCustomChange);
      return () => {
        customElement.removeEventListener('custom-change', handleCustomChange);
      };
    }, []);

    return el('custom-element-edit-wrapper', { ref: customElementRef, initialcontent: (props.content || '') }, null);
  }



  let el = element.createElement;
  let RichText = blockEditor.RichText;

  blocks.registerBlockType('enhance-plugin/my-header-block', {
    title: 'My Header',
    icon: 'heading',
    category: 'layout',
    attributes: {
      content: {
        type: 'string',
        source: 'html',
        selector: 'my-header',
      },
    },
    edit: function(props) {
      var content = props.attributes.content;
      function onChangeContent(newContent) {
        props.setAttributes({ content: newContent?.content });
      }
      return el(ReactComponentEditWrapper, { content, onChangeContent }, null);
    },
    // <!-- wp:enahnce/my-header {"content":"Hello World"} -->
    // <my-header>
    //   Hello World
    // </my-header>
    // <!-- /wp:enhance/my-header -->

    // Save should be the authored/non-expanded html form of my-header (i.e. `<my-header>Hello World</my-header>`)
    save: function(props) {
      const htmlContent = props.attributes.content
      return el('my-header', { dangerouslySetInnerHTML: { __html: htmlContent } }, null);
    },
  }
  );
})(window.wp.blocks, window.wp.element, window.wp.blockEditor);


