/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/tricon/Assignment/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});