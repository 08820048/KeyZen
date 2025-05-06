import api from './config';

/**
 * 检查键盘指纹验证状态
 * @param {string} username - 用户名
 * @returns {Promise} 检查响应
 */
export const checkKeyprintStatus = (username) => {
  return api.post('/check-keyprint-status', { username });
};

/**
 * 用户登录
 * @param {Object} data - 登录数据
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @param {Object} [data.keyprint] - 键盘指纹数据
 * @returns {Promise} 登录响应
 */
export const login = (data) => {
  return api.post('/login', data);
};

/**
 * 用户注册
 * @param {Object} data - 注册数据
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @param {boolean} data.enable_keyprint - 是否开启键盘指纹验证
 * @param {Object} [data.keyprint] - 键盘指纹数据
 * @returns {Promise} 注册响应
 */
export const register = (data) => {
  return api.post('/register', data);
};

/**
 * 存储键盘指纹
 * @param {Object} data - 键盘指纹数据
 * @param {string} data.user_id - 用户ID
 * @param {Object} data.keyprint - 键盘指纹数据
 * @returns {Promise} 存储响应
 */
export const storeKeyprint = (data) => {
  return api.post('/store-keyprint', data);
};

/**
 * 验证键盘指纹
 * @param {Object} data - 键盘指纹数据
 * @param {string} data.user_id - 用户ID
 * @param {Object} data.keyprint - 键盘指纹数据
 * @returns {Promise} 验证响应
 */
export const verifyKeyprint = (data) => {
  return api.post('/verify-keyprint', data);
}; 