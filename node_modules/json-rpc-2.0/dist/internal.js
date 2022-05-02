"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultErrorCode = exports.createLogDeprecationWarning = void 0;
exports.createLogDeprecationWarning = function (message) {
    var warned = false;
    return function () {
        if (!warned && process.env.NODE_ENV !== "production") {
            console.warn("Deprecation Warning (json-rpc-2.0): " + message);
            warned = true;
        }
    };
};
exports.DefaultErrorCode = 0;
