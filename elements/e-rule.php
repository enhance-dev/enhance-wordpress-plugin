<?php

function ERule( $state ) {
	$attrs       = $state['attrs'] ?? array();
	$orientation = $attrs['orientation'] ?? '';
	$isVertical  = $orientation === 'vertical';

	$hr = $isVertical ? '<hr/>' : '<hr aria-orientation="vertical" />';
	return <<<HTMLDOC
    <style scope=global>
      e-rule { 
        display: block 

        /* Horizontal rule */
        hr {
          background-color: var(--e-color-gray-3);
          border: none;
          margin: 0;
          height: 1px;

          /* Vertical bar/separator, requires explicit height parent, flex or grid parent */
          &[aria-orientation=vertical] {
            width: 1px;
            height: auto;
          }
        }
      }
    </style>
    {$isVertical}
HTMLDOC;
}
