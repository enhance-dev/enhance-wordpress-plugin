<?php
function EAlert( $state ) {
	$attrs             = $state['attrs'] ?? array();
	$dismissible       = $attrs['dismissible'] !== 'false';
	$type              = $attrs['type'] ?? '';
	$alert             = $type === 'warn' || $type === 'error';
	$dismissibleString = $dismissible ? '<e-button type=remove aria-label="Dismiss Alert" ></e-button>'
		: '';
	return <<<HTMLDOC
    <style scope="global">
      /* Base styles */
      e-alert {
        display: flex;
        align-items: center;
        padding: var(--e-space-md);
        background-color: var(--e-color-gray-2);
      }

      e-alert + e-alert {
          margin-top: var(--e-space-sm);
      }

        /* Icon */
      e-alert[icon]::before {
          content: attr(icon);
          font-family: e-icons;
          font-size: var(--e-font-size-lg);
          margin-right: var(--e-space-sm);
      }

        /* Dismiss button */
      e-alert e-button[type="remove"]:last-of-type {
          margin-left: auto;
      }

        /* Types */
      e-alert[type="info"] {
          background-color: var(--e-color-blue-1);
      }

      e-alert[type="info"]::before {
            color: var(--e-color-blue-3);
      }

      e-alert[type="success"] {
          background-color: var(--e-color-green-1);
      }

      e-alert[type="success"]::before {
            color: var(--e-color-green-3);
      }

      e-alert[type="warn"] {
          background-color: var(--e-color-orange-1);
      }

      e-alert[type="warn"]::before {
            color: var(--e-color-orange-3);
      }

      e-alert[type="error"] {
          background-color: var(--e-color-red-1);
      }

      e-alert[type="error"]::before {
            color: var(--e-color-red-3);
      }
    </style>

    <slot></slot>
    {$dismissibleString}

    <script type="module">
      class EAlert extends HTMLElement {
        constructor() {
          super();
          this.dismiss = this.dismiss.bind(this);
        }

        connectedCallback() {
          if (this.getAttribute("dismissible") !== "false") {
            const dismissBtn = this.querySelector("e-button[type=remove]");
            dismissBtn.addEventListener("click", () => this.dismiss());
            this.append(dismissBtn);
          }
        }

        static get observedAttributes() {
          return ["autodismiss"];
        }

        attributeChangedCallback(name, oldVal, newVal) {
          if (name === "autodismiss") {
            const seconds = newVal ? parseInt(newVal) * 1000 : 4000;
            setTimeout(() => this.dismiss(), seconds);
          }
        }

        dismiss() {
          this.dispatchEvent(new CustomEvent("dismiss"));
          this.remove();
        }
      }
      customElements.define("e-alert", EAlert);
    </script>
HTMLDOC;
}
