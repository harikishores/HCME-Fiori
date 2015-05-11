/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



jQuery.sap.declare("cus.sd.myquotations.util.ModelExtractor");jQuery.sap.require("sap.m.MessageBox");cus.sd.myquotations.util.ModelExtractor={_applicationFacade:null,setApplicationFacade:function(a){this._applicationFacade=a},getApplicationFacade:function(){return this._applicationFacade},getResourceBundle:function(){return this._applicationFacade.getResourceBundle()},BuildPartnerModels:function(m){var s=new sap.ui.model.json.JSONModel();var b=new sap.ui.model.json.JSONModel();var a=new sap.ui.model.json.JSONModel();var c=cus.sd.myquotations.util.ModelExtractor.extractPartners(m,"AG");var d=cus.sd.myquotations.util.ModelExtractor.extractPartners(m,"RE");var e=cus.sd.myquotations.util.ModelExtractor.extractPartners(m,"WE");if(c.length>0){s.setData(c[0])}if(d.length>0){b.setData(d[0])}if(e.length>0){a.setData(e[0])}var p={SoldTo:s,BillTo:b,ShipTo:a};return p},extractPartners:function(m,p){var a=[];var d=m.getProperty("/PartnerSet/results");if(d){for(var i=0;i<d.length;i++){if(d[i].PartnerFunction===p){a[a.length]=d[i]}}}return a},extractPartnersType:function(m,p){var a=[];var d=m.getProperty("/PartnerSet/results");if(d){for(var i=0;i<d.length;i++){if(d[i].PartnerFunctionType===p){a[a.length]=d[i]}}}return a},ParseItemsConditions:function(m){var a=this.getApplicationFacade().getApplicationModel("customizing").getProperty("/ITEM_DISCOUNT");var b=this.getApplicationFacade().getApplicationModel("customizing").getProperty("/ITEM_PRICE");var d=m.getProperty("/QuotationItemSet/results");if(d){for(var i=0;i<d.length;i++){if(d[i].PricingConditionSet){var p=d[i].PricingConditionSet.results;d[i].Discount=0.0;d[i].DiscountUnit="%";for(var j=0;j<p.length;j++){if(p[j].CondTypeCode===b){d[i].ListPrice=p[j].ValueInternal;d[i].ListPriceUnit=p[j].RateUnitExternal}else if(p[j].CondTypeCode===a){if(p[j].Counter==="001"||p[j].Counter==="000"){d[i].Discount=Math.abs(p[j].AmountInternal);d[i].DiscountUnit=p[j].RateUnitExternal}}}}}}},DivideItemsDiscount:function(m){var a=this.getApplicationFacade().getApplicationModel("customizing").getProperty("/ITEM_DISCOUNT");var d=m.getProperty("/QuotationItemSet/results");if(d){for(var i=0;i<d.length;i++){d[i].DiscountPercentage=parseFloat(d[i].Discount)/100}}},DivideItemsDiscountbyTen:function(m){var a=this.getApplicationFacade().getApplicationModel("customizing").getProperty("/ITEM_DISCOUNT");var d=m.getProperty("/QuotationItemSet/results");if(d){for(var i=0;i<d.length;i++){if(d[i].PricingConditionSet){var p=d[i].PricingConditionSet.results;for(var j=0;j<p.length;j++){if(p[j].CondTypeCode===a){if(p[j].Counter==="001"||p[j].Counter==="000"){p[j].AmountInternal=p[j].AmountInternal/10}}}}}}},DivideHeaderDiscountbyTen:function(m){var h=this.getApplicationFacade().getApplicationModel("customizing").getProperty("/HEAD_DISCOUNT");var p=m.getProperty("/PricingConditionSet/results");if(p){for(var i=0;i<p.length;i++){if(p[i].CondTypeCode===h&&(p[i].Counter==="000"||p[i].Counter==="001")){p[i].AmountInternal=p[i].AmountInternal/10}}}},ParseHeadterConditions:function(m){var a=this.getApplicationFacade().getApplicationModel("customizing").getProperty("/ITEM_PRICE");var p=m.getProperty("/PricingConditionSet/results");if(p){for(var i=0;i<p.length;i++){if(p[i].CondTypeCode===a){var n=parseFloat((m.getProperty("/NetValue")));var b=parseFloat(p[i].ValueInternal);var d=b-n;m.setProperty("/Discount",d);m.setProperty("/DiscountUnit",p[i].Currency)}}}},ParseHeadterDiscountPercentageConditions:function(m){var h=this.getApplicationFacade().getApplicationModel("customizing").getProperty("/HEAD_DISCOUNT");var p=m.getProperty("/PricingConditionSet/results");if(p){m.setProperty("/DiscountPercentage",0.0);m.setProperty("/DiscountUnitPercentage","%");for(var i=0;i<p.length;i++){if(p[i].CondTypeCode===h&&(p[i].Counter==="000"||p[i].Counter==="001")){var v="";if(typeof(p[i].AmountInternal)==="number"){v=Math.abs(p[i].AmountInternal)}else{v=Math.abs(parseFloat(p[i].AmountInternal))}m.setProperty("/DiscountPercentage",v);m.setProperty("/DiscountUnitPercentage",p[i].RateUnitExternal)}}}},CountNbItems:function(m){var d=m.getProperty("/QuotationItemSet/results");if(d){m.setProperty("/nbItems",d.length)}},extractErrorMessage:function(d,r,a,m){var e="";var x="";if(a){var t=a.trim().substring(0,1);if(t==='{'||t==='['){x=$.parseJSON(a);e=x.error.message.value}else if(t==='<'){jQuery.sap.require("jquery.sap.xml");x=jQuery.sap.parseXML(a);e=$(x).find('errordetails').find('message').text()||$(x).find('message').text()}else{e=a}return e}if(m){return m}if(d&&d.response&&d.response.body){var b=$.parseJSON(d.response.body);if(b&&b.error&&b.error.message&&b.error.message.value){e=b.error.message.value}}if(e===""&&d&&d.response){e=d.message+" : "+d.response.requestUri}return e},dialogErrorMessage:function(d,r,x,m){sap.m.MessageBox.show(this.extractErrorMessage(d,r,x,m),sap.m.MessageBox.Icon.ERROR,this.getResourceBundle().getText("ERROR"),[sap.m.MessageBox.Action.OK],function(a){})},dialogErrorMessageSimulate:function(d,r,x,m){var a=this.extractErrorMessage(d,r,x,m);a=a+". "+this.getResourceBundle().getText("CHOOSE_REFRESH");sap.m.MessageBox.show(a,sap.m.MessageBox.Icon.ERROR,this.getResourceBundle().getText("ERROR"),[sap.m.MessageBox.Action.OK],function(A){})},validationInputNumber:function(e,a,g){var i=sap.ui.getCore().byId(e.getSource().getId());var b=false;var v=e.getParameter("newValue");var o={decimals:2};var p=sap.ca.ui.model.format.NumberFormat.getInstance(o).parse(v);if(g){if(isNaN(p)||p<=0){b=true}}else{if(v===""){e.getSource().setValue("0")}else if(isNaN(p)||p<0){b=true}}if(!b){e.getSource().setValue(sap.ca.ui.model.format.NumberFormat.getInstance(o).format(p))}i.setValueStateText(a);i.setValueState(b?sap.ui.core.ValueState.Error:sap.ui.core.ValueState.None);return b},validationInputQuantity:function(e,a){var i=sap.ui.getCore().byId(e.getSource().getId());var b=false;var v=e.getParameter("newValue");var q=sap.ca.ui.model.format.QuantityFormat.getInstance(null,{style:"standard",});var n=q.parse(v);if(isNaN(n)||n<0){b=true}if(!b){e.getSource().setValue(q.format(n))}i.setValueStateText(a);i.setValueState(b?sap.ui.core.ValueState.Error:sap.ui.core.ValueState.None);return b},validationEmptyField:function(p){var v=p.evt.getParameter("newValue");var i=sap.ui.getCore().byId(p.evt.getSource().getId());var e=false;if(p.isDate&&p.evt.getParameter("invalidValue")){e=true}if(v.replace(/\s+/g,'')===''){if(p.emptyCheck){e=true}else{e=false}}if(!p.isDate){i.setValueStateText(p.msg)}i.setValueState(e?sap.ui.core.ValueState.Error:sap.ui.core.ValueState.None);return e},currentDateTime:function(){return new Date()},removeMetadataDeep:function(d){if($.isArray(d)){for(var i=0;i<d.length;i++){cus.sd.myquotations.util.ModelExtractor.removeMetadataDeep(d[i])}}else{var p=null;for(p in d){if(d.hasOwnProperty(p)){if(p==="__metadata"){delete d.__metadata}else{if($.isPlainObject(d[p])||$.isArray(d[p])){cus.sd.myquotations.util.ModelExtractor.removeMetadataDeep(d[p])}}}}}},removePricingConditionSetFields:function(d){if(d&&d.QuotationHeaderSet){if(d.QuotationHeaderSet&&d.QuotationHeaderSet.PricingConditionSet&&d.QuotationHeaderSet.PricingConditionSet.results){var h=d.QuotationHeaderSet.PricingConditionSet.results;for(var k=0;k<h.length;k++){delete h[k].AmountExternal;delete h[k].BaseUnitOfMeasure;delete h[k].CalculationType;delete h[k].ConditionClass;delete h[k].Currency;delete h[k].IsInactive;delete h[k].PriceUnit;delete h[k].RateUnitExternal;delete h[k].RateUnitInternal;delete h[k].UnitDenominator;delete h[k].UnitNumerator;delete h[k].UnitOfMeasure;delete h[k].UnitOfMeasureInternal;delete h[k].ValueExternal;delete h[k].ValueInternal}}if(d.QuotationHeaderSet.QuotationItemSet&&d.QuotationHeaderSet.QuotationItemSet.results){var D=d.QuotationHeaderSet.QuotationItemSet.results;for(var i=0;i<D.length;i++){if(D[i].PricingConditionSet&&D[i].PricingConditionSet.results){var a=D[i].PricingConditionSet.results;for(var j=0;j<a.length;j++){delete a[j].AmountExternal;delete a[j].BaseUnitOfMeasure;delete a[j].CalculationType;delete a[j].ConditionClass;delete a[j].Currency;delete a[j].IsInactive;delete a[j].PriceUnit;delete a[j].RateUnitExternal;delete a[j].RateUnitInternal;delete a[j].UnitDenominator;delete a[j].UnitNumerator;delete a[j].UnitOfMeasure;delete a[j].UnitOfMeasureInternal;delete a[j].ValueExternal;delete a[j].ValueInternal}}}}}},removeQuotationHeaderSetFields:function(d){if(d&&d.QuotationHeaderSet){delete d.QuotationHeaderSet.IcompletionStatusDesc;delete d.QuotationHeaderSet.ItemIcompletionStatusDesc;delete d.QuotationHeaderSet.ProcessingStatusDesc;delete d.QuotationHeaderSet.ReferenceStatusDesc;delete d.QuotationHeaderSet.RejectionStatusDesc;delete d.QuotationHeaderSet.SalesDocumentTypeDesc;delete d.QuotationHeaderSet.SoldToPartyDescription;delete d.QuotationHeaderSet.TermsOfPaymentDescription}},fixQuotationItemSetFields:function(d){if(d&&d.QuotationHeaderSet&&d.QuotationHeaderSet.QuotationItemSet&&d.QuotationHeaderSet.QuotationItemSet.results){var D=d.QuotationHeaderSet.QuotationItemSet.results;for(var i=0;i<D.length;i++){D[i].OrderQuantity=D[i].OrderQuantity.toString()}}},removeQuotationItemSetFields:function(d){if(d&&d.QuotationHeaderSet&&d.QuotationHeaderSet.QuotationItemSet&&d.QuotationHeaderSet.QuotationItemSet.results){var D=d.QuotationHeaderSet.QuotationItemSet.results;for(var i=0;i<D.length;i++){delete D[i].ItemDescription;delete D[i].SalesUnitDescription;delete D[i].ScheduleLineSet;delete D[i].ReferenceStatus;delete D[i].RejectionReasonDescription;delete D[i].RejectionStatus;delete D[i].RejectionStatusDescription}}},removePartnerSetFields:function(d){if(d&&d.QuotationHeaderSet&&d.QuotationHeaderSet.PartnerSet&&d.QuotationHeaderSet.PartnerSet.results){var D=d.QuotationHeaderSet.PartnerSet.results;for(var i=0;i<D.length;i++){delete D[i].CountryDescription;delete D[i].PartnerFunctionDescription}}},removeQuotationIDZeroCounterDeep:function(d){if($.isArray(d)){for(var i=0;i<d.length;i++){cus.sd.myquotations.util.ModelExtractor.removeQuotationIDZeroCounterDeep(d[i])}}else{var p=null;for(p in d){if(d.hasOwnProperty(p)){if(p==="QuotationID"){delete d.QuotationID}else if(p==="Counter"){d.Counter="000"}else{if($.isPlainObject(d[p])||$.isArray(d[p])){cus.sd.myquotations.util.ModelExtractor.removeQuotationIDZeroCounterDeep(d[p])}}}}}},substituteResultsToArrayDeep:function(d){if($.isArray(d)){for(var i=0;i<d.length;i++){cus.sd.myquotations.util.ModelExtractor.substituteResultsToArrayDeep(d[i])}}else{var p=null;for(p in d){if(d.hasOwnProperty(p)){if($.isPlainObject(d[p])&&d[p].results&&$.isArray(d[p].results)){d[p]=d[p].results;for(var i=0;i<d[p].length;i++){cus.sd.myquotations.util.ModelExtractor.substituteResultsToArrayDeep(d[p][i])}}else{if($.isPlainObject(d[p])||$.isArray(d[p])){cus.sd.myquotations.util.ModelExtractor.substituteResultsToArrayDeep(d[p])}}}}}},emptyStringToSpaceDeep:function(d){if($.isArray(d)){for(var i=0;i<d.length;i++){cus.sd.myquotations.util.ModelExtractor.emptyStringToSpaceDeep(d[i])}}else{var p=null;for(p in d){if(d.hasOwnProperty(p)){if(d[p]===""){d[p]=" "}else{if($.isPlainObject(d[p])||$.isArray(d[p])){cus.sd.myquotations.util.ModelExtractor.emptyStringToSpaceDeep(d[p])}}}}}},extractGreatestItemID:function(a){var g=0;if(a){for(var i=0;i<a.length;i++){if(parseFloat(a[i].ItemID)>g){g=parseFloat(a[i].ItemID)}}}return g}};


