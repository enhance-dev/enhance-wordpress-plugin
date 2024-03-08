# Running with Local

If you want to try out this plugin one of the best ways we know is by running [Local](https://localwp.com/).

## Prerequisite

1. Install the Extism Runtime by following the instructions in the [PHP SDK Repository](https://github.com/extism/php-sdk#install-the-extism-runtime-dependency).
2. [Download and install](https://localwp.com/) Local.

## Getting Started

1. Clone this [repo](https://github.com/enhance-dev/enhance-wordpress-plugin)
1. `cd enhance-wordpress-plugin`
1. Run `composer install`
1. Start Local on your machine.
1. Create a new site
    - Choose `Spin up a new WordPress or headless WordPress site`
    - Give it a name
    - Select `Preferred`
    - Login to WordPress
    - Click `Add Site`
1. Edit the `php.ini` file
    - Click `Go to site folder`
    - Open the file `conf/php/php.ini.hbs`
    - Add the line:

    ```sh
    ffi.enable=true
    ```
    After the line with `[PHP]`
1. Copy the plugin code to your local instance.
    - Click `Go to site folder`
    - Create a new folder in `app/public/wp-content/plugins/enhance`
    - Copy the contents of the `enhance-wordpress-plugin` repo to `app/public/wp-content/plugins/enhance`.
    - You can ignore the `.git` folder in `enhance-wordpress-plugin`
1. Stop the site by clicking the stop button in the top right of Local.
1. Start the site by clicking the start button in the top right of Local.
1. Click the `WP Admin` button
1. Login to WordPress
1. Click `Plugins` from the left hand menu
1. Activate `Enhance components as Guetenburg blocks` and `Enhance SSR` plugins.

Now you are reading to being [using your elements](../readme.md#use-elements).
