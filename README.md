Bootstrap boilerplate
=====================

Bootstrap boilerplate ready for customization. Override variables, mixins, classes and add your own style while keeping original Bootstrap files intact.

First launch
------------

The first time you launch a grunt task, if you did not modify the variables.less file, it will be copied from bootstrap folder to the less folder, with the font path changed to be relative to the bootstrap folder. From then, you can modify variables.less to suit your needs, it won't be overriden. 
If you don't use Grunt, just modify the variables.less file and compile style.less manually.

Overrides
---------

You can override individual components using the grunt override:[component name] task. The component less file will be copied to the overrides folder. Replace [component name] with les name of the less file without the extension.

HTML Files
----------

- index.html, a very basic HTML start page.
- components.html, which lists all Bootstrap components in a single page, to quickly have an overview of what your theme looks like. (This file was copied from bootswatch)

Usage
-----

    $ git clone https://github.com/jide/bootstrap-boilerplate.git myproject
    $ cd myproject
    $ npm install

**Override a component**

    $ grunt override:panels

**Development**

    $ grunt watch

**Production**

    $ grunt
