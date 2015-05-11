/*

 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved

 */

jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");

jQuery.sap.require("sap.ui.core.delegate.ScrollEnablement");

sap.ca.scfld.md.controller.BaseDetailController.extend("cus.sd.myquotations.view.NotesAndAttachmentsBaseController", {

	_LORDODATA_BASE_URL: "/sap/opu/odata/sap/zlord_my_quotation_srv",

	_ATTACHMENT_URL: "/AttachmentSet",

	_ATTACHMENTS_UI_ID: "AttachmentsUI",

	_NOTES_UI_ID: "NotesUI",

	onInit: function() {

		sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);

		var f = this.getView().byId(this._ATTACHMENTS_UI_ID);

		var u = this.getView().getModel().sUrlParams;

		f.setEncodeUrl("/sap/bc/ui2/encode_file" + (u ? '?' + u : ''));

		sap.ui.core.delegate.ScrollEnablement._bScrollToInput = true

	},

	_handleAddNote: function(e) {

		var d = {};

		d.Content = e.getParameters().value;

		d.QuotationID = this.getQuotationId();

		d.Title = this.getFormattedTitle();

		var s = this;

		var m = this.getView().getModel();

		m.create("QuotationHeaderSet('" + d.QuotationID + "')/NoteSet/", d, null, function(D, r) {

			var a = s.oBundle.getText("NOTE_CREATED");

			sap.m.MessageToast.show(a);

			s.loadQuotation(d.QuotationID)

		}, function(E) {

			cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(E);

			sap.m.MessageToast.show(s.oBundle.getText("NOTE_CREATION_FAILD"))

		})

	},

	updateAttachmentsOnQuotationChange: function(q) {

		var u = this._LORDODATA_BASE_URL + "/QuotationHeaderSet('" + this.getQuotationId() + "')" + this._ATTACHMENT_URL;

		this.getView().byId(this._ATTACHMENTS_UI_ID).setUploadUrl(u)

	},

	onBeforeUploadFile: function(e) {

		var f = this.getView().byId(this._ATTACHMENTS_UI_ID);

		var s = "SalesOrderID='" + this.getQuotationId() + "', Title='" + this.getQuotationId() + "', Filename='" + e.mParameters.name + "'";

		f.setCustomHeader("slug", s);

		f.setXsrfToken(this.getView().getModel().oHeaders["x-csrf-token"])

	},

	onUploadFile: function(e) {

		var d;

		if (e.getParameters() && e.getParameters().d) {

			d = e.getParameters().d

		} else {

			d = e.getParameters()

		}

		var f = this.buildFileDescriptorObject(d);

		this.byId(this._ATTACHMENTS_UI_ID).commitFileUpload(f);

		this.loadQuotation(this.getQuotationId())

	},

	buildFileDescriptorObject: function(v) {

		var d = parseInt(v.CreatedOnDate.substr(6), 10);

		return {

			name: v.Filename,

			size: v.DocumentSize,

			url: v.__metadata.media_src,

			uploadedDate: new Date(d + new Date().getTimezoneOffset() * 60000).toISOString(),

			contributor: v.CreatedBy,

			fileExtension: v.ObjectTypeCode ? v.ObjectTypeCode.toLowerCase() : v.ObjectTypeCode,

			fileId: v.Title,

			mimeType: v.mimeType

		}

	},

	onFileUploadFailed: function(e) {

		var a = "";

		if (e && e.getParameters()) {

			var p = e.getParameters();

			if (p.exception && p.exception.message) {

				a = e.getParameters().exception.message

			}

			if (p.response && p.response.jqXHR) {

				var j = p.response.jqXHR;

				a += "\n " + j.statusText + " : " + j.responseText

			}

			if (p.response && p.response.messages) {

				var b = null;

				for (b in p.response.messages) {

					if (p.response.messages.hasOwnProperty(b)) {

						a += "\n " + b + " : " + p.response.messages[b]

					}

				}

			}

		}

		sap.ca.ui.message.showMessageBox({

			type: sap.ca.ui.message.Type.ERROR,

			message: a,

			details: a

		})

	},

	onDeleteFile: function(e) {

		var p = e.mParameters.url.substr(e.mParameters.url.indexOf(this._ATTACHMENT_URL), e.mParameters.url.length);

		p = p.substr(0, p.length - 7);

		var s = this;

		var S = function(d, r) {

			s.updateAttachmentsOnQuotationChange(s.getQuotationId())

		};

		var P = {

			fnSuccess: S,

			fnFailure: this.onAttachmentDeletionFailure

		};

		this.getView().getModel().remove(p, P);

		this.loadQuotation(this.getQuotationId())

	},

	onRenameFile: function(e) {},

	onAttachmentDeletionFailure: function(e) {}

});