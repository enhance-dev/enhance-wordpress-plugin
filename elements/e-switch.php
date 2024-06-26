<?php

function ESwitch( $state ) {
	$attrs            = $state['attrs'];
	$topLevelAttrs    = array( 'class', 'is', 'checkbox' );
	$innerAttrs       = array_filter(
		$attrs,
		function ( $key ) use ( $topLevelAttrs ) {
			return ! in_array( $key, $topLevelAttrs );
		},
		ARRAY_FILTER_USE_KEY
	);
	$innerAttrsString = implode(
		' ',
		array_map(
			function ( $key, $value ) {
				return $key . '="' . $value . '"';
			},
			array_keys( $innerAttrs ),
			$innerAttrs
		)
	);
	return <<<HTMLDOC
  <style scope=global>
    e-switch {
      /* Base switch styles */
      input[is=switch] {
        position: relative;
        width: 40px;
        height: 22px;
        appearance: none;
        margin: 0;
        border-radius: var(--e-border-radius-full);
        cursor: pointer;
        background-color: var(--e-color-gray-3);
        transition: background-color ease-in 0.12s;

        &::before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          top: 3px;
          left: 3px;
          border-radius: var(--e-border-radius-full);
          background-color: white;
          transition: all ease-in 0.12s;
        }

        &:focus-visible {
          outline: 2px solid var(--e-color-focus);
          outline-offset: 0;
        }

        /* Checked state */
        &:checked { background-color: var(--e-color-primary-action) }
        &:checked:before { left: 20px }

        /* Disabled state */
        &:disabled {
          cursor: not-allowed;
          background-color: var(--e-color-disabled-bg);
        }
      }
    }
  </style>
  <input is=switch type=checkbox {$innerAttrsString}>

HTMLDOC;
}
