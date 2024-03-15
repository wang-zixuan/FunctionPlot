define( function ( require ) {

    var kity = require( "kity" ),

        PREFIX = "kf-editor-ui-",

        // UiUitls
        $$ = require( "ui/ui-impl/ui-utils" ),

        List = kity.createClass( "List", {

            constructor: function ( doc, options ) {

                this.options = options;

                this.doc = doc;

                this.onselectHandler = null;

                this.currentSelect = -1;

                this.element = this.createBox();
                this.itemGroups = this.createItems();

                this.mergeElement();

            },

            onselectHandler: function ( index, oldIndex ) {},

            setSelectHandler: function ( selectHandler ) {
                this.onselectHandler = selectHandler;
            },

            createBox: function () {

                var boxNode = $$.ele( this.doc, "div", {
                        className: PREFIX + "list"
                    } ),

                    // 创建背景
                    bgNode = $$.ele( this.doc, "div", {
                        className: PREFIX + "list-bg"
                    } );

                if ( "width" in this.options ) {
                    boxNode.style.width = this.options.width + "px";
                }

                boxNode.appendChild( bgNode );

                return boxNode;

            },

            select: function ( index ) {

                var oldSelect = this.currentSelect;

                if ( oldSelect === -1 ) {
                    oldSelect = index;
                }

                this.unselect( oldSelect );

                this.currentSelect = index;

                this.itemGroups.items[ index ].firstChild.style.visibility = "visible";

                this.onselectHandler( index, oldSelect );

            },

            unselect: function ( index ) {

                this.itemGroups.items[ index ].firstChild.style.visibility = "hidden";

            },

            initEvent: function () {

                var className = "." + PREFIX + "list-item",
                    _self = this;

                $$.delegate( this.itemGroups.container, className, "mousedown", function ( e ) {

                    e.preventDefault();

                    if ( e.which !== 1 ) {
                        return;
                    }

                    _self.select( this.getAttribute( "data-index" ) );

                } );

                $$.on( this.element, "mousedown", function ( e ) {

                    e.stopPropagation();
                    e.preventDefault();

                } );

            },

            createItems: function () {

                var doc = this.doc,
                    groupNode = null,
                    itemNode = null,
                    iconNode = null,
                    items = [],
                    itemContainer = null;

                groupNode = $$.ele( this.doc, "div", {
                    className: PREFIX + "list-item"
                } );

                itemContainer = groupNode.cloneNode( false );
                itemContainer.className = PREFIX + "list-item-container";

                kity.Utils.each( this.options.items, function ( itemText, i ) {

                    itemNode = groupNode.cloneNode( false );

                    iconNode = groupNode.cloneNode( false );
                    iconNode.className = PREFIX + "list-item-icon";
                    iconNode.innerHTML = '<img src="assets/images/toolbar/button/tick.png">';

                    itemNode.appendChild( iconNode );
                    itemNode.appendChild( $$.ele( doc, "text", itemText ) );

                    itemNode.setAttribute( "data-index", i );

                    items.push( itemNode );
                    itemContainer.appendChild( itemNode );

                } );

                return {
                    container: itemContainer,
                    items: items
                };

            },

            mergeElement: function () {

                this.element.appendChild( this.itemGroups.container );

            },

            mountTo: function ( container ) {
                container.appendChild( this.element );
            }

        } );

    return List;

} );