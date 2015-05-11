/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("cus.sd.myquotations.util.Formatter");

jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.ca.ui.model.format.NumberFormat");
jQuery.sap.require("sap.ca.ui.model.format.AmountFormat");
jQuery.sap.require("sap.ca.ui.model.format.QuantityFormat");

cus.sd.myquotations.util.Formatter = {

  _applicationFacade : null,

  setApplicationFacade : function(oApplicationFacade) {
    // set application facade in order to get access to resource bundle and
    // other models
    cus.sd.myquotations.util.Formatter._applicationFacade = oApplicationFacade;
  },

  getApplicationFacade : function() {
    return cus.sd.myquotations.util.Formatter._applicationFacade;
  },

  getResourceBundle : function() {
    return cus.sd.myquotations.util.Formatter.getApplicationFacade().getResourceBundle();
  },

  Number : function(value) {
    if (value) {
      var numberFormatter = sap.ca.ui.model.format.NumberFormat.getInstance({
        style : 'short',
        decimals: 2
      });
      return numberFormatter.format(value);
    }
    return value;
  },

  PriceCurrency : function(value, currency) {
    if (!value) {
      value = 0;
    }
    var oAmountFormat = sap.ca.ui.model.format.AmountFormat.getInstance(currency, {
      style : 'standard'
    });
    return oAmountFormat.format(value);
  },

  NbItems : function(value) {
    if (value === 0 || value) {
      return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("ITEMS", [ value ]);
    }
    return value;
  },

  Date : function(value) {
    if (value) {
      var oDateFormat = sap.ca.ui.model.format.DateFormat.getDateInstance({
        style : "short"
      });
      return oDateFormat.format(value, true);
    }
    return value;
  },

  AttachmentMap : {
    "ppt" : "ppt-attachment",
    "pdf" : "pdf-attachment",
    "zip" : "attachment-zip-file"
  },

  AttachmentIcon : function(value) {
    var map = cus.sd.myquotations.util.Formatter.AttachmentMap;
    var code = (value && map[value]) ? map[value] : "question-mark";
    return "sap-icon://" + code;
  },

  QuotationSubmitPageTitle : function(value) {
    if (value) {
      return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("REVIEWANDUPDATEQUOTATION", [ value ]);
    }
    return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("REVIEWANDCREATEQUOTATION");
  },

  Percentage: function(value){
    if (value) {
      var numberFormatter = sap.ca.ui.model.format.NumberFormat.getInstance({
        style : 'percentage'
      });
      return numberFormatter.format(value);
    }
    return value;
    
  },
  
  formatDiscount : function(discount, unit) {
    if (!unit) {
      unit = "";
    }
    if (!discount) {
      discount = 0;
    }
    var discountAndCurrency = cus.sd.myquotations.util.Formatter.formatUnitCurrency(discount, unit);
    var oDiscount = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("OVERALL_DISCOUNT_VALUE", [ discountAndCurrency ]);
    return oDiscount;
  },

  formatItemDiscount:function (percentage){
    if (!percentage) {
      percentage = 0;
    }
    
    var numberFormatter = sap.ca.ui.model.format.NumberFormat.getInstance({
      style : 'percentage',
      decimals: 2
    });
    return numberFormatter.format(percentage);
  },
  
  formatHouseNumberStreet : function(houseNumber, street) {
    if (!houseNumber) {
      houseNumber = "";
    }
    if (!street) {
      street = "";
    }
    var address = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("HOUSE_NB_STREET", [ houseNumber, street ]);
    return address;
  },

  formatCityCountry : function(postalCode, city, country) {
    if (!postalCode) {
      postalCode = "";
    }
    if (!city) {
      city = "";
    }
    if (!country) {
      country = "";
    }
    var address = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("CITY_COUNTRY", [ postalCode, city, country ]);
    return address;
  },

  formatQuotationID : function(qotationType, quotID) {
    if (!quotID) {
      quotID = "";
    }
    if (!qotationType) {
      qotationType = "";
    }
    var oQuot = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("QUOTATION_VALUE", [ qotationType, quotID ]);
    return oQuot;
  },
  
  formatQuotation : function(quotID) {
    if (!quotID) {
      quotID = "";
    }
    var oQuot = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("QUOTATION", [quotID]);
    return oQuot;
  },
  

  formatNetValue : function(curr) {
    if (!curr) {
      curr = "";
    }
    return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("NETVALUE_VALUE", [ curr ]);
  },

  formatListPrice : function(curr) {
    if (!curr) {
      curr = "";
      return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("LIST_PRICE");
    }
    return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("LIST_PRICE_VALUE", [ curr ]);
  },

  formatExpiryDate : function(eDate) {
    if (eDate) {
      eDate = cus.sd.myquotations.util.Formatter.Date(eDate);
    } else {
      eDate = "";
    }
    return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("EXPIRES_VALUE", [ eDate ]);
  },

  formatFromToDate : function(dateFrom, dateTo) {
    var oDateValidTo;
    var oDateValidFrom;
    
    if (!dateFrom && !dateTo){
      return "";
    }
    
    if (dateTo) {
      oDateValidTo = cus.sd.myquotations.util.Formatter.Date(dateTo);
    } else {
      oDateValidTo = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("UNSPECIFIED_VALUE");
    }

    if (dateFrom) {
      oDateValidFrom = cus.sd.myquotations.util.Formatter.Date(dateFrom);
    } else {
      oDateValidFrom = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("UNSPECIFIED_VALUE");
    }

    return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("DATE_VALID_FROMTO", [ oDateValidFrom, oDateValidTo ]);
  },

  formatExpiry : function(eDate, eStatus) {
    var msg = "";

    if (eStatus === "C") {
      return "";
    }

    if (eDate) {
      var dNow = new Date();

      eDate = new Date(eDate.getUTCFullYear(), eDate.getUTCMonth(), eDate.getUTCDate());
      dNow = new Date(dNow.getUTCFullYear(), dNow.getUTCMonth(), dNow.getUTCDate());
      
      var dayDiff = parseInt((eDate - dNow) / (24 * 3600 * 1000), 10);

      if (dayDiff < 0) {
        msg = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("FILTER_EXPIRY_EXPIRED");
      }
      if (dayDiff === 0) {
        msg = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("EXPIRY_TODAY");
      }
      if (dayDiff === 1) {
        msg = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("EXPIRY_TOMORROW");
      }
      if (dayDiff > 1) {
        msg = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("EXPIRY_MSG", [ dayDiff ]);
      }
    } else {
      msg = "";
    }

    return msg;
  },

  formatExpiryState : function(eDate, eStatus) {
    if (eStatus === "C") { // if status is "completed", no color is shown
      return "None";
    }

    if (eDate) {
      var dNow = new Date();

      eDate = new Date(eDate.getUTCFullYear(), eDate.getUTCMonth(), eDate.getUTCDate());
      dNow = new Date(dNow.getUTCFullYear(), dNow.getUTCMonth(), dNow.getUTCDate());
      
      var dayDiff = parseInt((eDate - dNow) / (24 * 3600 * 1000), 10);

      var criticalPeriod = cus.sd.myquotations.util.Formatter.getApplicationFacade().getApplicationModel("customizing").getProperty("/RED_THRESHOLD");
      // criticalPeriod = 7;
      if (dayDiff <= criticalPeriod) {
        return "Error";
      }
      return "Success";
    }
  },

  formatStatus : function(eStatus, eCode) {
    if (eCode === "") {
      return "";
    }
    return eStatus;
  },

  formatMatDesc : function(matDesc) {
    if (!matDesc) {
      return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("NO_MATERIAL_DESC");
    }
    return matDesc;
  },
  
  StatusRefLabel: function(statusCode) {

	  switch(statusCode){
	   case	"":
		   return " ";
	   case "A":
		   return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("STATUS_NOT_REF");
	   case "B":
		   return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("STATUS_PART_REF");
	   case "C":
		   return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("STATUS_ALL_REF");
	  }
	  
  },
  
  
  StatusRejColor : function (status){
	  
	  switch(status){
	   case "B":
		   return "Error";
	   case "C":
		   return "Error";
	  }
	  
	  
 },
  
  
  StatusLabel : function(statusCode) {

	  switch(statusCode){
	   case	"":
		   return " ";
	   case "A":
		   return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("STATUS_NOT_REJ");
	   case "B":
		   return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("STATUS_PART_REJ");
	   case "C":
		   return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("STATUS_ALL_REJ");
	  }
	  
  }
	, 
  
	
//							Reference Status	Rejection Status	Rejection Code
//	[Nothing]							A				A				Empty
//	Partially Reference					B				A				Empty
//	Fully Reference						C				A				Empty
//	Partially Reference / Rejected		B				C				Not Empty
//	Fully Rejected						A				C				Not Empty


	
	
	
  rejectionStatus : function(rejectionReason,rejectionStatus,referenceStatus) {
	  var status = "";  
	  
	  if( (referenceStatus === 'A' || referenceStatus === "" ) &&  rejectionStatus === 'A' ){
		  status =" ";
	  }
	  else if( referenceStatus === 'B' && rejectionStatus === 'A'  ){
		 status = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("STATUS_PART_REF");
	  }
	  else if( referenceStatus === 'C' && rejectionStatus === 'A'  ){
			 status = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("STATUS_ALL_REF");
	  }
	  else if( referenceStatus === 'B' && rejectionStatus === 'C' ){
			 status = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("STATUS_PART_REFJEC");
	  }
	  else if( ( referenceStatus === 'A' || referenceStatus === "" ) && rejectionStatus === 'C' ){
		  status = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("STATUS_FULL_REJ");
	  }
	    return status;
  },
  //discount, delivery date, quantity
  visiblityForRejection : function(rejectionStatus,referenceStatus){
	 var editable = true;
	 
	 if(referenceStatus==="C" || rejectionStatus==="C"){
		 editable=false;
	 }
	 
	 return editable;
  },
  //rejection reason
  visiblityForRejectionDLL : function(rejectionStatus,referenceStatus){
	  var editable = true;
		 
	  if(referenceStatus==="C"){
		  editable=false;
	  }
		  
	  return editable;
  },
  
  MobileText : function(i81nText){
	  
	  var text = i81nText;
		if(jQuery.device.is.phone){
			text = "";
		}  
	  
	  return text;
  },

  
  
  formatUnitCurrency : function(unit, currency) {
    if (unit === undefined) {
      unit = 0;
    }
    if (!currency) {
      currency = "";
    }
    var value = sap.ca.ui.model.format.AmountFormat.FormatAmountStandardWithCurrency(unit, currency);
    return value;
  },
  
  formatQuantity:function(value,unit){
    if (value === undefined) {
      value = 0;
    }
    if (!unit) {
      unit = "";
    }
    
    var quantityFormatter = sap.ca.ui.model.format.QuantityFormat.getInstance(null,{
      style : "standard",
    });
    
    var quantity = quantityFormatter.format(value);
    return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("QUANTITY_UNIT", [ quantity, unit ]);
  },
 
  formatOutputState : function (status){
	   switch(status){
	   case	"0":
		   return sap.ui.core.ValueState.None;
	   case "1":
		   return sap.ui.core.ValueState.Success;
	   case "2":
		   return sap.ui.core.ValueState.Error;
   }
  },
  
  formatPartnerFuncDesc : function (partnerFuncDesc){
	   return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("PARTNERFUNCTION") + ": " + partnerFuncDesc;
  },
  
  formatPartnerDesc : function (partnerDesc){
	   return cus.sd.myquotations.util.Formatter.getResourceBundle().getText("PARTNER") + ": " + partnerDesc;
 }
  
 /* formatUnitCurrencyList : function(unit, currency) {
	    if (!unit) {
	      unit = "0.00";
	    }
	    if (!currency) {
	      currency = "";
	    }
	    var value = cus.sd.myquotations.util.Formatter.getResourceBundle().getText("UNITCURRENCY", [ unit, currency ]);
	    return value;
	  }  */
};
