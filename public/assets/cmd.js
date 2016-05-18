function require(path) {
    const url = require.resolve(path);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    let code;
    if(xhr.readyState === 4 && xhr.status === 200) {
        code = xhr.responseText;
    }
    const runnableCode = `
    let func = null;
    func = function define(require, exports, module) {
        ${code}
    }
    `;
    const def = eval(runnableCode);
    const module = {
        exports: {}
    }

    def(require, module.exports, module);

    return module.exports;
}

require.resolve = function(path) {
    let resolved_path = "./assets";
    if (!path.startsWith("/")) {
        resolved_path = resolved_path + "/";
    }
    if (!path.endsWith(".js")) {
        resolved_path = resolved_path + path + ".js";
    }
    else {
        resolved_path = resolved_path + path;
    }
    return resolved_path;
}
