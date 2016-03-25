function isWindow(obj) { return obj != null && obj == obj.window }
function isDocument(obj) { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }

let z = {
  trim: function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  },
  offset: function(el, coordinates){
    if (coordinates) {
      // TODO:
      // set offset
      // {
      //    left:
      //    top:
      //    width:
      //    height:
      // }
      return;
    }

    if (!el) {
      return null;
    }

    let obj = el.getBoundingClientRect();

    return {
      left: obj.left + window.pageXOffset,
      top: obj.top + window.pageYOffset,
      width: Math.round(obj.width),
      height: Math.round(obj.height)
    };
  },
  scrollTop: function(el, value){
    if (!el) {
      return;
    }

    var hasScrollTop = 'scrollTop' in el;
    if (value === undefined) {
      return hasScrollTop ? el.scrollTop : el.pageYOffset
    }

    if (hasScrollTop) {
      el.scrollTop = value;
    } else {
      el.scrollTo(el.scrollX, value);
    }
  }
};

;['width', 'height'].forEach(function(dimension){
  let dimensionProperty =
    dimension.replace(/./, function(m){ return m[0].toUpperCase() });

  z[dimension] = function(el, value){
    let offset;

    if (value === undefined) {
      return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = z.offset()) && offset[dimension];
    }

    // TODO:
    // set width, height
    return;
  }
});

export default z;
