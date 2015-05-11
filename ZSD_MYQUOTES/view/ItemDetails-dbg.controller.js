/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");



jQuery.sap.require("sap.ui.core.mvc.Controller");



jQuery.sap.require("sap.m.MessageBox");



jQuery.sap.require("sap.ca.ui.model.type.Number");



jQuery.sap.require("sap.ca.ui.model.type.Date");



jQuery.sap.require("sap.ui.core.delegate.ScrollEnablement");





sap.ca.scfld.md.controller.BaseFullscreenController.extend("cus.sd.myquotations.view.ItemDetails", {







  itemID : "",



  isNavToMaster : false,



  isEditable : false,



  



  formEditable : function(evt){



    return this.isEditable;



  },



  



  formDisplay : function(evt){



    return !this.isEditable;



  },



  



  formChangedValidDate: function(evt){



    var params={isDate:true, evt:evt,msg:null,emptyCheck:false};



    cus.sd.myquotations.util.ModelExtractor.validationEmptyField(params);



  },



 



  formChangedInputQuantity: function(evt){



	 var msg = this.resourceBundle.getText("ENTER_VALID_QUANTITY");



	 cus.sd.myquotations.util.ModelExtractor.validationInputNumber(evt,msg,true);



  },



  



  formChangedInputDiscount: function(evt){



	var msg = this.resourceBundle.getText("ENTER_VALID_DISCOUNT");



	cus.sd.myquotations.util.ModelExtractor.validationInputNumber(evt,msg,false); 



  },



  



  onInit : function() {



    



    // execute the onInit for the base class BaseDetailController



    sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);



   



    var that = this;



    // get i18n texts



    this.resourceBundle = this.oApplicationFacade.getResourceBundle();







    this.oRouter.attachRouteMatched(function (oEvent) {



    	



    if(oEvent.getParameter("name") === "ItemDetails"){



        this.isEditable = true;



    }else{



        this.isEditable = false;



      }



      



      var model = that.oApplicationFacade.getApplicationModel("NewQuotation");



      



      



      if (oEvent.getParameter("name") === "ItemDetails" || oEvent.getParameter("name") === "ItemDisplay") {



        if(model && !jQuery.isEmptyObject(model.oData)){



          



         this._clearControlsErrorState(); 	



          



         var rejectionModel = that.oApplicationFacade.getApplicationModel("rejectionReason");



         



         this.getView().setModel(rejectionModel,"rejectionReason");



        	



         this.getView().setModel(model,"myQuotationModel");



         this.itemID = oEvent.getParameter("arguments").itemID;



          



         var results = this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet/results");



          



         var itemModel = new sap.ui.model.json.JSONModel();



         var c = new sap.ui.model.json.JSONModel();

         var p = new sap.ui.model.json.JSONModel();

         

		 this.getView().setModel(c, "myItemVariant");

         this.getView().setModel(p, "myPriceVariant");

         this.getView().setModel(itemModel,"myItem");



          for ( var i = 0; i < results.length; i++) {



            if (this.itemID === results[i].ItemID) {

                results[i].DiscountPercentage = parseFloat(results[i].Discount) / 1000;

                results[i].Discount = results[i].Discount / 10;

            	itemModel.setData(jQuery.extend(true, {},results[i]));



				var d = this.getView().getModel("myItem").getProperty("/VariantConfigurationSet/results");





                                var dataLength = d.length;  

                                var dataObject = { results : [] }; 

                                var priceObject = { results : [] };

                                for ( var j = 0; j < dataLength; j++) {  

                                  var record = d[j];  

                                  if ( record.CharName === "XVC"){

                                      priceObject.results.push(record);

                                  }

                                  else {

                                      dataObject.results.push(record);

                                  }

                                    

                                }

				c.setData(dataObject);

				p.setData(priceObject);

            }



          }

      this.divideItemsDisount();

      var listItems = this.getView().byId("variantTable");

      var listPrice = this.getView().byId("variantPrice");



 //     if (listItems.getItems()[0]) {



   //     var oTemplate = listItems.getItems()[0].clone();



     //   listItems.bindItems({



       //   path : "/VariantConfigurationSet/results",



         // template : oTemplate,



          //model : "myItemVariant"



        //});



      //}

      //c.updateBindings();

    //  if (listItems.getItems().length === 0) {

      listItems.setModel(c,"myItemVariant");

    //  }

      listPrice.setModel(p,"myPriceVariant");

        }else{



          //It should navigate to the master view if the shared model is empty.



          //The navigation cannot be done here because some classes from the navigation framework



          //are not instantiated at this time after a browser refresh. The navigation is done later



          //in the after rendering.



          this.isNavToMaster = true;



        }



      } 



    }, this);



    



    sap.ui.core.delegate.ScrollEnablement._bScrollToInput = true;



    



  },



  divideItemsDisount:function(){



  //  cus.sd.myquotations.util.ModelExtractor.DivideItemsDiscount(this.getView().getModel("myItem"));



  },	



 onAfterRendering: function(evt){



  //automatically navigate to the master view if the model is undefined or empty (on browser refresh)



  if(this.isNavToMaster){



     this.isNavToMaster = false;



     this.oRouter.navTo("master",undefined,true);



   }



   



  },







  _checkFormErrors : function(){ 



	  var formContainsErrors = false;



	  



	  var quantityInput = this.getView().byId("ORDERIDQTY");



	  if(quantityInput.getProperty("valueState")==="Error"){



		  formContainsErrors = true; 



	  }



	  



	  var requestDelieveryDateInput = this.getView().byId("REDELDATEITEM");



	  if(requestDelieveryDateInput.getProperty("valueState")==="Error"){



		  formContainsErrors = true; 



	  }



	  



	  var discountInput = this.getView().byId("DISCOUNTITEMD");



	  if(discountInput.getProperty("valueState")==="Error"){



		  formContainsErrors = true; 



	  }



	  



	  if(formContainsErrors){



		  sap.m.MessageBox.show(this.resourceBundle.getText("CHECKERRORS"),sap.m.MessageBox.Icon.WARNING,



		  this.resourceBundle.getText("MANDATORYTITLE"), [ sap.m.MessageBox.Action.OK ]);



		  return formContainsErrors;  



	  



  	  }



  },



  







  _clearControlsErrorState:function(){



	 this.getView().byId("ORDERIDQTY").setValueState(sap.ui.core.ValueState.None);



	 this.getView().byId("REDELDATEITEM").setValueState(sap.ui.core.ValueState.None);



	 this.getView().byId("DISCOUNTITEMD").setValueState(sap.ui.core.ValueState.None);



  }, 



  



  dialogWithNavigation : function(msg,quotationId,titleI18nKey) {



	 var that = this;



	  sap.m.MessageBox.show(this.resourceBundle.getText(msg,quotationId), sap.m.MessageBox.Icon.SUCCESS,



	  this.resourceBundle.getText(titleI18nKey), [ sap.m.MessageBox.Action.OK ],



	    function(oAction) {



	      if (oAction === sap.m.MessageBox.Action.OK) {



	    	  if(jQuery.device.is.phone){



	    	    that.oRouter.navTo("master");



	    	  }else{



	    	    that.oRouter.navTo("detail", { contextPath : quotationId }, false);



	    	  }



	      }



	    });



	  },



	  



  







 onDone : function(){







	if(this._checkFormErrors()){



		return;//stop the execution



	}







	var results = this.oApplicationFacade.getApplicationModel("NewQuotation").getProperty("/QuotationItemSet/results");



	var myItemModel = this.getView().getModel("myItem");  



	



	for ( var i = 0; i < results.length; i++) {



         if (this.itemID === results[i].ItemID){



        	 results[i] = jQuery.extend(true, {}, myItemModel.getData());



          }



	}



    



	//Go back to Create Quotation view



	  window.history.back();



  },



  



  onCancel : function(){



	  var that = this;



	  //if any changes are detected display the message



	  if(this.isEditable){



  	  sap.m.MessageBox.show(



  			      this.resourceBundle.getText("LOOSEALLCHANGES"),



  	    		  sap.m.MessageBox.Icon.WARNING,



  	        



  	    	this.resourceBundle.getText("WARNING"),



  	        [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],



  	        function (oAction) {



  	          // if dialog is closed by pressing the ok button in dialog a history back needs to be called



  	          if (oAction === sap.m.MessageBox.Action.OK) {



  	        	  that._clearControlsErrorState();



  	        	  that.navCancel();



  	          }



  	        }



  	      );



	  }



	  else{



      that.navCancel();



	  }



  },



  



  navCancel : function(){



	  window.history.back();



  },







});



