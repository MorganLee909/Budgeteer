module.exports = {
    transactions: [],

    display: function(){
        if(this.transactions.length === 0){
            let account = user.getAccount();
            for(let i = 0; i < account.transactions.length; i++){
                this.transactions.push(account.transactions[i]);
            }
            this.renderTransactions();
        }
    },

    renderTransactions: function(){
        let container = document.getElementById("searchTransactionsBody");
        let template = document.getElementById("searchTransaction").content.children[0];

        for(let i = 0; i < this.transactions.length; i++){
            let dateOptions = {year: "numeric", month: "short", day: "numeric"};

            let row = template.cloneNode(true);
            row.classList.add("actionable");
            row.id = this.transactions[i].id;
            row.children[0].innerText = this.transactions[i].date.toLocaleDateString("en-US", dateOptions);
            row.children[1].innerText = this.transactions[i].category.name;
            row.children[2].innerText = this.transactions[i].location;
            row.children[3].innerText = `$${this.transactions[i].amount}`;
            container.appendChild(row);
        }
    }
}
