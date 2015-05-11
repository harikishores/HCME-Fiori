/*



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



