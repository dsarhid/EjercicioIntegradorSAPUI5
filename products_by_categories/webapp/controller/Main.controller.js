sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "productsbycategories/util/Constants",
    "productsbycategories/util/Formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Constants,Formatter,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("productsbycategories.controller.Main", {
            Formatter: Formatter,
            onInit: function () {
                const url = sap.ui.require.toUrl(Constants.modelList.namespace) + Constants.modelList.urlModelList;
                this._model = new sap.ui.model.odata.v2.ODataModel(url, {
                    json:true,
                    header: {
                        "DataServicesVersion": "2.0",
                        "Cache-Control": "no-cache , no-store",
                        "Pragma": "no-cache"
                    },
                    useBatch: false
                });

                const sPath = jQuery.sap.getModulePath(Constants.modelList.namespace) + Constants.modelComboBoxCategory.urlModelComboBoxCategory;
                var oModelComboBox = new JSONModel();
                oModelComboBox.loadData(sPath);
                this.getOwnerComponent().setModel(oModelComboBox, Constants.modelComboBoxCategory.nameModelComboBoxCategory);

                
                const sPathRangeStock = jQuery.sap.getModulePath(Constants.modelList.namespace) + Constants.modelCBoxRangeStock.urlModelCBoxRangeStock;
                var oModelComboBoxRangeStock = new JSONModel();
                oModelComboBoxRangeStock.loadData(sPathRangeStock);
                this.getOwnerComponent().setModel(oModelComboBoxRangeStock, Constants.modelCBoxRangeStock.nameModelCBoxRangeStock);

                this._model.read(Constants.modelList.nameProject,{
                    async: true,
                    success: jQuery.proxy(this.success, this),
                    error: jQuery.proxy(this.error, this)
                })
            },

            success: function (oData){
                const oModel = new JSONModel(oData);
                this.getView().setModel(oModel,Constants.modelList.nameProductList);
            },

            error: function() {
                alert(Constants.errorMessage.error);
            },

            handleLoadItems: function (oControlEvent) {
                var aFilter= [];
                const sQuery = oControlEvent.getParameters().value;

                if(sQuery && sQuery.length > 0){
                    var oFilter = new Filter(Constants.modelComboBoxCategory.nameColumnFilter, FilterOperator.EQ, sQuery);
                    aFilter.push(oFilter);
                }

                var oList = this.byId(Constants.modelList.idTableProducts);
                var oBindingItems = oList.getBinding(Constants.modelList.BindingItems);
                oBindingItems.filter(aFilter, Constants.modelComboBoxCategory.nameApplicationCategory);
            },

            handleLoadItemsRangeStock: function (oControlEvent) {
                var aFilter= [];
                const sQuery = oControlEvent.getParameters().value;

                if(sQuery && sQuery.length > 0){
                    switch(sQuery){
                        case Constants.modelCBoxRangeStock.case1: 
                            var oFilter = new Filter(Constants.modelCBoxRangeStock.nameColumnFilter, FilterOperator.LT, 10);
                            aFilter.push(oFilter);
                            ;break;
                        case Constants.modelCBoxRangeStock.case2: 
                            var oFilter = new Filter(Constants.modelCBoxRangeStock.nameColumnFilter, FilterOperator.BT, 10,20);
                            aFilter.push(oFilter);
                            ;break;
                        case Constants.modelCBoxRangeStock.case3: 
                            var oFilter = new Filter(Constants.modelCBoxRangeStock.nameColumnFilter, FilterOperator.BT, 20,50);
                            aFilter.push(oFilter);
                            ;break;
                        case Constants.modelCBoxRangeStock.case4: 
                            var oFilter = new Filter(Constants.modelCBoxRangeStock.nameColumnFilter, FilterOperator.BT, 50,100);
                            aFilter.push(oFilter);
                            ;break;
                        case Constants.modelCBoxRangeStock.case5: 
                            var oFilter = new Filter(Constants.modelCBoxRangeStock.nameColumnFilter, FilterOperator.GT, 100);
                            aFilter.push(oFilter);
                            ;break;
                    }
                }

                var oList = this.byId(Constants.modelList.idTableProducts);
                var oBindingItems = oList.getBinding(Constants.modelList.BindingItems);
                oBindingItems.filter(aFilter, Constants.modelCBoxRangeStock.nameApplicationRangeStock);
            },

            navTo : function (oEvent) {
                const oItem = oEvent.getSource().getBindingContext(Constants.modelList.nameProductList);
                const sPath = oItem.getPath();
                const oItemSeleccionado = this.getView().getModel(Constants.modelList.nameProductList).getProperty(sPath);
                const oModelSeleccionado = new JSONModel(oItemSeleccionado);
                this.getOwnerComponent().setModel(oModelSeleccionado,Constants.modelList.nameProductListSeleccionado);

                // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                this.getOwnerComponent().getRouter().navTo(Constants.modelList.routeItemDetail);
            }
        });
    });
