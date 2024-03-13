function MyCard({ html, state }) {
    const { attrs={} } = state
    const { title='default', url } = attrs
    const image = url ? `<img src="${url}" />` : ''
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
      </style>
      ${image}
      <div class="card-body font-sans">
        <h5 class="card-title">${title}</h5>
        <slot></slot>
      </div>
    `
}
