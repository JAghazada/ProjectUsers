class UserModel {
    constructor(){}
    _bindFuncs =(_viewListUser)=>{
        this.ListUsersCallback = _viewListUser;
    }

    SearchUser = (obj) =>{
        const {name,surname} = obj
        fetch("/user/search?name="+name+"&surname="+surname)
        .then(res=>res.json())
        .then(res=>{
            if(res.success){
                    this.ListUsersCallback(res.data)
            }
        })
        .catch(err=>alert(err))
    }
}