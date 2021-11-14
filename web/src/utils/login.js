import isEmpty from "lodash/isEmpty";
import validator from "validator";

//验证填写是否准确 只是静态验证
const validatorInput = (data) => {
    var errors = {};
    if (validator.isEmpty(data.userId)) { // true
        errors.username = "请填写用户名"
    }
    if (validator.isEmpty(data.pwd)) {
        errors.password = "请输入密码"
    }
    return {
        errors,
        isValid: isEmpty(errors)  //[] 和 {}
    }
}

export default validatorInput