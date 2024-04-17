<?php

function ELink( $state ) {
	$attrs            = $state['attrs'];
	$isAnchor         = isset( $attrs['href'] );
	$topLevelAttrs    = array( 'class' );
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
	$anchor           = $isAnchor ? "<a {$innerAttrsString} ><slot></slot></a>" : "<span role=link {$innerAttrsString}><slot></slot></span>";
	return <<<HTMLDOC
    <style scope=global>
      e-link {
        /* Base link styles */
        a, span[role=link] {
          text-decoration: none;
          color: var(--e-color-primary-action);
          cursor: pointer;

          /*:is(a, span[role=link]):visited { color: var(--e-color-primary-action) }*/
          &:hover,
          &:focus-visible {
            text-decoration: underline;
            outline: 0;
          }

          /* Disabled state */
          &[disabled] {
            color: var(--e-color-disabled-fg);
            pointer-events: none;
          }
        }
      }
    </style>
    {$anchor}
HTMLDOC;
}
