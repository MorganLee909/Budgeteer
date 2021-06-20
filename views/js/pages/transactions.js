module.exports = {
    transactions: [],

    display: function(){
        let account = user.getAccount();

        document.getElementById("transactionsTitle").innerText = `${account.name} Account Transactions`;

        if(this.transactions.length === 0){
            for(let i = 0; i < account.transactions.length; i++){
                this.transactions.push(account.transactions[i]);
            }
            this.renderTransactions();
        }

        let from = new Date();
        from.setDate(1);
        document.getElementById("searchFromDate").valueAsDate = from;
        document.getElementById("searchToDate").valueAsDate = new Date();
    },

    renderTransactions: function(){
        let container = document.getElementById("searchTransactionsBody");
        let template = document.getElementById("searchTransaction").content.children[0];

        for(let i = 0; i < this.transactions.length; i++){
            let dateOptions = {year: "numeric", month: "short", day: "numeric"};

            let row = template.cloneNode(true);
            row.classList.add("actionable");
            row.children[0].innerText = this.transactions[i].date.toLocaleDateString("en-US", dateOptions);
            row.children[1].innerText = this.transactions[i].category.name;
            row.children[2].innerText = this.transactions[i].location;
            row.children[3].innerText = `$${this.transactions[i].amount.toFixed(2)}`;
            row.onclick = ()=>{controller.openModal("transaction", this.transactions[i])};
            container.appendChild(row);
        }
    }
}
