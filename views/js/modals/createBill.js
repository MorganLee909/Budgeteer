let createBill = {
    display: function(){
        let form = document.getElementById("createBillForm");
        form.reset();
        form.onsubmit = ()=>{this.submit()};
        document.getElementById("createBillCancel").onclick = ()=>{controller.closeModal()};
    },

    submit: function(){
        event.preventDefault();

        let data = {
            name: document.getElementById("createBillName").value,
            amount: parseInt(document.getElementById("createBillAmount").value * 100),
            account: user.getAccount().id
        }

        let loader = document.getElementById("loaderContainer");
        loader.style.display = "flex";

        fetch("/bills", {
            method: "post",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((response)=>{
                if(typeof(response) === "string"){
                    controller.createBanner(response, "error");
                }else{
                    user.getAccount().addBill(response);
                    state.bills();
                    controller.closeModal();
                }
            })
            .catch((err)=>{
                controller.createBanner("SOMETHING WENT WRONG. PLEASE REFRESH THE PAGE", "error");
            })
            .finally(()=>{
                loader.style.display = "none";
            });
    }
}

module.exports = createBill;