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

	itemUoMMap: {},

	isNavToMaster: false,

	isNavCart: false,

	formChangedPostalCodeField: function(e) {

		var m = this.resourceBundle.getText("ENTER_POSTALCODE");

		var p = {

			isDate: false,

			evt: e,

			msg: m,

			emptyCheck: true

		};

		cus.sd.myquotations.util.ModelExtractor.validationEmptyField(p)

	},

	formChangedCityField: function(e) {

		var m = this.resourceBundle.getText("ENTER_CITY");

		var p = {

			isDate: false,

			evt: e,

			msg: m,

			emptyCheck: true

		};

		cus.sd.myquotations.util.ModelExtractor.validationEmptyField(p)

	},

	formChangedValidDate: function(e) {

		var p = {

			isDate: true,

			evt: e,

			msg: null,

			emptyCheck: false

		};

		cus.sd.myquotations.util.ModelExtractor.validationEmptyField(p)

	},

	formChangedValidDateRequired: function(e) {

		var p = {

			isDate: true,

			evt: e,

			msg: null,

			emptyCheck: true

		};

		cus.sd.myquotations.util.ModelExtractor.validationEmptyField(p)

	},

	formChangedInputQuantity: function(e) {

		var m = this.resourceBundle.getText("ENTER_VALID_QUANTITY");

		cus.sd.myquotations.util.ModelExtractor.validationInputQuantity(e, m)

	},

	formChangedInputDiscount: function(e) {

		var m = this.resourceBundle.getText("ENTER_VALID_DISCOUNT");

		cus.sd.myquotations.util.ModelExtractor.validationInputNumber(e, m, false)

	},

	_dialogsOnNavigation: function(v) {

		var o = sap.ui.core.Component.getOwnerIdFor(this.getView());

		var c = sap.ui.component(o);

		if (c) {

			c.setRouterSetCloseDialogs(v)

		}

	},

	onInit: function() {

		sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);

		var t = this;

		this.resourceBundle = this.oApplicationFacade.getResourceBundle();

		this.getView().addEventDelegate({

			onBeforeShow: jQuery.proxy(function(e) {

				if (t.isNavCart) {

					t.isNavCart = false;

					t.onNavCart()

				}

			}, this)

		});

		this._dialogsOnNavigation(false);

		this.fullScreenMode = this.oApplicationFacade.getApplicationModel("global").getProperty("/fullScreenMode");

		this.copyMode = false;

		this.oRouter.attachRouteMatched(function(e) {

			var m = t.oApplicationFacade.getApplicationModel("NewQuotation");

			if (e.getParameter("name") === "copy") {

				this.copyMode = true;

				if (m && !jQuery.isEmptyObject(m.oData)) {

					if (m.getProperty("/PreviousPageLocation") !== "itemDetails") {

						m = this._convertLocalizedDate(m, true)

					}

					m.setProperty("/PreviousPageLocation", "copy");

					this.getView().setModel(m, "myQuotationModel");

					this.onNavCopy()

				} else {

					this.isNavToMaster = true

				}

			} else if (e.getParameter("name") === "edit") {

				if (m && !jQuery.isEmptyObject(m.oData)) {

					if (m.getProperty("/PreviousPageLocation") !== "itemDetails") {

						m = this._convertLocalizedDate(m, true)

					}

					this.getView().setModel(m, "myQuotationModel");

					this.onNavEdit()

				} else {

					this.isNavToMaster = true

				}

			} else if (e.getParameter("name") === "cart") {

				if (m && !jQuery.isEmptyObject(m.oData)) {

					this.getView().setModel(m, "myQuotationModel");

					this.isNavCart = true

				} else {

					this.isNavToMaster = true

				}

			}

		}, this);

		this.buildSelectCountryDialog();

		this.getRejectionReasonModel();

		sap.ui.core.delegate.ScrollEnablement._bScrollToInput = true

	},

	_convertLocalizedDate: function(m, r) {

		var v = m.getProperty("/ValidFrom");

		if (v) {

			m.setProperty("/ValidFrom", this._toUTCType(v, r))

		}

		var a = m.getProperty("/ValidTo");

		if (a) {

			m.setProperty("/ValidTo", this._toUTCType(a, r))

		}

		var b = m.getProperty("/RequestedDeliveryDate");

		if (b) {

			m.setProperty("/RequestedDeliveryDate", this._toUTCType(b, r))

		}

		var d = m.getProperty("/QuotationItemSet/results");

		if (d) {

			for (var i = 0; i < d.length; i++) {

				var c = d[i].RequestedDeliveryDate;

				if (c) {

					d[i].RequestedDeliveryDate = this._toUTCType(d[i].RequestedDeliveryDate, r)

				}

			}

		}

		return m

	},

	_toUTCType: function(m, r) {

		if (r) {

			return new Date(m.getUTCFullYear(), m.getUTCMonth(), m.getUTCDate())

		} else {

			return new Date(Date.UTC(m.getFullYear(), m.getMonth(), m.getDate()))

		}

	},

	onAfterRendering: function(e) {

		if (this.isNavToMaster) {

			this.isNavToMaster = false;

			this.oRouter.navTo("master", undefined, true)

		}

	},

	onNavCopy: function() {

		this._clearControlsErrorState();

		cus.sd.myquotations.util.ModelExtractor.removeQuotationIDZeroCounterDeep(this.getView().getModel("myQuotationModel").getData());

		this._buildPartnerModels();

		this.onRefresh()

	},

	onNavCart: function() {

		this._buildPartnerModels();

		this.onRefresh()

	},

	_isCountryValid: function(c) {

		var a = this.getView().byId("countryInput");

		if (c === "") {

			this.getView().getModel("shipTo").setProperty("/CountryCode", "");

			var e = this.resourceBundle.getText("ENTER_COUNTRY");

			a.setValueStateText(e);

			a.setValueState(sap.ui.core.ValueState.Error);

			return false

		}

		var b = this.getCountryModel().getData().results;

		var d = null;

		var v = true;

		if (b) {

			for (var i = 0; i < b.length; i++) {

				if (b[i].CountryName.toLowerCase() === c.toLowerCase() || b[i].CountryKey.toLowerCase() === c.toLowerCase()) {

					d = b[i];

					break

				}

			}

		}

		if (d) {

			this.getView().getModel("shipTo").setProperty("/CountryCode", d.CountryKey);

			a.setValue(d.CountryName);

			a.setValueStateText("");

			a.setShowValueStateMessage(false)

		} else {

			var m = this.resourceBundle.getText("ENTER_VALID_COUNTRY");

			a.setValueStateText(m);

			v = false

		}

		a.setValueState(v ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error);

		a.setShowValueStateMessage(!v);

		return v

	},

	_checkItemsForErrors: function() {

		var I = false;

		var t = this;

		if (this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet")) {

			var l = this.getView().byId("CQID").getItems();

			if (l.length > 0) {

				for (var i = 0; i < l.length; i++) {

					var v = l[i].mAggregations.cells[1].mAggregations.content[0].mAggregations.items[0];

					if (isNaN(sap.ca.ui.model.format.NumberFormat.getInstance().parse(v.getValue())) || sap.ca.ui.model.format.NumberFormat.getInstance()

						.parse(v.getValue()) <= 0) {

						var o = t.getView().byId(v.getId()) || sap.ui.getCore().byId(v.getId());

						if (o) {

							o.setValueState(sap.ui.core.ValueState.Error);

							var m = this.resourceBundle.getText("ENTER_VALID_QUANTITY");

							o.setValueStateText(m)

						}

						I = true

					}

					if (l[i].mAggregations.cells[2].getProperty("valueState") === "Error") {

						I = true

					}

					if (l[i].mAggregations.cells[3].mAggregations.content[0].mAggregations.items[0].getProperty("valueState") === "Error") {

						I = true

					}

				}

			}

		}

		return I

	},

	_checkFormErrors: function() {

		var f = false;

		f = this._checkItemsForErrors();

		if (this.getView().getModel("shipTo") && !this.getView().getModel("shipTo").getProperty("/PostalCode")) {

			var p = this.getView().byId("IDPOSTALCODE");

			p.setValueState(sap.ui.core.ValueState.Error);

			p.setValueStateText(this.resourceBundle.getText("ENTER_POSTALCODE"));

			f = true

		}

		if (this.getView().getModel("shipTo") && !this.getView().getModel("shipTo").getProperty("/City")) {

			var c = this.getView().byId("IDCITY");

			c.setValueState(sap.ui.core.ValueState.Error);

			c.setValueStateText(this.resourceBundle.getText("ENTER_CITY"));

			f = true

		}

		if (this.getView().getModel("shipTo") && !this._isCountryValid(this.getView().getModel("shipTo").getProperty("/CountryDescription"))) {

			f = true

		}

		if (this.getView().getModel("myQuotationModel")) {

			var v = this.getView().byId("IDVALIDTO");

			if (!this.getView().getModel("myQuotationModel").getProperty("/ValidTo") || v.getProperty("valueState") === "Error") {

				v.setValueState(sap.ui.core.ValueState.Error);

				f = true

			}

		}

		if (this.getView().getModel("myQuotationModel")) {

			var a = this.getView().byId("IDVALIDFROM");

			if (a) {

				if (a.getProperty("valueState") === "Error") {

					a.setValueState(sap.ui.core.ValueState.Error);

					f = true

				}

			}

		}

		if (this.getView().getModel("myQuotationModel")) {

			var b = this.getView().byId("IDREQUESTDELD");

			if (!this.getView().getModel("myQuotationModel").getProperty("/RequestedDeliveryDate") || b.getProperty("valueState") === "Error") {

				b.setValueState(sap.ui.core.ValueState.Error);

				f = true

			}

		}

		if (this.getView().getModel("myQuotationModel")) {

			var o = this.getView().byId("IDODISCOUNT");

			var d = this.getView().getModel("myQuotationModel").getProperty("/DiscountPercentage");

			if (d < 0 || o.getProperty("valueState") === "Error") {

				o.setValueState(sap.ui.core.ValueState.Error);

				f = true

			}

		}

		if (f) {

			sap.m.MessageBox.show(this.resourceBundle.getText("CHECKERRORS"), sap.m.MessageBox.Icon.WARNING, this.resourceBundle.getText(

				"MANDATORYTITLE"), [sap.m.MessageBox.Action.OK]);

			return f

		}

	},

	_clearControlsErrorState: function() {

		var t = this;

		if (this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet")) {

			var l = this.getView().byId("CQID").getItems();

			if (l.length > 0) {

				for (var i = 0; i < l.length; i++) {

					var a = l[i].mAggregations.cells[1].mAggregations.content[0].mAggregations.items[0].getId();

					var o = t.getView().byId(a) || sap.ui.getCore().byId(a);

					if (o) {

						o.setValueState(sap.ui.core.ValueState.None)

					}

					if (l[i].mAggregations.cells[2].getProperty("valueState") === "Error") {

						l[i].mAggregations.cells[2].setValueState(sap.ui.core.ValueState.None)

					}

					if (l[i].mAggregations.cells[3].mAggregations.content[0].mAggregations.items[0].getProperty("valueState") === "Error") {

						l[i].mAggregations.cells[3].mAggregations.content[0].mAggregations.items[0].setValueState(sap.ui.core.ValueState.None)

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

		this.getView().byId("IDODISCOUNT").setValueState(sap.ui.core.ValueState.None)

	},

	_formatFloatValue: function(v) {

		var i = sap.ca.ui.model.format.NumberFormat.getInstance({

			decimals: 2

		}).format(v);

		return sap.ca.ui.model.format.NumberFormat.getInstance().parse(i)

	},

	dialogShowMore: function(l, q, t) {

		var a = this;

		var c = function() {

			if (a.fullScreenMode) {

				if (a.copyMode) a.oRouter.navTo("display", {

					contextPath: q

				}, true);

				else window.history.back(1)

			} else if (jQuery.device.is.phone) {

				a.oRouter.navTo("master")

			} else {

				a.oRouter.navTo("detail", {

					contextPath: q

				}, true)

			}

		};

		sap.ca.ui.message.showMessageBox({

			type: sap.ca.ui.message.Type.SUCCESS,

			message: this.resourceBundle.getText(t, q),

			details: this.buildWarningString(l)

		}, c)

	},

	buildWarningString: function(l) {

		var w = new String();

		for (var i = 0; l.length > i; i++) {

			if (l[i].Type === "W") {

				if (w.length > 0) {

					w = w.concat(".\n " + l[i].Text)

				} else {

					w = l[i].Text

				}

			}

		}

		return w

	},

	dialogWithNavigation: function(m, q, t) {

		var a = this;

		sap.m.MessageBox.show(this.resourceBundle.getText(m, q), sap.m.MessageBox.Icon.SUCCESS, this.resourceBundle.getText(t), [sap.m.MessageBox

			.Action.OK], function(A) {

			if (A === sap.m.MessageBox.Action.OK) {

				if (a.fullScreenMode) {

					if (a.copyMode) a.oRouter.navTo("display", {

						contextPath: q

					}, true);

					else window.history.back(1)

				} else if (jQuery.device.is.phone) {

					a.oRouter.navTo("master")

				} else {

					a.oRouter.navTo("detail", {

						contextPath: q

					}, false)

				}

			}

		})

	},

	onRefresh: function() {

		if (this._checkFormErrors()) {

			return

		}

		var q = this.getView().getModel("myQuotationModel").getProperty("/QuotationID");

		if (!q) {

			cus.sd.myquotations.util.ModelExtractor.removeQuotationIDZeroCounterDeep(this.getView().getModel("myQuotationModel").getData())

		}

		this._callService("S");

		this.getView().getModel("myQuotationModel").updateBindings()

	},

	onSave: function() {

		if (this._checkFormErrors()) {

			return

		}

		if (this.getView().getModel("myQuotationModel").getProperty("/QuotationID")) {

			this._callService("U")

		} else {

			cus.sd.myquotations.util.ModelExtractor.removeQuotationIDZeroCounterDeep(this.getView().getModel("myQuotationModel").getData());

			this._callService("C")

		}

		this.getView().getModel("myQuotationModel").updateBindings()

	},

	_callService: function(a) {

		var t = this;

		this._parseHeaderPricingConditionsBack();

		this._parseItemsPricingConditionsBack();

		this._parseShipToBack();

		this._removePropertiesForService();

		this._removeMaterialUoMSetFromItems();

		this._removeEmptyQuotationSet();

		delete this.getView().getModel("myQuotationModel").oData.PreviousPageLocation;

		cus.sd.myquotations.util.ModelExtractor.removeMetadataDeep(this.getView().getModel("myQuotationModel").getData());

		var m = "";

		m = [{

			Type: "E",

			Text: "text"

		}];

		var n = new sap.ui.model.json.JSONModel();

		n.setProperty("/MessageSet", m);

		n.setProperty("/__metadata", {

			"type": "zlord_my_quotation_srv.Action"

		});

		n.setProperty("/ActionName", a);

		var v = this.getView().getModel("myQuotationModel");

		t._convertLocalizedDate(v, false);

		n.setProperty("/QuotationHeaderSet", v.getData());

		var c = jQuery.extend(true, {}, n.getData());

		cus.sd.myquotations.util.ModelExtractor.removeQuotationHeaderSetFields(c);

		cus.sd.myquotations.util.ModelExtractor.removePartnerSetFields(c);

		cus.sd.myquotations.util.ModelExtractor.removeQuotationItemSetFields(c);

		cus.sd.myquotations.util.ModelExtractor.removePricingConditionSetFields(c);

		cus.sd.myquotations.util.ModelExtractor.fixQuotationItemSetFields(c);

		cus.sd.myquotations.util.ModelExtractor.substituteResultsToArrayDeep(c);

		cus.sd.myquotations.util.ModelExtractor.emptyStringToSpaceDeep(c);

		var d = this.getView().getModel();

		var s = this.getView().getModel("zlord_my_quotation_srv");

		if (!s.bTokenRequested) {

			s.oHeaders["x-csrf-token"] = d.oHeaders["x-csrf-token"];

			s.bTokenRequested = d.bTokenRequested

		}

		var u = s._createRequest("ActionSet").requestUri;

		u = u.substring(u.indexOf("ActionSet"));

		s.create(u, c, null, function(b, r) {

			if (r.data.QuotationHeaderSet) v.setData(r.data.QuotationHeaderSet);

			t._convertLocalizedDate(v, true);

			var e = "";

			switch (r.data.ActionName) {

				case "U":

					if (r.data.ReturnedMessageType === "W") {

						t.dialogShowMore(r.data.MessageSet.results, r.data.QuotationHeaderSet.QuotationID, "QUOTATION_UPDATED_WARN_MSG")

					} else {

						t.dialogWithNavigation("QUOTATION_UPDATED_MSG_WITH_ID", r.data.QuotationHeaderSet.QuotationID, "SUCCESSTITLE")

					}

					break;

				case "C":

					if (r.data.ReturnedMessageType === "W") {

						t.dialogShowMore(r.data.MessageSet.results, r.data.QuotationHeaderSet.QuotationID, "QUOTATION_CREATED_WARN_MSG")

					} else {

						t.dialogWithNavigation("QUOTATION_CREATED_MSG_WITH_ID", r.data.QuotationHeaderSet.QuotationID, "SUCCESSTITLE")

					}

					break

			}

			if (e) {

				var m = t.resourceBundle.getText(e);

				sap.m.MessageToast.show(m)

			}

		}, function(e) {

			cus.sd.myquotations.util.ModelExtractor.DivideItemsDiscountbyTen(t.getView().getModel("myQuotationModel"));

			cus.sd.myquotations.util.ModelExtractor.DivideHeaderDiscountbyTen(t.getView().getModel("myQuotationModel"));

			if (e.request.data.ActionName === "S") {

				cus.sd.myquotations.util.ModelExtractor.dialogErrorMessageSimulate(null, null, e.response.body)

			} else {

				cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(null, null, e.response.body)

			}

		});

		this._buildPartnerModels();

		cus.sd.myquotations.util.ModelExtractor.ParseHeadterDiscountPercentageConditions(this.getView().getModel("myQuotationModel"));

		cus.sd.myquotations.util.ModelExtractor.ParseItemsConditions(this.getView().getModel("myQuotationModel"));

		this._addMaterialUoMSetToItems();

		if (a === "S") {

			t._checkFormErrors()

		}

	},

	_removeEmptyQuotationSet: function() {

		var d = this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet/results");

		if (d && !d.length) {

			delete this.getView().getModel("myQuotationModel").oData.QuotationItemSet

		}

	},

	_removeMaterialUoMSetFromItems: function() {

		var d = this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet/results");

		if (d) {

			for (var i = 0; i < d.length; i++) {

				if (!this.itemUoMMap.hasOwnProperty(d[i].MaterialNumber)) {

					this.itemUoMMap[d[i].MaterialNumber] = d[i].MaterialUoMSet

				}

				delete d[i].MaterialUoMSet

			}

		}

	},

	_addMaterialUoMSetToItems: function() {

		var d = this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet/results");

		if (d) {

			for (var i = 0; i < d.length; i++) {

				d[i].MaterialUoMSet = this.itemUoMMap[d[i].MaterialNumber]

			}

		}

	},

	_parseHeaderPricingConditionsBack: function() {

		var h = this.getView().getModel("myQuotationModel").getProperty("/PricingConditionSet/results");

		var a = false;

		var b = this.oApplicationFacade.getApplicationModel("customizing").getProperty("/HEAD_DISCOUNT");

		if (h) {

			for (var i = 0; i < h.length; i++) {

				if (h[i].CondTypeCode === b && (h[i].Counter === "000" || h[i].Counter === "001")) {

					a = true;

					if (this.getView().getModel("myQuotationModel").getProperty("/DiscountPercentage") || this.getView().getModel("myQuotationModel").getProperty(

						"/DiscountPercentage") === 0) {

						var v = (-1 * Math.abs(parseFloat(this.getView().getModel("myQuotationModel").getProperty("/DiscountPercentage")))) * 10;

						h[i].AmountInternal = this._formatFloatValue(v).toString()

					}

				}

			}

		}

		if (!a && Math.abs((this.getView().getModel("myQuotationModel").getProperty("/DiscountPercentage"))) > 0) {

			var c = (-1 * Math.abs(parseFloat(this.getView().getModel("myQuotationModel").getProperty("/DiscountPercentage")))) * 10;

			var d = {

				ItemID: "000000",

				CondTypeCode: b,

				Counter: "000",

				AmountInternal: this._formatFloatValue(c).toString()

			};

			if (h) {

				h[h.length] = d

			} else {

				var e = [];

				e[0] = d;

				h = {

					results: e

				};

				this.getView().getModel("myQuotationModel").setProperty("/PricingConditionSet", h)

			}

		}

		delete this.getView().getModel("myQuotationModel").oData.Discount;

		delete this.getView().getModel("myQuotationModel").oData.DiscountUnit;

		delete this.getView().getModel("myQuotationModel").oData.DiscountPercentage;

		delete this.getView().getModel("myQuotationModel").oData.DiscountUnitPercentage

	},

	_parseItemsPricingConditionsBack: function() {

		var a = this.oApplicationFacade.getApplicationModel("customizing").getProperty("/ITEM_DISCOUNT");

		var d = this.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet/results");

		if (d) {

			for (var i = 0; i < d.length; i++) {

				var h = false;

				if (d[i].PricingConditionSet) {

					var p = d[i].PricingConditionSet.results;

					for (var j = 0; j < p.length; j++) {

						if (p[j].CondTypeCode === a && (p[j].Counter === "001" || p[j].Counter === "000")) {

							h = true;

							if (d[i].Discount || d[i].Discount === 0) {

								var v = (-1 * Math.abs(parseFloat(d[i].Discount))) * 10;

								p[j].AmountInternal = this._formatFloatValue(v).toString()

							}

						}

					}

					if (!h) {

						if (Math.abs((d[i].Discount)) > 0) {

							var b = (-1 * Math.abs(parseFloat(d[i].Discount))) * 10;

							var c = {

								ItemID: d[i].ItemID,

								CondTypeCode: a,

								Counter: "000",

								AmountInternal: this._formatFloatValue(b).toString()

							};

							p[p.length] = c

						}

					}

					delete d[i].ListPrice;

					delete d[i].ListPriceUnit;

					delete d[i].Discount;

					delete d[i].DiscountUnit;

					delete d[i].Currency

				}

			}

		}

	},

	_parseShipToBack: function() {

		var d = this.getView().getModel("myQuotationModel").getProperty("/PartnerSet/results");

		if (d && this.getView().getModel("shipTo")) {

			for (var i = 0; i < d.length; i++) {

				if (d[i].PartnerFunction === "WE") {

					d[i].City = this.getView().getModel("shipTo").getProperty("/City");

					d[i].PostalCode = this.getView().getModel("shipTo").getProperty("/PostalCode");

					d[i].Street = this.getView().getModel("shipTo").getProperty("/Street");

					d[i].HouseNumber = this.getView().getModel("shipTo").getProperty("/HouseNumber");

					d[i].CountryCode = this.getView().getModel("shipTo").getProperty("/CountryCode")

				}

			}

		}

	},

	onNavEdit: function() {

		this._clearControlsErrorState();

		this.itemUoMMap = {};

		this._buildPartnerModels();

		cus.sd.myquotations.util.ModelExtractor.ParseHeadterDiscountPercentageConditions(this.getView().getModel("myQuotationModel"));

		this.onRefresh()

	},

	_buildPartnerModels: function() {

		var p = cus.sd.myquotations.util.ModelExtractor.BuildPartnerModels(this.getView().getModel("myQuotationModel"));

		if (p.SoldTo.oData.PartnerNumber) {

			this.getView().setModel(p.SoldTo, "soldTo")

		} else if (this.getView().hasModel("soldTo")) {

			delete this.getView().oModels.soldTo

		}

		if (p.ShipTo.oData.PartnerNumber) {

			this.getView().setModel(p.ShipTo, "shipTo")

		} else if (this.getView().hasModel("shipTo")) {

			delete this.getView().oModels.shipTo

		}

	},

	onDelete: function(e) {

		var i = e.getParameter("listItem");

		var I = this.getView().getModel("myQuotationModel").getProperty("ItemDescription", i.getBindingContext("myQuotationModel"));

		var a = this.getView().getModel("myQuotationModel").getProperty("MaterialNumber", i.getBindingContext("myQuotationModel"));

		var m = this.resourceBundle.getText("ITEMSREMOVED", [a, I]);

		sap.m.MessageToast.show(m);

		var p = i.getBindingContext("myQuotationModel").getPath().split("/");

		var l = this.getView().getModel("myQuotationModel").getData();

		l.QuotationItemSet.results.splice(p[3], 1);

		this.getView().getModel("myQuotationModel").setData(l);

		this.getView().getModel("myQuotationModel").setProperty("/nbItems", this._countNbItems())

	},

	_removePropertiesForService: function() {

		delete this.getView().getModel("myQuotationModel").oData.nbItems;

		delete this.getView().getModel("myQuotationModel").oData.editMode;

		delete this.getView().getModel("myQuotationModel").oData.AttachmentSet;

		delete this.getView().getModel("myQuotationModel").oData.NoteSet;

		delete this.getView().getModel("myQuotationModel").oData.SalesDocumentTypeCode

	},

	onAdd: function() {

		if (this._checkFormErrors()) {

			return

		}

		if (this.fullScreenMode) this.oRouter.navTo("products", null, true);

		else this.oRouter.navTo("products")

	},

	onRejectAll: function() {

		var t = this;

		var s = new sap.m.List({

			mode: "SingleSelectMaster",

		});

		var I = new sap.m.StandardListItem({

			title: "{Value}"

		});

		var d = new sap.ui.core.CustomData({

			key: "Key"

		});

		d.bindProperty("value", "Key");

		I.addCustomData(d);

		s.setModel(this.getView().getModel("rejectionReason"));

		s.bindAggregation("items", {

			path: "/results",

			template: I,

		});

		if (s.getItems().length > 0) {

			s.setSelectedItem(s.getItems()[0])

		}

		var a = new sap.m.Dialog({

			title: this.resourceBundle.getText("REJECTTITLE"),

			icon: "sap-icon://warning2",

			content: s,

			contentHeight: "400em",

			leftButton: new sap.m.Button({

				text: this.resourceBundle.getText("OK"),

				press: function() {

					var D = t.getView().getModel("myQuotationModel").getProperty("/QuotationItemSet/results");

					if (D) {

						for (var i = 0; i < D.length; i++) {

							D[i].RejectionReason = s.getSelectedItem().data("Key")

						}

					}

					a.close();

					t.onRefresh();

					t.getView().getModel("myQuotationModel").updateBindings()

				}

			}),

			rightButton: new sap.m.Button({

				text: this.resourceBundle.getText("CANCEL"),

				press: function() {

					a.close()

				}

			})

		}).addStyleClass("sapUiPopupWithPadding");

		a.open()

	},

	onCancel: function() {

		var t = this;

		sap.m.MessageBox.show(this.resourceBundle.getText("LOOSEALLCHANGES"), sap.m.MessageBox.Icon.WARNING, this.resourceBundle.getText(

			"WARNING"), [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL], function(a) {

			if (a === sap.m.MessageBox.Action.OK) {

				t._clearControlsErrorState();

				t.navCancel()

			}

		})

	},

	navCancel: function() {

		var l = this.oApplicationFacade.getApplicationModel("global").getProperty("/lastQuotationID");

		if (l === undefined || jQuery.device.is.phone) {

			this.oRouter.navTo("master")

		} else {

			if (this.fullScreenMode) window.history.back(1);

			else this.oRouter.navTo("detail", {

				contextPath: l

			}, false)

		}

	},

	_countNbItems: function() {

		var s = this.getView().getModel("myQuotationModel");

		var d = s.getProperty("/QuotationItemSet/results");

		if (d) {

			return d.length

		}

		return 0

	},

	buildSelectCountryDialog: function() {

		var t = this;

		var d = function(e) {

			var f = [];

			var v = e.getParameter("value");

			if (v !== undefined) {

				var a = e.getParameter("itemsBinding");

				var b = new sap.ui.model.Filter("CountryName", sap.ui.model.FilterOperator.Contains, v);

				f.push(b);

				a.filter(f)

			}

		};

		this.oSelectCountryDialog = new sap.m.SelectDialog({

			title: t.resourceBundle.getText("COUNTRYLIST_TITLE"),

			noDataText: t.resourceBundle.getText("NODATA"),

			liveChange: d,

			search: d,

		});

		this.oSelectCountryDialog.setModel(this.getCountryModel());

		var s = this;

		this.oSelectCountryDialog.attachConfirm(function(e) {

			var a = e.getParameter("selectedItem");

			if (a) {

				s.getView().getModel("shipTo").setProperty("/CountryCode", a.getDescription());

				s.getView().byId("countryInput").setValue(a.getTitle());

				s.getView().byId("countryInput").setValueState(sap.ui.core.ValueState.None);

				s.getView().byId("countryInput").setValueStateText("");

				s.getView().byId("countryInput").setShowValueStateMessage(false)

			}

		});

		this.oSelectCountryDialog.attachCancel(function(e) {

			e.getSource().getBinding("items").filter([]);

			this.buildSelectCountryDialog().destroy()

		});

		var i = new sap.m.StandardListItem({

			title: "{CountryName}",

			description: "{CountryKey}",

			active: true

		});

		this.oSelectCountryDialog.bindAggregation("items", "/results", i)

	},

	getCountryModel: function() {

		if (!this.countryListModel) {

			var s = this;

			this.getView().getModel().read("CountrySet", undefined, undefined, false, function(d, r) {

				s.countryListModel = new sap.ui.model.json.JSONModel();

				s.countryListModel.setData(d)

			}, function(d, r) {

				cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(d, r)

			})

		}

		return this.countryListModel

	},

	getRejectionReasonModel: function() {

		if (!this.rejectionReasonModel) {

			var s = this;

			var p = ["EntityType='Item'", "PropertyName='RejectionReasonCode'"];

			this.getView().getModel("zlord_my_quotation_srv").read("GetValueHelp", undefined, p, false, function(d, r) {

				s.rejectionReasonModel = new sap.ui.model.json.JSONModel();

				if (!d.results || d.results.length > 0) {

					d.results = d.results.sort(function(a, b) {

						if (a.Value < b.Value) return -1;

						else if (a.Value == b.Value) return 0;

						else return 1

					});

					var e = {

						Key: " ",

						Value: s.resourceBundle.getText("NONE")

					};

					d.results.unshift(e)

				}

				s.rejectionReasonModel.setData(d);

				s.getView().setModel(s.rejectionReasonModel, "rejectionReason")

			}, function(d, r) {

				cus.sd.myquotations.util.ModelExtractor.dialogErrorMessage(d, r)

			})

		}

		return this.rejectionReasonModel

	},

	onCountryValueHelp: function() {

		this.buildSelectCountryDialog();

		this.oSelectCountryDialog.open()

	},

	onCountryInput: function(e) {

		this._isCountryValid(e.getParameter("newValue"))

	},

	onItemPress: function(e) {

		if (this._checkFormErrors()) {

			return

		}

		var p = e.oSource.getBindingContextPath();

		var i = this.getView().getModel("myQuotationModel").getProperty(p).ItemID;

		this.oApplicationFacade.setApplicationModel("rejectionReason", this.getView().getModel("rejectionReason"));

		this.getView().getModel("myQuotationModel").setProperty("/PreviousPageLocation", "itemDetails");

		this.oRouter.navTo("ItemDetails", {

			itemID: i

		}, false)

	}

});