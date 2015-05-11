/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



jQuery.sap.declare("cus.sd.myquotations.util.ModelExtractor");



jQuery.sap.require("sap.m.MessageBox");







cus.sd.myquotations.util.ModelExtractor = {



  _applicationFacade : null,







  setApplicationFacade : function(oApplicationFacade) {



    // set application facade in order to get access to resource bundle and



    // other models



    this._applicationFacade = oApplicationFacade;



  },







  getApplicationFacade : function() {



    return this._applicationFacade;



  },







  getResourceBundle : function() {



    return this._applicationFacade.getResourceBundle();



  },







  //Extracts the partners from the PartnerSet list and build model for the sold-to,ship-to and bill-to



  BuildPartnerModels : function(oModel) {



    var soldToModel = new sap.ui.model.json.JSONModel();



    var billToModel = new sap.ui.model.json.JSONModel();



    var shipToModel = new sap.ui.model.json.JSONModel();



    var soldTos = cus.sd.myquotations.util.ModelExtractor.extractPartners(oModel, "AG");



    var billTos = cus.sd.myquotations.util.ModelExtractor.extractPartners(oModel, "RE");



    var shipTos = cus.sd.myquotations.util.ModelExtractor.extractPartners(oModel, "WE");







    if (soldTos.length > 0) {



      soldToModel.setData(soldTos[0]);



    }







    if (billTos.length > 0) {



      billToModel.setData(billTos[0]);



    }







    if (shipTos.length > 0) {



      shipToModel.setData(shipTos[0]);



    }







    var partnerModels = {



      SoldTo : soldToModel,



      BillTo : billToModel,



      ShipTo : shipToModel



    };



    return partnerModels;



  },







  extractPartners : function(oModel, partnerFunction) {



    var partners = [];



    var oDataPartners = oModel.getProperty("/PartnerSet/results");



    if (oDataPartners) {



      for ( var i = 0; i < oDataPartners.length; i++) {



        if (oDataPartners[i].PartnerFunction === partnerFunction) {



          partners[partners.length] = oDataPartners[i];



        }



      }



    }



    return partners;



  },







  extractPartnersType : function(oModel, partnerFunctionType) {



    var partners = [];



    var oDataPartners = oModel.getProperty("/PartnerSet/results");



    if (oDataPartners) {



      for ( var i = 0; i < oDataPartners.length; i++) {



        if (oDataPartners[i].PartnerFunctionType === partnerFunctionType) {



          partners[partners.length] = oDataPartners[i];



        }



      }



    }



    return partners;



  },







  //The model returned by the backend does not work out of the box for the UI. We need to extract the discount



  //from the PricingConditionSet of each item and create a temporary (only for UI purpose) field at the item level.



  //The reason is because it is not possible to search for a specific condition type from the PricingConditionSet 



  //in the xml view. This search needs to be done by the controller.



  ParseItemsConditions : function(oModel) {



    var itemDiscountCond = this.getApplicationFacade().getApplicationModel("customizing").getProperty("/ITEM_DISCOUNT");



    var itemPriceCond = this.getApplicationFacade().getApplicationModel("customizing").getProperty("/ITEM_PRICE");







    var oDataItems = oModel.getProperty("/QuotationItemSet/results");



    if (oDataItems) {



      for ( var i = 0; i < oDataItems.length; i++) {







        if (oDataItems[i].PricingConditionSet) {



          var aPrincingConditions = oDataItems[i].PricingConditionSet.results;



          // Need a default value in case there is no discount conditions for



          // the item



          oDataItems[i].Discount = 0.0;



          oDataItems[i].DiscountUnit = "%";



          var listPrice = 0.0;



          for ( var j = 0; j < aPrincingConditions.length; j++) {



            if (aPrincingConditions[j].CondTypeCode === itemPriceCond) {



              listPrice = listPrice + parseFloat(aPrincingConditions[j].ValueInternal);



              oDataItems[i].ListPrice = listPrice;

    

              oDataItems[i].ListPriceUnit = aPrincingConditions[j].RateUnitExternal;



            } else if (aPrincingConditions[j].CondTypeCode === itemDiscountCond) {



              if (aPrincingConditions[j].Counter === "001" || aPrincingConditions[j].Counter === "000") {



                oDataItems[i].Discount = Math.abs(aPrincingConditions[j].AmountInternal);



                oDataItems[i].DiscountUnit = aPrincingConditions[j].RateUnitExternal;



              }



            }



          }



        }



      }



    }



  },



  



  //Converts the item discounts from the format 25% to 0.25



  DivideItemsDiscount:function(oModel){



    var itemDiscountCond = this.getApplicationFacade().getApplicationModel("customizing").getProperty("/ITEM_DISCOUNT");



    var oDataItems = oModel.getProperty("/QuotationItemSet/results");



    if (oDataItems) {



      for ( var i = 0; i < oDataItems.length; i++) {



        oDataItems[i].DiscountPercentage =  parseFloat(oDataItems[i].Discount) / 1000;



      }



    }



  },







  //Divides the discounts by ten because the backend multiply the discount value by 10. It is a backend constraint.



  DivideItemsDiscountbyTen : function(oModel) {



    var itemDiscountCond = this.getApplicationFacade().getApplicationModel("customizing").getProperty("/ITEM_DISCOUNT");



    var oDataItems = oModel.getProperty("/QuotationItemSet/results");



    if (oDataItems) {



      for ( var i = 0; i < oDataItems.length; i++) {







        if (oDataItems[i].PricingConditionSet) {



          var aPrincingConditions = oDataItems[i].PricingConditionSet.results;







          for ( var j = 0; j < aPrincingConditions.length; j++) {



            if (aPrincingConditions[j].CondTypeCode === itemDiscountCond) {



              if (aPrincingConditions[j].Counter === "001" || aPrincingConditions[j].Counter === "000") {



                aPrincingConditions[j].AmountInternal = aPrincingConditions[j].AmountInternal / 10;



              }



            }



          }



        }



      }



    }



  },



  //Divides the discounts by ten because the backend multiply the discount value by 10. It is a backend constraint.



  DivideHeaderDiscountbyTen : function(oModel) {



    var headerDiscountCond = this.getApplicationFacade().getApplicationModel("customizing").getProperty("/HEAD_DISCOUNT");



    var oPrincingConds = oModel.getProperty("/PricingConditionSet/results");



    if (oPrincingConds) {



      for ( var i = 0; i < oPrincingConds.length; i++) {



        if (oPrincingConds[i].CondTypeCode === headerDiscountCond && (oPrincingConds[i].Counter === "000" || oPrincingConds[i].Counter === "001")) {



          oPrincingConds[i].AmountInternal = oPrincingConds[i].AmountInternal / 10;



        }



      }



    }



  },







  //Extracts the discount condition from the header PricingConditionSet and creates a temporary (only for UI) field



  //at the header level. Calculates the discount in amount (not percentage) and stores it in this temp field.



  ParseHeadterConditions : function(oModel) {



    var itemPriceCond = this.getApplicationFacade().getApplicationModel("customizing").getProperty("/ITEM_PRICE");



    var oPrincingConds = oModel.getProperty("/PricingConditionSet/results");

    

    if (oPrincingConds) {

    

        var intValue = 0.0;



      for ( var i = 0; i < oPrincingConds.length; i++) {



        if (oPrincingConds[i].CondTypeCode === itemPriceCond) {



        //  var netValue = parseFloat(oModel.getProperty("/NetValue"));



       //  var intValue = parseFloat(oPrincingConds[i].ValueInternal);



          //Do not use locale for parsing because the backend always return with periods



        	intValue = intValue + parseFloat(oPrincingConds[i].ValueInternal);

            oModel.setProperty("/DiscountUnit", oPrincingConds[i].Currency);

        }



      }

      

        	var netValue = parseFloat((oModel.getProperty("/NetValue")));



            var discount = intValue - netValue;



          oModel.setProperty("/Discount", discount);



    }



  },







  //Extracts the discount condition from the header PricingConditionSet and creates a temporary (only for UI) field



  //at the header level. 



  //The reason is because it is not possible to search for a specific condition type from the PricingConditionSet 



  //in the xml view. This search needs to be done by the controller.



  ParseHeadterDiscountPercentageConditions : function(oModel) {



    var headerDiscountCond = this.getApplicationFacade().getApplicationModel("customizing").getProperty("/HEAD_DISCOUNT");



    var oPrincingConds = oModel.getProperty("/PricingConditionSet/results");



    if (oPrincingConds) {



      // Default value



      oModel.setProperty("/DiscountPercentage", 0.0);



      oModel.setProperty("/DiscountUnitPercentage", "%");







      // Replaces the default value if there is a discount condition at the



      // header level



      for ( var i = 0; i < oPrincingConds.length; i++) {



        if (oPrincingConds[i].CondTypeCode === headerDiscountCond && (oPrincingConds[i].Counter === "000" || oPrincingConds[i].Counter === "001")) {



          



        	var value = "";



        	if(typeof(oPrincingConds[i].AmountInternal)==="number"){



        		value = Math.abs(oPrincingConds[i].AmountInternal);



        	}else{



        	  //Do not use locale for parsing because the backend always return with periods



        		value = Math.abs(parseFloat(oPrincingConds[i].AmountInternal));



        	}



        	



          oModel.setProperty("/DiscountPercentage", value);



          oModel.setProperty("/DiscountUnitPercentage", oPrincingConds[i].RateUnitExternal);// ext



        }



      }



    }



  },







  CountNbItems : function(oModel) {



    var oDataItems = oModel.getProperty("/QuotationItemSet/results");



    if (oDataItems) {



      oModel.setProperty("/nbItems", oDataItems.length);



    }



  },







  extractErrorMessage : function(oData, response, xml, msgString) {



    var errorMessage = "";



    var x = "";



    



    if (xml) {



    	var trimXml = xml.trim().substring(0, 1);



    	



      if( trimXml === '{' || trimXml === '['){



    	  //is json



    	  x = $.parseJSON(xml);



          errorMessage = x.error.message.value;



      }



      else if(trimXml === '<'){



    	  //is xml



    	  jQuery.sap.require("jquery.sap.xml");



    	  x = jQuery.sap.parseXML(xml);



          errorMessage = $(x).find('errordetails').find('message').text() || $(x).find('message').text(); 



      }



      else{



    	  //regular string



    	  errorMessage = xml;



      }







      return errorMessage;



    }







    if (msgString) {



      return msgString;



    }







    if (oData && oData.response && oData.response.body) {



      var errorBody = $.parseJSON(oData.response.body);



      if (errorBody && errorBody.error && errorBody.error.message && errorBody.error.message.value) {



        errorMessage = errorBody.error.message.value;



      }



    }







    if (errorMessage === "" && oData && oData.response) {



      errorMessage = oData.message + " : " + oData.response.requestUri;



    }



    return errorMessage;



  },







  dialogErrorMessage : function(oData, response, xml, msgString) {



    sap.m.MessageBox.show(this.extractErrorMessage(oData, response, xml, msgString), sap.m.MessageBox.Icon.ERROR, //



    this.getResourceBundle().getText("ERROR"), [ sap.m.MessageBox.Action.OK ],



    function(oAction) {



    });



  },







  dialogErrorMessageSimulate : function(oData, response, xml, msgString) {



    var msg = this.extractErrorMessage(oData, response, xml, msgString);



    msg = msg + ". " + this.getResourceBundle().getText("CHOOSE_REFRESH");



    sap.m.MessageBox.show(msg, sap.m.MessageBox.Icon.ERROR, //



    this.getResourceBundle().getText("ERROR"), [ sap.m.MessageBox.Action.OK ],//



    function(oAction) {



    });



  },







  validationInputNumber : function(oEvent, errorMsg, greaterThanZero) {



    var input = sap.ui.getCore().byId(oEvent.getSource().getId());



    var isNotInteger = false;



    var value = oEvent.getParameter("newValue");







    var options = { decimals: 2};



 // Works for all cultures



  var parsedValue = sap.ca.ui.model.format.NumberFormat.getInstance(options).parse(value);



    



    if (greaterThanZero) {



    	  //sap.ca.ui.model.format.NumberFormat.getInstance().parse returns NaN if it cannot be parsed correctly



    	if(isNaN(parsedValue) || parsedValue <= 0){



        isNotInteger = true;



      }



    } else {



      if (value === "") {



        oEvent.getSource().setValue("0");



      } else if(isNaN(parsedValue) || parsedValue < 0){



        isNotInteger = true;



      }



    }



    



    if(!isNotInteger){



      	  oEvent.getSource().setValue(sap.ca.ui.model.format.NumberFormat.getInstance(options).format(parsedValue));



    }







    input.setValueStateText(errorMsg);



    input.setValueState(isNotInteger ? sap.ui.core.ValueState.Error : sap.ui.core.ValueState.None);







    return isNotInteger;



  },



  



  validationInputQuantity:function(oEvent, errorMsg) {



    var input = sap.ui.getCore().byId(oEvent.getSource().getId());



    var isInvalid = false;



    var value = oEvent.getParameter("newValue");



    



    var quantityFormatter = sap.ca.ui.model.format.QuantityFormat.getInstance(null,{



      style : "standard",  



    });



    var numericValue = quantityFormatter.parse(value);



    if(isNaN(numericValue) || numericValue < 0){



      //numericValue=0;



      isInvalid = true;



    }



    



    if(!isInvalid){



      oEvent.getSource().setValue(quantityFormatter.format(numericValue));



    }







    input.setValueStateText(errorMsg);



    input.setValueState(isInvalid ? sap.ui.core.ValueState.Error : sap.ui.core.ValueState.None);



    



    return isInvalid;



    



  },







 // var params={isDate:false, evt:evt,msg:msg};



  validationEmptyField : function(params) {



    var value = params.evt.getParameter("newValue");



    var input = sap.ui.getCore().byId(params.evt.getSource().getId());



    var emptyField = false;







    //check if the date is valid based on framework parse



    if(params.isDate && params.evt.getParameter("invalidValue")){



    	emptyField = true;



    }



    



	if (value.replace(/\s+/g, '') === '') {



		if(params.emptyCheck){



			emptyField = true;



		}else{



		emptyField = false;



		}



	}







    if (!params.isDate) {



      input.setValueStateText(params.msg);



    }  







    input.setValueState(emptyField ? sap.ui.core.ValueState.Error : sap.ui.core.ValueState.None);







    return emptyField;



  },







  currentDateTime : function() {



    return new Date();



  },







  //The gateway services returns the models with metadata fields. However it doesn't suporrt (want) them



  //when we do a service.create (create,update,simulate). This method goes through a model and removes



  //all the occurences of metadata



  removeMetadataDeep : function(data) {



    if ($.isArray(data)) {



      for ( var i = 0; i < data.length; i++) {



        cus.sd.myquotations.util.ModelExtractor.removeMetadataDeep(data[i]);



      }



    } else {



      var propertyName = null;



      for (propertyName in data) {



        if (data.hasOwnProperty(propertyName)) {



          if (propertyName === "__metadata") {



            delete data.__metadata;



          } else {



            if ($.isPlainObject(data[propertyName]) || $.isArray(data[propertyName])) {



              cus.sd.myquotations.util.ModelExtractor.removeMetadataDeep(data[propertyName]);



            }



          }



        }



      }



    }



  },



  



  removePricingConditionSetFields : function(data) {



    if (data && data.QuotationHeaderSet ) {



      if(data.QuotationHeaderSet && data.QuotationHeaderSet.PricingConditionSet && data.QuotationHeaderSet.PricingConditionSet.results){



        var headerPricingConditionSet = data.QuotationHeaderSet.PricingConditionSet.results;



        for ( var k = 0; k < headerPricingConditionSet.length; k++) {



          delete headerPricingConditionSet[k].AmountExternal;



//          delete headerPricingConditionSet[k].AmountInternal;



          delete headerPricingConditionSet[k].BaseUnitOfMeasure;



          delete headerPricingConditionSet[k].CalculationType;



//          delete headerPricingConditionSet[k].CondTypeCode;



          delete headerPricingConditionSet[k].ConditionClass;



//          delete headerPricingConditionSet[k].Counter;



          delete headerPricingConditionSet[k].Currency;



          delete headerPricingConditionSet[k].IsInactive;



//          delete headerPricingConditionSet[k].ItemID;



          delete headerPricingConditionSet[k].PriceUnit;



//          delete headerPricingConditionSet[k].QuotationID;



          delete headerPricingConditionSet[k].RateUnitExternal;



          delete headerPricingConditionSet[k].RateUnitInternal;



          delete headerPricingConditionSet[k].UnitDenominator;



          delete headerPricingConditionSet[k].UnitNumerator;



          delete headerPricingConditionSet[k].UnitOfMeasure;



          delete headerPricingConditionSet[k].UnitOfMeasureInternal;



          delete headerPricingConditionSet[k].ValueExternal;



          delete headerPricingConditionSet[k].ValueInternal;



        }



      }



      if( data.QuotationHeaderSet.QuotationItemSet && data.QuotationHeaderSet.QuotationItemSet.results){



        var oDataItems = data.QuotationHeaderSet.QuotationItemSet.results;



        for ( var i = 0; i < oDataItems.length; i++) {



          if (oDataItems[i].PricingConditionSet && oDataItems[i].PricingConditionSet.results) {



            var itemPrincingConditionSet = oDataItems[i].PricingConditionSet.results;



            for ( var j = 0; j < itemPrincingConditionSet.length; j++) {



              delete itemPrincingConditionSet[j].AmountExternal;



  //            delete itemPrincingConditionSet[j].AmountInternal;



              delete itemPrincingConditionSet[j].BaseUnitOfMeasure;



              delete itemPrincingConditionSet[j].CalculationType;



  //            delete itemPrincingConditionSet[j].CondTypeCode;



              delete itemPrincingConditionSet[j].ConditionClass;



  //            delete itemPrincingConditionSet[j].Counter;



              delete itemPrincingConditionSet[j].Currency;



              delete itemPrincingConditionSet[j].IsInactive;



  //            delete itemPrincingConditionSet[j].ItemID;



              delete itemPrincingConditionSet[j].PriceUnit;



  //            delete itemPrincingConditionSet[j].QuotationID;



              delete itemPrincingConditionSet[j].RateUnitExternal;



              delete itemPrincingConditionSet[j].RateUnitInternal;



              delete itemPrincingConditionSet[j].UnitDenominator;



              delete itemPrincingConditionSet[j].UnitNumerator;



              delete itemPrincingConditionSet[j].UnitOfMeasure;



              delete itemPrincingConditionSet[j].UnitOfMeasureInternal;



              delete itemPrincingConditionSet[j].ValueExternal;



              delete itemPrincingConditionSet[j].ValueInternal;



            }



          }



        }



      }



    }



  },



  



  removeQuotationHeaderSetFields : function(data) {



    if (data && data.QuotationHeaderSet){



//      delete data.QuotationHeaderSet.CreatedOn;



//      delete data.QuotationHeaderSet.Currency;



//      delete data.QuotationHeaderSet.DistributionChannel;



//      delete data.QuotationHeaderSet.Division;



//      delete data.QuotationHeaderSet.IcompletionStatus;



      delete data.QuotationHeaderSet.IcompletionStatusDesc;



//      delete data.QuotationHeaderSet.ItemIcompletionStatus;



      delete data.QuotationHeaderSet.ItemIcompletionStatusDesc;



//      delete data.QuotationHeaderSet.LastUpdated;



//      delete data.QuotationHeaderSet.NetValue;



//      delete data.QuotationHeaderSet.PartnerSet;



//      delete data.QuotationHeaderSet.PricingConditionSet;



//      delete data.QuotationHeaderSet.ProcessingStatus;



      delete data.QuotationHeaderSet.ProcessingStatusDesc;



//      delete data.QuotationHeaderSet.PurchaseOrder;



//      delete data.QuotationHeaderSet.QuotationID;



//      delete data.QuotationHeaderSet.QuotationItemSet;



//      delete data.QuotationHeaderSet.ReferenceStatus;



      delete data.QuotationHeaderSet.ReferenceStatusDesc;



//      delete data.QuotationHeaderSet.RejectionStatus;



      delete data.QuotationHeaderSet.RejectionStatusDesc;



//      delete data.QuotationHeaderSet.RequestedDeliveryDate;



      delete data.QuotationHeaderSet.SalesDocumentTypeDesc;



//      delete data.QuotationHeaderSet.SalesOrganization;



//      delete data.QuotationHeaderSet.SoldToParty;



      delete data.QuotationHeaderSet.SoldToPartyDescription;



//      delete data.QuotationHeaderSet.TaxAmount;



      delete data.QuotationHeaderSet.TermsOfPaymentDescription;



//      delete data.QuotationHeaderSet.TotalAmount;



//      delete data.QuotationHeaderSet.ValidFrom;



//      delete data.QuotationHeaderSet.ValidTo;



    }



  },







  fixQuotationItemSetFields : function(data) {



    if (data && //



        data.QuotationHeaderSet && //



        data.QuotationHeaderSet.QuotationItemSet && //



        data.QuotationHeaderSet.QuotationItemSet.results){



      var oDataItems = data.QuotationHeaderSet.QuotationItemSet.results;



      for ( var i = 0; i < oDataItems.length; i++) {



//          oDataItems[i].ItemDescription;



//          oDataItems[i].ItemID;



//          oDataItems[i].MaterialNumber;



//          oDataItems[i].NetAmount;



          oDataItems[i].OrderQuantity = oDataItems[i].OrderQuantity.toString();



//          oDataItems[i].PricingConditionSet;



//          oDataItems[i].QuotationID;



//          oDataItems[i].RequestedDeliveryDate;



//          oDataItems[i].SalesUnit;



//          oDataItems[i].SalesUnitDescription;



//          oDataItems[i].ScheduleLineSet;



      }



    }



  },



  



  removeQuotationItemSetFields : function(data) {



    if (data && //



        data.QuotationHeaderSet && //



        data.QuotationHeaderSet.QuotationItemSet && //



        data.QuotationHeaderSet.QuotationItemSet.results){



      var oDataItems = data.QuotationHeaderSet.QuotationItemSet.results;



      for ( var i = 0; i < oDataItems.length; i++) {



        delete oDataItems[i].ItemDescription;



//          delete oDataItems[i].ItemID;



//          delete oDataItems[i].MaterialNumber;



//          delete oDataItems[i].NetAmount;



//          delete oDataItems[i].OrderQuantity;



//          delete oDataItems[i].PricingConditionSet;



//          delete oDataItems[i].QuotationID;



//          delete oDataItems[i].RequestedDeliveryDate;



//          delete oDataItems[i].SalesUnit;



        delete oDataItems[i].SalesUnitDescription;



        delete oDataItems[i].ScheduleLineSet;



        



        delete oDataItems[i].ReferenceStatus;



        delete oDataItems[i].RejectionReasonDescription;



        delete oDataItems[i].RejectionStatus;



        delete oDataItems[i].RejectionStatusDescription;



        



      }



    }



  },



  



  removePartnerSetFields : function(data) {



    if( data && //



        data.QuotationHeaderSet && //



        data.QuotationHeaderSet.PartnerSet && //



        data.QuotationHeaderSet.PartnerSet.results){



      var oDataPartners = data.QuotationHeaderSet.PartnerSet.results;



      for ( var i = 0; i < oDataPartners.length; i++) {



//          delete oDataPartners[i].CellPhoneNumber;



//          delete oDataPartners[i].City;



//          delete oDataPartners[i].CountryCode;



        delete oDataPartners[i].CountryDescription;



//          delete oDataPartners[i].Email;



//          delete oDataPartners[i].HouseNumber;



//          delete oDataPartners[i].Name1;



//          delete oDataPartners[i].Name2;



//          delete oDataPartners[i].PartnerFunction;



        delete oDataPartners[i].PartnerFunctionDescription;



//          delete oDataPartners[i].PartnerFunctionType;



//          delete oDataPartners[i].PartnerNumber;



//          delete oDataPartners[i].PostalCode;



//          delete oDataPartners[i].QuotationID;



//          delete oDataPartners[i].Street;



//          delete oDataPartners[i].TelephoneNumber;



//          delete oDataPartners[i].TelephoneNumberExtension;



      }



    }



  },







  //Delete all the occurrences of quotationID and set all occurrences of Counter to 0



  //for a given array. Details why in the CreateQuotation controller.



  removeQuotationIDZeroCounterDeep : function(data) {



    if ($.isArray(data)) {



      for ( var i = 0; i < data.length; i++) {



        cus.sd.myquotations.util.ModelExtractor.removeQuotationIDZeroCounterDeep(data[i]);



      }



    } else {



      var propertyName = null;



      for (propertyName in data) {



        if (data.hasOwnProperty(propertyName)) {



          if (propertyName === "QuotationID") {



            delete data.QuotationID;



          } else if (propertyName === "Counter") {



            data.Counter = "000";



          } else {



            if ($.isPlainObject(data[propertyName]) || $.isArray(data[propertyName])) {



              cus.sd.myquotations.util.ModelExtractor.removeQuotationIDZeroCounterDeep(data[propertyName]);



            }



          }



        }



      }



    }



  },







  //Remove the middle man "results" field between an attribute and its array. Ex: QuotationItemSet.results.array is 



  //converted to QuotationItemSet.array



  substituteResultsToArrayDeep : function(data) {



    if ($.isArray(data)) {



      for ( var i = 0; i < data.length; i++) {



        cus.sd.myquotations.util.ModelExtractor.substituteResultsToArrayDeep(data[i]);



      }



    } else {



      var propertyName = null;



      for (propertyName in data) {



        if (data.hasOwnProperty(propertyName)) {



          if ($.isPlainObject(data[propertyName]) && data[propertyName].results && $.isArray(data[propertyName].results)) {



            data[propertyName] = data[propertyName].results;



            for ( var i = 0; i < data[propertyName].length; i++) {



              cus.sd.myquotations.util.ModelExtractor.substituteResultsToArrayDeep(data[propertyName][i]);



            }



          } else {



            if ($.isPlainObject(data[propertyName]) || $.isArray(data[propertyName])) {



              cus.sd.myquotations.util.ModelExtractor.substituteResultsToArrayDeep(data[propertyName]);



            }



          }



        }



      }



    }



  },



  



  emptyStringToSpaceDeep : function(data) {



    if ($.isArray(data)) {



      for ( var i = 0; i < data.length; i++) {



        cus.sd.myquotations.util.ModelExtractor.emptyStringToSpaceDeep(data[i]);



      }



    } else {



      var propertyName = null;



      for (propertyName in data) {



        if (data.hasOwnProperty(propertyName)) {



          if (data[propertyName] === "") {



            data[propertyName] = " ";



          } else {



            if ($.isPlainObject(data[propertyName]) || $.isArray(data[propertyName])) {



              cus.sd.myquotations.util.ModelExtractor.emptyStringToSpaceDeep(data[propertyName]);



            }



          }



        }



      }



    }



  },







  extractGreatestItemID : function(itemsArray) {



    var greatestItemID = 0;



    if (itemsArray) {



      for ( var i = 0; i < itemsArray.length; i++) {



        if (parseFloat(itemsArray[i].ItemID) > greatestItemID) {



          greatestItemID = parseFloat(itemsArray[i].ItemID);



        }



      }



    }



    return greatestItemID;



  }



};



