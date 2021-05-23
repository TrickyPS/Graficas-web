var Score = function (id, userName, totalPoints) {
    this.id = id;
    this.userName = userName;
    this.totalPoints = totalPoints;
};

Score.prototype = {
    setId: function (id) {
        this.id = id;
    },
    getHtml: function () {
        var html = '<tr>';
            html += '<td class="text-left">' + this.userName + '</td>';
            html += '<td class="text-left">' + this.totalPoints + '</td>';
            html += '</tr>';
        return html;
    }
};