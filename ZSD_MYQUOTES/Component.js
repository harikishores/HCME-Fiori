/*



 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved



 */



jQuery.sap.declare("cus.sd.myquotations.Component");jQuery.sap.require("cus.sd.myquotations.Configuration");jQuery.sap.require("sap.ca.scfld.md.ComponentBase");sap.ca.scfld.md.ComponentBase.extend("cus.sd.myquotations.Component",{metadata:{"name":"CUS :: My Quotations","version":"1.4.1","library":"cus.sd.myquotations","includes":[],"dependencies":{"libs":["sap.m","sap.me"],"components":[]},"config":{"resourceBundle":"i18n/i18n.properties","titleResource":"APPLICATION_NAME","icon":"sap-icon://Fiori2/F0390","favIcon":"./resources/sap/ca/ui/themes/base/img/favicon/F0390_My_Quotations.ico","homeScreenIconPhone":"./resources/sap/ca/ui/themes/base/img/launchicon/F0390_My_Quotations/57_iPhone_Desktop_Launch.png","homeScreenIconPhone@2":"./resources/sap/ca/ui/themes/base/img/launchicon/F0390_My_Quotations/114_iPhone-Retina_Web_Clip.png","homeScreenIconTablet":"./resources/sap/ca/ui/themes/base/img/launchicon/F0390_My_Quotations/72_iPad_Desktop_Launch.png","homeScreenIconTablet@2":"./resources/sap/ca/ui/themes/base/img/launchicon/F0390_My_Quotations/144_iPad_Retina_Web_Clip.png"},"routing":{"config":{viewType:"XML",viewPath:"cus.sd.myquotations.view",targetAggregation:"detailPages",viewLevel:undefined,clearTarget:false},"routes":[{pattern:"",name:"masterDetail",view:"MainSplitContainer",viewPath:"sap.ca.scfld.md.view",targetControl:"fioriContent",targetAggregation:"pages",subroutes:[{pattern:"",name:"master",targetControl:"MainSplitContainer",targetAggregation:"masterPages",view:"Master",viewLevel:0,subroutes:[{pattern:"detail/{contextPath}",view:"S3",name:"detail",viewLevel:1},{pattern:"noData",name:"noData",view:"empty",viewPath:"sap.ca.scfld.md.view",viewLevel:1}]},{pattern:"products",name:"products",targetControl:"MainSplitContainer",targetAggregation:"masterPages",view:"ProductSearch",viewLevel:0,subroutes:[{pattern:"product/{materialID}",name:"product",view:"ProductDetail",viewLevel:1},{pattern:"productEmpty",name:"productEmpty",view:"empty",viewPath:"sap.ca.scfld.md.view",viewLevel:1}]}]},{pattern:"copy",name:"copy",view:"CreateQuotation",targetControl:"fioriContent",targetAggregation:"pages"},{pattern:"edit",name:"edit",view:"CreateQuotation",targetControl:"fioriContent",targetAggregation:"pages"},{pattern:"ItemDetails/{itemID}",name:"ItemDetails",view:"ItemDetails",targetControl:"fioriContent",targetAggregation:"pages"},{pattern:"ItemDisplay/{itemID}",name:"ItemDisplay",view:"ItemDetails",targetControl:"fioriContent",targetAggregation:"pages"},{pattern:"cart",name:"cart",view:"CreateQuotation",targetControl:"fioriContent",targetAggregation:"pages"},{pattern:"display/{contextPath}",name:"display",view:"S3",targetControl:"fioriContent",targetAggregation:"pages"}]}},createContent:function(){var v={component:this};return sap.ui.view({viewName:"cus.sd.myquotations.Main",type:sap.ui.core.mvc.ViewType.XML,viewData:v})}});



