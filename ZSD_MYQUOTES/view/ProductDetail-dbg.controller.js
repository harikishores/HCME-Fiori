/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");



jQuery.sap.require("sap.ui.core.mvc.Controller");



jQuery.sap.require("sap.ui.core.IconPool");



jQuery.sap.require("sap.ui.model.odata.Filter");



jQuery.sap.require("sap.ca.ui.model.type.Number");







sap.ca.scfld.md.controller.BaseDetailController.extend("cus.sd.myquotations.view.ProductDetail", {







  myCustomerId : null,



  myMaterialId : null,



  mySalesOrg : null,



  myDistChannel : null,



  myDivision : null,



  selectedUoM : null,



  isNavToMaster: false,



  qtyNotValid : false,







  onInit : function() {



    // execute the onInit for the base class BaseDetailController



    sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);



    var that = this;



    // get i18n texts



    this.resourceBundle = this.oApplicationFacade.getResourceBundle();



    this.fullScreenMode = this.oApplicationFacade.getApplicationModel("global").getProperty("/fullScreenMode");



    



    // check to be refreshed



    this.getView().addEventDelegate({



               onBeforeShow : jQuery.proxy(function (evt) {



            	   that.updateCartSize();



               }, this)



    });



    



    this.oRouter.attachRouteMatched(function(oEvent) {



      if (oEvent.getParameter("name") === "product") {



        if(that.oApplicationFacade.getApplicationModel("NewQuotation") && !jQuery.isEmptyObject(that.oApplicationFacade.getApplicationModel("NewQuotation").oData)){



          this.onNavProduct(oEvent.getParameter("arguments").materialID);          



        }else{



          this.isNavToMaster = true;



        }



      }



    }, this);



  },







  onNavProduct : function(materialID) {



    var newQuotation =this.oApplicationFacade.getApplicationModel("NewQuotation");







    this.myCustomerId = newQuotation.getProperty("/SoldToParty");



    this.myDivision = newQuotation.getProperty("/Division");



    this.mySalesOrg = newQuotation.getProperty("/SalesOrganization");



    this.myDistChannel = newQuotation.getProperty("/DistributionChannel");



    this.myMaterialId = materialID;







    if (this.mySalesOrg && this.myDistChannel && this.myDivision && this.myCustomerId && this.myMaterialId) {



      this.loadModel();



    }



  },







  loadModel : function() {



    var matDetailModel = new sap.ui.model.json.JSONModel();



    var matPriceModel = new sap.ui.model.json.JSONModel();



    var matUoMModel = new sap.ui.model.json.JSONModel();



    var buttons = new sap.ui.model.json.JSONModel();



    var quantity = new sap.ui.model.json.JSONModel();



    buttons.setProperty("/enableAddToCart", false);



    quantity.setProperty("/value", "1");







    // Initialize the screen to empty data before it is read



    this.getView().setModel(matDetailModel, "MaterialDetail");



    this.getView().setModel(matPriceModel, "MaterialPrice");



    this.getView().setModel(matUoMModel, "MaterialUoMSet");



    this.getView().setModel(buttons, "buttons");



    this.getView().setModel(quantity,"Quantity");







    var service = this.getView().getModel();



    var entityDetail = "MaterialSet(SalesOrganization='" + this.mySalesOrg + "'," + //



    "DistributionChannel='" + this.myDistChannel + "'," + //



    "MaterialId='" + this.myMaterialId + "')/MaterialDetail";



    var param = [ "$expand=MaterialUoMSet" ];







    service.read(entityDetail, null, param, false, function(oData, response) {



      matUoMModel.setData(oData.MaterialUoMSet);



      matUoMModel.updateBindings();







      // Pre-selection of UoM in the list



      oData.UoM = oData.BaseUoM;



      matDetailModel.setData(oData);



      matDetailModel.updateBindings();



    }, function(oData, response) {



      cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(oData, response);



    });







    this.selectedUoM = this.getView().getModel("MaterialDetail").getProperty("/BaseUoM");



    this.updatePriceUoM(this.selectedUoM);



    this.updateCartSize();



    this.setGrossWeight();



  },



  setGrossWeight : function() {



    var results = this.getView().getModel("MaterialUoMSet").getProperty("/results");



    var grossWeight = 0;



    for ( var i = 0; i < results.length; i++) {



      if (this.selectedUoM === results[i].UoM) {



        grossWeight = results[i].GrossWeight;



      }



    }



    this.getView().byId("grossWeightText").setNumber(grossWeight);



  },



  onSwitchUoM : function(oEvent) {



    this.selectedUoM = oEvent.getSource().getSelectedKey();



    this.updatePriceUoM(this.selectedUoM);



    this.setGrossWeight();



  },



  updatePriceUoM : function(uom) {



    var buttons = new sap.ui.model.json.JSONModel();



    buttons.setProperty("/enableAddToCart", false);



    this.getView().setModel(buttons, "buttons");







    var matPriceModel = new sap.ui.model.json.JSONModel();



    this.getView().setModel(matPriceModel, "MaterialPrice");







    var entity = "GetMaterialPrice";



    var params = [



                  "UoM='" + uom + "'",



                  "Customer='" + this.myCustomerId + "'",



                  "Division='" + this.myDivision + "'",



                  "DistributionChannel='" + this.myDistChannel + "'",



                  "SalesOrganization='" + this.mySalesOrg + "'",



                  "MaterialId='" + this.myMaterialId + "'" ];



    var service = this.getView().getModel();



    service.read(entity, null, params, true, function(oData, response) {



      matPriceModel.setData(oData);



      matPriceModel.updateBindings();



      buttons.setProperty("/enableAddToCart", true);



      buttons.updateBindings();



    }, function(oData, response) {



      cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(oData, response);



    });



  },



  onAddToCart : function(evt) {



	  



	  if(!this.qtyNotValid){



		  var newQuotation = this.oApplicationFacade.getApplicationModel("NewQuotation");



		  var itemSet = newQuotation.getProperty("/QuotationItemSet");



		  var item = this._buildItem();



		



		  if (this.getView().getModel("Quantity").getProperty("/value") > 0) {



			  item.ItemID = (cus.sd.myquotations.util.ModelExtractor.extractGreatestItemID(newQuotation.getProperty("/QuotationItemSet/results")) + 10).toString();



		      if (itemSet && itemSet.results) {



		        item.PricingConditionSet.results[0].ItemID = item.ItemID;



		        itemSet.results[itemSet.results.length] = item;



		      } else {



		        item.PricingConditionSet.results[0].ItemID = item.ItemID;



		        itemSet = {



		          results : [ item ]



		        };



		      }



		      newQuotation.setProperty("/QuotationItemSet", itemSet);



		      var message = this.resourceBundle.getText("MATERIAL_MSG_ADDED_TO_CAR");



		      var offset = this.getMessageToastOffset();



		      var messageWidth = String(message.length + 5) + "ex";



		      



		      sap.m.MessageToast.show(message, {



		        width : messageWidth,



		        duration : 5000,



		        my : "right top",



		        at : "left top",



		        offset : offset



		      });



		      this.updateCartSize();



		    } else {



		      sap.m.MessageBox.show(this.resourceBundle.getText("ENTER_VALID_QUANTITY"),



		                            sap.m.MessageBox.Icon.WARNING);



		    }



		  }



  },







  onAfterRendering : function() {



  



    if(this.isNavToMaster){



      this.isNavToMaster = false;



      this.oRouter.navTo("master",undefined,true);



    }



  },







  formChangedInputQuantity : function(evt) {



    var message = this.resourceBundle.getText("ENTER_VALID_QUANTITY");



    this.qtyNotValid = cus.sd.myquotations.util.ModelExtractor.validationInputQuantity(evt,message);  



  },







  updateCartSize : function() {



    this.getView().byId("cartButton").setText("(" + this.getCartSize() + ")");



  },







  getCartSize : function() {



    var singleQuotationModel = this.oApplicationFacade.getApplicationModel("NewQuotation");



    var oDataItems = singleQuotationModel ? singleQuotationModel.getProperty("/QuotationItemSet/results") : [];



    return oDataItems ? oDataItems.length : 0;



  },







  _buildItem : function() {



    var itemPriceType = this.oApplicationFacade.getApplicationModel("customizing").getProperty("/ITEM_PRICE");



    return {



      ItemID : "",



      ItemDescription : this.getView().getModel("MaterialDetail").getProperty("/MaterialDescription"),



      MaterialNumber : this.getView().getModel("MaterialDetail").getProperty("/MaterialId"),



      OrderQuantity : this.getView().getModel("Quantity").getProperty("/value"),



      SalesUnit : this.selectedUoM,



      PricingConditionSet : {



        results : [ {



          ItemID : "",



          CondTypeCode : itemPriceType,



          Counter : "000",



          AmountInternal : this.getView().getModel("MaterialPrice").getProperty("/Price")



        } ]



      },



      MaterialUoMSet : this.getView().getModel("MaterialUoMSet").getData()



    };



  },



  onCancel : function() {



    var that = this;



    sap.m.MessageBox.show(this.resourceBundle.getText("LOOSEALLCHANGES"),



                          sap.m.MessageBox.Icon.WARNING, this.resourceBundle.getText("WARNING"),



                          [ sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL ], function(oEvent) {



                            if (oEvent === sap.m.MessageBox.Action.OK) {



                              var lastQuotationID = that.oApplicationFacade.getApplicationModel("global").getProperty("/lastQuotationID");



                              if (that.fullScreenMode)



                            	window.history.back(1);



                              else if (lastQuotationID === undefined || jQuery.device.is.phone) {



                                that.oRouter.navTo("master");



                              } else {



                                that.oRouter.navTo("detail", {



                                  contextPath : lastQuotationID



                                }, false);



                              }



                            }



                          });



  },







  goToCreateQuotation : function() {



	if(this.fullScreenMode)



		this.oRouter.navTo("cart", null, true);



	else



		this.oRouter.navTo("cart");



  },



  getMessageToastOffset: function(){



      var element = this.findCartButtonElement();



      var right = $(element).offset().left + 75;



      var top =$(element).offset().top + 50;



      return right + " " + top;	  



  },  



  findCartButtonElement: function() {



	  var elements = $(document.getElementsByTagName("Button"));



	  for (var i = 0, length = elements.length; i < length; i++) {



	    if (elements[i].id.indexOf("cartButton") !== -1){



        return elements[i];



	    }



	  }



	}



});