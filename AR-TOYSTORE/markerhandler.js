AFRAME.registerComponent("marker-handler",{
    init:async function(){

        //get toys collection from firebase
        var toys = await this.getToys();
        
        this.el.addEventListener("markerFound",(e) => {
            var markerId = this.el.id;
            this.handleMarkerFound(toys,markerId)
        })
        this.el.addEventListener("markerLost",(e) => {
            this.handleMarkerLost()
        })
    } ,
    handleMarkerFound:function(toys, markerId){
        var buttondiv = document.getElementById("button-div")
        buttondiv.style.display = flex;

        var ratingbutton = document.getElementById("ratingbutton")
        var orderbutton = document.getElementById("orderbutton")

        ratingbutton.addEventListener("click",(e) => {
            swal({
                icon: "warning",
                title: "Rate Toy",
                text: "Work in progress..."
            })
        })
        orderbutton.addEventListener("click",(e) => {
            swal({
                icon: "https://i.imgur.com/4NZ6uLY.jpg",
                title: "Thanks for ordering",
                text: "Order will be delivered soon"
            })
        })

        //Changing model scale to initial scale
        var toy = toys.filter(toy => toy.id === markerId)[0];

        var model = document.querySelector(`model-${toy.id}`);
        model.setAttribute("position",toy.model_geometry.position);
        model.setAttribute("rotation",toy.model_geometry.rotation);
        model.setAttribute("scale",toy.model_geometry.scale);
        
    },
    handleMarkerLost:function(){
        var buttondiv = document.getElementById("button-div")
        buttondiv.style.display = "none";
    },
    getToys: async function(){
        return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
            return snap.docs.map(doc => doc.data());
        })
    },
})