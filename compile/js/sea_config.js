seajs.config( {
    base: rootPath + 'public/js/',
    // 别名配置
    alias: {},
    map: [
        [ /^(.*\.(?:css|js))(.*)$/i, '$1?' + ( +new Date() ) ]
    ],
    // 路径配置
    paths: {},
    preload: [],
    // 调试模式
    debug: true,

    // 文件编码
    charset: 'utf-8'
} );