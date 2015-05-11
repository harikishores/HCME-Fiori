/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



jQuery.sap.require("sap.ca.scfld.md.controller.ScfldMasterController");jQuery.sap.require("sap.ui.core.mvc.Controller");jQuery.sap.require("sap.ui.core.IconPool");jQuery.sap.require("sap.ui.model.odata.Filter");sap.ca.scfld.md.controller.ScfldMasterController.extend("cus.sd.myquotations.view.ProductSearch",{mySalesOrg:null,myDistChannel:null,myDivision:null,myCustomerId:null,isNavToMaster:false,onInit:function(){sap.ca.scfld.md.controller.ScfldMasterController.prototype.onInit.call(this);this.oRouter.attachRouteMatched(function(e){if(e.getParameter("name")==="products"){var n=this.oApplicationFacade.getApplicationModel("NewQuotation");if(n&&!jQuery.isEmptyObject(n.oData)){this.onNavProducts()}else{this.isNavToMaster=true}}},this)},onNavProducts:function(){this.loadModel()},getHeaderFooterOptions:function(){return{sI18NMasterTitle:"MATERIALS"}},isBackendSearch:function(){return true},isLiveSearch:function(){return false},applyBackendSearchPattern:function(f,b){if(this.getList().getBinding("items").bPendingRequest===false){var a=[];if(f&&f.length>0){a.push(new sap.ui.model.Filter("Search",sap.ui.model.FilterOperator.EQ,f))}this.getList().getBinding("items").filter(a)}},applyFilterFromContext:function(c){},loadModel:function(){var n=this.oApplicationFacade.getApplicationModel("NewQuotation");if(this.myCustomerId===n.getProperty("/SoldToParty")&&this.myDivision===n.getProperty("/Division")&&this.mySalesOrg===n.getProperty("/SalesOrganization")&&this.myDistChannel===n.getProperty("/DistributionChannel")){return}this.myCustomerId=n.getProperty("/SoldToParty");this.myDivision=n.getProperty("/Division");this.mySalesOrg=n.getProperty("/SalesOrganization");this.myDistChannel=n.getProperty("/DistributionChannel");this.getList().bindItems(this.createMasterBindingInfo());this.registerMasterListBind(this.getList())},onBeforeRendering:function(){},onAfterRendering:function(){if(this.isNavToMaster){this.isNavToMaster=false;this.oRouter.navTo("master",undefined,true)}},getDetailRouteName:function(){return"product"},getMasterRouteName:function(){return"products"},getBindingContextPathFor:function(a){if(a&&a.materialID){return"/MaterialSet(SalesOrganization='"+this.mySalesOrg+"',"+"DistributionChannel='"+this.myDistChannel+"',"+"MaterialId='"+a.materialID+"')"}return},getDetailNavigationParameters:function(l){return{materialID:l.getBindingContext().getProperty("MaterialId")}},getNoDataViewName:function(){return"productEmpty"},createMasterBindingInfo:function(){var t=this.getList().getItems()[0].clone();var f=[];f.push(new sap.ui.model.Filter("SalesOrganization",sap.ui.model.FilterOperator.EQ,this.mySalesOrg));f.push(new sap.ui.model.Filter("DistributionChannel",sap.ui.model.FilterOperator.EQ,this.myDistChannel));return{path:"/MaterialSet",template:t,sorter:undefined,filters:f,parameters:{select:"MaterialDesc,MaterialId"}}}});



