/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ca.ui.model.type.Number");
jQuery.sap.require("sap.ca.ui.model.type.Date");
jQuery.sap.require("sap.ui.core.delegate.ScrollEnablement");
jQuery.sap.require("sap.ca.ui.message.message");


sap.ca.scfld.md.controller.BaseFullscreenController.extend("cus.sd.myquotations.view.CreateQuotation", {

  itemUoMMap : {},
  //cartSize : 0,
  isNavToMaster : false,
  isNavCart : false,
  
  formChangedPostalCodeField : function(evt){
	  var msg = this.resourceBundle.getText("ENTER_POSTALCODE");
	  var params={isDate:false, evt:evt,msg:msg,emptyCheck:true};
	  cus.sd.myquotations.util.ModelExtractor.validationEmptyField(params);
  },

  formChangedCityField: function(evt){
	  var msg = this.resourceBundle.getText("ENTER_CITY");
	  var params={isDate:false, evt:evt,msg:msg,emptyCheck:true};
	  cus.sd.myquotations.util.ModelExtractor.validationEmptyField(params);
  },
   
  formChangedValidDate: function(evt){
    var params={isDate:true, evt:evt,msg:null,emptyCheck:false};
    cus.sd.myquotations.util.ModelExtractor.validationEmptyField(params);
  },
 
  formChangedValidDateRequired: function(evt){
	   var params={isDate:true, evt:evt,msg:null,emptyCheck:true};
	   cus.sd.myquotations.util.ModelExtractor.validationEmptyField(params);
  },
	  
  formChangedInputQuantity: function(evt){
	 var msg = this.resourceBundle.getText("ENTER_VALID_QUANTITY");
	 cus.sd.myquotations.util.ModelExtractor.validationInputQuantity(evt,msg);
  },
  
  formChangedInputDiscount: function(evt){
	var msg = this.resourceBundle.getText("ENTER_VALID_DISCOUNT");
	cus.sd.myquotations.util.ModelExtractor.validationInputNumber(evt,msg,false); 
  },
    
  _dialogsOnNavigation : function(val) {
	 var sOwner = sap.ui.core.Component.getOwnerIdFor(this.getView());
     var oComponent = sap.ui.component(sOwner);
       
     if(oComponent){
    	 oComponent.setRouterSetCloseDialogs(val);
     }
  },
  
  onInit : function() {
    // execute the onInit for the base class BaseDetailController
    sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
   
    var that = this;
    // get i18n texts
    this.resourceBundle = this.oApplicationFacade.getResourceBundle();

    // check if the user is navigating from cart
    this.getView().addEventDelegate({
               onBeforeShow : jQuery.proxy(function (evt) {
            	   if(that.isNavCart){
            		     that.isNavCart = false;
            		     that.onNavCart();
            		   }
               }, this)
               
    });

    //leave the popups open 
    this._dialogsOnNavigation(false);     
    this.fullScreenMode = this.oApplicationFacade.getApplicationModel("global").getProperty("/fullScreenMode");
    this.copyMode = false;
    
    this.oRouter.attachRouteMatched(function (oEvent) {
      var model = that.oApplicationFacade.getApplicationModel("NewQuotation");
      if (oEvent.getParameter("name") === "copy") {
    	this.copyMode = true;
        if(model && !jQuery.isEmptyObject(model.oData)){
        	//convert to localized date for the date picker control
         
         if(model.getProperty("/PreviousPageLocation") !=="itemDetails"){
        	 model = this._convertLocalizedDate(model,true);
         }
         model.setProperty("/PreviousPageLocation","copy");
          
          this.getView().setModel(model,"myQuotationModel");
          this.onNavCopy();
        }else{
          //It should navigate to the master view if the shared model is empty.
          //The navigation cannot be done here because some classes from the navigation framework
          //are not instantiated at this time after a browser refresh. The navigation is done later
          //in the after rendering.
          this.isNavToMaster = true;
        }
      } else if (oEvent.getParameter("name") === "edit") {
        if(model && !jQuery.isEmptyObject(model.oData)){
        	//convert to localized date for the date picker control
     
	        if(model.getProperty("/PreviousPageLocation") !=="itemDetails"){
	        	model = this._convertLocalizedDate(model,true);
	        }
        	
          this.getView().setModel(model,"myQuotationModel");
          this.onNavEdit();            
        }else{
          this.isNavToMaster = true;
        }
      } else if (oEvent.getParameter("name") === "cart") {
	        if(model && !jQuery.isEmptyObject(model.oData)){
	        	//convert to localized date for the date picker control
	        this.getView().setModel(model,"myQuotationModel");             	
        	//The navigation when coming from the product details view need to be done in after rendering
          //because the page needs to be rendered first in case there are messages from the simulation to be displayed.
          this.isNavCart = true;
        }
        else{
          this.isNavToMaster = true;
        }
      }
    }, this);
    
    // Country value help
    this.buildSelectCountryDialog();    
    
    this.getRejectionReasonModel();
    sap.ui.core.delegate.ScrollEnablement._bScrollToInput = true;
    
  },
	
  _convertLocalizedDate:function(model,bReadBackend){
		//validFrom 
		var validFrom = model.getProperty("/ValidFrom");
		if(validFrom){
			model.setProperty("/ValidFrom", this._toUTCType(validFrom,bReadBackend));
		} 
		//validTo
		var validTo = model.getProperty("/ValidTo");
		if(validTo){
			model.setProperty("/ValidTo", this._toUTCType(validTo,bReadBackend));
		} 
		//requestedDevelivery
		var requestedDevliveryDateHeader = model.getProperty("/RequestedDeliveryDate");
		if(requestedDevliveryDateHeader) {
			model.setProperty("/RequestedDeliveryDate", this._toUTCType(requestedDevliveryDateHeader,bReadBackend));
		} 
		
		//item level
		var oDataItems = model.getProperty("/QuotationItemSet/results");
		  if (oDataItems){
		      for ( var i = 0; i < oDataItems.length; i++) {
		    	  //requestedDevelivery item
		    	var requestedDeliverydateItem =  oDataItems[i].RequestedDeliveryDate;
		    	if(requestedDeliverydateItem){
		    		oDataItems[i].RequestedDeliveryDate = this._toUTCType(oDataItems[i].RequestedDeliveryDate,bReadBackend);
		    	}
		      }
		   }
		  
		return model;
  },
	  
  _toUTCType:function(model,bReadBackend){
	  if(bReadBackend){
		return new Date ( model.getUTCFullYear(), model.getUTCMonth(), model.getUTCDate() );
	  }else{
		return new Date ( Date.UTC(model.getFullYear(), model.getMonth(), model.getDate() ) );
	  }
  },

  onAfterRendering: function(evt){
  //automatically navigate to the master view if the model is undefined or empty (on browser refresh)
	 if(this.isNavToMaster){
	     this.isNavToMaster = false;
	     this.oRouter.navTo("master",undefined,true);
	 }
  },

  onNavCopy : function(){
	this._clearControlsErrorState(); 
	  
    //Deletes the quoationID occurrences since it a a new (a copy) quotation model. Also sets all the Count fields of the
	  //pricing conditions to 000 to indicate that they are new conditions.
    cus.sd.myquotations.util.ModelExtractor.removeQuotationIDZeroCounterDeep(this.getView().getModel("myQuotationModel").getData());
    this._buildPartnerModels();
    
    this.onRefresh();
  },
  
  onNavCart : function(){
	  //update cart list
    this._buildPartnerModels();
    this.onRefresh();
  },
 
  _isCountryValid : function(oCountryValue) {	 		
	    var countryInput = this.getView().byId("countryInput");
		if (oCountryValue === "") {
			//if country is emptied, ensure the country code is emptied as well
			this.getView().getModel("shipTo").setProperty("/CountryCode", "");
			var emptyMessage = this.resourceBundle.getText("ENTER_COUNTRY");
			countryInput.setValueStateText(emptyMessage);			
			countryInput.setValueState(sap.ui.core.ValueState.Error);
			return false;
		}
		var countryList = this.getCountryModel().getData().results;
		var countryObject = null;
		var valid = true;
		if (countryList) {
			for (var i=0; i<countryList.length; i++) {			
				if (countryList[i].CountryName.toLowerCase() === oCountryValue.toLowerCase() || countryList[i].CountryKey.toLowerCase() === oCountryValue.toLowerCase()) {
					countryObject = countryList[i];
					break;
				}
			}
		}
		if (countryObject) {
			//set the country code and capitalize country if necessary
			this.getView().getModel("shipTo").setProperty("/CountryCode", countryObject.CountryKey); 
	    	countryInput.setValue(countryObject.CountryName);
	    	countryInput.setValueStateText("");
	    	countryInput.setShowValueStateMessage(false);
			    	
		} else {
			var message = this.resourceBundle.getText("ENTER_VALID_COUNTRY");
			countryInput.setValueStateText(message);
			valid = false;	
		}	
		countryInput.setValueState(valid ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error);
		countryInput.setShowValueStateMessage(!valid);
		
		return valid;
  },
  
  //if the item column table changes we need to update the index
  _checkItemsForErrors:function(){
	    var Invalid = false;
		var that = this;
		if(this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet")){
		  var list = this.getView().byId("CQID").getItems();
		  if(list.length>0){
			for ( var i = 0; i < list.length; i++) {
			  //check if quantity is greater than 0
				var valueCell = list[i].mAggregations.cells[1].mAggregations.content[0].mAggregations.items[0];
			  if( isNaN(sap.ca.ui.model.format.NumberFormat.getInstance().parse(valueCell.getValue())) || sap.ca.ui.model.format.NumberFormat.getInstance().parse(valueCell.getValue())<= 0 ){
				  var orderInput = that.getView().byId(valueCell.getId()) || sap.ui.getCore().byId(valueCell.getId());
				  if(orderInput){
					  orderInput.setValueState(sap.ui.core.ValueState.Error);
					  var msg = this.resourceBundle.getText("ENTER_VALID_QUANTITY");
					  orderInput.setValueStateText(msg);
				  }   
				  Invalid = true;
			  }
			  //requested delivery date
			  if(list[i].mAggregations.cells[2].getProperty("valueState")==="Error"){
				  Invalid = true;
			  }	
			  
			  //discount on Item
			  if(list[i].mAggregations.cells[3].mAggregations.content[0].mAggregations.items[0].getProperty("valueState")==="Error"){
				  Invalid = true;
			  }		
			  
			}			
		 }
	   }
	   return Invalid;	
  },
    
  _checkFormErrors : function(){ 
	  
	  var formContainsErrors = false;
	  
	  //check items table
	  formContainsErrors = this._checkItemsForErrors();
	  
	  if(this.getView().getModel("shipTo") && !this.getView().getModel("shipTo").getProperty("/PostalCode")){
		  var postalCodeInput = this.getView().byId("IDPOSTALCODE");
		      postalCodeInput.setValueState(sap.ui.core.ValueState.Error);
		      postalCodeInput.setValueStateText(this.resourceBundle.getText("ENTER_POSTALCODE"));
		      formContainsErrors = true;
	  }
	  
	  if(this.getView().getModel("shipTo") && !this.getView().getModel("shipTo").getProperty("/City")){
		  var cityInput = this.getView().byId("IDCITY");
		      cityInput.setValueState(sap.ui.core.ValueState.Error);
		      cityInput.setValueStateText(this.resourceBundle.getText("ENTER_CITY"));
		      formContainsErrors = true;
	  }
	 
	  if(this.getView().getModel("shipTo") && !this._isCountryValid(this.getView().getModel("shipTo").getProperty("/CountryDescription"))) {		  
			  formContainsErrors = true;		  
	  }
			  
	  if(this.getView().getModel("myQuotationModel")){
		  var validToInput = this.getView().byId("IDVALIDTO");
		 if(!this.getView().getModel("myQuotationModel").getProperty("/ValidTo") || validToInput.getProperty("valueState") === "Error" ){
		      validToInput.setValueState(sap.ui.core.ValueState.Error);
		   	  formContainsErrors = true;
		 }
	  }
	  
	  if(this.getView().getModel("myQuotationModel")){
		  var validFromInput = this.getView().byId("IDVALIDFROM");
		  if(validFromInput){
			  if(validFromInput.getProperty("valueState") === "Error")
			  {
				  validFromInput.setValueState(sap.ui.core.ValueState.Error);
			   	  formContainsErrors = true;  
			  }
		  }
	  }
	  
	  if(this.getView().getModel("myQuotationModel")){
		  var validRequestedDateInput = this.getView().byId("IDREQUESTDELD");
		  if(!this.getView().getModel("myQuotationModel").getProperty("/RequestedDeliveryDate") || validRequestedDateInput.getProperty("valueState") === "Error")
		  {
			  validRequestedDateInput.setValueState(sap.ui.core.ValueState.Error);
		   	  formContainsErrors = true;  
		  }
	  }
	  
	  if(this.getView().getModel("myQuotationModel")){
		  var overAllDiscountInput = this.getView().byId("IDODISCOUNT");
		  var discountField = this.getView().getModel("myQuotationModel").getProperty("/DiscountPercentage");
		  
		  if(discountField < 0 || overAllDiscountInput.getProperty("valueState") === "Error")
		  {
			  overAllDiscountInput.setValueState(sap.ui.core.ValueState.Error);
		   	  formContainsErrors = true;  
		  }
	  }
	  
	  if(formContainsErrors){
		  sap.m.MessageBox.show(this.resourceBundle.getText("CHECKERRORS"),sap.m.MessageBox.Icon.WARNING,
		  this.resourceBundle.getText("MANDATORYTITLE"), [ sap.m.MessageBox.Action.OK ]);
		  return formContainsErrors;  
	  
  	  }
  },
  
  
_clearControlsErrorState:function(){
	var that = this;
	if(this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet")){
		  var list = this.getView().byId("CQID").getItems();
		  if(list.length>0){
			for ( var i = 0; i < list.length; i++) {
				var inputControlid = list[i].mAggregations.cells[1].mAggregations.content[0].mAggregations.items[0].getId();
				  var orderInput = that.getView().byId(inputControlid) || sap.ui.getCore().byId(inputControlid);
				  if(orderInput){
					  orderInput.setValueState(sap.ui.core.ValueState.None);
				  }
				  
				//requested delivery date
				  if(list[i].mAggregations.cells[2].getProperty("valueState")==="Error"){
					  list[i].mAggregations.cells[2].setValueState(sap.ui.core.ValueState.None);
				  }	
				  
				  //discount on Item
				  if(list[i].mAggregations.cells[3].mAggregations.content[0].mAggregations.items[0].getProperty("valueState")==="Error"){
					  list[i].mAggregations.cells[3].mAggregations.content[0].mAggregations.items[0].setValueState(sap.ui.core.ValueState.None);
				  }		
				  
			  }
		  }
	}
	
	   this.getView().byId("IDPOSTALCODE").setValueState(sap.ui.core.ValueState.None);
	   this.getView().byId("IDCITY").setValueState(sap.ui.core.ValueState.None);
	   this.getView().byId("countryInput").setValueState(sap.ui.core.ValueState.None);
	   this.getView().byId("IDVALIDTO").setValueState(sap.ui.core.ValueState.None);
	   this.getView().byId("IDVALIDFROM").setValueState(sap.ui.core.ValueState.None);
	   this.getView().byId("IDREQUESTDELD").setValueState(sap.ui.core.ValueState.None);
	   this.getView().byId("IDODISCOUNT").setValueState(sap.ui.core.ValueState.None);
  }, 
  
  _formatFloatValue:function(value){
	var internalValue =  sap.ca.ui.model.format.NumberFormat.getInstance({decimals:2}).format(value);
	return sap.ca.ui.model.format.NumberFormat.getInstance().parse(internalValue);
  },
  
  //A popup with an expandable area on click of Show Details
  dialogShowMore:function(listMsg,quotationId,titleI18nKey) {
    var that = this;
   
    var fnClose = function(){
      if(that.fullScreenMode){
  		  if (that.copyMode)
  			  that.oRouter.navTo("display", { contextPath : quotationId }, true);
  		  else
  			  window.history.back(1);
  	  }
      else if(jQuery.device.is.phone){
        that.oRouter.navTo("master");
      }else{
          that.oRouter.navTo("detail", { contextPath : quotationId}, true );
      }
    };

    
    // shows the warnings message in a MessageBox with a Show Details link to expand
    sap.ca.ui.message.showMessageBox({
        type: sap.ca.ui.message.Type.SUCCESS,
        message: this.resourceBundle.getText(titleI18nKey,quotationId),
        details: this.buildWarningString(listMsg)
    },fnClose);
  
  },
  
  //Concatenate all the warnings into one String.  
  buildWarningString : function(listMsg){
    var warnings = new String();
    for(var i = 0;listMsg.length>i;i++){
      if(listMsg[i].Type === "W"){
        if(warnings.length > 0){
          warnings = warnings.concat(".\n " + listMsg[i].Text);
        }else{
          warnings = listMsg[i].Text;
        }
        
      }
    }
    return warnings;
  }, 
  
  dialogWithNavigation : function(msg,quotationId,titleI18nKey) {
	 var that = this;
	  sap.m.MessageBox.show(this.resourceBundle.getText(msg,quotationId), sap.m.MessageBox.Icon.SUCCESS,
	  this.resourceBundle.getText(titleI18nKey), [ sap.m.MessageBox.Action.OK ],
	    function(oAction) {
	      if (oAction === sap.m.MessageBox.Action.OK) {
	    	  if(that.fullScreenMode){
	    		  if (that.copyMode)
	    			  that.oRouter.navTo("display", { contextPath : quotationId }, true);
	    		  else
	    			  window.history.back(1);
	    	  }
	    	  else if(jQuery.device.is.phone){
	    	    that.oRouter.navTo("master");
	    	  }else{
	    	    that.oRouter.navTo("detail", { contextPath : quotationId }, false);
	    	  }
	      }
	    });
	  },
	  
  onRefresh : function(){
 
	if(this._checkFormErrors()){
		return;//stop the execution
	}
	  
    var quotationID = this.getView().getModel("myQuotationModel").getProperty("/QuotationID");
    
    if(!quotationID){
      //The backend expects Count fields in pricing conditions to be set to zero and no quotationID for a simulation
      cus.sd.myquotations.util.ModelExtractor.removeQuotationIDZeroCounterDeep(this.getView().getModel("myQuotationModel").getData());
    }
    
    this._callService("S");
  
    this.getView().getModel("myQuotationModel").updateBindings();
  },
  
  onSave : function(){
	 
	if(this._checkFormErrors()){
		return;//stop the execution
	}
    
    if(this.getView().getModel("myQuotationModel").getProperty("/QuotationID")){
      this._callService("U");
    }else{
      //There should not be any quotationID and all the Count fields should be set to zero since it is a new quotation (backend requirements)
      cus.sd.myquotations.util.ModelExtractor.removeQuotationIDZeroCounterDeep(this.getView().getModel("myQuotationModel").getData());
      this._callService("C");     
    }   
    
    this.getView().getModel("myQuotationModel").updateBindings();
  },
  

  _callService : function(actionName){
	var that = this;
	this._parseHeaderPricingConditionsBack();
    this._parseItemsPricingConditionsBack();
    this._parseShipToBack();
    this._removePropertiesForService();
    this._removeMaterialUoMSetFromItems();
    this._removeEmptyQuotationSet();
    
    //remove previous navigation
    delete this.getView().getModel("myQuotationModel").oData.PreviousPageLocation;
    
    cus.sd.myquotations.util.ModelExtractor.removeMetadataDeep(this.getView().getModel("myQuotationModel").getData());
    
    //messages
    var message = "";
        message = [{Type:"E",Text:"text"}];
    
    var newModel = new sap.ui.model.json.JSONModel();
     newModel.setProperty("/MessageSet" , message);
    
    newModel.setProperty("/__metadata",{"type" : "lord_my_quotation_srv.Action"} );
    newModel.setProperty("/ActionName" , actionName);

    var viewModel = this.getView().getModel("myQuotationModel");
    
    //convert to UTC before sending
    that._convertLocalizedDate(viewModel,false);
    
    newModel.setProperty("/QuotationHeaderSet", viewModel.getData());
    
    var clonedData = jQuery.extend(true, {}, newModel.getData());
    //The gateway returns attribute with an array in the format: attribute.results.array. However
    //the gateway expects it in the form attribute.array when we send it (service.create). This
    //utility method does that.
    cus.sd.myquotations.util.ModelExtractor.removeQuotationHeaderSetFields(clonedData);
    cus.sd.myquotations.util.ModelExtractor.removePartnerSetFields(clonedData);
    cus.sd.myquotations.util.ModelExtractor.removeQuotationItemSetFields(clonedData);
    cus.sd.myquotations.util.ModelExtractor.removePricingConditionSetFields(clonedData);
    
    cus.sd.myquotations.util.ModelExtractor.fixQuotationItemSetFields(clonedData);
    
    // Must be done last
    cus.sd.myquotations.util.ModelExtractor.substituteResultsToArrayDeep(clonedData);
    cus.sd.myquotations.util.ModelExtractor.emptyStringToSpaceDeep(clonedData);

    var defaultService = this.getView().getModel();
    var service = this.getView().getModel("lord_my_quotation_srv");
    
    if(!service.bTokenRequested){
      service.oHeaders["x-csrf-token"] = defaultService.oHeaders["x-csrf-token"];
      service.bTokenRequested = defaultService.bTokenRequested;
    }

    var sUrl = service._createRequest("ActionSet").requestUri;
    sUrl = sUrl.substring(sUrl.indexOf("ActionSet"));//, sUrl.length);

    service.create(sUrl, clonedData, null, function(data, response){
     
    if(response.data.QuotationHeaderSet)
    viewModel.setData(response.data.QuotationHeaderSet);
    
    //convert to UTC before sending
    that._convertLocalizedDate(viewModel,true);

    var msg ="";
     // result: S=simulate, U=update, C=create 
     switch(response.data.ActionName){       
     case "U":
       if(response.data.ReturnedMessageType === "W"){
         that.dialogShowMore(response.data.MessageSet.results, response.data.QuotationHeaderSet.QuotationID,"QUOTATION_UPDATED_WARN_MSG");
       }else{
         that.dialogWithNavigation("QUOTATION_UPDATED_MSG_WITH_ID",response.data.QuotationHeaderSet.QuotationID,"SUCCESSTITLE");
       }
  	break;
     case "C":
  	   if(response.data.ReturnedMessageType === "W"){
  	     that.dialogShowMore(response.data.MessageSet.results, response.data.QuotationHeaderSet.QuotationID,"QUOTATION_CREATED_WARN_MSG");
  	   }else{
  	     that.dialogWithNavigation("QUOTATION_CREATED_MSG_WITH_ID",response.data.QuotationHeaderSet.QuotationID,"SUCCESSTITLE");
  	   }
  	   break;
     }
     if(msg){
  	   // if we updated or created the reset the changed scenario
  	   var message = that.resourceBundle.getText(msg);
	  		sap.m.MessageToast.show(message);
     }
     
    }, function(oError){
      //Need to divide the discount values by 10 because it was multiply by 10 before calling the backend
      cus.sd.myquotations.util.ModelExtractor.DivideItemsDiscountbyTen(that.getView().getModel("myQuotationModel"));
      cus.sd.myquotations.util.ModelExtractor.DivideHeaderDiscountbyTen(that.getView().getModel("myQuotationModel"));
      if(oError.request.data.ActionName === "S"){
        cus.sd.myquotations.util.ModelExtractor.dialogErrorMessageSimulate(null,null,oError.response.body);
      }else{
        cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(null,null,oError.response.body);
      }
    });
    
    this._buildPartnerModels();
    cus.sd.myquotations.util.ModelExtractor.ParseHeadterDiscountPercentageConditions(this.getView().getModel("myQuotationModel"));
    cus.sd.myquotations.util.ModelExtractor.ParseItemsConditions(this.getView().getModel("myQuotationModel"));
    this._addMaterialUoMSetToItems();
    
    //validate after simulate used in the Create New Quotation
    if(actionName==="S"){
    	that._checkFormErrors();
    }
  },
  
  
  _removeEmptyQuotationSet:function(){
	  var oDataItems = this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet/results");
	  if (oDataItems && !oDataItems.length) {
			  delete this.getView().getModel("myQuotationModel").oData.QuotationItemSet;
	  }
  },
  
  
  _removeMaterialUoMSetFromItems:function(){
	  
	  var oDataItems = this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet/results");
	    if (oDataItems) {
	      for ( var i = 0; i < oDataItems.length; i++) {
	    	  
	    	  if(!this.itemUoMMap.hasOwnProperty(oDataItems[i].MaterialNumber)){
	    		  this.itemUoMMap[oDataItems[i].MaterialNumber] = oDataItems[i].MaterialUoMSet;
	    	  }
	    	  
	    	  delete oDataItems[i].MaterialUoMSet;
	      }
	     }
  },
  
  
  //The UoM set is removed from the model when we send the model to the backend. The backend does not return the UoM set
  //in the result from the service.create so we need to add them back to the model.
  _addMaterialUoMSetToItems:function(){
	  var oDataItems = this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet/results");
	    if (oDataItems) {
	    	  for ( var i = 0; i < oDataItems.length; i++) {
	    		  oDataItems[i].MaterialUoMSet = this.itemUoMMap[oDataItems[i].MaterialNumber];
		      }
	    }       
  },
  
  //The field binded to the UI field is the temporary field DiscountPercentage which we created for the UI only. The
  //value entered by the user must be copied to the pricing condition in the PricingConditionSet list of the header.
  _parseHeaderPricingConditionsBack : function(){
    var headerPricingSet = this.getView().getModel("myQuotationModel").getProperty("/PricingConditionSet/results");
    var hasDiscountCondition = false;
    var headerCondType = this.oApplicationFacade.getApplicationModel("customizing").getProperty("/HEAD_DISCOUNT");
    
    if (headerPricingSet) {
      for ( var i = 0; i < headerPricingSet.length; i++) { 
        
        if (headerPricingSet[i].CondTypeCode === headerCondType && (headerPricingSet[i].Counter === "000" || headerPricingSet[i].Counter === "001")) {
          hasDiscountCondition = true;
          if(this.getView().getModel("myQuotationModel").getProperty("/DiscountPercentage") || this.getView().getModel("myQuotationModel").getProperty("/DiscountPercentage") === 0){
            var value = (-1 * Math.abs(parseFloat(this.getView().getModel("myQuotationModel").getProperty("/DiscountPercentage"))))*10;
            headerPricingSet[i].AmountInternal = this._formatFloatValue(value).toString();
          }
        }
      }
    }
    
    //A discound condition is created if one doesn't exist. It means that there was not discount entered yet for that quotation.
    if(!hasDiscountCondition && Math.abs((this.getView().getModel("myQuotationModel").getProperty("/DiscountPercentage"))) > 0){//Need to create a discount condition
      var valueAmountInternal = (-1 * Math.abs(parseFloat(this.getView().getModel("myQuotationModel").getProperty("/DiscountPercentage"))))*10;
      var headerPricing = {   
        ItemID : "000000",
        CondTypeCode : headerCondType,
        Counter : "000",
        AmountInternal : this._formatFloatValue(valueAmountInternal).toString()
      };
      if(headerPricingSet){
        headerPricingSet[headerPricingSet.length] = headerPricing;
      }else{
        var headerPricingArray= [];
        headerPricingArray[0] = headerPricing;
        headerPricingSet = {results: headerPricingArray};
        this.getView().getModel("myQuotationModel").setProperty("/PricingConditionSet",headerPricingSet);
      }

    }
    //Delete the fields that were created for the UI only. The backend doesn't support these fields.
    delete this.getView().getModel("myQuotationModel").oData.Discount;
    delete this.getView().getModel("myQuotationModel").oData.DiscountUnit;
    delete this.getView().getModel("myQuotationModel").oData.DiscountPercentage;
    delete this.getView().getModel("myQuotationModel").oData.DiscountUnitPercentage;
  },
  
  //The field binded to the UI field is the temporary field Discount which we created for the UI only. The
  //value entered by the user must be copied to the pricing condition in the PricingConditionSet list of the item.
  _parseItemsPricingConditionsBack : function(){
	var itemCondType = this.oApplicationFacade.getApplicationModel("customizing").getProperty("/ITEM_DISCOUNT");
    var oDataItems = this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet/results");
    if (oDataItems) {
      for ( var i = 0; i < oDataItems.length; i++) {
        var hasDiscountCondition = false;
        
        if(oDataItems[i].PricingConditionSet){
	        var aPrincingConditions = oDataItems[i].PricingConditionSet.results;
	       
		        for ( var j = 0; j < aPrincingConditions.length; j++) {
		          
		          if (aPrincingConditions[j].CondTypeCode === itemCondType && (aPrincingConditions[j].Counter === "001" || aPrincingConditions[j].Counter === "000")) {
		            hasDiscountCondition = true;
		            if(oDataItems[i].Discount || oDataItems[i].Discount === 0){
		              var value = (-1 * Math.abs(parseFloat(oDataItems[i].Discount)))*10;
		              aPrincingConditions[j].AmountInternal = this._formatFloatValue(value).toString();
		            }
		          }
		        }
	    
	        if(!hasDiscountCondition){//No existing discount condition
	          if(Math.abs((oDataItems[i].Discount)) > 0){//A discount value was entered, need to create a discount condition
	            var valueAmountInternal = (-1 * Math.abs(parseFloat(oDataItems[i].Discount)))*10;
	            var discountCondition = 
	            { // discount
	              ItemID : oDataItems[i].ItemID,
	              CondTypeCode : itemCondType,
	              Counter : "000", // Counter Should be at 000 for the first save and then             // 001 subsequently
	              AmountInternal : this._formatFloatValue(valueAmountInternal).toString()
	            };
	            aPrincingConditions[aPrincingConditions.length] = discountCondition;
	          }
	        }
	        
	        //remove temporary fields (for UI only) from the item level
	        delete oDataItems[i].ListPrice;
	        delete oDataItems[i].ListPriceUnit;
	        delete oDataItems[i].Discount;
	        delete oDataItems[i].DiscountUnit;
	        delete oDataItems[i].Currency;
	      }
      }
    }       
  },
  
  //Copies data from model shipTo to the header PartnerSet list
  _parseShipToBack : function(){
    var oDataPartners = this.getView().getModel("myQuotationModel").getProperty("/PartnerSet/results");
    if (oDataPartners && this.getView().getModel("shipTo")) {
      for ( var i = 0; i < oDataPartners.length; i++) {
        if(oDataPartners[i].PartnerFunction === "WE"){//ShipTo
          oDataPartners[i].City = this.getView().getModel("shipTo").getProperty("/City");
          oDataPartners[i].PostalCode = this.getView().getModel("shipTo").getProperty("/PostalCode");
          oDataPartners[i].Street = this.getView().getModel("shipTo").getProperty("/Street");
          oDataPartners[i].HouseNumber = this.getView().getModel("shipTo").getProperty("/HouseNumber");
          oDataPartners[i].CountryCode = this.getView().getModel("shipTo").getProperty("/CountryCode");  
          }
        }
      }
  },
  
  onNavEdit : function(){	  
	 //init the form
	  this._clearControlsErrorState(); 
	  this.itemUoMMap = {};
	  this._buildPartnerModels();
	  cus.sd.myquotations.util.ModelExtractor.ParseHeadterDiscountPercentageConditions(this.getView().getModel("myQuotationModel"));   
	    
	//check form changes  
	//this.cartSize = this._countNbItems();
	 
	this.onRefresh();

  },

  _buildPartnerModels : function() {
	    var partnerModels = cus.sd.myquotations.util.ModelExtractor.BuildPartnerModels(this.getView().getModel("myQuotationModel"));
	    if(partnerModels.SoldTo.oData.PartnerNumber){
	      this.getView().setModel(partnerModels.SoldTo,"soldTo");
	    }else if(this.getView().hasModel("soldTo")){
        delete this.getView().oModels.soldTo;      
	    }
	    if(partnerModels.ShipTo.oData.PartnerNumber){
	      this.getView().setModel(partnerModels.ShipTo,"shipTo");
	    }else if(this.getView().hasModel("shipTo")){
        delete this.getView().oModels.shipTo;      
      }
  },
  
  onDelete : function(evt){
	 
		  var item = evt.getParameter("listItem");  		   
		  var ItemDescription = this.getView().getModel("myQuotationModel").getProperty("ItemDescription", item.getBindingContext("myQuotationModel"));
		  var ItemID = this.getView().getModel("myQuotationModel").getProperty("MaterialNumber", item.getBindingContext("myQuotationModel"));
		  var message = this.resourceBundle.getText("ITEMSREMOVED", [ ItemID, ItemDescription]);
		  sap.m.MessageToast.show(message);
		  
		  var position = item.getBindingContext("myQuotationModel").getPath().split("/");
		  var localData =  this.getView().getModel("myQuotationModel").getData();
		  	  localData.QuotationItemSet.results.splice(position[3], 1);
		  this.getView().getModel("myQuotationModel").setData(localData);
		 
		  this.getView().getModel("myQuotationModel").setProperty("/nbItems", this._countNbItems());
		  
		  		   
	},
	
	//Fields that are not supported by the backend. They must be removed before calling the backend.
	_removePropertiesForService : function(){
	   delete this.getView().getModel("myQuotationModel").oData.nbItems;
	   delete this.getView().getModel("myQuotationModel").oData.editMode;
	   delete this.getView().getModel("myQuotationModel").oData.AttachmentSet;
	   delete this.getView().getModel("myQuotationModel").oData.NoteSet;
	   delete this.getView().getModel("myQuotationModel").oData.SalesDocumentTypeCode;
	},

	onAdd : function(){	
		if(this._checkFormErrors()){
			return;//stop the execution
		}		
	if(this.fullScreenMode)
		this.oRouter.navTo("products", null, true);
	else
		this.oRouter.navTo("products");
	},
	

	onRejectAll : function(){
		var that = this;
		
		var selectContent  = new sap.m.List({
			mode : "SingleSelectMaster",
		//	showSeparators : "None"
		});
		
		var oItemTemplate = new sap.m.StandardListItem({
			title : "{Value}"
		});

		var oDataTemplate = new sap.ui.core.CustomData({ key : "Key" });
		oDataTemplate.bindProperty("value", "Key");
		oItemTemplate.addCustomData(oDataTemplate);

		selectContent.setModel( this.getView().getModel("rejectionReason"));
		
		selectContent.bindAggregation("items", {
			path: "/results", 
			template: oItemTemplate, 
		});
		
		if(selectContent.getItems().length > 0){
			selectContent.setSelectedItem(selectContent.getItems()[0]);
		}
		
		// create standard dialog containing a list
	    var stdDialog = new sap.m.Dialog({
	      title: this.resourceBundle.getText("REJECTTITLE"),
	      icon: "sap-icon://warning2",
	      content:selectContent ,
	      contentHeight : "400em",
	      leftButton: new sap.m.Button({
	    	  text: this.resourceBundle.getText("OK"),
	        press: function () {
	        //assign reason to all items	
	       var oDataItems = that.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet/results");
	       	if (oDataItems) {
	       		for ( var i = 0; i < oDataItems.length; i++) {
	       			oDataItems[i].RejectionReason = selectContent.getSelectedItem().data("Key");
	       		}
	       }
	        	
	         stdDialog.close();
	          //call simulate
	         that.onRefresh();
	      
	         that.getView().getModel("myQuotationModel").updateBindings();
	        }
	      }),
	      
	      rightButton: new sap.m.Button({
	        text: this.resourceBundle.getText("CANCEL"),
	        press: function () {
	          stdDialog.close();
	        }
	      })
	    }).addStyleClass("sapUiPopupWithPadding");
		
	    stdDialog.open();
	},	
	
	
  onCancel : function(){
	  var that = this;
	  //if any changes are detected display the message
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
  },
  
  navCancel : function(){
    var lastQuotationID = this.oApplicationFacade.getApplicationModel("global").getProperty("/lastQuotationID");
    if(lastQuotationID === undefined || jQuery.device.is.phone){
      this.oRouter.navTo("master");      
    }else{
      if(this.fullScreenMode)
    	  window.history.back(1);
      else
    	  this.oRouter.navTo("detail", {
  	        contextPath : lastQuotationID
  	      }, false);
    }
  },

  _countNbItems : function(){
	  var singleQuotationModel = this.getView().getModel("myQuotationModel");
	  var oDataItems = singleQuotationModel.getProperty("/QuotationItemSet/results");
		  if(oDataItems){
			  return oDataItems.length;
		  }
			  return 0;
  },

  buildSelectCountryDialog : function() {
	  var that = this;
	  var doSearch = function(evt) {
		  var filter = [];
		  var value = evt.getParameter("value");
		  if(value !== undefined) {
			  var itemsBinding = evt.getParameter("itemsBinding");
			  var selectFilter = new sap.ui.model.Filter("CountryName", sap.ui.model.FilterOperator.Contains , value);
			  filter.push(selectFilter);
			  itemsBinding.filter(filter);
		  }
	  };
           
	  this.oSelectCountryDialog = new sap.m.SelectDialog({
	    title: that.resourceBundle.getText("COUNTRYLIST_TITLE"),
	    noDataText: that.resourceBundle.getText("NODATA"),
	    liveChange: doSearch,
	    search: doSearch,
    });
       	    
	    // set model & bind Aggregation
        this.oSelectCountryDialog.setModel(this.getCountryModel());
	     
	    // attach close listener	    
	    var self = this;
	    this.oSelectCountryDialog.attachConfirm(function(evt) {
	      var selectedItem = evt.getParameter("selectedItem");
	      if (selectedItem) {	    	 
	    	  //set country code directly in model, since the UI only contains the country description field 
	    	  self.getView().getModel("shipTo").setProperty("/CountryCode", selectedItem.getDescription()); 
	    	  self.getView().byId("countryInput").setValue(selectedItem.getTitle());
	    	  self.getView().byId("countryInput").setValueState(sap.ui.core.ValueState.None);
	    	  self.getView().byId("countryInput").setValueStateText("");
	    	  self.getView().byId("countryInput").setShowValueStateMessage(false);
	      }
	    });
	    
	    this.oSelectCountryDialog.attachCancel(function(oEvent) {
	    	 oEvent.getSource().getBinding("items").filter([]);
	    	 this.buildSelectCountryDialog().destroy();
	    	 
		    });
	    
	    var itemTemplate = new sap.m.StandardListItem({
	    	title : "{CountryName}",
	    	description: "{CountryKey}",
	        active : true
	    });
	    this.oSelectCountryDialog.bindAggregation("items", "/results", itemTemplate);
  },	
	
  getCountryModel : function() {
    if(!this.countryListModel){
      var self = this;
      this.getView().getModel().read("CountrySet", undefined, undefined, false, function(oData, response) {
        self.countryListModel = new sap.ui.model.json.JSONModel();
        self.countryListModel.setData(oData);
      }, function(oData, response) {
        cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(oData, response);
      });     
    }
    return this.countryListModel;
  },
  
  getRejectionReasonModel : function() {
	    if(!this.rejectionReasonModel){
	      var self = this;
	      var parms=["EntityType='Item'","PropertyName='RejectionReasonCode'"];
	      this.getView().getModel("lord_my_quotation_srv").read("GetValueHelp", undefined, parms, false, function(oData, response) {
	        self.rejectionReasonModel = new sap.ui.model.json.JSONModel();
	       
	        //have an empty DDL Field
	        if(!oData.results || oData.results.length>0){
	        	
	        	oData.results = oData.results.sort(function(a,b){
	        		  if (a.Value < b.Value)
	        	          return -1;
	        	       else if (a.Value == b.Value)
	        	          return 0;
	        	       else
	        	          return 1;
	        	  });
	        	
	        	var emptyObj = {Key:" ", Value: self.resourceBundle.getText("NONE")};
	        	oData.results.unshift(emptyObj);
	        }
	        
	        self.rejectionReasonModel.setData(oData);
	        self.getView().setModel(self.rejectionReasonModel,"rejectionReason");
	      }, function(oData, response) {
	        cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(oData, response);
	      });     
	    }
	    return this.rejectionReasonModel;
	  },
	
	onCountryValueHelp : function() {
		this.buildSelectCountryDialog();
		this.oSelectCountryDialog.open();
	},
	
	onCountryInput : function(oEvent) {	
		this._isCountryValid(oEvent.getParameter("newValue"));		
	},


	onItemPress : function(oEvent){
	
		if(this._checkFormErrors()){
			return;//stop the execution
		}	
		
		var sPath = oEvent.oSource.getBindingContextPath();
		var sItemID = this.getView().getModel("myQuotationModel").getProperty(sPath).ItemID;
	  
		this.oApplicationFacade.setApplicationModel("rejectionReason", this.getView().getModel("rejectionReason"));
		
		this.getView().getModel("myQuotationModel").setProperty("/PreviousPageLocation","itemDetails");
	  
		this.oRouter.navTo("ItemDetails",{itemID:sItemID},false);
	}
});
