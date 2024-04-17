;// (function(blocks, element, blockEditor) {

//
// React Component as a wrapper around the Custom Element for editing our component
//

// const ReactWrapper = ReactComponentEditWrapperMaker('new-header')
// function ReactComponentEditWrapperMaker(name){
// return function ReactComponentEditWrapper(props) {
// const { useEffect, useRef } = element
// const customElementAttributes = props.reactComponentAttributes
// console.log('customElementAttributes', customElementAttributes)
// const updaters = props.updaters
// const customElementRef = useRef(null);
// useEffect(() => {
// const customElement = customElementRef.current;
// const handleCustomChange = (event) => {
// console.log('custom-change event', event)
// const updates = Object.entries(event.detail)
// updates.forEach(([key, value]) => { updaters[key](value) })
// if (event?.detail?.content) props.onChangeContent(event.detail.content)
// };
// customElement.addEventListener('custom-change', handleCustomChange);
// return () => {
// customElement.removeEventListener('custom-change', handleCustomChange);
// };
// }, []);

// return element.createElement(`${name}-ce-edit-wrapper`, { ref: customElementRef, ...customElementAttributes }, null);
// return element.createElement(`${name}-ce-edit-wrapper`, { ref: customElementRef, initialContent:(props.content || '')  }, null);
// return element.createElement(`new-header-ce-edit-wrapper`, { ref: customElementRef, initialContent:(props.content || '')  }, null);
// return element.createElement(`${name}-ce-edit-wrapper`, { ref: customElementRef, ...customElementAttributes }, null);
// }
// }
//

// blocks.registerBlockType('enhance-plugin/new-header-block', {
// title: 'New Header',
// icon: 'heading',
// category: 'layout',
// attributes: {
// content: {
// type: 'string',
// source: 'text',
// selector: 'new-header',
// },
// something: {
// type: 'string',
// source: 'attribute',
// attribute: 'something',
// selector: 'new-header',
// },
// },
// edit: function(props) {
// const { content, something } = props.attributes;

// return editWrap(
// {
// monitorAttrs: ['content', 'something'],
// monitorAttrs: ['content'],
// name:'new-header',
// htmlTemplate: (attrs) => {
// return `
// <style>
// * Styles for your input component */
// input {
// padding: 8px;
// margin: 10px 0;
// box-sizing: border-box;
// border: 1px solid #ccc;
// border-radius: 4px;
// }
// </style>
// <label something="${attrs.something}">Header Content:
// <input type="text" placeholder="Enter some text" value="${attrs.content || ''}" />
// </label>
// `
// },
// listeners: [
// (component) => component.shadowRoot.querySelector('input').addEventListener('input', (event) => {
// component.dispatchEvent(new CustomEvent('custom-change', { detail: { content: event.target.value } }));
// console.log('input event listener triggered', event)
// })
// ]
// },
// props
// );
// },
// Save should be the authored/non-expanded html form of new-header (i.e. `<new-header>Hello World</new-header>`)
// save: function(props) {
// const fromEditor = props.attributes
// const { content, something ='nothing' } = fromEditor
// const { content } = fromEditor
// return saveWrap({
// tag: 'new-header',
// outerAttributes: { something: something },
// outerAttributes: { },
// html: content
// })
// },
// }
// );




// ;(function(blocks, element){
// if (!window.unReact) {window.unReact = {}}
// if (!window.unReact.init) {
// window.unReact.init = function initializeWrapper(name) {
// if (!window.unReact._wrappers) { window.unReact._wrappers={}}
// if (!window.unReact._wrappers[name]) {window.unReact._wrappers[name] = ReactComponentEditWrapperMaker(name)}
//
// React Component as a wrapper around the Custom Element for editing our component
//
// function ReactComponentEditWrapperMaker(name){
// return function ReactComponentEditWrapper(props) {
// const { useEffect, useRef } = element
// const customElementAttributes = props.reactComponentAttributes
// const updaters = props.updaters
// const customElementRef = useRef(null);
// useEffect(() => {
// const customElement = customElementRef.current;
// const handleCustomChange = (event) => {
// const updates = Object.entries(event.detail)
// updates.forEach(([key, value]) => { updaters[key](value) })
// };
// customElement.addEventListener('custom-change', handleCustomChange);
// return () => {
// customElement.removeEventListener('custom-change', handleCustomChange);
// };
// }, []);

// return element.createElement(`${name}-ce-edit-wrapper`, { ref: customElementRef, ...customElementAttributes }, null);
// }
// }
// }
// }

// if (!window.unReact.editWrap) {
// window.unReact.editWrap = function editWrap(props,{ name, attributeNames, htmlTemplate, listeners }) {
// const reactComponentAttributes = props.attributes
//
// Custom Element as a container for our HTML component with Shadow DOM berrier
//
// class CustomElementEditWrapper extends HTMLElement {
// constructor() {
// super();
// this.attachShadow({ mode: 'open' });
// }
// connectedCallback() {
// const initialData = {}
// attributeNames.forEach(key => { initialData[key] = this.getAttribute(key) || '' })
// this.shadowRoot.innerHTML = htmlTemplate(initialData)
// const sendEvent = (newDetails) => this.dispatchEvent(new CustomEvent('custom-change', {detail:newDetails}))
// listeners.forEach(listen => listen(this.shadowRoot,sendEvent))
// }
// }
// if (!customElements.get(`${name}-ce-edit-wrapper`)) { customElements.define(`${name}-ce-edit-wrapper`, CustomElementEditWrapper); }
//

// let updaters = {}
// attributeNames.forEach(key => {
// updaters[key] =
// function(newValue) {
// props.setAttributes({ [key]: newValue });
// }
// })
// return element.createElement(unReact._wrappers[name], { reactComponentAttributes, updaters }, null);
// }
// }

// if (!window.unReact.saveWrap) {
// window.unReact.saveWrap = function saveWrap(props,{ tag, attributes = {}, html = '' }) {
// return element.createElement(tag, { dangerouslySetInnerHTML: { __html: html }, ...attributes }, null)
// }
// }

// })(window.wp.blocks, window.wp.element);
(function (blocks,useHtml) {
	useHtml.init( 'my-header' )

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
			edit: function (props) {
				return useHtml.editWrap(
					props,
					{
						name:'my-header',
						attributeNames: ['content', 'something'],
						htmlTemplate: (attrs) => {
							return `
							< style >
							/* Styles for your input component */
							input {
								padding: 8px;
								margin: 10px 0;
								box - sizing: border - box;
								border: 1px solid #ccc;
								border - radius: 4px;
							}
							< / style >
							< label something = "${attrs.something}" > Header Content:
							< input type      = "text" placeholder = "Enter some text" value = "${attrs.content || ''}" / >
							< / label >
							`
						},
						listeners: [
						(blockRoot,sendUpdate) => blockRoot.querySelector( 'input' ).addEventListener(
							'input',
							(event) => {
								sendUpdate( { content: event.target.value } );
							}
						)
					]
					},
				);
			},
			save: function (props) {
				return useHtml.saveWrap(
					props,
					{
						tag: 'my-header',
						attributes: { something: props.attributes ? .something || 'nothing' },
						html: props.attributes ? .content
					}
				)
			},
		}
	);

})( window.wp.blocks, window.useHtml );
