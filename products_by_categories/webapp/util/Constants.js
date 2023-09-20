sap.ui.define([], function (){
    'use strict';
    return{
        modelList: {
            i18n:"i18n",
            namespace:"productsbycategories",
            urlModelList:"/v2/northwind/northwind.svc/",
            nameProject:"/Products_by_Categories",
            nameProductList: "productCategoriesModel",
            nameProductListSeleccionado: "productCategoriesModelSeleccionado",
            idTableProducts: "idTableProducts",
            BindingItems: "items",
            routeItemDetail: "RouteItemDetail"
        },
        modelComboBoxCategory: {
            urlModelComboBoxCategory: "/localService/categoryComboBox.JSON",
            nameModelComboBoxCategory: "categoryComboBox",
            nameApplicationCategory: "ApplicationCategory",
            nameColumnFilter: "CategoryName"
        },
        modelCBoxRangeStock: {
            urlModelCBoxRangeStock: "/localService/rangeStock.JSON",
            nameModelCBoxRangeStock: "rangeStock",
            nameApplicationRangeStock: "ApplicationRangeStock",
            nameColumnFilter: "UnitsInStock",
            case1: "< 10",
            case2: "10 a 20",
            case3: "20 a 50",
            case4: "50 a 100",
            case5: "+100"
        },
        errorMessage: {
            error: "Error"
        }
    };
}, true)