sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History) {
        "use strict";

        return Controller.extend("productsbycategories.controller.Main", {
            navBack: function () {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if(sPreviousHash != undefined){
                    window.history.go(-1);
                }else{
                    this.getOwnerComponent().getRouter().navTo("App", {} , true)
                }

            }
            
        });
    });
