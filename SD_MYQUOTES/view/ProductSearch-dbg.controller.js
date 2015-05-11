/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.scfld.md.controller.ScfldMasterController");
jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.ui.core.IconPool");
jQuery.sap.require("sap.ui.model.odata.Filter");

sap.ca.scfld.md.controller.ScfldMasterController.extend("cus.sd.myquotations.view.ProductSearch", {
  mySalesOrg : null,
  myDistChannel : null,
  myDivision : null,
  myCustomerId : null,
  isNavToMaster : false,

  onInit : function() {
    sap.ca.scfld.md.controller.ScfldMasterController.prototype.onInit.call(this);

    this.oRouter.attachRouteMatched(function(oEvent) {
      if (oEvent.getParameter("name") === "products") {
        var newQuotation = this.oApplicationFacade.getApplicationModel("NewQuotation");
        if(newQuotation && !jQuery.isEmptyObject(newQuotation.oData)){
          this.onNavProducts();          
        }else{
          this.isNavToMaster = true;
        }     
      }
    }, this);
  },

  onNavProducts : function() {
    this.loadModel();
  },

  getHeaderFooterOptions : function() {
    return {
      sI18NMasterTitle : "MATERIALS"
    };
  },

  isBackendSearch : function() {
    return true;
  },

  isLiveSearch : function() {
    return false;
  },

  applyBackendSearchPattern : function(sFilterPattern, oBinding) {
	  if (this.getList().getBinding("items").bPendingRequest === false){
		  var filters = [];
		  // add filter for search
		  if (sFilterPattern && sFilterPattern.length > 0) {
			  filters.push(new sap.ui.model.Filter("Search", sap.ui.model.FilterOperator.EQ, sFilterPattern));
		  }

		  // update list binding
		  this.getList().getBinding("items").filter(filters);
	  }  
  },

  applyFilterFromContext : function(sContext) {
  },

  loadModel : function() {
    var newQuotation = this.oApplicationFacade.getApplicationModel("NewQuotation");

    if (this.myCustomerId === newQuotation.getProperty("/SoldToParty") && //
    this.myDivision === newQuotation.getProperty("/Division") && //
    this.mySalesOrg === newQuotation.getProperty("/SalesOrganization") && //
    this.myDistChannel === newQuotation.getProperty("/DistributionChannel")) {
      // No products read for exact same context
      return;
    }

    this.myCustomerId = newQuotation.getProperty("/SoldToParty");
    this.myDivision = newQuotation.getProperty("/Division");
    this.mySalesOrg = newQuotation.getProperty("/SalesOrganization");
    this.myDistChannel = newQuotation.getProperty("/DistributionChannel");

    this.getList().bindItems(this.createMasterBindingInfo());
    this.registerMasterListBind(this.getList());
  },

  onBeforeRendering : function() {
  },

  onAfterRendering : function() {
    if(this.isNavToMaster){
      this.isNavToMaster = false;
      this.oRouter.navTo("master",undefined,true);
    }
  },

  getDetailRouteName : function() {
    return "product";
  },

  getMasterRouteName : function() {
    return "products";
  },

  getBindingContextPathFor : function(oArguments) {
    if (oArguments && oArguments.materialID) {
      return "/MaterialSet(SalesOrganization='" + this.mySalesOrg + "'," + //
      "DistributionChannel='" + this.myDistChannel + "'," + //
      "MaterialId='" + oArguments.materialID + "')";
    }
    return;
  },

  getDetailNavigationParameters : function(oListItem) {
    return {
      materialID : oListItem.getBindingContext().getProperty("MaterialId")
    };
  },

  getNoDataViewName : function() {
    return "productEmpty";
  },

  createMasterBindingInfo : function() {
    var template = this.getList().getItems()[0].clone();
    var filters = [];
    filters.push(new sap.ui.model.Filter("SalesOrganization", sap.ui.model.FilterOperator.EQ, this.mySalesOrg));
    filters.push(new sap.ui.model.Filter("DistributionChannel", sap.ui.model.FilterOperator.EQ, this.myDistChannel));
    return {
      path : "/MaterialSet",
      template : template,
      sorter : undefined,
      filters : filters,
      parameters : {
        // Do not read SalesOrganization & DistributionChannel
        select : "MaterialDesc,MaterialId"
      }
    };
  }
});