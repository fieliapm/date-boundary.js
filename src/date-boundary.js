/*
 * date-boundary.js - identify and handle date part of Date object
 * Copyright (C) 2020-present Himawari Tachibana <fieliapm@gmail.com>
 *
 * This file is part of date-boundary.js
 *
 * date-boundary.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* jshint esversion: 6 */

(function (window, undefined) {
    "use strict";

    function adjustDateBoundary(date, dateBoundaryMinutes) {
        if (dateBoundaryMinutes === undefined) {
            dateBoundaryMinutes = 0;
        }

        var dateOffset = new Date(date);
        dateOffset.setMinutes(dateOffset.getMinutes() - dateBoundaryMinutes);
        return dateOffset;
    }

    function extractDateTuple(getDateTupleFunc, date, dateBoundaryMinutes) {
        var dateOffset = adjustDateBoundary(date, dateBoundaryMinutes);
        return getDateTupleFunc(dateOffset);
    }

    function getLocalDateTuple(date) {
        return [date.getFullYear(), date.getMonth(), date.getDate()];
    }

    function getUTCDateTuple(date) {
        return [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()];
    }

    function newUTCDate(dateTuple) {
        return new Date(Date.UTC.apply(Date, dateTuple));
    }

    function extractDateMidnight(getDateTupleFunc, date, dateBoundaryMinutes) {
        var dateTuple = extractDateTuple(getDateTupleFunc, date, dateBoundaryMinutes);
        return newUTCDate(dateTuple);
    }

    var dateBoundary = {
        extractLocalDateTuple: function (date, dateBoundaryMinutes) {
            return extractDateTuple(getLocalDateTuple, date, dateBoundaryMinutes);
        },

        extractUTCDateTuple: function (date, dateBoundaryMinutes) {
            return extractDateTuple(getUTCDateTuple, date, dateBoundaryMinutes);
        },

        extractLocalDateMidnight: function (date, dateBoundaryMinutes) {
            return extractDateMidnight(getLocalDateTuple, date, dateBoundaryMinutes);
        },

        extractUTCDateMidnight: function (date, dateBoundaryMinutes) {
            return extractDateMidnight(getUTCDateTuple, date, dateBoundaryMinutes);
        }
    };

    if (window.DateBoundary === undefined) {
        window.DateBoundary = dateBoundary;
    }

    return dateBoundary;
})(typeof window !== "undefined" ? window : this);
