Bootstrap boilerplate
=====================

Bootstrap boilerplate ready for customization. Override variables, mixins, classes and add your own style while keeping original Bootstrap files intact.

First launch
------------

The first time you launch a grunt task, the variables.less file will be copied to the less folder, with the font path changed to be relative to the bootstrap folder. From then, you can modify variables.less to suit your needs.

Usage
-----

    $ git clone https://github.com/jide/bootstrap-boilerplate.git myproject
    $ cd myproject
    $ npm install

**Development**

    $ grunt watch

**Production**

    $ grunt