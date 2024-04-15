; (function(blocks, useHtml) {
  useHtml.init('my-card')

  blocks.registerBlockType('my-components/my-card', {
    title: 'My Card',
    icon: 'heading',
    category: 'layout',
    attributes: {
      content: {
        type: 'string',
        source: 'text',
        selector: 'my-card',
      },
      title: {
        type: 'string',
        source: 'attribute',
        attribute: 'title',
        selector: 'my-card',
      },
      url: {
        type: 'string',
        source: 'attribute',
        attribute: 'url',
        selector: 'my-card',
      },
    },
    edit: function(props) {
      return useHtml.editWrap(props,
        {
          name: 'my-card',
          attributeNames: ['content', 'title', 'url'],
          htmlTemplate: (attrs) => {
            return `
        <style>
        :host {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            color: black;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0,0,0,.125);
            border-radius: 0.25rem;
        }
        .card-img {
            width: 100%;
            border-top-left-radius: calc(0.25rem - 1px);
            border-top-right-radius: calc(0.25rem - 1px);
        }
        .card-body {
            flex: 1 1 auto;
            padding: 1.25rem;
        }
        .card-title {
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
            font-weight: 500;
        }

        a {
          display:block;
          overflow:hidden;
        }

        dialog {
          background: white;
          padding-inline: clamp(1rem, 0.97rem + 0.17vw, 1.13rem);
          margin: auto;
          overflow:visible;
        }

        .close-button {
          background-color: white;
          block-size: 2em;
          inline-size: 2em;
          box-shadow: 0 4px 12px hsla(0deg 0% 0% / 0.2);
          translate: 1em 1em;
          border-radius:100%;
          font-weight:600;
        }

        dialog img {
          max-block-size: var(--max-height, 80vh);
          border: var(--space-0) solid white;
          margin: auto;
        }

        dialog::backdrop {
          background-color: var(--background-color, hsla(0deg 0% 0% / 0.5));
        }

        dialog form {
          text-align:end;
          position:relative;
          z-index:1;
        }

        .icon-input {
          display: inline-block;
          cursor: pointer;
        }

        .edit-icon {
          width: 20px;
          height: 20px;
        }

        .edit-input {
          width: 0;
          border: none;
          padding: 0;
          opacity: 0;
          transition: width 0.3s ease, opacity 0.3s ease;
          cursor: pointer;
        }

        .icon-input:not(:focus-within) {
          opacity:50%;
        }
        label.icon-input:has(input:placeholder-shown) span.description {
          display:inline;
        }
        span.description { display:none;}

        .icon-input:focus-within .edit-input {
          width: 150px; /* Expand input field */
          padding: 5px; /* Add some padding */
          opacity: 1; /* Make input visible */
          cursor: text;
        }

        .icon-input:focus-within .edit-icon {
          pointer-events: none;
        }

        </style>
        <img src='${attrs.url || ""}' />
        <div class="card-body font-sans">
          <label class="icon-input"><span class=description>Image URL:</span>
            <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM3 17a2 2 0 002 2h12a1 1 0 001-1v-1H5a2 2 0 01-2-2v-1H3v3z"/>
            </svg>
            <input type="text" class="edit-input" name=url placeholder="image url" value="${attrs.url}"/>
          </label>
          <h5 class="card-title">${attrs.title || ''}</h5>
          <label class="icon-input"><span class=description>Title:</span>
            <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM3 17a2 2 0 002 2h12a1 1 0 001-1v-1H5a2 2 0 01-2-2v-1H3v3z"/>
            </svg>
            <input type="text" class="edit-input" name=title placeholder="Title" value="${attrs.title}" />
          </label>
          <p class="card-text">${attrs.content || ''}</p>
          <label class="icon-input"><span class=description>Description:</span>
            <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM3 17a2 2 0 002 2h12a1 1 0 001-1v-1H5a2 2 0 01-2-2v-1H3v3z"/>
            </svg>
            <input type="text" class="edit-input" name=content placeholder="description" value="${attrs.content}" />
          </label>
        </div>
          `
          },
          listeners: [
            (blockRoot, sendUpdate) => blockRoot.querySelector('input[name=title]').addEventListener('input', (event) => {
              sendUpdate({ title: event.target.value });
            }),
            (blockRoot, sendUpdate) => blockRoot.querySelector('input[name=title]').addEventListener('blur', (event) => {
              blockRoot.querySelector('h5').innerText = event.target.value
            }),
            (blockRoot, sendUpdate) => blockRoot.querySelector('input[name=content]').addEventListener('input', (event) => {
              sendUpdate({ content: event.target.value });
            }),
            (blockRoot, sendUpdate) => blockRoot.querySelector('input[name=content]').addEventListener('blur', (event) => {
              blockRoot.querySelector('p').innerText = event.target.value
            }),
            (blockRoot, sendUpdate) => blockRoot.querySelector('input[name=url]').addEventListener('input', (event) => {
              sendUpdate({ url: event.target.value });
            }),
            (blockRoot, sendUpdate) => blockRoot.querySelector('input[name=url]').addEventListener('paste', (event) => {
              event.preventDefault();
              const clipboardData = event.clipboardData || window.clipboardData;
              const pastedText = clipboardData.getData('text');
              blockRoot.querySelector('input[name=url]').value = pastedText;
              sendUpdate({ url: pastedText });
            }),
            (blockRoot, sendUpdate) => blockRoot.querySelector('input[name=url]').addEventListener('blur', (event) => {
              blockRoot.querySelector('img').setAttribute('src', event.target.value)
            })
          ]
        },

      );
    },
    save: function(props) {
      return useHtml.saveWrap(props, {
        tag: 'my-card',
        attributes: { title: props.attributes?.title || '', url: props.attributes?.url || '' },
        html: props.attributes?.content
      })
    },
  });

})(window.wp.blocks, window.useHtml);

