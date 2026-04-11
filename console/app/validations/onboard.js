/** @validations onboard */
import { validatePresence, validateLength, validateConfirmation, validateFormat } from 'ember-changeset-validations/validators';

export default {
    name: [validatePresence({ presence: true, message: 'Tên không được để trống' })],
    email: [
        validatePresence({ presence: true, message: 'Email không được để trống' }),
        validateFormat({ type: 'email', message: 'Email không hợp lệ, vui lòng kiểm tra lại' }),
    ],
    organization_name: [validatePresence({ presence: true, message: 'Tên tổ chức không được để trống' })],
    password: [validatePresence({ presence: true, message: 'Mật khẩu không được để trống' }), validateLength({ min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' })],
    password_confirmation: [
        validatePresence({ presence: true, message: 'Xác nhận mật khẩu không được để trống' }),
        validateConfirmation({ on: 'password', message: 'Xác nhận mật khẩu không khớp' }),
    ],
};
