function Responsable() {

    var self = this;

    this.stack = function (config) {
        var selector = String(config.selector);
        var maxWidth = String(config.maxWidth);
        var cClass = String(config.class);
        var tables = document.querySelectorAll(selector);

        var i = 0;
        while (i < tables.length) {
            var newDiv = document.createElement('div');
            newDiv.classList.add("responsable-container", cClass);
            tables[i].parentNode.insertBefore(newDiv, tables[i].nextSibling);
            tables[i].classList.add("responsable-table-original");
            i += 1;
        }
        i = 0;
        var html = "";
        var mqls = [
            window.matchMedia("(max-width:" + maxWidth + "px)"),
        ]
        var initQ = mqh();
        for (var i = 0; i < mqls.length; i++) {
            mqls[i].addListener(mqh)
        }

        function mqh() {
            var i = 0;
            if (mqls[0].matches) {
                while (i < tables.length) {
                    html = self._stackFormat(tables[i]);
                    tables[i].style.display = "none";
                    tables[i].nextSibling.innerHTML = html;
                    i += 1;
                }
            } else {
                while (i < tables.length) {
                    tables[i].nextSibling.innerHTML = "";
                    tables[i].style.display = "block";

                    i += 1;
                }
            }
        }
    };

    this._stackFormat = function (table) {
        var html = "";
        var tr = table.querySelectorAll("tr");
        var th = table.querySelectorAll("th");
        var td = table.querySelectorAll("td");

        var i = 0;
        var j = 0;
        while (i < td.length) {
            var content;
            content = td[i].innerText;

            if (j == th.length) {
                html += "<hr/>";
                j = 0;
            }
            html += "<div class='responsable-card'><strong>" + th[j].innerText + "</strong>:<span>" + content + "</span></div>";
            i += 1;
            j += 1;
        }
        i += 1;
        return html;
    };

    return {
        stack: this.stack
    };
}

var util = new Responsable();
util.stack({
    selector: "table",
    maxWidth: 768,
    class: "my-class"
});