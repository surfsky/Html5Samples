/********************************************************
 * HTML5 Samples javascript utils class
 * https://github.com/surfsky/html5samples/
 ********************************************************/



/** Write log in container
 * @param (string) msg
 * @param (string) containerId Log container's id
 * @param (string) lvl  Message level: INFO, WARN, ERROR
 * @param (string) format Default : [{date}] {level} : {message}
*/
function log(msg='', lvl='INFO', containerId='', format='[{date}] {level} : {message}'){
    // text
    if (format != ''){
        var dt = new Date();
        var dt = dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString();
        msg = format
            .replace('{date}', dt)
            .replace('{level}', lvl)
            .replace('{message}', msg)
            ;
    }

    // element
    var ele = document.createElement('div');
    ele.innerHTML = msg;
    ele.style.display = 'block';
    if (lvl == 'WARN')  ele.style.color = 'orange';
    if (lvl == 'ERROR') ele.style.color = 'red';

    // container
    var container = document.body;
    if (containerId != '')
        container = document.getElementById(containerId);
    container.appendChild(ele);
}

/**Clear logs */
function clearLog(containerId){
    var container = document.body;
    if (containerId != '')
        container = document.getElementById(containerId);
    container.innerHTML = '';
}