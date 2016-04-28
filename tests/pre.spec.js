(function(expect, describe, it, window) {

	"use strict";

	describe("pre", function() {
		describe("$", function() {

			it("should exist", function() {

				expect($).to.exist;
				
			});
		});
		
		describe("SNI", function() {

			it("should exist", function() {

				expect(window.SNI).to.exist;
				
			});
		});
	});

})(chai.expect, describe, it, this);