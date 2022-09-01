var assert = require('assert');


var BowlingGame = function () {

    this.rolls = [];

};
BowlingGame.prototype.roll = function (pins) {

    this.rolls.push(pins);

};
BowlingGame.prototype.score = function () {
    var result = 0;
    var frameNumber = 0;
    var game = this;

    for (var frame = 0; frame < 10; frame++) {
        if (isStrike()) {
            result = result + getStrikeScore();
            frameNumber++
        }
        else if (isSpare()) {
            result = result + getSpareScore();
            frameNumber = frameNumber + 2;
        }
        else {
            result = result + getBalanceScore();
            frameNumber = frameNumber + 2;
        }
    }
    return result;

    function isStrike() {
        return game.rolls[frameNumber] == 10;
    }

    function isSpare() {
        return game.rolls[frameNumber] + game.rolls[frameNumber + 1] == 10;
    }

    function getStrikeScore() {
        return game.rolls[frameNumber] + game.rolls[frameNumber + 1] + game.rolls[frameNumber + 2];
    }

    function getSpareScore() {
        return game.rolls[frameNumber] + game.rolls[frameNumber + 1] + game.rolls[frameNumber + 2];
    }


    function getBalanceScore() {
        return game.rolls[frameNumber] + game.rolls[frameNumber + 1];
    }
}
function rollNumber(pins, rolls) {
    for (var i = 0; i < rolls; i++) {
        game.roll(pins)
    }
}
var game = new BowlingGame();
describe('Eurofins Bowling recruitment challenge', function () {

    it("Games", function () {

        if (process.argv[3] == 'GutterGame') {
            rollNumber(0, 20);
            assert.equal(game.score(), 0)

        }
        else if (process.argv[3] == 'AllOneGame') {
            rollNumber(1, 20);
            assert.equal(game.score(), 20)
        }
        else if (process.argv[3] == 'SpareGame') {
            game.roll(5);
            game.roll(5);
            game.roll(3)
            rollNumber(0, 17);
            assert.equal(game.score(), 16)
        }
        else if (process.argv[3] == 'StrikeGame') {

            game.roll(10);
            game.roll(4);
            game.roll(3)
            rollNumber(0, 16);
            assert.equal(game.score(), 24)
        }
        else if (process.argv[3] == 'PerfectGame') {

            rollNumber(10, 12);
            assert.equal(game.score(), 300)
        }
    });


});
