/*



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