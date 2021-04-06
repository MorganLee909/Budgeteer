let createIncome = {
    display: function(){
        document.getElementById("createIncomeForm").onsubmit = ()=>{this.submit()};
        document.getElementById("createIncomeCancel").onclick = ()=>{
            document.getElementById("createIncomeName").value = "";
            document.getElementById("createIncomeAmount").value = "";

            controller.closeModal();
        }
    },

    submit: function(){
        event.preventDefault();

        let data = {
            name: document.getElementById("createIncomeName").value,
            amount: parseInt(document.getElementById("createIncomeAmount").value * 100),
            account: user.getAccount().id
        };

        let loader = document.getElementById("loaderContainer");
        loader.style.display = "flex";

        fetch("/income", {
            method: "post",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((response) =>{
                if(typeof(response) === "string"){
                    controller.createBanner(response, "error");
                }else{
                    user.getAccount().addIncome(response);
                    state.income();
                    controller.closeModal();
                }
            })
            .catch((err)=>{
                console.log(err);
                controller.createBanner("SOMETHING WENT WRONG. PLEASE REFRESH THE PAGE", "error");
            })
            .finally(()=>{
                loader.style.display = "none";
            });
    }   
}

module.exports = createIncome;