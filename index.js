class App {
    constructor(selectors){
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
    }

    renderListItem(flick){
        const item = this.template.cloneNode(true);
        item.classList.remove("template");
        item.dataset.id = flick.id;

        const nameSpan = item.querySelector(".flickName");
        nameSpan.textContent = flick.name;
        nameSpan.addEventListener("keypress", this.saveOnEnter.bind(this, item, flick));
        
        item.querySelector(".delete.button").addEventListener("click", this.deleteFlick.bind(this, item,flick));

        item.querySelector(".fav.button").addEventListener("click", this.favFlick.bind(this, item, flick));

        item.querySelector(".edit.button").addEventListener("click", this.toggleEditable.bind(this, item, flick));

        return item;
    }
//here, event target is button. "this" is the button in this case in this msthod
    deleteFlick(item, flick,  ev){
        //remove fom DOM
        item.remove();

        //remove form array
        const i = this.flicks.indexOf(flick);
        this.flicks.splice(i,1);
    }

    //_ represents that we are passing but not using it. it is sent in by default 

    favFlick(item, flick, _ev){
        flick.fav = item.classList.toggle('fav'); //toggle returns true/ false. when on, it returns true, otherwise it returns false. hence we change the prop of object using this!
    }

    toggleEditable(item, flick, ev){
        const nameField = item.querySelector(".flickName");
        const btn = item.querySelector(".edit.button");
        if(nameField.isContentEditable){
            //make it no longer editable
            nameField.contentEditable = false;
            btn.textContent = "edit";
            btn.classList.remove("success");

            //save changes
            flick.name = nameField.textContent;
            //cannot use nameField.value


        }
        else{
            nameField.contentEditable = true;
            nameField.focus();
            btn.textContent = "save";
            btn.classList.add("success");
            //make it editable
        }

    }

    saveOnEnter(item, flick, ev){
        if(ev.key === "Enter"){
            this.toggleEditable(item, flick )
        }
    }

    handleSubmit(ev){
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
    }

    reBuildList(){
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


const app = new App({
    formSelector: "#flickForm",
    listSelector: "#flickList",
    templateSelector: ".flick.template",
});

//passing an object into teh construcotr

//javascript is pass-by-refernce. Hence any change made any where will change the object directly. arrays and functions are also objects.