import React from 'react';
import $ from 'jquery';

import './App.less';

let color1Count = 2;
let color2Count = 2;

const App = React.createClass({
    getInitialState() {
        return {
            color1: this.randomColor(),
            color2: this.randomColor()
        }
    },

    randomColor() {
        let r=Math.floor(Math.random() * (256 - 10) + 10);
        let g=Math.floor(Math.random() * (256 - 10) + 10);
        let b=Math.floor(Math.random() * (256 - 10) + 10);

        if (r < 16 && r > 10) {
            r *= 2;
        } else if (r < 10) {
            r += 16;
        }

        if (g < 16 && g > 10) {
            g *= 2;
        } else if (g < 10) {
            g += 16;
        }

        if (b < 16 && b > 10) {
            b *= 2;
        } else if (b < 10) {
            b += 16;
        }

        let c='#' + r.toString(16) + g.toString(16) + b.toString(16);

        return c;
    },

    chooseColor() {
        let n = Math.floor(Math.random() * (3 - 1) + 1);

        if (n === 1 && color1Count > 0) {
            color1Count--;

            return this.state.color1;
        } else if (color2Count > 0) {
            color2Count--;

            return this.state.color2;
        } else {
            return this.state.color1;
        }
    },

    render() {
        return (
            <div className="App">
                <div className="game">
                    <div className="game-tails__tail-wrap">
                        <div className="game-tails__tail"></div>
                        <div className="inner-block" style={{backgroundColor: this.chooseColor()}}></div>
                    </div>
                    <div className="game-tails__tail-wrap">
                        <div className="game-tails__tail"></div>
                        <div className="inner-block" style={{backgroundColor: this.chooseColor()}}></div>
                    </div>
                    <div className="game-tails__tail-wrap">
                        <div className="game-tails__tail"></div>
                        <div className="inner-block" style={{backgroundColor: this.chooseColor()}}></div>
                    </div>
                    <div className="game-tails__tail-wrap">
                        <div className="game-tails__tail"></div>
                        <div className="inner-block" style={{backgroundColor: this.chooseColor()}}></div>
                    </div>
                </div>
            </div>
        )
    }
});

(function () {
    let tailColor = '';

    $(document).on('click', '.game-tails__tail-wrap', function () {
        if ($(this).hasClass('_show') || $('.game').hasClass('_disabled')) {
            return;
        }

        $(this).addClass('_active');

        if (tailColor === $(this).find('.inner-block').css('background-color')) {
            tailColor = '';

            $('.game-tails__tail-wrap._active').removeClass('_active').addClass('_show');

            return;
        }

        if ($('.game-tails__tail-wrap._active').length == 2) {
            $('.game-tails__tail-wrap').parent().addClass('_disabled');

            setTimeout(function () {
                $('.game-tails__tail-wrap').removeClass('_active').parent().removeClass('_disabled');
                tailColor = '';
            }, 1000);
        }
        tailColor = $(this).find('.inner-block').css('background-color');
    });
})();

export default App;