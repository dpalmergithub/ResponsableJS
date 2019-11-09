function Responsable() {

    var self = this;

    self.stack = function (config) {
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
                    html = self._stackFormat(tables[i], config);
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

    self._stackFormat = function (table, config) {
        var html = "";
        var initPosition = Number(config.firstRow) - 1;
        var tr = table.querySelectorAll("tr") || [];
        var tdsPerRow = tr[initPosition].querySelectorAll("td") || [];
        var th = table.querySelectorAll("th") || [];
        var td = table.querySelectorAll("td") || [];
        var thDiff = 0;
        var len = td.length;
        if (!config.columnSeparator) {
            config.columnSeparator = ":";
        }

        if (tdsPerRow.length < th.length) {
            thDiff = (th.length - tdsPerRow.length);
            var i = initPosition;
            while (i < tr.length) {
                for (var j = 0; j < thDiff; j += 1) {
                    var newTD = document.createElement('td');
                    tr[i].appendChild(newTD)
                }
                i += 1;
            }
            td = table.querySelectorAll("td") || [];
            len = td.length;
        }
        var i = 0;
        var j = 0;
        while (i < len) {
            var thVal;
            var tdVal;
            if (j == th.length) {
                html += "<hr/>";
                j = 0;
            }
            tdVal = td[i].innerText;
            if (config.allowHTML) {
                tdVal = td[i].innerHTML;
            }
            thVal = th[j].innerText;

            html += "<div class='responsable-container-child'><span class='responsable-tcolumn'><strong>" + thVal + "</strong></span><span class='responable-colseparator'>" + String(config.columnSeparator) + "</span><span class='responsable-tval'>" + tdVal + "</span></div>";
            i += 1;
            j += 1;
        }
        i += 1;
        return html;
    };

    return {
        stack: self.stack
    };
}

var util = new Responsable();
util.stack({
    selector: "table",
    maxWidth: 768,
    class: "my-class",
    firstRow: 2,
    columnSeparator: "-",
    allowHTML: true
});