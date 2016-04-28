(function(expect, describe, it, window) {

	"use strict";

	describe("SNI.Util", function() {

		it("should exist", function() {
			expect(window.SNI.Util).to.exist;
		});
		
		describe("ckParseJSON", function() {
			it("should return an object if passed an object", function() {
				var inObject = {
							"title": {
								"name1": "karma",
								"name2": [
									"mocha",
									"chai"
								]
							}
						};
 				SNI.Util.ckParseJSON(inObject).should.be.an('Object');
			});
			
			it("should return an object if passed a JSON string", function() {
				var inJSON = '{"title": {	"name1": "karma", "name2": ["mocha", "chai"]}}';
				SNI.Util.ckParseJSON(inJSON).should.be.an('Object');
			});
		});

		describe("sss2hhmmss", function() {
			it("should return (hh:)mm:ss if passed number of seconds", function() {
				var cases = [{
					input: "3600",
					expected: "1:00:00"
				}, {
					input: 3600,
					expected: "1:00:00"
				}];

				cases.forEach(function(testCase) {
					var result = SNI.Util.sss2hhmmss(testCase.input);
					expect(result).to.equal(testCase.expected);
				});
			});
		});

		describe("hhmmssClean", function() {
			it("should return striped leading zeros from passed time as string", function() {
				var cases = [{
					input: "01:23:02",
					expected: "1:23:02"
				}, {
					input: "00:04:23",
					expected: "4:23"
				}, {
					input: "00:00:15",
					expected: "0:15"
				}];

				cases.forEach(function(testCase) {
					var result = SNI.Util.hhmmssClean(testCase.input);
					expect(result).to.equal(testCase.expected);
				});
			});
		});

		describe("getSpinnerHtml", function() {
			it("should return markup for no-image loading spinner", function() {
				var result = SNI.Util.getSpinnerHtml();
				expect($(result)).to.be.an.instanceof($);
				$(result).should.have.class('spinner0-fill');
				
				result = SNI.Util.getSpinnerHtml("test");
				expect($(result)).to.be.an.instanceof($);
				$(result).should.have.class('spinner0-test');
			});
		});

		describe("$.PubSub", function() {
			var spyOne = sinon.spy();

			it("should allow subscribing", function() {
				$.PubSub('service-0').subscribe(spyOne);
				$.PubSub('service-0').publish('event-0');
				spyOne.should.have.been.calledWith('event-0');
			});
			it("should allow publishing", function() {
				$.PubSub('service-0').publish('event-1');
				spyOne.should.have.been.calledWith('event-1');
			});
			it("should allow unsubscribing", function() {
				$.PubSub('service-0').unsubscribe(spyOne);
				$.PubSub('service-0').publish('event-2');
				//console.log(spyOne.callCount);
				spyOne.should.not.have.been.calledWith('event-2');
			});
		});
		
	});

})(chai.expect, describe, it, this);