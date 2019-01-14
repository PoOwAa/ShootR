define(require => {
    var _left = false;
    var _up = false;
    var _down = false;
    var _right = false;
    var _misc_keys = {};

    class Input {
        static onKeyDown(event) {
            switch (event.keyCode) {
                case 37:
                case 65:
                    Input.LEFT = true;
                    break;
                case 38:
                case 87:
                    Input.UP = true;
                    break;
                case 39:
                case 68:
                    Input.RIGHT = true;
                    break;
                case 40:
                case 83:
                    Input.DOWN = true;
                    break;
                default:
                    Input.MISC_KEYS[event.keyCode] = true;
                    break;
            }
        }

        static onKeyUp(event) {
            switch (event.keyCode) {
                case 37:
                case 65:
                    Input.LEFT = false;
                    break;
                case 38:
                case 87:
                    Input.UP = false;
                    break;
                case 39:
                case 68:
                    Input.RIGHT = false;
                    break;
                case 40:
                case 83:
                    Input.DOWN = false;
                    break;
                default:
                    Input.MISC_KEYS[event.keyCode] = false;
                    break;
            }
        }

        static applyEventHandlers(element) {
            element.setAttribute('tabindex', 1);
            element.addEventListener('keyup', Input.onKeyUp);
            element.addEventListener('keydown', Input.onKeyDown);
        }

        static get LEFT() {
            return _left;
        }
        static get UP() {
            return _up;
        }
        static get RIGHT() {
            return _right;
        }
        static get DOWN() {
            return _down;
        }
        static get MISC_KEYS() {
            return _misc_keys;
        }

        static set LEFT(val) {
            _left = val;
        }
        static set UP(val) {
            _up = val;
        }
        static set RIGHT(val) {
            _right = val;
        }
        static set DOWN(val) {
            _down = val;
        }
        static set MISC_KEYS(val) {
            _misc_keys = val;
        }
    }

    return Input;
});
