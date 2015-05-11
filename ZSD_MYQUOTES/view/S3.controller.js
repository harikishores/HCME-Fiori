/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");jQuery.sap.require("sap.ui.core.mvc.Controller");jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");jQuery.sap.require("cus.sd.myquotations.view.NotesAndAttachmentsBaseController");cus.sd.myquotations.view.NotesAndAttachmentsBaseController.extend("cus.sd.myquotations.view.S3",{onInit:function(){cus.sd.myquotations.view.NotesAndAttachmentsBaseController.prototype.onInit.call(this);this.getView().setModel(new sap.ui.model.json.JSONModel(),"quotation");this.oBundle=this.oApplicationFacade.getResourceBundle();this.oRouter.attachRouteMatched(function(e){if(e.getParameter("name")==="detail"){this.onNavDetail(e.getParameter("arguments").contextPath)}else if(e.getParameter("name")==="display"){this.onNavDetail(e.getParameter("arguments").contextPath);this.fullScreenMode=true;this.oApplicationFacade.setApplicationModel("global",new sap.ui.model.json.JSONModel());this.oApplicationFacade.setApplicationModel("customizing",new sap.ui.model.json.JSONModel());this.oApplicationFacade.getApplicationModel("global").setProperty("/fullScreenMode",this.fullScreenMode);var s=this.getView().getModel();var a=this;s.read("CustomizingSet",undefined,undefined,false,function(d,r){var b=(d&&d.results&&d.results[0])?d.results[0]:a.getDefaultCustomizingSet();a.oApplicationFacade.getApplicationModel("customizing").setData(b)},function(d,r){cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(d,r)})}},this);this.setHeaderFooterOptions(this.createHeaderFooterOptions())},createHeaderFooterOptionsSAPJam:function(e){var t=this;var o=new sap.m.ObjectListItem({title:t.byId('headerInfo').getTitle(),attributes:[new sap.m.ObjectAttribute({text:t.byId('headerInfo').getAttributes()[1].getText()}),new sap.m.ObjectAttribute({text:t.byId('headerInfo').getAttributes()[0].getText()})],secondStatus:new sap.m.ObjectStatus({text:t.byId('headerInfo').getStatuses()[1].getText(),state:t.byId('headerInfo').getStatuses()[1].getState()})});var f=t.createHeaderFooterOptions();f.oJamOptions={fGetShareSettings:function(){return{object:{id:window.location.href,display:o,}}}};return f},createHeaderFooterOptions:function(e){var t=this;return{oEditBtn:{sId:"TRC_BTN_EDIT",sI18nBtnTxt:"EDIT",onBtnPressed:function(a){t.onEdit()},bEnabled:true},buttonList:[{sId:"TRC_BTN_COPY",sI18nBtnTxt:"COPY_QUOTE",onBtnPressed:function(a){t.onCopy()}}],oAddBookmarkSettings:{title:this.getFormattedTitle(),icon:"sap-icon://Fiori2/F0390"},onBack:this.fullScreenMode?function(){window.history.back(1)}:undefined}},onNavDetail:function(q){this.quotID=q;this.loadQuotation(q)},loadQuotation:function(q){var u=["$expand="+"AttachmentSet,"+"PartnerSet,"+"PricingConditionSet,"+"NoteSet,"+"QuotationItemSet/PricingConditionSet"];var a="QuotationHeaderSet('"+q+"')";var s=this;var b=new sap.ui.model.json.JSONModel();this.setHeaderFooterOptions(this.createHeaderFooterOptions());this.setBtnEnabled("TRC_BTN_COPY",false);this.setBtnEnabled("TRC_BTN_EDIT",false);this.setBtnEnabled("TRC_BTN_SEND_QUOT",false);this.getView().setModel(b,"quotation");this.getView().setModel(new sap.ui.model.json.JSONModel(),"soldTo");this.getView().setModel(new sap.ui.model.json.JSONModel(),"billTo");this.getView().setModel(new sap.ui.model.json.JSONModel(),"shipTo");this.getView().setModel(new sap.ui.model.json.JSONModel(),"contactPeople");this.getView().byId("NotesUI").clear();var c=this.getView().getModel();if(!c.bTokenRequested){c.mCustomHeaders['X-CSRF-Token']='Fetch'}c.read(a,null,u,true,function(d,r){if(r.headers["x-csrf-token"]){c.oHeaders["x-csrf-token"]=r.headers["x-csrf-token"];c.bTokenRequested=true}b.setData(d);s._buildPartnerModels();s._parseItemsConditions();s._parseHeadterConditions();s._parseHeadterPercentageConditions();var N=s.getView().byId("NotesUI");if(N.getItems()[0]){var t=N.getItems()[0].clone();N.bindItems({path:"/NoteSet/results",template:t,model:"quotation"})}var A=s.getView().byId("AttachmentsUI");if(d&&d.AttachmentSet&&d.AttachmentSet.results){var e=JSON.parse(JSON.stringify(d.AttachmentSet));var f={Attachments:[]};$.each(e.results,function(i,v){var o={name:v.Filename,size:v.DocumentSize,url:v.__metadata.media_src,uploadedDate:new Date(new Date(v.CreatedOnDate).getTime()+new Date().getTimezoneOffset()*60000).toISOString(),contributor:v.CreatedBy,fileExtension:v.ObjectTypeCode?v.ObjectTypeCode.toLowerCase():v.ObjectTypeCode,fileId:v.Title,mimeType:v.mimeType};f.Attachments.push(o)});A.setModel(new sap.ui.model.json.JSONModel(f))}s.updateAttachmentsOnQuotationChange(q);var l=s.getView().byId("listItems");if(l.getItems()[0]){var T=l.getItems()[0].clone();l.bindItems({path:"/QuotationItemSet/results",template:T,model:"quotation"})}s.setHeaderFooterOptions(s.createHeaderFooterOptionsSAPJam());s.setBtnEnabled("TRC_BTN_COPY",!s.fullScreenMode);s.setBtnEnabled("TRC_BTN_EDIT",true);s.setBtnEnabled("TRC_BTN_SEND_QUOT",true);s.oApplicationFacade.getApplicationModel("global").setProperty("/lastQuotationID",q);s._setSharedModel(b);s._divideItemsDisount();b.updateBindings()},function(d,r){cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(d,r)});delete c.mCustomHeaders['X-CSRF-Token']},_setSharedModel:function(m){var s=new sap.ui.model.json.JSONModel();s.setData(jQuery.extend(true,{},m.getData()));this.oApplicationFacade.setApplicationModel("NewQuotation",s)},onAfterRendering:function(){},_parseHeadterPercentageConditions:function(){cus.sd.myquotations.util.ModelExtractor.ParseHeadterDiscountPercentageConditions(this.getView().getModel("quotation"))},_parseHeadterConditions:function(){cus.sd.myquotations.util.ModelExtractor.ParseHeadterConditions(this.getView().getModel("quotation"))},_parseItemsConditions:function(){cus.sd.myquotations.util.ModelExtractor.ParseItemsConditions(this.getView().getModel("quotation"))},_divideItemsDisount:function(){cus.sd.myquotations.util.ModelExtractor.DivideItemsDiscount(this.getView().getModel("quotation"))},_buildPartnerModels:function(){var p=cus.sd.myquotations.util.ModelExtractor.BuildPartnerModels(this.getView().getModel("quotation"));this.getView().setModel(p.SoldTo,"soldTo");this.getView().setModel(p.BillTo,"billTo");this.getView().setModel(p.ShipTo,"shipTo");var d=cus.sd.myquotations.util.ModelExtractor.extractPartnersType(this.getView().getModel("quotation"),"AP");var c=[];for(var i=0;i<d.length;i++){c[c.length]={title:this.oBundle.getText("CONTACTOVERVIEW_TITLE"),name:d[i].Name1+" "+d[i].Name2,imgurl:"sap-icon://person-placeholder",department:d[i].PartnerFunctionDescription,contactmobile:d[i].CellPhoneNumber,contactphone:d[i].TelephoneNumber,contactemail:d[i].Email,contactemailsubj:this.getFormattedTitle(),companyname:p.SoldTo.oData.Name1,companyaddress:d[i].HouseNumber+" "+d[i].Street+", "+d[i].City+", "+d[i].CountryDescription+" "+d[i].PostalCode}}this.byId("contacttab").setVisible(c.length>0);var m=new sap.ui.model.json.JSONModel();m.setData(c);this.getView().setModel(m,"contactPeople")},onCopy:function(){var c=this.oApplicationFacade.getApplicationModel("NewQuotation");var d=c.getData();delete d.NoteSet;delete d.AttachmentSet;c.setProperty("/QuotationID",null);c.setProperty("/RequestedDeliveryDate",cus.sd.myquotations.util.ModelExtractor.currentDateTime());c.setProperty("/ValidTo",cus.sd.myquotations.util.ModelExtractor.currentDateTime());c.setProperty("/ValidFrom",cus.sd.myquotations.util.ModelExtractor.currentDateTime());var a=c.getProperty("/QuotationItemSet/results");if(a){for(var i=0;i<a.length;i++){if(a[i].hasOwnProperty("RequestedDeliveryDate")){a[i].RequestedDeliveryDate=cus.sd.myquotations.util.ModelExtractor.currentDateTime()}delete a[i].ReferenceStatus;delete a[i].ReferenceStatusDescription;delete a[i].RejectionReason;delete a[i].RejectionReasonDescription;delete a[i].RejectionStatus;delete a[i].RejectionStatusDescription}}this.oRouter.navTo("copy")},onEdit:function(){this.oRouter.navTo("edit")},onContactLaunch:function(e){var c=e.getSource();var a=c.getBindingContext("contactPeople");var s=a.getProperty(a.getPath());var E=new sap.ca.ui.quickoverview.EmployeeLaunch(s);E.openBy(c)},getQuotationId:function(){return this.quotID},getFormattedTitle:function(){return this.oBundle.getText("SEND_QUOTATION_VALUE",[this.getView().getModel("quotation").getProperty("/SalesDocumentTypeDesc"),this.getView().getModel("quotation").getProperty("/QuotationID")])},onItemPress:function(e){var p=e.oSource.getBindingContextPath();var i=this.getView().getModel("quotation").getProperty(p).ItemID;this.oApplicationFacade.setApplicationModel("rejectionReason",this.getView().getModel("rejectionReason"));this.oRouter.navTo("ItemDisplay",{itemID:i},false)}});



