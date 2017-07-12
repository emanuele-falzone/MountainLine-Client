/*jslint browser: true */
/*globals ko, $ */
"use strict";

var ko = require('knockout');


function ViewModel(params) {
    var self = this;
    self.src = ko.observable(params.src);
    self.pen = params.pen;
    self.line = ko.observable(params.line);

    self.naturalSize = ko.observable();
}


exports.register = function(options){

  ko.bindingHandlers.LineDrawSetSize = {
      update: function (element, valueAccessor) {
          var value = valueAccessor()();
          if (!value) { return; }
          element.height = value.height;
          element.width = value.width;
      }
  };

  ko.bindingHandlers.LineDrawNaturalSize = {
      init: function (element, valueAccessor) {
          var value = valueAccessor();
          function update() {
              value({
                  width: element.naturalWidth,
                  height: element.naturalHeight
              });
          }
          update();
          $(element).on('load', update);
      }
  };

  ko.bindingHandlers.LineDraw = {
      init: function (element, valueAccessor) {
          var value = valueAccessor(),
              ctx = element.getContext('2d'),
              $element = $(element);

          $element.on('mousedown', function (e) {
              var x = (e.pageX - $element.offset().left) / $element.width() * element.width,
                  y = (e.pageY - $element.offset().top) / $element.height() * element.height;
              ctx.beginPath();
              ctx.moveTo(x, y);
              function draw(e) {
                  var pen = parseInt($element.data('pen'), 10) || 1,
                      tx = (e.pageX - $element.offset().left) / $element.width() * element.width,
                      ty = (e.pageY - $element.offset().top) / $element.height() * element.height;
                  ctx.lineTo(tx, ty);
                  ctx.strokeStyle = 'rgb(255,0,0)';
                  ctx.lineWidth = pen;
                  ctx.lineCap = 'round';
                  ctx.stroke();
                  ctx.beginPath();
                  ctx.moveTo(tx, ty);
              }
              function end() {
                  $element.off('mousemove', draw);
                  $element.off('mouseup', end);
                  value(element.toDataURL('image/png'));
              }
              $element.on('mousemove', draw);
              $element.on('mouseup', end);
          });
      }
  };

  ko.bindingHandlers.LineDrawPen = {
      update: function (element, valueAccessor) {
          var value = valueAccessor(),
              $element = $(element);
          $element.data('pen', value);
      }
  };

  ko.components.register('line-drawer', {
      viewModel: ViewModel,
      template: '<img data-bind="attr: { src: src() }, LineDrawNaturalSize: naturalSize" class="background" draggable="false"/><canvas id="mycanvas" data-bind="LineDraw: line(), LineDrawSetSize: naturalSize, LineDrawPen: pen()"></canvas>'
  });

};
