/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"products_by_categories/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
