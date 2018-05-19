const app = {
    init: function(selectors){
        this.max = 0;
        this.flicks = []
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector);

        document
            .querySelector(selectors.formSelector)
            .addEventListener("submit",(ev) => {
                ev.preventDefault();
                this.handleSubmit(ev)
            })
    },

    renderListItem: function(flick){
        const item = this.template.cloneNode(true);
        item.classList.remove("template");
        item.dataset.id = flick.id;
        item
            .querySelector(".flickName")
            .textContent = flick.name;

        return item;
    },

    handleSubmit: function(ev){
        ev.preventDefault();
        const f = ev.target; //entire form not just button
        const flick={
            id: ++this.max,
            name: f.flickName.value,
            clickTimes: 0,
            fav: false,

        }
        this.flicks.unshift(flick)
        //for the array part

        
        const item = this.renderListItem(flick);
        this.list.insertBefore(item, this.list.firstElementChild);
        //inserting the item before the first child 

        const delButton = item.querySelector(".actions").querySelector(".alert");
        delButton.addEventListener("click",function(){
            for(var i=0; i<this.max; i++){
                if(this.flicks[i].id === flick.id){
                   this.flicks.splice(i,1);
                }
            }
                delButton.parentNode.parentNode.remove();     
        });

        const favButton = item.querySelector(".actions").querySelector(".warning");
        favButton.addEventListener("click", function(){
            flick.clickTimes = flick.clickTimes + 1;
            if(flick.clickTimes%2!==0){
                flick.fav = true;
                favButton.textContent = "⭐️"
            }
            else{
                flick.fav = false;
                favButton.textContent = "fav";
            }
        });

        f.reset();
    },
}
//order in an object doesnt matter. all are created at the same time 

app.init({
    formSelector: "#flickForm",
    listSelector: "#flickList",
    templateSelector: ".flick.template",

});
