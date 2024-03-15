/*!
 * toolbar元素列表定义
 */

define( function ( require ) {

    var UI_ELE_TYPE = require( "ui/ui-impl/def/ele-type" ),
        BOX_TYPE = require( "ui/ui-impl/def/box-type" ),
        kity = require( "kity" );

    var config = [ 
    {
        type: UI_ELE_TYPE.AREA,
        options: {
            button: {
                icon: "assets/images/toolbar/char/button.png"
            },
            box: {
                width: 527,
                type: BOX_TYPE.OVERLAP,
                group: [ 
                    {
                    title: "基础数学",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/pm.png">',
                            val: "\\pm"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/infty.png">',
                            val: "\\infty"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/eq.png">',
                            val: "="
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/sim.png">',
                            val: "\\sim"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/times.png">',
                            val: "\\times"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/div.png">',
                            val: "\\div"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/tanhao.png">',
                            val: "!"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/lt.png">',
                            val: "<"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/ll.png">',
                            val: "\\ll"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/gt.png">',
                            val: ">"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/gg.png">',
                            val: "\\gg"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/leq.png">',
                            val: "\\leq"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/geq.png">',
                            val: "\\geq"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/mp.png">',
                            val: "\\mp"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/simeq.png">',
                            val: "\\simeq"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/char/math/equiv.png">',
                            val: "\\equiv"
                        }
                    } ]
                }
            ]
            }
        }
    }, 
    {
        type: UI_ELE_TYPE.DELIMITER
    }, 
    {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "分数",
                icon: "assets/images/toolbar/button/frac.png"
            },
            box: {
                width: 378,
                group: [ 
                    {
                    title: "分数",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/1.png">',
                            val: "\\frac \\placeholder\\placeholder"
                        }
                    }, 
                    {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/2.png">',
                            val: "\\placeholder/\\placeholder"
                        }
                    } ]
                }
            ]
            }
        }
    }, 
    {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "上下标",
                icon: "assets/images/toolbar/button/script.png"
            },
            box: {
                width: 378,
                group: [ {
                    title: "上标和下标",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/script/1.png">',
                            val: "\\placeholder^\\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/2.png">',
                            val: "\\placeholder_\\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/3.png">',
                            val: "\\placeholder^\\placeholder_\\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/4.png">',
                            val: "^\\placeholder_\\placeholder\\placeholder"
                        }
                    } ]
                }
            ]
            }
        }
    }, 
    {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "根式",
                icon: "assets/images/toolbar/button/sqrt.png"
            },
            box: {
                width: 378,
                group: [ {
                    title: "根式",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/1.png">',
                            val: "\\sqrt \\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/2.png">',
                            val: "\\sqrt [\\placeholder] \\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/3.png">',
                            val: "\\sqrt [2] \\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/4.png">',
                            val: "\\sqrt [3] \\placeholder"
                        }
                    } ]
                }
            ]
            }
        }
    }, 
    {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "括号",
                icon: "assets/images/toolbar/button/brackets.png"
            },
            box: {
                width: 378,
                group: [ {
                    title: "方括号",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/brackets/1.png">',
                            val: "\\left(\\placeholder\\right)"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/brackets/2.png">',
                            val: "\\left[\\placeholder\\right]"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/brackets/3.png">',
                            val: "\\left\\{\\placeholder\\right\\}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/brackets/4.png">',
                            val: "\\left|\\placeholder\\right|"
                        }
                    } ]
                } ]
            }
        }
    } , 
    {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "向量",
                icon: "assets/images/toolbar/button/vector.png"
            },
            box: {
                width: 378,
                group: [ {
                    title: "向量选择",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/vector/a.jpg">',
                            val: "\\veca"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/vector/b.jpg">',
                            val: "\\vecb"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/vector/c.jpg">',
                            val: "\\vecc"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/vector/x.jpg">',
                            val: "\\vecx"
                        }
                    } , {
                        item: {
                            show: '<img src="assets/images/toolbar/vector/y.jpg">',
                            val: "\\vecy"
                    }
                    } , {
                        item: {
                            show: '<img src="assets/images/toolbar/vector/z.jpg">',
                            val: "\\vecz"
                        }
                    }]
                } ]
            }
        }
    }];

    return config;

} );