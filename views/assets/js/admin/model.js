class Model {
    constructor(){
        
    }

    _bindFunctions=(_viewAlert,_viewClearInputs)=>{
        this.AlertCallback = _viewAlert;
        this.ClearInputsCallback =_viewClearInputs; 
    }
    AddUser = (object) =>{
        console.log(object)
        fetch("/add-user",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({user:object})

        })
        .then(res=>res.json())
        .then(res=>{
            if(res.success){
                this.AlertCallback(res.message,"success");
                this.ClearInputsCallback();
            }
        })
        .catch(err=>{
            this.AlertCallback(res.message)
            
            
            console.log(err)})
    }
}