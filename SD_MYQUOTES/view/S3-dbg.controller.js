/*
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
