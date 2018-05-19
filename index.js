const app = {
    init (selectors){
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
        const f = ev.target; //entire form

        const flick={
            id: ++this.max,
            name: f.flickName.value,
        }
        this.flicks.unshift(flick)
        //for the array part

        const item = this.renderListItem(flick);
        this.list.insertBefore(item, this.list.firstElementChild);
        //inserting the item before the first child 
        f.reset();
    },
}
//order in an object doesnt matter. all are created at the same time 

app.init({

    formSelector: "#flickForm",
    listSelector: "#flickList",
    templateSelector: ".flick.template",

});
