// noinspection SpellCheckingInspection

/**
 * jQuery PandaCart v1.0 Plugin
 * @author Emil Maran - (maran-emil.de)

 * @description Creates a cart functionality, working with json and localStorage,
 *              on the client side.
 *
 */

(function ($) {

    $.fn.PandaCart = function (options) {

        const element = $(this);

        // default values
        const defaults = {
            AppName: "PandaCart",
            AppVersion: "1.0",
            AppAuthor: "Emil Maran",
            AppWebsite: "maran-emil.de",
            AppQtyLimit: "5"
        };

        options = $.extend(defaults, options);

        // create localStorage if doesnt exists
        $._initCart = function () {

            if (!window.localStorage.getItem('addCart')) {

                const oCartCookie =
                    {
                        "AppName": options.AppName,
                        "AppVersion": options.AppVersion,
                        "AppAuthor": options.AppAuthor,
                        "AppWebsite": options.AppWebsite,
                        "cartList": {"": ""}
                    };

                if (window.localStorage) {
                    window.localStorage.setItem('addCart', JSON.stringify(oCartCookie));
                }
                // $.cookie('addCart', JSON.stringify( oCartCookie), { domain: ''+location.host , path: '/' })
            }
        }
        $._initCart();

        // addCart function
        $.addCart = function (sId, sName, sPoints) {

            let oCartCookie
            ;
            let ProdKey;
            let ProdIdNr = sId;
            let ProdName = sName;
            let ProdPnkt = sPoints;

            if (!window.localStorage.getItem('addCart')) {
                console.log("add !exists")

                ProdKey = $.md5(ProdIdNr, 'key', false);
                oCartCookie = {
                    "AppName": options.AppName,
                    "AppVersion": options.AppVersion,
                    "AppAuthor": options.AppAuthor,
                    "AppWebsite": options.AppWebsite,
                    "cartList":
                        {
                            "0": {
                                "id": ProdIdNr,
                                "key": ProdKey,
                                "name": ProdName,
                                "price": ProdPnkt,
                                "qty": "1"
                            }
                        }
                };

                //$.cookie('addCart', JSON.stringify( oCartCookie), { domain: ''+location.host , path: '/' });
                window.localStorage.setItem('addCart', JSON.stringify(oCartCookie));

            } else {
                console.log("add exists")
                // localStorage already exists
                //oCartCookie = JSON.parse($.cookie('addCart'));
                oCartCookie = JSON.parse(window.localStorage.getItem('addCart'));

                let iCntProd = 0;
                let bProdExists = 0;
                $.each(oCartCookie.cartList, function (key, value) {
                    //console.log(key+'-'+value.name);
                    if (value.id === ProdIdNr) {
                        if (options.AppQtyLimit > value.qty) {
                            oCartCookie.cartList[iCntProd] = {
                                "id": value.id,
                                "key": value.key,
                                "name": value.name,
                                "price": value.price,
                                "qty": value.qty + 1
                            }
                        }
                        bProdExists = 1;
                    }
                    iCntProd++;
                });


                if (!bProdExists) {
                    ProdKey = $.md5(ProdIdNr, 'key', false);
                    oCartCookie.cartList[iCntProd++] = {
                        "id": ProdIdNr,
                        "key": ProdKey,
                        "name": ProdName,
                        "price": ProdPnkt,
                        "qty": 1
                    }
                    //console.log(addCartCookieAdd)
                }

                //$.cookie('addCart', JSON.stringify( oCartCookie), { domain: ''+location.host , path: '/' });
                window.localStorage.setItem('addCart', JSON.stringify(oCartCookie));
                $.listCart();
            }

        };


        // removeCart function
        $.removeCart = function (sId) {
            let ProdIdNr = sId;

            //addCartCookieRemove = JSON.parse($.cookie('addCart'));
            // var obj = jQuery.parseJSON('{"name":"John"}');
            //oCartCookie =   jQuery.parseJSON($.cookie('addCart'));
            let oCartCookie = JSON.parse(window.localStorage.getItem('addCart'));

            let iCntProd = 0;
            let bProdExists = 0;
            $.each(oCartCookie.cartList, function (key, value) {
                //console.log(key+'-'+value.id);
                if (value.id === ProdIdNr) {
                    oCartCookie.cartList[iCntProd] = "";
                    bProdExists = 1;
                }
                iCntProd++;
            });

            //
            iCntProd = 0;
            let cartListTmp = {};
            $.each(oCartCookie.cartList, function (key, value) {
                //console.log(key+'-'+value.id);
                if (value.id === ProdIdNr) {
                    cartListTmp[iCntProd] = {};
                } else if (value.id !== undefined) {
                    cartListTmp[iCntProd] = {
                        "id": value.id,
                        "key": value.key,
                        "name": value.name,
                        "price": value.price,
                        "qty": value.qty
                    }
                    iCntProd++;
                }
            });

            //addCartCookieRemove.version = "blabla"
            oCartCookie.cartList = {"": ""}
            oCartCookie.cartList = cartListTmp;

            // write in localStorage
            //$.cookie('addCart', '', { domain: ''+location.host , path: '/' });
            //$.cookie('addCart', JSON.stringify( oCartCookie), { domain: ''+location.host , path: '/' });
            window.localStorage.setItem('addCart', JSON.stringify(oCartCookie));
            $.listCart(); // list items

        }

        ///////////////////////////////////////////////////////////////////////////
        //
        // listCart Function
        //
        ///////////////////////////////////////////////////////////////////////////

        $.listCart = function () {

            //$("#cookie-log").html("<pre>"+$.cookie('addCart')+"</pre>");
            $("#cookie-log").html("" + JSON.stringify(JSON.parse(window.localStorage.getItem('addCart'))) + "");

            //var oCartCookie =   jQuery.parseJSON($.cookie('addCart'));
            const oCartCookie = JSON.parse(window.localStorage.getItem('addCart'));
            const cartArray = stringToArray(oCartCookie.cartList);
            const cartArrayHTML = "";

            $.each(cartArray, function (key, value) {
                //for(var i = 0; i < cartArray.length; i++){}
                //count += parseInt(cartArray[i][3]);
                //cartArrayHTML+=  cartArray[i][0] + "..." ;
                //console.log( cartArray[i][0] + ' / ' + key + ' / ' + value );
            });

        }

        ///////////////////////////////////////////////////////////////////////////
        //
        // cleanCart Function
        //
        ///////////////////////////////////////////////////////////////////////////

        $.cleanCart = function () {

            //oCartCookie =   jQuery.parseJSON($.cookie('addCart'));
            let oCartCookie = JSON.parse(window.localStorage.getItem('addCart'));
            const cartList = {};
            let iCntProd = 0;
            //var bProdExists = 0;
            $.each(oCartCookie.cartList, function (key, value) {
                //console.log(key+'-'+value.id);
                //if(value.id==ProdIdNr){
                oCartCookie.cartList[iCntProd] = "";
                //	bProdExists = 1;
                //}
                iCntProd++;
            });

            oCartCookie.cartList = cartList;
            window.localStorage.setItem('addCart', JSON.stringify(oCartCookie));
            //$.cookie('addCart', JSON.stringify( oCartCookie), { domain: ''+location.host , path: '/' });
            $.listCart();

        }

        ///////////////////////////////////////////////////////////////////////////
        //
        // stringToArray Function
        //
        ///////////////////////////////////////////////////////////////////////////

        function stringToArray() {
            const arr = [];
            for (let i = 0; i < this.length; i++) {
                arr.push(this[i]);
            }
            return arr;
        }

        //end
    }
})(jQuery);