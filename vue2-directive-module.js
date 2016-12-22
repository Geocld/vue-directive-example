/* global Vue:true */
/* global define:true */
;(function () {
  var vueValidate = {};

  var validate = {
    bind: function (el, binding) { // el是绑定指令的元素
      var value = binding.value; // 传递给指令的值
      var arg = value.require;
      el.handler = function (err_type, err_msg) { // This directive.handler
        value.err_type = err_type;
        value.err_msg = err_msg;
        value.methods.call(this, value);
      };
      el.getElementsByTagName('input')[0].addEventListener('blur', function () {
        checkout(el.getElementsByTagName('input')[0].value);
      });
      

      /* 工具方法 */
      function checkout(value) {
        var filter;
        // 验证手机号/^1[358]\d{9}$/
        if (arg === 'phone') {
          filter = /^\d{7,14}$/;
          if (!filter.test(value)) {
            el.handler('phone_err', '手机号格式不正确');
            value = {};
            return;
          } else {
            el.handler('phone_suc', '');
            value = {};
            return;
          }
        }
      }
    }
  };

  // 版本选择 && 模块导出
  vueValidate.install = function (Vue) {
    Vue.directive('validate', validate);
  };

  if (typeof exports === 'object') {
    module.exports = vueValidate;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return vueValidate
    })
  } else if (window.Vue) {
    window.vueValidate = vueValidate;
    Vue.use(vueValidate);
  }
})();