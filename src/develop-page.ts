import { BindingMode, bindable } from "aurelia";

export class DevelopPage {

  @bindable()
  public form;
  public forms = [];
  public titles = [];
  @bindable({mode: BindingMode.toView})
  public data: string;

  attached() {
    
    fetch('http://localhost:3000/forms', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }      
    }).then(async (response) => {
      const json = await response.json();
      this.forms = json;
      this.titles = json.map((form) => form.title);
      this.displayForm(this.titles[0]);
      console.log('titles:   ', this.titles.reduce((acc, cur) => acc + '  ' + cur));
      console.log('api: ', JSON.stringify(json));
    }).catch((err) => console.error(err));
  }

  displayForm(title: string): void {
    this.form = this.forms.find(that => that.title === title).form;
  }

  onsubmit(e: SubmitEvent): void {
    e.preventDefault();
    const data = new FormData(document.querySelector('form'), e.submitter);
    console.log(document.querySelector('form'));
  }
}