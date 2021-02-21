let home = {
    all: function(){
        document.getElementById("accountTitle").innerText = `${user.getAccount().name} account`;

        this.populateIncome();
        this.populateBills();
        this.populateAllowances();
        this.populateTransactions();
        this.populateStats();
    },

    buttons: function(){
        document.getElementById("createIncomeBtn").onclick = ()=>{controller.openModal("createIncome")};
        document.getElementById("createBillBtn").onclick = ()=>{controller.openModal("createBill")};
        document.getElementById("createAllowanceBtn").onclick = ()=>{controller.openModal("createAllowance")};
        document.getElementById("createTransactionBtn").onclick = ()=>{controller.openModal("createTransaction")};
        document.getElementById("dropdownButton").onclick = ()=>{this.showMenu()};
        document.getElementById("addAccountButton").onclick = ()=>{controller.openModal("newAccount")};
        document.getElementById("switchAccountButton").onclick = ()=>{controller.openModal("switchAccount")};
        document.getElementById("incomeInfoButton").onclick = ()=>{this.showInfo("income")};
        document.getElementById("billsInfoButton").onclick = ()=>{this.showInfo("bills")};
        document.getElementById("allowancesInfoButton").onclick = ()=>{this.showInfo("allowances")};
        document.getElementById("discretionaryInfoButton").onclick = ()=>{this.showInfo("discretionary")};
        document.getElementById("remainingDiscretionaryInfoButton").onclick = ()=>{this.showInfo("remaining")};
        document.getElementById("statsIncomeInfoButton").onclick = ()=>{this.showInfo("statsIncome")};
        document.getElementById("statsBillsInfoButton").onclick = ()=>{this.showInfo("statsBills")};
        document.getElementById("statsAllowancesInfoButton").onclick = ()=>{this.showInfo("statsAllowances")};
        document.getElementById("helpButton").onclick = ()=>{controller.openModal("help")};
        document.getElementById("transferMoney").onclick = ()=>{controller.openModal("transfer")};
    },

    populateIncome: function(){
        let income = user.getAccount().getIncome();
        let incomeBody = document.getElementById("incomeBody");
        while(incomeBody.children.length > 0){
            incomeBody.removeChild(incomeBody.firstChild);
        }

        for(let i = 0; i < income.length; i++){
            let tr = document.createElement("tr");
            incomeBody.appendChild(tr);

            let name = document.createElement("td");
            name.innerText = income[i].name;
            tr.appendChild(name);

            let amount = document.createElement("td");
            amount.innerText = `$${income[i].amount}`;
            tr.appendChild(amount);

            let remove = document.createElement("td");
            remove.classList.add("actionable");
            remove.onclick = ()=>{this.removeCategory(income[i])};
            remove.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            `;
            tr.appendChild(remove);
        }
    },

    populateBills: function(){
        let bills = user.getAccount().getBills();
        let billsBody = document.getElementById("billsBody");

        while(billsBody.children.length > 0){
            billsBody.removeChild(billsBody.firstChild);
        }

        for(let i = 0; i < bills.length; i++){
            let tr = document.createElement("tr");
            billsBody.appendChild(tr);

            let name = document.createElement("td");
            name.innerText = bills[i].name;
            tr.appendChild(name);

            let amount = document.createElement("td");
            amount.innerText = `$${bills[i].amount}`;
            tr.appendChild(amount);

            let remove = document.createElement("td");
            remove.classList.add("actionable");
            remove.onclick = ()=>{this.removeCategory(bills[i])};
            remove.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            `;
            tr.appendChild(remove);
        }
    },

    populateAllowances: function(){
        let allowances = user.getAccount().getAllowances();
        let allowancesBody = document.getElementById("allowancesBody");

        while(allowancesBody.children.length > 0){
            allowancesBody.removeChild(allowancesBody.firstChild);
        }

        for(let i = 0; i < allowances.length; i++){
            let tr = document.createElement("tr");
            allowancesBody.appendChild(tr);

            let name = document.createElement("td");
            name.innerText = allowances[i].name;
            tr.appendChild(name);

            let amount = document.createElement("td");
            amount.innerText = `$${allowances[i].amount}`;
            tr.appendChild(amount);

            let spent = document.createElement("td");
            spent.innerText = `$${user.getAccount().getAllowanceSpent(allowances[i].id)}`;
            tr.appendChild(spent);

            let remove = document.createElement("td");
            remove.classList.add("actionable");
            remove.onclick = ()=>{this.removeCategory(allowances[i])};
            remove.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            `;
            tr.appendChild(remove);
        }
    },

    populateTransactions: function(){
        let tbody = document.getElementById("transactionsBody");
        let transactions = user.getAccount().transactions;

        while(tbody.children.length > 0){
            tbody.removeChild(tbody.firstChild);
        }

        for(let i = 0; i < transactions.length; i++){
            let tr = document.createElement("tr");
            tr.classList.add("actionable");
            tr.onclick = ()=>{controller.openModal("transaction", transactions[i])};
            tbody.appendChild(tr);
            
            let date = document.createElement("td");
            let dateOptions = {year: "numeric", month: "short", day: "numeric"};
            date.innerText = transactions[i].date.toLocaleDateString("en-US", dateOptions);
            tr.appendChild(date);

            let category = document.createElement("td");
            category.innerText = transactions[i].category.name;
            tr.appendChild(category);

            let location = document.createElement("td");
            location.innerText = transactions[i].location;
            tr.appendChild(location);

            let amount = document.createElement("td");
            amount.innerText = `$${transactions[i].amount}`;
            tr.appendChild(amount);
        }
    },

    populateStats: function(){
        let account = user.getAccount();
        let discretionary = account.getDiscretionary();
        let now = new Date();

        document.getElementById("statsBalance").innerText = `$${account.balance.toFixed(2)}`;
        document.getElementById("statsMonth").innerText = now.toLocaleDateString("en-US", {month: "long"});
        document.getElementById("statsDiscretionary").innerText = `$${discretionary.toFixed(2)}`;
        document.getElementById("statsIncome").innerText = `$${account.getTotalIncome().toFixed(2)}`;
        document.getElementById("statsBills").innerText = `$${account.getTotalBills().toFixed(2)}`;
        document.getElementById("statsAllowances").innerText = `$${account.getTotalAllowances().toFixed(2)}`;

        for(let i = 0; i < account.transactions.length; i++){
            if(account.transactions[i].category.group === "discretionary"){
                discretionary += account.transactions[i].amount;
            }
        }

        document.getElementById("statsRemainingDiscretionary").innerText = `$${discretionary.toFixed(2)}`;
    },

    removeCategory: function(category){
        fetch(`/category/${user.getAccount().id}/${category.id}`, {method: "delete"})
            .then(response => response.json())
            .then((response) =>{
                if(typeof(response) === "string"){
                    controller.createBanner(response, "error");
                }else{
                    user.getAccount().removeCategory(category);
                }
            })
            .catch((err)=>{
                controller.createBanner("SOMETHING WENT WRONG. PLEASE REFRESH THE PAGE.", "error");
            });
    },

    showMenu: function(){
        document.getElementById("dropdownContent").style.display = "flex";

        setTimeout(()=>{
            window.onclick = ()=>{this.hideMenu()};
            document.getElementById("dropdownButton").onclick = ()=>{this.hideMenu()};
        }, 0);
    },

    hideMenu: function(){
        document.getElementById("dropdownContent").style.display = "none";
        window.onclick = undefined;
        document.getElementById("dropdownButton").onclick = ()=>{this.showMenu()};
    },

    showInfo: function(type){
        let element = {};
        let button = {};

        switch(type){
            case "income":
                element = document.getElementById("incomeInfoText");
                button = document.getElementById("incomeInfoButton");
                break;
            case "bills":
                element = document.getElementById("billsInfoText");
                button = document.getElementById("billsInfoButton");
                break;
            case "allowances":
                element = document.getElementById("allowancesInfoText");
                button = document.getElementById("allowancesInfoButton");
                break;
            case "discretionary":
                element = document.getElementById("discretionaryInfoText");
                button = document.getElementById("discretionaryInfoButton");
                break;
            case "remaining":
                element = document.getElementById("remainingDiscretionaryInfoText");
                button = document.getElementById("remainingDiscretionaryInfoButton");
                break;
            case "statsIncome":
                element = document.getElementById("statsIncomeInfoText");
                button = document.getElementById("statsIncomeInfoButton");
                break;
            case "statsBills":
                element = document.getElementById("statsBillsInfoText");
                button = document.getElementById("statsBillsInfoButton");
                break;
            case "statsAllowances":
                element = document.getElementById("statsAllowancesInfoText");
                button = document.getElementById("statsAllowancesInfoButton");
                break;
        }

        element.style.display = "flex";
        button.onclick = undefined;
        setTimeout(()=>{
            window.onclick = ()=>{
                element.style.display = "none";
                button.onclick = ()=>{this.showInfo(type)};
                window.onclick = undefined
            }
        }, 0);
    }
};

module.exports = home;