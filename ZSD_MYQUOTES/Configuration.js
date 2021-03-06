/*

 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved

 */

jQuery.sap.declare("cus.sd.myquotations.Configuration");

jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");

jQuery.sap.require("sap.ca.scfld.md.app.Application");

sap.ca.scfld.md.ConfigurationBase.extend("cus.sd.myquotations.Configuration", {

	oServiceParams: {

		serviceList: [{

			name: "zlord_my_quotation_srv",

			masterCollection: "QuotationSet",

			serviceUrl: "/sap/opu/odata/sap/zlord_my_quotation_srv/",

			isDefault: true,

			mockedDataSource: "model/metadata.xml",

			fRequestFailed: function(e) {

				var a = "";

				var b = $.parseJSON(e.getParameter("responseText"));

				if (b && b.error && b.error.message && b.error.message.value) {

					a = b.error.message.value

				}

				var s = {

					type: sap.ca.ui.message.Type.ERROR,

					message: a,

				};

				sap.ca.ui.message.showMessageBox(s)

			}

		}, {

			name: "zlord_my_quotation_srv",

			masterCollection: "QuotationSet",

			serviceUrl: "/sap/opu/odata/sap/zlord_my_quotation_srv/",

			isDefault: false,

			mockedDataSource: "model/metadata.xml",

			fRequestFailed: function(e) {

				var a = "";

				var b = $.parseJSON(e.getParameter("responseText"));

				if (b && b.error && b.error.message && b.error.message.value) {

					a = b.error.message.value

				}

				var s = {

					type: sap.ca.ui.message.Type.ERROR,

					message: a,

				};

				sap.ca.ui.message.showMessageBox(s)

			}

		}]

	},

	getServiceParams: function() {

		return this.oServiceParams

	},

	getServiceList: function() {

		return this.getServiceParams().serviceList

	},

	getMasterKeyAttributes: function() {

		return ["QuotationID", "MaterialId"]

	},

	setApplicationFacade: function(a) {

		cus.sd.myquotations.util.ModelExtractor.setApplicationFacade(a);

		cus.sd.myquotations.util.Formatter.setApplicationFacade(a)

	}

});