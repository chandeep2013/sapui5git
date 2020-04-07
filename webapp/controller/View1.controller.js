sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter',
	'sap/m/MessageToast',
	'sap/m/MessageBox',
], function (Controller, JSONModel, Filter,MessageToast,MessageBox) {
	"use strict";

	return Controller.extend("com.tricon.Assignment.controller.View1", {
		onInit: function () {
			var oCalendar = this.getView().byId("SpecialDateId");
			////////////////////Adding SpecialDates/////////////////
			oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
				startDate: this.addDays(new Date(), 2),
				type: sap.ui.unified.CalendarDayType.Type03
			}));

			oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
				startDate: this.addDays(new Date(), -2),
				type: sap.ui.unified.CalendarDayType.Type03
			}));

			oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
				startDate: this.addDays(new Date(), 5),
				type: sap.ui.unified.CalendarDayType.Type03
			}));

			//////////////////// Model for SuggestionItems ///////////////
			var TestModel = new JSONModel();
			$.ajax({
				url: "/MyJSON/bins/d0hse",
				type: "GET",
				success: function (response) {
					var data = response;
					TestModel.setData(data);
					console.log("tabledata", data);
				},
				error: function (err) {
					//	console.log(err);
				}
			});
			this.getView().setModel(TestModel, "TableTest");
		},
		addDays: function (oDate, nDays) {
			var oResultDate = new Date(oDate); //get copy of input date
			oResultDate.setDate(oResultDate.getDate() + nDays);
			return oResultDate;
		},
		onInputSubmit: function () {
			alert("Submit Event Fired!!");
		},
		onSuggestionItemSelected: function (oEvent) {
			alert("you have Selected one Item..!!");
		},
		onValueHelpRequest: function (oEvent) {
			//	alert("valueHelpRequest event Fired....!!");
			var sInputValue = oEvent.getSource().getValue();
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.tricon.Assignment.FragmentsForViews.SuggestionItems", this);
				this.getView().addDependent(this._oDialog);
			}
			// create a filter for the binding
			this._oDialog.getBinding("items").filter([new Filter(
				"ContactFName",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);
			this._oDialog.open();
		},
		OnAsendingOrder: function () {
			var sTable = this.getView().byId("idTest_Table");
			var sModel = sTable.getModel();
			sTable.setModel(sModel);
			//sTable.getModel().refresh();
			var oBinding = sTable.getBinding("items");
			var oSorters = new sap.ui.model.Sorter("ContactOfficePhone", true, false);
			oBinding.sort(oSorters);
		},
		onDesendingOrder: function () {
			var sTable = this.getView().byId("idTest_Table");
			var sModel = sTable.getModel();
			sTable.setModel(sModel);
			//sTable.getModel().refresh();
			var oBinding = sTable.getBinding("items");
			var oSorters = new sap.ui.model.Sorter("ContactOfficePhone", false, false);
			oBinding.sort(oSorters);
		},
		onChange: function () {
			alert("File Change Event Fired..!!");
		},
		ontypeMissmatch: function () {
			alert("Please Select txt files..!!");
		},
		onFilenameLengthExceed: function () {
			alert("File name length is Exceed..!!");
		},
		onFileSizeExceed: function () {
			alert("File is too long..!!");
		},
		onFileAllowed: function () {
			alert("File allowed efvent Fired..!!");
		},
		onFileUploaderComplete: function () {
			console.log("file uplode completed");
				this.getView().byId("idIndicator").setPercentValue(100);  
			this.getView().byId("idIndicator").setDisplayValue(100);  
		},
		onFileUploaderUploadComplete: function () {
			console.log("file upload complete");
			this.getView().byId("idIndicator").setPercentValue(100);  
			this.getView().byId("idIndicator").setDisplayValue(100);  
		},
		onUploadProgress: function () {
			console.log("file upload Progress");
				this.getView().byId("idIndicator").setPercentValue(50);  
			this.getView().byId("idIndicator").setDisplayValue(50);  
		},
		onUploadStart: function () {
			console.log("file upload Start");
			this.getView().byId("idIndicator").setPercentValue(0);  
			this.getView().byId("idIndicator").setDisplayValue(0);  
		},
		_handleValueHelpSearch: function (evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter(
				"ContactFName",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		_handleValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.getView().byId("f4HelpId");
				productInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		},
		ComboBoxChnage: function () {
			alert("ComboBoxChnage Event Fired");
		},
		ComboBoxSelectionChange: function () {
			alert("ComboBoxSelectionChange");
		},
		handleSelectionChange: function(oEvent) {
			var changedItem = oEvent.getParameter("changedItem");
			var isSelected = oEvent.getParameter("selected");

			var state = "Selected";
			if (!isSelected) {
				state = "Deselected";
			}

			alert("Event 'selectionChange': " + state + " '" + changedItem.getText());
		},

		handleSelectionFinish: function(oEvent) {
			var selectedItems = oEvent.getParameter("selectedItems");
			var messageText = "Event 'selectionFinished': [";

			for (var i = 0; i < selectedItems.length; i++) {
				messageText += "'" + selectedItems[i].getText() + "'";
				if (i != selectedItems.length - 1) {
					messageText += ",";
				}
			}

			messageText += "]";

			alert(messageText+ +"Selection Finish Event Fired");
		},
		onPressTest:function(){
			/*var timelineItem = new sap.suite.ui.commons.TimelineItem({
				text : '-xyz\u000a-yzx\u000a-Chand\u000a-tetc'
			});*/
			var aa= ["1234","4567","23456","35464"];
			
			var test ="";
			for(var i=0;i<aa.length;i++){
					test+="<li>"+aa[i]+"</li>"
					};
			var	HTML = "<h3>Chandeep</h3>" +
					"<ul>"+
					test+
					"</ul>" +
					"<dl><dt>definition:</dt><dd>definition list of terms and descriptions</dd>";
				var formattedText = new  sap.m.FormattedText({
					htmlText:HTML
				});
			MessageBox.confirm(formattedText);
		},

	});
});