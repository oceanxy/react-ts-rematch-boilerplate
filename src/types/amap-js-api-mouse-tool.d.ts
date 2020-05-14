// Type definitions for non-npm package amap-js-api-mouse-tool 1.4
// Project: https://lbs.amap.com/api/javascript-api/reference/plugin#AMap.MouseTool
// Definitions by: Oceanxy <https://github.com/xyzsyx>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.8

/// <reference types="amap-js-api" />

declare namespace AMap {
  namespace MouseTool {

  }

  class MouseTool extends EventEmitter {
    /**
     * 构造函数，目前仅支持桌面浏览器
     * @param {AMap.Map} map
     */
    constructor(map: AMap.Map);

    marker(options: Marker.Options)

    polyline(options: Polyline.Options)

    polygon(options: Polygon.Options)

    rectangle(options: Rectangle.Options)

    circle(options: Circle.Options)

    rule(options: Polygon.Options)

    // measureArea(options: PolygonOptions)

    // rectZoomIn(options: PolygonOptions)

    // rectZoomOut(options: PolygonOptions)

    close(options?: Boolean)
  }
}
