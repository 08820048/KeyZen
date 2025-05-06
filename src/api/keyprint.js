/**
 * 键盘指纹数据结构
 * @typedef {Object} Keyprint
 * @property {number[]} intervals - 按键间隔时间数组（毫秒）
 * @property {number} duration - 总输入时长（毫秒）
 * @property {number} backspace_count - 退格键次数
 */

/**
 * 创建键盘指纹数据
 * @param {number[]} timestamps - 按键时间戳数组
 * @param {number} backspaceCount - 退格键次数
 * @returns {Keyprint} 键盘指纹数据
 */
export const createKeyprint = (timestamps, backspaceCount = 0) => {
  if (timestamps.length < 2) {
    return null;
  }

  const intervals = [];
  for (let i = 1; i < timestamps.length; i++) {
    intervals.push(timestamps[i] - timestamps[i - 1]);
  }

  return {
    intervals,
    duration: timestamps[timestamps.length - 1] - timestamps[0],
    backspace_count: backspaceCount
  };
};

/**
 * 验证键盘指纹数据
 * @param {Keyprint} keyprint - 键盘指纹数据
 * @returns {boolean} 是否有效
 */
export const validateKeyprint = (keyprint) => {
  if (!keyprint) return false;
  
  return (
    Array.isArray(keyprint.intervals) &&
    keyprint.intervals.length > 0 &&
    typeof keyprint.duration === 'number' &&
    keyprint.duration > 0 &&
    typeof keyprint.backspace_count === 'number' &&
    keyprint.backspace_count >= 0
  );
};

/**
 * 检查键盘指纹相似度
 * @param {number} similarity - 相似度得分
 * @returns {boolean} 是否匹配
 */
export const isKeyprintMatch = (similarity) => {
  return similarity >= 0.85;
}; 