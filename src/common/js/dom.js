export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  el.className += ' ' + className
}

function hasClass(el, className) {
  var classList = el.className.trim().split(' ')
  return ~classList.indexOf(className)
}
