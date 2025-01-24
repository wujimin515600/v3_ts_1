/**
 * @description: 解析tokens
 * @param {Array} nodes --tokens
 * @return {Array}
 */
export const getTokens = (nodes) => {
    const tokens = [];
    let token = {};
    let key = false;
    nodes.forEach(child => {
        if(child.type.includes('open')) {
            key = true;
        }
        if (key) {
            token['tag'] = child.tag;
            token['level'] = child.level;
        }
        if (key && child.type === 'inline') {
            token['content'] = child.content;
        }
        if(child.type.includes('close')) {
            key = false;
            tokens.push(token);
            token = {};
        }
    });
    return tokens;
}

 /**
  * @description:  依赖版本信息对象转数组对象
  * @param {Object} json -- 版本信息
  * @return {Array} 数组对象
  */
 export const getDependencies = (json = {}) => {
    return Object.keys(json).map(item => {
        return {
            title: item,
            desc: json[item]
        }
    })
 }