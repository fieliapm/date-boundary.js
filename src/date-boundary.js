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

(function () {
    "use strict";

    var dateBoundary = {
        getLocalDatePart: function (date, dateBoundaryMinute) {
            if (dateBoundaryMinute === undefined) {
                dateBoundaryMinute = 0;
            }

            var dateOffset = new Date(date);
            dateOffset.setMinutes(dateOffset.getMinutes() - dateBoundaryMinute);
            return new Date(Date.UTC(dateOffset.getFullYear(), dateOffset.getMonth(), dateOffset.getDate()));
        }
    };

    if (window.DateBoundary === undefined) {
        window.DateBoundary = dateBoundary;
    }
})();
