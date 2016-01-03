const Dimensions = (element) => {

    if(!element) return;

    var dimensions = {
            height: element.offsetHeight,
            width: element.offsetWidth
        },
        style = window.getComputedStyle(element);

    dimensions.height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    dimensions.width += parseInt(style.marginLeft) + parseInt(style.marginRight);

  return dimensions;

};

export default Dimensions;