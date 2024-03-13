function MyCard({ html, state }) {
    const { attrs={} } = state
    const { title='default', url } = attrs

    function createImageTag(image) {
      if (image) {
        return `
        <a href='${image}' class='block overflow-hidden'>
          <img src='${image}' class="card-img" />
        </a>
        <dialog class='m-auto overflow-visible'>
          <form method='dialog' class='text-end relative z1'>
            <button class='close-button radius-100 font-semibold'>&times;</button>
          </form>
          <img src='${image}' class='m-auto' />
        </dialog>`
      } else {
        return ''
      }
    }
    const image = createImageTag(url)
    return html`
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
        dialog {
        background: transparent;
        padding-inline: var(--space-0);
      }

      .close-button {
        background-color: white;
        block-size: 2em;
        inline-size: 2em;
        box-shadow: 0 4px 12px hsla(0deg 0% 0% / 0.2);
        translate: 1em 1em;
      }

      dialog img {
        max-block-size: var(--max-height, 80vh);
        border: var(--space-0) solid white;
      }

      dialog::backdrop {
        background-color: var(--background-color, hsla(0deg 0% 0% / 0.5));
      }
      </style>
      ${image}
      <div class="card-body font-sans">
        <h5 class="card-title">${title}</h5>
        <slot></slot>
      </div>
      <script type="module">
class MyCard extends HTMLElement {
  constructor() {
    super()
    this.trigger = this.querySelector('a')
    this.dialog = this.querySelector('dialog')
  }
  connectedCallback() {
    this.trigger.addEventListener('click', event => {
      // Prevent link firing so we can open the lightbox's modal instead
      event.preventDefault()
      this.querySelector('dialog').showModal()
    })

    this.dialog.addEventListener('click', event => {
      // Close the dialog if a click event fires from the dialog (but not its children)
      if (event.target.tagName === 'DIALOG') dialog.close()
    })
  }
}

customElements.define('my-card', MyCard)
      </script>
    `
}
