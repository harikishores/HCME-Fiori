jQuery.sap.registerPreloadedModules({



"name":"cus/sd/myquotations/Component-preload",



"version":"2.0",



"modules":{



	"cus/sd/myquotations/Component.js":function(){/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



jQuery.sap.declare("cus.sd.myquotations.Component");



jQuery.sap.require("cus.sd.myquotations.Configuration");



jQuery.sap.require("sap.ca.scfld.md.ComponentBase");







sap.ca.scfld.md.ComponentBase.extend("cus.sd.myquotations.Component", {



  metadata : {



    "name" : "CUS :: My Quotations",



    "version" : "1.4.1",



    "library" : "cus.sd.myquotations",



    "includes" : [],



    "dependencies" : {



      "libs" : [ "sap.m", "sap.me" ],



      "components" : []



    },



    "config" : {



      "resourceBundle" : "i18n/i18n.properties",



      "titleResource" : "APPLICATION_NAME",



      "icon" : "sap-icon://Fiori2/F0390",



      "favIcon" : "./resources/sap/ca/ui/themes/base/img/favicon/F0390_My_Quotations.ico",



      "homeScreenIconPhone" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0390_My_Quotations/57_iPhone_Desktop_Launch.png",



      "homeScreenIconPhone@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0390_My_Quotations/114_iPhone-Retina_Web_Clip.png",



      "homeScreenIconTablet" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0390_My_Quotations/72_iPad_Desktop_Launch.png",



      "homeScreenIconTablet@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0390_My_Quotations/144_iPad_Retina_Web_Clip.png"



    },



    "routing" : {







      "config" : {



        viewType : "XML",



        viewPath : "cus.sd.myquotations.view",



        targetAggregation : "detailPages",



        viewLevel : undefined,



        clearTarget : false



      },



      "routes" : [ {



        pattern : "",



        name : "masterDetail",



        view : "MainSplitContainer",



        viewPath : "sap.ca.scfld.md.view",



        targetControl : "fioriContent",



        targetAggregation : "pages",



        subroutes : [ {



          pattern : "",



          name : "master",



          targetControl : "MainSplitContainer",



          targetAggregation : "masterPages",



          view : "Master",



          viewLevel : 0,



          subroutes : [ {



            pattern : "detail/{contextPath}",



            view : "S3",



            name : "detail",



            viewLevel : 1



          }, {



            pattern : "noData",



            name : "noData",



            view : "empty",



            viewPath : "sap.ca.scfld.md.view",



            viewLevel : 1



          } ]



        }, {



          pattern : "products",



          name : "products",



          targetControl : "MainSplitContainer",



          targetAggregation : "masterPages",



          view : "ProductSearch",



          viewLevel : 0,



          subroutes : [ {



            pattern : "product/{materialID}",



            name : "product",



            view : "ProductDetail",



            viewLevel : 1



          }, {



            pattern : "productEmpty",



            name : "productEmpty",



            view : "empty",



            viewPath : "sap.ca.scfld.md.view",



            viewLevel : 1



          } ]



        } ]



      }, {



        pattern : "copy",



        name : "copy",



        view : "CreateQuotation",



        targetControl : "fioriContent",



        targetAggregation : "pages"



      }, {



        pattern : "edit",



        name : "edit",



        view : "CreateQuotation",



        targetControl : "fioriContent",



        targetAggregation : "pages"



      }, {



        pattern : "ItemDetails/{itemID}",



        name : "ItemDetails",



        view : "ItemDetails",



        targetControl : "fioriContent",



        targetAggregation : "pages"



      }, {



        pattern : "ItemDisplay/{itemID}",



        name : "ItemDisplay",



        view : "ItemDetails",



        targetControl : "fioriContent",



        targetAggregation : "pages"



      }, {



        pattern : "cart",



        name : "cart",



        view : "CreateQuotation",



        targetControl : "fioriContent",



        targetAggregation : "pages"



      }, {



	      pattern : "display/{contextPath}",



	      name : "display",



	      view : "S3",



	      targetControl : "fioriContent",



	      targetAggregation : "pages"



	    }]



    }



  },







  /**



   * Initialize the application



   * 



   * @returns {sap.ui.core.Control} the content



   */



  createContent : function() {



    var oViewData = {



      component : this



    };







    return sap.ui.view({



      viewName : "cus.sd.myquotations.Main",



      type : sap.ui.core.mvc.ViewType.XML,



      viewData : oViewData



    });



  }



  



});



},



	"cus/sd/myquotations/Configuration.js":function(){/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



jQuery.sap.declare("cus.sd.myquotations.Configuration");



jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");



jQuery.sap.require("sap.ca.scfld.md.app.Application");







sap.ca.scfld.md.ConfigurationBase.extend("cus.sd.myquotations.Configuration", {







  oServiceParams : {



    serviceList : [ {



      name : "zlord_my_quotation_srv",



      masterCollection : "QuotationSet",



      serviceUrl : "/sap/opu/odata/sap/zlord_my_quotation_srv/",



      isDefault : true,



      mockedDataSource : "model/metadata.xml",



      fRequestFailed : function(oEvent) {



        var errorMessage = "";



        var errorBody = $.parseJSON(oEvent.getParameter("responseText"));



        if (errorBody && errorBody.error && errorBody.error.message && errorBody.error.message.value) {



          errorMessage = errorBody.error.message.value;



        }







        var oSettings = {



          type : sap.ca.ui.message.Type.ERROR,



          message : errorMessage,



        };



        sap.ca.ui.message.showMessageBox(oSettings);



      }



    }, {



      name : "zlord_my_quotation_srv",



      masterCollection : "QuotationSet",



      serviceUrl : "/sap/opu/odata/sap/zlord_my_quotation_srv/",



      isDefault : false,



      mockedDataSource : "model/metadata.xml",



      fRequestFailed : function(oEvent) {



        var errorMessage = "";



        var errorBody = $.parseJSON(oEvent.getParameter("responseText"));



        if (errorBody && errorBody.error && errorBody.error.message && errorBody.error.message.value) {



          errorMessage = errorBody.error.message.value;



        }







        var oSettings = {



          type : sap.ca.ui.message.Type.ERROR,



          message : errorMessage,



        };



        sap.ca.ui.message.showMessageBox(oSettings);



      }



    } ]



  },







  getServiceParams : function() {



    return this.oServiceParams;



  },







  /**



   * @inherit



   */



  getServiceList : function() {



    return this.getServiceParams().serviceList;



  },







  getMasterKeyAttributes : function() {



		//return the key attribute of your master list item



    return [ "QuotationID", "MaterialId" ];



  },







  /**



   * Forward application facade reference to ModelExtractor and Formatter



   * 



   * @param oApplicationFacade



   */



  setApplicationFacade : function(oApplicationFacade) {



    cus.sd.myquotations.util.ModelExtractor.setApplicationFacade(oApplicationFacade);



    cus.sd.myquotations.util.Formatter.setApplicationFacade(oApplicationFacade);



  }



});







},



	"cus/sd/myquotations/Main.controller.js":function(){/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



sap.ui.controller("cus.sd.myquotations.Main", {







  onInit : function() {



    jQuery.sap.require("sap.ca.scfld.md.Startup");



    jQuery.sap.require("cus.sd.myquotations.util.Formatter");



    jQuery.sap.require("cus.sd.myquotations.util.ModelExtractor");



    



    sap.ca.scfld.md.Startup.init('cus.sd.myquotations', this);



  }



});



},



	"cus/sd/myquotations/Main.view.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n<core:View xmlns="sap.m" xmlns:core="sap.ui.core" controllerName="cus.sd.myquotations.Main" displayBlock="true" height="100%">\r\n\t<NavContainer id="fioriContent" />\r\n</core:View>',



	"cus/sd/myquotations/i18n/i18n.properties":'# My Quotations\r\n# __ldi.translation.uuid=39792250-06a4-11e3-8ffd-0800200c9a66\r\n# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=My Quotations ({0})\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=Details\r\n\r\n#XTIT: this is the title for Customer List\r\nCUSTOMERLIST_TITLE=Select Customer\r\n\r\n#XTIT: this is the title for Customer List\r\nCONTACTOVERVIEW_TITLE=Contact Overview\r\n\r\n#XTIT, 35: Application name\r\nAPPLICATION_NAME=My Quotations\r\n\r\n# XTIT, 20:Title for the sales order list\r\nQUOTATIONS=Quotations\r\n\r\n# XFLD, 30:Label for quotation number\r\nQUOTATION=Quotation {0}\n\r\n# XFLD, 30:Label for quotation number\r\nQUOTATION_VALUE={0}: {1} \r\n\r\n#XFLD, 10: Label for ship to\r\nSHIPTO=Ship-To Party\r\n\r\n#XFLD, 35: Label for Requested Delivery Date\r\nREQUESTED_DELIVERY_DATE=Requested Delivery Date\r\n\r\n#XFLD, 35: Label for Requested Delivery Date items table\r\nREQUESTED_DELIVERY_DATE_TABLE=Requested Delivery Date\r\n\r\n#XFLD, 30: label for dates valid from / to\r\nVALID_FROM_TO=Valid From/To\r\n\r\n#XFLD, 20: column title for list of materials\r\nDESCRIPTION=Description\r\n\r\n#XFLD, 15: column title for list of materials\r\nQUANTITY=Quantity\r\n\r\n#XFLD, 20: availability status (in stock or not), column title for list of materials\r\nAVAILABILITY=Availability\r\n\r\n#XFLD, 20: price of material, column title for list of materials\r\nLIST_PRICE=List Price\r\n\r\n#XFLD, 20: gross price of material, column title for list of materials\r\nGROSS_PRICE=Gross Price\r\n\r\n#XFLD, 20: price of material, column title for list of materials\r\nLIST_PRICE_VALUE={0}, List Price\r\n\r\n#XFLD, 15: discount in percentage, column title for list of materials\r\nDISCOUNT_TITLE=Discount\r\n\r\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\r\nNET_VALUE=Net Value\r\n\r\n#XFLD , 20: label for net value\r\nNETVALUE_VALUE={0}, Net Value\r\n\r\n#XFLD, 10: items title for a table\r\nITEMS=Item Details ({0})\r\n\r\n#XBUT , 15: label for button\r\nCOPY_QUOTE=Copy\r\n\r\n#XBUT , 10: label for button\r\nEDIT=Edit\r\n\r\n#XFLD, 15: label for overall discount in the header\r\nOVERALL_DISCOUNT=Overall Discount Percentage\r\n\r\n#XFLD, 15: label for overall discount in the header\r\nOVERALL_DISCOUNT_VALUE=Overall Discount: {0}\r\n\r\n#XFLD, 30: Sort field Expiry Date\r\nSORT_EXPIRY_DATE=Expiry Date\r\n\r\n#XFLD, 30: Sort field Amount\r\nSORT_AMOUNT=Net Value\r\n\r\n#XFLD, 30: Sort field Status\r\nSORT_STATUS=Status\r\n\r\n#XFLD, 40: Sort field Creation Date\r\nSORT_CREATION_DATE=Creation Date\r\n\r\n#XFLD, 10: Label for sold to\r\nSOLDTO=Sold-To Party\r\n\r\n#XFLD, 20: label for payment tersm\r\nPAYMENT_TERMS=Payment Terms\r\n\r\n#XFLD, 20: Label for expiry date \r\nEXPIRES=Expiry Date\r\n\r\n#XFLD, 20: Label for expiry date \r\nEXPIRES_VALUE=Expiry Date: {0}\r\n\r\n#XFLD, 30: quotation status type\r\nSTATUS_OPEN=Open\r\n\r\n#XFLD, 40: quotation status type\r\nSTATUS_COMPLETED=Completed\r\n\r\n#XFLD, 50: quotation status type\r\nSTATUS_INPROCESS=Being Processed\r\n\r\n#XBUT , 10: label for button\r\nCANCEL=Cancel\r\n\r\n#XFLD , 20: label for net value\r\nNETVALUE=Net Value\r\n\r\n#XFLD , 10: label for Tax\r\nTAX=Tax\r\n\r\n#XFLD , 10: label for Total\r\nTOTAL=Total\r\n\r\n# XTIT, 20:Title for Quotation Details\r\nQUOTATIONDETAILS=Quotation Details\r\n\r\n#XFLD, 20: Label for ship to address\r\nSHIPTOADDRESS=Ship-To Party Address\r\n\r\n#XFLD, 30: label for material groups\r\nMATERIALGROUP=Material Group\r\n\r\n#XFLD, 15: label for division\r\nDIVISION=Division\r\n\r\n#XFLD, 30: label for gross weight\r\nGROSSWEIGHT=Gross Weight\r\n\r\n#XFLD, 30: label for net weight\r\nNETWEIGHT=Net Weight\r\n\r\n#XFLD, 15: label for dimensions \r\nDIMENSIONS=Dimensions\r\n\r\n#XFLD, 15: label for dimensions \r\nVOLUME=Volume\r\n\r\n# XTIT, 20:Title for Materials Search\r\nMATERIALS=Materials ({0})\r\n\r\n#XFLD, 30: label for Country\r\nCOUNTRY=Country\r\n\r\n#XFLD, 30: label for Street/House number\r\nSTREET=Street/House Number\r\n\r\n#XFLD, 30: label for Postal Code\r\nPOSTALCODE=Postal Code/City \r\n\r\n# XTIT, 20:Title for Customer Details\r\nCUSTOMER_DETAIL=Customer Details\r\n\r\n#YMSG, 50: label for add to cart message toast up\r\nMATERIAL_MSG_ADDED_TO_CAR=Material added to cart\r\n\r\n\r\n#YMSG, 50: message indicating Note Created \r\nNOTE_CREATED=Note Created\r\n\r\n#YMSG, 50: message indicating Note Creation Failed\r\nNOTE_CREATION_FAILD=Note Creation Failed\r\n\r\n#YMSG, 50: message if Valid From Date is empty \r\nUNSPECIFIED_VALUE=Unspecified\r\n\r\n#YMSG, 50: Date (Valid From) - (To)\r\nDATE_VALID_FROMTO={0} - {1}\r\n\r\n#YMSG, 50: Deleted from cart\r\nITEMSREMOVED=Item {0}-{1} was removed\r\n\r\n#XFLD, 40: Customer Reference\r\nCUSTREF=Customer Reference\r\n\r\n#XFLD, 20: PO Number\r\nCREATED_ON=Created On\r\n\n#XBUT, 10: filter popover button\r\nOK=OK\r\n\r\n#XBUT, 20: filter popover button\r\nRESET=Reset\r\n\r\n#XBUT, 10: filter popover button\r\nADDTOCART=Add to Cart\r\n\r\n# XTIT, 40:Title for the sales order list\r\nADDMATTOCART=Add Materials to Cart\r\n\r\n# XTIT, 50: Title of popup\r\nLOOSEALLCHANGES=Unsaved changes will be lost. Do you want to continue?\r\n\r\n#YMSG, 50: Display message\r\nWARNING=Warning\r\n\r\n#YMSG, 50: Display ERROR title\r\nERROR=Error\r\n\r\n#XTIT, 50: title for country value help\r\nCOUNTRYLIST_TITLE=Select Country\r\n\r\n#YMSG, 50: message indicating no results are returned from a search\r\nNODATA=No results found\n\r\n#YMSG, 50: message indicating a security token was not received\r\nREFRESHSECURITYTOKENFAILED=Security token failed. Please restart My Quotations. \r\n\r\n#XBUT, 12: Icon tab Info\r\nICON_INFO=Information\r\n\r\n#XBUT, 12: Icon tab Notes\r\nICON_NOTES=Notes\r\n\r\n#XBUT, 12: Icon tab Attachments\r\nICON_ATTACHMENTS=Attachments\r\n\r\n#XBUT, 20: Icon tab Contacts\r\nICON_CONTACTS=Contacts\r\n\r\n#YINS, 50: message shown when user enters incorrect country\r\nENTER_VALID_COUNTRY=Enter a valid country\r\n\r\n#YINS, 60: message indicating invalid quantity\r\nENTER_VALID_QUANTITY=Enter a number greater than 0\r\n\n#YINS, 50: message shown when user leaves country field blank\r\nENTER_COUNTRY=Enter a country\r\n\r\n#YINS, 50: message shown when user leaves request delivery date empty\r\nENTER_REQDELDATE=Enter a date\r\n\r\n#XBUT, 20: refresh button for items list in review screen\r\nREFRESH=Refresh \r\n\r\n#YINS, 60: message indicating invalid discount\r\nENTER_VALID_DISCOUNT=Enter a valid discount percentage\r\n\r\n#YINS, 50: message indicating that mandatory field Street is not filled\r\nENTER_STREET=Enter a street\r\n\r\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\r\nENTER_POSTALCODE=Enter a postal code\r\n\r\n#YINS, 50: message indicating that mandatory field City is not filled\r\nENTER_CITY=Enter a city\r\n\r\n#YINS, 60: message indicating invalid overall discount \r\nENTER_VALID_OVERALL_DISCOUNT=Enter a valid overall discount. The value provided must be a percentage.\r\n\r\n#YMSG, 30: message shown when quotation is successfully created\r\nQUOTATION_CREATED_MSG_WITH_ID=Quotation {0} created\r\n\r\n#YMSG, 30: message shown when quotation is successfully updated\r\nQUOTATION_UPDATED_MSG_WITH_ID=Quotation {0} updated\r\n\r\n#YMSG, 50: Display success title\r\nSUCCESSTITLE=SUCCESS\r\n\r\n#YMSG, 100: message shown when quotation is created with warnings\r\nQUOTATION_CREATED_WARN_MSG=Quotation {0} created with warnings.\r\n\r\n#YMSG, 100: message shown when quotation is updated with warnings\r\nQUOTATION_UPDATED_WARN_MSG=Quotation {0} updated with warnings.\r\n\r\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\r\nCHECKERRORS=Provide valid entries in all mandatory fields \r\n\r\n#YMSG, 50: Title message for mandatory fields dialog\r\nMANDATORYTITLE=Mandatory Fields \r\n\r\n#YMSG, 60: message shown when quotation could not be created due to errors\r\nQUOTATION_CREATE_ERR_MSG=Quotation could not be created. {0}.\r\n\r\n#YMSG, 60: message shown when document is loading\r\nLOADING=Loading\r\n\r\n#XBUT, 20: add button for items list in review screen\r\nADD=Add\r\n\r\n#YINS, 60: message shown when the date range is invalid\r\nENTER_VALID_DATE_RANGE=Enter a valid date range\r\n\r\n#YMSG, 60: message shown when quotation could not be updated due to errors\r\nQUOTATION_UPDATE_ERR_MSG=Quotation could not be updated. {0}.\r\n\r\n#XTIT, 20:Title for page to create/review quotation\r\nREVIEWANDCREATEQUOTATION=Review and Create Quotation\r\n\r\n#XTIT, 20:Title for page to update/review quotation\r\nREVIEWANDUPDATEQUOTATION=Review and Edit Quotation {0}\r\n\r\n#XBUT, 10: label for submit button on create/edit quotation form\r\nSAVEQUOTE=Save\r\n\r\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\r\nSELECTCUSTOMER_TITLE=Select Customer\n\r\n#YMSG, 20: text Expiry message\r\nEXPIRY_MSG= Expires in {0} days\r\n\r\n#YMSG, 20: text Expiry message\r\nEXPIRY_TODAY=Expires today\r\n\r\n#YMSG, 20: text Expiry message\r\nEXPIRY_TOMORROW=Expires tomorrow\r\n\r\n#XFLD, 40: House number and street name\r\nHOUSE_NB_STREET={0} {1}\r\n\r\n#XFLD, 40: Unit followed by currency\r\nUNITCURRENCY={0} {1}\r\n\r\n#XFLD, 50: postal code, city, country in details view\r\nCITY_COUNTRY={0} {1} {2}\r\n\r\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \r\nFILTER_EXPIRY=Expiry Date\r\n\r\n#XFLD, 40: Top level filter field: user filters on quotation status \r\nFILTER_STATUS=Overall Status\r\n\r\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \r\nFILTER_EXPIRY_EXPIRED=Expired\r\n\r\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\r\nFILTER_EXPIRY_UNEXPIRED=Not Expired\r\n\r\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\r\nFILTER_EXPIRY_DAYS_TODAY=Expire Today\r\n\r\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\r\nFILTER_EXPIRY_DAYS_TOMORROW=Expire Tomorrow\r\n\r\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\r\nFILTER_EXPIRY_DAYS_IN=Expire in the Next {0} Days\n\r\n#XTIT, 50: Title message for the cancel add products confirmation message\r\nCANCEL_ADD_TITLE=Confirmation\r\n\r\n#YMSG, 50: message shown when material description is empty\r\nNO_MATERIAL_DESC=No Description Available\r\n\r\n#YMSG, 50: message appended to an error message when the refresh failed\r\nCHOOSE_REFRESH=Choose "Refresh" to update pricing information\r\n\r\n#XFLD, 15: quantity with unit ex: 1.0 Each\r\nQUANTITY_UNIT={0} {1}\n\r\n#XBUT, 20: reject button for items list in review screen\r\nREJECTALL=Reject All\r\n\r\n#XBUT, 20: Done button item details\r\nDONE=Done\r\n\r\n#XFLD, 30: reject label for list pop up\r\nREJECTLABEL=Choose a reason to reject all items:\r\n\r\n#XFLD, 30: Material number\r\nMATERIALNUMBER=Material Number\r\n\r\n#XFLD, 30: Reason for Rejection\r\nREASONREJECTION=Reason for Rejection\r\n\r\n#XFLD, 30: Processing Status in Table\r\nPROCESSTATUS=Processing Status\r\n\r\n#XFLD, 30: Rejected in Table items\r\nREJECTED=Rejected\r\n\r\n#XTIT: title for reject all popup\r\nREJECTTITLE=Reasons for Rejection\r\n\r\n#XTIT: title for reject \r\nITEM_DETAILS=Item Details\r\n\r\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\r\nNONE=None\r\n\r\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \r\nFILTER_REJ_STATUS=Rejection Status\r\n\r\n#XFLD, 40: quotation rejection status type\r\nSTATUS_NOT_REJ=Not rejected\r\n\r\n#XFLD, 40: quotation rejection status type\r\nSTATUS_PART_REJ=Partially rejected\r\n\r\n#XFLD, 40: quotation rejection status type\r\nSTATUS_ALL_REJ=Fully rejected\r\n\r\n#XFLD, 40: quotation Referenced status type\r\nSTATUS_NOT_REF=Not referenced\r\n\r\n#XFLD, 40: quotation Referenced status type\r\nSTATUS_PART_REF=Partially referenced\r\n\r\n#XFLD, 40: quotation Referenced status type\r\nSTATUS_PART_REFJEC=Partially rejected / Partially referenced\r\n\r\n#XFLD, 40: quotation Referenced status type\r\nSTATUS_ALL_REF=Fully referenced\r\n\r\n#XFLD, 40: quotation rejection status type\r\nSTATUS_FULL_REJ=Fully rejected\r\n\r\n#XFLD, 30: label for rejection status\r\nREJECTION_STATUS=Rejection Status\r\n\r\n#XFLD, 30: label for rejection status\r\nREJECSTATUSLABEL=Rejection Status\r\n\r\n#YMSG, 50: Display error title\r\nERRORTITLE=ERROR\r\n\r\n#XFLD, 30: Reference Status\r\nREFSTATUS=Reference Status',



	"cus/sd/myquotations/i18n/i18n_ar.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u0639\\u0631\\u0648\\u0636 \\u0623\\u0633\\u0639\\u0627\\u0631\\u064A ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=\\u062A\\u062D\\u062F\\u064A\\u062F \\u0627\\u0644\\u0639\\u0645\\u064A\\u0644\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=\\u0646\\u0638\\u0631\\u0629 \\u0639\\u0627\\u0645\\u0629 \\u0639\\u0644\\u0649 \\u062C\\u0647\\u0627\\u062A \\u0627\\u0644\\u0627\\u062A\\u0635\\u0627\\u0644\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=\\u0639\\u0631\\u0648\\u0636 \\u0623\\u0633\\u0639\\u0627\\u0631\\u064A\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=\\u0639\\u0631\\u0648\\u0636 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631\n\n# XFLD, 30:Label for quotation number\nQUOTATION=\\u0639\\u0631\\u0636 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631 {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=\\u0645\\u0633\\u062A\\u0644\\u0650\\u0645 \\u0627\\u0644\\u0634\\u062D\\u0646\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u062A\\u0633\\u0644\\u064A\\u0645 \\u0627\\u0644\\u0645\\u0637\\u0644\\u0648\\u0628\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u062A\\u0633\\u0644\\u064A\\u0645 \\u0627\\u0644\\u0645\\u0637\\u0644\\u0648\\u0628\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=\\u0635\\u0627\\u0644\\u062D \\u0645\\u0646/\\u0625\\u0644\\u0649\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=\\u0627\\u0644\\u0648\\u0635\\u0641\n\n#XFLD, 15: column title for list of materials\nQUANTITY=\\u0627\\u0644\\u0643\\u0645\\u064A\\u0629\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=\\u0627\\u0644\\u062A\\u0648\\u0641\\u0631\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=\\u0633\\u0639\\u0631 \\u0628\\u0642\\u0627\\u0626\\u0645\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=\\u0627\\u0644\\u0633\\u0639\\u0631 \\u0627\\u0644\\u0625\\u062C\\u0645\\u0627\\u0644\\u064A\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}\\u060C \\u0633\\u0639\\u0631 \\u0645\\u062F\\u0631\\u062C \\u0628\\u0642\\u0627\\u0626\\u0645\\u0629 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=\\u0627\\u0644\\u062E\\u0635\\u0645\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=\\u0635\\u0627\\u0641\\u064A \\u0627\\u0644\\u0642\\u064A\\u0645\\u0629\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}\\u060C \\u0635\\u0627\\u0641\\u064A \\u0627\\u0644\\u0642\\u064A\\u0645\\u0629\n\n#XFLD, 10: items title for a table\nITEMS=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0628\\u0646\\u062F ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=\\u0646\\u0633\\u062E\n\n#XBUT , 10: label for button\nEDIT=\\u062A\\u062D\\u0631\\u064A\\u0631\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=\\u0646\\u0633\\u0628\\u0629 \\u0627\\u0644\\u062E\\u0635\\u0645 \\u0627\\u0644\\u0643\\u0644\\u064A\\u0629\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=\\u0627\\u0644\\u062E\\u0635\\u0645 \\u0627\\u0644\\u0643\\u0644\\u064A\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0646\\u062A\\u0647\\u0627\\u0621 \\u0627\\u0644\\u0635\\u0644\\u0627\\u062D\\u064A\\u0629\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=\\u0635\\u0627\\u0641\\u064A \\u0627\\u0644\\u0642\\u064A\\u0645\\u0629\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=\\u0627\\u0644\\u062D\\u0627\\u0644\\u0629\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u0625\\u0646\\u0634\\u0627\\u0621\n\n#XFLD, 10: Label for sold to\nSOLDTO=\\u0627\\u0644\\u0645\\u0648\\u0643\\u0651\\u0650\\u0644\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=\\u0634\\u0631\\u0648\\u0637 \\u0627\\u0644\\u062F\\u0641\\u0639\n\n#XFLD, 20: Label for expiry date \nEXPIRES=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0646\\u062A\\u0647\\u0627\\u0621 \\u0635\\u0644\\u0627\\u062D\\u064A\\u0629\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0646\\u062A\\u0647\\u0627\\u0621 \\u0627\\u0644\\u0635\\u0644\\u0627\\u062D\\u064A\\u0629\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=\\u0645\\u0641\\u062A\\u0648\\u062D\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=\\u0645\\u0643\\u062A\\u0645\\u0644\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=\\u062C\\u0627\\u0631\\u064D \\u0645\\u0639\\u0627\\u0644\\u062C\\u062A\\u0647\n\n#XBUT , 10: label for button\nCANCEL=\\u0625\\u0644\\u063A\\u0627\\u0621\n\n#XFLD , 20: label for net value\nNETVALUE=\\u0635\\u0627\\u0641\\u064A \\u0627\\u0644\\u0642\\u064A\\u0645\\u0629\n\n#XFLD , 10: label for Tax\nTAX=\\u0627\\u0644\\u0636\\u0631\\u064A\\u0628\\u0629\n\n#XFLD , 10: label for Total\nTOTAL=\\u0627\\u0644\\u0625\\u062C\\u0645\\u0627\\u0644\\u064A\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0639\\u0631\\u0648\\u0636 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=\\u0639\\u0646\\u0648\\u0627\\u0646 \\u0645\\u0633\\u062A\\u0644\\u0645 \\u0627\\u0644\\u0634\\u062D\\u0646\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=\\u0645\\u062C\\u0645\\u0648\\u0639\\u0629 \\u0627\\u0644\\u0645\\u0648\\u0627\\u062F\n\n#XFLD, 15: label for division\nDIVISION=\\u0627\\u0644\\u0642\\u0633\\u0645\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=\\u0627\\u0644\\u0648\\u0632\\u0646 \\u0627\\u0644\\u0625\\u062C\\u0645\\u0627\\u0644\\u064A\n\n#XFLD, 30: label for net weight\nNETWEIGHT=\\u0627\\u0644\\u0648\\u0632\\u0646 \\u0627\\u0644\\u0635\\u0627\\u0641\\u064A\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=\\u0627\\u0644\\u0623\\u0628\\u0639\\u0627\\u062F\n\n#XFLD, 15: label for dimensions \nVOLUME=\\u0627\\u0644\\u062D\\u062C\\u0645\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=\\u0627\\u0644\\u0645\\u0648\\u0627\\u062F ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=\\u0627\\u0644\\u062F\\u0648\\u0644\\u0629\n\n#XFLD, 30: label for Street/House number\nSTREET=\\u0627\\u0644\\u0634\\u0627\\u0631\\u0639/\\u0631\\u0642\\u0645 \\u0627\\u0644\\u0645\\u0646\\u0632\\u0644\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=\\u0627\\u0644\\u0631\\u0645\\u0632 \\u0627\\u0644\\u0628\\u0631\\u064A\\u062F\\u064A/\\u0627\\u0644\\u0645\\u062F\\u064A\\u0646\\u0629\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0639\\u0645\\u064A\\u0644\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=\\u062A\\u0645\\u062A \\u0625\\u0636\\u0627\\u0641\\u0629 \\u0627\\u0644\\u0645\\u0627\\u062F\\u0629 \\u0625\\u0644\\u0649 \\u0639\\u0631\\u0628\\u0629 \\u0627\\u0644\\u062A\\u0633\\u0648\\u0642\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=\\u062A\\u0645 \\u0625\\u0646\\u0634\\u0627\\u0621 \\u0645\\u0644\\u0627\\u062D\\u0638\\u0629\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=\\u0644\\u0645 \\u064A\\u062A\\u0645 \\u0625\\u0646\\u0634\\u0627\\u0621 \\u0645\\u0644\\u0627\\u062D\\u0638\\u0629\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=\\u063A\\u064A\\u0631 \\u0645\\u062D\\u062F\\u062F\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=\\u062A\\u0645 \\u062D\\u0630\\u0641 \\u0627\\u0644\\u0628\\u0646\\u062F {0}-{1}\n\n#XFLD, 40: Customer Reference\nCUSTREF=\\u0645\\u0631\\u062C\\u0639 \\u0627\\u0644\\u0639\\u0645\\u064A\\u0644\n\n#XFLD, 20: PO Number\nCREATED_ON=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u0625\\u0646\\u0634\\u0627\\u0621\n\n#XBUT, 10: filter popover button\nOK=\\u0645\\u0648\\u0627\\u0641\\u0642\n\n#XBUT, 20: filter popover button\nRESET=\\u0625\\u0639\\u0627\\u062F\\u0629 \\u062A\\u0639\\u064A\\u064A\\u0646\n\n#XBUT, 10: filter popover button\nADDTOCART=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0625\\u0644\\u0649 \\u0639\\u0631\\u0628\\u0629 \\u0627\\u0644\\u062A\\u0633\\u0648\\u0642\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0645\\u0648\\u0627\\u062F \\u0625\\u0644\\u0649 \\u0639\\u0631\\u0628\\u0629 \\u0627\\u0644\\u062A\\u0633\\u0648\\u0642\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=\\u0633\\u064A\\u062A\\u0645 \\u0641\\u0642\\u062F\\u0627\\u0646 \\u0627\\u0644\\u062A\\u063A\\u064A\\u064A\\u0631\\u0627\\u062A \\u063A\\u064A\\u0631 \\u0627\\u0644\\u0645\\u062D\\u0641\\u0648\\u0638\\u0629. \\u0647\\u0644 \\u062A\\u0631\\u064A\\u062F \\u0627\\u0644\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629\\u061F\n\n#YMSG, 50: Display message\nWARNING=\\u062A\\u062D\\u0630\\u064A\\u0631\n\n#YMSG, 50: Display ERROR title\nERROR=\\u062E\\u0637\\u0623\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=\\u062A\\u062D\\u062F\\u064A\\u062F \\u0627\\u0644\\u062F\\u0648\\u0644\\u0629\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=\\u0644\\u0645 \\u064A\\u062A\\u0645 \\u0627\\u0644\\u0639\\u062B\\u0648\\u0631 \\u0639\\u0644\\u0649 \\u0623\\u064A \\u0646\\u062A\\u0627\\u0626\\u062C\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=\\u0641\\u0634\\u0644 \\u0627\\u0644\\u0631\\u0645\\u0632 \\u0627\\u0644\\u0645\\u0645\\u064A\\u0632 \\u0644\\u0644\\u0623\\u0645\\u0627\\u0646. \\u0627\\u0644\\u0631\\u062C\\u0627\\u0621 \\u0625\\u0639\\u0627\\u062F\\u0629 \\u062A\\u0634\\u063A\\u064A\\u0644 \\u062A\\u0637\\u0628\\u064A\\u0642 \\u0639\\u0631\\u0648\\u0636 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631 \\u0627\\u0644\\u062E\\u0627\\u0635\\u0629 \\u0628\\u064A.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=\\u0645\\u0639\\u0644\\u0648\\u0645\\u0627\\u062A\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=\\u0645\\u0644\\u0627\\u062D\\u0638\\u0627\\u062A\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=\\u0645\\u0631\\u0641\\u0642\\u0627\\u062A\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=\\u062C\\u0647\\u0627\\u062A \\u0627\\u0644\\u0627\\u062A\\u0635\\u0627\\u0644\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=\\u0623\\u062F\\u062E\\u0644 \\u062F\\u0648\\u0644\\u0629 \\u0635\\u0627\\u0644\\u062D\\u0629\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=\\u0623\\u062F\\u062E\\u0644 \\u0631\\u0642\\u0645\\u064B\\u0627 \\u0623\\u0643\\u0628\\u0631 \\u0645\\u0646 0\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=\\u0623\\u062F\\u062E\\u0644 \\u062F\\u0648\\u0644\\u0629\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=\\u0623\\u062F\\u062E\\u0644 \\u062A\\u0627\\u0631\\u064A\\u062E\\u064B\\u0627\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=\\u062A\\u062D\\u062F\\u064A\\u062B\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=\\u0623\\u062F\\u062E\\u0644 \\u0646\\u0633\\u0628\\u0629 \\u062E\\u0635\\u0645 \\u0635\\u0627\\u0644\\u062D\\u0629\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=\\u0623\\u062F\\u062E\\u0644 \\u0634\\u0627\\u0631\\u0639\\u064B\\u0627\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=\\u0623\\u062F\\u062E\\u0644 \\u0627\\u0644\\u0631\\u0645\\u0632 \\u0627\\u0644\\u0628\\u0631\\u064A\\u062F\\u064A\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=\\u0623\\u062F\\u062E\\u0644 \\u0645\\u062F\\u064A\\u0646\\u0629\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=\\u0623\\u062F\\u062E\\u0644 \\u062E\\u0635\\u0645\\u064B\\u0627 \\u0643\\u0644\\u064A\\u064B\\u0627 \\u0635\\u0627\\u0644\\u062D\\u064B\\u0627. \\u064A\\u062C\\u0628 \\u0623\\u0646 \\u062A\\u0643\\u0648\\u0646 \\u0627\\u0644\\u0642\\u064A\\u0645\\u0629 \\u0627\\u0644\\u0645\\u062F\\u062E\\u0644\\u0629 \\u0646\\u0633\\u0628\\u0629 \\u0645\\u0626\\u0648\\u064A\\u0629.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=\\u062A\\u0645 \\u0625\\u0646\\u0634\\u0627\\u0621 \\u0639\\u0631\\u0636 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631 {0}\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=\\u062A\\u0645 \\u062A\\u062D\\u062F\\u064A\\u062B \\u0639\\u0631\\u0636 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631 {0}\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=\\u0646\\u062C\\u0627\\u062D\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=\\u062A\\u0645 \\u0625\\u0646\\u0634\\u0627\\u0621 \\u0639\\u0631\\u0636 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631 {0} \\u0628\\u062A\\u062D\\u0630\\u064A\\u0631\\u0627\\u062A.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=\\u062A\\u0645 \\u062A\\u062D\\u062F\\u064A\\u062B \\u0639\\u0631\\u0636 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631 {0} \\u0628\\u062A\\u062D\\u0630\\u064A\\u0631\\u0627\\u062A.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=\\u0623\\u062F\\u062E\\u0644 \\u0642\\u064A\\u0645\\u064B\\u0627 \\u0635\\u0627\\u0644\\u062D\\u0629 \\u0641\\u064A \\u062C\\u0645\\u064A\\u0639 \\u0627\\u0644\\u062D\\u0642\\u0648\\u0644 \\u0627\\u0644\\u0625\\u0644\\u0632\\u0627\\u0645\\u064A\\u0629\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=\\u062D\\u0642\\u0648\\u0644 \\u0625\\u0644\\u0632\\u0627\\u0645\\u064A\\u0629\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=\\u062A\\u0639\\u0630\\u0631 \\u0625\\u0646\\u0634\\u0627\\u0621 \\u0639\\u0631\\u0636 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=\\u062C\\u0627\\u0631\\u064D \\u0627\\u0644\\u062A\\u062D\\u0645\\u064A\\u0644...\n\n#XBUT, 20: add button for items list in review screen\nADD=\\u0625\\u0636\\u0627\\u0641\\u0629\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=\\u0623\\u062F\\u062E\\u0644 \\u0646\\u0637\\u0627\\u0642 \\u062A\\u0648\\u0627\\u0631\\u064A\\u062E \\u0635\\u0627\\u0644\\u062D\\u064B\\u0627\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=\\u062A\\u0639\\u0630\\u0631 \\u062A\\u062D\\u062F\\u064A\\u062B \\u0639\\u0631\\u0636 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=\\u0645\\u0631\\u0627\\u062C\\u0639\\u0629 \\u0648\\u0625\\u0646\\u0634\\u0627\\u0621 \\u0639\\u0631\\u0636 \\u0623\\u0633\\u0639\\u0627\\u0631\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=\\u0645\\u0631\\u0627\\u062C\\u0639\\u0629 \\u0639\\u0631\\u0636 \\u0627\\u0644\\u0623\\u0633\\u0639\\u0627\\u0631 {0} \\u0648\\u062A\\u062D\\u0631\\u064A\\u0631\\u0647\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=\\u062D\\u0641\\u0638\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=\\u062A\\u062D\\u062F\\u064A\\u062F \\u0627\\u0644\\u0639\\u0645\\u064A\\u0644\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=\\u062A\\u0646\\u062A\\u0647\\u064A \\u0635\\u0644\\u0627\\u062D\\u064A\\u062A\\u0647 \\u0641\\u064A \\u063A\\u0636\\u0648\\u0646 {0} \\u0645\\u0646 \\u0627\\u0644\\u0623\\u064A\\u0627\\u0645\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=\\u062A\\u0646\\u062A\\u0647\\u064A \\u0627\\u0644\\u0635\\u0644\\u0627\\u062D\\u064A\\u0629 \\u0627\\u0644\\u064A\\u0648\\u0645\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=\\u062A\\u0646\\u062A\\u0647\\u064A \\u0627\\u0644\\u0635\\u0644\\u0627\\u062D\\u064A\\u0629 \\u063A\\u062F\\u064B\\u0627\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={0} {1}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0646\\u062A\\u0647\\u0627\\u0621 \\u0627\\u0644\\u0635\\u0644\\u0627\\u062D\\u064A\\u0629\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=\\u0627\\u0644\\u062D\\u0627\\u0644\\u0629 \\u0627\\u0644\\u0643\\u0644\\u064A\\u0629\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=\\u0645\\u0646\\u062A\\u0647\\u064A \\u0627\\u0644\\u0635\\u0644\\u0627\\u062D\\u064A\\u0629\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=\\u063A\\u064A\\u0631 \\u0645\\u0646\\u062A\\u0647\\u064A \\u0627\\u0644\\u0635\\u0644\\u0627\\u062D\\u064A\\u0629\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=\\u062A\\u0646\\u062A\\u0647\\u064A \\u0635\\u0644\\u0627\\u062D\\u064A\\u062A\\u0647\\u0627 \\u0627\\u0644\\u064A\\u0648\\u0645\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=\\u062A\\u0646\\u062A\\u0647\\u064A \\u0635\\u0644\\u0627\\u062D\\u064A\\u062A\\u0647\\u0627 \\u063A\\u062F\\u064B\\u0627\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=\\u062A\\u0646\\u062A\\u0647\\u064A \\u0635\\u0644\\u0627\\u062D\\u064A\\u062A\\u0647 \\u0641\\u064A \\u063A\\u0636\\u0648\\u0646 {0} (\\u064A\\u0648\\u0645) \\u0623\\u064A\\u0627\\u0645 \\u0627\\u0644\\u0642\\u0627\\u062F\\u0645\\u0629\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=\\u062A\\u0623\\u0643\\u064A\\u062F\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=\\u0644\\u0627 \\u064A\\u062A\\u0648\\u0641\\u0631 \\u0623\\u064A \\u0648\\u0635\\u0641\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=\\u0627\\u062E\\u062A\\u0631 "\\u062A\\u062D\\u062F\\u064A\\u062B" \\u0644\\u062A\\u062D\\u062F\\u064A\\u062B \\u0645\\u0639\\u0644\\u0648\\u0645\\u0627\\u062A \\u0627\\u0644\\u062A\\u0633\\u0639\\u064A\\u0631.\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=\\u0631\\u0641\\u0636 \\u0627\\u0644\\u0643\\u0644\n\n#XBUT, 20: Done button item details\nDONE=\\u062A\\u0645\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=\\u0627\\u062E\\u062A\\u0631 \\u0633\\u0628\\u0628\\u064B\\u0627 \\u0644\\u0631\\u0641\\u0636 \\u062C\\u0645\\u064A\\u0639 \\u0627\\u0644\\u0639\\u0646\\u0627\\u0635\\u0631\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=\\u0631\\u0642\\u0645 \\u0627\\u0644\\u0645\\u0627\\u062F\\u0629\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=\\u0633\\u0628\\u0628 \\u0627\\u0644\\u0631\\u0641\\u0636\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=\\u062D\\u0627\\u0644\\u0629 \\u0627\\u0644\\u0645\\u0639\\u0627\\u0644\\u062C\\u0629\n\n#XFLD, 30: Rejected in Table items\nREJECTED=\\u0645\\u0631\\u0641\\u0648\\u0636\n\n#XTIT: title for reject all popup\nREJECTTITLE=\\u0623\\u0633\\u0628\\u0627\\u0628 \\u0627\\u0644\\u0631\\u0641\\u0636\n\n#XTIT: title for reject \nITEM_DETAILS=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0628\\u0646\\u062F\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=\\u0644\\u0627 \\u0634\\u064A\\u0621\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=\\u062D\\u0627\\u0644\\u0629 \\u0627\\u0644\\u0631\\u0641\\u0636\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=\\u063A\\u064A\\u0631 \\u0645\\u0631\\u0641\\u0648\\u0636\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=\\u0645\\u0631\\u0641\\u0648\\u0636 \\u062C\\u0632\\u0626\\u064A\\u064B\\u0627\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=\\u0645\\u0631\\u0641\\u0648\\u0636 \\u0628\\u0627\\u0644\\u0643\\u0627\\u0645\\u0644\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=\\u063A\\u064A\\u0631 \\u0645\\u0634\\u0627\\u0631 \\u0625\\u0644\\u064A\\u0647\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=\\u0645\\u0634\\u0627\\u0631 \\u0625\\u0644\\u064A\\u0647 \\u062C\\u0632\\u0626\\u064A\\u064B\\u0627\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=\\u0645\\u0631\\u0641\\u0648\\u0636/\\u0645\\u0634\\u0627\\u0631 \\u0625\\u0644\\u064A\\u0647 \\u062C\\u0632\\u0626\\u064A\\u064B\\u0627\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=\\u0645\\u0634\\u0627\\u0631 \\u0625\\u0644\\u064A\\u0647 \\u0628\\u0627\\u0644\\u0643\\u0627\\u0645\\u0644\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=\\u0645\\u0631\\u0641\\u0648\\u0636 \\u0628\\u0627\\u0644\\u0643\\u0627\\u0645\\u0644\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=\\u062D\\u0627\\u0644\\u0629 \\u0627\\u0644\\u0631\\u0641\\u0636\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=\\u062D\\u0627\\u0644\\u0629 \\u0627\\u0644\\u0631\\u0641\\u0636\n\n#YMSG, 50: Display error title\nERRORTITLE=\\u062E\\u0637\\u0623\n\n#XFLD, 30: Reference Status\nREFSTATUS=\\u062D\\u0627\\u0644\\u0629 \\u0627\\u0644\\u0645\\u0631\\u062C\\u0639\n',



	"cus/sd/myquotations/i18n/i18n_cs.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Moje nab\\u00EDdky ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Detaily\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=Vybrat z\\u00E1kazn\\u00EDka\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=P\\u0159ehled kontakt\\u016F\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=Moje nab\\u00EDdky\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=Nab\\u00EDdky\n\n# XFLD, 30:Label for quotation number\nQUOTATION=Nab\\u00EDdka {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=P\\u0159\\u00EDjemce\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=Po\\u017Eadovan\\u00E9 datum dod\\u00E1vky\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=Po\\u017Eadovan\\u00E9 datum dod\\u00E1vky\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=Platnost od/do\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=Popis\n\n#XFLD, 15: column title for list of materials\nQUANTITY=Mno\\u017Estv\\u00ED\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=Disponibilita\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=Cen\\u00EDkov\\u00E1 cena\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=Cena brutto\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, cen\\u00EDkov\\u00E1 cena\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=Sleva\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=Hodnota netto\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, hodnota netto\n\n#XFLD, 10: items title for a table\nITEMS=Detaily polo\\u017Eky ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=Kop\\u00EDrovat\n\n#XBUT , 10: label for button\nEDIT=Upravit\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=Procento celkov\\u00E9 slevy\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=Celkov\\u00E1 sleva\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=Datum vypr\\u0161en\\u00ED platnosti\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=Hodnota netto\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=Stav\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=Datum vytvo\\u0159en\\u00ED\n\n#XFLD, 10: Label for sold to\nSOLDTO=Zadavatel\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=Platebn\\u00ED podm\\u00EDnky\n\n#XFLD, 20: Label for expiry date \nEXPIRES=Datum konce platn.\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=Datum vypr\\u0161en\\u00ED platnosti\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=Otev\\u0159eno\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=Dokon\\u010Deno\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=Prob\\u00EDh\\u00E1 zpracov\\u00E1n\\u00ED\n\n#XBUT , 10: label for button\nCANCEL=Zru\\u0161it\n\n#XFLD , 20: label for net value\nNETVALUE=Hodnota netto\n\n#XFLD , 10: label for Tax\nTAX=Da\\u0148\n\n#XFLD , 10: label for Total\nTOTAL=Celkem\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=Detaily nab\\u00EDdky\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=Adresa p\\u0159\\u00EDjemce\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=Skupina materi\\u00E1l\\u016F\n\n#XFLD, 15: label for division\nDIVISION=Divize\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=Hmotnost brutto\n\n#XFLD, 30: label for net weight\nNETWEIGHT=Hmotnost netto\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=Dimenze\n\n#XFLD, 15: label for dimensions \nVOLUME=Objem\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=Materi\\u00E1ly ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=St\\u00E1t\n\n#XFLD, 30: label for Street/House number\nSTREET=Ulice/\\u010D\\u00EDslo domu\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=PS\\u010C/m\\u011Bsto\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=Detaily z\\u00E1kazn\\u00EDka\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=Materi\\u00E1l p\\u0159id\\u00E1n do ko\\u0161\\u00EDku\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=Pozn\\u00E1mka vytvo\\u0159ena\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=Pozn\\u00E1mka nebyla vytvo\\u0159ena\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=Nespecifikovan\\u00E9\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=Polo\\u017Eka {0}-{1} byla odstran\\u011Bna\n\n#XFLD, 40: Customer Reference\nCUSTREF=Reference z\\u00E1kazn\\u00EDka\n\n#XFLD, 20: PO Number\nCREATED_ON=Vytvo\\u0159eno dne\n\n#XBUT, 10: filter popover button\nOK=OK\n\n#XBUT, 20: filter popover button\nRESET=Reset\n\n#XBUT, 10: filter popover button\nADDTOCART=P\\u0159idat do ko\\u0161\\u00EDku\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=P\\u0159idat materi\\u00E1ly do ko\\u0161\\u00EDku\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=Neulo\\u017Een\\u00E9 zm\\u011Bny budou ztraceny. Chcete pokra\\u010Dovat?\n\n#YMSG, 50: Display message\nWARNING=Upozorn\\u011Bn\\u00ED\n\n#YMSG, 50: Display ERROR title\nERROR=Chyba\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=Vybrat st\\u00E1t\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=Nebyly nalezeny v\\u00FDsledky\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=Bezpe\\u010Dnostn\\u00ED token selhal. Restartujte Moje nab\\u00EDdky.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=Informace\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=Pozn\\u00E1mky\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=P\\u0159\\u00EDlohy\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=Kontakty\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=Zadejte platn\\u00FD st\\u00E1t\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=Zadejte \\u010D\\u00EDslo v\\u011Bt\\u0161\\u00ED ne\\u017E 0\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=Zadejte st\\u00E1t\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=Zadejte datum\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=Aktualizovat\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=Zadejte platnou procentn\\u00ED slevu\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=Zadejte ulici\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=Zadejte PS\\u010C\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=Zadejte m\\u011Bsto\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=Zadejte platnou celkovou slevu. Poskytnut\\u00E1 hodnota mus\\u00ED b\\u00FDt procentn\\u00ED.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=Nab\\u00EDdka {0} byla vytvo\\u0159ena\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=Nab\\u00EDdka {0} byla aktualizov\\u00E1na\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=\\u00DAsp\\u011Bch\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=Nab\\u00EDdka {0} byla vytvo\\u0159ena s upozorn\\u011Bn\\u00EDmi.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=Nab\\u00EDdka {0} byla aktualizov\\u00E1na s upozorn\\u011Bn\\u00EDmi.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=Vypl\\u0148te platn\\u00E9 hodnoty do v\\u0161ech povinn\\u00FDch pol\\u00ED\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=Povinn\\u00E1 pole\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=Nab\\u00EDdku se nepoda\\u0159ilo vytvo\\u0159it. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=Zav\\u00E1d\\u00ED se...\n\n#XBUT, 20: add button for items list in review screen\nADD=P\\u0159idat\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=Zadejte platn\\u00E9 datov\\u00E9 rozp\\u011Bt\\u00ED\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=Nab\\u00EDdku se nepoda\\u0159ilo aktualizovat. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=Revidovat a vytvo\\u0159it nab\\u00EDdku\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=Revidovat a upravit nab\\u00EDdku {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=Ulo\\u017Eit\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=Vybrat z\\u00E1kazn\\u00EDka\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=Platnost vypr\\u0161\\u00ED do {0} dn\\u00ED\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=Platnost kon\\u010D\\u00ED dnes\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=Platnost kon\\u010D\\u00ED z\\u00EDtra\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={1} {0}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=Datum vypr\\u0161en\\u00ED platnosti\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=Celkov\\u00FD stav\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=Skon\\u010Dila platnost\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=Platnost nekon\\u010D\\u00ED\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=Platnost kon\\u010D\\u00ED dnes\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=Platnost kon\\u010D\\u00ED z\\u00EDtra\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=Platnost vypr\\u0161\\u00ED v dal\\u0161\\u00EDch {0} dnech\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=Potvrzen\\u00ED\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=Nen\\u00ED k dispozici \\u017E\\u00E1dn\\u00FD popis\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=Volbou \\u201EAktualizovat\\u201C aktualizujete cenov\\u00E9 inform.\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=Zam\\u00EDtnout v\\u0161e\n\n#XBUT, 20: Done button item details\nDONE=Hotovo\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=Zvolte d\\u016Fvod k zam\\u00EDtnut\\u00ED v\\u0161ech polo\\u017Eek\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=\\u010C\\u00EDslo materi\\u00E1lu\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=D\\u016Fvod zam\\u00EDtnut\\u00ED\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=Stav zpracov\\u00E1n\\u00ED\n\n#XFLD, 30: Rejected in Table items\nREJECTED=Zam\\u00EDtnuto\n\n#XTIT: title for reject all popup\nREJECTTITLE=D\\u016Fvody pro zam\\u00EDtnut\\u00ED\n\n#XTIT: title for reject \nITEM_DETAILS=Detaily polo\\u017Eky\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=Nic\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=Stav zam\\u00EDtnut\\u00ED\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=Nebylo zam\\u00EDtnuto\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=\\u010C\\u00E1ste\\u010Dn\\u011B zam\\u00EDnuto\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=Pln\\u011B zam\\u00EDtnuto\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=Nereferov\\u00E1no\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=\\u010C\\u00E1ste\\u010Dn\\u011B referov\\u00E1no\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=\\u010C\\u00E1ste\\u010Dn\\u011B zam\\u00EDtnuto / \\u010D\\u00E1ste\\u010Dn\\u011B referov\\u00E1no\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=Pln\\u011B referov\\u00E1no\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=Pln\\u011B zam\\u00EDtnuto\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=Status zam\\u00EDtnut\\u00ED\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=Status zam\\u00EDtnut\\u00ED\n\n#YMSG, 50: Display error title\nERRORTITLE=Chyba\n\n#XFLD, 30: Reference Status\nREFSTATUS=Stav reference\n',



	"cus/sd/myquotations/i18n/i18n_de.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Meine Angebote ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Details\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=Kunde ausw\\u00E4hlen\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=Ansprechpartner\\u00FCbersicht\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=Meine Angebote\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=Angebote\n\n# XFLD, 30:Label for quotation number\nQUOTATION=Angebot {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=Warenempf\\u00E4nger\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=Wunschlieferdatum\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=Wunschlieferdatum\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=G\\u00FCltig von/bis\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=Beschreibung\n\n#XFLD, 15: column title for list of materials\nQUANTITY=Menge\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=Verf\\u00FCgbarkeit\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=Listenpreis\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=Bruttopreis\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, Listenpreis\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=Rabatt\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=Nettowert\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, Nettowert\n\n#XFLD, 10: items title for a table\nITEMS=Positionsdetails ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=Kopieren\n\n#XBUT , 10: label for button\nEDIT=Bearbeiten\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=Gesamtrabattprozentsatz\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=Gesamtrabatt\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=Ablaufdatum\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=Nettowert\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=Status\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=Anlegedatum\n\n#XFLD, 10: Label for sold to\nSOLDTO=Auftraggeber\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=Zahlungsbedingungen\n\n#XFLD, 20: Label for expiry date \nEXPIRES=Ablaufdatum\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=Ablaufdatum\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=Offen\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=Abgeschlossen\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=In Bearbeitung\n\n#XBUT , 10: label for button\nCANCEL=Abbrechen\n\n#XFLD , 20: label for net value\nNETVALUE=Nettowert\n\n#XFLD , 10: label for Tax\nTAX=Steuern\n\n#XFLD , 10: label for Total\nTOTAL=Gesamt\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=Angebotsdetails\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=Adresse des Warenempf\\u00E4ngers\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=Materialgruppe\n\n#XFLD, 15: label for division\nDIVISION=Sparte\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=Bruttogewicht\n\n#XFLD, 30: label for net weight\nNETWEIGHT=Nettogewicht\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=Abmessungen\n\n#XFLD, 15: label for dimensions \nVOLUME=Volumen\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=Materialien ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=Land\n\n#XFLD, 30: label for Street/House number\nSTREET=Stra\\u00DFe/Hausnummer\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=Postleitzahl/Ort\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=Kundendetails\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=Material in Warenkorb gelegt\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=Notiz angelegt\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=Notiz wurde nicht angelegt\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=Keine Angabe\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=Position {0}-{1} wurde entfernt\n\n#XFLD, 40: Customer Reference\nCUSTREF=Kundenreferenz\n\n#XFLD, 20: PO Number\nCREATED_ON=Angelegt am\n\n#XBUT, 10: filter popover button\nOK=OK\n\n#XBUT, 20: filter popover button\nRESET=Zur\\u00FCcksetzen\n\n#XBUT, 10: filter popover button\nADDTOCART=In Warenkorb legen\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=Materialien in Warenkorb legen\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=Nicht gesicherte \\u00C4nderungen gehen verloren. M\\u00F6chten Sie fortfahren?\n\n#YMSG, 50: Display message\nWARNING=Warnung\n\n#YMSG, 50: Display ERROR title\nERROR=Fehler\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=Land ausw\\u00E4hlen\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=Keine Ergebnisse gefunden\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=Sicherheitstoken fehlgeschlagen. Bitte starten Sie "Meine Angebote" neu.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=Information\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=Notizen\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=Anlagen\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=Ansprechpartner\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=Geben Sie ein g\\u00FCltiges Land ein\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=Geben Sie eine Zahl gr\\u00F6\\u00DFer als 0 ein\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=Geben Sie ein Land ein\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=Geben Sie ein Datum ein\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=Aktualisieren\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=Geben Sie einen g\\u00FCltigen Rabattprozentsatz ein\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=Geben Sie eine Stra\\u00DFe ein\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=Geben Sie eine Postleitzahl ein\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=Geben Sie einen Ort ein\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=Geben Sie einen g\\u00FCltigen Gesamtrabatt ein. Dieser Wert muss ein Prozentsatz sein.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=Angebot {0} angelegt\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=Angebot {0} aktualisiert\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=Erfolg\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=Angebot {0} mit Warnmeldungen angelegt.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=Angebot {0} mit Warnmeldungen aktualisiert.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=Geben Sie in alle Mussfelder g\\u00FCltige Eingaben ein\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=Mussfelder\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=Angebot konnte nicht angelegt werden. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=Ladevorgang l\\u00E4uft...\n\n#XBUT, 20: add button for items list in review screen\nADD=Hinzuf\\u00FCgen\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=Geben Sie einen g\\u00FCltigen Datumsbereich ein\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=Angebot konnte nicht aktualisiert werden. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=Angebot pr\\u00FCfen und anlegen\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=Angebot {0} pr\\u00FCfen und bearbeiten\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=Sichern\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=Kunde ausw\\u00E4hlen\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=L\\u00E4uft in {0} Tagen ab\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=L\\u00E4uft heute ab\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=L\\u00E4uft morgen ab\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={1} {0}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=Ablaufdatum\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=Gesamtstatus\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=Abgelaufen\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=Nicht abgelaufen\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=Laufen heute ab\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=Laufen morgen ab\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=L\\u00E4uft in den n\\u00E4chsten {0} Tagen ab\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=Best\\u00E4tigung\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=Keine Beschreibung verf\\u00FCgbar\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=Mit "Aktualisieren" Preisinfo aktualisieren.\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=Alle absagen\n\n#XBUT, 20: Done button item details\nDONE=Erledigt\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=W\\u00E4hlen Sie einen Grund, um alle Positionen abzusagen\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=Materialnummer\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=Absagegrund\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=Bearbeitungsstatus\n\n#XFLD, 30: Rejected in Table items\nREJECTED=Abgesagt\n\n#XTIT: title for reject all popup\nREJECTTITLE=Absagegr\\u00FCnde\n\n#XTIT: title for reject \nITEM_DETAILS=Positionsdetails\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=Keiner\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=Absagestatus\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=Nicht abgesagt\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=Teilweise abgesagt\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=Vollst\\u00E4ndig abgesagt\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=Nicht referenziert\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=Teilweise referenziert\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=Teilweise abgesagt/teilweise referenziert\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=Vollst\\u00E4ndig referenziert\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=Vollst\\u00E4ndig abgesagt\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=Absagestatus\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=Absagestatus\n\n#YMSG, 50: Display error title\nERRORTITLE=Fehler\n\n#XFLD, 30: Reference Status\nREFSTATUS=Referenzstatus\n',



	"cus/sd/myquotations/i18n/i18n_en.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=My Quotations ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Details\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=Select Customer\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=Contact Overview\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=My Quotations\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=Quotations\n\n# XFLD, 30:Label for quotation number\nQUOTATION=Quotation {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=Ship-To Party\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=Requested Delivery Date\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=Requested Delivery Date\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=Valid From/To\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=Description\n\n#XFLD, 15: column title for list of materials\nQUANTITY=Quantity\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=Availability\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=List Price\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=Gross Price\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, List Price\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=Discount\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=Net Value\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, Net Value\n\n#XFLD, 10: items title for a table\nITEMS=Item Details ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=Copy\n\n#XBUT , 10: label for button\nEDIT=Edit\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=Overall Discount Percentage\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=Overall Discount\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=Expiry Date\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=Net Value\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=Status\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=Creation Date\n\n#XFLD, 10: Label for sold to\nSOLDTO=Sold-To Party\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=Payment Terms\n\n#XFLD, 20: Label for expiry date \nEXPIRES=Expiry Date\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=Expiry Date\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=Open\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=Completed\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=Being Processed\n\n#XBUT , 10: label for button\nCANCEL=Cancel\n\n#XFLD , 20: label for net value\nNETVALUE=Net Value\n\n#XFLD , 10: label for Tax\nTAX=Tax\n\n#XFLD , 10: label for Total\nTOTAL=Total\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=Quotation Details\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=Ship-To Party Address\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=Material Group\n\n#XFLD, 15: label for division\nDIVISION=Division\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=Gross Weight\n\n#XFLD, 30: label for net weight\nNETWEIGHT=Net Weight\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=Dimensions\n\n#XFLD, 15: label for dimensions \nVOLUME=Volume\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=Materials ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=Country\n\n#XFLD, 30: label for Street/House number\nSTREET=Street/House Number\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=Postal Code/City\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=Customer Details\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=Material added to cart\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=Note created\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=Note was not created\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=Unspecified\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=Item {0}-{1} was removed\n\n#XFLD, 40: Customer Reference\nCUSTREF=Customer Reference\n\n#XFLD, 20: PO Number\nCREATED_ON=Created On\n\n#XBUT, 10: filter popover button\nOK=OK\n\n#XBUT, 20: filter popover button\nRESET=Reset\n\n#XBUT, 10: filter popover button\nADDTOCART=Add to Cart\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=Add Materials to Cart\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=Unsaved changes will be lost. Do you want to continue?\n\n#YMSG, 50: Display message\nWARNING=Warning\n\n#YMSG, 50: Display ERROR title\nERROR=Error\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=Select Country\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=No results found\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=Security token failed. Please restart My Quotations.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=Information\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=Notes\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=Attachments\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=Contacts\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=Enter a valid country\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=Enter a number greater than 0\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=Enter a country\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=Enter a date\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=Refresh\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=Enter a valid discount percentage\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=Enter a street\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=Enter a postal code\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=Enter a city\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=Enter a valid overall discount. The value provided must be a percentage.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=Quotation {0} created\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=Quotation {0} updated\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=Success\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=Quotation {0} created with warnings.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=Quotation {0} updated with warnings.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=Provide valid entries in all mandatory fields\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=Mandatory Fields\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=Quotation could not be created. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=Loading...\n\n#XBUT, 20: add button for items list in review screen\nADD=Add\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=Enter a valid date range\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=Quotation could not be updated. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=Review and Create Quotation\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=Review and Edit Quotation {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=Save\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=Select Customer\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=Expires in {0} days\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=Expires today\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=Expires tomorrow\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={0} {1}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=Expiry Date\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=Overall Status\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=Expired\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=Not Expired\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=Expire Today\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=Expire Tomorrow\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=Expires in the next {0} days\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=Confirmation\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=No description available\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=Choose "Refresh" to update pricing information.\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=Reject All\n\n#XBUT, 20: Done button item details\nDONE=Done\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=Choose a reason to reject all items\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=Material Number\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=Reason for Rejection\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=Processing Status\n\n#XFLD, 30: Rejected in Table items\nREJECTED=Rejected\n\n#XTIT: title for reject all popup\nREJECTTITLE=Reasons for Rejection\n\n#XTIT: title for reject \nITEM_DETAILS=Item Details\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=None\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=Rejection Status\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=Not rejected\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=Partially rejected\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=Fully rejected\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=Not referenced\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=Partially referenced\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=Partially rejected / Partially referenced\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=Fully referenced\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=Fully rejected\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=Rejection Status\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=Rejection Status\n\n#YMSG, 50: Display error title\nERRORTITLE=Error\n\n#XFLD, 30: Reference Status\nREFSTATUS=Reference Status\n',



	"cus/sd/myquotations/i18n/i18n_en_US_sappsd.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=[[[\\u039C\\u0177 \\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B\\u015F ({0})]]]\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=[[[\\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F]]]\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0108\\u0171\\u015F\\u0163\\u014F\\u0271\\u0113\\u0157]]]\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=[[[\\u0108\\u014F\\u014B\\u0163\\u0105\\u010B\\u0163 \\u014E\\u028B\\u0113\\u0157\\u028B\\u012F\\u0113\\u0175]]]\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=[[[\\u039C\\u0177 \\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B\\u015F]]]\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=[[[\\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B\\u015F]]]\n\n# XFLD, 30:Label for quotation number\nQUOTATION=[[[\\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B ]]]{0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}[[[\\: {1} ]]]\n\n#XFLD, 10: Label for ship to\nSHIPTO=[[[\\u015C\\u0125\\u012F\\u03C1-\\u0162\\u014F \\u01A4\\u0105\\u0157\\u0163\\u0177]]]\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=[[[\\u0158\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163\\u0113\\u018C \\u010E\\u0113\\u013A\\u012F\\u028B\\u0113\\u0157\\u0177 \\u010E\\u0105\\u0163\\u0113]]]\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=[[[\\u0158\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163\\u0113\\u018C \\u010E\\u0113\\u013A\\u012F\\u028B\\u0113\\u0157\\u0177 \\u010E\\u0105\\u0163\\u0113]]]\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=[[[\\u01B2\\u0105\\u013A\\u012F\\u018C \\u0191\\u0157\\u014F\\u0271/\\u0162\\u014F]]]\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=[[[\\u010E\\u0113\\u015F\\u010B\\u0157\\u012F\\u03C1\\u0163\\u012F\\u014F\\u014B]]]\n\n#XFLD, 15: column title for list of materials\nQUANTITY=[[[\\u01EC\\u0171\\u0105\\u014B\\u0163\\u012F\\u0163\\u0177]]]\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=[[[\\u1000\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u012F\\u013A\\u012F\\u0163\\u0177]]]\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=[[[\\u013B\\u012F\\u015F\\u0163 \\u01A4\\u0157\\u012F\\u010B\\u0113]]]\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=[[[\\u0122\\u0157\\u014F\\u015F\\u015F \\u01A4\\u0157\\u012F\\u010B\\u0113]]]\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}[[[, \\u013B\\u012F\\u015F\\u0163 \\u01A4\\u0157\\u012F\\u010B\\u0113]]]\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=[[[\\u010E\\u012F\\u015F\\u010B\\u014F\\u0171\\u014B\\u0163]]]\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=[[[\\u0143\\u0113\\u0163 \\u01B2\\u0105\\u013A\\u0171\\u0113]]]\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}[[[, \\u0143\\u0113\\u0163 \\u01B2\\u0105\\u013A\\u0171\\u0113]]]\n\n#XFLD, 10: items title for a table\nITEMS=[[[\\u012C\\u0163\\u0113\\u0271 \\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F ({0})]]]\n\n#XBUT , 15: label for button\nCOPY_QUOTE=[[[\\u0108\\u014F\\u03C1\\u0177]]]\n\n#XBUT , 10: label for button\nEDIT=[[[\\u0114\\u018C\\u012F\\u0163]]]\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=[[[\\u014E\\u028B\\u0113\\u0157\\u0105\\u013A\\u013A \\u010E\\u012F\\u015F\\u010B\\u014F\\u0171\\u014B\\u0163 \\u01A4\\u0113\\u0157\\u010B\\u0113\\u014B\\u0163\\u0105\\u011F\\u0113]]]\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=[[[\\u014E\\u028B\\u0113\\u0157\\u0105\\u013A\\u013A \\u010E\\u012F\\u015F\\u010B\\u014F\\u0171\\u014B\\u0163\\: ]]]{0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=[[[\\u0114\\u03C7\\u03C1\\u012F\\u0157\\u0177 \\u010E\\u0105\\u0163\\u0113]]]\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=[[[\\u0143\\u0113\\u0163 \\u01B2\\u0105\\u013A\\u0171\\u0113]]]\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=[[[\\u015C\\u0163\\u0105\\u0163\\u0171\\u015F]]]\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u012F\\u014F\\u014B \\u010E\\u0105\\u0163\\u0113]]]\n\n#XFLD, 10: Label for sold to\nSOLDTO=[[[\\u015C\\u014F\\u013A\\u018C-\\u0162\\u014F \\u01A4\\u0105\\u0157\\u0163\\u0177]]]\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=[[[\\u01A4\\u0105\\u0177\\u0271\\u0113\\u014B\\u0163 \\u0162\\u0113\\u0157\\u0271\\u015F]]]\n\n#XFLD, 20: Label for expiry date \nEXPIRES=[[[\\u0114\\u03C7\\u03C1\\u012F\\u0157\\u0177 \\u010E\\u0105\\u0163\\u0113]]]\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=[[[\\u0114\\u03C7\\u03C1\\u012F\\u0157\\u0177 \\u010E\\u0105\\u0163\\u0113\\: ]]]{0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=[[[\\u014E\\u03C1\\u0113\\u014B]]]\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=[[[\\u0108\\u014F\\u0271\\u03C1\\u013A\\u0113\\u0163\\u0113\\u018C]]]\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=[[[\\u0181\\u0113\\u012F\\u014B\\u011F \\u01A4\\u0157\\u014F\\u010B\\u0113\\u015F\\u015F\\u0113\\u018C]]]\n\n#XBUT , 10: label for button\nCANCEL=[[[\\u0108\\u0105\\u014B\\u010B\\u0113\\u013A]]]\n\n#XFLD , 20: label for net value\nNETVALUE=[[[\\u0143\\u0113\\u0163 \\u01B2\\u0105\\u013A\\u0171\\u0113]]]\n\n#XFLD , 10: label for Tax\nTAX=[[[\\u0162\\u0105\\u03C7]]]\n\n#XFLD , 10: label for Total\nTOTAL=[[[\\u0162\\u014F\\u0163\\u0105\\u013A]]]\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=[[[\\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B \\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F]]]\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=[[[\\u015C\\u0125\\u012F\\u03C1-\\u0162\\u014F \\u01A4\\u0105\\u0157\\u0163\\u0177 \\u1000\\u018C\\u018C\\u0157\\u0113\\u015F\\u015F]]]\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=[[[\\u039C\\u0105\\u0163\\u0113\\u0157\\u012F\\u0105\\u013A \\u0122\\u0157\\u014F\\u0171\\u03C1]]]\n\n#XFLD, 15: label for division\nDIVISION=[[[\\u010E\\u012F\\u028B\\u012F\\u015F\\u012F\\u014F\\u014B]]]\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=[[[\\u0122\\u0157\\u014F\\u015F\\u015F \\u0174\\u0113\\u012F\\u011F\\u0125\\u0163]]]\n\n#XFLD, 30: label for net weight\nNETWEIGHT=[[[\\u0143\\u0113\\u0163 \\u0174\\u0113\\u012F\\u011F\\u0125\\u0163]]]\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=[[[\\u010E\\u012F\\u0271\\u0113\\u014B\\u015F\\u012F\\u014F\\u014B\\u015F]]]\n\n#XFLD, 15: label for dimensions \nVOLUME=[[[\\u01B2\\u014F\\u013A\\u0171\\u0271\\u0113]]]\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=[[[\\u039C\\u0105\\u0163\\u0113\\u0157\\u012F\\u0105\\u013A\\u015F ({0})]]]\n\n#XFLD, 30: label for Country\nCOUNTRY=[[[\\u0108\\u014F\\u0171\\u014B\\u0163\\u0157\\u0177]]]\n\n#XFLD, 30: label for Street/House number\nSTREET=[[[\\u015C\\u0163\\u0157\\u0113\\u0113\\u0163/\\u0124\\u014F\\u0171\\u015F\\u0113 \\u0143\\u0171\\u0271\\u0183\\u0113\\u0157]]]\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=[[[\\u01A4\\u014F\\u015F\\u0163\\u0105\\u013A \\u0108\\u014F\\u018C\\u0113/\\u0108\\u012F\\u0163\\u0177 ]]]\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=[[[\\u0108\\u0171\\u015F\\u0163\\u014F\\u0271\\u0113\\u0157 \\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F]]]\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=[[[\\u039C\\u0105\\u0163\\u0113\\u0157\\u012F\\u0105\\u013A \\u0105\\u018C\\u018C\\u0113\\u018C \\u0163\\u014F \\u010B\\u0105\\u0157\\u0163]]]\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=[[[\\u0143\\u014F\\u0163\\u0113 \\u0108\\u0157\\u0113\\u0105\\u0163\\u0113\\u018C]]]\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=[[[\\u0143\\u014F\\u0163\\u0113 \\u0108\\u0157\\u0113\\u0105\\u0163\\u012F\\u014F\\u014B \\u0191\\u0105\\u012F\\u013A\\u0113\\u018C]]]\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=[[[\\u016E\\u014B\\u015F\\u03C1\\u0113\\u010B\\u012F\\u0192\\u012F\\u0113\\u018C]]]\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0}[[[ - ]]]{1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=[[[\\u012C\\u0163\\u0113\\u0271 {0}-{1} \\u0175\\u0105\\u015F \\u0157\\u0113\\u0271\\u014F\\u028B\\u0113\\u018C]]]\n\n#XFLD, 40: Customer Reference\nCUSTREF=[[[\\u0108\\u0171\\u015F\\u0163\\u014F\\u0271\\u0113\\u0157 \\u0158\\u0113\\u0192\\u0113\\u0157\\u0113\\u014B\\u010B\\u0113]]]\n\n#XFLD, 20: PO Number\nCREATED_ON=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113\\u018C \\u014E\\u014B]]]\n\n#XBUT, 10: filter popover button\nOK=[[[\\u014E\\u0136]]]\n\n#XBUT, 20: filter popover button\nRESET=[[[\\u0158\\u0113\\u015F\\u0113\\u0163]]]\n\n#XBUT, 10: filter popover button\nADDTOCART=[[[\\u1000\\u018C\\u018C \\u0163\\u014F \\u0108\\u0105\\u0157\\u0163]]]\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=[[[\\u1000\\u018C\\u018C \\u039C\\u0105\\u0163\\u0113\\u0157\\u012F\\u0105\\u013A\\u015F \\u0163\\u014F \\u0108\\u0105\\u0157\\u0163]]]\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=[[[\\u016E\\u014B\\u015F\\u0105\\u028B\\u0113\\u018C \\u010B\\u0125\\u0105\\u014B\\u011F\\u0113\\u015F \\u0175\\u012F\\u013A\\u013A \\u0183\\u0113 \\u013A\\u014F\\u015F\\u0163. \\u010E\\u014F \\u0177\\u014F\\u0171 \\u0175\\u0105\\u014B\\u0163 \\u0163\\u014F \\u010B\\u014F\\u014B\\u0163\\u012F\\u014B\\u0171\\u0113?]]]\n\n#YMSG, 50: Display message\nWARNING=[[[\\u0174\\u0105\\u0157\\u014B\\u012F\\u014B\\u011F]]]\n\n#YMSG, 50: Display ERROR title\nERROR=[[[\\u0114\\u0157\\u0157\\u014F\\u0157]]]\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0108\\u014F\\u0171\\u014B\\u0163\\u0157\\u0177]]]\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=[[[\\u0143\\u014F \\u0157\\u0113\\u015F\\u0171\\u013A\\u0163\\u015F \\u0192\\u014F\\u0171\\u014B\\u018C]]]\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=[[[\\u015C\\u0113\\u010B\\u0171\\u0157\\u012F\\u0163\\u0177 \\u0163\\u014F\\u0137\\u0113\\u014B \\u0192\\u0105\\u012F\\u013A\\u0113\\u018C. \\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0157\\u0113\\u015F\\u0163\\u0105\\u0157\\u0163 \\u039C\\u0177 \\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B\\u015F. ]]]\n\n#XBUT, 12: Icon tab Info\nICON_INFO=[[[\\u012C\\u014B\\u0192\\u014F\\u0157\\u0271\\u0105\\u0163\\u012F\\u014F\\u014B]]]\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=[[[\\u0143\\u014F\\u0163\\u0113\\u015F]]]\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=[[[\\u1000\\u0163\\u0163\\u0105\\u010B\\u0125\\u0271\\u0113\\u014B\\u0163\\u015F]]]\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=[[[\\u0108\\u014F\\u014B\\u0163\\u0105\\u010B\\u0163\\u015F]]]\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u028B\\u0105\\u013A\\u012F\\u018C \\u010B\\u014F\\u0171\\u014B\\u0163\\u0157\\u0177]]]\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u014B\\u0171\\u0271\\u0183\\u0113\\u0157 \\u011F\\u0157\\u0113\\u0105\\u0163\\u0113\\u0157 \\u0163\\u0125\\u0105\\u014B 0]]]\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u010B\\u014F\\u0171\\u014B\\u0163\\u0157\\u0177]]]\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u018C\\u0105\\u0163\\u0113]]]\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=[[[\\u0158\\u0113\\u0192\\u0157\\u0113\\u015F\\u0125 ]]]\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u028B\\u0105\\u013A\\u012F\\u018C \\u018C\\u012F\\u015F\\u010B\\u014F\\u0171\\u014B\\u0163 \\u03C1\\u0113\\u0157\\u010B\\u0113\\u014B\\u0163\\u0105\\u011F\\u0113]]]\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u015F\\u0163\\u0157\\u0113\\u0113\\u0163]]]\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u03C1\\u014F\\u015F\\u0163\\u0105\\u013A \\u010B\\u014F\\u018C\\u0113]]]\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u010B\\u012F\\u0163\\u0177]]]\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u028B\\u0105\\u013A\\u012F\\u018C \\u014F\\u028B\\u0113\\u0157\\u0105\\u013A\\u013A \\u018C\\u012F\\u015F\\u010B\\u014F\\u0171\\u014B\\u0163. \\u0162\\u0125\\u0113 \\u028B\\u0105\\u013A\\u0171\\u0113 \\u03C1\\u0157\\u014F\\u028B\\u012F\\u018C\\u0113\\u018C \\u0271\\u0171\\u015F\\u0163 \\u0183\\u0113 \\u0105 \\u03C1\\u0113\\u0157\\u010B\\u0113\\u014B\\u0163\\u0105\\u011F\\u0113.]]]\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=[[[\\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B {0} \\u010B\\u0157\\u0113\\u0105\\u0163\\u0113\\u018C]]]\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=[[[\\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B {0} \\u0171\\u03C1\\u018C\\u0105\\u0163\\u0113\\u018C]]]\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=[[[\\u015C\\u016E\\u0108\\u0108\\u0114\\u015C\\u015C]]]\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=[[[\\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B {0} \\u010B\\u0157\\u0113\\u0105\\u0163\\u0113\\u018C \\u0175\\u012F\\u0163\\u0125 \\u0175\\u0105\\u0157\\u014B\\u012F\\u014B\\u011F\\u015F.]]]\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=[[[\\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B {0} \\u0171\\u03C1\\u018C\\u0105\\u0163\\u0113\\u018C \\u0175\\u012F\\u0163\\u0125 \\u0175\\u0105\\u0157\\u014B\\u012F\\u014B\\u011F\\u015F.]]]\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=[[[\\u01A4\\u0157\\u014F\\u028B\\u012F\\u018C\\u0113 \\u028B\\u0105\\u013A\\u012F\\u018C \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u012F\\u014B \\u0105\\u013A\\u013A \\u0271\\u0105\\u014B\\u018C\\u0105\\u0163\\u014F\\u0157\\u0177 \\u0192\\u012F\\u0113\\u013A\\u018C\\u015F ]]]\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=[[[\\u039C\\u0105\\u014B\\u018C\\u0105\\u0163\\u014F\\u0157\\u0177 \\u0191\\u012F\\u0113\\u013A\\u018C\\u015F ]]]\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=[[[\\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B \\u010B\\u014F\\u0171\\u013A\\u018C \\u014B\\u014F\\u0163 \\u0183\\u0113 \\u010B\\u0157\\u0113\\u0105\\u0163\\u0113\\u018C. {0}.]]]\n\n#YMSG, 60: message shown when document is loading\nLOADING=[[[\\u013B\\u014F\\u0105\\u018C\\u012F\\u014B\\u011F]]]\n\n#XBUT, 20: add button for items list in review screen\nADD=[[[\\u1000\\u018C\\u018C]]]\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u028B\\u0105\\u013A\\u012F\\u018C \\u018C\\u0105\\u0163\\u0113 \\u0157\\u0105\\u014B\\u011F\\u0113]]]\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=[[[\\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B \\u010B\\u014F\\u0171\\u013A\\u018C \\u014B\\u014F\\u0163 \\u0183\\u0113 \\u0171\\u03C1\\u018C\\u0105\\u0163\\u0113\\u018C. {0}.]]]\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=[[[\\u0158\\u0113\\u028B\\u012F\\u0113\\u0175 \\u0105\\u014B\\u018C \\u0108\\u0157\\u0113\\u0105\\u0163\\u0113 \\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B]]]\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=[[[\\u0158\\u0113\\u028B\\u012F\\u0113\\u0175 \\u0105\\u014B\\u018C \\u0114\\u018C\\u012F\\u0163 \\u01EC\\u0171\\u014F\\u0163\\u0105\\u0163\\u012F\\u014F\\u014B ]]]{0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=[[[\\u015C\\u0105\\u028B\\u0113]]]\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0108\\u0171\\u015F\\u0163\\u014F\\u0271\\u0113\\u0157]]]\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=[[[\\u0114\\u03C7\\u03C1\\u012F\\u0157\\u0113\\u015F \\u012F\\u014B {0} \\u018C\\u0105\\u0177\\u015F]]]\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=[[[\\u0114\\u03C7\\u03C1\\u012F\\u0157\\u0113\\u015F \\u0163\\u014F\\u018C\\u0105\\u0177]]]\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=[[[\\u0114\\u03C7\\u03C1\\u012F\\u0157\\u0113\\u015F \\u0163\\u014F\\u0271\\u014F\\u0157\\u0157\\u014F\\u0175]]]\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={0}[[[ ]]]{1}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0}[[[ ]]]{1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0}[[[ {1} ]]]{2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=[[[\\u0114\\u03C7\\u03C1\\u012F\\u0157\\u0177 \\u010E\\u0105\\u0163\\u0113]]]\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=[[[\\u014E\\u028B\\u0113\\u0157\\u0105\\u013A\\u013A \\u015C\\u0163\\u0105\\u0163\\u0171\\u015F]]]\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=[[[\\u0114\\u03C7\\u03C1\\u012F\\u0157\\u0113\\u018C]]]\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=[[[\\u0143\\u014F\\u0163 \\u0114\\u03C7\\u03C1\\u012F\\u0157\\u0113\\u018C]]]\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=[[[\\u0114\\u03C7\\u03C1\\u012F\\u0157\\u0113 \\u0162\\u014F\\u018C\\u0105\\u0177]]]\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=[[[\\u0114\\u03C7\\u03C1\\u012F\\u0157\\u0113 \\u0162\\u014F\\u0271\\u014F\\u0157\\u0157\\u014F\\u0175]]]\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=[[[\\u0114\\u03C7\\u03C1\\u012F\\u0157\\u0113 \\u012F\\u014B \\u0163\\u0125\\u0113 \\u0143\\u0113\\u03C7\\u0163 {0} \\u010E\\u0105\\u0177\\u015F]]]\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271\\u0105\\u0163\\u012F\\u014F\\u014B]]]\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=[[[\\u0143\\u014F \\u010E\\u0113\\u015F\\u010B\\u0157\\u012F\\u03C1\\u0163\\u012F\\u014F\\u014B \\u1000\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113]]]\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=[[[\\u0108\\u0125\\u014F\\u014F\\u015F\\u0113 "\\u0158\\u0113\\u0192\\u0157\\u0113\\u015F\\u0125" \\u0163\\u014F \\u0171\\u03C1\\u018C\\u0105\\u0163\\u0113 \\u03C1\\u0157\\u012F\\u010B\\u012F\\u014B\\u011F \\u012F\\u014B\\u0192\\u014F\\u0157\\u0271\\u0105\\u0163\\u012F\\u014F\\u014B]]]\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0}[[[ ]]]{1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=[[[\\u0158\\u0113\\u0135\\u0113\\u010B\\u0163 \\u1000\\u013A\\u013A]]]\n\n#XBUT, 20: Done button item details\nDONE=[[[\\u010E\\u014F\\u014B\\u0113]]]\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=[[[\\u0108\\u0125\\u014F\\u014F\\u015F\\u0113 \\u0105 \\u0157\\u0113\\u0105\\u015F\\u014F\\u014B \\u0163\\u014F \\u0157\\u0113\\u0135\\u0113\\u010B\\u0163 \\u0105\\u013A\\u013A \\u012F\\u0163\\u0113\\u0271\\u015F\\:]]]\n\n#XFLD, 30: Material number\nMATERIALNUMBER=[[[\\u039C\\u0105\\u0163\\u0113\\u0157\\u012F\\u0105\\u013A \\u0143\\u0171\\u0271\\u0183\\u0113\\u0157]]]\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=[[[\\u0158\\u0113\\u0105\\u015F\\u014F\\u014B \\u0192\\u014F\\u0157 \\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u012F\\u014F\\u014B]]]\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=[[[\\u01A4\\u0157\\u014F\\u010B\\u0113\\u015F\\u015F\\u012F\\u014B\\u011F \\u015C\\u0163\\u0105\\u0163\\u0171\\u015F]]]\n\n#XFLD, 30: Rejected in Table items\nREJECTED=[[[\\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C]]]\n\n#XTIT: title for reject all popup\nREJECTTITLE=[[[\\u0158\\u0113\\u0105\\u015F\\u014F\\u014B\\u015F \\u0192\\u014F\\u0157 \\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u012F\\u014F\\u014B]]]\n\n#XTIT: title for reject \nITEM_DETAILS=[[[\\u012C\\u0163\\u0113\\u0271 \\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F]]]\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=[[[\\u0143\\u014F\\u014B\\u0113]]]\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=[[[\\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u012F\\u014F\\u014B \\u015C\\u0163\\u0105\\u0163\\u0171\\u015F]]]\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=[[[\\u0143\\u014F\\u0163 \\u0157\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C]]]\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=[[[\\u01A4\\u0105\\u0157\\u0163\\u012F\\u0105\\u013A\\u013A\\u0177 \\u0157\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C]]]\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=[[[\\u0191\\u0171\\u013A\\u013A\\u0177 \\u0157\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C]]]\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=[[[\\u0143\\u014F\\u0163 \\u0157\\u0113\\u0192\\u0113\\u0157\\u0113\\u014B\\u010B\\u0113\\u018C]]]\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=[[[\\u01A4\\u0105\\u0157\\u0163\\u012F\\u0105\\u013A\\u013A\\u0177 \\u0157\\u0113\\u0192\\u0113\\u0157\\u0113\\u014B\\u010B\\u0113\\u018C]]]\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=[[[\\u01A4\\u0105\\u0157\\u0163\\u012F\\u0105\\u013A\\u013A\\u0177 \\u0157\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C / \\u01A4\\u0105\\u0157\\u0163\\u012F\\u0105\\u013A\\u013A\\u0177 \\u0157\\u0113\\u0192\\u0113\\u0157\\u0113\\u014B\\u010B\\u0113\\u018C]]]\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=[[[\\u0191\\u0171\\u013A\\u013A\\u0177 \\u0157\\u0113\\u0192\\u0113\\u0157\\u0113\\u014B\\u010B\\u0113\\u018C]]]\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=[[[\\u0191\\u0171\\u013A\\u013A\\u0177 \\u0157\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C]]]\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=[[[\\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u012F\\u014F\\u014B \\u015C\\u0163\\u0105\\u0163\\u0171\\u015F]]]\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=[[[\\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u012F\\u014F\\u014B \\u015C\\u0163\\u0105\\u0163\\u0171\\u015F]]]\n\n#YMSG, 50: Display error title\nERRORTITLE=[[[\\u0114\\u0158\\u0158\\u014E\\u0158]]]\n\n#XFLD, 30: Reference Status\nREFSTATUS=[[[\\u0158\\u0113\\u0192\\u0113\\u0157\\u0113\\u014B\\u010B\\u0113 \\u015C\\u0163\\u0105\\u0163\\u0171\\u015F]]]\n',



	"cus/sd/myquotations/i18n/i18n_en_US_saptrc.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=ZV6NZF+Pqvxt78V6ZCl3ww_My Quotations ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=w9P10lONOqWSf9SK50V8Mw_Details\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=yUmGSYRKQUQ1FVY3ktUpsA_Select Customer\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=CMExbWtUU/w333eedEvgqw_Contact Overview\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=lR5R55O6S0NuHabtDX78pw_My Quotations\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=WH7ihPaRG+t3GB/GHTSjRg_Quotations\n\n# XFLD, 30:Label for quotation number\nQUOTATION=xpyzGQm9hkLEk5GOqR2nsQ_Quotation {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE=T+38DpD6pCTGvvM33cD+bQ_{0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=zzH2uvQbt/agIHPePBXKKA_Ship-To Party\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=sgjJbVnxzxwKLVagPfnjcA_Requested Delivery Date\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=Ce/pXrZk1ylV3yku9vF6fA_Requested Delivery Date\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=lwC880mJANuwVmzukfA9pA_Valid From/To\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=bkI3jUdWjkdMNAESy7N3rQ_Description\n\n#XFLD, 15: column title for list of materials\nQUANTITY=ILyDgI55hx2LneWs6KSnkw_Quantity\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=GlsTVsXIgQ6jE6ElWgxWLw_Availability\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=fVcG8v1LxQJHDCYqX1TeAw_List Price\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=4ocy7j0ebpZ7gGH5mfnMAw_Gross Price\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE=IdcyJwwRl2z7TMfcs1kmNQ_{0}, List Price\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=Utq4o/QZ1nI6SQnevVThMg_Discount\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=vHF8DORQK90VicxztLi8HA_Net Value\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE=0NobPG5S9DjgQ404oDbPRQ_{0}, Net Value\n\n#XFLD, 10: items title for a table\nITEMS=cwtZyTvK4oP5WLD+HMC0ew_Item Details ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=Prq4DFi6VGZyFHyA+B7X+g_Copy\n\n#XBUT , 10: label for button\nEDIT=COzM6PRLzyZ0L0Ha3VJ8qg_Edit\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=XPDeR4cQ2BMC2L43vRvyEg_Overall Discount Percentage\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=UW/CO+oRluSY6IwxytDk5w_Overall Discount\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=LTPZycGM+EgtAdJbNY8ALQ_Expiry Date\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=gtQOD7x51vO++lz3P+5+oA_Net Value\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=uKKWZsHDjABMD/7fRJmokg_Status\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=5zNCEY3s4zKmrS9PhDu8iA_Creation Date\n\n#XFLD, 10: Label for sold to\nSOLDTO=Q+y0Jb0wnsy3nakl/02NyQ_Sold-To Party\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=tcUgjeEnPNa3niHmtP6I8g_Payment Terms\n\n#XFLD, 20: Label for expiry date \nEXPIRES=IWyLIn8A/OP0x+gzsSNu8g_Expiry Date\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=m2nu9O0IeglBoCPyE6oL0Q_Expiry Date\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=yIiG8+dR9mhqY1otRyW0lQ_Open\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=2XhNm9A2jkYJwW0lo7XJQA_Completed\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=2M8vMqSUN/RA1ZwN8Q1s8g_Being Processed\n\n#XBUT , 10: label for button\nCANCEL=ZicosMrV3L/Nl/diFlzNvw_Cancel\n\n#XFLD , 20: label for net value\nNETVALUE=fWp1k+Vtycu5LIsr5cqEBQ_Net Value\n\n#XFLD , 10: label for Tax\nTAX=8d2e9FfhBlBaP+/rRP7+AA_Tax\n\n#XFLD , 10: label for Total\nTOTAL=ZFx0XvngJy1PilYfh2kJiA_Total\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=LVH34SgdXwQ+omTElQ17eg_Quotation Details\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=9LKFYqiOUkuY3z/aNLEhTQ_Ship-To Party Address\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=uf+BlaF6u08kM/OCZI20cg_Material Group\n\n#XFLD, 15: label for division\nDIVISION=9XYMODH8PXX6WiVS/ldflQ_Division\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=ohsx8JOgALhQZLbwOzcQDg_Gross Weight\n\n#XFLD, 30: label for net weight\nNETWEIGHT=O/ZKbA9/rCAPZQp47PAqDw_Net Weight\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=+8oxvCyQQdUH5kSfRjqOFQ_Dimensions\n\n#XFLD, 15: label for dimensions \nVOLUME=H2rKto+gDmdk8OIlg/H62A_Volume\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=tOmxyJFoZbWpG8xzTF4vsg_Materials ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=j+6tg6NjUgoK25FG86otbQ_Country\n\n#XFLD, 30: label for Street/House number\nSTREET=Wr8Cg8cw9/mqYvbDSwDG3w_Street/House Number\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=bQz4ZHILVxeRysfIRbSFGg_Postal Code/City \n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=2Sz7NgIGPO0YMT+/bOpZrw_Customer Details\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=Zv++dxZULR+yvb7ni4GqQA_Material added to cart\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=t5ece4SoU5vle2tg5zR7ag_Note Created\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=HYwi69umFXht/kxSqmGVRw_Note Creation Failed\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=r73qch9kMgHg/Cq6Tak0xg_Unspecified\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO=6gmAPVpWPNgiglWK79wzJA_{0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=usUpfgAw95jf10VS9EqTMQ_Item {0}-{1} was removed\n\n#XFLD, 40: Customer Reference\nCUSTREF=R+Tsrh5NOA9ofgSnfCcSog_Customer Reference\n\n#XFLD, 20: PO Number\nCREATED_ON=BR/HZfL+ziQ88yAwX20OFQ_Created On\n\n#XBUT, 10: filter popover button\nOK=Yrfmu+ZSHHTDRbSpxKRRSg_OK\n\n#XBUT, 20: filter popover button\nRESET=r1l5hXXJ0MwH1F/lF22CuQ_Reset\n\n#XBUT, 10: filter popover button\nADDTOCART=Z/RGq03O2fvZDFFYYoiJaQ_Add to Cart\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=35zp/2m2nd2Z4GIgqxRdcw_Add Materials to Cart\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=dP+0y7dtEQMMvMy4jCVC8A_Unsaved changes will be lost. Do you want to continue?\n\n#YMSG, 50: Display message\nWARNING=CsZeukqVyavh62gTWqF50w_Warning\n\n#YMSG, 50: Display ERROR title\nERROR=g7DkcfbN6+G90p3UyCwEmw_Error\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=OJGka5Y6Qqg4nVqdGPlHWg_Select Country\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=lDXDc/a2LYIpe8BZU34I4Q_No results found\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=INAincyLdjWEHyISRd7mwg_Security token failed. Please restart My Quotations. \n\n#XBUT, 12: Icon tab Info\nICON_INFO=KVRmpsNJaeQh0Yspi83xWA_Information\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=pHzHijKGarbv1EgDCKq+ug_Notes\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=3lY90BC8WZVR+FtywtumQA_Attachments\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=f1hnB6+0klq54JjwonQfPQ_Contacts\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=htP9fTzL09ALtAEplRfIoA_Enter a valid country\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=9yC903cgdnkNq2Hly0poaw_Enter a number greater than 0\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=isuHcZKEhxIMxjc6N50eKw_Enter a country\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=ReS40IAf2l5KQ1k1YJylDQ_Enter a date\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=7GReQCM+QilLfz8M5HZ7Ww_Refresh \n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=18SFXFnYqf3lFOmUH8Zfvw_Enter a valid discount percentage\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=bhDf05XbHXQNb4ibvqn3Dg_Enter a street\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=Z7KaSMCLcErjzUeAoYEmMQ_Enter a postal code\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=+n/mYAGOPPW+EZlO28uQew_Enter a city\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=9ifLOD6g5/FAJZNsdA8JAg_Enter a valid overall discount. The value provided must be a percentage.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=iL9Y32+byPbrGNdRwiwBCg_Quotation {0} created\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=z631IFrW+VLIByjXwVza4A_Quotation {0} updated\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=VV8E8/xKcquX0U4Y1tkqpw_SUCCESS\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=ingIQpiXazEugZtc5QIeQg_Quotation {0} created with warnings.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=4YSMhcDUxjceGr9KJaoN3A_Quotation {0} updated with warnings.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=BH4IfWhXUGiwrOY+prkUyQ_Provide valid entries in all mandatory fields \n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=3eHja41GmHBIWA+4KI2E8w_Mandatory Fields \n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=CpUKHUMR0/SNt/l55KVCxw_Quotation could not be created. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=+xH7cV1YvwmxFGAhDqbf4Q_Loading\n\n#XBUT, 20: add button for items list in review screen\nADD=uhSE49c46g4LJwscnSpSDA_Add\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=k+OhkSTn2r/M/p7zhXQhPw_Enter a valid date range\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=19N0anhPsLZdu79fYQDy9w_Quotation could not be updated. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=//y8qiD8qE77+AIfenapng_Review and Create Quotation\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=anOg3o3j+reVA8HP8Xyk/A_Review and Edit Quotation {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=Rz9QCHUJfzLtPPdrXy8ufw_Save\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=7m56MpeNYjccmD15tp8+Ew_Select Customer\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=BAi4J8+uPZjuJxmw9LT2Rw_Expires in {0} days\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=XD5+SeoXnCHYk0yOyNYlIQ_Expires today\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=KxKzv6+Ws1n6M9g2WuXXyA_Expires tomorrow\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET=EOujW2vf6hIRxhVG2kMQog_{0} {1}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY=vuLLLqRClDWq+Y1pjaQ18Q_{0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY=yA//tAimYSK2T5UgxqiCdQ_{0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=tSYibYT6BOUeZx60JSh+hA_Expiry Date\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=j/oCOIfh+Ar1klSSsGH/+g_Overall Status\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=oTGbctQ7qp7DxkiHRHtPbA_Expired\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=SG7EVn0H8HiLKQ9FKDiY8g_Not Expired\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=Gj9HuJJ84GJn7VOTL888dw_Expire Today\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=KIB847+b44qkafiNWERDOg_Expire Tomorrow\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=vzkIzUIf/yfGENAY+pdQlw_Expire in the Next {0} Days\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=dVBQ3vCcSC8CtURN1AmM7g_Confirmation\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=ugIom/zS/2aq7Fw744B7hA_No Description Available\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=ubTJ0Ol3k5xCdaSXkfGWFw_Choose "Refresh" to update pricing information\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT=QevgsFtHwSy/wc1EQbBw9Q_{0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=KdTX/v9q/+BeEPS9deKt9A_Reject All\n\n#XBUT, 20: Done button item details\nDONE=pCldt7gRsjfdw3oQzZXZtQ_Done\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=L7OlJjewfRp3n9lipYLOwg_Choose a reason to reject all items\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=b/SLRlg4zD3vzEuSsH/Y1g_Material Number\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=u69SHF7S/NcBjjvlk3q1ZQ_Reason for Rejection\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=DRC9nu79ih7c+wyP/TbYRA_Processing Status\n\n#XFLD, 30: Rejected in Table items\nREJECTED=jte95EmHt7ZT0Wq1G6kffw_Rejected\n\n#XTIT: title for reject all popup\nREJECTTITLE=klBPtlzn5VheD2XMRO8U3Q_Reasons for Rejection\n\n#XTIT: title for reject \nITEM_DETAILS=e/4gg8631e794kVWqBX+Zg_Item Details\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=gFIF0D5wabh8yjckOzZgmQ_None\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=3ow8CW8pZ6S1kWKDFkQlxg_Rejection Status\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=KBPnBu7YwlwOfyiz7yS0+g_Not rejected\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=5o+2GxtM0yePEjL/xnISsA_Partially rejected\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=kmcEY5wS+J5PISnpExhfDA_Fully rejected\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=1OOl/Hiu6hT5JOCaLglkAw_Not referenced\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=EEojUveCvyya2j3ZcIgJiQ_Partially referenced\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=xsP1iBeHFYTq7n17y7+maA_Partially rejected / Partially referenced\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=nUbvxbbLRZdBhlfB8LcIyQ_Fully referenced\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=PeWnTbwZAwPYNPtN7fynGA_Fully rejected\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=QZhGWseeE2ahEiBeb2KfNA_Rejection Status\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=TjfQXa4TG3bddq7WNcv+Ag_Rejection Status\n\n#YMSG, 50: Display error title\nERRORTITLE=dtS41Z0eKmb50T9WvSjmyg_ERROR\n\n#XFLD, 30: Reference Status\nREFSTATUS=Nc85IDlWK515aOp5YSn84w_Reference Status\n',



	"cus/sd/myquotations/i18n/i18n_es.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Mis ofertas ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Detalles\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=Seleccionar cliente\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=Informaci\\u00F3n de contacto\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=Mis ofertas\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=Ofertas\n\n# XFLD, 30:Label for quotation number\nQUOTATION=Oferta {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=Destinatario\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=Fecha de entrega solicitada\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=Fecha de entrega solicitada\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=Inicio/fin de validez\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=Descripci\\u00F3n\n\n#XFLD, 15: column title for list of materials\nQUANTITY=Cantidad\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=Disponibilidad\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=Precio\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=Precio bruto\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, precio de lista\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=Descuento\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=Valor neto\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, valor neto\n\n#XFLD, 10: items title for a table\nITEMS=Detalles de posici\\u00F3n ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=Copiar\n\n#XBUT , 10: label for button\nEDIT=Editar\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=Porcentaje de descuento global\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=Descuento global\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=Fecha de vencimiento\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=Valor neto\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=Estado\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=Fecha de creaci\\u00F3n\n\n#XFLD, 10: Label for sold to\nSOLDTO=Solicitante\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=Condiciones de pago\n\n#XFLD, 20: Label for expiry date \nEXPIRES=Vencimiento\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=Fecha de vencimiento\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=Abierta\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=Finalizado\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=En proceso\n\n#XBUT , 10: label for button\nCANCEL=Cancelar\n\n#XFLD , 20: label for net value\nNETVALUE=Valor neto\n\n#XFLD , 10: label for Tax\nTAX=Impuesto\n\n#XFLD , 10: label for Total\nTOTAL=Total\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=Detalles de oferta\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=Direcci\\u00F3n de entrega\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=Grupo de materiales\n\n#XFLD, 15: label for division\nDIVISION=Divisi\\u00F3n\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=Peso bruto\n\n#XFLD, 30: label for net weight\nNETWEIGHT=Peso neto\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=Dimensiones\n\n#XFLD, 15: label for dimensions \nVOLUME=Volumen\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=Materiales ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=Pa\\u00EDs\n\n#XFLD, 30: label for Street/House number\nSTREET=Calle/N\\u00FAmero\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=C\\u00F3digo postal/Ciudad\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=Detalles de cliente\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=Material a\\u00F1adido al carrito de compra\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=Nota creada\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=No se ha creado la nota\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=No especificado\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=Se ha eliminado el art\\u00EDculo {0}-{1}\n\n#XFLD, 40: Customer Reference\nCUSTREF=Referencia del cliente\n\n#XFLD, 20: PO Number\nCREATED_ON=Creada el\n\n#XBUT, 10: filter popover button\nOK=OK\n\n#XBUT, 20: filter popover button\nRESET=Reinicializar\n\n#XBUT, 10: filter popover button\nADDTOCART=A\\u00F1adir al carrito de compra\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=A\\u00F1adir materiales al carrito de compra\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=Se perder\\u00E1n las modificaciones que no haya guardado. \\u00BFDesea continuar?\n\n#YMSG, 50: Display message\nWARNING=Advertencia\n\n#YMSG, 50: Display ERROR title\nERROR=Error\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=Seleccionar pa\\u00EDs\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=No hay resultados\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=Error del token de seguridad. Reinicie Mis ofertas.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=Informaci\\u00F3n\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=Notas\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=Anexos\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=Contactos\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=Introduzca un pa\\u00EDs v\\u00E1lido\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=Introduzca un n\\u00FAmero mayor que 0\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=Introduzca un pa\\u00EDs\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=Introduzca una fecha\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=Actualizar\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=Introduzca un porcentaje de descuento v\\u00E1lido\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=Introduzca una calle\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=Introduzca un c\\u00F3digo postal\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=Introduzca una ciudad\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=Introduzca un descuento global v\\u00E1lido. El valor que proporcione debe ser un porcentaje.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=Oferta {0} creada\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=Oferta {0} actualizada\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=Correcto\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=Oferta {0} creada con advertencias\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=Oferta {0} actualizada con advertencias\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=Rellene todos los campos obligatorios con entradas v\\u00E1lidas\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=Campos obligatorios\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=No se ha podido crear la oferta. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=Cargando...\n\n#XBUT, 20: add button for items list in review screen\nADD=A\\u00F1adir\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=Introduzca un intervalo de fechas v\\u00E1lido\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=No se ha podido actualizar la oferta. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=Revisar y crear oferta\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=Revisar y editar oferta {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=Guardar\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=Seleccionar cliente\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=Vence en {0} d\\u00EDas\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=Vence hoy\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=Vence ma\\u00F1ana\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={1}, {0}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=Fecha de vencimiento\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=Estado global\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=Vencidas\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=No vencidas\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=Vencen hoy\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=Vencen ma\\u00F1ana\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=Vence en los pr\\u00F3ximos {0} d\\u00EDas\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=Confirmaci\\u00F3n\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=No hai descripci\\u00F3n\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=Elija "Actualizar" para la actualizar la info.\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=Rechazar todo\n\n#XBUT, 20: Done button item details\nDONE=Finalizar\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=Seleccionar un motivo para rechazar todas las posiciones\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=N\\u00FAmero de material\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=Motivo de rechazo\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=Estado de proceso\n\n#XFLD, 30: Rejected in Table items\nREJECTED=Rechazada\n\n#XTIT: title for reject all popup\nREJECTTITLE=Motivos del rechazo\n\n#XTIT: title for reject \nITEM_DETAILS=Detalles de la posici\\u00F3n\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=Ninguno\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=Estado de rechazo\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=No rechazada\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=Rechazada parcialmente\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=Rechazada por completo\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=No referenciada\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=Referenciada parcialmente\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=Rechazada parcialmente/Referenciada parcialmente\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=Referenciada por completo\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=Rechazada por completo\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=Estado de rechazo\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=Estado de rechazo\n\n#YMSG, 50: Display error title\nERRORTITLE=Error\n\n#XFLD, 30: Reference Status\nREFSTATUS=Estado de referencia\n',



	"cus/sd/myquotations/i18n/i18n_fr.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Mes offres ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=D\\u00E9tails\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=S\\u00E9lectionner un client\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=Synth\\u00E8se contact\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=Mes offres\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=Offres\n\n# XFLD, 30:Label for quotation number\nQUOTATION=Offre {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=R\\u00E9ceptionnaire\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=Date de livraison souhait\\u00E9e\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=Date de livraison souhait\\u00E9e\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=Valide du/au\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=Description\n\n#XFLD, 15: column title for list of materials\nQUANTITY=Quantit\\u00E9\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=Disponibilit\\u00E9\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=Prix catalogue\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=Prix brut\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, prix catalogue\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=Remise\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=Valeur nette\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, valeur nette\n\n#XFLD, 10: items title for a table\nITEMS=D\\u00E9tails postes ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=Copier\n\n#XBUT , 10: label for button\nEDIT=Modifier\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=% de remise globale\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=Remise globale\\u00A0\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=Date d\'expiration\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=Valeur nette\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=Statut\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=Date de cr\\u00E9ation\n\n#XFLD, 10: Label for sold to\nSOLDTO=Donneur d\'ordre\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=Cond. paiement\n\n#XFLD, 20: Label for expiry date \nEXPIRES=Date d\'expiration\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=Date d\'\'expiration\\u00A0\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=En cours\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=Cl\\u00F4tur\\u00E9e\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=En cours de traitement\n\n#XBUT , 10: label for button\nCANCEL=Annuler\n\n#XFLD , 20: label for net value\nNETVALUE=Valeur nette\n\n#XFLD , 10: label for Tax\nTAX=Taxe\n\n#XFLD , 10: label for Total\nTOTAL=Total\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=D\\u00E9tails de l\'offre\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=Adresse du r\\u00E9ceptionnaire\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=Groupe de marchandises\n\n#XFLD, 15: label for division\nDIVISION=Division\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=Poids brut\n\n#XFLD, 30: label for net weight\nNETWEIGHT=Poids net\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=Dimensions\n\n#XFLD, 15: label for dimensions \nVOLUME=Volume\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=Articles ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=Pays\n\n#XFLD, 30: label for Street/House number\nSTREET=Rue/Num\\u00E9ro de rue\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=Code postal/ville\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=D\\u00E9tails client\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=Article ajout\\u00E9 au panier\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=Note cr\\u00E9\\u00E9e\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=Note non cr\\u00E9\\u00E9e\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=Non indiqu\\u00E9\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=Le poste {0}-{1} a \\u00E9t\\u00E9 supprim\\u00E9.\n\n#XFLD, 40: Customer Reference\nCUSTREF=R\\u00E9f\\u00E9rence client\n\n#XFLD, 20: PO Number\nCREATED_ON=Cr\\u00E9\\u00E9e le\n\n#XBUT, 10: filter popover button\nOK=OK\n\n#XBUT, 20: filter popover button\nRESET=R\\u00E9init.\n\n#XBUT, 10: filter popover button\nADDTOCART=Au panier\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=Ajouter articles au panier\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=Perte des modifications non sauvegard\\u00E9es. Voulez-vous poursuivre ?\n\n#YMSG, 50: Display message\nWARNING=Avertissement\n\n#YMSG, 50: Display ERROR title\nERROR=Erreur\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=S\\u00E9lectionner pays\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=Aucun r\\u00E9sultat trouv\\u00E9\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=Echec du jeton de s\\u00E9curit\\u00E9. Relancez Mes offres.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=Informations\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=Notes\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=Pi\\u00E8ces jtes\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=Contacts\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=Entrez un pays valide\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=Saisissez un nombre sup\\u00E9rieur \\u00E0 0\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=Saisissez un pays\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=Entrez une date.\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=Actualiser\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=Saisissez un pourcentage de remise valide\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=Saisissez une rue\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=Saisissez un code postal\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=Saisissez une ville\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=Saisissez une remise globale valide. La valeur doit \\u00EAtre un pourcentage.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=Offre client {0} cr\\u00E9\\u00E9e\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=Offre client {0} mise \\u00E0 jour\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=Termin\\u00E9 correctement\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=Offre {0} cr\\u00E9\\u00E9e avec avertissements.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=Offre {0} mise \\u00E0 jour avec avertissements.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=Renseignez toutes les zones obligatoires par des entr\\u00E9es valides.\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=Zones obligatoires\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=Impossible de cr\\u00E9er l\'\'offre. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=Chargement...\n\n#XBUT, 20: add button for items list in review screen\nADD=Ajouter\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=Saisissez une plage de dates valide\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=Impossible de mettre l\'\'offre \\u00E0 jour. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=R\\u00E9viser et cr\\u00E9er offre\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=R\\u00E9viser et modifier l\'\'offre client {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=Sauveg.\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=S\\u00E9lectionner client\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=Expiration dans {0} jours\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=Expire aujourd\'hui\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=Expire demain\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={0} {1}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=Date d\'expiration\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=Statut global\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=Expir\\u00E9e\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=Non expir\\u00E9e\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=Expire aujourd\'hui\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=Expire demain\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=Expire dans les {0} prochains jours.\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=Confirmation\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=Aucune description disponible\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=S\\u00E9lectionnez "Actualiser" pour une M\\u00E0J des prix.\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=Rejeter tout\n\n#XBUT, 20: Done button item details\nDONE=Termin\\u00E9\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=S\\u00E9lectionnez un motif pour le rejet de tous les postes \\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=Num\\u00E9ro d\'article\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=Motif de rejet\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=Statut de traitement\n\n#XFLD, 30: Rejected in Table items\nREJECTED=Rejet\\u00E9\n\n#XTIT: title for reject all popup\nREJECTTITLE=Motifs pour rejet\n\n#XTIT: title for reject \nITEM_DETAILS=D\\u00E9tails du poste\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=N\\u00E9ant\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=Statut du rejet\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=Non rejet\\u00E9e\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=Partiellement rejet\\u00E9e\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=Enti\\u00E8rement rejet\\u00E9e\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=Non r\\u00E9f\\u00E9renc\\u00E9e\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=Partiellement r\\u00E9f\\u00E9renc\\u00E9e\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=Partiellement rejet\\u00E9e/Partiellement r\\u00E9f\\u00E9renc\\u00E9e\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=Enti\\u00E8rement r\\u00E9f\\u00E9renc\\u00E9e\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=Enti\\u00E8rement rejet\\u00E9e\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=Statut du rejet\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=Statut du rejet\n\n#YMSG, 50: Display error title\nERRORTITLE=Erreur\n\n#XFLD, 30: Reference Status\nREFSTATUS=Statut de r\\u00E9f\\u00E9rence\n',



	"cus/sd/myquotations/i18n/i18n_hu.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Saj\\u00E1t aj\\u00E1nlatok ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=R\\u00E9szletek\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=Vev\\u0151 kiv\\u00E1laszt\\u00E1sa\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=T\\u00E1rgyal\\u00F3partnerek \\u00E1ttekint\\u00E9se\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=Saj\\u00E1t aj\\u00E1nlatok\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=Aj\\u00E1nlatok\n\n# XFLD, 30:Label for quotation number\nQUOTATION=Aj\\u00E1nlat {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=\\u00C1rufogad\\u00F3\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=K\\u00E9rt sz\\u00E1ll\\u00EDt\\u00E1si d\\u00E1tum\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=K\\u00E9rt sz\\u00E1ll\\u00EDt\\u00E1si d\\u00E1tum\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=\\u00C9rv\\u00E9nyess\\u00E9g kezdete/v\\u00E9ge\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=Le\\u00EDr\\u00E1s\n\n#XFLD, 15: column title for list of materials\nQUANTITY=Mennyis\\u00E9g\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=Rendelkez\\u00E9sre \\u00E1ll\\u00E1s\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=Lista\\u00E1r\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=Brutt\\u00F3 \\u00E1r\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, lista\\u00E1r\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=Engedm\\u00E9ny\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=Nett\\u00F3 \\u00E9rt\\u00E9k\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, nett\\u00F3 \\u00E9rt\\u00E9k\n\n#XFLD, 10: items title for a table\nITEMS=T\\u00E9telr\\u00E9szletek ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=M\\u00E1sol\\u00E1s\n\n#XBUT , 10: label for button\nEDIT=M\\u00F3dos\\u00EDt\\u00E1s\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=Teljes engedm\\u00E9ny sz\\u00E1zal\\u00E9kban\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=Teljes engedm\\u00E9ny\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=Lej\\u00E1rati d\\u00E1tum\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=Nett\\u00F3 \\u00E9rt\\u00E9k\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=St\\u00E1tus\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=L\\u00E9trehoz\\u00E1s d\\u00E1tuma\n\n#XFLD, 10: Label for sold to\nSOLDTO=Megrendel\\u0151\\:\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=Fizet\\u00E9si felt\\u00E9telek\n\n#XFLD, 20: Label for expiry date \nEXPIRES=Lej\\u00E1rati d\\u00E1tum\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=Lej\\u00E1rati d\\u00E1tum\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=Megnyit\\u00E1s\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=Befejez\\u0151d\\u00F6tt\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=Feldolgoz\\u00E1s alatt\n\n#XBUT , 10: label for button\nCANCEL=M\\u00E9gse\n\n#XFLD , 20: label for net value\nNETVALUE=Nett\\u00F3 \\u00E9rt\\u00E9k\n\n#XFLD , 10: label for Tax\nTAX=Ad\\u00F3\n\n#XFLD , 10: label for Total\nTOTAL=\\u00D6sszesen\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=Aj\\u00E1nlat r\\u00E9szletei\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=\\u00C1rufogad\\u00F3 c\\u00EDme\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=Anyagcsoport\n\n#XFLD, 15: label for division\nDIVISION=R\\u00E9szleg\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=Brutt\\u00F3 s\\u00FAly\n\n#XFLD, 30: label for net weight\nNETWEIGHT=Nett\\u00F3 s\\u00FAly\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=Dimenzi\\u00F3k\n\n#XFLD, 15: label for dimensions \nVOLUME=Mennyis\\u00E9g\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=Anyagok ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=Orsz\\u00E1g\n\n#XFLD, 30: label for Street/House number\nSTREET=Utca/h\\u00E1zsz\\u00E1m\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=Postai ir\\u00E1ny\\u00EDt\\u00F3sz\\u00E1m/v\\u00E1ros\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=Vev\\u0151 r\\u00E9szletei\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=Anyag hozz\\u00E1adva a bev\\u00E1s\\u00E1rl\\u00F3kos\\u00E1rhoz\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=Jegyzet l\\u00E9trehozva\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=Jegyzet nem lett l\\u00E9trehozva\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=Nincs meghat\\u00E1rozva\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=T\\u00E9tel {0}-{1} el van t\\u00E1vol\\u00EDtva\n\n#XFLD, 40: Customer Reference\nCUSTREF=Vev\\u0151i referencia\n\n#XFLD, 20: PO Number\nCREATED_ON=L\\u00E9trehoz\\u00E1s d\\u00E1tuma\n\n#XBUT, 10: filter popover button\nOK=OK\n\n#XBUT, 20: filter popover button\nRESET=Vissza\\u00E1ll\\u00EDt\\u00E1s\n\n#XBUT, 10: filter popover button\nADDTOCART=Hozz\\u00E1ad\\u00E1s a kos\\u00E1rhoz\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=Anyagok hozz\\u00E1ad\\u00E1sa a kos\\u00E1rhoz\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=A nem mentett m\\u00F3dos\\u00EDt\\u00E1sok elvesznek. Folytatja?\n\n#YMSG, 50: Display message\nWARNING=Figyelmeztet\\u00E9s\n\n#YMSG, 50: Display ERROR title\nERROR=Hiba\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=Orsz\\u00E1g v\\u00E1laszt\\u00E1sa\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=Nincs tal\\u00E1lat\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=Hib\\u00E1s biztons\\u00E1gi token. K\\u00E9rem, ind\\u00EDtsa \\u00FAjra a Saj\\u00E1t aj\\u00E1nlatok opci\\u00F3t.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=Inform\\u00E1ci\\u00F3k\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=Megjegyz\\u00E9sek\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=Mell\\u00E9kletek\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=Kapcsolatok\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=\\u00C9rv\\u00E9nyes orsz\\u00E1got adjon meg\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=0-n\\u00E1l nagyobb sz\\u00E1mot adjon meg\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=Adja meg az orsz\\u00E1got\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=Adja meg a d\\u00E1tumot\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=Friss\\u00EDt\\u00E9s\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=\\u00C9rv\\u00E9nyes engedm\\u00E9nysz\\u00E1zal\\u00E9kot adjon meg\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=Adja meg az utcanevet\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=Adjon meg postai ir\\u00E1ny\\u00EDt\\u00F3sz\\u00E1mot\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=Adja meg a v\\u00E1rost\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=\\u00C9rv\\u00E9nyes teljes engedm\\u00E9nyt adjon meg. A megadott \\u00E9rt\\u00E9knek sz\\u00E1zal\\u00E9knak kell lennie.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=Aj\\u00E1nlat {0} l\\u00E9trej\\u00F6tt\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=Aj\\u00E1nlat {0} aktualiz\\u00E1l\\u00F3dott\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=Sikeres\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=Az aj\\u00E1nlat {0} figyelmeztet\\u00E9sekkel j\\u00F6tt l\\u00E9tre.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=Az aj\\u00E1nlat {0} figyelmeztet\\u00E9sekkel aktualiz\\u00E1l\\u00F3dott.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=Az \\u00F6sszes k\\u00F6telez\\u0151 mez\\u0151be \\u00E9rv\\u00E9nyes bejegyz\\u00E9st adjon meg\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=K\\u00F6telez\\u0151 mez\\u0151k\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=Nem siker\\u00FClt az aj\\u00E1nlat l\\u00E9trehoz\\u00E1sa {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=Bet\\u00F6lt\\u00E9s...\n\n#XBUT, 20: add button for items list in review screen\nADD=Hozz\\u00E1ad\\u00E1s\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=\\u00C9rv\\u00E9nyes d\\u00E1tumtartom\\u00E1nyt adjon meg\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=Nem siker\\u00FClt az aj\\u00E1nlat aktualiz\\u00E1l\\u00E1sa {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=Aj\\u00E1nlat ellen\\u0151rz\\u00E9se \\u00E9s l\\u00E9trehoz\\u00E1sa\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=Aj\\u00E1nlat ellen\\u0151rz\\u00E9se \\u00E9s m\\u00F3dos\\u00EDt\\u00E1sa {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=Ment\\u00E9s\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=Vev\\u0151 kiv\\u00E1laszt\\u00E1sa\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=Lej\\u00E1r {0} nap m\\u00FAlva\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=Ma j\\u00E1r le\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=Holnap j\\u00E1r le\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={1}{0}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=Lej\\u00E1rati d\\u00E1tum\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=\\u00D6sszst\\u00E1tus\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=Lej\\u00E1rt\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=Nem j\\u00E1rt le\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=Ma j\\u00E1r le\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=Holnap j\\u00E1r le\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=Lej\\u00E1r a k\\u00F6vetkez\\u0151 {0} nap m\\u00FAlva\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=Visszaigazol\\u00E1s\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=Nincs el\\u00E9rhet\\u0151 le\\u00EDr\\u00E1s\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=\\u00C1rk\\u00E9pz\\u00E9si inf\\u00F3 a Friss\\u00EDt\\u00E9s gombbal aktualiz\\u00E1lhat\\u00F3\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=\\u00D6sszes elutas\\u00EDt\\u00E1sa\n\n#XBUT, 20: Done button item details\nDONE=K\\u00E9sz\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=V\\u00E1lasszon okot az \\u00F6sszes t\\u00E9tel elutas\\u00EDt\\u00E1s\\u00E1hoz\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=Anyagsz\\u00E1m\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=Elutas\\u00EDt\\u00E1s oka\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=Feldolgoz\\u00E1s st\\u00E1tus\n\n#XFLD, 30: Rejected in Table items\nREJECTED=Elutas\\u00EDtva\n\n#XTIT: title for reject all popup\nREJECTTITLE=Elutas\\u00EDt\\u00E1s okai\n\n#XTIT: title for reject \nITEM_DETAILS=T\\u00E9tel r\\u00E9szletei\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=Nincs\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=Elutas\\u00EDt\\u00E1si st\\u00E1tus\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=Nincs elutas\\u00EDtva\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=R\\u00E9szben elutas\\u00EDtva\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=Teljesen elutas\\u00EDtva\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=Nincs hivatkoz\\u00E1s\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=R\\u00E9szben hivatkozva\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=R\\u00E9szben elutas\\u00EDtva / r\\u00E9szben hivatkozva\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=Teljesen hivatkozva\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=Teljesen elutas\\u00EDtva\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=Elutas\\u00EDt\\u00E1si st\\u00E1tus\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=Elutas\\u00EDt\\u00E1si st\\u00E1tus\n\n#YMSG, 50: Display error title\nERRORTITLE=Hiba\n\n#XFLD, 30: Reference Status\nREFSTATUS=Referencia st\\u00E1tus\n',



	"cus/sd/myquotations/i18n/i18n_it.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Le mie offerte ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Dettagli\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=Seleziona cliente\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=Riepilogo contatto\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=Le mie offerte\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=Offerte\n\n# XFLD, 30:Label for quotation number\nQUOTATION=Offerta {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=Destinatario merci\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=Data di consegna richiesta\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=Data di consegna richiesta\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=Valido da/a\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=Descrizione\n\n#XFLD, 15: column title for list of materials\nQUANTITY=Quantit\\u00E0\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=Disponibilit\\u00E0\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=Prezzo di listino\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=Prezzo lordo\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, prezzo di listino\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=Sconto\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=Valore netto\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, valore netto\n\n#XFLD, 10: items title for a table\nITEMS=Dettagli posizione ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=Copia\n\n#XBUT , 10: label for button\nEDIT=Elabora\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=Percentuale di sconto complessivo\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=Sconto complessivo\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=Data scadenza\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=Valore netto\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=Stato\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=Data di creazione\n\n#XFLD, 10: Label for sold to\nSOLDTO=Acquirente\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=Condizioni di pag.\n\n#XFLD, 20: Label for expiry date \nEXPIRES=Data scadenza\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=Data di scadenza\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=Aperto\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=Completato\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=In elaborazione\n\n#XBUT , 10: label for button\nCANCEL=Annulla\n\n#XFLD , 20: label for net value\nNETVALUE=Valore netto\n\n#XFLD , 10: label for Tax\nTAX=Imposta\n\n#XFLD , 10: label for Total\nTOTAL=Totale\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=Dettagli offerta\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=Indirizzo del destinatario merci\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=Gruppo di materiali\n\n#XFLD, 15: label for division\nDIVISION=Settore\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=Peso lordo\n\n#XFLD, 30: label for net weight\nNETWEIGHT=Peso netto\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=Dimensioni\n\n#XFLD, 15: label for dimensions \nVOLUME=Volume\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=Materiali ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=Paese\n\n#XFLD, 30: label for Street/House number\nSTREET=Via/Numero civico\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=CAP/Citt\\u00E0\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=Dettagli cliente\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=Materiale aggiunto al carrello\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=Nota creata\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=Nota non creata\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=Non specificato\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=La posizione {0}-{1} \\u00E8 stata rimossa\n\n#XFLD, 40: Customer Reference\nCUSTREF=Riferimento cliente\n\n#XFLD, 20: PO Number\nCREATED_ON=Data di creazione\n\n#XBUT, 10: filter popover button\nOK=OK\n\n#XBUT, 20: filter popover button\nRESET=Resetta\n\n#XBUT, 10: filter popover button\nADDTOCART=Aggiungi al carrello\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=Aggiungi materiali al carrello\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=Le modifiche non salvate andranno perse. Proseguire?\n\n#YMSG, 50: Display message\nWARNING=Messaggio di avvertimento\n\n#YMSG, 50: Display ERROR title\nERROR=Errore\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=Seleziona paese\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=Nessun risultato trovato\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=Token di sicurezza non riuscito. Riavvia Le mie offerte.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=Informazioni\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=Note\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=Allegati\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=Contatti\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=Inserisci un paese valido\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=Inserisci un numero maggiore di 0\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=Inserisci un paese\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=Inserisci una data\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=Aggiorna\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=Inserisci una percentuale valida di sconto\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=Inserisci una via\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=Inserisci un codice postale\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=Inserisci una citt\\u00E0\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=Inserisci uno sconto complessivo valido sotto forma di percentuale.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=Offerta {0} creata\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=Offerta {0} aggiornata\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=Corretta esecuzione\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=Offerta {0} creata con messaggi di avvertimento.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=Offerta {0} aggiornata con messaggi di avvertimento.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=Inserisci valori validi in tutti i campi obbligatori\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=Campi obbligatori\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=Offerta non creata. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=In caricamento...\n\n#XBUT, 20: add button for items list in review screen\nADD=Aggiungi\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=Inserisci un intervallo date valido\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=Offerta non aggiornata. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=Rivedi e crea l\'offerta\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=Rivedi ed elabora l\'\'offerta {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=Salva\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=Seleziona cliente\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=Scade tra {0} giorni\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=Scade oggi\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=Scade domani\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={1} {0}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=Data scadenza\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=Stato globale\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=Scaduto\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=Non scaduto\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=Scadono oggi\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=Scadono domani\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=Scade nei prossimi {0} giorni\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=Conferma\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=Nessuna descrizione disponibile\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=Seleziona "Aggiorna" per agg. informazioni prezzo.\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=Rifiuta tutto\n\n#XBUT, 20: Done button item details\nDONE=Fine\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=Seleziona un motivo per rifiutare tutte le posizioni\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=Numero materiale\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=Motivo del rifiuto\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=Stato di elaborazione\n\n#XFLD, 30: Rejected in Table items\nREJECTED=Rifiutato\n\n#XTIT: title for reject all popup\nREJECTTITLE=Motivi del rifiuto\n\n#XTIT: title for reject \nITEM_DETAILS=Dettagli posizione\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=Ness.\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=Stato rifiuto\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=Non rifiutato\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=Rifiutato parzialmente\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=Con rifiuto completo\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=Senza riferimento\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=Con riferimento parziale\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=Con rifiuto/riferimento parziale\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=Con riferimento completo\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=Con rifiuto completo\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=Stato rifiuto\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=Stato rifiuto\n\n#YMSG, 50: Display error title\nERRORTITLE=Errore\n\n#XFLD, 30: Reference Status\nREFSTATUS=Stato del riferimento\n',



	"cus/sd/myquotations/i18n/i18n_iw.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u05D4\\u05E6\\u05E2\\u05D5\\u05EA \\u05D4\\u05DE\\u05D7\\u05D9\\u05E8 \\u05E9\\u05DC\\u05D9 ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u05E4\\u05E8\\u05D8\\u05D9\\u05DD\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=\\u05D1\\u05D7\\u05E8 \\u05DC\\u05E7\\u05D5\\u05D7\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=\\u05E1\\u05E7\\u05D9\\u05E8\\u05EA \\u05D0\\u05D9\\u05E9 \\u05E7\\u05E9\\u05E8\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=\\u05D4\\u05E6\\u05E2\\u05D5\\u05EA \\u05D4\\u05DE\\u05D7\\u05D9\\u05E8 \\u05E9\\u05DC\\u05D9\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=\\u05D4\\u05E6\\u05E2\\u05D5\\u05EA \\u05DE\\u05D7\\u05D9\\u05E8\n\n# XFLD, 30:Label for quotation number\nQUOTATION=\\u05D4\\u05E6\\u05E2\\u05EA \\u05DE\\u05D7\\u05D9\\u05E8 {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=\\u05D2\\u05D5\\u05E8\\u05DD \\u05DE\\u05E7\\u05D1\\u05DC\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05D0\\u05E1\\u05E4\\u05E7\\u05D4 \\u05DE\\u05D1\\u05D5\\u05E7\\u05E9\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05D0\\u05E1\\u05E4\\u05E7\\u05D4 \\u05DE\\u05D1\\u05D5\\u05E7\\u05E9\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=\\u05D1\\u05EA\\u05D5\\u05E7\\u05E3 \\u05DE-/\\u05E2\\u05D3\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=\\u05EA\\u05D9\\u05D0\\u05D5\\u05E8\n\n#XFLD, 15: column title for list of materials\nQUANTITY=\\u05DB\\u05DE\\u05D5\\u05EA\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=\\u05D6\\u05DE\\u05D9\\u05E0\\u05D5\\u05EA\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=\\u05DE\\u05D7\\u05D9\\u05E8 \\u05DE\\u05D7\\u05D9\\u05E8\\u05D5\\u05DF\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=\\u05DE\\u05D7\\u05D9\\u05E8 \\u05D1\\u05E8\\u05D5\\u05D8\\u05D5\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, \\u05DE\\u05D7\\u05D9\\u05E8 \\u05DE\\u05D7\\u05D9\\u05E8\\u05D5\\u05DF\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=\\u05D4\\u05E0\\u05D7\\u05D4\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=\\u05E2\\u05E8\\u05DA \\u05E0\\u05D8\\u05D5\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, \\u05E2\\u05E8\\u05DA \\u05E0\\u05D8\\u05D5\n\n#XFLD, 10: items title for a table\nITEMS=\\u05E4\\u05E8\\u05D8\\u05D9 \\u05E4\\u05E8\\u05D9\\u05D8 ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=\\u05D4\\u05E2\\u05EA\\u05E7\n\n#XBUT , 10: label for button\nEDIT=\\u05E2\\u05E8\\u05D5\\u05DA\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=\\u05D0\\u05D7\\u05D5\\u05D6 \\u05D4\\u05E0\\u05D7\\u05D4 \\u05DB\\u05D5\\u05DC\\u05DC\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=\\u05D4\\u05E0\\u05D7\\u05D4 \\u05DB\\u05D5\\u05DC\\u05DC\\u05EA\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05EA\\u05E4\\u05D5\\u05D2\\u05D4\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=\\u05E2\\u05E8\\u05DA \\u05E0\\u05D8\\u05D5\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05D9\\u05E6\\u05D9\\u05E8\\u05D4\n\n#XFLD, 10: Label for sold to\nSOLDTO=\\u05D2\\u05D5\\u05E8\\u05DD \\u05DE\\u05D6\\u05DE\\u05D9\\u05DF\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=\\u05EA\\u05E0\\u05D0\\u05D9 \\u05EA\\u05E9\\u05DC\\u05D5\\u05DD\n\n#XFLD, 20: Label for expiry date \nEXPIRES=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05EA\\u05E4\\u05D5\\u05D2\\u05D4\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05EA\\u05E4\\u05D5\\u05D2\\u05D4\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=\\u05E4\\u05EA\\u05D5\\u05D7\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=\\u05D4\\u05D5\\u05E9\\u05DC\\u05DD\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=\\u05D1\\u05E2\\u05D9\\u05D1\\u05D5\\u05D3\n\n#XBUT , 10: label for button\nCANCEL=\\u05D1\\u05D8\\u05DC\n\n#XFLD , 20: label for net value\nNETVALUE=\\u05E2\\u05E8\\u05DA \\u05E0\\u05D8\\u05D5\n\n#XFLD , 10: label for Tax\nTAX=\\u05DE\\u05E1\n\n#XFLD , 10: label for Total\nTOTAL=\\u05E1\\u05DA \\u05D4\\u05DB\\u05D5\\u05DC\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=\\u05E4\\u05E8\\u05D8\\u05D9 \\u05D4\\u05E6\\u05E2\\u05EA \\u05DE\\u05D7\\u05D9\\u05E8\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=\\u05DB\\u05EA\\u05D5\\u05D1\\u05EA \\u05E9\\u05DC \\u05D2\\u05D5\\u05E8\\u05DD \\u05DE\\u05E7\\u05D1\\u05DC\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=\\u05E7\\u05D1\\u05D5\\u05E6\\u05EA \\u05D7\\u05D5\\u05DE\\u05E8\\u05D9\\u05DD\n\n#XFLD, 15: label for division\nDIVISION=\\u05D7\\u05D8\\u05D9\\u05D1\\u05D4\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=\\u05DE\\u05E9\\u05E7\\u05DC \\u05D1\\u05E8\\u05D5\\u05D8\\u05D5\n\n#XFLD, 30: label for net weight\nNETWEIGHT=\\u05DE\\u05E9\\u05E7\\u05DC \\u05E0\\u05D8\\u05D5\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=\\u05DE\\u05DE\\u05D3\\u05D9\\u05DD\n\n#XFLD, 15: label for dimensions \nVOLUME=\\u05E0\\u05E4\\u05D7 \\u05DE\\u05DB\\u05D9\\u05E8\\u05D5\\u05EA\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=\\u05D7\\u05D5\\u05DE\\u05E8\\u05D9\\u05DD ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=\\u05DE\\u05D3\\u05D9\\u05E0\\u05D4\n\n#XFLD, 30: label for Street/House number\nSTREET=\\u05E8\\u05D7\\u05D5\\u05D1/\\u05DE\\u05E1\\u05E4\\u05E8 \\u05D1\\u05D9\\u05EA\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=\\u05DE\\u05D9\\u05E7\\u05D5\\u05D3/\\u05E2\\u05D9\\u05E8\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=\\u05E4\\u05E8\\u05D8\\u05D9 \\u05DC\\u05E7\\u05D5\\u05D7\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=\\u05D7\\u05D5\\u05DE\\u05E8 \\u05E0\\u05D5\\u05E1\\u05E3 \\u05DC\\u05E2\\u05D2\\u05DC\\u05EA \\u05D4\\u05E7\\u05E0\\u05D9\\u05D5\\u05EA\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=\\u05E0\\u05D5\\u05E6\\u05E8\\u05D4 \\u05D4\\u05E2\\u05E8\\u05D4\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=\\u05DC\\u05D0 \\u05E0\\u05D5\\u05E6\\u05E8\\u05D4 \\u05D4\\u05E2\\u05E8\\u05D4\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=\\u05DC\\u05D0 \\u05E6\\u05D5\\u05D9\\u05DF\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=\\u05E4\\u05E8\\u05D9\\u05D8 {0}-{1} \\u05D4\\u05D5\\u05E1\\u05E8\n\n#XFLD, 40: Customer Reference\nCUSTREF=\\u05E1\\u05D9\\u05DE\\u05D5\\u05DB\\u05D9\\u05DF \\u05DC\\u05DC\\u05E7\\u05D5\\u05D7\n\n#XFLD, 20: PO Number\nCREATED_ON=\\u05E0\\u05D5\\u05E6\\u05E8 \\u05D1\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA\n\n#XBUT, 10: filter popover button\nOK=OK\n\n#XBUT, 20: filter popover button\nRESET=\\u05D0\\u05E4\\u05E1\n\n#XBUT, 10: filter popover button\nADDTOCART=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05DC\\u05E2\\u05D2\\u05DC\\u05EA \\u05D4\\u05E7\\u05E0\\u05D9\\u05D5\\u05EA\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05D7\\u05D5\\u05DE\\u05E8\\u05D9\\u05DD \\u05DC\\u05E2\\u05D2\\u05DC\\u05EA \\u05D4\\u05E7\\u05E0\\u05D9\\u05D5\\u05EA\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=\\u05E9\\u05D9\\u05E0\\u05D5\\u05D9\\u05D9\\u05DD \\u05E9\\u05DC\\u05D0 \\u05E0\\u05E9\\u05DE\\u05E8\\u05D5 \\u05D9\\u05D0\\u05D1\\u05D3\\u05D5. \\u05D4\\u05D0\\u05DD \\u05D1\\u05E8\\u05E6\\u05D5\\u05E0\\u05DA \\u05DC\\u05D4\\u05DE\\u05E9\\u05D9\\u05DA?\n\n#YMSG, 50: Display message\nWARNING=\\u05D0\\u05D6\\u05D4\\u05E8\\u05D4\n\n#YMSG, 50: Display ERROR title\nERROR=\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=\\u05D1\\u05D7\\u05E8 \\u05DE\\u05D3\\u05D9\\u05E0\\u05D4\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=\\u05DC\\u05D0 \\u05E0\\u05DE\\u05E6\\u05D0\\u05D5 \\u05EA\\u05D5\\u05E6\\u05D0\\u05D5\\u05EA\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=token \\u05D0\\u05D1\\u05D8\\u05D7\\u05D4 \\u05E0\\u05DB\\u05E9\\u05DC. \\u05D0\\u05EA\\u05D7\\u05DC \\u05D0\\u05EA \\u05D4\\u05E6\\u05E2\\u05D5\\u05EA \\u05D4\\u05DE\\u05D7\\u05D9\\u05E8 \\u05E9\\u05DC\\u05D9.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=\\u05DE\\u05D9\\u05D3\\u05E2\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=\\u05D4\\u05E2\\u05E8\\u05D5\\u05EA\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=\\u05E7\\u05D1\\u05E6\\u05D9.\\u05DE\\u05E6\\u05D5\\u05E8\\u05E4\\u05D9\\u05DD\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=\\u05D0\\u05E0\\u05E9\\u05D9 \\u05E7\\u05E9\\u05E8\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=\\u05D4\\u05D6\\u05DF \\u05DE\\u05D3\\u05D9\\u05E0\\u05D4 \\u05D7\\u05D5\\u05E7\\u05D9\\u05EA\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=\\u05D4\\u05D6\\u05DF \\u05DE\\u05E1\\u05E4\\u05E8 \\u05D2\\u05D3\\u05D5\\u05DC \\u05DE\\u05D0\\u05E4\\u05E1\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=\\u05D4\\u05D6\\u05DF \\u05DE\\u05D3\\u05D9\\u05E0\\u05D4\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=\\u05D4\\u05D6\\u05DF \\u05EA\\u05D0\\u05E8\\u05D9\\u05DA\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=\\u05E8\\u05E2\\u05E0\\u05DF\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=\\u05D4\\u05D6\\u05DF \\u05D0\\u05D7\\u05D5\\u05D6 \\u05D4\\u05E0\\u05D7\\u05D4 \\u05D7\\u05D5\\u05E7\\u05D9\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=\\u05D4\\u05D6\\u05DF \\u05E8\\u05D7\\u05D5\\u05D1\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=\\u05D4\\u05D6\\u05DF \\u05DE\\u05D9\\u05E7\\u05D5\\u05D3\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=\\u05D4\\u05D6\\u05DF \\u05E2\\u05D9\\u05E8\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=\\u05D4\\u05D6\\u05DF \\u05D4\\u05E0\\u05D7\\u05D4 \\u05DB\\u05D5\\u05DC\\u05DC\\u05EA \\u05D7\\u05D5\\u05E7\\u05D9\\u05EA. \\u05D4\\u05E2\\u05E8\\u05DA \\u05E9\\u05DE\\u05E1\\u05D5\\u05E4\\u05E7 \\u05D7\\u05D9\\u05D9\\u05D1 \\u05DC\\u05D4\\u05D9\\u05D5\\u05EA \\u05D0\\u05D7\\u05D5\\u05D6.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=\\u05D4\\u05E6\\u05E2\\u05EA \\u05DE\\u05D7\\u05D9\\u05E8 {0} \\u05E0\\u05D5\\u05E6\\u05E8\\u05D4\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=\\u05D4\\u05E6\\u05E2\\u05EA \\u05DE\\u05D7\\u05D9\\u05E8 {0} \\u05E2\\u05D5\\u05D3\\u05DB\\u05E0\\u05D4\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=\\u05D4\\u05E6\\u05DC\\u05D7\\u05D4\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=\\u05D4\\u05E6\\u05E2\\u05EA \\u05DE\\u05D7\\u05D9\\u05E8 {0} \\u05E0\\u05D5\\u05E6\\u05E8\\u05D4 \\u05E2\\u05DD \\u05D0\\u05D6\\u05D4\\u05E8\\u05D5\\u05EA.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=\\u05D4\\u05E6\\u05E2\\u05EA \\u05DE\\u05D7\\u05D9\\u05E8 {0} \\u05E2\\u05D5\\u05D3\\u05DB\\u05E0\\u05D4 \\u05E2\\u05DD \\u05D0\\u05D6\\u05D4\\u05E8\\u05D5\\u05EA.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=\\u05E1\\u05E4\\u05E7 \\u05D4\\u05D6\\u05E0\\u05D5\\u05EA \\u05D7\\u05D5\\u05E7\\u05D9\\u05D5\\u05EA \\u05D1\\u05DB\\u05DC \\u05E9\\u05D3\\u05D5\\u05EA \\u05D4\\u05D7\\u05D5\\u05D1\\u05D4\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=\\u05E9\\u05D3\\u05D5\\u05EA \\u05D7\\u05D5\\u05D1\\u05D4\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=\\u05DC\\u05D0 \\u05E0\\u05D9\\u05EA\\u05DF \\u05D4\\u05D9\\u05D4 \\u05DC\\u05D9\\u05E6\\u05D5\\u05E8 \\u05D4\\u05E6\\u05E2\\u05EA \\u05DE\\u05D7\\u05D9\\u05E8. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=\\u05D8\\u05D5\\u05E2\\u05DF...\n\n#XBUT, 20: add button for items list in review screen\nADD=\\u05D4\\u05D5\\u05E1\\u05E3\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=\\u05D4\\u05D6\\u05DF \\u05D8\\u05D5\\u05D5\\u05D7 \\u05EA\\u05D0\\u05E8\\u05D9\\u05DB\\u05D9\\u05DD \\u05D7\\u05D5\\u05E7\\u05D9\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=\\u05DC\\u05D0 \\u05E0\\u05D9\\u05EA\\u05DF \\u05D4\\u05D9\\u05D4 \\u05DC\\u05E2\\u05D3\\u05DB\\u05DF \\u05D4\\u05E6\\u05E2\\u05EA \\u05DE\\u05D7\\u05D9\\u05E8. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=\\u05E1\\u05E7\\u05D5\\u05E8 \\u05D5\\u05E6\\u05D5\\u05E8 \\u05D4\\u05E6\\u05E2\\u05EA \\u05DE\\u05D7\\u05D9\\u05E8\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=\\u05E1\\u05E7\\u05D5\\u05E8 \\u05D5\\u05E2\\u05E8\\u05D5\\u05DA \\u05D4\\u05E6\\u05E2\\u05EA \\u05DE\\u05D7\\u05D9\\u05E8 {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=\\u05E9\\u05DE\\u05D5\\u05E8\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=\\u05D1\\u05D7\\u05E8 \\u05DC\\u05E7\\u05D5\\u05D7\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=\\u05E4\\u05D2 \\u05EA\\u05D5\\u05E7\\u05E3 \\u05EA\\u05D5\\u05DA {0} \\u05D9\\u05DE\\u05D9\\u05DD\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=\\u05E4\\u05D2 \\u05EA\\u05D5\\u05E7\\u05E4\\u05D5 \\u05D4\\u05D9\\u05D5\\u05DD\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=\\u05E4\\u05D2 \\u05EA\\u05D5\\u05E7\\u05E4\\u05D5 \\u05DE\\u05D7\\u05E8\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={0} {1}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05EA\\u05E4\\u05D5\\u05D2\\u05D4\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1 \\u05DB\\u05D5\\u05DC\\u05DC\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=\\u05E4\\u05D2 \\u05EA\\u05D5\\u05E7\\u05E3\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=\\u05DC\\u05D0 \\u05E4\\u05D2 \\u05EA\\u05D5\\u05E7\\u05E3\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=\\u05E4\\u05D2 \\u05EA\\u05D5\\u05E7\\u05E3 \\u05D4\\u05D9\\u05D5\\u05DD\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=\\u05E4\\u05D2 \\u05EA\\u05D5\\u05E7\\u05E3 \\u05DE\\u05D7\\u05E8\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=\\u05E4\\u05D2 \\u05EA\\u05D5\\u05E7\\u05E3 \\u05D1-{0} \\u05D4\\u05D9\\u05DE\\u05D9\\u05DD \\u05D4\\u05D1\\u05D0\\u05D9\\u05DD\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=\\u05D0\\u05D9\\u05E9\\u05D5\\u05E8\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=\\u05D0\\u05D9\\u05DF \\u05EA\\u05D9\\u05D0\\u05D5\\u05E8 \\u05D6\\u05DE\\u05D9\\u05DF\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=\\u05D1\\u05D7\\u05E8 \'\\u05E8\\u05E2\\u05E0\\u05DF\' \\u05DB\\u05D3\\u05D9 \\u05DC\\u05E2\\u05D3\\u05DB\\u05DF \\u05DE\\u05D9\\u05D3\\u05E2 \\u05D4\\u05DE\\u05D7\\u05E8\\u05D4.\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=\\u05D3\\u05D7\\u05D4 \\u05D4\\u05DB\\u05D5\\u05DC\n\n#XBUT, 20: Done button item details\nDONE=\\u05D1\\u05D5\\u05E6\\u05E2\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=\\u05D1\\u05D7\\u05E8 \\u05E1\\u05D9\\u05D1\\u05D4 \\u05DC\\u05D3\\u05D7\\u05D9\\u05D9\\u05EA \\u05DB\\u05DC \\u05D4\\u05E4\\u05E8\\u05D9\\u05D8\\u05D9\\u05DD\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=\\u05DE\\u05E7"\\u05D8\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=\\u05E1\\u05D9\\u05D1\\u05D4 \\u05DC\\u05D3\\u05D7\\u05D9\\u05D9\\u05D4\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1 \\u05E2\\u05D9\\u05D1\\u05D5\\u05D3\n\n#XFLD, 30: Rejected in Table items\nREJECTED=\\u05E0\\u05D3\\u05D7\\u05D4\n\n#XTIT: title for reject all popup\nREJECTTITLE=\\u05E1\\u05D9\\u05D1\\u05D5\\u05EA \\u05DC\\u05D3\\u05D7\\u05D9\\u05D9\\u05D4\n\n#XTIT: title for reject \nITEM_DETAILS=\\u05E4\\u05E8\\u05D8\\u05D9 \\u05E4\\u05E8\\u05D9\\u05D8\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=\\u05DC\\u05DC\\u05D0\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1 \\u05D3\\u05D7\\u05D9\\u05D9\\u05D4\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=\\u05DC\\u05D0 \\u05E0\\u05D3\\u05D7\\u05D4\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=\\u05E0\\u05D3\\u05D7\\u05D4 \\u05D1\\u05D0\\u05D5\\u05E4\\u05DF \\u05D7\\u05DC\\u05E7\\u05D9\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=\\u05E0\\u05D3\\u05D7\\u05D4 \\u05D1\\u05DE\\u05DC\\u05D5\\u05D0\\u05D5\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=\\u05DC\\u05D0 \\u05D1\\u05E1\\u05D9\\u05DE\\u05D5\\u05DB\\u05D9\\u05DF\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=\\u05D1\\u05E1\\u05D9\\u05DE\\u05D5\\u05DB\\u05D9\\u05DF \\u05D1\\u05D0\\u05D5\\u05E4\\u05DF \\u05D7\\u05DC\\u05E7\\u05D9\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=\\u05E0\\u05D3\\u05D7\\u05D4 \\u05D1\\u05D0\\u05D5\\u05E4\\u05DF \\u05D7\\u05DC\\u05E7\\u05D9 / \\u05D1\\u05E1\\u05D9\\u05DE\\u05D5\\u05DB\\u05D9\\u05DF \\u05D1\\u05D0\\u05D5\\u05E4\\u05DF \\u05D7\\u05DC\\u05E7\\u05D9\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=\\u05D1\\u05E1\\u05D9\\u05DE\\u05D5\\u05DB\\u05D9\\u05DF \\u05D1\\u05DE\\u05DC\\u05D5\\u05D0\\u05D5\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=\\u05E0\\u05D3\\u05D7\\u05D4 \\u05D1\\u05DE\\u05DC\\u05D5\\u05D0\\u05D5\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1 \\u05D3\\u05D7\\u05D9\\u05D9\\u05D4\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1 \\u05D3\\u05D7\\u05D9\\u05D9\\u05D4\n\n#YMSG, 50: Display error title\nERRORTITLE=\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4\n\n#XFLD, 30: Reference Status\nREFSTATUS=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1 \\u05E1\\u05D9\\u05DE\\u05D5\\u05DB\\u05D9\\u05DF\n',



	"cus/sd/myquotations/i18n/i18n_ja.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u898B\\u7A4D ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u8A73\\u7D30\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=\\u5F97\\u610F\\u5148\\u9078\\u629E\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=\\u53D6\\u5F15\\u5148\\u62C5\\u5F53\\u8005\\u6982\\u8981\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=\\u898B\\u7A4D\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=\\u898B\\u7A4D\n\n# XFLD, 30:Label for quotation number\nQUOTATION=\\u898B\\u7A4D {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=\\u51FA\\u8377\\u5148\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=\\u6307\\u5B9A\\u7D0D\\u671F\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=\\u6307\\u5B9A\\u7D0D\\u671F\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=\\u6709\\u52B9\\u958B\\u59CB/\\u7D42\\u4E86\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=\\u30C6\\u30AD\\u30B9\\u30C8\n\n#XFLD, 15: column title for list of materials\nQUANTITY=\\u6570\\u91CF\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=\\u5229\\u7528\\u53EF\\u80FD\\u5728\\u5EAB\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=\\u30EA\\u30B9\\u30C8\\u4FA1\\u683C\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=\\u7DCF\\u984D\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}\\u3001\\u30EA\\u30B9\\u30C8\\u4FA1\\u683C\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=\\u5024\\u5F15\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=\\u6B63\\u5473\\u984D\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}\\u3001\\u6B63\\u5473\\u984D\n\n#XFLD, 10: items title for a table\nITEMS=\\u660E\\u7D30\\u8A73\\u7D30 ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=\\u30B3\\u30D4\\u30FC\n\n#XBUT , 10: label for button\nEDIT=\\u7DE8\\u96C6\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=\\u7DCF\\u5272\\u5F15\\u7387\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=\\u5168\\u4F53\\u5024\\u5F15\\:  {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=\\u6709\\u52B9\\u671F\\u9650\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=\\u6B63\\u5473\\u984D\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=\\u767B\\u9332\\u65E5\\u4ED8\n\n#XFLD, 10: Label for sold to\nSOLDTO=\\u53D7\\u6CE8\\u5148\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=\\u652F\\u6255\\u6761\\u4EF6\n\n#XFLD, 20: Label for expiry date \nEXPIRES=\\u6709\\u52B9\\u671F\\u9650\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=\\u6709\\u52B9\\u671F\\u9650\\:  {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=\\u672A\\u51E6\\u7406\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=\\u5B8C\\u4E86\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=\\u51E6\\u7406\\u4E2D\n\n#XBUT , 10: label for button\nCANCEL=\\u4E2D\\u6B62\n\n#XFLD , 20: label for net value\nNETVALUE=\\u6B63\\u5473\\u984D\n\n#XFLD , 10: label for Tax\nTAX=\\u7A0E\n\n#XFLD , 10: label for Total\nTOTAL=\\u5408\\u8A08\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=\\u898B\\u7A4D\\u8A73\\u7D30\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=\\u51FA\\u8377\\u5148\\u4F4F\\u6240\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=\\u54C1\\u76EE\\u30B0\\u30EB\\u30FC\\u30D7\n\n#XFLD, 15: label for division\nDIVISION=\\u88FD\\u54C1\\u90E8\\u9580\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=\\u7DCF\\u91CD\\u91CF\n\n#XFLD, 30: label for net weight\nNETWEIGHT=\\u6B63\\u5473\\u91CD\\u91CF\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=\\u6B21\\u5143\n\n#XFLD, 15: label for dimensions \nVOLUME=\\u5BB9\\u7A4D\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=\\u54C1\\u76EE ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=\\u56FD\n\n#XFLD, 30: label for Street/House number\nSTREET=\\u5730\\u540D/\\u756A\\u5730-\\u53F7\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=\\u90F5\\u4FBF\\u756A\\u53F7/\\u5E02\\u533A\\u753A\\u6751\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=\\u5F97\\u610F\\u5148\\u8A73\\u7D30\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=\\u54C1\\u76EE\\u304C\\u30AB\\u30FC\\u30C8\\u306B\\u8FFD\\u52A0\\u3055\\u308C\\u307E\\u3057\\u305F\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=\\u30E1\\u30E2\\u304C\\u767B\\u9332\\u3055\\u308C\\u307E\\u3057\\u305F\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=\\u30E1\\u30E2\\u306F\\u767B\\u9332\\u3055\\u308C\\u307E\\u305B\\u3093\\u3067\\u3057\\u305F\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=\\u6307\\u5B9A\\u306A\\u3057\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=\\u660E\\u7D30 {0}-{1} \\u304C\\u524A\\u9664\\u3055\\u308C\\u307E\\u3057\\u305F\n\n#XFLD, 40: Customer Reference\nCUSTREF=\\u5F97\\u610F\\u5148\\u53C2\\u7167\n\n#XFLD, 20: PO Number\nCREATED_ON=\\u767B\\u9332\\u65E5\\u4ED8\n\n#XBUT, 10: filter popover button\nOK=OK\n\n#XBUT, 20: filter popover button\nRESET=\\u30EA\\u30BB\\u30C3\\u30C8\n\n#XBUT, 10: filter popover button\nADDTOCART=\\u30AB\\u30FC\\u30C8\\u306B\\u8FFD\\u52A0\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=\\u54C1\\u76EE\\u3092\\u30AB\\u30FC\\u30C8\\u306B\\u8FFD\\u52A0\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=\\u672A\\u4FDD\\u5B58\\u306E\\u5909\\u66F4\\u306F\\u5931\\u308F\\u308C\\u307E\\u3059\\u3002\\u7D9A\\u884C\\u3057\\u307E\\u3059\\u304B\\u3002\n\n#YMSG, 50: Display message\nWARNING=\\u8B66\\u544A\n\n#YMSG, 50: Display ERROR title\nERROR=\\u30A8\\u30E9\\u30FC\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=\\u56FD\\u9078\\u629E\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=\\u7D50\\u679C\\u306F\\u3042\\u308A\\u307E\\u305B\\u3093\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=\\u30BB\\u30AD\\u30E5\\u30EA\\u30C6\\u30A3\\u30C8\\u30FC\\u30AF\\u30F3\\u306B\\u5931\\u6557\\u3057\\u307E\\u3057\\u305F\\u3002\\u898B\\u7A4D\\u3092\\u518D\\u8D77\\u52D5\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\n\n#XBUT, 12: Icon tab Info\nICON_INFO=\\u60C5\\u5831\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=\\u30E1\\u30E2\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=\\u6DFB\\u4ED8\\u6587\\u66F8\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=\\u53D6\\u5F15\\u5148\\u62C5\\u5F53\\u8005\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=\\u6709\\u52B9\\u306A\\u56FD\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=0 \\u3088\\u308A\\u5927\\u304D\\u3044\\u6570\\u5B57\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=\\u56FD\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=\\u65E5\\u4ED8\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=\\u30EA\\u30D5\\u30EC\\u30C3\\u30B7\\u30E5\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=\\u6709\\u52B9\\u306A\\u5272\\u5F15\\u7387\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=\\u5730\\u540D\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=\\u90F5\\u4FBF\\u756A\\u53F7\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=\\u5E02\\u533A\\u753A\\u6751\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=\\u6709\\u52B9\\u306A\\u5168\\u4F53\\u5024\\u5F15\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\\u3053\\u306E\\u5024\\u306F\\u30D1\\u30FC\\u30BB\\u30F3\\u30C8\\u3067\\u6307\\u5B9A\\u3059\\u308B\\u5FC5\\u8981\\u304C\\u3042\\u308A\\u307E\\u3059\\u3002\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=\\u898B\\u7A4D {0} \\u304C\\u767B\\u9332\\u3055\\u308C\\u307E\\u3057\\u305F\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=\\u898B\\u7A4D {0} \\u304C\\u66F4\\u65B0\\u3055\\u308C\\u307E\\u3057\\u305F\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=\\u6210\\u529F\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=\\u898B\\u7A4D {0} \\u304C\\u767B\\u9332\\u3055\\u308C\\u307E\\u3057\\u305F (\\u8B66\\u544A\\u3042\\u308A)\\u3002\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=\\u898B\\u7A4D {0} \\u304C\\u66F4\\u65B0\\u3055\\u308C\\u307E\\u3057\\u305F (\\u8B66\\u544A\\u3042\\u308A)\\u3002\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=\\u3059\\u3079\\u3066\\u306E\\u5165\\u529B\\u5FC5\\u9808\\u9805\\u76EE\\u306B\\u6709\\u52B9\\u306A\\u5024\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=\\u5165\\u529B\\u5FC5\\u9808\\u9805\\u76EE\\u3067\\u3059\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=\\u898B\\u7A4D\\u3092\\u767B\\u9332\\u3067\\u304D\\u307E\\u305B\\u3093\\u3067\\u3057\\u305F\\u3002 {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=\\u30ED\\u30FC\\u30C9\\u4E2D...\n\n#XBUT, 20: add button for items list in review screen\nADD=\\u8FFD\\u52A0\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=\\u6709\\u52B9\\u65E5\\u4ED8\\u7BC4\\u56F2\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=\\u898B\\u7A4D\\u3092\\u66F4\\u65B0\\u3067\\u304D\\u307E\\u305B\\u3093\\u3067\\u3057\\u305F\\u3002 {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=\\u898B\\u7A4D\\u306E\\u30EC\\u30D3\\u30E5\\u30FC\\u304A\\u3088\\u3073\\u767B\\u9332\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=\\u898B\\u7A4D {0} \\u306E\\u30EC\\u30D3\\u30E5\\u30FC\\u304A\\u3088\\u3073\\u7DE8\\u96C6\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=\\u4FDD\\u5B58\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=\\u5F97\\u610F\\u5148\\u9078\\u629E\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG={0} \\u65E5\\u4EE5\\u5185\\u306B\\u6709\\u52B9\\u671F\\u9650\\u5207\\u308C\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=\\u672C\\u65E5\\u6709\\u52B9\\u671F\\u9650\\u5207\\u308C\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=\\u660E\\u65E5\\u6709\\u52B9\\u671F\\u9650\\u5207\\u308C\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={1} {0}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=\\u6709\\u52B9\\u671F\\u9650\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=\\u5168\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=\\u6709\\u52B9\\u671F\\u9650\\u5207\\u308C\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=\\u6709\\u52B9\\u671F\\u9650\\u5185\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=\\u672C\\u65E5\\u6709\\u52B9\\u671F\\u9650\\u5207\\u308C\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=\\u660E\\u65E5\\u6709\\u52B9\\u671F\\u9650\\u5207\\u308C\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=\\u6B21\\u306E {0} \\u65E5\\u4EE5\\u5185\\u306B\\u6709\\u52B9\\u671F\\u9650\\u5207\\u308C\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=\\u78BA\\u8A8D\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=\\u4F7F\\u7528\\u3067\\u304D\\u308B\\u30C6\\u30AD\\u30B9\\u30C8\\u304C\\u3042\\u308A\\u307E\\u305B\\u3093\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH="\\u30EA\\u30D5\\u30EC\\u30C3\\u30B7\\u30E5" \\u306B\\u3088\\u308A\\u4FA1\\u683C\\u60C5\\u5831\\u3092\\u66F4\\u65B0\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=\\u3059\\u3079\\u3066\\u62D2\\u5426\n\n#XBUT, 20: Done button item details\nDONE=\\u5B8C\\u4E86\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=\\u5168\\u660E\\u7D30\\u3092\\u62D2\\u5426\\u3059\\u308B\\u7406\\u7531\\u306E\\u9078\\u629E\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=\\u54C1\\u76EE\\u30B3\\u30FC\\u30C9\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=\\u62D2\\u5426\\u7406\\u7531\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=\\u51E6\\u7406\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9\n\n#XFLD, 30: Rejected in Table items\nREJECTED=\\u62D2\\u5426\\u6E08\n\n#XTIT: title for reject all popup\nREJECTTITLE=\\u62D2\\u5426\\u7406\\u7531\n\n#XTIT: title for reject \nITEM_DETAILS=\\u660E\\u7D30\\u8A73\\u7D30\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=\\u306A\\u3057\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=\\u62D2\\u5426\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=\\u672A\\u62D2\\u5426\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=\\u4E00\\u90E8\\u62D2\\u5426\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=\\u5B8C\\u5168\\u62D2\\u5426\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=\\u672A\\u53C2\\u7167\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=\\u90E8\\u5206\\u53C2\\u7167\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=\\u90E8\\u5206\\u62D2\\u5426/\\u90E8\\u5206\\u53C2\\u7167\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=\\u5B8C\\u5168\\u53C2\\u7167\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=\\u5B8C\\u5168\\u62D2\\u5426\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=\\u62D2\\u5426\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=\\u62D2\\u5426\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9\n\n#YMSG, 50: Display error title\nERRORTITLE=\\u30A8\\u30E9\\u30FC\n\n#XFLD, 30: Reference Status\nREFSTATUS=\\u53C2\\u7167\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9\n',



	"cus/sd/myquotations/i18n/i18n_no.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Mine tilbud ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Detaljer\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=Velg kunde\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=Kontaktoversikt\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=Mine tilbud\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=Tilbud\n\n# XFLD, 30:Label for quotation number\nQUOTATION=Tilbud {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=Varemottaker\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=\\u00D8nsket leveringsdato\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=\\u00D8nsket leveringsdato\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=Gyldig fra/til\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=Beskrivelse\n\n#XFLD, 15: column title for list of materials\nQUANTITY=Kvantum\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=Tilgjengelighet\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=Listepris\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=Bruttopris\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, listepris\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=Rabatt\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=Nettoverdi\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, nettoverdi\n\n#XFLD, 10: items title for a table\nITEMS=Posisjonsdetaljer ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=Kopier\n\n#XBUT , 10: label for button\nEDIT=Rediger\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=Generell rabattprosentsats\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=Generell rabatt\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=Utl\\u00F8psdato\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=Nettoverdi\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=Status\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=Opprettingsdato\n\n#XFLD, 10: Label for sold to\nSOLDTO=Oppdragsgiver\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=Betalingsvilk\\u00E5r\n\n#XFLD, 20: Label for expiry date \nEXPIRES=Utl\\u00F8psdato\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=Utl\\u00F8psdato\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=\\u00C5pen\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=Fullf\\u00F8rt\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=Under behandling\n\n#XBUT , 10: label for button\nCANCEL=Avbryt\n\n#XFLD , 20: label for net value\nNETVALUE=Nettoverdi\n\n#XFLD , 10: label for Tax\nTAX=Avgift\n\n#XFLD , 10: label for Total\nTOTAL=Totalt\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=Tilbudsdetaljer\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=Mottakeradresse\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=Materialgruppe\n\n#XFLD, 15: label for division\nDIVISION=Divisjon\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=Bruttovekt\n\n#XFLD, 30: label for net weight\nNETWEIGHT=Nettovekt\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=Dimensjoner\n\n#XFLD, 15: label for dimensions \nVOLUME=Volum\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=Materialer ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=Land\n\n#XFLD, 30: label for Street/House number\nSTREET=Gate/vei / husnummer\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=Postnummer/sted\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=Kundedetaljer\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=Material tilf\\u00F8yd i handlekurv\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=Merknad opprettet\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=Merknad er ikke opprettet\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=Ikke oppgitt\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=Posisjon {0}-{1} er fjernet\n\n#XFLD, 40: Customer Reference\nCUSTREF=Kundereferanse\n\n#XFLD, 20: PO Number\nCREATED_ON=Opprettet den\n\n#XBUT, 10: filter popover button\nOK=OK\n\n#XBUT, 20: filter popover button\nRESET=Tilbakestill\n\n#XBUT, 10: filter popover button\nADDTOCART=Legg i handlekurv\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=Tilf\\u00F8y materialer i handlekurv\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=Du vil miste endringer som ikke er lagret. Vil du fortsette?\n\n#YMSG, 50: Display message\nWARNING=Advarsel\n\n#YMSG, 50: Display ERROR title\nERROR=Feil\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=Velg land\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=Finner ingen resultater\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=Sikkerhetstoken mislyktes. Start Mine tilbud p\\u00E5 nytt.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=Informasjon\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=Merknader\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=Vedlegg\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=Kontakter\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=Oppgi et gyldig land\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=Oppgi et tall st\\u00F8rre enn 0\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=Oppgi et land\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=Oppgi en dato\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=Oppdater\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=Oppgi en gyldig rabattprosentsats\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=Oppgi gate/vei\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=Oppgi et postnummer\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=Oppgi et sted\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=Oppgi en gyldig generell rabatt. Den oppgitte verdien m\\u00E5 v\\u00E6re en prosentsats.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=Tilbud {0} er opprettet\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=Tilbud {0} er oppdatert\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=Utf\\u00F8rt\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=Tilbud {0} er opprettet med advarsler.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=Tilbud {0} er oppdatert med advarsler.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=Oppgi gyldige inndata i alle obligatoriske felt\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=Obligatoriske felt\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=Kan ikke opprette tilbud. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=Laster ...\n\n#XBUT, 20: add button for items list in review screen\nADD=Tilf\\u00F8y\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=Oppgi et gyldig datointervall\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=Kan ikke oppdatere tilbud. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=Kontroller og opprett tilbud\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=Kontroller og rediger tilbud {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=Lagre\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=Velg kunde\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=Utl\\u00F8per om {0} dager\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=Utl\\u00F8per i dag\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=Utl\\u00F8per i morgen\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={1} {0}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=Utl\\u00F8psdato\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=Generell status\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=Utl\\u00F8pt\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=Ikke utl\\u00F8pt\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=Utl\\u00F8per i dag\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=Utl\\u00F8per i morgen\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=Utl\\u00F8per i l\\u00F8pet av de neste {0} dagene\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=Bekreftelse\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=Ingen beskrivelse er tilgjengelig\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=Velg "Oppdater" for \\u00E5 oppdatere prisinformasjon\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=Avvis alle\n\n#XBUT, 20: Done button item details\nDONE=Utf\\u00F8rt\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=Velg en \\u00E5rsak for \\u00E5 avvise alle posisjonene\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=Materialnummer\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=Avvisnings\\u00E5rsak\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=Behandlingsstatus\n\n#XFLD, 30: Rejected in Table items\nREJECTED=Avsl\\u00E5tt\n\n#XTIT: title for reject all popup\nREJECTTITLE=Avvisnings\\u00E5rsaker\n\n#XTIT: title for reject \nITEM_DETAILS=Posisjonsdetaljer\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=Ingen\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=Avvisningsstatus\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=Ikke avvist\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=Delvis avvist\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=Fullstendig avvist\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=Ikke referert\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=Delvis referert\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=Delvis avvist / delvis referert\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=Fullstendig referert\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=Fullstendig avvist\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=Avvisningsstatus\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=Avvisningsstatus\n\n#YMSG, 50: Display error title\nERRORTITLE=Feil\n\n#XFLD, 30: Reference Status\nREFSTATUS=Referansestatus\n',



	"cus/sd/myquotations/i18n/i18n_pl.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Moje oferty ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Szczeg\\u00F3\\u0142y\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=Wybierz klienta\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=Przegl\\u0105d kontakt\\u00F3w\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=Moje oferty\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=Oferty\n\n# XFLD, 30:Label for quotation number\nQUOTATION=Oferta {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=Odbiorca\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=Wymagana data dostawy\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=Wymagana data dostawy\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=Wa\\u017Cne od/do\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=Opis\n\n#XFLD, 15: column title for list of materials\nQUANTITY=Ilo\\u015B\\u0107\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=Dost\\u0119pno\\u015B\\u0107\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=Cena katalogowa\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=Cena brutto\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, cena katalogowa\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=Rabat\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=Warto\\u015B\\u0107 netto\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, warto\\u015B\\u0107 netto\n\n#XFLD, 10: items title for a table\nITEMS=Szczeg\\u00F3\\u0142y pozycji ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=Kopiuj\n\n#XBUT , 10: label for button\nEDIT=Edytuj\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=Procent rabatu og\\u00F3lnego\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=Og\\u00F3lny rabat\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=Data wa\\u017Cno\\u015Bci\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=Warto\\u015B\\u0107 netto\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=Status\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=Data utworzenia\n\n#XFLD, 10: Label for sold to\nSOLDTO=Zleceniodawca\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=Warunki p\\u0142atno\\u015Bci\n\n#XFLD, 20: Label for expiry date \nEXPIRES=Data wa\\u017Cno\\u015Bci\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=Data wa\\u017Cno\\u015Bci\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=Otwarte\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=Zako\\u0144czone\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=W przetwarzaniu\n\n#XBUT , 10: label for button\nCANCEL=Anuluj\n\n#XFLD , 20: label for net value\nNETVALUE=Warto\\u015B\\u0107 netto\n\n#XFLD , 10: label for Tax\nTAX=Podatek\n\n#XFLD , 10: label for Total\nTOTAL=Suma\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=Szczeg\\u00F3\\u0142y oferty\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=Adres odbiorcy\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=Grupa materia\\u0142owa\n\n#XFLD, 15: label for division\nDIVISION=Oddzia\\u0142\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=Waga brutto\n\n#XFLD, 30: label for net weight\nNETWEIGHT=Waga netto\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=Wymiary\n\n#XFLD, 15: label for dimensions \nVOLUME=Obj\\u0119to\\u015B\\u0107\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=Materia\\u0142y ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=Kraj\n\n#XFLD, 30: label for Street/House number\nSTREET=Numer ulicy/domu\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=Kod pocztowy/miasto\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=Szczeg\\u00F3\\u0142y klienta\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=Dodano materia\\u0142 do koszyka\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=Utworzono notatk\\u0119\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=Nie utworzono notatki\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=Nieokre\\u015Blone\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=Usuni\\u0119to pozycj\\u0119 {0}-{1}\n\n#XFLD, 40: Customer Reference\nCUSTREF=Referencja klienta\n\n#XFLD, 20: PO Number\nCREATED_ON=Data utworzenia\n\n#XBUT, 10: filter popover button\nOK=OK\n\n#XBUT, 20: filter popover button\nRESET=Resetuj\n\n#XBUT, 10: filter popover button\nADDTOCART=Dodaj do koszyka\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=Dodaj materia\\u0142y do koszyka\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=Niezapisane zmiany zostan\\u0105 utracone. Kontynuowa\\u0107?\n\n#YMSG, 50: Display message\nWARNING=Ostrze\\u017Cenie\n\n#YMSG, 50: Display ERROR title\nERROR=B\\u0142\\u0105d\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=Wybierz kraj\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=Nie znaleziono wynik\\u00F3w\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=B\\u0142\\u0105d tokena bezpiecze\\u0144stwa. Uruchom ponownie aplikacj\\u0119 Moje oferty.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=Informacje\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=Notatki\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=Za\\u0142\\u0105czniki\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=Kontakty\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=Wpisz prawid\\u0142owy kraj\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=Wpisz liczb\\u0119 wi\\u0119ksz\\u0105 ni\\u017C 0\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=Wpisz kraj\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=Wpisz dat\\u0119\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=Od\\u015Bwie\\u017C\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=Wpisz prawid\\u0142owy procent rabatu\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=Wpisz ulic\\u0119\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=Wpisz kod pocztowy\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=Wpisz miasto\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=Wpisz prawid\\u0142owy rabat og\\u00F3lny. Warto\\u015B\\u0107 musi by\\u0107 procentowa.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=Utworzono ofert\\u0119 {0}\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=Zaktualizowano ofert\\u0119 {0}\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=Powodzenie\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=Utworzono ofert\\u0119 {0} z ostrze\\u017Ceniami.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=Zaktualizowano ofert\\u0119 {0} z ostrze\\u017Ceniami.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=Podaj prawid\\u0142owe wpisy we wszystkich polach obowi\\u0105zkowych\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=Pola obowi\\u0105zkowe\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=Nie mo\\u017Cna by\\u0142o utworzy\\u0107 oferty. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=Wczytywanie...\n\n#XBUT, 20: add button for items list in review screen\nADD=Dodaj\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=Wpisz prawid\\u0142owy zakres dat\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=Nie mo\\u017Cna by\\u0142o zaktualizowa\\u0107 oferty. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=Skontroluj i utw\\u00F3rz ofert\\u0119\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=Weryfikuj i edytuj ofert\\u0119 {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=Zapisz\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=Wybierz klienta\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=Wygasa za {0} dni\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=Wygasa dzisiaj\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=Wygasa jutro\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={1} {0} \n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=Data wa\\u017Cno\\u015Bci\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=Status og\\u00F3lny\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=Wygas\\u0142e\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=Niewygas\\u0142e\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=Wygasa dzi\\u015B\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=Wygasa jutro\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=Wygasa za {0} dni\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=Potwierdzenie\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=Brak dost\\u0119pnego opisu\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=Wybierz "Od\\u015Bwie\\u017C", aby zaktualizowa\\u0107 o cenie.\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=Odrzu\\u0107 wszystkie\n\n#XBUT, 20: Done button item details\nDONE=Gotowe\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=Wybierz przyczyn\\u0119 odrzucenia wszystkich pozycji\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=Numer materia\\u0142u\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=Przyczyna odrzucenia\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=Status przetwarzania\n\n#XFLD, 30: Rejected in Table items\nREJECTED=Odrzucone\n\n#XTIT: title for reject all popup\nREJECTTITLE=Powody odrzucenia\n\n#XTIT: title for reject \nITEM_DETAILS=Szczeg\\u00F3\\u0142y pozycji\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=Brak\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=Status odrzucenia\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=Nieodrzucone\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=Cz\\u0119\\u015Bciowo odrzucone\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=W ca\\u0142o\\u015Bci odrzucone\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=Bez referencji\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=Cz\\u0119\\u015Bciowo z referencj\\u0105\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=Cz\\u0119\\u015Bciowo odrzucone/cz\\u0119\\u015Bciowo z referencj\\u0105\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=W ca\\u0142o\\u015Bci z referencj\\u0105\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=W ca\\u0142o\\u015Bci odrzucone\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=Status odrzucenia\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=Status odrzucenia\n\n#YMSG, 50: Display error title\nERRORTITLE=B\\u0142\\u0105d\n\n#XFLD, 30: Reference Status\nREFSTATUS=Status referencji\n',



	"cus/sd/myquotations/i18n/i18n_pt.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Minhas cota\\u00E7\\u00F5es ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Detalhes\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=Selecionar cliente\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=S\\u00EDntese de contatos\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=Minhas cota\\u00E7\\u00F5es\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=Cota\\u00E7\\u00F5es\n\n# XFLD, 30:Label for quotation number\nQUOTATION=Cota\\u00E7\\u00E3o {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=Recebedor da mercadoria\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=Data solicitada de remessa\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=Data solicitada de remessa\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=V\\u00E1lido de/at\\u00E9\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=Descri\\u00E7\\u00E3o\n\n#XFLD, 15: column title for list of materials\nQUANTITY=Quantidade\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=Disponibilidade\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=Pre\\u00E7o de lista\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=Pre\\u00E7o bruto\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, pre\\u00E7o de lista\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=Desconto\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=Valor l\\u00EDquido\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, valor l\\u00EDquido\n\n#XFLD, 10: items title for a table\nITEMS=Detalhes de item ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=Copiar\n\n#XBUT , 10: label for button\nEDIT=Editar\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=Percentual do desconto global\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=Desconto global\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=Data de expira\\u00E7\\u00E3o\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=Valor l\\u00EDquido\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=Status\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=Data de cria\\u00E7\\u00E3o\n\n#XFLD, 10: Label for sold to\nSOLDTO=Emissor da ordem\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=Condi\\u00E7\\u00F5es pagamento\n\n#XFLD, 20: Label for expiry date \nEXPIRES=Data de expira\\u00E7\\u00E3o\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=Data de expira\\u00E7\\u00E3o\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=Pendente\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=Conclu\\u00EDdo\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=Em processo\n\n#XBUT , 10: label for button\nCANCEL=Anular\n\n#XFLD , 20: label for net value\nNETVALUE=Valor l\\u00EDquido\n\n#XFLD , 10: label for Tax\nTAX=Imposto\n\n#XFLD , 10: label for Total\nTOTAL=Total\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=Detalhes da cota\\u00E7\\u00E3o\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=Endere\\u00E7o de entrega\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=Grupo de materiais\n\n#XFLD, 15: label for division\nDIVISION=Setor atividade\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=Peso bruto\n\n#XFLD, 30: label for net weight\nNETWEIGHT=Peso l\\u00EDquido\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=Dimens\\u00F5es\n\n#XFLD, 15: label for dimensions \nVOLUME=Volume\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=Materiais ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=Pa\\u00EDs\n\n#XFLD, 30: label for Street/House number\nSTREET=Rua/n\\u00BA\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=C\\u00F3digo postal/Cidade\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=Detalhes do cliente\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=Material adicionado ao carrinho\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=Nota criada\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=Nota n\\u00E3o criada\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=N\\u00E3o especificado\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=Item {0}-{1} removido\n\n#XFLD, 40: Customer Reference\nCUSTREF=Refer\\u00EAncia do cliente\n\n#XFLD, 20: PO Number\nCREATED_ON=Criado em\n\n#XBUT, 10: filter popover button\nOK=OK\n\n#XBUT, 20: filter popover button\nRESET=Reiniciar\n\n#XBUT, 10: filter popover button\nADDTOCART=Adic.no carr.\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=Adicionar material ao carrinho\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=Modifica\\u00E7\\u00F5es n\\u00E3o gravadas se perder\\u00E3o. Continuar?\n\n#YMSG, 50: Display message\nWARNING=Advert\\u00EAncia\n\n#YMSG, 50: Display ERROR title\nERROR=Erro\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=Selecionar pa\\u00EDs\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=Nenhum resultado encontrado\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=Falha no token de seguran\\u00E7a. Reiniciar Minhas cota\\u00E7\\u00F5es.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=Informa\\u00E7\\u00E3o\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=Notas\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=Anexos\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=Contatos\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=Inserir um pa\\u00EDs v\\u00E1lido\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=Inserir n\\u00FAmero superior a 0\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=Inserir pa\\u00EDs\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=Insira uma data\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=Atualizar\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=Inserir percentual de desconto v\\u00E1lido\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=Inserir uma rua\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=Inserir c\\u00F3digo postal\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=Inserir cidade\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=Inserir desconto geral v\\u00E1lido. O valor fornecido deve ser uma porcentagem.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=Cota\\u00E7\\u00E3o {0} criada\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=Cota\\u00E7\\u00E3o {0} atualizada\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=Sucesso\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=Cota\\u00E7\\u00E3o {0} criada com advert\\u00EAncias.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=Cota\\u00E7\\u00E3o {0} atualizada com advert\\u00EAncias.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=Preencher todos os campos obrigat\\u00F3rios\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=Campos obrigat\\u00F3rios\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=N\\u00E3o foi poss\\u00EDvel criar cota\\u00E7\\u00E3o. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=Carregando...\n\n#XBUT, 20: add button for items list in review screen\nADD=Adicionar\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=Inserir um intervalo de datas v\\u00E1lido\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=N\\u00E3o foi poss\\u00EDvel atualizar cota\\u00E7\\u00E3o. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=Revis\\u00E3o e criar cota\\u00E7\\u00E3o\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=Revisar e editar cota\\u00E7\\u00E3o {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=Gravar\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=Selecionar cliente\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=Expira em {0} dias\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=Expira hoje\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=Expira amanh\\u00E3\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={1} {0}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=Data de expira\\u00E7\\u00E3o\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=Status global\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=Expiradas\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=N\\u00E3o expiradas\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=Expiram hoje\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=Expiram amanh\\u00E3\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=Expira nos pr\\u00F3ximos {0} dias\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=Confirma\\u00E7\\u00E3o\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=Nenhuma descri\\u00E7\\u00E3o dispon\\u00EDvel\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=Selecione "Atualizar" p/atualizar infos de pre\\u00E7o.\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=Rejeitar tudo\n\n#XBUT, 20: Done button item details\nDONE=Conclu\\u00EDdo\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=Selecione um motivo para rejeitar todos os itens\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=N\\u00BA do material\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=Motivo da rejei\\u00E7\\u00E3o\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=Status de processamento\n\n#XFLD, 30: Rejected in Table items\nREJECTED=Rejeitadas\n\n#XTIT: title for reject all popup\nREJECTTITLE=Motivos para rejei\\u00E7\\u00E3o\n\n#XTIT: title for reject \nITEM_DETAILS=Detalhes do item\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=Nenhum\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=Status de rejei\\u00E7\\u00E3o\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=N\\u00E3o rejeitada\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=Parcialmente rejeitada\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=Totalmente rejeitada\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=N\\u00E3o referenciado\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=Parcialmente referenciado\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=Parcialmente rejeitado/parcialmente referenciado\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=Totalmente referenciado\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=Totalmente rejeitado\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=Status de rejei\\u00E7\\u00E3o\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=Status de rejei\\u00E7\\u00E3o\n\n#YMSG, 50: Display error title\nERRORTITLE=Erro\n\n#XFLD, 30: Reference Status\nREFSTATUS=Status de refer\\u00EAncia\n',



	"cus/sd/myquotations/i18n/i18n_ru.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u041C\\u043E\\u0438 \\u043F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u044F ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0430\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=\\u041E\\u0431\\u0437\\u043E\\u0440 \\u043A\\u043E\\u043D\\u0442\\u0430\\u043A\\u0442\\u0430\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=\\u041C\\u043E\\u0438 \\u043F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u044F\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=\\u041F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u044F\n\n# XFLD, 30:Label for quotation number\nQUOTATION=\\u041F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0435 {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=\\u041F\\u043E\\u043B\\u0443\\u0447\\u0430\\u0442\\u0435\\u043B\\u044C\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=\\u0422\\u0440\\u0435\\u0431\\u0443\\u0435\\u043C\\u0430\\u044F \\u0434\\u0430\\u0442\\u0430 \\u043F\\u043E\\u0441\\u0442\\u0430\\u0432\\u043A\\u0438\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=\\u0422\\u0440\\u0435\\u0431\\u0443\\u0435\\u043C\\u0430\\u044F \\u0434\\u0430\\u0442\\u0430 \\u043F\\u043E\\u0441\\u0442\\u0430\\u0432\\u043A\\u0438\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=\\u0414\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E \\u0441/\\u043F\\u043E\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=\\u041E\\u043F\\u0438\\u0441\\u0430\\u043D\\u0438\\u0435\n\n#XFLD, 15: column title for list of materials\nQUANTITY=\\u041A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=\\u0414\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u043E\\u0441\\u0442\\u044C\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=\\u0426\\u0435\\u043D\\u0430 \\u043F\\u043E \\u043F\\u0440\\u0435\\u0439\\u0441\\u043A\\u0443\\u0440\\u0430\\u043D\\u0442\\u0443\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=\\u0426\\u0435\\u043D\\u0430 \\u0431\\u0440\\u0443\\u0442\\u0442\\u043E\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, \\u043F\\u0440\\u0435\\u0439\\u0441\\u043A\\u0443\\u0440\\u0430\\u043D\\u0442\\u043D\\u0430\\u044F \\u0446\\u0435\\u043D\\u0430\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=\\u0421\\u043A\\u0438\\u0434\\u043A\\u0430\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=\\u0421\\u0442\\u043E\\u0438\\u043C\\u043E\\u0441\\u0442\\u044C \\u043D\\u0435\\u0442\\u0442\\u043E\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, \\u0441\\u0442\\u043E\\u0438\\u043C\\u043E\\u0441\\u0442\\u044C \\u043D\\u0435\\u0442\\u0442\\u043E\n\n#XFLD, 10: items title for a table\nITEMS=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u044F \\u043F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=\\u0421\\u043A\\u043E\\u043F\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C\n\n#XBUT , 10: label for button\nEDIT=\\u041E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u0430\\u0442\\u044C\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=\\u041F\\u0440\\u043E\\u0446\\u0435\\u043D\\u0442 \\u043E\\u0431\\u0449\\u0435\\u0439 \\u0441\\u043A\\u0438\\u0434\\u043A\\u0438\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=\\u0418\\u0442\\u043E\\u0433\\u043E\\u0432\\u0430\\u044F \\u0441\\u043A\\u0438\\u0434\\u043A\\u0430\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=\\u0421\\u0440\\u043E\\u043A \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u044F\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=\\u0421\\u0442\\u043E\\u0438\\u043C\\u043E\\u0441\\u0442\\u044C \\u043D\\u0435\\u0442\\u0442\\u043E\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=\\u0414\\u0430\\u0442\\u0430 \\u0441\\u043E\\u0437\\u0434\\u0430\\u043D\\u0438\\u044F\n\n#XFLD, 10: Label for sold to\nSOLDTO=\\u0417\\u0430\\u043A\\u0430\\u0437\\u0447\\u0438\\u043A\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=\\u0423\\u0441\\u043B\\u043E\\u0432\\u0438\\u044F \\u043F\\u043B\\u0430\\u0442\\u0435\\u0436\\u0430\n\n#XFLD, 20: Label for expiry date \nEXPIRES=\\u0421\\u0440\\u043E\\u043A \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u044F\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=\\u0414\\u0430\\u0442\\u0430 \\u0438\\u0441\\u0442\\u0435\\u0447\\u0435\\u043D\\u0438\\u044F\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=\\u041E\\u0442\\u043A\\u0440\\u044B\\u0442\\u043E\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=\\u0412\\u044B\\u043F\\u043E\\u043B\\u043D\\u0435\\u043D\\u043E\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=\\u0412 \\u043E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u043A\\u0435\n\n#XBUT , 10: label for button\nCANCEL=\\u041E\\u0442\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C\n\n#XFLD , 20: label for net value\nNETVALUE=\\u0421\\u0442\\u043E\\u0438\\u043C\\u043E\\u0441\\u0442\\u044C \\u043D\\u0435\\u0442\\u0442\\u043E\n\n#XFLD , 10: label for Tax\nTAX=\\u041D\\u0430\\u043B\\u043E\\u0433\n\n#XFLD , 10: label for Total\nTOTAL=\\u0418\\u0442\\u043E\\u0433\\u043E\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=\\u041F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0435 \\u043F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=\\u0410\\u0434\\u0440\\u0435\\u0441 \\u043F\\u043E\\u043B\\u0443\\u0447\\u0430\\u0442\\u0435\\u043B\\u044F\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=\\u0413\\u0440\\u0443\\u043F\\u043F\\u0430 \\u043C\\u0430\\u0442\\u0435\\u0440\\u0438\\u0430\\u043B\\u043E\\u0432\n\n#XFLD, 15: label for division\nDIVISION=\\u0421\\u0435\\u043A\\u0442\\u043E\\u0440\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=\\u0412\\u0435\\u0441 \\u0431\\u0440\\u0443\\u0442\\u0442\\u043E\n\n#XFLD, 30: label for net weight\nNETWEIGHT=\\u0412\\u0435\\u0441 \\u043D\\u0435\\u0442\\u0442\\u043E\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=\\u0418\\u0437\\u043C\\u0435\\u0440\\u0435\\u043D\\u0438\\u044F\n\n#XFLD, 15: label for dimensions \nVOLUME=\\u041E\\u0431\\u044A\\u0435\\u043C\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=\\u041C\\u0430\\u0442\\u0435\\u0440\\u0438\\u0430\\u043B\\u044B ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=\\u0421\\u0442\\u0440\\u0430\\u043D\\u0430\n\n#XFLD, 30: label for Street/House number\nSTREET=\\u0423\\u043B\\u0438\\u0446\\u0430/\\u043D\\u043E\\u043C\\u0435\\u0440 \\u0434\\u043E\\u043C\\u0430\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=\\u041F\\u043E\\u0447\\u0442\\u043E\\u0432\\u044B\\u0439 \\u0438\\u043D\\u0434\\u0435\\u043A\\u0441/\\u0433\\u043E\\u0440\\u043E\\u0434\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=\\u0414\\u0430\\u043D\\u043D\\u044B\\u0435 \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0430\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=\\u041C\\u0430\\u0442\\u0435\\u0440\\u0438\\u0430\\u043B \\u0434\\u043E\\u0431\\u0430\\u0432\\u043B\\u0435\\u043D \\u0432 \\u043A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0443\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=\\u041F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u0435 \\u0441\\u043E\\u0437\\u0434\\u0430\\u043D\\u043E\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=\\u041F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u0435 \\u043D\\u0435 \\u0441\\u043E\\u0437\\u0434\\u0430\\u043D\\u043E\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=\\u041D\\u0435 \\u0443\\u043A\\u0430\\u0437\\u0430\\u043D\\u043E\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u044F {0}-{1} \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\\u0430\n\n#XFLD, 40: Customer Reference\nCUSTREF=\\u0421\\u0441\\u044B\\u043B\\u043A\\u0430 \\u043D\\u0430 \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0430\n\n#XFLD, 20: PO Number\nCREATED_ON=\\u0414\\u0430\\u0442\\u0430 \\u0441\\u043E\\u0437\\u0434\\u0430\\u043D\\u0438\\u044F\n\n#XBUT, 10: filter popover button\nOK=\\u041E\\u041A\n\n#XBUT, 20: filter popover button\nRESET=\\u0421\\u0431\\u0440\\u043E\\u0441\n\n#XBUT, 10: filter popover button\nADDTOCART=\\u0412 \\u043A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0443\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u043C\\u0430\\u0442\\u0435\\u0440\\u0438\\u0430\\u043B\\u044B \\u0432 \\u043A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0443\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=\\u041D\\u0435\\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u043D\\u044B\\u0435 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0435 \\u0431\\u0443\\u0434\\u0443\\u0442 \\u0443\\u0442\\u0435\\u0440\\u044F\\u043D\\u044B. \\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C?\n\n#YMSG, 50: Display message\nWARNING=\\u041F\\u0440\\u0435\\u0434\\u0443\\u043F\\u0440\\u0435\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\n\n#YMSG, 50: Display ERROR title\nERROR=\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u0441\\u0442\\u0440\\u0430\\u043D\\u0443\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=\\u041D\\u0435\\u0442 \\u0440\\u0435\\u0437\\u0443\\u043B\\u044C\\u0442\\u0430\\u0442\\u043E\\u0432\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430 \\u043C\\u0430\\u0440\\u043A\\u0435\\u0440\\u0430 \\u0431\\u0435\\u0437\\u043E\\u043F\\u0430\\u0441\\u043D\\u043E\\u0441\\u0442\\u0438. \\u041F\\u0435\\u0440\\u0435\\u0437\\u0430\\u043F\\u0443\\u0441\\u0442\\u0438\\u0442\\u0435 "\\u041C\\u043E\\u0438 \\u043F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u044F".\n\n#XBUT, 12: Icon tab Info\nICON_INFO=\\u0418\\u043D\\u0444\\u043E\\u0440\\u043C\\u0430\\u0446\\u0438\\u044F\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=\\u041F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u044F\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=\\u041F\\u0440\\u0438\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u044F\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=\\u041A\\u043E\\u043D\\u0442\\u0430\\u043A\\u0442\\u044B\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u0443\\u044E \\u0441\\u0442\\u0440\\u0430\\u043D\\u0443\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0447\\u0438\\u0441\\u043B\\u043E \\u0431\\u043E\\u043B\\u044C\\u0448\\u0435 0\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0441\\u0442\\u0440\\u0430\\u043D\\u0443\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0430\\u0442\\u0443\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=\\u041E\\u0431\\u043D\\u043E\\u0432\\u0438\\u0442\\u044C\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u044B\\u0439 \\u043F\\u0440\\u043E\\u0446\\u0435\\u043D\\u0442 \\u0441\\u043A\\u0438\\u0434\\u043A\\u0438\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0443\\u043B\\u0438\\u0446\\u0443\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u043F\\u043E\\u0447\\u0442\\u043E\\u0432\\u044B\\u0439 \\u0438\\u043D\\u0434\\u0435\\u043A\\u0441\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0433\\u043E\\u0440\\u043E\\u0434\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u0443\\u044E \\u043E\\u0431\\u0449\\u0443\\u044E \\u0441\\u043A\\u0438\\u0434\\u043A\\u0443. \\u041F\\u0440\\u0435\\u0434\\u043E\\u0441\\u0442\\u0430\\u0432\\u043B\\u0435\\u043D\\u043D\\u043E\\u0435 \\u0437\\u043D\\u0430\\u0447\\u0435\\u043D\\u0438\\u0435 \\u0434\\u043E\\u043B\\u0436\\u043D\\u043E \\u0431\\u044B\\u0442\\u044C \\u0432 \\u043F\\u0440\\u043E\\u0446\\u0435\\u043D\\u0442\\u0430\\u0445.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=\\u041F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0435 {0} \\u0441\\u043E\\u0437\\u0434\\u0430\\u043D\\u043E\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=\\u041F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0435 {0} \\u043E\\u0431\\u043D\\u043E\\u0432\\u043B\\u0435\\u043D\\u043E\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=\\u0423\\u0441\\u043F\\u0435\\u0448\\u043D\\u043E\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=\\u041F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0435 {0} \\u0441\\u043E\\u0437\\u0434\\u0430\\u043D\\u043E \\u0441 \\u043F\\u0440\\u0435\\u0434\\u0443\\u043F\\u0440\\u0435\\u0436\\u0434\\u0435\\u043D\\u0438\\u044F\\u043C\\u0438.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=\\u041F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0435 {0} \\u043E\\u0431\\u043D\\u043E\\u0432\\u043B\\u0435\\u043D\\u043E \\u0441 \\u043F\\u0440\\u0435\\u0434\\u0443\\u043F\\u0440\\u0435\\u0436\\u0434\\u0435\\u043D\\u0438\\u044F\\u043C\\u0438.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u044B\\u0435 \\u0437\\u043D\\u0430\\u0447\\u0435\\u043D\\u0438\\u044F \\u0432\\u043E \\u0432\\u0441\\u0435 \\u043F\\u043E\\u043B\\u044F \\u043E\\u0431\\u044F\\u0437\\u0430\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0433\\u043E \\u0432\\u0432\\u043E\\u0434\\u0430\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=\\u041F\\u043E\\u043B\\u044F \\u043E\\u0431\\u044F\\u0437\\u0430\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0433\\u043E \\u0432\\u0432\\u043E\\u0434\\u0430\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=\\u041D\\u0435 \\u0443\\u0434\\u0430\\u043B\\u043E\\u0441\\u044C \\u0441\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C \\u043F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0435. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u043A\\u0430...\n\n#XBUT, 20: add button for items list in review screen\nADD=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u044B\\u0439 \\u0434\\u0438\\u0430\\u043F\\u0430\\u0437\\u043E\\u043D \\u0434\\u0430\\u0442\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=\\u041D\\u0435 \\u0443\\u0434\\u0430\\u043B\\u043E\\u0441\\u044C \\u043E\\u0431\\u043D\\u043E\\u0432\\u0438\\u0442\\u044C \\u043F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0435. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=\\u041F\\u0440\\u043E\\u0432\\u0435\\u0440\\u0438\\u0442\\u044C \\u0438 \\u0441\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C \\u043F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0435\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=\\u041F\\u0440\\u043E\\u0441\\u043C\\u043E\\u0442\\u0440\\u0435\\u0442\\u044C \\u0438 \\u043E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u0430\\u0442\\u044C \\u043F\\u0440\\u0435\\u0434\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0435 {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0430\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG=\\u0418\\u0441\\u0442\\u0435\\u043A\\u0430\\u0435\\u0442 \\u0447\\u0435\\u0440\\u0435\\u0437 {0} \\u0434\\u043D.\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=\\u0418\\u0441\\u0442\\u0435\\u043A\\u0430\\u0435\\u0442 \\u0441\\u0435\\u0433\\u043E\\u0434\\u043D\\u044F\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=\\u0418\\u0441\\u0442\\u0435\\u043A\\u0430\\u0435\\u0442 \\u0437\\u0430\\u0432\\u0442\\u0440\\u0430\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={1} {0}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=\\u0421\\u0440\\u043E\\u043A \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u044F\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=\\u041E\\u0431\\u0449\\u0438\\u0439 \\u0441\\u0442\\u0430\\u0442\\u0443\\u0441\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=\\u0418\\u0441\\u0442\\u0435\\u043A\\u043B\\u043E\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=\\u041D\\u0435 \\u0438\\u0441\\u0442\\u0435\\u043A\\u043B\\u043E\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=\\u0418\\u0441\\u0442\\u0435\\u043A\\u0430\\u044E\\u0442 \\u0441\\u0435\\u0433\\u043E\\u0434\\u043D\\u044F\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=\\u0418\\u0441\\u0442\\u0435\\u043A\\u0430\\u044E\\u0442 \\u0437\\u0430\\u0432\\u0442\\u0440\\u0430\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=\\u0418\\u0441\\u0442\\u0435\\u043A\\u0430\\u044E\\u0442 \\u0447\\u0435\\u0440\\u0435\\u0437 \\u0431\\u043B\\u0438\\u0436\\u0430\\u0439\\u0448\\u0438\\u0435 {0} \\u0434\\u043D.\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=\\u041E\\u043F\\u0438\\u0441\\u0430\\u043D\\u0438\\u0435 \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u043E\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=\\u0412\\u044B\\u0431\\u0435\\u0440\\u0438\\u0442\\u0435 "\\u041E\\u0431\\u043D\\u043E\\u0432\\u0438\\u0442\\u044C" \\u0434\\u043B\\u044F \\u043E\\u0431\\u043D\\u043E\\u0432\\u043B\\u0435\\u043D\\u0438\\u044F \\u0434\\u0430\\u043D\\u043D\\u044B\\u0445 \\u043F\\u043E \\u0446\\u0435\\u043D\\u0435.\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=\\u041E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0438\\u0442\\u044C \\u0432\\u0441\\u0435\n\n#XBUT, 20: Done button item details\nDONE=\\u0413\\u043E\\u0442\\u043E\\u0432\\u043E\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=\\u0412\\u044B\\u0431\\u0435\\u0440\\u0438\\u0442\\u0435 \\u043F\\u0440\\u0438\\u0447\\u0438\\u043D\\u0443 \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u0438\\u044F \\u0432\\u0441\\u0435\\u0445 \\u043F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0439\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=\\u041D\\u043E\\u043C\\u0435\\u0440 \\u043C\\u0430\\u0442\\u0435\\u0440\\u0438\\u0430\\u043B\\u0430\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=\\u041F\\u0440\\u0438\\u0447\\u0438\\u043D\\u0430 \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u0438\\u044F\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441 \\u043E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u043A\\u0438\n\n#XFLD, 30: Rejected in Table items\nREJECTED=\\u041E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u043E\n\n#XTIT: title for reject all popup\nREJECTTITLE=\\u041F\\u0440\\u0438\\u0447\\u0438\\u043D\\u044B \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u0438\\u044F\n\n#XTIT: title for reject \nITEM_DETAILS=\\u041F\\u043E\\u0437\\u0438\\u0446\\u0438\\u044F \\u043F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=\\u041D\\u0435\\u0442\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441 \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u0438\\u044F\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=\\u041D\\u0435 \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u043E\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=\\u0427\\u0430\\u0441\\u0442\\u0438\\u0447\\u043D\\u043E \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u043E\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=\\u041F\\u043E\\u043B\\u043D\\u043E\\u0441\\u0442\\u044C\\u044E \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u043E\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=\\u0411\\u0435\\u0437 \\u0441\\u0441\\u044B\\u043B\\u043A\\u0438\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=\\u0421 \\u0447\\u0430\\u0441\\u0442\\u0438\\u0447\\u043D\\u043E\\u0439 \\u0441\\u0441\\u044B\\u043B\\u043A\\u043E\\u0439\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=\\u0427\\u0430\\u0441\\u0442\\u0438\\u0447\\u043D\\u043E \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u043E / \\u0441 \\u0447\\u0430\\u0441\\u0442\\u0438\\u0447\\u043D\\u043E\\u0439 \\u0441\\u0441\\u044B\\u043B\\u043A\\u043E\\u0439\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=\\u0421 \\u043F\\u043E\\u043B\\u043D\\u043E\\u0439 \\u0441\\u0441\\u044B\\u043B\\u043A\\u043E\\u0439\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=\\u041F\\u043E\\u043B\\u043D\\u043E\\u0441\\u0442\\u044C\\u044E \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u043E\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441 \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u0438\\u044F\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441 \\u043E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u0438\\u044F\n\n#YMSG, 50: Display error title\nERRORTITLE=\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430\n\n#XFLD, 30: Reference Status\nREFSTATUS=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441 \\u0441\\u0441\\u044B\\u043B\\u043A\\u0438\n',



	"cus/sd/myquotations/i18n/i18n_tr.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Tekliflerim ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Ayr\\u0131nt\\u0131lar\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=M\\u00FC\\u015Fteri se\\u00E7\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=\\u0130lgili ki\\u015Fiye genel bak\\u0131\\u015F\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=Tekliflerim\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=Teklifler\n\n# XFLD, 30:Label for quotation number\nQUOTATION=Teklif {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\: {1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=Mal\\u0131 teslim alan\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=Talep edilen teslimat tarihi\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=Talep edilen teslimat tarihi\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=Ge\\u00E7erlilik ba\\u015Flang\\u0131c\\u0131/biti\\u015Fi\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=Tan\\u0131m\n\n#XFLD, 15: column title for list of materials\nQUANTITY=Miktar\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=Kullan\\u0131labilirlik\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=Liste fiyat\\u0131\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=Br\\u00FCt fiyat\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}, liste fiyat\\u0131\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=\\u0130ndirim\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=Net de\\u011Fer\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}, net de\\u011Fer\n\n#XFLD, 10: items title for a table\nITEMS=Kalem ayr\\u0131nt\\u0131lar\\u0131 ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=Kopyala\n\n#XBUT , 10: label for button\nEDIT=D\\u00FCzenle\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=Genel indirim y\\u00FCzdesi\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=Genel indirim\\: {0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=Ge\\u00E7erlilik biti\\u015F tarihi\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=Net de\\u011Fer\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=Durum\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=Olu\\u015Fturma tarihi\n\n#XFLD, 10: Label for sold to\nSOLDTO=Sipari\\u015F veren\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=\\u00D6deme ko\\u015Fullar\\u0131\n\n#XFLD, 20: Label for expiry date \nEXPIRES=G\\u00E7rl.bt\\u015F.trh.\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=Ge\\u00E7erlilik biti\\u015F tarihi\\: {0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=A\\u00E7\\u0131k\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=Tamamland\\u0131\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=\\u0130\\u015Fleniyor\n\n#XBUT , 10: label for button\nCANCEL=\\u0130ptal\n\n#XFLD , 20: label for net value\nNETVALUE=Net de\\u011Fer\n\n#XFLD , 10: label for Tax\nTAX=Vergi\n\n#XFLD , 10: label for Total\nTOTAL=Toplam\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=Teklif ayr\\u0131nt\\u0131lar\\u0131\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=Mal\\u0131 teslim alan\\u0131n adresi\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=Malzeme grubu\n\n#XFLD, 15: label for division\nDIVISION=B\\u00F6l\\u00FCm\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=Br\\u00FCt a\\u011F\\u0131rl\\u0131k\n\n#XFLD, 30: label for net weight\nNETWEIGHT=Net a\\u011F\\u0131rl\\u0131k\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=Boyutlar\n\n#XFLD, 15: label for dimensions \nVOLUME=Hacim\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=Malzemeler ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=\\u00DClke\n\n#XFLD, 30: label for Street/House number\nSTREET=Sokak/konut numaras\\u0131\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=Posta kodu/\\u015Fehir\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=M\\u00FC\\u015Fteri ayr\\u0131nt\\u0131lar\\u0131\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=Malzeme sepete eklendi\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=Not olu\\u015Fturuldu\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=Not olu\\u015Fturulmad\\u0131\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=Belirtilmedi\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=Kalem {0}-{1} kald\\u0131r\\u0131ld\\u0131\n\n#XFLD, 40: Customer Reference\nCUSTREF=M\\u00FC\\u015Fteri referans\\u0131\n\n#XFLD, 20: PO Number\nCREATED_ON=Olu\\u015Fturma Tarihi\n\n#XBUT, 10: filter popover button\nOK=Tamam\n\n#XBUT, 20: filter popover button\nRESET=S\\u0131f\\u0131rla\n\n#XBUT, 10: filter popover button\nADDTOCART=Sepete ekle\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=Malzemeleri sepete ekle\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=Kaydedilmeyen de\\u011Fi\\u015Fiklikler kaybolacak. Devam etmek istiyor musunuz?\n\n#YMSG, 50: Display message\nWARNING=Uyar\\u0131\n\n#YMSG, 50: Display ERROR title\nERROR=Hata\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=\\u00DClke se\\u00E7\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=Sonu\\u00E7 bulunamad\\u0131\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=G\\u00FCvenlik simgesi ba\\u015Far\\u0131s\\u0131z oldu. Tekliflerimi yeniden ba\\u015Flat\\u0131n.\n\n#XBUT, 12: Icon tab Info\nICON_INFO=Bilgi\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=Notlar\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=Ekler\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=\\u0130lgili ki\\u015Filer\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=Ge\\u00E7erli bir \\u00FClke girin\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=0\'dan b\\u00FCy\\u00FCk numara girin\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=\\u00DClke girin\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=Tarih girin\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=Yenile\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=Ge\\u00E7erli indirim y\\u00FCzdesi girin\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=Sokak girin\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=Posta kodu girin\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=\\u015Eehir girin\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=Ge\\u00E7erli genel indirim girin. Sa\\u011Flanan de\\u011Fer y\\u00FCzde olmal\\u0131.\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=Teklif {0} olu\\u015Fturuldu\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=Teklif {0} g\\u00FCncellendi\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=Ba\\u015Far\\u0131\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=Teklif {0} uyar\\u0131larla olu\\u015Fturuldu.\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=Teklif {0} uyar\\u0131larla g\\u00FCncellendi.\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=T\\u00FCm zorunlu alanlarda ge\\u00E7erli giri\\u015Fler girin\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=Zorunlu alanlar\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=Teklif olu\\u015Fturulamad\\u0131. {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=Y\\u00FCkleniyor...\n\n#XBUT, 20: add button for items list in review screen\nADD=Ekle\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=Ge\\u00E7erli tarih aral\\u0131\\u011F\\u0131 girin\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=Teklif g\\u00FCncellenemedi. {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=Teklifi g\\u00F6zden ge\\u00E7ir ve olu\\u015Ftur\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION={0} teklifini g\\u00F6zden ge\\u00E7ir ve d\\u00FCzenle\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=Kaydet\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=M\\u00FC\\u015Fteri se\\u00E7\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG={0} g\\u00FCn i\\u00E7inde s\\u00FCresi doluyor\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=Bug\\u00FCn s\\u00FCresi doluyor\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=Yar\\u0131n s\\u00FCresi doluyor\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={1} {0}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=Ge\\u00E7erlilik biti\\u015F tarihi\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=Genel durum\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=S\\u00FCresi doldu\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=S\\u00FCresi dolmad\\u0131\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=S\\u00FCresi bug\\u00FCn doluyor\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=S\\u00FCresi yar\\u0131n doluyor\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=Gelecek {0} g\\u00FCn i\\u00E7inde s\\u00FCresi doluyor\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=Teyit\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=Tan\\u0131m mevcut de\\u011Fil\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=Fytl.bilgisini g\\u00FCncellemek i\\u00E7."Yenile"yi se\\u00E7in.\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=T\\u00FCm\\u00FCn\\u00FC reddet\n\n#XBUT, 20: Done button item details\nDONE=Bitti\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=T\\u00FCm kalemleri reddetmek i\\u00E7in bir neden se\\u00E7in\\:\n\n#XFLD, 30: Material number\nMATERIALNUMBER=Malzeme numaras\\u0131\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=Ret nedeni\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=\\u0130\\u015Fleme durumu\n\n#XFLD, 30: Rejected in Table items\nREJECTED=Reddedildi\n\n#XTIT: title for reject all popup\nREJECTTITLE=Reddetme nedeni\n\n#XTIT: title for reject \nITEM_DETAILS=Kalem ayr\\u0131nt\\u0131lar\\u0131\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=Hi\\u00E7biri\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=Ret durumu\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=Reddedilmedi\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=K\\u0131smen reddedildi\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=Tam reddedildi\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=Referans al\\u0131nmad\\u0131\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=K\\u0131smen referans al\\u0131nd\\u0131\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=K\\u0131smen reddedildi / k\\u0131smen refrans al\\u0131nd\\u0131\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=Tam referans al\\u0131nd\\u0131\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=Tam reddedildi\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=Ret durumu\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=Ret durumu\n\n#YMSG, 50: Display error title\nERRORTITLE=Hata\n\n#XFLD, 30: Reference Status\nREFSTATUS=Referans durumu\n',



	"cus/sd/myquotations/i18n/i18n_zh_CN.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u6211\\u7684\\u62A5\\u4EF7 ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n#XTIT: this is the title for Customer List\nCUSTOMERLIST_TITLE=\\u9009\\u62E9\\u5BA2\\u6237\n\n#XTIT: this is the title for Customer List\nCONTACTOVERVIEW_TITLE=\\u8054\\u7CFB\\u4EBA\\u6982\\u89C8\n\n#XTIT, 35: Application name\nAPPLICATION_NAME=\\u6211\\u7684\\u62A5\\u4EF7\n\n# XTIT, 20:Title for the sales order list\nQUOTATIONS=\\u62A5\\u4EF7\n\n# XFLD, 30:Label for quotation number\nQUOTATION=\\u62A5\\u4EF7 {0}\n\n# XFLD, 30:Label for quotation number\nQUOTATION_VALUE={0}\\uFF1A{1} \n\n#XFLD, 10: Label for ship to\nSHIPTO=\\u6536\\u8D27\\u65B9\n\n#XFLD, 35: Label for Requested Delivery Date\nREQUESTED_DELIVERY_DATE=\\u8981\\u6C42\\u7684\\u4EA4\\u8D27\\u65E5\\u671F\n\n#XFLD, 35: Label for Requested Delivery Date items table\nREQUESTED_DELIVERY_DATE_TABLE=\\u8981\\u6C42\\u7684\\u4EA4\\u8D27\\u65E5\\u671F\n\n#XFLD, 30: label for dates valid from / to\nVALID_FROM_TO=\\u6709\\u6548\\u671F\\u81EA/\\u81F3\n\n#XFLD, 20: column title for list of materials\nDESCRIPTION=\\u63CF\\u8FF0\n\n#XFLD, 15: column title for list of materials\nQUANTITY=\\u6570\\u91CF\n\n#XFLD, 20: availability status (in stock or not), column title for list of materials\nAVAILABILITY=\\u53EF\\u7528\\u6027\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE=\\u6E05\\u5355\\u4EF7\\u683C\n\n#XFLD, 20: gross price of material, column title for list of materials\nGROSS_PRICE=\\u603B\\u4EF7\n\n#XFLD, 20: price of material, column title for list of materials\nLIST_PRICE_VALUE={0}\\uFF0C\\u6E05\\u5355\\u4EF7\\u683C\n\n#XFLD, 15: discount in percentage, column title for list of materials\nDISCOUNT_TITLE=\\u6298\\u6263\n\n#XFLD, 20: price after discount and other price adjustments, column title for list of materials\nNET_VALUE=\\u51C0\\u503C\n\n#XFLD , 20: label for net value\nNETVALUE_VALUE={0}\\uFF0C\\u51C0\\u503C\n\n#XFLD, 10: items title for a table\nITEMS=\\u9879\\u76EE\\u8BE6\\u7EC6\\u4FE1\\u606F ({0})\n\n#XBUT , 15: label for button\nCOPY_QUOTE=\\u590D\\u5236\n\n#XBUT , 10: label for button\nEDIT=\\u7F16\\u8F91\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT=\\u603B\\u6298\\u6263\\u767E\\u5206\\u6BD4\n\n#XFLD, 15: label for overall discount in the header\nOVERALL_DISCOUNT_VALUE=\\u603B\\u6298\\u6263\\uFF1A{0}\n\n#XFLD, 30: Sort field Expiry Date\nSORT_EXPIRY_DATE=\\u5931\\u6548\\u65E5\\u671F\n\n#XFLD, 30: Sort field Amount\nSORT_AMOUNT=\\u51C0\\u503C\n\n#XFLD, 30: Sort field Status\nSORT_STATUS=\\u72B6\\u6001\n\n#XFLD, 40: Sort field Creation Date\nSORT_CREATION_DATE=\\u521B\\u5EFA\\u65E5\\u671F\n\n#XFLD, 10: Label for sold to\nSOLDTO=\\u552E\\u8FBE\\u65B9\n\n#XFLD, 20: label for payment tersm\nPAYMENT_TERMS=\\u4ED8\\u6B3E\\u6761\\u4EF6\n\n#XFLD, 20: Label for expiry date \nEXPIRES=\\u5230\\u671F\\u65E5\\u671F\n\n#XFLD, 20: Label for expiry date \nEXPIRES_VALUE=\\u5230\\u671F\\u65E5\\u671F\\uFF1A{0}\n\n#XFLD, 30: quotation status type\nSTATUS_OPEN=\\u672A\\u5904\\u7406\n\n#XFLD, 40: quotation status type\nSTATUS_COMPLETED=\\u5DF2\\u5B8C\\u6210\n\n#XFLD, 50: quotation status type\nSTATUS_INPROCESS=\\u6B63\\u5728\\u5904\\u7406\n\n#XBUT , 10: label for button\nCANCEL=\\u53D6\\u6D88\n\n#XFLD , 20: label for net value\nNETVALUE=\\u51C0\\u503C\n\n#XFLD , 10: label for Tax\nTAX=\\u7A0E\\u8D39\n\n#XFLD , 10: label for Total\nTOTAL=\\u603B\\u8BA1\n\n# XTIT, 20:Title for Quotation Details\nQUOTATIONDETAILS=\\u62A5\\u4EF7\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n#XFLD, 20: Label for ship to address\nSHIPTOADDRESS=\\u6536\\u8D27\\u5730\\u5740\n\n#XFLD, 30: label for material groups\nMATERIALGROUP=\\u7269\\u6599\\u7EC4\n\n#XFLD, 15: label for division\nDIVISION=\\u4EA7\\u54C1\\u7EC4\n\n#XFLD, 30: label for gross weight\nGROSSWEIGHT=\\u6BDB\\u91CD\n\n#XFLD, 30: label for net weight\nNETWEIGHT=\\u51C0\\u91CD\n\n#XFLD, 15: label for dimensions \nDIMENSIONS=\\u7EF4\\u5EA6\n\n#XFLD, 15: label for dimensions \nVOLUME=\\u4F53\\u79EF\n\n# XTIT, 20:Title for Materials Search\nMATERIALS=\\u7269\\u6599 ({0})\n\n#XFLD, 30: label for Country\nCOUNTRY=\\u56FD\\u5BB6/\\u5730\\u533A\n\n#XFLD, 30: label for Street/House number\nSTREET=\\u8857\\u9053/\\u95E8\\u724C\\u53F7\n\n#XFLD, 30: label for Postal Code\nPOSTALCODE=\\u90AE\\u653F\\u7F16\\u7801/\\u57CE\\u5E02\n\n# XTIT, 20:Title for Customer Details\nCUSTOMER_DETAIL=\\u5BA2\\u6237\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n#YMSG, 50: label for add to cart message toast up\nMATERIAL_MSG_ADDED_TO_CAR=\\u7269\\u6599\\u5DF2\\u6DFB\\u52A0\\u5230\\u8D2D\\u7269\\u8F66\n\n\n#YMSG, 50: message indicating Note Created \nNOTE_CREATED=\\u5DF2\\u521B\\u5EFA\\u6CE8\\u91CA\n\n#YMSG, 50: message indicating Note Creation Failed\nNOTE_CREATION_FAILD=\\u672A\\u521B\\u5EFA\\u6CE8\\u91CA\n\n#YMSG, 50: message if Valid From Date is empty \nUNSPECIFIED_VALUE=\\u672A\\u6307\\u5B9A\n\n#YMSG, 50: Date (Valid From) - (To)\nDATE_VALID_FROMTO={0} - {1}\n\n#YMSG, 50: Deleted from cart\nITEMSREMOVED=\\u9879\\u76EE {0}-{1} \\u5DF2\\u79FB\\u9664\n\n#XFLD, 40: Customer Reference\nCUSTREF=\\u5BA2\\u6237\\u53C2\\u8003\n\n#XFLD, 20: PO Number\nCREATED_ON=\\u521B\\u5EFA\\u65E5\\u671F\n\n#XBUT, 10: filter popover button\nOK=\\u786E\\u5B9A\n\n#XBUT, 20: filter popover button\nRESET=\\u91CD\\u7F6E\n\n#XBUT, 10: filter popover button\nADDTOCART=\\u6DFB\\u52A0\\u5230\\u8D2D\\u7269\\u8F66\n\n# XTIT, 40:Title for the sales order list\nADDMATTOCART=\\u5411\\u8D2D\\u7269\\u8F66\\u6DFB\\u52A0\\u7269\\u6599\n\n# XTIT, 50: Title of popup\nLOOSEALLCHANGES=\\u672A\\u4FDD\\u5B58\\u7684\\u66F4\\u6539\\u5C06\\u4F1A\\u4E22\\u5931\\u3002\\u662F\\u5426\\u8981\\u7EE7\\u7EED\\uFF1F\n\n#YMSG, 50: Display message\nWARNING=\\u8B66\\u544A\n\n#YMSG, 50: Display ERROR title\nERROR=\\u9519\\u8BEF\n\n#XTIT, 50: title for country value help\nCOUNTRYLIST_TITLE=\\u9009\\u62E9\\u56FD\\u5BB6\n\n#YMSG, 50: message indicating no results are returned from a search\nNODATA=\\u672A\\u627E\\u5230\\u7ED3\\u679C\n\n#YMSG, 50: message indicating a security token was not received\nREFRESHSECURITYTOKENFAILED=\\u5B89\\u5168\\u4EE4\\u724C\\u5931\\u8D25\\u3002\\u8BF7\\u91CD\\u65B0\\u542F\\u52A8\\u201C\\u6211\\u7684\\u62A5\\u4EF7\\u201D\\u3002\n\n#XBUT, 12: Icon tab Info\nICON_INFO=\\u4FE1\\u606F\n\n#XBUT, 12: Icon tab Notes\nICON_NOTES=\\u6CE8\\u91CA\n\n#XBUT, 12: Icon tab Attachments\nICON_ATTACHMENTS=\\u9644\\u4EF6\n\n#XBUT, 20: Icon tab Contacts\nICON_CONTACTS=\\u8054\\u7CFB\\u4EBA\n\n#YINS, 50: message shown when user enters incorrect country\nENTER_VALID_COUNTRY=\\u8F93\\u5165\\u6709\\u6548\\u56FD\\u5BB6\n\n#YINS, 60: message indicating invalid quantity\nENTER_VALID_QUANTITY=\\u8BF7\\u8F93\\u5165\\u4E00\\u4E2A\\u5927\\u4E8E 0 \\u7684\\u6570\n\n#YINS, 50: message shown when user leaves country field blank\nENTER_COUNTRY=\\u8F93\\u5165\\u56FD\\u5BB6\n\n#YINS, 50: message shown when user leaves request delivery date empty\nENTER_REQDELDATE=\\u8F93\\u5165\\u65E5\\u671F\n\n#XBUT, 20: refresh button for items list in review screen\nREFRESH=\\u5237\\u65B0\n\n#YINS, 60: message indicating invalid discount\nENTER_VALID_DISCOUNT=\\u8F93\\u5165\\u6709\\u6548\\u7684\\u6298\\u6263\\u767E\\u5206\\u6BD4\n\n#YINS, 50: message indicating that mandatory field Street is not filled\nENTER_STREET=\\u8F93\\u5165\\u8857\\u9053\n\n#YINS, 50: message indicating that mandatory field Postal Code is not filled\nENTER_POSTALCODE=\\u8F93\\u5165\\u90AE\\u653F\\u7F16\\u7801\n\n#YINS, 50: message indicating that mandatory field City is not filled\nENTER_CITY=\\u8F93\\u5165\\u57CE\\u5E02\n\n#YINS, 60: message indicating invalid overall discount \nENTER_VALID_OVERALL_DISCOUNT=\\u8F93\\u5165\\u6709\\u6548\\u7684\\u603B\\u6298\\u6263\\u3002\\u63D0\\u4F9B\\u7684\\u503C\\u5FC5\\u987B\\u662F\\u767E\\u5206\\u6BD4\\u3002\n\n#YMSG, 30: message shown when quotation is successfully created\nQUOTATION_CREATED_MSG_WITH_ID=\\u5DF2\\u521B\\u5EFA\\u62A5\\u4EF7 {0}\n\n#YMSG, 30: message shown when quotation is successfully updated\nQUOTATION_UPDATED_MSG_WITH_ID=\\u5DF2\\u66F4\\u65B0\\u62A5\\u4EF7 {0}\n\n#YMSG, 50: Display success title\nSUCCESSTITLE=\\u6210\\u529F\n\n#YMSG, 100: message shown when quotation is created with warnings\nQUOTATION_CREATED_WARN_MSG=\\u5DF2\\u521B\\u5EFA\\u62A5\\u4EF7 {0}\\uFF0C\\u4F46\\u6709\\u8B66\\u544A\\u3002\n\n#YMSG, 100: message shown when quotation is updated with warnings\nQUOTATION_UPDATED_WARN_MSG=\\u5DF2\\u66F4\\u65B0\\u62A5\\u4EF7 {0}\\uFF0C\\u4F46\\u6709\\u8B66\\u544A\\u3002\n\n#YMSG, 100: message shown when quotation form contains mandatory fields with errors\nCHECKERRORS=\\u5728\\u6240\\u6709\\u5FC5\\u586B\\u5B57\\u6BB5\\u4E2D\\u8F93\\u5165\\u6709\\u6548\\u6761\\u76EE\n\n#YMSG, 50: Title message for mandatory fields dialog\nMANDATORYTITLE=\\u5FC5\\u586B\\u5B57\\u6BB5\n\n#YMSG, 60: message shown when quotation could not be created due to errors\nQUOTATION_CREATE_ERR_MSG=\\u65E0\\u6CD5\\u521B\\u5EFA\\u62A5\\u4EF7\\u3002 {0}.\n\n#YMSG, 60: message shown when document is loading\nLOADING=\\u52A0\\u8F7D\\u4E2D...\n\n#XBUT, 20: add button for items list in review screen\nADD=\\u6DFB\\u52A0\n\n#YINS, 60: message shown when the date range is invalid\nENTER_VALID_DATE_RANGE=\\u8F93\\u5165\\u6709\\u6548\\u65E5\\u671F\\u8303\\u56F4\n\n#YMSG, 60: message shown when quotation could not be updated due to errors\nQUOTATION_UPDATE_ERR_MSG=\\u65E0\\u6CD5\\u66F4\\u65B0\\u62A5\\u4EF7\\u3002 {0}.\n\n#XTIT, 20:Title for page to create/review quotation\nREVIEWANDCREATEQUOTATION=\\u5BA1\\u6838\\u5E76\\u521B\\u5EFA\\u62A5\\u4EF7\n\n#XTIT, 20:Title for page to update/review quotation\nREVIEWANDUPDATEQUOTATION=\\u5BA1\\u6838\\u5E76\\u7F16\\u8F91\\u62A5\\u4EF7 {0}\n\n#XBUT, 10: label for submit button on create/edit quotation form\nSAVEQUOTE=\\u4FDD\\u5B58\n\n#XTIT, 20: title of popup for selecting a customer before creating a quotation\nSELECTCUSTOMER_TITLE=\\u9009\\u62E9\\u5BA2\\u6237\n\n#YMSG, 20: text Expiry message\nEXPIRY_MSG={0} \\u5929\\u540E\\u5230\\u671F\n\n#YMSG, 20: text Expiry message\nEXPIRY_TODAY=\\u4ECA\\u5929\\u5230\\u671F\n\n#YMSG, 20: text Expiry message\nEXPIRY_TOMORROW=\\u660E\\u5929\\u5230\\u671F\n\n#XFLD, 40: House number and street name\nHOUSE_NB_STREET={1} {0}\n\n#XFLD, 40: Unit followed by currency\nUNITCURRENCY={0} {1}\n\n#XFLD, 50: postal code, city, country in details view\nCITY_COUNTRY={0} {1} {2}\n\n#XFLD, 30: Top level filter field: user filters on expiry date of quotation \nFILTER_EXPIRY=\\u5230\\u671F\\u65E5\\u671F\n\n#XFLD, 40: Top level filter field: user filters on quotation status \nFILTER_STATUS=\\u603B\\u4F53\\u72B6\\u6001\n\n#XFLD, 30: Second level filter, user selects this to find expired quotations  \nFILTER_EXPIRY_EXPIRED=\\u5DF2\\u5230\\u671F\n\n#XFLD, 30: Second level filter, user selects this to find non-expired quotations\nFILTER_EXPIRY_UNEXPIRED=\\u672A\\u5230\\u671F\n\n#XFLD, 30: Second level filter, user selects a number of days using a slider to find quotations expiring prior to or on it. This is shown when slider value is 0\nFILTER_EXPIRY_DAYS_TODAY=\\u4ECA\\u5929\\u5230\\u671F\n\n#XFLD, 30: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown when slider value is 1\nFILTER_EXPIRY_DAYS_TOMORROW=\\u660E\\u5929\\u5230\\u671F\n\n#XFLD, 50: Second level filter, user selects a day using a slider to find quotations expiring prior to or on it. This is shown for all slider values other than 0 or 1\nFILTER_EXPIRY_DAYS_IN=\\u672A\\u6765 {0} \\u5929\\u5185\\u5230\\u671F\n\n#XTIT, 50: Title message for the cancel add products confirmation message\nCANCEL_ADD_TITLE=\\u786E\\u8BA4\n\n#YMSG, 50: message shown when material description is empty\nNO_MATERIAL_DESC=\\u6CA1\\u6709\\u53EF\\u7528\\u7684\\u63CF\\u8FF0\n\n#YMSG, 50: message appended to an error message when the refresh failed\nCHOOSE_REFRESH=\\u9009\\u62E9\\u201C\\u5237\\u65B0\\u201D\\u66F4\\u65B0\\u5B9A\\u4EF7\\u4FE1\\u606F\\u3002\n\n#XFLD, 15: quantity with unit ex: 1.0 Each\nQUANTITY_UNIT={0} {1}\n\n#XBUT, 20: reject button for items list in review screen\nREJECTALL=\\u5168\\u90E8\\u62D2\\u7EDD\n\n#XBUT, 20: Done button item details\nDONE=\\u5B8C\\u6210\n\n#XFLD, 30: reject label for list pop up\nREJECTLABEL=\\u9009\\u62E9\\u62D2\\u7EDD\\u6240\\u6709\\u9879\\u76EE\\u7684\\u539F\\u56E0\\uFF1A\n\n#XFLD, 30: Material number\nMATERIALNUMBER=\\u7269\\u6599\\u7F16\\u53F7\n\n#XFLD, 30: Reason for Rejection\nREASONREJECTION=\\u62D2\\u7EDD\\u539F\\u56E0\n\n#XFLD, 30: Processing Status in Table\nPROCESSTATUS=\\u5904\\u7406\\u72B6\\u6001\n\n#XFLD, 30: Rejected in Table items\nREJECTED=\\u5DF2\\u62D2\\u7EDD\n\n#XTIT: title for reject all popup\nREJECTTITLE=\\u62D2\\u7EDD\\u539F\\u56E0\n\n#XTIT: title for reject \nITEM_DETAILS=\\u9879\\u76EE\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n#XFLD, 40: This a entry for rejection reasons in the dropdown list\nNONE=\\u65E0\n\n#XFLD, 40: Top level filter field: user filters on quotation rejection status \nFILTER_REJ_STATUS=\\u62D2\\u7EDD\\u72B6\\u6001\n\n#XFLD, 40: quotation rejection status type\nSTATUS_NOT_REJ=\\u672A\\u62D2\\u7EDD\n\n#XFLD, 40: quotation rejection status type\nSTATUS_PART_REJ=\\u5DF2\\u90E8\\u5206\\u62D2\\u7EDD\n\n#XFLD, 40: quotation rejection status type\nSTATUS_ALL_REJ=\\u5DF2\\u5168\\u90E8\\u62D2\\u7EDD\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_NOT_REF=\\u672A\\u53C2\\u8003\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REF=\\u5DF2\\u90E8\\u5206\\u53C2\\u8003\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_PART_REFJEC=\\u5DF2\\u90E8\\u5206\\u62D2\\u7EDD/\\u5DF2\\u90E8\\u5206\\u53C2\\u8003\n\n#XFLD, 40: quotation Referenced status type\nSTATUS_ALL_REF=\\u5DF2\\u5168\\u90E8\\u53C2\\u8003\n\n#XFLD, 40: quotation rejection status type\nSTATUS_FULL_REJ=\\u5DF2\\u5168\\u90E8\\u62D2\\u7EDD\n\n#XFLD, 30: label for rejection status\nREJECTION_STATUS=\\u62D2\\u7EDD\\u72B6\\u6001\n\n#XFLD, 30: label for rejection status\nREJECSTATUSLABEL=\\u62D2\\u7EDD\\u72B6\\u6001\n\n#YMSG, 50: Display error title\nERRORTITLE=\\u9519\\u8BEF\n\n#XFLD, 30: Reference Status\nREFSTATUS=\\u53C2\\u8003\\u72B6\\u6001\n',



	"cus/sd/myquotations/util/Formatter.js":function(){/*



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







},



	"cus/sd/myquotations/util/ModelExtractor.js":function(){/*



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







          for ( var j = 0; j < aPrincingConditions.length; j++) {



            if (aPrincingConditions[j].CondTypeCode === itemPriceCond) {



              oDataItems[i].ListPrice = aPrincingConditions[j].ValueInternal;



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



        oDataItems[i].DiscountPercentage =  parseFloat(oDataItems[i].Discount) / 100;



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



      for ( var i = 0; i < oPrincingConds.length; i++) {



        if (oPrincingConds[i].CondTypeCode === itemPriceCond) {



        //  var netValue = parseFloat(oModel.getProperty("/NetValue"));



       //  var intValue = parseFloat(oPrincingConds[i].ValueInternal);



          //Do not use locale for parsing because the backend always return with periods



        	var netValue = parseFloat((oModel.getProperty("/NetValue")));



        	var intValue = parseFloat(oPrincingConds[i].ValueInternal);



          var discount = intValue - netValue;



          oModel.setProperty("/Discount", discount);



          oModel.setProperty("/DiscountUnit", oPrincingConds[i].Currency);



        }



      }



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







},



	"cus/sd/myquotations/view/CreateQuotation.controller.js":function(){/*



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



    



    newModel.setProperty("/__metadata",{"type" : "zlord_my_quotation_srv.Action"} );



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



    var service = this.getView().getModel("zlord_my_quotation_srv");



    



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



	      this.getView().getModel("zlord_my_quotation_srv").read("GetValueHelp", undefined, parms, false, function(oData, response) {



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







},



	"cus/sd/myquotations/view/CreateQuotation.view.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n<core:View controllerName="cus.sd.myquotations.view.CreateQuotation"\r\n\t xmlns:core="sap.ui.core"  xmlns="sap.m" xmlns:me="sap.me" \r\n\txmlns:form="sap.ui.layout.form" xmlns:layout="sap.ui.layout" xmlns:caui="sap.ca.ui"\r\n\txmlns:mvc="sap.ui.core.mvc" >\r\n\t\r\n\t<Page showNavButton="true" navButtonPress="_navBack" title="{path:\'myQuotationModel>/QuotationID\', formatter:\'cus.sd.myquotations.util.Formatter.QuotationSubmitPageTitle\'}" class="sapUiFioriObjectPage">\r\n\t\t<content>\r\n\r\n\t\t\t\t\t<form:SimpleForm  maxContainerCols="2" editable="true" minWidth="1024" layout="ResponsiveGridLayout" labelSpanL="3" labelSpanM="3" emptySpanL="1" emptySpanM="1" columnsL="1" columnsM="1">\r\n\t\t\t\t\t\t<form:content >\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<core:Title text = "{i18n>CUSTOMER_DETAIL}"/>\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extEditQuotationCustDetailsTop"/>\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>SOLDTO}"/>\r\n\t\t\t\t\t\t\t\t<Input value="{soldTo>/Name1}" editable="false"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>SHIPTO}"/>\r\n\t\t\t\t\t\t\t\t<Input value="{shipTo>/Name1}" editable="false" />\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>STREET}"/>\r\n\t\t\t\t\t\t\t\t<Input id="IDSTREET"  value="{shipTo>/Street}" />\r\n\t\t\t\t\t\t\t\t<Input  value="{shipTo>/HouseNumber}" >\r\n\t\t\t\t\t\t\t\t\t\t<layoutData>\r\n\t\t\t\t\t\t\t\t\t\t\t<layout:GridData span="L2 M2"/>\r\n\t\t\t\t\t\t\t\t\t</layoutData>\r\n\t\t\t\t\t\t\t\t</Input>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t \t<Label required="true" text="{i18n>POSTALCODE}"/> \r\n\t\t\t\t\t\t \t\r\n\t\t\t\t\t\t\t\t<Input id="IDPOSTALCODE"  value="{shipTo>/PostalCode}" change="formChangedPostalCodeField">\r\n\t\t\t\t\t\t\t\t\t<layoutData>\r\n\t\t\t\t\t\t\t\t\t\t\t<layout:GridData span="L2 M2"/>\r\n\t\t\t\t\t\t\t\t\t</layoutData>\r\n\t\t\t\t\t\t\t\t</Input>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<Input id="IDCITY"  value="{shipTo>/City}" change="formChangedCityField"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label  required="true" text="{i18n>COUNTRY}"/>\r\n\t\t\t\t\t\t\t\t<Input  id="countryInput" value="{shipTo>/CountryDescription}" change="onCountryInput" showValueHelp="true" valueHelpRequest="onCountryValueHelp"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extEditQuotationCustDetailsBottom"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<core:Title text = "{i18n>QUOTATIONDETAILS}"/>\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extEditQuotationDetailsTop"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>CUSTREF}"/>\r\n\t\t\t\t\t\t\t\t<Input  value="{myQuotationModel>/PurchaseOrder}" /> \r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label required="true" text="{i18n>VALID_FROM_TO}"/>\r\n\t\t\t\t\t\t\t\t<caui:DatePicker id="IDVALIDFROM" value="{path:\'myQuotationModel>/ValidFrom\' ,  type:\'sap.ca.ui.model.type.Date\', formatOptions : { style: \'short\',  UTC: false }}"  change="formChangedValidDate" />\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<caui:DatePicker id="IDVALIDTO" value="{path:\'myQuotationModel>/ValidTo\', type:\'sap.ca.ui.model.type.Date\', formatOptions : { style: \'short\', UTC: false }}" change="formChangedValidDateRequired" />\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label required="true" text="{i18n>REQUESTED_DELIVERY_DATE}"/>\r\n\t\t\t\t\t\t\t   <caui:DatePicker id="IDREQUESTDELD" value="{path:\'myQuotationModel>/RequestedDeliveryDate\', type:\'sap.ca.ui.model.type.Date\', formatOptions : { style: \'short\', UTC: false }}" change="formChangedValidDateRequired" />\r\n\t\t\t\t\t\t\t   <Text  text=""/>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>REJECTION_STATUS}"/>\r\n\t\t\t\t\t\t\t\t<Input value="{path:\'myQuotationModel>/RejectionStatus\',  formatter:\'cus.sd.myquotations.util.Formatter.StatusLabel\'}" editable="false"/>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>REFSTATUS}"/> \r\n\t\t\t\t\t\t\t\t<Input value="{path:\'myQuotationModel>/ReferenceStatus\' ,  formatter:\'cus.sd.myquotations.util.Formatter.StatusRefLabel\'}" editable="false"/>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>OVERALL_DISCOUNT}"/>\r\n\t\t\t\t\t\t\t\t<Input id="IDODISCOUNT" maxLength="5" value="{path:\'myQuotationModel>/DiscountPercentage\', type:\'sap.ca.ui.model.type.Number\'}" change="formChangedInputDiscount"/>\r\n\t\t\t\t\t\t\t\t<Text  text=""/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extEditQuotationDetailsBottom"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>NETVALUE}"/>\r\n\t\t\t\t\t\t\t\t<Input value="{parts:[{path:\'myQuotationModel>/NetValue\'},{path:\'myQuotationModel>/Currency\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatUnitCurrency\'}" editable="false" /> <Text  text=""/>\r\n\t\t\t  \t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>TAX}"/>\r\n\t\t\t\t\t\t\t\t<Input value="{parts:[{path:\'myQuotationModel>/TaxAmount\'},{path:\'myQuotationModel>/Currency\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatUnitCurrency\'}" editable="false" /> <Text  text=""/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>TOTAL}"/>\r\n\t\t\t\t\t\t\t\t<Input value="{parts:[{path:\'myQuotationModel>/TotalAmount\'},{path:\'myQuotationModel>/Currency\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatUnitCurrency\'}" editable="false" /> <Text  text=""/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</form:content>\r\n\t\t\t\t\t</form:SimpleForm>\r\n\t\t \r\n\r\n\t<Table id="CQID" mode="Delete" delete="onDelete" items="{myQuotationModel>/QuotationItemSet/results}" >\r\n\r\n\t\t\t<headerToolbar>\r\n\t\t\t\t\t\t<Toolbar>\r\n\t\t\t\t\t\t\t<Label\r\n\t\t\t\t\t\t\t\ttext="{path:\'myQuotationModel>/QuotationItemSet/results/length\', formatter:\'cus.sd.myquotations.util.Formatter.NbItems\'}" />\r\n\t\t\t\t\t\t\t<ToolbarSpacer />\r\n\t\t\t\t\t\t\t <Button icon="sap-icon://refresh" \r\n\t\t\t\t\t\t\t  text="{path:\'i18n>REFRESH\', formatter:\'cus.sd.myquotations.util.Formatter.MobileText\'}"\r\n\t\t\t\t\t\t\t  tap="onRefresh"/> \r\n\t\t\t\t\t\t\t  <Button icon="sap-icon://decline" \r\n\t\t\t\t\t\t\t   text="{path:\'i18n>REJECTALL\', formatter:\'cus.sd.myquotations.util.Formatter.MobileText\'}"\r\n\t\t\t\t\t\t\t   tap="onRejectAll"/> \r\n\t\t\t\t\t\t\t <Button icon="sap-icon://add"\r\n\t\t\t\t\t\t\t  text="{path:\'i18n>ADD\', formatter:\'cus.sd.myquotations.util.Formatter.MobileText\'}"\r\n\t\t\t\t\t\t\t  tap="onAdd"/> \r\n\t\t\t\t\t\t</Toolbar>\r\n\t\t    </headerToolbar>\r\n\t\t\r\n\t\t\t\t<columns>\r\n\t\t\t\t\t<Column hAlign="Left" vAlign="Middle">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Text text="{i18n>DESCRIPTION}" />\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t<Column minScreenWidth="905px" demandPopin="true"  hAlign="Right" vAlign="Middle" >\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Text required="true" text="{i18n>QUANTITY}" wrapping="true"/>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t<Column  minScreenWidth="905px" demandPopin="true" hAlign="Right" vAlign="Middle" >\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Text text="{i18n>REQUESTED_DELIVERY_DATE_TABLE}" wrapping="true"/>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t<Column  minScreenWidth="905px" demandPopin="true"  hAlign="Right"  vAlign="Middle">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t \t<Text text="{i18n>DISCOUNT_TITLE}" wrapping="true"/> \r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t<Column  minScreenWidth="Tablet" demandPopin="true"  hAlign="Right" vAlign="Middle" > \r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Text text="{i18n>NET_VALUE}" wrapping="true"/>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<Column  minScreenWidth="Tablet" demandPopin="true"  hAlign="Right" vAlign="Middle" >\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Text text="{i18n>PROCESSTATUS}" wrapping="true"/>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t\r\n\t\t\t\t</columns>\r\n\t\t\t\t \r\n\t\t\t\t<ColumnListItem type="Navigation" press="onItemPress">\r\n\t\t\t\t\t<cells>\r\n\t\t\t\t\t\t<layout:HorizontalLayout>\r\n\t\t\t\t\t\t\t<FlexBox direction="Column" alignItems="Start">\t\r\n\t\t\t\t\t\t\t<Label text="{myQuotationModel>MaterialNumber}" design = "Bold" />\r\n\t\t\t\t\t\t\t<Label text="{myQuotationModel>ItemDescription}" />\r\n\t\t\t\t\t\t\t</FlexBox>\r\n\t\t\t\t\t\t</layout:HorizontalLayout>\r\n\t\t\t\t\t\r\n\t\t\t\t\t <layout:HorizontalLayout>\r\n\t\t\t\t\t    <FlexBox justifyContent="SpaceBetween" width="7.8rem" alignItems="Center">\t \r\n\t\t\t\t\t\t\t<Input value="{path: \'myQuotationModel>OrderQuantity\',  type:\'sap.ca.ui.model.type.Number\', formatOptions : { style: \'standard\'}}" width="5.5rem"  change="formChangedInputQuantity" \r\n\t\t\t\t\t\t\t   enabled="{parts:[{path:\'myQuotationModel>RejectionStatus\'},{path:\'myQuotationModel>ReferenceStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.visiblityForRejection\'}"  />\r\n\t\t\t\t\t\t\t<Text text="{myQuotationModel>SalesUnit}" wrapping="true" />\r\n\t\t\t\t\t\t</FlexBox>\r\n\t\t\t\t\t</layout:HorizontalLayout>\r\n\t\t\t\t\t\r\n\t\t\t\t\t <caui:DatePicker width="7.5rem" value="{path:\'myQuotationModel>RequestedDeliveryDate\' , type:\'sap.ca.ui.model.type.Date\', formatOptions : { style: \'short\',  UTC: false }}" change="formChangedValidDate" \r\n\t\t\t\t\t  enabled="{parts:[{path:\'myQuotationModel>RejectionStatus\'},{path:\'myQuotationModel>ReferenceStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.visiblityForRejection\'}"  />\t\r\n\t\t\t\t\r\n\t\t\t\t\t <layout:HorizontalLayout>\r\n\t\t\t\t\t    <FlexBox justifyContent="SpaceBetween" width="5.7rem" alignItems="Center">\t \r\n\t\t\t\t\t    <Input width="4.5rem" maxLength="5" value="{path: \'myQuotationModel>Discount\',  type:\'sap.ca.ui.model.type.Number\'}"  change="formChangedInputDiscount"\r\n\t\t\t\t\t     enabled="{parts:[{path:\'myQuotationModel>RejectionStatus\'},{path:\'myQuotationModel>ReferenceStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.visiblityForRejection\'}"  />\t\r\n\t\t\t\t\t    <Text text="{myQuotationModel>/DiscountUnitPercentage}" wrapping="true"/>\r\n\t\t\t\t\t</FlexBox>  \r\n\t\t\t\t\t</layout:HorizontalLayout>\r\n\t\t\t\t\r\n\t\t\t\t\t<Text text="{parts:[{path:\'myQuotationModel>NetAmount\'},{path:\'myQuotationModel>ListPriceUnit\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatUnitCurrency\'}"/>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t<ObjectStatus text="{parts:[{path:\'myQuotationModel>RejectionReason\'},{path:\'myQuotationModel>RejectionStatus\'},{path:\'myQuotationModel>ReferenceStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.rejectionStatus\'}" />\t\t\r\n\t\t\t\t </cells>\r\n\t\t\t </ColumnListItem>\r\n\t\t\t\r\n\t\t\t</Table>\r\n\t\t\t\r\n\t</content>\r\n\t\r\n\t\t<footer>\r\n\t\t\t<Bar>\r\n\t\t\t\t<contentRight>\r\n\t\t\t\t\t<Button text="{i18n>SAVEQUOTE}" id="TRC_BTN_SAVE_CREATE" tap="onSave"  type="Emphasized" />\r\n\t\t\t\t\t<Button text="{i18n>CANCEL}" id="TRC_BTN_CANCEL" tap="onCancel"/>\r\n\t\t\t\t</contentRight>\r\n\t\t\t</Bar>\r\n\t\t</footer>\r\n\t\r\n\t</Page>\r\n</core:View>\r\n',



	"cus/sd/myquotations/view/ItemDetails.controller.js":function(){/*



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



          



         this.getView().setModel(itemModel,"myItem");



          for ( var i = 0; i < results.length; i++) {



            if (this.itemID === results[i].ItemID) {



            	itemModel.setData(jQuery.extend(true, {},results[i]));



            }



          }



          



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







},



	"cus/sd/myquotations/view/ItemDetails.view.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n<core:View controllerName="cus.sd.myquotations.view.ItemDetails"\r\n\t xmlns:core="sap.ui.core"  xmlns="sap.m" xmlns:me="sap.me" \r\n\txmlns:form="sap.ui.layout.form" xmlns:layout="sap.ui.layout" xmlns:caui="sap.ca.ui"\r\n\txmlns:mvc="sap.ui.core.mvc" >\r\n\t\r\n\t<Page showNavButton="true" navButtonPress="_navBack" title="{i18n>ITEM_DETAILS}" class="sapUiFioriObjectPage">\r\n\t\t<content>\r\n\t\t\t\t<!-- EDIT MODE -->\r\n\t\t\t\t<layout:VerticalLayout width="100%" visible="{path:\'myItem>/ItemDescription\' ,formatter:\'.formEditable\'}">\r\n\t\t\t\t\t<form:SimpleForm  maxContainerCols="2" editable="true" minWidth="1024" layout="ResponsiveGridLayout" labelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4" columnsL="1" columnsM="1" >\r\n\t\t\t\t\t\t\t<core:Title text = "{path:\'myItem>/QuotationID\' ,formatter:\'cus.sd.myquotations.util.Formatter.formatQuotation\'}"/>\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\t<form:content >\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extEditQuotationItemDetailsTop"/>\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>MATERIALNUMBER}"/>\r\n\t\t\t\t\t\t\t\t<Input value="{myItem>/MaterialNumber}" editable="false" />\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>DESCRIPTION}"/>\r\n\t\t\t\t\t\t\t\t<Input value="{myItem>/ItemDescription}" editable="false" />\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>QUANTITY}"/>\r\n\t\t\t\t\t\t\t\t<Input id="ORDERIDQTY" value="{path: \'myItem>/OrderQuantity\',  type:\'sap.ca.ui.model.type.Number\', formatOptions : { style: \'standard\'}}"   change="formChangedInputQuantity" \r\n\t\t\t\t\t\t\t\t  enabled="{parts:[{path:\'myItem>/RejectionStatus\'},{path:\'myItem>/ReferenceStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.visiblityForRejection\'}"  >\r\n\t\t\t\t\t\t\t\t\t<layoutData>\r\n\t\t\t\t\t\t\t\t\t\t\t<layout:GridData span="L4 M4"/>\r\n\t\t\t\t\t\t\t\t\t</layoutData>\r\n\t\t\t\t\t\t\t\t</Input>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<Input value="{myItem>/SalesUnit}"  editable="false"/>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>REQUESTED_DELIVERY_DATE_TABLE}"/>\r\n\t\t\t\t\t\t\t    <caui:DatePicker id="REDELDATEITEM" value="{path:\'myItem>/RequestedDeliveryDate\' , type:\'sap.ca.ui.model.type.Date\', formatOptions : { style: \'short\',  UTC: false }}" change="formChangedValidDate"\r\n\t\t\t\t\t\t\t      enabled="{parts:[{path:\'myItem>/RejectionStatus\'},{path:\'myItem>/ReferenceStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.visiblityForRejection\'}"  > \r\n\t\t\t\t\t\t\t    </caui:DatePicker>\r\n\t\t\t\t\t\t\t    <Input value=""  editable="false" >\r\n\t\t\t\t\t\t\t    <layoutData>\r\n\t\t\t\t\t\t\t\t\t\t\t<layout:GridData span="L1 M1"/>\r\n\t\t\t\t\t\t\t\t\t</layoutData>\r\n\t\t\t\t\t\t\t    </Input>\t\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t \t<Label text="{i18n>GROSS_PRICE}"/> \r\n\t\t\t\t\t\t\t\t<Input value="{parts:[{path:\'myItem>/ListPrice\'},{path:\'myItem>/ListPriceUnit\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatUnitCurrency\'}" editable="false"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label  required="true" text="{i18n>DISCOUNT_TITLE}"/>\r\n\t\t\t\t\t\t\t\t<Input id="DISCOUNTITEMD" maxLength="5" value="{path: \'myItem>/Discount\',  type:\'sap.ca.ui.model.type.Number\'}"  change="formChangedInputDiscount" \r\n\t\t\t\t\t\t\t\t  enabled="{parts:[{path:\'myItem>/RejectionStatus\'},{path:\'myItem>/ReferenceStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.visiblityForRejection\'}" >\r\n\t\t\t\t\t\t\t\t<layoutData>\r\n\t\t\t\t\t\t\t\t\t\t\t<layout:GridData span="L4 M4"/>\r\n\t\t\t\t\t\t\t\t\t</layoutData>\r\n\t\t\t\t\t\t\t\t</Input>\r\n\t\t\t\t\t\t\t\t<Input value= "{myItem>/DiscountUnit}" editable="false"/>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text = "{i18n>NET_VALUE}" />\r\n\t\t\t\t\t\t\t   <Input value="{parts:[{path:\'myItem>/NetAmount\'},{path:\'myItem>/ListPriceUnit\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatUnitCurrency\'}" editable="false"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>REFSTATUS}"/> \r\n\t\t\t\t\t\t\t\t<Input value= "{myItem>/ReferenceStatusDescription}" editable="false"/>\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>REASONREJECTION}"/>\r\n\t\t\t\t\t\t\t   <Select  items="{ path: \'rejectionReason>/results\' }" selectedKey="{myItem>/RejectionReason}"   \r\n\t\t\t\t\t\t\t    enabled="{parts:[{path:\'myItem>/RejectionStatus\'},{path:\'myItem>/ReferenceStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.visiblityForRejectionDLL\'}"  >\t\r\n                               \t<core:Item text="{rejectionReason>Value}" key="{rejectionReason>Key}" />\r\n                               </Select>\r\n                               \r\n                                <Input value=""  editable="false" >\r\n\t\t\t\t\t\t\t    <layoutData>\r\n\t\t\t\t\t\t\t\t\t\t\t<layout:GridData span="L1 M1"/>\r\n\t\t\t\t\t\t\t\t\t</layoutData>\r\n\t\t\t\t\t\t\t    </Input>\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t   <core:ExtensionPoint name="extEditQuotationItemDetailsBottom"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</form:content>\r\n\t\t\t\t\t</form:SimpleForm>\r\n\t\t\t\t</layout:VerticalLayout>\r\n\t\t\t\r\n\t\t\t    <!-- DISPLAY MODE -->\r\n\t\t\t\t<layout:VerticalLayout width="100%" visible="{path:\'myItem>/ItemDescription\' ,formatter:\'.formDisplay\'}">\r\n\t\t\t\t\t<form:SimpleForm >\r\n\t\t\t\t\t\t\t<core:Title text = "{path:\'myItem>/QuotationID\' ,formatter:\'cus.sd.myquotations.util.Formatter.formatQuotation\'}"/>\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t\t<form:content >\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extDisplayQuotationItemDetailsTop"/>\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>MATERIALNUMBER}"/>\r\n\t\t\t\t\t\t\t\t<Text text="{myItem>/MaterialNumber}"  />\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>DESCRIPTION}"/>\r\n\t\t\t\t\t\t\t\t<Text text="{myItem>/ItemDescription}"  />\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>QUANTITY}"/>\r\n\t\t\t\t\t\t\t\t<Text text="{parts:[{path:\'myItem>/OrderQuantity\'},{path:\'myItem>/SalesUnit\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatQuantity\'}" />\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>REQUESTED_DELIVERY_DATE_TABLE}"/>\r\n\t\t\t\t\t\t\t    <Text text="{path:\'myItem>/RequestedDeliveryDate\' , type:\'sap.ca.ui.model.type.Date\', formatOptions : { style: \'short\',  UTC: false }}" />\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t \t<Label text="{i18n>GROSS_PRICE}"/> \r\n\t\t\t\t\t\t\t\t<Text text="{parts:[{path:\'myItem>/ListPrice\'},{path:\'myItem>/ListPriceUnit\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatUnitCurrency\'}" editable="false"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>DISCOUNT_TITLE}"/>\r\n\t\t\t\t\t\t\t    <Text text="{parts:[{path:\'myItem>/Discount\'},{path:\'myItem>/DiscountUnit\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatQuantity\'}" />\r\n\r\n\t\t\t\t\t\t\t<Label text = "{i18n>NET_VALUE}" />\r\n\t\t\t\t\t\t\t   <Text text="{parts:[{path:\'myItem>/NetAmount\'},{path:\'myItem>/ListPriceUnit\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatUnitCurrency\'}" />\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>REFSTATUS}"/> \r\n\t\t\t\t\t\t\t\t<Text text= "{myItem>/ReferenceStatusDescription}"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>REASONREJECTION}"/>\r\n\t\t\t\t\t\t\t\t<Text text= "{myItem>/RejectionReasonDescription}"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t   <core:ExtensionPoint name="extDisplayQuotationItemDetailsBottom"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</form:content>\r\n\t\t\t\t\t</form:SimpleForm>\r\n\t\t\t\t</layout:VerticalLayout>\r\n\t\t\t\r\n\t</content>\r\n\t\r\n\t\t<footer>\r\n\t\t\t<Bar>\r\n\t\t\t\t<contentRight>\r\n\t\t\t\t\t<Button text="{i18n>DONE}" id="TRC_BTN_DONE" tap="onDone"  type="Emphasized" visible="{path:\'myItem>/ItemDescription\' ,formatter:\'.formEditable\'}" />\r\n\t\t\t\t\t<Button text="{i18n>CANCEL}" id="TRC_BTN_CANCEL" tap="onCancel"/>\r\n\t\t\t\t</contentRight>\r\n\t\t\t</Bar>\r\n\t\t</footer>\r\n\t\r\n\t</Page>\r\n</core:View>\r\n',



	"cus/sd/myquotations/view/Master.controller.js":function(){/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



jQuery.sap.require("sap.ca.scfld.md.controller.ScfldMasterController");



jQuery.sap.require("sap.ui.core.mvc.Controller");



jQuery.sap.require("sap.ui.core.IconPool");



jQuery.sap.require("sap.ui.model.odata.Filter");



jQuery.sap.require("sap.ca.ui.CustomerContext");











sap.ca.scfld.md.controller.ScfldMasterController.extend("cus.sd.myquotations.view.Master", {



  filterValueArray : [],



  searchString : "",



  sliderMax: 30,



  expiryFilterStateMap: {},



      



      onInit : function() {



        sap.ca.scfld.md.controller.ScfldMasterController.prototype.onInit.call(this);







        // get i18n texts



        this.resourceBundle = this.oApplicationFacade.getResourceBundle();



        



        this.getView().getModel().setCountSupported(false);







        this.oApplicationFacade.setApplicationModel("global", new sap.ui.model.json.JSONModel());



        this.oApplicationFacade.setApplicationModel("customizing", new sap.ui.model.json.JSONModel());



        



        var self = this;











        var service = this.getView().getModel();



        







        service.read("CustomizingSet", undefined, undefined, false, function(oData, response) {



          var dataCustomizingSet = (oData && oData.results && oData.results[0]) ? oData.results[0] : self.getDefaultCustomizingSet();



          self.oApplicationFacade.getApplicationModel("customizing").setData(dataCustomizingSet);



        }, function(oData, response) {



          cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(oData, response);



        });







        this.getList().bindItems(this.createMasterBindingInfo());







        this.oRouter.attachRouteMatched(function(oEvent) {



          if (oEvent.getParameter("name") === "master") {



            this.onNavMaster();



          }



        }, this);







        // Customer Context popup



        this.buildCustomerContext();  



        // Filter dialog      



        this.buildFilterDialog();



        // Sort dialog



        this.buildSortDialog();







      },



      



      getDefaultCustomizingSet : function(){



        return {



          HEAD_DISCOUNT : "HA00",



          ITEM_DISCOUNT : "RA00",



          ITEM_PRICE : "PR00",



          PARTNER : "SE",



          QUOTE_TYPE : "QT"



        };



      },



      onNavMaster : function() {



      },



      onBeforeRendering : function() {



      },



      applyFilterFromContext : function(sContext){



      },



      



      onDataLoaded : function() {



        var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());



        var oComponent = sap.ui.component(sComponentId);



        var oComponentData = oComponent ? oComponent.getComponentData() : null;







        var QuotationID = null;



        if (oComponentData && oComponentData.startupParameters && !this._hashParam) {



          jQuery.sap.log.info("app was started with parameters " + JSON.stringify(oComponentData.startupParameters));



          if (oComponentData.startupParameters.QuotationID && oComponentData.startupParameters.QuotationID[0]) {



            QuotationID = oComponentData.startupParameters.QuotationID[0];



          }



          if (oComponentData.startupParameters.SalesQuotation && oComponentData.startupParameters.SalesQuotation[0]) {



            QuotationID = oComponentData.startupParameters.SalesQuotation[0];



          }



        }



        if (QuotationID && !this._hashParam ) {



          this.oRouter.navTo("detail", {



            contextPath : QuotationID



          }, !jQuery.device.is.phone);



        }



        



        sap.ca.scfld.md.controller.ScfldMasterController.prototype.onDataLoaded.call(this);



      },







      setListItem : function(oItem) {



        this.getList().removeSelections();



        if(oItem){



          oItem.setSelected(true);



          this.getList().setSelectedItem(oItem, true);







          this.oRouter.navTo("detail", {



            contextPath : oItem.getBindingContext().getProperty("QuotationID")



          }, !jQuery.device.is.phone);



        }



      },



      



      getBindingContextPathFor: function(oEvent) {



          if (oEvent.contextPath === undefined) {



              jQuery.sap.log.warning("The context path was undefined.");



              return undefined;



          }



          return "/QuotationSet('"+oEvent.contextPath+"')" ;



      },



      



      resolveHash : function(oEvent){



        var quotationID = oEvent.getParameter("arguments").contextPath;



        return "/QuotationSet('"+quotationID+"')";



      },







      buildCustomerContext : function() {



        var self = this;



        this.oCustomerContextDialog = new sap.ca.ui.CustomerContext({



          dialogTitle : self.resourceBundle.getText("SELECTCUSTOMER_TITLE"),



          showSalesArea : true,



          customerIDProperty : 'CustomerID',



          customerNameProperty : 'CustomerName',



          salesOrganizationNameProperty : 'SalesOrganizationName',



          distributionChannelNameProperty : 'DistributionChannelName',



          divisionNameProperty : 'DivisionName',







          customerSelected : function(evt) {



            var headerCondType = self.oApplicationFacade.getApplicationModel("customizing").getProperty("/HEAD_DISCOUNT");



            // gets the model for creation and add the customer information



            var createQuotation = new sap.ui.model.json.JSONModel();



            var partnerData = [ {



              PartnerNumber : evt.getParameter("CustomerID"),



              PartnerFunction : "AG" // Sold-To Party



            } ];



            var partnerSet = {



              results : partnerData



            };



            createQuotation.setProperty("/PartnerSet", partnerSet);



            // Quotation header fields



            createQuotation.setProperty("/SoldToParty", evt.getParameter("CustomerID"));



            createQuotation.setProperty("/SalesOrganization", evt.getParameter("SalesOrganization"));



            createQuotation.setProperty("/DistributionChannel", evt.getParameter("DistributionChannel"));



            createQuotation.setProperty("/Division", evt.getParameter("Division"));



            createQuotation.setProperty("/RequestedDeliveryDate", cus.sd.myquotations.util.ModelExtractor.currentDateTime());



            createQuotation.setProperty("/ValidTo", cus.sd.myquotations.util.ModelExtractor.currentDateTime());



            createQuotation.setProperty("/ValidFrom", cus.sd.myquotations.util.ModelExtractor.currentDateTime());



            createQuotation.setProperty("/PurchaseOrder", "");



           



            var headerPricing = [ {



              ItemID : "000000",



              CondTypeCode : headerCondType,



              Counter : "000",



              AmountInternal : "0.0"



            } ];



            var headerPricingSet = {



              results : headerPricing



            };



            createQuotation.setProperty("/PricingConditionSet", headerPricingSet);







            self.oApplicationFacade.setApplicationModel("NewQuotation", createQuotation);







            if(jQuery.device.is.phone){



              self.oRouter.navTo("products");



            }else{



              self.oRouter.navTo("productEmpty");



              self.oRouter.navTo("products", undefined, true);



            }



          }



        });



      	this.oCustomerContextDialog.setPath("/CustomerSet");



      	setTimeout(function(){



          self.oCustomerContextDialog.setModel(self.getView().getModel());



    	  }, 1500);



      },







      // New Quotation call Creation view



      onNew : function(oEvent) {



        // open customer context popup



        this.oCustomerContextDialog.change();



      },



            



      buildSortDialog : function() {



    	  var self = this;



    	  this.sortDialog = new sap.m.ViewSettingsDialog({ 



    		sortDescending : true, 



  			confirm: function (oEvent) {



				var p = oEvent.getParameters(),



					oSorter = null;







				// fetch and adjust sorter (set sort order)



				if (p.sortItem) {



					oSorter = p.sortItem.getCustomData()[0].getValue();



					if (oSorter) {



						oSorter.bDescending = p.sortDescending;



						//additional sorting on quotation ID for cases where first sort criteria is the same for several quotations



						var oSorterID = new sap.ui.model.Sorter("QuotationID", p.sortDescending);



						



						// apply sorter to the list binding



						self.getList().getBinding("items").sort([oSorter,oSorterID]);						



					}



				}				



			}



    	  });  



    	  this.sortDialog.addSortItem(new sap.m.ViewSettingsItem({



  			key: "expiryDateSorter",



  			text: self.resourceBundle.getText("SORT_EXPIRY_DATE"),



  			customData: new sap.ui.core.CustomData({



  				key: "sorter",



  				value: new sap.ui.model.Sorter("ValidTo", false)



  			})



	  	  }));



    	  this.sortDialog.addSortItem(new sap.m.ViewSettingsItem({



	  			key: "netValueSorter",



	  			text:  self.resourceBundle.getText("SORT_AMOUNT"),



	  			customData: new sap.ui.core.CustomData({



	  				key: "sorter",



	  				value: new sap.ui.model.Sorter("NetValue", false)



	  			})



	  	  }));



    	  this.sortDialog.addSortItem(new sap.m.ViewSettingsItem({



	  			key: "statusSorter",



	  			text: self.resourceBundle.getText("SORT_STATUS"),



	  			customData: new sap.ui.core.CustomData({



	  				key: "sorter",



	  				value: new sap.ui.model.Sorter("ProcessingStatus", false)



	  			})



	  	  }));



    	  this.sortDialog.addSortItem(new sap.m.ViewSettingsItem({



	  			key: "creationDateSorter",



	  			text: self.resourceBundle.getText("SORT_CREATION_DATE"),



	  			selected: true,



	  			customData: new sap.ui.core.CustomData({



	  				key: "sorter",



	  				value: new sap.ui.model.Sorter("CreatedOn", true)



	  			})



	  	  })); 	



    	  this.sortDialogLoaded = true;



      },







      openSortDialog : function() {



    	  if (!this.sortDialogLoaded) {



    		  this.buildSortDialog();



    	  }



    	  this.sortDialog.open();



      },







      buildFilterDialog : function() {



    	  var self = this;



    	  var selectExpFilter = function(oEvent) {



    		  if (oEvent.getParameter("id").indexOf("dxpRB") > -1 && oEvent.getParameter("selected")) {



    			  self.getView().byId("daysSlider").setEnabled(true);



    		  } else {



    			  self.getView().byId("daysSlider").setEnabled(false);



    		  }



    		  self.getView().byId("expFilterItem").setSelected(true);



    	  };



    	  var customExpiryFilter = new sap.m.VBox({



    			items: [



    				new sap.m.RadioButton(self.getView().createId("expRB"), {       				



    					text: self.resourceBundle.getText("FILTER_EXPIRY_EXPIRED"),



    					groupName : "expirationRB",



    					select: selectExpFilter



    				}),



    			



    				new sap.m.RadioButton(self.getView().createId("nxpRB"), {    		   				



    					text: self.resourceBundle.getText("FILTER_EXPIRY_UNEXPIRED"),



    					groupName : "expirationRB",



    					select: selectExpFilter



    				}),



    				



    				new sap.m.RadioButton(self.getView().createId("dxpRB"), {        				



    					text: self._getNumDaysTextForFilter(self._getSliderDefaultValue()),



    					groupName : "expirationRB",



    					select: selectExpFilter



    				}),    				



    			



    				new sap.m.Slider(self.getView().createId("daysSlider"), { 



    					value: self._getSliderDefaultValue(),



    					min: 0,



    					max: self.sliderMax,



    					step: 1,    					



    					progress: true,



    					enabled: false,



    					liveChange: function (oEvent) {   



    						var aItems = oEvent.getSource().getParent().getItems();



    						for (var i=0; i <aItems.length; i++) {



    							if (aItems[i].getId().indexOf("dxpRB") > -1) {



    								aItems[i].setText(self._getNumDaysTextForFilter(oEvent.getParameter("value")));



    								aItems[i].setSelected(true);



    								break;



    							}



    						}    						



    					}



    				})



    			]



    	  });    	   	



    	



    	  var expiryCallback = function (oControl) {



    		  var aFilters = [],



			  aItems = oControl.getItems(),



    		  today = new Date(),



    		  expiryDate = new Date(),



    		  numDays = 0,



    		  id = "";



    		  



    		  for (var i=0; i < aItems.length; i++) {



					if (aItems[i] instanceof sap.m.RadioButton && aItems[i].getSelected()) {



						id = aItems[i].getId();



					} else if (aItems[i].getId().indexOf("daysSlider") > -1) {



						numDays = aItems[i].getValue();						



					}



			  } 



    		  if (id.indexOf("expRB") > -1) { 



    			  aFilters.push(new sap.ui.model.Filter('ValidTo', sap.ui.model.FilterOperator.LT, today));



    		  } else if (id.indexOf("nxpRB") > -1) {



    			  aFilters.push(new sap.ui.model.Filter('ValidTo', sap.ui.model.FilterOperator.GE, today));



    		  } else if (id.indexOf("dxpRB") > -1) {



    			  expiryDate.setDate(today.getDate() + numDays);



    			  aFilters.push(new sap.ui.model.Filter('ValidTo', sap.ui.model.FilterOperator.BT, today, expiryDate));



    		  }     		 



    		  



			  return aFilters;



	      };



    	  



    	  this.filterDialog = new sap.m.ViewSettingsDialog({



    		  confirm: function (oEvent) {



    			//reset the buffered filter arrays



    			self.filterValueArray.length = 0;    		   



    			var p = oEvent.getParameters(),



  					aFilters,



  					oCallback;







  				for (var i = 0 ; i < p.filterItems.length; i++) {



  					if (p.filterItems[i] instanceof sap.m.ViewSettingsCustomItem) { // custom control filter



  						oCallback = p.filterItems[i].getCustomData()[0].getValue();



  						aFilters = oCallback.apply(this, [p.filterItems[i].getCustomControl()]);



  						if (aFilters) {



  							// the filter could be an array of filters or a single filter so we transform it to an array



  							if (!Array.isArray(aFilters)) {



  								aFilters = [aFilters];



  							}



  							self.filterValueArray = self. filterValueArray.concat(aFilters);



  						}



  					} else if (p.filterItems[i] instanceof sap.m.ViewSettingsItem) { // standard filter



  						aFilters = p.filterItems[i].getCustomData()[0].getValue();



  						if (aFilters) {



  							// the filter could be an array of filters or a single filter so we transform it to an array



  							if (!Array.isArray(aFilters)) {



  								aFilters = [aFilters];



  							}



  							self.filterValueArray = self.filterValueArray.concat(aFilters);



  						}



  					}



  				}



  			



  				// apply filters to the table binding



  				self._updateList(self.getList().getBinding("items"));



	  				



	  			// update info toolbar



	  			self.getView().byId("infoBarToolbar").setVisible((self.filterValueArray.length > 0) ? true: false);



	  			self.getView().byId("infoBarFilter").setText((self.filterValueArray.length > 0) ? p.filterString: "");  



	  			



	  			// save expiry filter state for the "cancel" action



	  			self._setExpiryFilterState();		      	        



  			}



    	  });   



    	 



    	  this.filterDialog.addFilterItem(new sap.m.ViewSettingsCustomItem(self.getView().createId("expFilterItem"), {



    			key: "expiryFilter",



    			text:  self.resourceBundle.getText("FILTER_EXPIRY"),



    			customControl: customExpiryFilter,



    			customData: new sap.ui.core.CustomData({



    				key: "callback",



    				value: expiryCallback 



    			})



    	  }));



    	  this.filterDialog.addFilterItem(new sap.m.ViewSettingsFilterItem({



  			key: "statusFilter",



  			text: self.resourceBundle.getText("FILTER_STATUS"),



  			items: [



  				new sap.m.ViewSettingsItem({



  					key: "openStatus",



  					text:  self.resourceBundle.getText("STATUS_OPEN"),



  					customData: new sap.ui.core.CustomData({



  						key: "filter",



  						value: new sap.ui.model.Filter("ProcessingStatus", sap.ui.model.FilterOperator.EQ, "A")



  					})



  				}),



  				new sap.m.ViewSettingsItem({



  					key: "inprocessStatus",



  					text: self.resourceBundle.getText("STATUS_INPROCESS"),



  					customData: new sap.ui.core.CustomData({



  						key: "filter",



  						value: new sap.ui.model.Filter("ProcessingStatus", sap.ui.model.FilterOperator.EQ, "B")



  					})



  				}),



  				new sap.m.ViewSettingsItem({



  					key: "completedStatus",



  					text: self.resourceBundle.getText("STATUS_COMPLETED"),



  					customData: new sap.ui.core.CustomData({



  						key: "filter",



  						value: new sap.ui.model.Filter("ProcessingStatus", sap.ui.model.FilterOperator.EQ, "C")



  					})



  				})



  			]



  		}));



    	



	  this.filterDialog.addFilterItem(new sap.m.ViewSettingsFilterItem({



			key: "rejStatusFilter",



			text: self.resourceBundle.getText("FILTER_REJ_STATUS"),



			items: [



				new sap.m.ViewSettingsItem({



					key: "notRejStatus",



					text:  self.resourceBundle.getText("STATUS_NOT_REJ"),



					customData: new sap.ui.core.CustomData({



						key: "filter",



						value: new sap.ui.model.Filter("RejectionStatus", sap.ui.model.FilterOperator.EQ, "A")



					})



				}),



				new sap.m.ViewSettingsItem({



					key: "partRejStatus",



					text: self.resourceBundle.getText("STATUS_PART_REJ"),



					customData: new sap.ui.core.CustomData({



						key: "filter",



						value: new sap.ui.model.Filter("RejectionStatus", sap.ui.model.FilterOperator.EQ, "B")



					})



				}),



				new sap.m.ViewSettingsItem({



					key: "allRejStatus",



					text: self.resourceBundle.getText("STATUS_ALL_REJ"),



					customData: new sap.ui.core.CustomData({



						key: "filter",



						value: new sap.ui.model.Filter("RejectionStatus", sap.ui.model.FilterOperator.EQ, "C")



					})



				})



			]



		}));



    	  



    	this.filterDialog.attachResetFilters(function() {



    		self._resetFilterControl();



    	});



  		this.filterDialog.attachCancel(function() {  			



	  		self.getView().byId("dxpRB").setText(self.expiryFilterStateMap.dxpRBText);



	  		self.getView().byId("daysSlider").setValue(self.expiryFilterStateMap.sliderValue);



	  		self.getView().byId("daysSlider").setEnabled(self.expiryFilterStateMap.dxpRBSelected);



	  		self.getView().byId("expRB").setSelected(self.expiryFilterStateMap.expRBSelected);



	  		self.getView().byId("nxpRB").setSelected(self.expiryFilterStateMap.nxpRBSelected);



	  		self.getView().byId("dxpRB").setSelected(self.expiryFilterStateMap.dxpRBSelected);



	  		self.getView().byId("expFilterItem").setSelected(self.expiryFilterStateMap.expFilterItemSelected);



  		}); 



  	    // set initial expiry filter state for the "cancel" action



  		this._setExpiryFilterState();



  		this.filterDialogLoaded = true;



      },



      



      openFilterDialog : function() {



    	  if (!this.filterDialogLoaded) {



    		  this.buildFilterDialog();



    	  }



    	  this.filterDialog.open();



      },      



      



      _resetFilterControl : function() {



    	  var sliderDefaultValue = this._getSliderDefaultValue();



    	  var sliderText = this._getNumDaysTextForFilter(sliderDefaultValue);



    	  this.getView().byId("dxpRB").setText(sliderText);



    	  this.getView().byId("daysSlider").setValue(sliderDefaultValue);



    	  this.getView().byId("daysSlider").setEnabled(false);



    	  this.getView().byId("expRB").setSelected(false);



    	  this.getView().byId("nxpRB").setSelected(false);



    	  this.getView().byId("dxpRB").setSelected(false);



    	  this.filterDialog.setSelectedFilterKeys({openStatus: false, inprocessStatus: false, completedStatus: false, 



    		  									   notRejStatus: false, partRejStatus: false, allRejStatus: false});    	  



    	  this.getView().byId("expFilterItem").setSelected(false);    	  



      },



      



      _setExpiryFilterState: function() {



    	  this.expiryFilterStateMap.dxpRBText = this.getView().byId("dxpRB").getText();



    	  this.expiryFilterStateMap.sliderValue = this.getView().byId("daysSlider").getValue();



    	  this.expiryFilterStateMap.expRBSelected = this.getView().byId("expRB").getSelected();



    	  this.expiryFilterStateMap.nxpRBSelected = this.getView().byId("nxpRB").getSelected();



    	  this.expiryFilterStateMap.dxpRBSelected = this.getView().byId("dxpRB").getSelected();



    	  this.expiryFilterStateMap.expFilterItemSelected = this.getView().byId("expFilterItem").getSelected();



      },



      



      clearFilters : function() {



         this._resetFilterControl();



         this._setExpiryFilterState();



         this.filterValueArray.length = 0;



         this.getView().byId("infoBarFilter").setText("");



         this.getView().byId("infoBarToolbar").setVisible(false);



   	  	 this._updateList(this.getList().getBinding("items"));



      },



   



      _updateList : function(oBindings) {



        var filters = [];







        // add filter for search	       



        if (this.searchString && this.searchString.length > 0) {



          var filter = new sap.ui.model.Filter("Search/SearchTerm", sap.ui.model.FilterOperator.EQ, this.searchString);



          filters.push(filter);



        }







        // add filter for filter



        if (this.filterValueArray.length > 0) {



          filters = filters.concat(this.filterValueArray);



        }







        oBindings.filter(filters);



      },   



      



      _getNumDaysTextForFilter: function(numDays) {    	   



    	  var numDaysString = "";    	  



    	  if (numDays < 1) {



    		  numDaysString = this.resourceBundle.getText("FILTER_EXPIRY_DAYS_TODAY");



    	  } else if (numDays === 1) {



    		  numDaysString = this.resourceBundle.getText("FILTER_EXPIRY_DAYS_TOMORROW");



    	  } else if (numDays > 1) {



    		  numDaysString = this.resourceBundle.getText("FILTER_EXPIRY_DAYS_IN", [numDays]);



    	  }



    	  return numDaysString;



      }, 



      



      _getSliderDefaultValue : function() {



    	  var redThreshold = this.oApplicationFacade.getApplicationModel("customizing").getProperty("/RED_THRESHOLD");



    	  if (redThreshold > this.sliderMax) {



    		  return this.sliderMax;



    	  }



    		return redThreshold;



      },



     



      createMasterBindingInfo : function() {



        var oTemplate = this.getList().getItems()[0].clone();



        var oSorter = new sap.ui.model.Sorter("CreatedOn", true);



        var oSorterID = new sap.ui.model.Sorter("QuotationID", true);



        return {



          path : "/QuotationSet",



          template : oTemplate,



          sorter : [ oSorter, oSorterID ],



          filters : undefined,



          parameters : {



            select : "QuotationID,NetValue,Currency,ValidTo,SoldToPartyDescription,ProcessingStatusDesc,ProcessingStatus,SalesDocumentTypeDesc"



          }



        };



      },







      isBackendSearch : function() {



        return true;



      },	



	  



	  applyBackendSearchPattern : function(sFilterPattern, oBindings) {



		  this.searchString = sFilterPattern;



		  if (this.getList().getBinding("items").bPendingRequest === false){



			  this._updateList(oBindings);



		  }



	  },



		



  getHeaderFooterOptions : function() {



    var that = this;



    return {



      sI18NMasterTitle : "MASTER_TITLE",	



  		oSortOptions : {



  			onSortPressed : function(oEvent) {



  				that.openSortDialog();					



  			} 



  		},



  		oFilterOptions : {



  			onFilterPressed : function(oEvent) {



  				that.openFilterDialog();					



  			}



  		},



  		onAddPress : function() {



  			that.onNew();



  	  }



	  };



  }



});



},



	"cus/sd/myquotations/view/Master.view.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n<core:View xmlns="sap.m" xmlns:core="sap.ui.core" controllerName="cus.sd.myquotations.view.Master">\r\n\t<Page id="page">\r\n\t\t<content>\r\n\t\t\t<List id="list" mode="{device>/listMode}" select="_handleSelect"\r\n\t\t\t\t  growing="true" growingThreshold="50" growingScrollToLoad="true" noDataText="{i18n>NODATA}">\r\n\t\t\t\t<ObjectListItem id="MAIN_LIST_ITEM" type="{device>/listItemType}" press="_handleItemPress" title="{SoldToPartyDescription}"\r\n                    number="{parts:[{path:\'NetValue\'},{path:\'Currency\'}], formatter:\'cus.sd.myquotations.util.Formatter.PriceCurrency\'}"\r\n                    numberUnit="{path:\'Currency\', formatter:\'cus.sd.myquotations.util.Formatter.formatNetValue\'}">\r\n \t\t\t\t\t<attributes>\r\n\t\t\t\t\t\t<ObjectAttribute id="expirationDate" text="{path:\'ValidTo\' ,formatter:\'cus.sd.myquotations.util.Formatter.formatExpiryDate\'}" active="false"/>\r\n\t\t\t\t\t\t<ObjectAttribute text="{parts:[{path:\'SalesDocumentTypeDesc\'},{path:\'QuotationID\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatQuotationID\'}"/>\r\n\t\t\t\t\t</attributes> \r\n\t\t\t\t\t<firstStatus>\r\n\t\t\t\t\t\t<ObjectStatus text="{parts:[{path:\'ProcessingStatusDesc\'},{path:\'ProcessingStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatStatus\'}"\r\n\t\t\t\t\t\t\t\t\t  state="{parts:[{path:\'ValidTo\'},{path:\'ProcessingStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatExpiryState\'}"/>\r\n\t\t\t\t\t</firstStatus>\r\n\t\t\t\t</ObjectListItem>  \r\n\t\t\t\t<infoToolbar>\r\n\t\t\t\t\t<Toolbar visible="false" id="infoBarToolbar">\r\n\t\t\t\t\t\t<content>\r\n\t\t\t\t\t\t\t<Label id="infoBarFilter"/>\r\n\t\t\t\t\t\t\t<ToolbarSpacer/>\r\n\t\t\t\t\t\t\t<core:Icon id="closeFilterIcon" src="sap-icon://sys-cancel" press="clearFilters"/> \r\n\t\t\t\t\t\t</content>\r\n\t\t\t\t\t</Toolbar>\r\n\t\t\t\t</infoToolbar> \r\n\t\t\t</List>\r\n\t\t</content>\t\t\r\n\t</Page>\r\n</core:View>',



	"cus/sd/myquotations/view/NotesAndAttachmentsBaseController.js":function(){/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");



jQuery.sap.require("sap.ui.core.delegate.ScrollEnablement");



/**



 * Notes & Attachments Base Controller. Extend this controller if you use a



 * scenario that has Notes And Attachments items.



 * 



 * Once extended it is necessary to implement the getQuotationId method that



 * returns the Quotation id for the view.



 * 



 * It is also necessary that you include the fragments Notes.fragment.xml and



 * Attachments.fragment.xml as this controller expects these two fragments to



 * exist in this.getView().



 * 



 * Once the binding context (Id) if your controller has changed it is necessary



 * to call the following methods to update the Notes & Attachment fragments:



 * 



 * updateNotesOnQuotationChange(ID) updateAttachmentsOnQuotationChange(ID)



 * 



 * This will cause the Notes & Attachments model to retrieve the Notes &



 * Attachments for that Quotation.



 */



sap.ca.scfld.md.controller.BaseDetailController.extend("cus.sd.myquotations.view.NotesAndAttachmentsBaseController", {







  // Service locations



  _LORDODATA_BASE_URL : "/sap/opu/odata/sap/zlord_my_quotation_srv",



  _ATTACHMENT_URL : "/AttachmentSet",







  // Fixed Control IDs



  _ATTACHMENTS_UI_ID : "AttachmentsUI",



  _NOTES_UI_ID : "NotesUI",







  /**



   * Initializes the Notes & Attachment model as "NotesAndAttachments".



   * Registers the events for request completion and failures and sets up the



   * post location for attachments.



   * 



   */



  onInit : function() {



    sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);







    /**



     * Set the security token in the Notes & Attachments Model. Also sets the



     * token on the FileUpload Control.



     */



    // if upload enabled, must set xsrf token



    // and the base64 encodingUrl service for IE9 support!



    var oFileUpload = this.getView().byId(this._ATTACHMENTS_UI_ID);



    var sUrlParams = this.getView().getModel().sUrlParams;



    oFileUpload.setEncodeUrl("/sap/bc/ui2/encode_file" + (sUrlParams ? '?' + sUrlParams : ''));







    sap.ui.core.delegate.ScrollEnablement._bScrollToInput = true;



  },







  // --------------------------------------- Common



  // Code-------------------------------------------------------------------







  /**



   * Handles the creation of a note from the control with the id NotesUI.



   * Creates a post request to the NoteSet service contained in the



   * NotesAndAttachments model. If a note creation was successful the model and



   * UI will update. Otherwise a toast message will occur.



   * 



   * On success the onNoteCreationSuccess(oData, oResponse) method is called. On



   * failure the onNoteCreatoinFailure(oError) method is called.



   * 



   * @param oEvent



   *          the Event object



   */



  _handleAddNote : function(oEvent) {



    var data = {};



    data.Content = oEvent.getParameters().value;



    data.QuotationID = this.getQuotationId();



    data.Title = this.getFormattedTitle();







    var self = this;



    var oModel = this.getView().getModel();



    oModel.create("QuotationHeaderSet('" + data.QuotationID + "')/NoteSet/", data, null, function(oData, oResponse) {



      var msg = self.oBundle.getText("NOTE_CREATED");



      sap.m.MessageToast.show(msg);



      self.loadQuotation(data.QuotationID);



    }, function(oError) {



      cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(oError);



      sap.m.MessageToast.show(self.oBundle.getText("NOTE_CREATION_FAILD"));



    });



  },







  // --------------------------------------- Attachments



  // ------------------------------------------------------------------







  /**



   * Updates the NotesAndAttachments model (Sets the context) with the given



   * QuotationId. Necessary to be called when the Id of the current view is



   * changed.



   * 



   * @param sQuotationID



   *          String, the QuotationID



   */



  updateAttachmentsOnQuotationChange : function(sQuotationID) {



    var sUrl = this._LORDODATA_BASE_URL + "/QuotationHeaderSet('" + this.getQuotationId() + "')" + this._ATTACHMENT_URL;



    this.getView().byId(this._ATTACHMENTS_UI_ID).setUploadUrl(sUrl);



  },







  /**



   * 



   * @param oEvent



   */



  onBeforeUploadFile : function(oEvent) {



    var oFileUpload = this.getView().byId(this._ATTACHMENTS_UI_ID);



    var sSlug = "SalesOrderID='" + this.getQuotationId() + "', Title='" + this.getQuotationId() + "', Filename='" + oEvent.mParameters.name + "'";







    oFileUpload.setCustomHeader("slug", sSlug);



    oFileUpload.setXsrfToken(this.getView().getModel().oHeaders["x-csrf-token"]);



  },







  /**



   * 



   * @param oEvent



   */



  onUploadFile : function(oEvent) {



    var oData;



    // with some browsers (eg. IE9) the data comes in a different property!



    if (oEvent.getParameters() && oEvent.getParameters().d) {



      oData = oEvent.getParameters().d;



    } else {



      oData = oEvent.getParameters();



    }







    var oFile = this.buildFileDescriptorObject(oData);







    // commit the file descriptor object to the FileUpload control



    this.byId(this._ATTACHMENTS_UI_ID).commitFileUpload(oFile);







    this.loadQuotation(this.getQuotationId());



  },







  /**



   * 



   * @param value



   * @returns {Object}



   */



  buildFileDescriptorObject : function(value) {



    var oDate = parseInt(value.CreatedOnDate.substr(6), 10);







    return {



      name : value.Filename,



      size : value.DocumentSize,



      url : value.__metadata.media_src,



      uploadedDate : new Date(oDate + new Date().getTimezoneOffset() * 60000).toISOString(),



      contributor : value.CreatedBy,



      fileExtension : value.ObjectTypeCode ? value.ObjectTypeCode.toLowerCase() : value.ObjectTypeCode,



      fileId : value.Title,



      mimeType : value.mimeType



    };



  },







  /**



   * 



   * @param oEvent



   */



  onFileUploadFailed : function(oEvent) {



    var errorMessage = "";



    if (oEvent && oEvent.getParameters()) {



      var parameters = oEvent.getParameters();



      if (parameters.exception && parameters.exception.message) {



        errorMessage = oEvent.getParameters().exception.message;



      }



      if (parameters.response && parameters.response.jqXHR) {



        var jqXHR = parameters.response.jqXHR;



        errorMessage += "\n " + jqXHR.statusText + " : " + jqXHR.responseText;



      }



      if (parameters.response && parameters.response.messages) {



        var propertyName = null;



        for (propertyName in parameters.response.messages) {



          if (parameters.response.messages.hasOwnProperty(propertyName)) {



            errorMessage += "\n " + propertyName + " : " + parameters.response.messages[propertyName];



          }



        }



      }



    }







    sap.ca.ui.message.showMessageBox({



      type : sap.ca.ui.message.Type.ERROR,



      message : errorMessage,



      details : errorMessage



    });



  },







  /**



   * Event callback for the Delete button



   * 



   * @param oEvent



   *          {Object} press event



   */



  onDeleteFile : function(oEvent) {



    var sPath = oEvent.mParameters.url.substr(oEvent.mParameters.url.indexOf(this._ATTACHMENT_URL), oEvent.mParameters.url.length);



    sPath = sPath.substr(0, sPath.length - 7); // Remove '/$value'



    var self = this;







    var fnSuccess = function(oData, oResponse) {



      self.updateAttachmentsOnQuotationChange(self.getQuotationId());



    };







    var oParameters = {



      fnSuccess : fnSuccess,



      fnFailure : this.onAttachmentDeletionFailure



    };







    this.getView().getModel().remove(sPath, oParameters);







    this.loadQuotation(this.getQuotationId());



  },







  /**



   * Event callback for the rename file button



   * 



   * @param oEvent



   *          {Object} press event



   */



  onRenameFile : function(oEvent) {



  },







  /**



   * Called when an attachment failed to delete. Override if you would like to



   * hook into this event.



   * 



   * @param oError



   *          {Object}, the error that occurred



   */



  onAttachmentDeletionFailure : function(oError) {



  }







});



},



	"cus/sd/myquotations/view/ProductDetail.controller.js":function(){/*



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



},



	"cus/sd/myquotations/view/ProductDetail.view.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n<core:View controllerName="cus.sd.myquotations.view.ProductDetail"\r\n\txmlns="sap.m" xmlns:me="sap.me" xmlns:form="sap.ui.layout.form" xmlns:layout="sap.ui.layout"\r\n\txmlns:mvc="sap.ui.core.mvc" xmlns:core="sap.ui.core">\r\n\n\t<Page>\r\n\t\t<customHeader>\t\t\t\r\n\t\t\t<Bar>\r\n\t\t\t\t<contentLeft>\r\n\t\t\t\t\t<Button id="navback" icon="sap-icon://nav-back" press="_navBack" visible="{device>/isPhone}"/>\r\n\t\t\t\t</contentLeft>\r\n\t\t\t\t<contentMiddle>\r\n\t\t\t\t\t<Label id="pageTitle" text="{i18n>ADDMATTOCART}"/>\r\n\t\t\t\t</contentMiddle>\r\n\t\t\t\t<contentRight>\r\n\t\t\t\t\t<Button id="cartButton" icon="sap-icon://cart" press="goToCreateQuotation" />\r\n\t\t\t\t</contentRight>\r\n\t\t\t</Bar>\t\t\t\r\n\t\t</customHeader>\n\t\t<content>\r\n\t\t\t<ObjectHeader title="{MaterialDetail>/MaterialDescription}" \r\n\t\t\t\t\t\tnumber="{parts:[{path:\'MaterialPrice>/Price\'},{path:\'MaterialPrice>/Currency\'}], formatter:\'cus.sd.myquotations.util.Formatter.PriceCurrency\'}" \r\n\t\t\t\t\t\tnumberUnit="{path:\'MaterialPrice>/Currency\', formatter:\'cus.sd.myquotations.util.Formatter.formatListPrice\'}">\r\n\t\t\t\t<attributes>\r\n\t\t\t\t\t<ObjectAttribute text="{MaterialDetail>/MaterialId}"/>\t\t\t\t\t\r\n\t\t\t\t</attributes>\t\t\t\t\r\n\t\t\t</ObjectHeader>\r\n\r\n\t\t\t\t<layout:VerticalLayout width="100%">\t\t\t\t\r\n\t\t\t\t\t<FlexBox id="qtyFlexBlox" justifyContent="End" alignItems="Start">\r\n\t\t\t        \t<HBox alignItems="Center" justifyContent="SpaceAround" width="19rem">\r\n\t\t\t            \t<items>\r\n\t\t\t                \t<Label id="qtyLabel" text="{i18n>QUANTITY}:"></Label>\r\n\t\t\t\t\t\t\t\t<Input id="qtyInput" value="{path: \'Quantity>/value\',  type:\'sap.ca.ui.model.type.Number\', formatOptions : { style: \'standard\'}}" \r\n\t\t\t\t\t\t\t\t\twidth="5.5rem"  change="formChangedInputQuantity" />\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<Select id="unitDDLB" items="{MaterialUoMSet>/results}"\r\n\t\t\t\t\t\t\t\t\tselectedKey="{MaterialDetail>/UoM}" change="onSwitchUoM">\r\n\t\t\t\t\t\t\t\t\t<core:Item text="{MaterialUoMSet>UoMText}" key="{MaterialUoMSet>UoM}"></core:Item>\r\n\t\t\t\t\t\t\t\t</Select>\r\n\t\t\t                </items>\r\n\t\t\t            </HBox>\r\n\t\t\t        </FlexBox>\t\r\n\t\t\t       \t\r\n\t\t\t\t\t<form:SimpleForm id="matDetail" editable="false">\r\n\t\t\t\t\t\t<form:content>\r\n\t\t\t\t\t\t\t<core:Title text="{i18n>DETAIL_TITLE}" level="H3" emphasized="true" />\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extQuotationMaterialDetailTop"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>MATERIALGROUP}"/>\r\n\t\t\t\t\t\t\t<ObjectNumber number="{MaterialDetail>/MaterialGroup}" emphasized="false"/>\r\n\r\n\t\t\t\t\t\t\t<Label text="{i18n>DIVISION}"/>\r\n\t\t\t\t\t\t\t<ObjectNumber number="{MaterialPrice>/Division}" emphasized="false"/>\r\n\r\n\t\t\t\t\t\t\t<Label text="{i18n>GROSSWEIGHT}"/>\r\n\t\t\t\t\t\t\t<ObjectNumber id="grossWeightText" numberUnit="{MaterialDetail>/UnitOfWeight}" emphasized="false" />\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>NETWEIGHT}"/>\r\n\t\t\t\t\t\t\t<ObjectNumber number="{MaterialDetail>/NetWeight}" numberUnit="{MaterialDetail>/UnitOfWeight}" emphasized="false"/>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>VOLUME}"></Label>\r\n\t\t\t\t\t\t\t<ObjectNumber number="{MaterialDetail>/Volume}" numberUnit="{MaterialDetail>/UnitOfVolume}" emphasized="false"/>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Label text="{i18n>DIMENSIONS}"/>\r\n\t\t\t\t\t\t\t<ObjectNumber number="{MaterialDetail>/Dimensions}" emphasized="false"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<core:ExtensionPoint name="extQuotationMaterialDetailBottom"/>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</form:content>\r\n\t\t\t\t\t</form:SimpleForm>\t\t\t\t\r\n\t\t\t\t</layout:VerticalLayout>\t\t\t\r\n\t\t</content>\r\n\t\t <footer>\r\n\t\t\t<Bar>\r\n\t\t\t\t<contentRight>\r\n\t\t\t\t\t<Button text="{i18n>ADDTOCART}" id="TRC_BTN_A2C" tap="onAddToCart" enabled="{buttons>/enableAddToCart}" type="Emphasized"></Button>\r\n\t\t\t\t\t<Button text="{i18n>CANCEL}" id="TRC_BTN_CANCEL" tap="onCancel" />\r\n\t\t\t\t</contentRight>\r\n\t\t\t</Bar>\r\n\t\t</footer>\r\n\t\n\t</Page>\r\n</core:View>\r\n',



	"cus/sd/myquotations/view/ProductSearch.controller.js":function(){/*



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



},



	"cus/sd/myquotations/view/ProductSearch.view.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n<core:View controllerName="cus.sd.myquotations.view.ProductSearch"\r\n\txmlns="sap.m" xmlns:core="sap.ui.core">\r\n\t<Page id="page">\r\n\t\t<content>\r\n\t\t\t<List id="list" mode="{device>/listMode}" select="_handleSelect"\r\n                   growing="true" growingThreshold="50" growingScrollToLoad="true" noDataText="{i18n>NODATA}">\r\n\t\t\t\t<ObjectListItem id="PROD_LIST_ITEM" type="{device>/listItemType}" press="_handleItemPress" \r\n\t\t\t\t\ttitle="{path:\'MaterialDesc\', formatter:\'cus.sd.myquotations.util.Formatter.formatMatDesc\'}">\r\n\t\t\t\t\t<attributes>\r\n\t\t\t\t\t\t<ObjectAttribute id="productId" text="{MaterialId}"></ObjectAttribute>\r\n\t\t\t\t\t</attributes>\r\n\t\t\t\t</ObjectListItem>\r\n\t\t\t</List>\r\n\t\t</content>\r\n\t</Page>\r\n</core:View>',



	"cus/sd/myquotations/view/S3.controller.js":function(){/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");



jQuery.sap.require("sap.ui.core.mvc.Controller");



jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");



jQuery.sap.require("cus.sd.myquotations.view.NotesAndAttachmentsBaseController");







cus.sd.myquotations.view.NotesAndAttachmentsBaseController.extend("cus.sd.myquotations.view.S3", {







  onInit : function() {



    // execute the onInit for the base class BaseDetailController



    cus.sd.myquotations.view.NotesAndAttachmentsBaseController.prototype.onInit.call(this);



    // Bind core model to the view



    this.getView().setModel(new sap.ui.model.json.JSONModel(), "quotation");







    this.oBundle = this.oApplicationFacade.getResourceBundle();







    this.oRouter.attachRouteMatched(function(oEvent) {



      if (oEvent.getParameter("name") === "detail") {



        this.onNavDetail(oEvent.getParameter("arguments").contextPath);



      }



      else if (oEvent.getParameter("name") === "display") {



    	  this.onNavDetail(oEvent.getParameter("arguments").contextPath);



          this.fullScreenMode = true;



          this.oApplicationFacade.setApplicationModel("global", new sap.ui.model.json.JSONModel());



          this.oApplicationFacade.setApplicationModel("customizing", new sap.ui.model.json.JSONModel());



          this.oApplicationFacade.getApplicationModel("global").setProperty("/fullScreenMode", this.fullScreenMode);



          



          var service = this.getView().getModel();



          var self = this;



          service.read("CustomizingSet", undefined, undefined, false, function(oData, response) {



              var dataCustomizingSet = (oData && oData.results && oData.results[0]) ? oData.results[0] : self.getDefaultCustomizingSet();



              self.oApplicationFacade.getApplicationModel("customizing").setData(dataCustomizingSet);



            }, function(oData, response) {



              cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(oData, response);



          });



      }



    }, this);







    this.setHeaderFooterOptions(this.createHeaderFooterOptions());



  },







  createHeaderFooterOptionsSAPJam : function(enableButtons) {



    var that = this;



    



    var oObjectListItem = new sap.m.ObjectListItem({



      title : that.byId('headerInfo').getTitle(),



      attributes : [new sap.m.ObjectAttribute({text : that.byId('headerInfo').getAttributes()[1].getText()}),



                    new sap.m.ObjectAttribute({text : that.byId('headerInfo').getAttributes()[0].getText()})],



      secondStatus: new sap.m.ObjectStatus({text : that.byId('headerInfo').getStatuses()[1].getText()



                                                                   , state: that.byId('headerInfo').getStatuses()[1].getState()})



    });



    



    



    var footerButtons = that.createHeaderFooterOptions();



    footerButtons.oJamOptions = {fGetShareSettings : function() {



      return {



        object : {



               id : window.location.href,



               display : oObjectListItem,



          } 



  };



  }};



    



    return footerButtons;



  },



  



  createHeaderFooterOptions : function(enableButtons) {



    var that = this;



    return {



      oEditBtn : {



        sId : "TRC_BTN_EDIT",



        sI18nBtnTxt : "EDIT",



        onBtnPressed : function(evt) {



          that.onEdit();



        },



        bEnabled : true



      },



      buttonList : [ {



        sId : "TRC_BTN_COPY",



        sI18nBtnTxt : "COPY_QUOTE",



        onBtnPressed : function(evt) {



          that.onCopy();



        }



      } ],



      oAddBookmarkSettings : {



        title : this.getFormattedTitle(),



        icon : "sap-icon://Fiori2/F0390"



      },



      onBack: this.fullScreenMode ? function(){window.history.back(1);} : undefined



    };



  },







  onNavDetail : function(quotID) {



    this.quotID = quotID;



    this.loadQuotation(quotID);



  },







  //Reads a single quotation from the backend and calls methods to adjust the JSON model to fit



  //the UI needs.



  loadQuotation : function(quotID) {



    var aUrlParams = [ "$expand=" + //



    "AttachmentSet," + //



    "PartnerSet," + //



    "PricingConditionSet," + //



    "NoteSet," + //



    "QuotationItemSet/PricingConditionSet"];







    var quotSet = "QuotationHeaderSet('" + quotID + "')";







    var self = this;







    // initialize Model



    var singleQuotationModel = new sap.ui.model.json.JSONModel();







    this.setHeaderFooterOptions(this.createHeaderFooterOptions());



    this.setBtnEnabled("TRC_BTN_COPY", false);



    this.setBtnEnabled("TRC_BTN_EDIT", false);



    this.setBtnEnabled("TRC_BTN_SEND_QUOT", false);







    this.getView().setModel(singleQuotationModel, "quotation");



    this.getView().setModel(new sap.ui.model.json.JSONModel(), "soldTo");



    this.getView().setModel(new sap.ui.model.json.JSONModel(), "billTo");



    this.getView().setModel(new sap.ui.model.json.JSONModel(), "shipTo");



    this.getView().setModel(new sap.ui.model.json.JSONModel(), "contactPeople");



    this.getView().byId("NotesUI").clear();







    // asynchronous update of detail



    var service = this.getView().getModel();



    if(!service.bTokenRequested){



      service.mCustomHeaders['X-CSRF-Token'] = 'Fetch' ;      



    }



    service.read(quotSet, null, aUrlParams, true, function(oData, response) {



      if(response.headers["x-csrf-token"]){



        service.oHeaders["x-csrf-token"] = response.headers["x-csrf-token"];



        service.bTokenRequested = true;



      }







      singleQuotationModel.setData(oData);







      self._buildPartnerModels();



      self._parseItemsConditions();



      self._parseHeadterConditions();



      self._parseHeadterPercentageConditions();



      







      var NotesUI = self.getView().byId("NotesUI");



      if (NotesUI.getItems()[0]) {



        var template = NotesUI.getItems()[0].clone();



        NotesUI.bindItems({



          path : "/NoteSet/results",



          template : template,



          model : "quotation"



        });



      }



      var AttachmentsUI = self.getView().byId("AttachmentsUI");



      if (oData && oData.AttachmentSet && oData.AttachmentSet.results) {



        var attachments = JSON.parse(JSON.stringify(oData.AttachmentSet));



        var data = {



          Attachments : []



        };



        $.each(attachments.results, function(index, value) {



          var o = {



            name : value.Filename,



            size : value.DocumentSize,



            url : value.__metadata.media_src,



            // value.CreatedOnDate is UTC, add missing TimezoneOffset



            uploadedDate : new Date(new Date(value.CreatedOnDate).getTime() + new Date().getTimezoneOffset() * 60000).toISOString(),



            contributor : value.CreatedBy,



            fileExtension : value.ObjectTypeCode ? value.ObjectTypeCode.toLowerCase() : value.ObjectTypeCode,



            fileId : value.Title,



            mimeType : value.mimeType



          };



          data.Attachments.push(o);



        });



        AttachmentsUI.setModel(new sap.ui.model.json.JSONModel(data));



      }







      self.updateAttachmentsOnQuotationChange(quotID);







      var listItems = self.getView().byId("listItems");



      if (listItems.getItems()[0]) {



        var oTemplate = listItems.getItems()[0].clone();



        listItems.bindItems({



          path : "/QuotationItemSet/results",



          template : oTemplate,



          model : "quotation"



        });



      }







      self.setHeaderFooterOptions(self.createHeaderFooterOptionsSAPJam());



      self.setBtnEnabled("TRC_BTN_COPY", !self.fullScreenMode);



      self.setBtnEnabled("TRC_BTN_EDIT", true);



      self.setBtnEnabled("TRC_BTN_SEND_QUOT", true);



      self.oApplicationFacade.getApplicationModel("global").setProperty("/lastQuotationID", quotID);







      



      self._setSharedModel(singleQuotationModel);



      self._divideItemsDisount();



      singleQuotationModel.updateBindings();







    }, function(oData, response) {



      cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(oData, response);



    });



    delete service.mCustomHeaders['X-CSRF-Token'];



    



  },







  //Sets a copy of the view model as a shared model. The shared model is the one used across views.



  _setSharedModel:function(oModel){



    var sharedQuotation = new sap.ui.model.json.JSONModel();



    sharedQuotation.setData(jQuery.extend(true, {}, oModel.getData()));



    this.oApplicationFacade.setApplicationModel("NewQuotation", sharedQuotation);



  },



  



  onAfterRendering : function() {



  },







  _parseHeadterPercentageConditions : function() {



    cus.sd.myquotations.util.ModelExtractor.ParseHeadterDiscountPercentageConditions(this.getView().getModel("quotation"));



  },







  _parseHeadterConditions : function() {



    cus.sd.myquotations.util.ModelExtractor.ParseHeadterConditions(this.getView().getModel("quotation"));



  },







  _parseItemsConditions : function() {



    cus.sd.myquotations.util.ModelExtractor.ParseItemsConditions(this.getView().getModel("quotation"));



  },



  



  //Divides the discount by 100 because the formatter expects the percentage in the format 0.25 and the



  //backend returns it in the format 25



  _divideItemsDisount:function(){



    cus.sd.myquotations.util.ModelExtractor.DivideItemsDiscount(this.getView().getModel("quotation"));



  },







  //Extracting the partners from the PartnerSet list. The partners are displayed at different locations on the UI, it



  //is not possible from the xml view to fetch a specific partner from the list. This is why we do the extraction in the



  //controller.



  _buildPartnerModels : function() {



    var partnerModels = cus.sd.myquotations.util.ModelExtractor.BuildPartnerModels(this.getView().getModel("quotation"));



    this.getView().setModel(partnerModels.SoldTo, "soldTo");



    this.getView().setModel(partnerModels.BillTo, "billTo");



    this.getView().setModel(partnerModels.ShipTo, "shipTo");







    var oDataPartners = cus.sd.myquotations.util.ModelExtractor.extractPartnersType(this.getView().getModel("quotation"), "AP");



    var contactPeople = [];



    for ( var i = 0; i < oDataPartners.length; i++) {



      contactPeople[contactPeople.length] = {



        title : this.oBundle.getText("CONTACTOVERVIEW_TITLE"),



        name : oDataPartners[i].Name1 + " " + oDataPartners[i].Name2,



        imgurl : "sap-icon://person-placeholder",



        department : oDataPartners[i].PartnerFunctionDescription,



        contactmobile : oDataPartners[i].CellPhoneNumber,



        contactphone : oDataPartners[i].TelephoneNumber,



        contactemail : oDataPartners[i].Email,



        contactemailsubj : this.getFormattedTitle(),



        companyname : partnerModels.SoldTo.oData.Name1,



        companyaddress : oDataPartners[i].HouseNumber + " " + oDataPartners[i].Street + ", " + oDataPartners[i].City + ", "



                         + oDataPartners[i].CountryDescription + " " + oDataPartners[i].PostalCode



      };



    }







    this.byId("contacttab").setVisible(contactPeople.length > 0);







    var oModel = new sap.ui.model.json.JSONModel();



    oModel.setData(contactPeople);



    this.getView().setModel(oModel, "contactPeople");



  },







  //Gets the shared model (which is a copy of the view model) and removes the ID and sets the dates to the 



  //current date. It follows by a navigation to the edit view.



  onCopy : function() {



    var copyQuotation = this.oApplicationFacade.getApplicationModel("NewQuotation");







    var data = copyQuotation.getData();



    delete data.NoteSet;



    delete data.AttachmentSet;



    copyQuotation.setProperty("/QuotationID", null);



    copyQuotation.setProperty("/RequestedDeliveryDate", cus.sd.myquotations.util.ModelExtractor.currentDateTime());



    copyQuotation.setProperty("/ValidTo", cus.sd.myquotations.util.ModelExtractor.currentDateTime());



    copyQuotation.setProperty("/ValidFrom", cus.sd.myquotations.util.ModelExtractor.currentDateTime());







    var itemSet = copyQuotation.getProperty("/QuotationItemSet/results");



    if (itemSet) {



      for ( var i = 0; i < itemSet.length; i++) {



        if (itemSet[i].hasOwnProperty("RequestedDeliveryDate")) {



          itemSet[i].RequestedDeliveryDate = cus.sd.myquotations.util.ModelExtractor.currentDateTime();



        }



        delete itemSet[i].ReferenceStatus;



        delete itemSet[i].ReferenceStatusDescription;



        delete itemSet[i].RejectionReason;



        delete itemSet[i].RejectionReasonDescription;



        delete itemSet[i].RejectionStatus;



        delete itemSet[i].RejectionStatusDescription;



      }



    }







    this.oRouter.navTo("copy");



  },







  //Simple navigation to the edit view. No need to modify the shared model since we want to keep it



  //identical to the existing view model. 



  onEdit : function() {



    this.oRouter.navTo("edit");



  },







  onContactLaunch : function(event) {



    var oControl = event.getSource();



    var context = oControl.getBindingContext("contactPeople");



    var selectedContact = context.getProperty(context.getPath());



    // get control that triggers the BusinessCard



    var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(selectedContact);



    oEmployeeLaunch.openBy(oControl);



  },







  getQuotationId : function() {



    return this.quotID;



  },







  /**



   * Overrides NotesAndAttachmentsBaseController.getFormattedTitle



   * 



   * @returns {String} the Formatted Note Title



   */



  getFormattedTitle : function() {



    return this.oBundle.getText("SEND_QUOTATION_VALUE", [ this.getView().getModel("quotation").getProperty("/SalesDocumentTypeDesc"),



                                                     this.getView().getModel("quotation").getProperty("/QuotationID") ]);



  },



  



  onItemPress : function(oEvent){



    var sPath = oEvent.oSource.getBindingContextPath();



    var sItemID = this.getView().getModel("quotation").getProperty(sPath).ItemID;



    



    this.oApplicationFacade.setApplicationModel("rejectionReason", this.getView().getModel("rejectionReason"));



    



    this.oRouter.navTo("ItemDisplay",{itemID:sItemID},false);



   }



    



});







},



	"cus/sd/myquotations/view/S3.view.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n<core:View xmlns="sap.m"\r\n\t\t   xmlns:caui="sap.ca.ui"\r\n           xmlns:core="sap.ui.core"\r\n           xmlns:form="sap.ui.layout.form"\r\n           xmlns:layout="sap.ui.layout"\r\n\t\t  controllerName="cus.sd.myquotations.view.S3">\r\n\t<Page title="{i18n>DETAIL_TITLE}" showNavButton="{device>/isPhone}" navButtonPress="_navBack">\r\n\t\t<content>\r\n\t\t\t<ObjectHeader id="headerInfo" title="{soldTo>/Name1}"\r\n\t\t\t\t\t\tnumber="{parts:[{path:\'quotation>/NetValue\'},{path:\'quotation>/Currency\'}], formatter:\'cus.sd.myquotations.util.Formatter.PriceCurrency\'}"\r\n\t\t\t\t\t\tnumberUnit="{path:\'quotation>/Currency\', formatter:\'cus.sd.myquotations.util.Formatter.formatNetValue\'}">\r\n\t\t\t\t\r\n\t\t\t\t<attributes>\t\t\t\t\t\r\n\t\t\t\t\t<ObjectAttribute text="{path:\'quotation>/ValidTo\' ,formatter:\'cus.sd.myquotations.util.Formatter.formatExpiryDate\'}" active="false"/>\r\n\t\t\t\t\t<ObjectAttribute text="{parts:[{path:\'quotation>/SalesDocumentTypeDesc\'},{path:\'quotation>/QuotationID\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatQuotationID\'}"/>\r\n\t\t\t\t</attributes>\r\n\t\t\t\t<statuses>\r\n\t\t\t\t\t<ObjectStatus text="{parts:[{path:\'quotation>/Discount\'},{path:\'quotation>/DiscountUnit\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatDiscount\'}"/>\r\n\t\t\t\t\t<ObjectStatus text="{parts:[{path:\'quotation>/ProcessingStatusDesc\'},{path:\'quotation>/ProcessingStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatStatus\'}" \r\n\t\t\t\t\t\t\t\t  state="{parts:[{path:\'quotation>/ValidTo\'},{path:\'quotation>/ProcessingStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatExpiryState\'}"/>\r\n\t\t\t\t\t<ObjectStatus text="{parts:[{path:\'quotation>/ValidTo\'},{path:\'quotation>/ProcessingStatus\'}] ,formatter:\'cus.sd.myquotations.util.Formatter.formatExpiry\'}"\r\n\t\t\t\t\t\t\t\t  state="{parts:[{path:\'quotation>/ValidTo\'},{path:\'quotation>/ProcessingStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatExpiryState\'}"/>\r\n\t\t\t\t</statuses>\r\n\t\t\t</ObjectHeader>\r\n\r\n\t\t\t<IconTabBar selectedKey="key1"> \r\n\t\t\t\t<items> \r\n\t\t\t\t\t<IconTabFilter  key="key1" icon="sap-icon://hint" text="{i18n>ICON_INFO}"> \r\n\t\t\t\t\t\t<content> \r\n\t\t\t\t\t\t\t<form:SimpleForm>\r\n\t\t\t\t\t\t\t\t<form:content>\r\n\t\t\t\t\t\t\t\t\t<core:ExtensionPoint name="extQuotationDetailsInfoTop"/> \r\n\t\t\t\t\t\t\t\t\t<Label text="{i18n>SHIPTO}"/>\r\n\t\t\t\t\t\t\t\t\t<Text text="{shipTo>/Name1}"/>\r\n\t\t\t\t\t\t\t\t\t<Label text="{i18n>SHIPTOADDRESS}"/>\r\n\t\t\t\t\t\t\t\t\t<Text text="{parts:[{path:\'shipTo>/HouseNumber\'},{path:\'shipTo>/Street\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatHouseNumberStreet\'}"/>\r\n\t\t\t\t\t\t\t\t\t<Label text=""/>\r\n\t\t\t\t\t\t\t\t\t<Text text="{parts:[{path:\'shipTo>/PostalCode\'}, {path:\'shipTo>/City\'}, {path:\'shipTo>/Country\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatCityCountry\'}"/>\r\n\t\t\t\t\t\t\t\t\t\r\n \t\t\t\t\t\t\t\t\t<Label text="{i18n>CUSTREF}"/>\r\n\t\t\t\t\t\t\t\t\t<Text text="{quotation>/PurchaseOrder}"/>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<Label text="{i18n>REQUESTED_DELIVERY_DATE}"/>\r\n\t\t\t\t\t\t\t\t\t<Text text="{path:\'quotation>/RequestedDeliveryDate\', formatter:\'cus.sd.myquotations.util.Formatter.Date\'}"/>\r\n\t\t\t\t\t\t\t\t\t<Label text="{i18n>VALID_FROM_TO}"/>\r\n\t\t\t\t\t\t\t\t\t<Text text="{parts:[{path:\'quotation>/ValidFrom\'},{path:\'quotation>/ValidTo\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatFromToDate\'}"/>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<Label text="{i18n>CREATED_ON}"/>\r\n\t\t\t\t\t\t\t\t\t<Text text="{path:\'quotation>/CreatedOn\', formatter:\'cus.sd.myquotations.util.Formatter.Date\'}"/>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<Label text="{i18n>PAYMENT_TERMS}"/>\r\n\t\t\t\t\t\t\t\t\t<Text text="{quotation>/TermsOfPaymentDescription}"/>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<Label text=""/>\r\n\t\t\t\t\t\t\t\t\t<Text text=""/>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<Label text="{i18n>REJECTION_STATUS}"/>\r\n\t\t\t\t\t\t\t\t\t<ObjectStatus text="{path:\'quotation>/RejectionStatus\',  formatter:\'cus.sd.myquotations.util.Formatter.StatusLabel\'}"    state ="{path:\'quotation>/RejectionStatus\',  formatter:\'cus.sd.myquotations.util.Formatter.StatusRejColor\'}"  />\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<Label text="{i18n>REFSTATUS}"/> \r\n\t\t\t\t\t\t\t\t\t\t<Text text="{path:\'quotation>/ReferenceStatus\' ,  formatter:\'cus.sd.myquotations.util.Formatter.StatusRefLabel\'}"/>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<core:ExtensionPoint name="extQuotationDetailsInfoBottom"/>\r\n\t\t\t\t\t\t\t\t</form:content>\r\n\t\t\t\t\t\t   </form:SimpleForm>\r\n\t\t\t\t\t\t</content> \r\n\t\t\t\t\t</IconTabFilter> \r\n\r\n\t\t\t\t\t<IconTabFilter key="key2" icon="sap-icon://activity-items" text="{i18n>ICON_NOTES}" count="{quotation>/NoteSet/results/length}"> \r\n\t\t\t\t\t\t<content> \r\n\t\t\t\t\t\t\t<caui:Notes id="NotesUI" inset="true" textMaxLength="1000" addNote="_handleAddNote">\r\n\t\t\t\t\t\t\t\t<caui:ExpansibleFeedListItem sender="{quotation>CreatedBy}"\r\n\t\t\t\t\t\t\t\t\ttext="{quotation>Content}" timestamp="{path:\'quotation>ChangedOnDate\', formatter:\'cus.sd.myquotations.util.Formatter.Date\'}"\r\n\t\t\t\t\t\t\t\t\ticon="sap-icon://person-placeholder" info="{i18n>ICON_INFO}" maxLines="3"/>\r\n\t\t\t\t\t\t\t</caui:Notes>\r\n\t\t\t\t\t\t</content> \r\n\t\t\t\t\t</IconTabFilter>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<IconTabFilter key="key3" icon="sap-icon://attachment" text="{i18n>ICON_ATTACHMENTS}" count="{quotation>/AttachmentSet/results/length}"> \r\n\t\t\t\t\t\t<content> \r\n\t\t\t\t\t\t\t<VBox>\r\n\t\t\t\t\t\t\t\t<items>\r\n\t\t\t\t\t\t\t\t\t<caui:FileUpload\r\n\t\t\t\t\t\t\t\t\t    id="AttachmentsUI"\r\n\t\t\t\t\t\t\t\t\t    items="/Attachments"\r\n\t\t\t\t\t\t\t\t\t    fileName="name"\r\n\t\t\t\t\t\t\t\t\t    size="size"\r\n\t\t\t\t\t\t\t\t\t    url="url"\r\n\t\t\t\t\t\t\t\t\t    uploadedDate="uploadedDate"\r\n\t\t\t\t\t\t\t\t\t    contributor="contributor"\r\n\t\t\t\t\t\t\t\t\t    fileExtension="fileExtension"\r\n\t\t\t\t\t\t\t\t\t    editMode="false"\r\n\t\t\t\t\t\t\t\t\t    uploadEnabled="true"\r\n\t\t\t\t\t\t\t\t\t    useMultipart="false"\r\n\t\t\t\t\t\t\t\t\t    xsrfToken=""\r\n\t\t\t\t\t\t\t\t\t    acceptRequestHeader="application/json"\r\n\t\t\t\t\t\t\t\t\t    deleteFile="onDeleteFile"\r\n\t\t\t\t\t\t\t\t\t \r\n\t\t\t\t\t\t\t\t\t    uploadFile="onUploadFile"\r\n\t\t\t\t\t\t\t\t        fileUploadFailed="onFileUploadFailed"\r\n\t\t\t\t\t\t\t\t        beforeUploadFile="onBeforeUploadFile"\r\n\t\t\t\t\t\t\t\t      \r\n\t\t\t\t\t\t\t\t\t\tuseEditControls="true"\r\n\t\t\t\t\t\t\t\t        renameEnabled="false"\r\n\t\t\t\t\t\t\t\t        \r\n\t\t\t\t\t\t\t\t        /> \r\n\t\t\t\t\t\t\t\t        \r\n\t\t\t\t\t\t\t\t</items>\r\n\t\t\t\t\t\t\t</VBox>\r\n\t\t\t\t\t\t</content> \r\n\t\t\t\t\t</IconTabFilter>\r\n\r\n\t\t\t\t\t<IconTabFilter id="contacttab" key="key4" icon="sap-icon://collaborate" text="{i18n>ICON_CONTACTS}" count="{contactPeople>/length}">\r\n\t\t\t\t\t\t<content> \r\n\t\t\t\t\t\t\t<List id="ContactsUI" items="{contactPeople>/}">\r\n\t\t\t\t\t\t\t\t<StandardListItem type="Active" title="{contactPeople>name}"\r\n\t\t\t\t\t\t\t\t\tdescription="{contactPeople>department}" \r\n\t\t\t\t\t\t\t\t\tinfo="{contactPeople>PartnerNumber}"\r\n\t\t\t\t\t\t\t\t\ticon="sap-icon://person-placeholder" \r\n\t\t\t\t\t\t\t\t\tpress="onContactLaunch"/>\t\r\n\t\t\t\t\t\t\t</List>\r\n\t\t\t\t\t\t</content> \r\n\t\t\t\t\t</IconTabFilter>\r\n\t\t\t\t\t<core:ExtensionPoint name="extQuotationDetailsTabs"/>\r\n\t\t\t\t</items> \r\n\t\t\t</IconTabBar>\t \r\n\r\n\t\t\t<Table id="listItems" headerText="{path:\'quotation>/QuotationItemSet/results/length\', formatter:\'cus.sd.myquotations.util.Formatter.NbItems\'}">\r\n\t\t\t\t<columns>\r\n\t\t\t\t\t<Column hAlign="Left" vAlign="Middle">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Text text="{i18n>DESCRIPTION}"/>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t<Column  minScreenWidth="Tablet" demandPopin="true" hAlign="Right">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Text text="{i18n>QUANTITY}" wrapping="true"/>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t<Column minScreenWidth="Tablet" demandPopin="true" hAlign="Right">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Text text="{i18n>REQUESTED_DELIVERY_DATE}" wrapping="true"/>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t<Column minScreenWidth="Tablet" demandPopin="true" hAlign="Right">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Text text="{i18n>DISCOUNT_TITLE}" wrapping="true"/>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t<Column minScreenWidth="Tablet" demandPopin="true" hAlign="Right">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Text text="{i18n>NET_VALUE}" wrapping="true"/>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t<Column minScreenWidth="Tablet" demandPopin="true" hAlign="Right">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Text text="{i18n>PROCESSTATUS}" wrapping="true"/>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t</columns>\r\n\t\t\t\t\r\n\t\t\t\t<ColumnListItem type="Navigation" press="onItemPress">\r\n\t\t\t\t\t<cells>\r\n\t\t\t\t\t\t<ObjectIdentifier title="{quotation>MaterialNumber}" text="{quotation>ItemDescription}" />\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<Text text="{parts:[{path:\'quotation>OrderQuantity\'},{path:\'quotation>SalesUnit\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatQuantity\'}"/>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t<Text text="{path:\'quotation>RequestedDeliveryDate\', formatter:\'cus.sd.myquotations.util.Formatter.Date\'}" />\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<Text text="{parts:[{path:\'quotation>DiscountPercentage\'},{path:\'quotation>DiscountUnit\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatItemDiscount\'}"/>\r\n\t\t\t\t\t\r\n \t\t\t\t\t\t<Text text="{parts:[{path:\'quotation>NetAmount\'},{path:\'quotation>ListPriceUnit\'}], formatter:\'cus.sd.myquotations.util.Formatter.formatUnitCurrency\'}"/>\r\n \t\t\t\t\t\t\r\n \t\t\t\t\t\t<ObjectStatus text="{parts:[{path:\'quotation>RejectionReason\'},{path:\'quotation>RejectionStatus\'},{path:\'quotation>ReferenceStatus\'}], formatter:\'cus.sd.myquotations.util.Formatter.rejectionStatus\'}" />\t\t\r\n\t\t\t\t\r\n\t\t\t\t\t</cells>\r\n\t\t\t\t</ColumnListItem>\r\n\t\t\t</Table>\r\n\t\t</content>\r\n\t</Page>\r\n</core:View>'



}});



