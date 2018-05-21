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

        item.querySelector(".delete.button").addEventListener("click", this.deleteFlick.bind(this, item,flick));

        return item;
    },
//here, event target is button. "this" is the button in this case in this msthod
    deleteFlick(item, flick,  ev){
        //remove fom DOM
        item.remove();

        //remove form array
        const i = this.flicks.indexOf(flick);
        this.flicks.splice(i,1);
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
        //console.log(this.flicks)


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

        const moveUpButton = item.querySelector(".actions").querySelector(".secondary");
        moveUpButton.addEventListener("click", ev =>{
           
            for(var i=0; i<this.flicks.length; i++){
                if(this.flicks[i].id === flick.id){
                    //console.log(this.flicks[i].id);
                    const newFlick = Object.assign({}, this.flicks[i]);
                    //console.log(this.flicks.indexOf(this.flicks[i]));
                    this.flicks[i]=this.flicks[i-1];
                    this.flicks[i-1]=newFlick;
                }

            }
            this.reBuildList();
            
            //const top = item.previousSibling;
            //item.parentNode.replaceChild(item.previousSibling,item);
        });

        const moveDownButton = item.querySelector(".actions").querySelector(".primary");
        moveDownButton.addEventListener("click", ev =>{
            
            for(var j=0; j<this.flicks.length; j++){
                if(this.flicks[j].id === flick.id){
                    console.log(this.flicks[j].id);
                    const newFlick2 = Object.assign({}, this.flicks[j]);
                    //console.log(this.flicks.indexOf(this.flicks[i]));
                    this.flicks[j]=this.flicks[j+1];
                    this.flicks[j+1]=newFlick2;
                    break;
                }

            }
            this.reBuildList();
        });
         

        f.reset();
    },

    reBuildList: function(){
        while (app.list.firstChild) {
            app.list.removeChild(app.list.firstChild);
        }
        
       for(var i=0;i<this.flicks.length; i++){
            //console.log(i);
            const item = this.renderListItem(this.flicks[i]);
          //  this.list.insertBefore(item, this.list.firstElementChild);
          this.list.append(item);
        }
       
    }

}
//order in an object doesnt matter. all are created at the same time 

app.init({
    formSelector: "#flickForm",
    listSelector: "#flickList",
    templateSelector: ".flick.template",

});
