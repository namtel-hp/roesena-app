exports.id = "main";
exports.modules = {

/***/ "./src/api/events.ts":
/*!***************************!*\
  !*** ./src/api/events.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var get_1 = __webpack_require__(/*! ../db-access/events/get */ "./src/db-access/events/get.ts");
var post_1 = __webpack_require__(/*! ../db-access/events/post */ "./src/db-access/events/post.ts");
function events(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                var id = void 0;
                id = parseInt(req.params['id'], 10);
                get_1.getEventById(id).then(function (val) {
                    res.send(val);
                });
            }
            catch (e) {
                // bad request
                res.statusCode = 500;
                res.send({ error: 'id has to be an int' });
            }
            break;
        case 'POST':
            var dbev = {
                id: 0,
                title: req.body.title,
                description: req.body.description,
                authorityLevel: parseInt(req.body.authorityLevel, 10),
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate)
            };
            res.send(post_1.createEvent(dbev));
            break;
        default:
            res.statusCode = 404;
            res.send({ error: 'method not supported' });
    }
}
exports.events = events;


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBpL2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsWUFBWSxtQkFBTyxDQUFDLDhEQUF5QjtBQUM3QyxhQUFhLG1CQUFPLENBQUMsZ0VBQTBCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsK0JBQStCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnQ0FBZ0M7QUFDdEQ7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uMWZmN2U1YzQ2MmEzNjkxYTBhYjUuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGdldF8xID0gcmVxdWlyZShcIi4uL2RiLWFjY2Vzcy9ldmVudHMvZ2V0XCIpO1xudmFyIHBvc3RfMSA9IHJlcXVpcmUoXCIuLi9kYi1hY2Nlc3MvZXZlbnRzL3Bvc3RcIik7XG5mdW5jdGlvbiBldmVudHMocmVxLCByZXMpIHtcbiAgICBzd2l0Y2ggKHJlcS5tZXRob2QpIHtcbiAgICAgICAgY2FzZSAnR0VUJzpcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIGlkID0gcGFyc2VJbnQocmVxLnBhcmFtc1snaWQnXSwgMTApO1xuICAgICAgICAgICAgICAgIGdldF8xLmdldEV2ZW50QnlJZChpZCkudGhlbihmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHZhbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIGJhZCByZXF1ZXN0XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA1MDA7XG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBlcnJvcjogJ2lkIGhhcyB0byBiZSBhbiBpbnQnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1BPU1QnOlxuICAgICAgICAgICAgdmFyIGRiZXYgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICAgICAgdGl0bGU6IHJlcS5ib2R5LnRpdGxlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiByZXEuYm9keS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBhdXRob3JpdHlMZXZlbDogcGFyc2VJbnQocmVxLmJvZHkuYXV0aG9yaXR5TGV2ZWwsIDEwKSxcbiAgICAgICAgICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKHJlcS5ib2R5LnN0YXJ0RGF0ZSksXG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogbmV3IERhdGUocmVxLmJvZHkuZW5kRGF0ZSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXMuc2VuZChwb3N0XzEuY3JlYXRlRXZlbnQoZGJldikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDQwNDtcbiAgICAgICAgICAgIHJlcy5zZW5kKHsgZXJyb3I6ICdtZXRob2Qgbm90IHN1cHBvcnRlZCcgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5ldmVudHMgPSBldmVudHM7XG4iXSwic291cmNlUm9vdCI6IiJ9