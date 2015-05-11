/*



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



          HEAD_DISCOUNT : "",



          ITEM_DISCOUNT : "Z001",



          ITEM_PRICE : "VA00",



          PARTNER : "VE",



          QUOTE_TYPE : "ZQMT"



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